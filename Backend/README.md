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

