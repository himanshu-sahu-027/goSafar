import { redisClient } from "../../config/redis.js";

const CAPTAIN_GEO_KEY = "captains:geo";

 // Redis GEO is an optimization for live captain locations. If Redis is unavailable, callers should fall back to MongoDB.

 function getRedisClient() {
  if (!redisClient.isReady) {
    return null;
  }

  return redisClient;
}

/**
 * Validate latitude and longitude values.
 * @param {number} latitude
 * @param {number} longitude
 * @throws {Error} if latitude or longitude is invalid
 */
function validateCoordinates(latitude, longitude) {
  if (typeof latitude !== "number" || typeof longitude !== "number" || Number.isNaN(latitude) || Number.isNaN(longitude) 
    || latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180 ) 
  {
    throw new Error("Invalid latitude or longitude");
  }
}

/**
 * Add or update a captain's live location in the Redis GEO index.
 * @params {string} captainId
 * @params {number} latitude
 * @params {number} longitude
 * @returns {Promise<boolean>} - true if Redis updated successfully, false if Redis unavailable or error
 */
async function updateCaptainGeoLocation(captainId, latitude, longitude) {
  validateCoordinates(latitude, longitude);

  const client = getRedisClient();

  if (!client) {
    return false;
  }

  try {
    //  Redis expects longitude before latitude.
    await client.geoAdd(CAPTAIN_GEO_KEY, {
      longitude,
      latitude,
      member: String(captainId),
    });

    return true;
  } catch (error) {
    console.error("Redis GEOADD failed:", error.message);
    return false;
  }
}

/**
 * Find captain IDs within a radius using Redis GEOSEARCH. Results are ordered nearest first.
 * @param {number} latitude
 * @param {number} longitude
 * @param {number} radiusKm
 * @returns {Promise<Array<string>|null>} - Array of captain IDs or null if Redis is unavailable
 */
async function findCaptainIdsInGeoRadius(latitude, longitude, radiusKm) {
  validateCoordinates(latitude, longitude);

  if (typeof radiusKm !== "number" || radiusKm <= 0) {
    throw new Error("Radius must be a positive number");
  }

  const client = getRedisClient();

  if (!client) {
    return null;
  }

  try {
    const results = await client.geoSearch(
      CAPTAIN_GEO_KEY,
      {
        longitude,
        latitude,
      },
      {
        radius: radiusKm,
        unit: "km",
      },
      {
        SORT: "ASC",
      }
    );

    return results.map((captainId) => String(captainId));
  } catch (error) {
    console.error("Redis GEOSEARCH failed:", error.message);
    return null;
  }
}

/**
 * Remove a captain from the live GEO index.
 * @param {string} captainId
 * @returns {Promise<boolean>} - true if captain is removed successfully , false if Redis unavailable or error
 */
async function removeCaptainFromGeo(captainId) {
  const client = getRedisClient();

  if (!client) {
    return false;
  }

  try {
    await client.zRem(CAPTAIN_GEO_KEY, String(captainId));
    return true;
  } catch (error) {
    console.error("Redis GEO captain removal failed:", error.message);
    return false;
  }
}

export {
  CAPTAIN_GEO_KEY,
  updateCaptainGeoLocation,
  findCaptainIdsInGeoRadius,
  removeCaptainFromGeo,
};
