# Spec: Resend — Email transaccional

> Spec pre-escrita lista para usar con OpenSpec.  
> Requiere Supabase (auth) y Stripe (plan Pro) ya integrados antes de aplicar esta spec.

---

## Propuesta

Añadir tres emails transaccionales que acompañan los momentos clave del flujo de usuario:

1. **Bienvenida** — al registrarse por primera vez (trigger: webhook de Supabase `auth.users` insert)
2. **Límite alcanzado** — cuando la API devuelve 402 por primera vez en el mes (trigger: lógica en la API route)
3. **Plan Pro activado** — cuando el webhook de Stripe completa el pago (trigger: `checkout.session.completed`)

---

## Stack asumido

- Next.js 14+ con App Router
- TypeScript
- Supabase auth ya integrado (`user.email` disponible)
- Stripe webhook ya integrado (`/api/webhooks/stripe`)
- `resend` (Node.js SDK)
- Variables de entorno:
  - `RESEND_API_KEY`
  - `EMAIL_FROM` — dirección remitente (ej. `hola@tudominio.com`)

---

## Emails

### Email 1 — Bienvenida
- **Asunto:** Bienvenido — tienes 5 análisis gratuitos este mes
- **Trigger:** nuevo usuario creado en `auth.users` (webhook de Supabase o hook en el flujo de registro)
- **Contenido:** nombre del producto, qué puede hacer, cómo empezar, recordatorio del límite gratuito

### Email 2 — Límite alcanzado
- **Asunto:** Has usado tus 5 análisis de este mes
- **Trigger:** la API route devuelve 402 y `limit_email_sent` aún no está marcado para este mes
- **Contenido:** resumen del uso, enlace directo al checkout de Stripe
- **Regla:** enviarse **una sola vez por mes** — añadir columna `limit_email_sent_at` en `user_plans` para evitar duplicados

### Email 3 — Plan Pro activado
- **Asunto:** Tu Plan Pro está activo — análisis ilimitados
- **Trigger:** `checkout.session.completed` en el webhook de Stripe (ya existente)
- **Contenido:** confirmación del upgrade, qué cambia, enlace a la app

---

## Delta markers

```
ADDED:   lib/email.ts                              — sendWelcomeEmail(), sendLimitEmail(), sendProActivatedEmail() usando Resend SDK
ADDED:   app/api/webhooks/supabase/route.ts        — POST: escucha auth.users insert y envía email de bienvenida
MODIFIED: app/api/analyze-feedback/route.ts        — al devolver 402, comprueba limit_email_sent_at; si no enviado este mes, llama sendLimitEmail() y actualiza el campo
MODIFIED: app/api/webhooks/stripe/route.ts         — tras activar plan Pro, llama sendProActivatedEmail()
MODIFIED: supabase/schema.sql (o SQL Editor)       — añade columna limit_email_sent_at timestamptz a user_plans
```

---

## Schema SQL adicional

```sql
alter table user_plans
  add column limit_email_sent_at timestamptz;
```

---

## Configuración en Resend (manual, antes de apply)

1. Crear cuenta en resend.com → crear API key
2. Añadir y verificar dominio (o usar `onboarding@resend.dev` para testing)
3. Copiar API key → `RESEND_API_KEY` en `.env.local`
4. Definir `EMAIL_FROM` en `.env.local`

---

## Criterios de aceptación

- [ ] Registro con usuario nuevo → email de bienvenida llega en menos de 30 segundos
- [ ] Al alcanzar el límite → email de límite llega con enlace al checkout
- [ ] El email de límite no se reenvía si el usuario intenta un 7º o 8º análisis en el mismo mes
- [ ] Tras pagar con Stripe test → email de confirmación del Plan Pro llega
- [ ] Los tres envíos aparecen como `delivered` en el dashboard de Resend
- [ ] Ningún email se envía si `RESEND_API_KEY` no está configurado (falla silenciosamente con log de error)

---

## Cómo usar esta spec con OpenSpec

**Opción A — apply directo:**
```bash
cp spec-resend-email.md openspec/changes/resend-email/proposal.md
opsx apply
opsx archive
```

**Opción B — como referencia para propose:**
```bash
opsx propose "Add Resend transactional email. Three emails: (1) welcome on new user registration,
(2) limit-reached when API returns 402 for the first time this month — send only once per month,
store limit_email_sent_at in user_plans, (3) pro-activated when Stripe webhook completes payment.
Create lib/email.ts with the three send functions. Use RESEND_API_KEY and EMAIL_FROM env vars."
```
