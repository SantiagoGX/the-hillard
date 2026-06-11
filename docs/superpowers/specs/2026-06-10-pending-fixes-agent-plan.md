# The Hillard — Pending Fixes: Agent Implementation Plan
**Fecha:** 2026-06-10  
**Para:** Agente siguiente (sesión limpia)  
**Archivo de trabajo:** `/Users/santiagosalinas/Documents/De Leville/The Hillard/Hillard/SITE/the-hillard-website/index.html`  
**Repo GitHub:** `dreamriverventures-ux/the-hillard` (main → auto-deploy Netlify)  
**Live:** https://thehillard.netlify.app

---

## CONTEXTO DEL PROYECTO

The Hillard es una mansión de 1865 en Wilkes-Barre, PA. El sitio es una landing page en HTML + CSS + vanilla JS (un solo `index.html`, sin framework, sin build step). Stack: Cormorant Garamond (serif) + Outfit (sans). Paleta: cream `#F5EFE6`, charcoal `#181C22`, gold `#C4A265`, navy `#1C2535`.

El sitio ya tiene:
- Nav fijo con logo centrado, hamburger menu en mobile
- Hero, Intro strip marquee, About, Stats
- Spaces section con sistema de tabs (Common Spaces | Bedrooms)
- Amenities, Events banner, Gallery, Testimonial
- Reserve section con CTA
- Footer rediseñado (3 columnas)
- Booking panel slide-in (form que envía a Netlify Forms → webhook Make.com)

---

## FIX 1 — Sticky tab bar roto (raíz del problema)

### Síntoma
La barra "Common Spaces | Bedrooms" NO se queda pegada debajo del nav al hacer scroll por la sección de Spaces. El CSS de sticky está puesto pero no funciona.

### Causa raíz diagnosticada
**Línea 29:** `html { scroll-behavior: smooth; overflow-x: hidden; }`  
**Línea 30:** `body { ... overflow-x: hidden; }`

`overflow-x: hidden` en `html` + `body` simultáneamente crea un nuevo scroll container artificial. `position: sticky` queda atrapado dentro de ese contenedor en lugar de pegarse al viewport — comportamiento roto.

### Solución
Cambiar `overflow-x: hidden` → `overflow-x: clip` en ambos selectores.

`overflow-x: clip` corta el contenido que desborda igual que `hidden`, pero **no crea un nuevo scroll container**, por lo que `position: sticky` funciona correctamente.

Soporte: Chrome 90+, Firefox 81+, Safari 16+ ✅

### Cambio exacto en CSS

**Línea 29 — antes:**
```css
html { scroll-behavior: smooth; overflow-x: hidden; }
```
**Línea 29 — después:**
```css
html { scroll-behavior: smooth; overflow-x: clip; }
```

**Línea 30 — antes:**
```css
body { background: var(--cream); color: var(--charcoal); font-family: var(--sans); font-weight: 300; line-height: 1.7; overflow-x: hidden; }
```
**Línea 30 — después:**
```css
body { background: var(--cream); color: var(--charcoal); font-family: var(--sans); font-weight: 300; line-height: 1.7; overflow-x: clip; }
```

### Verificar que el CSS de sticky ya está (no tocar)
```css
/* Línea ~236 */
.spaces-tab-bar { 
  display: flex; 
  border-bottom: 1px solid rgba(28,37,53,.1); 
  position: sticky; 
  top: 96px;        /* nav height scrolled = 64px logo + 2×16px padding */
  z-index: 50; 
  background: var(--cream); 
  box-shadow: 0 2px 16px rgba(0,0,0,0.05); 
}
/* Mobile override (~línea 360): */
.spaces-tab-bar { top: 64px; }
```

### Verificar que el HTML está bien estructurado (no tocar)
```html
<!-- section cierra ANTES del tab bar -->
<section id="spaces" style="padding-bottom:0;">
  <div class="spaces-header section-inner">...</div>
</section>

<!-- wrapper que contiene tab bar + tab panes -->
<div id="spaces-content">
  <div class="spaces-tab-bar">
    <button class="tab-btn active" data-tab="communal">Common Spaces</button>
    <button class="tab-btn" data-tab="bedrooms">Bedrooms</button>
  </div>
  <div class="tab-pane active" id="tab-communal">...</div>
  <div class="tab-pane" id="tab-bedrooms">...</div>
</div><!-- /spaces-content -->
```
Esta estructura ya está en el archivo. El único fix pendiente es el `overflow-x: clip`.

---

## FIX 2 — Reserve Section: un solo CTA que abre el booking panel

### Síntoma
La sección "Reserve Your Stay" tiene DOS botones que envían emails directamente (`mailto:`). El cliente quiere un solo botón que abra el booking panel slide-in (el mismo que abre "INQUIRE & RESERVE" en el nav).

### HTML actual (líneas ~787–797)
```html
<section class="reserve" id="reserve">
  <div class="section-inner">
    <span class="label label-light" style="color:var(--gold);opacity:0.85;">Reserve Your Stay</span>
    <h2 class="headline" style="color:var(--warm-white);">The Whole House.<br><em>Just for You.</em></h2>
    <p class="subheadline" style="margin-top:1rem;">The Hillard is available for exclusive whole-house reservations. Contact us directly to check availability and secure your dates.</p>
    <div class="reserve-btns fade-up d2" style="margin-top:2.5rem;">
      <a href="mailto:info@thehillard.com" class="btn btn-green">Reserve the House</a>
      <a href="mailto:info@thehillard.com" class="btn btn-ghost-light">Private Group Inquiry</a>
    </div>
  </div>
</section>
```

### HTML nuevo
Reemplazar únicamente el `<div class="reserve-btns ...">` con un solo botón:
```html
    <div class="reserve-btns fade-up d2" style="margin-top:2.5rem;">
      <button type="button" class="btn btn-green booking-open">Inquire &amp; Reserve</button>
    </div>
```

La clase `.booking-open` ya tiene un event listener en el JS que abre el panel:
```js
document.querySelectorAll('.booking-open').forEach(el => el.addEventListener('click', openBooking));
```
No hay que tocar el JavaScript.

---

## FIX 3 — Footer email capture: conectar a Netlify Forms

### Situación actual
El footer tiene un form con `onsubmit="return false;"` — no hace nada. Hay que convertirlo en un Netlify Form funcional igual que el booking panel.

### HTML actual del form (líneas ~806–810)
```html
<form class="footer-notify-form" onsubmit="return false;">
  <input type="email" class="footer-notify-input" placeholder="Your email address" aria-label="Email address">
  <button type="submit" class="footer-notify-btn">Notify Me</button>
</form>
<p class="footer-notify-hint">Be the first to know when dates open.</p>
```

### HTML nuevo del form
```html
<form class="footer-notify-form" name="email-waitlist" netlify netlify-honeypot="bot-field" id="notifyForm">
  <input type="hidden" name="form-name" value="email-waitlist">
  <p style="display:none"><label>Don't fill this out: <input name="bot-field"></label></p>
  <input type="email" name="email" class="footer-notify-input" placeholder="Your email address" aria-label="Email address" required>
  <button type="submit" class="footer-notify-btn">Notify Me</button>
</form>
<p class="footer-notify-hint" id="notify-hint">Be the first to know when dates open.</p>
```

### JavaScript a agregar (al final del bloque `<script>`, antes del `</script>`)
```js
// Footer email waitlist
const notifyForm = document.getElementById('notifyForm');
if (notifyForm) {
  notifyForm.addEventListener('submit', async e => {
    e.preventDefault();
    const data = new URLSearchParams(new FormData(notifyForm)).toString();
    try {
      await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: data });
      document.getElementById('notify-hint').textContent = 'You\'re on the list. We\'ll be in touch.';
      notifyForm.reset();
    } catch {
      document.getElementById('notify-hint').textContent = 'Something went wrong. Email us at info@thehillard.com';
    }
  });
}
```

### Cómo Netlify detecta el form
Netlify escanea el HTML estático al momento del deploy. Con el atributo `netlify` y `name="email-waitlist"`, va a crear automáticamente un nuevo form en el dashboard de Netlify bajo el nombre `email-waitlist`. Las submissions van a aparecer en: Site → Forms → email-waitlist.

**No hay que configurar nada en Netlify** — solo hacer el deploy con estos cambios y Netlify lo detecta solo.

---

## ORDEN DE IMPLEMENTACIÓN

1. Fix CSS `overflow-x: hidden` → `overflow-x: clip` (2 líneas)
2. Fix Reserve section HTML (reemplazar div con botones)
3. Fix footer form HTML + agregar JS al script block
4. Verificar que el archivo cierra correctamente (`</script></body></html>`)
5. Commit + push a `main` → Netlify auto-deploya

---

## VERIFICACIÓN POST-DEPLOY

1. **Sticky tabs:** Ir a https://thehillard.netlify.app, scroll hasta "The Spaces" — el tab bar debe pegarse debajo del nav y soltarse al pasar la sección.
2. **Reserve CTA:** Hacer click en "Inquire & Reserve" en la sección Reserve — debe abrir el booking panel slide-in.
3. **Footer form:** Ingresar un email en el footer → "Notify Me" → debe aparecer "You're on the list." Y en Netlify dashboard → Forms debe aparecer un nuevo form `email-waitlist` con la submission.

---

## NOTAS IMPORTANTES

- **Netlify:** Solo Santi tiene acceso a app.netlify.com (cuenta dreamriverventures@gmail.com). No dar instrucciones de Netlify a Claude Cowork.
- **Git:** El repo está en `/Users/santiagosalinas/Documents/De Leville/The Hillard/Hillard/SITE/the-hillard-website/`. Push a `origin main`.
- **No hay build step.** El archivo `index.html` se sube directo. Publish directory = `.`
- **Las imágenes están en base64** dentro del HTML — son muy pesadas pero están embebidas. No las toques.
- **El booking panel** ya funciona: envía a Netlify Forms `booking-inquiry` → webhook Make.com → Gmail. No tocar esa lógica.
