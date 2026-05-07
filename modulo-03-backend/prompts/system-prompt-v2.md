# Prompt — Iteración 2: Ajustes finales al SYSTEM_PROMPT

**Módulo:** 03 — Backend: Motor de Specs
**Tipo:** Prompt de iteración (se le da a Claude para mejorar `lib/prompts.ts`)

---

## Prompt

```
Dos ajustes finales al SYSTEM_PROMPT:

1. El wrapper spec sigue apareciendo. Añade esta instrucción de forma aislada y explícita al final del prompt, separada del resto:

   IMPORTANT: Return the JSON object directly. Do NOT wrap it in any parent key like spec, data, result or any other wrapper. The root of your response must be the JSON object itself.

2. flows debe cambiar de array de strings a array de objetos con esta forma exacta:
   { name: string, steps: string[], error_path: string }

   steps son los pasos del camino feliz en orden.
   error_path describe qué ocurre si el flujo falla.

   Actualiza el ejemplo del JSON en el prompt.
```

---

## Cuándo usarlo

Después de aplicar la iteración 1. Resuelve el problema del wrapper `spec` que Claude tiende a añadir, y reestructura `flows` para que cada flujo tenga nombre, pasos y manejo de error por separado.
