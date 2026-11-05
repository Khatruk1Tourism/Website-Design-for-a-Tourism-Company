/* ==========================================================================
   Khatruk Travel & Tourism — site interactions
   Vanilla JS, no dependencies.
   ========================================================================== */
(function () {
  "use strict";

  var WHATSAPP_NUMBER = "967778878820";
  var WHATSAPP_BASE = "https://wa.me/" + WHATSAPP_NUMBER + "?text=";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var STORE = {
    newsletter: "khatruk_newsletter",
    cookies: "khatruk_cookie_consent",
    prefs: "khatruk_notification_prefs",
    lang: "khatruk_lang"
  };

  var LANG_LABELS = {
    ar: "العربية",
    en: "English",
    it: "Italiano",
    "en-US": "English (US)",
    es: "Español",
    pt: "Português",
    de: "Deutsch",
    ja: "日本語",
    zh: "中文",
    ko: "한국어",
    hi: "हिन्दी",
    ru: "Русский"
  };

  var LANG_LOCALES = {
    ar: "ar",
    en: "en-GB",
    it: "it-IT",
    "en-US": "en-US",
    es: "es-ES",
    pt: "pt-PT",
    de: "de-DE",
    ja: "ja-JP",
    zh: "zh-CN",
    ko: "ko-KR",
    hi: "hi-IN",
    ru: "ru-RU"
  };

  var currentLang = readStore(STORE.lang, "ar");
  if (!LANG_LOCALES[currentLang]) currentLang = "ar";

  /* Interface-only translations. Page content stays Arabic for now. */
  var UI_TEXT = {
    ar: {
      "nav.home": "الرئيسية",
      "nav.services": "الخدمات",
      "nav.about": "من نحن",
      "nav.tools": "أدوات السفر",
      "nav.contact": "تواصل معنا",
      "actions.quote": "اطلب عرض سعر",
      "actions.notify": "تفعيل الإشعارات",
      "lang.title": "لغة الواجهة",
      "footer.newsletterKicker": "النشرة البريدية",
      "footer.newsletterTitle": "اشترك في النشرة البريدية",
      "footer.newsletterText": "كن أول من يعرف بالعروض والتخفيضات وتحديثات التأشيرات ومواعيد الرحلات.",
      "footer.emailPlaceholder": "أدخل بريدك الإلكتروني",
      "footer.send": "إرسال",
      "footer.privacyNote": "بريدك محفوظ لدينا ولا يُشارك مع أي طرف آخر.",
      "footer.socialTitle": "حساباتنا على مواقع التواصل",
      "footer.quickLinks": "روابط سريعة",
      "footer.servicesTitle": "خدماتنا",
      "footer.contactTitle": "تواصل معنا",
      "footer.paymentTitle": "وسائل الدفع",
      "footer.paymentDetails": "تفاصيل طرق الدفع",
      "footer.rights": "جميع الحقوق محفوظة.",
      "footer.cookie": "سياسة ملفات الارتباط",
      "footer.privacy": "سياسة الخصوصية",
      "footer.refund": "الاسترداد والإلغاء",
      "footer.quality": "ضمان الجودة",
      "footer.contactLink": "اتصل بنا"
    },
    en: {
      "nav.home": "Home",
      "nav.services": "Services",
      "nav.about": "About Us",
      "nav.tools": "Travel Tools",
      "nav.contact": "Contact Us",
      "actions.quote": "Request a Quote",
      "actions.notify": "Enable notifications",
      "lang.title": "Interface language",
      "footer.newsletterKicker": "Newsletter",
      "footer.newsletterTitle": "Subscribe to our newsletter",
      "footer.newsletterText": "Be the first to know about offers, discounts, visa updates and flight dates.",
      "footer.emailPlaceholder": "Enter your email address",
      "footer.send": "Send",
      "footer.privacyNote": "Your email stays private and is never shared.",
      "footer.socialTitle": "Follow us",
      "footer.quickLinks": "Quick links",
      "footer.servicesTitle": "Our services",
      "footer.contactTitle": "Contact us",
      "footer.paymentTitle": "Payment methods",
      "footer.paymentDetails": "Payment details",
      "footer.rights": "All rights reserved.",
      "footer.cookie": "Cookie Policy",
      "footer.privacy": "Privacy Policy",
      "footer.refund": "Refund & Cancellation",
      "footer.quality": "Quality Assurance",
      "footer.contactLink": "Contact Us"
    },
    it: {
      "nav.home": "Home",
      "nav.services": "Servizi",
      "nav.about": "Chi siamo",
      "nav.tools": "Strumenti di viaggio",
      "nav.contact": "Contattaci",
      "actions.quote": "Richiedi un preventivo",
      "actions.notify": "Attiva le notifiche",
      "lang.title": "Lingua dell'interfaccia",
      "footer.newsletterKicker": "Newsletter",
      "footer.newsletterTitle": "Iscriviti alla newsletter",
      "footer.newsletterText": "Sii il primo a conoscere offerte, sconti, aggiornamenti sui visti e date dei voli.",
      "footer.emailPlaceholder": "Inserisci il tuo indirizzo email",
      "footer.send": "Invia",
      "footer.privacyNote": "La tua email resta privata e non viene mai condivisa.",
      "footer.socialTitle": "Seguici",
      "footer.quickLinks": "Link rapidi",
      "footer.servicesTitle": "I nostri servizi",
      "footer.contactTitle": "Contattaci",
      "footer.paymentTitle": "Metodi di pagamento",
      "footer.paymentDetails": "Dettagli di pagamento",
      "footer.rights": "Tutti i diritti riservati.",
      "footer.cookie": "Politica sui cookie",
      "footer.privacy": "Informativa sulla privacy",
      "footer.refund": "Rimborso e cancellazione",
      "footer.quality": "Garanzia di qualità",
      "footer.contactLink": "Contattaci"
    },
    "en-US": null,
    es: {
      "nav.home": "Inicio",
      "nav.services": "Servicios",
      "nav.about": "Sobre nosotros",
      "nav.tools": "Herramientas de viaje",
      "nav.contact": "Contáctanos",
      "actions.quote": "Solicitar presupuesto",
      "actions.notify": "Activar notificaciones",
      "lang.title": "Idioma de la interfaz",
      "footer.newsletterKicker": "Boletín",
      "footer.newsletterTitle": "Suscríbete a nuestro boletín",
      "footer.newsletterText": "Sé el primero en conocer ofertas, descuentos, novedades de visados y fechas de vuelos.",
      "footer.emailPlaceholder": "Introduce tu correo electrónico",
      "footer.send": "Enviar",
      "footer.privacyNote": "Tu correo se mantiene privado y nunca se comparte.",
      "footer.socialTitle": "Síguenos",
      "footer.quickLinks": "Enlaces rápidos",
      "footer.servicesTitle": "Nuestros servicios",
      "footer.contactTitle": "Contáctanos",
      "footer.paymentTitle": "Métodos de pago",
      "footer.paymentDetails": "Detalles de pago",
      "footer.rights": "Todos los derechos reservados.",
      "footer.cookie": "Política de cookies",
      "footer.privacy": "Política de privacidad",
      "footer.refund": "Reembolso y cancelación",
      "footer.quality": "Garantía de calidad",
      "footer.contactLink": "Contáctanos"
    },
    pt: {
      "nav.home": "Início",
      "nav.services": "Serviços",
      "nav.about": "Sobre nós",
      "nav.tools": "Ferramentas de viagem",
      "nav.contact": "Contacte-nos",
      "actions.quote": "Pedir orçamento",
      "actions.notify": "Ativar notificações",
      "lang.title": "Idioma da interface",
      "footer.newsletterKicker": "Newsletter",
      "footer.newsletterTitle": "Subscreva a nossa newsletter",
      "footer.newsletterText": "Seja o primeiro a saber sobre ofertas, descontos, atualizações de vistos e datas de voos.",
      "footer.emailPlaceholder": "Introduza o seu e-mail",
      "footer.send": "Enviar",
      "footer.privacyNote": "O seu e-mail é mantido privado e nunca é partilhado.",
      "footer.socialTitle": "Siga-nos",
      "footer.quickLinks": "Ligações rápidas",
      "footer.servicesTitle": "Os nossos serviços",
      "footer.contactTitle": "Contacte-nos",
      "footer.paymentTitle": "Métodos de pagamento",
      "footer.paymentDetails": "Detalhes de pagamento",
      "footer.rights": "Todos os direitos reservados.",
      "footer.cookie": "Política de cookies",
      "footer.privacy": "Política de privacidade",
      "footer.refund": "Reembolso e cancelamento",
      "footer.quality": "Garantia de qualidade",
      "footer.contactLink": "Contacte-nos"
    },
    de: {
      "nav.home": "Startseite",
      "nav.services": "Leistungen",
      "nav.about": "Über uns",
      "nav.tools": "Reisetools",
      "nav.contact": "Kontakt",
      "actions.quote": "Angebot anfordern",
      "actions.notify": "Benachrichtigungen aktivieren",
      "lang.title": "Oberflächensprache",
      "footer.newsletterKicker": "Newsletter",
      "footer.newsletterTitle": "Abonnieren Sie unseren Newsletter",
      "footer.newsletterText": "Erfahren Sie als Erste von Angeboten, Rabatten, Visum-Updates und Flugterminen.",
      "footer.emailPlaceholder": "E-Mail-Adresse eingeben",
      "footer.send": "Senden",
      "footer.privacyNote": "Ihre E-Mail bleibt privat und wird niemals weitergegeben.",
      "footer.socialTitle": "Folgen Sie uns",
      "footer.quickLinks": "Schnelllinks",
      "footer.servicesTitle": "Unsere Leistungen",
      "footer.contactTitle": "Kontakt",
      "footer.paymentTitle": "Zahlungsmethoden",
      "footer.paymentDetails": "Zahlungsdetails",
      "footer.rights": "Alle Rechte vorbehalten.",
      "footer.cookie": "Cookie-Richtlinie",
      "footer.privacy": "Datenschutzrichtlinie",
      "footer.refund": "Rückerstattung & Stornierung",
      "footer.quality": "Qualitätssicherung",
      "footer.contactLink": "Kontakt"
    },
    ja: {
      "nav.home": "ホーム",
      "nav.services": "サービス",
      "nav.about": "会社概要",
      "nav.tools": "旅行ツール",
      "nav.contact": "お問い合わせ",
      "actions.quote": "見積もりを依頼",
      "actions.notify": "通知を有効にする",
      "lang.title": "表示言語",
      "footer.newsletterKicker": "ニュースレター",
      "footer.newsletterTitle": "ニュースレターを購読",
      "footer.newsletterText": "お得情報、割引、ビザ情報、フライト日程をいち早くお届けします。",
      "footer.emailPlaceholder": "メールアドレスを入力",
      "footer.send": "送信",
      "footer.privacyNote": "メールアドレスは非公開で、第三者と共有されることはありません。",
      "footer.socialTitle": "フォローする",
      "footer.quickLinks": "クイックリンク",
      "footer.servicesTitle": "サービス一覧",
      "footer.contactTitle": "お問い合わせ",
      "footer.paymentTitle": "お支払い方法",
      "footer.paymentDetails": "お支払いの詳細",
      "footer.rights": "無断転載を禁じます。",
      "footer.cookie": "クッキーポリシー",
      "footer.privacy": "プライバシーポリシー",
      "footer.refund": "返金・キャンセル",
      "footer.quality": "品質保証",
      "footer.contactLink": "お問い合わせ"
    },
    zh: {
      "nav.home": "首页",
      "nav.services": "服务",
      "nav.about": "关于我们",
      "nav.tools": "旅行工具",
      "nav.contact": "联系我们",
      "actions.quote": "请求报价",
      "actions.notify": "开启通知",
      "lang.title": "界面语言",
      "footer.newsletterKicker": "新闻通讯",
      "footer.newsletterTitle": "订阅我们的新闻通讯",
      "footer.newsletterText": "率先了解优惠、折扣、签证更新和航班日期。",
      "footer.emailPlaceholder": "请输入您的电子邮箱",
      "footer.send": "发送",
      "footer.privacyNote": "您的邮箱将保密，绝不与第三方共享。",
      "footer.socialTitle": "关注我们",
      "footer.quickLinks": "快速链接",
      "footer.servicesTitle": "我们的服务",
      "footer.contactTitle": "联系我们",
      "footer.paymentTitle": "支付方式",
      "footer.paymentDetails": "支付详情",
      "footer.rights": "版权所有。",
      "footer.cookie": "Cookie 政策",
      "footer.privacy": "隐私政策",
      "footer.refund": "退款与取消",
      "footer.quality": "质量保证",
      "footer.contactLink": "联系我们"
    },
    ko: {
      "nav.home": "홈",
      "nav.services": "서비스",
      "nav.about": "회사 소개",
      "nav.tools": "여행 도구",
      "nav.contact": "문의하기",
      "actions.quote": "견적 요청",
      "actions.notify": "알림 활성화",
      "lang.title": "인터페이스 언어",
      "footer.newsletterKicker": "뉴스레터",
      "footer.newsletterTitle": "뉴스레터 구독",
      "footer.newsletterText": "할인, 비자 업데이트, 항공편 일정을 가장 먼저 받아보세요.",
      "footer.emailPlaceholder": "이메일 주소를 입력하세요",
      "footer.send": "보내기",
      "footer.privacyNote": "이메일은 비공개로 유지되며 제3자와 공유되지 않습니다.",
      "footer.socialTitle": "팔로우하기",
      "footer.quickLinks": "빠른 링크",
      "footer.servicesTitle": "서비스",
      "footer.contactTitle": "문의하기",
      "footer.paymentTitle": "결제 수단",
      "footer.paymentDetails": "결제 세부 정보",
      "footer.rights": "모든 권리 보유.",
      "footer.cookie": "쿠키 정책",
      "footer.privacy": "개인정보 처리방침",
      "footer.refund": "환불 및 취소",
      "footer.quality": "품질 보증",
      "footer.contactLink": "문의하기"
    },
    hi: {
      "nav.home": "होम",
      "nav.services": "सेवाएँ",
      "nav.about": "हमारे बारे में",
      "nav.tools": "यात्रा उपकरण",
      "nav.contact": "संपर्क करें",
      "actions.quote": "कोटेशन माँगें",
      "actions.notify": "सूचनाएँ सक्षम करें",
      "lang.title": "इंटरफ़ेस भाषा",
      "footer.newsletterKicker": "न्यूज़लेटर",
      "footer.newsletterTitle": "हमारे न्यूज़लेटर की सदस्यता लें",
      "footer.newsletterText": "ऑफ़र, छूट, वीज़ा अपडेट और फ़्लाइट तिथियों की जानकारी सबसे पहले पाएँ।",
      "footer.emailPlaceholder": "अपना ईमेल पता दर्ज करें",
      "footer.send": "भेजें",
      "footer.privacyNote": "आपका ईमेल निजी रहता है और कभी साझा नहीं किया जाता।",
      "footer.socialTitle": "हमें फ़ॉलो करें",
      "footer.quickLinks": "त्वरित लिंक",
      "footer.servicesTitle": "हमारी सेवाएँ",
      "footer.contactTitle": "संपर्क करें",
      "footer.paymentTitle": "भुगतान के तरीके",
      "footer.paymentDetails": "भुगतान विवरण",
      "footer.rights": "सर्वाधिकार सुरक्षित।",
      "footer.cookie": "कुकी नीति",
      "footer.privacy": "गोपनीयता नीति",
      "footer.refund": "रिफ़ंड और रद्दीकरण",
      "footer.quality": "गुणवत्ता आश्वासन",
      "footer.contactLink": "संपर्क करें"
    },
    ru: {
      "nav.home": "Главная",
      "nav.services": "Услуги",
      "nav.about": "О нас",
      "nav.tools": "Инструменты для путешествий",
      "nav.contact": "Связаться с нами",
      "actions.quote": "Запросить предложение",
      "actions.notify": "Включить уведомления",
      "lang.title": "Язык интерфейса",
      "footer.newsletterKicker": "Рассылка",
      "footer.newsletterTitle": "Подпишитесь на нашу рассылку",
      "footer.newsletterText": "Узнавайте первыми об акциях, скидках, изменениях по визам и датах рейсов.",
      "footer.emailPlaceholder": "Введите адрес электронной почты",
      "footer.send": "Отправить",
      "footer.privacyNote": "Ваша почта остаётся конфиденциальной и никогда не передаётся третьим лицам.",
      "footer.socialTitle": "Подписывайтесь на нас",
      "footer.quickLinks": "Быстрые ссылки",
      "footer.servicesTitle": "Наши услуги",
      "footer.contactTitle": "Связаться с нами",
      "footer.paymentTitle": "Способы оплаты",
      "footer.paymentDetails": "Детали оплаты",
      "footer.rights": "Все права защищены.",
      "footer.cookie": "Политика использования файлов cookie",
      "footer.privacy": "Политика конфиденциальности",
      "footer.refund": "Возврат и отмена",
      "footer.quality": "Гарантия качества",
      "footer.contactLink": "Связаться с нами"
    }
  };

  UI_TEXT["en-US"] = UI_TEXT.en;

  /* ---------- Utilities ---------- */
  function $(selector, scope) {
    return (scope || document).querySelector(selector);
  }

  function $$(selector, scope) {
    return Array.prototype.slice.call((scope || document).querySelectorAll(selector));
  }

  function pad(value) {
    return String(value).padStart(2, "0");
  }

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function readStore(key, fallback) {
    try {
      var raw = window.localStorage.getItem(key);
      return raw === null ? fallback : raw;
    } catch (error) {
      return fallback;
    }
  }

  function writeStore(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {
      /* Storage can be unavailable in private mode — the UI still works. */
    }
  }

  function waLink(message) {
    return WHATSAPP_BASE + encodeURIComponent(message);
  }

  function icons(name) {
    var paths = {
      check: '<path d="m20 6-11 11-5-5"/>',
      info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
      alert: '<path d="M12 3 2.5 20h19L12 3Z"/><path d="M12 9v5M12 17h.01"/>',
      send: '<path d="m22 2-7 20-4-9-9-4 20-7Z"/><path d="M22 2 11 13"/>',
      search: '<circle cx="11" cy="11" r="7"/><path d="m16.5 16.5 4 4"/>',
      whatsapp:
        '<path d="M20.5 3.5A11 11 0 0 0 3.2 16.6L2 22l5.6-1.2A11 11 0 1 0 20.5 3.5Zm-8.6 17a9 9 0 0 1-4.6-1.3l-.3-.2-3.3.7.7-3.2-.2-.3a9 9 0 1 1 7.7 4.3Zm5-6.7c-.3-.1-1.7-.8-2-.9s-.5-.1-.7.2-.8.9-1 1.1-.4.2-.7.1a7.4 7.4 0 0 1-2.1-1.3 8 8 0 0 1-1.5-1.9c-.2-.3 0-.5.1-.6l.5-.6.3-.5a.6.6 0 0 0 0-.6l-.9-2.1c-.2-.5-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.8.4 3.5 3.5 0 0 0-1.1 2.6 6.1 6.1 0 0 0 1.3 3.2 13.8 13.8 0 0 0 5.3 4.7 6 6 0 0 0 3.7.7 3.2 3.2 0 0 0 2.1-1.5 2.6 2.6 0 0 0 .2-1.5Z"/>'
    };
    return (
      '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
      (paths[name] || paths.info) +
      "</svg>"
    );
  }

  /* ---------- Toasts ---------- */
  var toastRegion = $("#toastRegion");

  function showToast(message, type) {
    if (!toastRegion) return;
    var toast = document.createElement("div");
    toast.className = "toast" + (type ? " toast--" + type : "");
    toast.setAttribute("role", "status");
    toast.innerHTML =
      icons(type === "ok" ? "check" : type === "warn" ? "alert" : "info") +
      "<span>" +
      esc(message) +
      "</span>";
    toastRegion.appendChild(toast);
    window.setTimeout(function () {
      toast.classList.add("is-out");
      window.setTimeout(function () {
        toast.remove();
      }, 320);
    }, 4600);
  }

  /* ---------- Header ---------- */
  var header = $("#siteHeader");
  var toTop = $(".to-top");

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) {
      header.classList.toggle("is-scrolled", y > 24);
    }
    if (toTop) {
      toTop.classList.toggle("is-visible", y > 700);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ---------- Live Hijri / Gregorian clock ---------- */
  var clockGreg = $("[data-clock-greg]");
  var clockHijri = $("[data-clock-hijri]");
  var clockTime = $("[data-clock-time]");

  function updateClock() {
    if (!clockGreg && !clockHijri && !clockTime) return;
    var now = new Date();
    var locale = LANG_LOCALES[currentLang] || "ar";

    try {
      if (clockGreg) {
        clockGreg.textContent = new Intl.DateTimeFormat(locale + "-u-nu-latn-ca-gregory", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric"
        }).format(now);
      }
    } catch (error) {
      if (clockGreg) clockGreg.textContent = now.toLocaleDateString(locale);
    }

    try {
      if (clockHijri) {
        var hijri = new Intl.DateTimeFormat(locale + "-u-ca-islamic-umalqura-nu-latn", {
          day: "numeric",
          month: "long",
          year: "numeric"
        }).format(now);
        clockHijri.textContent =
          currentLang === "ar" ? hijri.replace(/\s*هـ\.?$/, "") + " هـ" : hijri;
      }
    } catch (error) {
      if (clockHijri) clockHijri.textContent = currentLang === "ar" ? "التقويم الهجري" : "Hijri";
    }

    if (clockTime) {
      clockTime.textContent = pad(now.getHours()) + ":" + pad(now.getMinutes());
    }
  }

  updateClock();
  window.setInterval(updateClock, 30000);

  /* ---------- Desktop dropdown navigation ---------- */
  var dropdownItems = $$(".has-dropdown");

  function closeDropdown(item) {
    var toggle = $(".nav__toggle", item);
    item.classList.remove("is-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  }

  function closeAllDropdowns(except) {
    dropdownItems.forEach(function (item) {
      if (item !== except) closeDropdown(item);
    });
  }

  dropdownItems.forEach(function (item) {
    var toggle = $(".nav__toggle", item);
    if (!toggle) return;

    toggle.addEventListener("click", function (event) {
      event.preventDefault();
      var isOpen = item.classList.contains("is-open");
      closeAllDropdowns(item);
      if (isOpen) {
        closeDropdown(item);
      } else {
        item.classList.add("is-open");
        toggle.setAttribute("aria-expanded", "true");
      }
    });

    item.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") return;
      if (!item.classList.contains("is-open")) return;
      closeDropdown(item);
      toggle.focus();
    });
  });

  document.addEventListener("click", function (event) {
    if (!dropdownItems.length) return;
    if (event.target.closest(".has-dropdown")) return;
    closeAllDropdowns();
  });

  /* ---------- Mobile menu ---------- */
  var menu = $("#mobileMenu");
  var menuToggle = $(".nav-toggle");
  var menuClose = $(".mobile-menu__close");

  function openMenu() {
    if (!menu || !menuToggle) return;
    menu.classList.add("is-open");
    menu.removeAttribute("aria-hidden");
    menuToggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("is-locked");
    var first = $(".mobile-menu__link", menu);
    if (first) first.focus();
  }

  function closeMenu() {
    if (!menu || !menuToggle) return;
    menu.classList.remove("is-open");
    menu.setAttribute("aria-hidden", "true");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("is-locked");
    menuToggle.focus();
  }

  if (menuToggle && menu) {
    if (!menu.classList.contains("is-open")) {
      menu.setAttribute("aria-hidden", "true");
    }

    menuToggle.addEventListener("click", function () {
      if (menu.classList.contains("is-open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    if (menuClose) {
      menuClose.addEventListener("click", closeMenu);
    }

    $$("a", menu).forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (event) {
      if (!menu.classList.contains("is-open")) return;

      if (event.key === "Escape") {
        closeMenu();
        return;
      }

      if (event.key !== "Tab") return;

      var focusable = $$("a[href], button:not([disabled]), summary", menu);
      if (!focusable.length) return;

      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      var active = document.activeElement;

      if (!menu.contains(active)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 1100 && menu.classList.contains("is-open")) {
        closeMenu();
      }
    });
  }

  /* ---------- Interface language switcher ---------- */
  var langSwitch = $("[data-lang-switch]");
  var langToggle = $("[data-lang-toggle]");
  var langOptions = $$(".lang-option");
  var langCurrent = $("[data-lang-current]");

  function closeLangMenu() {
    if (!langSwitch || !langToggle) return;
    langSwitch.classList.remove("is-open");
    langToggle.setAttribute("aria-expanded", "false");
  }

  function applyLanguage(code) {
    var dict = UI_TEXT[code] || UI_TEXT.ar;
    currentLang = UI_TEXT[code] ? code : "ar";

    document.documentElement.lang = currentLang;

    $$("[data-i18n]").forEach(function (node) {
      var value = dict[node.getAttribute("data-i18n")];
      if (value != null) node.textContent = value;
    });

    $$("[data-i18n-placeholder]").forEach(function (node) {
      var value = dict[node.getAttribute("data-i18n-placeholder")];
      if (value != null) node.setAttribute("placeholder", value);
    });

    $$("[data-i18n-aria]").forEach(function (node) {
      var value = dict[node.getAttribute("data-i18n-aria")];
      if (value != null) node.setAttribute("aria-label", value);
    });

    if (langCurrent) {
      langCurrent.textContent = LANG_LABELS[currentLang] || LANG_LABELS.ar;
      langCurrent.setAttribute("dir", currentLang === "ar" ? "rtl" : "ltr");
    }

    langOptions.forEach(function (option) {
      option.setAttribute(
        "aria-checked",
        option.getAttribute("data-lang") === currentLang ? "true" : "false"
      );
    });

    updateClock();
    writeStore(STORE.lang, currentLang);
  }

  if (langSwitch && langToggle) {
    langToggle.addEventListener("click", function (event) {
      event.preventDefault();
      var willOpen = !langSwitch.classList.contains("is-open");
      closeAllDropdowns();
      langSwitch.classList.toggle("is-open", willOpen);
      langToggle.setAttribute("aria-expanded", String(willOpen));
    });

    langOptions.forEach(function (option) {
      option.addEventListener("click", function () {
        applyLanguage(option.getAttribute("data-lang"));
        closeLangMenu();
        langToggle.focus();
      });
    });

    langSwitch.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") return;
      if (!langSwitch.classList.contains("is-open")) return;
      closeLangMenu();
      langToggle.focus();
    });

    document.addEventListener("click", function (event) {
      if (!langSwitch.classList.contains("is-open")) return;
      if (event.target.closest("[data-lang-switch]")) return;
      closeLangMenu();
    });
  }

  applyLanguage(currentLang);

  /* ---------- Hero background video (muted, decorative) ---------- */
  var heroVideo = $("[data-hero-video]");

  if (heroVideo) {
    if (reduceMotion) {
      heroVideo.removeAttribute("autoplay");
      heroVideo.pause();
      heroVideo.style.display = "none";
    } else {
      var playlist = (heroVideo.getAttribute("data-playlist") || "")
        .split("|")
        .filter(Boolean);
      var clipIndex = 0;

      function revealVideo() {
        heroVideo.classList.add("is-ready");
      }

      heroVideo.addEventListener("loadeddata", revealVideo, { once: true });
      if (heroVideo.readyState >= 2) revealVideo();

      heroVideo.addEventListener("error", function () {
        heroVideo.classList.remove("is-ready");
      });

      if (playlist.length > 1) {
        heroVideo.removeAttribute("loop");
        heroVideo.addEventListener("ended", function () {
          clipIndex = (clipIndex + 1) % playlist.length;
          heroVideo.src = playlist[clipIndex];
          heroVideo.load();
          var nextPlay = heroVideo.play();
          if (nextPlay && nextPlay.catch) nextPlay.catch(function () {});
        });
      } else if (playlist.length === 1) {
        heroVideo.setAttribute("loop", "");
      }

      var playPromise = heroVideo.play();
      if (playPromise && playPromise.catch) playPromise.catch(function () {});
    }
  }

  /* ---------- Reveal on scroll ---------- */
  var revealItems = $$(".reveal");

  if (!reduceMotion && "IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealItems.forEach(function (item) {
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }

  /* ---------- Service filters ---------- */
  var filterButtons = $$("[data-filter]");
  var filterCards = $$("[data-category]");

  if (filterButtons.length && filterCards.length) {
    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        var filter = button.getAttribute("data-filter");

        filterButtons.forEach(function (other) {
          other.setAttribute("aria-pressed", String(other === button));
        });

        filterCards.forEach(function (card) {
          var match = filter === "all" || card.getAttribute("data-category") === filter;
          card.classList.toggle("is-hidden", !match);
        });
      });
    });
  }

  /* ---------- Form helpers ---------- */
  function fieldLabel(field) {
    var label = $("label", field);
    if (!label) return "";
    return label.textContent.replace("*", "").replace(/\s+/g, " ").trim();
  }

  function controlValue(control) {
    if (!control) return "";
    if (control.tagName === "SELECT") {
      var option = control.options[control.selectedIndex];
      return option && option.value ? option.text.trim() : "";
    }
    if (control.type === "checkbox" || control.type === "radio") {
      return control.checked ? control.value || "نعم" : "";
    }
    return control.value ? control.value.trim() : "";
  }

  function formStatus(form, message, tone) {
    var status = $(".form-status", form);
    if (!status) return;
    status.textContent = message;
    status.classList.add("is-visible");
    status.classList.toggle("is-error", tone === "error");
    status.classList.toggle("is-ok", tone === "ok");
  }

  function collectFormLines(form) {
    var lines = [];
    $$(".field", form).forEach(function (field) {
      var control = $("input, select, textarea", field);
      if (!control || control.type === "hidden") return;
      var value = controlValue(control);
      if (!value) return;
      var label = fieldLabel(field);
      if (!label) return;
      lines.push("• " + label + ": " + value);
    });
    return lines;
  }

  /* ---------- Lead forms → WhatsApp ---------- */
  function buildLeadMessage(form) {
    var heading = form.getAttribute("data-message-title") || "أود طلب الخدمة التالية:";
    var lines = ["مرحباً خاطرك للسفريات والسياحة،", "", heading, ""];
    var fields = collectFormLines(form);

    if (!fields.length) {
      var name = form.elements["name"];
      if (name && name.value) fields.push("• الاسم: " + name.value.trim());
    }

    lines = lines.concat(fields);
    lines.push("", "أرجو التواصل معي لاستكمال الإجراءات. شكراً لكم.");
    return lines.join("\n");
  }

  $$("form[data-lead-form]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var message = buildLeadMessage(form);
      var url = waLink(message);
      var win = window.open(url, "_blank", "noopener");

      formStatus(
        form,
        win
          ? "تم تجهيز طلبك وفتح واتساب في نافذة جديدة. أرسل الرسالة لتصل إلى فريقنا."
          : "تعذّر فتح نافذة جديدة. افتح واتساب وتواصل معنا على +967 778 878 820.",
        win ? "ok" : "error"
      );
      showToast("تم تجهيز رسالتك — أرسلها عبر واتساب لإكمال الطلب.", "ok");

      var serviceField = form.elements["service"];
      var selectedService = serviceField ? serviceField.value : "";
      form.reset();
      if (serviceField && selectedService) {
        serviceField.value = selectedService;
      }
    });
  });

  /* ---------- Newsletter ---------- */
  $$("form[data-newsletter]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var emailField = form.elements["email"];
      if (!emailField || !emailField.value.trim() || !emailField.checkValidity()) {
        if (emailField) emailField.reportValidity();
        formStatus(form, "يرجى إدخال بريد إلكتروني صحيح.", "error");
        return;
      }

      var email = emailField.value.trim();
      writeStore(STORE.newsletter, email);
      formStatus(form, "تم حفظ بريدك، وسنفتح واتساب لتأكيد الاشتراك مع فريقنا.", "ok");
      showToast("تم تسجيل بريدك — أكّد الاشتراك عبر واتساب.", "ok");

      window.open(
        waLink("مرحباً، أرغب في الاشتراك في النشرة البريدية لخاطرك للسفريات والسياحة.\nالبريد الإلكتروني: " + email),
        "_blank",
        "noopener"
      );
      form.reset();
    });
  });

  /* ---------- Notification preferences ---------- */
  var prefsForm = $("[data-notify-prefs]");
  var notifyStatuses = $$("[data-notify-status]");

  function setNotifyStatus(message) {
    notifyStatuses.forEach(function (node) {
      node.textContent = message;
    });
  }

  if (prefsForm) {
    try {
      var savedPrefs = JSON.parse(readStore(STORE.prefs, "{}") || "{}");
      $$("input[type='checkbox']", prefsForm).forEach(function (input) {
        if (Object.prototype.hasOwnProperty.call(savedPrefs, input.name)) {
          input.checked = Boolean(savedPrefs[input.name]);
        }
      });
    } catch (error) {
      /* Ignore malformed preferences. */
    }

    prefsForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var prefs = {};
      $$("input[type='checkbox']", prefsForm).forEach(function (input) {
        prefs[input.name] = input.checked;
      });
      writeStore(STORE.prefs, JSON.stringify(prefs));
      formStatus(prefsForm, "تم حفظ تفضيلاتك على هذا الجهاز.", "ok");
      showToast("تم حفظ تفضيلات الإشعارات.", "ok");
    });
  }

  /* ---------- Browser notifications ---------- */
  function notificationsSupported() {
    return "Notification" in window && window.isSecureContext !== false;
  }

  function enableNotifications() {
    if (!notificationsSupported()) {
      setNotifyStatus("متصفحك لا يدعم إشعارات الويب، أو أن الصفحة غير مؤمّنة. يمكنك الاشتراك بالبريد الإلكتروني.");
      showToast("إشعارات المتصفح غير مدعومة هنا — استخدم النشرة البريدية.", "warn");
      return;
    }

    if (Notification.permission === "granted") {
      setNotifyStatus("الإشعارات مفعّلة بالفعل على هذا المتصفح. يمكنك إدارتها من إعدادات المتصفح.");
      showToast("إشعارات خاطرك مفعّلة بالفعل.", "ok");
      return;
    }

    if (Notification.permission === "denied") {
      setNotifyStatus("الإشعارات محظورة من إعدادات المتصفح. يمكنك السماح بها من أيقونة القفل بجانب العنوان.");
      showToast("الإشعارات محظورة — عدّل إذن الموقع من المتصفح.", "warn");
      return;
    }

    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        setNotifyStatus("تم تفعيل الإشعارات بنجاح. سنرسل العروض والتحديثات المهمة فقط.");
        showToast("تم تفعيل إشعارات خاطرك.", "ok");
        try {
          new Notification("خاطرك للسفريات والسياحة", {
            body: "تم تفعيل الإشعارات. ستصلك العروض وتحديثات التأشيرات والرحلات.",
            tag: "khatruk-welcome"
          });
        } catch (error) {
          /* Some browsers require a service worker for notifications. */
        }
      } else if (permission === "denied") {
        setNotifyStatus("تم رفض الإذن. يمكنك السماح بالإشعارات لاحقاً من إعدادات المتصفح.");
        showToast("لم يتم منح إذن الإشعارات.", "warn");
      } else {
        setNotifyStatus("لم يتم تأكيد الإذن بعد. أعد المحاولة عندما تكون جاهزاً.");
      }
    });
  }

  $$("[data-enable-notifications]").forEach(function (button) {
    button.addEventListener("click", enableNotifications);
  });

  /* ---------- Cookie notice ---------- */
  var cookieNote = $("#cookieNote");

  if (cookieNote) {
    var consent = readStore(STORE.cookies, "");
    if (!consent) {
      cookieNote.removeAttribute("hidden");
    }

    function dismissCookie(value) {
      writeStore(STORE.cookies, value);
      cookieNote.classList.add("is-hidden");
      window.setTimeout(function () {
        cookieNote.setAttribute("hidden", "");
        cookieNote.classList.remove("is-hidden");
      }, 320);
      showToast(
        value === "accepted"
          ? "شكراً لك — تم حفظ تفضيلات ملفات الارتباط."
          : "تم رفض الملفات غير الضرورية.",
        value === "accepted" ? "ok" : "info"
      );
    }

    $$("[data-cookie-accept]", cookieNote).forEach(function (button) {
      button.addEventListener("click", function () {
        dismissCookie("accepted");
      });
    });

    $$("[data-cookie-decline]", cookieNote).forEach(function (button) {
      button.addEventListener("click", function () {
        dismissCookie("declined");
      });
    });
  }

  /* ---------- Shared result markup ---------- */
  function resultRow(label, value) {
    return (
      '<div class="result-item"><span class="result-item__label">' +
      esc(label) +
      '</span><span class="result-item__value">' +
      esc(value) +
      "</span></div>"
    );
  }

  function resultBadge(text, tone) {
    return (
      '<span class="result-badge' +
      (tone ? " result-badge--" + tone : "") +
      '">' +
      esc(text) +
      "</span>"
    );
  }

  function showResult(node) {
    if (!node) return;
    node.removeAttribute("hidden");
    if (!reduceMotion) {
      node.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  /* ---------- Visa rules (indicative only) ---------- */
  var DESTINATIONS = [
    "المملكة العربية السعودية",
    "سلطنة عُمان",
    "الإمارات العربية المتحدة",
    "قطر",
    "البحرين",
    "الكويت",
    "تركيا",
    "ماليزيا",
    "إندونيسيا",
    "مصر",
    "الأردن",
    "جورجيا",
    "أذربيجان",
    "تايلاند"
  ];

  var GCC = ["السعودية", "سلطنة عُمان", "الإمارات", "قطر", "البحرين", "الكويت"];
  var WEST = ["المملكة المتحدة", "الولايات المتحدة", "ألمانيا", "فرنسا"];

  var VISA_TYPES = {
    free: {
      label: "بدون تأشيرة",
      tone: "ok",
      dot: "free",
      note: "دخول بدون تأشيرة مسبقة ضمن المدة المسموحة، مع جواز ساري وتذكرة عودة."
    },
    evisa: {
      label: "تأشيرة إلكترونية",
      tone: "gold",
      dot: "evisa",
      note: "يُقدَّم الطلب إلكترونياً قبل السفر، وتصدر الموافقة عادةً خلال أيام عمل."
    },
    arrival: {
      label: "تأشيرة عند الوصول",
      tone: "warn",
      dot: "arrival",
      note: "تُمنح في المطار وفق الشروط وقد تتطلب رسوماً وإثبات إقامة أو تذكرة عودة."
    },
    required: {
      label: "تأشيرة مسبقة",
      tone: "warn",
      dot: "required",
      note: "يلزم التقديم عبر السفارة أو المركز المعتمد قبل السفر بوقت كافٍ."
    }
  };

  var VISA_MATRIX = {
    yemen: {
      "المملكة العربية السعودية": ["required", 30, "تقديم عبر المركز المعتمد"],
      "سلطنة عُمان": ["required", 30, "تقديم مسبق أو عبر المستثمر"],
      "الإمارات العربية المتحدة": ["required", 30, "كفيل أو حجز فندقي"],
      قطر: ["required", 30, "تقديم مسبق"],
      البحرين: ["required", 30, "تقديم مسبق"],
      الكويت: ["required", 30, "تقديم مسبق"],
      تركيا: ["evisa", 30, "طلب إلكتروني"],
      ماليزيا: ["evisa", 30, "طلب إلكتروني"],
      إندونيسيا: ["arrival", 30, "رسوم عند الوصول"],
      مصر: ["required", 30, "تقديم مسبق"],
      الأردن: ["required", 30, "تقديم مسبق"],
      جورجيا: ["evisa", 30, "طلب إلكتروني"],
      أذربيجان: ["evisa", 30, "طلب إلكتروني"],
      تايلاند: ["required", 30, "تقديم مسبق"]
    },
    gcc: {
      "المملكة العربية السعودية": ["free", 90, "هوية خليجية سارية"],
      "سلطنة عُمان": ["free", 90, "هوية خليجية سارية"],
      "الإمارات العربية المتحدة": ["free", 90, "هوية خليجية سارية"],
      قطر: ["free", 90, "هوية خليجية سارية"],
      البحرين: ["free", 90, "هوية خليجية سارية"],
      الكويت: ["free", 90, "هوية خليجية سارية"],
      تركيا: ["free", 90, "جواز ساري"],
      ماليزيا: ["free", 90, "جواز ساري"],
      إندونيسيا: ["free", 30, "جواز ساري"],
      مصر: ["arrival", 30, "رسوم عند الوصول"],
      الأردن: ["arrival", 30, "رسوم عند الوصول"],
      جورجيا: ["free", 90, "جواز ساري"],
      أذربيجان: ["evisa", 30, "طلب إلكتروني"],
      تايلاند: ["free", 60, "جواز ساري"]
    },
    west: {
      "المملكة العربية السعودية": ["evisa", 90, "تأشيرة سياحية إلكترونية"],
      "سلطنة عُمان": ["free", 14, "دخول قصير بدون تأشيرة"],
      "الإمارات العربية المتحدة": ["free", 90, "دخول بدون تأشيرة مسبقة"],
      قطر: ["free", 90, "دخول بدون تأشيرة مسبقة"],
      البحرين: ["evisa", 14, "طلب إلكتروني"],
      الكويت: ["evisa", 90, "طلب إلكتروني"],
      تركيا: ["free", 90, "جواز ساري"],
      ماليزيا: ["free", 90, "جواز ساري"],
      إندونيسيا: ["arrival", 30, "رسوم عند الوصول"],
      مصر: ["arrival", 30, "رسوم عند الوصول"],
      الأردن: ["arrival", 30, "رسوم عند الوصول"],
      جورجيا: ["free", 365, "جواز ساري"],
      أذربيجان: ["evisa", 30, "طلب إلكتروني"],
      تايلاند: ["free", 60, "جواز ساري"]
    },
    other: {
      "المملكة العربية السعودية": ["required", 30, "تقديم مسبق"],
      "سلطنة عُمان": ["required", 30, "تقديم مسبق"],
      "الإمارات العربية المتحدة": ["required", 30, "كفيل أو حجز فندقي"],
      قطر: ["required", 30, "تقديم مسبق"],
      البحرين: ["required", 30, "تقديم مسبق"],
      الكويت: ["required", 30, "تقديم مسبق"],
      تركيا: ["evisa", 30, "طلب إلكتروني"],
      ماليزيا: ["evisa", 30, "طلب إلكتروني"],
      إندونيسيا: ["arrival", 30, "رسوم عند الوصول"],
      مصر: ["required", 30, "تقديم مسبق"],
      الأردن: ["required", 30, "تقديم مسبق"],
      جورجيا: ["evisa", 30, "طلب إلكتروني"],
      أذربيجان: ["evisa", 30, "طلب إلكتروني"],
      تايلاند: ["required", 30, "تقديم مسبق"]
    }
  };

  function nationalityGroup(nationality) {
    if (nationality === "اليمن") return "yemen";
    if (GCC.indexOf(nationality) !== -1) return "gcc";
    if (WEST.indexOf(nationality) !== -1) return "west";
    return "other";
  }

  function visaRule(nationality, destination, purpose) {
    var group = nationalityGroup(nationality);
    var row = (VISA_MATRIX[group] && VISA_MATRIX[group][destination]) || ["required", 30, "تقديم مسبق"];
    var type = VISA_TYPES[row[0]];
    var stay = row[1];
    var entry = row[2];
    var requirements = [
      "جواز سفر ساري 6 أشهر على الأقل مع صفحتين فارغتين",
      "صورة شخصية حديثة بخلفية بيضاء",
      "حجز طيران مؤكد أو مبدئي وتذكرة عودة",
      "إثبات إقامة (حجز فندقي أو عنوان مضيف)"
    ];
    var notes = "";

    if (row[0] === "free") {
      requirements = [
        "جواز سفر أو هوية سارية المدة",
        "تذكرة عودة أو إثبات مغادرة",
        "إثبات إقامة أو حجز فندقي",
        "تأمين سفر موصى به"
      ];
    } else if (row[0] === "arrival") {
      requirements.push("رسوم التأشيرة عند الوصول حسب الدولة");
    } else if (row[0] === "required") {
      requirements.push("استمارة طلب التأشيرة والمستندات الداعمة للغرض");
    }

    if (purpose === "عمل") {
      type = VISA_TYPES.required;
      stay = 30;
      entry = "تصريح عمل / تأشيرة عمل";
      requirements = [
        "جواز سفر ساري 6 أشهر على الأقل",
        "عقد عمل أو خطاب دعوة من جهة العمل",
        "مؤهلات وخبرات موثقة",
        "فحص طبي حسب متطلبات الدولة",
        "موافقة الجهة المختصة قبل السفر"
      ];
    } else if (purpose === "دراسة") {
      type = VISA_TYPES.required;
      stay = 90;
      entry = "تأشيرة طالب";
      requirements = [
        "قبول جامعي أو معهد معتمد",
        "إثبات القدرة المالية",
        "جواز سفر ساري 6 أشهر على الأقل",
        "تأمين صحي وتغطية سفر",
        "ترجمة معتمدة للمستندات إن لزم"
      ];
    } else if (purpose === "علاج") {
      type = VISA_TYPES.required;
      stay = 60;
      entry = "تأشيرة علاج";
      requirements = [
        "تقرير طبي من جهة معتمدة",
        "موعد أو قبول من المستشفى",
        "جواز سفر ساري 6 أشهر على الأقل",
        "مرافقون ووثائق القرابة إن وجدوا",
        "إثبات القدرة على تغطية العلاج"
      ];
    } else if (purpose === "عمرة وزيارة" && destination === "المملكة العربية السعودية") {
      type = VISA_TYPES.required;
      stay = 30;
      entry = "تأشيرة عمرة / زيارة";
      requirements = [
        "جواز سفر ساري 6 أشهر على الأقل",
        "صورة شخصية حديثة",
        "حجز عمرة معتمد أو برنامج من وكيل",
        "شهادة تطعيم حسب المتطلبات الصحية",
        "تأمين صحي وتذكرة عودة"
      ];
      notes = "برامج العمرة تخضع لضوابط الجهات السعودية المختصة ولمواعيد الموسم.";
    }

    return {
      key: row[0],
      type: type,
      stay: stay,
      entry: entry,
      requirements: requirements,
      notes: notes,
      group: group
    };
  }

  /* ---------- Visa check tool ---------- */
  var visaForm = $("[data-visa-check]");

  if (visaForm) {
    visaForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!visaForm.checkValidity()) {
        visaForm.reportValidity();
        return;
      }

      var nationality = controlValue(visaForm.elements["nationality"]);
      var destination = controlValue(visaForm.elements["destination"]);
      var purpose = controlValue(visaForm.elements["purpose"]) || "سياحة";
      var travelDate = controlValue(visaForm.elements["travel_date"]);

      if (!nationality || !destination) {
        showToast("اختر الجنسية والوجهة أولاً.", "warn");
        return;
      }

      var rule = visaRule(nationality, destination, purpose);
      var resultNode = $("[data-visa-result]");
      if (!resultNode) return;

      var requirementItems = rule.requirements
        .map(function (item) {
          return "<li>" + esc(item) + "</li>";
        })
        .join("");

      var message =
        "مرحباً، أود التحقق من متطلبات التأشيرة.\n" +
        "• الجنسية: " + nationality + "\n" +
        "• الوجهة: " + destination + "\n" +
        "• نوع السفر: " + purpose +
        (travelDate ? "\n• تاريخ السفر التقريبي: " + travelDate : "");

      resultNode.innerHTML =
        '<div class="result-card result-card--' +
        (rule.type.tone === "ok" ? "ok" : rule.type.tone === "warn" ? "warn" : "accent") +
        '">' +
        '<div class="result-card__head">' +
        resultBadge(rule.type.label, rule.type.tone) +
        "<h3>" +
        esc(nationality) +
        " → " +
        esc(destination) +
        "</h3></div>" +
        '<div class="result-grid">' +
        resultRow("الغرض من السفر", purpose) +
        resultRow("نوع الدخول المتوقع", rule.entry) +
        resultRow("المدة الاسترشادية", rule.stay + " يوماً") +
        resultRow("وقت المعالجة المتوقع", rule.key === "free" ? "لا ينطبق" : "3 – 15 يوم عمل") +
        "</div>" +
        '<p class="result-title">المتطلبات الأولية</p>' +
        '<ul class="result-list">' +
        requirementItems +
        "</ul>" +
        (rule.notes ? '<p class="result-note">' + icons("info") + " " + esc(rule.notes) + "</p>" : "") +
        '<p class="result-note">' +
        icons("info") +
        " النتيجة استرشادية وقد تتغير بحسب القوانين والاتفاقيات. لا تُعد موافقة رسمية، والقرار النهائي للجهة المختصة." +
        "</p>" +
        '<div class="result-actions">' +
        '<a class="btn btn-gold" href="' +
        esc(waLink(message)) +
        '" target="_blank" rel="noopener">تحقق رسمي عبر واتساب ' +
        icons("whatsapp") +
        "</a>" +
        '<a class="btn btn-outline" href="quote.html">طلب عرض سعر</a>' +
        "</div></div>";

      showResult(resultNode);
      showToast("تم عرض النتيجة الاسترشادية. أكّدها مع فريق التأشيرات.", "ok");
    });
  }

  /* ---------- Country explorer ---------- */
  var exploreForm = $("[data-country-explorer]");

  if (exploreForm) {
    exploreForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!exploreForm.checkValidity()) {
        exploreForm.reportValidity();
        return;
      }

      var nationality = controlValue(exploreForm.elements["nationality"]);
      if (!nationality) {
        showToast("اختر جنسيتك أولاً.", "warn");
        return;
      }

      var rank = { free: 0, evisa: 1, arrival: 2, required: 3 };
      var entries = DESTINATIONS.map(function (destination) {
        return {
          destination: destination,
          rule: visaRule(nationality, destination, "سياحة")
        };
      }).sort(function (a, b) {
        return rank[a.rule.key] - rank[b.rule.key];
      });

      var summary = $("[data-explore-summary]");
      var grid = $("[data-country-results]");
      if (!grid) return;

      var openCount = entries.filter(function (entry) {
        return entry.rule.key !== "required";
      }).length;

      if (summary) {
        summary.innerHTML =
          "الجنسية: <strong>" +
          esc(nationality) +
          "</strong> — عرضنا <strong>" +
          entries.length +
          "</strong> وجهة، منها <strong>" +
          openCount +
          "</strong> وجهة بإجراء أسهل من التأشيرة المسبقة. النتائج استرشادية.";
        summary.removeAttribute("hidden");
      }

      grid.innerHTML = entries
        .map(function (entry) {
          var message =
            "مرحباً، أود التحقق من متطلبات الدخول.\n• الجنسية: " +
            nationality +
            "\n• الوجهة: " +
            entry.destination +
            "\n• الغرض: سياحة";
          return (
            '<article class="country-card country-card--mini">' +
            '<h3 class="country-card__name">' +
            esc(entry.destination) +
            "</h3>" +
            '<span class="country-card__places">' +
            esc(entry.rule.type.label) +
            " · حتى " +
            esc(entry.rule.stay) +
            " يوماً</span>" +
            "<p>" +
            esc(entry.rule.entry) +
            ". " +
            esc(entry.rule.type.note) +
            "</p>" +
            '<a class="country-card__link" href="' +
            esc(waLink(message)) +
            '" target="_blank" rel="noopener">تحقق مع فريقنا ' +
            icons("send") +
            "</a></article>"
          );
        })
        .join("");

      showToast("تم عرض الوجهات حسب جنسيتك — النتائج استرشادية.", "ok");
      grid.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    });
  }

  /* ---------- Tracking tool ---------- */
  var trackingForm = $("[data-tracking]");

  if (trackingForm) {
    trackingForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!trackingForm.checkValidity()) {
        trackingForm.reportValidity();
        return;
      }

      var passport = (controlValue(trackingForm.elements["passport"]) || "").replace(/\s+/g, "");
      var transaction = (controlValue(trackingForm.elements["transaction"]) || "").replace(/\s+/g, "");

      if (passport.length < 4) {
        showToast("أدخل رقم جواز صحيحاً (4 خانات على الأقل).", "warn");
        var passportField = trackingForm.elements["passport"];
        if (passportField) passportField.focus();
        return;
      }

      var masked = passport.length > 4 ? passport.slice(0, 2) + "••••" + passport.slice(-2) : passport;
      var resultNode = $("[data-tracking-result]");
      if (!resultNode) return;

      var message =
        "مرحباً، أود الاستعلام عن حالة معاملة.\n" +
        "• رقم الجواز: " + passport +
        (transaction ? "\n• رقم المعاملة: " + transaction : "") +
        "\nأرجو تزويدي بالحالة والخطوة التالية.";

      resultNode.innerHTML =
        '<div class="result-card result-card--accent">' +
        '<div class="result-card__head">' +
        resultBadge("استعلام مُجهّز", "gold") +
        "<h3>تم تجهيز طلب المتابعة</h3></div>" +
        '<div class="result-grid">' +
        resultRow("رقم الجواز", masked) +
        resultRow("رقم المعاملة", transaction || "غير مذكور") +
        resultRow("قناة المتابعة", "واتساب · فريق المتابعة") +
        resultRow("وقت الرد المتوقع", "خلال يوم عمل") +
        "</div>" +
        '<p class="result-note">' +
        icons("info") +
        " لا تعرض هذه الصفحة حالة مباشرة من قاعدة بيانات. أرسل الاستعلام ليؤكده فريق المتابعة من الأنظمة الرسمية، حفاظاً على دقة المعلومات وسريتها." +
        "</p>" +
        '<div class="result-actions">' +
        '<a class="btn btn-gold" href="' +
        esc(waLink(message)) +
        '" target="_blank" rel="noopener">إرسال الاستعلام عبر واتساب ' +
        icons("whatsapp") +
        "</a>" +
        '<a class="btn btn-outline" href="contact.html">تواصل معنا</a>' +
        "</div></div>";

      showResult(resultNode);
      showToast("تم تجهيز استعلامك — أرسله عبر واتساب للمتابعة.", "ok");
    });
  }

  /* ---------- Preselect a service from ?service=slug ---------- */
  var params = new URLSearchParams(window.location.search);
  var requestedService = params.get("service");

  if (requestedService) {
    $$("select[name='service']").forEach(function (select) {
      var match = $$("option", select).filter(function (option) {
        return option.value === requestedService;
      })[0];

      if (match) {
        select.value = requestedService;
        select.dataset.selected = requestedService;
      }
    });
  }

  $$("select[name='service']").forEach(function (select) {
    select.addEventListener("change", function () {
      select.dataset.selected = select.value;
    });
  });

  /* ---------- Footer year ---------- */
  $$("[data-year]").forEach(function (node) {
    node.textContent = new Date().getFullYear();
  });

  /* ---------- Anchor links inside the page ---------- */
  $$('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      var id = link.getAttribute("href");
      if (!id || id === "#") return;
      var target = document.getElementById(id.slice(1));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      if (history.replaceState) {
        history.replaceState(null, "", id);
      }
    });
  });
})();
