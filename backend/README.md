# Backend API Documentation

# 🟢 User APIs

These endpoints handle user authentication, including traditional registration, login, Google Sign-In, profile management, logout, and ride history.

## 🟢 `/users/register`      End Point

### Description

Registers a new user by creating a user account with the provided information.

### HTTP Method

`POST`

### Request Body

The request body should be in JSON format and include the following fields:

- `fullname` (object):
  - `firstname` (string, required): User's first name (minimum 3 characters).
  - `lastname` (string, optional): User's last name (minimum 3 characters).
- `email` (string, required): User's email address (must be a valid email).
- `password` (string, required): User's password (minimum 6 characters).

### Example Response

- `message` (String): `User created successfully`.
- `user` (object):
  - `fullname` (object).
    - `firstname` (string): User's first name (minimum 3 characters).
    - `lastname` (string): User's last name (minimum 3 characters).
  - `email` (string): User's email address (must be a valid email).
- `token` (String): JWT Token

## 🟢 `/users/login`      End Point

### Description

Authenticates a user using their email and password, returning a JWT token upon successful login.

### HTTP Method

`POST`

### Request Body

The request body should be in JSON format and include the following fields:

- `email` (string, required): User's email address (must be a valid email).
- `password` (string, required): User's password (minimum 6 characters).

### Example Response

- `message` (String): `User logged in successfully`.
- `user` (object):
  - `fullname` (object).
    - `firstname` (string): User's first name (minimum 3 characters).
    - `lastname` (string): User's last name (minimum 3 characters).
  - `email` (string): User's email address (must be a valid email).
- `token` (String): JWT Token

## 🟢 `/users/google`      End Point

### Description

Signs in an existing user or creates a new user using a verified Google ID token. If the Google email already belongs to a GoSafar user, the verified Google account is linked to that user.

### HTTP Method

`POST`

### Authentication

No authentication required. The Google ID token is verified by the backend before the user is authenticated.

### Request Body

The request body should be in JSON format and include the following fields:

- `idToken` (string, required): Google ID token received from the frontend.

### Example Response

- `message` (String): `User signed in successfully`.
- `user` (object): Existing or newly created GoSafar user.
  - `googleId` (string): Verified Google account ID.
  - `fullname` (object).
    - `firstname` (string): User's first name from the verified Google account.
    - `lastname` (string): User's last name from the verified Google account.
  - `email` (string): User's verified Google email address.
- `token` (String): JWT Token

### Relevant Error Response

- `401` with `message`: `Google ID token is required` or `Invalid Google authentication`.

## 🟢 `/users/profile`      End Point

### Description

Retrieves the profile information of the currently authenticated user.

### HTTP Method

`GET`

### Authentication

Requires a valid JWT token in the Authorization header -
`Authorization: Bearer <token>` or cookie:

### Example Response

- `user` (object):
  - `fullname` (object).
    - `firstname` (string): User's first name (minimum 3 characters).
    - `lastname` (string): User's last name (minimum 3 characters).
  - `email` (string): User's email address (must be a valid email).

## 🟢 `/users/logout`      End Point

### Description

Logout the current user and blacklist the token provided in cookie or headers

### HTTP Method

`POST`

### Authentication

Requires a valid JWT token in the Authorization header -
`Authorization: Bearer <token>` or cookie:

### Example Response

- `message` (String) : User logged out successfully.




## 🟢 `/users/history`      End Point

### Description

Retrieves the ride history of the currently authenticated user.

### HTTP Method

`GET`

### Authentication

Requires a valid JWT token in the Authorization header -
`Authorization: Bearer <token>` or cookie:

### Example Response

- `rides` (array): List of ride records belonging to the authenticated user.
  - `_id` (string): Ride ID.
  - `pickup` (string): Pickup address.
  - `destination` (string): Destination address.
  - `fare` (number): Ride fare.
  - `status` (string): Ride status such as `pending`, `accepted`, `ongoing`, `completed`, or `cancelled`.
  - `captain` (object): Captain details if assigned.
  - `payment` (object): Separate payment record if available.
    - `status` (string): Payment status such as `pending`, `paid`, or `failed`.
    - `razorpayPaymentId` (string): Razorpay payment ID, if available.
    - `paidAt` (string): Payment completion time, if paid.
  - `updatedAt` (string): Last update time.



---

# 🔴 Captain APIs

These endpoints handle captain authentication, including traditional registration, login, Google Sign-In, vehicle registration completion, profile management, logout, and ride history.

## 🔴 `/captains/register`      End Point

### Description

Registers a new captain by creating a captain account with the provided information.

### HTTP Method

`POST`

### Request Body

The request body should be in JSON format and include the following fields:

- `fullname` (object):
  - `firstname` (string, required): Captain's first name (minimum 3 characters)
  - `lastname` (string, optional): Captain's last name
- `email` (string, required): Captain's email address (must be a valid email)
- `password` (string, required): Captain's password (minimum 6 characters)
- `vehicle` (object):
  - `color` (string, required): Vehicle color (minimum 3 characters)
  - `plate` (string, required): Vehicle plate number (minimum 3 characters)
  - `capacity` (number, required): Vehicle passenger capacity (minimum 1)
  - `vehicleType` (string, required): Type of vehicle (must be 'car', 'moto', or 'auto')

### Example Response

- `message` (String) : Captain registered successfully.
- `captain` (object):
  - `fullname` (object).
    - `firstname` (string): Captain's first name (minimum 3 characters).
    - `lastname` (string): Captain's last name (minimum 3 characters).
  - `email` (string): Captain's email address (must be a valid email).
  - `vehicle` (object):
    - `color` (string): Vehicle color.
    - `plate` (string): Vehicle plate number.
    - `capacity` (number): Vehicle passenger capacity.
    - `vehicleType` (string): Type of vehicle.
- `token` (String): JWT Token

## 🔴 `/captains/login`      End Point

### Description

Authenticates a captain using their email and password, returning a JWT token upon successful login.

### HTTP Method

`POST`

### Endpoint

`/captains/login`

### Request Body

The request body should be in JSON format and include the following fields:

- `email` (string, required): Captain's email address (must be a valid email).
- `password` (string, required): Captain's password (minimum 6 characters).

### Example Response

- `message` (String) : Captain logged in successfully.
- `captain` (object):
  - `fullname` (object).
    - `firstname` (string): Captain's first name (minimum 3 characters).
    - `lastname` (string): Captain's last name (minimum 3 characters).
  - `email` (string): Captain's email address (must be a valid email).
  - `vehicle` (object):
    - `color` (string): Vehicle color.
    - `plate` (string): Vehicle plate number.
    - `capacity` (number): Vehicle passenger capacity.
    - `vehicleType` (string): Type of vehicle.
- `token` (String): JWT Token

## 🔴 `/captains/google`      End Point

### Description

Signs in an existing captain using a verified Google ID token or starts registration for a new captain. If the Google email already belongs to a GoSafar captain, the verified Google account is linked to that captain.

### HTTP Method

`POST`

### Authentication

No authentication required. The Google ID token is verified by the backend before an existing captain is authenticated or registration is started.

### Request Body

The request body should be in JSON format and include the following fields:

- `idToken` (string, required): Google ID token received from the frontend.

### Example Response

For an existing captain:

- `message` (String): `Captain logged in successfully`.
- `captain` (object): Authenticated captain.
  - `googleId` (string): Verified Google account ID.
  - `fullname` (object).
    - `firstname` (string): Captain's first name.
    - `lastname` (string): Captain's last name.
  - `email` (string): Captain's verified Google email address.
  - `vehicle` (object): Captain's vehicle details.
    - `color` (string): Vehicle color.
    - `plate` (string): Vehicle plate number.
    - `capacity` (number): Vehicle passenger capacity.
    - `vehicleType` (string): Type of vehicle: `car`, `moto`, or `auto`.
- `token` (String): JWT Token

For a new captain who must complete vehicle registration:

- `message` (String): `Complete captain registration`.
- `registrationRequired` (boolean): Indicates that vehicle registration is required.
- `registrationToken` (String): Short-lived token containing the verified Google identity information.

### Relevant Error Response

- `401` with `message`: `Google ID token is required` or `Invalid Google authentication`.

## 🔴 `/captains/google/completeRegistration`      End Point

### Description

Completes registration for a new captain after Google authentication by adding the required vehicle information. The Google identity information is taken from the signed registration token rather than from frontend-supplied identity fields.

### HTTP Method

`POST`

### Authentication

No authentication required. This endpoint accepts the short-lived registration token because the captain does not have a normal GoSafar JWT yet.

### Request Body

The request body should be in JSON format and include the following fields:

- `registrationToken` (string, required): Short-lived Google captain registration token returned by `/captains/google`.
- `vehicle` (object, required): Captain's vehicle information.
  - `color` (string, required): Vehicle color (minimum 3 characters).
  - `plate` (string, required): Vehicle plate number (minimum 3 characters).
  - `capacity` (number, required): Vehicle passenger capacity (minimum 1).
  - `vehicleType` (string, required): Type of vehicle (must be `car`, `moto`, or `auto`).

### Example Response

- `message` (String): `Captain registered successfully`.
- `captain` (object): Newly created captain.
  - `googleId` (string): Verified Google account ID from the registration token.
  - `fullname` (object).
    - `firstname` (string): Captain's first name from the registration token.
    - `lastname` (string): Captain's last name from the registration token.
  - `email` (string): Captain's email address from the registration token.
  - `vehicle` (object): Captain's vehicle details.
    - `color` (string): Vehicle color.
    - `plate` (string): Vehicle plate number.
    - `capacity` (number): Vehicle passenger capacity.
    - `vehicleType` (string): Type of vehicle: `car`, `moto`, or `auto`.
- `token` (String): JWT Token

### Relevant Error Response

- `400` with `message`: `Registration token is required`, `All vehicle fields are required`, `Invalid or expired registration token`, `Invalid captain registration token`, or `Captain already exists`.
## 🔴 `/captains/profile`      End Point

### Description

Retrieves the profile information of the currently authenticated captain.

### HTTP Method

`GET`

### Authentication

Requires a valid JWT token in the Authorization header -
`Authorization: Bearer <token>` or cookie:

### Example Response

- `captain` (object):
  - `fullname` (object).
    - `firstname` (string): Captain's first name (minimum 3 characters).
    - `lastname` (string): Captain's last name (minimum 3 characters).
  - `email` (string): Captain's email address (must be a valid email).
  - `vehicle` (object):
    - `color` (string): Vehicle color.
    - `plate` (string): Vehicle plate number.
    - `capacity` (number): Vehicle passenger capacity.
    - `vehicleType` (string): Type of vehicle.

## 🔴 `/captains/logout`      End Point

### Description

Logout the current captain and blacklist the token provided in cookie or headers :

### HTTP Method

`POST`

### Authentication

Requires a valid JWT token in the Authorization header or cookie:

### Example Response

- `message` (string): Captain logged out successfully.

## 🔴 `/captains/history`      End Point

### Description

Retrieves the completed ride history of the currently authenticated captain.

### HTTP Method

`GET`

### Authentication

Requires a valid JWT token in the Authorization header -
`Authorization: Bearer <token>` or cookie:

### Example Response

- `rides` (array): List of completed rides assigned to the authenticated captain.
  - `_id` (string): Ride ID.
  - `pickup` (string): Pickup address.
  - `destination` (string): Destination address.
  - `fare` (number): Ride fare.
  - `status` (string): Ride status.
  - `user` (object): User information for the ride.
  - `payment` (object): Separate payment record if available.
    - `status` (string): Payment status such as `pending`, `paid`, or `failed`.
    - `razorpayPaymentId` (string): Razorpay payment ID, if available.
    - `paidAt` (string): Payment completion time, if paid.
  - `updatedAt` (string): Last update time.

---

# 🔵 Map APIs

These endpoints provide address geocoding, autocomplete suggestions, and route distance and duration data used during ride booking.

## 🔵 `/maps/getCoordinates`      End Point

### Description

Fetches the latitude and longitude of a given address using the external geocoding service.

### HTTP Method

`GET`

### Authentication

This route is defined without an auth middleware in the backend route file.

### Request Query Parameters

- `address` (string, required): Address to convert into coordinates.

### Example Response

- `success` (boolean): Indicates operation success.
- `data` (object):
  - `latitude` (number): Latitude value.
  - `longitude` (number): Longitude value.

## 🔵 `/maps/getDistanceTime`      End Point

### Description

Calculates the driving distance and estimated duration between an origin and destination.

### HTTP Method

`GET`

### Authentication

Requires a valid JWT token in the Authorization header -
`Authorization: Bearer <token>` or cookie:

### Request Query Parameters

- `origin` (string, required): Origin address.
- `destination` (string, required): Destination address.

### Example Response

- `success` (boolean): Indicates operation success.
- `data` (object):
  - `distance` (number): Distance in kilometers.
  - `duration` (number): Estimated time in minutes.

## 🔵 `/maps/getSuggestions`      End Point

### Description

Returns location search suggestions for a text input value.

### HTTP Method

`GET`

### Authentication

Requires a valid JWT token in the Authorization header -
`Authorization: Bearer <token>` or cookie:

### Request Query Parameters

- `input` (string, required): Search text used for autocomplete.

### Example Response

- `success` (boolean): Indicates operation success.
- `data` (array): Suggestion objects.
  - `name` (string): Suggested place label.
  - `coordinates` (object):
    - `longitude` (number): Longitude value.
    - `latitude` (number): Latitude value.

---

# 🟣 Ride APIs

These endpoints manage the ride lifecycle from fare estimation and ride creation through captain acceptance, OTP-based ride start, and ride completion.

## 🟣 `/rides/createRide`      End Point

### Description

Creates a new ride request for the authenticated user.

### HTTP Method

`POST`

### Authentication

Requires a valid JWT token in the Authorization header -
`Authorization: Bearer <token>` or cookie:

### Request Body

The request body should be in JSON format and include the following fields:

- `pickup` (string, required): Pickup address.
- `destination` (string, required): Destination address.
- `vehicleType` (string, required): Vehicle type. Allowed values are `auto`, `car`, or `moto`.

### Example Response

- `_id` (string): Ride ID.
- `pickup` (string): Pickup address.
- `destination` (string): Destination address.
- `fare` (number): Estimated fare in rupees.
- `status` (string): Ride status, initially `pending`.
- `otp` (string): One-time password generated for the ride.

## 🟣 `/rides/getFare`      End Point

### Description

Calculates the estimated ride fare between the pickup and destination addresses.

### HTTP Method

`GET`

### Authentication

Requires a valid JWT token in the Authorization header -
`Authorization: Bearer <token>` or cookie:

### Request Query Parameters

- `pickup` (string, required): Pickup address.
- `destination` (string, required): Destination address.

### Example Response

- `fare` (object): Fare estimates by vehicle type.
  - `auto` (number): Fare for auto.
  - `car` (number): Fare for car.
  - `moto` (number): Fare for moto.
- `distance` (number): Route distance in kilometers.
- `duration` (number): Route duration in minutes.

## 🟣 `/rides/confirmRide`      End Point

### Description

Lets a captain accept a ride request.

### HTTP Method

`POST`

### Authentication

Requires a valid JWT token for a captain in the Authorization header -
`Authorization: Bearer <token>` or cookie:

### Request Body

The request body should be in JSON format and include the following fields:

- `rideId` (string, required): ID of the ride being confirmed.

### Example Response

- `ride` object with the updated ride fields.
  - `_id` (string): Ride ID.
  - `status` (string): Updated status, usually `accepted`.
  - `captain` (object): Captain details.
  - `user` (object): User details.
  - `pickup` (string): Pickup address.
  - `destination` (string): Destination address.
  - `fare` (number): Ride fare.

## 🟣 `/rides/startRide`      End Point

### Description

Starts a ride after OTP verification by the captain.

### HTTP Method

`POST`

### Authentication

Requires a valid JWT token for a captain in the Authorization header -
`Authorization: Bearer <token>` or cookie:

### Request Body

The request body should be in JSON format and include the following fields:

- `rideId` (string, required): ID of the ride to be started.
- `otp` (string, required): 6-digit OTP generated for the ride.

### Example Response

- `ride` object with the updated ride fields.
  - `_id` (string): Ride ID.
  - `status` (string): Updated status, usually `ongoing`.
  - `otp` (string): OTP is kept in the server response for the user-facing ride payload.

## 🟣 `/rides/endRide`      End Point

### Description

Marks a currently ongoing ride as completed.

### HTTP Method

`POST`

### Authentication

Requires a valid JWT token for a captain in the Authorization header -
`Authorization: Bearer <token>` or cookie:

### Request Body

The request body should be in JSON format and include the following fields:

- `rideId` (string, required): ID of the ride being completed.

### Example Response

- `ride` object with the updated ride fields.
  - `_id` (string): Ride ID.
  - `status` (string): Updated status, usually `completed`.

---

# 🟠 Payment APIs

These endpoints handle Razorpay order creation and backend payment verification for completed rides. Payment records are maintained separately from the Ride model.

## 🟠 `/payments/createPaymentOrder`      End Point

### Description

Creates or reuses a Razorpay payment order for a completed ride owned by the authenticated user.

### HTTP Method

`POST`

### Authentication

Requires a valid JWT token in the Authorization header -
`Authorization: Bearer <token>` or cookie:

### Request Body

The request body should be in JSON format and include the following fields:

- `rideId` (string, required): MongoDB ID of the completed ride to pay for.

### Example Response

- `orderId` (string): Razorpay order ID.
- `amount` (number): Amount in paise.
- `currency` (string): `INR`.
- `key` (string): Razorpay key ID for Checkout.

### Relevant Error Response

- `400` with `message`: `Invalid ride id`, `Ride not found`, `Ride is not completed yet`, `Ride already paid`, or `Invalid ride fare`.

## 🟠 `/payments/verifyPayment`      End Point

### Description

Verifies the Razorpay payment details for a completed ride and updates its separate Payment record to `paid` when verification succeeds.

### HTTP Method

`POST`

### Authentication

Requires a valid JWT token in the Authorization header -
`Authorization: Bearer <token>` or cookie:

### Request Body

The request body should be in JSON format and include the following fields:

- `rideId` (string, required): MongoDB ID of the completed ride.
- `orderId` (string, required): Razorpay order ID returned by Checkout.
- `paymentId` (string, required): Razorpay payment ID returned by Checkout.
- `signature` (string, required): Razorpay signature returned by Checkout.

### Example Response

- `message` (string): `Payment verified successfully`.
- `payment` (object): Verified payment summary.
  - `rideId` (string): Ride ID.
  - `paymentStatus` (string): `paid`.
  - `amount` (number): Payment amount in rupees.
  - `paymentId` (string): Razorpay payment ID.

### Relevant Error Response

- `400` with `message`: `Payment details are incomplete`, `Ride not found`, `Ride is not completed`, `Payment record not found`, `Ride already paid`, `Invalid payment order`, `Invalid payment signature`, `Invalid payment response`, or `Payment amount mismatch`.

---

# ⚪ System / Health API

Provides a basic backend health/status endpoint.

## ⚪ `/`      End Point

### Description

Returns a simple server status response for the backend root path.

### HTTP Method

`GET`

### Authentication

No authentication required.

### Example Response

- `Health check ok`














