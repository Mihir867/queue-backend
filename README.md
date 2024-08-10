# Queue Backend System with Flow Distribution

[View the Diagram](https://lucid.app/lucidchart/1d8065e5-0421-40cf-97f8-44d506496ccc/edit?viewport_loc=-2437%2C-590%2C2747%2C1416%2C0_0&invitationId=inv_0720e78b-eeb2-4e9c-8887-535ca940a8db) - This diagram explains the user flow, starting from login, through the queue process, and also shows metrics tracking.

## Overview

This project implements a backend system designed to efficiently manage user requests using a queue structure. The system ensures that each client has a dedicated queue, where requests are processed sequentially. It also includes a flow distribution algorithm that connects users with astrologers, ensuring fair distribution of requests.

### Features

- **User Authentication:** Securely authenticate users before allowing them to enqueue requests.
- **Request Queueing:** Each client has a dedicated queue for handling requests in a First-In-First-Out (FIFO) manner.
- **Request Processing:** Requests are processed sequentially by dedicated worker processes.
- **Flow Distribution Algorithm:** Fairly distributes users among astrologers, with the ability to toggle flow for top astrologers.
- **Monitoring:** System performance is monitored using Grafana, providing insights into the request handling process.

## System Architecture

The system is composed of several key components:

- **Client:** The frontend or external service making API requests to the backend.
- **Server:** A Node.js backend that handles user authentication, request queuing, and processing.
- **Redis Queue:** Manages the user request queues.
- **PostgreSQL Database:** Stores user data, astrologer information, and flow records.
- **Worker Processes:** Handle the processing of queued requests.
- **Promethus:** Monitors and logs system metrics.

## Folder Structure

```plaintext
queue-backend-system/
├── Dockerfile
├── docker-compose.yml
├── README.md
├── .env
├── package.json
├── prisma/
│   ├── schema.prisma
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── queueController.js
│   │   ├── astrologerController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── userModel.js
│   │   ├── astrologerModel.js
│   ├── services/
│   │   ├── queueServices.js
│   │   ├── flowServices.js
│   ├── utils/
│   │   └── jwtUtils.js
│   └── server.js
│   ├── tests/
│   │   └── authControllers.test.js
        └── integration.test.js
