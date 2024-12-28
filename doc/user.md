# User Api Spec

## Register USER

Endpoint : POST http://localhost:3000/users/register

Request Body :

```json
{
  "username": "admin",
  "password": "admin123",
  "role": "ADMIN"
}
```
Expected Responses

Success (201) :

```json
{
    "success": true,
    "message": "User created successfully",
    "data": {
        "id": 1,
        "username": "admin",
        "role": "ADMIN"
    }
}
```

Error (400 - Validation Error) :

```json
{
  "success": false,
  "message": "Validation errors",
  "data": ["path - error description"]
}
```

Error (400 - Username Exists) :

```json
{
  "success": false,
  "message": "Username is already taken. Please choose another username.",
  "data": null
}
```

## Login USER

Endpoint : POST http://localhost:3000/users/login

Request Body :

```json
{
  "username": "admin123",
  "password": "admin123"
}
```

Expected Responses

Success (200) :

```json
{
    "success": true,
    "message": "Login successful",
    "data": {
        "username": "admin123",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzM1MzQ1ODU2LCJleHAiOjE3MzUzNDk0NTZ9.wdqT_qDmUSpok8qp5KvI-FbvyWBWNrI8oQLm-0xusns",
        "role": "ADMIN"
    }
}
```

Error (401 - Invalid Credentials):

```json
{
  "success": false,
  "message": "Invalid username or password",
  "data": null
}
```

Error (400 - Validation Error):
```json
{
  "success": false,
  "message": "Validation errors",
  "data": ["path - error description"]
}
```

## Delete USER

Endpoint : DELETE http://localhost:3000/users/1

Expected Responses

Success (200) :

```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

Error (401 - Invalid ID):

```json
{
  "success": false,
  "message": "Invalid user ID",
  "data": null
}
```

Error (404 - User Not Found):
```json
{
  "success": false,
  "message": "User not found",
  "data": null
}
```