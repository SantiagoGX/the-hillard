# The Hillard — Operations Guide for Eliau
*Prepared by Santi (@SantiagoGX) · June 2026*

---

This document is your complete reference for operating The Hillard's website and booking system independently. It covers what you have, how each piece works, and what steps remain to reach 100%.

---

## Table of Contents

1. [Connect the thehillard.com domain](#1-connect-the-thehillardcom-domain)
2. [How the booking system works](#2-how-the-booking-system-works)
3. [Receive notifications at dreamriverventures@gmail.com](#3-receive-notifications-at-dreamriverventuresgmailcom)
4. [Proposed improvement: approval email with button](#4-proposed-improvement-approval-email-with-button)
5. [Connect Stripe](#5-connect-stripe)
6. [Make account — access and control](#6-make-account--access-and-control)
7. [Technical contact](#7-technical-contact)

---

## 1. Connect the thehillard.com domain

The site is already live at:

```
https://the-hillard.pages.dev
```

The final domain `thehillard.com` is not yet connected — that is the only remaining step to make the site public under your permanent domain.

### Option A — If the domain is on Cloudflare (simpler)

If you purchased `thehillard.com` through Cloudflare, the connection is nearly automatic:

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) with `dreamriverventures@gmail.com`
2. In the left panel, go to **Workers & Pages**
3. Click the **the-hillard** project
4. Go to the **Custom Domains** tab
5. Click **Set up a custom domain**
6. Type `thehillard.com` and follow the steps — Cloudflare configures everything automatically

### Option B — If the domain is at another registrar (GoDaddy, Namecheap, Google Domains, etc.)

You have two sub-options:

**Sub-option B1: Add a CNAME record at your registrar**

1. Log in to your registrar's panel (where you purchased the domain)
2. Go to **DNS Management** or **DNS Settings**
3. Add a CNAME record with these values:

| Field | Value |
|---|---|
| Type | `CNAME` |
| Name / Host | `@` (or the root domain, as indicated by your registrar) |
| Target / Value | `the-hillard.pages.dev` |
| TTL | Automatic or 300 |

4. Save the change
5. Then, in Cloudflare (dash.cloudflare.com → Workers & Pages → the-hillard → Custom Domains), add `thehillard.com` so Cloudflare recognizes and activates the domain

> Note: DNS changes can take anywhere from 5 minutes to 48 hours to fully propagate. Typically it's under 1 hour.

**Sub-option B2: Transfer nameservers to Cloudflare**

This option gives more control and is more robust long-term. At your registrar, change the domain's nameservers to Cloudflare's (Cloudflare shows these when you add the domain to your account). Once pointing to Cloudflare, the connection with Pages is automatic.

---

## 2. How the booking system works

The system is designed for high-value properties like The Hillard. Here is the complete flow:

### Step-by-step flow

```
Guest fills out the form
        ↓
Make receives the data instantly
        ↓
Make checks the Guesty calendar in real time
        ↓
Are the dates available?
    ↙              ↘
  YES                NO
  ↓                   ↓
You receive        You receive
email ✅            email ⚠️
AVAILABLE          CONFLICT
        ↓
You evaluate the guest's profile
        ↓
If you accept: you create a Stripe Payment Link
        ↓
Guest pays
        ↓
You confirm the booking in Guesty
        ↓
Automated messages to the guest are triggered
```

### The booking form

The guest fills out from the site:
- Check-in and check-out dates (with an interactive calendar — dates already booked in Guesty appear blocked automatically)
- Number of guests
- Full name
- Email
- Phone
- Occasion or event type

### The emails you receive

**When dates are available:**

```
✅ AVAILABLE

Name: John Smith
Email: john@email.com
Phone: +1 (555) 123-4567
Check-in: 2026-11-15
Check-out: 2026-11-18
Guests: 8
Occasion: Family birthday
```

**When there is a conflict:**

```
⚠️ CONFLICT

The requested dates (Nov 15–18) overlap with an existing booking in Guesty.
```

### Why the manual approval step is right for a property like this

Automatic "Instant Booking" (accepting and charging without reviewing the guest) is the standard for low-cost properties with many reviews. For The Hillard — an exclusive mansion at $5,000–$15,000+ per stay — the manual flow is an **advantage**, not a limitation.

Concrete reasons:

| Benefit | Explanation |
|---|---|
| **Event type control** | You can decline events you don't want at the property (graduation parties, unsupervised bachelor parties, etc.) |
| **Guest profile evaluation** | You can review who they are before committing |
| **Flexible pricing** | You can adjust the amount based on the event or season before sending the payment link |
| **Property protection** | An 1865 mansion with antiques and original finishes deserves guest vetting |
| **Positioning** | Exclusive luxury properties do not do "instant booking" — the selective process is part of the premium experience |

When you have dozens of reviews and the property's profile is well established on platforms, you can enable Instant Booking on specific channels if you wish. For now, the manual approval step is exactly right.

---

## 3. Receive notifications at dreamriverventures@gmail.com

Currently, all booking form notifications are sent only to:

```
delevilleofficial@gmail.com
```

To also receive them at `dreamriverventures@gmail.com`, that address needs to be added as CC in the Make email module.

### How to do it

1. Go to [make.com](https://make.com) with `delevilleofficial@gmail.com`
2. Open the bookings scenario (the one that processes forms from the site)
3. Find the **Send Email** module (the one that sends the AVAILABLE or CONFLICT notification)
4. In the **CC** field, add:

```
dreamriverventures@gmail.com
```

5. Save the scenario

**Alternative:** Add a second "Send Email" module that sends an identical copy to `dreamriverventures@gmail.com`. This is useful if you want a slightly different subject line or format for each inbox.

> Claude Cowork can make this change entirely on its own. It just needs Make open in its browser. Log in to make.com with `delevilleofficial@gmail.com` and then open Make in the Claude Cowork session.

---

## 4. Proposed improvement: approval email with button

This is the next high-priority improvement to the booking system. It eliminates the manual Stripe step.

### Current flow (with friction)

```
You receive AVAILABLE email
        ↓
You open Stripe manually
        ↓
You create a Payment Link for the correct amount
        ↓
You copy the link
        ↓
You open your email
        ↓
You compose the email to the guest
        ↓
You paste the link and send
```

That is **6–8 manual steps** for every booking you accept.

### Proposed flow (single click)

```
You receive AVAILABLE email with button:
[ ✅ Send payment link to guest ]
        ↓
You click the button
        ↓
Make automatically creates the Stripe Payment Link
for the calculated amount (nights × rate)
        ↓
Make sends the link directly to the guest
with a The Hillard branded email
        ↓
Done
```

One single click. No opening Stripe. No copying links. No composing emails.

### How to implement it in Make

Make has a native Stripe module. The required steps are:

1. **Connect Stripe to Make**
   - In Make: Settings → Connections → Add connection → Stripe
   - Enter your Stripe credentials (API Key)

2. **Add an approval webhook**
   - Make creates a unique URL that is triggered when you click the button in the email
   - The email button points to that URL

3. **Add the Stripe "Create Payment Link" module**
   - Make takes the calculated amount (nights × rate) and creates the link automatically
   - The link is recorded in Stripe just as if you had created it manually

4. **Add the "Send Email to Guest" module**
   - Once the link is created, Make sends the guest an email with the payment link
   - The email can carry The Hillard branding (logo, tone, instructions)

> **Want to implement this?** Claude Cowork can configure it entirely. You just need to give it access to Make (open make.com in the Claude Cowork session) and connect your Stripe account first (see next section). Once both are connected, Claude Cowork does the rest.

---

## 5. Connect Stripe

Stripe is the payment processor. Creating an account is free — they only charge when you process a payment.

### Create the account

1. Go to [stripe.com](https://stripe.com)
2. Click **Start now** or **Create account**
3. Use whichever email you prefer for the business (recommended: `delevilleofficial@gmail.com` or `info@thehillard.com` once you create it)
4. Complete identity verification and banking details to receive payments

**Cost:** ~2.9% + $0.30 per transaction. On an $8,000 booking, that's ~$232 in fees. No monthly charge.

### Manual flow (while not yet connected to Make)

Until you implement the improvement from section 4, the manual flow is:

1. You receive the AVAILABLE email
2. Go to [stripe.com](https://stripe.com) → **Payment Links** in the side menu
3. Click **New payment link**
4. Set the amount (nights × property nightly rate)
5. Copy the generated link
6. Send it to the guest by email

### Connect Stripe to Make (for automation)

Once the Stripe account is created:

1. In Stripe: go to **Developers** → **API Keys**
2. Copy your **Secret Key** (starts with `sk_live_...`)
3. In Make: Settings → Connections → Add → Stripe → paste the Secret Key

With that, Make can create Payment Links automatically without you ever needing to open Stripe.

---

## 6. Make account — access and control

Make is the platform where all the booking system automation lives.

| Detail | Value |
|---|---|
| URL | [make.com](https://make.com) |
| Account | `delevilleofficial@gmail.com` |
| Password | The one you set when creating the account |

### What is configured in Make

| Component | What it does |
|---|---|
| **Incoming webhook** | Receives form data from the site instantly |
| **Guesty query** | Checks the bookings calendar in real time |
| **Conflict detector** | Compares requested dates against booked ones |
| **AVAILABLE email** | Sends guest data to `delevilleofficial@gmail.com` when dates are available |
| **CONFLICT email** | Alerts you when the dates are already booked |
| **Guest confirmation email** | Tells the guest their request was received and that they'll be contacted within 24 hours |

### How Claude Cowork accesses Make

Claude Cowork can operate Make directly from its browser. To activate it:

1. Tell Claude Cowork to open make.com
2. Claude Cowork will see the login — sign in with `delevilleofficial@gmail.com`
3. Once inside, Claude Cowork can edit scenarios, add modules, connect services, and test automations

You don't need to know how to do this yourself. Claude Cowork is the technical operator of Make.

### Changes Claude Cowork can make in Make

- Add `dreamriverventures@gmail.com` as CC on notifications (section 3)
- Connect Stripe and implement the approval button (section 4)
- Adjust the text in notification emails
- Add new steps to the flow (WhatsApp, Slack, etc.)
- Change the destination email address

---

## 7. Technical contact

For any site changes, automation adjustments, new functionality, or technical questions:

**Santi — @SantiagoGX**

### What Santi can handle

- Design or content changes on the site
- New sections or features
- Booking system adjustments
- Integrations with new services
- Technical issues or errors

### What Claude Cowork can handle (with access)

- Make configurations (automations)
- Changes to notification emails
- Connecting services to Make (Stripe, etc.)
- Booking flow adjustments

### Quick reference — accounts and access

| Service | Email / Account | URL |
|---|---|---|
| Cloudflare (hosting) | `dreamriverventures@gmail.com` | [dash.cloudflare.com](https://dash.cloudflare.com) |
| GitHub (code) | `dreamriverventures@gmail.com` | [github.com/dreamriverventures-ux/the-hillard](https://github.com/dreamriverventures-ux/the-hillard) |
| Make (automation) | `delevilleofficial@gmail.com` | [make.com](https://make.com) |
| Guesty (PMS / calendar) | Your Guesty account | [app.guesty.com](https://app.guesty.com) |
| Stripe (payments) | To be configured | [stripe.com](https://stripe.com) |
| Current site | — | [the-hillard.pages.dev](https://the-hillard.pages.dev) |
| Final domain | — | thehillard.com (connection pending) |
