import type { PageDoc } from "./academy";

// Editable legal & safeguarding pages. Final policies for the UK and
// Canada must be reviewed for the applicable jurisdictions before relying on them.

const now = new Date().toISOString();
const by = "system";

export const seedPages: PageDoc[] = [
  {
    id: "page_privacy",
    slug: "privacy",
    title: { en: "Privacy Policy", ar: "سياسة الخصوصية" },
    metaTitle: { en: "Privacy Policy", ar: "سياسة الخصوصية" },
    metaDescription: {
      en: "How the academy collects, uses, and protects personal information.",
      ar: "كيف تجمع الأكاديمية المعلومات الشخصية وتستخدمها وتحميها.",
    },
    content: {
      en: "Administrator notice: this is a starter template. Have it reviewed for UK and Canadian privacy requirements before relying on it.\n\nWe collect only the information needed to arrange lessons: your name, contact details, learning goals, and scheduling preferences.\n\nAssessment requests and student records are accessible only to authorized staff under role-based permissions.\n\nWe do not sell personal information. Children's data is collected through a parent or guardian and used only for educational purposes.\n\nTo request access, correction, or deletion of your data, contact us through the Contact page.",
      ar: "تنبيه للإدارة: هذه صيغة أولية يجب مراجعتها وفق متطلبات الخصوصية في بريطانيا وكندا قبل الاعتماد عليها.\n\nنجمع فقط المعلومات اللازمة لترتيب الدروس: الاسم وبيانات التواصل والأهداف التعليمية وتفضيلات المواعيد.\n\nطلبات التقييم وسجلات الطلاب متاحة فقط للموظفين المخولين وفق صلاحيات محددة.\n\nلا نبيع المعلومات الشخصية. تُجمع بيانات الأطفال عبر ولي الأمر وتُستخدم للأغراض التعليمية فقط.\n\nلطلب الوصول إلى بياناتك أو تصحيحها أو حذفها، تواصل معنا عبر صفحة التواصل.",
    },
    status: "published",
    updatedAt: now,
    updatedBy: by,
  },
  {
    id: "page_terms",
    slug: "terms",
    title: { en: "Terms & Conditions", ar: "الشروط والأحكام" },
    metaTitle: { en: "Terms & Conditions", ar: "الشروط والأحكام" },
    metaDescription: {
      en: "The terms governing lessons, scheduling, payments, and conduct.",
      ar: "الشروط المنظمة للدروس والمواعيد والمدفوعات والسلوك.",
    },
    content: {
      en: "Administrator notice: starter template — complete payment, cancellation, and rescheduling terms before publishing as final.\n\nLessons are scheduled by agreement between the student (or parent) and the academy. A booked assessment is not confirmed until our team confirms availability with you.\n\nStudents are expected to attend on time and inform us in advance of any change. Rescheduling and cancellation handling is explained during enrollment.\n\nFees, where applicable, are communicated clearly before enrollment. No hidden charges.\n\nRespectful conduct is required from students, parents, and staff at all times.",
      ar: "تنبيه للإدارة: صيغة أولية — أكملوا شروط الدفع والإلغاء وإعادة الجدولة قبل اعتمادها نهائيًا.\n\nتُحدد مواعيد الدروس بالاتفاق بين الطالب (أو ولي الأمر) والأكاديمية. لا يُعد حجز التقييم مؤكدًا حتى يؤكد فريقنا التوفر معك.\n\nيُتوقع من الطلاب الحضور في الموعد وإبلاغنا مسبقًا بأي تغيير، وتُشرح سياسة إعادة الجدولة والإلغاء أثناء التسجيل.\n\nتُوضح الرسوم، حيثما وجدت، بشفافية قبل التسجيل دون أي رسوم خفية.\n\nالسلوك المحترم مطلوب من الطلاب وأولياء الأمور والموظفين في جميع الأوقات.",
    },
    status: "published",
    updatedAt: now,
    updatedBy: by,
  },
  {
    id: "page_safeguarding",
    slug: "safeguarding",
    title: { en: "Safeguarding & Child Protection", ar: "حماية الأطفال وسلامتهم" },
    metaTitle: { en: "Safeguarding & Child Protection", ar: "حماية الأطفال وسلامتهم" },
    metaDescription: {
      en: "Our approach to keeping young learners safe online.",
      ar: "منهجنا في الحفاظ على سلامة المتعلمين الصغار أونلاين.",
    },
    content: {
      en: "Administrator notice: safeguarding procedures must be defined with qualified oversight for the UK and Canada.\n\nEnrollment for children is completed by a parent or guardian. We avoid collecting unnecessary data about children.\n\nLessons take place on approved platforms. Communication with young learners stays within lesson channels visible to parents.\n\nConcerns about a child's welfare are escalated through a defined internal process and, where required, to the appropriate authorities.\n\nParents can contact us at any time about safety questions or complaints.",
      ar: "تنبيه للإدارة: يجب تحديد إجراءات الحماية بإشراف مؤهل لبريطانيا وكندا.\n\nيتم تسجيل الأطفال عبر ولي الأمر، ونتجنب جمع أي بيانات غير ضرورية عنهم.\n\nتُعقد الدروس على منصات معتمدة، ويبقى التواصل مع الصغار ضمن قنوات الدروس المرئية لأولياء الأمور.\n\nتُرفع أي مخاوف بشأن سلامة الطفل عبر مسار داخلي محدد، وعند الاقتضاء إلى الجهات المختصة.\n\nيمكن لأولياء الأمور التواصل معنا في أي وقت بشأن أسئلة السلامة أو الشكاوى.",
    },
    status: "published",
    updatedAt: now,
    updatedBy: by,
  },
  {
    id: "page_accessibility",
    slug: "accessibility",
    title: { en: "Accessibility Statement", ar: "بيان إمكانية الوصول" },
    metaTitle: { en: "Accessibility Statement", ar: "بيان إمكانية الوصول" },
    metaDescription: {
      en: "Our commitment to an accessible learning website for everyone.",
      ar: "التزامنا بموقع تعليمي ميسّر الوصول للجميع.",
    },
    content: {
      en: "We aim for a website everyone can use: keyboard navigation, clear focus states, readable contrast, resizable text, and full Arabic RTL support.\n\nLesson delivery accommodates common needs where possible — tell us about yours in the assessment request and we will plan accordingly.\n\nIf you encounter an accessibility barrier, contact us and we will address it promptly.",
      ar: "نسعى لموقع يستطيع الجميع استخدامه: التنقل بلوحة المفاتيح، وحالات تركيز واضحة، وتباين مقروء، ونص قابل للتكبير، ودعم كامل للعربية واتجاه RTL.\n\nنراعي الاحتياجات الشائعة في تقديم الدروس حيثما أمكن — أخبرنا باحتياجك في طلب التقييم وسنرتب ما يناسبك.\n\nإذا واجهت أي عائق وصول، تواصل معنا وسنعالجه في أقرب وقت.",
    },
    status: "published",
    updatedAt: now,
    updatedBy: by,
  },
];

