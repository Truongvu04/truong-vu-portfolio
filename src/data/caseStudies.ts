export type CaseStudyIcon =
  | "layout"
  | "sparkles"
  | "calendar"
  | "shopping-bag"
  | "shield"
  | "map"
  | "headphones"
  | "utensils"
  | "database";

export interface CaseStudyFeature {
  title: string;
  description: string;
  icon: CaseStudyIcon;
}

export interface CaseStudyProcessStep {
  label: string;
  title: string;
  description: string;
}

export interface CaseStudyGalleryItem {
  src: string;
  label: string;
  caption: string;
}

export interface CaseStudyTechGroup {
  label: string;
  items: string[];
}

export interface CaseStudyContent {
  id: string;
  slug: string;
  name: string;
  category: string;
  role: string;
  description: string;
  heroImage: string;
  website?: string;
  accent: string;
  overview: {
    type: string;
    year: string;
    duration: string;
    team: string;
    goal: string;
  };
  problem: string;
  problemHighlight: string;
  solution: string;
  solutionHighlight: string;
  process: CaseStudyProcessStep[];
  features: CaseStudyFeature[];
  gallery: CaseStudyGalleryItem[];
  result: string;
  technologies: CaseStudyTechGroup[];
}

export type CaseStudyLocalizedContent = Omit<
  CaseStudyContent,
  "id" | "slug" | "heroImage" | "website" | "accent"
>;

export interface CaseStudy extends CaseStudyContent {
  translations: {
    vi: CaseStudyLocalizedContent;
  };
}

const englishCaseStudies: CaseStudyContent[] = [
  {
    id: "huong-vi-viet",
    slug: "huong-vi-viet",
    name: "Huong Vi Viet",
    category: "Restaurant experience",
    role: "Product Designer · Frontend Developer",
    description:
      "A warm, editorial website that turns a Vietnamese restaurant's menu, atmosphere and reservation journey into one cohesive digital experience.",
    heroImage: "/previews/huong-vi-viet-hero.png",
    website: "https://huong-vi-viet.vercel.app",
    accent: "#e2a36b",
    overview: {
      type: "Personal project",
      year: "2025",
      duration: "3 weeks",
      team: "Solo project",
      goal: "Make the first visit feel as considered as the meal.",
    },
    problem:
      "Restaurant websites often make guests work too hard: menus are difficult to scan, the atmosphere is hidden behind generic galleries and reservations feel like an afterthought. The digital experience should create appetite and confidence before a guest ever arrives.",
    problemHighlight: "Create appetite before arrival.",
    solution:
      "Huong Vi Viet brings the restaurant story, menu discovery and reservation intent into a single visual flow. Rich food imagery, deliberate pacing and clear calls to action help visitors move from curiosity to a confident booking.",
    solutionHighlight: "A digital front door for Vietnamese hospitality.",
    process: [
      {
        label: "01",
        title: "Direction",
        description:
          "Defined an editorial art direction around warmth, craft and generous negative space.",
      },
      {
        label: "02",
        title: "Information flow",
        description:
          "Structured the journey around the questions guests ask first: what, where and when.",
      },
      {
        label: "03",
        title: "Interface",
        description:
          "Translated the brand into a calm responsive system with strong image-led hierarchy.",
      },
      {
        label: "04",
        title: "Build",
        description:
          "Implemented the experience with reusable sections, responsive states and motion details.",
      },
    ],
    features: [
      {
        title: "Menu discovery",
        description:
          "A clear menu structure lets guests scan dishes, categories and signature moments without friction.",
        icon: "utensils",
      },
      {
        title: "Atmosphere first",
        description:
          "Full-bleed imagery and editorial spacing communicate the feeling of the space before the details.",
        icon: "layout",
      },
      {
        title: "Reservation intent",
        description:
          "A focused path keeps the booking action visible without interrupting the browsing experience.",
        icon: "calendar",
      },
    ],
    gallery: [
      {
        src: "/previews/huong-vi-viet-hero.png",
        label: "01 / Arrival",
        caption:
          "The landing view establishes a warm, cinematic first impression.",
      },
      {
        src: "/previews/huong-vi-viet-menu.png",
        label: "02 / Menu",
        caption:
          "A scannable menu experience balances appetite appeal with clarity.",
      },
      {
        src: "/previews/huong-vi-viet-reservation.png",
        label: "03 / Reservation",
        caption:
          "The booking flow is direct, calm and easy to complete on mobile.",
      },
    ],
    result:
      "A complete restaurant experience that makes the brand feel tangible online, gives guests a clearer path to explore the menu and creates a more confident transition from browsing to reservation.",
    technologies: [
      { label: "Frontend", items: ["React", "TypeScript", "Tailwind CSS"] },
      {
        label: "Experience",
        items: ["Responsive UI", "Motion design", "Content architecture"],
      },
    ],
  },
  {
    id: "auralis-x1",
    slug: "auralis-x1",
    name: "Auralis X1",
    category: "3D product landing page",
    role: "Creative Developer · Frontend Developer",
    description:
      "An immersive product story for a premium headphone concept, built to make sound feel physical through depth, movement and focused product detail.",
    heroImage: "/previews/auralis-x1-hero.png",
    website: "https://headphone-azure.vercel.app",
    accent: "#9eabff",
    overview: {
      type: "Personal project",
      year: "2025",
      duration: "4 weeks",
      team: "Solo project",
      goal: "Make product performance feel visible and memorable.",
    },
    problem:
      "Premium hardware is often presented through static specification sheets. That approach can explain what a product has, but it rarely communicates how it feels to use or why its design deserves attention.",
    problemHighlight: "Turn specifications into sensation.",
    solution:
      "Auralis X1 uses a cinematic landing page to stage the product in chapters: reveal the silhouette, explain the listening modes and end with a clear invitation to explore. Movement supports the story while the interface stays intentionally quiet.",
    solutionHighlight: "A product page with the presence of a launch film.",
    process: [
      {
        label: "01",
        title: "Concept",
        description:
          "Set a visual language around midnight contrast, precision and the feeling of controlled sound.",
      },
      {
        label: "02",
        title: "Storyboarding",
        description:
          "Mapped scroll moments so every transition introduces either a product detail or a benefit.",
      },
      {
        label: "03",
        title: "Prototyping",
        description:
          "Tested image crops, type scale and interaction timing across desktop and touch layouts.",
      },
      {
        label: "04",
        title: "Development",
        description:
          "Built a flexible component system for the hero, modes, details and conversion points.",
      },
    ],
    features: [
      {
        title: "Cinematic reveal",
        description:
          "A staged opening creates focus and gives the product a strong sense of arrival.",
        icon: "headphones",
      },
      {
        title: "Listening modes",
        description:
          "Interactive sections make technical features easier to understand through context and comparison.",
        icon: "sparkles",
      },
      {
        title: "Product detail",
        description:
          "Close-up views and concise copy let visitors move from emotion into informed consideration.",
        icon: "layout",
      },
    ],
    gallery: [
      {
        src: "/previews/auralis-x1-hero.png",
        label: "01 / Hero",
        caption:
          "A controlled opening gives the product room to own the screen.",
      },
      {
        src: "/previews/auralis-x1-listening-modes.png",
        label: "02 / Modes",
        caption:
          "Listening modes are framed as experiences rather than a list of specs.",
      },
      {
        src: "/previews/auralis-x1-detail.png",
        label: "03 / Detail",
        caption:
          "Material, silhouette and engineering details receive a closer look.",
      },
    ],
    result:
      "A premium product narrative that makes an abstract listening experience easier to imagine, while giving the interface enough clarity to support real product exploration.",
    technologies: [
      { label: "Frontend", items: ["React", "TypeScript", "Tailwind CSS"] },
      {
        label: "Interaction",
        items: ["Framer Motion", "Responsive animation", "Visual storytelling"],
      },
    ],
  },
  {
    id: "flood-rescue-platform",
    slug: "flood-rescue-platform",
    name: "Flood Rescue Platform",
    category: "Emergency response platform",
    role: "UX/UI Designer · Frontend Developer",
    description:
      "A coordination interface for emergency rescue requests, designed to turn urgent, fragmented information into a clearer operational picture.",
    heroImage: "/previews/flood-rescue-2.png",
    website: "https://frrcp-rosy.vercel.app",
    accent: "#6ed3c6",
    overview: {
      type: "Team project",
      year: "2026",
      duration: "6 weeks",
      team: "Collaborative team",
      goal: "Help responders see, prioritize and act on urgent requests.",
    },
    problem:
      "During a disaster, requests arrive from different channels and with different levels of detail. When location, urgency and status are hard to read at a glance, coordination becomes slower exactly when the cost of delay is highest.",
    problemHighlight: "Make urgency legible.",
    solution:
      "The platform centralizes rescue requests, status updates and operational context in a task-oriented workspace. Clear priority states and structured information help teams understand what needs attention, what is in progress and what has been resolved.",
    solutionHighlight: "One shared picture for a fast-moving situation.",
    process: [
      {
        label: "01",
        title: "Understand",
        description:
          "Framed the people, constraints and information gaps that shape emergency response work.",
      },
      {
        label: "02",
        title: "Prioritize",
        description:
          "Separated urgent signals from supporting detail so teams can orient themselves quickly.",
      },
      {
        label: "03",
        title: "Prototype",
        description:
          "Explored dashboard, request and status patterns with an emphasis on scanability.",
      },
      {
        label: "04",
        title: "Validate",
        description:
          "Refined responsive layouts and interaction states around the most important operational actions.",
      },
    ],
    features: [
      {
        title: "Request triage",
        description:
          "Urgency, location and status are surfaced together so new cases can be prioritized quickly.",
        icon: "shield",
      },
      {
        title: "Response overview",
        description:
          "A dashboard view helps teams understand activity without opening every individual request.",
        icon: "map",
      },
      {
        title: "Structured updates",
        description:
          "Consistent case details create a dependable handoff between people and teams.",
        icon: "database",
      },
    ],
    gallery: [
      {
        src: "/previews/flood-rescue-1.png",
        label: "01 / Overview",
        caption:
          "The overview gives the response team a legible operational starting point.",
      },
      {
        src: "/previews/flood-rescue-2.png",
        label: "02 / Requests",
        caption: "Request details keep urgency and context close together.",
      },
      {
        src: "/previews/flood-rescue-3.png",
        label: "03 / Status",
        caption:
          "Clear state changes make progress easier to follow across the team.",
      },
    ],
    result:
      "A focused response platform that gives urgent information a clearer structure, helping users move from incoming request to coordinated action with less ambiguity.",
    technologies: [
      { label: "Frontend", items: ["React", "TypeScript", "Tailwind CSS"] },
      {
        label: "Product thinking",
        items: ["Dashboard UX", "Information hierarchy", "Responsive systems"],
      },
    ],
  },
  {
    id: "petcare-platform",
    slug: "petcare-platform",
    name: "PetCare Platform",
    category: "Full-stack web application",
    role: "Team Leader · Full-stack Developer",
    description:
      "A connected pet care ecosystem that brings pet profiles, health routines, services, shopping and guidance into one dependable place.",
    heroImage: "/previews/petcare-1.png",
    website: "https://pet-care-mu-sable.vercel.app",
    accent: "#f2b37e",
    overview: {
      type: "Team project",
      year: "2025",
      duration: "3 months",
      team: "3 members",
      goal: "Make everyday pet care easier to organize and act on.",
    },
    problem:
      "Pet care is often distributed across different services and personal notes. Owners have to switch between places to manage profiles, remember health routines, find products and get advice, making everyday care more fragmented than it needs to be.",
    problemHighlight: "Bring the whole routine together.",
    solution:
      "PetCare was shaped as a single ecosystem for the everyday moments around a pet. Profiles create a personal foundation, health tools support continuity, commerce handles practical needs and AI-assisted guidance helps owners take the next step with more confidence.",
    solutionHighlight: "A calmer home for the entire care journey.",
    process: [
      {
        label: "01",
        title: "Research",
        description:
          "Mapped the fragmented pet care journey and identified the moments where owners need the most confidence.",
      },
      {
        label: "02",
        title: "UX flow",
        description:
          "Connected profiles, health, services and commerce into a product structure that can grow.",
      },
      {
        label: "03",
        title: "UI design",
        description:
          "Created a friendly dashboard system that keeps practical information approachable.",
      },
      {
        label: "04",
        title: "Development",
        description:
          "Led the full-stack implementation across interface, APIs, data and AI consultation.",
      },
    ],
    features: [
      {
        title: "Pet management",
        description:
          "Personal profiles keep essential information, routines and care context in one place.",
        icon: "layout",
      },
      {
        title: "Health tracking",
        description:
          "Reminders and records help owners keep important care milestones visible over time.",
        icon: "calendar",
      },
      {
        title: "Service booking",
        description:
          "A more direct path connects owners with the services their pets need.",
        icon: "sparkles",
      },
      {
        title: "Smart consultation",
        description:
          "AI-assisted guidance helps turn questions into useful next steps for everyday care.",
        icon: "shield",
      },
    ],
    gallery: [
      {
        src: "/previews/petcare-1.png",
        label: "01 / Dashboard",
        caption:
          "The dashboard turns an ongoing care routine into a calmer daily view.",
      },
      {
        src: "/previews/petcare-2.png",
        label: "02 / Services",
        caption:
          "Service discovery and care actions are kept close to the pet context.",
      },
      {
        src: "/previews/petcare-3.png",
        label: "03 / Commerce",
        caption:
          "The product journey supports practical shopping without losing the ecosystem feel.",
      },
    ],
    result:
      "A full-stack product concept with a scalable foundation, bringing pet management, care routines, services and shopping into a more coherent experience for owners.",
    technologies: [
      { label: "Frontend", items: ["React", "TypeScript", "Tailwind CSS"] },
      { label: "Backend", items: ["Node.js", "Express", "Prisma", "MySQL"] },
      { label: "AI", items: ["Gemini API"] },
    ],
  },
];

const vietnameseCaseStudies: Record<string, CaseStudyLocalizedContent> = {
  "huong-vi-viet": {
    name: "Hương Vị Việt",
    category: "Trải nghiệm nhà hàng",
    role: "Product Designer · Frontend Developer",
    description:
      "Website mang tinh thần biên tập, biến thực đơn, không gian và hành trình đặt bàn của một nhà hàng Việt thành một trải nghiệm số thống nhất.",
    overview: {
      type: "Dự án cá nhân",
      year: "2026",
      duration: "5 ngày",
      team: "Dự án cá nhân",
      goal: "Khiến lần ghé thăm đầu tiên được chuẩn bị chu đáo như chính bữa ăn.",
    },
    problem:
      "Website nhà hàng thường khiến thực khách phải tìm kiếm quá nhiều: thực đơn khó xem, không gian bị che khuất sau những gallery chung chung và đặt bàn chỉ được xem như một bước phụ. Trải nghiệm số cần tạo cảm giác ngon miệng và tin tưởng trước khi khách đến.",
    problemHighlight: "Gợi cảm giác muốn đến trước khi khách xuất hiện.",
    solution:
      "Hương Vị Việt đưa câu chuyện nhà hàng, khám phá thực đơn và ý định đặt bàn vào cùng một mạch thị giác. Hình ảnh món ăn, nhịp điệu có chủ đích và CTA rõ ràng giúp người xem đi từ tò mò đến sẵn sàng đặt bàn.",
    solutionHighlight: "Cánh cửa số của tinh thần hiếu khách Việt.",
    process: [
      {
        label: "01",
        title: "Định hướng",
        description:
          "Xây dựng art direction xoay quanh sự ấm áp, thủ công và khoảng thở rộng rãi.",
      },
      {
        label: "02",
        title: "Luồng thông tin",
        description:
          "Sắp xếp hành trình theo những câu hỏi đầu tiên của thực khách: món gì, ở đâu và khi nào.",
      },
      {
        label: "03",
        title: "Giao diện",
        description:
          "Chuyển hóa tinh thần thương hiệu thành một hệ thống responsive điềm tĩnh, lấy hình ảnh làm trọng tâm.",
      },
      {
        label: "04",
        title: "Phát triển",
        description:
          "Triển khai bằng các section tái sử dụng, trạng thái responsive và chuyển động tinh tế.",
      },
    ],
    features: [
      {
        title: "Khám phá thực đơn",
        description:
          "Cấu trúc rõ ràng giúp thực khách xem món, nhóm món và các điểm nhấn mà không bị gián đoạn.",
        icon: "utensils",
      },
      {
        title: "Ưu tiên không gian",
        description:
          "Hình ảnh tràn khung và khoảng cách biên tập truyền tải cảm giác của nhà hàng trước phần chi tiết.",
        icon: "layout",
      },
      {
        title: "Tập trung đặt bàn",
        description:
          "CTA đặt bàn luôn hiện diện nhưng không làm gián đoạn trải nghiệm khám phá.",
        icon: "calendar",
      },
    ],
    gallery: [
      {
        src: "/previews/huong-vi-viet-hero.png",
        label: "01 / Mở đầu",
        caption: "Màn hình đầu tiên tạo ấn tượng ấm áp và giàu tính điện ảnh.",
      },
      {
        src: "/previews/huong-vi-viet-menu.png",
        label: "02 / Thực đơn",
        caption:
          "Thực đơn cân bằng giữa sức hấp dẫn của món ăn và khả năng đọc nhanh.",
      },
      {
        src: "/previews/huong-vi-viet-reservation.png",
        label: "03 / Đặt bàn",
        caption:
          "Luồng đặt bàn trực tiếp, nhẹ nhàng và dễ hoàn tất trên mobile.",
      },
    ],
    result:
      "Một trải nghiệm nhà hàng hoàn chỉnh, giúp thương hiệu trở nên hữu hình hơn trên môi trường số, đồng thời tạo lối đi rõ ràng hơn từ khám phá thực đơn đến đặt bàn.",
    technologies: [
      { label: "Frontend", items: ["React", "TypeScript", "Tailwind CSS"] },
      {
        label: "Trải nghiệm",
        items: ["Responsive UI", "Motion design", "Content architecture"],
      },
    ],
  },
  "auralis-x1": {
    name: "Auralis X1",
    category: "Landing page sản phẩm 3D",
    role: "Creative Developer · Frontend Developer",
    description:
      "Câu chuyện sản phẩm nhập vai cho một mẫu tai nghe cao cấp, khiến âm thanh trở nên hữu hình bằng chiều sâu, chuyển động và những chi tiết sản phẩm có chủ đích.",
    overview: {
      type: "Dự án cá nhân",
      year: "2026",
      duration: "2 ngày",
      team: "Dự án cá nhân",
      goal: "Khiến hiệu năng sản phẩm trở nên dễ hình dung và đáng nhớ.",
    },
    problem:
      "Phần cứng cao cấp thường được trình bày qua những bảng thông số tĩnh. Cách tiếp cận đó giải thích sản phẩm có gì, nhưng khó truyền tải cảm giác sử dụng hoặc lý do thiết kế ấy đáng được chú ý.",
    problemHighlight: "Biến thông số thành cảm giác.",
    solution:
      "Auralis X1 dùng landing page điện ảnh để kể câu chuyện theo từng chương: hé lộ hình dáng, giải thích các chế độ nghe và kết thúc bằng lời mời khám phá rõ ràng. Chuyển động hỗ trợ mạch kể, còn giao diện vẫn giữ sự tĩnh lặng cần thiết.",
    solutionHighlight:
      "Trang sản phẩm có sức hiện diện như một đoạn phim ra mắt.",
    process: [
      {
        label: "01",
        title: "Ý tưởng",
        description:
          "Định hình ngôn ngữ thị giác từ tương phản đêm, độ chính xác và cảm giác âm thanh được kiểm soát.",
      },
      {
        label: "02",
        title: "Storyboard",
        description:
          "Lập bản đồ các khoảnh khắc cuộn để mỗi chuyển cảnh giới thiệu một chi tiết hoặc lợi ích.",
      },
      {
        label: "03",
        title: "Prototype",
        description:
          "Kiểm tra crop ảnh, cỡ chữ và timing tương tác trên desktop lẫn thiết bị cảm ứng.",
      },
      {
        label: "04",
        title: "Phát triển",
        description:
          "Xây dựng component linh hoạt cho hero, chế độ nghe, chi tiết và các điểm chuyển đổi.",
      },
    ],
    features: [
      {
        title: "Màn ra mắt điện ảnh",
        description:
          "Phần mở đầu có nhịp điệu tạo sự tập trung và cho sản phẩm một khoảnh khắc xuất hiện rõ nét.",
        icon: "headphones",
      },
      {
        title: "Chế độ nghe",
        description:
          "Các tính năng kỹ thuật được giải thích dễ hiểu hơn thông qua ngữ cảnh và so sánh.",
        icon: "sparkles",
      },
      {
        title: "Chi tiết sản phẩm",
        description:
          "Góc nhìn cận cảnh và nội dung cô đọng đưa người xem từ cảm xúc đến cân nhắc có cơ sở.",
        icon: "layout",
      },
    ],
    gallery: [
      {
        src: "/previews/auralis-x1-hero.png",
        label: "01 / Hero",
        caption: "Màn mở đầu có kiểm soát để sản phẩm chiếm trọn sự chú ý.",
      },
      {
        src: "/previews/auralis-x1-listening-modes.png",
        label: "02 / Chế độ nghe",
        caption:
          "Các chế độ nghe được trình bày như trải nghiệm thay vì danh sách thông số.",
      },
      {
        src: "/previews/auralis-x1-detail.png",
        label: "03 / Chi tiết",
        caption:
          "Vật liệu, đường nét và kỹ thuật được đưa đến gần người xem hơn.",
      },
    ],
    result:
      "Một câu chuyện sản phẩm cao cấp giúp người xem dễ hình dung trải nghiệm nghe trừu tượng, đồng thời vẫn đủ rõ ràng để hỗ trợ quá trình khám phá sản phẩm thực tế.",
    technologies: [
      { label: "Frontend", items: ["React", "TypeScript", "Tailwind CSS"] },
      {
        label: "Tương tác",
        items: ["Framer Motion", "Responsive animation", "Visual storytelling"],
      },
    ],
  },
  "flood-rescue-platform": {
    name: "Flood Rescue Platform",
    category: "Nền tảng điều phối cứu hộ",
    role: "UX/UI Designer · Fullstack Developer",
    description:
      "Giao diện điều phối yêu cầu cứu hộ khẩn cấp, biến những thông tin rời rạc và cấp bách thành một bức tranh vận hành dễ hiểu hơn.",
    overview: {
      type: "Dự án nhóm",
      year: "2026",
      duration: "6 tuần",
      team: "Nhóm cộng tác",
      goal: "Giúp đội cứu hộ nhìn thấy, ưu tiên và xử lý yêu cầu khẩn cấp.",
    },
    problem:
      "Trong thiên tai, yêu cầu cứu hộ đến từ nhiều kênh và có mức độ chi tiết khác nhau. Khi vị trí, mức độ khẩn cấp và trạng thái khó đọc trong nháy mắt, việc điều phối sẽ chậm lại đúng vào thời điểm mỗi phút đều quan trọng.",
    problemHighlight: "Khiến mức độ khẩn cấp trở nên dễ nhận biết.",
    solution:
      "Nền tảng tập trung yêu cầu cứu hộ, cập nhật trạng thái và bối cảnh vận hành trong một workspace hướng theo nhiệm vụ. Trạng thái ưu tiên rõ ràng và thông tin có cấu trúc giúp đội ngũ biết việc nào cần chú ý, việc nào đang xử lý và việc nào đã hoàn tất.",
    solutionHighlight: "Một bức tranh chung cho tình huống luôn thay đổi.",
    process: [
      {
        label: "01",
        title: "Thấu hiểu",
        description:
          "Xác định con người, ràng buộc và khoảng trống thông tin trong công việc phản ứng khẩn cấp.",
      },
      {
        label: "02",
        title: "Ưu tiên",
        description:
          "Tách tín hiệu khẩn cấp khỏi thông tin bổ trợ để đội ngũ định hướng nhanh hơn.",
      },
      {
        label: "03",
        title: "Prototype",
        description:
          "Khám phá các pattern dashboard, request và trạng thái với trọng tâm là khả năng quét thông tin.",
      },
      {
        label: "04",
        title: "Kiểm chứng",
        description:
          "Tinh chỉnh responsive layout và trạng thái tương tác quanh những hành động quan trọng nhất.",
      },
    ],
    features: [
      {
        title: "Phân loại yêu cầu",
        description:
          "Mức độ khẩn cấp, vị trí và trạng thái xuất hiện cùng nhau để ưu tiên ca mới nhanh hơn.",
        icon: "shield",
      },
      {
        title: "Tổng quan cứu hộ",
        description:
          "Dashboard giúp đội ngũ nắm được hoạt động mà không cần mở từng yêu cầu.",
        icon: "map",
      },
      {
        title: "Cập nhật có cấu trúc",
        description:
          "Chi tiết ca thống nhất tạo ra bàn giao đáng tin cậy giữa các thành viên và đội nhóm.",
        icon: "database",
      },
    ],
    gallery: [
      {
        src: "/previews/flood-rescue-1.png",
        label: "01 / Tổng quan",
        caption: "Màn tổng quan tạo điểm bắt đầu dễ đọc cho đội phản ứng.",
      },
      {
        src: "/previews/flood-rescue-2.png",
        label: "02 / Yêu cầu",
        caption:
          "Chi tiết yêu cầu đặt mức độ khẩn cấp cạnh bối cảnh cần thiết.",
      },
      {
        src: "/previews/flood-rescue-3.png",
        label: "03 / Trạng thái",
        caption:
          "Thay đổi trạng thái rõ ràng giúp theo dõi tiến độ trong cả đội.",
      },
    ],
    result:
      "Một nền tảng phản ứng tập trung, đưa thông tin khẩn cấp về đúng cấu trúc và giúp người dùng đi từ yêu cầu đến hành động phối hợp với ít mơ hồ hơn.",
    technologies: [
      { label: "Frontend", items: ["React", "TypeScript", "Tailwind CSS"] },
      {
        label: "Tư duy sản phẩm",
        items: ["Dashboard UX", "Information hierarchy", "Responsive systems"],
      },
    ],
  },
  "petcare-platform": {
    name: "PetCare Platform",
    category: "Ứng dụng web full-stack",
    role: "Team Leader · Full-stack Developer",
    description:
      "Hệ sinh thái chăm sóc thú cưng kết nối hồ sơ, lịch chăm sóc, dịch vụ, mua sắm và tư vấn trong một không gian đáng tin cậy.",
    overview: {
      type: "Dự án nhóm",
      year: "2025",
      duration: "3 tháng",
      team: "4 thành viên",
      goal: "Giúp việc chăm sóc thú cưng hằng ngày dễ tổ chức và dễ hành động hơn.",
    },
    problem:
      "Việc chăm sóc thú cưng thường bị phân tán giữa nhiều dịch vụ và ghi chú cá nhân. Người nuôi phải chuyển qua lại để quản lý hồ sơ, nhớ lịch sức khỏe, tìm sản phẩm và nhận tư vấn, khiến routine hằng ngày trở nên rời rạc hơn cần thiết.",
    problemHighlight: "Đưa toàn bộ routine về cùng một nơi.",
    solution:
      "PetCare được định hình như một hệ sinh thái cho những khoảnh khắc thường ngày quanh thú cưng. Hồ sơ tạo nền tảng cá nhân, công cụ sức khỏe hỗ trợ tính liên tục, commerce đáp ứng nhu cầu thực tế và tư vấn AI giúp người nuôi tự tin hơn với bước tiếp theo.",
    solutionHighlight:
      "Một không gian bình tĩnh hơn cho toàn bộ hành trình chăm sóc.",
    process: [
      {
        label: "01",
        title: "Nghiên cứu",
        description:
          "Lập bản đồ hành trình chăm sóc phân mảnh và xác định những lúc người nuôi cần sự chắc chắn nhất.",
      },
      {
        label: "02",
        title: "UX flow",
        description:
          "Kết nối hồ sơ, sức khỏe, dịch vụ và commerce trong một cấu trúc có thể mở rộng.",
      },
      {
        label: "03",
        title: "UI design",
        description:
          "Tạo dashboard thân thiện, giữ thông tin thực tế nhưng vẫn dễ tiếp cận.",
      },
      {
        label: "04",
        title: "Phát triển",
        description:
          "Dẫn dắt triển khai full-stack từ giao diện, API, dữ liệu đến tư vấn AI.",
      },
    ],
    features: [
      {
        title: "Quản lý thú cưng",
        description:
          "Hồ sơ cá nhân giữ thông tin, routine và bối cảnh chăm sóc tại một nơi.",
        icon: "layout",
      },
      {
        title: "Theo dõi sức khỏe",
        description:
          "Nhắc lịch và hồ sơ giúp các mốc chăm sóc quan trọng luôn được nhìn thấy.",
        icon: "calendar",
      },
      {
        title: "Đặt dịch vụ",
        description:
          "Một lối đi trực tiếp hơn kết nối người nuôi với dịch vụ thú cưng cần thiết.",
        icon: "sparkles",
      },
      {
        title: "Tư vấn thông minh",
        description:
          "Tư vấn AI biến câu hỏi thành những bước tiếp theo hữu ích cho việc chăm sóc hằng ngày.",
        icon: "shield",
      },
    ],
    gallery: [
      {
        src: "/previews/petcare-1.png",
        label: "01 / Dashboard",
        caption:
          "Dashboard biến routine chăm sóc liên tục thành một góc nhìn hằng ngày nhẹ nhàng hơn.",
      },
      {
        src: "/previews/petcare-2.png",
        label: "02 / Dịch vụ",
        caption:
          "Khám phá dịch vụ và hành động chăm sóc được đặt gần bối cảnh của thú cưng.",
      },
      {
        src: "/previews/petcare-3.png",
        label: "03 / Commerce",
        caption:
          "Hành trình mua sắm đáp ứng nhu cầu thực tế mà không làm mất đi cảm giác hệ sinh thái.",
      },
    ],
    result:
      "Một concept sản phẩm full-stack có nền tảng mở rộng, đưa quản lý thú cưng, routine chăm sóc, dịch vụ và mua sắm vào cùng một trải nghiệm nhất quán hơn.",
    technologies: [
      { label: "Frontend", items: ["React", "TypeScript", "Tailwind CSS"] },
      { label: "Backend", items: ["Node.js", "Express", "Prisma", "MySQL"] },
      { label: "AI", items: ["Gemini API"] },
    ],
  },
};

export const caseStudies: CaseStudy[] = englishCaseStudies.map((study) => ({
  ...study,
  translations: { vi: vietnameseCaseStudies[study.slug] },
}));

export function resolveCaseStudy(
  study: CaseStudy,
  language: "vi" | "en",
): CaseStudyContent {
  return language === "vi" ? { ...study, ...study.translations.vi } : study;
}

export function getCaseStudy(slug: string | undefined) {
  return caseStudies.find((study) => study.slug === slug);
}
