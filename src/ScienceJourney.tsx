import { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Blend, Brain, CircleHelp, FlaskConical, Microscope, Plus, ShieldCheck, Sprout, Zap } from "lucide-react";
import { products, type Product } from "./catalog";
import { IntestineIcon } from "./IntestineIcon";
import { DishFrame, MicrobiotaArt } from "./MicrobiotaArt";
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
    <svg viewBox="55 10 390 390" fill="none" aria-hidden="true">
      <DishFrame id="sx-axis-dish"/>
      <defs><linearGradient id="sx-organ-line" x1="140" y1="90" x2="345" y2="340" gradientUnits="userSpaceOnUse"><stop stopColor="#e0f2cb"/><stop offset=".5" stopColor="#a7d28e"/><stop offset="1" stopColor="#c8e7af"/></linearGradient></defs>
      <path d="M170 245C80 200 80 117 184 100C215 90 252 80 275 120M320 172C415 195 405 295 315 310C280 324 250 312 225 295" stroke="#8abd79" strokeOpacity=".6" strokeWidth="1.7"/>
      <path className="sx-signal" d="M170 245C80 200 80 117 184 100C215 90 252 80 275 120" stroke="#e0f4c8" strokeWidth="3" strokeDasharray="5 220" strokeLinecap="round"/>
      <path className="sx-signal sx-return" d="M320 172C415 195 405 295 315 310C280 324 250 312 225 295" stroke="#e0f4c8" strokeWidth="3" strokeDasharray="5 220" strokeLinecap="round"/>
      <path d="m263 111 12 9-15 3m-20 169-15 3 7 13" stroke="#cce7b3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <g className="sx-organ-drawing" stroke="url(#sx-organ-line)"><Brain x="269" y="82" width="94" height="94" strokeWidth="1.25"/></g>
      <g className="sx-organ-drawing" color="#b8dc9f"><svg x="139" y="233" width="102" height="102" viewBox="0 0 48 48"><IntestineIcon/></svg></g>
      <g stroke="#95c17e" strokeOpacity=".35" strokeWidth="1.2"><path d="m210 180 39 23-15 32m15-32 39 3"/><circle cx="210" cy="180" r="4"/><circle cx="234" cy="235" r="5"/><circle cx="288" cy="206" r="4"/></g>
      <circle cx="249" cy="203" r="7" fill="#c4e5a9" fillOpacity=".55"/>
      <circle cx="116" cy="198" r="3" fill="#d9efbe" fillOpacity=".7"/><circle cx="365" cy="257" r="3" fill="#d9efbe" fillOpacity=".7"/>
    </svg>
    <button className="sx-organ sx-brain" aria-label="Entender a conexão intestino e cérebro" aria-haspopup="dialog" onClick={() => explore(7)}/>
    <button className="sx-organ sx-intestine" aria-label="Entender a microbiota intestinal" aria-haspopup="dialog" onClick={() => explore(6)}/>
  </div>;
}

export function ScienceJourney({ open }: { open: (product: Product) => void }) {
  const [selected, setSelected] = useState<number | null>(null);
  const item = selected === null ? null : topics[selected];
  const Icon = item?.icon ?? CircleHelp;
  const explore = (index: number) => setSelected(index);
  const openProduct = () => {
    if (!item) return;
    const product = products.find(product => product.id === item.product)!;
    setSelected(null);
    open(product);
  };
  return <section id="ciencia" className={"sx-explorer " + (item ? "is-paused" : "")} aria-labelledby="science-explorer-title">
    <div className="df-container">
      <header className="sx-heading"><h2 id="science-explorer-title">Explore a ciência do seu cuidado.</h2><p>Descubra como tudo se relaciona clicando nos símbolos para abrir as explicações.</p></header>
      <div className="sx-maps">
        <figure className="sx-map" aria-label="Explore prebióticos, probióticos e simbióticos">
          <div className="sx-art sx-microbiota">
            <MicrobiotaArt active={0}/>
            <button className="sx-cell-target" aria-label="Entender a microbiota ilustrada" aria-haspopup="dialog" onClick={() => explore(6)}><span className="sr-only">Abrir explicação sobre a microbiota</span></button>
          </div>
        </figure>
        <div className="sx-topics" role="group" aria-label="Explore os seis temas científicos">{[0,1,2,3,4,5].map(topic => <Point key={topic} topic={topic} className="sx-topic-card" explore={explore}/>)}</div>
        <figure className="sx-map" id="eixo" aria-label="Explore a comunicação entre intestino e cérebro">
          <AxisMap explore={explore}/>
        </figure>
      </div>
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
