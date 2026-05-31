# Team Task Tracker API

## Overview

Team Task Tracker API is a backend application built as part of the SDE-II Take Home Assignment.

The application allows organizations to manage users, projects, and tasks with role-based access control (RBAC), JWT authentication, Redis caching, PostgreSQL, Prisma ORM, Docker, and Swagger documentation.

---

## Features

### Authentication

* User Registration
* User Login
* JWT Access Token Authentication
* Refresh Token Support
* Protected Routes

### Authorization (RBAC)

Supported Roles:

* ADMIN
* MANAGER
* MEMBER

#### ADMIN

* Manage Users
* Manage Projects
* Manage Tasks
* View Organization Data

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

### Task Status Values

* TODO
* IN_PROGRESS
* IN_REVIEW
* DONE
* BLOCKED

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

Blocked workflow:

```text
TODO --------\
IN_PROGRESS ---→ BLOCKED
IN_REVIEW ----/
```

Status transitions are validated by the API.

Examples:

```text
TODO → IN_PROGRESS
IN_PROGRESS → IN_REVIEW
IN_REVIEW → DONE
```

Invalid transitions return an error response.

Only the assigned user or a MANAGER can update task status.

---

## Tech Stack

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL
* Prisma ORM

### Authentication

* JWT
* Bcrypt

### Caching

* Redis

### Documentation

* Swagger UI

### Testing

* Jest
* Supertest

### Containerization

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
├── utils
│
├── app.js
└── server.js
```

---

## Database Design

### Organization

One organization contains:

* Multiple Users
* Multiple Projects

### Project

One project contains:

* Multiple Tasks

### Task

Each task belongs to:

* One Project
* One Assignee

---

## Database Indexing

The following indexes were added for query optimization:

```prisma
@@index([status])
@@index([assigneeId])
@@index([dueDate])
@@index([assigneeId, status])
```

These indexes improve performance for:

* Status filtering
* Assignee filtering
* Due date filtering
* Combined assignee and status queries

---

## Redis Caching

Task list responses are cached per assignee.

Cache Key Format:

```text
tasks:<assigneeId>
```

Example:

```text
tasks:134573df-0323-4312-ad84-0a86c95ddfdb
```

### Cache Invalidation

Cache is cleared when:

* Task Created
* Task Updated
* Task Deleted
* Task Status Updated

This ensures fresh data is always returned.

---

# Running The Project

## 1. Clone Repository

```bash
git clone https://github.com/GaneshNaik0716/team-task-tracker-api.git

cd team-task-tracker-api
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment Variables

Create:

```text
.env
```

Example:

```env
PORT=5000

DATABASE_URL=postgresql://postgres:postgres@localhost:5432/task_tracker

JWT_ACCESS_SECRET=your_access_secret

JWT_REFRESH_SECRET=your_refresh_secret

REDIS_URL=redis://localhost:6379
```

---

## 4. Start PostgreSQL and Redis

Using Docker:

```bash
docker compose up -d
```

Verify:

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

Expected Output:

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
* View Current User
* Create Projects
* Get Projects
* Update Projects
* Delete Projects
* Create Tasks
* Get Tasks
* Update Tasks
* Delete Tasks
* Update Task Status
* Test Protected APIs

No Postman required.

---

## Running Tests

```bash
npm test
```

---

## API Endpoints

### Authentication

```http
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
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
* Audit Logging
* Notifications
* Analytics Dashboard
* CI/CD Pipeline
* Extended Test Coverage

---

## Author

Ganesh Naik
