import { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Blend, Brain, CircleHelp, FlaskConical, Microscope, MousePointer2, Pause, Play, Plus, ShieldCheck, Sprout, Zap } from "lucide-react";
import { products, type Product } from "./catalog";
import { IntestineIcon } from "./IntestineIcon";
import { MicrobiotaArt } from "./MicrobiotaArt";
import { Overlay } from "./Overlay";
import { ingredients, pathways } from "./scienceContent";

const review = "https://pubmed.ncbi.nlm.nih.gov/31460832/";
const topics = [
  ...ingredients.map((item, index) => ({ ...item, icon: [Sprout, Microscope, Blend][index], group: "Microbiota" })),
  ...pathways.map(item => ({ ...item, source: review, sourceLabel: "Leia a revisão científica", group: "Intestino e cérebro" })),
  {
    label: "Microbiota", title: "Uma comunidade que participa do seu cuidado.",
    text: "A microbiota intestinal é o conjunto de microrganismos que vive no intestino. Ela participa do aproveitamento dos alimentos, da proteção da barreira intestinal e da comunicação com o sistema imune e o cérebro.",
    benefits: "Alimentação variada, sono e acompanhamento profissional fazem parte do cuidado com essa comunidade.",
    source: review, sourceLabel: "Leia a revisão científica", group: "Microbiota", icon: IntestineIcon,
    product: "gutcare", productText: ingredients[0].productText,
  },
  {
    label: "Intestino e cérebro", title: "Por que intestino e cérebro estão conectados?",
    text: "Os microrganismos do intestino produzem moléculas e interagem com nervos e células de defesa. Esses sinais participam da comunicação com o cérebro, ligada à digestão e à resposta ao estresse.",
    benefits: "Essa troca acontece nos dois sentidos: o cérebro também influencia o funcionamento do intestino.",
    source: review, sourceLabel: "Leia a revisão científica", group: "Intestino e cérebro", icon: Brain,
    product: "concentra", productText: pathways[0].productText,
  },
];

function Point({ topic, className, explore }: { topic: number; className: string; explore: (index: number) => void }) {
  const item = topics[topic];
  const Icon = item.icon;
  return <button className={"sx-point " + className} aria-label={"Entender " + item.label} aria-haspopup="dialog" onClick={() => explore(topic)}>
    <Icon className="sx-point-icon" aria-hidden="true"/><span>{item.label}</span><span className="sx-plus"><Plus size={14}/></span>
  </button>;
}

function AxisMap({ explore }: { explore: (index: number) => void }) {
  return <div className="sx-art sx-axis">
    <svg viewBox="0 0 500 410" fill="none" aria-hidden="true">
      <circle cx="250" cy="205" r="180" fill="#ffffff03" stroke="#c4e2b6" strokeOpacity=".28"/>
      <circle cx="250" cy="205" r="171" stroke="#d3ebc7" strokeOpacity=".12"/>
      <path d="M88 137A178 178 0 0 1 354 60M411 284A178 178 0 0 1 141 346" stroke="#ddf2ce" strokeWidth="2" strokeLinecap="round" strokeOpacity=".55"/>
      <path d="M178 251C91 138 207 33 300 97M326 162C419 272 294 381 202 310" stroke="#8abd79" strokeWidth="2"/>
      <path className="sx-signal" d="M178 251C91 138 207 33 300 97" stroke="#e0f4c8" strokeWidth="3" strokeDasharray="5 220" strokeLinecap="round"/>
      <path className="sx-signal sx-return" d="M326 162C419 272 294 381 202 310" stroke="#e0f4c8" strokeWidth="3" strokeDasharray="5 220" strokeLinecap="round"/>
      <path d="m292 88 10 10-14 2m-78 200-10 10 14 3" stroke="#def2c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    <button className="sx-organ sx-brain" aria-label="Entender a conexão intestino e cérebro" aria-haspopup="dialog" onClick={() => explore(7)}><Brain/><span>Cérebro <Plus size={13}/></span></button>
    <button className="sx-organ sx-intestine" aria-label="Entender a microbiota intestinal" aria-haspopup="dialog" onClick={() => explore(6)}><IntestineIcon/><span>Intestino e microbiota <Plus size={13}/></span></button>
    <Point topic={3} className="sx-nerves" explore={explore}/>
    <Point topic={4} className="sx-metabolites" explore={explore}/>
    <Point topic={5} className="sx-immunity" explore={explore}/>
  </div>;
}

export function ScienceJourney({ open }: { open: (product: Product) => void }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const item = selected === null ? null : topics[selected];
  const Icon = item?.icon ?? CircleHelp;
  const explore = (index: number) => setSelected(index);
  const openProduct = () => {
    if (!item) return;
    const product = products.find(product => product.id === item.product)!;
    setSelected(null);
    open(product);
  };
  return <section id="ciencia" className={"sx-explorer " + (paused || item ? "is-paused" : "")} aria-labelledby="science-explorer-title">
    <div className="df-container">
      <header className="sx-heading">
        <div><h2 id="science-explorer-title">Explore a ciência do seu cuidado.</h2><p>Da microbiota à conexão intestino–cérebro, descubra como tudo se relaciona.</p></div>
        <button className="sx-pause" aria-label={paused ? "Reproduzir animações" : "Pausar animações"} aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? <Play size={15}/> : <Pause size={15}/>}<span>{paused ? "Reproduzir" : "Pausar"}</span></button>
      </header>
      <p className="sx-instruction"><MousePointer2 size={18}/><span>Clique nos símbolos com <b>+</b> para abrir as explicações.</span></p>
      <div className="sx-maps">
        <figure className="sx-map" aria-label="Explore prebióticos, probióticos e simbióticos">
          <div className="sx-art sx-microbiota">
            <MicrobiotaArt active={0}/>
            <button className="sx-cell-target" aria-label="Entender os microrganismos probióticos" aria-haspopup="dialog" onClick={() => explore(1)}><span className="sr-only">Abrir explicação sobre probióticos</span></button>
            <Point topic={0} className="sx-prebiotic" explore={explore}/>
            <Point topic={1} className="sx-probiotic" explore={explore}/>
            <Point topic={2} className="sx-synbiotic" explore={explore}/>
          </div>
          <figcaption>O universo da microbiota</figcaption>
        </figure>
        <figure className="sx-map" id="eixo" aria-label="Explore a comunicação entre intestino e cérebro">
          <AxisMap explore={explore}/>
          <figcaption>A conexão intestino–cérebro</figcaption>
        </figure>
      </div>
      <small className="sx-legend">Ilustrações conceituais. Explore cada ponto no seu ritmo.</small>
    </div>
    {item && <Overlay title={item.label} type="science" close={() => setSelected(null)}>
      <div className="sx-explanation" key={item.label}>
        <div className="sx-explanation-symbol"><Icon/></div>
        <h2 aria-live="polite">{item.title}</h2><p>{item.text} {item.benefits}</p>
        <a className="sx-research" href={item.source} target="_blank" rel="noreferrer">{item.sourceLabel}<ArrowUpRight size={14}/></a>
        <aside className="sx-product"><span>Da ciência à sua rotina</span><p>{item.productText}</p><button onClick={openProduct}>Conhecer {products.find(product => product.id === item.product)!.name}<ArrowUpRight size={16}/></button></aside>
      </div>
      <nav className="sx-explanation-nav" aria-label="Explorar outros temas"><button onClick={() => setSelected(((selected ?? 0) + topics.length - 1) % topics.length)}><ArrowLeft size={16}/>Anterior</button><span>{(selected ?? 0) + 1} de {topics.length}</span><button onClick={() => setSelected(((selected ?? 0) + 1) % topics.length)}>Próximo<ArrowRight size={16}/></button></nav>
    </Overlay>}
  </section>;
}
