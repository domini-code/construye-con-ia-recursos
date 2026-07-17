# Spec: Stripe — Plan Free vs. Pro con webhooks

> Spec pre-escrita lista para usar con OpenSpec.  
> Requiere tener Supabase (auth + DB) ya integrado antes de aplicar esta spec.

---

## Propuesta

Añadir un sistema de pagos con dos planes: **Free** (5 análisis/mes) y **Pro** (ilimitado).

Cuando el usuario alcanza el límite del plan Free, la API devuelve 402 y el frontend muestra un modal de upgrade con un botón que inicia el checkout de Stripe. Cuando el pago se completa, Stripe envía un webhook que activa el plan Pro en Supabase. El usuario puede continuar usando la app sin límites.

---

## Stack asumido

- Next.js 14+ con App Router
- TypeScript
- Supabase ya integrado (`user_id` disponible en las API routes)
- `stripe` (Node.js SDK)
- Variables de entorno:
  - `STRIPE_SECRET_KEY`
  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
  - `STRIPE_PRICE_ID` — ID del precio mensual del Plan Pro
  - `STRIPE_WEBHOOK_SECRET` — generado con `stripe listen`

---

## Schema SQL adicional

Ejecutar en el SQL Editor de Supabase antes de `/opsx:apply`:

```sql
create table user_plans (
  user_id uuid references auth.users primary key,
  plan text default 'free' check (plan in ('free', 'pro')),
  stripe_customer_id text,
  stripe_subscription_id text,
  updated_at timestamptz default now()
);

alter table user_plans enable row level security;

create policy "Users can read own plan"
  on user_plans for select
  using (auth.uid() = user_id);
```

---

## Configuración en Stripe (manual, antes de apply)

1. Crear producto "Plan Pro" en el dashboard de Stripe
2. Añadir precio recurrente mensual (ej. €9.99/mes)
3. Copiar el `Price ID` → `STRIPE_PRICE_ID` en `.env.local`
4. Para testing local: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`

---

## Delta markers

```
ADDED:   lib/plans.ts                         — getUserPlan(userId): devuelve 'free' | 'pro'
ADDED:   app/api/checkout/route.ts            — POST: crea Stripe Checkout Session para el Plan Pro
ADDED:   app/api/webhooks/stripe/route.ts     — POST: verifica firma y activa plan Pro en Supabase al completar pago
ADDED:   components/UpgradeModal.tsx          — modal que aparece al alcanzar el límite, con botón de upgrade
MODIFIED: app/api/analyze-feedback/route.ts  — antes de llamar a Claude: comprueba plan y uso mensual; devuelve 402 si Free y uso >= 5
MODIFIED: app/page.tsx o app/app/analyzer/page.tsx — gestiona respuesta 402 y muestra UpgradeModal
```

---

## Criterios de aceptación

- [ ] Usuario Free: al 5º análisis del mes, el 6º devuelve HTTP 402
- [ ] Al recibir 402, el frontend muestra el `UpgradeModal`
- [ ] Click en "Activar Plan Pro" redirige al checkout de Stripe
- [ ] Pago con tarjeta de test `4242 4242 4242 4242` completa el checkout
- [ ] El webhook de Stripe actualiza `user_plans` → `plan: 'pro'` en Supabase
- [ ] Usuario Pro puede hacer más de 5 análisis en el mismo mes sin bloqueo
- [ ] El webhook rechaza peticiones sin firma válida (devuelve 400)

---

## Cómo usar esta spec con OpenSpec

**Opción A — apply directo:**
```bash
cp spec-stripe-payments.md openspec/changes/stripe-payments/proposal.md
/opsx:apply
/opsx:archive
```

**Opción B — como referencia para propose:**
```bash
/opsx:propose "Add Stripe payments. Free plan: 5 analyses/month, block with 402 when exceeded.
Pro plan: unlimited. On 402, show UpgradeModal with checkout button. POST /api/checkout creates
a Stripe Checkout Session. POST /api/webhooks/stripe verifies signature and sets plan='pro' in
Supabase user_plans table on checkout.session.completed. Add getUserPlan(userId) in lib/plans.ts."
```

---

## Prompts literales por video

Si prefieres pedirle cada pieza a Claude Code por separado en vez de aplicar la spec completa, estos son los prompts tal como se piden en el guión.

### Video 19 — `lib/usage.ts` (contador de uso mensual)

```
Crea lib/usage.ts con la función getMonthlyUsage(userId: string): Promise<number>.
Usa el cliente de servidor de Supabase (lib/supabase/server.ts). Cuenta las filas de la
tabla 'analyses' donde user_id = userId y created_at >= el primer día del mes natural actual.
Devuelve el conteo (0 si no hay ninguno). Lanza un error descriptivo si la query falla.
```

Resultado esperado:

```typescript
import { createClient } from '@/lib/supabase/server';

export async function getMonthlyUsage(userId: string): Promise<number> {
  const supabase = await createClient();
  const now = new Date();
  const startOfMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));

  const { count, error } = await supabase
    .from('analyses')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('created_at', startOfMonth.toISOString());

  if (error) throw new Error(`No se pudo contar el uso mensual: ${error.message}`);
  return count ?? 0;
}
```

### Video 20 — Bloqueo del plan gratuito (402)

```
En la API route de análisis, antes de llamar a Claude:
1. Obtén el plan del usuario con getUserPlan(userId)
2. Si el plan es 'free', obtén el uso mensual con getMonthlyUsage(userId)
3. Si el uso >= 5, devuelve 402 con el mensaje "Límite del plan gratuito alcanzado"
En el frontend, cuando la API devuelva 402, muestra un modal de upgrade con el botón "Activar Plan Pro"
```

### Video 21 — `POST /api/checkout`

```
Crea una API route POST /api/checkout que:
1. Reciba el userId del usuario autenticado
2. Cree o recupere el customer de Stripe para ese userId
3. Cree una Checkout Session para el STRIPE_PRICE_ID del Plan Pro
4. Devuelva la URL del checkout de Stripe
El frontend redirige a esa URL cuando el usuario hace click en "Activar Plan Pro"
```

### Video 22 — `POST /api/webhooks/stripe`

```
Crea una API route POST /api/webhooks/stripe que:
1. Verifique la firma del webhook con STRIPE_WEBHOOK_SECRET
2. En el evento checkout.session.completed, actualice la tabla user_plans:
   - plan: 'pro'
   - stripe_customer_id y stripe_subscription_id del evento
```
