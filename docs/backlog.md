# Product Backlog - TALQ

**Producto:** TALQ - Plataforma de Aprendizaje de Idiomas  
**Versión:** 2.0 (Acorn Template Edition)  
**Última Actualización:** Diciembre 10, 2025  
**Owner:** Patricio  
**Duración de Sprint:** 2 semanas  
**Base Template:** Acorn React E-learning Portal

---

## Resumen del Backlog

**Total de Items:** 32 User Stories  
**Must Have:** 18 stories (70 tallas → ~10-12 semanas = 5-6 sprints con Acorn)  
**Should Have:** 8 stories (24 tallas → ~4 semanas = 2 sprints)  
**Could Have:** 6 stories (estimación pendiente, fuera del MVP)  
**Sprints Estimados para MVP:** 7-8 sprints (14-16 semanas) ⬇️ Reducido por uso de Acorn Template

### 🚀 Ventaja del Template Acorn

El uso del template Acorn E-learning Portal reduce significativamente el tiempo de desarrollo:

| Componente    | Sin Template | Con Acorn    | Ahorro |
| ------------- | ------------ | ------------ | ------ |
| Auth Pages    | ~3 días      | ~1 día       | 66%    |
| Dashboards    | ~5 días      | ~2 días      | 60%    |
| UI Components | ~4 días      | Ya incluidos | 100%   |
| Course Pages  | ~4 días      | ~1.5 días    | 62%    |

**Ahorro estimado total: ~15-20 días de desarrollo**

---

## Vista General de Épicas

### 🔐 Épica 1: Autenticación y Gestión de Usuarios

**Stories:** 8  
**Total Estimado:** 24 tallas (M+M+S+M+S+L+S+S)  
**Prioridad:** Must Have  
**Descripción:** Sistema completo de autenticación con dos portales (estudiantes y profesores/admins), OAuth social, confirmación de email, recuperación de contraseña y creación de usuarios por admin.

---

### 📊 Épica 2: Dashboards y Navegación

**Stories:** 3  
**Total Estimado:** 10 tallas (M+M+M)  
**Prioridad:** Must Have  
**Descripción:** Dashboards personalizados para estudiantes, profesores y administradores con información relevante por rol.

---

### 📚 Épica 3: Gestión de Cursos y Clases

**Stories:** 2  
**Total Estimado:** 9 tallas (L+M)  
**Prioridad:** Must Have  
**Descripción:** CRUD de cursos con syllabus, programación de clases presenciales y registro de asistencia.

---

### ✍️ Épica 4: Tareas y Evaluaciones

**Stories:** 3  
**Total Estimado:** 17 tallas (L+XL+M)  
**Prioridad:** Must Have  
**Descripción:** Sistema de tareas con entregas y calificación, exámenes de 4 habilidades con grabación de audio, y calificación de exámenes.

---

### 🎥 Épica 5: Contenido Multimedia

**Stories:** 1  
**Total Estimado:** 5 tallas (M)  
**Prioridad:** Must Have  
**Descripción:** Repositorio de videocápsulas organizadas por nivel con tracking de visualización.

---

### 📈 Épica 6: Seguimiento de Progreso

**Stories:** 1  
**Total Estimado:** 5 tallas (M)  
**Prioridad:** Must Have  
**Descripción:** Dashboard de progreso del estudiante contra temario con estadísticas detalladas.

---

### 💬 Épica 7: Comunicación en Tiempo Real

**Stories:** 2  
**Total Estimado:** 11 tallas (L+M)  
**Prioridad:** Must Have  
**Descripción:** Chat interno con WebSocket y sistema de notificaciones in-app.

---

### 🎮 Épica 8: Gamificación (Post-MVP)

**Stories:** 3  
**Total Estimado:** 9 tallas (M+S+M)  
**Prioridad:** Should Have  
**Descripción:** Sistema de insignias, desbloqueo progresivo de contenido y tabla de logros.

---

### 🤖 Épica 9: Funcionalidades con IA (Futuro)

**Stories:** 6  
**Total Estimado:** TBD  
**Prioridad:** Could Have  
**Descripción:** Chatbot tutor, práctica conversacional con IA, corrección de pronunciación y recomendaciones personalizadas.

---

## Backlog Priorizado

### 🔴 MUST HAVE (MVP Crítico)

---

#### US-001: Landing Page con Opciones de Acceso

**ID:** US-001  
**Épica:** Autenticación y Gestión de Usuarios  
**Story:** Como visitante, quiero acceder a una landing page clara que me explique qué es TALQ y pueda elegir mi tipo de usuario para registrarme o iniciar sesión fácilmente.

**Criterios de Aceptación:**

- [ ] Landing page muestra valor de la plataforma y slogan "Let's Talq"
- [ ] Dos botones visibles: "Soy Estudiante" (→ /login) y "Soy Profesor/Admin" (→ /admin-login)
- [ ] Diseño responsive con logo TALQ (colores: #F5A623, #4A4A4A)
- [ ] Footer con información de contacto
- [ ] Tiempo de carga < 2 segundos

**Notas Técnicas:**

- Stack: Frontend (React + Bootstrap/Sass) - Basado en Acorn Template
- Template Base: Acorn E-learning Portal Landing
- Dependencias: Ninguna (primera página a desarrollar)
- Factores de Complejidad: Adaptar colores TALQ (#E16449, #FFBF40, #181B21, #868686) al template

**Estimación:** M (Medio)  
**Prioridad:** MUST HAVE  
**Status:** 📋 Backlog  
**Sprint Sugerido:** Sprint 1

---

#### US-002: Registro de Estudiantes con Selección de Nivel

**ID:** US-002  
**Épica:** Autenticación y Gestión de Usuarios  
**Story:** Como estudiante nuevo, quiero registrarme con mi email o redes sociales, seleccionar mi nivel de inglés y confirmar mi cuenta para acceder a la plataforma.

**Criterios de Aceptación:**

- [ ] Formulario de registro con: nombre completo, email, contraseña, confirmar contraseña
- [ ] Selector de nivel: Beginner (A1), Elementary (A2), Intermediate (B1), Upper-Intermediate (B2), Advanced (C1)
- [ ] Validación en tiempo real (email válido, contraseña min 8 caracteres con mayúscula/minúscula/número/especial)
- [ ] Botones "Continuar con Google" y "Continuar con Facebook" funcionales
- [ ] Al registrarse, sistema envía email de confirmación con Resend
- [ ] Usuario no puede acceder hasta confirmar email (muestra mensaje "Revisa tu email")
- [ ] Sistema automáticamente asigna estudiante a cursos según nivel seleccionado

**Notas Técnicas:**

- Stack: Frontend (Formik + Yup) + Backend (Express TypeScript + Passport.js) + Resend
- Template Base: Acorn Authentication Pages (Login/Register ya incluidos)
- Dependencias: US-001 (Landing debe existir), US-003 (confirmación email)
- Factores de Complejidad: Integración OAuth con 2 providers, lógica de auto-asignación a cursos

**Estimación:** M (Medio)  
**Prioridad:** MUST HAVE  
**Status:** 📋 Backlog  
**Sprint Sugerido:** Sprint 1-2

---

#### US-003: Confirmación de Email Obligatoria

**ID:** US-003  
**Épica:** Autenticación y Gestión de Usuarios  
**Story:** Como estudiante registrado, quiero recibir un email de confirmación y activar mi cuenta para poder iniciar sesión.

**Criterios de Aceptación:**

- [ ] Al registrarse, generar token único de confirmación (expira en 24 horas)
- [ ] Enviar email con Resend usando template HTML profesional
- [ ] Email contiene link: /confirm-email/:token
- [ ] Link redirige a página de confirmación
- [ ] Al confirmar: marcar isEmailConfirmed=true, auto-login, redirect a dashboard
- [ ] Si token inválido/expirado: mostrar error y opción "Reenviar email"
- [ ] Funcionalidad "Reenviar email de confirmación" en página de login

**Notas Técnicas:**

- Stack: Backend (Express TypeScript + Resend + JWT para token)
- Dependencias: US-002 (genera el email de confirmación)
- Factores de Complejidad: Manejo de tokens con expiración, templates de email, casos edge (token ya usado, expirado)

**Estimación:** S (Simple)  
**Prioridad:** MUST HAVE  
**Status:** 📋 Backlog  
**Sprint Sugerido:** Sprint 2

---

#### US-004: Login de Estudiantes (Portal Separado)

**ID:** US-004  
**Épica:** Autenticación y Gestión de Usuarios  
**Story:** Como estudiante existente, quiero iniciar sesión en mi portal para acceder a mi dashboard.

**Criterios de Aceptación:**

- [ ] Página /login con formulario: email, contraseña
- [ ] Opción "Recordarme" con checkbox
- [ ] Link "¿Olvidaste tu contraseña?" funcional
- [ ] Botones de login social: Google y Facebook
- [ ] Si email no confirmado: mostrar mensaje y opción "Reenviar email"
- [ ] Al autenticar correctamente: generar JWT (access + refresh), redirect a /student/dashboard
- [ ] Mensajes de error claros: "Email o contraseña incorrectos", "Cuenta no confirmada"
- [ ] Rate limiting: 5 intentos / 15 minutos

**Notas Técnicas:**

- Stack: Frontend (React + Redux Toolkit) + Backend (JWT + Passport.js)
- Template Base: Acorn Login Page (ya incluido, solo adaptar)
- Dependencias: US-002, US-003 (registro y confirmación deben existir)
- Factores de Complejidad: OAuth integrado, rate limiting, manejo de refresh tokens

**Estimación:** M (Medio)  
**Prioridad:** MUST HAVE  
**Status:** 📋 Backlog  
**Sprint Sugerido:** Sprint 2

---

#### US-005: Recuperación de Contraseña

**ID:** US-005  
**Épica:** Autenticación y Gestión de Usuarios  
**Story:** Como usuario, quiero recuperar mi contraseña si la olvidé usando mi email.

**Criterios de Aceptación:**

- [ ] Página /forgot-password accesible desde ambos logins
- [ ] Formulario solicita: email
- [ ] Sistema envía email con link de recuperación usando Resend (válido 1 hora)
- [ ] Link redirige a /reset-password?token=XXX
- [ ] Página de reset muestra formulario: nueva contraseña, confirmar contraseña
- [ ] Validación de contraseña (mismos requisitos que registro)
- [ ] Al completar: actualizar password (hasheado), invalidar token, mostrar mensaje "Contraseña actualizada"
- [ ] Tokens expirados muestran mensaje claro con opción de solicitar nuevo link

**Notas Técnicas:**

- Stack: Backend (Express + Resend + bcrypt) + Frontend (React)
- Dependencias: US-003 (usa mismo sistema de tokens con expiración)
- Factores de Complejidad: Seguridad (tokens únicos, expiración, no reutilizables)

**Estimación:** S (Simple)  
**Prioridad:** MUST HAVE  
**Status:** 📋 Backlog  
**Sprint Sugerido:** Sprint 2

---

#### US-006: Login de Profesores/Admins (Portal Separado)

**ID:** US-006  
**Épica:** Autenticación y Gestión de Usuarios  
**Story:** Como profesor o administrador, quiero iniciar sesión en mi portal administrativo para acceder a mis funciones.

**Criterios de Aceptación:**

- [ ] Página /admin-login separada del login de estudiantes
- [ ] Formulario con: email, contraseña
- [ ] Link "¿Olvidaste tu contraseña?" funcional
- [ ] Al autenticar correctamente, redirección según rol:
  - Profesor → /teacher/dashboard
  - Admin → /admin/dashboard
- [ ] Mensajes de error claros
- [ ] NO hay registro público (solo login)
- [ ] Rate limiting: 5 intentos / 15 minutos

**Notas Técnicas:**

- Stack: Frontend (React) + Backend (JWT)
- Dependencias: US-007 (admin debe poder crear estos usuarios primero)
- Factores de Complejidad: Detección de rol y redirect dinámico

**Estimación:** S (Simple)  
**Prioridad:** MUST HAVE  
**Status:** 📋 Backlog  
**Sprint Sugerido:** Sprint 2

---

#### US-007: Admin Crea Profesores y Administradores

**ID:** US-007  
**Épica:** Autenticación y Gestión de Usuarios  
**Story:** Como administrador, quiero crear cuentas de profesores y administradores desde un panel para gestionar el equipo de la escuela.

**Criterios de Aceptación:**

- [ ] Sección en /admin/users/create con formulario:
  - Nombre completo
  - Email
  - Rol (Profesor / Administrador)
  - Contraseña temporal (auto-generada o manual)
- [ ] Sistema envía email de bienvenida con credenciales usando Resend
- [ ] Email incluye link directo a /admin-login
- [ ] Email solicita cambiar contraseña en primer acceso
- [ ] Lista de profesores/admins creados visible en /admin/users
- [ ] Usuario inicial maestro existe en sistema: patricio@ac95.ca (rol: Administrador)
- [ ] Seed script para crear usuario maestro al desplegar

**Notas Técnicas:**

- Stack: Backend (Express + Mongoose) + Frontend (React)
- Dependencias: US-006 (login de admin debe existir para usar esta función)
- Factores de Complejidad: Seed de usuario maestro, generación de contraseñas seguras, templates de email

**Estimación:** L (Grande)  
**Prioridad:** MUST HAVE  
**Status:** 📋 Backlog  
**Sprint Sugerido:** Sprint 3

---

#### US-008: Dashboard Personalizado de Estudiante

**ID:** US-008  
**Épica:** Dashboards y Navegación  
**Story:** Como estudiante autenticado, quiero ver mi dashboard personalizado con mis clases, tareas y progreso para acceder rápidamente a todo lo que necesito.

**Criterios de Aceptación:**

- [ ] Primera vez: mensaje "¡Bienvenido a TALQ, [Nombre]! Aquí encontrarás todo lo que necesitas"
- [ ] Dashboard muestra:
  - Próximas clases (fecha, hora, tema, profesor) - máximo 3
  - Tareas pendientes con contador y fechas límite - máximo 5
  - Gráfica de progreso general (% completado del nivel)
  - Cards de acceso rápido: Mis Clases, Mis Tareas, Mis Exámenes, Videocápsulas, Mi Progreso
- [ ] Sidebar/navbar con navegación: Dashboard, Clases, Tareas, Exámenes, Videos, Progreso, Chat, Mi Perfil
- [ ] Indicador visual de nivel de inglés (badge)
- [ ] Notificaciones in-app en esquina superior (campana con contador)
- [ ] Responsive design

**Notas Técnicas:**

- Stack: Frontend (React + TailwindCSS) + Backend (API endpoints para datos)
- Dependencias: US-004 (login debe redirigir aquí)
- Factores de Complejidad: Agregación de datos de múltiples fuentes, cálculo de progreso en tiempo real

**Estimación:** M (Medio)  
**Prioridad:** MUST HAVE  
**Status:** 📋 Backlog  
**Sprint Sugerido:** Sprint 2

---

#### US-009: Dashboard Personalizado de Profesor

**ID:** US-009  
**Épica:** Dashboards y Navegación  
**Story:** Como profesor autenticado, quiero ver mi dashboard con mis cursos y tareas por calificar para gestionar eficientemente mi trabajo.

**Criterios de Aceptación:**

- [ ] Primera vez: mensaje "¡Bienvenido a TALQ, [Nombre]! Comienza creando tu primer curso"
- [ ] Dashboard muestra:
  - Mis cursos activos (cards con nombre, nivel, cantidad de estudiantes)
  - Tareas por calificar con contador urgente (rojo si > 5 días sin calificar)
  - Próximas clases que dará (fecha, hora, grupo)
  - Cards de acceso rápido: Mis Cursos, Crear Tarea, Crear Examen, Calificaciones, Subir Video
- [ ] Sidebar con navegación: Dashboard, Cursos, Tareas, Exámenes, Calificaciones, Contenido, Chat, Mi Perfil
- [ ] Botón destacado "Crear Nuevo Curso" si no tiene cursos
- [ ] Responsive design

**Notas Técnicas:**

- Stack: Frontend (React) + Backend (agregación de datos)
- Dependencias: US-006 (login de profesor)
- Factores de Complejidad: Lógica de "urgencia" en tareas pendientes, contadores en tiempo real

**Estimación:** M (Medio)  
**Prioridad:** MUST HAVE  
**Status:** 📋 Backlog  
**Sprint Sugerido:** Sprint 3

---

#### US-010: Dashboard Personalizado de Administrador

**ID:** US-010  
**Épica:** Dashboards y Navegación  
**Story:** Como administrador autenticado, quiero ver el dashboard con resumen de toda la plataforma para tener visibilidad completa.

**Criterios de Aceptación:**

- [ ] Primera vez (patricio@ac95.ca): mensaje "¡Bienvenido Patricio! Comienza creando profesores"
- [ ] Dashboard muestra:
  - Estadísticas generales: total estudiantes, profesores, cursos activos
  - Gráfica de distribución de estudiantes por nivel
  - Actividad reciente (últimos registros, clases creadas)
  - Cards de acceso rápido: Gestión de Usuarios, Cursos, Contenido, Reportes, Configuración
- [ ] Sidebar con navegación: Dashboard, Usuarios, Cursos, Contenido, Reportes, Configuración
- [ ] Botón destacado "Crear Profesor" en esquina superior
- [ ] Responsive design

**Notas Técnicas:**

- Stack: Frontend (React) + Backend (agregaciones complejas)
- Dependencias: US-006 (login de admin)
- Factores de Complejidad: Agregaciones de datos de toda la plataforma, gráficas dinámicas

**Estimación:** M (Medio)  
**Prioridad:** MUST HAVE  
**Status:** 📋 Backlog  
**Sprint Sugerido:** Sprint 3

---

#### US-011: Gestión de Cursos con Syllabus

**ID:** US-011  
**Épica:** Gestión de Cursos y Clases  
**Story:** Como profesor o administrador, quiero crear y gestionar cursos con su syllabus para organizar el contenido educativo.

**Criterios de Aceptación:**

- [ ] CRUD completo de cursos
- [ ] Crear curso con formulario:
  - Nombre (ej: "English Intermediate B1 - Group A")
  - Descripción
  - Nivel (Beginner, Elementary, Intermediate, Upper-Intermediate, Advanced)
  - Fecha inicio y fin
  - Horario (ej: "Lunes y Miércoles 18:00-20:30")
  - Ubicación/sala
- [ ] Constructor de syllabus con estructura:
  - Unidades (ej: "Unit 1: Greetings")
  - Temas por unidad (ej: "Formal vs Informal greetings")
  - Descripción y horas estimadas por tema
- [ ] Lista de estudiantes asignados al curso (auto-asignados por nivel)
- [ ] Opción de archivar curso (no eliminar)
- [ ] Vista de detalle del curso con toda la información

**Notas Técnicas:**

- Stack: Frontend (React) + Backend (Mongoose con subdocumentos para syllabus)
- Dependencias: US-009 o US-010 (dashboard de profesor/admin debe existir)
- Factores de Complejidad: Constructor de syllabus dinámico, manejo de array de subdocumentos

**Estimación:** L (Grande)  
**Prioridad:** MUST HAVE  
**Status:** 📋 Backlog  
**Sprint Sugerido:** Sprint 3-4

---

#### US-012: Crear Clases Presenciales y Registrar Asistencia

**ID:** US-012  
**Épica:** Gestión de Cursos y Clases  
**Story:** Como profesor, quiero crear y gestionar clases presenciales para que los estudiantes vean su horario y poder registrar asistencia.

**Criterios de Aceptación:**

- [ ] Crear clase con formulario:
  - Curso (selector de mis cursos)
  - Fecha (date picker)
  - Hora inicio y fin
  - Tema del temario (selector del syllabus del curso)
  - Ubicación/sala
- [ ] Vista de calendario mensual con todas mis clases (estilo Google Calendar)
- [ ] Estudiantes ven en dashboard "Próximas Clases" con todos los detalles
- [ ] Al día de la clase, botón "Pasar Lista"
- [ ] Interfaz de asistencia muestra lista de estudiantes del curso
- [ ] Marcar asistencia: Presente (✓), Ausente (✗), Tarde (⚠)
- [ ] Guardar asistencia y reflejar en registro del estudiante
- [ ] Historial de clases pasadas con asistencias registradas

**Notas Técnicas:**

- Stack: Frontend (React con componente de calendario) + Backend (Mongoose)
- Dependencias: US-011 (cursos deben existir primero)
- Factores de Complejidad: Componente de calendario interactivo, lógica de asistencia con 3 estados

**Estimación:** M (Medio)  
**Prioridad:** MUST HAVE  
**Status:** 📋 Backlog  
**Sprint Sugerido:** Sprint 4

---

#### US-013: Sistema de Tareas (Crear, Entregar, Calificar)

**ID:** US-013  
**Épica:** Tareas y Evaluaciones  
**Story:** Como profesor, quiero crear tareas con instrucciones claras, recibir entregas de estudiantes y calificarlas para evaluar su aprendizaje.

**Criterios de Aceptación:**

- [ ] **CREAR TAREA (Profesor):**
  - Formulario: curso, título (max 100), descripción (editor WYSIWYG), fecha límite, puntos máximos
  - Adjuntar archivos de referencia (PDFs, imágenes, docs hasta 10MB)
  - Tarea visible para todos los estudiantes del curso
- [ ] **ENTREGAR TAREA (Estudiante):**
  - Ver detalles de tarea (título, descripción, archivos, fecha límite)
  - Escribir respuesta en text area + adjuntar archivos (hasta 10MB total)
  - Estados: No Entregada, Entregada (pendiente), Calificada, Tarde (si pasó fecha límite)
  - Confirmación al enviar
- [ ] **CALIFICAR (Profesor):**
  - Ver lista de todas las entregas con estados
  - Abrir cada entrega: leer texto, descargar archivos
  - Ingresar nota (0 a puntos máximos) y comentarios de retroalimentación
  - Guardar calificación
  - Estudiante recibe notificación in-app
- [ ] Estudiante ve calificación y comentarios en sección "Mis Tareas"

**Notas Técnicas:**

- Stack: Frontend (React Quill para editor) + Backend (Multer + S3/Cloudinary para archivos)
- Dependencias: US-011 (cursos deben existir)
- Factores de Complejidad: Upload de archivos, editor WYSIWYG, lógica de estados, notificaciones

**Estimación:** L (Grande)  
**Prioridad:** MUST HAVE  
**Status:** 📋 Backlog  
**Sprint Sugerido:** Sprint 4

---

#### US-014: Sistema de Exámenes de 4 Habilidades

**ID:** US-014  
**Épica:** Tareas y Evaluaciones  
**Story:** Como profesor, quiero crear exámenes que evalúen las 4 habilidades (Listening, Reading, Writing, Speaking) para medir el nivel real del estudiante.

**Criterios de Aceptación:**

- [ ] **CREAR EXAMEN (Profesor):**
  - Formulario básico: curso, título, fecha disponible, fecha límite, duración (opcional)
  - Agregar secciones al examen:
    - **Listening:** subir audio (MP3, WAV), crear preguntas de opción múltiple (4 opciones), asignar puntos
    - **Reading:** ingresar texto para lectura, crear preguntas de opción múltiple, asignar puntos
    - **Writing:** ingresar prompt abierto, asignar puntos máximos, definir rúbrica
    - **Speaking:** ingresar prompt para responder, asignar puntos máximos, definir rúbrica
  - Sistema calcula automáticamente puntos totales posibles
- [ ] **TOMAR EXAMEN (Estudiante):**
  - Ver examen disponible en dashboard con fecha límite
  - Interfaz muestra cronómetro (opcional)
  - Navegación entre secciones (tabs)
  - **Listening:** reproducir audio, responder preguntas multiple choice
  - **Reading:** leer texto, responder preguntas multiple choice
  - **Writing:** escribir respuesta en text area (sin límite de caracteres)
  - **Speaking:** grabar audio usando MediaRecorder API (max 3 min), preview antes de enviar
  - Opción "Guardar y continuar después" (solo 1 intento por examen)
  - Al enviar examen: secciones Listening/Reading autocorregidas inmediatamente
  - Secciones Writing/Speaking: "Pendiente de calificación"
- [ ] **CALIFICAR (Profesor):**
  - Ver lista de exámenes completados pendientes de calificación
  - Interfaz de calificación muestra:
    - Secciones autocorregidas (ya con puntos)
    - Respuesta Writing del estudiante
    - Reproductor de audio Speaking con grabación del estudiante
  - Ingresar puntos y comentarios para Writing y Speaking
  - Calcular calificación final ponderada: (Listening + Reading + Writing + Speaking) / total × 100
  - Estudiante recibe notificación de calificación final

**Notas Técnicas:**

- Stack: Frontend (React + MediaRecorder API) + Backend (S3 para audios)
- Dependencias: US-011 (cursos), US-013 (similar lógica de calificación)
- Factores de Complejidad: MediaRecorder API (grabación de audio en navegador), upload de audios a S3, autocorrección de multiple choice, cálculo de calificación ponderada

**Estimación:** XL (Muy Grande)  
**Prioridad:** MUST HAVE  
**Status:** 📋 Backlog  
**Sprint Sugerido:** Sprint 5-6

---

#### US-015: Calificación de Exámenes (Writing y Speaking)

**ID:** US-015  
**Épica:** Tareas y Evaluaciones  
**Story:** Como profesor, quiero calificar las secciones Writing y Speaking de los exámenes para completar la evaluación del estudiante.

**Criterios de Aceptación:**

- [ ] Ver lista de exámenes pendientes de calificación manual
- [ ] Interfaz de calificación muestra:
  - Información del estudiante y examen
  - Secciones Listening/Reading ya autocorregidas (mostrar puntos obtenidos)
  - Respuesta Writing del estudiante (texto completo)
  - Audio Speaking del estudiante (reproductor integrado, controles play/pause/velocidad)
- [ ] Para cada sección manual:
  - Ingresar puntos (0 a máximo definido)
  - Escribir comentarios/retroalimentación
  - Referencia a rúbrica definida
- [ ] Calcular y mostrar calificación final automáticamente
- [ ] Guardar y notificar estudiante
- [ ] Estudiante ve calificación completa con desglose por sección y comentarios

**Notas Técnicas:**

- Stack: Frontend (React Player para audio) + Backend
- Dependencias: US-014 (exámenes deben existir y estar completos)
- Factores de Complejidad: Reproductor de audio robusto, cálculos de calificación en tiempo real

**Estimación:** M (Medio)  
**Prioridad:** MUST HAVE  
**Status:** 📋 Backlog  
**Sprint Sugerido:** Sprint 6

---

#### US-016: Repositorio de Videocápsulas

**ID:** US-016  
**Épica:** Contenido Multimedia  
**Story:** Como administrador o profesor, quiero subir videocápsulas pregrabadas organizadas por tema del temario para complementar las clases.

**Criterios de Aceptación:**

- [ ] Sección /admin/content/videos o /teacher/content/videos
- [ ] Formulario de upload:
  - Título (max 100)
  - Descripción
  - Nivel (Beginner, Elementary, Intermediate, Upper-Intermediate, Advanced)
  - Tema del temario (selector según nivel)
  - Subir archivo de video (MP4, MOV - max 500MB) O ingresar URL de YouTube/Vimeo
- [ ] Si es upload directo: video se sube a S3/Cloudinary con barra de progreso
- [ ] Video queda disponible para estudiantes del nivel correspondiente
- [ ] Estudiantes ven lista de videos en /student/videos filtrable por tema
- [ ] Reproductor de video integrado (react-player)
- [ ] Sistema registra si estudiante vio video completo (>90% reproducido)
- [ ] En dashboard aparece "Videos nuevos" si hay contenido sin ver

**Notas Técnicas:**

- Stack: Frontend (React Player) + Backend (Multer + S3/Cloudinary)
- Dependencias: US-011 (syllabus debe existir para asociar videos a temas)
- Factores de Complejidad: Upload de archivos grandes (500MB), barra de progreso, tracking de reproducción

**Estimación:** M (Medio)  
**Prioridad:** MUST HAVE  
**Status:** 📋 Backlog  
**Sprint Sugerido:** Sprint 6

---

#### US-017: Dashboard de Progreso del Estudiante

**ID:** US-017  
**Épica:** Seguimiento de Progreso  
**Story:** Como estudiante, quiero ver mi progreso visual contra el temario oficial para saber qué he completado y qué me falta.

**Criterios de Aceptación:**

- [ ] Página /student/progress con vista completa
- [ ] Estructura visual: Unidades → Temas → Actividades
- [ ] Indicadores de progreso por unidad:
  - ✅ Completado (verde)
  - 🟡 En progreso (amarillo)
  - ⚪ Pendiente (gris)
- [ ] Barra de progreso grande: % de avance general
- [ ] Desglose por tipo de actividad:
  - Clases asistidas / Total de clases
  - Tareas entregadas / Total de tareas
  - Exámenes completados / Total de exámenes
  - Videos vistos / Total de videos
- [ ] Gráfica de calificaciones promedio por tipo de actividad (line chart o bar chart)
- [ ] Timeline de actividades completadas con fechas

**Notas Técnicas:**

- Stack: Frontend (React + Chart.js o Recharts) + Backend (cálculos de progreso)
- Dependencias: US-011 (syllabus), US-012 (clases), US-013 (tareas), US-014 (exámenes), US-016 (videos)
- Factores de Complejidad: Agregación de datos de múltiples colecciones, cálculos en tiempo real, visualizaciones gráficas

**Estimación:** M (Medio)  
**Prioridad:** MUST HAVE  
**Status:** 📋 Backlog  
**Sprint Sugerido:** Sprint 6

---

#### US-018: Chat Interno en Tiempo Real

**ID:** US-018  
**Épica:** Comunicación en Tiempo Real  
**Story:** Como estudiante o profesor, quiero enviar mensajes internos a otros usuarios para resolver dudas sin salir de la plataforma.

**Criterios de Aceptación:**

- [ ] Sección /chat accesible desde navegación principal
- [ ] Lista de conversaciones en sidebar (estilo WhatsApp):
  - Avatar del usuario
  - Nombre
  - Último mensaje (preview)
  - Fecha/hora del último mensaje
  - Badge con número de mensajes no leídos
- [ ] Al hacer clic en conversación: área de mensajes muestra historial completo
- [ ] Mensajes muestran: texto, hora enviada, estado (enviado ✓, leído ✓✓)
- [ ] Input para escribir mensaje en tiempo real con WebSocket (Socket.io)
- [ ] Eventos: send_message, receive_message, typing, mark_as_read
- [ ] Notificación in-app cuando llega mensaje nuevo (campana + badge)
- [ ] Buscar usuario para iniciar nueva conversación
- [ ] Permisos:
  - Estudiantes solo pueden enviar mensajes a profesores
  - Profesores pueden enviar mensajes a estudiantes de sus cursos
  - Admins pueden enviar mensajes a cualquier usuario
- [ ] Scroll infinito para cargar mensajes antiguos

**Notas Técnicas:**

- Stack: Frontend (React + Socket.io Client) + Backend (Socket.io Server + Express)
- Dependencias: Ninguna (independiente)
- Factores de Complejidad: WebSocket connection management, eventos en tiempo real, permisos complejos, scroll infinito

**Estimación:** L (Grande)  
**Prioridad:** MUST HAVE  
**Status:** 📋 Backlog  
**Sprint Sugerido:** Sprint 7

---

#### US-019: Sistema de Notificaciones In-App

**ID:** US-019  
**Épica:** Comunicación en Tiempo Real  
**Story:** Como usuario, quiero recibir notificaciones in-app cuando ocurren eventos importantes para estar al tanto de mi actividad.

**Criterios de Aceptación:**

- [ ] Campana en navbar con badge de contador de notificaciones no leídas
- [ ] Al hacer clic en campana: dropdown con lista de notificaciones (últimas 10)
- [ ] Cada notificación muestra:
  - Icono según tipo
  - Título y mensaje
  - Tiempo relativo (ej: "hace 5 minutos")
  - Link para ir al recurso relacionado
- [ ] Tipos de notificaciones:
  - assignment_graded: "Tu tarea '[título]' ha sido calificada"
  - exam_graded: "Tu examen '[título]' ha sido calificado"
  - new_message: "Nuevo mensaje de [usuario]"
  - class_reminder: "Clase '[tema]' en 1 hora"
  - welcome: "¡Bienvenido a TALQ!"
- [ ] Marcar como leída al hacer clic
- [ ] Botón "Marcar todas como leídas"
- [ ] Página /notifications con historial completo (paginado)
- [ ] Notificaciones se crean automáticamente cuando:
  - Profesor califica tarea/examen
  - Usuario recibe mensaje
  - Usuario confirma email (welcome)

**Notas Técnicas:**

- Stack: Frontend (React) + Backend (Mongoose + Socket.io para real-time)
- Dependencias: US-013 (tareas), US-014 (exámenes), US-018 (chat)
- Factores de Complejidad: Lógica de creación automática en diferentes endpoints, tiempo real con Socket.io

**Estimación:** M (Medio)  
**Prioridad:** MUST HAVE  
**Status:** 📋 Backlog  
**Sprint Sugerido:** Sprint 7-8

---

### 🟡 SHOULD HAVE (Post-MVP Prioritario)

---

#### US-020: Sistema de Insignias por Logros

**ID:** US-020  
**Épica:** Gamificación  
**Story:** Como estudiante, quiero ganar insignias por mis logros para sentirme motivado y ver mi progreso de forma visual.

**Criterios de Aceptación:**

- [ ] Definir insignias disponibles:
  - "Primera Clase": asistir a primera clase
  - "Puntual": entregar 5 tareas a tiempo consecutivas
  - "Perfeccionista": obtener 100% en un examen
  - "Conversador": enviar 50 mensajes en chat
  - "Cinéfilo": ver 10 videos completos
  - "Racha 7": asistir a clases 7 días seguidos sin faltar
- [ ] Sistema automático otorga insignias cuando se cumple condición
- [ ] Notificación in-app al ganar insignia
- [ ] Página /student/achievements muestra todas las insignias (ganadas y por ganar)
- [ ] Insignias se muestran en perfil de estudiante
- [ ] Dashboard muestra última insignia ganada

**Notas Técnicas:**

- Stack: Backend (lógica de condiciones) + Frontend (UI de insignias)
- Dependencias: US-017 (progreso debe estar funcionando)
- Factores de Complejidad: Lógica de detección de condiciones en diferentes eventos

**Estimación:** M (Medio)  
**Prioridad:** SHOULD HAVE  
**Status:** 📋 Backlog  
**Sprint Sugerido:** Post-MVP Sprint 1

---

#### US-021: Desbloqueo Progresivo de Contenido

**ID:** US-021  
**Épica:** Gamificación  
**Story:** Como profesor, quiero que los videos se desbloqueen según el avance del estudiante en clases presenciales para mantener el ritmo de aprendizaje.

**Criterios de Aceptación:**

- [ ] Configuración en curso: habilitar "Desbloqueo Progresivo"
- [ ] Videos están vinculados a temas específicos del syllabus
- [ ] Video se desbloquea cuando:
  - Estudiante asistió a la clase que cubre ese tema, O
  - Pasaron X días desde la clase (configurable por profesor)
- [ ] Videos bloqueados muestran candado 🔒 con mensaje "Se desbloqueará después de la clase"
- [ ] Dashboard de estudiante muestra próximos videos a desbloquearse
- [ ] Profesor puede forzar desbloqueo manual para estudiantes específicos

**Notas Técnicas:**

- Stack: Backend (lógica de desbloqueo) + Frontend (UI de candados)
- Dependencias: US-012 (clases), US-016 (videos), US-011 (syllabus)
- Factores de Complejidad: Lógica condicional compleja, configuración flexible por curso

**Estimación:** S (Simple)  
**Prioridad:** SHOULD HAVE  
**Status:** 📋 Backlog  
**Sprint Sugerido:** Post-MVP Sprint 1

---

#### US-022: Tabla de Logros (Leaderboard)

**ID:** US-022  
**Épica:** Gamificación  
**Story:** Como estudiante, quiero ver una tabla de logros opcional para compararme con mis compañeros de forma sana.

**Criterios de Aceptación:**

- [ ] Página /student/leaderboard (opcional, se puede desactivar por curso)
- [ ] Tabla muestra top 10 estudiantes del curso ordenados por:
  - Puntos totales (suma de insignias, tareas, exámenes)
  - Racha de asistencia actual
  - Promedio de calificaciones
- [ ] Cada estudiante ve su posición destacada
- [ ] Opción de hacer perfil privado (no aparecer en leaderboard)
- [ ] Actualización semanal (no en tiempo real para reducir competencia tóxica)
- [ ] Filtros: por curso, por nivel

**Notas Técnicas:**

- Stack: Backend (agregaciones complejas) + Frontend (tabla dinámica)
- Dependencias: US-020 (insignias), US-017 (progreso)
- Factores de Complejidad: Agregaciones de múltiples métricas, opciones de privacidad

**Estimación:** M (Medio)  
**Prioridad:** SHOULD HAVE  
**Status:** 📋 Backlog  
**Sprint Sugerido:** Post-MVP Sprint 2

---

#### US-023: Notificaciones por Email Automáticas

**ID:** US-023  
**Épica:** Comunicación  
**Story:** Como usuario, quiero recibir notificaciones por email de eventos importantes para estar informado incluso cuando no estoy en la plataforma.

**Criterios de Aceptación:**

- [ ] Configuración de notificaciones en /profile/settings
- [ ] Opciones (on/off por tipo):
  - Tarea calificada
  - Examen calificado
  - Nuevo mensaje
  - Recordatorio de clase (1 día antes, 1 hora antes)
  - Tarea por vencer (1 día antes)
  - Examen disponible
- [ ] Sistema envía emails usando Resend con templates HTML
- [ ] Emails incluyen link directo al recurso
- [ ] Botón "Darse de baja" en footer del email
- [ ] Rate limiting: máximo 10 emails al día por usuario

**Notas Técnicas:**

- Stack: Backend (queue con Bull/BullMQ + Resend)
- Dependencias: Ninguna (mejora sobre notificaciones in-app)
- Factores de Complejidad: Job queue para envíos masivos, templates HTML, configuración granular

**Estimación:** L (Grande)  
**Prioridad:** SHOULD HAVE  
**Status:** 📋 Backlog  
**Sprint Sugerido:** Post-MVP Sprint 2

---

#### US-024: Reportes Avanzados para Administradores

**ID:** US-024  
**Épica:** Análisis y Reportes  
**Story:** Como administrador, quiero ver reportes avanzados de desempeño para identificar tendencias y tomar decisiones.

**Criterios de Aceptación:**

- [ ] Página /admin/reports con dashboard de analytics
- [ ] Reportes disponibles:
  - **Estudiantes:** tasa de retención, progreso promedio por nivel, asistencia
  - **Profesores:** cursos gestionados, tareas calificadas (tiempo promedio), estudiantes activos
  - **Cursos:** tasa de completitud, calificaciones promedio, temas más difíciles
  - **Contenido:** videos más vistos, engagement rate
- [ ] Gráficas interactivas (line, bar, pie charts)
- [ ] Filtros: por fecha, por nivel, por curso, por profesor
- [ ] Exportar reportes a PDF o CSV
- [ ] Comparativa mes a mes, trimestre a trimestre

**Notas Técnicas:**

- Stack: Backend (agregaciones MongoDB complejas) + Frontend (Chart.js/Recharts)
- Dependencias: Todos los módulos (requiere datos de todo el sistema)
- Factores de Complejidad: Agregaciones muy complejas, performance con grandes volúmenes de datos

**Estimación:** XL (Muy Grande)  
**Prioridad:** SHOULD HAVE  
**Status:** 📋 Backlog  
**Sprint Sugerido:** Post-MVP Sprint 3

---

#### US-025: Integración con Google Calendar

**ID:** US-025  
**Épica:** Integraciones Externas  
**Story:** Como usuario, quiero sincronizar mis clases con Google Calendar para tener todo en un solo lugar.

**Criterios de Aceptación:**

- [ ] Configuración en /profile/settings: botón "Conectar Google Calendar"
- [ ] OAuth con Google Calendar API
- [ ] Sincronización automática:
  - Clases presenciales → eventos en Google Calendar
  - Fechas límite de tareas → eventos
  - Exámenes disponibles → eventos
- [ ] Eventos incluyen: título, descripción, ubicación, link a TALQ
- [ ] Sincronización bidireccional (opcional): cambios en Google Calendar se reflejan en TALQ
- [ ] Opción de desconectar calendario

**Notas Técnicas:**

- Stack: Backend (Google Calendar API) + Frontend (OAuth flow)
- Dependencias: US-012 (clases), US-013 (tareas), US-014 (exámenes)
- Factores de Complejidad: OAuth con Google, sincronización bidireccional, manejo de conflictos

**Estimación:** L (Grande)  
**Prioridad:** SHOULD HAVE  
**Status:** 📋 Backlog  
**Sprint Sugerido:** Post-MVP Sprint 3

---

#### US-026: Foro de Discusión por Curso

**ID:** US-026  
**Épica:** Comunicación  
**Story:** Como estudiante, quiero participar en un foro de discusión del curso para hacer preguntas que beneficien a todos.

**Criterios de Aceptación:**

- [ ] Sección /courses/:id/forum
- [ ] Crear nuevo tema (thread) con título y descripción
- [ ] Responder a temas existentes
- [ ] Votación de respuestas (upvote/downvote)
- [ ] Marcar respuesta como "Solución" (solo profesor o autor del tema)
- [ ] Filtros: todos los temas, sin resolver, resueltos, mis temas
- [ ] Notificaciones cuando alguien responde a tu tema
- [ ] Menciones con @ para notificar a usuarios específicos
- [ ] Formato de texto enriquecido (markdown)

**Notas Técnicas:**

- Stack: Frontend (React) + Backend (Mongoose con subdocumentos)
- Dependencias: US-011 (cursos)
- Factores de Complejidad: Sistema de votación, notificaciones, menciones, markdown parsing

**Estimación:** L (Grande)  
**Prioridad:** SHOULD HAVE  
**Status:** 📋 Backlog  
**Sprint Sugerido:** Post-MVP Sprint 4

---

#### US-027: Biblioteca de Recursos Descargables

**ID:** US-027  
**Épica:** Contenido Multimedia  
**Story:** Como profesor, quiero subir recursos descargables (PDFs, audios) organizados por tema para complementar el aprendizaje.

**Criterios de Aceptación:**

- [ ] Sección /teacher/content/resources
- [ ] Upload de archivos: PDFs, MP3, imágenes, documentos (max 50MB)
- [ ] Metadata: título, descripción, nivel, tema, tipo (lectura, ejercicio, audio práctica)
- [ ] Estudiantes ven biblioteca en /student/resources
- [ ] Filtros: por nivel, por tema, por tipo
- [ ] Botón de descarga
- [ ] Tracking de descargas (cuántas veces descargado)
- [ ] Preview de PDFs en navegador (opcional)

**Notas Técnicas:**

- Stack: Frontend (React) + Backend (S3/Cloudinary)
- Dependencias: US-011 (syllabus para temas)
- Factores de Complejidad: Upload de archivos, preview de PDFs, tracking

**Estimación:** M (Medio)  
**Prioridad:** SHOULD HAVE  
**Status:** 📋 Backlog  
**Sprint Sugerido:** Post-MVP Sprint 4

---

### 🟢 COULD HAVE (Futuro - Fase IA)

---

#### US-028: Chatbot Tutor 24/7 con IA

**ID:** US-028  
**Épica:** Funcionalidades con IA  
**Story:** Como estudiante, quiero poder hacer preguntas a un chatbot tutor inteligente 24/7 para resolver dudas fuera del horario de clases.

**Criterios de Aceptación:**

- [ ] Integración con OpenAI/Anthropic API
- [ ] Chatbot con contexto del temario del curso del estudiante
- [ ] Responde preguntas sobre gramática, vocabulario, ejercicios
- [ ] Historial de conversaciones guardado
- [ ] Botón de acceso rápido en navbar
- [ ] Límite de mensajes por día (según plan)

**Estimación:** XL  
**Prioridad:** COULD HAVE  
**Status:** 📋 Backlog (Fase IA)

---

#### US-029: Práctica de Conversación con IA

**ID:** US-029  
**Épica:** Funcionalidades con IA  
**Story:** Como estudiante, quiero practicar conversaciones en inglés con IA para mejorar mi speaking entre clases.

**Criterios de Aceptación:**

- [ ] Speech-to-text (capturar voz del estudiante)
- [ ] IA genera respuesta contextual en inglés
- [ ] Text-to-speech (IA "habla" la respuesta)
- [ ] Retroalimentación sobre pronunciación y gramática
- [ ] Diferentes escenarios: restaurant, airport, job interview, etc.

**Estimación:** XL  
**Prioridad:** COULD HAVE  
**Status:** 📋 Backlog (Fase IA)

---

#### US-030: Corrección Automática de Pronunciación

**ID:** US-030  
**Épica:** Funcionalidades con IA  
**Story:** Como estudiante, quiero recibir corrección automática de mi pronunciación para mejorar mi speaking sin depender del profesor.

**Criterios de Aceptación:**

- [ ] Grabar pronunciación de palabras/frases específicas
- [ ] IA analiza pronunciación y compara con nativo
- [ ] Retroalimentación específica: qué sonidos mejorar
- [ ] Score de pronunciación (0-100)
- [ ] Ejercicios de práctica personalizados

**Estimación:** L  
**Prioridad:** COULD HAVE  
**Status:** 📋 Backlog (Fase IA)

---

#### US-031: Recomendaciones Personalizadas con IA

**ID:** US-031  
**Épica:** Funcionalidades con IA  
**Story:** Como estudiante, quiero recibir recomendaciones personalizadas de qué repasar basadas en mis errores para optimizar mi aprendizaje.

**Criterios de Aceptación:**

- [ ] IA analiza errores en tareas y exámenes
- [ ] Identifica patrones (ej: problemas con present perfect)
- [ ] Recomienda videos específicos, ejercicios, temas del syllabus
- [ ] Dashboard "Qué estudiar hoy" personalizado
- [ ] Tracking de mejora en áreas identificadas

**Estimación:** L  
**Prioridad:** COULD HAVE  
**Status:** 📋 Backlog (Fase IA)

---

#### US-032: Sistema de Repetición Espaciada Automatizado

**ID:** US-032  
**Épica:** Funcionalidades con IA  
**Story:** Como estudiante, quiero que el sistema me recuerde repasar contenido en intervalos óptimos para maximizar retención.

**Criterios de Aceptación:**

- [ ] Algoritmo de repetición espaciada (estilo Anki)
- [ ] Track de qué conceptos necesitan repaso
- [ ] Notificaciones "Es hora de repasar: [tema]"
- [ ] Ejercicios de repaso generados automáticamente
- [ ] Ajuste de intervalos según desempeño

**Estimación:** L  
**Prioridad:** COULD HAVE  
**Status:** 📋 Backlog (Fase IA)

---

#### US-033: Generación Automática de Ejercicios con IA

**ID:** US-033  
**Épica:** Funcionalidades con IA  
**Story:** Como profesor, quiero que la IA genere ejercicios automáticamente basados en el temario para ahorrar tiempo.

**Criterios de Aceptación:**

- [ ] Seleccionar tema del syllabus
- [ ] IA genera ejercicios: fill in the blank, multiple choice, traducción, etc.
- [ ] Profesor puede revisar y editar antes de publicar
- [ ] Ejercicios se integran como tareas o práctica adicional
- [ ] Dificultad ajustable (básico, intermedio, avanzado)

**Estimación:** XL  
**Prioridad:** COULD HAVE  
**Status:** 📋 Backlog (Fase IA)

---

### ⚪ WON'T HAVE (Fuera del Scope Actual)

- **Videoconferencias integradas** - Razón: Clases son presenciales. Si se necesita online, usar Zoom/Meet
- **Pagos/facturación** - Razón: Gestión externa por ahora, integrar en futuro si se monetiza
- **App móvil nativa** - Razón: Web responsive es suficiente para MVP, app nativa requiere 2x desarrollo
- **Integraciones con LMS externos** (Moodle, Canvas) - Razón: No es prioritario, sistema es standalone
- **Multi-idioma en UI** - Razón: Solo español inicialmente, internacionalización después si se expande
- **Exportación de certificados PDF** - Razón: Feature de valor agregado, no crítico para MVP
- **Marketplace de cursos** - Razón: Fuera del modelo de negocio actual (B2B a escuelas)
- **Sistema de referidos** - Razón: Marketing feature, no core del producto educativo

---

## Deuda Técnica y Bugs

### Items de Deuda Técnica

**TD-001:** ~~Migrar de JavaScript a TypeScript en backend~~ ✅ RESUELTO  
**Prioridad:** N/A  
**Estimación:** N/A  
**Razón:** Backend ahora usa TypeScript desde el inicio (Architecture v1.2)

**TD-002:** Implementar caché con Redis para queries frecuentes  
**Prioridad:** Medium  
**Estimación:** M  
**Razón:** Mejorar performance cuando haya más carga, no crítico para MVP

**TD-003:** Refactorizar lógica de progreso a un servicio dedicado  
**Prioridad:** Low  
**Estimación:** S  
**Razón:** Código actualmente funcional pero puede mejorarse, hacer después del MVP

### Bugs Conocidos

(Se irán agregando durante desarrollo)

---

## Definition of Ready (DoR)

Una User Story está "Ready" para Sprint Planning cuando:

- [ ] Tiene descripción clara en formato estándar (Como X, quiero Y, para Z)
- [ ] Tiene criterios de aceptación específicos y testeables
- [ ] Tiene estimación de complejidad (talla de camiseta)
- [ ] Dependencias técnicas identificadas
- [ ] Dudas técnicas mayores resueltas
- [ ] Es lo suficientemente pequeña (completable en 1 sprint de 2 semanas)
- [ ] No hay bloqueos externos (APIs, servicios de terceros disponibles)

---

## Definition of Done (DoD)

Una User Story está "Done" cuando:

- [ ] Todos los criterios de aceptación cumplidos
- [ ] Código desarrollado y funcional
- [ ] Código sigue convenciones establecidas (PascalCase, camelCase, etc.)
- [ ] Testing manual realizado (smoke test de happy path)
- [ ] Sin bugs críticos (P0) ni bloqueantes
- [ ] Sin console.log ni debugger statements
- [ ] Responsive (funciona en desktop, tablet, mobile)
- [ ] Deployado en ambiente de desarrollo/staging
- [ ] Commits con conventional commits (feat:, fix:, etc.)
- [ ] Pull request revisado y aprobado (si hay equipo)
- [ ] Documentación básica actualizada (si aplica)
- [ ] Demo preparado para Sprint Review

---

## Refinamiento del Backlog

**Frecuencia:** Semanal (miércoles, mid-sprint)  
**Duración:** 1 hora  
**Próxima Revisión:** [Fecha después de Sprint 1]

**Actividades de Refinamiento:**

- Revisar y actualizar estimaciones basadas en velocity real
- Dividir stories grandes (XL) en stories más pequeñas
- Aclarar criterios de aceptación ambiguos
- Identificar dependencias técnicas nuevas
- Re-priorizar backlog según feedback de usuarios
- Agregar nuevas stories que surjan

**Items que necesitan refinamiento actualmente:**

- [ ] US-014 es XL, considerar dividir en US-014a (Crear examen) y US-014b (Tomar examen)
- [ ] US-024 es XL, requiere más definición de reportes específicos
- [ ] US-033 necesita más investigación sobre APIs de IA para generación de ejercicios

---

## Tracking de Velocity

| Sprint   | Stories Planificadas | Talla Total | Stories Completadas | Talla Completada | Velocity |
| -------- | -------------------- | ----------- | ------------------- | ---------------- | -------- |
| Sprint 1 | -                    | -           | -                   | -                | -        |
| Sprint 2 | -                    | -           | -                   | -                | -        |
| Sprint 3 | -                    | -           | -                   | -                | -        |
| Sprint 4 | -                    | -           | -                   | -                | -        |
| Sprint 5 | -                    | -           | -                   | -                | -        |
| Sprint 6 | -                    | -           | -                   | -                | -        |

**Velocity Promedio:** [Calcular después de Sprint 3]  
**Nota:** Velocity se estabiliza después de 3-4 sprints

**Conversión de tallas a Story Points (referencia):**

- XS = 1 punto
- S = 2 puntos
- M = 3 puntos
- L = 5 puntos
- XL = 8 puntos

---

## Acciones Rápidas

### Para Sprint Planning:

1. Filtrar backlog por "MUST HAVE" + Status "📋 Backlog"
2. Ordenar por:
   - Prioridad (críticas primero)
   - Dependencias técnicas (lo que desbloquea otras stories)
   - Sprint sugerido
3. Seleccionar stories según velocity (empezar conservador: 2-3 stories M por sprint)
4. Validar que no hay dependencias bloqueantes
5. Mover stories seleccionadas a "🏃 In Progress"

### Para agregar nueva story al backlog:

1. Escribir en formato estándar: Como [rol], quiero [acción] para [beneficio]
2. Definir criterios de aceptación específicos (checkbox list)
3. Identificar épica y dependencias
4. Estimar complejidad (XS/S/M/L/XL)
5. Priorizar con MoSCoW (Must/Should/Could/Won't)
6. Asignar a épica correspondiente
7. Agregar en sección correcta del backlog
8. Actualizar contador en Resumen del Backlog

### Para mover story de Sprint:

1. Cambiar Status: 📋 Backlog → 🏃 In Progress → ✅ Done
2. Actualizar tabla de Velocity al finalizar sprint
3. Si no se completó en el sprint: mover a siguiente sprint o back to backlog

---

## Notas de Priorización

**Principios usados para priorizar:**

1. **Dependencias técnicas primero** - No se puede calificar tareas si no hay tareas
2. **Funcionalidad core antes que nice-to-have** - Autenticación antes que gamificación
3. **Value vs Effort** - Priorizar alto valor / bajo esfuerzo
4. **Riesgo técnico** - Features complejas (exámenes con audio) van después de features simples para estabilizar primero
5. **Feedback de usuarios** - Post-MVP, el backlog se ajustará según feedback real

**Supuestos clave:**

- Patricio trabaja solo (capacidad limitada)
- Sprints de 2 semanas (10 días hábiles)
- Velocity inicial estimada conservadora: 2-3 stories M por sprint
- MVP debe estar listo en 18 semanas (9 sprints)
- Usuario maestro (patricio@ac95.ca) debe existir desde Sprint 1 para testing

---

## Próximos Pasos

1. ✅ Product Backlog creado y priorizado
2. → Sprint 0: Setup inicial del proyecto (repo, configuración, CI/CD)
3. → Sprint Planning 1: Seleccionar primeras stories (US-001, US-002, US-003)
4. → Daily Standups: Tracking diario de progreso
5. → Sprint Review 1: Demo de features completadas
6. → Sprint Retrospective 1: Identificar mejoras de proceso

---

**Última Actualización:** Diciembre 10, 2025  
**Próxima Revisión:** Después de Sprint 1  
**Mantenido por:** Patricio

---

**🚀 ¡Backlog listo para comenzar el desarrollo!**
