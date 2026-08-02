// Mock data layer for the Gaza Barter Platform (all data is fake / demo only).

export type Neighborhood = {
  id: string;
  name: string;
  city: string;
  lat: number;
  lng: number;
  members: number;
  posts: number;
};

export type Category = {
  id: string;
  name: string;
  icon: string;
  kind: "service" | "good";
  count: number;
};

export type User = {
  id: string;
  name: string;
  avatar: string;
  cover: string;
  bio: string;
  neighborhoodId: string;
  rating: number;
  reviews: number;
  completedBarters: number;
  joined: string;
  services: string[];
  goods: string[];
  verified: boolean;
};

export type Post = {
  id: string;
  type: "offer" | "request";
  userId: string;
  neighborhoodId: string;
  createdAt: string;
  title: string;
  description: string;
  images: string[];
  tags: string[];
  categoryId: string;
  offerItems: string[];
  wantedItems: string[];
  location: string;
  distanceKm: number;
  status: "متاح" | "قيد التبادل" | "مكتمل";
  visibility: "public" | "neighborhood";
  views: number;
  likes: number;
  comments: number;
  shares: number;
};

export type Comment = {
  id: string;
  postId: string;
  userId: string;
  parentId: string | null;
  body: string;
  image?: string;
  createdAt: string;
  likes: number;
};

export type Notification = {
  id: string;
  kind: "comment" | "barter" | "accepted" | "rejected" | "message";
  userId: string;
  text: string;
  time: string;
  read: boolean;
};

export type Conversation = {
  id: string;
  userId: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  typing?: boolean;
  messages: Message[];
};

export type Message = {
  id: string;
  from: "me" | "them";
  kind: "text" | "image" | "location";
  body: string;
  time: string;
  read: boolean;
};

export const neighborhoods: Neighborhood[] = [
  { id: "rimal", name: "الرمال", city: "غزة", lat: 31.5205, lng: 34.4402, members: 1840, posts: 312 },
  { id: "shujaiya", name: "الشجاعية", city: "غزة", lat: 31.5075, lng: 34.4776, members: 1520, posts: 264 },
  { id: "tal-alhawa", name: "تل الهوى", city: "غزة", lat: 31.4938, lng: 34.4267, members: 980, posts: 176 },
  { id: "sheikh-radwan", name: "الشيخ رضوان", city: "غزة", lat: 31.5324, lng: 34.4593, members: 1330, posts: 221 },
  { id: "zaytoun", name: "الزيتون", city: "غزة", lat: 31.4936, lng: 34.4587, members: 1190, posts: 205 },
  { id: "nasr", name: "النصر", city: "غزة", lat: 31.5286, lng: 34.4423, members: 870, posts: 143 },
  { id: "tuffah", name: "التفاح", city: "غزة", lat: 31.5217, lng: 34.4682, members: 760, posts: 128 },
  { id: "jabalia", name: "جباليا", city: "شمال غزة", lat: 31.5272, lng: 34.4831, members: 2100, posts: 388 },
  { id: "beit-lahia", name: "بيت لاهيا", city: "شمال غزة", lat: 31.5519, lng: 34.4977, members: 940, posts: 152 },
  { id: "beit-hanoun", name: "بيت حانون", city: "شمال غزة", lat: 31.5385, lng: 34.5361, members: 610, posts: 97 },
  { id: "deir-albalah", name: "دير البلح", city: "الوسطى", lat: 31.4183, lng: 34.3512, members: 1280, posts: 210 },
  { id: "khan-younis", name: "خان يونس", city: "الجنوب", lat: 31.3444, lng: 34.3031, members: 1960, posts: 341 },
  { id: "rafah", name: "رفح", city: "الجنوب", lat: 31.2968, lng: 34.2455, members: 1710, posts: 298 },
];

export const categories: Category[] = [
  { id: "food", name: "مواد غذائية", icon: "🥫", kind: "good", count: 214 },
  { id: "water", name: "مياه ووقود", icon: "💧", kind: "good", count: 132 },
  { id: "clothes", name: "ملابس وأغطية", icon: "🧥", kind: "good", count: 176 },
  { id: "medical", name: "أدوية ومستلزمات طبية", icon: "🩺", kind: "good", count: 88 },
  { id: "electricity", name: "طاقة وشحن", icon: "🔋", kind: "service", count: 143 },
  { id: "repair", name: "صيانة وتصليح", icon: "🛠️", kind: "service", count: 121 },
  { id: "education", name: "تعليم ودروس", icon: "📚", kind: "service", count: 76 },
  { id: "transport", name: "نقل ومواصلات", icon: "🚚", kind: "service", count: 64 },
  { id: "care", name: "رعاية ومساعدة", icon: "🤝", kind: "service", count: 59 },
  { id: "tools", name: "أدوات ومعدات", icon: "🧰", kind: "good", count: 93 },
];

const img = (seed: string, w = 800, h = 600) => `https://picsum.photos/seed/${seed}/${w}/${h}`;
const av = (n: number) => `https://i.pravatar.cc/160?img=${n}`;

export const users: User[] = [
  {
    id: "u1",
    name: "أحمد أبو ناصر",
    avatar: av(12),
    cover: img("cover-ahmed", 1200, 400),
    bio: "فني إلكترونيات، أوفّر خدمة شحن الهواتف بالطاقة الشمسية مقابل مواد غذائية.",
    neighborhoodId: "rimal",
    rating: 4.8,
    reviews: 34,
    completedBarters: 27,
    joined: "منذ 8 أشهر",
    services: ["شحن هواتف", "تصليح إلكترونيات", "تمديد كهرباء"],
    goods: ["بطاريات", "كوابل", "لوح طاقة صغير"],
    verified: true,
  },
  {
    id: "u2",
    name: "سماح الحلبي",
    avatar: av(45),
    cover: img("cover-samah", 1200, 400),
    bio: "أخبز الخبز يومياً وأبحث عن طحين وسكر مقابل خدمات الخبز والطبخ.",
    neighborhoodId: "shujaiya",
    rating: 4.9,
    reviews: 51,
    completedBarters: 44,
    joined: "منذ سنة",
    services: ["خبز وطبخ", "تحضير وجبات جماعية"],
    goods: ["خبز طازج", "معجنات"],
    verified: true,
  },
  {
    id: "u3",
    name: "محمود شعث",
    avatar: av(33),
    cover: img("cover-mahmoud", 1200, 400),
    bio: "سائق عربة نقل داخل خان يونس، أنقل الأغراض مقابل وقود أو مواد غذائية.",
    neighborhoodId: "khan-younis",
    rating: 4.6,
    reviews: 22,
    completedBarters: 19,
    joined: "منذ 5 أشهر",
    services: ["نقل أغراض", "توصيل مياه"],
    goods: ["جالونات مياه"],
    verified: false,
  },
  {
    id: "u4",
    name: "رنا عبد الهادي",
    avatar: av(26),
    cover: img("cover-rana", 1200, 400),
    bio: "معلمة رياضيات، أعطي دروس تقوية للأطفال مقابل ملابس شتوية أو أغطية.",
    neighborhoodId: "tal-alhawa",
    rating: 5,
    reviews: 40,
    completedBarters: 31,
    joined: "منذ 10 أشهر",
    services: ["دروس رياضيات", "دعم نفسي للأطفال"],
    goods: ["قرطاسية", "كتب"],
    verified: true,
  },
  {
    id: "u5",
    name: "يوسف الترابين",
    avatar: av(60),
    cover: img("cover-yousef", 1200, 400),
    bio: "ممرض متطوع، أقدّم إسعافات أولية وضمادات مقابل أدوية أو معقمات.",
    neighborhoodId: "rafah",
    rating: 4.7,
    reviews: 29,
    completedBarters: 24,
    joined: "منذ 7 أشهر",
    services: ["إسعافات أولية", "قياس ضغط وسكر"],
    goods: ["ضمادات", "معقمات"],
    verified: true,
  },
  {
    id: "u6",
    name: "ليان المصري",
    avatar: av(48),
    cover: img("cover-layan", 1200, 400),
    bio: "خياطة، أصلح وأخيط الملابس مقابل مواد غذائية أو صابون.",
    neighborhoodId: "jabalia",
    rating: 4.85,
    reviews: 37,
    completedBarters: 33,
    joined: "منذ 9 أشهر",
    services: ["خياطة وتعديل ملابس", "تفصيل أغطية"],
    goods: ["أقمشة", "خيوط"],
    verified: false,
  },
];

export const currentUser: User = users[0]!;

export const posts: Post[] = [
  {
    id: "p1",
    type: "offer",
    userId: "u1",
    neighborhoodId: "rimal",
    createdAt: "قبل 12 دقيقة",
    title: "شحن هواتف وبطاريات بالطاقة الشمسية",
    description:
      "عندي لوح طاقة شمسية ومحطة شحن تعمل يومياً من 8 صباحاً حتى 4 عصراً. أستطيع شحن حتى 20 جهاز يومياً، وأبحث عن مواد غذائية أساسية لعائلتي.",
    images: [img("charge1"), img("charge2")],
    tags: ["شحن", "طاقة شمسية", "كهرباء"],
    categoryId: "electricity",
    offerItems: ["شحن هاتف كامل", "شحن بطارية ليد", "شحن باور بانك"],
    wantedItems: ["طحين", "أرز", "سكر"],
    location: "شارع الجلاء - الرمال",
    distanceKm: 0.6,
    status: "متاح",
    visibility: "public",
    views: 1240,
    likes: 186,
    comments: 24,
    shares: 12,
  },
  {
    id: "p2",
    type: "request",
    userId: "u2",
    neighborhoodId: "shujaiya",
    createdAt: "قبل ساعة",
    title: "أحتاج تصليح فرن غاز صغير",
    description:
      "الفرن تعطّل منذ ثلاثة أيام وأنا أخبز للجيران يومياً. أبحث عن فني يصلحه، وبالمقابل أقدّم زيت طهي وبطانيات وخبز يومي لأسبوع.",
    images: [img("oven1")],
    tags: ["صيانة", "فرن", "خبز"],
    categoryId: "repair",
    offerItems: ["زيت طهي 2 لتر", "بطانيتان", "خبز يومي لأسبوع"],
    wantedItems: ["تصليح فرن غاز"],
    location: "حي الشجاعية - قرب السوق",
    distanceKm: 3.4,
    status: "متاح",
    visibility: "public",
    views: 860,
    likes: 97,
    comments: 15,
    shares: 6,
  },
  {
    id: "p3",
    type: "offer",
    userId: "u4",
    neighborhoodId: "tal-alhawa",
    createdAt: "قبل 3 ساعات",
    title: "دروس رياضيات وعربي للمرحلة الابتدائية",
    description:
      "أعطي دروس تقوية لثلاث ساعات يومياً في خيمة التعليم. أبحث عن ملابس شتوية للأطفال أو أغطية بحالة جيدة.",
    images: [img("teach1"), img("teach2"), img("teach3")],
    tags: ["تعليم", "أطفال", "دروس"],
    categoryId: "education",
    offerItems: ["درس رياضيات", "درس لغة عربية", "متابعة أسبوعية"],
    wantedItems: ["ملابس أطفال", "أغطية"],
    location: "تل الهوى - قرب المدرسة",
    distanceKm: 2.1,
    status: "قيد التبادل",
    visibility: "public",
    views: 640,
    likes: 122,
    comments: 18,
    shares: 9,
  },
  {
    id: "p4",
    type: "offer",
    userId: "u6",
    neighborhoodId: "jabalia",
    createdAt: "قبل 5 ساعات",
    title: "خياطة وتعديل ملابس الشتاء",
    description:
      "ماكينة خياطة تعمل يدوياً، أصلح الملابس والجواكيت وأحوّل الأغطية إلى معاطف للأطفال مقابل مواد غذائية أو صابون.",
    images: [img("sew1")],
    tags: ["خياطة", "ملابس", "شتاء"],
    categoryId: "clothes",
    offerItems: ["تعديل ملابس", "تفصيل معطف طفل"],
    wantedItems: ["عدس", "صابون", "معلبات"],
    location: "مخيم جباليا - بلوك 4",
    distanceKm: 6.8,
    status: "متاح",
    visibility: "neighborhood",
    views: 410,
    likes: 73,
    comments: 8,
    shares: 4,
  },
  {
    id: "p5",
    type: "request",
    userId: "u3",
    neighborhoodId: "khan-younis",
    createdAt: "قبل 8 ساعات",
    title: "أحتاج جالون سولار لتشغيل عربة النقل",
    description:
      "عربة النقل متوقفة بسبب نقص الوقود. مقابل الوقود أوفّر خدمة نقل مجانية داخل خان يونس لمدة ثلاثة أيام.",
    images: [img("truck1"), img("truck2")],
    tags: ["وقود", "نقل", "مواصلات"],
    categoryId: "transport",
    offerItems: ["نقل أثاث", "توصيل مياه", "نقل خيام"],
    wantedItems: ["10 لتر سولار"],
    location: "خان يونس - دوار البنك",
    distanceKm: 21.4,
    status: "متاح",
    visibility: "public",
    views: 980,
    likes: 141,
    comments: 21,
    shares: 17,
  },
  {
    id: "p6",
    type: "offer",
    userId: "u5",
    neighborhoodId: "rafah",
    createdAt: "أمس",
    title: "إسعافات أولية وتغيير ضمادات في المنزل",
    description:
      "ممرض متطوع أزور البيوت والخيام لتغيير الضمادات وقياس الضغط والسكر. أحتاج مسكنات ومضادات حيوية ومعقمات.",
    images: [img("nurse1")],
    tags: ["صحة", "تمريض", "إسعاف"],
    categoryId: "medical",
    offerItems: ["تغيير ضمادات", "قياس ضغط", "حقن عضلية"],
    wantedItems: ["مسكنات", "معقم", "قفازات"],
    location: "رفح - حي البرازيل",
    distanceKm: 29.2,
    status: "متاح",
    visibility: "public",
    views: 1520,
    likes: 244,
    comments: 33,
    shares: 28,
  },
  {
    id: "p7",
    type: "offer",
    userId: "u1",
    neighborhoodId: "rimal",
    createdAt: "أمس",
    title: "تصليح إنارة ليد وتمديد كهرباء للخيام",
    description:
      "أصلّح كشافات الليد وأمدّد أسلاك آمنة للخيام. مقابل معلبات أو حليب أطفال.",
    images: [img("light1")],
    tags: ["كهرباء", "إنارة", "خيام"],
    categoryId: "repair",
    offerItems: ["تصليح كشاف ليد", "تمديد أسلاك"],
    wantedItems: ["حليب أطفال", "معلبات"],
    location: "الرمال الجنوبي",
    distanceKm: 1.2,
    status: "مكتمل",
    visibility: "neighborhood",
    views: 320,
    likes: 58,
    comments: 6,
    shares: 3,
  },
  {
    id: "p8",
    type: "request",
    userId: "u2",
    neighborhoodId: "shujaiya",
    createdAt: "قبل يومين",
    title: "أبحث عن مياه شرب نظيفة مقابل خبز",
    description:
      "أحتاج جالونات مياه شرب يومياً للعائلة، ومقابلها أقدّم خبزاً طازجاً كل صباح.",
    images: [img("water1")],
    tags: ["مياه", "خبز", "يومي"],
    categoryId: "water",
    offerItems: ["خبز طازج يومي"],
    wantedItems: ["جالون مياه 20 لتر"],
    location: "الشجاعية - المنطار",
    distanceKm: 3.9,
    status: "متاح",
    visibility: "public",
    views: 730,
    likes: 88,
    comments: 11,
    shares: 5,
  },
];

export const comments: Comment[] = [
  {
    id: "c1",
    postId: "p1",
    userId: "u2",
    parentId: null,
    body: "بارك الله فيك، عندي كيس طحين 5 كيلو مقابل شحن يومي لأسبوع. هل يناسبك؟",
    createdAt: "قبل 8 دقائق",
    likes: 14,
  },
  {
    id: "c2",
    postId: "p1",
    userId: "u1",
    parentId: "c1",
    body: "يناسبني تماماً، تفضلي بعد العصر عند محطة الشحن.",
    createdAt: "قبل 5 دقائق",
    likes: 6,
  },
  {
    id: "c3",
    postId: "p1",
    userId: "u4",
    parentId: "c2",
    body: "أنا كمان محتاجة أشحن لابتوب الدروس، بحجزلي دور بكرة؟",
    createdAt: "قبل 3 دقائق",
    likes: 3,
  },
  {
    id: "c4",
    postId: "p1",
    userId: "u5",
    parentId: null,
    body: "خدمة ممتازة، جربتها الأسبوع الماضي والشحن كان سريع.",
    image: img("comment1", 400, 300),
    createdAt: "قبل ساعة",
    likes: 21,
  },
];

export const notifications: Notification[] = [
  { id: "n1", kind: "barter", userId: "u2", text: "أرسلت لك طلب مقايضة على منشور «شحن هواتف بالطاقة الشمسية»", time: "قبل 4 دقائق", read: false },
  { id: "n2", kind: "comment", userId: "u4", text: "علّقت على منشورك: «بحجزلي دور بكرة؟»", time: "قبل 12 دقيقة", read: false },
  { id: "n3", kind: "accepted", userId: "u6", text: "قبلت طلب المقايضة: خياطة معطف مقابل معلبات", time: "قبل ساعتين", read: false },
  { id: "n4", kind: "message", userId: "u3", text: "أرسل لك رسالة جديدة حول نقل الأغراض", time: "قبل 5 ساعات", read: true },
  { id: "n5", kind: "rejected", userId: "u5", text: "اعتذر عن طلب المقايضة لعدم توفر المعقمات حالياً", time: "أمس", read: true },
  { id: "n6", kind: "comment", userId: "u2", text: "ردّت على تعليقك في منشور «مياه شرب مقابل خبز»", time: "أمس", read: true },
];

export const conversations: Conversation[] = [
  {
    id: "cv1",
    userId: "u2",
    lastMessage: "تمام، بجيب الطحين بعد العصر إن شاء الله",
    time: "10:24",
    unread: 2,
    online: true,
    typing: true,
    messages: [
      { id: "m1", from: "them", kind: "text", body: "السلام عليكم، شفت منشور الشحن", time: "10:02", read: true },
      { id: "m2", from: "me", kind: "text", body: "وعليكم السلام، أهلاً فيكِ 🌿", time: "10:04", read: true },
      { id: "m3", from: "them", kind: "text", body: "عندي كيس طحين 5 كيلو، بيصير مقابل شحن يومي لأسبوع؟", time: "10:06", read: true },
      { id: "m4", from: "me", kind: "text", body: "أكيد، هي صورة محطة الشحن", time: "10:08", read: true },
      { id: "m5", from: "me", kind: "image", body: img("chat1", 600, 400), time: "10:09", read: true },
      { id: "m6", from: "them", kind: "location", body: "الشجاعية - قرب السوق", time: "10:20", read: true },
      { id: "m7", from: "them", kind: "text", body: "تمام، بجيب الطحين بعد العصر إن شاء الله", time: "10:24", read: false },
    ],
  },
  {
    id: "cv2",
    userId: "u3",
    lastMessage: "العربة جاهزة بكرة الصبح",
    time: "أمس",
    unread: 0,
    online: false,
    messages: [
      { id: "m8", from: "them", kind: "text", body: "محتاج سولار لو بتعرف حدا", time: "أمس", read: true },
      { id: "m9", from: "me", kind: "text", body: "بسأل جيراني وبرجعلك", time: "أمس", read: true },
      { id: "m10", from: "them", kind: "text", body: "العربة جاهزة بكرة الصبح", time: "أمس", read: true },
    ],
  },
  {
    id: "cv3",
    userId: "u4",
    lastMessage: "الدروس بتبدأ الساعة 9",
    time: "الأحد",
    unread: 1,
    online: true,
    messages: [
      { id: "m11", from: "them", kind: "text", body: "الدروس بتبدأ الساعة 9", time: "الأحد", read: false },
    ],
  },
  {
    id: "cv4",
    userId: "u6",
    lastMessage: "خلصت تعديل الجاكيت 👌",
    time: "السبت",
    unread: 0,
    online: false,
    messages: [
      { id: "m12", from: "them", kind: "text", body: "خلصت تعديل الجاكيت 👌", time: "السبت", read: true },
    ],
  },
];

export const adminStats = {
  totals: { users: 18420, posts: 5312, barters: 3184, reports: 42 },
  weekly: [
    { day: "السبت", posts: 120, barters: 68 },
    { day: "الأحد", posts: 168, barters: 92 },
    { day: "الاثنين", posts: 143, barters: 81 },
    { day: "الثلاثاء", posts: 196, barters: 110 },
    { day: "الأربعاء", posts: 172, barters: 104 },
    { day: "الخميس", posts: 214, barters: 132 },
    { day: "الجمعة", posts: 158, barters: 88 },
  ],
  byCategory: categories.slice(0, 6).map((c) => ({ name: c.name, value: c.count })),
  growth: [
    { month: "يناير", users: 2100 },
    { month: "فبراير", users: 3400 },
    { month: "مارس", users: 5200 },
    { month: "أبريل", users: 7600 },
    { month: "مايو", users: 10400 },
    { month: "يونيو", users: 13900 },
    { month: "يوليو", users: 18420 },
  ],
};

export const reports = [
  { id: "r1", postId: "p5", reporter: "u4", reason: "معلومات مضللة", status: "قيد المراجعة", time: "قبل ساعة" },
  { id: "r2", postId: "p2", reporter: "u6", reason: "محتوى مكرر", status: "تمت المعالجة", time: "أمس" },
  { id: "r3", postId: "p8", reporter: "u3", reason: "طلب مقابل مالي", status: "قيد المراجعة", time: "أمس" },
  { id: "r4", postId: "p4", reporter: "u5", reason: "صورة غير مناسبة", status: "مرفوض", time: "قبل يومين" },
];

// ---- helpers -------------------------------------------------------------

export const getUser = (id: string): User => users.find((u) => u.id === id) ?? users[0]!;
export const getNeighborhood = (id: string): Neighborhood =>
  neighborhoods.find((n) => n.id === id) ?? neighborhoods[0]!;
export const getCategory = (id: string): Category => categories.find((c) => c.id === id) ?? categories[0]!;
export const getPost = (id: string) => posts.find((p) => p.id === id);
export const postComments = (postId: string) => comments.filter((c) => c.postId === postId);
