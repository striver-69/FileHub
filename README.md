# FileHub: Full-Stack Application

FileHub is a full-stack file management system (a mini Dropbox) that allows users to:
- **Upload Files**
- **View File Contents**
- **List All Uploaded Files**

## Tech Stack
- **MySQL** (SQL Database for file metadata)
- **Spring Boot Backend** (REST API for file operations)
- **React Frontend** (Material UI–based user interface)
- **Docker Compose** (to orchestrate all services)

---

## Tech Overview

- **MySQL** stores file metadata in the `files_metadata` table.
- **Spring Boot Backend** exposes REST endpoints for file upload, retrieval, and listing.
- **React Frontend** provides a user interface to interact with the backend.
- **Docker Compose** orchestrates the containers for MySQL, backend, and frontend.

---

## Prerequisites

- **Docker & Docker Compose** (to run all services together)
- **Node.js & npm** (for running the React frontend locally)
- **Java 17 & Maven** (for running the Spring Boot backend locally)


## How to Run (Docker)

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/Filehub.git
   cd Filehub
   
2. **Run and start All services**
    ```bash
   docker-compose up --build -d

3. **Access the Application**

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:8080/api/files](http://localhost:8080/api/files)


- **MySQL will run on port 3306**
- **Spring Boot Backend will run on port 8080**
- **React Frontend will be served by Nginx on port 3000**

## Relevant Commands

- **Build Docker Images Manually**
  ```bash
  docker build -t filehub-backend ./backend
  docker build -t filehub-frontend ./frontend

- **Start Docker compose**
  ```bash
  docker-compose up --build -d

- **Stop services**
  ```bash
  docker-compose down

- **Remove persistent volume**
  ```bash
  docker-compose down -v