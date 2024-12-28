# Supplier Api Spec

## Get Suppliers

Endpoint : GET http://localhost:3000/supplier

Expected Responses

Success (200) :

```json
{
  "success": true,
  "message": "Get all suppliers success",
  "data": [
    {
      "id": 1,
      "name": "Supplier A",
      "contactPerson": "JOKOWI",
      "phone": "1234567890",
      "address": "Sleman ngetan sitik"
    }
  ]
}
```

Error (500) :

```json
{
  "success": false,
  "message": "Failed to fetch Suppliers"
}
```

## Get Supplier by ID

Endpoint : GET http://localhost:3000/supplier/1

Expected Responses

Success (200) :

```json
{
  "success": true,
  "message": "Get supplier by ID success",
  "data": {
    "id": 1,
    "name": "Supplier A",
    "contactPerson": "JOKOWI",
    "phone": "1234567890",
    "address": "Sleman ngetan sitik"
  }
}
```

Error (404) :

```json
{
  "success": false,
  "message": "Supplier not found"
}
```

Error (500) :

```json
{
  "success": false,
  "message": "Failed to fetch supplier"
}
```

## Create Supplier

Endpoint : POST http://localhost:3000/supplier

Request Body :

```json
{
  "name": "Supplier A",
  "contactPerson": "JOKOWI",
  "phone": "1234567890",
  "address": "Sleman ngetan sitik"
}
```

Expected Responses

Success (201) :

```json
{
  "success": true,
  "message": "Create supplier success",
  "data": {
    "name": "Supplier A",
    "contactPerson": "JOKOWI",
    "phone": "1234567890",
    "address": "Sleman ngetan sitik"
  }
}
```

Error (400 - Validation Error) :

```json
{
  "success": false,
  "message": ["name - Name must be at least 3 characters long"]
}
```

Error (500) :

```json
{
  "success": false,
  "message": "Failed to create Supplier"
}
```

## Update Supplier

Endpoint : PUT http://localhost:3000/supplier

Request Body :

```json
{
  "name": "Updated Supplier A",
  "phone": "9876543210"
}
```

Expected Responses

Success (200) :

```json
{
  "success": true,
  "message": "Update supplier success",
  "data": {
    "id": 1,
    "name": "Updated Supplier A",
    "contactPerson": "JOKOWI",
    "phone": "9876543210",
    "address": "Sleman ngetan sitik"
  }
}
```

Error (404) :

```json
{
  "success": false,
  "message": "Supplier not found",
  "data": null
}
```

Error (400 - Validation Error) :

```json
{
  "success": false,
  "message": ["phone - Invalid phone format"]
}
```

Error (500) :

```json
{
  "success": false,
  "message": "Failed to update Supplier"
}
```

## Delete Supplier

Endpoint : DELETE http://localhost:3000/supplier/1

Expected Responses

Success (200) :

```json
{
  "success": true,
  "message": "Supplier deleted successfully",
  "data": {
    "id": 1,
    "name": "Supplier A",
    "contactPerson": "JOKOWI",
    "phone": "1234567890",
    "address": "Sleman ngetan sitik"
  }
}
```

Error (404) :

```json
{
  "success": false,
  "message": "Supplier not found",
  "data": null
}
```

Error (500) :

```json
{
  "success": false,
  "message": "Failed to delete Supplier"
}
```
