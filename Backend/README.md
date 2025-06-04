# /users/register Endpoint Documentation

## Description

The `/users/register` endpoint registers a new user in the system. It validates the provided data, hashes the password, creates a new user record, and generates a JWT token for authentication.

## Endpoint

- **Method:** POST
- **URL:** `/users/register`
- **Content-Type:** `application/json`

## Request Body Requirements

The endpoint expects a JSON body structured as follows:

```json
{
  "fullname": {
    "firstname": "John",  // required, minimum 3 characters
    "lastname": "Doe"     // optional, if provided, minimum 3 characters
  },
  "email": "john.doe@example.com",  // required, must be a valid email format
  "password": "secret123"           // required, minimum 6 characters
}

// 404 bad requests
// If any of the validations fail (e.g., missing required fields, invalid email format, or string length requirements are not met), the endpoint returns a 400 status code with a JSON response containing an array of error messages.

Example error response:
{
  "erros": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "First name must be 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    },
    {
      "msg": "Password should be atleast 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}

// Successful Response
// 201 Created:
// On successful registration, the endpoint returns a 201 status code along with a JSON payload containing the user's authentication token and user object (excluding password).

// Example response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    // user properties such as fullname and email
  }
}

// Server Error
// 500 Internal Server Error:
// In case of any unexpected errors on the server, a 500 status code will be returned.



## /users/login Endpoint Documentation

### Description

The `/users/login` endpoint is used to authenticate an existing user. It verifies the provided email and password, and if successful, it generates and returns a JWT token along with the user details.

### Endpoint Details

- **Method:** POST  
- **URL:** `/users/login`  
- **Content-Type:** `application/json`

### Request Body Requirements

The endpoint expects a JSON body structured as follows:

```json
{
  "email": "john.doe@example.com",  // required, must be a valid email format
  "password": "secret123"           // required, minimum 6 characters
}
// Response Status Codes
// 200 OK:
// Indicates that the authentication was successful. The response includes a JSON payload with the JWT token and the user details.

// Example response:

// - **400 Bad Request:**  
// If any validation (such as invalid email format or password length) fails, the endpoint returns a 400 status code with a JSON payload containing the validation errors.

// Example error response:

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password should be atleast 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}

// 401 Unauthorized:
// If the provided email does not exist or the password is incorrect, the endpoint returns a 401 status code with the following response:
{
  "message": "Invalid email or password"
}

// 500 Internal Server Error:
// For any unexpected server errors, a 500 status code is returned.

// profile//
## /users/profile Endpoint Documentation

### Description

The `/users/profile` endpoint retrieves the authenticated user's profile information. It relies on prior authentication to provide access, and returns the user's details stored in the system.

### Endpoint Details

- **Method:** GET  
- **URL:** `/users/profile`

### Authentication Requirements

This endpoint requires the user to be authenticated. The authentication token must be provided either:
- As a cookie named `token`, or
- In the `Authorization` header in the format: `Bearer <token>`

The authentication middleware (`authMiddleware.authUser`) validates the token and populates `req.user` with the user's information.

### Request Data

No request body or query parameters are required for this endpoint. All necessary data is obtained through the validated authentication token.

### Response Status Codes

- **200 OK:**  
  On successful authentication, the endpoint returns a 200 status code with the user's profile information in JSON format.
  
  Example response:

  ```json
  {
    // User's profile data, e.g.:
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    // additional user fields if any...
  }
  401 Unauthorized:
If the authentication token is missing or invalid, a 401 status code is returned.

500 Internal Server Error:
For any unexpected server errors, a 500 status code is returned.



//logout//
## /users/logout Endpoint Documentation

### Description

The `/users/logout` endpoint logs out an authenticated user. It clears the authentication cookie, blacklists the current JWT token, and ends the user session.

### Endpoint Details

- **Method:** GET  
- **URL:** `/users/logout`

### Authentication Requirements

This endpoint requires the user to be authenticated. The JWT token should be provided either as:
- A cookie named `token`  
- Or in the `Authorization` header in the format: `Bearer <token>`

### Response Status Codes

- **200 OK:**  
  On successful logout, the endpoint returns a 200 status code along with a JSON payload confirming the logout.

  Example response:

  ```json
  {
    "message": "Logged out"
  }
  401 Unauthorized:
If the user is not authenticated or the token is missing/invalid (handled by the auth middleware), a 401 status code is returned.

500 Internal Server Error:
In case of any unexpected server errors, a 500 status code will be returned.


//captain
## Captain Routes Documentation

### /captain/register Endpoint

#### Description

The `/captains/register` endpoint registers a new captain in the system. This endpoint validates the provided data, creates a new captain record with associated vehicle details, and (typically) returns a JWT token along with the captain’s data.

#### Endpoint Details

- **Method:** POST  
- **URL:** `/captain/register`  
- **Content-Type:** `application/json`

#### Request Body Requirements

The endpoint expects a JSON body with the following structure:

```json
{
  "fullname": {
    "firstname": "Alice",    // required, minimum 3 characters
    "lastname": "Smith"        // required, should be provided
  },
  "email": "alice.smith@example.com",   // required, must be a valid email format
  "password": "secret123",                // required, minimum 6 characters
  "vehicle": {
    "color": "Red",                       // required, minimum 3 characters
    "plate": "ABC123",                    // required, minimum 3 characters
    "capacity": 4,                        // required, an integer with a minimum value of 1
    "vehicleType": "car"                  // required, must be one of: 'car', 'motorcycle', 'auto'
  }
}
// Response Status Codes
// 201 Created:
// When a captain is successfully registered, the endpoint returns a 201 status code along with a JSON payload. The payload typically includes a JWT token and the newly created captain’s data.

- **400 Bad Request:**  
If any validation errors occur (for example, if required fields are missing or do not meet the specified criteria), the endpoint returns a 400 status code with a JSON payload describing the errors.

Example error response:

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "First name must be atleast 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    }
    // other validation errors...
  ]
}
// 500 Internal Server Error:
// In case of any unexpected issues on the server, a 500 status code is returned.