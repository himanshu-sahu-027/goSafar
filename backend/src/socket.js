import { Server } from "socket.io";

import userModel from "./models/user.model.js";
import captainModel from "./models/captain.model.js";
import rideModel from "./models/ride.model.js";
import { updateCaptainLocationService } from "./services/captain.service.js";

import {
  updateCaptainGeoLocation,
  removeCaptainFromGeo,
} from "./services/redis/redisCaptainGeo.service.js";

// MongoDB will receive a location updation checkpoint every 30 seconds.
const MONGO_LOCATION_SYNC_INTERVAL = 30 * 1000;

let io;

// Stores: socketId -> captainId
const captainSocketMap = new Map();

// Stores: captainId -> last MongoDB sync time
const captainLocationSyncMap = new Map();

// Socket event contract for ride live-location updates:
// - join
// - updateLocationCaptain
// - captainLocationUpdate
// - createNewRide
// - rideConfirmed
// - rideStarted
// - rideEnded

// Initialize Socket.IO
function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`[Socket] Client connected: ${socket.id}`);

    /*
      Join socket connection.
      Stores the current socket ID against the corresponding user/captain.
    */
    socket.on("join", async (data) => {
      try {
        const { userId, userType } = data;

        console.log("[Socket] Join request received:", {
            socketId: socket.id,
            userId,
            userType,
        });

        if (!userId || !userType) {

          console.log("[Socket] Join rejected: missing userId or userType");

          return socket.emit("error", {
            message: "userId and userType are required",
          });
        }

        if (userType === "user") {
          // update user socket id
          await userModel.findByIdAndUpdate(userId, { socketId: socket.id });

          console.log("[Socket] User joined successfully:", {
                userId,
                socketId: socket.id,
            });

        } else if (userType === "captain") {
          // update captain socket id
          await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });

          const captainRoom = `captain:${userId}`;

          socket.join(captainRoom);

          console.log("[Socket] Captain joined successfully:", {
                captainId: userId,
                socketId: socket.id,
            });

          // Remember which captain owns this socket.
          captainSocketMap.set(socket.id, String(userId));

        } else {

          console.log("[Socket] Join rejected: invalid user type:", userType);

          return socket.emit("error", {
            message: "Invalid user type",
          });
        }
      } catch (error) {
        console.error("[Socket] Join error:", error);

        socket.emit("error", {
          message: "Failed to join socket",
        });
      }
    });

    // Update captain's live location
    socket.on("updateLocationCaptain", async (data) => {
      try {
        const captainId = captainSocketMap.get(socket.id) || String(data?.userId || "");

        if (!captainId) {
          return socket.emit("error", {
            message: "Captain not registered for socket",
          });
        }

        const { location } = data || {};

        if (!location || location.latitude === undefined || location.longitude === undefined) {
          return socket.emit("error", {
            message: "Invalid location data",
          });
        }

        const latitude = Number(location.latitude);
        const longitude = Number(location.longitude);

        if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
          return socket.emit("error", {
            message: "Latitude and longitude must be valid numbers",
          });
        }

        /* STEP 1: Update Redis GEO

          Every location update goes to Redis because
          Redis is our high-speed live-location store.
        */
        const redisUpdated = await updateCaptainGeoLocation(captainId, latitude, longitude);

        /* STEP 2: MongoDB periodic checkpoint */
        const now = Date.now();
        const lastSyncTime = captainLocationSyncMap.get(captainId) || 0;
        const shouldSyncToMongoDB = (now - lastSyncTime) >= MONGO_LOCATION_SYNC_INTERVAL;

        // Keep the latest captain location available to the passenger immediately.
        // MongoDB remains a 30-second checkpoint, while Redis remains the fast geo store.
        const activeRide = await rideModel
          .findOne({
            captain: captainId,
            status: { $in: ["accepted", "ongoing"] },
          })
          .populate({
            path: "user",
            select: "socketId",
          });

        if (activeRide?.user?.socketId) {
          sendMessageToUser(activeRide.user.socketId, {
            event: "captainLocationUpdate",
            data: {
              rideId: String(activeRide._id),
              location: { latitude, longitude },
            },
          });
        }

        if (shouldSyncToMongoDB) {
          try {
            await updateCaptainLocationService(captainId, latitude, longitude);
            captainLocationSyncMap.set(captainId, now);
          } catch (mongoError) {
            console.error(
              "MongoDB captain location checkpoint failed:",
              mongoError.message,
            );
          }
        }

        if (!redisUpdated) {
          console.log("Redis GEO unavailable. MongoDB checkpoint is being used as fallback.");
        }
      } catch (error) {
        console.error("Captain location update error:", error);

        socket.emit("error", {
          message: "Failed to update captain location",
        });
      }
    });

    /*
      Handle socket disconnection.

      A disconnected captain should no longer be considered available in the Redis live-location index.
    */
    socket.on("disconnect", async () => {
      console.log(`[Socket] Client disconnected: ${socket.id}`);

      const captainId = captainSocketMap.get(socket.id);

      if (!captainId) {
        return;
      }

      // Remove socket -> captain mapping.
      captainSocketMap.delete(socket.id);

      // Remove MongoDB checkpoint tracking for this captain.
      captainLocationSyncMap.delete(captainId);

      // Remove captain from Redis GEO.
      await removeCaptainFromGeo(captainId);
    });
  });
}

// Send event to a specific socket
function sendMessageToUser(socketId, messageObject) {
    if (!io) {
        console.log("[Socket] Socket.io is not initialized.");
        return;
    }

    if (!socketId) {
        console.log("[Socket] Cannot send message: socket ID is missing.");
        return;
    }

    const socketExists = io.sockets.sockets.has(socketId);

    console.log("[Socket] Sending event:", {
        socketId,
        event: messageObject.event,
        socketConnected: socketExists,
        data: messageObject.data,
    });

    if (!socketExists) {
        console.log(
            `[Socket] Target socket is not connected: ${socketId}`
        );

        return;
    }

    io.to(socketId).emit(
        messageObject.event,
        messageObject.data
    );

    console.log("[Socket] Event sent successfully:", {
        socketId,
        event: messageObject.event,
    });
};

function sendMessageToCaptain(captainId, messageObject) {

    console.log("[DEBUG] sendMessageToCaptain received:", {
        captainId,
        captainIdType: typeof captainId,
    });

    if (!io) {
        console.log("[Socket] Socket.io is not initialized.");
        return;
    }

    if (!captainId) {
        console.log("[Socket] Captain ID is missing.");
        return;
    }

    if (!messageObject?.event) {
        console.log("[Socket] Event name is missing.");
        return;
    }

    const room = `captain:${String(captainId)}`;

    console.log("[Socket] Sending event to captain room:", {
        captainId: String(captainId),
        room,
        event: messageObject.event,
    });

    io.to(room).emit(
        messageObject.event,
        messageObject.data
    );

    console.log("[Socket] Captain room event emitted:", {
        captainId: String(captainId),
        room,
        event: messageObject.event,
    });
}

export { initializeSocket, sendMessageToUser, sendMessageToCaptain };
