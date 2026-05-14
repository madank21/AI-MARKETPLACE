# API Reference

Complete API documentation for the NexusAI marketplace.

## Base URL

- Production: `https://nexusai.example.com`
- Development: `http://localhost:3000`

## Authentication

All requests (except public endpoints) require JWT token in header:

```
Authorization: Bearer <jwt_token>
```

## Response Format

All responses follow this format:

```json
{
  "success": true,
  "data": {},
  "error": null
}
```

---

## Authentication Endpoints

### Login with Email

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "secure_password"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "username": "username"
    }
  }
}
```

### Sign Up

```http
POST /api/auth/signup
Content-Type: application/json

{
  "email": "newuser@example.com",
  "username": "newuser",
  "password": "secure_password",
  "walletAddress": "0x..."
}
```

### Refresh Token

```http
GET /api/auth/refresh
Authorization: Bearer <refresh_token>
```

---

## Models Endpoints

### List All Models

```http
GET /api/models?page=1&limit=20&category=nlp&sort=popular
```

**Query Parameters:**
- `page` (number): Page number, default 1
- `limit` (number): Results per page, default 20
- `category` (string): Filter by category
- `sort` (string): Sort by `popular`, `price`, `rating`, `newest`
- `search` (string): Search query

**Response:**
```json
{
  "success": true,
  "data": {
    "models": [
      {
        "id": "model_123",
        "name": "GPT-Vision Clone",
        "creator": "AI Labs",
        "category": "Language Model",
        "rating": 4.8,
        "downloads": 2400,
        "price": 0.05,
        "image": "https://...",
        "createdAt": "2024-01-15T00:00:00Z"
      }
    ],
    "pagination": {
      "current": 1,
      "total": 45,
      "limit": 20
    }
  }
}
```

### Get Model Details

```http
GET /api/models/{modelId}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "model_123",
    "name": "GPT-Vision Clone",
    "description": "...",
    "creator": {
      "id": "creator_123",
      "username": "ailabs",
      "avatar": "https://..."
    },
    "rating": 4.8,
    "reviews": 342,
    "downloads": 2400,
    "price": 0.05,
    "currency": "USD",
    "metrics": {
      "latency": "124ms",
      "throughput": "1000 req/s",
      "accuracy": 0.95
    },
    "documentation": "https://...",
    "version": "2.0",
    "createdAt": "2024-01-15T00:00:00Z"
  }
}
```

### Create Model (Creator Only)

```http
POST /api/models
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "My Model",
  "description": "Model description",
  "category": "nlp",
  "ipfsHash": "QmXxxx...",
  "price": 0.05,
  "currency": "USD",
  "documentation": "https://..."
}
```

### Update Model

```http
PUT /api/models/{modelId}
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Name",
  "price": 0.08
}
```

### Delete Model

```http
DELETE /api/models/{modelId}
Authorization: Bearer <token>
```

---

## Inference Endpoints

### Run Inference

```http
POST /api/inference
Authorization: Bearer <token>
Content-Type: application/json

{
  "modelId": "model_123",
  "input": {
    "text": "What is AI?",
    "options": {}
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "output": "AI is artificial intelligence...",
    "latency": 124,
    "tokensUsed": 150,
    "timestamp": "2024-05-15T10:30:00Z"
  }
}
```

### Batch Inference

```http
POST /api/inference/batch
Authorization: Bearer <token>
Content-Type: application/json

{
  "modelId": "model_123",
  "inputs": [
    {"text": "Query 1"},
    {"text": "Query 2"}
  ]
}
```

### Check Inference Status

```http
GET /api/inference/{inferenceId}
Authorization: Bearer <token>
```

---

## Payment Endpoints

### Create Payment Intent

```http
POST /api/payments/create-intent
Authorization: Bearer <token>
Content-Type: application/json

{
  "modelId": "model_123",
  "amount": 0.05,
  "currency": "USD",
  "paymentMethod": "stripe" | "crypto"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "paymentId": "pay_123",
    "clientSecret": "pi_test_secret_...",
    "amount": 0.05,
    "currency": "USD"
  }
}
```

### Verify Payment

```http
POST /api/payments/verify
Authorization: Bearer <token>
Content-Type: application/json

{
  "paymentId": "pay_123",
  "stripePaymentIntentId": "pi_..."
}
```

### Get Payment History

```http
GET /api/payments?page=1&limit=20
Authorization: Bearer <token>
```

### Get Subscription

```http
GET /api/subscriptions/{subscriptionId}
Authorization: Bearer <token>
```

---

## User Endpoints

### Get Profile

```http
GET /api/user/profile
Authorization: Bearer <token>
```

### Update Profile

```http
PUT /api/user/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "username": "newusername",
  "bio": "User bio",
  "avatar": "https://..."
}
```

### Get Dashboard Stats

```http
GET /api/user/stats
Authorization: Bearer <token>
```

### Export User Data (GDPR)

```http
GET /api/user/export
Authorization: Bearer <token>
```

### Delete Account

```http
DELETE /api/user/account
Authorization: Bearer <token>
```

---

## Creator Endpoints

### Get Creator Dashboard

```http
GET /api/creator/dashboard
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "earnings": 1245.50,
    "totalDownloads": 2847,
    "models": 8,
    "averageRating": 4.7,
    "chartData": []
  }
}
```

### Get Creator Analytics

```http
GET /api/creator/analytics?period=month
Authorization: Bearer <token>
```

### Upload Model File

```http
POST /api/creator/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: <binary_data>
```

---

## Admin Endpoints

### Get Platform Stats

```http
GET /api/admin/stats
Authorization: Bearer <admin_token>
```

### Get Users List

```http
GET /api/admin/users?page=1&limit=20
Authorization: Bearer <admin_token>
```

### Ban User

```http
POST /api/admin/users/{userId}/ban
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "reason": "Violation of ToS",
  "duration": 30
}
```

### Review Model

```http
POST /api/admin/models/{modelId}/review
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "status": "approved" | "rejected",
  "notes": "Review notes"
}
```

---

## Error Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 429 | Rate Limited |
| 500 | Server Error |

## Rate Limiting

All endpoints have rate limits:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1234567890
```

When limit exceeded: `429 Too Many Requests`

## Webhooks

### Payment Webhook

```
POST https://your-domain.com/api/webhooks/stripe
Content-Type: application/json

{
  "type": "payment_intent.succeeded",
  "data": {
    "id": "pi_...",
    "amount": 5000,
    "currency": "usd",
    "metadata": {
      "modelId": "model_123"
    }
  }
}
```

---

For more examples, see [examples/api-calls.http](examples/api-calls.http)
