# Task Manager API
SESA Mentorship Program - Task 04  
Backend REST API using Node.js, Express.js & MongoDB

---

## 📁 Folder Structure (MVC Pattern)

```
task-manager/
├── config/
│   └── db.js                 ← MongoDB connection
├── controllers/
│   ├── authController.js     ← Register, Login logic
│   └── taskController.js     ← CRUD logic
├── middleware/
│   └── authMiddleware.js     ← JWT token check
├── models/
│   ├── User.js               ← User schema
│   └── Task.js               ← Task schema
├── routes/
│   ├── authRoutes.js         ← /api/auth routes
│   └── taskRoutes.js         ← /api/tasks routes
├── .env                      ← Environment variables (don't commit!)
├── .env.example              ← Template for .env
├── .gitignore
├── package.json
└── server.js                 ← Entry point
```

---

## 🚀 Run කරන්නේ මෙහෙමයි (Step by Step)

### Step 1 - MongoDB Atlas Setup
1. https://www.mongodb.com/atlas → Sign Up (free)
2. New Project → Create Cluster (free M0 tier)
3. Database Access → Add User (username + password)
4. Network Access → Add IP Address → **Allow Access from Anywhere** (0.0.0.0/0)
5. Connect → Drivers → Copy the connection string

Connection string මේ වගේ පෙනෙයි:
```
mongodb+srv://dulana:<password>@cluster0.xxxxx.mongodb.net/taskmanager
```

---

### Step 2 - Project Setup

```bash
# 1. Folder එකට යන්න
cd task-manager

# 2. .env file හදන්න
cp .env.example .env
```

**.env file open කරලා මේ values fill කරන්න:**
```
PORT=5000
MONGO_URI=mongodb+srv://dulana:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/taskmanager
JWT_SECRET=dulana_secret_key_2024
JWT_EXPIRE=7d
```

```bash
# 3. Packages install කරන්න
npm install

# 4. Server start කරන්න
npm run dev
```

Terminal එකේ මේ වගේ පෙනෙයි:
```
Server running on port 5000
MongoDB Connected: cluster0.xxxxx.mongodb.net
```

---

## 🧪 Postman වලින් Test කරන්නේ මෙහෙමයි

### 1. Register (New User)
```
POST http://localhost:5000/api/auth/register
Body (JSON):
{
  "name": "Dulana",
  "email": "dulana@gmail.com",
  "password": "123456"
}
```

### 2. Login
```
POST http://localhost:5000/api/auth/login
Body (JSON):
{
  "email": "dulana@gmail.com",
  "password": "123456"
}
→ Response වලින් "token" copy කරගන්න
```

### 3. Task හදන්න (token required!)
```
POST http://localhost:5000/api/tasks
Headers:
  Authorization: Bearer YOUR_TOKEN_HERE
Body (JSON):
{
  "title": "Complete SESA Task 04",
  "description": "Build MERN backend",
  "priority": "high",
  "dueDate": "2026-06-05"
}
```

### 4. Tasks බලන්න
```
GET http://localhost:5000/api/tasks
Headers:
  Authorization: Bearer YOUR_TOKEN_HERE
```

### 5. Task Update කරන්න
```
PUT http://localhost:5000/api/tasks/TASK_ID_HERE
Headers:
  Authorization: Bearer YOUR_TOKEN_HERE
Body (JSON):
{
  "completed": true
}
```

### 6. Task Delete කරන්න
```
DELETE http://localhost:5000/api/tasks/TASK_ID_HERE
Headers:
  Authorization: Bearer YOUR_TOKEN_HERE
```

---

## 🌐 API Endpoints Summary

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/auth/register | Register new user | No |
| POST | /api/auth/login | Login | No |
| GET | /api/auth/me | Get logged-in user | Yes |
| GET | /api/tasks | Get all my tasks | Yes |
| POST | /api/tasks | Create task | Yes |
| GET | /api/tasks/:id | Get single task | Yes |
| PUT | /api/tasks/:id | Update task | Yes |
| DELETE | /api/tasks/:id | Delete task | Yes |

---

## ☁️ Deploy on Render (Free)

1. GitHub එකට push කරන්න
2. https://render.com → Sign Up
3. New → Web Service → Connect your repo
4. Settings:
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
5. Environment Variables add කරන්න (MONGO_URI, JWT_SECRET, etc.)
6. Deploy!

---

## 🔧 Tech Stack
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB Atlas** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
