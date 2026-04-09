# Recursos del Curso — Construye con IA: De la Idea al Producto con Claude

Recursos descargables del curso [**Construye con IA: De la Idea al Producto con Claude**](https://www.udemy.com/course/construye-con-ia-de-la-idea-al-producto-con-claude-code/?referralCode=AECD9EA3796054DEDD5D) en Udemy, impartido por Bezael Pérez / [DominiCode](https://dominicode.com).

---

## ¿Qué contiene este repo?

Todos los recursos que usarás durante el curso: plantillas, ejercicios por módulo, cheatsheets y referencias. Están organizados en el mismo orden que el curso para que encuentres lo que necesitas sin buscar.

---

## Estructura

```
/
├── plantillas/
│   └── spec-first-template.md       — Plantilla Spec-First: de la idea al producto
├── modulo-00-setup/
│   └── ejercicios.md                — Ejercicios de bienvenida y configuración del entorno
├── modulo-01-spec-first/
│   └── ejercicios.md                — Ejercicios del Método Spec-First
├── modulo-02-arquitectura/
│   └── ejercicios.md                — Ejercicios de arquitectura del proyecto
├── modulo-03-backend/
│   └── ejercicios.md                — Ejercicios del backend: motor de specs
├── modulo-04-frontend/
│   └── ejercicios.md                — Ejercicios del frontend: interfaz del generador
├── modulo-05-deploy/
│   └── ejercicios.md                — Ejercicios de deploy en Vercel
├── modulo-06-seguridad/
│   └── ejercicios.md                — Ejercicios de seguridad con IA
├── cheatsheets/
│   └── cheatsheet-claude-code.pdf    — Referencia rápida de comandos de Claude Code (imprimible)
└── demo/
    └── demo-retrofit-gastos/         — App de ejemplo usada en el curso (React + Vite + TypeScript)
```

---

## Plantillas

### Spec-First Template

La plantilla más importante del curso. La usarás antes de escribir una sola línea de código — o de darle una instrucción a Claude Code.

[→ Ver plantilla](./plantillas/spec-first-template.md)

Incluye las 6 secciones de una especificación técnica completa:

1. Visión del producto
2. Usuarios y casos de uso
3. Funcionalidades
4. Flujos de usuario
5. Arquitectura
6. Requisitos no funcionales

---

## Ejercicios por módulo

| Módulo           | Tema                                      | Ejercicios                                      |
| ---------------- | ----------------------------------------- | ----------------------------------------------- |
| 0 — Setup        | Bienvenida y configuración del entorno    | [→ Ver](./modulo-00-setup/ejercicios.md)        |
| 1 — Spec-First   | El método que cambia cómo trabajas con IA | [→ Ver](./modulo-01-spec-first/ejercicios.md)   |
| 2 — Arquitectura | Diseño del proyecto antes de construir    | [→ Ver](./modulo-02-arquitectura/ejercicios.md) |
| 3 — Backend      | El motor de specs: API Route + Claude     | [→ Ver](./modulo-03-backend/ejercicios.md)      |
| 4 — Frontend     | La interfaz del AI Spec Builder           | [→ Ver](./modulo-04-frontend/ejercicios.md)     |
| 5 — Deploy       | Tu herramienta en producción con Vercel   | [→ Ver](./modulo-05-deploy/ejercicios.md)       |
| 6 — Seguridad    | Protege tu app con IA                     | [→ Ver](./modulo-06-seguridad/ejercicios.md)    |

---

## Cheatsheets

### Claude Code Commands

Referencia rápida de los comandos y patterns de Claude Code que más vas a usar durante el curso.

[→ Ver cheatsheet](./cheatsheets/cheatsheet-claude-code.pdf)

---

## App de demo: Gastos de Viaje

La app que usamos en el curso para practicar el **retrofit con IA** — tomar una app existente sin spec y aplicarle el método Spec-First.

Registra gastos de grupo en un viaje, calcula cuánto debe cada persona y genera la lista mínima de transferencias para saldar las deudas.

**Stack:** React 19 + TypeScript + Vite + localStorage (sin backend, sin login)

[→ Ver demo](./demo/demo-retrofit-gastos/)

---

## El proyecto del curso: AI Spec Builder

Durante el curso construyes el **AI Spec Builder** — una herramienta web que genera especificaciones técnicas completas a partir de una descripción breve de tu idea de producto.

**Stack:** Next.js + React + Tailwind CSS + Anthropic SDK + Vercel

Repo del proyecto: [domini-code/ai-spec-builder](https://github.com/domini-code/ai-spec-builder)

---

## El libro del método

**Spec-Driven Development** — el libro que va más allá del curso.

Si el curso te enseña a construir un producto de cero con IA, el libro te da el método completo para trabajar así en cualquier proyecto: desde la feature que te pide tu jefe hasta la app que llevas meses queriendo sacar.

Sin método, la IA te produce código. Con método, te produce el software que necesitas.

[→ Consigue el libro](https://dominicode.com/spec-driven-development)

---

## Herramienta bonus: AI Workflow Kit

**AI Workflow Kit** — skills, agentes y hooks para trabajar con IA de forma consistente y profesional.

Lo instalas una vez con `npx ai-workflow-kit` y tienes disponible en Claude Code:

- `/ak:commit` — genera mensajes de commit semánticos leyendo el diff real
- `/ak:pr` — crea PRs con descripción, test plan y checklist
- `/ak:plan` — planifica antes de ejecutar tareas complejas
- `/ak:review` — revisa código con criterios reales de ingeniería
- `/ak:debug` — diagnóstico estructurado antes de proponer fixes
- `/ak:vibe-audit` — auditoría completa de apps generadas con vibe coding

También incluye hooks automáticos: bloqueo de comandos destructivos, detección de API keys antes de hacer commit, formateo automático tras cada edición.

Compatible con Claude Code, Cursor y GitHub Copilot.

[→ Ver repositorio](https://github.com/dominicode/ai-workflow-kit)

---

## Recursos adicionales

- [DominiCode](https://dominicode.com) — Blog, cursos y recursos

---

## Licencia

Los recursos de este repo son para uso personal de los estudiantes del curso. No redistribuir ni usar con fines comerciales sin permiso del autor.

---

_Bezael Pérez — DominiCode_
