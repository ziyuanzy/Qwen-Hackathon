# Alibaba Cloud Deployment

## Overview

mAIntAIn is deployed on an **Alibaba Cloud Elastic Compute Service (ECS)** instance running **Ubuntu 22.04 LTS**.

The production deployment consists of:

- **Frontend:** Next.js
- **Backend:** FastAPI + Uvicorn
- **Reverse Proxy:** Nginx
- **Database:** Supabase PostgreSQL
- **AI Services:** Qwen Cloud APIs

---

## Production Services

The application is managed using **systemd** to ensure services automatically start on boot and recover from failures.

### Backend

- Service: `maintain.service`
- Runtime: FastAPI + Uvicorn
- Internal Port: **8000**

### Frontend

- Service: `maintain-frontend.service`
- Runtime: Next.js Production Server
- Internal Port: **3000**

### Reverse Proxy

Nginx serves as the public-facing web server and routes requests to the appropriate services.

Configuration file:

```
deployment/nginx.conf
```

Routing:

```
Internet
      │
      ▼
Nginx (Port 80)
      ├────────────► Next.js (3000)
      └────────────► FastAPI (/docs, /api, /uploads) (8000)
```

---

## Database

The application uses **Supabase PostgreSQL** as its production database.

---

## AI Integration

AI inference is performed using **Qwen Cloud APIs** for:

- Vision Analysis
- Issue Classification
- Priority Assessment
- Repair Planning
- Communication Generation

---

## Live Deployment

Frontend

http://47.237.102.151

Backend API Documentation

http://47.237.102.151/docs

---

## Proof of Alibaba Cloud Deployment

This repository includes the deployment configuration used on the Alibaba Cloud ECS instance:

```
deployment/
├── maintain.service
├── maintain-frontend.service
├── nginx.conf
└── deployment.md
```

These files configure:

- systemd service management
- Nginx reverse proxy
- Production startup commands
- Public routing for the deployed application

The live application is served from an **Alibaba Cloud ECS Ubuntu 22.04** instance using the configuration included in this repository.