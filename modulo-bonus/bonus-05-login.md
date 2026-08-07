# Bonus 5 — Login con autenticación

**Lección 26 del curso** · Proyecto: [AI Spec Builder](https://github.com/domini-code/ai-spec-builder)

El historial en localStorage funciona — pero solo en un dispositivo y un navegador. El login es el primer paso para que la app sepa quién la está usando.

---

## 1. La mini-spec

```markdown
## Feature: Login con autenticación Google

**Qué hace:**
Añade login con Google a la app — el usuario puede identificarse sin formularios.

**Por qué:**
La app pasa de ser anónima a tener identidad de usuario. Es el primer paso
para cualquier feature que necesite saber quién está usando la app.

**Criterios de aceptación:**
- [ ] Botón de login con Google en el header
- [ ] Botón de logout
- [ ] La app muestra el nombre y avatar del usuario autenticado
- [ ] Las rutas protegidas redirigen al login si no hay sesión

**No incluye:**
- Base de datos
- Migración del historial de localStorage
- Múltiples proveedores
- Roles de usuario
```

> El scope está muy definido: **solo login**. El historial sigue en localStorage — eso es otro vídeo.

---

## 2. Prompt de plan mode

**Decisión de stack ya tomada:** Supabase Auth. Google OAuth se activa desde el dashboard de Supabase en minutos, sin pasar por Google Cloud Console ni configurar credenciales OAuth a mano.

```
Lee la feature "Login con autenticación Google" en project-spec.md.

Decisión de stack ya tomada: usaremos Supabase Auth para la autenticación.
Supabase maneja el OAuth con Google — activamos el proveedor desde el dashboard
de Supabase, sin tocar Google Cloud Console.

Scope de este video: solo autenticación. El historial sigue en localStorage sin cambios.

Propón un plan de implementación paso a paso. No implementes todavía.

El plan debe describir exactamente:
1. Qué paquetes se instalan (@supabase/supabase-js, @supabase/ssr) y qué archivos
   se crean o modifican (middleware.ts, utils/supabase/, variables de entorno)
2. Cómo se crea el cliente de Supabase para server components y client components
3. Dónde se añade el botón de login (supabase.auth.signInWithOAuth({ provider: 'google' }))
   y el botón de logout (supabase.auth.signOut()) en el header
4. Cómo funciona la ruta /auth/callback para completar el flujo OAuth
5. Cómo se muestra el nombre y avatar del usuario con supabase.auth.getUser()
6. Qué rutas se protegen con el middleware de Supabase y cuáles quedan públicas
7. Qué hay que verificar para que el historial en localStorage y los botones de exportar
   sigan funcionando exactamente igual después del login
```

Al revisar: ¿el middleware protege solo lo necesario? ¿La ruta de generación queda pública o protegida?

Es un plan corto para un cambio que normalmente ocupa un día entero. Ese es el punto.

---

## 3. Validación

- Sin sesión → el header muestra el botón de login ✓
- Clic en "Continuar con Google" → flujo de Supabase Auth → vuelve autenticado ✓
- El header muestra nombre y avatar ✓
- Generar spec → exportar Markdown → exportar PDF ✓ (sin regresión)
- Abrir el historial → las specs siguen ahí ✓ (localStorage intacto)
- Logout → el header vuelve al botón de login ✓

---

## 4. Commit

```
feat: add Google login with Supabase Auth
```

---

## Nota sobre el repo

El [repo del AI Spec Builder](https://github.com/domini-code/ai-spec-builder) tiene la autenticación resuelta con **Clerk**, no con Supabase Auth. Es una decisión posterior a la grabación y no cambia nada del método: la mini-spec, el plan mode y la validación son idénticos — solo cambia el proveedor en el paso de implementación.

Si sigues el vídeo, usa Supabase Auth. Si prefieres mirar el código final, encontrarás Clerk. Ambos caminos llegan al mismo sitio.
