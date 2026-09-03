import express from "express";

// import user controllers
import {
  registerUserController,
  loginUserController,
  googleUserSigninController,
  getUserProfileController,
  getUserRideHistoryController,
  logoutUserController,
} from "../controllers/user.controller.js";

// import auth middlewares
import { authUser } from "../middlewares/auth.middleware.js";

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
userRouter.post("/register", registerValidation, validateRequest, registerUserController);

/**
 * @route POST /users/login
 * @description Login a user
 * @access public
 */
userRouter.post("/login", loginValidation, validateRequest, loginUserController);
 
/**
 * @route POST /users/google
 * @description Sign in or sign up using Google
 * @access public
 */
userRouter.post("/google", googleUserSigninController);

/**
 * @route GET /users/profile
 * @description Get the profile of the authenticated user
 * @access private
 */
userRouter.get("/profile", authUser, getUserProfileController);

/**
 * @route GET /users/history
 * @description Get authenticated user's ride history
 * @access private
 */
userRouter.get("/history", authUser, getUserRideHistoryController);

/**
 * @route POST /users/logout
 * @description Logout a user by blacklisting its token and clearing the cookie
 * @access private
 */
userRouter.post("/logout", authUser, logoutUserController);

export default userRouter;
