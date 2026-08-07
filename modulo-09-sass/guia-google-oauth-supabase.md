# Guía — Google OAuth en Supabase

Recurso complementario a las lecciones **46 — Crear el proyecto OAuth en Google Cloud Console** y **47 — Activar Google como proveedor en Supabase**, del Módulo 9 (AI Feedback Analyzer).

Cuando activas **Google** como proveedor en Supabase, aparece este campo:

> *At least one Client ID is required when Google sign-in is enabled.*
> *Comma-separated list of client IDs for Web, OAuth, Android apps, One Tap, and Chrome extensions.*

Esta guía te muestra qué poner ahí y cómo obtenerlo.

---

## Qué pide Supabase

El **Client ID de OAuth** de Google Cloud. Es una credencial que identifica tu aplicación ante Google cuando un usuario inicia sesión.

El campo acepta varios IDs separados por coma por si en el futuro añades clientes nativos (Android, iOS, One Tap, extensión de Chrome). **Para una app web con Next.js basta con uno solo** — el de tipo *Web application*.

---

## Requisitos previos

- Cuenta de Google.
- Proyecto de Supabase ya creado (tienes abierta la pantalla de *Authentication → Providers → Google*).
- A mano, la **Callback URL** que Supabase muestra en esa misma pantalla. Tiene esta forma:
  ```
  https://<project-ref>.supabase.co/auth/v1/callback
  ```

---

## Paso a paso

### 1. Entra a Google Cloud Console

Ve a [console.cloud.google.com](https://console.cloud.google.com) y crea o selecciona un proyecto (arriba a la izquierda, selector de proyecto → *New project* si es la primera vez).

### 2. Configura la OAuth Consent Screen

Solo es necesario la primera vez en el proyecto.

1. Menú lateral → **APIs & Services → OAuth consent screen**.
2. **User Type:** *External* → *Create*.
3. Rellena los campos mínimos:
   - **App name:** `AI Feedback Analyzer` (o el nombre de tu app).
   - **User support email:** tu correo.
   - **Developer contact email:** tu correo.
4. *Save and Continue* en las pantallas de *Scopes* y *Test users* (no hace falta añadir nada para empezar).
5. Vuelves al dashboard — la consent screen queda en modo *Testing*, suficiente para desarrollo.

### 3. Crea la credencial OAuth Client ID

1. Menú lateral → **APIs & Services → Credentials**.
2. **Create Credentials → OAuth client ID**.
3. **Application type:** *Web application*.
4. **Name:** algo descriptivo, por ejemplo `Feedback Analyzer — Web`.
5. **Authorized JavaScript origins** (opcional para este flujo, pero recomendado):
   ```
   http://localhost:3000
   https://<tu-dominio-en-produccion>
   ```
6. **Authorized redirect URIs** — aquí pegas el callback de Supabase tal cual aparece en la pantalla de Supabase:
   ```
   https://<project-ref>.supabase.co/auth/v1/callback
   ```
7. *Create*.

### 4. Copia las credenciales a Supabase

Google te muestra un modal con dos valores:

- **Client ID** — termina en `.apps.googleusercontent.com`.
- **Client Secret** — una cadena corta.

En la pantalla de Supabase (Authentication → Providers → Google):

- Pega el **Client ID** en *Client IDs*.
- Pega el **Client Secret** en *Client Secret*.
- Guarda.

---

## Verificación

En tu app, al hacer click en "Continuar con Google" deberías:

1. Ser redirigido al selector de cuenta de Google.
2. Tras elegir cuenta, volver a tu app autenticado.
3. Ver tu registro en Supabase → **Authentication → Users**.

---

## Errores comunes

| Error | Causa | Solución |
| ----- | ----- | -------- |
| `redirect_uri_mismatch` | La callback URL que usas no coincide con la registrada en Google Cloud | Copia la URL exacta desde la pantalla de Supabase y pégala en *Authorized redirect URIs*. Respeta `http`/`https` y sin barra final. |
| `Access blocked: app not verified` | La consent screen está en *Testing* y el usuario no está en la lista de testers | En desarrollo, añade tu correo en *OAuth consent screen → Test users*. En producción, publica la app. |
| `invalid_client` | Client ID o Secret mal copiados | Vuelve a Credentials en Google Cloud, reabre la credencial y copia otra vez. |

---

## Cuándo añadir más Client IDs

Solo si tu producto crece a otras plataformas:

- **Android:** crea un Client ID tipo *Android* y añádelo separado por coma.
- **iOS:** Client ID tipo *iOS*.
- **Google One Tap / Chrome extension:** Client IDs específicos.

Para el alcance del curso (web), **uno basta**.

---

## Referencia oficial

- Supabase — [Login con Google](https://supabase.com/docs/guides/auth/social-login/auth-google)
- Google Cloud — [Setting up OAuth 2.0](https://support.google.com/cloud/answer/6158849)
