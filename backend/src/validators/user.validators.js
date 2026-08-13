import { body } from "express-validator";

// Validation for register
const registerValidation = [
    body('email')
        .isEmail()
        .withMessage('Invalid Email'),
    body('fullname.firstname')
        .isLength({ min: 3 })
        .withMessage('First name must be at least 3 characters long'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
];

// Validation for login
const loginValidation = [
    body('email')
        .isEmail()
        .withMessage('Invalid Email'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
];

export {
    registerValidation,
    loginValidation
};
