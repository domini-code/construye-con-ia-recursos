# Prompt: Crear el CLAUDE.md del proyecto

**Módulo:** 01 — El Método Spec-First
**Contexto:** Se usa al iniciar un proyecto nuevo, después de tener la spec lista.

---

## Prompt

```
Crea un archivo CLAUDE.md para este proyecto. La visión es [pegar visión de la spec]. El stack es Next.js 16 + React + Tailwind + Anthropic SDK. Deploy en Vercel. No hay autenticación ni base de datos.
El código se escribe en inglés, los comentarios en español.
```

---

## Variables a reemplazar

- `[pegar visión de la spec]` — copia el campo "visión" de tu especificación técnica

## Cuándo usarlo

Al arrancar el proyecto en Claude Code. El CLAUDE.md resultante actúa como memoria permanente: define stack, convenciones y restricciones para todas las sesiones siguientes.
