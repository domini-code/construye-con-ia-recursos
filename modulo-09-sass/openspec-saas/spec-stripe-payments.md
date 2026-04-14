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

Ejecutar en el SQL Editor de Supabase antes de `opsx apply`:

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
opsx apply
opsx archive
```

**Opción B — como referencia para propose:**
```bash
opsx propose "Add Stripe payments. Free plan: 5 analyses/month, block with 402 when exceeded.
Pro plan: unlimited. On 402, show UpgradeModal with checkout button. POST /api/checkout creates
a Stripe Checkout Session. POST /api/webhooks/stripe verifies signature and sets plan='pro' in
Supabase user_plans table on checkout.session.completed. Add getUserPlan(userId) in lib/plans.ts."
```
