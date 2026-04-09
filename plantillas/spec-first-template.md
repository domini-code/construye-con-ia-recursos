# Plantilla Spec-First — De la Idea al Producto

**Recurso descargable del curso "Construye con IA: De la Idea al Producto con Claude"**
**Formato final:** PDF o Google Doc enlazable

---

## Cómo usar esta plantilla

1. Completa cada sección en orden — cada una alimenta a la siguiente
2. Usa Claude.ai para iterar: pega la sección y pide feedback o alternativas
3. No busques la perfección en la primera pasada — itera hasta que sea clara
4. Cuando las 6 secciones estén listas, tienes la base para construir con Claude Code

---

## Sección 1 — Visión del Producto

**¿Qué es?** En 1-2 oraciones: qué es el producto, para quién, y qué problema resuelve.

**Preguntas guía:**
- ¿Qué hace mi producto en una oración?
- ¿Para quién es? (sé específico: no "todo el mundo")
- ¿Qué problema concreto resuelve?
- Si alguien me pregunta "¿qué estás construyendo?", ¿qué le digo en 10 segundos?

**Formato:**
> [Nombre del producto] es [qué es] que [qué hace] para [quién]. Resuelve [qué problema].

**Ejemplo (AI Spec Builder):**
> AI Spec Builder es una herramienta web que genera especificaciones técnicas completas a partir de una descripción breve de un producto. Está diseñada para emprendedores y creadores que quieren construir con IA pero no saben cómo comunicar su idea de forma estructurada.

**Tu visión:**

> _____________________________________________________________________________
>
> _____________________________________________________________________________

---

## Sección 2 — Usuarios y Casos de Uso

**¿Qué es?** Quién usa el producto y qué acciones concretas realiza.

**Preguntas guía:**
- ¿Quién es mi usuario principal? Descríbelo como persona, no como rol técnico
- ¿Qué quiere lograr cuando abre mi producto?
- ¿Qué acciones concretas realiza? (verbos: escribe, busca, genera, compra...)
- ¿Hay un usuario secundario? (ej: admin, colaborador)

**Formato:**

| Usuario | Descripción | Casos de uso |
|---|---|---|
| Principal | [quién es] | 1. [acción concreta] 2. [acción concreta] 3. [acción concreta] |
| Secundario (si aplica) | [quién es] | 1. [acción concreta] |

**Ejemplo (AI Spec Builder):**

| Usuario | Descripción | Casos de uso |
|---|---|---|
| Emprendedor no técnico | Persona con una idea de producto pero sin experiencia en desarrollo | 1. Escribe una descripción de su idea → recibe spec completa 2. Copia la spec generada → la usa como punto de partida con Claude Code 3. Exporta la spec como Markdown → la pega en CLAUDE.md |

**Tus usuarios:**

| Usuario | Descripción | Casos de uso |
|---|---|---|
| Principal | | 1. _______ 2. _______ 3. _______ |
| Secundario | | 1. _______ |

---

## Sección 3 — Funcionalidades

**¿Qué es?** Lista de lo que el producto hace, organizada por áreas.

**Preguntas guía:**
- ¿Qué puede hacer el usuario en la interfaz? (cada acción = una funcionalidad)
- ¿Qué hace el sistema automáticamente? (procesos, cálculos, generaciones)
- ¿Qué estados existen? (carga, error, vacío, éxito)
- ¿Qué funcionalidades NO incluye este producto? (igual de importante)

**Formato:** Usa "El usuario puede..." y "El sistema permite/hace..."

**Ejemplo (AI Spec Builder):**

**Input:**
- El usuario puede escribir una descripción de su idea de producto en un textarea
- El usuario puede hacer clic en "Generar especificación" para iniciar el proceso

**Output:**
- El sistema genera una spec con 6 secciones: visión, usuarios, funcionalidades, flujos, arquitectura, requisitos
- El usuario puede copiar la spec completa al portapapeles
- El usuario puede exportar la spec como archivo Markdown

**Estados:**
- El sistema muestra un estado de carga (spinner) mientras genera la spec
- El sistema muestra un mensaje de error si algo falla
- El sistema muestra un estado vacío antes de la primera generación

**Fuera del alcance (NO incluye):**
- No hay autenticación ni cuentas de usuario
- No hay historial de specs anteriores
- No hay base de datos

**Tus funcionalidades:**

**[Área 1: ___________]**
- El usuario puede ___________
- El usuario puede ___________
- El sistema ___________

**[Área 2: ___________]**
- El usuario puede ___________
- El sistema ___________

**Estados:**
- El sistema muestra ___________
- El sistema muestra ___________

**Fuera del alcance:**
- No incluye ___________
- No incluye ___________
- No incluye ___________

---

## Sección 4 — Flujos de Usuario

**¿Qué es?** Los pasos exactos de cada acción principal, incluido qué pasa cuando algo falla.

**Preguntas guía:**
- ¿Cuál es la acción principal que hace el usuario? (el flujo "feliz")
- ¿Qué ve en cada paso? ¿Qué hace? ¿Qué responde el sistema?
- ¿Qué pasa si algo falla? (error de red, datos inválidos, servicio caído)
- ¿Hay flujos secundarios? (configuración, edición, eliminación)

**Formato:** Pasos numerados. Siempre incluye flujo principal + flujo de error.

**Ejemplo (AI Spec Builder):**

**Flujo principal — Generar especificación:**
1. El usuario abre la aplicación → ve el textarea vacío con placeholder descriptivo
2. Escribe su idea de producto en el textarea
3. Hace clic en "Generar especificación"
4. El botón cambia a estado de carga (spinner), el textarea se desactiva
5. El sistema envía la descripción a la API → la API llama a Claude → Claude genera la spec
6. La spec aparece debajo del formulario en 6 secciones con títulos claros
7. El usuario hace scroll por las secciones y puede copiar la spec completa

**Flujo de error:**
1. Si la API falla → el sistema muestra: "Hubo un error al generar la especificación. Inténtalo de nuevo."
2. El botón vuelve a su estado normal, el textarea se reactiva
3. El usuario puede intentarlo de nuevo

**Tus flujos:**

**Flujo principal — [nombre del flujo]:**
1. ___________
2. ___________
3. ___________
4. ___________
5. ___________

**Flujo de error:**
1. Si ___________ falla → el sistema muestra: "___________"
2. ___________

---

## Sección 5 — Arquitectura

**¿Qué es?** Componentes técnicos, tecnologías elegidas y cómo se conectan.

**Preguntas guía:**
- ¿Qué ve el usuario? (frontend) → ¿Qué tecnología uso?
- ¿Qué pasa en el servidor? (backend) → ¿Qué tecnología uso?
- ¿Necesito una base de datos? ¿Un servicio externo? ¿Una API de IA?
- ¿Cómo fluyen los datos desde el usuario hasta la respuesta?
- ¿Dónde se va a publicar? (deploy)

**Formato:**

| Componente | Tecnología | Función |
|---|---|---|
| Frontend | [ej: Next.js + React + Tailwind] | [qué hace] |
| Backend | [ej: API Route de Next.js] | [qué hace] |
| Base de datos | [ej: ninguna / Supabase / etc.] | [qué almacena] |
| Servicio externo | [ej: Anthropic SDK → Claude] | [qué procesa] |
| Deploy | [ej: Vercel] | [dónde se publica] |

**Flujo de datos:**
```
Usuario → [Frontend] → [Backend] → [Servicio externo] → [Backend] → [Frontend] → Usuario
```

**Ejemplo (AI Spec Builder):**

| Componente | Tecnología | Función |
|---|---|---|
| Frontend | Next.js 16 + React + Tailwind CSS | Interfaz del usuario (formulario + resultados) |
| Backend | API Route de Next.js (Node.js) | Recibe descripción, llama a Claude, devuelve spec |
| Base de datos | Ninguna | — |
| IA | Anthropic SDK → Claude | Genera la especificación técnica |
| Deploy | Vercel | Publicación automática desde GitHub |

```
Usuario → Next.js (React) → API Route → Claude (Anthropic SDK) → API Route → Next.js → Usuario
```

**Nota:** Si no sabes qué tecnologías elegir, completa las otras secciones primero y pídele a Claude que te recomiende un stack.

**Tu arquitectura:**

| Componente | Tecnología | Función |
|---|---|---|
| Frontend | | |
| Backend | | |
| Base de datos | | |
| Servicio externo | | |
| Deploy | | |

```
Usuario → ___________ → ___________ → ___________ → Usuario
```

---

## Sección 6 — Requisitos No Funcionales

**¿Qué es?** Lo que el producto necesita cumplir más allá de las funcionalidades: velocidad, seguridad, límites.

**Preguntas guía:**
- **Rendimiento:** ¿Qué tan rápido debe responder? ¿Hay operaciones pesadas?
- **Seguridad:** ¿Hay datos sensibles? ¿API keys? ¿Información personal?
- **Accesibilidad:** ¿Debe funcionar en móvil? ¿En qué navegadores?
- **Escalabilidad:** ¿Cuántos usuarios simultáneos espero al inicio?
- **Lo que NO incluye:** ¿Qué funcionalidades están explícitamente fuera del alcance?

**Formato:**

**Rendimiento:**
- [requisito concreto con número si es posible]

**Seguridad:**
- [requisito concreto]

**Accesibilidad:**
- [requisito concreto]

**Fuera del alcance (v1):**
- No incluye ___________
- No incluye ___________

**Ejemplo (AI Spec Builder):**

**Rendimiento:**
- La generación de la spec debe completarse en menos de 30 segundos

**Seguridad:**
- La API key de Anthropic nunca se expone en el frontend
- La API key se maneja exclusivamente con variables de entorno

**Accesibilidad:**
- La interfaz es usable en móvil y desktop
- Funciona en Chrome, Firefox, Safari y Edge

**Fuera del alcance (v1):**
- No hay autenticación ni cuentas de usuario
- No hay base de datos ni historial
- No hay soporte multiidioma
- No hay exportación a PDF (solo Markdown)

**Tus requisitos:**

**Rendimiento:**
- ___________

**Seguridad:**
- ___________

**Accesibilidad:**
- ___________

**Fuera del alcance (v1):**
- No incluye ___________
- No incluye ___________
- No incluye ___________

---

## Checklist final

Antes de empezar a construir, verifica:

- [ ] **Visión** — ¿Cabe en 2 oraciones y es clara?
- [ ] **Usuarios** — ¿Están descritos como personas reales con acciones concretas?
- [ ] **Funcionalidades** — ¿Cada una empieza con "El usuario puede..." o "El sistema..."?
- [ ] **Flujos** — ¿Tienen pasos numerados Y flujo de error?
- [ ] **Arquitectura** — ¿Las tecnologías están elegidas y el flujo de datos es claro?
- [ ] **Requisitos** — ¿Incluyen lo que está FUERA del alcance?

Si todos están marcados, tu spec está lista. Pásala a CLAUDE.md y empieza a construir.

---

*Recurso del curso "Construye con IA: De la Idea al Producto con Claude y Specs"*
