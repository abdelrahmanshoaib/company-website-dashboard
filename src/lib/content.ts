import type { Bilingual } from "./academy";

// Static bilingual page bodies. CMS-managed entities (services, teachers,
// FAQs, posts, legal pages) come from the database instead.

export const home = {
  heroEyebrow: { en: "ONLINE QURAN & ARABIC ACADEMY", ar: "أكاديمية القرآن والعربية أونلاين" },
  heroTitle: {
    en: "Learn the Quran. Understand Arabic. Build Lasting Confidence.",
    ar: "تعلّم القرآن، وافهم العربية، وابنِ ثقة مستدامة.",
  },
  heroBody: {
    en: "Personalized online Quran classes, Arabic language programs, and Islamic Studies for children, adults, converts, and Muslim families in the UK and Canada.",
    ar: "دروس قرآن أونلاين، وبرامج لتعلم اللغة العربية والدراسات الإسلامية للأطفال والكبار والمسلمين الجدد والعائلات المسلمة في بريطانيا وكندا.",
  },
  trustEyebrow: { en: "LEARNING WITH PURPOSE", ar: "تعلّم هادف" },
  trustTitle: { en: "A Clearer, More Supportive Way to Learn", ar: "طريقة أوضح وأكثر دعمًا للتعلم" },
  trustBody: {
    en: "Learning the Quran and Arabic requires consistency, guidance, and an environment where students feel comfortable asking questions. Our approach combines structured lessons, personalized support, and a respectful learning experience for students at different stages.",
    ar: "يتطلب تعلم القرآن واللغة العربية الاستمرارية والتوجيه وبيئة يشعر فيها الطالب بالراحة عند طرح الأسئلة. نجمع بين الدروس المنظمة والمتابعة الشخصية وتجربة تعليمية تحترم احتياجات الطلاب في مختلف المراحل.",
  },
  trustCards: [
    {
      title: { en: "Structured Learning", ar: "تعلم منظم" },
      body: { en: "Clear learning pathways designed around each student's level and goals.", ar: "مسارات واضحة تتناسب مع مستوى الطالب وأهدافه." },
      icon: "🗺️",
    },
    {
      title: { en: "Personal Guidance", ar: "متابعة شخصية" },
      body: { en: "Individual attention and constructive feedback to support steady progress.", ar: "متابعة فردية وملاحظات بنّاءة تساعد على التقدم المستمر." },
      icon: "🤝",
    },
    {
      title: { en: "Respectful Environment", ar: "بيئة محترمة" },
      body: { en: "A supportive learning experience that values dignity, patience, and understanding.", ar: "بيئة تعليمية داعمة تحترم كرامة الطالب وتراعي الصبر والفهم." },
      icon: "💜",
    },
  ],
  programsEyebrow: { en: "OUR PROGRAMS", ar: "برامجنا" },
  programsTitle: { en: "Explore Our Quran, Arabic & Islamic Studies Programs", ar: "اكتشف برامج القرآن والعربية والدراسات الإسلامية" },
  programsBody: {
    en: "Explore flexible learning pathways for children, adults, converts, and non-native Arabic speakers. Choose a program that matches your learning needs and goals.",
    ar: "اكتشف مسارات تعليمية مرنة للأطفال والكبار والمسلمين الجدد وغير الناطقين بالعربية، واختر البرنامج الذي يتناسب مع احتياجاتك وأهدافك.",
  },
  audienceTitle: { en: "Learning Pathways for Different Stages of Life", ar: "مسارات تعليمية تناسب مختلف مراحل الحياة" },
  audiences: [
    {
      slug: "children",
      icon: "🧒",
      title: { en: "Children", ar: "الأطفال" },
      body: { en: "Age-appropriate Quran and Islamic education designed to support confidence, engagement, and steady learning.", ar: "تعليم القرآن والدراسات الإسلامية بأسلوب مناسب للعمر، يدعم الثقة والتفاعل والتعلم المستمر." },
    },
    {
      slug: "adults",
      icon: "🧑",
      title: { en: "Adults", ar: "الكبار" },
      body: { en: "Flexible learning pathways for adults who want to improve Quran reading, learn Arabic, or develop their Islamic knowledge.", ar: "مسارات مرنة للكبار الراغبين في تحسين قراءة القرآن أو تعلم العربية أو تطوير معارفهم الإسلامية." },
    },
    {
      slug: "converts",
      icon: "🌱",
      title: { en: "Converts", ar: "المسلمون الجدد" },
      body: { en: "A welcoming and structured learning environment for those beginning or developing their Islamic learning journey.", ar: "بيئة تعليمية مرحبة ومنظمة للمسلمين الجدد الراغبين في بدء رحلتهم التعليمية أو تطويرها." },
    },
    {
      slug: "families",
      icon: "👨‍👩‍👧",
      title: { en: "Muslim Families", ar: "العائلات المسلمة" },
      body: { en: "Supportive learning options for families seeking consistent Quran and Islamic education for their children.", ar: "خيارات تعليمية داعمة للعائلات الراغبة في توفير تعليم منتظم للقرآن والدراسات الإسلامية لأطفالها." },
    },
  ],
  approachTitle: { en: "Learning That Respects Every Student", ar: "تعلم يحترم كل طالب" },
  approachBody: {
    en: "We believe effective Islamic education should combine clear instruction with patience, respect, and appropriate guidance. Our learning experience is designed to help students develop knowledge and confidence without relying on shame or fear.",
    ar: "نؤمن بأن التعليم الإسلامي الفعّال يجمع بين الشرح الواضح والصبر والاحترام والتوجيه المناسب. نصمم تجربة تعليمية تساعد الطلاب على تطوير المعرفة والثقة بعيدًا عن أساليب الإحراج أو التخويف.",
  },
  stepsTitle: { en: "Start Your Learning Journey in Three Steps", ar: "ابدأ رحلتك التعليمية في ثلاث خطوات" },
  steps: [
    {
      title: { en: "Book an Assessment", ar: "احجز جلسة التقييم" },
      body: { en: "Tell us about your goals, learning experience, and preferred schedule.", ar: "شاركنا أهدافك وتجربتك التعليمية والمواعيد المناسبة لك." },
    },
    {
      title: { en: "Choose Your Learning Path", ar: "اختر مسارك التعليمي" },
      body: { en: "Receive guidance on a suitable program based on your needs and level.", ar: "احصل على توجيه لاختيار البرنامج المناسب لاحتياجاتك ومستواك." },
    },
    {
      title: { en: "Begin Structured Lessons", ar: "ابدأ الدروس المنظمة" },
      body: { en: "Start learning with a clear plan and ongoing support.", ar: "ابدأ التعلم من خلال خطة واضحة ومتابعة مستمرة." },
    },
  ],
  teachersTitle: { en: "Meet Our Teaching Team", ar: "تعرّف على فريق التدريس" },
  teachersBody: {
    en: "Educators who support our students through structured teaching, clear communication, and respectful guidance.",
    ar: "معلمون يدعمون طلابنا من خلال التعليم المنظم والتواصل الواضح والتوجيه المحترم.",
  },
  faqTitle: { en: "Frequently Asked Questions", ar: "الأسئلة الشائعة" },
  ctaTitle: { en: "Take the Next Step in Your Learning Journey", ar: "اتخذ خطوتك التالية في رحلتك التعليمية" },
  ctaBody: {
    en: "Explore a learning pathway designed around your needs, goals, and level.",
    ar: "اكتشف مسارًا تعليميًا مصممًا وفق احتياجاتك وأهدافك ومستواك.",
  },
};

export const about: { title: Bilingual; body: Bilingual; points: { title: Bilingual; body: Bilingual }[] } = {
  title: { en: "A Professional, Human-Centered Approach to Islamic Education", ar: "منهج احترافي وإنساني في التعليم الإسلامي" },
  body: {
    en: "Our academy is designed to provide structured Quran, Arabic, and Islamic Studies learning for students from different backgrounds and stages of life. We aim to create a learning environment where students can develop knowledge, ask questions, and progress through clear educational pathways.",
    ar: "صُممت أكاديميتنا لتقديم تعليم منظم في القرآن الكريم واللغة العربية والدراسات الإسلامية للطلاب من خلفيات ومراحل عمرية مختلفة. نسعى إلى توفير بيئة تعليمية تساعد الطلاب على تطوير معارفهم وطرح أسئلتهم والتقدم من خلال مسارات تعليمية واضحة.",
  },
  points: [
    { title: { en: "Mission", ar: "رسالتنا" }, body: { en: "Accessible, structured Islamic education for families in the UK, Canada, and beyond.", ar: "تعليم إسلامي منظم ومتاح للعائلات في بريطانيا وكندا وخارجهما." } },
    { title: { en: "Learning principles", ar: "مبادئ التعلم" }, body: { en: "Clarity, consistency, patience, and respect in every lesson.", ar: "الوضوح والاستمرارية والصبر والاحترام في كل درس." } },
    { title: { en: "Teaching standards", ar: "معايير التدريس" }, body: { en: "Prepared lessons, constructive correction, and honest progress reporting.", ar: "دروس مُعدّة وتصحيح بنّاء وتقارير تقدم صادقة." } },
    { title: { en: "Responsible education", ar: "تعليم مسؤول" }, body: { en: "No fear-based messaging, no unverified claims, and safeguarding woven into operations.", ar: "لا رسائل تخويف ولا ادعاءات غير موثقة، والحماية جزء من التشغيل." } },
  ],
};

export const approach: { title: Bilingual; body: Bilingual; sections: { title: Bilingual; body: Bilingual }[] } = {
  title: { en: "Our Learning Approach", ar: "منهجنا التعليمي" },
  body: {
    en: "Effective learning requires more than delivering information. Our approach combines clear instruction, appropriate practice, and constructive support to help students develop confidence and consistency.",
    ar: "يتطلب التعلم الفعّال أكثر من تقديم المعلومات. يجمع منهجنا بين الشرح الواضح والتدريب المناسب والدعم البنّاء لمساعدة الطلاب على تطوير الثقة والاستمرارية.",
  },
  sections: [
    { title: { en: "Student-centered learning", ar: "تعلم متمحور حول الطالب" }, body: { en: "Lessons adapt to the student's pace, questions, and goals — not a rigid script.", ar: "تتكيف الدروس مع إيقاع الطالب وأسئلته وأهدافه، لا مع نص جامد." } },
    { title: { en: "Structured progression", ar: "تدرج منظم" }, body: { en: "Defined levels and milestones so progress is visible to students and parents.", ar: "مستويات ومعالم محددة تجعل التقدم مرئيًا للطلاب وأولياء الأمور." } },
    { title: { en: "Respectful correction", ar: "تصحيح محترم" }, body: { en: "Mistakes are treated as part of learning — corrected kindly, never with shame.", ar: "الأخطاء جزء من التعلم — تُصحح بلطف ودون إحراج أبدًا." } },
    { title: { en: "Age-appropriate instruction", ar: "تعليم مناسب للعمر" }, body: { en: "Methods, session length, and materials differ for children, teens, and adults.", ar: "تختلف الأساليب ومدة الجلسات والمواد بين الأطفال والمراهقين والكبار." } },
    { title: { en: "Family communication", ar: "التواصل مع العائلة" }, body: { en: "Regular updates keep parents involved in their child's learning journey.", ar: "تحديثات منتظمة تُبقي أولياء الأمور شركاء في رحلة تعلم أطفالهم." } },
    { title: { en: "Ongoing improvement", ar: "تحسين مستمر" }, body: { en: "Teaching methods and assessment processes follow the academy's academic standards and are reviewed regularly.", ar: "تخضع أساليب التدريس وعمليات التقييم لمعايير الأكاديمية الأكاديمية وتُراجع بانتظام." } },
  ],
};

export const howItWorks: { title: Bilingual; steps: { title: Bilingual; body: Bilingual }[]; notes: Bilingual } = {
  title: { en: "How It Works", ar: "كيف تعمل الأكاديمية" },
  steps: [
    { title: { en: "1. Submit an Assessment Request", ar: "1. أرسل طلب التقييم" }, body: { en: "Tell us about the student, goals, level, and availability through the free assessment form.", ar: "أخبرنا عن الطالب وأهدافه ومستواه وأوقاته عبر نموذج التقييم المجاني." } },
    { title: { en: "2. We Review Student Needs", ar: "2. نراجع احتياجات الطالب" }, body: { en: "Our admissions team reads every request and may ask a few clarifying questions.", ar: "يراجع فريق القبول كل طلب وقد يطرح بعض الأسئلة التوضيحية." } },
    { title: { en: "3. Get a Learning Path Recommendation", ar: "3. احصل على توصية بالمسار" }, body: { en: "We suggest a suitable program and starting level, with an honest explanation of why.", ar: "نقترح البرنامج ومستوى البداية المناسبين مع شرح صادق للسبب." } },
    { title: { en: "4. Confirm Schedule & Enrollment", ar: "4. تأكيد الموعد والتسجيل" }, body: { en: "We agree on days and times with an available teacher. Nothing is confirmed until we confirm it with you.", ar: "نتفق على الأيام والأوقات مع معلم متاح. لا يُعد شيء مؤكدًا حتى نؤكده معك." } },
    { title: { en: "5. Begin Lessons", ar: "5. ابدأ الدروس" }, body: { en: "Start learning with a clear plan. We help with setup before the first session.", ar: "ابدأ التعلم بخطة واضحة، ونساعدك في الإعداد قبل الجلسة الأولى." } },
    { title: { en: "6. Review Progress", ar: "6. راجع التقدم" }, body: { en: "Periodic reviews track progress and adjust the plan. Parents receive regular updates.", ar: "مراجعات دورية تتبع التقدم وتعدّل الخطة، ويتلقى أولياء الأمور تحديثات منتظمة." } },
  ],
  notes: {
    en: "Prepare a quiet space and a device with camera and microphone. Changes and cancellations are handled fairly — the details are explained during enrollment and in our Terms.",
    ar: "جهّز مكانًا هادئًا وجهازًا بكاميرا وميكروفون. تُعالج التغييرات والإلغاءات بعدالة، وتُشرح التفاصيل أثناء التسجيل وفي الشروط والأحكام.",
  },
};

export const audiences: Record<string, { title: Bilingual; intro: Bilingual; bullets: Bilingual[]; cta: Bilingual }> = {
  children: {
    title: { en: "Programs for Children", ar: "برامج الأطفال" },
    intro: {
      en: "Age-appropriate Quran and Islamic education that keeps young learners engaged while giving parents full visibility into progress.",
      ar: "تعليم مناسب للعمر في القرآن والدراسات الإسلامية يحافظ على تفاعل الصغار مع شفافية كاملة لأولياء الأمور حول التقدم.",
    },
    bullets: [
      { en: "Short, engaging sessions matched to attention spans", ar: "جلسات قصيرة ممتعة تناسب مدة الانتباه" },
      { en: "Quran reading, memorization, and Islamic manners tracks", ar: "مسارات لقراءة القرآن والحفظ والآداب الإسلامية" },
      { en: "Parent updates after every stage of progress", ar: "تحديثات لأولياء الأمور بعد كل مرحلة تقدم" },
      { en: "Safeguarding-first operations and supervised channels", ar: "تشغيل يضع الحماية أولًا وقنوات خاضعة للإشراف" },
    ],
    cta: { en: "Book a Children's Assessment", ar: "احجز تقييمًا لطفلك" },
  },
  adults: {
    title: { en: "Programs for Adults", ar: "برامج الكبار" },
    intro: {
      en: "Flexible pathways for adults improving Quran reading, learning Arabic, or deepening Islamic knowledge — scheduled around real life.",
      ar: "مسارات مرنة للكبار لتحسين قراءة القرآن أو تعلم العربية أو تعميق المعرفة الإسلامية — بمواعيد تناسب الحياة الواقعية.",
    },
    bullets: [
      { en: "Beginner-friendly starts from the alphabet", ar: "بدايات مناسبة للمبتدئين من مستوى الحروف" },
      { en: "Evening and weekend availability across UK/Canada zones", ar: "توفر مسائي وفي عطلات نهاية الأسبوع عبر المناطق البريطانية والكندية" },
      { en: "Private, respectful one-to-one sessions", ar: "جلسات فردية خاصة ومحترمة" },
      { en: "Tajweed, Hifz, Arabic, and Tafsir tracks", ar: "مسارات التجويد والحفظ والعربية والتفسير" },
    ],
    cta: { en: "Book an Adult Assessment", ar: "احجز تقييمًا للكبار" },
  },
  converts: {
    title: { en: "Programs for Converts", ar: "برامج المسلمين الجدد" },
    intro: {
      en: "A welcoming, judgment-free path covering essential recitation, prayer, beliefs, and daily practice — at your pace.",
      ar: "مسار مرحّب وخالٍ من الأحكام يغطي أساسيات التلاوة والصلاة والعقيدة والممارسة اليومية — بإيقاعك الخاص.",
    },
    bullets: [
      { en: "Learn to read short chapters used in prayer", ar: "تعلم قراءة السور القصيرة المستخدمة في الصلاة" },
      { en: "Foundations of belief and worship, step by step", ar: "أساسيات العقيدة والعبادة خطوة بخطوة" },
      { en: "Patient teachers experienced with new Muslims", ar: "معلمون صبورون ذوو خبرة مع المسلمين الجدد" },
      { en: "Space to ask every question freely", ar: "مساحة لطرح كل سؤال بحرية" },
    ],
    cta: { en: "Start Your Journey", ar: "ابدأ رحلتك" },
  },
  families: {
    title: { en: "Programs for Muslim Families", ar: "برامج العائلات المسلمة" },
    intro: {
      en: "One place for the whole household: children's lessons, parents' learning, and a shared routine the family can keep.",
      ar: "مكان واحد لجميع أفراد الأسرة: دروس الأطفال وتعلم الوالدين وروتين مشترك يمكن للعائلة الالتزام به.",
    },
    bullets: [
      { en: "Children's Quran reading, Hifz, and manners tracks", ar: "مسارات قراءة القرآن والحفظ والآداب للأطفال" },
      { en: "Parents' Tajweed and Arabic options alongside", ar: "خيارات التجويد والعربية لأولياء الأمور بالتوازي" },
      { en: "Coordinated schedules to reduce weekly hassle", ar: "مواعيد منسقة لتقليل عناء الأسبوع" },
      { en: "One progress report covering every child", ar: "تقرير تقدم واحد يغطي كل طفل" },
    ],
    cta: { en: "Plan Family Learning", ar: "خطط لتعلم عائلتك" },
  },
};

export const seoPages: Record<string, { title: Bilingual; intro: Bilingual; sections: { h: Bilingual; p: Bilingual }[] }> = {
  uk: {
    title: { en: "Online Quran Classes in the UK", ar: "دروس القرآن أونلاين في بريطانيا" },
    intro: {
      en: "Live online Quran, Arabic, and Islamic Studies lessons scheduled on UK time (GMT/BST) for children, adults, and converts across Britain.",
      ar: "دروس مباشرة أونلاين في القرآن والعربية والدراسات الإسلامية بمواعيد بريطانية (GMT/BST) للأطفال والكبار والمسلمين الجدد في جميع أنحاء بريطانيا.",
    },
    sections: [
      { h: { en: "Lessons on your clock", ar: "دروس بتوقيتك" }, p: { en: "After-school slots for children and evening options for working adults, all planned around Europe/London time with daylight-saving adjustments.", ar: "مواعيد بعد المدرسة للأطفال وخيارات مسائية للعاملين، كلها مخططة بتوقيت لندن مع مراعاة التوقيت الصيفي." } },
      { h: { en: "Safeguarding you can verify", ar: "حماية يمكنك التحقق منها" }, p: { en: "Parent-led enrollment, supervised lesson channels, and clear escalation paths — ask us anything before you commit.", ar: "تسجيل عبر ولي الأمر وقنوات دروس خاضعة للإشراف ومسارات تصعيد واضحة — اسألنا عن كل شيء قبل الالتزام." } },
      { h: { en: "Start with an assessment", ar: "ابدأ بالتقييم" }, p: { en: "Tell us your goals and availability and we will recommend a program and confirm a schedule with you.", ar: "أخبرنا بأهدافك وأوقاتك وسنوصي ببرنامج ونؤكد معك الموعد." } },
    ],
  },
  canada: {
    title: { en: "Online Quran Classes in Canada", ar: "دروس القرآن أونلاين في كندا" },
    intro: {
      en: "Structured online Quran and Arabic learning across Canadian time zones — from Toronto to Vancouver — for the whole family.",
      ar: "تعلم منظم أونلاين للقرآن والعربية عبر المناطق الزمنية الكندية — من تورونتو إلى فانكوفر — لجميع أفراد العائلة.",
    },
    sections: [
      { h: { en: "Coast-to-coast scheduling", ar: "مواعيد من الساحل إلى الساحل" }, p: { en: "We plan around America/Toronto and America/Vancouver time, with weekend options for busy households.", ar: "نخطط بتوقيت تورونتو وفانكوفر مع خيارات نهاية الأسبوع للأسر المشغولة." } },
      { h: { en: "Programs for every age", ar: "برامج لكل عمر" }, p: { en: "Children's foundations, adult reading and Tajweed, Hifz tracks, and Arabic for non-native speakers.", ar: "تأسيس الأطفال، وقراءة الكبار والتجويد، ومسارات الحفظ، والعربية لغير الناطقين بها." } },
      { h: { en: "Start with an assessment", ar: "ابدأ بالتقييم" }, p: { en: "Share your goals and preferred times and we will match you with an available teacher.", ar: "شاركنا أهدافك وأوقاتك المفضلة وسنطابقك مع معلم متاح." } },
    ],
  },
  kids: {
    title: { en: "Online Quran Classes for Kids", ar: "دروس القرآن أونلاين للأطفال" },
    intro: {
      en: "Safe, engaging, structured Quran lessons for children — with parents as partners in every step.",
      ar: "دروس قرآن آمنة وممتعة ومنظمة للأطفال — وأولياء الأمور شركاء في كل خطوة.",
    },
    sections: [
      { h: { en: "Built for young attention spans", ar: "مصممة لمدة انتباه الصغار" }, p: { en: "Short focused segments, recitation games, and gentle repetition keep learning joyful.", ar: "فقرات قصيرة مركزة وألعاب تلاوة وتكرار لطيف تجعل التعلم ممتعًا." } },
      { h: { en: "Reading, Hifz, and manners", ar: "القراءة والحفظ والآداب" }, p: { en: "A balanced path: read correctly first, memorize steadily, and learn Islamic manners along the way.", ar: "مسار متوازن: القراءة الصحيحة أولًا، ثم الحفظ بثبات، وتعلم الآداب الإسلامية في الطريق." } },
      { h: { en: "Parents always in the loop", ar: "الأهل على اطلاع دائم" }, p: { en: "Progress summaries and open channels with teachers and admissions.", ar: "ملخصات تقدم وقنوات مفتوحة مع المعلمين وفريق القبول." } },
    ],
  },
  adults: {
    title: { en: "Online Quran Classes for Adults", ar: "دروس القرآن أونلاين للكبار" },
    intro: {
      en: "It's never too late to start. Respectful one-to-one lessons for adults — from the alphabet to advanced recitation.",
      ar: "لم يفت الأوان أبدًا. دروس فردية محترمة للكبار — من الحروف إلى التلاوة المتقدمة.",
    },
    sections: [
      { h: { en: "Start exactly where you are", ar: "ابدأ من حيث أنت تمامًا" }, p: { en: "No embarrassment, no assumptions. Your assessment places you at the right level privately.", ar: "لا إحراج ولا افتراضات. جلسة التقييم تضعك في المستوى الصحيح بسرية." } },
      { h: { en: "Fit learning around work", ar: "تعلم يناسب عملك" }, p: { en: "Early-morning, evening, and weekend slots with fair rescheduling explained upfront.", ar: "مواعيد صباحية ومسائية وفي العطلات، مع سياسة إعادة جدولة عادلة تُشرح مسبقًا." } },
      { h: { en: "Go beyond reading", ar: "تجاوز القراءة" }, p: { en: "Add Tajweed, Hifz, Arabic, or Tafsir when you are ready — one pathway, many doors.", ar: "أضف التجويد أو الحفظ أو العربية أو التفسير عندما تكون مستعدًا — مسار واحد وأبواب كثيرة." } },
    ],
  },
};
