# Backend System with Flow Distribution

## Overview

This project provides a backend system for managing user requests with a flow distribution algorithm that connects users to astrologers. The system includes user authentication, request queuing, request processing, and monitoring with Grafana.

## Prerequisites

Before running the project, ensure you have the following installed:

- Docker
- Docker Compose
- Node.js (for local development)
- PostgreSQL (for the database)
- Redis (for queuing)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Mihir867/queue-backend-system.git
cd backend-system
```

#### 2. Set up a Local env

```bash
DATABASE_URL=postgresql://username:password@localhost:5432/yourdatabase
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=yourpassword
PORT=3000
```


#### 3. Run Docker Containers

```bash
docker-compose up --build
```


#### 4. Run Migrations

```bash
docker-compose exec backend npm run prisma migrate deploy

```

#### 5. Start the Project Locally

```bash
npm install
npm start
npx prisma migrate deploy
```

