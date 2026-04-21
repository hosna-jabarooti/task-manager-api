# Task Manager API

A production-ready RESTful API built with Node.js, Express, and MongoDB for managing user tasks with authentication and authorization.

---

## 🚀 Features

- User Authentication (JWT)
- Register & Login
- Task CRUD (Create, Read, Update, Delete)
- Pagination
- Filtering & Search
- Input Validation (Joi)
- Error Handling Middleware
- Secure Routes with Authentication

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- JWT (Authentication)
- Joi (Validation)
- bcrypt (Password hashing)

---

## 📁 Project Structure
- src/
- controllers/
- services/
- models/
- routes/
- middlewares/
- validators/
- utils/
- config/


---

## 🔐 Authentication

All protected routes require a token:

Authorization: Bearer <token>

---

## 📌 API Endpoints

### Auth
- POST `/api/auth/register`
- POST `/api/auth/login`

### Tasks
- GET `/api/tasks`
- GET `/api/tasks/:id`
- POST `/api/tasks`
- PATCH `/api/tasks/:id`
- DELETE `/api/tasks/:id`

---

## 🔍 Query Params

- Pagination:
?page=1&limit=10


- Filter:
?completed=true


- Search:
?search=keyword


---

## ⚙️ Installation

```bash
git clone <repo-url>
cd task-manager-api
npm install
```
---


## 🔑 Environment Variables
Create a .env file:

PORT=3000

MONGO_URI=your_mongo_uri

JWT_SECRET=your_secret
---


## ▶️ Run Project
```
npm run dev
```
## 📌 Notes
Each user can only access their own tasks

Secure authentication using JWT

Clean architecture with separation of concerns


## 📬 Future Improvements
Logging (Winston)

Security enhancements (Helmet, Rate Limit)

Deployment


