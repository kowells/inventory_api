# inventoryLog Api Spec

## Get all inventoryLogs

Endpoint : GET http://localhost:3000/inventoryLog

Expected Responses

Success (200) :

```json
{
  "success": true,
  "message": "Get all inventory logs success",
  "data": [
    {
      "id": 1,
      "item": { "id": 10, "name": "Laptop Pro" },
      "user": { "id": 5, "name": "John Doe" },
      "changeQuantity": 2,
      "beforeQuantity": 10,
      "afterQuantity": 8,
      "logDate": "2024-12-28T12:00:00Z"
    }
  ]
}
```

Error (500) :

```json
{
  "success": false,
  "message": "Failed to fetch logs"
}
```

## Get inventoryLog by ID

Endpoint : GET http://localhost:3000/inventoryLog/1

Expected Responses

Success (200) :

```json
{
  "success": true,
  "message": "Get inventory log by ID success",
  "data": {
    "id": 1,
    "item": { "id": 10, "name": "Laptop Pro" },
    "user": { "id": 5, "name": "John Doe" },
    "changeQuantity": 2,
    "beforeQuantity": 10,
    "afterQuantity": 8,
    "logDate": "2024-12-28T12:00:00Z"
  }
}
```

Error (404) :

```json
{
  "success": false,
  "message": "Inventory log not found",
  "data": null
}
```

Error (500) :

```json
{
  "success": false,
  "message": "Failed to fetch log"
}
```

## Create inventoryLog

Endpoint : POST http://localhost:3000/inventoryLog

Request Body :

```json
{
  "itemId": 10,
  "userId": 5,
  "changeQuantity": 2,
  "beforeQuantity": 10,
  "afterQuantity": 8
}
```

Expected Responses

Success (201) :

```json
{
  "success": true,
  "message": "Create inventory log success",
  "data": {
    "id": 2,
    "itemId": 10,
    "userId": 5,
    "changeQuantity": 2,
    "beforeQuantity": 10,
    "afterQuantity": 8,
    "logDate": "2024-12-28T12:00:00Z"
  }
}
```

Error (400 - Validation Error) :

```json
{
  "success": false,
  "message": [
    "itemId - Item ID is required",
    "changeQuantity - Must be a valid number"
  ]
}
```

Error (500) :

```json
{
  "success": false,
  "message": "Failed to create inventory logs"
}
```

## Delete inventoryLog

Endpoint : DELETE http://localhost:3000/inventoryLog/1

Expected Responses

Success (200) :

```json
{
  "success": true,
  "message": "Inventory log deleted successfully",
  "data": {
    "id": 1,
    "itemId": 10,
    "userId": 5,
    "changeQuantity": 2,
    "beforeQuantity": 10,
    "afterQuantity": 8,
    "logDate": "2024-12-28T12:00:00Z"
  }
}
```

Error (404) :

```json
{
  "success": false,
  "message": "Inventory log not found",
  "data": null
}
```

Error (500) :

```json
{
  "success": false,
  "message": "Failed to delete log"
}
```