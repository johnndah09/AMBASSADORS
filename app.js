/* ============================================
   AEC Website - Core Application
   ============================================ */

// ===== EDITABLE CONFIG (change here anytime) =====
window.AEC_CONFIG = {
  schoolName: "Ambassadors Educational Complex",
  shortName: "AEC",
  tagline: "Faith • Vision • Discipline",

  // Phone numbers — change anytime, the WhatsApp & call links update automatically
  phones: [
    { display: "+237 677 637 429", whatsapp: "237677637429" },
    { display: "+237 679 688 792", whatsapp: "237679688792" }
  ],

  // Email
  emails: ["info@ambassadors-edu.cm", "admissions@ambassadors-edu.cm"],

  // Address
  address: {
    full: "Emana, Yaoundé — Behind the Presidency, after Government Bilingual High School",
    short: "Emana, Yaoundé, Cameroon",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.567!2d11.520!3d3.911!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM8KwNTQnMzkuNiJOIDExwrAzMScxMi4wIkU!5e0!3m2!1sen!2scm!4v1700000000000"
  },

  // Social links
  socials: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    youtube: "https://youtube.com/",
    linkedin: "https://linkedin.com/"
  },

  // Default WhatsApp greeting
  waGreeting: {
    en: "Hello, I would like more information about Ambassadors Educational Complex.",
    fr: "Bonjour, je souhaite avoir plus d'informations sur Ambassadors Educational Complex."
  }
};

// ============ i18n ENGINE ============
const I18n = {
  current: localStorage.getItem('aec_lang') || 'en',

  apply() {
    const lang = TRANSLATIONS[this.current] ? this.current : 'en';
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (TRANSLATIONS[lang][key]) el.innerHTML = TRANSLATIONS[lang][key];
    });

    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const key = el.getAttribute('data-i18n-ph');
      if (TRANSLATIONS[lang][key]) el.placeholder = TRANSLATIONS[lang][key];
    });

    // Update active button state
    document.querySelectorAll('.lang-switch button').forEach(b => {
      b.classList.toggle('active', b.dataset.lang === lang);
    });

    // Update WA links to use proper greeting
    this.refreshWALinks();
  },

  set(lang) {
    if (!TRANSLATIONS[lang]) return;
    this.current = lang;
    localStorage.setItem('aec_lang', lang);
    this.apply();
  },

  refreshWALinks() {
    const greeting = encodeURIComponent(AEC_CONFIG.waGreeting[this.current] || AEC_CONFIG.waGreeting.en);
    document.querySelectorAll('a[data-wa-num]').forEach(link => {
      const num = link.dataset.waNum;
      link.href = `https://wa.me/${num}?text=${greeting}`;
    });
  }
};

// ============ HEADER SCROLL ============
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ============ MOBILE MENU ============
function initMobileMenu() {
  const btn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => nav.classList.toggle('open'));
}

// ============ REVEAL ON SCROLL ============
function initReveals() {
  if (!('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

// ============ FORM HANDLERS (demo) ============
function initForms() {
  document.querySelectorAll('form[data-demo-form]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const lang = I18n.current;
      const msg = lang === 'fr'
        ? 'Merci ! Votre demande a été envoyée. Nous vous contacterons sous 48 heures.'
        : 'Thank you! Your request has been received. We will be in touch within 48 hours.';
      alert(msg);
      form.reset();
    });
  });
}

// ============ BUILD WHATSAPP FLOAT BUTTON ============
function initWhatsAppFloat() {
  if (document.querySelector('.whatsapp-float')) return;
  const a = document.createElement('a');
  a.className = 'whatsapp-float';
  a.dataset.waNum = AEC_CONFIG.phones[0].whatsapp;
  a.title = 'WhatsApp';
  a.target = '_blank';
  a.rel = 'noopener';
  a.innerHTML = `<svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>`;
  document.body.appendChild(a);
}

// ============ INIT ALL ============
document.addEventListener('DOMContentLoaded', () => {
  I18n.apply();
  initHeaderScroll();
  initMobileMenu();
  initReveals();
  initForms();
  initWhatsAppFloat();

  // Bind language buttons
  document.querySelectorAll('.lang-switch button').forEach(btn => {
    btn.addEventListener('click', () => I18n.set(btn.dataset.lang));
  });
});
