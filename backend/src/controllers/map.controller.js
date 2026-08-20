import {
  getAddressCoordinateService,
  getDistanceTimeService,
  getAutoCompleteSuggestionsService,
} from "../services/map.service.js";

/**
 * @name getAddressCoordinatesController
 * @description Controller to fetch coordinates for a given address
 * @route GET /map/getCoordinates
 * @access Private
 */
async function getAddressCoordinatesController(req, res) {
  try {
    const { address } = req.query;

    // Delegate to service
    const coordinates = await getAddressCoordinateService(address);

    return res.status(200).json({
      success: true,
      data: coordinates,
    });
  } catch (error) {
    console.error("Get coordinates error:", error);

    return res.status(404).json({
      success: false,
      message: error.message || "Coordinates not found",
    });
  }
}

/**
 * @name getDistanceTimeController
 * @description Controller to calculate driving distance and time between origin and destination
 * @route GET /map/getDistanceTime
 * @access Private
 */
async function getDistanceTimeController(req, res) {
  try {
    const { origin, destination } = req.query;

    // Convert origin and destination names into coordinates
    const originCoords = await getAddressCoordinateService(origin);
    const destinationCoords = await getAddressCoordinateService(destination);

    // Format as "lng,lat" strings
    const originStr = `${originCoords.longitude},${originCoords.latitude}`;
    const destinationStr = `${destinationCoords.longitude},${destinationCoords.latitude}`;

    // Delegate to service
    const distanceTime = await getDistanceTimeService(originStr, destinationStr);

    return res.status(200).json({
      success: true,
      data: distanceTime,
    });
  } catch (error) {
    console.error("Get distance and time error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to calculate distance and time",
    });
  }
}

/**
 * @name getAutoCompleteSuggestionsController
 * @description Controller to fetch autocomplete place suggestions
 * @route GET /map/getSuggestions
 * @access Private
 */
async function getAutoCompleteSuggestionsController(req, res) {
  try {
    const { input } = req.query;

    // Delegate to service
    const suggestions = await getAutoCompleteSuggestionsService(input);

    return res.status(200).json({
      success: true,
      data: suggestions,
    });
  } catch (error) {
    console.error("Autocomplete error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to fetch suggestions",
    });
  }
}

export {
  getAddressCoordinatesController,
  getDistanceTimeController,
  getAutoCompleteSuggestionsController,
};
