# item Api Spec

## Get all items

Endpoint : GET http://localhost:3000/item

Expected Responses

Success (200) :

```json
{
  "success": true,
  "message": "Get all items success",
  "data": [
    {
      "id": 1,
      "name": "Item A",
      "category": { "id": 1, "name": "Electronics" },
      "quantity": 100,
      "unit": "pcs",
      "purchasePrice": 5000,
      "sellingPrice": 6000,
      "supplier": { "id": 2, "name": "Supplier B" }
    }
  ],
  "meta": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "totalPages": 5
  }
}
```

Error (500) :

```json
{
  "success": false,
  "message": "Get all items failed"
}
```

## Get item filtered

Endpoint : GET http://localhost:3000/item?page=1&limit=10&search=laptop

Expected Responses

Success (200) :

```json
{
  "success": true,
  "message": "Get all items success",
  "data": [
    {
      "id": 1,
      "name": "Laptop geming",
      "category": { "id": 1, "name": "Electronics" },
      "quantity": 100,
      "unit": "pcs",
      "purchasePrice": 5000,
      "sellingPrice": 6000,
      "supplier": { "id": 2, "name": "Supplier B" }
    }
  ],
  "meta": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "totalPages": 5
  }
}
```

Error (500) :

```json
{
  "success": false,
  "message": "Get all items failed"
}
```

## Create item

Endpoint : POST http://localhost:3000/item

Request Body :

```json
{
  "name": "Item A",
  "categoryId": 1,
  "quantity": 100,
  "unit": "pcs",
  "purchasePrice": 5000,
  "sellingPrice": 6000,
  "supplierId": 2
}
```

Expected Responses

Success (201) :

```json
{
  "success": true,
  "message": "Create item success",
  "data": {
    "id": 1,
    "name": "Item A",
    "categoryId": 1,
    "quantity": 100,
    "unit": "pcs",
    "purchasePrice": 5000,
    "sellingPrice": 6000,
    "supplierId": 2
  }
}
```

Error (400 - Validation Error) :

```json
{
  "success": false,
  "message": ["quantity - Quantity must be greater than or equal to 0"],
  "data": null
}
```

Error (500) :

```json
{
  "success": false,
  "message": "Create item failed"
}
```

## Update item

Endpoint : PUT http://localhost:3000/item/1

Request Body :

```json
{
  "name": "Updated Item A",
  "quantity": 200
}
```

Expected Responses

Success (200) :

```json
{
  "success": true,
  "message": "Update item success",
  "data": {
    "id": 1,
    "name": "Updated Item A",
    "categoryId": 1,
    "quantity": 200,
    "unit": "pcs",
    "purchasePrice": 5000,
    "sellingPrice": 6000,
    "supplierId": 2
  }
}
```

Error (404) :

```json
{
  "success": false,
  "message": "item not found",
  "data": null
}
```

Error (400 - Validation Error) :

```json
{
  "success": false,
  "message": ["quantity - Quantity must be greater than or equal to 0"],
  "data": null
}
```

Error (500) :

```json
{
  "success": false,
  "message": "Update item failed"
}
```

## Delete item

Endpoint : GET http://localhost:3000/item/1

Expected Responses

Success (200) :

```json
{
  "success": true,
  "message": "Delete item success",
  "data": {
    "id": 1,
    "name": "Item A",
    "categoryId": 1,
    "quantity": 100,
    "unit": "pcs",
    "purchasePrice": 5000,
    "sellingPrice": 6000,
    "supplierId": 2
  }
}
```

Error (404) :

```json
{
  "success": false,
  "message": "Item not found"
}
```

Error (500) :

```json
{
  "success": false,
  "message": "Delete item failed"
}
```
