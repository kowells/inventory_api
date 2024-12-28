# transaction Api Spec

## Get transactions

Endpoint : GET http://localhost:3000/transaction

Expected Responses

Success (200) :

```json
{
  "success": true,
  "message": "Get all transactions success",
  "data": [
    {
      "id": 1,
      "item": { "id": 10, "name": "Laptop Pro" },
      "user": { "id": 5, "name": "John Doe" },
      "transactionType": "OUT",
      "quantity": 2,
      "notes": "Urgent delivery",
      "transactionDate": "2024-12-28T12:00:00Z"
    }
  ]
}
```

Error (500) :

```json
{
  "success": false,
  "message": "Failed to fetch transactions"
}
```

## Get transaction by ID

Endpoint : GET http://localhost:3000/transaction/1

Expected Responses

Success (200) :

```json
{
  "success": true,
  "message": "Get transaction by ID success",
  "data": {
    "id": 1,
    "item": { "id": 10, "name": "Laptop Pro" },
    "user": { "id": 5, "name": "John Doe" },
    "transactionType": "OUT",
    "quantity": 2,
    "notes": "Urgent delivery",
    "transactionDate": "2024-12-28T12:00:00Z"
  }
}
```

Error (404) :

```json
{
  "success": false,
  "message": "transaction not found",
  "data": null
}
```

Error (500) :

```json
{
  "success": false,
  "message": "Failed to fetch transactions"
}
```

## Create transaction

Endpoint : POST http://localhost:3000/transaction

Request Body :

```json
{
  "itemId": 10,
  "userId": 5,
  "transactionType": "OUT",
  "quantity": 2,
  "notes": "Urgent delivery",
  "transactionDate": "2024-12-28T12:00:00Z"
}
````

Expected Responses

Success (201) :

```json
{
  "success": true,
  "message": "Create transaction success",
  "data": {
    "id": 2,
    "itemId": 10,
    "userId": 5,
    "transactionType": "OUT",
    "quantity": 2,
    "notes": "Urgent delivery",
    "transactionDate": "2024-12-28T12:00:00Z"
  }
}
```

Error (400 - Validation Error) :

```json
{
  "success": false,
  "message": [
    "itemId - Item ID is required",
    "quantity - Quantity must be a positive number"
  ]
}
```

Error (500) :

```json
{
  "success": false,
  "message": "Failed to create transaction"
}
```

## Update transaction

Endpoint : PUT http://localhost:3000/transaction/1

Request Body :

```json
{
  "quantity": 3,
  "notes": "Updated note"
}
```

Expected Responses

Success (200) :

```json
{
  "success": true,
  "message": "Update transaction success",
  "data": {
    "id": 1,
    "itemId": 10,
    "userId": 5,
    "transactionType": "OUT",
    "quantity": 3,
    "notes": "Updated note",
    "transactionDate": "2024-12-28T12:00:00Z"
  }
}
```

Error (404) :

```json
{
  "success": false,
  "message": "transaction not found",
  "data": null
}
```

Error (400 - Validation Error) :

```json
{
  "success": false,
  "message": ["quantity - Quantity must be a positive number"]
}
```

Error (500) :

```json
{
  "success": false,
  "message": "Failed to update transaction"
}
```

## Delete transaction

Endpoint : DELETE http://localhost:3000/transaction/1

Expected Responses

Success (200) :

```json
{
  "success": true,
  "message": "Transaction deleted successfully",
  "data": {
    "id": 1,
    "itemId": 10,
    "userId": 5,
    "transactionType": "OUT",
    "quantity": 3,
    "notes": "Updated note",
    "transactionDate": "2024-12-28T12:00:00Z"
  }
}
```

Error (404) :

```json
{
  "success": false,
  "message": "transaction not found",
  "data": null
}
```

Error (500) :

```json
{
  "success": false,
  "message": "Failed to delete transaction"
}
```
