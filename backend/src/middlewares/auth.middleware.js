import jwt from "jsonwebtoken";
import { envConfig } from "../config/env.js";

// import models
import userModel from "../models/user.model.js";
import captainModel from "../models/captain.model.js";
import tokenBlacklistModel from "../models/tokenBlacklist.model.js";

async function authUser(req, res, next) {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Check if token is blacklisted
    const isBlacklisted = await tokenBlacklistModel.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Verify token
    const decoded = jwt.verify(token, envConfig.JWT_SECRET);

    // Find user by ID
    const user = await userModel.findById(decoded._id);

    req.user = user;
    return next();
    
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}


async function authCaptain(req, res, next) {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Check if token is blacklisted
    const isBlacklisted = await tokenBlacklistModel.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Verify token
    const decoded = jwt.verify(token, envConfig.JWT_SECRET);

    // Find captain by ID
    const captain = await captainModel.findById(decoded._id);

    req.captain = captain;
    return next();
    
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}



export {
  authUser,
  authCaptain
};
