# Prompt — Iteración 1: Mejorar el SYSTEM_PROMPT

**Módulo:** 03 — Backend: Motor de Specs
**Tipo:** Prompt de iteración (se le da a Claude para mejorar `lib/prompts.ts`)

---

## Prompt

```
Mejora el SYSTEM_PROMPT en lib/prompts.ts con estos cambios:

1. Deja explícito que la respuesta debe ser el JSON directamente, sin ningún objeto wrapper — no { spec: {...} }, sino { vision: ..., users: ..., features: ..., flows: ..., architecture: ..., requirements: ... } directamente.

2. features debe ser un array de strings, no un string. Cada item en formato 'El usuario puede...' o 'El sistema permite...'. Entre 5 y 8 items máximo.

3. flows debe ser un array de strings, entre 3 y 5 flujos principales.

4. Los campos vision, users, architecture y requirements deben ser strings de 2-4 oraciones — no de 1 línea ni de 10.
```

---

## Cuándo usarlo

Después de tener el system prompt inicial funcionando. Esta iteración refina el formato del output: convierte `features` y `flows` en arrays y define la longitud esperada de cada campo.
