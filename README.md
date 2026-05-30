# Team Task Tracker API

## Overview

Team Task Tracker API is a backend application built as part of the SDE-II Take Home Assignment.

The application allows organizations to manage users, projects, and tasks with role-based access control, JWT authentication, Redis caching, and Dockerized deployment.

---

## Features

### Authentication

* User Registration
* User Login
* JWT Access Tokens
* Refresh Token Storage
* Protected Routes

### Authorization (RBAC)

Supported roles:

* ADMIN
* MANAGER
* MEMBER

Permissions:

#### ADMIN

* Manage Users
* Manage Projects
* Manage Tasks

#### MANAGER

* Manage Projects
* Manage Tasks
* Assign Tasks
* Update Task Status

#### MEMBER

* View Assigned Tasks
* Update Own Task Status

---

## Task Management

Task fields:

* Title
* Description
* Priority
* Status
* Assignee
* Due Date
* Project

### Status Workflow

```text
TODO
 ↓
IN_PROGRESS
 ↓
IN_REVIEW
 ↓
DONE
```

Blocked tasks:

```text
TODO --------\
IN_PROGRESS ---→ BLOCKED
IN_REVIEW ----/
```

Only the assigned user or a MANAGER can update task status.

---

## Tech Stack

Backend:

* Node.js
* Express.js

Database:

* PostgreSQL
* Prisma ORM

Authentication:

* JWT
* Bcrypt

Caching:

* Redis

Documentation:

* Swagger UI

Testing:

* Jest
* Supertest

Containerization:

* Docker
* Docker Compose

---

## Project Structure

```text
src
│
├── config
│   ├── prisma.js
│   ├── redis.js
│   └── swagger.js
│
├── middleware
│   ├── auth.middleware.js
│   ├── rbac.middleware.js
│   └── error.middleware.js
│
├── modules
│   ├── auth
│   ├── users
│   ├── projects
│   └── tasks
│
├── routes
│
├── utils
│
├── app.js
└── server.js
```

---

## Database Design

### Organization

One organization can contain:

* Multiple Users
* Multiple Projects

### Project

One project can contain:

* Multiple Tasks

### Task

Each task belongs to:

* One Project
* One Assignee

---

## Indexing Strategy

The following indexes were added to improve filtering performance:

```prisma
@@index([status])
@@index([assigneeId])
@@index([dueDate])
@@index([assigneeId, status])
```

### Design Decision

Task filtering is frequently performed using:

* Status
* Assignee
* Due Date

Indexes were added on these columns to improve query performance for pagination and filtering.

---

## Redis Caching Strategy

Task list responses are cached per assignee.

Cache key format:

```text
tasks:<assigneeId>
```

Example:

```text
tasks:1006cc25-6682-464b-a1d8-487a2279d360
```

### Cache Invalidation

Cache is cleared when:

* Task Created
* Task Updated
* Task Deleted
* Task Status Updated

This ensures Redis always returns fresh data.

---

# Running the Project From Scratch

## 1. Clone Repository

```bash
git clone <repository-url>
cd team-task-tracker
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Create Environment File

Create a file:

```text
.env
```

Example:

```env
PORT=5000

DATABASE_URL=postgresql://postgres:postgres@localhost:5432/task_tracker

JWT_ACCESS_SECRET=supersecretaccesskey

JWT_REFRESH_SECRET=supersecretrefreshkey

REDIS_URL=redis://localhost:6379
```

---

## 4. Start PostgreSQL and Redis

Using Docker:

```bash
docker compose up -d postgres redis
```

Verify containers:

```bash
docker ps
```

---

## 5. Generate Prisma Client

```bash
npx prisma generate
```

---

## 6. Run Database Migration

```bash
npx prisma migrate dev
```

---

## 7. Start Application

```bash
npm run dev
```

Expected:

```text
Redis connected
Server running on port 5000
```

---

## Verify Application

Health Check:

```text
http://localhost:5000/health
```

Expected:

```json
{
  "success": true,
  "message": "API is running"
}
```

---

## Swagger Documentation

Open:

```text
http://localhost:5000/api-docs
```

Swagger UI can be used to:

* Register Users
* Login
* Create Projects
* Create Tasks
* Test Protected APIs

without Postman.

---

## Running Tests

```bash
npm test
```

---

## Main API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

### Users

```http
POST   /api/users
GET    /api/users
GET    /api/users/:id
PATCH  /api/users/:id
DELETE /api/users/:id
```

### Projects

```http
POST   /api/projects
GET    /api/projects
GET    /api/projects/:id
PATCH  /api/projects/:id
DELETE /api/projects/:id
```

### Tasks

```http
POST   /api/tasks
GET    /api/tasks
GET    /api/tasks/:id
PATCH  /api/tasks/:id
DELETE /api/tasks/:id
PATCH  /api/tasks/:id/status
```

---

## Future Improvements

* Refresh Token Rotation
* Analytics Dashboard
* WebSocket Notifications
* Audit Logs
* CI/CD Pipeline
* Expanded Test Coverage

---

## Author

Ganesh Naik
