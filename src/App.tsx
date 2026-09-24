import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Expand,
  Github,
  X,
} from "lucide-react";
import { content, type Language } from "./content";
import { projects, type PortfolioProject } from "./data/projects";
import { caseStudies, getCaseStudy } from "./data/caseStudies";
import CaseStudyPage from "./components/CaseStudyPage";

const portrait = "/images/hero-reference-3d.png";
const closedPortrait = "/images/hero-blink-closed-3d.png";
const contactEmail = "vutruong7112004@gmail.com";

const aboutImages = {
  moon: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png",
  object:
    "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png",
  lego: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png",
  group:
    "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png",
};

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (language: Language) => void;
}>({ language: "vi", setLanguage: () => {} });
const useLanguage = () => useContext(LanguageContext);
const useCopy = () => content[useLanguage().language];

function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ScrollProgress({ tone = "light" }: { tone?: "light" | "dark" }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.25 });
  return <motion.div className={`scroll-progress scroll-progress-${tone}`} style={{ scaleX }} aria-hidden="true" />;
}

function Magnet({
  children,
  areaRef,
}: {
  children: ReactNode;
  areaRef: RefObject<HTMLElement | null>;
}) {
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const x = useSpring(targetX, { stiffness: 110, damping: 22, mass: 0.8 });
  const y = useSpring(targetY, { stiffness: 110, damping: 22, mass: 0.8 });
  useEffect(() => {
    const area = areaRef.current;
    if (!area) return;
    const reset = () => {
      targetX.set(0);
      targetY.set(0);
    };
    const move = (event: MouseEvent) => {
      const rect = area.getBoundingClientRect();
      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      ) {
        reset();
        return;
      }
      const horizontal =
        (event.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const vertical =
        (event.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      targetX.set(Math.max(-1, Math.min(1, horizontal)) * 90);
      targetY.set(Math.max(-1, Math.min(1, vertical)) * 55);
    };
    window.addEventListener("mousemove", move, {
      capture: true,
      passive: true,
    });
    window.addEventListener("blur", reset);
    return () => {
      window.removeEventListener("mousemove", move, true);
      window.removeEventListener("blur", reset);
    };
  }, [areaRef, targetX, targetY]);
  return (
    <motion.div style={{ x, y, willChange: "transform" }}>
      {children}
    </motion.div>
  );
}

function BlinkingPortrait({ alt }: { alt: string }) {
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    let blinkTimer: number;
    let resetTimer: number;
    const schedule = (delay: number) => {
      blinkTimer = window.setTimeout(blink, delay);
    };
    const blink = () => {
      if (document.hidden) {
        schedule(2500);
        return;
      }
      setIsBlinking(true);
      resetTimer = window.setTimeout(() => {
        setIsBlinking(false);
        schedule(Math.random() < 0.18 ? 270 : 2800 + Math.random() * 3200);
      }, 220);
    };
    schedule(1800 + Math.random() * 2200);
    return () => {
      window.clearTimeout(blinkTimer);
      window.clearTimeout(resetTimer);
    };
  }, []);

  return (
    <div className="hero-portrait-frame">
      <img
        src={portrait}
        alt={alt}
        className="block w-full object-contain"
        fetchPriority="high"
      />
      <img
        src={closedPortrait}
        alt=""
        aria-hidden="true"
        className={`hero-blink-overlay block w-full object-contain${isBlinking ? " is-blinking" : ""}`}
      />
    </div>
  );
}

function ContactButton() {
  const t = useCopy();
  return (
    <a className="contact-button" href={`mailto:${contactEmail}`}>
      {t.contactButton}{" "}
      <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.8} />
    </a>
  );
}

function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();
  return (
    <div className="language-switch" aria-label="Language / Ngôn ngữ">
      <button
        type="button"
        aria-pressed={language === "vi"}
        onClick={() => setLanguage("vi")}
      >
        VI
      </button>
      <span aria-hidden="true">/</span>
      <button
        type="button"
        aria-pressed={language === "en"}
        onClick={() => setLanguage("en")}
      >
        EN
      </button>
    </div>
  );
}

function HeroSection() {
  const t = useCopy();
  const { language } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const portraitY = useTransform(scrollY, [0, 700], [0, 90]);
  const headingY = useTransform(scrollY, [0, 700], [0, -42]);
  const headingOpacity = useTransform(scrollY, [0, 500], [1, 0.72]);
  const navTargets = ["#about", "#price", "#projects", "#contact"];
  return (
    <section
      ref={heroRef}
      id="home"
      className="hero-section relative flex h-screen min-h-[560px] flex-col overflow-x-clip bg-ink text-ice"
    >
      <FadeIn y={-20} className="relative z-20">
        <nav aria-label="Main navigation" className="site-nav">
          <div className="site-nav-links">
            {t.nav.map((label, index) => (
              <a key={navTargets[index]} href={navTargets[index]}>
                {label}
              </a>
            ))}
          </div>
          <LanguageSwitch />
        </nav>
      </FadeIn>
      <motion.div className="relative z-0 mt-6 w-full overflow-hidden px-[1vw] sm:mt-4 md:-mt-5" style={{ y: headingY, opacity: headingOpacity }}>
        <FadeIn delay={0.15} y={40}>
          <h1 className="hero-heading w-full whitespace-nowrap text-center text-[14vw] font-black uppercase leading-none tracking-tight sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]">
            {t.hero.heading}
          </h1>
        </FadeIn>
      </motion.div>
      <div className="hero-portrait-position pointer-events-none absolute left-1/2 top-1/2 z-10 w-[340px] -translate-x-1/2 -translate-y-1/2 sm:bottom-0 sm:top-auto sm:w-[450px] sm:translate-y-0 md:w-[560px] lg:w-[680px]">
        <motion.div style={{ y: portraitY }}>
          <FadeIn delay={0.6} y={30}>
            <div className="pointer-events-auto">
              <Magnet areaRef={heroRef}>
                <BlinkingPortrait alt={t.hero.imageAlt} />
              </Magnet>
            </div>
          </FadeIn>
        </motion.div>
      </div>
      <div className="relative z-20 mt-auto flex items-end justify-between gap-2 px-6 pb-7 sm:gap-6 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn delay={0.35} y={20}>
          <p className="hero-summary max-w-[130px] text-[clamp(0.75rem,1.4vw,1.5rem)] font-light uppercase leading-snug tracking-wide sm:max-w-[220px] md:max-w-[260px]">
            {t.hero.summary}
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <div className="hero-action-buttons">
            <a
              className="github-button"
              href="https://github.com/Truongvu04"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub — ${language === "vi" ? "Võ Phạm Trường Vũ" : "Vo Pham Truong Vu"}`}
            >
              <Github aria-hidden="true" size={18} strokeWidth={1.8} />
              GitHub{" "}
              <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.8} />
            </a>
            <ContactButton />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function WorkHighlights() {
  const t = useCopy();
  const targets = ["#price", "#projects", "#contact"];
  return (
    <section className="work-highlights" aria-label={t.projectsHeading}>
      <div className="highlight-grid">
        {t.highlights.map((item, index) => (
          <FadeIn key={index} delay={index * 0.1}>
            <a href={targets[index]} className="highlight-item">
              <span className="highlight-number">
                {String(index + 1).padStart(2, "0")} / 03
              </span>
              <span className="highlight-title">{item.title}</span>
              <span className="highlight-detail">{item.detail}</span>
              <ArrowUpRight
                aria-hidden="true"
                className="highlight-arrow"
                size={20}
              />
            </a>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function AnimatedCharacter({
  character,
  index,
  total,
  progress,
}: {
  character: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(
    progress,
    [index / total, Math.min(1, (index + 12) / total)],
    [0.2, 1],
  );
  return (
    <span className="relative inline-block whitespace-pre">
      <span className="invisible">{character}</span>
      <motion.span
        aria-hidden="true"
        className="absolute inset-0"
        style={{ opacity }}
      >
        {character}
      </motion.span>
    </span>
  );
}

function AnimatedText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });
  let characterIndex = 0;
  const words = text.split(" ");
  return (
    <p
      ref={ref}
      aria-label={text}
      className="about-paragraph mx-auto max-w-[650px] text-center text-[clamp(1rem,2vw,1.35rem)] font-medium leading-relaxed text-ice"
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {Array.from(word).map((character) => {
            const index = characterIndex++;
            return (
              <AnimatedCharacter
                key={index}
                character={character}
                index={index}
                total={text.length}
                progress={scrollYProgress}
              />
            );
          })}
          {wordIndex < words.length - 1 && (
            <span aria-hidden="true">&nbsp;</span>
          )}
        </span>
      ))}
    </p>
  );
}

function AboutSection() {
  const t = useCopy();
  return (
    <section
      id="about"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink px-5 py-20 sm:px-8 md:px-10"
    >
      <FadeIn
        delay={0.1}
        duration={0.9}
        x={-80}
        y={0}
        className="about-decor left-[1%] top-[4%] w-[120px] sm:left-[2%] sm:w-[160px] md:left-[4%] md:w-[210px]"
      >
        <img src={aboutImages.moon} alt="" loading="lazy" />
      </FadeIn>
      <FadeIn
        delay={0.25}
        duration={0.9}
        x={-80}
        y={0}
        className="about-decor bottom-[8%] left-[3%] w-[100px] sm:left-[6%] sm:w-[140px] md:left-[10%] md:w-[180px]"
      >
        <img src={aboutImages.object} alt="" loading="lazy" />
      </FadeIn>
      <FadeIn
        delay={0.15}
        duration={0.9}
        x={80}
        y={0}
        className="about-decor right-[1%] top-[4%] w-[120px] sm:right-[2%] sm:w-[160px] md:right-[4%] md:w-[210px]"
      >
        <img src={aboutImages.lego} alt="" loading="lazy" />
      </FadeIn>
      <FadeIn
        delay={0.3}
        duration={0.9}
        x={80}
        y={0}
        className="about-decor bottom-[8%] right-[3%] w-[130px] sm:right-[6%] sm:w-[170px] md:right-[10%] md:w-[220px]"
      >
        <img src={aboutImages.group} alt="" loading="lazy" />
      </FadeIn>
      <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn y={40}>
          <h2 className="hero-heading section-heading">{t.aboutHeading}</h2>
        </FadeIn>
        <div className="about-paragraphs">
          <AnimatedText text={t.aboutParagraphs[0]} />
          {t.aboutParagraphs.slice(1).map((paragraph, index) => (
            <FadeIn key={index} delay={0.05 * index}>
              <p className="about-paragraph">{paragraph}</p>
            </FadeIn>
          ))}
        </div>
        <FadeIn className="mt-6 sm:mt-6 md:mt-8">
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}

function ServicesSection() {
  const t = useCopy();
  return (
    <section
      id="price"
      className="relative z-10 rounded-t-[40px] bg-white px-5 py-20 text-ink sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <FadeIn>
        <h2 className="section-heading text-ink">{t.servicesHeading}</h2>
        <p className="services-intro">{t.servicesIntro}</p>
      </FadeIn>
      <div className="mx-auto max-w-5xl">
        {t.services.map((service, index) => (
          <FadeIn
            key={index}
            delay={index * 0.1}
            className="border-b border-ink/15 first:border-t"
          >
            <div className="grid grid-cols-[minmax(85px,0.32fr)_1fr] gap-4 py-8 sm:grid-cols-[minmax(160px,0.38fr)_1fr] sm:gap-8 sm:py-10 md:py-12">
              <span className="text-[clamp(3rem,10vw,140px)] font-black leading-none tracking-tight">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col justify-center gap-2 sm:gap-4">
                <h3 className="text-[clamp(1rem,2.2vw,2.1rem)] font-medium uppercase leading-tight">
                  {service.name}
                </h3>
                <p className="max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] font-light leading-relaxed opacity-60">
                  {service.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
        <FadeIn>
          <p className="services-note">{t.servicesNote}</p>
        </FadeIn>
      </div>
    </section>
  );
}

function CaseStudyButton({ project }: { project: PortfolioProject }) {
  const t = useCopy();
  const slug =
    caseStudies.find((item) => item.website && item.website === project.liveUrl)?.slug ??
    caseStudies.find((item) => item.name.toLowerCase() === project.name.toLowerCase())?.slug;

  if (!slug) return null;

  return (
    <a
      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border-2 border-ice/50 px-5 py-3 text-xs font-medium uppercase tracking-[0.1em] text-ice transition-all duration-300 hover:-translate-y-0.5 hover:bg-ice/10 sm:px-7 sm:py-3.5 sm:text-sm"
      href={`/projects/${slug}`}
    >
      {t.liveProject} <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.8} />
    </a>
  );
}

function ProjectImage({
  src,
  project,
  index,
  onOpen,
}: {
  src: string;
  project: PortfolioProject;
  index: number;
  onOpen: () => void;
}) {
  const t = useCopy();
  return (
    <button
      className="project-image-button"
      type="button"
      onClick={onOpen}
      aria-label={`${t.viewImage} ${index + 1}: ${project.name}`}
    >
      <img
        src={src}
        alt={`${project.name} — ${t.viewImage} ${index + 1}`}
        loading="lazy"
      />
      <span className="image-zoom-icon">
        <Expand size={18} aria-hidden="true" />
      </span>
    </button>
  );
}

function ProjectCard({
  project,
  index,
  onOpenImage,
}: {
  project: PortfolioProject;
  index: number;
  onOpenImage: (imageIndex: number) => void;
}) {
  const { language } = useLanguage();
  const card = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: card,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1 - (projects.length - 1 - index) * 0.03],
  );
  const cardImages = [
    project.images[0],
    project.images[1] ?? project.images[0],
    project.images[2] ?? project.images[0],
  ];
  return (
    <div
      ref={card}
      className="project-scroll-space"
      style={{ top: index * 28 }}
    >
      <motion.article className="project-card" style={{ scale }}>
        <div className="mb-5 flex flex-wrap items-center gap-x-6 gap-y-3 sm:mb-7 md:gap-x-10">
          <span className="project-number">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0 flex-1">
            <span className="text-xs font-light uppercase tracking-[0.22em] text-ice/60 sm:text-sm">
              {project.category[language]}
            </span>
            <h3 className="text-[clamp(1.25rem,3vw,3rem)] font-medium uppercase leading-tight text-ice">
              {project.name}
            </h3>
            <p className="project-description">
              {project.description[language]}
            </p>
          </div>
          <CaseStudyButton project={project} />
        </div>
        <div className="project-image-grid">
          <div className="flex min-h-0 flex-col gap-3">
            <ProjectImage
              src={cardImages[0]}
              project={project}
              index={0}
              onOpen={() => onOpenImage(0)}
            />
            <ProjectImage
              src={cardImages[1]}
              project={project}
              index={1}
              onOpen={() => onOpenImage(Math.min(1, project.images.length - 1))}
            />
          </div>
          <ProjectImage
            src={cardImages[2]}
            project={project}
            index={2}
            onOpen={() => onOpenImage(Math.min(2, project.images.length - 1))}
          />
        </div>
      </motion.article>
    </div>
  );
}

function ProjectLightbox({
  project,
  imageIndex,
  onClose,
  onMove,
}: {
  project: PortfolioProject;
  imageIndex: number;
  onClose: () => void;
  onMove: (direction: number) => void;
}) {
  const t = useCopy();
  const closeButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, []);
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onMove(-1);
      if (event.key === "ArrowRight") onMove(1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, onMove]);
  return createPortal(
    <div className="lightbox-backdrop" onMouseDown={onClose}>
      <div
        className="lightbox-panel"
        role="dialog"
        aria-modal="true"
        aria-label={`${t.imageGallery}: ${project.name}`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="lightbox-header">
          <div>
            <span>{t.imageGallery}</span>
            <strong>{project.name}</strong>
          </div>
          <button
            ref={closeButton}
            type="button"
            className="lightbox-close"
            onClick={onClose}
            aria-label={t.closeImage}
          >
            <X size={25} />
          </button>
        </div>
        <div className="lightbox-image-wrap">
          <img
            src={project.images[imageIndex]}
            alt={`${project.name}, ${t.viewImage} ${imageIndex + 1}`}
          />
        </div>
        <div className="lightbox-footer">
          <div className="lightbox-controls">
            <button
              type="button"
              onClick={() => onMove(-1)}
              aria-label={t.previousImage}
            >
              <ArrowLeft size={20} />
            </button>
            <span>
              {imageIndex + 1} / {project.images.length}
            </span>
            <button
              type="button"
              onClick={() => onMove(1)}
              aria-label={t.nextImage}
            >
              <ArrowRight size={20} />
            </button>
          </div>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              {t.liveProject} <ArrowUpRight size={18} />
            </a>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

function ProjectsSection() {
  const t = useCopy();
  const [activeImage, setActiveImage] = useState<{
    projectIndex: number;
    imageIndex: number;
  } | null>(null);
  const closeLightbox = () => setActiveImage(null);
  const moveImage = (direction: number) =>
    setActiveImage(
      (current) =>
        current && {
          ...current,
          imageIndex:
            (current.imageIndex +
              direction +
              projects[current.projectIndex].images.length) %
            projects[current.projectIndex].images.length,
        },
    );
  const activeProject = activeImage ? projects[activeImage.projectIndex] : null;
  return (
    <section
      id="projects"
      className="relative z-20 -mt-10 rounded-t-[40px] bg-ink px-5 pb-20 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pt-32"
    >
      <FadeIn>
        <h2 className="hero-heading section-heading mb-16 sm:mb-20 md:mb-24">
          {t.projectsHeading}
        </h2>
      </FadeIn>
      <div className="mx-auto max-w-[1500px]">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.name}
            project={project}
            index={index}
            onOpenImage={(imageIndex) =>
              setActiveImage({ projectIndex: index, imageIndex })
            }
          />
        ))}
      </div>
      <footer
        id="contact"
        className="flex flex-col items-center gap-5 pt-12 text-center text-ice sm:pt-20"
      >
        <p className="text-sm font-light uppercase tracking-[0.25em] text-ice/60">
          {t.contactPrompt}
        </p>
        <a
          href={`mailto:${contactEmail}`}
          className="text-[clamp(2.5rem,8vw,7rem)] font-black uppercase leading-none tracking-tight transition-opacity hover:opacity-70"
        >
          {t.contactHeading}{" "}
          <ArrowUpRight
            className="inline-block h-[0.7em] w-[0.7em] align-baseline"
            aria-hidden="true"
          />
        </a>
        <div className="flex flex-wrap items-center justify-center gap-5 text-sm font-light text-ice/70">
          <a href="tel:+84346122142">0346 122 142</a>
          <a
            href="https://github.com/Truongvu04"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗
          </a>
        </div>
        <div className="mt-12 flex w-full justify-between border-t border-ice/20 pt-5 text-xs font-light uppercase tracking-wider text-ice/60 sm:text-sm">
          <span>© {new Date().getFullYear()} Võ Phạm Trường Vũ</span>
          <a href="#home" className="transition-opacity hover:opacity-100">
            {t.backToTop} ↑
          </a>
        </div>
      </footer>
      {activeProject && activeImage && (
        <ProjectLightbox
          project={activeProject}
          imageIndex={activeImage.imageIndex}
          onClose={closeLightbox}
          onMove={moveImage}
        />
      )}
    </section>
  );
}

export default function App() {
  const route = globalThis.location.pathname;
  const slug = route.split("/")[2];
  const selectedCaseStudy = getCaseStudy(route.startsWith("/projects/") ? slug : undefined);
  const [language, setLanguage] = useState<Language>(() =>
    localStorage.getItem("portfolio-language") === "en" ? "en" : "vi",
  );
  useEffect(() => {
    localStorage.setItem("portfolio-language", language);
    document.documentElement.lang = language;
    if (selectedCaseStudy) return;
    document.title =
      language === "vi"
        ? "Võ Phạm Trường Vũ — Web Developer"
        : "Vo Pham Truong Vu — Web Developer";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        language === "vi"
          ? "Võ Phạm Trường Vũ — Web Developer tại Đà Nẵng. Website theo yêu cầu, landing page, portfolio và sửa lỗi website."
          : "Vo Pham Truong Vu is a web developer in Da Nang building custom websites, landing pages, portfolios, and fixing website issues.",
      );
  }, [language, selectedCaseStudy]);
  useEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    const hash = globalThis.location.hash;
    if (selectedCaseStudy) return () => { window.history.scrollRestoration = previousRestoration; };
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return () => { window.history.scrollRestoration = previousRestoration; };
    }
    const frame = window.requestAnimationFrame(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => {
      window.cancelAnimationFrame(frame);
      window.history.scrollRestoration = previousRestoration;
    };
  }, [selectedCaseStudy]);

  const home = (
    <main className="overflow-x-clip bg-ink">
      <ScrollProgress />
      <HeroSection />
      <WorkHighlights />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
    </main>
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {selectedCaseStudy ? (
        <CaseStudyPage data={selectedCaseStudy} language={language} />
      ) : (
        home
      )}
    </LanguageContext.Provider>
  );
}
