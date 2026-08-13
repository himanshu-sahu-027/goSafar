import { 
    createUserService,
    loginUserService,
} from "../services/user.service.js";

/**
 * @name registerUserController
 * @description Register a new user
 * @route POST /users/register
 * @access Public
 */
async function registerUserController(req, res) {
  
  try {
    const { fullname, email, password } = req.body;

    // Delegate full registration flow to service
    const createdUser = await createUserService(fullname, email, password);

    // Generate token 
    const token = createdUser.generateAuthToken();

    // Set cookie
    res.cookie("token", token);

    res.status(201).json({
      message: "User created successfully",
      user: createdUser,
      token,
    });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

/**
 * @name loginUserController
 * @description Login a user
 * @route POST /users/login
 * @access Public
 */
async function loginUserController(req, res) {
  try {
    const { email, password } = req.body;

    // Delegate authentication to service
    const user = await loginUserService(email, password);

    // Generate token
    const token = user.generateAuthToken();

    // Set cookie
    res.cookie("token", token);

    res.status(200).json({ 
        message: "User loggeded successfully",
        user,
        token
    });
    
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}

export { 
    registerUserController,
    loginUserController
};
