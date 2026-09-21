import type { FaqDoc } from "./academy";

// Carefully written answers. No invented pricing, accreditation, or qualifications.

export const seedFaqs: FaqDoc[] = [
  {
    id: "faq_who",
    category: "General",
    question: { en: "Who can join the academy?", ar: "من يمكنه الالتحاق بالأكاديمية؟" },
    answer: {
      en: "Children, adults, converts, and families are welcome. Programs are organized by level and age group, and your starting point is determined during the free assessment.",
      ar: "نرحب بالأطفال والكبار والمسلمين الجدد والعائلات. تُنظم البرامج حسب المستوى والفئة العمرية، ويُحدد مستواك خلال جلسة التقييم المجانية.",
    },
    order: 1,
    published: true,
  },
  {
    id: "faq_beginners",
    category: "General",
    question: { en: "Are classes available for complete beginners?", ar: "هل تتوفر دروس للمبتدئين تمامًا؟" },
    answer: {
      en: "Yes. Beginner tracks start from the Arabic alphabet and build gradually toward fluent reading. No prior knowledge is required.",
      ar: "نعم. تبدأ مسارات المبتدئين من الحروف الأبجدية وتتدرج نحو القراءة الطليقة، ولا يُشترط أي معرفة مسبقة.",
    },
    order: 2,
    published: true,
  },
  {
    id: "faq_kids",
    category: "Children",
    question: { en: "Do you offer online Quran classes for children?", ar: "هل تقدمون دروس قرآن أونلاين للأطفال؟" },
    answer: {
      en: "Yes. Children's lessons are age-appropriate, interactive, and paced to keep young learners engaged. Parents receive regular progress updates.",
      ar: "نعم. دروس الأطفال مناسبة لأعمارهم وتفاعلية وبإيقاع يحافظ على تفاعل الصغار، ويتلقى أولياء الأمور تحديثات منتظمة عن التقدم.",
    },
    order: 3,
    published: true,
  },
  {
    id: "faq_adults",
    category: "General",
    question: { en: "Can adults learn the Quran from the beginning?", ar: "هل يمكن للكبار تعلم القرآن من البداية؟" },
    answer: {
      en: "Absolutely. Many of our adult students start from the alphabet. Lessons are respectful, private, and scheduled around work and family commitments.",
      ar: "بالتأكيد. يبدأ كثير من طلابنا الكبار من مستوى الحروف، والدروس محترمة وخاصة وبمواعيد تناسب العمل والالتزامات العائلية.",
    },
    order: 4,
    published: true,
  },
  {
    id: "faq_arabic",
    category: "Arabic",
    question: { en: "Do you offer Arabic classes for non-native speakers?", ar: "هل تقدمون دروس عربية لغير الناطقين بها؟" },
    answer: {
      en: "Yes. Arabic tracks cover reading, writing, vocabulary, and comprehension, with a dedicated Quranic Arabic path for students who want to understand recitation.",
      ar: "نعم. تغطي مسارات العربية القراءة والكتابة والمفردات والفهم، مع مسار مخصص للعربية القرآنية لمن يريد فهم التلاوة.",
    },
    order: 5,
    published: true,
  },
  {
    id: "faq_assessment",
    category: "Assessments",
    question: { en: "How are student levels assessed?", ar: "كيف يُقيّم مستوى الطالب؟" },
    answer: {
      en: "During the free assessment we review your goals, current reading ability, and availability. Based on this, we recommend a suitable program and starting level.",
      ar: "خلال جلسة التقييم المجانية نراجع أهدافك وقدرتك الحالية على القراءة وأوقاتك المتاحة، ثم نوصي بالبرنامج ومستوى البداية المناسبين.",
    },
    order: 6,
    published: true,
  },
  {
    id: "faq_format",
    category: "General",
    question: { en: "What is the lesson format?", ar: "ما هي صيغة الدروس؟" },
    answer: {
      en: "Lessons are live, one-to-one online sessions with a teacher, supported by practice assignments and periodic progress reviews.",
      ar: "الدروس جلسات مباشرة فردية أونلاين مع المعلم، مدعومة بواجبات تدريبية ومراجعات دورية للتقدم.",
    },
    order: 7,
    published: true,
  },
  {
    id: "faq_tech",
    category: "Technical",
    question: { en: "What technology do I need?", ar: "ما التقنية المطلوبة؟" },
    answer: {
      en: "A computer or tablet with a camera, microphone, and a stable internet connection is enough. We will guide you through the setup before your first lesson.",
      ar: "يكفي جهاز كمبيوتر أو لوحي بكاميرا وميكروفون واتصال إنترنت مستقر، وسنرشدك لإعداد كل شيء قبل درسك الأول.",
    },
    order: 8,
    published: true,
  },
  {
    id: "faq_parents",
    category: "Children",
    question: { en: "How can parents receive updates?", ar: "كيف يتلقى أولياء الأمور التحديثات؟" },
    answer: {
      en: "Parents receive regular progress summaries and can request a review meeting with the teacher through our admissions team at any time.",
      ar: "يتلقى أولياء الأمور ملخصات تقدم منتظمة، ويمكنهم طلب اجتماع مراجعة مع المعلم عبر فريق القبول في أي وقت.",
    },
    order: 9,
    published: true,
  },
  {
    id: "faq_schedule",
    category: "Scheduling",
    question: { en: "What schedules are available?", ar: "ما المواعيد المتاحة؟" },
    answer: {
      en: "Scheduling is flexible across UK and Canadian time zones. You share your preferred days and times in the assessment request, and we match you with an available teacher.",
      ar: "المواعيد مرنة عبر المناطق الزمنية البريطانية والكندية. شاركنا أيامك وأوقاتك المفضلة في طلب التقييم وسنطابقك مع معلم متاح.",
    },
    order: 10,
    published: true,
  },
  {
    id: "faq_book",
    category: "Assessments",
    question: { en: "How do I book an assessment?", ar: "كيف أحجز جلسة التقييم؟" },
    answer: {
      en: "Fill in the free assessment form with your details and goals. Our team reviews it and contacts you about the next steps — nothing is confirmed until we speak with you.",
      ar: "املأ نموذج التقييم المجاني ببياناتك وأهدافك، وسيراجعه فريقنا ويتواصل معك بشأن الخطوات التالية. لا يُعد أي موعد مؤكدًا حتى نتحدث معك.",
    },
    order: 11,
    published: true,
  },
];

