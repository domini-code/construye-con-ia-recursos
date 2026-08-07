# Bonus 6 — Retrofit: aplica el método a un proyecto que ya existe

**Lección 27 del curso** · App de práctica: [`demo/demo-retrofit-gastos/`](../demo/demo-retrofit-gastos/)

---

## Antes de empezar

```bash
git clone https://github.com/domini-code/construye-con-ia-recursos.git
cd construye-con-ia-recursos/demo/demo-retrofit-gastos
npm install
npm run dev
```

La carpeta viene con `SPEC.md` y `CLAUDE.md` ya generados — **son el resultado del vídeo, no el punto de partida**. Bórralos antes de empezar:

```bash
rm SPEC.md CLAUDE.md
```

Ahora sí: abre Claude Code en esa carpeta. El escenario es el real — una app que funciona, sin spec y sin CLAUDE.md.

---

## Paso 1 — Spec desde lo que existe

```
Analiza todos los archivos de este proyecto.

Genera un borrador de especificación técnica con estas secciones:
1. Qué hace el proyecto (2-3 frases)
2. Para quién está pensado (usuario objetivo)
3. Funcionalidades que detectas (lista — lo que el código realmente hace, no lo que podría hacer)
4. Arquitectura que ves (cómo están organizados los archivos y sus responsabilidades)
5. Stack técnico (tecnologías y versiones reales del proyecto)

Si algo no está claro en el código, indícalo explícitamente. No asumas intenciones que no puedas inferir de los archivos.
```

Lo que devuelve **no es la spec final** — es el punto de partida. Claude Code sabe lo que ve en el código; no sabe por qué existe el proyecto ni a quién va dirigido. Eso lo añades tú:

- El propósito real (amigos en un viaje, no uso corporativo)
- El usuario concreto
- Las decisiones de diseño que el código no revela

Guárdalo como `project-spec.md`.

### Sección "Deuda técnica conocida"

Añádela al final de la spec. Es información valiosa para Claude Code — le dice qué está mal *a propósito*:

```markdown
## Deuda técnica conocida

- **storage.ts** lee y escribe el objeto completo en cada operación — no es un problema
  con los volúmenes actuales pero no escalaría. No refactorizar ahora.
- **App.tsx** mezcla lógica de presentación con acceso a la capa de datos. Funciona,
  pero si se añaden más vistas habría que separar. Queda pendiente.
- Sin tests. Sin manejo de errores en el parseo de localStorage.
- Los IDs usan `crypto.randomUUID()` sin fallback para navegadores antiguos.
  Aceptado para el caso de uso actual.
```

---

## Paso 2 — CLAUDE.md desde la spec

```
Basándote en project-spec.md y en los archivos del proyecto, crea un CLAUDE.md con estas secciones:

1. Visión del proyecto (1-2 frases del propósito real)
2. Stack técnico (tecnologías y versiones reales — no las últimas, las que usa el proyecto)
3. Convenciones de código que observas en el proyecto
4. Lo que NO se debe tocar y por qué
5. Restricciones del proyecto (límites de alcance, decisiones de diseño fijas)

Describe lo real, no lo ideal. Si el código tiene deuda técnica documentada en la spec, refléjala en la sección "No tocar".
```

Después revisa y ajusta a mano:

- ¿El stack refleja lo que realmente se usa? (React 19, Vite, TypeScript — no las últimas versiones, las del proyecto)
- Añade restricciones que el código no puede inferir: *"No añadir backend ni base de datos — la app es intencionalmente offline"*
- Añade convenciones implícitas: componentes en `App.tsx`, sin carpeta `components/`, CSS en `index.css`

---

## Paso 3 — Calibración

Antes de pedir cualquier cambio, verifica que Claude Code entiende el proyecto:

```
Describe qué hace este proyecto, cómo está organizado y cuáles son sus componentes principales.

Basate en CLAUDE.md y en los archivos que ves. Sé específico:
- Qué problema resuelve exactamente
- Quién lo usa y cómo interactúa con él
- Qué hace cada archivo / módulo
- Cuáles son las limitaciones conocidas del proyecto

No añadas funcionalidades que no existan. Solo describe lo que está.
```

### El malentendido que vas a encontrar

Esta app tiene una ambigüedad **puesta a propósito**, y es el corazón del ejercicio.

El tipo `Expense` tiene un campo `forWhom: string[]`, y el formulario muestra checkboxes de "¿Para quién?". Cualquiera —tú, yo o Claude Code— asume que el reparto tiene en cuenta quién participó en cada gasto.

Pero `calculateBalances()` en `settlement.ts` **ignora `forWhom` por completo** y divide siempre entre todos:

```ts
const share = expense.amount / trip.participants.length;
```

No hay ni un comentario que lo explique. Así que en la calibración Claude dirá algo como: *"la app permite especificar quién participó y calcula el reparto basándose en eso"*.

Eso es falso. Y si no lo corriges, la próxima feature que le pidas la construirá sobre esa suposición.

**La corrección va en CLAUDE.md:**

```markdown
**Lógica de reparto:** los gastos siempre se dividen entre TODOS los participantes
del viaje, independientemente del campo `forWhom`. El campo `forWhom` es informativo —
se guarda pero no afecta al cálculo. No implementar reparto proporcional.
```

Repite el prompt de calibración. Ahora lo describe bien.

> El CLAUDE.md es un documento vivo. Cada malentendido que corriges, va ahí.

---

## Comprueba que el retrofit funcionó

Pide una feature nueva y observa si respeta el contexto:

```
Añade un resumen del viaje al final de la vista de balances:
total gastado, gasto medio por persona y quién pagó más.
```

Con el retrofit bien hecho, Claude Code debería:

- Respetar que el reparto es igualitario — no tocar `forWhom`
- Mantener los componentes dentro de `App.tsx` (la convención del proyecto)
- No añadir librerías ni backend

Si hace las tres cosas, tu CLAUDE.md está calibrado.

---

## Los 3 pasos, en una línea

1. **Spec desde lo que existe** — Claude Code lee, tú completas lo que el código no puede decir
2. **CLAUDE.md desde la spec** — Claude Code genera, tú ajustas convenciones y restricciones reales
3. **Calibración** — verificas que Claude entiende el proyecto **antes** de que toque código
