# Ejercicios Módulo 0 — Bienvenida y Setup

**Recurso descargable del curso "Construye con IA: De la Idea al Producto con Claude"**

---

## Ejercicio 1 — Tu primer diálogo con Claude Code
**Dificultad:** Básico
**Tiempo estimado:** 10 minutos

Familiarízate con Claude Code creando archivos de diferentes tipos.

**Instrucciones:**
1. Abre la terminal y navega a una carpeta de pruebas
2. Ejecuta `claude` para abrir Claude Code
3. Pide a Claude Code que cree estos 3 archivos:
   - Un archivo `hola.txt` con una presentación tuya en 3 líneas
   - Un archivo `mi-idea.json` con un objeto JSON que tenga: nombre de un producto, descripción en 1 línea, y público objetivo
   - Un archivo `index.html` con una página web básica que diga "Mi primera página creada con IA"
4. Abre cada archivo en VS Code para verificar que se creó correctamente
5. Abre `index.html` en el navegador — deberías ver tu página

**Reflexión:** Acabas de crear 3 archivos en 3 formatos diferentes sin escribir ni una línea de código. Claude Code entendió lo que pediste en lenguaje natural y lo ejecutó. Ese es el workflow de todo el curso.

---

## Ejercicio 2 — Explora las capacidades de Claude Code
**Dificultad:** Básico
**Tiempo estimado:** 10 minutos

Descubre qué puede hacer Claude Code haciéndole preguntas.

**Instrucciones:**
1. Con Claude Code abierto, prueba estas peticiones:
   - "¿Qué archivos hay en esta carpeta?"
   - "Renombra el archivo hola.txt a presentacion.txt"
   - "Lee el contenido de mi-idea.json y dime qué contiene"
   - "Modifica index.html para que el texto sea de color azul y tenga un fondo gris claro"
2. Verifica cada cambio en VS Code o en el navegador

**Reflexión:** Claude Code no solo crea — también lee, modifica, organiza y explica. En el curso, le vas a pedir cosas mucho más complejas que esto. Pero la mecánica es la misma: tú describes, Claude Code ejecuta.

---

## Ejercicio 3 — Verifica tu entorno completo
**Dificultad:** Básico
**Tiempo estimado:** 5 minutos

Asegúrate de que todo está listo antes de continuar con el Módulo 1.

**Checklist:**
- [ ] Node.js instalado — Ejecuta `node --version` en la terminal → aparece un número
- [ ] Claude Code instalado — Ejecuta `claude --version` → aparece un número
- [ ] VS Code instalado — Puedes abrirlo y ver archivos
- [ ] API key de Anthropic — La tienes guardada en un lugar seguro
- [ ] Claude Code responde — Ejecutas `claude`, escribes "hola" y Claude Code responde

Si todos están marcados, estás listo para el Módulo 1.

**Si algo falla:**
- Node.js: vuelve a descargar desde nodejs.org (versión LTS)
- Claude Code: ejecuta `npm install -g @anthropic-ai/claude-code`
- API key: ve a console.anthropic.com → API Keys
- Pide ayuda a Claude Code: "No puedo instalar [X], ¿qué hago?"

---

*Recurso del curso "Construye con IA: De la Idea al Producto con Claude y Specs"*
