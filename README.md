# MediMemory

> **"The AI memory layer between the hospital and the home."**

MediMemory turns complex, easily forgotten hospital discharge documents into a structured, source-traceable care memory for patients and caregivers on their smartphones.

---

## Overview

When patients are discharged from the hospital, they receive multi-page discharge summaries dense with clinical jargon, medication regimens, activity restrictions, and critical follow-up dates. Studies show that over 50% of discharge instructions are forgotten or misunderstood within hours of leaving the hospital.

**MediMemory** bridges this gap. It captures discharge paperwork, extracts actionable instructions, structures them into a clear daily timeline, and enables grounded conversational retrieval where **every answer is visually linked back to its original hospital source**.

---

## Demo Links

- **Live Demo**: `<URL>`
- **GitHub Repository**: `<URL>`
- **Demo Video**: `<URL>`
- **Pitch Deck**: `<URL>`

---

## Problem

1. **Information Overload at Discharge**: Patients and families are overwhelmed and anxious during hospital discharge, leading to poor comprehension of critical care instructions.
2. **Medication Misunderstandings**: Confusion between multiple medications, dosages, meal timings, and course durations causes preventable readmissions.
3. **Lost Source Context**: Traditional AI chatbots can hallucinate medical advice without clinical grounding. Patients need to see the exact paragraph from their doctor.
4. **Caregiver Coordination Gap**: Family members and caregivers at home lack a unified, simple summary of what needs to happen today vs. next week.

---

## Solution

MediMemory provides a phone-first, deterministic, and safe care memory layer:

- **Scan & Extract**: Capture discharge summaries via phone camera or upload.
- **Deterministic Care Memory**: Automatically structures medications, durations, precautions, and follow-ups.
- **Visual Source Traceability**: Every answer generated highlights the exact line and section in the hospital discharge document.
- **AI Safety Guardrails**: Refuses to diagnose or modify prescriptions; explicitly routes medication decisions to healthcare providers.
- **Caregiver Collaboration**: Shareable care summaries and patient-reported voice notes kept strictly separate from verified clinical records.
- **Office Kit Companion**: Real-time cross-device sync and optical extraction monitoring for clinical desks.

---

## Features

- 📱 **Mobile-First Experience**: Designed specifically for one-handed phone usage (375px–430px viewports) with desktop responsive expansion.
- 💊 **Today's Care Dashboard**: Morning and evening medication schedules, active warnings, and immediate milestones.
- 📅 **Interactive Care Timeline**: Chronological progression from discharge date to course completion and follow-up appointment.
- 🔍 **Ask MediMemory with Live Source Linking**: Ask plain-language questions and view the exact highlighted excerpt in the source document.
- 🎙️ **Voice Interaction & Fallbacks**: Hands-free voice inquiry with instant text fallback when microphone permissions are unavailable.
- 👥 **Caregiver Handoff & Notes**: Generate simplified family summaries and record patient-reported notes labeled as unverified.
- 🛡️ **Built-in Deterministic Demo Mode**: Full hackathon demonstration runs reliably offline or under API service disruptions.
- 🔄 **One-Click Demo Reset**: Instantly restore clean state for repeated demonstrations and judging evaluations.

---

## Architecture

```
MediMemory Monorepo (pnpm workspace)
├── artifacts/
│   ├── medimemory/        # Main Frontend Application (Vite + React 19 + Tailwind CSS)
│   ├── api-server/        # Backend API Service (Node.js 24 + Express 5 + Drizzle ORM)
│   └── mockup-sandbox/    # UI Component Sandbox & Prototyping
├── lib/
│   ├── db/                # PostgreSQL Schema & Drizzle ORM Configuration
│   ├── api-spec/          # OpenAPI 3.1 Specification & Orval Codegen
│   ├── api-zod/           # Zod Validation Schemas
│   └── api-client-react/  # Auto-generated TanStack React Query Hooks
├── attached_assets/       # Static assets, demo documents & brand media
└── screenshots/           # Previews across mobile and desktop viewports
```

---

## Tech Stack

- **Frontend**: React 19, TypeScript 5.9, Tailwind CSS 4, Lucide Icons, Framer Motion, Wouter SPA Router
- **Backend**: Node.js 24, Express 5, Pino Logger, CORS
- **Database & Validation**: PostgreSQL, Drizzle ORM, Zod
- **Build System**: Vite 7, esbuild, pnpm workspaces

---

## Demo Walkthrough

The demo follows the realistic patient journey of **Arjun Rao** discharged from **Sunrise General Hospital**:

1. **Landing**: Start on the patient onboarding screen.
2. **Scan**: Capture or click `Use Demo Document` (18 September 2026 discharge).
3. **Processing**: Optical pipeline structures medicines, precautions, and dates.
4. **Home / Today**: View 22 September 2026 status (Medicine A twice daily, Medicine B once daily, avoid strenuous activity).
5. **Timeline**: Review chronological milestones up to the 02 October 2026 follow-up.
6. **Ask MediMemory**: Ask questions like *"When is my follow-up?"* or *"Should I stop Medicine A?"*.
7. **Show Source**: Click *"Show in full document"* to view Page 3 of the Discharge Summary with exact highlighted text.
8. **Caregiver**: Share the care summary link and record voice/text care notes.
9. **Office Kit**: Experience real-time clinical desk synchronization.
10. **Reset**: Use `Reset Demo` from the header to reset state for another demonstration.

---

## Safety & Clinical Guardrails

MediMemory adheres to strict medical AI safety principles:

- **No Medical Advice**: MediMemory never diagnoses conditions, prescribes medicines, or suggests altering dosages.
- **Provider Redirection**: Questions requesting medication discontinuation receive a safety refusal redirecting the patient to their physician.
- **Separation of Concerns**: Patient/caregiver notes are clearly badged as *"Patient-reported note"* and are never mixed with verified doctor instructions.
- **Source Verification**: All AI assertions link back to verifiable source documents.

---

## Local Development

### Prerequisites

- **Node.js**: v20.x or v24.x
- **pnpm**: v9.x or v10.x

### Installation

```bash
# Clone the repository
git clone <URL>
cd MediMemory-Care-Memory

# Install dependencies across all packages
pnpm install
```

### Running Locally

#### Terminal 1 — Frontend (Main Web Application)
```bash
pnpm --filter @workspace/medimemory run dev
```
*Accessible at `http://localhost:5173`*

#### Terminal 2 — Backend API Server (Optional)
```bash
pnpm --filter @workspace/api-server run dev
```
*Accessible at `http://localhost:5000`*

### Typecheck & Production Build

```bash
# Run typecheck across all packages
pnpm run typecheck

# Run production build across all packages
pnpm run build
```

---

## Environment Variables

Copy `.env.example` to `.env` to customize settings:

```bash
cp .env.example .env
```

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `PORT` | API Server Port / Preview Port | `5000` |
| `VITE_PORT` | Frontend Development Port | `5173` |
| `BASE_PATH` | Base Path for Web Assets | `/` |
| `NODE_ENV` | Runtime Environment | `development` / `production` |
| `LOG_LEVEL` | Pino Logger Level | `info` |
| `DATABASE_URL` | PostgreSQL Connection URI | `postgresql://user:pass@localhost:5432/medimemory` |
| `AI_API_KEY` | Optional External AI API Key | *(Optional; demo uses deterministic fallback)* |
| `API_BASE_URL` | Backend URL for Client Requests | `http://localhost:5000` |

---

## Deployment

### Frontend Deployment (Vercel, Netlify, Cloudflare Pages, Replit)

1. Root directory: `artifacts/medimemory`
2. Build command: `pnpm run build`
3. Output directory: `dist/public`
4. Single Page Application (SPA) rewrite rule: Route all paths `/*` to `/index.html`.

### Backend Deployment (Docker, Render, Railway, Fly.io)

1. Build command: `pnpm --filter @workspace/api-server run build`
2. Start command: `pnpm --filter @workspace/api-server run start`
3. Ensure `PORT` and `DATABASE_URL` (if using PostgreSQL) are configured in the environment.

---

## Screenshots

| Mobile Today Screen | Ask MediMemory | Show Source Document |
| :---: | :---: | :---: |
| ![Today](screenshots/mobile-home.png) | ![Ask](screenshots/mobile-ask.png) | ![Source](screenshots/mobile-source.png) |

---

## Team

- **MediMemory Team** — Hackathon Submission 2026
