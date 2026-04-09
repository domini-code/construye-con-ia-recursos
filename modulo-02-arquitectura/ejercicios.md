# Ejercicios Módulo 2 — Arquitectura del Proyecto

**Recurso descargable del curso "Construye con IA: De la Idea al Producto con Claude"**

---

## Ejercicio 1 — Completa el diagrama
**Dificultad:** Básico
**Tiempo estimado:** 10 minutos

Aquí tienes el diagrama de arquitectura de una app de **to-do list con IA** que sugiere prioridades automáticamente. Uno de los bloques está incompleto. Identifica qué falta.

```
Usuario → [Frontend: React + Tailwind] → [???] → [IA: OpenAI API] → [???] → [Frontend] → Usuario
```

**Preguntas:**
1. ¿Qué componente falta entre el Frontend y la IA? ¿Qué función cumple?
2. ¿Necesita esta app una base de datos? ¿Por qué sí o por qué no?
3. Si añadieras una base de datos, ¿dónde la colocarías en el diagrama?
4. ¿Qué tecnología sugerirías para el bloque que falta?

**Respuestas sugeridas:**
> El bloque que falta es un **Backend / API Route** que recibe las tareas del frontend, las envía a la IA con un prompt de priorización, y devuelve las tareas priorizadas. Si la app guarda las tareas entre sesiones, necesita una base de datos (ej: Supabase, PostgreSQL). Si es solo para uso inmediato (como el AI Spec Builder), no la necesita.

**Reflexión:** Cada producto tiene una arquitectura diferente, pero el patrón Usuario → Frontend → Backend → Servicio → Backend → Frontend → Usuario se repite en la mayoría. Aprender a ver ese patrón te ayuda a entender cualquier proyecto.

---

## Ejercicio 2 — Mapea tu spec a la arquitectura
**Dificultad:** Intermedio
**Tiempo estimado:** 15 minutos

Si completaste la spec de tu proyecto propio en el Módulo 1, ahora conéctala con la arquitectura.

**Instrucciones:**
1. Abre tu spec (la del Ejercicio 2 del Módulo 1)
2. Completa esta tabla de mapeo:

| Sección de mi spec | Se implementa en... | Archivo o carpeta probable |
|---|---|---|
| Visión del producto | | |
| Usuarios y casos de uso | | |
| Funcionalidades (Input) | | |
| Funcionalidades (Output) | | |
| Flujos de usuario | | |
| Arquitectura | | |
| Requisitos no funcionales | | |

3. Si no estás seguro de alguna fila, pide ayuda a Claude.ai: "Basándote en esta spec [pegar spec], ¿dónde se implementaría cada sección?"

**Reflexión:** Este mapeo es lo que Claude Code hace internamente cuando lee tu spec y CLAUDE.md. Al hacerlo tú primero, puedes verificar que Claude Code está construyendo en el lugar correcto.

---

## Ejercicio 3 — Diseña la estructura de carpetas de tu proyecto
**Dificultad:** Avanzado
**Tiempo estimado:** 15 minutos

Antes de que Claude Code inicialice tu proyecto, diseña la estructura de carpetas que esperas.

**Instrucciones:**
1. Basándote en la Sección 5 (Arquitectura) de tu spec, dibuja el árbol de carpetas esperado
2. Usa este formato:

```
mi-proyecto/
├── app/                    ← [qué va aquí]
│   ├── page.tsx            ← [qué hace este archivo]
│   ├── layout.tsx          ← [qué hace este archivo]
│   └── api/
│       └── [tu-endpoint]/
│           └── route.ts    ← [qué hace este endpoint]
├── components/
│   ├── [Componente1].tsx   ← [qué hace]
│   └── [Componente2].tsx   ← [qué hace]
├── .env.local              ← [qué secretos guarda]
├── CLAUDE.md               ← Memoria del proyecto
└── package.json            ← Dependencias
```

3. Compara tu diseño con lo que Claude Code genera cuando inicialices el proyecto (en los ejercicios del Módulo 3)

**Reflexión:** No necesitas acertar al 100% — Claude Code puede organizar mejor que tú. Pero tener una expectativa te ayuda a detectar cuando algo no encaja con tu spec.

---

*Recurso del curso "Construye con IA: De la Idea al Producto con Claude y Specs"*
