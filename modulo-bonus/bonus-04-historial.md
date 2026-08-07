# Bonus 4 — Historial de specs generadas

**Lección 25 del curso** · Proyecto: [AI Spec Builder](https://github.com/domini-code/ai-spec-builder)

El usuario genera una spec. Recarga la página. La spec desaparece. No hay forma de recuperarla.

---

## 1. La mini-spec

```markdown
## Feature: Historial de specs

**Qué hace:**
Guarda cada spec generada en localStorage con nombre del proyecto,
fecha y contenido.

**Por qué:**
El usuario no pierde trabajo al recargar o cerrar la pestaña.

**Criterios de aceptación:**
- [ ] Panel lateral con la lista de specs anteriores
- [ ] Recuperar una spec con un clic
- [ ] Renombrar una spec
- [ ] Eliminar una spec
- [ ] Persistente entre sesiones en el mismo navegador

**No incluye:**
- Sincronización entre dispositivos (eso es el Bonus 5, con login)
- Carpetas o etiquetas
```

**Decisión de diseño explícita:** localStorage para esta feature, base de datos cuando haya login. Decidirlo ahora evita que Claude Code improvise.

---

## 2. Prompt de plan mode

```
Lee la feature "Historial de specs" en project-spec.md.

Propón un plan de implementación paso a paso. No implementes todavía.

El plan debe describir exactamente:
1. El esquema de datos en localStorage: qué campos tiene cada entrada
   (mínimo: id, nombre del proyecto, fecha de creación, contenido de la spec en JSON)
2. Qué funciones de acceso se crean: guardar, listar, recuperar, renombrar, eliminar
3. Dónde se llama a "guardar": ¿en qué punto del flujo actual se persiste la spec recién generada?
4. Qué componente nuevo se crea para el panel lateral y qué props recibe
5. Qué componentes existentes se modifican y por qué
6. Cómo se garantiza que recuperar una spec del historial restaura exactamente el estado
   que tenía la app cuando se generó (incluidos los botones de exportar)
```

Dos cosas que revisar antes de aprobar:

- **El `id` único por entrada.** Sin él, renombrar y eliminar son operaciones inseguras.
- **Dónde se llama a "guardar".** Debe ocurrir justo después de que `parseMdToSpec()` termina, no antes. Si guarda antes, persistes specs a medio generar.

Este es el primer vídeo donde Claude Code crea un componente nuevo. Es un paso natural de la evolución del proyecto, no un salto.

---

## 3. Validación

- Generar tres specs con nombres distintos → aparecen en el panel lateral ✓
- Cerrar la pestaña → volver a abrir → el historial sigue ahí ✓
- Recuperar la segunda spec con un clic ✓
- Renombrar una spec → el nombre se actualiza ✓
- Eliminar una spec → desaparece del historial ✓
- El flujo de generación principal sigue funcionando ✓

---

## 4. Commit

```
feat: add spec history with localStorage persistence
```
