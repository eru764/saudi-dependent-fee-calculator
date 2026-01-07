// lang.js (FULL)
// Drop-in replacement: supports EN/AR across all pages that use data-i18n

const translations = {
  en: {
    // Nav
    nav_calc: "Calculator",
    nav_faq: "FAQ",
    nav_about: "About",
    nav_privacy: "Privacy",

    // Home / Calculator page
    title: "Saudi Expat Dependent Fee Calculator",
    subtitle: "Estimate dependent (family levy) fees in Saudi Arabia from July 2017 onward.",
    dependents_label: "Number of dependents",
    dependents_help: "Spouse/children/other sponsored dependents.",
    expired_label: "Expired since (or last expiry date)",
    expired_help: "Any period before 2017-07-01 is not charged.",
    renew_label: "Renew until (new expiry date)",
    renew_help: "Pick the date you want the iqama to be valid until.",
    calculate_btn: "Calculate Fee",
    total_label: "Total Dependent Fee",
    toggle_breakdown: "Show breakdown",
    breakdown_title: "Breakdown",
    breakdown_pill: "Historical rates",
    breakdown_note:
      "Note: This is an estimate. Official billing/rounding can differ depending on renewal rules and system calculations.",
    home_note_title: "Quick note",
    home_note_text:
      "This tool estimates fees from 1 July 2017 onward and excludes any time before that date. For explanations and common questions, see the FAQ.",

    // FAQ page
    faq_page_title: "FAQ",
    faq_page_subtitle:
      "Common questions about the dependent (family levy) fee in Saudi Arabia.",
    faq_how_title: "How this calculator estimates fees",
    faq_li_1: "Fees are calculated only from 1 July 2017 onward.",
    faq_li_2:
      "The date range is split by historical rate periods (100/200/300/400 SAR).",
    faq_li_3:
      "The result is an estimate and may differ slightly from official billing rules.",
    faq_questions_title: "Questions",

    faq_q1: "When did the dependent fee start?",
    faq_a1:
      "It started in July 2017. Any period before that is not charged in this calculator.",

    faq_q2: "How much is the dependent fee per month?",
    faq_a2:
      "It increased gradually and reached SAR 400 per month per dependent in July 2020.",

    faq_q3:
      "If my iqama expired before 2017, will I be charged from that time?",
    faq_a3:
      "No. The calculator automatically starts counting from 2017-07-01 if your expiry date is earlier.",

    faq_q4: "Is this calculator official?",
    faq_a4:
      "No. This is an independent website for planning/estimation and is not affiliated with any government entity.",

    faq_q5: "Why can the total differ from Absher or official systems?",
    faq_a5:
      "Official systems may apply different rounding or billing rules depending on renewal duration and individual cases.",

    faq_q6: "Does this site store my data?",
    faq_a6:
      "No. Calculations are performed in your browser. We do not store your input values.",

    faq_cta: "Ready to calculate? Go back to the calculator and enter your dates.",
    faq_cta_link: "Open calculator",

    // About page
    about_page_title: "About",
    about_page_subtitle: "Simple tools for expats living in Saudi Arabia.",
    about_mission_title: "Our mission",
    about_mission_text:
      "KSA Expat Services is an independent informational website that helps expatriates estimate and understand common costs in Saudi Arabia — starting with the dependent (family levy) fee.",
    about_independent_title: "Independent & transparent",
    about_independent_text:
      "We are not affiliated with any government authority. We aim to keep our tools simple, fast, and clear, using publicly available information and straightforward calculation logic.",
    about_contact_title: "Contact",
    about_contact_text:
      "For suggestions or corrections, you can contact us:",

    // Privacy page
    privacy_page_title: "Privacy Policy",
    privacy_page_subtitle: "How we handle data on this website.",
    privacy_collect_title: "What we collect",
    privacy_collect_text:
      "We do not collect personally identifiable information such as names, ID numbers, phone numbers, or iqama details.",
    privacy_calc_title: "Calculator data",
    privacy_calc_text:
      "The calculator runs in your browser. Your inputs (dates and dependent count) are processed locally and are not sent to a server.",
    privacy_cookies_title: "Cookies & advertising",
    privacy_cookies_text:
      "If we enable advertising (such as Google AdSense) or analytics in the future, those third-party services may use cookies to measure performance and show relevant ads. You can control cookies in your browser settings.",
    privacy_contact_title: "Contact",
    privacy_contact_text:
      "If you have questions about this policy, contact:",
  },

  ar: {
    // Nav
    nav_calc: "الحاسبة",
    nav_faq: "الأسئلة الشائعة",
    nav_about: "من نحن",
    nav_privacy: "الخصوصية",

    // Home / Calculator page
    title: "حاسبة رسوم المرافقين في السعودية",
    subtitle: "احسب تقدير رسوم المرافقين ابتداءً من يوليو 2017 وحتى اليوم.",
    dependents_label: "عدد المرافقين",
    dependents_help: "الزوج/الزوجة، الأبناء، أو أي مرافقين على كفالتك.",
    expired_label: "تاريخ انتهاء الإقامة (أو آخر تاريخ انتهاء)",
    expired_help: "أي فترة قبل 2017-07-01 لا يتم احتسابها.",
    renew_label: "تاريخ التجديد حتى (تاريخ الانتهاء الجديد)",
    renew_help: "اختر التاريخ الذي تريد أن تكون الإقامة سارية حتىه.",
    calculate_btn: "احسب الرسوم",
    total_label: "إجمالي رسوم المرافقين",
    toggle_breakdown: "عرض التفاصيل",
    breakdown_title: "تفاصيل الحساب",
    breakdown_pill: "الرسوم حسب السنوات",
    breakdown_note:
      "ملاحظة: هذه نتيجة تقديرية. قد تختلف الفاتورة الرسمية حسب طريقة التقريب وقواعد التجديد في الأنظمة الرسمية.",
    home_note_title: "ملاحظة سريعة",
    home_note_text:
      "هذه الأداة تحتسب الرسوم من 1 يوليو 2017 فقط، ولا تحتسب أي فترة قبل ذلك. للاطلاع على الشرح والأسئلة الشائعة، انتقل لصفحة الأسئلة.",

    // FAQ page
    faq_page_title: "الأسئلة الشائعة",
    faq_page_subtitle: "إجابات على أكثر الأسئلة شيوعًا حول رسوم المرافقين في السعودية.",
    faq_how_title: "كيف يتم احتساب الرسوم في هذه الحاسبة",
    faq_li_1: "يتم احتساب الرسوم فقط ابتداءً من 1 يوليو 2017.",
    faq_li_2: "يتم تقسيم الفترة حسب مراحل الرسوم التاريخية (100/200/300/400 ريال).",
    faq_li_3: "النتيجة تقديرية وقد تختلف قليلًا عن الأنظمة الرسمية.",
    faq_questions_title: "الأسئلة",

    faq_q1: "متى بدأت رسوم المرافقين؟",
    faq_a1: "بدأ تطبيق رسوم المرافقين في يوليو 2017. أي فترة قبل ذلك لا تُحتسب في هذه الحاسبة.",

    faq_q2: "كم تبلغ رسوم المرافقين شهريًا؟",
    faq_a2: "زادت تدريجيًا حتى وصلت إلى 400 ريال شهريًا لكل مرافق في يوليو 2020.",

    faq_q3: "إذا كانت إقامتي منتهية قبل 2017، هل سيتم احتساب رسوم قبل ذلك؟",
    faq_a3: "لا. إذا كان تاريخ الانتهاء أقدم، تبدأ الحاسبة تلقائيًا من 2017-07-01.",

    faq_q4: "هل هذه الحاسبة رسمية؟",
    faq_a4: "لا. هذا موقع مستقل للتقدير والتخطيط وليس تابعًا لأي جهة حكومية.",

    faq_q5: "لماذا قد يختلف المبلغ عن أبشر أو الأنظمة الرسمية؟",
    faq_a5: "قد تختلف الأنظمة الرسمية في التقريب أو طريقة احتساب الأشهر حسب مدة التجديد والحالة.",

    faq_q6: "هل يتم حفظ بياناتي؟",
    faq_a6: "لا. تتم العمليات داخل متصفحك ولا نقوم بحفظ مدخلاتك.",

    faq_cta: "جاهز للحساب؟ ارجع للحاسبة وأدخل التواريخ.",
    faq_cta_link: "فتح الحاسبة",

    // About page
    about_page_title: "من نحن",
    about_page_subtitle: "أدوات بسيطة للمقيمين في المملكة العربية السعودية.",
    about_mission_title: "رسالتنا",
    about_mission_text:
      "خدمات مقيمي السعودية هو موقع معلوماتي مستقل يساعد المقيمين على تقدير وفهم التكاليف الشائعة في السعودية — بدءًا من رسوم المرافقين.",
    about_independent_title: "مستقل وشفاف",
    about_independent_text:
      "لسنا تابعين لأي جهة حكومية. هدفنا تقديم أدوات سهلة وسريعة وواضحة اعتمادًا على معلومات متاحة للعامة ومنطق حساب مباشر.",
    about_contact_title: "التواصل",
    about_contact_text: "للاقتراحات أو التصحيحات يمكنك التواصل معنا عبر:",

    // Privacy page
    privacy_page_title: "سياسة الخصوصية",
    privacy_page_subtitle: "كيف نتعامل مع البيانات في هذا الموقع.",
    privacy_collect_title: "ما الذي نقوم بجمعه؟",
    privacy_collect_text:
      "لا نقوم بجمع أي معلومات شخصية مثل الأسماء أو أرقام الهوية أو أرقام الجوال أو تفاصيل الإقامة.",
    privacy_calc_title: "بيانات الحاسبة",
    privacy_calc_text:
      "تعمل الحاسبة داخل متصفحك. يتم معالجة المدخلات (التواريخ وعدد المرافقين) محليًا ولا يتم إرسالها إلى خادم.",
    privacy_cookies_title: "الكوكيز والإعلانات",
    privacy_cookies_text:
      "في حال تفعيل الإعلانات (مثل Google AdSense) أو أدوات التحليل لاحقًا، قد تستخدم خدمات الطرف الثالث ملفات تعريف الارتباط لقياس الأداء وعرض إعلانات مناسبة. يمكنك التحكم بالكوكيز من إعدادات المتصفح.",
    privacy_contact_title: "التواصل",
    privacy_contact_text: "إذا كان لديك أي استفسار بخصوص سياسة الخصوصية تواصل معنا عبر:",
  }
};

const app = document.getElementById("app");
const buttons = document.querySelectorAll("[data-lang-btn]");

function applyTranslations(lang) {
  app?.setAttribute("data-lang", lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  buttons.forEach(b => b.classList.toggle("active", b.dataset.langBtn === lang));

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    const value = translations?.[lang]?.[key];
    if (typeof value === "string") el.textContent = value;
  });

  // Update breakdown toggle label if breakdown is currently open/closed (calculator page only)
  const breakdownWrap = document.getElementById("breakdownWrap");
  const toggleBtn = document.getElementById("toggleBreakdown");
  if (toggleBtn && breakdownWrap) {
    const isOpen = !breakdownWrap.hidden;
    if (lang === "ar") toggleBtn.textContent = isOpen ? "إخفاء التفاصيل" : "عرض التفاصيل";
    else toggleBtn.textContent = isOpen ? "Hide breakdown" : "Show breakdown";
  }
}

function switchLanguage(lang) {
  localStorage.setItem("lang", lang);
  applyTranslations(lang);
}

buttons.forEach(btn => {
  btn.addEventListener("click", () => switchLanguage(btn.dataset.langBtn));
});

// Auto-load saved language
const saved = localStorage.getItem("lang");
const initialLang = (saved === "ar" || saved === "en") ? saved : "en";
applyTranslations(initialLang);
