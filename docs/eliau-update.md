# The Hillard — Website & Tech Update for Eliau
*Prepared by Santi · June 2026*

---

## El sitio está live

**URL actual:** https://the-hillard.pages.dev

El sitio está completamente funcional y deployado. El dominio final `thehillard.com` se conecta cuando estés listo — es un cambio de 5 minutos en tu registrador de dominio (ver sección "Pendiente" al final).

---

## Por qué migramos de Netlify a Cloudflare

El sitio empezó en Netlify. El problema: Netlify en plan gratuito permite solo ~20 deploys por mes — y cuando se acaban, el sitio se cae offline. Con los cambios frecuentes que hacemos, eso nos bloqueó.

Cloudflare Pages tiene **500 deploys por mes gratis**, sin límite de bandwidth, y si algún mes se excede, el sitio simplemente no actualiza — pero nunca se cae.

**Cuenta de Cloudflare:** dreamriverventures@gmail.com → dash.cloudflare.com

---

## Lo que se construyó

### El sitio web completo

Stack: HTML + CSS + JavaScript puro. Sin frameworks. Carga rápida en móvil y desktop.

**Secciones del sitio (de arriba a abajo):**

| Sección | Descripción |
|---|---|
| **Nav** | Logo centrado, links de navegación, CTA "Inquire & Reserve". En móvil: hamburger menu con animación |
| **Hero** | Slider de 6 fotos con crossfade automático. Overlay verde forestal |
| **Intro Strip** | Marquee animado con atributos de la propiedad |
| **About** | Historia y descripción de la mansión |
| **Stats** | 1865 · 9 bedrooms · 22 guests · 8 fireplaces |
| **The Spaces** | Tabs (Common Spaces / Bedrooms). 6 espacios comunes + 11 habitaciones con fotos reales |
| **Amenities** | 6 amenidades con íconos SVG |
| **Events Banner** | Foto de la propiedad con CTA para eventos privados |
| **Gallery** | Grid asimétrico de 15 fotos reales |
| **Testimonial** | Kowalski Family, Philadelphia PA |
| **Location** | Dirección completa, coordenadas, distancias desde NYC (2.5h) y Philadelphia (2h) |
| **Reserve** | CTA de reserva → abre el booking panel |
| **Footer** | Logo, tagline, email waitlist, dirección, contacto, redes sociales |

### Booking Panel (slide-in)

Al hacer clic en "Inquire & Reserve", se abre un panel lateral donde el huésped completa:
- Check-in / Check-out con calendario interactivo
- Número de huéspedes
- Nombre, email, teléfono, ocasión

**Las fechas ocupadas en Guesty aparecen automáticamente bloqueadas** — el huésped no puede seleccionarlas ni enviar un conflicto sin querer.

### Imágenes optimizadas

31 imágenes en formato WebP (30-70% más livianas que JPG). Carga rápida incluso con señal débil.

### Mobile 100% funcional

Auditado para iPhone SE, iPhone estándar, iPhone Pro Max. Ningún elemento desbordado ni superpuesto. El calendario del booking panel también funciona correctamente en táctil.

### Favicon

Ícono de la mansión (la misma ilustración del header y footer) visible en la pestaña del navegador.

---

## La automatización (Make + Guesty)

Cuando alguien llena el formulario de reserva en el sitio, Make verifica automáticamente si las fechas están disponibles.

### Cómo funciona

1. El huésped llena el formulario con sus fechas y datos
2. Make recibe los datos instantáneamente
3. Make consulta el calendario de Guesty en tiempo real
4. Make verifica si las fechas se solapan con reservas existentes
5. Tú recibes un email en delevilleofficial@gmail.com:

**Si las fechas están disponibles:**
> ✅ AVAILABLE — Name: John Smith · Check-in: 2026-11-15 · Check-out: 2026-11-18 · Guests: 8

**Si hay conflicto:**
> ⚠️ CONFLICT — las mismas fechas ya están reservadas en Guesty

6. El huésped también recibe un email automático confirmando que recibiste su solicitud y que alguien lo contactará en 24 horas.

### Tu flujo cuando llega un AVAILABLE

1. Recibes el email con todos los datos del huésped
2. Decides si aceptas (validas el evento, el perfil del huésped, etc.)
3. Si aceptas: creas un **Stripe Payment Link** por el monto (noches × tarifa) y se lo envías directamente al huésped
4. El huésped paga → reservas confirmada
5. Una vez confirmada en Guesty, los mensajes automáticos se activan (ver sección siguiente)

*Stripe: configúralo en stripe.com. Es gratis crear una cuenta. Cobran ~2.9% + $0.30 por transacción.*

---

## Fechas bloqueadas automáticamente (Cloudflare Worker)

Creamos un servicio en Cloudflare (`hillard-ical-proxy`) que consulta tu calendario de Guesty en tiempo real. Cada vez que alguien abre el booking panel, el servicio devuelve las fechas ocupadas — que aparecen bloqueadas en el calendario.

**Resultado:** Nadie puede seleccionar fechas que ya están reservadas. Cero fricciones ni confusiones.

---

## Mensajes automáticos (Guesty)

Guesty envía mensajes automáticos a los huéspedes en cada etapa de la reserva. Están configurados para todas las reservas confirmadas.

| Mensaje | Cuándo se envía | Estado |
|---|---|---|
| Booking Confirmation | Al confirmar la reserva | ✅ Personalizado con tono Hillard |
| Check-in Instructions | 24h antes del check-in | ✅ Dirección + hora de entrada (3PM) |
| Mid-Stay Check-in | Durante la estadía | Activo (estándar) |
| Check-out Instructions | 18h antes del checkout | Activo (estándar) |
| Review Reminder | 1 día post-checkout | ✅ Personalizado |
| Review Reminder 2 | 3 días post-checkout | Activo (estándar) |

Todos los mensajes están en **inglés**.

---

## Mensajería por canal

| Canal | Cómo funciona | Estado |
|---|---|---|
| **Airbnb** | Inbox nativo en Guesty — los mensajes llegan y puedes responder desde Guesty | ✅ Activo |
| **Booking.com** | Inbox en Guesty — igual que Airbnb | ✅ Activo |
| **VRBO** | Guesty Lite no incluye mensajería de VRBO. Los mensajes van al dashboard de VRBO directamente | ⚠️ Pendiente |
| **WhatsApp** | No configurado aún | 🔜 Futuro |

### Workaround para VRBO

Puedes hacer que los mensajes de VRBO lleguen a tu email sin salir de Guesty. En tu dashboard de VRBO, agrega este email como "Email 2":

```
eliau.piha-ww4mgnn@user.guesty.com
```

Los mensajes de los huéspedes VRBO llegarán como threads de email y quedarán asociados a la reserva en Guesty.

### Estrategia de mensajería recomendada

Con Guesty Lite (~$19/mes) tienes automatización básica que cubre el 80% del trabajo. Para responder mensajes directos de Airbnb y Booking.com, hazlo desde la bandeja de Guesty. Para VRBO, desde el dashboard de VRBO o vía el workaround de email.

Si el volumen de reservas crece y quieres respuestas automáticas con IA, **Hospitable** (~$29/mes) se integra con Guesty y responde automáticamente a preguntas frecuentes en todos los canales.

---

## SEO — Visibilidad en Google y en agentes de IA

### SEO tradicional (Google)
- Meta tags completos (description, robots, canonical)
- Open Graph para previews en redes sociales y WhatsApp
- Twitter Card
- Sitemap XML (`/sitemap.xml`)
- Robots.txt (`/robots.txt`)
- Schema.org JSON-LD: LodgingBusiness + FAQPage (invisible para visitantes, indexado por Google)

### SEO para agentes de IA (ChatGPT, Perplexity, Claude)
- `llms.txt` — descripción completa de la propiedad para que los agentes de IA puedan recomendar The Hillard cuando alguien busque mansiones privadas en Pennsylvania

---

## Repositorio y código

- **GitHub:** https://github.com/dreamriverventures-ux/the-hillard
- **Rama:** main (auto-deploy a Cloudflare Pages en cada push)
- **Archivo principal:** `index.html`
- Acceso: Santi (@SantiagoGX) como colaborador Owner

---

## Pendiente — Lo que falta para el lanzamiento completo

### Bloqueantes para lanzar

| Tarea | Quién | Cómo |
|---|---|---|
| Conectar `thehillard.com` → Cloudflare Pages | Eliau | En tu registrador de dominio: agrega un CNAME `@` apuntando a `the-hillard.pages.dev` |
| Crear cuenta Stripe | Eliau | stripe.com — gratis crear cuenta, paga solo por transacción |

### Configuraciones adicionales

| Tarea | Quién | Notas |
|---|---|---|
| Verificar que los mensajes automáticos lleguen (Airbnb y Booking.com) | Eliau | Hacer una reserva de prueba |
| VRBO — agregar email de Guesty como Email 2 | Eliau | Ver workaround arriba |
| Crear `info@thehillard.com` | Eliau | Google Workspace ~$6/mes |
| Confirmar capacidad real: 22 o 28 huéspedes | Eliau | Para actualizar el sitio |
| Mensaje de acceso day-of en Guesty | Santi/Cowork | Instrucciones para el día de llegada |

### Decisiones pendientes

- **Capacidad:** ¿22 o 28 guests? (el sitio dice 22)
- **Color del logo:** verde, navy, o rojo

---

## Contacto técnico

Para cualquier cambio al sitio, ajuste de automatización, o consulta técnica: **Santi (@SantiagoGX)**
