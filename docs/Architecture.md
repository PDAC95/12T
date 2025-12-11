# ARCHITECTURE.md - TALQ Language Learning Platform

**Version:** 1.2 (Acorn Template + TypeScript Backend)  
**Created:** Diciembre 10, 2025  
**Last Updated:** Diciembre 10, 2025  
**Maintained by:** Patricio

---

## Project Overview

**Product:** TALQ - Language Learning Platform  
**Type:** Full-stack Web Application (MERN Stack)  
**Status:** 🟡 Planning → Ready for Development

**MVP Scope:**
Sistema integrado de gestión educativa para escuelas de idiomas que unifica clases presenciales, tareas, exámenes de 4 habilidades (Listening, Reading, Writing, Speaking), videocápsulas y seguimiento de progreso en tiempo real. Incluye chat interno, autenticación con OAuth, y dashboards personalizados para estudiantes, profesores y administradores.

**Target Launch:** 18 semanas (MVP completo)  
**First Milestone:** 4 semanas (autenticación + dashboards básicos)

---

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Cloudflare CDN                          │
│              (DNS, SSL, DDoS Protection)                    │
└───────────────────────┬─────────────────────────────────────┘
                        │
        ┌───────────────┴───────────────┐
        │                               │
┌───────▼────────┐              ┌──────▼────────┐
│  Vercel CDN    │              │   Railway     │
│  (Frontend)    │              │   (Backend)   │
│                │              │               │
│  React 17    │◄────────────►│  Node 22 LTS  │
│  + CRA       │   REST API   │  + Express 4  │
│  + Bootstrap │   WebSocket  │  + Socket.io  │
└────────┬───────┘              └───────┬───────┘
         │                              │
         │                              │
         │         ┌────────────────────┴──────────────┐
         │         │                                   │
         │   ┌─────▼──────┐                    ┌──────▼──────┐
         │   │ MongoDB    │                    │  AWS S3 /   │
         │   │  Atlas     │                    │   AWS S3    │
         │   │            │                    │             │
         │   │ Database   │                    │   Files &   │
         │   │ Cluster    │                    │   Videos    │
         │   └────────────┘                    └─────────────┘
         │
         └──────────────┐
                        │
                 ┌──────▼──────┐
                 │   Resend    │
                 │             │
                 │   Email     │
                 │  Service    │
                 └─────────────┘


User Flow:
┌──────────┐     HTTPS      ┌──────────┐     REST/WS    ┌──────────┐
│  Browser │ ──────────────►│ Frontend │ ──────────────►│  Backend │
│          │                 │  (SPA)   │                 │   (API)  │
└──────────┘                 └──────────┘                 └──────────┘
                                   │                           │
                                   │                           │
                              (State)                      (Persist)
                                   │                           │
                                   ▼                           ▼
                            ┌──────────┐                ┌──────────┐
                            │  Redux   │                │ MongoDB  │
                            │ Toolkit  │                │          │
                            └──────────┘                └──────────┘
```

### Architecture Principles

- **Separation of Concerns:** Frontend (React SPA) / Backend (REST API) / Database (MongoDB) claramente separados
- **Stateless Backend:** API no mantiene estado de sesión, todo en JWT tokens
- **API-First Design:** Backend expone API RESTful consumible por cualquier cliente
- **Security by Default:** Todos los endpoints protegidos requieren autenticación JWT
- **Scalability Ready:** Diseñado para escalar horizontalmente agregando instancias
- **Real-time Communication:** WebSocket (Socket.io) para chat y notificaciones
- **Mobile-First UI:** Responsive design que funciona en cualquier dispositivo

---

## Technology Stack

### Frontend (Based on Acorn React Admin Template)

```yaml
Core:
  Framework: React 17.0.2
  Language: JavaScript (ES2024)
  Build Tool: Create React App (CRA)
  Package Manager: yarn
  Base Template: Acorn React E-learning Portal

UI & Styling:
  CSS Framework: Bootstrap 5 + React Bootstrap 2.0.0
  Styling: Sass (SCSS) - Custom theme
  Icons: CS Line Icons (included in Acorn)
  Carousel: Glide.js 3.5.2
  Animations: CSS Transitions (Bootstrap built-in)

State Management:
  Global State: Redux Toolkit 1.6.0
  Persistence: Redux Persist
  Server State: Axios Mock Adapter (dev) / Axios (prod)

Routing:
  Router: React Router DOM 5.2.0
  Protected Routes: Custom PrivateRoute component

Data Fetching:
  HTTP Client: Axios 0.21.1
  WebSocket: Socket.io Client 4.8.1

Forms & Validation:
  Form Library: Formik 2.2.9
  Validation Schema: Yup 0.32.9

Rich Content:
  Text Editor: React Quilljs 1.2.17 (WYSIWYG)
  Video Player: Plyr React 3.0.8
  Audio Recording: MediaRecorder API (native)
  Calendar: FullCalendar 5.9.0
  Date Picker: React Datepicker 4.1.1
  Rating: React Rating 2.0.5

Notifications & Feedback:
  Toast: React Toastify (Acorn integrated)
  Modals: React Bootstrap Modal

Internationalization:
  i18n: react-i18next (multi-language support)

Themes:
  Light/Dark: Built-in theme switcher
  Color Palettes: 5 customizable palettes

Code Quality:
  Linting: ESLint + eslint-config-airbnb
  Formatting: Prettier
  Pre-commit: Husky + lint-staged

Testing:
  Unit Testing: Jest (CRA built-in)
  Component Testing: React Testing Library
  E2E Testing: Cypress (post-MVP)
```

### Backend

```yaml
Core:
  Runtime: Node.js 22.12.0 LTS
  Framework: Express.js 4.21.1
  Language: TypeScript 5.3.0
  Package Manager: npm
  Compiler: ts-node-dev (development) / tsc (production)

Database:
  Database: MongoDB 8.0
  ODM: Mongoose 8.8.3
  Schema Validation: Mongoose built-in + Zod

Authentication:
  Strategy: JWT (Access + Refresh Tokens)
  Library: jsonwebtoken 9.0.2
  Password Hashing: bcryptjs 2.4.3
  OAuth: Passport.js 0.7.0
    - passport-google-oauth20 2.0.0
    - passport-facebook 3.0.0

Real-time:
  WebSocket: Socket.io 4.8.1
  Events: send_message, receive_message, typing, user_online

File Handling:
  Upload Middleware: Multer 1.4.5-lts.1
  Storage: AWS S3 (@aws-sdk/client-s3 3.705.0)
  File Types: Images (PNG, JPG), Videos (MP4, MOV), Audio (MP3, WAV), Documents (PDF, DOCX)

Email Service:
  Provider: Resend 4.0.1
  Templates: HTML templates with inline CSS
  Use Cases: Confirmation, Password Reset, Welcome

API Validation:
  Schema Validation: Zod 3.23.8
  Input Sanitization: express-validator 7.2.0

Security:
  Helmet: helmet 8.0.0 (HTTP headers security)
  CORS: cors 2.8.5
  Rate Limiting: express-rate-limit 7.4.1
  XSS Protection: xss-clean 0.1.4
  Data Sanitization: express-mongo-sanitize 2.2.0

Logging:
  Logger: Winston 3.17.0
  Log Levels: error, warn, info, http, debug
  Transports: File, Console, (optional: Papertrail)

Error Tracking:
  Monitoring: Sentry 8.38.0

Code Quality:
  Linting: ESLint 9.15.0 + eslint-config-airbnb-base
  Formatting: Prettier 3.3.3
  Pre-commit: Husky 9.1.0

Testing:
  Unit Testing: Jest 29.7.0
  API Testing: Supertest 7.0.0
  Mocking: Jest mocks
```

### DevOps & Infrastructure

```yaml
Version Control:
  Platform: GitHub
  Branch Strategy: GitFlow (main, develop, feature/*)

CI/CD:
  Platform: GitHub Actions
  Workflow: .github/workflows/deploy.yml
  Stages: Lint → Test → Build → Deploy

Hosting:
  Frontend: Vercel (Free tier → Pro when needed)
  Backend: Railway ($5/month → scaling)
  Database: MongoDB Atlas (M10 Shared Cluster $10/month)
  Files: AWS S3 ($5/month estimated)

Domains:
  Primary: letstalq.com or letstalq.ai
  API: api.letstalq.com
  SSL: Automatic (Let's Encrypt via Vercel/Railway)

CDN:
  Provider: Cloudflare (Free tier)
  Purpose: DDoS protection, caching, DNS

Monitoring:
  Error Tracking: Sentry (Free tier: 5k errors/month)
  Uptime Monitoring: UptimeRobot (Free tier)
  Analytics: Google Analytics 4 or Plausible

Email Service:
  Provider: Resend (Free tier: 100 emails/day, upgrade to $20/month for 50k)

Environment Management:
  Development: .env.local (not committed)
  Production: Environment variables in Vercel/Railway dashboard
```

---

## Project Structure

### Monorepo Structure

```
talq/
│
├── .github/
│   └── workflows/
│       ├── frontend-deploy.yml      # Frontend CI/CD
│       └── backend-deploy.yml       # Backend CI/CD
│
├── frontend/
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── logo-talq.svg
│   │   └── manifest.json
│   │
│   ├── src/
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   ├── fonts/
│   │   │   └── icons/
│   │   │
│   │   ├── components/                # Shared components
│   │   │   ├── ui/                    # Base UI components
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   ├── Card.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   └── index.js
│   │   │   ├── layout/                # Layout components
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── DashboardLayout.jsx
│   │   │   └── common/                # Common shared components
│   │   │       ├── Loading.jsx
│   │   │       ├── ErrorBoundary.jsx
│   │   │       └── ProtectedRoute.jsx
│   │   │
│   │   ├── features/                  # Feature-based modules
│   │   │   ├── auth/
│   │   │   │   ├── components/
│   │   │   │   │   ├── LoginForm.jsx
│   │   │   │   │   ├── RegisterForm.jsx
│   │   │   │   │   ├── ForgotPasswordForm.jsx
│   │   │   │   │   └── SocialLoginButtons.jsx
│   │   │   │   ├── hooks/
│   │   │   │   │   ├── useAuth.js
│   │   │   │   │   └── useOAuth.js
│   │   │   │   ├── services/
│   │   │   │   │   └── authService.js
│   │   │   │   ├── store/
│   │   │   │   │   └── authStore.js          # Zustand store
│   │   │   │   └── pages/
│   │   │   │       ├── LoginPage.jsx
│   │   │   │       ├── AdminLoginPage.jsx
│   │   │   │       ├── RegisterPage.jsx
│   │   │   │       ├── ConfirmEmailPage.jsx
│   │   │   │       └── ResetPasswordPage.jsx
│   │   │   │
│   │   │   ├── dashboard/
│   │   │   │   ├── components/
│   │   │   │   │   ├── StudentDashboard.jsx
│   │   │   │   │   ├── TeacherDashboard.jsx
│   │   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   │   └── WelcomeMessage.jsx
│   │   │   │   ├── hooks/
│   │   │   │   │   └── useDashboardData.js
│   │   │   │   └── pages/
│   │   │   │       └── DashboardPage.jsx
│   │   │   │
│   │   │   ├── courses/
│   │   │   │   ├── components/
│   │   │   │   │   ├── CourseCard.jsx
│   │   │   │   │   ├── CourseList.jsx
│   │   │   │   │   ├── CreateCourseForm.jsx
│   │   │   │   │   └── SyllabusBuilder.jsx
│   │   │   │   ├── hooks/
│   │   │   │   │   └── useCourses.js
│   │   │   │   ├── services/
│   │   │   │   │   └── courseService.js
│   │   │   │   └── pages/
│   │   │   │       ├── CoursesPage.jsx
│   │   │   │       └── CourseDetailPage.jsx
│   │   │   │
│   │   │   ├── classes/
│   │   │   │   ├── components/
│   │   │   │   │   ├── ClassCalendar.jsx
│   │   │   │   │   ├── CreateClassForm.jsx
│   │   │   │   │   ├── AttendanceTracker.jsx
│   │   │   │   │   └── UpcomingClasses.jsx
│   │   │   │   ├── services/
│   │   │   │   │   └── classService.js
│   │   │   │   └── pages/
│   │   │   │       └── ClassesPage.jsx
│   │   │   │
│   │   │   ├── assignments/
│   │   │   │   ├── components/
│   │   │   │   │   ├── AssignmentList.jsx
│   │   │   │   │   ├── CreateAssignmentForm.jsx
│   │   │   │   │   ├── SubmissionForm.jsx
│   │   │   │   │   ├── GradingInterface.jsx
│   │   │   │   │   └── AssignmentCard.jsx
│   │   │   │   ├── services/
│   │   │   │   │   └── assignmentService.js
│   │   │   │   └── pages/
│   │   │   │       ├── AssignmentsPage.jsx
│   │   │   │       ├── AssignmentDetailPage.jsx
│   │   │   │       └── GradeAssignmentPage.jsx
│   │   │   │
│   │   │   ├── exams/
│   │   │   │   ├── components/
│   │   │   │   │   ├── CreateExamForm.jsx
│   │   │   │   │   ├── ExamSectionBuilder.jsx
│   │   │   │   │   ├── ExamTakingInterface.jsx
│   │   │   │   │   ├── AudioRecorder.jsx        # MediaRecorder API
│   │   │   │   │   ├── AudioPlayer.jsx
│   │   │   │   │   ├── GradingInterface.jsx
│   │   │   │   │   └── ExamResults.jsx
│   │   │   │   ├── services/
│   │   │   │   │   └── examService.js
│   │   │   │   └── pages/
│   │   │   │       ├── ExamsPage.jsx
│   │   │   │       ├── TakeExamPage.jsx
│   │   │   │       └── GradeExamPage.jsx
│   │   │   │
│   │   │   ├── videos/
│   │   │   │   ├── components/
│   │   │   │   │   ├── VideoList.jsx
│   │   │   │   │   ├── VideoPlayer.jsx
│   │   │   │   │   ├── UploadVideoForm.jsx
│   │   │   │   │   └── VideoFilters.jsx
│   │   │   │   ├── services/
│   │   │   │   │   └── videoService.js
│   │   │   │   └── pages/
│   │   │   │       └── VideosPage.jsx
│   │   │   │
│   │   │   ├── progress/
│   │   │   │   ├── components/
│   │   │   │   │   ├── ProgressDashboard.jsx
│   │   │   │   │   ├── SyllabusTracker.jsx
│   │   │   │   │   ├── StatsCards.jsx
│   │   │   │   │   └── ProgressChart.jsx
│   │   │   │   ├── services/
│   │   │   │   │   └── progressService.js
│   │   │   │   └── pages/
│   │   │   │       └── ProgressPage.jsx
│   │   │   │
│   │   │   ├── chat/
│   │   │   │   ├── components/
│   │   │   │   │   ├── ConversationList.jsx
│   │   │   │   │   ├── MessageThread.jsx
│   │   │   │   │   ├── MessageInput.jsx
│   │   │   │   │   └── ChatSidebar.jsx
│   │   │   │   ├── hooks/
│   │   │   │   │   ├── useSocket.js
│   │   │   │   │   └── useMessages.js
│   │   │   │   ├── services/
│   │   │   │   │   └── messageService.js
│   │   │   │   └── pages/
│   │   │   │       └── ChatPage.jsx
│   │   │   │
│   │   │   ├── admin/
│   │   │   │   ├── components/
│   │   │   │   │   ├── CreateUserForm.jsx
│   │   │   │   │   ├── UserList.jsx
│   │   │   │   │   ├── StatsCards.jsx
│   │   │   │   │   └── ActivityFeed.jsx
│   │   │   │   └── pages/
│   │   │   │       ├── AdminDashboardPage.jsx
│   │   │   │       ├── UsersPage.jsx
│   │   │   │       └── ReportsPage.jsx
│   │   │   │
│   │   │   └── profile/
│   │   │       ├── components/
│   │   │       │   ├── ProfileForm.jsx
│   │   │       │   └── ChangePasswordForm.jsx
│   │   │       └── pages/
│   │   │           └── ProfilePage.jsx
│   │   │
│   │   ├── hooks/                     # Global custom hooks
│   │   │   ├── useAuth.js             # Re-export from auth feature
│   │   │   ├── useToast.js
│   │   │   ├── useDebounce.js
│   │   │   └── useMediaQuery.js
│   │   │
│   │   ├── lib/                       # Core utilities
│   │   │   ├── axios.js               # Axios instance with interceptors
│   │   │   ├── socket.js              # Socket.io client setup
│   │   │   └── queryClient.js         # React Query client config
│   │   │
│   │   ├── utils/                     # Helper functions
│   │   │   ├── formatters.js          # Date, number formatters
│   │   │   ├── validators.js          # Custom validation functions
│   │   │   ├── constants.js           # App constants
│   │   │   └── helpers.js             # General helpers
│   │   │
│   │   ├── routes/                    # Route definitions
│   │   │   ├── AppRoutes.jsx          # Main routing component
│   │   │   ├── PublicRoutes.jsx
│   │   │   └── PrivateRoutes.jsx
│   │   │
│   │   ├── styles/                    # Global styles
│   │   │   ├── index.css              # Tailwind imports + global CSS
│   │   │   └── tailwind.config.js     # Tailwind configuration
│   │   │
│   │   ├── App.jsx                    # Root component
│   │   └── main.jsx                   # Entry point
│   │
│   ├── .env.example                   # Environment variables template
│   ├── .eslintrc.json
│   ├── .prettierrc
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js            # MongoDB connection
│   │   │   ├── s3.js                 # AWS S3 config
│   │   │   ├── passport.js            # OAuth strategies
│   │   │   ├── socket.js              # Socket.io setup
│   │   │   └── resend.js              # Email service config
│   │   │
│   │   ├── models/                    # Mongoose models
│   │   │   ├── User.js
│   │   │   ├── Course.js
│   │   │   ├── Class.js
│   │   │   ├── Assignment.js
│   │   │   ├── Exam.js
│   │   │   ├── Video.js
│   │   │   ├── Message.js
│   │   │   ├── Notification.js
│   │   │   └── Progress.js
│   │   │
│   │   ├── controllers/               # Route controllers
│   │   │   ├── authController.js
│   │   │   ├── userController.js
│   │   │   ├── courseController.js
│   │   │   ├── classController.js
│   │   │   ├── assignmentController.js
│   │   │   ├── examController.js
│   │   │   ├── videoController.js
│   │   │   ├── messageController.js
│   │   │   ├── notificationController.js
│   │   │   └── progressController.js
│   │   │
│   │   ├── routes/                    # Express routes
│   │   │   ├── auth.routes.js
│   │   │   ├── user.routes.js
│   │   │   ├── course.routes.js
│   │   │   ├── class.routes.js
│   │   │   ├── assignment.routes.js
│   │   │   ├── exam.routes.js
│   │   │   ├── video.routes.js
│   │   │   ├── message.routes.js
│   │   │   ├── notification.routes.js
│   │   │   ├── progress.routes.js
│   │   │   └── index.js               # Route aggregator
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js     # JWT verification
│   │   │   ├── roles.middleware.js    # RBAC authorization
│   │   │   ├── upload.middleware.js   # Multer file upload
│   │   │   ├── validation.middleware.js # Zod validation
│   │   │   ├── errorHandler.middleware.js
│   │   │   └── rateLimit.middleware.js
│   │   │
│   │   ├── services/                  # Business logic
│   │   │   ├── authService.js
│   │   │   ├── emailService.js        # Resend integration
│   │   │   ├── uploadService.js       # AWS S3
│   │   │   ├── progressService.js     # Calculate progress
│   │   │   └── notificationService.js
│   │   │
│   │   ├── utils/
│   │   │   ├── jwt.js                 # JWT helpers
│   │   │   ├── bcrypt.js              # Password hashing
│   │   │   ├── validators.js          # Custom validators
│   │   │   ├── constants.js           # Constants
│   │   │   └── helpers.js             # Helper functions
│   │   │
│   │   ├── validators/                # Zod schemas
│   │   │   ├── auth.validators.js
│   │   │   ├── user.validators.js
│   │   │   ├── course.validators.js
│   │   │   ├── assignment.validators.js
│   │   │   └── exam.validators.js
│   │   │
│   │   ├── socket/                    # Socket.io handlers
│   │   │   ├── chatHandler.js
│   │   │   └── notificationHandler.js
│   │   │
│   │   ├── seeds/                     # Database seeding
│   │   │   ├── seedAdmin.js           # patricio@ac95.ca
│   │   │   ├── seedCourses.js
│   │   │   └── index.js
│   │   │
│   │   ├── app.js                     # Express app setup
│   │   └── server.js                  # Server entry point
│   │
│   ├── tests/                         # Test files
│   │   ├── unit/
│   │   │   ├── services/
│   │   │   └── utils/
│   │   └── integration/
│   │       └── api/
│   │
│   ├── .env.example
│   ├── .eslintrc.json
│   ├── .prettierrc
│   ├── package.json
│   └── nodemon.json
│
├── .gitignore
├── .husky/                            # Git hooks
│   ├── pre-commit
│   └── pre-push
├── package.json                       # Root workspace config
└── README.md
```

---

## API Design

### API Standards

#### Base URL Structure

```
Development:  http://localhost:5000/api
Production:   https://api.letstalq.com/api
```

#### Response Format (Consistent across all endpoints)

**Success Response:**

```json
{
  "success": true,
  "data": {
    // Response data here
  },
  "message": "Operation successful"
}
```

**Error Response:**

```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE",
    "details": {} // Optional, for validation errors
  }
}
```

#### HTTP Status Codes

```yaml
200 OK: Successful GET, PUT, PATCH
201 Created: Successful POST
204 No Content: Successful DELETE
400 Bad Request: Validation error
401 Unauthorized: Not authenticated
403 Forbidden: Not authorized (role)
404 Not Found: Resource not found
409 Conflict: Duplicate resource
429 Too Many Requests: Rate limit exceeded
500 Internal Server Error: Server error
```

### API Endpoints Reference

#### Authentication Endpoints

```
POST   /api/auth/register              # Register student
POST   /api/auth/login                 # Login student
POST   /api/auth/admin-login           # Login teacher/admin
POST   /api/auth/logout                # Logout
POST   /api/auth/refresh               # Refresh access token
POST   /api/auth/confirm-email/:token  # Confirm email
POST   /api/auth/forgot-password       # Request password reset
POST   /api/auth/reset-password/:token # Reset password
GET    /api/auth/me                    # Get current user
GET    /api/auth/google                # Google OAuth (redirect)
GET    /api/auth/google/callback       # Google OAuth callback
GET    /api/auth/facebook              # Facebook OAuth (redirect)
GET    /api/auth/facebook/callback     # Facebook OAuth callback
```

#### User Management (Admin only)

```
POST   /api/users/create-teacher       # Create teacher/admin
GET    /api/users                      # List users (filter by role)
GET    /api/users/:id                  # Get user by ID
PUT    /api/users/:id                  # Update user
DELETE /api/users/:id                  # Deactivate user
```

#### Courses

```
POST   /api/courses                    # Create course (Teacher/Admin)
GET    /api/courses                    # List courses (filter by level, teacher)
GET    /api/courses/:id                # Get course details
PUT    /api/courses/:id                # Update course
DELETE /api/courses/:id                # Archive course
GET    /api/courses/:id/students       # Get course students
POST   /api/courses/:id/students       # Enroll students (Admin)
```

#### Classes

```
POST   /api/classes                    # Create class (Teacher)
GET    /api/classes                    # List classes (filter by course, date)
GET    /api/classes/:id                # Get class details
PUT    /api/classes/:id                # Update class
DELETE /api/classes/:id                # Delete class
PUT    /api/classes/:id/attendance     # Mark attendance (Teacher)
```

#### Assignments

```
POST   /api/assignments                # Create assignment (Teacher)
GET    /api/assignments                # List assignments (by course, status)
GET    /api/assignments/:id            # Get assignment details
PUT    /api/assignments/:id            # Update assignment
DELETE /api/assignments/:id            # Delete assignment
POST   /api/assignments/:id/submit     # Submit assignment (Student)
GET    /api/assignments/:id/submissions # Get all submissions (Teacher)
PUT    /api/assignments/:id/submissions/:submissionId/grade  # Grade submission
```

#### Exams

```
POST   /api/exams                      # Create exam (Teacher)
GET    /api/exams                      # List exams (by course)
GET    /api/exams/:id                  # Get exam details
PUT    /api/exams/:id                  # Update exam
DELETE /api/exams/:id                  # Delete exam
POST   /api/exams/:id/start            # Start exam attempt (Student)
PUT    /api/exams/:id/attempts/:attemptId  # Save progress
POST   /api/exams/:id/submit           # Submit exam (Student)
GET    /api/exams/:id/attempts         # Get all attempts (Teacher)
PUT    /api/exams/:id/attempts/:attemptId/grade  # Grade sections
```

#### Videos

```
POST   /api/videos                     # Upload video (Admin/Teacher)
GET    /api/videos                     # List videos (filter by level, topic)
GET    /api/videos/:id                 # Get video details
PUT    /api/videos/:id                 # Update video
DELETE /api/videos/:id                 # Delete video
POST   /api/videos/:id/view            # Record view (Student)
```

#### Messages (Chat)

```
GET    /api/messages/conversations     # List conversations
GET    /api/messages/conversations/:id # Get messages in conversation
POST   /api/messages                   # Send message
PUT    /api/messages/:id/read          # Mark as read
```

**WebSocket Events:**

```
emit:   'send_message'    { conversationId, content, toUserId }
listen: 'receive_message' { message object }
emit:   'typing'          { conversationId }
listen: 'user_typing'     { userId, conversationId }
emit:   'mark_read'       { messageId }
```

#### Notifications

```
GET    /api/notifications              # List user notifications
PUT    /api/notifications/:id/read     # Mark as read
PUT    /api/notifications/read-all     # Mark all as read
DELETE /api/notifications/:id          # Delete notification
```

#### Progress

```
GET    /api/progress/:studentId/:courseId  # Get student progress in course
GET    /api/progress/student/:studentId    # Get all progress for student
```

### Request/Response Examples

#### Register Student

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "SecurePass123!",
  "englishLevel": "intermediate"
}

Response 201:
{
  "success": true,
  "data": {
    "user": {
      "id": "676899abc123",
      "name": "Juan Pérez",
      "email": "juan@example.com",
      "role": "student",
      "englishLevel": "intermediate",
      "isEmailConfirmed": false
    }
  },
  "message": "Usuario registrado. Por favor revisa tu email para confirmar tu cuenta."
}
```

#### Submit Assignment

```http
POST /api/assignments/676899abc123/submit
Authorization: Bearer <access_token>
Content-Type: multipart/form-data

content: "Mi respuesta a la tarea..."
files: [file1.pdf, file2.docx]

Response 201:
{
  "success": true,
  "data": {
    "submission": {
      "id": "sub_123",
      "studentId": "676899abc123",
      "submittedAt": "2025-12-10T14:30:00Z",
      "status": "submitted"
    }
  },
  "message": "Tarea entregada exitosamente"
}
```

---

## Security Architecture

### Authentication Flow

#### JWT Token Strategy

```yaml
Access Token:
  Type: JWT
  Lifetime: 15 minutes
  Storage: Memory (React state)
  Payload: { userId, role, email }

Refresh Token:
  Type: JWT
  Lifetime: 7 days
  Storage: HttpOnly Cookie (secure, sameSite)
  Payload: { userId, tokenVersion }

Token Rotation:
  - Refresh token rotates on every refresh
  - Old refresh tokens invalidated
  - Token version incremented on logout/password change
```

#### OAuth 2.0 Flow (Google/Facebook)

```
1. User clicks "Continue with Google"
2. Frontend redirects to /api/auth/google
3. Backend redirects to Google OAuth
4. User authenticates on Google
5. Google redirects to /api/auth/google/callback
6. Backend:
   - Validates OAuth token
   - Creates/finds user in database
   - Generates JWT tokens
   - Redirects to frontend with token in URL hash
7. Frontend:
   - Extracts token from URL
   - Stores in state/Zustand
   - Removes token from URL
   - Redirects to dashboard
```

### Security Middleware Chain

```javascript
// Applied to all routes
app.use(helmet()); // HTTP security headers
app.use(cors(corsOptions)); // CORS
app.use(express.json({ limit: "10mb" })); // Body parsing with limit
app.use(mongoSanitize()); // NoSQL injection prevention
app.use(xss()); // XSS protection

// Applied to specific routes
authRouter.post(
  "/login",
  rateLimiter({ windowMs: 15 * 60 * 1000, max: 5 }), // Rate limit: 5 attempts per 15 min
  validateRequest(loginSchema), // Zod validation
  authController.login
);

// Applied to protected routes
protectedRouter.use(authMiddleware.verifyToken); // JWT verification
protectedRouter.use(authMiddleware.checkRole(["admin", "teacher"])); // Role check
```

### Security Best Practices Implemented

#### Password Security

```javascript
// Hashing with bcrypt (salt rounds: 12)
const hashedPassword = await bcrypt.hash(password, 12);

// Password requirements (enforced by Zod)
const passwordSchema = z
  .string()
  .min(8, "Mínimo 8 caracteres")
  .regex(/[A-Z]/, "Debe incluir una mayúscula")
  .regex(/[a-z]/, "Debe incluir una minúscula")
  .regex(/[0-9]/, "Debe incluir un número")
  .regex(/[^A-Za-z0-9]/, "Debe incluir un carácter especial");
```

#### Input Validation

```javascript
// All inputs validated with Zod schemas
const createAssignmentSchema = z.object({
  courseId: z.string().regex(/^[0-9a-fA-F]{24}$/), // Valid MongoDB ObjectId
  title: z.string().min(1).max(100),
  description: z.string().min(10).max(5000),
  dueDate: z.string().datetime(), // ISO 8601 format
  maxPoints: z.number().int().positive().max(1000),
});

// Sanitization
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";

app.use(mongoSanitize()); // Remove $ and . from req.body/params/query
app.use(xss()); // Sanitize HTML in inputs
```

#### File Upload Security

```javascript
// Multer configuration
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 500 * 1024 * 1024, // 500MB max for videos
    files: 10, // Max 10 files per request
  },
  fileFilter: (req, file, cb) => {
    // Whitelist MIME types
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "video/mp4",
      "video/quicktime",
      "audio/mpeg",
      "audio/wav",
      "application/pdf",
      "application/msword",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Tipo de archivo no permitido"), false);
    }
  },
});

// Virus scanning (optional, implement post-MVP with ClamAV)
```

#### Rate Limiting

```javascript
// Different limits for different endpoints
const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests
  message: "Demasiados intentos. Por favor intenta de nuevo en 15 minutos.",
});

const standardLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100, // 100 requests
  message: "Límite de requests excedido.",
});

// Apply to routes
app.use("/api/auth/login", strictLimiter);
app.use("/api/auth/register", strictLimiter);
app.use("/api", standardLimiter);
```

#### CORS Configuration

```javascript
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? ["https://letstalq.com", "https://www.letstalq.com"]
      : ["http://localhost:5173", "http://localhost:3000"],
  credentials: true, // Allow cookies
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
```

---

## Database Architecture

### MongoDB Schema Design Patterns

#### Indexing Strategy

```javascript
// User collection
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ googleId: 1 }, { sparse: true, unique: true });
userSchema.index({ facebookId: 1 }, { sparse: true, unique: true });
userSchema.index({ role: 1, isActive: 1 });
userSchema.index({ englishLevel: 1 }); // For auto-assignment

// Course collection
courseSchema.index({ teacherId: 1, isActive: 1 });
courseSchema.index({ level: 1, isActive: 1 });
courseSchema.index({ studentIds: 1 }); // Multi-key index

// Class collection
classSchema.index({ courseId: 1, date: -1 }); // Compound index, date descending
classSchema.index({ teacherId: 1, date: -1 });

// Assignment collection
assignmentSchema.index({ courseId: 1, dueDate: -1 });
assignmentSchema.index({ "submissions.studentId": 1, "submissions.status": 1 });

// Exam collection
examSchema.index({ courseId: 1, availableFrom: -1 });
examSchema.index({ "attempts.studentId": 1, "attempts.status": 1 });

// Message collection
messageSchema.index({ conversationId: 1, sentAt: -1 }); // For pagination
messageSchema.index({ toUserId: 1, isRead: 1 }); // For unread count

// Notification collection
notificationSchema.index({ userId: 1, isRead: 1, createdAt: -1 });

// Progress collection
progressSchema.index({ studentId: 1, courseId: 1 }, { unique: true });
```

#### Data Modeling Patterns

**Embedding vs Referencing:**

```javascript
// Embed when: 1-to-few, data doesn't change often, always queried together
// Example: Syllabus inside Course
const courseSchema = new Schema({
  name: String,
  syllabus: [
    {
      // Embedded documents
      order: Number,
      unit: String,
      topics: [
        {
          title: String,
          description: String,
        },
      ],
    },
  ],
});

// Reference when: 1-to-many, data changes frequently, need to query independently
// Example: Students in Course
const courseSchema = new Schema({
  name: String,
  studentIds: [{ type: Schema.Types.ObjectId, ref: "User" }], // References
});
```

**Mongoose Virtuals & Methods:**

```javascript
// Virtual for full name
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Instance method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Static method
userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email: email.toLowerCase() });
};
```

### Database Connection & Pooling

```javascript
// config/database.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // Connection options
      maxPoolSize: 10, // Max 10 connections in pool
      minPoolSize: 2, // Min 2 connections
      serverSelectionTimeoutMS: 5000, // Timeout after 5s
      socketTimeoutMS: 45000, // Close sockets after 45s
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Graceful shutdown
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      process.exit(0);
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
```

### Backup Strategy

```yaml
Automated Backups (MongoDB Atlas):
  Frequency: Continuous (every few seconds)
  Retention:
    - Snapshots: Daily (retain 7 days)
    - Point-in-time: 24 hours
  Storage: Separate region (for disaster recovery)

Manual Backups:
  Frequency: Before major releases
  Tool: mongodump
  Command: mongodump --uri="mongodb+srv://..." --out=/backups/$(date +%Y%m%d)
  Storage: Local + S3 bucket

Testing:
  Frequency: Monthly
  Process: Restore backup to staging environment, verify data integrity
```

---

## Code Style & Conventions

### Naming Conventions

```javascript
// Components (PascalCase)
StudentDashboard.jsx;
CreateAssignmentForm.jsx;
UpcomingClasses.jsx;

// Files & folders (kebab-case)
auth - service.js;
user - controller.js;
assignment.routes.js;

// Variables & functions (camelCase)
const userId = req.params.id;
const isAuthenticated = checkAuth(token);

async function getUserData(userId) {
  // ...
}

// Constants (UPPER_SNAKE_CASE)
const API_BASE_URL = process.env.API_URL;
const MAX_FILE_SIZE = 500 * 1024 * 1024;

// Private methods (prefix with _)
class UserService {
  async createUser(data) {
    // Public method
  }

  _hashPassword(password) {
    // Private helper
  }
}

// Boolean variables (is/has/should prefix)
const isValid = validateInput(data);
const hasPermission = checkPermission(user, resource);
const shouldRender = !loading && data;
```

### File Organization Patterns

#### Component Structure (React)

```jsx
// StudentDashboard.jsx
import React, { useState, useEffect } from "react";
import { useDashboardData } from "../hooks/useDashboardData";
import { Card } from "@/components/ui/Card";

/**
 * Student Dashboard Component
 * Displays upcoming classes, pending assignments, and progress overview
 */
const StudentDashboard = () => {
  // 1. State declarations
  const [loading, setLoading] = useState(true);

  // 2. Custom hooks
  const { classes, assignments, progress } = useDashboardData();

  // 3. Side effects
  useEffect(() => {
    // Fetch data
  }, []);

  // 4. Event handlers
  const handleClassClick = (classId) => {
    // Navigate to class detail
  };

  // 5. Helper functions
  const formatDate = (date) => {
    // Format date
  };

  // 6. Early returns (loading/error states)
  if (loading) return <LoadingSpinner />;

  // 7. Main render
  return <div className="dashboard-container">{/* JSX */}</div>;
};

export default StudentDashboard;
```

#### Controller Structure (Backend)

```javascript
// assignmentController.js
import Assignment from "../models/Assignment.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";

/**
 * @desc    Create new assignment
 * @route   POST /api/assignments
 * @access  Private (Teacher only)
 */
export const createAssignment = asyncHandler(async (req, res, next) => {
  // 1. Extract & validate data
  const { courseId, title, description, dueDate, maxPoints } = req.body;

  // 2. Business logic checks
  const course = await Course.findById(courseId);
  if (!course) {
    return next(new AppError("Curso no encontrado", 404));
  }

  // 3. Create resource
  const assignment = await Assignment.create({
    courseId,
    teacherId: req.user.id,
    title,
    description,
    dueDate,
    maxPoints,
  });

  // 4. Send response
  res.status(201).json({
    success: true,
    data: { assignment },
    message: "Tarea creada exitosamente",
  });
});

/**
 * @desc    Get all assignments
 * @route   GET /api/assignments
 * @access  Private
 */
export const getAssignments = asyncHandler(async (req, res, next) => {
  // Implementation
});

// Export all functions
export default {
  createAssignment,
  getAssignments,
  // ... more functions
};
```

### Git Commit Conventions

#### Conventional Commits Format

```bash
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

#### Types

```yaml
feat: New feature
fix: Bug fix
docs: Documentation changes
style: Code style changes (formatting, no logic change)
refactor: Code refactoring (no feature/fix)
perf: Performance improvement
test: Adding/updating tests
chore: Build process, dependencies, tooling
```

#### Examples

```bash
feat(auth): add Google OAuth integration
fix(chat): resolve message duplicate issue on reconnect
docs(readme): update installation instructions
refactor(api): extract validation logic to middleware
perf(db): add indexes for frequently queried fields
test(assignment): add unit tests for grading logic
chore(deps): upgrade React to 18.3.1
```

#### Branch Naming

```bash
main                    # Production code
develop                 # Development branch

# Feature branches
feature/user-authentication
feature/chat-integration
feature/video-upload

# Bug fix branches
fix/login-redirect-issue
fix/chat-socket-reconnect

# Hotfix branches (critical production fixes)
hotfix/security-patch
hotfix/payment-processing
```

### Code Comments & Documentation

#### JSDoc for Functions

```javascript
/**
 * Calculates the student's overall progress in a course
 *
 * @param {string} studentId - The student's MongoDB ObjectId
 * @param {string} courseId - The course's MongoDB ObjectId
 * @returns {Promise<Object>} Progress object with percentages
 * @throws {AppError} If student or course not found
 *
 * @example
 * const progress = await calculateProgress('676899abc123', '676899def456');
 * // Returns: { overallProgress: 75, classesAttended: 80, ... }
 */
async function calculateProgress(studentId, courseId) {
  // Implementation
}
```

#### Inline Comments

```javascript
// Use inline comments sparingly - code should be self-documenting

// ✅ GOOD: Explain WHY, not WHAT
// Calculate attendance rate separately to avoid division by zero
const attendanceRate =
  totalClasses > 0 ? (attendedClasses / totalClasses) * 100 : 0;

// ❌ BAD: Explains WHAT (obvious from code)
// Divide attended classes by total classes and multiply by 100
const attendanceRate = (attendedClasses / totalClasses) * 100;
```

#### TODO Comments

```javascript
// TODO: Implement email notification after grading
// TODO: Add caching layer for frequently accessed courses
// FIXME: Race condition when multiple users update attendance
// HACK: Temporary workaround until Socket.io v5 fixes this
// NOTE: This logic is duplicated in assignmentService.js - consider extracting
```

---

## Performance Optimization

### Frontend Performance

#### Code Splitting & Lazy Loading

```jsx
// App.jsx - Route-based code splitting
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Lazy load route components
const StudentDashboard = lazy(() =>
  import("./features/dashboard/pages/StudentDashboard")
);
const AssignmentsPage = lazy(() =>
  import("./features/assignments/pages/AssignmentsPage")
);
const ExamsPage = lazy(() => import("./features/exams/pages/ExamsPage"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/assignments" element={<AssignmentsPage />} />
          <Route path="/student/exams" element={<ExamsPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

#### React Query for Caching

```javascript
// hooks/useAssignments.js
import { useQuery } from "@tanstack/react-query";
import assignmentService from "../services/assignmentService";

export function useAssignments(courseId) {
  return useQuery({
    queryKey: ["assignments", courseId],
    queryFn: () => assignmentService.getAssignments(courseId),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    cacheTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
    refetchOnWindowFocus: false, // Don't refetch on tab focus
  });
}
```

#### Memoization

```jsx
import { useMemo, useCallback } from "react";

function ProgressDashboard({ assignments, exams }) {
  // Expensive calculation - only recalculate when assignments change
  const averageGrade = useMemo(() => {
    if (assignments.length === 0) return 0;
    const sum = assignments.reduce((acc, a) => acc + a.grade, 0);
    return sum / assignments.length;
  }, [assignments]);

  // Stable function reference - won't cause child re-renders
  const handleAssignmentClick = useCallback((assignmentId) => {
    // Navigate to assignment detail
  }, []);

  return (
    <div>
      <p>Average Grade: {averageGrade}</p>
      {assignments.map((a) => (
        <AssignmentCard
          key={a.id}
          assignment={a}
          onClick={handleAssignmentClick}
        />
      ))}
    </div>
  );
}
```

#### Image Optimization

```jsx
// Use modern formats (WebP) with fallbacks
<picture>
  <source srcSet="/images/course-thumbnail.webp" type="image/webp" />
  <source srcSet="/images/course-thumbnail.jpg" type="image/jpeg" />
  <img src="/images/course-thumbnail.jpg" alt="Course" loading="lazy" />
</picture>;

// Or use Vite's built-in image optimization
import thumbnail from "./assets/course-thumbnail.jpg?w=300&h=200&format=webp";
<img src={thumbnail} alt="Course" loading="lazy" />;
```

### Backend Performance

#### Database Query Optimization

```javascript
// ❌ BAD: N+1 query problem
const courses = await Course.find();
for (const course of courses) {
  course.teacher = await User.findById(course.teacherId); // N queries
}

// ✅ GOOD: Use populate (JOIN)
const courses = await Course.find()
  .populate("teacherId", "name email avatar") // 1 query with JOIN
  .select("name level startDate endDate") // Select only needed fields
  .lean(); // Return plain JS objects (faster)

// ✅ GOOD: Pagination
const page = parseInt(req.query.page) || 1;
const limit = parseInt(req.query.limit) || 10;
const skip = (page - 1) * limit;

const assignments = await Assignment.find({ courseId })
  .sort({ dueDate: -1 })
  .skip(skip)
  .limit(limit)
  .lean();

const total = await Assignment.countDocuments({ courseId });

res.json({
  success: true,
  data: {
    assignments,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  },
});
```

#### Caching Strategy (Future enhancement, not in MVP)

```javascript
// Redis caching for frequently accessed data
import Redis from "ioredis";
const redis = new Redis(process.env.REDIS_URL);

async function getCourse(courseId) {
  // Try cache first
  const cached = await redis.get(`course:${courseId}`);
  if (cached) {
    return JSON.parse(cached);
  }

  // Query database
  const course = await Course.findById(courseId).lean();

  // Store in cache (expire after 1 hour)
  await redis.setex(`course:${courseId}`, 3600, JSON.stringify(course));

  return course;
}

// Invalidate cache on update
async function updateCourse(courseId, updates) {
  const course = await Course.findByIdAndUpdate(courseId, updates, {
    new: true,
  });

  // Invalidate cache
  await redis.del(`course:${courseId}`);

  return course;
}
```

#### Connection Pooling

```javascript
// MongoDB connection pooling (already configured)
mongoose.connect(process.env.MONGODB_URI, {
  maxPoolSize: 10, // Max 10 concurrent connections
  minPoolSize: 2, // Always maintain 2 connections
});

// Reuse connections for all queries
// Mongoose automatically manages the pool
```

### Performance Targets

```yaml
API Response Time:
  p50 (median): < 100ms
  p95: < 200ms
  p99: < 500ms

Frontend Performance (Lighthouse):
  Performance Score: > 90
  First Contentful Paint (FCP): < 1.5s
  Largest Contentful Paint (LCP): < 2.5s
  Time to Interactive (TTI): < 3.5s
  Cumulative Layout Shift (CLS): < 0.1
  Total Blocking Time (TBT): < 300ms

Page Load Time:
  Desktop: < 2s
  Mobile: < 3s

Bundle Size:
  Initial JS: < 200KB gzipped
  Initial CSS: < 50KB gzipped
  Lazy-loaded chunks: < 100KB each

Database Query Time:
  Simple queries (by ID): < 10ms
  Complex queries (with joins): < 50ms
  Aggregations: < 200ms
```

---

## Testing Strategy

### Test Coverage Targets

```yaml
Overall Coverage: > 80%
Statements: > 80%
Branches: > 75%
Functions: > 80%
Lines: > 80%
```

### Testing Pyramid

```
       /\
      /  \
     / E2E \         ← Few (expensive, slow, brittle)
    /------\
   /  Inte- \
  / gration \       ← Some (moderate cost/speed)
 /------------\
/    Unit      \    ← Many (cheap, fast, reliable)
----------------
```

### Frontend Testing

#### Unit Tests (Vitest + React Testing Library)

```javascript
// components/ui/Button.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Button from "./Button";

describe("Button", () => {
  it("renders with correct text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByText("Click me")).toBeDisabled();
  });
});
```

#### Integration Tests (Component with hooks/API)

```javascript
// features/assignments/components/AssignmentList.test.jsx
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AssignmentList from "./AssignmentList";
import * as assignmentService from "../services/assignmentService";

// Mock the service
vi.mock("../services/assignmentService");

describe("AssignmentList", () => {
  const queryClient = new QueryClient();

  it("displays loading state initially", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <AssignmentList courseId="123" />
      </QueryClientProvider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays assignments when loaded", async () => {
    const mockAssignments = [
      { id: "1", title: "Assignment 1", dueDate: "2025-12-15" },
      { id: "2", title: "Assignment 2", dueDate: "2025-12-20" },
    ];

    assignmentService.getAssignments.mockResolvedValue(mockAssignments);

    render(
      <QueryClientProvider client={queryClient}>
        <AssignmentList courseId="123" />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Assignment 1")).toBeInTheDocument();
      expect(screen.getByText("Assignment 2")).toBeInTheDocument();
    });
  });
});
```

#### E2E Tests (Cypress - Post-MVP)

```javascript
// cypress/e2e/student-registration.cy.js
describe("Student Registration Flow", () => {
  it("allows student to register and confirm email", () => {
    // Visit landing page
    cy.visit("/");

    // Click "Soy Estudiante"
    cy.contains("Soy Estudiante").click();
    cy.url().should("include", "/login");

    // Click "Registrarse"
    cy.contains("Registrarse").click();
    cy.url().should("include", "/register");

    // Fill form
    cy.get('[data-testid="name"]').type("Juan Pérez");
    cy.get('[data-testid="email"]').type("juan@test.com");
    cy.get('[data-testid="password"]').type("SecurePass123!");
    cy.get('[data-testid="confirm-password"]').type("SecurePass123!");
    cy.get('[data-testid="level"]').select("intermediate");

    // Submit
    cy.get('[data-testid="submit"]').click();

    // Should show confirmation message
    cy.contains("Revisa tu email").should("be.visible");

    // Mock email confirmation (in real test, you'd check test inbox)
    cy.visit("/confirm-email/mock-token-123");

    // Should redirect to login
    cy.url().should("include", "/login");
    cy.contains("Email confirmado").should("be.visible");

    // Login
    cy.get('[data-testid="email"]').type("juan@test.com");
    cy.get('[data-testid="password"]').type("SecurePass123!");
    cy.get('[data-testid="submit"]').click();

    // Should reach dashboard
    cy.url().should("include", "/student/dashboard");
    cy.contains("Bienvenido, Juan").should("be.visible");
  });
});
```

### Backend Testing

#### Unit Tests (Jest)

```javascript
// services/authService.test.js
import authService from "../services/authService";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Mock dependencies
jest.mock("../models/User");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

describe("AuthService", () => {
  describe("register", () => {
    it("should create a new user with hashed password", async () => {
      const userData = {
        name: "Juan Pérez",
        email: "juan@test.com",
        password: "password123",
        englishLevel: "intermediate",
      };

      bcrypt.hash.mockResolvedValue("hashed_password");
      User.create.mockResolvedValue({
        _id: "676899abc123",
        ...userData,
        password: "hashed_password",
      });

      const user = await authService.register(userData);

      expect(bcrypt.hash).toHaveBeenCalledWith("password123", 12);
      expect(User.create).toHaveBeenCalledWith(
        expect.objectContaining({
          password: "hashed_password",
        })
      );
      expect(user.password).toBe("hashed_password");
    });

    it("should throw error if email already exists", async () => {
      User.findOne.mockResolvedValue({ email: "existing@test.com" });

      await expect(
        authService.register({ email: "existing@test.com" })
      ).rejects.toThrow("Email ya registrado");
    });
  });

  describe("login", () => {
    it("should return tokens for valid credentials", async () => {
      const mockUser = {
        _id: "676899abc123",
        email: "juan@test.com",
        password: "hashed_password",
        role: "student",
        comparePassword: jest.fn().mockResolvedValue(true),
      };

      User.findOne.mockResolvedValue(mockUser);
      jwt.sign.mockReturnValue("mock_token");

      const result = await authService.login("juan@test.com", "password123");

      expect(result).toHaveProperty("accessToken");
      expect(result).toHaveProperty("refreshToken");
      expect(mockUser.comparePassword).toHaveBeenCalledWith("password123");
    });

    it("should throw error for invalid password", async () => {
      const mockUser = {
        comparePassword: jest.fn().mockResolvedValue(false),
      };

      User.findOne.mockResolvedValue(mockUser);

      await expect(
        authService.login("juan@test.com", "wrong_password")
      ).rejects.toThrow("Credenciales inválidas");
    });
  });
});
```

#### Integration Tests (Supertest)

```javascript
// routes/auth.routes.test.js
import request from "supertest";
import app from "../app";
import User from "../models/User";
import { connectDB, closeDB, clearDB } from "../tests/setup";

beforeAll(async () => await connectDB());
afterEach(async () => await clearDB());
afterAll(async () => await closeDB());

describe("POST /api/auth/register", () => {
  it("should register a new student", async () => {
    const userData = {
      name: "Juan Pérez",
      email: "juan@test.com",
      password: "SecurePass123!",
      englishLevel: "intermediate",
    };

    const response = await request(app)
      .post("/api/auth/register")
      .send(userData)
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.data.user).toHaveProperty("id");
    expect(response.body.data.user.email).toBe("juan@test.com");
    expect(response.body.data.user.isEmailConfirmed).toBe(false);

    // Verify user in database
    const user = await User.findOne({ email: "juan@test.com" });
    expect(user).toBeDefined();
    expect(user.password).not.toBe("SecurePass123!"); // Password should be hashed
  });

  it("should return 400 for invalid email", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Juan",
        email: "invalid-email",
        password: "SecurePass123!",
      })
      .expect(400);

    expect(response.body.success).toBe(false);
    expect(response.body.error.message).toContain("email");
  });

  it("should return 409 for duplicate email", async () => {
    // Create existing user
    await User.create({
      name: "Existing",
      email: "existing@test.com",
      password: "hashed",
      role: "student",
    });

    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "New",
        email: "existing@test.com",
        password: "SecurePass123!",
      })
      .expect(409);

    expect(response.body.error.message).toContain("ya registrado");
  });
});

describe("POST /api/auth/login", () => {
  beforeEach(async () => {
    // Create test user
    await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "test@test.com",
      password: "TestPass123!",
      englishLevel: "beginner",
    });

    // Manually confirm email for testing
    await User.updateOne(
      { email: "test@test.com" },
      { isEmailConfirmed: true }
    );
  });

  it("should login with valid credentials", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test@test.com",
        password: "TestPass123!",
      })
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty("accessToken");
    expect(response.body.data).toHaveProperty("refreshToken");
    expect(response.body.data.user.email).toBe("test@test.com");
  });

  it("should reject unconfirmed email", async () => {
    // Create unconfirmed user
    await request(app).post("/api/auth/register").send({
      name: "Unconfirmed",
      email: "unconfirmed@test.com",
      password: "TestPass123!",
      englishLevel: "beginner",
    });

    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "unconfirmed@test.com",
        password: "TestPass123!",
      })
      .expect(401);

    expect(response.body.error.message).toContain("confirmar");
  });
});
```

### Test Commands

```json
// package.json scripts
{
  "scripts": {
    "test": "vitest run", // Run all tests once
    "test:watch": "vitest", // Run tests in watch mode
    "test:coverage": "vitest run --coverage", // Generate coverage report
    "test:ui": "vitest --ui", // Run tests with UI
    "test:e2e": "cypress run", // Run E2E tests (headless)
    "test:e2e:open": "cypress open" // Open Cypress UI
  }
}
```

---

## Environment Configuration

### Environment Variables

#### Frontend (.env.example)

```bash
# API Configuration
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000

# OAuth
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
VITE_FACEBOOK_APP_ID=your-facebook-app-id

# Analytics (optional)
VITE_GA_ID=G-XXXXXXXXXX

# Environment
VITE_NODE_ENV=development
```

#### Backend (.env.example)

```bash
# Server
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/talq-dev
# Production: mongodb+srv://username:password@cluster.mongodb.net/talq

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_REFRESH_SECRET=your-refresh-token-secret
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d

# Email (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxx
EMAIL_FROM=TALQ <noreply@letstalq.com>

# File Storage (AWS S3)
AWS_ACCESS_KEY_ID=AKIAXXXXXXXXXXXXXXXX
AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
AWS_REGION=us-east-1
AWS_S3_BUCKET=talq-uploads

# AWS S3 Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=xxxxxxxxxxxxxxxxxxxx
CLOUDINARY_API_SECRET=xxxxxxxxxxxxxxxxxxxx

# OAuth
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret

# Frontend URL (for OAuth redirects and CORS)
FRONTEND_URL=http://localhost:5173
# Production: https://letstalq.com

# Monitoring (optional)
SENTRY_DSN=https://xxxxxx@sentry.io/xxxxxx

# Rate Limiting (optional)
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

### Environments

#### Development (Local)

```yaml
Purpose: Local development
URL: http://localhost:5173 (frontend), http://localhost:5000 (backend)
Database: Local MongoDB or MongoDB Atlas development cluster
Debugging: Enabled (source maps, verbose logging)
Hot Reload: Enabled (Vite HMR, nodemon)
Mocks: External services can be mocked
Features: All features enabled, including experimental
```

#### Production

```yaml
Purpose: Live application
URL: https://letstalq.com (frontend), https://api.letstalq.com (backend)
Database: MongoDB Atlas production cluster (M10+)
Monitoring: Full monitoring with Sentry
Error Tracking: Enabled
Performance: Optimized builds, minified assets
Auto-scaling: Enabled (via Railway/Vercel)
Backups: Automated daily
CDN: Enabled via Cloudflare
SSL: Enforced
HTTPS: Required
```

---

## Deployment Architecture

### CI/CD Pipeline (GitHub Actions)

#### Frontend Workflow (.github/workflows/frontend-deploy.yml)

```yaml
name: Deploy Frontend

on:
  push:
    branches: [main]
    paths:
      - "frontend/**"
      - ".github/workflows/frontend-deploy.yml"

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "22"
          cache: "npm"
          cache-dependency-path: frontend/package-lock.json

      - name: Install dependencies
        working-directory: ./frontend
        run: npm ci

      - name: Run linting
        working-directory: ./frontend
        run: npm run lint

      - name: Run tests
        working-directory: ./frontend
        run: npm run test

      - name: Build
        working-directory: ./frontend
        run: npm run build
        env:
          VITE_API_URL: ${{ secrets.VITE_API_URL }}
          VITE_SOCKET_URL: ${{ secrets.VITE_SOCKET_URL }}
          VITE_GOOGLE_CLIENT_ID: ${{ secrets.VITE_GOOGLE_CLIENT_ID }}
          VITE_FACEBOOK_APP_ID: ${{ secrets.VITE_FACEBOOK_APP_ID }}

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./frontend
          vercel-args: "--prod"

      - name: Notify Slack
        if: always()
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          text: "Frontend deployment ${{ job.status }}"
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

#### Backend Workflow (.github/workflows/backend-deploy.yml)

```yaml
name: Deploy Backend

on:
  push:
    branches: [main]
    paths:
      - "backend/**"
      - ".github/workflows/backend-deploy.yml"

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "22"
          cache: "npm"
          cache-dependency-path: backend/package-lock.json

      - name: Install dependencies
        working-directory: ./backend
        run: npm ci

      - name: Run linting
        working-directory: ./backend
        run: npm run lint

      - name: Run tests
        working-directory: ./backend
        run: npm run test
        env:
          MONGODB_URI: ${{ secrets.MONGODB_TEST_URI }}
          JWT_SECRET: test-secret

      - name: Deploy to Railway
        uses: bervProject/railway-deploy@main
        with:
          railway_token: ${{ secrets.RAILWAY_TOKEN }}
          service: backend
          environment: production

      - name: Run database migrations (if any)
        working-directory: ./backend
        run: npm run migrate
        env:
          MONGODB_URI: ${{ secrets.MONGODB_URI }}

      - name: Smoke test
        run: |
          sleep 10
          curl --fail https://api.letstalq.com/api/health || exit 1

      - name: Notify Slack
        if: always()
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          text: "Backend deployment ${{ job.status }}"
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

### Deployment Checklist

#### Pre-Deployment

```markdown
- [ ] All tests passing locally
- [ ] Code reviewed and approved (if team)
- [ ] Environment variables updated in Vercel/Railway dashboard
- [ ] Database migrations prepared (if any schema changes)
- [ ] Backup taken of production database
- [ ] CHANGELOG.md updated with new version
- [ ] Version bumped in package.json
- [ ] No console.log or debugger statements
- [ ] No hardcoded secrets or API keys
```

#### Post-Deployment

```markdown
- [ ] Smoke tests passed (health endpoint responds)
- [ ] Monitoring dashboards checked (Sentry, Vercel Analytics)
- [ ] Error rates normal (< 1%)
- [ ] Performance metrics acceptable (API < 200ms, FCP < 1.5s)
- [ ] Database queries performing well (no slow queries logged)
- [ ] WebSocket connections stable
- [ ] Email service working (send test email)
- [ ] OAuth providers working (test Google/Facebook login)
- [ ] File uploads working (test upload to S3)
- [ ] Chat working (send test message)
- [ ] Team notified in Slack/Discord
- [ ] Update project status board
```

### Rollback Procedure

```bash
# If deployment fails or critical bug discovered

# 1. Immediate rollback on Vercel (Frontend)
vercel rollback https://letstalq.com

# 2. Rollback on Railway (Backend)
# Via Railway dashboard: Deployments → Select previous deployment → Redeploy

# 3. Database rollback (if schema changed)
npm run migrate:rollback

# 4. Verify rollback
curl https://api.letstalq.com/api/health
curl https://letstalq.com

# 5. Notify team
# Post in Slack: "🚨 Rollback executed due to [reason]"

# 6. Investigate and fix
git revert <commit-hash>
# Or fix bug in new branch, test thoroughly, redeploy
```

---

## Monitoring & Logging

### Logging Strategy

#### Backend Logging (Winston)

```javascript
// utils/logger.js
import winston from "winston";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: "logs/error.log",
    level: "error",
  }),
  new winston.transports.File({ filename: "logs/all.log" }),
];

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  levels,
  format,
  transports,
});

export default logger;

// Usage
logger.info("Server started on port 5000");
logger.error("Database connection failed", { error: error.message });
logger.http(`${req.method} ${req.url} ${res.statusCode}`);
```

#### Request Logging Middleware

```javascript
// middleware/requestLogger.js
import logger from "../utils/logger.js";

export const requestLogger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.http(
      `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`,
      {
        method: req.method,
        url: req.originalUrl,
        status: res.statusCode,
        duration,
        ip: req.ip,
        userAgent: req.get("user-agent"),
      }
    );
  });

  next();
};
```

### Error Tracking (Sentry)

#### Backend Setup

```javascript
// app.js
import * as Sentry from "@sentry/node";

// Initialize Sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1, // 10% of transactions
});

// Request handler (must be first middleware)
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

// ... your routes ...

// Error handler (must be before other error handlers)
app.use(Sentry.Handlers.errorHandler());

// Custom error handler
app.use((err, req, res, next) => {
  logger.error(err.message, { stack: err.stack });

  res.status(err.statusCode || 500).json({
    success: false,
    error: {
      message:
        process.env.NODE_ENV === "production"
          ? "Error del servidor"
          : err.message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    },
  });
});
```

#### Frontend Setup

```javascript
// main.jsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
  tracesSampleRate: 0.1,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

// Wrap App with Sentry
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Sentry.ErrorBoundary fallback={<ErrorFallback />}>
    <App />
  </Sentry.ErrorBoundary>
);
```

### Monitoring Metrics

#### Infrastructure Metrics (Railway Dashboard)

```yaml
CPU Usage: Target < 80%
Memory Usage: Target < 85%
Disk I/O: Monitor for spikes
Network Traffic: Monitor bandwidth usage
Response Time: p95 < 200ms
Error Rate: Target < 1%
```

#### Application Metrics (Sentry)

```yaml
Error Frequency: Daily errors < 50
Error Rate: < 1% of requests
Response Time: p95 < 200ms
Transaction Volume: Track trends
User-Affected Errors: Priority for errors affecting many users
```

#### Business Metrics (Google Analytics / Custom Dashboard)

```yaml
Daily Active Users (DAU)
Weekly Active Users (WAU)
User Registrations (daily)
Login Success Rate
Assignment Completion Rate
Exam Completion Rate
Chat Messages Sent (daily)
Video Views (daily)
Average Session Duration
Bounce Rate
```

### Alerts Configuration

#### Critical Alerts (Immediate action)

```yaml
- API Error Rate > 5% for 5 minutes
- API Response Time p95 > 1 second
- Database connection failed
- Payment processing failure (future)
- Service completely down (uptime < 95%)
```

#### Warning Alerts (Monitor closely)

```yaml
- API Error Rate > 2% for 10 minutes
- API Response Time p95 > 500ms
- CPU usage > 85% for 15 minutes
- Memory usage > 90%
- Disk usage > 80%
- Unusual spike in traffic (> 200% normal)
```

#### Info Alerts (Awareness)

```yaml
- New user registration
- Deployment completed
- Backup completed
- Scheduled maintenance reminder
```

---

## Maintenance & Updates

### Update Schedule

```yaml
Dependencies:
  Security Patches: Within 48 hours of release
  Minor Updates: Monthly (after testing in dev)
  Major Updates: Quarterly (with migration plan)

Framework Updates:
  React: Quarterly (if stable, after community feedback)
  Node.js: Annual (LTS versions only)
  MongoDB: Annual (test thoroughly in staging)

Infrastructure:
  Railway/Vercel: Automatic (managed by provider)
  MongoDB Atlas: Auto-updates to minor versions

Code Refactoring:
  Frequency: Continuous (as needed)
  Major Refactors: Quarterly planning
```

### Backup Strategy

```yaml
Database (MongoDB Atlas):
  Type: Continuous Cloud Backup
  Frequency: Real-time (Point-in-time recovery)
  Snapshots: Daily (retain 7 days)
  Retention:
    - Daily: 7 days
    - Weekly: 4 weeks
    - Monthly: 3 months
  Storage: Cross-region replication
  Testing: Monthly restore test to staging

Files (AWS S3):
  Type: Continuous backup (built-in versioning)
  Retention: 30 days
  Testing: Quarterly restore test

Code:
  Primary: GitHub (version controlled)
  Frequency: Every commit
  Retention: Indefinite (Git history)
  Backup: GitHub auto-backup

Environment Variables:
  Storage: Encrypted in password manager (1Password/Bitwarden)
  Documentation: .env.example in repo
  Frequency: Update when changed
```

### Disaster Recovery Plan

```yaml
Scenario: Complete system failure

Recovery Time Objective (RTO): 4 hours
Recovery Point Objective (RPO): 1 hour

Recovery Steps: 1. Assess Damage (15 minutes)
  - Check status of all services
  - Identify point of failure
  - Notify team and stakeholders

  2. Activate Backup Infrastructure (30 minutes)
  - Spin up new Railway/Vercel instances
  - Restore MongoDB from latest snapshot
  - Restore files from S3 backup

  3. Deploy Application (1 hour)
  - Deploy backend from GitHub (last known good commit)
  - Deploy frontend from GitHub
  - Run database migrations if needed
  - Configure environment variables

  4. Verification (1 hour)
  - Run smoke tests
  - Test critical user flows
  - Verify data integrity
  - Check all integrations (OAuth, email, storage)

  5. Go Live (30 minutes)
  - Update DNS if needed
  - Enable monitoring and alerts
  - Notify users of service restoration

  6. Post-Mortem (within 48 hours)
  - Document what happened
  - Identify root cause
  - Implement preventive measures
  - Update disaster recovery plan

Communication Plan:
  - Stakeholders: Immediate email/call
  - Users: Status page update + email notification
  - Team: Slack/Discord alert
  - Progress updates: Every 30 minutes

Testing:
  Frequency: Quarterly disaster recovery drill
  Process: Simulate failure in staging environment
  Documentation: Update RTO/RPO based on results
```

---

## Document Maintenance

**Review Frequency:** Quarterly or when major architectural changes occur

**Update Triggers:**

- New technology adoption (e.g., adding Redis, switching to PostgreSQL)
- Major refactoring (e.g., migrating to microservices)
- Security updates (e.g., new authentication method)
- Performance optimization changes (e.g., implementing caching layer)
- New external integrations (e.g., payment gateway, analytics)
- Infrastructure changes (e.g., switching hosting providers)
- Team growth (e.g., onboarding new developers)

**Version History:**
| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | Diciembre 10, 2025 | Initial architecture document for TALQ MVP | Patricio |
| 1.1 | Diciembre 10, 2025 | Adopted Acorn React Template stack: CRA, Bootstrap, Formik+Yup, Redux Toolkit | Patricio |
| 1.2 | Diciembre 10, 2025 | Backend changed to TypeScript, Storage standardized to AWS S3 only | Patricio |

---

**Document Status:** ✅ Complete and Ready for Development

**Next Steps:**

1. ✅ PRD approved
2. ✅ Architecture approved
3. → Create GitHub repository (monorepo structure)
4. → Setup development environment
5. → Sprint 1 kickoff (Week 1-2: Foundation & Authentication)

---

**Last Updated:** Diciembre 10, 2025  
**Next Review:** Marzo 10, 2026  
**Maintained by:** Patricio  
**Contact:** patricio@ac95.ca

---

## Quick Reference Links

**Documentation:**

- Product Requirements Document (PRD): `TALQ_PRD_COMPLETO.md`
- Architecture Document: This file
- API Documentation: (Will be generated with Swagger/OpenAPI after Sprint 3)

**Repository:**

- GitHub: (To be created)
- Frontend: `talq/frontend/`
- Backend: `talq/backend/`

**Deployment:**

- Frontend: Vercel (https://letstalq.com)
- Backend: Railway (https://api.letstalq.com)
- Database: MongoDB Atlas
- Files: AWS S3

**Monitoring:**

- Errors: Sentry
- Uptime: UptimeRobot
- Analytics: Google Analytics 4

**Support:**

- Email: patricio@ac95.ca
- Documentation: (To be created on Notion/Confluence)

---

**🚀 Ready to build something amazing!**
