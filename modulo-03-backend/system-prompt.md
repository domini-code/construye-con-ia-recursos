# System Prompt — Módulo 3, Video 14

**Recurso descargable del curso "Construye con IA: De la Idea al Producto con Claude y Specs"**

En el Video 14 (_"El prompt del sistema: el corazón del generador"_) partimos del `SYSTEM_PROMPT` que Claude Code auto-generó en el Video 13 y lo mejoramos con **dos iteraciones**. Este archivo contiene:

1. Los dos prompts exactos que usamos con Claude Code para mejorar el `SYSTEM_PROMPT`.
2. El `SYSTEM_PROMPT` final al que llegamos — como referencia/backup por si tu iteración no produce exactamente el mismo resultado.

Úsalos dentro del proyecto **AI Spec Builder**, sobre el archivo `app/api/generate-spec/route.ts`.

---

## Iteración 1 — Tipos y extensión

**Pégalo en Claude Code dentro del proyecto:**

```
Mejora el SYSTEM_PROMPT en route.ts:

1) `features` debe ser un array de strings. Cada item en formato "El usuario puede..." o "El sistema permite...". Entre 5 y 8 items.
2) `flows` debe ser un array de strings, entre 3 y 5 flujos principales.
3) Los campos vision, users, architecture y requirements deben ser strings de 2-4 oraciones — no de 1 línea ni de 10.
4) Actualiza el ejemplo del JSON en el prompt para reflejar los nuevos tipos.
```

**Qué resuelve:** tipos de datos incorrectos (`features` y `flows` como string plano) y falta de control de extensión (respuestas de 1 línea o de 20 sin consistencia).

---

## Iteración 2 — Estructura de flujos

**Pégalo en Claude Code dentro del proyecto:**

```
Ajuste al SYSTEM_PROMPT: `flows` debe cambiar de array de strings a array de objetos con esta forma exacta: { name: string, steps: string[], error_path: string }. `steps` son los pasos del camino feliz en orden. `error_path` describe qué ocurre si el flujo falla. Entre 3 y 5 flujos. Actualiza el ejemplo del JSON.
```

**Qué resuelve:** flujos sin estructura — sin pasos numerados y sin flujo de error, por lo que la spec no servía como guía real para desarrollar.

---

## Wrapper inesperado — decisión de ingeniería

Tras las dos iteraciones queda un problema residual: a veces el modelo envuelve el JSON dentro de una key `spec`. En el video explicamos la regla práctica:

> Si llevas dos iteraciones intentando cambiar un comportamiento de formato y el modelo lo ignora, el problema ya no es el prompt — es cómo el modelo fue entrenado. La solución correcta es manejarlo en código.

**Prompt para Claude Code (normalización en el route handler):**

```
En el API route de generación de specs, después de parsear el JSON de respuesta, añade normalización del output: si el objeto tiene una propiedad `spec` que contiene las 6 keys esperadas, devuelve ese objeto interno en lugar del wrapper. Si ya tiene las 6 keys en el root, devuélvelo tal cual. Esto garantiza que el contrato de la API sea siempre consistente independientemente de cómo responda el modelo.
```

---

## `SYSTEM_PROMPT` final del Módulo 3 (referencia / backup)

Este es el resultado esperado después de aplicar las dos iteraciones. Úsalo como backup si tu versión iterada no queda igual — pero intenta llegar aquí haciendo las iteraciones tú mismo primero, porque el objetivo del video es que practiques el bucle de mejora.

> Las reglas de seguridad (prompt injection, tags `<user_idea>`, etc.) se añaden más adelante en el **Módulo 6 — Seguridad**. El prompt de abajo es el estado del Módulo 3.

```ts
const SYSTEM_PROMPT = `You are a senior software architect. Your ONLY task is to generate technical specifications in JSON format.

Given the product idea provided by the user, generate a complete technical specification as a JSON object.

IMPORTANT: Respond with the raw JSON object directly — no wrapper keys, no markdown fences, no extra text.
The root object must have exactly these 6 keys:

{
  "vision": "<string, 2-4 sentences describing the product vision, core purpose, and value proposition>",
  "users": "<string, 2-4 sentences describing the target users, their context, and their main pain points>",
  "features": [
    "El usuario puede ... (or El sistema permite ...)",
    "... between 5 and 8 items total ..."
  ],
  "flows": [
    {
      "name": "<short flow name>",
      "steps": ["Step 1", "Step 2", "Step 3"],
      "error_path": "<what happens if this flow fails>"
    }
  ],
  "architecture": "<string, 2-4 sentences describing the technical architecture, stack choices, and system design>",
  "requirements": "<string, 2-4 sentences covering the key functional and non-functional requirements>"
}

Rules:
- features: array of strings, 5–8 items, each starting with 'El usuario puede' or 'El sistema permite'.
- flows: array of objects, 3–5 items. Each object must have exactly: name (string), steps (array of strings with the happy-path steps in order), error_path (string describing what happens if the flow fails).
- vision, users, architecture, requirements: plain strings of exactly 2–4 sentences — not one line, not a long paragraph.
- Output only the JSON object. No wrapper object, no extra keys, no explanation.

IMPORTANT: Return the JSON object directly. Do NOT wrap it in any parent key like spec, data, result or any other wrapper. The root of your response must be the JSON object itself.`;
```

---

## Cómo usar este recurso

1. Abre Claude Code dentro de la raíz del proyecto **AI Spec Builder**.
2. Copia y pega el prompt de la **Iteración 1**. Revisa el diff que propone Claude Code antes de aceptar.
3. Prueba el endpoint con `curl` o desde la UI: confirma que `features` sale como array y que la extensión de `vision`/`users`/`architecture`/`requirements` es de 2–4 oraciones.
4. Copia y pega el prompt de la **Iteración 2**. Revisa el diff y prueba de nuevo: `flows` debe venir como array de objetos con `name`, `steps` y `error_path`.
5. Si todavía ves el wrapper `spec` de vez en cuando, aplica el prompt de **normalización en código**.
6. Compara tu `SYSTEM_PROMPT` resultante con el de referencia de arriba. No tienen que ser idénticos — deben cumplir el mismo contrato.

---

_Recurso del curso "Construye con IA: De la Idea al Producto con Claude y Specs"_
