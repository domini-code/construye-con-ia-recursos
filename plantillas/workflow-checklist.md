# Workflow Spec-First — Checklist para Cualquier Proyecto

**Recurso descargable del curso "Construye con IA: De la Idea al Producto con Claude"**
**Formato final:** PDF imprimible (1-2 páginas)

---

## El Sistema Completo

```
💡 Idea  →  📋 Spec (6 secciones)  →  📄 CLAUDE.md  →  💻 Claude Code construye  →  🚀 Deploy
```

---

## Paso 1 — La Idea

- [ ] Tengo claro qué problema resuelvo
- [ ] Sé para quién es (persona concreta, no "todo el mundo")
- [ ] Puedo explicar mi idea en 30 segundos

---

## Paso 2 — La Especificación (6 secciones)

- [ ] **Visión del producto** — 1-2 oraciones: qué es, para quién, qué problema resuelve
- [ ] **Usuarios y casos de uso** — Quién lo usa y qué acciones concretas realiza
- [ ] **Funcionalidades** — Lista con "El usuario puede..." / "El sistema permite..."
- [ ] **Flujos de usuario** — Pasos numerados del flujo principal + flujo de error
- [ ] **Arquitectura** — Tecnologías elegidas + flujo de datos
- [ ] **Requisitos no funcionales** — Rendimiento, seguridad + lo que NO incluye

**Verificación:** ¿Cada sección es específica para MI producto (no genérica)?

---

## Paso 3 — CLAUDE.md

- [ ] **Visión resumida** — 1-2 oraciones del producto
- [ ] **Stack técnico** — Tecnologías, versiones, estructura de carpetas
- [ ] **Convenciones** — Nombrado de archivos, idioma del código, estilo
- [ ] **Restricciones** — Lo que NO se hace, lo que no se instala, lo que no se cambia
- [ ] **Estado actual** — En qué fase está el proyecto, qué está listo y qué falta

**Verificación:** ¿Claude Code puede arrancar y saber inmediatamente qué está construyendo?

---

## Paso 4 — Construir con Claude Code

### Inicialización
- [ ] Crear carpeta del proyecto
- [ ] Inicializar con Claude Code (framework, dependencias)
- [ ] Colocar CLAUDE.md en la raíz
- [ ] Verificar que el proyecto arranca (`npm run dev` o equivalente)

### Backend
- [ ] Configurar variables de entorno (API keys en `.env.local`)
- [ ] Proteger secretos con `.gitignore`
- [ ] Crear endpoints / API routes
- [ ] Probar cada endpoint por separado
- [ ] Iterar prompts del sistema hasta calidad deseada

### Frontend
- [ ] Crear componentes de input (formularios, interacción del usuario)
- [ ] Crear componentes de output (resultados, visualización)
- [ ] Conectar frontend con backend
- [ ] Implementar estados: vacío, carga, éxito, error
- [ ] Revisar en navegador + vista móvil

### Pruebas y pulido
- [ ] Probar flujo completo de principio a fin
- [ ] Probar con datos variados (diferentes inputs)
- [ ] Probar estados de error (qué pasa si algo falla)
- [ ] Pedir a Claude Code revisión de usabilidad
- [ ] Aplicar mejoras seleccionadas (no todas — solo las que sirven)

**Verificación:** ¿El producto hace exactamente lo que dice la spec? ¿Ni más ni menos?

---

## Paso 5 — Deploy

- [ ] Inicializar git: `git init` → `git add .` → `git commit`
- [ ] Subir a GitHub: crear repositorio + `git push`
- [ ] Verificar que `.env.local` NO está en el repositorio
- [ ] Conectar con Vercel (o plataforma de deploy)
- [ ] Configurar variables de entorno en la plataforma de deploy
- [ ] Deploy exitoso — URL pública funcionando
- [ ] Probar la URL pública con el flujo completo
- [ ] Compartir con alguien real y recoger feedback

**Verificación:** ¿Alguien que nunca vio el proyecto puede usarlo desde la URL?

---

## Referencia rápida — Spec → Código

| Sección de la spec | Se implementa en... |
|---|---|
| Visión del producto | CLAUDE.md |
| Usuarios y casos de uso | Flujo de la página principal |
| Funcionalidades (Input) | Componentes de formulario |
| Funcionalidades (Output) | Componentes de resultados |
| Flujos de usuario | Página principal (orquesta estados) |
| Arquitectura | Estructura de carpetas + tecnologías |
| Requisitos no funcionales | Configuración + restricciones |

---

## Cuándo usar cada herramienta

| Necesitas... | Usa... |
|---|---|
| Iterar ideas, escribir la spec, hacer preguntas | **Claude.ai** (chat) |
| Crear archivos, escribir código, instalar dependencias | **Claude Code CLI** (terminal) |
| Ver el código generado, explorar archivos | **VS Code** (editor) |
| Ver la app en funcionamiento | **Navegador** (localhost o URL de deploy) |

---

*Recurso del curso "Construye con IA: De la Idea al Producto con Claude y Specs"*
