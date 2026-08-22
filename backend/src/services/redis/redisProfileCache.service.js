import { connectToRedis, redisClient } from "../../config/redis.js";

const PROFILE_CACHE_TTL = 2 * 60 * 60; // 2 hours


/**
 * Get Redis client only when Redis is ready.
 * @returns {Promise<import("redis").RedisClientType | null>}
 */

// Redis is a cache in GoSafar, so Redis failure should never break the main application flow.
function getRedisClient() {
    if (!redisClient.isReady) {
        return null;
    }

    return redisClient;
}


/**
 * Generate cache key for user profile.
 * @param {string} userId
 * @returns {string}
 */
function userProfileCacheKey(userId) {
    return `user:profile:${userId}`;
}


/**
 * Generate cache key for captain profile.
 * @param {string} captainId
 * @returns {string}
 */
function captainProfileCacheKey(captainId) {
    return `captain:profile:${captainId}`;
}


/**
 * Retrieve cached profile.
 * @param {string} cacheKey
 * @returns {Promise<Object|null>}
 */
async function getCachedProfile(cacheKey) {

    const client = getRedisClient();

    // Redis unavailable → cache miss
    if (!client) {
        console.log(`Redis unavailable. Cache MISS for ${cacheKey}`);
        return null;
    }

    try {
        const cachedProfile = await client.get(cacheKey);

        if (!cachedProfile) {
            console.log(`Cache MISS: ${cacheKey}`);
            return null;
        }

        console.log(`Cache HIT: ${cacheKey}`);

        try {
            return JSON.parse(cachedProfile);
        } catch (error) {
            console.error(
                `Invalid cached profile for key ${cacheKey}:`,
                error.message
            );

            // Remove corrupted cache.
            await client.del(cacheKey);

            return null;
        }
    } catch (error) {
        console.error(
            `Redis GET failed for ${cacheKey}:`,
            error.message
        );

        return null;
    }
}


/**
 * Store profile in Redis.
 * @param {string} cacheKey
 * @param {Object} profile
 * @returns {Promise<Object>}
 */
async function setCachedProfile(cacheKey, profile) {
    const client = getRedisClient();

    // Redis unavailable → simply skip caching.
    if (!client) {
        console.log(
            `Redis unavailable. Skipping cache SET for ${cacheKey}`
        );

        return profile;
    }

    try {
        await client.set(
            cacheKey,
            JSON.stringify(profile),
            {
                EX: PROFILE_CACHE_TTL,
            }
        );

        console.log(`Cache SET: ${cacheKey}`);

        return profile;
    } catch (error) {
        console.error(
            `Redis SET failed for ${cacheKey}:`,
            error.message
        );

        return profile;
    }
}


/**
 * Delete cached profile.
 * @param {string} cacheKey
 * @returns {Promise<void>}
 */
async function deleteCachedProfile(cacheKey) {
    const client = getRedisClient();

    if (!client) {
        console.log(
            `Redis unavailable. Skipping cache DELETE for ${cacheKey}`
        );

        return;
    }

    try {
        await client.del(cacheKey);

        console.log(`Cache DELETE: ${cacheKey}`);
    } catch (error) {
        console.error(
            `Redis DELETE failed for ${cacheKey}:`,
            error.message
        );
    }
}


/* USER PROFILE CACHE */

/**
 * Get cached user profile.
 * @param {string} userId
 * @returns {Promise<Object|null>}
 */
async function getCachedUserProfile(userId) {
    return getCachedProfile(
        userProfileCacheKey(userId)
    );
}


/**
 * Add user profile in cache.
 * @param {Object} userProfile
 * @returns {Promise<Object>}
 */
async function cacheUserProfile(userProfile) {
    return setCachedProfile(
        userProfileCacheKey(
            userProfile._id.toString()
        ),
        userProfile
    );
}


/**
 * Remove user profile from cache.
 * @param {string} userId
 * @returns {Promise<void>}
 */
async function removeUserProfileCache(userId) {
    return deleteCachedProfile(
        userProfileCacheKey(userId)
    );
}


/* CAPTAIN PROFILE CACHE */

/**
 * Get cached captain profile.
 * @param {string} captainId
 * @returns {Promise<Object|null>}
 */
async function getCachedCaptainProfile(captainId) {
    return getCachedProfile(
        captainProfileCacheKey(captainId)
    );
}


/**
 * Add captain profile in cache.
 * @param {Object} captainProfile
 * @returns {Promise<Object>}
 */
async function cacheCaptainProfile(captainProfile) {
    return setCachedProfile(
        captainProfileCacheKey(
            captainProfile._id.toString()
        ),
        captainProfile
    );
}


/**
 * Remove captain profile from cache.
 * @param {string} captainId
 * @returns {Promise<void>}
 */
async function removeCaptainProfileCache(captainId) {
    return deleteCachedProfile(
        captainProfileCacheKey(captainId)
    );
}


export {
    getCachedUserProfile,
    cacheUserProfile,
    removeUserProfileCache,

    getCachedCaptainProfile,
    cacheCaptainProfile,
    removeCaptainProfileCache,
};