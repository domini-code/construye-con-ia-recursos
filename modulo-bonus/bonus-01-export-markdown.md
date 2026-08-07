# Bonus 1 — Exportar la spec como archivo Markdown

**Lección 22 del curso** · Proyecto: [AI Spec Builder](https://github.com/domini-code/ai-spec-builder)

Este es el vídeo que introduce el ciclo completo. Los siguientes lo aplican más rápido porque ya conoces el patrón.

---

## 1. Prompt de mini-spec

Va en el **chat de Claude** (claude.ai), no en Claude Code. Sirve para tener un borrador que después ajustas tú.

```
Tengo el AI Spec Builder: una app que genera specs técnicas completas para proyectos nuevos.
Quiero añadir la feature de exportar la spec generada como archivo Markdown.

Genera una mini-spec con exactamente estos 4 campos:
- Qué hace
- Por qué
- Criterios de aceptación (lista de checkboxes)
- No incluye

Sé específico y conciso. El campo "No incluye" es tan importante como los criterios — protege el scope.
```

### La mini-spec final

Después de ajustar el borrador, esto es lo que va en `project-spec.md`:

```markdown
## Feature: Exportar spec como archivo Markdown

**Qué hace:**
Descarga la spec generada como archivo .md con el nombre del
producto en kebab-case (ej: spec-app-gestion-freelance.md)

**Por qué:**
La spec exportada se pega directamente en CLAUDE.md de cualquier
proyecto nuevo — es el paso final del ciclo del curso.

**Criterios de aceptación:**
- [ ] El botón solo aparece cuando hay una spec generada
- [ ] El archivo descargado tiene formato Markdown correcto
      (H2 por sección, listas para funcionalidades y flujos)
- [ ] El nombre del archivo usa el nombre del proyecto en kebab-case
- [ ] Funciona en Chrome, Firefox y Safari
- [ ] Sin spec generada, el botón no existe (no error — no aparece)

**No incluye:**
- Export a PDF (siguiente vídeo del bonus)
- Compartir por link
- Guardar en cuenta de usuario
```

> El campo "No incluye" es el más importante. Es lo que impide que Claude Code se vaya por su cuenta.

---

## 2. Prompt de plan mode

Este sí va en **Claude Code**, dentro del proyecto:

```
Lee la sección "Feature: Exportar como Markdown" en project-spec.md y propón un plan de implementación paso a paso. No implementes todavía.
```

Antes de aprobar, revisa dos cosas:

- ¿Toca solo los archivos correctos?
- ¿El plan para generar el Markdown es coherente con los criterios?

Si encaja: *"El plan está bien. Implementa."*

---

## 3. Validación

Recorre los criterios uno a uno en el navegador:

- Sin spec → ¿aparece el botón? No ✓
- Generar una spec → ¿aparece el botón? ✓
- Clic en "Exportar .md" → ¿se descarga el archivo? ✓
- Abrir el archivo → ¿tiene formato Markdown correcto? ✓
- ¿El nombre usa kebab-case del proyecto? ✓

**Regresión:** genera una spec sin exportar — el flujo principal sigue funcionando ✓

---

## 4. Commit

```
Haz commit con el mensaje: 'feat: add Markdown export button to spec output'
```

Y actualiza `project-spec.md` marcando la feature como implementada.

---

## El ciclo cerrado

Esta feature existe para cerrar el flujo del curso:

1. Escribes tu idea en el AI Spec Builder
2. Generas la spec → la exportas como `.md`
3. Pegas ese archivo en el `CLAUDE.md` de un proyecto nuevo
4. Abres Claude Code ahí — lee el contexto desde el primer mensaje

Idea → spec → CLAUDE.md → proyecto. Sin fricción.
