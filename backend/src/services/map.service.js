import axios from "axios";
import { envConfig } from "../config/env.js";

/**
 * @name getAddressCoordinateService
 * @description Fetch latitude and longitude for a given address using ORS geocode API expects address as a query parameter
 * @param {string} address - The address to geocode
 * @returns {Promise<{latitude:number, longitude:number}>} returns { latitude, longitude } of the address as an object
 */
async function getAddressCoordinateService(address) {
  if (!address) {
    throw new Error("Address is required");
  }

  const url = "https://api.heigit.org/pelias/v1/search";

  // Call ORS geocode API
  const response = await axios.get(url, {
    params: {
      api_key: envConfig.ORS_API_KEY,
      text: address,
      size: 1,
    },
  });

  const features = response.data?.features;

  if (!features || features.length === 0) {
    throw new Error("Coordinates not found");
  }

  // Extract coordinates [lng, lat]
  const [longitude, latitude] = features[0].geometry.coordinates;

  return { latitude, longitude };
}

/**
 * @name getDistanceTimeService
 * @description Calculate driving distance and time between origin and destination using ORS directions API expects origin and destination as "lng,lat" strings
 * @param {string} origin - "lng,lat" string for origin
 * @param {string} destination - "lng,lat" string for destination
 * @returns {Promise<{distance:string, duration:string}>}  returns distance in km and duration in minutes as an object
 */
async function getDistanceTimeService(origin, destination) {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }

  // Parse coordinates from input strings
  const [originLng, originLat] = origin.split(",").map(Number);
  const [destinationLng, destinationLat] = destination.split(",").map(Number);

  if ([originLng, originLat, destinationLng, destinationLat].some(Number.isNaN)) {
    throw new Error("Invalid coordinates");
  }

  const url = "https://api.heigit.org/openrouteservice/v2/directions/driving-car";

  // Call ORS directions API
  const response = await axios.get(url, {
    params: {
      api_key: envConfig.ORS_API_KEY,
      start: `${originLng},${originLat}`,
      end: `${destinationLng},${destinationLat}`,
    },
  });

  const route = response.data?.features?.[0];
  if (!route) {
    throw new Error("No route found");
  }

  const summary = route.properties?.summary;
  if (!summary) {
    throw new Error("Route information unavailable");
  }

  // Convert meters → km, seconds → minutes
  return {
    distance: Number((summary.distance / 1000).toFixed(1)), // in km
    duration: Math.ceil(summary.duration / 60), // in minutes
  };
}

/**
 * @name getAutoCompleteSuggestionsService
 * @description Fetch autocomplete place suggestions using ORS geocode autocomplete API expects input as a query parameter
 * @param {string} input - Search text
 * @returns {Promise<Array<{name:string, coordinates:{longitude:number, latitude:number}}>>} returns an array of suggestions with name and coordinates
 */
async function getAutoCompleteSuggestionsService(input) {
  if (!input) {
    throw new Error("Search input is required");
  }

  const url = "https://api.heigit.org/pelias/v1/autocomplete";

  // Call ORS autocomplete API
  const response = await axios.get(url, {
    params: {
      api_key: envConfig.ORS_API_KEY,
      text: input,
      size: 7,
      "boundary.country": "IN",
    },
  });

  const features = response.data?.features;
  if (!features) {
    throw new Error("Unable to fetch suggestions");
  }

  // Map API response to simplified structure
  return features.map((feature) => ({
    name: feature.properties?.label,
    coordinates: {
      longitude: feature.geometry.coordinates[0],
      latitude: feature.geometry.coordinates[1],
    },
  }));
}

export {
  getAddressCoordinateService,
  getDistanceTimeService,
  getAutoCompleteSuggestionsService,
};
