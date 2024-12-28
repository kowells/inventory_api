# Category Api Spec

## Get Categories

Endpoint : GET http://localhost:3000/category

Expected Responses

Success (200) :

```json
{
  "success": true,
  "message": "Get all categories success",
  "data": [
    { "id": 1, "name": "Category1" },
    { "id": 2, "name": "Category2" }
  ]
}
```

Error (500) :

```json
{
  "success": false,
  "message": "Failed to fetch categories"
}
```

## Get Category by ID

Endpoint : GET http://localhost:3000/category/1

Expected Responses

Success (200) :

```json
{
  "success": true,
  "message": "Get category by ID success",
  "data": { "id": 1, "name": "Category1" }
}
```

Error (404) :

```json
{
  "success": false,
  "message": "Category not found",
  "data": null
}
```

## Create Category

Endpoint : POST http://localhost:3000/category

Request Body :

```json
{
  "name": "NewCategory",
  "description": "NewDescription"
}
```
Expected Responses

Success (201) :

```json
{
  "success": true,
  "message": "Create category success",
  "data": { "id": 3, "name": "NewCategory" }
}
```

Error (400 - Validation Error) :

```json
{
  "success": false,
  "message": ["name - Name is required"],
  "data": null
}
```

Error (500) :

```json
{
  "success": false,
  "message": "Failed to create category"
}
```

## Update Category

Endpoint : PUT http://localhost:3000/category/1

Request Body :

```json
{
  "name": "UpdatedCategory",
  "description": "Barangnya mantab"
}
```
Expected Responses

Success (200) :

```json
{
  "success": true,
  "message": "Update category success",
  "data": { "id": 1, "name": "UpdatedCategory" }
}
```
Error (404) :

```json
{
  "success": false,
  "message": "Category not found",
  "data": null
}
```


Error (400 - Validation Error) :

```json
{
  "success": false,
  "message": ["name - Name is required"],
  "data": null
}
```

Error (500) :

```json
{
  "success": false,
  "message": "Failed to update category"
}
```

## Delete Category

Endpoint : DELETE http://localhost:3000/category/1

Expected Responses

Success (200) :

```json
{
  "success": true,
  "message": "Category deleted successfully",
  "data": { "id": 1, "name": "Category1" }
}
```
Error (404) :

```json
{
  "success": false,
  "message": "Category not found",
  "data": null
}
```

Error (500) :

```json
{
  "success": false,
  "message": "Failed to delete category"
}
```


