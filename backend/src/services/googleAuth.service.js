import { OAuth2Client } from "google-auth-library";

import { envConfig } from "../config/env.js";

// Create a Google OAuth client using the application's Google client ID.
const googleClient = new OAuth2Client(envConfig.GOOGLE_CLIENT_ID);

/**
 * @name verifyGoogleTokenService
 * @description Verifies a Google ID token and returns trusted Google account information.
 * @param {string} idToken - Google ID token received from the frontend.
 * @returns {Promise<Object>} Verified Google account information.
 * @throws {Error} If the Google ID token is missing or invalid.
 */
async function verifyGoogleTokenService(idToken) {
  if (!idToken) {
    throw new Error("Google ID token is required");
  }

  try {
    // Verify the ID token and make sure it was issued for our Google client.
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: envConfig.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      throw new Error("Invalid Google token");
    }

    if (!payload.sub) {
      throw new Error("Google account ID is missing");
    }

    if (!payload.email) {
      throw new Error("Google account email is missing");
    }

    if (payload.email_verified !== true) {
      throw new Error("Google email is not verified");
    }

    return {
      googleId: payload.sub,
      email: payload.email,
      firstName: payload.given_name || "",
      lastName: payload.family_name || "",
    };
  } catch (error) {
    console.error("Google token verification failed:", error);

    throw new Error("Invalid Google authentication");
  }
}

export { verifyGoogleTokenService };
