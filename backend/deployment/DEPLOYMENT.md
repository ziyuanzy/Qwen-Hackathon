# Alibaba Cloud Deployment

## Deployment Overview

mAIntAIn is deployed on an Alibaba Cloud Elastic Compute Service (ECS) Ubuntu 22.04 instance.

The deployment architecture consists of:

- Frontend: Next.js
- Backend: FastAPI + Uvicorn
- Reverse Proxy: Nginx
- Database: Supabase PostgreSQL
- AI Models: Qwen Cloud APIs

---

## Production Services

The application is managed using Linux systemd services.

### Backend

Service File:

maintain.service

Runs:

- FastAPI
- Uvicorn

Port:

8000

---

### Frontend

Service File:

maintain-frontend.service

Runs:

- Next.js production server

Port:

3000

---

### Reverse Proxy

Nginx routes HTTP traffic to the frontend.

Configuration is included in:

nginx.conf

---

## Public Endpoints

Frontend

http://47.237.102.151

Backend API Documentation

http://47.237.102.151:8000/docs

---

## Database

The application uses Supabase PostgreSQL as its production database.

---

## AI

AI inference is performed using Qwen Cloud APIs for:

- Vision Analysis
- Classification
- Priority Assessment
- Repair Planning
- Communication Generation

---

## Proof of Alibaba Cloud Deployment

This repository includes the production deployment configuration files used on the Alibaba Cloud ECS instance:

- maintain.service
- maintain-frontend.service
- nginx.conf

These files demonstrate how the backend and frontend are deployed and managed on Alibaba Cloud.