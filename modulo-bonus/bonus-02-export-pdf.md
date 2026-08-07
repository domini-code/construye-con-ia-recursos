# Bonus 2 — Exportar la spec como PDF

**Lección 23 del curso** · Proyecto: [AI Spec Builder](https://github.com/domini-code/ai-spec-builder)

Markdown es perfecto para developers y para Claude Code. Pero cuando la spec va a un cliente, un socio o un stakeholder que no abre VS Code, el formato estándar es PDF.

---

## 1. Prompt de mini-spec

Fíjate en la diferencia con el Bonus 1: **el prompt ahora incluye contexto del proyecto**. Claude ya no parte de cero.

```
Tengo el AI Spec Builder: una app que genera specs técnicas completas para proyectos nuevos.
Ya tiene implementado un botón de exportar la spec como archivo Markdown (Bonus 1).

Quiero añadir la feature de exportar la spec generada como archivo PDF.

Genera una mini-spec con exactamente estos 4 campos:
- Qué hace
- Por qué
- Criterios de aceptación (lista de checkboxes)
- No incluye

Contexto adicional:
- El botón de PDF debe aparecer junto al botón de Markdown ya existente
- El PDF debe tener formato limpio: H1 para el nombre del proyecto, H2 para cada sección, listas para funcionalidades y flujos
- Preferimos no añadir librerías externas si es posible — evalúalo en los criterios

Sé específico y conciso. El campo "No incluye" es tan importante como los criterios — protege el scope.
```

> El contexto cambia el prompt. Ahora Claude sabe que el Markdown ya existe — y la mini-spec parte de ahí.

Mini-spec en 2 minutos. El Bonus 1 tardó 3. Ya vas más rápido.

---

## 2. Prompt de plan mode

```
Lee la feature "Exportar como PDF" en project-spec.md y propón el plan.
```

Aquí hay una **decisión técnica real** que revisar: `window.print()` con CSS de impresión, o una librería externa tipo `jspdf` / `html2pdf`.

No apruebes sin entender qué eligió y por qué. Ese es exactamente el momento en que dejas de ser espectador.

---

## 3. Validación

- Generar una spec → exportar como Markdown → exportar como PDF
- Comparar los dos archivos: **mismo contenido, dos formatos, dos destinos distintos**
- Criterios de aceptación ✓ uno a uno
- Regresión: el flujo principal sigue funcionando ✓

---

## 4. Commit

```
feat: add PDF export button to spec output
```
