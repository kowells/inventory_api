# location Api Spec

## Get locations

Endpoint : GET http://localhost:3000/location

Expected Responses

Success (200) :

```json
{
  "success": true,
  "message": "Get all locations success",
  "data": [
    { "id": 1, "name": "Warehouse A", "address": "Street 1, City" },
    { "id": 2, "name": "Warehouse B", "address": "Street 2, City" }
  ]
}
```

Error (500) :

```json
{
  "success": false,
  "message": "Failed to fetch locations"
}
```

## Get location by ID

Endpoint : GET http://localhost:3000/location/1

Expected Responses

Success (200) :

```json
{
  "success": true,
  "message": "Get location by ID success",
  "data": { "id": 1, "name": "Warehouse A", "address": "Street 1, City" }
}
```

Error (404) :

```json
{
  "success": false,
  "message": "location not found",
  "data": null
}
```

Error (500) :

```json
{
  "success": false,
  "message": "Failed to fetch locations"
}
```

## Create location

Endpoint : POST http://localhost:3000/location

Request Body :

```json
{
  "name": "New Warehouse",
  "address": "New Street, New City"
}

```
Expected Responses

Success (201) :

```json
{
  "success": true,
  "message": "Create location success",
  "data": { "id": 3, "name": "New Warehouse", "address": "New Street, New City" }
}
```

Error (400 - Validation Error) :

```json
{
  "success": false,
  "message": ["name - Name is required", "address - Address must be a string"],
  "data": null
}
```

Error (500) :

```json
{
  "success": false,
  "message": "Failed to create location"
}
```

## Update location

Endpoint : PUT http://localhost:3000/location/1

Request Body :

```json
{
  "name": "Updated Warehouse",
  "address": "Updated Street, Updated City"
}
```
Expected Responses

Success (200) :

```json
{
  "success": true,
  "message": "Update location success",
  "data": { "id": 1, "name": "Updated Warehouse", "address": "Updated Street, Updated City" }
}
```
Error (404) :

```json
{
  "success": false,
  "message": "location not found",
  "data": null
}
```


Error (400 - Validation Error) :

```json
{
  "success": false,
  "message": ["address - Address must be a string"],
  "data": null
}
```

Error (500) :

```json
{
  "success": false,
  "message": "Failed to update location"
}
```

## Delete location

Endpoint : DELETE http://localhost:3000/location/1

Expected Responses

Success (200) :

```json
{
  "success": true,
  "message": "Location deleted successfully",
  "data": { "id": 1, "name": "Warehouse A", "address": "Street 1, City" }
}
```
Error (404) :

```json
{
  "success": false,
  "message": "location not found",
  "data": null
}
```

Error (500) :

```json
{
  "success": false,
  "message": "Failed to delete location"
}
```


