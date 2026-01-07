const translations = {
  en: {
    title: "Saudi Expat Dependent Fee Calculator",
    subtitle: "Estimate dependent (family levy) fees in Saudi Arabia from July 2017 onward.",
    dependents_label: "Number of dependents",
    expired_label: "Expired since (or last expiry date)",
    renew_label: "Renew until",
    calculate_btn: "Calculate Fee",
    total_label: "Total Fee",
    about_title: "About KSA Expat Services",
    about_text: "This independent website helps expatriates estimate government-related costs in Saudi Arabia using public information.",
    faq_title: "Frequently Asked Questions",
    faq_q1: "When did dependent fees start?",
    faq_a1: "The dependent fee started in July 2017.",
    faq_q2: "How much is the fee?",
    faq_a2: "It reached SAR 400 per month per dependent in July 2020.",
    privacy_title: "Privacy Policy",
    privacy_text: "This site does not collect personal data. Calculations are performed locally in your browser."
  },

  ar: {
    title: "حاسبة رسوم المرافقين في السعودية",
    subtitle: "احسب رسوم المرافقين في المملكة العربية السعودية ابتداءً من يوليو 2017.",
    dependents_label: "عدد المرافقين",
    expired_label: "تاريخ انتهاء الإقامة",
    renew_label: "تاريخ التجديد حتى",
    calculate_btn: "احسب الرسوم",
    total_label: "إجمالي الرسوم",
    about_title: "عن خدمات مقيمي السعودية",
    about_text: "موقع مستقل يهدف إلى مساعدة المقيمين في السعودية على تقدير الرسوم الحكومية باستخدام معلومات متاحة للعامة.",
    faq_title: "الأسئلة الشائعة",
    faq_q1: "متى بدأت رسوم المرافقين؟",
    faq_a1: "بدأ تطبيق رسوم المرافقين في يوليو 2017.",
    faq_q2: "كم تبلغ رسوم المرافقين؟",
    faq_a2: "وصلت الرسوم إلى 400 ريال شهريًا لكل مرافق في يوليو 2020.",
    privacy_title: "سياسة الخصوصية",
    privacy_text: "لا يقوم هذا الموقع بجمع أي بيانات شخصية. جميع العمليات تتم داخل متصفحك."
  }
};

const app = document.getElementById("app");
const buttons = document.querySelectorAll("[data-lang-btn]");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const lang = btn.dataset.langBtn;
    switchLanguage(lang);
  });
});

function switchLanguage(lang) {
  app.setAttribute("data-lang", lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  buttons.forEach(b => b.classList.toggle("active", b.dataset.langBtn === lang));

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
}
