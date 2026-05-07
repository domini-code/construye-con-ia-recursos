# Especificación Técnica — AI Spec Builder

_Construida aplicando el método spec-first — Recurso del curso "Construye con IA: De la Idea al Producto con Claude"_

---

## Sección 1 — Visión del Producto

**AI Spec Builder** es una herramienta web donde un emprendedor, founder o product manager escribe la descripción de su idea de producto y recibe automáticamente una especificación técnica completa estructurada en 6 secciones. Resuelve el problema central de quien quiere construir con IA pero no sabe cómo dar contexto estructurado: sin una buena especificación, Claude (y cualquier IA) produce resultados genéricos, inconsistentes y difíciles de iterar.

---

## Sección 2 — Usuarios y Casos de Uso

| Usuario | Descripción | Casos de uso |
|---|---|---|
| Emprendedor / Founder | Persona con una idea de producto que quiere construirla con IA sin experiencia técnica previa | 1. Escribe su idea en el textarea y obtiene una spec lista para usar con Claude Code 2. Comparte la spec generada con su equipo o colaboradores 3. Usa la spec como punto de partida para construir su producto con IA |
| Product Manager | Profesional que necesita documentar un producto rápidamente antes de involucrar al equipo técnico | 1. Genera una primera versión de la spec en minutos 2. La usa como borrador para refinar con su equipo 3. La exporta para usarla en su flujo de trabajo |

---

## Sección 3 — Funcionalidades

**Input:**
- El usuario puede escribir la descripción de su idea en un textarea (máximo 2000 caracteres)
- El sistema muestra un contador de caracteres restantes en tiempo real
- El usuario puede hacer clic en "Generar especificación" para iniciar el proceso
- El sistema valida que la descripción tenga al menos 20 caracteres antes de enviar

**Output:**
- El sistema genera una especificación estructurada en 6 secciones usando Claude
- El sistema muestra cada sección en una tarjeta con título, icono y contenido
- El usuario puede copiar toda la especificación al portapapeles con un clic
- El sistema muestra un spinner de carga mientras Claude procesa la solicitud

**Estados del sistema:**
- El sistema muestra un estado vacío en el panel derecho hasta que se genera la primera spec
- El sistema muestra un spinner centrado durante la generación
- El sistema muestra mensajes de error claros si algo falla (input inválido, rate limit, error de red)
- El sistema reemplaza la spec anterior al generar una nueva

**Fuera del alcance (v1):**
- No hay autenticación ni cuentas de usuario
- No hay historial de specs generadas
- No hay edición de las secciones generadas
- No hay múltiples idiomas (solo español)
- No hay base de datos ni persistencia

---

## Sección 4 — Flujos de Usuario

**Flujo principal — Generar una especificación:**
1. El usuario abre la aplicación → ve el layout de dos columnas: input a la izquierda, estado vacío a la derecha
2. El usuario escribe la descripción de su producto en el textarea
3. El usuario hace clic en "Generar especificación"
4. El sistema valida el input → si es válido, muestra el spinner en el panel derecho
5. Claude genera la especificación → el sistema recibe el JSON con las 6 secciones
6. El sistema renderiza las 6 tarjetas con animación de entrada
7. El usuario lee la especificación y hace clic en "Copiar todo"
8. El sistema copia la spec al portapapeles y muestra confirmación "✓ Copiado" durante 2 segundos

**Flujo de error — Input demasiado corto:**
1. El usuario escribe menos de 20 caracteres y hace clic en "Generar"
2. El sistema muestra debajo del textarea: "Añade más detalle sobre tu producto para obtener una mejor especificación."
3. No se realiza ninguna llamada a la API

**Flujo de error — Rate limit alcanzado:**
1. El usuario hace más de 10 solicitudes en un minuto
2. El sistema devuelve HTTP 429 y muestra: "Demasiadas solicitudes. Espera un minuto e inténtalo de nuevo."

**Flujo de error — Error de red o API:**
1. Si la llamada a Claude falla por cualquier motivo
2. El sistema muestra: "Error al generar la especificación. Inténtalo de nuevo."

---

## Sección 5 — Arquitectura

| Componente | Tecnología | Función |
|---|---|---|
| Frontend | Next.js 15 + React 19 + Tailwind CSS | UI de dos columnas: input y output de la spec |
| API Backend | API Routes de Next.js (Node.js) | Endpoint POST que valida input, aplica rate limiting y llama a Claude |
| IA | Anthropic SDK + claude-opus-4-6 | Genera la especificación en JSON con las 6 secciones |
| Deploy | Vercel | Deploy automático desde GitHub con variables de entorno |

**Flujo de datos:**
```
Usuario escribe descripción
  → SpecInput.tsx (validación client-side)
    → POST /api/generate-spec (validación server-side + rate limiting)
      → lib/claude.ts → Anthropic SDK → Claude
        → JSON con 6 secciones
      → NextResponse con { spec }
    → SpecOutput.tsx renderiza las 6 tarjetas
  → Usuario copia la spec
```

---

## Sección 6 — Requisitos No Funcionales

**Rendimiento:**
- La generación de la spec debe completarse en menos de 15 segundos
- La UI debe responder al input del usuario sin latencia perceptible

**Seguridad:**
- La API key de Anthropic nunca se expone al frontend (solo en variables de entorno del servidor)
- Rate limiting de 10 requests por IP por minuto para prevenir abuso
- Validación de longitud del input para prevenir prompts maliciosos (prompt injection)
- En producción, CORS configurado para permitir solo el dominio de la app

**Accesibilidad:**
- La interfaz funciona en desktop y móvil
- Compatible con Chrome, Firefox, Safari y Edge

**Escalabilidad:**
- Diseñada para uso individual o en demos — sin requisitos de alta concurrencia en v1
- El rate limiting es en memoria (sin Redis) — suficiente para el alcance del curso

**Fuera del alcance (v1):**
- No hay autenticación, base de datos ni historial
- No hay export a PDF ni Word (solo copiar al portapapeles)
- No hay múltiples idiomas
- No hay análisis de uso ni analytics
