import userModel from "../models/user.model.js";

/**
 * @name createUserService
 * @description Handles full user registration flow: check existing, hash password, create a new user in the database, expects fullname: { firstname, lastname }, email, and password
 * @returns {Promise<Object>} - The created user document
 */
async function createUserService(fullname, email, password) {
  
  // Check if user already exists
  const isUserAlreadyExist = await userModel.findOne({ email });
  if (isUserAlreadyExist) {
    throw new Error("User already exists");
  }

  if (!fullname?.firstname || !email || !password) {
        throw new Error('All fields are required');
  }

  // Hash password
  const hashedPassword = await userModel.hashPassword(password);

  // Create user
  const user = await userModel.create({
    fullname,
    email,
    password: hashedPassword,
  });

  return user;
}


/**
 * @name loginUserService
 * @description Authenticate a user by email and password
 * @returns {Promise<Object>} - Authenticated user document
 */
async function loginUserService(email, password) {

  // Find user and include password field
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Compare password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  return user;
}

export { 
    createUserService, 
    loginUserService
};
