import { createUserService } from "../services/user.service.js";

/**
 * @name registerUserController
 * @description Register a new user
 * @route POST /api/user/register
 * @access Public
 */
async function registerUserController(req, res) {
  try {
    const { fullname, email, password } = req.body;

    // Delegate full registration flow to service
    const createdUser = await createUserService(fullname, email, password);

    // Generate token
    const token = createdUser.generateAuthToken();

    res.status(201).json({
      message: "User created successfully",
      token,
      user: createdUser,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export { registerUserController };
