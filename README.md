# mAIntAIn
### AI-Powered Property Maintenance Copilot

**Built for the Qwen Cloud Global AI Hackathon 2026**  
**Track 4: Autopilot Agent**

---

## Overview

mAIntAIn is an AI-powered property maintenance copilot that automates the maintenance workflow from issue reporting to contractor recommendation and stakeholder communication.

Property managers often spend significant time reviewing maintenance requests, analyzing photos, assessing urgency, selecting contractors, and communicating with residents. mAIntAIn streamlines this process through a multi-agent architecture powered by Qwen Cloud, transforming unstructured maintenance requests into actionable repair plans while retaining human oversight at critical decision points.

---

## Problem Statement

Property management teams receive maintenance requests through multiple channels such as web forms, emails, and photographs.

These requests are often:

- Ambiguous or incomplete
- Difficult to triage consistently
- Time-consuming to coordinate
- Dependent on manual expertise

Managers typically need to:

- Review resident descriptions
- Analyze uploaded images
- Determine issue categories
- Assess urgency levels
- Select appropriate contractors
- Draft communications
- Follow up with residents

This creates delays, operational inefficiencies, and inconsistent decision-making.

---

## Solution

mAIntAIn automates the end-to-end maintenance workflow using a Qwen Cloud powered multi-agent pipeline.

The system:

1. Accepts maintenance requests from residents or email imports.
2. Analyzes uploaded photographs.
3. Classifies maintenance issues.
4. Determines urgency and priority.
5. Recommends suitable contractors.
6. Estimates repair costs and duration.
7. Drafts communications for all stakeholders.
8. Routes recommendations through a human-in-the-loop approval process before action is taken.

---

# Key Features

## Resident Portal

Residents can:

- Submit maintenance requests
- Upload issue photographs
- Describe maintenance problems
- Receive AI-assisted updates

---

## Vision Agent

Analyzes uploaded images to:

- Detect visible damage
- Generate image descriptions
- Identify potential hazards
- Validate image relevance
- Check consistency between image and resident description

---

## Classification Agent

Automatically categorizes maintenance issues into relevant maintenance domains for downstream processing.

Examples:

- Plumbing
- Electrical
- HVAC
- Structural
- Pest Control
- General Maintenance

---

## Priority Agent

Determines urgency based on:

- Safety implications
- Potential property damage
- Severity indicators
- Hazard detection

Outputs:

- Priority level
- Justification for urgency

---

## Planner Agent

Generates repair recommendations including:

- Recommended contractor type
- Estimated repair duration
- Estimated repair cost
- Immediate actions required
- Maintenance rationale

---

## Communication Agent

Automatically drafts communications for:

### Residents
Maintenance updates and clarification requests.

### Property Managers
Internal summaries and decision support.

### Contractors
Work orders and repair instructions.

Generated messages can be exported directly to:

- Gmail
- Outlook

---

## Email Import

Managers can upload maintenance emails directly.

The system automatically:

- Extracts email content
- Parses attachments
- Creates maintenance tickets
- Routes requests through the AI workflow

---

## Human-in-the-Loop Review

Before any contractor is assigned:

Managers can:

- Approve recommendations
- Request clarification from residents
- Review generated communications
- Close completed tickets

This ensures accountability and operational control.

---

# Why This Fits Track 4: Autopilot Agent

mAIntAIn automates a real-world business workflow from maintenance request intake to contractor assignment.

The system demonstrates:

- End-to-end workflow automation
- Multi-agent orchestration
- Ambiguous input handling
- Image-based reasoning
- Email processing
- Human-in-the-loop decision making
- Production-oriented architecture

This aligns directly with the objectives of the **Autopilot Agent Track**, which focuses on automating operational workflows while maintaining oversight at critical decision points.

---

# System Architecture

![Architecture Diagram](docs/architecture.png)

### High-Level Workflow

```text
Resident Request / Email Import
              │
              ▼
      FastAPI Backend
              │
              ▼
    Workflow Orchestrator
              │
              ▼
        Vision Agent
              │
              ▼
   Classification Agent
              │
              ▼
       Priority Agent
              │
              ▼
        Planner Agent
              │
              ▼
    Communication Agent
              │
              ▼
 Human-in-the-Loop Review
              │
      ┌───────┴───────┐
      ▼               ▼
Assign Contractor   Request Clarification
```

---

# Multi-Agent Pipeline

## 1. Vision Agent

Analyzes uploaded maintenance photographs and extracts visual insights.

### Inputs

- Uploaded image
- Resident description

### Outputs

- Damage identification
- Hazard detection
- Consistency analysis
- Image description

---

## 2. Classification Agent

Determines the maintenance category based on visual and textual information.

### Output

- Issue category

---

## 3. Priority Agent

Evaluates urgency.

### Output

- Priority level
- Risk justification

---

## 4. Planner Agent

Produces actionable repair recommendations.

### Output

- Contractor type
- Estimated duration
- Estimated cost
- Immediate actions

---

## 5. Communication Agent

Generates stakeholder communications.

### Output

- Resident message
- Internal manager summary
- Contractor work order

---

# Qwen Cloud Integration

mAIntAIn uses **Qwen Cloud** as the intelligence layer powering all AI agents.

Qwen Cloud is used for:

- Vision analysis
- Issue classification
- Priority assessment
- Repair planning
- Communication generation

Each agent produces structured outputs that are passed to downstream agents through the workflow orchestrator.

This architecture enables modular, explainable, and extensible AI-driven decision making.

---

# Alibaba Cloud Deployment

The backend is deployed on **Alibaba Cloud ECS (Elastic Compute Service)**.

Deployment components include:

- Alibaba Cloud ECS
- FastAPI Backend
- Qwen Cloud API Integration
- Supabase PostgreSQL Database

### Relevant Deployment Files

```text
backend/services/ai_agent.py
backend/services/vision_service.py
backend/services/classification_service.py
backend/services/priority_service.py
backend/services/planner_service.py
backend/services/communication_service.py
```

These files demonstrate integration with Qwen Cloud services running on Alibaba Cloud infrastructure.

---

# Technology Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

## Backend

- FastAPI
- Python

## Database

- Supabase PostgreSQL

## AI Layer

- Qwen Cloud
- Qwen3.7-Plus

## Deployment

- Alibaba Cloud ECS

---

# Repository Structure

```text
backend/
├── agents/
├── services/
├── routes/
├── models/
├── schemas/
├── crud/
├── database/

frontend/
├── app/
├── components/
├── services/
├── types/
├── utils/
```

---

# Local Setup

## Clone Repository

```bash
git clone <repository-url>
cd mAIntAIn
```

---

## Backend Setup

```bash
cd backend

python -m venv .venv

source .venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start backend:

```bash
uvicorn main:app --reload
```

Backend will be available at:

```text
http://127.0.0.1:8000
```

API documentation:

```text
http://127.0.0.1:8000/docs
```

---

## Frontend Setup

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Frontend will be available at:

```text
http://localhost:3000
```

---

# Environment Variables

Create a `.env` file inside the backend directory.

```env
QWEN_API_KEY=your_qwen_api_key
DATABASE_URL=your_database_url
```

Example:

```env
QWEN_API_KEY=xxxxxxxxxxxxxxxx
DATABASE_URL=postgresql://...
```

---

# Demo Video

Demo video:

```text
[Insert YouTube/Vimeo/Facebook Video URL]
```

---

# Future Improvements

Potential future enhancements include:

- Automated contractor dispatch
- Resident mobile application
- Predictive maintenance analytics
- Maintenance trend dashboards
- Integration with enterprise property management systems
- Historical maintenance knowledge retrieval
- Multi-property portfolio management

---

# License

This project is released under the MIT License.

See the LICENSE file for details.
