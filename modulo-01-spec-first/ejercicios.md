# Ejercicios Módulo 1 — El Método Spec-First

**Recurso descargable del curso "Construye con IA: De la Idea al Producto con Claude"**

---

## Ejercicio 1 — Escribe la visión y los usuarios de tu idea
**Dificultad:** Básico
**Tiempo estimado:** 15 minutos

Elige una idea de producto propia y completa las 2 primeras secciones de la spec.

**Instrucciones:**
1. Piensa en un producto que te gustaría construir (o elige de esta lista si no tienes idea):
   - Una app para organizar recetas según ingredientes disponibles
   - Un tracker de hábitos con recordatorios inteligentes
   - Un generador de presupuestos para freelancers
   - Un planificador de viajes colaborativo
2. Abre Claude.ai y escribe: "Quiero construir [tu idea]. Ayúdame a escribir la visión del producto en 1-2 oraciones"
3. Itera hasta que la visión sea concreta y clara (mínimo 2 versiones)
4. Ahora pide: "Define el usuario principal y 3 casos de uso concretos para este producto"
5. Copia ambas secciones a un documento

**Autoevaluación:**
- [ ] ¿La visión cabe en 2 oraciones?
- [ ] ¿Dice para quién es?
- [ ] ¿Los casos de uso son acciones concretas (verbos)?
- [ ] ¿El usuario está descrito como persona, no como rol técnico?

---

## Ejercicio 2 — Completa las 6 secciones de tu spec
**Dificultad:** Intermedio
**Tiempo estimado:** 30 minutos

Usando la Plantilla Spec-First, completa las 6 secciones para tu idea.

**Instrucciones:**
1. Descarga la Plantilla Spec-First (recurso del curso)
2. Ya tienes la Sección 1 (Visión) y Sección 2 (Usuarios) del ejercicio anterior
3. Completa las 4 secciones restantes con ayuda de Claude.ai:
   - **Sección 3 — Funcionalidades:** "Basándote en esta visión y estos usuarios, lista las funcionalidades usando 'El usuario puede...' y 'El sistema permite...'"
   - **Sección 4 — Flujos:** "Describe el flujo principal paso a paso, incluido qué pasa si algo falla"
   - **Sección 5 — Arquitectura:** "Recomienda un stack técnico para este producto y describe el flujo de datos"
   - **Sección 6 — Requisitos:** "Define requisitos de rendimiento, seguridad, y especialmente qué NO incluye la primera versión"
4. Revisa la spec completa. Pide a Claude.ai: "Revisa esta especificación. ¿Hay inconsistencias entre secciones?"

**Autoevaluación:**
- [ ] ¿Cada sección es específica para tu producto (no genérica)?
- [ ] ¿Las funcionalidades incluyen una lista de "NO incluye"?
- [ ] ¿Los flujos tienen pasos numerados Y flujo de error?
- [ ] ¿La arquitectura tiene un flujo de datos claro?

**Reflexión:** Esta spec es tu proyecto paralelo. Si la completas bien, puedes construirla a lo largo del curso aplicando lo que aprendes en cada módulo.

---

## Ejercicio 3 — Compara una spec buena con una mala
**Dificultad:** Avanzado
**Tiempo estimado:** 15 minutos

Aquí tienes dos especificaciones para el mismo producto. Identifica cuál es mejor y por qué.

**Spec A:**
> Es una app de tareas para equipos. Los usuarios pueden crear tareas y asignarlas. Tiene un panel bonito. Usa React.

**Spec B:**
> TaskFlow es una herramienta web de gestión de tareas para equipos remotos de 5-15 personas. Resuelve el problema de que las tareas se pierden entre Slack, email y documentos.
>
> Usuario principal: Líder de equipo remoto que necesita visibilidad de quién hace qué.
> Caso de uso 1: Crea una tarea con título, descripción y asignado → aparece en el tablero del equipo.
> Caso de uso 2: Filtra tareas por estado (pendiente, en progreso, completada) → ve el progreso del equipo.
>
> Funcionalidades: El usuario puede crear tareas con título y descripción. El usuario puede asignar tareas a miembros del equipo. El sistema muestra un tablero Kanban con 3 columnas. El sistema envía una notificación cuando una tarea se asigna.
>
> Fuera del alcance v1: No incluye chat integrado. No incluye integraciones con Slack ni email. No incluye reportes ni analytics.

**Instrucciones:**
1. Lee ambas specs
2. Para cada sección (visión, usuarios, funcionalidades), marca cuál es mejor
3. Lista al menos 5 problemas concretos de la Spec A
4. Identifica qué hace que la Spec B sea más útil para Claude Code

**Reflexión:** La Spec A parece suficiente cuando la lees rápido. Pero cuando se la das a Claude Code, las "decisiones fantasma" empiezan. La Spec B elimina la ambigüedad — Claude Code sabe exactamente qué construir y qué NO construir.

---

## Ejercicio 4 — Crea un CLAUDE.md para tu proyecto
**Dificultad:** Intermedio
**Tiempo estimado:** 10 minutos

Usando la spec que creaste en el Ejercicio 2, escribe un CLAUDE.md.

**Instrucciones:**
1. Abre un archivo nuevo o usa Claude.ai
2. Escribe un CLAUDE.md con estas 5 secciones:
   - Visión del proyecto (extraída de tu Sección 1)
   - Stack técnico (extraído de tu Sección 5, o pide a Claude.ai que recomiende uno)
   - Convenciones (idioma del código, nombrado de archivos)
   - Restricciones (extraídas de tu Sección 6 — lo que NO se hace)
   - Estado actual ("Fase de especificación completada. Pendiente: inicializar proyecto.")
3. El CLAUDE.md no debe tener más de 30 líneas — es un resumen, no una copia de la spec

**Autoevaluación:**
- [ ] ¿Un desarrollador nuevo (o Claude Code) puede leer el CLAUDE.md y entender el proyecto en 1 minuto?
- [ ] ¿Incluye lo que NO se debe hacer?
- [ ] ¿Es conciso (menos de 30 líneas)?

**Reflexión:** Si completaste este ejercicio, ya tienes TODO lo necesario para empezar a construir tu proyecto propio: spec completa + CLAUDE.md. Guarda ambos documentos — los vas a usar en los ejercicios de los módulos siguientes.

---

*Recurso del curso "Construye con IA: De la Idea al Producto con Claude y Specs"*
