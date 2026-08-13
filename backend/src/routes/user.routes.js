import express from "express";

// import user controllers
import {
    registerUserController
} from "../controllers/user.controller.js";

// import auth middlewares
import {} from "../middlewares/auth.middleware.js";

// import request validators
import {
  registerValidation,
  loginValidation,
} from "../validators/user.validators.js";

// import validation error middleware
import validateRequest from "../middlewares/validationError.middleware.js";

const userRouter = express.Router();

/**
 * @route POST /api/user/register
 * @description Register a new user
 * @access public
 */
userRouter.post( "/register", registerValidation, validateRequest, registerUserController );

export default userRouter;
