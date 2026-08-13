import express from "express";

// import user controllers
import {
    registerUserController,
    loginUserController,
    getUserProfileController,
    logoutUserController
} from "../controllers/user.controller.js";

// import auth middlewares
import {
    authUser,
} from "../middlewares/auth.middleware.js";

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
 
/**
 * @route GET /users/profile
 * @description Get the profile of the authenticated user
 * @access private
 */
userRouter.get( "/profile", authUser, getUserProfileController );

/**
 * @route POST /users/logout
 * @description Logout a user by blacklisting its token and clearing the cookie
 * @access private
 */
userRouter.post( "/logout", authUser, logoutUserController );


export default userRouter;
