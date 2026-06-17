# The Hillard — Guía de Operación para Eliau
*Preparado por Santi (@SantiagoGX) · Junio 2026*

---

Este documento es tu referencia completa para operar el sitio y el sistema de reservas de The Hillard de forma independiente. Cubre qué tienes, cómo funciona cada pieza, y qué pasos quedan pendientes para llegar al 100%.

---

## Índice

1. [Conectar el dominio thehillard.com](#1-conectar-el-dominio-thehillardcom)
2. [Cómo funciona el sistema de reservas](#2-cómo-funciona-el-sistema-de-reservas)
3. [Recibir notificaciones en dreamriverventures@gmail.com](#3-recibir-notificaciones-en-dreamriverventuresgmailcom)
4. [Mejora propuesta: email de aprobación con botón](#4-mejora-propuesta-email-de-aprobación-con-botón)
5. [Conectar Stripe](#5-conectar-stripe)
6. [Cuenta de Make — acceso y control](#6-cuenta-de-make--acceso-y-control)
7. [Contacto técnico](#7-contacto-técnico)

---

## 1. Conectar el dominio thehillard.com

El sitio ya está live en:

```
https://the-hillard.pages.dev
```

El dominio final `thehillard.com` todavía no está conectado — ese es el único paso que falta para que el sitio sea público con tu dominio definitivo.

### Opción A — Si el dominio está en Cloudflare (más simple)

Si compraste `thehillard.com` en Cloudflare, la conexión es casi automática:

1. Entra a [dash.cloudflare.com](https://dash.cloudflare.com) con `dreamriverventures@gmail.com`
2. En el panel izquierdo, ve a **Workers & Pages**
3. Haz clic en el proyecto **the-hillard**
4. Ve a la pestaña **Custom Domains**
5. Haz clic en **Set up a custom domain**
6. Escribe `thehillard.com` y sigue los pasos — Cloudflare configura todo automáticamente

### Opción B — Si el dominio está en otro registrador (GoDaddy, Namecheap, Google Domains, etc.)

Tienes dos sub-opciones:

**Sub-opción B1: Agregar un registro CNAME en tu registrador**

1. Entra al panel de tu registrador (donde compraste el dominio)
2. Ve a **DNS Management** o **DNS Settings**
3. Agrega un registro CNAME con estos valores:

| Campo | Valor |
|---|---|
| Type | `CNAME` |
| Name / Host | `@` (o el dominio raíz, según cómo lo indique tu registrador) |
| Target / Value | `the-hillard.pages.dev` |
| TTL | Automático o 300 |

4. Guarda el cambio
5. Luego, en Cloudflare (dash.cloudflare.com → Workers & Pages → the-hillard → Custom Domains), agrega `thehillard.com` para que Cloudflare reconozca y active el dominio

> Nota: los cambios DNS pueden tardar entre 5 minutos y 48 horas en propagarse completamente. Lo normal es menos de 1 hora.

**Sub-opción B2: Transferir los nameservers a Cloudflare**

Esta opción da más control y es más robusta a largo plazo. En tu registrador, cambia los nameservers del dominio a los de Cloudflare (Cloudflare los muestra cuando agregas el dominio a tu cuenta). Una vez apuntados a Cloudflare, la conexión con Pages es automática.

---

## 2. Cómo funciona el sistema de reservas

El sistema está diseñado para propiedades de alto valor como The Hillard. Aquí está el flujo completo:

### Flujo paso a paso

```
Huésped llena el formulario
        ↓
Make recibe los datos al instante
        ↓
Make consulta el calendario de Guesty en tiempo real
        ↓
¿Fechas disponibles?
    ↙              ↘
  SÍ                 NO
  ↓                   ↓
Tú recibes         Tú recibes
email ✅            email ⚠️
AVAILABLE          CONFLICT
        ↓
Tú evalúas el perfil del huésped
        ↓
Si aceptas: creas un Stripe Payment Link
        ↓
Huésped paga
        ↓
Confirmas la reserva en Guesty
        ↓
Mensajes automáticos al huésped se activan
```

### El formulario de reserva

El huésped llena desde el sitio:
- Fechas de check-in y check-out (con calendario interactivo — las fechas ya ocupadas en Guesty aparecen bloqueadas automáticamente)
- Número de huéspedes
- Nombre completo
- Email
- Teléfono
- Ocasión o tipo de evento

### Los emails que recibes

**Cuando hay disponibilidad:**

```
✅ AVAILABLE

Nombre: John Smith
Email: john@email.com
Teléfono: +1 (555) 123-4567
Check-in: 2026-11-15
Check-out: 2026-11-18
Huéspedes: 8
Ocasión: Cumpleaños familiar
```

**Cuando hay conflicto:**

```
⚠️ CONFLICT

Las fechas solicitadas (Nov 15–18) se solapan con una reserva existente en Guesty.
```

### Por qué el paso manual de aprobación es correcto para una propiedad como esta

El "Instant Booking" automático (aceptar y cobrar sin revisar al huésped) es el estándar para propiedades de bajo costo con muchas reseñas. Para The Hillard — una mansión exclusiva de $5,000–$15,000+ por estadía — el flujo manual es una **ventaja**, no una limitación.

Razones concretas:

| Beneficio | Explicación |
|---|---|
| **Control del tipo de evento** | Puedes declinar eventos que no quieres en la propiedad (fiestas de graduación, despedidas de soltero sin supervisión, etc.) |
| **Evaluación del perfil del huésped** | Puedes revisar quién es antes de comprometerte |
| **Precio flexible** | Puedes ajustar el monto según el evento o la temporada antes de enviar el link de pago |
| **Protección de la propiedad** | Una mansión de 1865 con antigüedades y acabados originales merece vetting de sus huéspedes |
| **Posicionamiento** | Las propiedades de lujo exclusivo no hacen "instant booking" — el proceso selectivo es parte de la experiencia premium |

Cuando tengas decenas de reseñas y el perfil de la propiedad esté bien establecido en plataformas, podrás activar Instant Booking en canales específicos si lo deseas. Por ahora, el paso de aprobación manual es exactamente lo correcto.

---

## 3. Recibir notificaciones en dreamriverventures@gmail.com

Actualmente, todas las notificaciones del formulario de reserva llegan solo a:

```
delevilleofficial@gmail.com
```

Para recibir también en `dreamriverventures@gmail.com`, hay que agregar esa dirección como CC en el módulo de email de Make.

### Cómo hacerlo

1. Entra a [make.com](https://make.com) con `delevilleofficial@gmail.com`
2. Abre el escenario de reservas (el que procesa los formularios del sitio)
3. Busca el módulo de **Send Email** (el que envía la notificación de AVAILABLE o CONFLICT)
4. En el campo **CC**, agrega:

```
dreamriverventures@gmail.com
```

5. Guarda el escenario

**Alternativa:** Agregar un segundo módulo "Send Email" que envíe una copia idéntica a `dreamriverventures@gmail.com`. Esto es útil si quieres un asunto o formato ligeramente diferente para cada bandeja.

> Claude Cowork puede hacer este cambio completamente. Solo necesita que Make esté abierto en su navegador. Inicia sesión en make.com con `delevilleofficial@gmail.com` y luego abre Make en la sesión de Claude Cowork.

---

## 4. Mejora propuesta: email de aprobación con botón

Esta es la siguiente mejora de alta prioridad para el sistema de reservas. Elimina el paso manual de Stripe.

### Flujo actual (con fricción)

```
Recibes email AVAILABLE
        ↓
Abres Stripe manualmente
        ↓
Creas un Payment Link por el monto correcto
        ↓
Copias el link
        ↓
Abres tu email
        ↓
Redactas el email al huésped
        ↓
Pegas el link y envías
```

Eso son **6–8 pasos manuales** para cada reserva que aceptas.

### Flujo propuesto (un solo clic)

```
Recibes email AVAILABLE con botón:
[ ✅ Enviar link de pago al huésped ]
        ↓
Haces clic en el botón
        ↓
Make crea automáticamente el Stripe Payment Link
por el monto calculado (noches × tarifa)
        ↓
Make envía el link directamente al huésped
con un email de marca de The Hillard
        ↓
Listo
```

Un solo clic. Sin abrir Stripe. Sin copiar links. Sin redactar emails.

### Cómo implementarlo en Make

Make tiene un módulo nativo de Stripe. Los pasos necesarios son:

1. **Conectar Stripe a Make**
   - En Make: Settings → Connections → Add connection → Stripe
   - Ingresa tus credenciales de Stripe (API Key)

2. **Agregar un webhook de aprobación**
   - Make crea una URL única que se activa cuando haces clic en el botón del email
   - El botón del email apunta a esa URL

3. **Agregar el módulo "Create Payment Link" de Stripe**
   - Make toma el monto calculado (noches × tarifa) y crea el link automáticamente
   - El link queda registrado en Stripe igual que si lo hubieras creado tú manualmente

4. **Agregar el módulo "Send Email to Guest"**
   - Una vez creado el link, Make envía un email al huésped con el link de pago
   - El email puede llevar el branding de The Hillard (logo, tono, instrucciones)

> **¿Quieres implementar esto?** Claude Cowork puede configurarlo completamente. Solo necesitas darle acceso a Make (abre make.com en la sesión de Claude Cowork) y conectar tu cuenta de Stripe primero (ver sección siguiente). Una vez que ambos estén conectados, Claude Cowork hace el resto.

---

## 5. Conectar Stripe

Stripe es el procesador de pagos. Es gratuito crear una cuenta — solo cobran cuando procesas un pago.

### Crear la cuenta

1. Ve a [stripe.com](https://stripe.com)
2. Haz clic en **Start now** o **Create account**
3. Usa el email que prefieras para el negocio (recomendado: `delevilleofficial@gmail.com` o `info@thehillard.com` cuando lo crees)
4. Completa la verificación de identidad y datos bancarios para recibir pagos

**Costo:** ~2.9% + $0.30 por transacción. En una reserva de $8,000, eso son ~$232 de comisión. Sin cuota mensual.

### Flujo manual (mientras no esté conectado a Make)

Hasta que implementes la mejora de la sección 4, el flujo manual es:

1. Recibes el email AVAILABLE
2. Entras a [stripe.com](https://stripe.com) → **Payment Links** en el menú lateral
3. Haz clic en **New payment link**
4. Establece el monto (noches × tarifa nightly de la propiedad)
5. Copia el link generado
6. Envíaselo al huésped por email

### Conectar Stripe a Make (para la automatización)

Una vez creada la cuenta en Stripe:

1. En Stripe: ve a **Developers** → **API Keys**
2. Copia tu **Secret Key** (empieza con `sk_live_...`)
3. En Make: Settings → Connections → Add → Stripe → pega la Secret Key

Con eso, Make puede crear Payment Links automáticamente sin que tengas que entrar a Stripe nunca.

---

## 6. Cuenta de Make — acceso y control

Make es la plataforma donde vive toda la automatización del sistema de reservas.

| Dato | Valor |
|---|---|
| URL | [make.com](https://make.com) |
| Cuenta | `delevilleofficial@gmail.com` |
| Contraseña | La que configuraste al crear la cuenta |

### Qué hay configurado en Make

| Componente | Qué hace |
|---|---|
| **Webhook de entrada** | Recibe los datos del formulario del sitio al instante |
| **Consulta a Guesty** | Revisa el calendario de reservas en tiempo real |
| **Detector de conflictos** | Compara las fechas solicitadas contra las ocupadas |
| **Email AVAILABLE** | Envía los datos del huésped a `delevilleofficial@gmail.com` cuando hay disponibilidad |
| **Email CONFLICT** | Te avisa cuando las fechas ya están ocupadas |
| **Email de confirmación al huésped** | Le dice al huésped que su solicitud fue recibida y que lo contactarán en 24 horas |

### Cómo accede Claude Cowork a Make

Claude Cowork puede operar Make directamente desde su navegador. Para activarlo:

1. Dile a Claude Cowork que abra make.com
2. Claude Cowork verá el login — inicia sesión con `delevilleofficial@gmail.com`
3. Una vez dentro, Claude Cowork puede editar escenarios, agregar módulos, conectar servicios, y probar automatizaciones

No necesitas saber hacer eso tú mismo. Claude Cowork es el operador técnico de Make.

### Cambios que Claude Cowork puede hacer en Make

- Agregar `dreamriverventures@gmail.com` como CC en las notificaciones (sección 3)
- Conectar Stripe e implementar el botón de aprobación (sección 4)
- Ajustar el texto de los emails de notificación
- Agregar nuevos pasos al flujo (WhatsApp, Slack, etc.)
- Cambiar la dirección de email de destino

---

## 7. Contacto técnico

Para cualquier cambio al sitio, ajuste de automatización, nueva funcionalidad, o consulta técnica:

**Santi — @SantiagoGX**

### Qué puede manejar Santi

- Cambios de diseño o contenido en el sitio
- Nuevas secciones o funcionalidades
- Ajustes al sistema de reservas
- Integraciones con nuevos servicios
- Problemas técnicos o errores

### Qué puede manejar Claude Cowork (con acceso)

- Configuraciones en Make (automatizaciones)
- Cambios en los emails de notificación
- Conexión de servicios a Make (Stripe, etc.)
- Ajustes al flujo de reservas

### Referencia rápida — cuentas y accesos

| Servicio | Email / Cuenta | URL |
|---|---|---|
| Cloudflare (hosting) | `dreamriverventures@gmail.com` | [dash.cloudflare.com](https://dash.cloudflare.com) |
| GitHub (código) | `dreamriverventures@gmail.com` | [github.com/dreamriverventures-ux/the-hillard](https://github.com/dreamriverventures-ux/the-hillard) |
| Make (automatización) | `delevilleofficial@gmail.com` | [make.com](https://make.com) |
| Guesty (PMS / calendario) | Tu cuenta Guesty | [app.guesty.com](https://app.guesty.com) |
| Stripe (pagos) | Por configurar | [stripe.com](https://stripe.com) |
| Sitio actual | — | [the-hillard.pages.dev](https://the-hillard.pages.dev) |
| Dominio final | — | thehillard.com (pendiente conexión) |
