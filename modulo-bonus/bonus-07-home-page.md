# Bonus 7 — Home page y acceso protegido: la entrada a tu producto

**Lección 28 del curso** · Proyecto: [AI Spec Builder](https://github.com/domini-code/ai-spec-builder)

La app tiene login y funciona. Pero cuando alguien visita la URL sin sesión, el middleware lo manda al login directamente — sin nombre, sin descripción, sin saber qué es esto.

Eso no es un producto. Es una puerta sin entrada.

Dos cosas tienen que pasar:

1. Un usuario nuevo llega a una home page que explica qué es la app y lo invita a entrar
2. El generador de specs es una zona protegida: solo accesible con sesión

---

## 1. Prompt de mini-spec

```
Tengo el AI Spec Builder: una app Next.js con Supabase Auth para autenticación.
El login está implementado — el usuario puede autenticarse con Google.

El problema: cuando un usuario visita la app sin sesión, el middleware
redirige al login sin ningún contexto. No sabe qué es la app ni
por qué debería entrar.

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
  tres beneficios y un botón CTA "Empezar" que llama a signInWithOAuth de Supabase Auth
- Diseño coherente con el resto de la app (Tailwind, mismos colores)
- Si el usuario ya tiene sesión y visita "/", debe redirigir al generador
- El generador queda en su ruta actual — no cambia de URL

Sé específico. El campo "No incluye" protege el scope.
```

### La mini-spec final

```markdown
## Feature: Home page pública y acceso protegido

**Qué hace:**
Añade una home page pública en "/" y protege la ruta del generador
de specs para que solo sea accesible con sesión activa.

**Por qué:**
Sin home page, un visitante nuevo ve el formulario de login sin contexto.
Sin protección, el generador es accesible aunque la app tenga login —
lo que hace el login irrelevante como requisito de uso.

**Criterios de aceptación:**
- [ ] "/" muestra la home page si el usuario no está autenticado
- [ ] La home incluye: nombre, descripción de una línea, tres beneficios y botón CTA
- [ ] El botón CTA llama a `signInWithOAuth` de Supabase Auth y abre el flujo de login con Google
- [ ] Si el usuario ya tiene sesión, "/" redirige automáticamente al generador
- [ ] El generador requiere sesión activa — sin ella, redirige al login
- [ ] Diseño coherente con el resto de la app (Tailwind, mismos colores)
- [ ] Logout desde el header lleva de vuelta a la home page

**No incluye:**
- Múltiples secciones de marketing (pricing, FAQ, testimonios)
- Rutas intermedias (/about, /features)
- Cambios en la lógica de generación de specs
- Cambios en el historial ni en los botones de exportar
```

> Dos comportamientos, una sola mini-spec. Lo que más importa del "No incluye": no tocamos nada del generador ni del historial.

---

## 2. Prompt de plan mode

```
Lee la feature "Home page pública y acceso protegido" en project-spec.md.

El proyecto usa Next.js con Supabase Auth. El middleware de Supabase ya existe.

Propón un plan de implementación paso a paso. No implementes todavía.

El plan debe describir:
1. Qué hace app/page.tsx hoy y cómo cambia
2. Cómo se detecta si hay sesión con supabase.auth.getUser() para redirigir al generador desde "/"
3. Qué componentes o secciones tiene la home: encabezado, beneficios, botón CTA
4. Qué cambia en el middleware de Supabase para proteger la ruta del generador
5. Qué rutas quedan públicas ("/") y cuáles protegidas (el generador)
6. Qué archivos toca en total y en qué orden
```

Dos puntos críticos al revisar el plan:

- La lógica de redirección en `app/page.tsx`: ¿usa `supabase.auth.getUser()` en server component o en client?
- El middleware: ¿protege la ruta del generador **sin** afectar a `"/"`?

Si el plan está bien, toca exactamente **dos archivos**: `app/page.tsx` y `middleware.ts`. Si propone tocar más, el scope se te está escapando.

---

## 3. Copy de la home (para no improvisar)

- **Título:** AI Spec Builder
- **Tagline:** Convierte cualquier idea en una especificación técnica lista para Claude Code
- **Beneficios:** "Spec completa en menos de 60 segundos" · "Formato listo para CLAUDE.md" · "Sin conocimientos técnicos previos"

---

## 4. Validación

- Sin sesión → `"/"` muestra la home con nombre, descripción, beneficios y botón ✓
- Sin sesión → ruta del generador: redirige al login ✓
- Clic en "Empezar" → `signInWithOAuth` abre el flujo con Google ✓
- Login exitoso → redirige al generador ✓
- Usuario con sesión visita `"/"` → redirige al generador ✓
- Logout → vuelve a la home ✓
- Regresión: generar spec → exportar Markdown → exportar PDF → historial ✓

---

## 5. Commit

```
feat: add public home page and protect spec generator route
```
