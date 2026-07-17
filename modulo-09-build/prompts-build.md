# Prompts — Parte 1: Build del Feedback Analyzer (Videos 1-12)

Prompts literales del guión, tal como se piden en cada video, para construir la app base (sin auth, sin pagos, sin email) antes de convertirla en SaaS. Para la Parte 2 (SaaS), ver [modulo-09-sass/openspec-saas/](../modulo-09-sass/openspec-saas/).

---

## Video 2 — `/opsx:propose` inicial

Arranca el ciclo OpenSpec en el chat de Claude Code:

```bash
/opsx:propose Una app que clasifica feedback de usuarios en categorías
accionables — bugs, feature requests, elogios, pain points — y muestra
los resultados como cards filtrables.
```

---

## Video 4 — CLAUDE.md de referencia

No es un prompt — es el archivo que le da contexto a Claude Code para todo lo que sigue. Créalo a mano en la raíz del proyecto antes del Video 5:

```markdown
# AI Feedback Analyzer

## Propósito

App web que clasifica feedback de usuarios (reviews, tweets, tickets, encuestas)
en categorías accionables y muestra los resultados como cards filtrables.

## Stack

- Next.js 16 (App Router)
- Anthropic SDK (clasificación con Claude)
- TypeScript

## Contrato de API — POST /api/analyze-feedback

Request:
{ "feedback": "string con uno o varios items separados por salto de línea" }

Response:
{
"items": [
{ "text": "string", "category": "bug|feature_request|elogio|pain_point|no_clasificable", "sentiment": "positive|negative|neutral" }
],
"summary": {
"total": number,
"by_category": { "bug": n, "feature_request": n, "elogio": n, "pain_point": n, "no_clasificable": n },
"overall_sentiment": "positive|negative|neutral|mixed"
}
}

## Reglas de clasificación

- Cada item va a exactamente una categoría — no a varias
- no_clasificable es la salida para feedback ambiguo o irrelevante
- El endpoint devuelve SIEMPRE el mismo schema, independientemente del número de items
```

---

## Video 5 — Tipos TypeScript

```
Genera los tipos TypeScript para AnalyzeFeedbackResponse siguiendo el schema del CLAUDE.md
```

Resultado esperado:

```typescript
type FeedbackCategory = 'bug' | 'feature_request' | 'elogio' | 'pain_point' | 'no_clasificable';
type Sentiment = 'positive' | 'negative' | 'neutral';

interface FeedbackItem {
  text: string;
  category: FeedbackCategory;
  sentiment: Sentiment;
}

interface FeedbackSummary {
  total: number;
  by_category: Record<FeedbackCategory, number>;
  overall_sentiment: Sentiment;
}

interface AnalyzeFeedbackResponse {
  items: FeedbackItem[];
  summary: FeedbackSummary;
}
```

---

## Video 6 — System prompt del clasificador

```
Escribe el system prompt para el clasificador de feedback. Debe:
- Definir el rol: eres un clasificador de feedback de producto
- Definir las 5 categorías con descripción y ejemplo de cada una:
  bug, feature_request, elogio, pain_point, no_clasificable
- Regla de exclusividad: cada item va a exactamente una categoría
- Regla de ambigüedad: si puede ser varias, elige la más prominente
- Regla de formato: responde ÚNICAMENTE con JSON válido siguiendo
  el schema del CLAUDE.md. Sin texto antes ni después del JSON.
```

Resultado esperado:

```
Eres un clasificador de feedback de producto. Tu única función es analizar
el texto que recibas y clasificar cada item en exactamente una de estas categorías:

- bug: el usuario reporta algo que no funciona, falla o produce un error
  Ejemplo: "La app se cierra al guardar", "El botón de exportar no hace nada"

- feature_request: el usuario pide una funcionalidad que no existe
  Ejemplo: "Necesito exportar a PDF", "Sería útil tener modo oscuro"

- elogio: el usuario expresa satisfacción o valora positivamente algo
  Ejemplo: "Me encanta el diseño", "El proceso de registro es muy fácil"

- pain_point: el usuario describe fricción o dificultad sin reportar un bug ni pedir una feature
  Ejemplo: "Es muy lento cargar los datos", "Tarda demasiado en responder"

- no_clasificable: el item es spam, irrelevante, ambiguo o no contiene feedback accionable
  Ejemplo: "hola", "no sé", "123"

REGLAS:
1. Cada item va a exactamente una categoría. Si puede ser varias, elige la más prominente.
2. Clasifica cada ítem por separado, incluso si el input tiene varios en el mismo texto.
3. Responde ÚNICAMENTE con JSON válido siguiendo este schema exacto. Sin texto antes ni después:
{
  "items": [{ "text": "texto original", "category": "categoría", "sentiment": "positive|negative|neutral" }],
  "summary": { "total": N, "by_category": {...}, "overall_sentiment": "positive|negative|neutral|mixed" }
}
```

---

## Video 7 — API route `POST /api/analyze-feedback`

```
Crea la API route POST /api/analyze-feedback. Debe:
- Recibir { feedback: string } en el body
- Validar que feedback tiene entre 10 y 5000 caracteres — si no, devolver 400
- Llamar a Claude con el system prompt del clasificador y el feedback como mensaje de usuario
- Parsear el JSON del response con JSON.parse() dentro de un try/catch
- Si el parse falla, devolver 500 con mensaje "Respuesta inválida del clasificador"
- Devolver AnalyzeFeedbackResponse con status 200
Usa el tipo AnalyzeFeedbackResponse que acabamos de definir.
```

---

## Video 9 — `FeedbackInput.tsx`

```
Crea el componente FeedbackInput.tsx. Necesito:
- Textarea grande (mínimo 200px de alto) con este placeholder exacto:
  "Pega aquí el feedback de tus usuarios — reviews, tweets, tickets de soporte,
  respuestas de encuestas. Separa cada item con un salto de línea."
- Contador de caracteres en tiempo real bajo el textarea (ej: "342 / 5000")
- Botón "Analizar feedback" que se deshabilita si el textarea está vacío o durante la carga
- Estado de carga: spinner + texto "Clasificando..." mientras espera la respuesta
- Props: onAnalyze(feedback: string) => void, isLoading: boolean
```

## Video 9 — `FeedbackSummary.tsx`

```
Crea el componente FeedbackSummary.tsx. Recibe el objeto summary de AnalyzeFeedbackResponse.
Muestra:
- Total de items analizados (número grande)
- Un chip por cada categoría con su conteo: rojo (bug), azul (feature_request),
  verde (elogio), naranja (pain_point), gris (no_clasificable)
- El sentiment general con color: verde (positive), rojo (negative),
  amarillo (neutral), morado (mixed)
Solo se renderiza si summary no es null.
```

---

## Video 10 — `FeedbackCard.tsx`

```
Crea el componente FeedbackCard.tsx. Recibe un FeedbackItem.
Muestra:
- El texto original del feedback
- Badge de categoría con estos colores: bug=rojo, feature_request=azul,
  elogio=verde, pain_point=naranja, no_clasificable=gris
- Icono o etiqueta de sentiment: positive=👍, negative=👎, neutral=➖
Estilo: tarjeta con borde sutil, padding generoso, hover con sombra ligera.
```

## Video 10 — `FeedbackGrid.tsx`

```
Crea el componente FeedbackGrid.tsx. Recibe items: FeedbackItem[] y activeFilter: string | null.
Filtra los items según activeFilter (si es null, muestra todos).
Grid responsive: 1 columna en móvil, 2 en tablet, 3 en desktop.
Muestra un mensaje "No hay items en esta categoría" si el filtro no devuelve resultados.
```

---

## Video 11 — `CategoryFilter.tsx`

```
Crea el componente CategoryFilter.tsx. Recibe summary: FeedbackSummary y
onFilter(category: string | null) => void.
Botones: Todos · Bugs (N) · Features (N) · Elogios (N) · Pain Points (N) · No clasificables (N)
donde N es el conteo de esa categoría del summary.
El botón activo se resalta con el color de su categoría.
Al hacer click en un botón ya activo, vuelve a "Todos" (limpia el filtro).
```

---

Recurso del curso **Construye con IA: De la Idea al Producto con Claude** — [DominiCode](https://www.dominicode.com/spec-driven-development)
