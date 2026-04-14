# Spec: Supabase — Auth + Base de datos

> Spec pre-escrita lista para usar con OpenSpec.  
> Copia este archivo a tu proyecto y ejecuta `opsx apply` — o úsalo como referencia al escribir tu propio `opsx propose`.

---

## Propuesta

Añadir autenticación y persistencia de datos a la app usando Supabase como única plataforma para ambas capas.

**Auth:** el usuario puede registrarse e iniciar sesión con email/contraseña o con Google OAuth. Las rutas `/app/*` están protegidas — usuarios no autenticados son redirigidos a `/login`. El avatar del usuario aparece en la navegación cuando hay sesión activa.

**Base de datos:** cada análisis que el usuario ejecuta se persiste en una tabla `analyses` asociada a su `user_id`. La app expone un endpoint para consultar el historial y una función de utilidad para contar el uso mensual (necesaria para el sistema de límites de Stripe).

---

## Stack asumido

- Next.js 14+ con App Router
- TypeScript
- Tailwind CSS
- `@supabase/ssr` para auth server-side
- Variables de entorno: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## Schema SQL

Ejecutar en el SQL Editor de Supabase antes de `opsx apply`:

```sql
-- Tabla de análisis
create table analyses (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  created_at timestamptz default now(),
  input_text text not null,
  result jsonb not null,
  items_count int not null
);

create index analyses_user_id_idx on analyses(user_id);

-- RLS: cada usuario solo ve sus propios análisis
alter table analyses enable row level security;

create policy "Users can read own analyses"
  on analyses for select
  using (auth.uid() = user_id);

create policy "Users can insert own analyses"
  on analyses for insert
  with check (auth.uid() = user_id);
```

---

## Delta markers

```
ADDED:   lib/supabase/server.ts         — cliente Supabase para Server Components y API routes
ADDED:   lib/supabase/client.ts         — cliente Supabase para Client Components
ADDED:   lib/usage.ts                   — getMonthlyUsage(userId): número de análisis del mes actual
ADDED:   middleware.ts                  — protege /app/* y refresca la sesión en cada request
ADDED:   app/(auth)/login/page.tsx      — página de login (email + Google OAuth)
ADDED:   app/(auth)/register/page.tsx   — página de registro
ADDED:   app/api/analyses/route.ts      — GET: últimos 10 análisis del usuario autenticado
MODIFIED: app/layout.tsx               — envuelve la app con el contexto de sesión de Supabase
MODIFIED: app/api/analyze-feedback/route.ts — extrae user_id de la sesión; guarda el análisis en DB tras clasificar
MODIFIED: app/page.tsx                 — muestra avatar del usuario en el nav; redirige / → /app/analyzer si hay sesión
```

---

## Criterios de aceptación

- [ ] Usuario sin sesión → acceder a `/app/analyzer` redirige a `/login`
- [ ] Login con Google funciona y devuelve al analyzer
- [ ] Sign out limpia la sesión y vuelve a la home pública
- [ ] Tras clasificar feedback, aparece una fila nueva en la tabla `analyses` en el dashboard de Supabase
- [ ] `GET /api/analyses` devuelve los últimos 10 análisis del usuario autenticado
- [ ] `getMonthlyUsage(userId)` devuelve el conteo correcto para el mes actual
- [ ] Un usuario no puede leer los análisis de otro (RLS activo)

---

## Cómo usar esta spec con OpenSpec

**Opción A — apply directo:**
```bash
# Copia este archivo como proposal.md en tu carpeta de OpenSpec
cp spec-supabase-auth-db.md openspec/changes/supabase-auth-db/proposal.md
opsx apply
opsx archive
```

**Opción B — como referencia para propose:**
```bash
opsx propose "Add Supabase auth and database. Auth: email/password and Google OAuth,
protect /app/* routes, show user avatar in nav. DB: persist each analysis to 'analyses'
table (user_id, input_text, result jsonb, items_count). Add GET /api/analyses returning
last 10 for current user. Add getMonthlyUsage(userId) in lib/usage.ts."
```
