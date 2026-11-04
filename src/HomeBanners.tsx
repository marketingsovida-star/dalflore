import { Fragment, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { BadgeCheck, ChevronLeft, ChevronRight, CreditCard, Headphones, Leaf, Pause, Play, ShieldCheck, Truck } from "lucide-react";
import { asset, products, type Product } from "./catalog";
import "./banners.css";

type BannerAction = { id: string; label: string; href?: never } | { href: string; label: string; id?: never };

const banners: { name: string; image: string; title: string; description: string; alt: string; actions: BannerAction[] }[] = [
  {
    name: "GUTcare",
    image: "banners/banner-1.webp",
    title: "Cuidar começa\npor dentro.",
    description: "GUTcare combina 4 cepas probióticas e o prebiótico FOS para cuidar da microbiota e apoiar a saúde intestinal.",
    alt: "Aline com um frasco de GUTcare DalFlore em um ambiente iluminado e cercado de plantas",
    actions: [{ id: "gutcare", label: "Conhecer GUTcare" }, { href: "#aline", label: "Conhecer a Aline" }],
  },
  {
    name: "Slim Balance",
    image: "banners/slim-balance-banner.webp",
    title: "Seu ritmo.\nSeu equilíbrio.",
    description: "Slim Balance: 4 cepas probióticas, com L. gasseri BNR17, para complementar o controle do peso.",
    alt: "Frasco Slim Balance DalFlore sobre uma base de mármore com folhas e luz natural",
    actions: [{ id: "slim-balance", label: "Conhecer Slim Balance" }, { href: "#ciencia", label: "Conhecer a ciência" }],
  },
  {
    name: "Hair & Skin e Immune",
    image: "banners/banner-2.webp",
    title: "Sua beleza.\nSeu cuidado.",
    description: "Hair & Skin: biotina e zinco para pele e cabelos. Immune: probióticos e beta-glucanas para suas defesas.",
    alt: "Frascos Hair & Skin e Immune DalFlore entre folhagens verdes",
    actions: [{ id: "hair-skin", label: "Conhecer Hair & Skin" }, { id: "immune", label: "Conhecer Immune" }],
  },
];
const benefits = [
  { icon: Leaf, text: "Ingredientes selecionados" },
  { icon: CreditCard, text: "Até 12x no cartão" },
  { icon: Truck, text: "Frete grátis a partir de R$ 150" },
  { icon: ShieldCheck, text: "Compra segura" },
  { icon: Headphones, text: "Atendimento pelo WhatsApp" },
  { icon: BadgeCheck, text: "7 dias de garantia" },
];

function moveAtmosphere(event: PointerEvent<HTMLElement>) {
  if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const element = event.currentTarget, rect = element.getBoundingClientRect();
  element.style.setProperty("--atmosphere-x", ((event.clientX-rect.left)/rect.width-.5)*6 + "px");
  element.style.setProperty("--atmosphere-y", ((event.clientY-rect.top)/rect.height-.5)*6 + "px");
}
function resetAtmosphere(event: PointerEvent<HTMLElement>) {
  event.currentTarget.style.setProperty("--atmosphere-x", "0px");
  event.currentTarget.style.setProperty("--atmosphere-y", "0px");
}

function BenefitsStrip() {
  const strip = useRef<HTMLDivElement>(null);
  const cycle = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState({ copies: 1, cycleWidth: 0, viewportWidth: 0 });

  useLayoutEffect(() => {
    const measure = () => {
      if (!strip.current || !cycle.current) return;
      const cycleWidth = cycle.current.getBoundingClientRect().width;
      if (!cycleWidth) return;
      const viewportWidth = strip.current.clientWidth;
      const copies = Math.max(1, Math.ceil(viewportWidth / cycleWidth));
      setLayout(current => current.copies === copies && current.cycleWidth === cycleWidth && current.viewportWidth === viewportWidth
        ? current : { copies, cycleWidth, viewportWidth });
    };
    const observer = new ResizeObserver(measure);
    if (strip.current) observer.observe(strip.current);
    if (cycle.current) observer.observe(cycle.current);
    measure();
    return () => observer.disconnect();
  }, []);

  return <div ref={strip} className="df-banner-benefits" aria-label="Benefícios da compra" onPointerMove={moveAtmosphere} onPointerLeave={resetAtmosphere}>
    <div className="df-strip-particles" aria-hidden="true"><i/><i/><i/><i/></div>
    <div className="df-benefits-track" style={{ "--benefits-duration": `${layout.cycleWidth ? layout.cycleWidth * layout.copies / 37 : 36}s`, "--benefits-viewport": layout.viewportWidth ? `${layout.viewportWidth}px` : undefined } as CSSProperties}>
      {[0, 1].map(copy => <div className="df-benefits-group" key={copy} aria-hidden={copy === 1}>
        {Array.from({ length: layout.copies }, (_, index) => <div className="df-benefits-cycle" key={index} ref={copy === 0 && index === 0 ? cycle : undefined} aria-hidden={copy === 1 || index > 0}>
          {benefits.map(({ icon: Icon, text }) => <span key={text}><Icon size={18} aria-hidden="true" />{text}</span>)}
        </div>)}
      </div>)}
    </div>
  </div>;
}

export function HomeBanners({ open, onVisibilityChange, onExpert }: {
  open: (product: Product) => void;
  onVisibilityChange: (visible: boolean) => void;
  onExpert: () => void;
}) {
  const root = useRef<HTMLElement>(null);
  const touch = useRef<number | null>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const move = (direction: number) => setActive(index => (index + direction + banners.length) % banners.length);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => onVisibilityChange(!entry.isIntersecting), { threshold: 0 });
    if (root.current) observer.observe(root.current);
    return () => observer.disconnect();
  }, [onVisibilityChange]);
  useEffect(() => {
    if (paused || interacting || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => move(1), 7000);
    return () => window.clearTimeout(timer);
  }, [active, paused, interacting]);
  useLayoutEffect(() => {
    const element = root.current;
    const pane = element?.querySelector<HTMLElement>(".df-banner-copy-inner");
    const visual = element?.querySelector<HTMLElement>(".df-banner-visual");
    if (!element || !pane || !visual) return;
    const context = document.createElement("canvas").getContext("2d");
    let frame = 0, disposed = false;
    const measure = () => {
      const desktop = window.matchMedia("(min-width: 768px)").matches;
      const headings = pane.querySelectorAll<HTMLElement>(".df-banner-message h1,.df-banner-message h2");
      if (desktop && context && headings[0]) {
        const style = getComputedStyle(headings[0]);
        context.font = style.fontWeight + " 100px " + style.fontFamily;
        const tracking = parseFloat(style.letterSpacing) / parseFloat(style.fontSize) * 100 || 0;
        const widest = Math.max(...banners.flatMap(banner => banner.title.split("\n")).map(line => context.measureText(line).width + Math.max(0,line.length-1) * tracking));
        const ceiling = window.innerHeight <= 650 ? 46 : 72;
        const size = Math.max(32, Math.min(ceiling, headings[0].clientWidth * .97 / widest * 100));
        headings.forEach(heading => heading.style.setProperty("--banner-title-size", size.toFixed(2) + "px"));
      } else headings.forEach(heading => heading.style.removeProperty("--banner-title-size"));
      const bounds = pane.getBoundingClientRect(), image = visual.getBoundingClientRect();
      element.style.setProperty("--banner-copy-top", (bounds.top-image.top) + "px");
      element.style.setProperty("--banner-copy-bottom", (bounds.bottom-image.top) + "px");
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(measure); };
    const observer = new ResizeObserver(schedule);
    observer.observe(pane); observer.observe(visual);
    schedule();
    void document.fonts.ready.then(() => { if (!disposed) schedule(); });
    return () => { disposed = true; cancelAnimationFrame(frame); observer.disconnect(); };
  }, []);
  const controls = <>
    <button type="button" aria-label="Banner anterior" onClick={() => move(-1)}><ChevronLeft size={18} /></button>
    <div className="df-banner-dots" role="group" aria-label="Escolher banner">
      {banners.map((banner, index) => <button type="button" key={banner.title} aria-label={`Mostrar banner ${index + 1}: ${banner.name}`} title={banner.name} aria-pressed={index === active} onClick={() => setActive(index)}><span aria-hidden="true">{"0" + (index + 1)}</span></button>)}
    </div>
    <button type="button" aria-label="Próximo banner" onClick={() => move(1)}><ChevronRight size={18} /></button>
    <button type="button" aria-label={paused ? "Reproduzir banners" : "Pausar banners"} aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? <Play size={16} /> : <Pause size={16} />}</button>
  </>;
  return <section ref={root} className="df-banners" aria-label="Destaques DalFlore" aria-roledescription="carrossel" onPointerMove={moveAtmosphere} onPointerLeave={resetAtmosphere}
    onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)}
    onFocusCapture={() => setInteracting(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false); }}
    onKeyDown={event => { if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); } }}>
    <div className="df-banner-visual" onTouchStart={event => { touch.current = event.touches[0]?.clientX ?? null; }} onTouchEnd={event => {
      const end = event.changedTouches[0]?.clientX;
      if (touch.current !== null && end !== undefined && Math.abs(end - touch.current) > 50) move(end < touch.current ? 1 : -1);
      touch.current = null;
    }}>
      {banners.map((banner, index) => <Fragment key={banner.title}>
        <img className={`df-banner-backdrop${active === index ? " is-active" : ""}`} src={asset(banner.image)} alt="" aria-hidden="true" width={1672} height={941} />
        <img src={asset(banner.image)} alt={banner.alt} width={1672} height={941} fetchPriority={index === 0 ? "high" : "auto"} className={`df-banner-photo${index === 0 ? " df-banner-photo-first" : ""}${active === index ? " is-active" : ""}`} aria-hidden={active !== index} />
      </Fragment>)}
      <div className="df-banner-shade" />
      <div className="df-banner-particles" aria-hidden="true"><div className="df-banner-particle-zone df-banner-particle-top"><i/><i/></div><div className="df-banner-particle-zone df-banner-particle-bottom"><i/><i/></div></div>
    </div>
    <div className="df-banner-copy">
      <div className="df-banner-copy-inner">
        <div className="df-banner-brand"><img className="df-banner-logo" src={asset("brand/logo-white.png")} alt="DalFlore" width={160} height={67} /></div>
        <div className="df-banner-messages" aria-live={paused || interacting ? "polite" : "off"} aria-atomic="true">
          {banners.map((banner, index) => <div key={banner.title} className={`df-banner-message${active === index ? " is-active" : ""}`} aria-hidden={active !== index} inert={active !== index}>
            {index === 0 ? <h1>{banner.title}</h1> : <h2>{banner.title}</h2>}
            <p>{banner.description}</p>
            <div className={`df-banner-actions${banner.actions.length > 1 ? " df-banner-actions-pair" : ""}`}>{banner.actions.map(action => action.href ? <a className="df-banner-cta" key={action.href} href={action.href} onClick={action.href === "#aline" ? onExpert : undefined}><span>{action.label}</span></a> : <button type="button" className="df-banner-cta" key={action.id} onClick={() => open(products.find(product => product.id === action.id)!)}><span>{action.label}</span></button>)}</div>
          </div>)}
        </div>
        <div className="df-banner-controls df-banner-controls-desktop">{controls}</div>
      </div>
    </div>
    <BenefitsStrip />
    <div className="df-banner-controls df-banner-controls-mobile">{controls}</div>
  </section>;
}
