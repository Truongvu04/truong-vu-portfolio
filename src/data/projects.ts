import type { Language } from "../content";

type LocalizedText = Record<Language, string>;

export type PortfolioProject = {
  name: string;
  category: LocalizedText;
  description: LocalizedText;
  /** Local paths or full image URLs. The first three appear on the card; all open in the gallery. */
  images: [string, ...string[]];
  /** Omit this field until the website has been deployed. */
  liveUrl?: string;
};

export const projects: PortfolioProject[] = [
  {
    name: "Hương Vị Việt",
    category: { vi: "Website nhà hàng", en: "Restaurant website" },
    description: {
      vi: "Thiết kế website giới thiệu nhà hàng Việt với trải nghiệm trực quan, giúp khách hàng dễ dàng khám phá thực đơn, không gian và thông tin đặt bàn.",
      en: "A restaurant website designed to showcase Vietnamese cuisine through an intuitive experience, allowing customers to explore menus, atmosphere, and reservation information.",
    },
    images: [
      "/previews/huong-vi-viet-menu.png",
      "/previews/huong-vi-viet-reservation.png",
      "/previews/huong-vi-viet-hero.png",
    ],
    liveUrl: "https://huong-vi-viet.vercel.app",
  },
  {
    name: "Auralis X1",
    category: { vi: "Landing page 3D", en: "3D product landing page" },
    description: {
      vi: "Xây dựng trải nghiệm giới thiệu sản phẩm tai nghe cao cấp với phong cách hiện đại, giúp người dùng khám phá thiết kế và tính năng sản phẩm thông qua tương tác trực quan.",
      en: "A premium headphone product experience with a modern visual approach, allowing users to explore the design and features through interactive presentation.",
    },
    images: [
      "/previews/auralis-x1-detail.png",
      "/previews/auralis-x1-listening-modes.png",
      "/previews/auralis-x1-hero.png",
    ],
    liveUrl: "https://headphone-azure.vercel.app",
  },
  {
    name: "Flood Rescue Platform",
    category: { vi: "Dự án nhóm · 2026", en: "Team project · 2026" },
    description: {
      vi: "Nền tảng hỗ trợ cứu hộ trong tình huống khẩn cấp, giúp kết nối yêu cầu cứu trợ, quản lý thông tin và hỗ trợ quá trình xử lý các tình huống thiên tai hiệu quả hơn.",
      en: "An emergency rescue support platform that connects rescue requests, organizes information, and helps improve disaster response management.",
    },
    images: [
      "/previews/flood-rescue-1.png",
      "/previews/flood-rescue-2.png",
      "/previews/flood-rescue-3.png",
    ],
    liveUrl: "https://frrcp-rosy.vercel.app",
  },
  {
    name: "PetCare Platform",
    category: { vi: "Dự án nhóm · 2025", en: "Team project · 2025" },
    description: {
      vi: "Xây dựng nền tảng chăm sóc thú cưng toàn diện, kết nối dịch vụ chăm sóc, mua sắm sản phẩm và hỗ trợ tư vấn nhằm mang đến trải nghiệm tiện lợi cho người nuôi thú cưng.",
      en: "A comprehensive pet care platform that connects pet services, product shopping, and consultation support to provide a more convenient experience for pet owners.",
    },
    images: [
      "/previews/petcare-3.png",
      "/previews/petcare-2.png",
      "/previews/petcare-1.png",
    ],
    liveUrl: "https://pet-care-mu-sable.vercel.app",
  },
];
