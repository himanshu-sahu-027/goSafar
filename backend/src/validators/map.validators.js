/*
body() → Validates data sent in the request body (req.body).Used for JSON/form payloads in POST, PUT, PATCH.
Example: body("email").isEmail() → checks req.body.email.              ( as used in captain and user.validator )

query() → Validates query string parameters (req.query).Used for data passed in the URL after ? in GET requests.
Example: query("search").notEmpty() → checks req.query.search.         ( as used in this map.validator.js )

param() → Validates route parameters (req.params).Used for dynamic values in the URL path.
Example: param("id").isInt() → checks /user/:id → req.params.id.
*/

import { query } from "express-validator";

const getAddressCoordinatesValidator = [
    query("address")
        .trim()
        .notEmpty()
        .withMessage("Address is required")
        .isLength({ min: 3 })
        .withMessage("Address must be at least 3 characters long")
];

const getDistanceTimeValidator = [
    query("origin")
        .trim()
        .notEmpty()
        .withMessage("Origin is required")
        .isLength({ min: 3 })
        .withMessage("Origin must be at least 3 characters long"),

    query("destination")
        .trim()
        .notEmpty()
        .withMessage("Destination is required")
        .isLength({ min: 3 })
        .withMessage("Destination must be at least 3 characters long")
];

const getAutoCompleteSuggestionsValidator = [
    query("input")
        .trim()
        .notEmpty()
        .withMessage("Search input is required")
        .isLength({ min: 3 })
        .withMessage("Search input must be at least 3 characters long")
];

export {
    getAddressCoordinatesValidator,
    getDistanceTimeValidator,
    getAutoCompleteSuggestionsValidator
};