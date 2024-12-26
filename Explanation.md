Here's the full documentation with the requested updates:

---

# Documentation for the Cool Kids Network

## Overview

The Cool Kids Network is an online platform for managing user roles with role-based access control. The application differentiates access levels based on roles, ensures secure role management by maintainers, and provides a seamless deployment workflow integrating the frontend and backend.

---

## Problem Statement

The Cool Kids Network is designed to manage a community where users are assigned roles (`Cool Kid`, `Cooler Kid`, and `Coolest Kid`) with varying access levels. The goal is to:

1.  Allow users to sign up, log in, and access role-specific features.
2.  Provide maintainers with secure functionality to manage user roles.
3.  Ensure role-based access control for sensitive information.
4.  Create a seamless integration between the frontend and backend.

---

## Technical Specification

### Design Workflow

1.  **User Registration**:

    - Users sign up with an email.
    - A random identity is generated using the RandomUser API.
    - Default role assigned: `Cool Kid`.
    - Data is saved in the `users` collection.

2.  **Authentication**:

    - Users or maintainers log in using their email.
    - Backend determines if the email belongs to a maintainer or user.
    - Maintainers are verified using the `maintainers` collection.

3.  **Role Management**:

    - Maintainers update user roles securely using their email as `maintainerId`.
    - Role updates are validated against predefined roles (`Cool Kid`, `Cooler Kid`, `Coolest Kid`).

4.  **Role-Based Data Access**:

    - `Cool Kid`: View only their own profile.
    - `Cooler Kid`: View all users’ names and countries.
    - `Coolest Kid`: View all users’ details, including email and roles.

5.  **Frontend and Backend Integration**:

    - Frontend API calls are routed via `VITE_API_URL`.
    - The frontend’s `dist` folder is copied to the backend during the build process, ensuring a single deployment package.

---

## Technical Decisions

### Backend

- **Technology**: Express.js for scalability and middleware support.
- **Database**: MongoDB for flexibility in handling user and maintainer data.
- **Security**:
  - Maintainer email validation for role management.
  - Middleware for role-based access control.
- **Models**:
  - `User` schema includes roles and personal details.
  - `Maintainer` schema ensures maintainers are managed separately.

### Frontend

- **Technology**: React for dynamic and efficient UI rendering.
- **Styling**: TailwindCSS for streamlined design.
- **Environment Variables**:
  - `VITE_API_URL` ensures configurable API endpoints.

### Integration

- Automating the frontend build process to copy `dist` into the backend for unified deployment reduces complexity and ensures consistency.

---

## How the Solution Meets the User Stories

1.  **User Story 1: Registration**

    - Users can sign up with an email, and a random identity is generated with the default "Cool Kid" role.

2.  **User Story 2: Login and Profile Access**

    - Users log in using their email.
    - Role-based access ensures they can view only their profile.

3.  **User Story 3: Cooler Kid Access**

    - Users with the "Cooler Kid" role can view names and countries of all users.

4.  **User Story 4: Coolest Kid Access**

    - Users with the "Coolest Kid" role can view all details, including email and roles, of all users.

5.  **User Story 5: Maintainer Role Management**

    - Maintainers can securely update roles using the `assignRole` endpoint, validated by their `maintainerId`.
    - To log in as a maintainer, use the credentials `maintainer@gmail.com`.
    - New maintainers can be created by sending a POST request to `/api/admin/create-maintainer` with the email in the body.

---

## How to Run the Application

### Repository Structure

```
cool_kids_network/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env
├── frontend/
│   ├── public/
│   ├── src/
│   ├── dist/
│   └── .env
└── Explanation.md

```

## Prerequisites

1. **Node.js** (v16 or later) and **npm**.
2. **MongoDB URI** for database connection.
3. **Environment Variables**:
   - Backend `.env`:
     ```env
     MONGODB_URI=<your-mongo-uri>
     ADMIN_SECRET_KEY=<your-admin-secret-key>
     ```
   - Frontend `.env`:
     ```env
     VITE_API_URL=http://localhost:5000/api
     ```

## Running the Frontend

1.  **Navigate to Frontend Directory**:

    ```bash
    cd frontend

    ```

2.  **Install Dependencies**:

    ```bash
    npm install

    ```

3.  **Start the Frontend for Development**:

    ```bash
    npm run dev

    ```

4.  **Build the Frontend**:

    ```bash
    npm run build

    ```

    - The `dist` folder is automatically copied to the backend directory.

## Running the Backend

1.  **Navigate to Backend Directory**:

    ```bash
    cd backend

    ```

2.  **Install Dependencies**:

    ```bash
    npm install

    ```

3.  **Start the Backend**:

    ```bash
    npm run start

    ```

---

## Viewing the Website

After building the frontend and running the backend, visit the website by going to [http://localhost:5000](http://localhost:5000) in your browser.

---
