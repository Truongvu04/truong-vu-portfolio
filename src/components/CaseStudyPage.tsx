import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Check,
  Database,
  ExternalLink,
  Headphones,
  LayoutDashboard,
  MapPinned,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Utensils,
  type LucideIcon,
} from "lucide-react";
import type {
  CaseStudy,
  CaseStudyContent,
  CaseStudyFeature,
  CaseStudyIcon,
} from "../data/caseStudies";
import { resolveCaseStudy } from "../data/caseStudies";
import type { Language } from "../content";

const CaseStudyLanguageContext = createContext<{
  language: Language;
}>({ language: "en" });

const useCaseStudyLanguage = () => useContext(CaseStudyLanguageContext);

const caseStudyUi = {
  en: {
    backToProjects: "Back to projects",
    viewWebsite: "View live website",
    explore: "Explore case study",
    overview: "Project overview",
    overviewTitle: "The brief, in context.",
    problemEyebrow: "The challenge",
    problemTitle: "The problem",
    solutionEyebrow: "The response",
    solutionTitle: "The solution",
    processEyebrow: "How it came together",
    processTitle: "From question to product.",
    featuresEyebrow: "What matters",
    featuresTitle: "Key features, with purpose.",
    galleryEyebrow: "Selected screens",
    galleryTitle: "The interface in motion.",
    techEyebrow: "Built with",
    techTitle: "Technology as a tool.",
    resultEyebrow: "The result",
    resultTitle: "A product with a point of view.",
    resultNote: "No inflated metrics. Just the value the product was designed to create.",
    nextProject: "Next project?",
    ctaTitle: "Interested in working together",
    ctaBody: "Have a product, interface or idea that deserves a clearer digital experience?",
    contact: "Contact me",
    backAll: "Back to all projects",
    loading: "Loading case study",
    projectType: "Project type",
    year: "Year",
    role: "Role",
    duration: "Duration",
    team: "Team",
    goal: "Goal",
  },
  vi: {
    backToProjects: "Quay lại dự án",
    viewWebsite: "Xem website",
    explore: "Khám phá case study",
    overview: "Tổng quan dự án",
    overviewTitle: "Bối cảnh của bài toán.",
    problemEyebrow: "Thách thức",
    problemTitle: "Vấn đề",
    solutionEyebrow: "Cách giải quyết",
    solutionTitle: "Giải pháp",
    processEyebrow: "Cách dự án hình thành",
    processTitle: "Từ câu hỏi đến sản phẩm.",
    featuresEyebrow: "Điểm quan trọng",
    featuresTitle: "Tính năng với mục đích rõ ràng.",
    galleryEyebrow: "Một số màn hình",
    galleryTitle: "Giao diện trong chuyển động.",
    techEyebrow: "Công nghệ sử dụng",
    techTitle: "Công nghệ là công cụ.",
    resultEyebrow: "Kết quả",
    resultTitle: "Một sản phẩm có quan điểm riêng.",
    resultNote: "Không bịa số liệu. Chỉ tập trung vào giá trị sản phẩm được thiết kế để tạo ra.",
    nextProject: "Dự án tiếp theo?",
    ctaTitle: "Bạn muốn cùng tôi xây dựng sản phẩm",
    ctaBody: "Bạn có sản phẩm, giao diện hoặc ý tưởng cần một trải nghiệm số rõ ràng và chuyên nghiệp hơn?",
    contact: "Liên hệ",
    backAll: "Quay lại tất cả dự án",
    loading: "Đang tải case study",
    projectType: "Loại dự án",
    year: "Năm",
    role: "Vai trò",
    duration: "Thời gian",
    team: "Đội ngũ",
    goal: "Mục tiêu",
  },
} as const;

const icons: Record<CaseStudyIcon, LucideIcon> = {
  layout: LayoutDashboard,
  sparkles: Sparkles,
  calendar: CalendarDays,
  "shopping-bag": ShoppingBag,
  shield: ShieldCheck,
  map: MapPinned,
  headphones: Headphones,
  utensils: Utensils,
  database: Database,
};

const ease = [0.22, 1, 0.36, 1] as const;

function CaseScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.25 });
  return <motion.div className="scroll-progress scroll-progress-light" style={{ scaleX }} aria-hidden="true" />;
}

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

function SectionIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <div className="case-section-intro">
      <span className="case-eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {children}
    </div>
  );
}

export function CaseStudyHero({ data }: { data: CaseStudyContent }) {
  const { language } = useCaseStudyLanguage();
  const ui = caseStudyUi[language];
  return (
    <section className="case-hero">
      <div className="case-shell case-hero-grid">
        <div className="case-hero-copy">
          <Reveal className="case-topbar">
            <a className="case-back-link" href="/#projects">
              <ArrowLeft size={16} /> {ui.backToProjects}
            </a>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="case-hero-kicker">
              <span className="case-status-dot" style={{ backgroundColor: data.accent }} />
              <span>{data.category}</span>
              <span className="case-slash">/</span>
              <span>{data.overview.year}</span>
            </div>
            <h1>{data.name}</h1>
            <p className="case-hero-role">{data.role}</p>
            <p className="case-hero-description">{data.description}</p>
            <div className="case-hero-actions">
              {data.website && (
                <a className="case-primary-button" href={data.website} target="_blank" rel="noopener noreferrer">
                  {ui.viewWebsite} <ArrowUpRight size={17} />
                </a>
              )}
              <a className="case-text-button" href="#overview">{ui.explore} <ArrowUpRight size={16} /></a>
            </div>
          </Reveal>
        </div>
        <Reveal className="case-hero-visual" delay={0.18}>
          <div className="case-hero-image-wrap" style={{ borderColor: `${data.accent}55` }}>
            <div className="case-image-glow" style={{ background: data.accent }} />
            <img src={data.heroImage} alt={`${data.name} interface preview`} />
            <span className="case-image-index">01 / 03</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ProjectOverview({ data }: { data: CaseStudyContent }) {
  const { language } = useCaseStudyLanguage();
  const ui = caseStudyUi[language];
  const items = [
    [ui.projectType, data.overview.type],
    [ui.year, data.overview.year],
    [ui.role, data.role],
    [ui.duration, data.overview.duration],
    [ui.team, data.overview.team],
    [ui.goal, data.overview.goal],
  ];
  return (
    <section className="case-section case-overview-section" id="overview">
      <div className="case-shell">
        <Reveal><SectionIntro eyebrow={ui.overview} title={ui.overviewTitle} /></Reveal>
        <div className="case-overview-grid">
          {items.map(([label, value], index) => (
            <Reveal key={label} delay={index * 0.04}>
              <div className="case-overview-card">
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function NarrativeSection({ data, kind, number, title, text, highlight }: { data: CaseStudyContent; kind: "problem" | "solution"; number: string; title: string; text: string; highlight: string }) {
  const { language } = useCaseStudyLanguage();
  const ui = caseStudyUi[language];
  return (
    <section className={`case-section case-narrative case-${kind}`}>
      <div className="case-shell case-narrative-grid">
        <Reveal><span className="case-section-number">{number}</span></Reveal>
        <Reveal delay={0.06}>
          <SectionIntro eyebrow={kind === "problem" ? ui.problemEyebrow : ui.solutionEyebrow} title={title}>
            <p className="case-lead-copy">{text}</p>
          </SectionIntro>
          <p className="case-highlight" style={{ color: data.accent }}><span>↳</span> {highlight}</p>
        </Reveal>
      </div>
    </section>
  );
}

export function ProblemSection({ data }: { data: CaseStudyContent }) {
  const { language } = useCaseStudyLanguage();
  return <NarrativeSection data={data} kind="problem" number="01" title={caseStudyUi[language].problemTitle} text={data.problem} highlight={data.problemHighlight} />;
}

export function SolutionSection({ data }: { data: CaseStudyContent }) {
  const { language } = useCaseStudyLanguage();
  return <NarrativeSection data={data} kind="solution" number="02" title={caseStudyUi[language].solutionTitle} text={data.solution} highlight={data.solutionHighlight} />;
}

export function ProcessTimeline({ data }: { data: CaseStudyContent }) {
  const { language } = useCaseStudyLanguage();
  const ui = caseStudyUi[language];
  return (
    <section className="case-section case-process-section">
      <div className="case-shell">
        <Reveal><SectionIntro eyebrow={ui.processEyebrow} title={ui.processTitle} /></Reveal>
        <div className="case-process-grid">
          {data.process.map((step, index) => (
            <Reveal key={step.label} delay={index * 0.06}>
              <article className="case-process-step">
                <div className="case-process-topline"><span>{step.label}</span><span className="case-process-line" /></div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeatureGrid({ features }: { features: CaseStudyFeature[] }) {
  const { language } = useCaseStudyLanguage();
  const ui = caseStudyUi[language];
  return (
    <section className="case-section case-features-section">
      <div className="case-shell">
        <Reveal><SectionIntro eyebrow={ui.featuresEyebrow} title={ui.featuresTitle} /></Reveal>
        <div className="case-feature-grid">
          {features.map((feature, index) => {
            const Icon = icons[feature.icon];
            return (
              <Reveal key={feature.title} delay={index * 0.06}>
                <motion.article className="case-feature-card" whileHover={{ y: -6 }} transition={{ duration: 0.25 }}>
                  <div className="case-feature-icon"><Icon size={20} strokeWidth={1.5} /></div>
                  <span className="case-feature-index">0{index + 1}</span>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Gallery({ data }: { data: CaseStudyContent }) {
  const { language } = useCaseStudyLanguage();
  const ui = caseStudyUi[language];
  return (
    <section className="case-section case-gallery-section">
      <div className="case-shell">
        <Reveal><SectionIntro eyebrow={ui.galleryEyebrow} title={ui.galleryTitle} /></Reveal>
        <div className="case-gallery-grid">
          {data.gallery.map((item, index) => (
            <Reveal key={item.src} delay={index * 0.08} className={index === 0 ? "case-gallery-featured" : ""}>
              <figure className="case-gallery-item">
                <div className="case-gallery-image"><img src={item.src} alt={`${data.name} ${item.label}`} loading="lazy" /></div>
                <figcaption><div><span>{item.label}</span><p>{item.caption}</p></div><ArrowUpRight size={18} /></figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TechStack({ groups }: { groups: CaseStudy["technologies"] }) {
  const { language } = useCaseStudyLanguage();
  const ui = caseStudyUi[language];
  return (
    <section className="case-section case-tech-section">
      <div className="case-shell case-tech-grid">
        <Reveal><SectionIntro eyebrow={ui.techEyebrow} title={ui.techTitle} /></Reveal>
        <Reveal className="case-tech-list" delay={0.1}>
          {groups.map((group) => (
            <div className="case-tech-row" key={group.label}>
              <span>{group.label}</span>
              <div>{group.items.map((item) => <span className="case-tech-badge" key={item}>{item}</span>)}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function ResultSection({ data }: { data: CaseStudyContent }) {
  const { language } = useCaseStudyLanguage();
  const ui = caseStudyUi[language];
  return (
    <section className="case-section case-result-section">
      <div className="case-shell case-result-grid">
        <Reveal><span className="case-section-number">05</span></Reveal>
        <Reveal delay={0.08}>
          <SectionIntro eyebrow={ui.resultEyebrow} title={ui.resultTitle}>
            <p className="case-result-copy">{data.result}</p>
          </SectionIntro>
          <div className="case-result-note"><Check size={16} /> {ui.resultNote}</div>
        </Reveal>
      </div>
    </section>
  );
}

export function ContactCTA({ data }: { data: CaseStudyContent }) {
  const { language } = useCaseStudyLanguage();
  const ui = caseStudyUi[language];
  return (
    <section className="case-cta-section">
      <div className="case-shell case-cta-inner">
        <Reveal>
          <span className="case-eyebrow">{ui.nextProject}</span>
          <h2>{ui.ctaTitle}<span style={{ color: data.accent }}>?</span></h2>
          <p>{ui.ctaBody}</p>
          <div className="case-cta-actions">
            {data.website && <a className="case-primary-button" href={data.website} target="_blank" rel="noopener noreferrer">{ui.viewWebsite} <ExternalLink size={16} /></a>}
            <a className="case-outline-button" href="/#contact">{ui.contact} <ArrowUpRight size={16} /></a>
          </div>
        </Reveal>
        <a href="/#projects" className="case-cta-back">{ui.backAll} <ArrowUpRight size={16} /></a>
      </div>
    </section>
  );
}

export default function CaseStudyPage({
  data,
  language,
}: {
  data: CaseStudy;
  language: Language;
}) {
  const [loading, setLoading] = useState(true);
  const copy = resolveCaseStudy(data, language);
  const ui = caseStudyUi[language];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    const timer = window.setTimeout(() => setLoading(false), 520);
    return () => window.clearTimeout(timer);
  }, [data.slug]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = `${copy.name} — ${language === "vi" ? "Chi tiết dự án" : "Case Study"}`;
  }, [copy.name, language]);

  return (
    <CaseStudyLanguageContext.Provider value={{ language }}>
      <main className="case-study-page" style={{ "--case-accent": copy.accent } as React.CSSProperties}>
        {loading && <motion.div className="case-loader" initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 0.35, delay: 0.25 }}><span>{ui.loading}</span><i /></motion.div>}
        <CaseScrollProgress />
        <div className="case-study-grain" aria-hidden="true" />
        <CaseStudyHero data={copy} />
        <ProjectOverview data={copy} />
        <ProblemSection data={copy} />
        <SolutionSection data={copy} />
        <ProcessTimeline data={copy} />
        <FeatureGrid features={copy.features} />
        <Gallery data={copy} />
        <ResultSection data={copy} />
        <TechStack groups={copy.technologies} />
        <ContactCTA data={copy} />
      </main>
    </CaseStudyLanguageContext.Provider>
  );
}
