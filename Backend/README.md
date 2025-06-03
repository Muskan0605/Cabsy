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
If any of the validations fail (e.g., missing required fields, invalid email format, or string length requirements are not met), the endpoint returns a 400 status code with a JSON response containing an array of error messages.

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

Successful Response
201 Created:
On successful registration, the endpoint returns a 201 status code along with a JSON payload containing the user's authentication token and user object (excluding password).

Example response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    // user properties such as fullname and email
  }
}


Server Error
500 Internal Server Error:
In case of any unexpected errors on the server, a 500 status code will be returned.
