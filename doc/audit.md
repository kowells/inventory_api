# audit Api Spec

## Get audits

Endpoint : GET http://localhost:3000/audit

Expected Responses

Success (200) :

```json
{
  "success": true,
  "message": "Get all audits success",
  "data": [
    {
      "id": 1,
      "item": { "id": 10, "name": "Laptop Pro" },
      "user": { "id": 5, "name": "John Doe" },
      "expectedQuantity": 50,
      "actualQuantity": 48,
      "difference": -2,
      "auditDate": "2024-12-28T12:00:00Z",
      "notes": "Stock discrepancy"
    }
  ]
}
```

Error (500) :

```json
{
  "success": false,
  "message": "Failed to fetch audits"
}
```

## Get audit by ID

Endpoint : GET http://localhost:3000/audit/1

Expected Responses

Success (200) :

```json
{
  "success": true,
  "message": "Get audit by ID success",
  "data": {
    "id": 1,
    "item": { "id": 10, "name": "Laptop Pro" },
    "user": { "id": 5, "name": "John Doe" },
    "expectedQuantity": 50,
    "actualQuantity": 48,
    "difference": -2,
    "auditDate": "2024-12-28T12:00:00Z",
    "notes": "Stock discrepancy"
  }
}
```

Error (404) :

```json
{
  "success": false,
  "message": "audit not found",
  "data": null
}
```

Error (500) :

```json
{
  "success": false,
  "message": "Failed to fetch audits"
}
```

## Create audit

Endpoint : POST http://localhost:3000/audit

Request Body :

```json
{
  "itemId": 10,
  "userId": 5,
  "expectedQuantity": 50,
  "actualQuantity": 48,
  "difference": -2,
  "auditDate": "2024-12-28T12:00:00Z",
  "notes": "Stock discrepancy"
}
```
Expected Responses

Success (201) :

```json
{
  "success": true,
  "message": "Create audit success",
  "data": {
    "id": 2,
    "itemId": 10,
    "userId": 5,
    "expectedQuantity": 50,
    "actualQuantity": 48,
    "difference": -2,
    "auditDate": "2024-12-28T12:00:00Z",
    "notes": "Stock discrepancy"
  }
}
```

Error (400 - Validation Error) :

```json
{
  "success": false,
  "message": ["expectedQuantity - Expected quantity is required", "difference - Must be a valid number"],
  "data": null
}
```

Error (500) :

```json
{
  "success": false,
  "message": "Failed to create audit"
}
```

## Delete audit

Endpoint : DELETE http://localhost:3000/audit/1

Expected Responses

Success (200) :

```json
{
  "success": true,
  "message": "Audit deleted successfully",
  "data": {
    "id": 1,
    "itemId": 10,
    "userId": 5,
    "expectedQuantity": 50,
    "actualQuantity": 48,
    "difference": -2,
    "auditDate": "2024-12-28T12:00:00Z",
    "notes": "Stock discrepancy"
  }
}
```
Error (404) :

```json
{
  "success": false,
  "message": "audit not found",
  "data": null
}
```

Error (500) :

```json
{
  "success": false,
  "message": "Failed to delete audit"
}
```


