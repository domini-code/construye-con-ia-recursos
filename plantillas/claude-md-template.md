# CLAUDE.md — Plantilla para tu Proyecto

> Copia este archivo a la raíz de tu proyecto como `CLAUDE.md` y rellena cada sección.
> Claude Code lo leerá automáticamente al arrancar — es la memoria permanente de tu proyecto.

---

# [Nombre del Proyecto]

## Visión del producto

[1-2 oraciones: qué es, para quién, qué problema resuelve]

---

## Stack técnico

- **Framework:** [ej: Next.js 15 + React 19 + TypeScript]
- **Estilos:** [ej: Tailwind CSS]
- **Backend:** [ej: API Routes de Next.js / Express / etc.]
- **Base de datos:** [ej: Supabase / ninguna / SQLite]
- **IA:** [ej: Anthropic SDK — modelo claude-opus-4-6]
- **Deploy:** [ej: Vercel]

---

## Estructura del proyecto

```
[carpeta-raíz]/
├── app/
│   ├── page.tsx              → [descripción]
│   └── api/
│       └── [endpoint]/
│           └── route.ts      → [descripción]
├── components/
│   └── [Componente].tsx      → [descripción]
├── lib/
│   └── [archivo].ts          → [descripción]
└── types/
    └── [tipos].ts            → [descripción]
```

---

## Convenciones

- [ej: Componentes del cliente llevan `"use client"` al inicio]
- [ej: Tailwind para todos los estilos — sin CSS inline]
- [ej: Todos los textos de la UI en español]
- [ej: Errores devueltos con `{ error: string }` y código HTTP apropiado]

---

## Variables de entorno necesarias

```
[VARIABLE_NAME]=...           → [para qué sirve]
```

---

## Restricciones — Lo que NO hacer

- [ej: No exponer API keys en el frontend]
- [ej: No añadir autenticación — es una herramienta pública]
- [ej: No cambiar el stack sin consultar]
- [ej: No instalar librerías sin verificar que no hay alternativa nativa]

---

## Estado actual

**Fase:** [Especificación / Inicialización / Backend / Frontend / Deploy]

**Completado:**
- [x] [cosa completada]

**Pendiente:**
- [ ] [próximo paso]
- [ ] [siguiente paso]

---

*CLAUDE.md del proyecto [Nombre] — generado con el método spec-first*
