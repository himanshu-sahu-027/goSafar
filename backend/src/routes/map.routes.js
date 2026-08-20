import express from "express";

import { 
    getAddressCoordinatesController, 
    getDistanceTimeController, 
    getAutoCompleteSuggestionsController 
} from "../controllers/map.controller.js";

import { 
    getAddressCoordinatesValidator, 
    getDistanceTimeValidator, 
    getAutoCompleteSuggestionsValidator
} from "../validators/map.validators.js";

import { authUser } from "../middlewares/auth.middleware.js";
import validateRequest from "../middlewares/validationError.middleware.js";

const mapRouter = express.Router();

/**
 * @route GET /map/getCoordinates
 * @description Get latitude and longitude for a given address
 * @access Private 
 */
mapRouter.get("/getCoordinates", getAddressCoordinatesValidator, validateRequest, authUser, getAddressCoordinatesController);

/**
 * @route GET /map/getDistanceTime
 * @description Get driving distance and time between origin and destination
 * @access Private 
 */
mapRouter.get("/getDistanceTime", getDistanceTimeValidator, validateRequest, authUser, getDistanceTimeController);

/**
 * @route GET /map/getSuggestions
 * @description Get autocomplete place suggestions for search input
 * @access Private 
 */
mapRouter.get("/getSuggestions", getAutoCompleteSuggestionsValidator, validateRequest, authUser, getAutoCompleteSuggestionsController);

export default mapRouter;
