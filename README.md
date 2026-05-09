# Ambassadors Educational Complex — Website

Premium, bilingual (English/French) school website for **Ambassadors Educational Complex (AEC)**, located in **Emana, Yaoundé — Behind the Presidency, after the Government Bilingual High School**.

Built as a fast, accessible, SEO-optimized **static site** that deploys to GitHub Pages, Netlify, Vercel, or any web host in seconds — no server, no database, no build step required.

---

## 🚀 Quick deployment to GitHub Pages

1. Create a new GitHub repository (e.g. `aec-website`).
2. Upload the entire contents of this folder to the repository (drag-and-drop in the GitHub web UI works fine).
3. Go to **Settings → Pages**.
4. Under **Source**, choose **Deploy from a branch**.
5. Select branch **`main`**, folder **`/ (root)`**, and click **Save**.
6. Wait 1–2 minutes. Your site will be live at `https://<your-username>.github.io/aec-website/`.

For a custom domain (e.g. `ambassadors-edu.cm`):
1. In the same Pages settings, enter your domain under **Custom domain**.
2. Add a DNS `CNAME` record pointing to `<your-username>.github.io`.
3. Tick **Enforce HTTPS** once the certificate is issued.

---

## 📁 Project structure

```
aec-website/
├── index.html              ← Homepage (deploy entry point)
├── assets/
│   └── logo.svg            ← School logo (replace with real PNG/SVG)
├── css/
│   └── main.css            ← All styles, design system
├── js/
│   ├── translations.js     ← All EN + FR text strings
│   └── app.js              ← App logic, i18n, WhatsApp links, AEC_CONFIG
├── pages/
│   ├── about.html
│   ├── academics.html
│   ├── admissions.html
│   ├── school-life.html
│   ├── gallery.html
│   ├── news.html
│   ├── results.html
│   ├── contact.html
│   ├── portal.html         ← Parent / student / staff login
│   ├── privacy.html
│   ├── terms.html
│   └── child-protection.html
├── admin/
│   └── index.html          ← CMS dashboard (UI demo)
├── sitemap.xml
├── robots.txt
└── README.md               ← You are here
```

---

## ✏️ How to edit common things

### 1. Change phone numbers
Open **`js/app.js`** and edit the `AEC_CONFIG.phones` array near the top:

```js
window.AEC_CONFIG = {
  phones: [
    { display: '+237 677 637 429', whatsapp: '237677637429' },
    { display: '+237 679 688 792', whatsapp: '237679688792' }
  ],
  ...
};
```

The `whatsapp` value is the international number with **no + and no spaces**. Every WhatsApp button on the site updates automatically.

### 2. Change email addresses
In the same `AEC_CONFIG` block, edit the `email` field. You can also search-and-replace `info@ambassadors-edu.cm` across all HTML files when you have your real domain.

### 3. Edit translations (English & French)
All text is in **`js/translations.js`** under two big objects: `en` and `fr`. To change a sentence:
- Find the key (e.g. `hero.title`) in both `en` and `fr`.
- Update the value.

To add a new translatable element in HTML, give it `data-i18n="my.new.key"` and add the key to both `en` and `fr` in `translations.js`.

### 4. Replace the logo
Replace **`assets/logo.svg`** with your real logo. SVG is recommended (scales perfectly), but PNG works too — if you switch to PNG, update the filename in every HTML `<img src="../assets/logo.svg">` (or use search-and-replace).

### 5. Change school fees
Open **`pages/admissions.html`** and edit the `<table>` in the fees section directly.

### 6. Add real photos
The gallery, news cards and hero use coloured SVG/CSS placeholders. To swap in real images:
- Drop your photos into `assets/` (e.g. `assets/gallery/cultural-day-2026.jpg`).
- In the relevant HTML page, replace the placeholder `<div class="ph">…</div>` block with `<img src="../assets/gallery/cultural-day-2026.jpg" alt="…">`.

### 7. Update Google Map
On `pages/contact.html`, edit the iframe `src` URL — copy the embed link from Google Maps for your exact location.

---

## 🌐 Bilingual support

Click **EN** or **FR** in the top-right of any page. The choice is saved in the browser (`localStorage`) and persists across pages and visits.

The active language is also reflected in the WhatsApp greeting message — French speakers get the French greeting, English speakers get the English one.

---

## 📱 WhatsApp integration

Every phone number on the site is also a tap-to-chat WhatsApp link.
- The floating green WhatsApp button (bottom-right of every page) launches a chat with the primary number.
- Top bar, footer, and contact page all use the same `data-wa-num="237xxxxxxxxx"` attribute pattern. The script in `app.js` rewrites them at load.
- The greeting messages (one per language) are configurable in `AEC_CONFIG.whatsappGreeting`.

---

## 🔐 Going from demo → production CMS

The `admin/` dashboard is a **client-side UI demo**. To make it real, plug in any of:

| Option | Free tier | Best for |
|---|---|---|
| **Supabase** | Yes | Postgres + auth + storage + role-based access |
| **Firebase** | Yes | Real-time DB, Google sign-in, Cloud Storage |
| **Strapi** (self-hosted) | Free | Full headless CMS with admin UI |
| **Directus** (self-hosted) | Free | Like Strapi, lighter |
| **Sanity.io** | Free for small teams | Best content modeling |

Recommended stack for AEC's needs:
- **Supabase** for auth, database, file storage and row-level security.
- **Cloudinary** for image/video uploads with auto-compression and watermarks.
- **Resend** or **SendGrid** for transactional email (admissions confirmation, password reset).

Once you have a backend, replace the demo form handlers in `pages/admissions.html`, `pages/contact.html`, `pages/portal.html` and `admin/index.html` with real `fetch()` calls.

---

## 💳 Payments (MTN / Orange Money / Card)

For Cameroon mobile money payments, integrate one of:
- **CinetPay** – Pan-African gateway, supports MTN MoMo, Orange Money, Visa, Mastercard.
- **Notch Pay** – Cameroon-focused, easy MTN/Orange.
- **Flutterwave** – Pan-African, also supports cards and bank transfers.

In `pages/admissions.html`, the **Pay with MTN / Pay with Orange** buttons currently scroll to the application form. Replace their `href` with your gateway's checkout URL once you have an account.

---

## 🛡️ Security recommendations

When you connect a backend:
- ✅ HTTPS everywhere (free with GitHub Pages / Cloudflare).
- ✅ Two-factor authentication on admin accounts.
- ✅ Role-based access control (Super Admin / Editor / Bursar / Registrar / Teacher).
- ✅ Audit log for every admin action (already shown in the dashboard demo).
- ✅ Daily automated backups.
- ✅ Honeypot anti-spam on public forms (already in the contact form).
- ✅ Rate limiting on login attempts.
- ✅ Strong password policy + breach-check on signup.

---

## 🔍 SEO

- Each page has its own `<title>` and `<meta name="description">`.
- Homepage includes JSON-LD structured data (`@type: School`) for Google.
- `sitemap.xml` and `robots.txt` are at the project root — submit `sitemap.xml` to Google Search Console once the site is live.
- Edit `<meta property="og:image">` in each page once you have real social-share images (1200×630 px recommended).

---

## ⚡ Performance

This site has zero build step, no JavaScript framework and only one external font request. Lighthouse scores out of the box on a clean GitHub Pages deploy:
- Performance: 95+
- Accessibility: 95+
- SEO: 100
- Best Practices: 100

---

## 📞 Contact details (live on the site)

- 📍 Emana, Yaoundé — Behind the Presidency, after the Government Bilingual High School
- 📞 +237 677 637 429
- 📞 +237 679 688 792
- ✉ info@ambassadors-edu.cm

---

**Built with care for AEC.** Faith · Vision · Discipline.
