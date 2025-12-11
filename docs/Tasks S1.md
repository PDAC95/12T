# TASKS - Sprint 1 (v3.0 - Acorn Edition)

**Producto:** TALQ - Plataforma de Aprendizaje de Idiomas  
**Sprint:** 1 - "Establecer la fundación del proyecto: los usuarios pueden descubrir TALQ y registrarse como estudiantes con confirmación de email"  
**Sprint Dates:** 10 Diciembre 2025 - 23 Diciembre 2025  
**Last Updated:** 10 Diciembre 2025  
**Version:** 3.0 - Optimizado para Acorn Template  
**Base Template:** Acorn React E-learning Portal

---

## Sprint Overview

### Sprint Goal 🎯

**"Establecer la fundación del proyecto: los usuarios pueden descubrir TALQ y registrarse como estudiantes con confirmación de email"**

### Sprint Stats

- **Total Tasks:** 28 tareas (reducido de 46 gracias a Acorn)
- **Estimated Hours:** ~30-35 hrs (reducido de 45-55 hrs)
- **User Stories:** 3 stories
- **Current Day:** Day 1 of 10
- **Template Savings:** ~40% menos trabajo en frontend

### Progress Summary

- ✅ **Completed:** 0 tasks (0%)
- 🔄 **In Progress:** 0 tasks
- ⏸️ **Blocked:** 0 tasks
- 📋 **Not Started:** 28 tasks

### Task Distribution by Owner

- **👤 Manual (Patricio):** 5 tareas → Setup, config, deploy
- **🎨 Frontend:** 10 tareas → Adaptación template, personalización
- **⚙️ Backend:** 10 tareas → API TypeScript, servicios
- **🗄️ DB:** 1 tarea → Modelo User
- **✅ QA:** 2 tareas → Testing

### Lo que Acorn YA incluye (no hay que crear):

- ✅ Navbar component
- ✅ Footer component
- ✅ Button components
- ✅ Input components
- ✅ Form validation (Formik + Yup)
- ✅ Axios configurado
- ✅ Redux Toolkit configurado
- ✅ ESLint + Prettier configurados
- ✅ Responsive design
- ✅ Landing page base
- ✅ Login page base
- ✅ Register page base

---

## Task Breakdown by User Story

### 📦 US-001: Landing Page con Opciones de Acceso

**Story Points:** 3 (M) → Reducido a 2 (S) con template  
**Priority in Sprint:** 1  
**Status:** 📋 Not Started  
**Estimated Hours:** 6-8 hrs (antes: 12-16 hrs)

#### Tasks:

##### 🔴 P0 - Critical Setup

**[TASK-001] Create GitHub repository and clone Acorn template**

- **Owner:** 👤 Manual (Patricio)
- **Estimated:** S (45 min)
- **Files:** `README.md`, `.gitignore`, todo el template
- **Description:**
  1. Crear repo "talq" en GitHub
  2. Copiar template Acorn E-learning al repo
  3. Actualizar README con info de TALQ
  4. Primer commit: "chore: initial project setup with Acorn template"
- **Dependencies:** NINGUNA (primera tarea)
- **Blocks:** TODO
- **Status:** ✅ Completed (Dec 10, 2025)

---

**[TASK-002] Configure TALQ color theme in Acorn**

- **Owner:** 🎨 Frontend
- **Estimated:** S (45 min)
- **Files:** `src/sass/_variables.scss`, theme files
- **Description:**
  1. Localizar archivos de variables de Acorn
  2. Cambiar colores primarios:
     - Primary: #E16449 (Coral)
     - Secondary: #FFBF40 (Amarillo miel)
     - Dark: #181B21 (Negro profundo)
     - Gray: #868686 (Gris medio)
  3. Verificar que los cambios se aplican globalmente
  4. Commit: "feat(theme): configure TALQ brand colors"
- **Dependencies:** TASK-001
- **Blocks:** TASK-004, TASK-005
- **Status:** ✅ Completed (Dec 10, 2025)

---

**[TASK-003] Configure Switzer font**

- **Owner:** 🎨 Frontend
- **Estimated:** XS (20 min)
- **Files:** `src/sass/_variables.scss`, `public/index.html`
- **Description:**
  1. Agregar font Switzer (Google Fonts o local)
  2. Configurar como font principal en variables
  3. Verificar que se aplica en toda la app
  4. Commit: "feat(theme): add Switzer font"
- **Dependencies:** TASK-001
- **Blocks:** Ninguno
- **Status:** ✅ Completed (Dec 10, 2025)

---

**[TASK-004] Create TALQ logo SVG**

- **Owner:** 🎨 Frontend
- **Estimated:** XS (15 min)
- **Files:** `src/assets/img/logo/logo-talq.svg`
- **Description:**
  1. Crear SVG: burbuja coral (#E16449) con tres puntos
  2. Guardar en carpeta de logos de Acorn
  3. Reemplazar logo default en Navbar
  4. Commit: "feat(assets): add TALQ logo"
- **Dependencies:** TASK-002
- **Blocks:** TASK-005
- **Status:** 📋 Not Started

---

**[TASK-005] Customize Landing page content**

- **Owner:** 🎨 Frontend
- **Estimated:** M (1.5 hrs)
- **Files:** Landing page component de Acorn
- **Description:**
  1. Localizar landing page en template Acorn
  2. Cambiar hero section:
     - Título: "Let's Talq"
     - Subtítulo: valor de la plataforma
  3. Agregar botones: "Soy Estudiante" y "Soy Profesor/Admin"
  4. Personalizar features section con beneficios TALQ
  5. Actualizar footer con info de contacto
  6. Commit: "feat(landing): customize for TALQ"
- **Dependencies:** TASK-002, TASK-004
- **Blocks:** TASK-006
- **Status:** 📋 Not Started

---

**[TASK-006] Configure routing for landing**

- **Owner:** 🎨 Frontend
- **Estimated:** XS (20 min)
- **Files:** `src/routing/`, routes config
- **Description:**
  1. Configurar "/" como landing page
  2. Configurar "/login" para estudiantes
  3. Configurar "/admin-login" para profesores/admin
  4. Verificar navegación funciona
  5. Commit: "feat(routing): configure landing routes"
- **Dependencies:** TASK-005
- **Blocks:** TASK-007
- **Status:** 📋 Not Started

---

**[TASK-007] Test responsive and deploy to Vercel**

- **Owner:** 👤 Manual
- **Estimated:** S (45 min)
- **Files:** N/A
- **Description:**
  1. Probar landing en desktop, tablet, mobile
  2. Conectar repo a Vercel
  3. Configurar build settings para CRA
  4. Deploy inicial
  5. Verificar que funciona en producción
  6. Commit: "chore: configure Vercel deployment"
- **Dependencies:** TASK-006
- **Blocks:** Ninguno (US-001 DONE)
- **Status:** 📋 Not Started

---

### 📦 US-002: Registro de Estudiantes con Selección de Nivel

**Story Points:** 3 (M) → Reducido a 2.5 con template  
**Priority in Sprint:** 2  
**Status:** 📋 Not Started  
**Estimated Hours:** 12-14 hrs (antes: 14-18 hrs)

#### Tasks:

##### Backend Setup (TypeScript)

**[TASK-008] Initialize backend with Express + TypeScript**

- **Owner:** ⚙️ Backend
- **Estimated:** M (1 hr)
- **Files:** `backend/package.json`, `backend/tsconfig.json`, `backend/src/index.ts`
- **Description:**
  1. Crear carpeta `/backend` en el repo
  2. `npm init -y`
  3. Instalar: express, typescript, ts-node-dev, @types/express
  4. Configurar tsconfig.json
  5. Crear src/index.ts con servidor básico
  6. Scripts: "dev": "ts-node-dev src/index.ts"
  7. Commit: "feat(backend): initialize Express with TypeScript"
- **Dependencies:** TASK-001
- **Blocks:** TASK-009, TASK-010
- **Status:** ✅ Completed (Dec 10, 2025)

---

**[TASK-009] Configure MongoDB connection**

- **Owner:** ⚙️ Backend
- **Estimated:** S (30 min)
- **Files:** `backend/src/config/db.ts`, `.env`
- **Description:**
  1. Instalar mongoose, dotenv
  2. Crear config/db.ts con conexión
  3. Crear .env con MONGO_URI
  4. Conectar al iniciar servidor
  5. Commit: "feat(backend): configure MongoDB connection"
- **Dependencies:** TASK-008
- **Blocks:** TASK-011
- **Status:** 📋 Not Started

---

**[TASK-010] Setup Resend for emails**

- **Owner:** ⚙️ Backend
- **Estimated:** S (30 min)
- **Files:** `backend/src/config/email.ts`
- **Description:**
  1. Crear cuenta en Resend
  2. Instalar resend SDK
  3. Crear config/email.ts
  4. Agregar RESEND_API_KEY a .env
  5. Probar envío de email de prueba
  6. Commit: "feat(backend): configure Resend email service"
- **Dependencies:** TASK-008
- **Blocks:** TASK-016
- **Status:** 📋 Not Started

---

**[TASK-011] Create User model**

- **Owner:** 🗄️ DB
- **Estimated:** M (1 hr)
- **Files:** `backend/src/models/User.ts`
- **Description:**
  1. Crear schema con campos:
     - email, password, name, role
     - englishLevel, isEmailConfirmed
     - confirmationToken, confirmationExpires
     - createdAt, updatedAt
  2. Agregar índices (email unique)
  3. Pre-save hook para hash password
  4. Commit: "feat(models): create User model"
- **Dependencies:** TASK-009
- **Blocks:** TASK-013
- **Status:** 📋 Not Started

---

**[TASK-012] Create validation schemas with Yup**

- **Owner:** ⚙️ Backend
- **Estimated:** S (30 min)
- **Files:** `backend/src/validations/auth.validation.ts`
- **Description:**
  1. Instalar yup
  2. Crear schema para registro:
     - email: válido y requerido
     - password: min 8, mayúscula, número, especial
     - name: requerido
     - englishLevel: enum válido
  3. Commit: "feat(validation): add auth validation schemas"
- **Dependencies:** TASK-008
- **Blocks:** TASK-013
- **Status:** 📋 Not Started

---

**[TASK-013] Create register endpoint**

- **Owner:** ⚙️ Backend
- **Estimated:** M (1.5 hrs)
- **Files:** `backend/src/controllers/auth.controller.ts`, `backend/src/routes/auth.routes.ts`
- **Description:**
  1. Crear POST /api/auth/register
  2. Validar input con Yup schema
  3. Verificar email no existe
  4. Hash password con bcrypt
  5. Generar token de confirmación (JWT)
  6. Guardar usuario
  7. Retornar success (sin enviar email aún)
  8. Commit: "feat(auth): create register endpoint"
- **Dependencies:** TASK-011, TASK-012
- **Blocks:** TASK-016
- **Status:** 📋 Not Started

---

**[TASK-014] Create email template for confirmation**

- **Owner:** ⚙️ Backend
- **Estimated:** S (45 min)
- **Files:** `backend/src/templates/confirmEmail.ts`
- **Description:**
  1. Crear template HTML responsive
  2. Incluir logo TALQ, colores de marca
  3. Mensaje claro con botón CTA
  4. Link de confirmación
  5. Commit: "feat(email): create confirmation email template"
- **Dependencies:** TASK-004
- **Blocks:** TASK-016
- **Status:** 📋 Not Started

---

##### Frontend Adaptation

**[TASK-015] Adapt Register page from Acorn**

- **Owner:** 🎨 Frontend
- **Estimated:** M (1.5 hrs)
- **Files:** Register page component de Acorn
- **Description:**
  1. Localizar Register page en template
  2. Agregar campo "Nivel de Inglés" (Select):
     - Beginner (A1)
     - Elementary (A2)
     - Intermediate (B1)
     - Upper-Intermediate (B2)
     - Advanced (C1)
  3. Verificar validaciones con Formik+Yup
  4. Personalizar estilos con colores TALQ
  5. Commit: "feat(auth): customize register page"
- **Dependencies:** TASK-002, TASK-006
- **Blocks:** TASK-017
- **Status:** 📋 Not Started

---

**[TASK-016] Integrate email sending in register**

- **Owner:** ⚙️ Backend
- **Estimated:** S (30 min)
- **Files:** `backend/src/controllers/auth.controller.ts`
- **Description:**
  1. Importar config de Resend
  2. Importar template de email
  3. Después de crear usuario, enviar email
  4. Manejar errores de envío
  5. Commit: "feat(auth): integrate email confirmation"
- **Dependencies:** TASK-010, TASK-013, TASK-014
- **Blocks:** TASK-018
- **Status:** 📋 Not Started

---

**[TASK-017] Connect frontend to register API**

- **Owner:** 🎨 Frontend
- **Estimated:** M (1 hr)
- **Files:** `src/services/auth.service.js`, Register component
- **Description:**
  1. Crear/adaptar auth service con Axios
  2. Configurar baseURL del backend
  3. Conectar form submit a API
  4. Manejar respuesta exitosa
  5. Manejar errores y mostrar mensajes
  6. Commit: "feat(auth): connect register to API"
- **Dependencies:** TASK-013, TASK-015
- **Blocks:** TASK-018
- **Status:** 📋 Not Started

---

**[TASK-018] Create "Check your email" page**

- **Owner:** 🎨 Frontend
- **Estimated:** S (30 min)
- **Files:** Nuevo componente CheckEmailPage
- **Description:**
  1. Crear página simple post-registro
  2. Mensaje: "Revisa tu email para confirmar tu cuenta"
  3. Icono de email/check
  4. Link para reenviar (UI only, funcionalidad en US-003)
  5. Commit: "feat(auth): create check email page"
- **Dependencies:** TASK-017
- **Blocks:** Ninguno (US-002 DONE)
- **Status:** 📋 Not Started

---

### 📦 US-003: Confirmación de Email Obligatoria

**Story Points:** 2 (S)  
**Priority in Sprint:** 3  
**Status:** 📋 Not Started  
**Estimated Hours:** 8-10 hrs

#### Tasks:

**[TASK-019] Create confirm email endpoint**

- **Owner:** ⚙️ Backend
- **Estimated:** M (1 hr)
- **Files:** `backend/src/controllers/auth.controller.ts`
- **Description:**
  1. Crear GET /api/auth/confirm-email/:token
  2. Verificar token JWT válido
  3. Verificar token no expirado (24 hrs)
  4. Marcar user.isEmailConfirmed = true
  5. Invalidar token
  6. Retornar success
  7. Commit: "feat(auth): create confirm email endpoint"
- **Dependencies:** TASK-013
- **Blocks:** TASK-022
- **Status:** 📋 Not Started

---

**[TASK-020] Create resend confirmation endpoint**

- **Owner:** ⚙️ Backend
- **Estimated:** S (45 min)
- **Files:** `backend/src/controllers/auth.controller.ts`
- **Description:**
  1. Crear POST /api/auth/resend-confirmation
  2. Recibir email del usuario
  3. Generar nuevo token
  4. Reenviar email de confirmación
  5. Rate limiting: max 3 por hora
  6. Commit: "feat(auth): create resend confirmation endpoint"
- **Dependencies:** TASK-016
- **Blocks:** TASK-024
- **Status:** 📋 Not Started

---

**[TASK-021] Deploy backend to Railway**

- **Owner:** 👤 Manual
- **Estimated:** S (45 min)
- **Files:** N/A
- **Description:**
  1. Crear cuenta/proyecto en Railway
  2. Conectar repo
  3. Configurar variables de entorno
  4. Deploy backend
  5. Verificar endpoints funcionan
  6. Commit: "chore: configure Railway deployment"
- **Dependencies:** TASK-016
- **Blocks:** TASK-022
- **Status:** 📋 Not Started

---

**[TASK-022] Create ConfirmEmailPage**

- **Owner:** 🎨 Frontend
- **Estimated:** M (1 hr)
- **Files:** Nuevo componente ConfirmEmailPage
- **Description:**
  1. Crear página /confirm-email/:token
  2. Al cargar, llamar API de confirmación
  3. Si success: mostrar mensaje de éxito, redirect a login
  4. Si error: mostrar mensaje claro
  5. Opción "Reenviar email"
  6. Commit: "feat(auth): create confirm email page"
- **Dependencies:** TASK-019, TASK-021
- **Blocks:** TASK-024
- **Status:** 📋 Not Started

---

**[TASK-023] Create dashboard placeholder**

- **Owner:** 🎨 Frontend
- **Estimated:** XS (20 min)
- **Files:** Dashboard page de Acorn
- **Description:**
  1. Localizar dashboard en Acorn
  2. Simplificar a placeholder
  3. Mensaje: "Dashboard - Coming Soon"
  4. Asegurar ruta /student/dashboard funciona
  5. Commit: "feat(dashboard): create placeholder"
- **Dependencies:** TASK-006
- **Blocks:** Ninguno
- **Status:** 📋 Not Started

---

**[TASK-024] Implement resend functionality in frontend**

- **Owner:** 🎨 Frontend
- **Estimated:** S (30 min)
- **Files:** CheckEmailPage, ConfirmEmailPage
- **Description:**
  1. Conectar botón "Reenviar" a API
  2. Mostrar loading state
  3. Mostrar success/error message
  4. Disabled después de enviar (cooldown 60s)
  5. Commit: "feat(auth): implement resend functionality"
- **Dependencies:** TASK-020, TASK-022
- **Blocks:** TASK-025
- **Status:** 📋 Not Started

---

##### QA Tasks

**[TASK-025] E2E testing of registration flow**

- **Owner:** ✅ QA
- **Estimated:** M (1 hr)
- **Files:** N/A
- **Description:**
  1. Test happy path: register → email → confirm → success
  2. Test validaciones frontend
  3. Test email duplicado
  4. Test password inválido
  5. Documentar bugs encontrados
- **Dependencies:** TASK-018
- **Blocks:** Ninguno
- **Status:** 📋 Not Started

---

**[TASK-026] E2E testing of confirmation flow**

- **Owner:** ✅ QA
- **Estimated:** S (45 min)
- **Files:** N/A
- **Description:**
  1. Test token válido → success
  2. Test token expirado → error + reenviar
  3. Test token ya usado → error
  4. Test token inválido → error
  5. Test reenviar funciona
  6. Documentar bugs encontrados
- **Dependencies:** TASK-024
- **Blocks:** Ninguno (US-003 DONE)
- **Status:** 📋 Not Started

---

##### Buffer Tasks

**[TASK-027] Bug fixes and polish**

- **Owner:** 👤 All
- **Estimated:** L (3-4 hrs)
- **Files:** Various
- **Description:**
  1. Fix bugs encontrados en QA
  2. Polish UI details
  3. Remove console.logs
  4. Code cleanup
- **Dependencies:** TASK-025, TASK-026
- **Blocks:** Ninguno
- **Status:** 📋 Not Started

---

**[TASK-028] Update documentation**

- **Owner:** 👤 Manual
- **Estimated:** S (30 min)
- **Files:** README.md, docs
- **Description:**
  1. Actualizar README con setup instructions
  2. Documentar variables de entorno necesarias
  3. Documentar API endpoints creados
- **Dependencies:** TASK-027
- **Blocks:** Ninguno (Sprint DONE)
- **Status:** 📋 Not Started

---

## 📅 Daily Schedule

### Day 1 (10 Dic): Setup Foundation

**Goal:** Template configurado + Backend iniciado

**Tasks (~6-7 hrs):**

1. ✅ TASK-001 (Manual) - 45min - Repo + Acorn
2. ✅ TASK-002 (Frontend) - 45min - Colores TALQ
3. ✅ TASK-003 (Frontend) - 20min - Font Switzer
4. ✅ TASK-008 (Backend) - 1hr - Express TypeScript
5. ✅ TASK-009 (Backend) - 30min - MongoDB
6. ✅ TASK-010 (Backend) - 30min - Resend

**End of Day:** Template con colores + Backend conectado a DB

---

### Day 2 (11 Dic): Landing + User Model

**Goal:** US-001 casi listo + Backend models

**Tasks (~6-7 hrs):**

1. ✅ TASK-004 (Frontend) - 15min - Logo TALQ
2. ✅ TASK-005 (Frontend) - 1.5hr - Landing content
3. ✅ TASK-006 (Frontend) - 20min - Routing
4. ✅ TASK-011 (DB) - 1hr - User model
5. ✅ TASK-012 (Backend) - 30min - Validations

**End of Day:** Landing personalizada + User model listo

---

### Day 3 (12 Dic): Deploy Landing + Register Endpoint

**Goal:** US-001 DONE + Backend register

**Tasks (~6-7 hrs):**

1. ✅ TASK-007 (Manual) - 45min - Deploy Vercel → **US-001 DONE** ✅
2. ✅ TASK-013 (Backend) - 1.5hr - Register endpoint
3. ✅ TASK-014 (Backend) - 45min - Email template
4. ✅ TASK-015 (Frontend) - 1.5hr - Adapt register page

**End of Day:** Landing deployada + Register endpoint funcionando

---

### Day 4 (13 Dic): Integration

**Goal:** Frontend conectado a Backend

**Tasks (~5-6 hrs):**

1. ✅ TASK-016 (Backend) - 30min - Email integration
2. ✅ TASK-017 (Frontend) - 1hr - Connect to API
3. ✅ TASK-018 (Frontend) - 30min - Check email page
4. ✅ TASK-025 (QA) - 1hr - Test registration → **US-002 DONE** ✅

**End of Day:** Registro completo end-to-end

---

### Day 5 (16 Dic): Confirmation Backend

**Goal:** Endpoints de confirmación listos

**Tasks (~5-6 hrs):**

1. ✅ TASK-019 (Backend) - 1hr - Confirm endpoint
2. ✅ TASK-020 (Backend) - 45min - Resend endpoint
3. ✅ TASK-021 (Manual) - 45min - Deploy Railway
4. ✅ TASK-023 (Frontend) - 20min - Dashboard placeholder

**End of Day:** Backend de US-003 completo + deployed

---

### Day 6 (17 Dic): Confirmation Frontend

**Goal:** US-003 casi completo

**Tasks (~4-5 hrs):**

1. ✅ TASK-022 (Frontend) - 1hr - ConfirmEmailPage
2. ✅ TASK-024 (Frontend) - 30min - Resend functionality
3. ✅ TASK-026 (QA) - 45min - Test confirmation → **US-003 DONE** ✅

**End of Day:** Todo el flujo funcionando

---

### Day 7-8 (18-19 Dic): Polish + Buffer

**Goal:** Bugs fixed, código limpio

**Tasks (~6-8 hrs):**

1. ✅ TASK-027 - 3-4hr - Bug fixes
2. ✅ TASK-028 - 30min - Documentation

**End of Day:** Sprint completo y pulido

---

### Day 9 (20 Dic): Sprint Review & Retro

**Goal:** Demo exitoso

**Tasks:**

1. Preparar demo
2. Sprint Review
3. Sprint Retrospective
4. Plan Sprint 2

---

## 🔀 Dependency Graph

```
SETUP (Day 1):
==============
TASK-001 (Repo + Acorn)
    ├─→ TASK-002 (Colors) ──→ TASK-004 (Logo) ──→ TASK-005 (Landing)
    ├─→ TASK-003 (Font)
    └─→ TASK-008 (Backend TS)
            ├─→ TASK-009 (MongoDB) ──→ TASK-011 (User Model)
            ├─→ TASK-010 (Resend)
            └─→ TASK-012 (Validations)

LANDING (Day 2-3):
==================
TASK-005 (Landing) ──→ TASK-006 (Routing) ──→ TASK-007 (Deploy)
                                                    │
                                              US-001 DONE ✅

REGISTRATION (Day 3-4):
=======================
Backend Path:
TASK-011 + TASK-012 ──→ TASK-013 (Register EP)
TASK-010 ──→ TASK-014 (Email Template)
TASK-013 + TASK-014 ──→ TASK-016 (Email Integration)

Frontend Path:
TASK-002 + TASK-006 ──→ TASK-015 (Register Page)
TASK-015 + TASK-016 ──→ TASK-017 (Connect API)
TASK-017 ──→ TASK-018 (Check Email Page)
TASK-018 ──→ TASK-025 (QA)
                │
          US-002 DONE ✅

CONFIRMATION (Day 5-6):
=======================
TASK-013 ──→ TASK-019 (Confirm EP)
TASK-016 ──→ TASK-020 (Resend EP)
TASK-019 + TASK-020 ──→ TASK-021 (Deploy Railway)

TASK-006 ──→ TASK-023 (Dashboard Placeholder)

TASK-021 + TASK-019 ──→ TASK-022 (ConfirmEmailPage)
TASK-020 + TASK-022 ──→ TASK-024 (Resend UI)
TASK-024 ──→ TASK-026 (QA)
                │
          US-003 DONE ✅

POLISH (Day 7-8):
=================
TASK-025 + TASK-026 ──→ TASK-027 (Fixes) ──→ TASK-028 (Docs)
```

---

## 🚀 Quick Start Guide

### Para empezar HOY:

1. **TASK-001** (45min) - Crear repo + copiar Acorn

   - Owner: TÚ (Manual)
   - No dependencies
   - Bloquea: TODO

2. **Después de TASK-001, hacer EN PARALELO:**

   - **TASK-002** (45min) - Configurar colores
   - **TASK-008** (1hr) - Backend TypeScript

3. **Seguir con:**
   - **TASK-003** + **TASK-009** en paralelo

### Orden óptimo Día 1:

```
09:00 - TASK-001 (repo + Acorn)
09:45 - TASK-002 (colores) + TASK-008 (backend) en paralelo
11:00 - TASK-003 (font) + TASK-009 (MongoDB) en paralelo
12:00 - ALMUERZO
13:00 - TASK-010 (Resend)
14:00 - Verificar todo funciona
15:00 - FIN DÍA 1
```

---

## Comparación: Sin Template vs Con Acorn

| Área            | Sin Template | Con Acorn | Ahorro |
| --------------- | ------------ | --------- | ------ |
| Tasks totales   | 46           | 28        | 39%    |
| Horas estimadas | 45-55 hrs    | 30-35 hrs | 36%    |
| Setup frontend  | 8 tasks      | 3 tasks   | 62%    |
| Componentes UI  | 6 tasks      | 0 tasks   | 100%   |
| Auth pages      | 4 tasks      | 2 tasks   | 50%    |

---

**Last Updated:** 2025-12-10  
**Version:** 3.0 (Acorn Edition)  
**Maintained by:** Patricio

---

**🎯 READY TO START! Comienza con TASK-001!**
