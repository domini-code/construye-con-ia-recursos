# SaaS OpenSpec Bundle

Tres specs pre-escritas para convertir cualquier app Next.js en un SaaS completo usando OpenSpec.

## Orden de instalación

Las specs tienen dependencias — aplícalas en este orden:

```
1. spec-supabase-auth-db.md   → Auth + Base de datos
2. spec-stripe-payments.md    → Plan Free vs. Pro
3. spec-resend-email.md       → Email transaccional
```

## Uso rápido

```bash
# 1. Copia la spec al proyecto
cp spec-supabase-auth-db.md openspec/changes/supabase-auth-db/proposal.md

# 2. Aplica
opsx apply

# 3. Archiva
opsx archive

# Repite para Stripe y Resend
```

## Requisitos previos

- Next.js 14+ con App Router y TypeScript
- OpenSpec instalado: `npm install -g @fission-ai/openspec@latest`
- Cuentas creadas en Supabase, Stripe y Resend (ver cada spec para el setup manual)

## Stack generado

| Herramienta | Propósito                                |
| ----------- | ---------------------------------------- |
| Supabase    | Auth (email + Google OAuth) + PostgreSQL |
| Stripe      | Pagos recurrentes + webhooks             |
| Resend      | Email transaccional                      |

---

Recurso del curso **Construye con IA: De la Idea al Producto con Claude** — [DominiCode](https://www.dominicode.com/spec-driven-development)
