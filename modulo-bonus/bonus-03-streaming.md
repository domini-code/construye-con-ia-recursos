# Bonus 3 — Streaming de respuesta en tiempo real

**Lección 24 del curso** · Proyecto: [AI Spec Builder](https://github.com/domini-code/ai-spec-builder)

El usuario escribe su idea, hace clic en "Generar spec" y espera 10-15 segundos en silencio. Luego aparece todo de golpe.

El problema no es la velocidad — es la percepción de inactividad.

Este es el cambio más técnico del Bonus: toca prompt, backend y frontend.

---

## 1. Prompt de mini-spec

```
Tengo el AI Spec Builder: una app que genera specs técnicas completas para proyectos nuevos.
Ya tiene implementado exportar la spec como Markdown (Bonus 1) y como PDF (Bonus 2).

El flujo actual: el usuario hace clic en "Generar spec" y espera 10-15 segundos en silencio
hasta que el texto aparece todo de golpe. El problema no es la velocidad — es la percepción
de inactividad.

Quiero añadir streaming de respuesta: que el texto aparezca token a token mientras Claude
lo genera, como en claude.ai.

Genera una mini-spec con exactamente estos 4 campos:
- Qué hace
- Por qué
- Criterios de aceptación (lista de checkboxes)
- No incluye

Contexto adicional:
- La API route actual llama a Anthropic sin streaming y devuelve el JSON completo
- El frontend renderiza el output después de recibir la respuesta completa
- La spec final tiene estructura JSON — los criterios deben garantizar que el streaming
  no rompe esa estructura al finalizar
- Los botones de exportar (Markdown y PDF) deben seguir funcionando sobre el output

Sé específico y conciso. El campo "No incluye" es tan importante como los criterios — protege el scope.
```

> Cuanto más técnico es el cambio, más contexto técnico necesita el prompt. Aquí le decimos explícitamente cómo funciona la API route hoy y qué debe seguir funcionando mañana.

---

## La decisión de diseño (antes del plan)

Hay un problema que no es obvio: si haces streaming del JSON, el usuario ve `{"sections":[{` antes de ver contenido útil. Feo e inútil.

**La solución que usamos:** pedirle a Claude que responda en **Markdown** durante el stream. El usuario ve texto legible creciendo en tiempo real. Cuando el stream termina, convertimos ese Markdown al JSON que la app ya usa.

Ventajas: sin librerías extra, el cambio es visible, y los botones de exportar siguen funcionando porque se alimentan del JSON final, no del stream.

---

## 2. Prompt de plan mode

```
Lee la feature "Streaming de respuesta en tiempo real" en project-spec.md.

Decisión de diseño ya tomada: el stream usará formato Markdown, no JSON.
El flujo es:
1. La API route llama a Anthropic con stream: true y un prompt que pide la respuesta en Markdown
   con estas secciones: ## Qué hace, ## Para quién, ## Funcionalidades principales,
   ## Flujos clave, ## Stack técnico, ## Lo que NO incluye
2. El frontend muestra el texto Markdown creciendo en tiempo real mientras llegan los chunks
3. Cuando el stream termina, una función parseMdToSpec() convierte el Markdown al objeto JSON
   que ya usa la app internamente (el mismo formato que antes)
4. Los botones de exportar (Markdown y PDF) se alimentan del JSON final — no del stream

Propón un plan de implementación paso a paso. No implementes todavía.

El plan debe describir exactamente:
1. Qué cambia en el prompt de la API route para pedir Markdown en lugar de JSON
2. Cómo se activa stream: true y cómo se envían los chunks al frontend
3. Qué cambia en el frontend para mostrar el texto Markdown en tiempo real
4. Cómo es la función parseMdToSpec() — qué regex o lógica usa para convertir las secciones
5. Qué archivos toca y en qué orden
6. Qué hay que verificar para que los botones de exportar no se vean afectados
```

Al revisar el plan, mira sobre todo `parseMdToSpec()`: **¿cómo separa las secciones? ¿usa los H2 como delimitadores?** Ahí es donde se rompe todo si está mal.

---

## 3. Validación

- Antes vs después: el estado sin streaming, luego con streaming. La app se siente distinta
- El texto crece token a token ✓
- La estructura de la spec sigue siendo correcta al finalizar ✓
- Los botones de exportar siguen funcionando sobre el output del streaming ✓

---

## 4. Commit

```
feat: implement streaming response for spec generation
```
