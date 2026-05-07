# Especificación Técnica — Herramienta de Onboarding para Startups

**Producto de demostración — Video 3: El tutorial gratuito**
_Construida en vivo aplicando el método spec-first_

---

## Sección 1 — Visión del Producto

**OnboardFlow** es una herramienta web que guía a los nuevos empleados de startups por un proceso de onboarding estructurado durante sus primeras semanas, y permite a founders y responsables de HR crear y gestionar ese proceso desde un panel de control. Resuelve el caos del onboarding en startups pequeñas donde no existe un proceso documentado: cada nueva incorporación se improvisa, se olvidan pasos importantes y el nuevo empleado llega al día 30 sin saber qué se esperaba de él.

---

## Sección 2 — Usuarios y Casos de Uso

| Usuario | Descripción | Casos de uso |
|---|---|---|
| Administrador (HR / Founder) | Persona que diseña el proceso de onboarding y hace seguimiento de nuevas incorporaciones | 1. Crea y edita el proceso de onboarding (pasos, tareas, materiales) 2. Invita a un nuevo empleado y le asigna el proceso 3. Ve el progreso de cada nuevo empleado en tiempo real |
| Nuevo empleado | Persona que acaba de incorporarse a la empresa y sigue el proceso de onboarding | 1. Accede a su proceso de onboarding con un enlace único 2. Ve sus tareas organizadas por semana 3. Marca tareas como completadas y registra su progreso |

---

## Sección 3 — Funcionalidades

**Panel del administrador:**
- El administrador puede crear un proceso de onboarding con nombre, descripción y duración en semanas
- El administrador puede añadir pasos al proceso (título, descripción, semana, tipo: tarea / lectura / reunión)
- El administrador puede reordenar y editar los pasos del proceso
- El administrador puede invitar a un nuevo empleado introduciendo su nombre y correo
- El sistema envía al nuevo empleado un enlace único de acceso a su proceso
- El administrador puede ver el progreso de cada empleado (% completado, pasos pendientes)

**Vista del nuevo empleado:**
- El nuevo empleado puede acceder a su proceso con un enlace único (sin registro)
- El sistema muestra sus tareas organizadas por semana con estado: pendiente / completada
- El nuevo empleado puede marcar cualquier tarea como completada
- El nuevo empleado puede ver materiales adjuntos a cada paso (enlaces, documentos)
- El sistema muestra su progreso total con una barra de progreso

**Estados del sistema:**
- El sistema muestra un estado vacío al administrador si no hay ningún proceso creado
- El sistema muestra un estado de carga mientras procesa acciones
- El sistema muestra mensajes de confirmación al completar una tarea o invitar a un empleado
- El sistema muestra un mensaje de error si el enlace de acceso no es válido o ha expirado

**Fuera del alcance (v1):**
- No hay autenticación con contraseña para el administrador (acceso por email magic link)
- No hay múltiples administradores por empresa
- No hay notificaciones automáticas al empleado cuando hay nuevas tareas
- No hay integración con herramientas externas (Slack, Notion, etc.)
- No hay subida directa de archivos (solo enlaces externos)

---

## Sección 4 — Flujos de Usuario

**Flujo principal — Administrador crea e invita:**
1. El administrador abre la aplicación e introduce su correo → recibe un magic link
2. Hace clic en el magic link → accede al panel de administración
3. Hace clic en "Crear proceso de onboarding" → introduce nombre y duración (ej: 4 semanas)
4. Añade pasos al proceso: título, descripción, semana asignada y tipo (tarea / lectura / reunión)
5. Hace clic en "Guardar proceso"
6. Hace clic en "Invitar empleado" → introduce nombre y correo del nuevo empleado
7. El sistema envía al empleado un enlace único → el administrador ve una confirmación
8. El panel muestra al empleado con progreso en 0%

**Flujo principal — Empleado completa su onboarding:**
1. El nuevo empleado recibe el correo con el enlace → hace clic
2. Accede directamente a su proceso (sin login) → ve sus tareas organizadas por semana
3. Lee la descripción de una tarea y la marca como completada
4. El sistema actualiza la barra de progreso en tiempo real
5. Cuando completa todos los pasos → el sistema muestra un mensaje de felicitación

**Flujo de error — enlace inválido:**
1. Si el empleado accede con un enlace caducado o incorrecto → el sistema muestra: "Este enlace no es válido o ha expirado. Pide a tu administrador que te envíe uno nuevo."

**Flujo de error — fallo al invitar:**
1. Si el sistema no puede enviar el correo de invitación → muestra: "No pudimos enviar el correo. Comprueba la dirección e inténtalo de nuevo."

---

## Sección 5 — Arquitectura

| Componente | Tecnología | Función |
|---|---|---|
| Frontend | Next.js 16 + React + Tailwind CSS | Panel del administrador y vista del empleado |
| Backend | API Routes de Next.js (Node.js) | Gestiona procesos, pasos, empleados y accesos |
| Base de datos | Supabase (PostgreSQL) | Almacena procesos, pasos, empleados y progreso |
| Autenticación | Supabase Auth (magic link) | Login del administrador sin contraseña |
| Email | Resend | Envío de invitaciones y magic links |
| Deploy | Vercel | Publicación automática desde GitHub |

**Flujo de datos:**
```
Administrador → Next.js (React) → API Route → Supabase → API Route → Next.js → Administrador

Empleado → enlace único → Next.js (React) → API Route → Supabase → API Route → Next.js → Empleado
```

**Modelo de datos simplificado:**
```
Process { id, name, duration_weeks, admin_id, created_at }
Step    { id, process_id, title, description, week, type, order }
Invite  { id, process_id, employee_name, employee_email, token, expires_at }
Progress { id, invite_id, step_id, completed_at }
```

---

## Sección 6 — Requisitos No Funcionales

**Rendimiento:**
- La vista del empleado debe cargar en menos de 2 segundos
- Marcar una tarea como completada debe reflejarse en menos de 1 segundo

**Seguridad:**
- Los enlaces de acceso del empleado tienen un token único y expiran a los 30 días
- El panel de administrador solo es accesible tras autenticación por magic link
- Las variables de entorno (claves de Supabase, Resend) nunca se exponen en el frontend

**Accesibilidad:**
- La interfaz es usable en móvil y desktop
- Funciona en Chrome, Firefox, Safari y Edge

**Escalabilidad:**
- Diseñada para startups de 10-50 personas: sin requisitos de alta concurrencia en v1

**Fuera del alcance (v1):**
- No hay múltiples administradores ni roles avanzados
- No hay notificaciones push ni recordatorios automáticos
- No hay exportación de informes de progreso
- No hay personalización de marca (colores, logo de la empresa)
- No hay integración con calendarios ni herramientas externas

---

## Checklist final

- [x] **Visión** — Cabe en 2 oraciones y es clara
- [x] **Usuarios** — Descritos como personas reales con acciones concretas
- [x] **Funcionalidades** — Cada una empieza con "El usuario puede..." o "El sistema..."
- [x] **Flujos** — Tienen pasos numerados y flujos de error
- [x] **Arquitectura** — Tecnologías elegidas y flujo de datos claro
- [x] **Requisitos** — Incluyen lo que está fuera del alcance

---

_Spec construida en vivo en el Video 3 del canal dominicode aplicando el método spec-first_
_Recurso del curso "Construye con IA: De la Idea al Producto con Claude y Specs"_
