# Product Requirements Document (PRD)

**Product:** TALQ - Language Learning Platform  
**Version:** 1.0  
**Date:** Diciembre 10, 2025  
**Owner:** Patricio  
**Status:** 🟡 Planning

---

## 1. Product Vision

### Problem Statement

Las escuelas de idiomas enfrentan la fragmentación entre clases presenciales y contenido digital, usando múltiples herramientas desconectadas (Zoom, Google Classroom, WhatsApp) que dificultan el seguimiento del progreso del estudiante y la entrega de contenido estructurado.

**Para quién:** Escuelas de idiomas (inicialmente enfocado en inglés) que ofrecen modelo híbrido presencial-digital

**El problema es:** Falta de integración entre la experiencia presencial y digital, sin seguimiento unificado del progreso del estudiante según el temario establecido

**Actualmente ellos:** Usan combinaciones de Zoom + Google Classroom + Excel + WhatsApp para gestionar clases, tareas, exámenes y comunicación, resultando en información dispersa y pobre experiencia de usuario

**Nuestro producto:** Plataforma web integrada (MERN) que unifica gestión de clases presenciales, tareas, exámenes de las 4 habilidades, videocápsulas y seguimiento de progreso en un solo lugar, con arquitectura escalable para adaptarse a cualquier tipo de curso

### Success Definition

En 6 meses, este producto será exitoso si:

- **Adopción:** 1 escuela piloto con 50+ estudiantes activos usando la plataforma regularmente
- **Engagement:** 70% de estudiantes completan tareas semanales dentro de la plataforma
- **NPS:** Net Promoter Score de 40+ entre profesores y estudiantes
- **Escalabilidad técnica:** Arquitectura validada para white-label (customización para otros tipos de cursos)

---

## 2. User Personas

### Primary User 1: Estudiante de Idiomas

- **Context:** Adulto joven (18-35 años) tomando clases de inglés con 5 horas presenciales semanales
- **Goal:** Aprender inglés de forma estructurada con seguimiento claro de su progreso
- **Pain:** Contenido disperso en múltiples plataformas, no sabe qué estudiar o repasar, falta feedback inmediato
- **Tech Level:** Medio (usa apps móviles diariamente pero no es desarrollador)

### Primary User 2: Profesor de Idiomas

- **Context:** Instructor de inglés que maneja múltiples grupos, crea contenido y califica tareas/exámenes
- **Goal:** Gestionar eficientemente su carga de trabajo y dar seguimiento personalizado a cada estudiante
- **Pain:** Calificar manualmente todo, sin visibilidad del progreso grupal, comunicación fragmentada
- **Tech Level:** Medio (usa herramientas educativas pero no todas son intuitivas)

### Primary User 3: Administrador de Escuela

- **Context:** Director/coordinador académico que supervisa múltiples profesores y grupos
- **Goal:** Tener visibilidad completa del desempeño académico y operación de la escuela
- **Pain:** Reportes manuales, sin datos en tiempo real, difícil identificar problemas a tiempo
- **Tech Level:** Medio-Bajo (enfocado en gestión, no en tecnología)

---

## 3. Core User Stories

### 🎯 Must Have (MVP)

#### AUTENTICACIÓN Y REGISTRO

**1a. Como visitante**, quiero acceder a una landing page clara que me explique qué es TALQ y pueda registrarme o iniciar sesión fácilmente

- **AC:** Landing page muestra: valor de la plataforma, call-to-action claro "Comenzar" / "Iniciar Sesión"
- **AC:** Dos botones de acceso: "Soy Estudiante" (→ /login) y "Soy Profesor/Admin" (→ /admin-login)
- **AC:** Diseño responsive con logo TALQ (#F5A623, #4A4A4A) y slogan "Let's Talq"
- **AC:** Footer con información de contacto

**1b. Como estudiante nuevo**, quiero registrarme con mi email o redes sociales, seleccionar mi nivel de inglés y confirmar mi cuenta

- **AC:** Formulario de registro con: nombre completo, email, contraseña, confirmar contraseña
- **AC:** Selector de nivel de inglés: Beginner (A1), Elementary (A2), Intermediate (B1), Upper-Intermediate (B2), Advanced (C1)
- **AC:** Validación en tiempo real (email válido, contraseña min 8 caracteres)
- **AC:** Botones de registro social: "Continuar con Google", "Continuar con Facebook"
- **AC:** Al registrarse, sistema envía email de confirmación con Resend
- **AC:** Usuario no puede acceder al dashboard hasta confirmar email (muestra mensaje "Revisa tu email para confirmar tu cuenta")
- **AC:** Link de confirmación en email redirige a página de éxito → auto-login → dashboard
- **AC:** Sistema automáticamente asigna al estudiante a clases según el nivel seleccionado

**1c. Como estudiante existente**, quiero iniciar sesión en mi portal para acceder a mi dashboard

- **AC:** Página `/login` con formulario: email, contraseña
- **AC:** Opción "Recordarme" con checkbox
- **AC:** Link "¿Olvidaste tu contraseña?" funcional
- **AC:** Botones de login social: Google y Facebook
- **AC:** Si email no está confirmado, mostrar mensaje y opción "Reenviar email de confirmación"
- **AC:** Al autenticar correctamente, redirección a `/student/dashboard`
- **AC:** Mensajes de error claros si credenciales son incorrectas

**1d. Como profesor o administrador**, quiero iniciar sesión en mi portal administrativo para acceder a mis funciones

- **AC:** Página `/admin-login` separada del login de estudiantes
- **AC:** Formulario con: email, contraseña
- **AC:** Link "¿Olvidaste tu contraseña?" funcional
- **AC:** Al autenticar correctamente, redirección según rol:
  - Profesor → `/teacher/dashboard`
  - Admin → `/admin/dashboard`
- **AC:** Mensajes de error claros si credenciales son incorrectas
- **AC:** NO hay registro público en esta página (solo login)

**1e. Como usuario**, quiero recuperar mi contraseña si la olvidé usando mi email

- **AC:** Página `/forgot-password` accesible desde ambos logins
- **AC:** Formulario solicita: email
- **AC:** Sistema envía email con link de recuperación usando Resend (válido 1 hora)
- **AC:** Link redirige a `/reset-password?token=XXX`
- **AC:** Página de reset muestra formulario: nueva contraseña, confirmar contraseña
- **AC:** Al completar, usuario puede hacer login con nueva contraseña
- **AC:** Tokens expirados muestran mensaje claro con opción de solicitar nuevo link

**1f. Como administrador**, quiero crear cuentas de profesores y administradores desde un panel administrativo

- **AC:** Sección en `/admin/users/create` con formulario:
  - Nombre completo
  - Email
  - Rol (Profesor / Administrador)
  - Contraseña temporal (auto-generada o manual)
- **AC:** Sistema envía email de bienvenida con credenciales usando Resend
- **AC:** Email incluye link directo a `/admin-login` y solicita cambiar contraseña en primer acceso
- **AC:** Lista de profesores/admins creados visible en `/admin/users`
- **AC:** Usuario inicial maestro existe en sistema: patricio@ac95.ca (rol: Administrador)

#### DASHBOARDS PERSONALIZADOS

**2a. Como estudiante autenticado**, quiero ver mi dashboard personalizado con mis clases, tareas y progreso

- **AC:** Primera vez que accede, mensaje de bienvenida: "¡Bienvenido a TALQ, [Nombre]! Aquí encontrarás todo lo que necesitas para tu aprendizaje"
- **AC:** Dashboard muestra:
  - Próximas clases (fecha, hora, tema, profesor) - máximo 3
  - Tareas pendientes con contador y fechas límite - máximo 5
  - Gráfica de progreso general (% completado del nivel)
  - Acceso rápido con cards: Mis Clases, Mis Tareas, Mis Exámenes, Videocápsulas, Mi Progreso
- **AC:** Sidebar/navbar con navegación: Dashboard, Clases, Tareas, Exámenes, Videos, Progreso, Chat, Mi Perfil
- **AC:** Indicador visual de nivel de inglés actual (badge)
- **AC:** Notificaciones in-app en esquina superior (campana con contador)

**2b. Como profesor autenticado**, quiero ver mi dashboard con mis cursos y tareas pendientes de calificar

- **AC:** Primera vez que accede, mensaje de bienvenida: "¡Bienvenido a TALQ, [Nombre]! Comienza creando tu primer curso"
- **AC:** Dashboard muestra:
  - Mis cursos activos (cards con nombre, nivel, cantidad de estudiantes)
  - Tareas por calificar con contador urgente (rojo si > 5 días sin calificar)
  - Próximas clases que dará (fecha, hora, grupo)
  - Acceso rápido con cards: Mis Cursos, Crear Tarea, Crear Examen, Calificaciones, Subir Video
- **AC:** Sidebar/navbar con navegación: Dashboard, Cursos, Tareas, Exámenes, Calificaciones, Contenido, Chat, Mi Perfil
- **AC:** Botón destacado "Crear Nuevo Curso" si no tiene cursos aún

**2c. Como administrador autenticado**, quiero ver el dashboard con resumen de toda la plataforma

- **AC:** Primera vez que accede (patricio@ac95.ca), mensaje: "¡Bienvenido Patricio! Comienza creando profesores y configurando cursos"
- **AC:** Dashboard muestra:
  - Estadísticas generales: total estudiantes, profesores, cursos activos
  - Gráfica de distribución de estudiantes por nivel
  - Actividad reciente (últimos registros, clases creadas)
  - Acceso rápido con cards: Gestión de Usuarios, Cursos, Contenido, Reportes, Configuración
- **AC:** Sidebar/navbar con navegación: Dashboard, Usuarios, Cursos, Contenido, Reportes, Configuración
- **AC:** Botón destacado "Crear Profesor" en esquina superior

#### GESTIÓN DE CLASES PRESENCIALES

**3. Como profesor**, quiero crear y gestionar clases presenciales para que los estudiantes vean su horario y registrar asistencia

- **AC:** Crear clase con formulario:
  - Curso (selector de mis cursos)
  - Fecha y hora
  - Tema del temario (selector del syllabus del curso)
  - Ubicación/sala
  - Duración (en minutos)
- **AC:** Vista de calendario mensual con todas mis clases
- **AC:** Al día de la clase, opción "Pasar Lista" que muestra lista de estudiantes del curso
- **AC:** Marcar asistencia: Presente, Ausente, Tarde (con checkboxes o botones)
- **AC:** Guardar asistencia y que se refleje en registro del estudiante
- **AC:** Estudiantes ven en su dashboard "Próximas Clases" con detalles completos

#### SISTEMA DE TAREAS

**4. Como profesor**, quiero crear tareas con instrucciones claras, recibir entregas de estudiantes y calificarlas

- **AC:** Crear tarea con formulario:
  - Curso (selector)
  - Título (max 100 caracteres)
  - Descripción/instrucciones (editor de texto rico)
  - Fecha límite (date picker)
  - Puntos máximos (número)
  - Adjuntar archivos de referencia (PDFs, imágenes, docs)
- **AC:** Tarea visible para todos los estudiantes del curso en su sección "Tareas"
- **AC:** Estudiante puede subir entrega: escribir texto + adjuntar archivos (hasta 10MB)
- **AC:** Estado de tarea para estudiante: No Entregada, Entregada (pendiente calificación), Calificada
- **AC:** Profesor ve lista de entregas con estados, puede abrir cada una
- **AC:** Al calificar: ingresar nota numérica (0 a puntos máximos), comentarios de retroalimentación
- **AC:** Al guardar calificación, estudiante recibe notificación in-app
- **AC:** Estudiante ve su calificación y comentarios en su sección de tareas

#### SISTEMA DE EXÁMENES DE 4 HABILIDADES

**5. Como profesor**, quiero crear exámenes que evalúen las 4 habilidades (listening, reading, writing, speaking) para medir el nivel real del estudiante

- **AC:** Crear examen con formulario básico:
  - Curso (selector)
  - Título del examen
  - Fecha de disponibilidad y fecha límite
- **AC:** Agregar secciones al examen:

  **Sección Listening:**

  - Subir archivo de audio (MP3, WAV)
  - Agregar preguntas de opción múltiple (4 opciones, marcar la correcta)
  - Asignar puntos a cada pregunta
  - Sistema autocorrige esta sección

  **Sección Reading:**

  - Ingresar texto para lectura (editor de texto)
  - Agregar preguntas de opción múltiple
  - Asignar puntos a cada pregunta
  - Sistema autocorrige esta sección

  **Sección Writing:**

  - Ingresar prompt/pregunta abierta
  - Asignar puntos máximos
  - Profesor califica manualmente con rúbrica

  **Sección Speaking:**

  - Ingresar prompt/pregunta para responder
  - Estudiante graba audio (max 3 minutos) usando micrófono del navegador
  - Asignar puntos máximos
  - Profesor escucha grabación y califica manualmente con rúbrica

- **AC:** Calcular calificación final ponderada: (Listening + Reading autocorregido + Writing + Speaking manual) / total de puntos posibles \* 100
- **AC:** Estudiante ve examen disponible en su dashboard con fecha límite
- **AC:** Interfaz de toma de examen muestra cronómetro opcional
- **AC:** Estudiante puede guardar progreso y continuar después (solo 1 intento por examen)
- **AC:** Al enviar examen, secciones autocorregibles muestran resultado inmediato
- **AC:** Secciones Writing/Speaking muestran "Pendiente de calificación"
- **AC:** Profesor ve lista de exámenes completados por calificar
- **AC:** Interfaz de calificación muestra respuestas del estudiante y permite ingresar puntos + comentarios
- **AC:** Al terminar de calificar todas las secciones, estudiante recibe notificación de calificación final

#### REPOSITORIO DE VIDEOCÁPSULAS

**6. Como administrador o profesor**, quiero subir videocápsulas pregrabadas organizadas por tema del temario

- **AC:** Sección `/admin/content/videos` o `/teacher/content/videos`
- **AC:** Formulario de upload:
  - Título del video (max 100 caracteres)
  - Descripción
  - Nivel (Beginner, Elementary, Intermediate, Upper-Intermediate, Advanced)
  - Tema del temario (selector según nivel)
  - Subir archivo de video (MP4, MOV - max 500MB) o ingresar URL de YouTube/Vimeo
- **AC:** Si es upload directo, video se sube a S3/Cloudinary con barra de progreso
- **AC:** Video queda disponible para todos los estudiantes del nivel correspondiente
- **AC:** Estudiantes ven lista de videos en `/student/videos` filtrable por tema
- **AC:** Reproductor de video integrado en la plataforma
- **AC:** Sistema registra si estudiante vio video completo (> 90% reproducido)
- **AC:** En dashboard de estudiante aparece "Videos nuevos" si hay contenido sin ver

#### TRACKER DE PROGRESO

**7. Como estudiante**, quiero ver mi progreso visual contra el temario oficial para saber qué he completado y qué me falta

- **AC:** Página `/student/progress` con vista de temario completo del nivel
- **AC:** Estructura visual: Unidades/Módulos → Temas → Actividades
- **AC:** Indicadores de progreso por unidad:
  - ✅ Completado (verde)
  - 🟡 En progreso (amarillo)
  - ⚪ Pendiente (gris)
- **AC:** % de avance general en barra de progreso grande
- **AC:** Desglose por tipo de actividad:
  - Clases asistidas / Total de clases
  - Tareas entregadas / Total de tareas
  - Exámenes completados / Total de exámenes
  - Videos vistos / Total de videos
- **AC:** Gráfica de calificaciones promedio por tipo de actividad
- **AC:** Timeline de logros (insignias futuras, por ahora solo lista de actividades completadas con fechas)

#### CHAT INTERNO

**8. Como estudiante o profesor**, quiero enviar mensajes internos a otros usuarios para resolver dudas sin salir de la plataforma

- **AC:** Sección `/chat` accesible desde navegación principal
- **AC:** Lista de conversaciones en sidebar (estilo WhatsApp):
  - Avatar del usuario
  - Nombre
  - Último mensaje (preview)
  - Fecha/hora del último mensaje
  - Indicador de mensajes no leídos (badge con número)
- **AC:** Al hacer clic en conversación, área de mensajes muestra historial completo
- **AC:** Mensajes muestran: texto, hora enviada, estado (enviado ✓, leído ✓✓)
- **AC:** Input para escribir mensaje en tiempo real con WebSocket (Socket.io)
- **AC:** Notificación in-app cuando llega mensaje nuevo (campana + badge)
- **AC:** Buscar usuario para iniciar nueva conversación (estudiante puede buscar profesores, profesor puede buscar estudiantes de sus cursos)
- **AC:** Estudiantes NO pueden enviar mensajes a otros estudiantes (solo a profesores)
- **AC:** Profesores pueden enviar mensajes a estudiantes de sus cursos
- **AC:** Administradores pueden enviar mensajes a cualquier usuario

### 📈 Should Have (Post-MVP)

- Desbloqueo progresivo de contenido (videos se desbloquean según avance en clases presenciales)
- Sistema de insignias y gamificación por logros (racha de asistencia, tareas a tiempo, exámenes destacados)
- Notificaciones push y por email automáticas
- Reportes avanzados para administradores (desempeño por grupo, tendencias)
- Calendario integrado con sincronización Google Calendar
- Foro de discusión por curso
- Sala de estudio virtual (whiteboard compartido)
- Biblioteca de recursos descargables (PDFs, audios para práctica)

### 💡 Could Have (Futuro - Fase IA)

- Chatbot tutor 24/7 para resolver dudas del temario
- Práctica de conversación con IA entre clases
- Corrección automática de pronunciación con IA
- Recomendaciones personalizadas de qué repasar según errores recurrentes
- Sistema de repetición espaciada automatizado
- Generación automática de ejercicios con IA
- Subtítulos automáticos en videos con IA
- Traducción en tiempo real en el chat

---

## 3.5. User Flow - Autenticación y Navegación

```
┌────────────────────────────────────────────────────────┐
│                  LANDING PAGE (/)                      │
│                                                        │
│  [Logo TALQ]  "Let's Talq"                            │
│  • Aprende idiomas de forma integrada                 │
│  • Clases presenciales + contenido digital            │
│                                                        │
│  CTA: [Soy Estudiante] [Soy Profesor/Admin]          │
│                                                        │
└────────┬────────────────────────────┬──────────────────┘
         │                            │
         ▼                            ▼
   ┌──────────┐              ┌──────────────┐
   │  /login  │              │ /admin-login │
   │(Students)│              │(Teacher/Admin)│
   └──────────┘              └──────────────┘
         │                            │
         │                            │
    [¿No tienes cuenta?]         [Solo Login]
         │                            │
         ▼                            │
   ┌──────────┐                      │
   │/register │                      │
   │          │                      │
   │• Nombre  │                      │
   │• Email   │                      │
   │• Password│                      │
   │• Nivel   │← [Beginner/Elementary/]│
   │          │  [Intermediate/Advanced]│
   │          │                      │
   │[Google]  │                      │
   │[Facebook]│                      │
   └──────────┘                      │
         │                            │
         ▼                            │
  [Email Confirmación]                │
  Resend → Link                       │
         │                            │
         ▼                            │
   [Confirm Email]                    │
         │                            │
         ▼                            ▼
   ┌──────────────────────────────────────┐
   │      [JWT Authentication]            │
   │      Detect Role & Status            │
   └────────┬─────────────────────────────┘
            │
   ┌────────┼────────┐
   │        │        │
   ▼        ▼        ▼
┌─────┐ ┌─────┐ ┌─────┐
│Student│Teacher│Admin│
└─────┘ └─────┘ └─────┘
   │        │        │
   ▼        ▼        ▼
┌────────────────────────┐
│/student/dashboard      │
│• Próximas clases       │
│• Tareas pendientes     │
│• Progreso general      │
│Nav: Clases|Tareas|     │
│     Exámenes|Videos|   │
│     Progreso|Chat      │
└────────────────────────┘

┌────────────────────────┐
│/teacher/dashboard      │
│• Mis cursos            │
│• Tareas por calificar  │
│• Próximas clases       │
│Nav: Cursos|Tareas|     │
│     Exámenes|Calif|    │
│     Contenido|Chat     │
└────────────────────────┘

┌────────────────────────┐
│/admin/dashboard        │
│• Total estudiantes     │
│• Total profesores      │
│• Cursos activos        │
│Nav: Usuarios|Cursos|   │
│     Contenido|Reportes │
└────────────────────────┘
```

### Rutas de la Aplicación

#### **Públicas (sin autenticación):**

- `/` - Landing page
- `/login` - Login estudiantes
- `/admin-login` - Login profesores/admins
- `/register` - Registro estudiantes
- `/confirm-email/:token` - Confirmación de email
- `/forgot-password` - Solicitar recuperación
- `/reset-password/:token` - Resetear contraseña

#### **Privadas - Estudiante:**

- `/student/dashboard` - Dashboard principal
- `/student/classes` - Mis clases
- `/student/assignments` - Mis tareas
- `/student/exams` - Mis exámenes
- `/student/videos` - Videocápsulas
- `/student/progress` - Mi progreso
- `/student/chat` - Mensajes
- `/student/profile` - Mi perfil

#### **Privadas - Profesor:**

- `/teacher/dashboard` - Dashboard principal
- `/teacher/courses` - Mis cursos
- `/teacher/courses/:id` - Detalle de curso
- `/teacher/classes/create` - Crear clase
- `/teacher/assignments` - Todas las tareas
- `/teacher/assignments/create` - Crear tarea
- `/teacher/assignments/:id/grade` - Calificar tareas
- `/teacher/exams` - Todos los exámenes
- `/teacher/exams/create` - Crear examen
- `/teacher/exams/:id/grade` - Calificar exámenes
- `/teacher/grades` - Panel de calificaciones
- `/teacher/content/videos` - Subir videos
- `/teacher/chat` - Mensajes
- `/teacher/profile` - Mi perfil

#### **Privadas - Administrador:**

- `/admin/dashboard` - Dashboard principal
- `/admin/users` - Gestión de usuarios
- `/admin/users/create` - Crear profesor/admin
- `/admin/courses` - Gestión de cursos
- `/admin/courses/create` - Crear curso
- `/admin/content/videos` - Gestión de videos
- `/admin/reports` - Reportes y analytics
- `/admin/settings` - Configuración general
- `/admin/chat` - Mensajes
- `/admin/profile` - Mi perfil

#### **Compartidas (todos los roles autenticados):**

- `/profile` - Mi perfil
- `/chat` - Sistema de mensajería
- `/chat/:conversationId` - Conversación específica
- `/notifications` - Centro de notificaciones

---

## 4. Functional Scope

### In Scope ✅

- Sistema de autenticación completo con dos portales separados (estudiantes vs profesores/admin)
- Registro público solo para estudiantes con verificación de email
- OAuth 2.0 social login (Google, Facebook) para estudiantes
- Creación de profesores/admins desde admin panel
- Recuperación de contraseña con Resend
- Selección de nivel de inglés al registrarse (auto-asignación a clases)
- Gestión completa de usuarios (3 roles: estudiante, profesor, administrador)
- Usuario administrador inicial: patricio@ac95.ca
- CRUD de clases presenciales con registro de asistencia
- Sistema de tareas con entregas, calificación y feedback
- Exámenes de 4 habilidades (Listening, Reading, Writing, Speaking) con autocorrección parcial
- Grabación de audio en navegador para sección Speaking
- Repositorio de videocápsulas pregrabadas organizadas por nivel y tema
- Dashboard de progreso del estudiante vs temario
- Chat interno en tiempo real con WebSocket (Socket.io)
- Notificaciones in-app básicas
- Mensajes de bienvenida personalizados en primer acceso
- Responsive design (funciona en desktop, tablet, móvil)
- UI con paleta de colores oficial: Naranja #F5A623, Gris #4A4A4A

### Out of Scope ❌

- Videoconferencias integradas (se asumen clases presenciales físicas)
- Pagos/facturación (se asume gestión externa en MVP)
- App móvil nativa (solo web responsive)
- Integraciones con LMS externos (Moodle, Canvas)
- Funcionalidades de IA (chatbot, corrección automática, práctica con IA) - pospuesto a Fase 2
- Sistema de gamificación completo (insignias, puntos, leaderboards) - pospuesto a post-MVP
- Desbloqueo progresivo de contenido - pospuesto a post-MVP
- Multi-idioma en UI (inicialmente solo español)
- Notificaciones push móviles
- Exportación de reportes en PDF/Excel
- Integración con Google Calendar
- Foro de discusión

---

## 5. Technical Requirements

### Stack

- **Frontend:** React 18+ con Vite, React Router v6
- **UI Library:** TailwindCSS 3+ para estilos
- **State Management:** Zustand o Context API (evaluar según complejidad)
- **Backend:** Node.js 20+ LTS con Express.js 4+
- **Database:** MongoDB 7+ con Mongoose ODM
- **Real-time:** Socket.io 4+ para chat en tiempo real
- **Authentication:** JWT (access token + refresh token), Passport.js para OAuth
- **File Storage:** AWS S3 o Cloudinary para videos, archivos y avatars
- **Email Service:** Resend para transaccionales (confirmación, recuperación de contraseña, bienvenida)
- **Hosting:**
  - Frontend: Vercel o Netlify
  - Backend: Railway, Render, o DigitalOcean App Platform
  - Database: MongoDB Atlas
  - Archivos: AWS S3 o Cloudinary CDN

### Non-Functional Requirements

#### Performance

- Tiempo de carga inicial < 2 segundos en conexión 3G
- Videos con streaming optimizado (HLS o DASH)
- Lazy loading de imágenes y componentes
- Compresión de assets (Gzip/Brotli)
- Caché de datos estáticos (react-query o SWR)

#### Security

- **Autenticación:**
  - Passwords hasheados con bcrypt (salt rounds: 12)
  - JWT con access token (15 min) + refresh token (7 días)
  - HttpOnly cookies para tokens
  - Rate limiting en endpoints de autenticación (5 intentos/15 min)
- **Autorización:**
  - Middleware de verificación de roles en todas las rutas privadas
  - RBAC (Role-Based Access Control) estricto
- **Datos:**
  - HTTPS obligatorio en producción
  - Validación de inputs con Joi o Zod en backend
  - Sanitización de HTML en inputs de texto (prevenir XSS)
  - CORS configurado correctamente (whitelist de dominios)
  - Protección contra CSRF con tokens
- **Archivos:**
  - Validación de tipos de archivo (MIME type checking)
  - Límites de tamaño (videos: 500MB, documentos: 10MB)
  - Escaneo de virus con ClamAV (opcional en MVP, recomendado post-MVP)
- **Database:**
  - Índices en campos frecuentemente consultados
  - No exponer stack traces en producción
  - Backups automáticos diarios

#### Scalability

- Arquitectura stateless (backend no guarda sesiones en memoria)
- WebSockets con Redis Adapter para múltiples instancias (cuando sea necesario escalar)
- CDN para archivos estáticos y videos
- Preparado para 500 usuarios concurrentes en MVP
- Diseñado para escalar horizontalmente (agregar más instancias de backend)

#### Accessibility (WCAG 2.1 AA)

- Contraste de colores mínimo 4.5:1 para texto normal
- Navegación completa por teclado (Tab, Enter, Esc)
- Labels en todos los inputs de formulario
- Alt text en todas las imágenes
- Anuncios de screen reader para acciones importantes
- Focus visible en elementos interactivos
- Estructura semántica HTML5 correcta

#### Browser Support

- Chrome/Edge (últimas 2 versiones)
- Firefox (últimas 2 versiones)
- Safari (últimas 2 versiones)
- Funcionalidad básica en IE11 (sin soporte completo, mostrar mensaje de actualización)

### External Dependencies

#### Core Services

- **OAuth Providers:**
  - Google OAuth 2.0 Client (para "Continuar con Google")
  - Facebook Login SDK (para "Continuar con Facebook")
- **Email Service:** Resend (API key requerida)
  - Emails transaccionales: confirmación de cuenta, recuperación de contraseña, bienvenida profesores
  - Templates HTML responsivos
- **File Storage:** AWS S3 o Cloudinary
  - Videos de videocápsulas
  - Grabaciones de audio (Speaking exams)
  - Archivos adjuntos (tareas, materiales)
  - Avatars de usuarios
- **Real-time:** Socket.io Server + Client
  - Chat en tiempo real
  - Notificaciones in-app

#### Optional/Nice-to-Have

- **Monitoring:** Sentry para error tracking y performance monitoring
- **Analytics:** Google Analytics o Plausible para métricas de uso
- **CDN:** Cloudflare para distribución de contenido estático

### Environment Variables

```bash
# Backend
NODE_ENV=development|production
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
RESEND_API_KEY=re_xxxxx
AWS_ACCESS_KEY_ID=your-key (o Cloudinary equivalente)
AWS_SECRET_ACCESS_KEY=your-secret
AWS_S3_BUCKET=talq-uploads
GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxxxx
FACEBOOK_APP_ID=xxxxx
FACEBOOK_APP_SECRET=xxxxx
FRONTEND_URL=http://localhost:5173 (o dominio producción)
CORS_ORIGIN=http://localhost:5173

# Frontend
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com
VITE_FACEBOOK_APP_ID=xxxxx
```

---

## 6. Data Model

### Core Entities

```javascript
User {
  _id: ObjectId,
  email: String (unique, required, lowercase),
  password: String (hashed, required if not OAuth),
  name: String (required),
  role: Enum ['student', 'teacher', 'admin'] (required),
  avatar: String (URL to S3/Cloudinary),
  phone: String (optional),

  // OAuth fields
  googleId: String (optional, unique sparse),
  facebookId: String (optional, unique sparse),

  // Student specific
  englishLevel: Enum ['beginner', 'elementary', 'intermediate', 'upper-intermediate', 'advanced'] (if role=student),
  enrolledCourses: [ObjectId] (ref: Course),

  // Account status
  isEmailConfirmed: Boolean (default: false),
  emailConfirmationToken: String (optional),
  emailConfirmationExpires: Date (optional),
  passwordResetToken: String (optional),
  passwordResetExpires: Date (optional),

  // Metadata
  lastLogin: Date,
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}

Course {
  _id: ObjectId,
  name: String (required, e.g., "English Intermediate B1 - Group A"),
  description: String,
  level: Enum ['beginner', 'elementary', 'intermediate', 'upper-intermediate', 'advanced'] (required),
  startDate: Date (required),
  endDate: Date (required),
  teacherId: ObjectId (ref: User, required),
  studentIds: [ObjectId] (ref: User),

  // Syllabus structure
  syllabus: [{
    order: Number,
    unit: String (e.g., "Unit 1: Greetings"),
    topics: [{
      title: String (e.g., "Formal vs Informal greetings"),
      description: String,
      estimatedHours: Number
    }]
  }],

  // Schedule
  schedule: String (e.g., "Lunes y Miércoles 18:00-20:30"),
  location: String (e.g., "Sala 301"),

  // Metadata
  isActive: Boolean (default: true),
  createdBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}

Class {
  _id: ObjectId,
  courseId: ObjectId (ref: Course, required),
  teacherId: ObjectId (ref: User, required),

  // Class details
  date: Date (required),
  startTime: String (e.g., "18:00"),
  endTime: String (e.g., "20:30"),
  topic: String (required, from syllabus),
  location: String (e.g., "Sala 301"),

  // Attendance
  attendance: [{
    studentId: ObjectId (ref: User),
    status: Enum ['present', 'absent', 'late'] (default: 'absent'),
    markedAt: Date
  }],

  // Metadata
  createdAt: Date,
  updatedAt: Date
}

Assignment {
  _id: ObjectId,
  courseId: ObjectId (ref: Course, required),
  teacherId: ObjectId (ref: User, required),

  // Assignment details
  title: String (required, max 100 chars),
  description: String (required, rich text),
  dueDate: Date (required),
  maxPoints: Number (required, default: 100),
  attachments: [{
    filename: String,
    url: String,
    size: Number,
    uploadedAt: Date
  }],

  // Submissions
  submissions: [{
    studentId: ObjectId (ref: User),
    content: String (text response),
    files: [{
      filename: String,
      url: String,
      size: Number
    }],
    submittedAt: Date,

    // Grading
    grade: Number (0 to maxPoints),
    feedback: String,
    gradedBy: ObjectId (ref: User),
    gradedAt: Date,
    status: Enum ['submitted', 'graded', 'late'] (default: 'submitted')
  }],

  // Metadata
  createdAt: Date,
  updatedAt: Date
}

Exam {
  _id: ObjectId,
  courseId: ObjectId (ref: Course, required),
  teacherId: ObjectId (ref: User, required),

  // Exam details
  title: String (required),
  availableFrom: Date (required),
  dueDate: Date (required),
  duration: Number (minutes, optional),
  instructions: String,

  // Exam sections
  sections: [{
    type: Enum ['listening', 'reading', 'writing', 'speaking'] (required),
    title: String (e.g., "Part 1: Listening Comprehension"),
    instructions: String,
    maxPoints: Number (required),

    // For listening
    audioUrl: String (if type=listening),

    // For reading
    readingText: String (if type=reading),

    // Questions (for listening/reading)
    questions: [{
      order: Number,
      question: String,
      options: [String] (4 options for multiple choice),
      correctAnswer: Number (index 0-3),
      points: Number
    }],

    // For writing/speaking (open-ended)
    prompt: String,
    rubric: String (grading criteria)
  }],

  // Student attempts
  attempts: [{
    studentId: ObjectId (ref: User),
    startedAt: Date,
    submittedAt: Date,

    // Answers
    answers: [{
      sectionIndex: Number,
      questionIndex: Number (if applicable),
      answer: Mixed (Number for multiple choice, String for text, URL for audio)
    }],

    // Grading
    autoGradedScore: Number (listening + reading),
    manualGrades: [{
      sectionIndex: Number,
      score: Number,
      feedback: String,
      gradedBy: ObjectId (ref: User),
      gradedAt: Date
    }],
    totalScore: Number,
    percentage: Number,
    status: Enum ['in-progress', 'submitted', 'graded'] (default: 'in-progress')
  }],

  // Metadata
  createdAt: Date,
  updatedAt: Date
}

Video {
  _id: ObjectId,
  title: String (required, max 100 chars),
  description: String,

  // Organization
  level: Enum ['beginner', 'elementary', 'intermediate', 'upper-intermediate', 'advanced'] (required),
  topic: String (linked to syllabus topic),

  // Video details
  url: String (S3/Cloudinary URL or YouTube/Vimeo embed),
  thumbnail: String (URL),
  duration: Number (seconds),
  fileSize: Number (bytes, if uploaded),

  // Access control
  uploadedBy: ObjectId (ref: User, admin or teacher),

  // Tracking
  views: [{
    studentId: ObjectId (ref: User),
    watchedAt: Date,
    watchedDuration: Number (seconds),
    completed: Boolean (default: false, true if >90% watched)
  }],

  // Metadata
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}

Message {
  _id: ObjectId,
  conversationId: String (generated from sorted [userId1, userId2]),
  fromUserId: ObjectId (ref: User, required),
  toUserId: ObjectId (ref: User, required),
  content: String (required, max 2000 chars),

  // Status
  isRead: Boolean (default: false),
  readAt: Date (optional),

  // Metadata
  sentAt: Date (default: now),
  createdAt: Date,
  updatedAt: Date
}

Notification {
  _id: ObjectId,
  userId: ObjectId (ref: User, required),
  type: Enum ['assignment_graded', 'exam_graded', 'new_message', 'class_reminder', 'welcome'] (required),
  title: String (required),
  message: String (required),
  linkTo: String (URL to navigate, optional),

  // Status
  isRead: Boolean (default: false),
  readAt: Date (optional),

  // Metadata
  createdAt: Date,
  updatedAt: Date
}

Progress {
  _id: ObjectId,
  studentId: ObjectId (ref: User, required),
  courseId: ObjectId (ref: Course, required),

  // Completion tracking
  completedTopics: [String] (topic titles from syllabus),

  // Stats
  classesAttended: Number (default: 0),
  totalClasses: Number,
  attendanceRate: Number (percentage),

  assignmentsCompleted: Number (default: 0),
  totalAssignments: Number,
  avgAssignmentGrade: Number,

  examsCompleted: Number (default: 0),
  totalExams: Number,
  avgExamGrade: Number,

  videosWatched: Number (default: 0),
  totalVideos: Number,

  // Overall
  overallProgress: Number (percentage 0-100),
  currentUnit: String,

  // Metadata
  lastUpdated: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Key Relationships

- **User (Teacher) 1:N Course** - Un profesor puede crear/manejar múltiples cursos
- **User (Admin) 1:N User (Teacher, Admin)** - Admins crean cuentas de profesores y otros admins
- **Course M:N User (Student)** - Estudiantes se asignan automáticamente a cursos según nivel
- **Course 1:N Class** - Cada curso tiene múltiples clases presenciales
- **Course 1:N Assignment** - Cada curso tiene múltiples tareas
- **Course 1:N Exam** - Cada curso tiene múltiples exámenes
- **Video N:1 Level** - Videos están organizados por nivel de inglés
- **User M:N Message** - Conversaciones bidireccionales entre usuarios
- **User 1:N Notification** - Cada usuario tiene múltiples notificaciones
- **Student 1:N Progress** - Cada estudiante tiene registro de progreso por curso

### Database Indexes (Performance)

```javascript
// User collection
User.index({ email: 1 }, { unique: true });
User.index({ googleId: 1 }, { sparse: true, unique: true });
User.index({ facebookId: 1 }, { sparse: true, unique: true });
User.index({ role: 1, isActive: 1 });

// Course collection
Course.index({ teacherId: 1, isActive: 1 });
Course.index({ level: 1, isActive: 1 });
Course.index({ studentIds: 1 });

// Class collection
Class.index({ courseId: 1, date: -1 });
Class.index({ teacherId: 1, date: -1 });

// Assignment collection
Assignment.index({ courseId: 1, dueDate: -1 });
Assignment.index({ "submissions.studentId": 1, "submissions.status": 1 });

// Exam collection
Exam.index({ courseId: 1, availableFrom: -1 });
Exam.index({ "attempts.studentId": 1, "attempts.status": 1 });

// Video collection
Video.index({ level: 1, isActive: 1 });
Video.index({ topic: 1 });

// Message collection
Message.index({ conversationId: 1, sentAt: -1 });
Message.index({ toUserId: 1, isRead: 1 });

// Notification collection
Notification.index({ userId: 1, isRead: 1, createdAt: -1 });

// Progress collection
Progress.index({ studentId: 1, courseId: 1 }, { unique: true });
Progress.index({ courseId: 1, overallProgress: -1 });
```

---

## 7. MVP Definition

### What Gets Built First

**Timeline:** 12 semanas (3 meses)  
**Sprints:** 6 sprints de 2 semanas cada uno

### Sprint-by-Sprint Breakdown

#### **Sprint 1-2: Foundation (Weeks 1-4)**

**Included:**

- ✅ Configuración de proyecto (monorepo con frontend + backend)
- ✅ Setup de MongoDB Atlas + Mongoose schemas básicos
- ✅ Sistema de autenticación JWT completo:
  - Registro de estudiantes con selección de nivel
  - Dos páginas de login separadas (/login y /admin-login)
  - OAuth 2.0 con Google y Facebook (solo para estudiantes)
  - Confirmación de email con Resend (envío + validación de token)
  - Recuperación de contraseña con Resend (solicitud + reset)
- ✅ Middleware de autorización por roles (RBAC)
- ✅ User model completo con campos para OAuth y verificación
- ✅ Rutas públicas funcionales
- ✅ Landing page con diseño basado en logo TALQ

**Deliverable Sprint 2:**
Usuario puede registrarse como estudiante, confirmar su email, hacer login y ver dashboard vacío con mensaje de bienvenida

---

#### **Sprint 3-4: Core Educational Features (Weeks 5-8)**

**Included:**

- ✅ Admin panel básico:
  - Crear usuarios profesor/admin (formulario + envío de email con Resend)
  - Usuario inicial maestro: patricio@ac95.ca pre-seeded en DB
  - Lista de usuarios con filtros por rol
- ✅ Gestión de Cursos:
  - CRUD completo de cursos
  - Estructura de syllabus (unidades → temas)
  - Auto-asignación de estudiantes a cursos según nivel al registrarse
- ✅ Gestión de Clases Presenciales:
  - Crear clase con date picker, tiempo, tema del syllabus
  - Registro de asistencia (presente/ausente/tarde)
  - Vista de calendario mensual de clases (profesor)
  - Vista de próximas clases (estudiante)
- ✅ Sistema de Tareas:
  - Crear tarea con editor de texto rico (react-quill o similar)
  - Upload de archivos de referencia a S3/Cloudinary
  - Estudiante entrega tarea (texto + archivos)
  - Profesor ve lista de entregas
  - Calificar con nota + comentarios
  - Estados: No Entregada, Entregada, Calificada, Tarde
- ✅ Dashboards personalizados para 3 roles con datos reales

**Deliverable Sprint 4:**
Profesor puede crear curso con syllabus, agregar clases, crear tareas. Estudiantes ven sus clases, entregan tareas y reciben calificaciones.

---

#### **Sprint 5-6: Exams & Video Content (Weeks 9-12)**

**Included:**

- ✅ Sistema de Exámenes Completo:
  - Crear examen con 4 secciones (Listening, Reading, Writing, Speaking)
  - **Listening:** upload de audio (MP3) a S3, preguntas de opción múltiple, autocorrección
  - **Reading:** texto + preguntas de opción múltiple, autocorrección
  - **Writing:** prompt abierto, calificación manual con campo de comentarios
  - **Speaking:** interfaz de grabación de audio en navegador (MediaRecorder API), upload a S3, calificación manual
  - Estudiante toma examen con navegación entre secciones
  - Guardar progreso (permitir continuar después)
  - Enviar examen y ver resultado inmediato de secciones autocorregibles
  - Profesor ve lista de exámenes pendientes de calificación
  - Interfaz de calificación con reproductor de audio para Speaking
  - Cálculo de calificación final ponderada
- ✅ Repositorio de Videos:
  - Upload de videos a S3/Cloudinary con barra de progreso
  - O ingreso de URL de YouTube/Vimeo
  - Metadata: título, descripción, nivel, tema, duración
  - Lista de videos filtrable por nivel y tema (estudiante)
  - Reproductor integrado (video.js o react-player)
  - Tracking de reproducción (registrar si vio >90%)
- ✅ Dashboard de Progreso del Estudiante:
  - Vista de temario completo con % de avance por unidad
  - Indicadores visuales de completado
  - Desglose por actividad: clases asistidas, tareas, exámenes, videos
  - Gráfica de calificaciones promedio

**Deliverable Sprint 6:**
Sistema completo de exámenes funcionando. Estudiantes pueden tomar exámenes de 4 habilidades, grabar audio. Profesores califican. Videos disponibles por nivel. Progreso visible.

---

#### **Sprint 7-8: Real-time Chat & Polish (Weeks 13-16)**

**Included:**

- ✅ Chat en Tiempo Real con Socket.io:
  - Backend con Socket.io server
  - Frontend con Socket.io client
  - Conexión WebSocket al hacer login
  - Eventos: send_message, receive_message, mark_as_read
  - Lista de conversaciones (estilo WhatsApp)
  - Vista de mensajes con scroll infinito
  - Indicador de mensajes no leídos (badge)
  - Notificación in-app cuando llega mensaje
  - Buscar usuario para iniciar conversación
  - Permisos: estudiantes solo pueden hablar con profesores, profesores con estudiantes de sus cursos
- ✅ Sistema de Notificaciones In-App:
  - Model de Notification
  - Campana con badge de contador
  - Panel de notificaciones con lista
  - Marcar como leída
  - Tipos: assignment_graded, exam_graded, new_message, class_reminder, welcome
- ✅ Refinamiento de UI/UX:
  - Componentes consistentes con design system (colores oficiales)
  - Loading states en todas las acciones asíncronas
  - Validación de formularios con feedback visual
  - Mensajes de error y éxito consistentes (toasts con react-hot-toast)
  - Responsive design revisado en mobile/tablet
- ✅ Performance Optimization:
  - Lazy loading de rutas con React.lazy
  - Optimización de imágenes (webp, thumbnails)
  - Caché de queries con react-query
  - Code splitting
- ✅ Testing QA:
  - Testing manual de todos los flujos críticos
  - Fix de bugs encontrados
  - Testing de permisos y seguridad

**Deliverable Sprint 8:**
Chat funcionando en tiempo real. Notificaciones in-app. UI pulida y responsive. Performance optimizada. Sistema listo para testing con usuarios reales.

---

#### **Sprint 9: Deployment & Launch (Week 17-18)**

**Included:**

- ✅ Preparación de Producción:
  - Setup de MongoDB Atlas en producción
  - Deploy de backend a Railway/Render con variables de entorno
  - Deploy de frontend a Vercel con variables de entorno
  - Configuración de S3/Cloudinary para producción
  - Setup de Resend con dominio personalizado (emails desde noreply@letstalq.com)
  - Configuración de CORS para dominio de producción
  - SSL/HTTPS configurado
- ✅ Seeding de Datos Iniciales:
  - Usuario admin maestro: patricio@ac95.ca
  - Cursos de ejemplo por nivel
  - Syllabus básico por nivel
  - Videos de ejemplo (si disponibles)
- ✅ Onboarding de Escuela Piloto:
  - Crear cuentas de profesores de la escuela
  - Enviar emails de bienvenida con credenciales
  - Capacitación básica (documento o video)
  - Importar estudiantes iniciales (o guiarlos a registrarse)
- ✅ Monitoreo:
  - Setup de Sentry para error tracking
  - Setup de analytics básico
  - Logs configurados
- ✅ Documentación:
  - README con instrucciones de instalación
  - Guía de uso básica para profesores
  - Guía de uso básica para estudiantes

**Deliverable Sprint 9:**
Sistema en producción, escuela piloto usando la plataforma. 🚀

---

### Excluded (Post-MVP)

**⏸️ Phase 2 (Meses 4-6):**

- Desbloqueo progresivo de contenido según asistencia a clases
- Sistema de insignias y gamificación (puntos, leaderboards)
- Notificaciones push y por email automáticas (más allá de transaccionales)
- Reportes avanzados para administradores (gráficas, exportación)
- Integración con Google Calendar
- Foro de discusión por curso
- Biblioteca de recursos descargables (PDFs organizados)

**🚀 Phase 3 - IA (Meses 7+):**

- Chatbot tutor 24/7 integrado con OpenAI/Anthropic
- Práctica de conversación con IA (speech-to-text + IA + text-to-speech)
- Corrección automática de pronunciación con IA
- Recomendaciones personalizadas basadas en errores con machine learning
- Sistema de repetición espaciada automatizado
- Generación automática de ejercicios con IA
- Subtítulos automáticos en videos

---

### Definition of Done (MVP Completo)

El MVP está **100% completo** cuando:

**Funcionalidad Técnica:**

1. ✅ Sistema de autenticación completo: registro, login (2 portales), OAuth, confirmación email, recuperación contraseña
2. ✅ Admin puede crear profesores/admins desde panel
3. ✅ Profesor puede crear curso con syllabus, clases, tareas, exámenes
4. ✅ Estudiante puede registrarse, seleccionar nivel, auto-asignarse a cursos
5. ✅ Estudiante puede ver clases, entregar tareas, tomar exámenes de 4 habilidades (incluyendo grabar audio)
6. ✅ Profesor puede calificar tareas y exámenes (incluyendo escuchar audios de Speaking)
7. ✅ Admin/Profesor puede subir videos, estudiante puede verlos y se trackea progreso
8. ✅ Estudiante ve dashboard de progreso completo vs temario
9. ✅ Chat en tiempo real funciona entre estudiantes-profesores
10. ✅ Notificaciones in-app funcionan

**Validación con Escuela Piloto:** 11. ✅ 1 escuela piloto onboarded con al menos: - 2 profesores activos - 1 administrador - 30+ estudiantes registrados y confirmados 12. ✅ Al menos 2 cursos activos (diferentes niveles) 13. ✅ Profesores han creado y calificado al menos 3 tareas por curso 14. ✅ Profesores han creado al menos 1 examen completo por curso 15. ✅ Al menos 10 videos subidos y vistos por estudiantes 16. ✅ Estudiantes pueden ver su progreso reflejado correctamente 17. ✅ Al menos 20 conversaciones activas en el chat

**Calidad y Performance:** 18. ✅ Cero bugs críticos (que impidan usar funcionalidad core) 19. ✅ Tiempo de carga < 2 segundos en desktop 20. ✅ Responsive y usable en mobile (aunque no sea app nativa) 21. ✅ Accesibilidad WCAG 2.1 AA mínimo en páginas principales 22. ✅ Sistema deployado en producción con dominio letstalq.com o letstalq.ai

**Feedback Positivo:** 23. ✅ NPS > 30 de profesores piloto (encuesta post 4 semanas de uso) 24. ✅ 70%+ de estudiantes piloto completan al menos 1 tarea a tiempo

---

## 8. Risks & Assumptions

### Assumptions

- [ ] Escuelas tienen infraestructura tecnológica básica (internet estable, dispositivos con navegador moderno)
- [ ] Profesores están dispuestos a adoptar nueva tecnología y cambiar workflows existentes
- [ ] Estudiantes tienen acceso a dispositivos con micrófono para grabación de audio (Speaking exams)
- [ ] Contenido de video ya existe o la escuela lo producirá externamente (no es responsabilidad de la plataforma crear contenido)
- [ ] Modelo de negocio será SaaS B2B (venta a escuelas), no freemium B2C
- [ ] Escuela piloto proporcionará feedback honesto y constructivo durante desarrollo
- [ ] Estudiantes preferirán usar la plataforma integrada vs herramientas separadas actuales

### Risks

| Risk                                                                  | Impact    | Probability | Mitigation                                                                                                                                                                                                                                     |
| --------------------------------------------------------------------- | --------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Resistencia al cambio por profesores**                              | 🔴 High   | 🟡 Medium   | Onboarding personalizado paso a paso, capacitación en vivo, UI super intuitiva, soporte dedicado las primeras semanas, demostrar ROI (tiempo ahorrado)                                                                                         |
| **Problemas de performance con videos pesados**                       | 🟡 Medium | 🟡 Medium   | Implementar streaming adaptativo (HLS), compresión automática de videos al upload, CDN con Cloudflare, lazy loading, límite de 500MB por video                                                                                                 |
| **Complejidad técnica del sistema de exámenes (especialmente audio)** | 🟡 Medium | 🟢 Low      | Comenzar con versión simplificada en Sprint 5, iterar basado en testing temprano, usar librerías probadas (MediaRecorder API con polyfills), tener plan B de upload de archivo si grabación falla                                              |
| **Dependencia crítica de servicios externos (S3, Resend, OAuth)**     | 🟡 Medium | 🟢 Low      | Tener proveedores alternativos identificados (Cloudinary vs S3, SendGrid vs Resend), abstraer servicios en capa con interfaces, implementar graceful degradation (si OAuth falla, aún funciona con email/password)                             |
| **Bugs críticos en producción durante lanzamiento**                   | 🔴 High   | 🟡 Medium   | Testing QA exhaustivo en Sprint 8, soft launch con escuela piloto pequeña antes de marketing masivo, monitoreo con Sentry desde día 1, tener plan de rollback, soporte técnico disponible 24/7 primera semana                                  |
| **Adopción lenta sin funciones de IA**                                | 🟢 Low    | 🟡 Medium   | Posicionar IA como "coming soon" en roadmap público, asegurar que MVP resuelve pain points críticos actuales (fragmentación), competir en integración no en IA, agregar IA en Phase 3 como diferenciador                                       |
| **Problemas de escalabilidad con múltiples escuelas simultáneas**     | 🟡 Medium | 🟢 Low      | Arquitectura stateless desde día 1, usar MongoDB Atlas con auto-scaling, preparar backend para horizontal scaling, load testing antes de lanzar a segunda escuela                                                                              |
| **Violaciones de seguridad o leaks de datos**                         | 🔴 High   | 🟢 Low      | Implementar todas las mejores prácticas de seguridad (JWT, bcrypt, HTTPS, CORS, validación), auditoría de seguridad antes de producción, términos de servicio y política de privacidad claros, cumplir con regulaciones de protección de datos |
| **Falta de contenido de video de calidad**                            | 🟡 Medium | 🟡 Medium   | Trabajar con escuela piloto para crear contenido básico, proveer guías de mejores prácticas para grabación, tener biblioteca mínima de 10 videos de ejemplo por nivel, asociarse con creadores de contenido educativo si es necesario          |

### Risk Response Plan

**Si ocurre resistencia de profesores:**

- Semana 1: Reuniones 1-on-1 con cada profesor para entender concerns específicos
- Semana 2: Implementar mejoras de UX basadas en feedback
- Semana 3: Crear video tutoriales cortos (< 3 min) para cada función
- Semana 4: Ofrecer "horas de oficina" diarias para soporte en vivo

**Si hay problemas técnicos críticos en producción:**

- Activar plan de comunicación: email a todos los usuarios explicando el issue
- Deploy de hotfix en < 4 horas para bugs críticos
- Rollback a versión anterior estable si hotfix no es viable
- Post-mortem document después de resolver, compartir learnings con equipo

---

## 9. Release Plan

### Timeline Overview (18 semanas total)

```
Semanas 1-4:   Sprint 1-2  → Foundation & Auth
Semanas 5-8:   Sprint 3-4  → Core Features (Courses, Classes, Assignments)
Semanas 9-12:  Sprint 5-6  → Exams & Videos
Semanas 13-16: Sprint 7-8  → Chat & Polish
Semanas 17-18: Sprint 9    → Deployment & Launch
```

### Detailed Sprint Plan

#### **Phase 1: Foundation (Weeks 1-4)**

**Sprint 1 (Week 1-2):**

- Setup de repositorio (monorepo con Turborepo o Nx opcional)
- Configuración de ESLint, Prettier, Husky
- Setup de MongoDB Atlas + Mongoose
- Backend base con Express + folder structure
- Frontend base con React + Vite + TailwindCSS
- Implementar User model con todos los campos (OAuth, email verification, password reset)
- Rutas de autenticación básica (register, login)
- Landing page básica con logo y colores
- Deploy de staging environment (Vercel + Railway)

**Sprint 2 (Week 3-4):**

- Implementar OAuth 2.0 (Google + Facebook) con Passport.js
- Sistema de confirmación de email (generar token, enviar con Resend, validar)
- Sistema de recuperación de contraseña (solicitar, enviar email, reset)
- Middleware de autenticación (verify JWT)
- Middleware de autorización (check roles)
- Dos páginas de login separadas (/login para estudiantes, /admin-login para profesores/admins)
- Registro de estudiantes con selector de nivel de inglés
- Dashboards vacíos para 3 roles con mensaje de bienvenida
- Testing end-to-end del flujo de autenticación completo

**Milestone 1:** Usuario puede registrarse, confirmar email, hacer login y acceder a dashboard ✅

---

#### **Phase 2: Core Features (Weeks 5-8)**

**Sprint 3 (Week 5-6):**

- Admin panel básico UI
- Crear usuarios profesor/admin (form + validación)
- Envío de email de bienvenida con Resend (credenciales temporales)
- Seed del usuario maestro: patricio@ac95.ca
- Course model con syllabus structure
- CRUD de cursos (crear, editar, ver, archivar)
- Auto-asignación de estudiantes a cursos según nivel al registrarse
- Class model con attendance tracking
- CRUD de clases presenciales
- Vista de calendario mensual (profesor)
- Vista de próximas clases (estudiante)
- Interfaz de registro de asistencia (pasar lista)

**Sprint 4 (Week 7-8):**

- Assignment model con submissions
- Crear tarea con editor de texto rico (TinyMCE o react-quill)
- Upload de archivos a S3/Cloudinary con progress bar
- Estudiante ve lista de tareas (filtros: pendiente, entregada, calificada)
- Interfaz de entrega de tarea (texto + archivos)
- Profesor ve lista de entregas con estados
- Interfaz de calificación (nota + comentarios)
- Sistema de notificaciones in-app básico (modelo + badge en navbar)
- Actualizar dashboards con datos reales de cursos, clases, tareas
- Progress model básico (calcular automáticamente al entregar tarea, asistir a clase)

**Milestone 2:** Profesor puede crear curso completo, programar clases, crear tareas. Estudiantes entregan y reciben calificaciones ✅

---

#### **Phase 3: Exams & Content (Weeks 9-12)**

**Sprint 5 (Week 9-10):**

- Exam model completo con 4 secciones
- UI para crear examen (wizard de múltiples pasos)
- Implementar sección Listening:
  - Upload de audio a S3
  - Crear preguntas de opción múltiple
  - Reproductor de audio en interfaz de examen
  - Autocorrección al enviar
- Implementar sección Reading:
  - Editor de texto para reading passage
  - Crear preguntas de opción múltiple
  - Autocorrección al enviar
- Implementar sección Writing:
  - Prompt abierto
  - Text area para respuesta del estudiante
  - Interfaz de calificación manual para profesor
- Estudiante puede ver exámenes disponibles en dashboard
- Interfaz de toma de examen (navegación entre secciones, guardar progreso)

**Sprint 6 (Week 11-12):**

- Implementar sección Speaking:
  - Interfaz de grabación de audio con MediaRecorder API
  - Controles: grabar, pausar, detener, reproducir preview
  - Upload de audio a S3
  - Reproductor de audio en interfaz de calificación
  - Interfaz de calificación manual para profesor
- Cálculo de calificación final ponderada (autocorregido + manual)
- Profesor ve lista de exámenes pendientes de calificación
- Video model
- Upload de videos a S3/Cloudinary (con progress bar) o URL externa
- Metadata form (título, descripción, nivel, tema, duración)
- Lista de videos filtrable por nivel y tema (estudiante)
- Reproductor integrado (react-player o video.js)
- Tracking de visualización (event listeners para trackear % visto)
- Dashboard de progreso completo:
  - Vista de syllabus con % de avance
  - Indicadores visuales por unidad
  - Desglose por tipo de actividad
  - Gráfica de calificaciones

**Milestone 3:** Sistema de exámenes completo funcionando (4 habilidades + grabación de audio). Videos disponibles. Progreso visible ✅

---

#### **Phase 4: Real-time & Polish (Weeks 13-16)**

**Sprint 7 (Week 13-14):**

- Message model
- Backend Socket.io server setup
- Frontend Socket.io client setup
- Eventos de WebSocket (connect, send_message, receive_message, mark_as_read, typing, user_online)
- Lista de conversaciones (UI estilo WhatsApp)
- Vista de mensajes con scroll infinito (load more al hacer scroll up)
- Indicador de mensajes no leídos (badge en navbar + en lista de conversaciones)
- Notificación in-app cuando llega mensaje nuevo
- Buscar usuario para iniciar conversación (filtrado por permisos)
- Lógica de permisos: estudiantes solo hablan con profesores, profesores con estudiantes de sus cursos, admins con todos
- Testing de chat en múltiples navegadores y tabs

**Sprint 8 (Week 15-16):**

- Notification model + API endpoints
- Sistema de notificaciones in-app completo:
  - Crear notificación al calificar tarea/examen
  - Crear notificación al recibir mensaje
  - Welcome notification al confirmar email
  - Panel de notificaciones con lista (campana → dropdown)
  - Marcar como leída (individual y "marcar todo como leído")
  - Badge con contador
- Refinamiento de UI/UX en todas las páginas:
  - Design system consistente (botones, cards, forms, tables)
  - Loading states (skeletons, spinners)
  - Validación de formularios con feedback en tiempo real (react-hook-form + zod)
  - Mensajes de error y éxito (react-hot-toast)
  - Empty states cuando no hay datos
  - Animaciones sutiles (framer-motion opcional)
- Performance optimization:
  - Code splitting con React.lazy
  - Lazy loading de imágenes
  - react-query para caché y refetch
  - Optimización de bundle size (analyze con vite-bundle-visualizer)
- Responsive design review (mobile-first)
- Accessibility audit (usar Lighthouse, axe DevTools)
- Testing QA manual exhaustivo:
  - Testing de todos los flujos de usuario
  - Testing de permisos (verificar que estudiante no puede acceder a rutas de profesor, etc.)
  - Testing de edge cases (qué pasa si se pierde conexión, si token expira, etc.)
  - Cross-browser testing (Chrome, Firefox, Safari, Edge)
  - Mobile testing (Chrome DevTools + dispositivos reales)
- Bug fixing de issues encontrados en QA

**Milestone 4:** Chat en tiempo real funcional. Notificaciones completas. UI pulida y responsive. Sistema MVP feature-complete ✅

---

#### **Phase 5: Deployment & Launch (Weeks 17-18)**

**Sprint 9 (Week 17-18):**

**Day 1-3: Production Environment Setup**

- MongoDB Atlas: cluster de producción (tier M10+), configurar IP whitelist, crear database user
- Backend deploy a Railway/Render:
  - Crear proyecto
  - Conectar repo GitHub
  - Configurar variables de entorno (copiar desde .env.example)
  - Configurar dominio custom (api.letstalq.com)
  - Enable auto-deploy desde main branch
- Frontend deploy a Vercel:
  - Conectar repo GitHub
  - Configurar variables de entorno
  - Configurar dominio custom (letstalq.com o letstalq.ai)
  - Enable auto-deploy desde main branch
- S3/Cloudinary:
  - Crear bucket de producción con permisos correctos
  - Configurar CDN (CloudFront o Cloudinary CDN)
  - Configurar CORS
- Resend:
  - Verificar dominio custom (para enviar desde noreply@letstalq.com)
  - Configurar SPF, DKIM, DMARC records en DNS
  - Crear templates de email (bienvenida, confirmación, recuperación)
- SSL/HTTPS:
  - Configurar certificado (Let's Encrypt automático en Vercel/Railway)
  - Forzar HTTPS redirect
- CORS:
  - Actualizar whitelist con dominio de producción

**Day 4-5: Data Seeding**

- Crear script de seeding (`npm run seed:prod`)
- Seed data:
  - Usuario admin maestro: patricio@ac95.ca (password temporal seguro)
  - 5 cursos básicos (1 por nivel de inglés)
  - Syllabus estándar por nivel (mínimo 6 unidades por curso)
  - 10 videos de ejemplo (2 por nivel) - si disponibles, si no, placeholders
- Ejecutar seeding en producción

**Day 6-8: Escuela Piloto Onboarding**

- Reunión kickoff con escuela piloto (demo del sistema)
- Crear cuentas de profesores:
  - Usar admin panel
  - Enviar emails de bienvenida con credenciales
  - Solicitar que cambien contraseña en primer login
- Capacitación de profesores:
  - Sesión en vivo de 1 hora (Zoom/Meet) cubriendo:
    - Cómo crear cursos
    - Cómo programar clases
    - Cómo crear tareas y exámenes
    - Cómo calificar
    - Cómo usar chat
  - Proveer documento PDF de guía rápida
  - Proveer videos tutoriales cortos (< 3 min cada uno)
- Importar/registrar estudiantes:
  - Proveer CSV template para importar estudiantes (si es necesario, crear endpoint de importación)
  - O enviar link de registro público a estudiantes
  - Asegurar que estudiantes confirmen sus emails
- Soporte dedicado durante primera semana (WhatsApp group o Slack)

**Day 9-10: Monitoring & Documentation**

- Setup de Sentry:
  - Instalar SDK en frontend y backend
  - Configurar source maps
  - Configurar alerts (email cuando hay error crítico)
  - Test que errores se capturan correctamente
- Setup de analytics:
  - Google Analytics o Plausible
  - Track eventos clave (registro, login, crear tarea, entregar tarea, tomar examen, enviar mensaje)
- Logs:
  - Configurar Winston en backend con niveles (error, warn, info)
  - Logs se guardan en archivo y en servicio externo (Papertrail o Loggly)
- Documentación:
  - README.md actualizado con:
    - Descripción del proyecto
    - Stack tecnológico
    - Cómo instalar localmente
    - Cómo contribuir (si aplica)
  - CONTRIBUTING.md (si es proyecto open source o team)
  - Guía de Usuario para Profesores (PDF o página de docs)
  - Guía de Usuario para Estudiantes (PDF o página de docs)
  - Guía de Admin (cómo crear usuarios, cursos, subir contenido)

**Day 11-14: Soft Launch & Monitoring**

- Anunciar lanzamiento a escuela piloto (email + mensaje en grupo)
- Monitorear métricas diariamente:
  - Errores en Sentry
  - Performance (Lighthouse scores)
  - Usuarios activos (analytics)
  - Feedback de usuarios (WhatsApp group, email)
- Bug fixing urgente si se encuentran issues críticos
- Daily standups con escuela piloto (primeros 3 días)
- Recolectar feedback cualitativo (qué les gusta, qué mejorar)

**Milestone 5:** Sistema en producción, escuela piloto usando activamente, 0 bugs críticos, NPS > 30 🚀

---

## 10. Success Tracking

### Sprint Milestones (Checkpoints)

- **Sprint 1-2 (Week 4):** ✅ Autenticación completa funcional, usuario puede registrarse y hacer login
- **Sprint 3-4 (Week 8):** ✅ Profesores pueden gestionar cursos y tareas, estudiantes pueden entregarlas
- **Sprint 5-6 (Week 12):** ✅ Exámenes de 4 habilidades completos, videos disponibles, progreso visible
- **Sprint 7-8 (Week 16):** ✅ Chat en tiempo real, notificaciones, UI pulida, MVP feature-complete
- **Sprint 9 (Week 18):** ✅ Sistema en producción, escuela piloto onboarded y usando 🎉

### Post-Launch Metrics (Primeros 3 meses)

#### **Métricas Semanales (Track cada lunes)**

**Engagement:**

- DAU (Daily Active Users) / WAU (Weekly Active Users)
- Tasa de retención semanal: % de usuarios que regresan semana tras semana
- Tareas entregadas vs tareas asignadas (completion rate)
- Exámenes completados vs exámenes disponibles
- Videos vistos por semana (total y promedio por estudiante)
- Mensajes enviados por chat por semana

**Performance:**

- Tiempo de carga promedio (desde Google Analytics)
- Errores capturados en Sentry (total y por severidad)
- Uptime (% de tiempo que el sistema estuvo disponible)

**Feedback:**

- Tickets de soporte recibidos (clasificar por tipo)
- Bugs reportados por usuarios
- Feature requests recibidos

#### **Métricas Mensuales (Track cada 1ro del mes)**

**Crecimiento:**

- Nuevos registros de estudiantes
- Total de estudiantes activos (al menos 1 login en el mes)
- Total de profesores activos
- Total de cursos creados

**Engagement Profundo:**

- Tasa de retención mensual (cohort analysis)
- Promedio de tareas entregadas por estudiante por mes
- Promedio de exámenes completados por estudiante por mes
- % de estudiantes que vieron al menos 1 video
- % de estudiantes que usaron el chat al menos 1 vez

**Calidad:**

- NPS (Net Promoter Score) de profesores (encuesta mensual)
- NPS de estudiantes (encuesta mensual)
- Satisfacción con plataforma (escala 1-5 en encuesta)
- Top 3 features más usadas
- Top 3 pain points mencionados

**Negocio (si aplica):**

- Escuelas interesadas (leads en pipeline)
- Demos agendados
- Conversión de demos a clientes

#### **Métricas Trimestrales (Cada 3 meses)**

**Impacto Educativo:**

- Promedio de calificaciones de estudiantes (comparar con trimestre anterior)
- Tasa de asistencia a clases (comparar con sistema anterior si hay datos)
- % de estudiantes que completan cursos (graduation rate)
- Tiempo promedio de respuesta de profesores a tareas (comparar con sistema anterior)

**Validación de Producto:**

- ¿Se alcanzó el objetivo de 50+ estudiantes activos en escuela piloto? (Sí/No)
- ¿70%+ de estudiantes completan tareas a tiempo? (Sí/No)
- ¿NPS > 40? (Sí/No)
- ¿Escuela piloto quiere continuar usando la plataforma? (Sí/No)
- ¿Escuela piloto recomendaría TALQ a otras escuelas? (Sí/No)

**Validación Técnica:**

- ¿Arquitectura soporta 500 usuarios concurrentes sin degradación? (load testing)
- ¿Está el sistema listo para escalar a segunda escuela? (Sí/No)
- ¿Código está bien documentado y mantenible? (code review)

**Roadmap:**

- Feedback consolidado de features más solicitadas
- Decisión de priorización para Phase 2 (gamificación, notificaciones avanzadas, reportes)
- Decisión de cuándo empezar Phase 3 (IA) basado en tracción y feedback

### Key Performance Indicators (KPIs) - Dashboard Ejecutivo

**North Star Metric:** WAU (Weekly Active Users) - Estudiantes activos semanalmente

**Supporting Metrics:**

- **Engagement:** Completion rate de tareas (target: 70%+)
- **Quality:** NPS de profesores (target: 40+)
- **Satisfaction:** NPS de estudiantes (target: 40+)
- **Growth:** Nuevos registros semanales (target: 10+ en escuela piloto)
- **Retention:** % de estudiantes que regresan semanalmente (target: 60%+)

### Alertas y Gatillos de Acción

**🔴 Red Flags (Requieren acción inmediata):**

- NPS < 20 (producto no cumple expectativas)
- Tasa de retención semanal < 40% (usuarios no encuentran valor)
- Completion rate de tareas < 50% (problema de UX o motivación)
- Uptime < 95% (problemas técnicos serios)
- > 10 bugs críticos reportados en una semana (calidad del código)

**🟡 Yellow Flags (Requieren monitoreo cercano):**

- NPS 20-40 (hay espacio de mejora)
- Tasa de retención semanal 40-60% (engagement moderado)
- Completion rate de tareas 50-70% (cerca del target pero mejorable)
- Tiempo de carga > 3 segundos (performance mejorable)
- 5-10 bugs menores por semana (revisar QA process)

**🟢 Green Flags (Todo bien, seguir monitoreando):**

- NPS > 40 (usuarios muy satisfechos)
- Tasa de retención semanal > 60% (engagement alto)
- Completion rate de tareas > 70% (cumpliendo objetivo)
- Tiempo de carga < 2 segundos (performance óptimo)
- < 5 bugs por semana (calidad de código buena)

---

## Quick Reference

### Este PRD alimenta:

**→ Product Backlog:** Todas las User Stories priorizadas en Must Have, Should Have, Could Have  
**→ Sprint Planning:** Cada 2 semanas, seleccionamos stories del backlog para el siguiente sprint  
**→ Daily Standups:** Referencia rápida de Acceptance Criteria para verificar Definition of Done  
**→ Sprint Retrospectives:** Analizar si se cumplieron los milestones y ajustar el plan

### Stakeholders Clave:

- **Patricio** - Product Owner & Solo Developer
- **Escuela Piloto** - Early Adopters y Validadores del MVP
- **Profesores** - Usuarios principales que crean contenido y evalúan
- **Estudiantes** - Usuarios finales que consumen contenido y completan actividades
- **Administradores de Escuela** - Usuarios que gestionan la operación

### Frecuencia de Revisión:

- **Daily:** Progreso de desarrollo (self-standups)
- **Bi-weekly:** Sprint Planning + Sprint Review + Sprint Retrospective
- **Monthly:** Revisión de métricas de éxito y feedback de usuarios
- **Quarterly:** Revisión completa del PRD, ajuste de roadmap y prioridades

### Contacto del Proyecto:

- **Producto:** TALQ - Language Learning Platform
- **Dominio:** letstalq.com / letstalq.ai
- **Email:** patricio@ac95.ca
- **Repositorio:** [GitHub URL - agregar cuando esté creado]

---

## Appendix

### Design System - Paleta de Colores

**Colores Primarios:**

```css
--color-primary-orange: #f5a623; /* Logo, CTAs, hover states */
--color-primary-dark: #4a4a4a; /* Texto principal, títulos */
--color-white: #ffffff; /* Fondos, texto en botones oscuros */
```

**Colores Secundarios:**

```css
--color-secondary-blue: #1e3a8a; /* Links, botones secundarios */
--color-success: #10b981; /* Estados de éxito, progreso completado */
--color-warning: #fcd34d; /* Notificaciones, recordatorios */
--color-error: #ef4444; /* Errores, fechas límite vencidas */
```

**Colores de Fondo:**

```css
--color-bg-light: #f3f4f6; /* Fondo de página */
--color-bg-gray: #e5e7eb; /* Cards, secciones */
--color-border: #d1d5db; /* Bordes sutiles */
```

**Tipografía:**

```css
--font-primary: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
--font-size-xs: 0.75rem; /* 12px */
--font-size-sm: 0.875rem; /* 14px */
--font-size-base: 1rem; /* 16px */
--font-size-lg: 1.125rem; /* 18px */
--font-size-xl: 1.25rem; /* 20px */
--font-size-2xl: 1.5rem; /* 24px */
--font-size-3xl: 1.875rem; /* 30px */
```

### API Endpoints Reference (Para desarrollo)

**Authentication:**

- `POST /api/auth/register` - Registro de estudiante
- `POST /api/auth/login` - Login estudiante
- `POST /api/auth/admin-login` - Login profesor/admin
- `POST /api/auth/logout` - Cerrar sesión
- `POST /api/auth/confirm-email/:token` - Confirmar email
- `POST /api/auth/forgot-password` - Solicitar recuperación
- `POST /api/auth/reset-password/:token` - Resetear contraseña
- `GET /api/auth/me` - Obtener usuario actual

**Users (Admin only):**

- `POST /api/users/create-teacher` - Crear profesor/admin
- `GET /api/users` - Listar usuarios (con filtros)
- `GET /api/users/:id` - Ver usuario específico
- `PUT /api/users/:id` - Actualizar usuario
- `DELETE /api/users/:id` - Desactivar usuario

**Courses:**

- `POST /api/courses` - Crear curso (Teacher/Admin)
- `GET /api/courses` - Listar cursos (filtrar por nivel, teacher, etc.)
- `GET /api/courses/:id` - Ver curso específico
- `PUT /api/courses/:id` - Actualizar curso
- `DELETE /api/courses/:id` - Archivar curso

**Classes:**

- `POST /api/classes` - Crear clase (Teacher)
- `GET /api/classes` - Listar clases (filtrar por curso, fecha)
- `GET /api/classes/:id` - Ver clase específica
- `PUT /api/classes/:id/attendance` - Registrar asistencia
- `DELETE /api/classes/:id` - Eliminar clase

**Assignments:**

- `POST /api/assignments` - Crear tarea (Teacher)
- `GET /api/assignments` - Listar tareas (por curso, estado)
- `GET /api/assignments/:id` - Ver tarea específica
- `POST /api/assignments/:id/submit` - Entregar tarea (Student)
- `PUT /api/assignments/:id/grade` - Calificar tarea (Teacher)

**Exams:**

- `POST /api/exams` - Crear examen (Teacher)
- `GET /api/exams` - Listar exámenes (por curso)
- `GET /api/exams/:id` - Ver examen específico
- `POST /api/exams/:id/attempt` - Iniciar intento (Student)
- `PUT /api/exams/:id/attempt/:attemptId` - Guardar progreso
- `POST /api/exams/:id/submit` - Enviar examen completo (Student)
- `PUT /api/exams/:id/attempt/:attemptId/grade` - Calificar (Teacher)

**Videos:**

- `POST /api/videos` - Subir video (Admin/Teacher)
- `GET /api/videos` - Listar videos (filtrar por nivel, tema)
- `GET /api/videos/:id` - Ver video específico
- `POST /api/videos/:id/view` - Registrar visualización (Student)

**Messages (WebSocket + REST):**

- `GET /api/messages/conversations` - Listar conversaciones
- `GET /api/messages/:conversationId` - Ver mensajes de conversación
- `POST /api/messages` - Enviar mensaje (también vía WebSocket)
- `PUT /api/messages/:id/read` - Marcar como leído

**Notifications:**

- `GET /api/notifications` - Listar notificaciones del usuario
- `PUT /api/notifications/:id/read` - Marcar como leída
- `PUT /api/notifications/read-all` - Marcar todas como leídas

**Progress:**

- `GET /api/progress/:studentId/:courseId` - Ver progreso de estudiante en curso

### Tech Stack Details (Versiones específicas para package.json)

**Frontend:**

```json
{
  "react": "^18.3.0",
  "react-dom": "^18.3.0",
  "react-router-dom": "^6.22.0",
  "vite": "^5.1.0",
  "tailwindcss": "^3.4.0",
  "@tanstack/react-query": "^5.28.0",
  "zustand": "^4.5.0",
  "socket.io-client": "^4.6.0",
  "react-hook-form": "^7.51.0",
  "zod": "^3.22.0",
  "react-hot-toast": "^2.4.1",
  "react-quill": "^2.0.0",
  "react-player": "^2.15.0",
  "axios": "^1.6.0"
}
```

**Backend:**

```json
{
  "express": "^4.18.0",
  "mongoose": "^8.2.0",
  "jsonwebtoken": "^9.0.2",
  "bcryptjs": "^2.4.3",
  "passport": "^0.7.0",
  "passport-google-oauth20": "^2.0.0",
  "passport-facebook": "^3.0.0",
  "socket.io": "^4.6.0",
  "resend": "^3.2.0",
  "multer": "^1.4.5-lts.1",
  "@aws-sdk/client-s3": "^3.525.0",
  "joi": "^17.12.0",
  "cors": "^2.8.5",
  "helmet": "^7.1.0",
  "express-rate-limit": "^7.2.0",
  "winston": "^3.11.0"
}
```

---

**Status:** 🟡 Planning → 🔵 Ready to Start Development

**Next Action:** Aprobar PRD → Crear repositorio → Sprint 1 Kickoff 🚀

---

_Documento creado: Diciembre 10, 2025_  
_Última actualización: Diciembre 10, 2025_  
_Versión: 1.0 - MVP Definition_
