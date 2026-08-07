# BONUS — Evoluciona tu App

Prompts literales de los vídeos del Bonus (lecciones 22–28 del curso).

Cada vídeo del Bonus aplica el mismo ciclo. No es "cómo añadir la feature X" — es el método en bucle:

1. **Mini-spec primero** — antes de pedirle nada a Claude Code
2. **Plan mode** — Claude propone, tú revisas, tú apruebas
3. **Implementación** — Claude Code ejecuta
4. **Validación** — recorres los criterios de aceptación uno a uno
5. **Regresión** — verificas que lo anterior sigue funcionando
6. **Commit y deploy**

---

## Índice

| Lección | Vídeo | Prompts |
| ------- | ----- | ------- |
| 22 | Bonus 1 — Exportar la spec como archivo Markdown | [→ Ver](./bonus-01-export-markdown.md) |
| 23 | Bonus 2 — Exportar la spec como PDF | [→ Ver](./bonus-02-export-pdf.md) |
| 24 | Bonus 3 — Streaming de respuesta en tiempo real | [→ Ver](./bonus-03-streaming.md) |
| 25 | Bonus 4 — Historial de specs generadas | [→ Ver](./bonus-04-historial.md) |
| 26 | Bonus 5 — Login con autenticación | [→ Ver](./bonus-05-login.md) |
| 27 | Bonus 6 — Retrofit: aplica el método a un proyecto que ya existe | [→ Ver](./bonus-06-retrofit.md) |
| 28 | Bonus 7 — Home page y acceso protegido | [→ Ver](./bonus-07-home-page.md) |

---

## Dos tipos de prompt

En estos vídeos usamos dos herramientas distintas, y conviene no confundirlas:

- **Prompt de mini-spec** → va en el **chat de Claude** (claude.ai), no en Claude Code. Sirve para redactar el borrador de la mini-spec, que luego ajustas tú y pegas en `project-spec.md`.
- **Prompt de plan mode** → va en **Claude Code**, dentro del proyecto. Siempre termina con *"No implementes todavía"*.

El orden importa: primero escribes la mini-spec, después pides el plan. Nunca al revés.

---

## La app del vídeo 27

El retrofit se practica sobre una app real que está en este mismo repo:

```
demo/demo-retrofit-gastos/
```

Es un tracker de gastos para viajes en grupo (React 19 + TypeScript + Vite, localStorage, sin backend).

**Importante:** la carpeta incluye `SPEC.md` y `CLAUDE.md`, que son **el resultado** del vídeo. Si quieres hacer el ejercicio de verdad, bórralos antes de empezar y genéralos tú con los prompts de [bonus-06-retrofit.md](./bonus-06-retrofit.md).

---

_Bezael Pérez — DominiCode_
