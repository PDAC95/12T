# TALQ - Language Learning Platform

![Status](https://img.shields.io/badge/status-in%20development-yellow)
![Sprint](https://img.shields.io/badge/sprint-1-blue)
![Stack](https://img.shields.io/badge/stack-MERN-green)

**"Let's Talq"** - Plataforma web integrada para escuelas de idiomas que unifica gestión de clases presenciales, tareas, exámenes de 4 habilidades, videocápsulas y seguimiento de progreso en un solo lugar.

---

## 🎯 Product Vision

TALQ resuelve la fragmentación actual entre múltiples herramientas (Zoom, Google Classroom, WhatsApp) que dificultan el seguimiento del progreso del estudiante y la entrega de contenido estructurado en escuelas de idiomas.

### For Whom
Escuelas de idiomas (inicialmente enfocado en inglés) que ofrecen modelo híbrido presencial-digital.

### The Problem
Falta de integración entre la experiencia presencial y digital, sin seguimiento unificado del progreso del estudiante según el temario establecido.

### Our Solution
Plataforma web integrada (MERN) con arquitectura escalable para adaptarse a cualquier tipo de curso.

---

## 🚀 Tech Stack

### Frontend
- **Framework:** React 17.0.2 (Create React App)
- **Base Template:** Acorn React E-learning Portal
- **UI Library:** Bootstrap 5 + React Bootstrap 2.0.0
- **State Management:** Redux Toolkit 1.6.0
- **Forms:** Formik 2.2.9 + Yup 0.32.9
- **Routing:** React Router DOM 5.2.0
- **Icons:** CS Line Icons
- **HTTP Client:** Axios 0.21.1

### Backend
- **Runtime:** Node.js 22.12.0 LTS
- **Framework:** Express.js 4.21.1
- **Language:** TypeScript 5.3.0
- **Database:** MongoDB 8.0 + Mongoose 8.8.3
- **Auth:** JWT + Passport.js (Google/Facebook OAuth)
- **Real-time:** Socket.io 4.8.1
- **Email:** Resend 4.0.1
- **File Storage:** AWS S3

### Infrastructure
- **Frontend:** Vercel
- **Backend:** Railway
- **Database:** MongoDB Atlas
- **CDN:** Cloudflare
- **Monitoring:** Sentry

---

## 📂 Project Structure

```
12T/
├── frontend/               # React 17 + Acorn Template
│   ├── src/
│   │   ├── components/    # Shared components
│   │   ├── features/      # Feature modules
│   │   ├── hooks/         # Custom hooks
│   │   ├── routes/        # Routing
│   │   └── utils/         # Helpers
│   └── package.json
├── backend/               # Express TypeScript
│   ├── src/
│   │   ├── config/        # Configuration
│   │   ├── models/        # Mongoose models
│   │   ├── controllers/   # Controllers
│   │   ├── routes/        # Routes
│   │   ├── middleware/    # Middleware
│   │   ├── services/      # Business logic
│   │   └── validators/    # Validation schemas
│   └── package.json
└── docs/                  # Documentation
    ├── PRD.md
    ├── Architecture.md
    ├── backlog.md
    ├── Sprint 1.md
    └── Tasks S1.md
```

---

## 🎨 Brand Identity

### Colors
- **Primary (Coral):** #E16449
- **Secondary (Honey Yellow):** #FFBF40
- **Dark:** #181B21
- **Gray:** #868686

### Typography
- **Primary Font:** Switzer

### Logo
Burbuja coral (#E16449) con tres puntos suspensivos, representando "Let's Talq"

---

## 🏃 Getting Started

### Prerequisites
- Node.js 22.12.0 LTS or higher
- npm or yarn
- MongoDB (local or Atlas account)
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/PDAC95/12T.git
cd 12T
```

2. **Install Frontend Dependencies**
```bash
cd frontend
npm install
```

3. **Install Backend Dependencies**
```bash
cd ../backend
npm install
```

4. **Environment Variables**

Create `.env` files in both frontend and backend directories:

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your-google-client-id
VITE_FACEBOOK_APP_ID=your-facebook-app-id
```

**Backend (.env):**
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/talq-dev
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-refresh-token-secret
RESEND_API_KEY=your-resend-api-key
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_S3_BUCKET=talq-uploads
FRONTEND_URL=http://localhost:5173
```

5. **Run Development Servers**

**Frontend:**
```bash
cd frontend
npm start
```

**Backend:**
```bash
cd backend
npm run dev
```

---

## 📋 Current Sprint

### Sprint 1 (Dec 10-23, 2025)
**Goal:** "Establecer la fundación del proyecto: los usuarios pueden descubrir TALQ y registrarse como estudiantes con confirmación de email"

**User Stories:**
- US-001: Landing Page con Opciones de Acceso
- US-002: Registro de Estudiantes con Selección de Nivel
- US-003: Confirmación de Email Obligatoria

**Progress:** 0/28 tasks completed

---

## 🗺️ Roadmap

### MVP (18 weeks - 9 sprints)
- ✅ **Sprint 1-2:** Foundation & Auth
- 🔄 **Sprint 3-4:** Core Features (Courses, Classes, Assignments)
- ⏳ **Sprint 5-6:** Exams & Video Content
- ⏳ **Sprint 7-8:** Real-time Chat & Polish
- ⏳ **Sprint 9:** Deployment & Launch

### Post-MVP
- Gamification (badges, leaderboard)
- Email notifications
- Advanced reports
- Google Calendar integration
- Discussion forum

### Phase IA (Future)
- 24/7 AI Tutor chatbot
- Conversational practice with AI
- Automatic pronunciation correction
- Personalized recommendations

---

## 👥 User Roles

1. **Students:** Take classes, submit assignments, take exams, watch videos, track progress
2. **Teachers:** Create courses, manage classes, grade assignments/exams, upload content
3. **Administrators:** Manage users, oversee platform, access reports

---

## 📚 Documentation

Full documentation available in `/docs`:
- [PRD.md](docs/PRD.md) - Product Requirements Document
- [Architecture.md](docs/Architecture.md) - Technical Architecture
- [backlog.md](docs/backlog.md) - Product Backlog
- [Sprint 1.md](docs/Sprint%201.md) - Sprint Planning
- [Tasks S1.md](docs/Tasks%20S1.md) - Task Breakdown

---

## 🤝 Contributing

This is a private project currently in development. For questions or suggestions, contact:
- **Email:** patricio@ac95.ca
- **Repository:** https://github.com/PDAC95/12T

---

## 📄 License

Proprietary - All rights reserved

---

## 🙏 Acknowledgments

- **Base Template:** [Acorn React E-learning Portal](https://acorn-react-elearning-portal.coloredstrategies.com/)
- **Development Framework:** Agile/Scrum methodology

---

**Version:** 1.0.0
**Last Updated:** December 10, 2025
**Status:** 🟡 In Development (Sprint 1)

---

**Let's Talq! 🗣️**
