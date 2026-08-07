# Bonus 7 — Home page y acceso protegido: la entrada a tu producto

**Lección 28 del curso** · Proyecto: [AI Spec Builder](https://github.com/domini-code/ai-spec-builder)

La app tiene login y funciona. Pero cuando alguien visita la URL sin sesión, lo que ve es el formulario de Clerk directamente: sin nombre, sin descripción, sin ningún contexto.

Eso no es un producto. Es una puerta sin entrada.

Dos cosas tienen que pasar:

1. Un usuario nuevo llega a una home page que explica qué es la app y lo invita a entrar
2. El generador se mueve a su propia ruta y queda protegido: solo con sesión activa

---

## 1. Prompt de mini-spec

Va en el **chat de Claude**, no en Claude Code:

```
Tengo el AI Spec Builder: una app Next.js con Clerk para autenticación.
El login está implementado — el usuario puede autenticarse con Google.

El problema: cuando un usuario visita la app sin sesión, el middleware
lo manda directamente al formulario de Clerk. No sabe qué es la app ni
por qué debería registrarse.

Quiero que crees la feature, y la guardes en la carpeta de specs:
1. Una home page pública en "/" visible para usuarios no autenticados
2. El generador de specs protegido: solo accesible con sesión activa

Genera una mini-spec con exactamente estos 4 campos:
- Qué hace
- Por qué
- Criterios de aceptación (lista de checkboxes)
- No incluye

Contexto adicional:
- La home debe mostrar: nombre de la app, descripción de una línea,
  tres beneficios y un botón CTA "Empezar" que lleve a /sign-in
- Diseño coherente con el resto de la app (Tailwind, mismos colores)
- Si el usuario ya tiene sesión y visita "/", debe redirigir al generador
- El generador pasa a su propia ruta: /generator

Sé específico. El campo "No incluye" protege el scope.
```

### La mini-spec final

```markdown
## Feature: Home Page pública + protección del generador

**Qué hace:**
Añade una landing pública en "/" para usuarios no autenticados que
presenta la app y dirige al login de Clerk. Si ya hay sesión, "/"
redirige al generador. El generador pasa a /generator y queda protegido.

**Por qué:**
Un usuario sin contexto llega al formulario de Clerk sin saber qué es
la app ni por qué registrarse. Eso genera abandono. La home cierra esa
brecha: primero convence, luego autentica.

**Criterios de aceptación:**
- [ ] "/" es una ruta pública — el middleware no la protege
- [ ] La home muestra: nombre, descripción de una línea, tres beneficios y CTA "Empezar"
- [ ] El botón "Empezar" redirige a /sign-in
- [ ] Diseño con Tailwind coherente con el resto de la app
- [ ] Un usuario autenticado que visita "/" va directo al generador
- [ ] El generador solo es accesible con sesión — sin ella redirige a /sign-in
- [ ] El generador se mueve a /generator (app/generator/page.tsx)

**No incluye:**
- Cambios en la lógica o UI del generador (solo se mueve de ruta)
- Precios, FAQ, términos o política de privacidad
- Animaciones o elementos interactivos más allá del CTA
- Header de navegación persistente ni footer
- Analytics sobre la landing
```

> Dos comportamientos, una sola mini-spec. Lo que más importa del "No incluye": el generador **se mueve, no se toca**.

---

## 2. Prompt de plan mode

```
Lee la feature "Home Page pública + protección del generador" en la carpeta de specs.

El proyecto usa Next.js con Clerk. El middleware con clerkMiddleware ya existe.

Propón un plan de implementación paso a paso. No implementes todavía.

El plan debe describir:
1. Qué hace app/page.tsx hoy y cómo se convierte en la landing pública
2. Cómo se detecta la sesión para redirigir al generador desde "/"
3. Cómo se mueve el generador actual a app/generator/page.tsx sin tocar su lógica
4. Qué secciones tiene la home: hero, tres beneficios y botón CTA
5. Qué cambia en el matcher del middleware para dejar "/" pública
   y mantener /generator protegida
6. Qué archivos toca en total y en qué orden
```

Al revisar el plan, mira dos cosas:

- **La redirección en `/`**: ¿comprueba la sesión en server component o en cliente? En server evita el parpadeo de la landing antes de redirigir.
- **El matcher del middleware**: `"/"` pública y `/generator` protegida. Es fácil dejar una de las dos mal.

---

## 3. Copy de la home (para no improvisar)

- **Título:** AI Spec Builder
- **Tagline:** Convierte cualquier idea en una especificación técnica lista para Claude Code
- **Beneficios:** "Spec completa en menos de 60 segundos" · "Formato listo para CLAUDE.md" · "Sin conocimientos técnicos previos"

---

## 4. Validación

- Sin sesión → `"/"` muestra la home con nombre, descripción, beneficios y botón ✓
- Sin sesión → `/generator` redirige a `/sign-in` ✓
- Clic en "Empezar" → formulario de Clerk ✓
- Login correcto → llega al generador ✓
- Usuario con sesión visita `"/"` → redirige al generador sin ver la landing ✓
- Regresión: generar spec → exportar Markdown → exportar PDF → historial ✓

---

## 5. Commit

```
feat: add public home page and protect spec generator route
```

---

## El resultado en el repo

[→ specs/FeatureHomePage.md](https://github.com/domini-code/ai-spec-builder/blob/main/specs/FeatureHomePage.md)
