# API Reference

Note that all paths are prefixed by `/api` (e.g. call `/api/users` instead of `/users`).

## Users controller

### GET /users

Get current (logged-in) user

- Must be authenticated

Response:
```json
{
    "firstname": string,
    "lastname": string,
    "email": string,
}
```

### POST /users

Create user

Request:
```json
{
    "email": string,
    "firstName": string,
    "lastName": string,
    "password": string
}
```

Response:
```json
{
    "firstName": string,
    "lastName": string,
    "email": string
}
```

## Sessions controller

### POST /sessions/login

Log in

Request:
```json
{
    "email": string,
    "password": string
}
```

Stores auth cookie

### POST /sessions/logout

- Must be authenticated

No request body.

Removes session and logs out.

## Households controller

### GET /households

Gets logged-in user's household

- Must be authenticated

Response:
```json
{
    "id": integer,
    "name": string,
    "createdAt": datetime,
    "updatedAt": datetime,
    "Users": [
        {
            "firstName": string,
            "lastName": string,
            "email": string
        }
    ]
}
```

### GET /households/keys

Gets all keys for current user's household

- Must be authenticated

Response:
```json
[
    "key": string,
    "expires": datetime
]
```

### POST /households

Creates and joins a hew household

- Must be authenticated

Request:
```json
{
    "name": string
}
```

Response:
```json
{
    "name": string,
    "id": integer,
    "createdAt": datetime
}
```

### POST /households/generateKey

Creates new join key for current user's household

- Must be authenticated

Response:
```json
{
    "id": integer,
    "key": string,
    "expires": datetime,
    "createdAt": datetime
}
```

### POST /households/join

Joins a household by key

- Must be authenticated

Request:
```json
{
    "key": string
}
```

Response:
```json
{
    "householdId": integer
}
```

### POST /households/leave

Leaves household

- Must be authenticated

No request body, returns 204 No Content on success.
