# 🧾 Full Stack ERP + APIs + Next.js CRUD (IDURAR Extension)

A monorepo containing:

- 🧩 **IDURAR ERP/CRM** – Express + MongoDB + React (Vite)
- ⚙️ **Nest.js API** – Modular backend service
- 🧱 **Next.js CRUD App** – Admin UI or frontend portal
- 🐳 Dockerized setup with optional multi-service orchestration

---

## 📦 Project Overview

| Module             | Tech Stack                  | Description                                  |
|--------------------|-----------------------------|----------------------------------------------|
| `frontend/`        | React (Vite, AntD, Redux)   | ERP/CRM UI built on the original IDURAR app |
| `backend/`         | Express + MongoDB           | Core backend for IDURAR                     |
| `services/nest-integration/` | Nest.js + MongoDB         | Modular API for additional services         |
| `nextjs_crud_app/` | Next.js + TypeScript + MongoDB        | Next.js Crud App - Project Management                      |

---

## 🔧 Prerequisites

- [Node.js](w) >= **20.x** (required by backend/frontend)
- [Docker](w) & [Docker Compose](w)
- [MongoDB Atlas](w) or local MongoDB instance
---

## 🌍 Environment Variables

Create `.env` files in each relevant service:

### `/frontend/.env`

```env
VITE_BACKEND_SERVER=http://localhost:8888
VITE_FILE_BASE_URL=http://localhost:8888/
PROD = false
```

### `/backend/.env`

```env
PORT=8888
DATABASE = your_mongodb_rui
#RESEND_API = "your resend_api"
#OPENAI_API_KEY = "your open_ai api key"
JWT_SECRET= "your_private_jwt_secret_key"
NODE_ENV = "production"
OPENSSL_CONF='/dev/null'
PUBLIC_SERVER_FILE="http://localhost:8888/"
```

### `/services/nest-integration/.env`

```env
PORT=4000
MONGO_URI=your_mongo_uri
WEBHOOK_SECRET=abc123xyz
```


### `/nextjs_crud_app/.env.local`

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
PORT=3000
MONGODB_URI=your_mongo_uri
```
---

## 🐳 Service Setup

## Each service has its own Dockerfile.

## IDURAR ERP (Backend + Frontend)

```
docker-compose up --build
```
## Nest.js - API
```
cd services/nest-integration
npm run build
docker-compose up --build
```
    
## Next.js CRUD App
```
cd nextjs_crud_app/
npm run build
docker-compose up --build
```
---

## Route Examples

## IDURAR ERP (Backend + Frontend)

```
GET
http://localhost:8888/api/query/create
```

## Nest.js - API
```
http://localhost:4000/integration/reports/summary
```
    
## Next.js CRUD App
```
http://localhost:3000/api/projects
```
---

## ✉️ Contact

Got questions or just want to connect? Feel free to reach out!

* **📧 Email:** shamsheedali0786@gmail.com
* **📌 GitHub:** [shamsheedali](https://github.com/shamsheedali)

---
