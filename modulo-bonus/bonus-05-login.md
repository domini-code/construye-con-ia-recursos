# Bonus 5 — Login con autenticación

**Lección 26 del curso** · Proyecto: [AI Spec Builder](https://github.com/domini-code/ai-spec-builder)

El historial en localStorage funciona, pero la app es pública: cualquiera entra y consume tu API key. El login es el primer paso para que la app sepa quién la está usando.

---

## La decisión de stack: Clerk

En el vídeo usamos **Clerk**, y la razón es concreta: no hay que configurar nada en Google Cloud Console. El login con Google se activa desde el dashboard de Clerk en unos 30 segundos, sin credenciales OAuth manuales.

Es la opción más rápida tanto si programas como si no.

> Si vienes del Módulo 9 (Feedback Analyzer), ahí sí usamos Supabase Auth y sí pasamos por Google Cloud Console. Son dos apps distintas con dos decisiones distintas — el método es el mismo, cambia el proveedor.

---

## 1. La mini-spec

```markdown
## Feature: Autenticación con Clerk

**Qué hace:**
Protege la aplicación con Clerk: el usuario debe iniciar sesión antes
de acceder a la app y al API de generación de specs.

**Por qué:**
La app es pública y el endpoint consume tu API key. Sin login,
cualquiera puede gastar tus créditos.

**Criterios de aceptación:**
- [ ] Rutas públicas: /sign-in y /sign-up — el resto requiere sesión
- [ ] El header muestra el avatar del usuario y permite cerrar sesión
- [ ] El endpoint /api/generate-spec devuelve 401 sin sesión
- [ ] El historial en localStorage sigue funcionando igual

**No incluye:**
- Base de datos ni historial por usuario
- Migración del localStorage
- Múltiples proveedores ni roles
```

> El scope está muy definido: **solo autenticación**. El historial sigue en localStorage — eso es otro vídeo.

---

## 2. Prompt de plan mode

La decisión de stack ya está tomada, así que se la damos hecha:

```
Lee la feature "Autenticación con Clerk" en project-spec.md.

Decisión de stack ya tomada: usaremos Clerk (@clerk/nextjs) para la autenticación.
Clerk gestiona el login con Google desde su propio dashboard — no tocamos
Google Cloud Console ni configuramos credenciales OAuth a mano.

Scope de este video: solo autenticación. El historial sigue en localStorage sin cambios.

Propón un plan de implementación paso a paso. No implementes todavía.

El plan debe describir exactamente:
1. Qué paquete se instala y qué variables de entorno hacen falta
2. Cómo se configura middleware.ts con clerkMiddleware y createRouteMatcher
   para dejar públicas solo /sign-in y /sign-up
3. Dónde se envuelve el árbol con <ClerkProvider> en app/layout.tsx
4. Qué páginas de autenticación se crean y con qué componentes de Clerk
5. Dónde se coloca el <UserButton> para ver el avatar y cerrar sesión
6. Cómo se protege el endpoint /api/generate-spec server-side con auth()
7. Qué hay que verificar para que el historial y los botones de exportar
   sigan funcionando exactamente igual
```

Cuando Claude Code devuelva el plan, pídele que lo guarde como una feature en `specs/` antes de implementar. Ese archivo es el registro de la decisión.

---

## 3. Lo que se implementa

Siete archivos, ni uno más:

| Archivo | Acción |
|---|---|
| `middleware.ts` | Crear — `clerkMiddleware` + `createRouteMatcher` |
| `app/layout.tsx` | Editar — envolver con `<ClerkProvider>` |
| `app/sign-in/[[...sign-in]]/page.tsx` | Crear — componente `<SignIn />` |
| `app/sign-up/[[...sign-up]]/page.tsx` | Crear — componente `<SignUp />` |
| `app/page.tsx` | Editar — añadir `<UserButton />` |
| `app/api/generate-spec/route.ts` | Editar — verificar `auth()` server-side |
| `.env.local` | Editar — claves de Clerk |

Las variables salen del dashboard de Clerk después de crear la cuenta:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

**Por qué se protege el endpoint además del middleware:** el middleware ya bloquea la ruta, pero verificar `auth()` dentro del handler es defensa en profundidad. Si mañana alguien toca el matcher del middleware, el endpoint sigue cubierto.

---

## 4. Validación

- Sin sesión → cualquier ruta redirige a `/sign-in` ✓
- Login con Google desde el formulario de Clerk → vuelve autenticado ✓
- El avatar aparece en el header y permite cerrar sesión ✓
- Generar spec → exportar Markdown → exportar PDF ✓ (sin regresión)
- Abrir el historial → las specs siguen ahí ✓ (localStorage intacto)
- Llamar a `/api/generate-spec` sin sesión → 401 ✓

---

## 5. Commit

```
feat: add authentication with Clerk
```

---

## El resultado en el repo

La spec completa que se genera en este vídeo está publicada, con el código exacto de cada archivo:

[→ specs/FeatureLogin.md](https://github.com/domini-code/ai-spec-builder/blob/main/specs/FeatureLogin.md)
