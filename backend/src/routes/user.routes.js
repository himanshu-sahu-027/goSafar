import express from "express";

// import user controllers
import {
    registerUserController,
    loginUserController,
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
 * @route POST /users/register
 * @description Register a new user
 * @access public
 */
userRouter.post( "/register", registerValidation, validateRequest, registerUserController );

/**
 * @route POST /users/login
 * @description Login a user
 * @access public
 */
userRouter.post( "/login", loginValidation, validateRequest, loginUserController );
 

export default userRouter;
