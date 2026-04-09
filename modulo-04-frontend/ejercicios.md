# Ejercicios Módulo 4 — Frontend: La Interfaz

**Recurso descargable del curso "Construye con IA: De la Idea al Producto con Claude"**

---

## Antes de empezar

Este módulo cubre 3 videos:

- **Video 15** — La pantalla de input: el formulario donde el usuario escribe su idea
- **Video 16** — La pantalla de output: donde aparece la especificación generada
- **Video 17** — Conectar, pulir y probar el producto completo

Los ejercicios están organizados por video. Puedes hacerlos en orden o elegir el que más te interese.

**Prerequisito:** el servidor debe estar corriendo (`npm run dev`) y el endpoint `/api/generate-spec` del Módulo 3 debe funcionar correctamente.

---

## Ejercicio 1 — Personaliza la pantalla de input
**Corresponde a:** Video 15
**Dificultad:** Básico
**Tiempo estimado:** 15 minutos

Usa Claude Code para cambiar el aspecto visual del formulario. Elige al menos 3 cambios de esta lista y aplícalos:

- [ ] Cambiar el texto del placeholder del textarea a algo más personal o específico para tu tipo de usuario
- [ ] Cambiar el color del botón "Generar especificación" (ej: azul oscuro, verde, naranja)
- [ ] Cambiar la tipografía del título "AI Spec Builder"
- [ ] Modificar el subtítulo para que describa mejor lo que hace la herramienta
- [ ] Hacer el textarea más alto o más ancho
- [ ] Cambiar el color de fondo de la página
- [ ] Cambiar el mensaje de error por uno más amigable
- [ ] Cambiar el texto del spinner de "Generando..." a algo diferente

**Instrucciones:**
1. Abre Claude Code en tu proyecto
2. Describe cada cambio en lenguaje natural, por ejemplo:
   - "Cambia el placeholder del textarea a: 'Describe el producto que quieres construir. Por ejemplo: una app para que nutricionistas gestionen sus clientes'"
   - "Cambia el color del botón a verde oscuro, que se vea profesional"
3. Verifica cada cambio en el navegador antes de pasar al siguiente
4. Si el resultado no te convence, pide a Claude Code que lo ajuste

**Reflexión:** ¿Cuántos de estos cambios podrías hacer sin saber CSS? Con Claude Code, la respuesta es "todos". Tu trabajo es saber QUÉ quieres, no CÓMO implementarlo.

---

## Ejercicio 2 — Añade una funcionalidad nueva a la pantalla de input
**Corresponde a:** Video 15
**Dificultad:** Intermedio
**Tiempo estimado:** 20 minutos

Elige UNA de estas funcionalidades y pide a Claude Code que la implemente. Antes de pedirlo, escribe una mini-spec de la funcionalidad.

**Opción A — Contador de caracteres:**
Añade un contador debajo del textarea que muestre "X / 500 caracteres" y cambie a rojo cuando se acerque al límite.

**Opción B — Ejemplos predefinidos:**
Añade 3 botones debajo del textarea con ideas de producto de ejemplo. Al hacer clic en uno, rellena el textarea automáticamente con esa idea.

**Opción C — Indicador de calidad del input:**
Añade un mensaje dinámico debajo del textarea que cambie según la longitud del texto: "Muy corto — describe más tu idea" (menos de 30 caracteres) / "Buena descripción" (30-100 caracteres) / "Descripción detallada — esto generará una spec más completa" (más de 100 caracteres).

**Instrucciones:**
1. Antes de pedir a Claude Code que implemente la funcionalidad, escribe tu mini-spec aquí:

```
Funcionalidad: ____________________________

¿Qué hace exactamente?


¿Dónde aparece en la interfaz?


¿Cómo se comporta cuando el usuario interactúa?


¿Qué pasa en el caso de error o estado vacío?

```

2. Pide a Claude Code que la implemente basándose en tu descripción
3. Prueba en el navegador
4. Si algo no funciona como esperabas, ¿fue un problema de tu descripción o de la implementación de Claude Code?

**Reflexión:** ¿Notas cómo escribir la mini-spec antes de implementar mejoró el resultado? Ese es el método spec-first aplicado a una funcionalidad individual — funciona igual de bien a cualquier escala.

---

## Ejercicio 3 — Explora el componente SpecOutput
**Corresponde a:** Video 16
**Dificultad:** Básico
**Tiempo estimado:** 15 minutos

Genera specs de 3 ideas de producto completamente diferentes y compara cómo se muestran en la pantalla de output.

**Ideas sugeridas (o usa las tuyas):**
- Una app de productividad para estudiantes universitarios
- Un marketplace para artesanos locales
- Una herramienta de análisis de redes sociales para pequeñas empresas

**Para cada spec generada, evalúa la pantalla de output:**

| Criterio | Idea 1 | Idea 2 | Idea 3 |
|---|---|---|---|
| ¿La sección Visión describe bien el producto? | ✓ / ✗ | ✓ / ✗ | ✓ / ✗ |
| ¿Los Usuarios son realistas? | ✓ / ✗ | ✓ / ✗ | ✓ / ✗ |
| ¿Las Funcionalidades están bien organizadas? | ✓ / ✗ | ✓ / ✗ | ✓ / ✗ |
| ¿Los Flujos incluyen flujo de error? | ✓ / ✗ | ✓ / ✗ | ✓ / ✗ |
| ¿La Arquitectura propone tecnologías concretas? | ✓ / ✗ | ✓ / ✗ | ✓ / ✗ |
| ¿El botón "Copiar" funciona? | ✓ / ✗ | ✓ / ✗ | ✓ / ✗ |

**Reflexión:** ¿Alguna sección de la pantalla de output es difícil de leer o está mal presentada para algún tipo de idea? Si es así, ¿cómo lo arreglarías?

---

## Ejercicio 4 — Personaliza la pantalla de output
**Corresponde a:** Video 16
**Dificultad:** Intermedio
**Tiempo estimado:** 20 minutos

Elige al menos 2 cambios visuales en `SpecOutput.tsx` y aplícalos con Claude Code:

- [ ] Cambiar el icono o color de una sección (ej: hacer la sección "Visión" con fondo diferente)
- [ ] Cambiar el texto del botón "Copiar especificación completa" por otro que prefieras
- [ ] Añadir el mensaje "¡Copiado!" en un color más visible
- [ ] Cambiar el estilo de los "pasos numerados" en la sección Flujos
- [ ] Añadir un botón "Descargar como .txt" que descargue la spec como archivo de texto
- [ ] Cambiar el estado vacío ("Tu especificación aparecerá aquí") por un mensaje más motivador

**Instrucciones:**
1. Identifica en la interfaz el cambio que quieres hacer
2. Describe el cambio a Claude Code con precisión: qué elemento, qué cambio, cómo debe verse
3. Verifica en el navegador
4. Si el cambio afecta la legibilidad o la usabilidad, considera si realmente vale la pena

**Reflexión:** La pantalla de output tiene muchas secciones con información. ¿Qué cambio mejoraría más la experiencia del usuario final — alguien que acaba de generar su primera spec y no sabe qué hacer con ella?

---

## Ejercicio 5 — Revisión y decisiones de producto
**Corresponde a:** Video 17
**Dificultad:** Avanzado
**Tiempo estimado:** 20 minutos

Pide a Claude Code que analice el frontend completo y te dé una lista de sugerencias de mejora. Luego toma decisiones fundamentadas sobre cuáles implementar.

**Instrucciones:**
1. Usa este prompt con Claude Code:

   > "Analiza todos los componentes del frontend (page.tsx, SpecForm.tsx, SpecOutput.tsx). Para cada archivo, dime: qué hace bien, qué podría mejorar en términos de usabilidad y experiencia de usuario. Dame la lista de sugerencias sin implementar nada todavía."

2. Lee la revisión completa
3. Para cada sugerencia, decide: ¿la implemento o no? Completa la tabla:

| Sugerencia de Claude Code | ¿Implementar? | Razón |
|---|---|---|
| | Sí / No | |
| | Sí / No | |
| | Sí / No | |
| | Sí / No | |
| | Sí / No | |

4. Pide a Claude Code que implemente solo las que decidiste implementar
5. Verifica los cambios en el navegador

**Reflexión:** Dirigir un producto con IA no es aceptar todo lo que propone. Es evaluar cada sugerencia contra tus objetivos y tomar decisiones informadas. ¿Cuántas sugerencias aceptaste? ¿Por qué rechazaste las otras?

---

## Ejercicio 6 — Prueba el flujo completo como usuario
**Corresponde a:** Video 17
**Dificultad:** Básico
**Tiempo estimado:** 15 minutos

Cierra VS Code y el terminal de Claude Code. Abre el navegador en `localhost:3000` y usa el AI Spec Builder como si fuera la primera vez.

**Prueba con estas 3 ideas de producto:**

1. Una idea de producto que tú mismo querrías construir algún día
2. Una idea técnica (API, herramienta para developers, automatización)
3. Una idea de negocio no técnica (tienda, servicio, marketplace)

**Para cada idea, evalúa la experiencia:**

| Pregunta | Idea 1 | Idea 2 | Idea 3 |
|---|---|---|---|
| ¿El formulario es claro? | ✓ / ✗ | ✓ / ✗ | ✓ / ✗ |
| ¿El spinner indica que algo está pasando? | ✓ / ✗ | ✓ / ✗ | ✓ / ✗ |
| ¿La spec generada es útil? | ✓ / ✗ | ✓ / ✗ | ✓ / ✗ |
| ¿Las 6 secciones son fáciles de leer? | ✓ / ✗ | ✓ / ✗ | ✓ / ✗ |
| ¿El botón "Copiar" funciona bien? | ✓ / ✗ | ✓ / ✗ | ✓ / ✗ |
| ¿El botón "Nueva especificación" funciona? | ✓ / ✗ | ✓ / ✗ | ✓ / ✗ |

**Si encuentras algo que no funciona bien:** regresa a Claude Code y describe el problema en lenguaje natural. "El texto de la sección Requisitos se corta en móvil" es suficiente — Claude Code lo resolverá.

**Reflexión:** ¿Hay algo que mejorarías si tuvieras que mostrarle este producto a alguien que no sabe que lo construiste con IA?

---

## Ejercicio Bonus — Aplica a tu proyecto paralelo
**Dificultad:** Variable
**Tiempo estimado:** 30-45 minutos

Si estás construyendo tu propio proyecto a lo largo del curso, ahora tienes los conocimientos para construir su frontend.

**Pasos:**
1. Recupera la spec de tu proyecto que creaste en el Módulo 1
2. Identifica cuál es el componente de input principal de tu producto (¿qué hace el usuario para iniciar la acción principal?)
3. Pide a Claude Code que cree ese componente: describe el textarea, los botones, los estados de carga y error
4. Integra el componente en tu `page.tsx`
5. Verifica que se ve bien en el navegador (no necesitas backend todavía — puedes usar un mock)

**Prompt base para empezar:**

```
Basándote en esta spec: [pega aquí tu spec del Módulo 1],
crea el componente principal de input para mi proyecto.
El componente debe: [describe lo que el usuario necesita hacer].
Usa Tailwind CSS para los estilos.
El componente debe llamar a una función onResult cuando el usuario complete la acción.
```

**No necesitas un backend todavía** — el frontend es el primer paso. El backend vendrá cuando apliques lo del Módulo 3 a tu proyecto.

**Reflexión:** Llevas 4 módulos construyendo. ¿Qué parte del proceso (spec, backend, frontend) fue la que más te sorprendió? ¿Cuál fue la que más te costó?

---

*Recurso del curso "Construye con IA: De la Idea al Producto con Claude"* · [dominicode.com](https://dominicode.com)
