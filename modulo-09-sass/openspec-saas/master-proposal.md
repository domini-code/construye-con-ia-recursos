# Prompt: Master Proposal — de app a SaaS

> Prompt del **Video 14 — El plan y el master proposal**.
> Este es el `/opsx:propose` que arranca la conversión completa: describe las tres integraciones y el orden en que se aplican. No sustituye a las specs individuales — les da contexto y secuencia.

---

## Cómo usarlo

Pégalo en el chat de Claude Code, dentro del proyecto del Feedback Analyzer:

```bash
/opsx:propose Transform the Feedback Analyzer into a production SaaS.
Three integrations in order:
1. Supabase — auth (email + Google OAuth) and database: analyses table
   with user_id, persist each analysis per user.
2. Stripe — free tier: 5 analyses/month. Pro plan: unlimited.
   Webhook updates plan status in Supabase on payment.
3. Resend — transactional email: welcome on signup,
   upgrade prompt when free limit is reached.
Each integration will be proposed and applied separately.
```

OpenSpec genera el `proposal.md` con el plan arquitectónico completo — el mapa de las tres capas y sus dependencias.

## Siguiente paso

Este proposal es el mapa; las rutas son los tres proposals específicos, uno por integración:

1. [spec-supabase-auth-db.md](./spec-supabase-auth-db.md) — Auth + Base de datos
2. [spec-stripe-payments.md](./spec-stripe-payments.md) — Plan Free vs. Pro
3. [spec-resend-email.md](./spec-resend-email.md) — Email transaccional

Cada uno se propone, aplica y archiva por separado con su propio ciclo `/opsx:propose → /opsx:apply → /opsx:archive`.

---

Recurso del curso **Construye con IA: De la Idea al Producto con Claude** — [DominiCode](https://www.dominicode.com/spec-driven-development)
