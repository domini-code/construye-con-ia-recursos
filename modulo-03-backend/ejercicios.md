# Ejercicios Módulo 3 — Backend: El Motor de Specs

**Recurso descargable del curso "Construye con IA: De la Idea al Producto con Claude"**

---

## Ejercicio 1 — Prueba tu propio endpoint
**Dificultad:** Básico
**Tiempo estimado:** 10 minutos

Usa el endpoint que acabas de construir para generar especificaciones de 3 ideas de producto propias.

**Instrucciones:**
1. Asegúrate de que el servidor está corriendo (`npm run dev`)
2. Usa Claude Code para generar el comando curl con tu idea de producto
3. Ejecuta el comando y revisa la spec generada
4. Repite con 2 ideas más

**Para cada spec generada, evalúa:**
- [ ] ¿La visión describe claramente el producto?
- [ ] ¿Los usuarios y casos de uso son realistas?
- [ ] ¿Las funcionalidades usan el formato "El usuario puede..." / "El sistema permite..."?
- [ ] ¿Los flujos incluyen pasos numerados Y flujo de error?
- [ ] ¿La arquitectura sugiere tecnologías concretas?
- [ ] ¿Los requisitos incluyen lo que está fuera del alcance?

**Reflexión:** ¿Alguna idea genera una spec notablemente mejor o peor que las otras? ¿Por qué crees que es?

---

## Ejercicio 2 — Modifica el prompt del sistema
**Dificultad:** Intermedio
**Tiempo estimado:** 15 minutos

El prompt del sistema actual genera specs con 6 secciones. Vamos a personalizarlo.

**Opción A — Añade una 7a sección:**
Pide a Claude Code que modifique el prompt del sistema para añadir una sección extra: **"Plan de MVP"** — que defina las funcionalidades mínimas para una primera versión lanzable.

**Opción B — Cambia el tono:**
Pide a Claude Code que modifique el prompt para que las specs se generen en un tono más conversacional y menos técnico — pensado para mostrarle la spec a un inversor, no a un desarrollador.

**Instrucciones:**
1. Abre Claude Code en tu proyecto
2. Describe el cambio que quieres hacer al prompt del sistema
3. Prueba con una idea de producto
4. Compara el resultado con la versión anterior: ¿qué mejoró? ¿qué se perdió?

**Reflexión:** ¿Cómo cambia la calidad del output cuando cambias las instrucciones? ¿Qué te dice esto sobre la importancia de especificar bien?

---

## Ejercicio 3 — Diagnostica un prompt roto
**Dificultad:** Avanzado
**Tiempo estimado:** 15 minutos

Aquí tienes un prompt del sistema con problemas. Identifica qué está mal y corrígelo.

```
Eres un asistente. Genera una especificación para el producto que el usuario describa.
Responde en el formato que prefieras.
```

**Problemas a identificar:**
1. ¿Qué le falta al rol?
2. ¿Qué pasa cuando dices "el formato que prefieras"?
3. ¿Hay instrucciones sobre las secciones de la spec?
4. ¿Hay restricciones sobre lo que NO debe hacer?
5. ¿Hay estándares de calidad mínimos?

**Instrucciones:**
1. Lista los problemas que encuentras (intenta encontrar al menos 4)
2. Reescribe el prompt corrigiendo todos los problemas
3. Pide a Claude Code que actualice el prompt del sistema con tu versión
4. Prueba tu versión y compara con el prompt del curso

**Reflexión:** ¿Cuántos de los problemas habrías detectado antes del Módulo 1? El método spec-first no solo sirve para productos — sirve para cualquier instrucción que le des a una IA.

---

## Ejercicio Bonus — Aplica a tu proyecto paralelo
**Dificultad:** Variable
**Tiempo estimado:** 20 minutos

Si estás construyendo tu propio proyecto a lo largo del curso:

1. Genera la spec de tu proyecto usando el endpoint que acabas de construir
2. Revísala sección por sección: ¿es útil? ¿le falta algo?
3. Compara con la spec que escribiste manualmente en el Módulo 1
4. ¿Qué encontró la herramienta que tú no habías pensado?
5. ¿Qué escribiste tú que la herramienta no capturó bien?

**La herramienta que construiste acaba de generar una spec para tu propio proyecto. Eso es meta al cuadrado.**

---

*Recurso del curso "Construye con IA: De la Idea al Producto con Claude y Specs"*
