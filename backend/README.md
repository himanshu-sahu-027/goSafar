# Backend API Documentation

## `users/register` Endpoint

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

- `message` (String): User created successfully.
- `user` (object):
  - `fullname` (object).
    - `firstname` (string): User's first name (minimum 3 characters).
    - `lastname` (string): User's last name (minimum 3 characters).   
  - `email` (string): User's email address (must be a valid email).
  - `password` (string): User's password (minimum 6 characters).
- `token` (String): JWT Token

## `/users/login` Endpoint

### Description

Authenticates a user using their email and password, returning a JWT token upon successful login.

### HTTP Method

`POST`

### Request Body

The request body should be in JSON format and include the following fields:

- `email` (string, required): User's email address (must be a valid email).
- `password` (string, required): User's password (minimum 6 characters).

### Example Response

- `message` (String): User loggedin successfully.
- `user` (object):
  - `fullname` (object).
    - `firstname` (string): User's first name (minimum 3 characters).
    - `lastname` (string): User's last name (minimum 3 characters).   
  - `email` (string): User's email address (must be a valid email).
  - `password` (string): User's password (minimum 6 characters).
- `token` (String): JWT Token

## `/users/profile` Endpoint

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



## `/users/logout` Endpoint

### Description

Logout the current user and blacklist the token provided in cookie or headers

### HTTP Method

`POST`

### Authentication

Requires a valid JWT token in the Authorization header or cookie:

- `user` (object):
  - `fullname` (object).
    - `firstname` (string): User's first name (minimum 3 characters).
    - `lastname` (string): User's last name (minimum 3 characters).   
  - `email` (string): User's email address (must be a valid email).
  - `password` (string): User's password (minimum 6 characters).
- `token` (String): JWT Token

### Example Response

- `message` (String) : User logged out successfully.


## `/captains/register` Endpoint

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
  - `password` (string): Captain's password (minimum 6 characters).
  - `vehicle` (object):
    - `color` (string): Vehicle color.
    - `plate` (string): Vehicle plate number.
    - `capacity` (number): Vehicle passenger capacity.
    - `vehicleType` (string): Type of vehicle.
- `token` (String): JWT Token

## `/captains/login` Endpoint

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
  - `password` (string): Captain's password (minimum 6 characters).
  - `vehicle` (object):
    - `color` (string): Vehicle color.
    - `plate` (string): Vehicle plate number.
    - `capacity` (number): Vehicle passenger capacity.
    - `vehicleType` (string): Type of vehicle.
- `token` (String): JWT Token

## `/captains/profile` Endpoint

### Description

Retrieves the profile information of the currently authenticated captain.

### HTTP Method

`GET`

### Authentication

Requires a valid JWT token in the Authorization header - 
`Authorization: Bearer <token>`  or cookie:

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

## `/captains/logout` Endpoint

### Description

Logout the current captain and blacklist the token provided in cookie or headers :

### HTTP Method

`POST`

### Authentication

Requires a valid JWT token in the Authorization header or cookie:

### Example Response

- `message` (string): Captain logged out successfully.

## `/users/history` Endpoint

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
  - `paymentStatus` (string): Payment status such as `pending`, `paid`, or `failed`.
  - `captain` (object): Captain details if assigned.
  - `updatedAt` (string): Last update time.

## `/captains/history` Endpoint

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
  - `paymentStatus` (string): Payment status.
  - `user` (object): User information for the ride.
  - `updatedAt` (string): Last update time.

## `/maps/getCoordinates` Endpoint

### Description

Fetches the latitude and longitude of a given address using the external geocoding service.

### HTTP Method

`GET`

### Authentication

This route is currently defined without an auth middleware in the backend route file.

### Request Query Parameters

- `address` (string, required): Address to convert into coordinates.

### Example Response

- `success` (boolean): Indicates operation success.
- `data` (object):
  - `latitude` (number): Latitude value.
  - `longitude` (number): Longitude value.

## `/maps/getDistanceTime` Endpoint

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

## `/maps/getSuggestions` Endpoint

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

## `/rides/createRide` Endpoint

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

## `/rides/getFare` Endpoint

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

## `/rides/confirmRide` Endpoint

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

## `/rides/startRide` Endpoint

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

## `/rides/endRide` Endpoint

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
  - `paymentStatus` (string): Payment status if already set.

## `/rides/create-payment-order` Endpoint

### Description

Creates a Razorpay payment order for a completed ride and returns the public key and order details required to open the checkout.

### HTTP Method

`POST`

### Authentication

Requires a valid JWT token for the authenticated user in the Authorization header - 
`Authorization: Bearer <token>` or cookie:

### Request Body

The request body should be in JSON format and include the following fields:

- `rideId` (string, required): ID of the completed ride that needs to be paid.

### Example Response

- `orderId` (string): Razorpay order ID.
- `amount` (number): Amount in paise.
- `currency` (string): Currency code, usually `INR`.
- `key` (string): Razorpay key ID.

### Relevant Error Response

- `400` with `message`: Ride not found / Ride is not completed yet / Ride already paid / Invalid ride id.

## `/rides/verify-payment` Endpoint

### Description

Verifies the Razorpay payment signature sent from the frontend and marks the ride as paid if valid.

### HTTP Method

`POST`

### Authentication

Requires a valid JWT token for the authenticated user in the Authorization header - 
`Authorization: Bearer <token>` or cookie:

### Request Body

The request body should be in JSON format and include the following fields:

- `rideId` (string, required): Ride ID.
- `orderId` (string, required): Razorpay order ID.
- `paymentId` (string, required): Razorpay payment ID.
- `signature` (string, required): Razorpay signature returned in the payment response.

### Example Response

- `message` (string): Payment verified successfully.
- `payment` (object):
  - `rideId` (string): Ride ID.
  - `paymentStatus` (string): `paid`.
  - `amount` (number): Ride fare.
  - `paymentID` (string): Razorpay payment ID.

### Relevant Error Response

- `400` with `message`: Payment details are incomplete / Invalid payment signature / Invalid payment response / Payment could not be completed.

## `/` Endpoint

### Description

Returns a simple server status response for the backend root path.

### HTTP Method

`GET`

### Authentication

No authentication required.

### Example Response

- `Hello world`