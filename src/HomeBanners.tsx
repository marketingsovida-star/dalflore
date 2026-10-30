import { Fragment, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, CreditCard, Headphones, Pause, Play, ShieldCheck, Truck } from "lucide-react";
import { asset, products, type Product } from "./catalog";
import "./banners.css";

const banners = [
  {
    image: "banners/banner-1.webp",
    title: "Seu equilíbrio\ncomeça por dentro.",
    description: "Probióticos e prebióticos em uma fórmula para o cuidado com a sua microbiota. Conheça GUTcare e comece um novo ritual de bem-estar.",
    alt: "Aline com um frasco de GUTcare DalFlore em um ambiente iluminado e cercado de plantas",
    actions: [{ id: "gutcare", label: "Conhecer GUTcare" }],
  },
  {
    image: "banners/slim-balance-banner.webp",
    title: "Seu ritmo.\nSeu equilíbrio.",
    description: "Sua rotina de cuidado merece um olhar por dentro. Conheça Slim Balance, a combinação de probióticos da DalFlore para o cuidado metabólico.",
    alt: "Frasco Slim Balance DalFlore sobre uma base de mármore com folhas e luz natural",
    actions: [{ id: "slim-balance", label: "Conhecer Slim Balance" }],
  },
  {
    image: "banners/banner-2.webp",
    title: "Nutra sua beleza.\nCuide de você.",
    description: "Hair & Skin e Immune: nutrientes para pele, cabelos e unhas, e uma fórmula que conecta microbiota e cuidado com as suas defesas.",
    alt: "Frascos Hair & Skin e Immune DalFlore entre folhagens verdes",
    actions: [{ id: "hair-skin", label: "Conhecer Hair & Skin" }, { id: "immune", label: "Conhecer Immune" }],
  },
];
const benefits = [
  { icon: CreditCard, text: "Até 12x no cartão" },
  { icon: Truck, text: "Frete grátis a partir de R$ 150" },
  { icon: ShieldCheck, text: "Compra segura" },
  { icon: Headphones, text: "Atendimento pelo WhatsApp" },
];

export function HomeBanners({ open, onVisibilityChange }: {
  open: (product: Product) => void;
  onVisibilityChange: (visible: boolean) => void;
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
  const controls = <>
    <button type="button" aria-label="Banner anterior" onClick={() => move(-1)}><ChevronLeft size={18} /></button>
    <div className="df-banner-dots" role="group" aria-label="Escolher banner">
      {banners.map((banner, index) => <button type="button" key={banner.title} aria-label={`Mostrar banner ${index + 1}`} aria-pressed={index === active} onClick={() => setActive(index)}><span /></button>)}
    </div>
    <button type="button" aria-label="Próximo banner" onClick={() => move(1)}><ChevronRight size={18} /></button>
    <button type="button" aria-label={paused ? "Reproduzir banners" : "Pausar banners"} aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? <Play size={16} /> : <Pause size={16} />}</button>
  </>;
  return <section ref={root} className="df-banners" aria-label="Destaques DalFlore" aria-roledescription="carrossel"
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
    </div>
    <div className="df-banner-copy">
      <div className="df-banner-copy-inner">
        <img className="df-banner-logo" src={asset("brand/logo-white.png")} alt="DalFlore" width={160} height={67} />
        <div className="df-banner-messages" aria-live={paused || interacting ? "polite" : "off"} aria-atomic="true">
          {banners.map((banner, index) => <div key={banner.title} className={`df-banner-message${active === index ? " is-active" : ""}`} aria-hidden={active !== index} inert={active !== index}>
            {index === 0 ? <h1>{banner.title}</h1> : <h2>{banner.title}</h2>}
            <p>{banner.description}</p>
            <div className={`df-banner-actions${banner.actions.length > 1 ? " df-banner-actions-pair" : ""}`}>{banner.actions.map(action => <button type="button" className="df-banner-cta" key={action.id} onClick={() => open(products.find(product => product.id === action.id)!)}>{action.label}</button>)}</div>
          </div>)}
        </div>
        <div className="df-banner-controls df-banner-controls-desktop">{controls}</div>
      </div>
    </div>
    <div className="df-banner-benefits" aria-label="Benefícios da compra">
      <div className="df-benefits-track">{[0, 1].map(copy => <div className="df-benefits-group" key={copy} aria-hidden={copy === 1}>{benefits.map(({ icon: Icon, text }) => <span key={text}><Icon size={18} aria-hidden="true" />{text}</span>)}</div>)}</div>
    </div>
    <div className="df-banner-controls df-banner-controls-mobile">{controls}</div>
  </section>;
}
