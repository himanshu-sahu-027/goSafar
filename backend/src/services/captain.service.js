import captainModel from "../models/captain.model.js";

/**
 * @name createCaptainService
 * @description Handles full captain registration flow: check existing, hash password, create a new captain in the database, expects fullname: { firstname, lastname }, email, password and vehicle : { color, plate, capacity, vehicleType } 
 * @returns {Promise<Object>} - Created captain document
 */
async function createCaptainService({ fullname, email, password, vehicle }) {
 
  // Check if captain already exists
  const isCaptainAlreadyExist = await captainModel.findOne({ email });
  if (isCaptainAlreadyExist) {
    throw new Error("Captain already exists");
  }

  if (!fullname?.firstname || !email || !password || !vehicle?.color || !vehicle?.plate || !vehicle?.capacity || !vehicle?.vehicleType) {
    throw new Error("All fields are required");
  }

  // Hash password
  const hashedPassword = await captainModel.hashPassword(password);

  // Create captain directly with nested fullname and vehicle
  const captain = await captainModel.create({
    fullname,
    email,
    password: hashedPassword,
    vehicle,
  });

  return captain;
}

/**
 * @name loginCaptainService
 * @description Authenticate captain by email and password
 * @returns {Promise<Object>} - Authenticated captain document
 */
async function loginCaptainService(email, password) {
  
    // Find captain and include password field
    const captain = await captainModel.findOne({ email }).select("+password");
  if (!captain) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await captain.comparePassword(password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  return captain;
}

export { createCaptainService, loginCaptainService };
