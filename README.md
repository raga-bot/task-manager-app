# Task Manager Application

## Overview

Task Manager is a full-stack web application that helps users manage their tasks efficiently using a Kanban-style board. Users can register, log in, create tasks, update task status, and delete tasks. The application is built using Angular for the frontend and FastAPI for the backend.

---

## Features

### User Management

* User Registration
* User Login
* Logout Functionality

### Task Management

* Create New Tasks
* View Tasks
* Update Task Status

  * Todo
  * In Progress
  * Done
* Delete Tasks

### Dashboard

* Responsive Kanban Board Layout
* Task Count per Status
* Real-Time Task Updates
* User-Friendly Interface

---

## Tech Stack

### Frontend

* Angular 20
* TypeScript
* Bootstrap 5
* HTML5
* CSS3

### Backend

* FastAPI
* Python
* Pydantic
* Uvicorn

### Deployment

* Frontend: Netlify
* Backend: Render

---

## Live Demo

### Frontend

https://visionary-clafoutis-4e465a.netlify.app

### Backend API

https://task-manager-app-6ijv.onrender.com

### API Documentation

https://task-manager-app-6ijv.onrender.com/docs

---

## Project Structure

task-manager-app/

├── backend/

│   ├── main.py

│   └── requirements.txt

│

├── frontend/

│   └── task-manager-ui/

│       ├── src/

│       ├── package.json

│       └── angular.json

│

└── README.md

---

## API Endpoints

### Authentication

POST /register

POST /login

### Tasks

GET /tasks

POST /tasks

PUT /tasks/{task_id}

DELETE /tasks/{task_id}

---

## Installation

### Backend Setup

```bash
cd backend

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend runs at:

```text
http://127.0.0.1:8000
```

### Frontend Setup

```bash
cd frontend/task-manager-ui

npm install

ng serve
```

Frontend runs at:

```text
http://localhost:4200
```

---

## Deployment

### Backend Deployment

* Hosted on Render
* FastAPI application deployed as a Web Service

### Frontend Deployment

* Hosted on Netlify
* Angular production build deployed using Netlify Drop

---

## Assumptions

* User authentication is implemented for demonstration purposes.
* Data is currently stored in memory.
* No external database is used in the current version.

---

## Future Enhancements

* JWT Authentication
* Role-Based Access Control
* SQLite/PostgreSQL Integration
* Drag-and-Drop Task Management
* Task Due Dates and Priorities
* Search and Filter Functionality
* User Profile Management

---

## Challenges Faced

* Integrating Angular frontend with FastAPI backend
* Configuring CORS for deployed environments
* Managing task status updates dynamically
* Deploying frontend and backend services independently

---

## Conclusion

The Task Manager application demonstrates the implementation of a modern full-stack web application using Angular and FastAPI. It provides an intuitive task management experience through a responsive Kanban board while showcasing frontend-backend integration, REST API development, and cloud deployment practices.

---

## Author

**Besta Sudha Ragavarshini**

Computer Science Engineering

Angular • Python • FastAPI • Full Stack Development
