# Sprint Planning - Sprint 1

**Producto:** TALQ - Plataforma de Aprendizaje de Idiomas  
**Sprint Number:** 1  
**Sprint Duration:** 10 Diciembre 2025 - 23 Diciembre 2025 (2 semanas)  
**Planning Date:** Diciembre 10, 2025  
**Owner:** Patricio  
**Version:** 2.0 (Acorn Template Edition)  
**Base Template:** Acorn React E-learning Portal

---

## Resumen del Sprint

### Sprint Goal 🎯

**"Establecer la fundación del proyecto: los usuarios pueden descubrir TALQ y registrarse como estudiantes con confirmación de email"**

Este sprint establece las bases técnicas y funcionales del proyecto, permitiendo que los primeros usuarios puedan conocer la plataforma y crear sus cuentas.

### Métricas del Sprint

- **Duración:** 2 semanas (10 días hábiles)
- **Capacidad Disponible:** 60-70 horas totales
- **Capacidad Comprometida:** ~30 horas (reducido gracias a Acorn Template)
- **Story Points Comprometidos:** 8 SP (2M + 1S = 3+3+2)
- **Número de Stories:** 3
- **Velocity Esperado:** Por definir (primer sprint)
- **Template Advantage:** ~40% menos tiempo en UI/Frontend

---

## Sprint Backlog

### User Stories Seleccionadas

---

#### ✅ US-001: Landing Page con Opciones de Acceso

**Epic:** Autenticación y Gestión de Usuarios  
**Story:** Como visitante, quiero acceder a una landing page clara que me explique qué es TALQ y pueda elegir mi tipo de usuario para registrarme o iniciar sesión fácilmente.

**Criterios de Aceptación:**

- [ ] Landing page muestra valor de la plataforma y slogan "Let's Talq"
- [ ] Dos botones visibles: "Soy Estudiante" (→ /login) y "Soy Profesor/Admin" (→ /admin-login)
- [ ] Diseño responsive con logo TALQ (colores: #F5A623, #4A4A4A)
- [ ] Footer con información de contacto
- [ ] Tiempo de carga < 2 segundos

**Story Points:** 3 (M)  
**Horas Estimadas:** 12-16 hrs  
**Prioridad en Sprint:** 1 (hacer primero - bloquea todo lo demás)  
**Dependencias:** Ninguna (primera feature)  
**Owner:** Patricio

**Tasks a Desarrollar:**

- [ ] Copiar template Acorn al repo TALQ
- [ ] Configurar colores TALQ en theme (#E16449, #FFBF40, #181B21, #868686)
- [ ] Configurar fuente Switzer
- [ ] Adaptar landing page del template con contenido TALQ
- [ ] Agregar logo TALQ y slogan "Let's Talq"
- [ ] Configurar botones de navegación
- [ ] Testing responsive (desktop, tablet, mobile)
- [ ] Deploy a Vercel (staging)

**Notas Técnicas:**

- Basado en Acorn E-learning Portal Landing
- Ya incluye: Navbar, Footer, estructura responsive
- Solo requiere: personalización de colores, contenido y branding

---

#### ✅ US-002: Registro de Estudiantes con Selección de Nivel

**Epic:** Autenticación y Gestión de Usuarios  
**Story:** Como estudiante nuevo, quiero registrarme con mi email o redes sociales, seleccionar mi nivel de inglés y confirmar mi cuenta para acceder a la plataforma.

**Criterios de Aceptación:**

- [ ] Formulario de registro con: nombre completo, email, contraseña, confirmar contraseña
- [ ] Selector de nivel: Beginner (A1), Elementary (A2), Intermediate (B1), Upper-Intermediate (B2), Advanced (C1)
- [ ] Validación en tiempo real (email válido, contraseña min 8 caracteres con mayúscula/minúscula/número/especial)
- [ ] Botones "Continuar con Google" y "Continuar con Facebook" funcionales
- [ ] Al registrarse, sistema envía email de confirmación con Resend
- [ ] Usuario no puede acceder hasta confirmar email (muestra mensaje "Revisa tu email")
- [ ] Sistema automáticamente asigna estudiante a cursos según nivel seleccionado

**Story Points:** 3 (M)  
**Horas Estimadas:** 14-18 hrs  
**Prioridad en Sprint:** 2 (después de landing)  
**Dependencias:** US-001 (landing debe existir para navegar a registro)  
**Owner:** Patricio

**Tasks a Desarrollar:**

**Frontend:**

- [ ] Adaptar página /register del template Acorn
- [ ] Agregar campo selector de nivel de inglés
- [ ] Personalizar validación con Formik + Yup (ya incluido)
- [ ] Botones OAuth (UI del template, funcionalidad en Sprint 2)
- [ ] Manejo de errores (mostrar mensajes claros)
- [ ] Página de "Revisa tu email" post-registro

**Backend:**

- [ ] Setup inicial de Express TypeScript + MongoDB
- [ ] Modelo User (Mongoose schema)
- [ ] Endpoint POST /api/auth/register
- [ ] Validación de inputs con Yup
- [ ] Hash de passwords con bcrypt
- [ ] Generación de token de confirmación (JWT)
- [ ] Integración con Resend (envío de email)
- [ ] Creación de template HTML de email de confirmación

**Integración:**

- [ ] Conectar frontend con backend (Axios - ya configurado en Acorn)
- [ ] Testing end-to-end del flujo completo

**Notas Técnicas:**

- Template Acorn ya incluye: Register page, Formik setup, Axios config
- OAuth (Google/Facebook) solo tendrá botones en UI, funcionalidad en Sprint 2
- Auto-asignación a cursos requiere que existan cursos por nivel (se postpone a Sprint 3-4)

---

#### ✅ US-003: Confirmación de Email Obligatoria

**Epic:** Autenticación y Gestión de Usuarios  
**Story:** Como estudiante registrado, quiero recibir un email de confirmación y activar mi cuenta para poder iniciar sesión.

**Criterios de Aceptación:**

- [ ] Al registrarse, generar token único de confirmación (expira en 24 horas)
- [ ] Enviar email con Resend usando template HTML profesional
- [ ] Email contiene link: /confirm-email/:token
- [ ] Link redirige a página de confirmación
- [ ] Al confirmar: marcar isEmailConfirmed=true, auto-login, redirect a dashboard placeholder
- [ ] Si token inválido/expirado: mostrar error y opción "Reenviar email"
- [ ] Funcionalidad "Reenviar email de confirmación" en página de login

**Story Points:** 2 (S)  
**Horas Estimadas:** 8-12 hrs  
**Prioridad en Sprint:** 3 (después de registro)  
**Dependencias:** US-002 (el registro genera el email de confirmación)  
**Owner:** Patricio

**Tasks a Desarrollar:**

**Frontend:**

- [ ] Crear página /confirm-email/:token
- [ ] Página de éxito (cuenta confirmada)
- [ ] Página de error (token inválido/expirado)
- [ ] Botón "Reenviar email de confirmación"

**Backend:**

- [ ] Endpoint GET /api/auth/confirm-email/:token
- [ ] Validar token JWT
- [ ] Actualizar user.isEmailConfirmed = true
- [ ] Endpoint POST /api/auth/resend-confirmation (con rate limiting)
- [ ] Invalidar token después de uso

**Email:**

- [ ] Diseñar template HTML de confirmación (responsive)
- [ ] Incluir logo TALQ, mensaje claro, botón CTA grande
- [ ] Link de confirmación visible y funcional

**Testing:**

- [ ] Probar flujo completo: registro → email → confirmación → success
- [ ] Probar casos edge: token expirado, token ya usado, token inválido

**Notas Técnicas:**

- Token expira en 24 horas
- Después de confirmar, redirige a dashboard placeholder (página simple que dice "Dashboard - Coming in Sprint 2")
- Template de email debe ser profesional y branded

---

### Stories Consideradas pero NO Incluidas en Sprint 1

---

#### 📄 US-004: Login de Estudiantes (Portal Separado)

**Razón:** Capacidad conservadora para Sprint 1. Login requiere que confirmación de email esté completamente probada primero.  
**Considerar para:** Sprint 2 (alta prioridad)

---

#### 📄 US-008: Dashboard Personalizado de Estudiante

**Razón:** Depende de US-004 (login). En Sprint 1 se crea solo un placeholder del dashboard.  
**Considerar para:** Sprint 2

---

#### 📄 US-005: Recuperación de Contraseña

**Razón:** No es crítico para MVP inicial. Se puede agregar después de que login funcione.  
**Considerar para:** Sprint 2

---

## Calendario del Sprint

### Semana 1 (10-13 Diciembre)

**Días laborables:** Martes 10 - Viernes 13 (4 días)  
**Horas disponibles:** ~28-32 hrs

**Focus:**

- **Día 1 (Mar):** Setup template Acorn + Backend TypeScript
  - Copiar template Acorn al repo
  - Configurar colores TALQ en theme
  - Setup backend Express + TypeScript + MongoDB
- **Día 2 (Mié):** US-001 Landing + Backend models
  - Personalizar landing page con contenido TALQ
  - Crear modelo User en backend
  - Deploy inicial a Vercel
- **Días 3-4 (Jue-Vie):** US-002 Registro
  - Adaptar register page del template
  - Endpoint de registro en backend
  - Integración con Resend

**Daily Scrum:** 9:00 AM (auto-check)

**Milestone:** Landing page deployada + formulario de registro funcional

---

### Semana 2 (16-20 Diciembre)

**Días laborables:** Lunes 16 - Viernes 20 (5 días)  
**Horas disponibles:** ~35-40 hrs

**Focus:**

- **Días 5-7 (Lun-Mié):** Completar US-002 y comenzar US-003
  - Integración con Resend
  - Template de email de confirmación
  - Testing completo de registro
  - Comenzar US-003 (confirmación)
- **Días 8-9 (Jue-Vie):** Completar US-003 + Testing final
  - Endpoint de confirmación
  - Página de confirmación exitosa
  - Casos edge (token expirado, inválido)
  - Testing end-to-end completo
  - Refinamiento de UX
- **Día 10 (Vie PM):** Preparar Sprint Review
  - Demo de flujo completo
  - Documentación básica
  - Deploy a producción (si todo está estable)

**Mid-Sprint Check:** Miércoles 18 - Evaluar si vamos on track (debemos tener ~50% completado)

**Milestone:** Usuario puede registrarse, recibir email, confirmar cuenta ✅

---

### Fechas Especiales

**🎄 Navidad (25 Dic) y Fin de Año (1 Ene):** Sprint termina antes (23 Dic), lo cual es perfecto para cerrar bien el año.

---

## Riesgos y Mitigaciones

### Riesgos Identificados

| Riesgo                                            | Probabilidad | Impacto   | Plan de Mitigación                                                                                                                                         |
| ------------------------------------------------- | ------------ | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Problemas con OAuth (Google/Facebook)             | 🟡 Medium    | 🟡 Medium | OAuth no es crítico para Sprint 1. Si toma mucho tiempo, dejar solo los botones en UI y posponer funcionalidad a Sprint 2. Priorizar registro con email.   |
| Configuración de Resend (API, dominio, templates) | 🟡 Medium    | 🔴 High   | Hacer setup de Resend en Día 1-2. Si hay problemas, usar console.log temporal y agregar emails reales en Sprint 2. Lo importante es que el flujo funcione. |
| Setup del monorepo toma más tiempo del esperado   | 🟢 Low       | 🟡 Medium | Usar templates de Vite y Express estándar. No sobre-ingenierizar. Seguir arquitectura del documento.                                                       |
| MongoDB Atlas tarda en configurarse               | 🟢 Low       | 🟡 Medium | Usar MongoDB local para desarrollo. Atlas solo para staging/producción.                                                                                    |
| Subestimación de complejidad (primer sprint)      | 🟡 Medium    | 🟡 Medium | Por eso estamos siendo conservadores (solo 3 stories). Si vamos muy bien, tenemos stretch goals preparados.                                                |

### Blockers Anticipados

- [ ] **API keys de servicios externos** - Plan: Crear cuentas de Resend, Google OAuth, Facebook OAuth en Día 1
- [ ] **Decisión de estructura de carpetas** - Plan: Usar estructura del documento de arquitectura tal cual
- [ ] **Diseño de email templates** - Plan: Usar templates simples de Resend, no perder tiempo en diseño complejo

---

## Consideraciones Técnicas

### Decisiones Arquitectónicas Necesarias

- [ ] **Estructura del monorepo** - Resolver: Día 1 (seguir /frontend y /backend)
- [ ] **Variables de entorno** - Resolver: Día 1 (crear .env.example en ambos proyectos)
- [ ] **Estrategia de branches** - Resolver: Día 1 (main para producción, develop para trabajo)

### Dependencias Externas

- **Resend:** Crear cuenta + verificar dominio (o usar sandbox mode) - Día 1
- **MongoDB Atlas:** Crear cluster (M0 free tier) - Día 1
- **Vercel:** Conectar repo para deploy automático - Día 2
- **Railway:** Conectar repo para backend - Día 2

### Setup del Ambiente de Desarrollo

**Día 1 (Obligatorio antes de codear):**

- [ ] Instalar Node.js 22 LTS
- [ ] Instalar MongoDB Compass (para desarrollo local)
- [ ] Crear repositorio en GitHub (monorepo)
- [ ] Setup de frontend: `npm create vite@latest frontend -- --template react`
- [ ] Setup de backend: `npm init -y` en carpeta backend
- [ ] Instalar dependencias iniciales (ver arquitectura)
- [ ] Configurar ESLint + Prettier en ambos proyectos
- [ ] Setup de Husky para pre-commit hooks
- [ ] Crear .env.example con todas las variables necesarias
- [ ] Primera commit: "chore: initial project setup"

---

## Definition of Done (Específico de Sprint 1)

Una story está Done cuando:

- [ ] Todos los criterios de aceptación cumplidos
- [ ] Código funcional y desplegado en staging
- [ ] Testing manual realizado (happy path + casos edge básicos)
- [ ] Sin console.log ni debugger statements
- [ ] Sin bugs críticos (P0) ni bloqueantes
- [ ] Responsive (funciona en desktop, tablet, mobile)
- [ ] Código siguiendo convenciones (PascalCase para componentes, camelCase para funciones)
- [ ] Commits con conventional commits (feat:, fix:, chore:)
- [ ] README.md actualizado con instrucciones de setup (si aplica)
- [ ] Listo para demo en Sprint Review

**Stretch Goals (si terminamos antes):**

- Implementar US-004 (Login de estudiantes)
- Mejorar diseño visual de landing page
- Agregar animaciones sutiles con Framer Motion
- Implementar dark mode toggle

---

## Estructura de Daily Scrum

**Horario:** 9:00 AM (auto-check personal)  
**Duración:** 15 minutos máximo  
**Formato:** Escrito en un documento (Google Docs o Notion)

**Template diario:**

```
📅 Daily Scrum - [Fecha]

✅ Ayer completé:
- [Task específico]
- [Task específico]

🎯 Hoy trabajaré en:
- [Task específico con tiempo estimado]
- [Task específico con tiempo estimado]

🚫 Blockers:
- [Ninguno / Describir blocker específico]

📊 Status del Sprint:
- US-001: [% completado]
- US-002: [% completado]
- US-003: [% completado]

💭 Notas:
[Cualquier observación importante]
```

**Documento en:** Notion o Google Docs (crear al inicio del sprint)

---

## Preparación de Sprint Review

**Fecha:** Viernes 20 Diciembre, 4:00 PM  
**Duración:** 30 minutos

**Items a Demostrar:**

1. **US-001 - Landing Page:**

   - Mostrar: Landing page responsive con logo, slogan, botones funcionales
   - Navegar: Click en "Soy Estudiante" lleva a /register

2. **US-002 - Registro de Estudiantes:**

   - Mostrar: Formulario completo con validaciones en tiempo real
   - Demo: Registrar un usuario de prueba (email real)
   - Mostrar: Mensaje "Revisa tu email para confirmar tu cuenta"
   - Mostrar: Email recibido en inbox con template profesional

3. **US-003 - Confirmación de Email:**
   - Demo: Click en link del email
   - Mostrar: Página de confirmación exitosa
   - Mostrar: Redirect a dashboard placeholder
   - Demo: Intentar usar token expirado/inválido → mensaje de error claro

**Métricas a Reportar:**

- Stories completadas: 3/3 (100%)
- Story Points completados: 8/8 (100%)
- Velocity del Sprint 1: 8 SP
- Horas trabajadas: [registrar real]
- Bugs encontrados: [listar]

**Stakeholders:** N/A (proyecto personal, pero preparar demo profesional)

---

## Vista Previa de Sprint Retrospective

**Fecha:** Viernes 20 Diciembre, después de Review (~4:45 PM)  
**Duración:** 30 minutos

**Preguntas a Reflexionar:**

1. **¿El Sprint Goal se cumplió?**

   - ¿Los usuarios pueden registrarse y confirmar email?
   - ¿Qué faltó si no se cumplió?

2. **¿Las estimaciones fueron precisas?**

   - ¿Qué stories tomaron más/menos tiempo del estimado?
   - ¿Por qué?

3. **¿Qué bloqueó el progreso?**

   - ¿Hubo blockers técnicos?
   - ¿Decisiones no tomadas a tiempo?

4. **¿Qué funcionó bien?**

   - ¿Qué prácticas mantener?
   - ¿Qué herramientas fueron útiles?

5. **¿Qué mejorar para Sprint 2?**
   - Estimaciones más/menos conservadoras
   - Mejor planning de tasks
   - Decisiones técnicas más rápidas

**Acciones Concretas:**

- [ ] [Acción de mejora 1]
- [ ] [Acción de mejora 2]

---

## Compromiso del Sprint

**Como desarrollador, me comprometo a:**

- [x] Trabajar en las stories seleccionadas en orden de prioridad (US-001 → US-002 → US-003)
- [x] Hacer Daily Scrum todos los días a las 9:00 AM
- [x] Comunicar blockers inmediatamente (aunque sea solo a mí mismo, documentar)
- [x] No agregar scope sin re-planning (si surge algo nuevo, va al backlog para Sprint 2)
- [x] Mantener DoD como estándar mínimo en todas las stories
- [x] Preparar demo profesional de lo completado

**Sprint Goal Success = 100% de stories completadas con DoD cumplido**

Siendo conservadores: Success también es 2/3 stories (66%) si hay razones válidas.

---

## Referencia Rápida

### 🚨 Si Surge Trabajo Urgente No Planeado

1. **Evaluar vs Sprint Goal:** ¿Es crítico para "usuarios pueden registrarse y confirmar email"?
2. **Si es crítico:** Re-planificar (quitar algo del sprint o ajustar scope)
3. **Si NO es crítico:** Agregarlo al Product Backlog con prioridad alta para Sprint 2

**Ejemplo:**

- "Olvidé configurar HTTPS" → Crítico, ajustar sprint
- "Quiero agregar animaciones" → No crítico, backlog para después

---

### 📊 Checkpoints de Salud del Sprint

**Día 3 (Jueves 12):**

- ¿Al menos US-001 está completa o casi completa?
- ¿Setup del proyecto está listo?
- ✅ Esperado: Landing page funcionando + setup completo

**Día 5 (Lunes 16 - Mid-Sprint):**

- ¿Al menos 40-50% del sprint completado?
- ¿US-001 Done + US-002 al 50%?
- ✅ Esperado: Landing deployada + registro funcionando parcialmente

**Día 8 (Jueves 19):**

- ¿Al menos 70-80% completado?
- ¿US-001 y US-002 Done + US-003 casi lista?
- ✅ Esperado: Solo falta polish y testing de US-003

---

### ⚠️ Red Flags (Señales de Alerta)

- ❌ **Story sin progreso por 2+ días** → Revisar: ¿hay blocker no documentado? ¿subestimación?
- ❌ **Blocker no resuelto en 24 hrs** → Pedir ayuda (comunidad, Stack Overflow, Claude)
- ❌ **Duda sobre AC de alguna story** → Volver al Product Backlog, aclarar antes de continuar
- ❌ **Día 5 y < 30% completado** → Considerar quitar una story del sprint
- ❌ **Día 8 y < 60% completado** → Sprint en riesgo, focus en lo esencial

---

## Herramientas y Recursos

### Para Tracking:

- **Daily Scrum Log:** Google Docs o Notion
- **Task Management:** GitHub Projects (Kanban board)
- **Commits:** GitHub con conventional commits

### Para Desarrollo:

- **Editor:** VS Code
- **DB Client:** MongoDB Compass
- **API Testing:** Postman o Thunder Client (VS Code extension)
- **Email Testing:** Resend dashboard para ver emails enviados

### Para Comunicación (si aplica):

- **Notas:** Notion o Obsidian
- **Screenshots:** Para documentar progreso

---

## Plantilla de Commit Messages

```bash
# Feature
feat(auth): add user registration endpoint
feat(ui): create landing page component

# Fix
fix(auth): resolve password hashing issue
fix(email): correct confirmation link format

# Chore (setup, config, deps)
chore: initial project setup
chore(deps): upgrade react to 18.3.1

# Docs
docs(readme): add setup instructions

# Style (formatting, no logic change)
style: format code with prettier

# Refactor
refactor(auth): extract validation logic to middleware

# Test
test(auth): add unit tests for registration
```

---

## Notas Finales para Sprint 1

**Mindset para este sprint:**

- 🎯 **Focus:** Este es tu setup sprint. Establece bases sólidas.
- 🐢 **Velocidad:** Mejor lento y bien que rápido y mal.
- 📚 **Aprendizaje:** Primer sprint es para establecer velocity baseline y flujo de trabajo.
- ✅ **Calidad:** DoD es sagrado. No comprometas calidad por velocidad.

**Expectativas realistas:**

- Setup de template Acorn es rápido (~2-3 horas)
- Personalización de colores/theme es sencilla (~1-2 horas)
- Backend TypeScript requiere setup inicial (~2-3 horas)
- OAuth puede ser complicado (por eso solo UI en Sprint 1)
- Resend puede tener curva de aprendizaje (usar sandbox si es necesario)

**Ventajas del Template Acorn:**

- ✅ Auth pages ya incluidas (Login, Register, Forgot Password)
- ✅ Componentes UI listos (Buttons, Forms, Modals)
- ✅ Responsive ya configurado
- ✅ Formik + Yup ya integrados
- ✅ Axios ya configurado
- ✅ Redux Toolkit ya configurado

**Recordatorios:**

- Commitear frecuentemente (al menos 1-2 veces al día)
- Hacer push al final de cada día
- Deploy a staging cada vez que algo funciona
- Documentar decisiones importantes en commits

---

## Siguiente Sprint (Preview)

**Sprint 2 (comenzaría: 6 Enero 2026, después de fiestas):**

**Objetivo Anticipado:** "Usuarios pueden iniciar sesión y ver su dashboard básico"

**Stories Candidatas:**

- US-004: Login de estudiantes (M)
- US-005: Recuperación de contraseña (S)
- US-006: Login de profesores/admins (S)
- US-008: Dashboard de estudiante (M)

**Preparación para Sprint 2:**

- Durante retrospective de Sprint 1, refinar estas stories
- Ajustar estimaciones basadas en velocity real
- Identificar dependencias y riesgos

---

**Última Actualización:** Diciembre 10, 2025  
**Version:** 2.0 (Acorn Template Edition)  
**Estado:** ✅ Sprint Planning Completo - Listo para Comenzar  
**Próxima Ceremonia:** Daily Scrum - Mañana 11 Dic a las 9:00 AM

---

**🚀 ¡Sprint 1 Comienza HOY! Let's Talq! 💪**
