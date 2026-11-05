import { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Blend, Brain, CircleHelp, FlaskConical, Microscope, Plus, ShieldCheck, Sprout, Zap } from "lucide-react";
import { products, type Product } from "./catalog";
import { IntestineIcon } from "./IntestineIcon";
import { MicrobiotaArt, microbiotaCells } from "./MicrobiotaArt";
import { Overlay } from "./Overlay";
import { ScienceSurface } from "./ScienceSurface";
import { ingredients, pathways } from "./scienceContent";

const review = "https://pubmed.ncbi.nlm.nih.gov/31460832/";
const topics = [
  ...ingredients.map((item, index) => ({ ...item, icon: [Sprout, Microscope, Blend][index], group: "Microbiota" })),
  ...pathways.map(item => ({ ...item, source: review, group: "Intestino e cérebro" })),
  {
    label: "Microbiota", title: "O que é a microbiota?",
    text: "A microbiota intestinal é o conjunto de microrganismos que vive no intestino. Ela participa do aproveitamento dos alimentos, da proteção da barreira intestinal e da comunicação com o sistema imune e o cérebro.",
    benefits: "Alimentação variada, sono e acompanhamento profissional fazem parte do cuidado com essa comunidade.",
    source: review, group: "Microbiota", icon: IntestineIcon,
    product: "gutcare", productText: ingredients[0].productText,
  },
  {
    label: "Intestino e cérebro", title: "Por que intestino e cérebro estão conectados?",
    text: "Os microrganismos do intestino produzem moléculas e interagem com nervos e células de defesa. Esses sinais participam da comunicação com o cérebro, ligada à digestão e à resposta ao estresse.",
    benefits: "Essa troca acontece nos dois sentidos: o cérebro também influencia o funcionamento do intestino.",
    source: review, group: "Intestino e cérebro", icon: Brain,
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
  return <ScienceSurface className="sx-axis" label="Intestino e cérebro" onLabel={() => explore(7)} scene={<svg viewBox="55 10 390 390" fill="none" aria-hidden="true">
      <defs><radialGradient id="sx-molecule"><stop stopColor="#e0f6c7"/><stop offset="1" stopColor="#a3d38b" stopOpacity=".2"/></radialGradient></defs>
      <path d="M152 272C78 234 119 95 254 150M365 160C422 212 365 341 260 280" stroke="#99c781" strokeOpacity=".65" strokeWidth="1.8"/>
      <path className="sx-signal" d="M152 272C78 234 119 95 254 150" stroke="#e0f4c8" strokeWidth="3" strokeDasharray="5 220" strokeLinecap="round"/>
      <path className="sx-signal sx-return" d="M365 160C422 212 365 341 260 280" stroke="#e0f4c8" strokeWidth="3" strokeDasharray="5 220" strokeLinecap="round"/>
      <path d="m242 141 12 9-14 3m33 128-13-1 6 12" stroke="#cce7b3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <g className="sx-organ-drawing sx-brain-drawing" color="#c7e5b0"><Brain x="260" y="100" width="100" height="100" strokeWidth="1.5"/></g>
      <g className="sx-organ-drawing sx-intestine-drawing" color="#badb9f"><svg x="150" y="222" width="112" height="112" viewBox="0 0 48 48"><IntestineIcon/></svg></g>
      <g stroke="#9ac883" strokeOpacity=".55" strokeWidth="1.4" strokeLinecap="round">
        <path d="M312 205q-6 15-25 25m14-15q9 3 12 14m-16-10q-17-10-30-7"/>
        <circle cx="287" cy="230" r="3" fill="#bedd9e"/><circle cx="313" cy="229" r="3" fill="#bedd9e"/>
      </g>
      {[[147,162,8],[364,264,9],[267,212,6],[245,72,5]].map(([x,y,r],index)=><g key={index}><circle cx={x} cy={y} r={r} fill="url(#sx-molecule)" stroke="#cde8b7" strokeOpacity=".45"/><circle cx={x} cy={y} r={r*.35} fill="#def0c5" fillOpacity=".5"/></g>)}
    </svg>}>
    <button className="sx-organ sx-brain" aria-label="Entender a conexão intestino e cérebro" aria-haspopup="dialog" onClick={() => explore(7)}/>
    <button className="sx-organ sx-intestine" aria-label="Entender a microbiota intestinal" aria-haspopup="dialog" onClick={() => explore(6)}/>
  </ScienceSurface>;
}

export function ScienceJourney({ open }: { open: (product: Product) => void }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [highlightedMicrobe, setHighlightedMicrobe] = useState<number | null>(null);
  const item = selected === null ? null : topics[selected];
  const Icon = item?.icon ?? CircleHelp;
  const explore = (index: number) => setSelected(index);
  const openProduct = () => {
    if (!item) return;
    const product = products.find(product => product.id === item.product)!;
    setSelected(null);
    open(product);
  };
  return <section className={"sx-explorer " + (item ? "is-paused" : "")} aria-labelledby="science-explorer-title">
    <div className="df-container">
      <header className="sx-heading"><h2 id="science-explorer-title">Explore a ciência do seu cuidado.</h2><p>Descubra como tudo se relaciona clicando nos símbolos para abrir as explicações.</p></header>
      <div className="sx-maps">
        <figure className="sx-map" aria-label="Explore prebióticos, probióticos e simbióticos">
          <ScienceSurface className="sx-microbiota" label="Microbiota" onLabel={() => explore(6)} scene={<MicrobiotaArt active={0} highlighted={highlightedMicrobe}/>}>
            {microbiotaCells.map(([x,y,angle,scale],index) => <button key={index} className="sx-microbe-target" aria-label={"Entender a microbiota: microrganismo " + (index + 1)} aria-haspopup="dialog" style={{left:((x-55)/390*100)+"%",top:((y-10)/390*100)+"%",width:(62/390*100)+"%",height:(104/390*100)+"%",transform:"translate(-50%,-50%) rotate("+angle+"deg) scale("+scale+")"}} onPointerEnter={() => setHighlightedMicrobe(index)} onPointerLeave={() => setHighlightedMicrobe(null)} onFocus={() => setHighlightedMicrobe(index)} onBlur={() => setHighlightedMicrobe(null)} onClick={() => explore(6)}/>)} 
          </ScienceSurface>
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
        <a className="sx-research" href={item.source} target="_blank" rel="noreferrer">Leia o consenso científico<ArrowUpRight size={14}/></a>
        <aside className="sx-product"><span>Da ciência à sua rotina</span><p>{item.productText}</p><button onClick={openProduct}>Conhecer {products.find(product => product.id === item.product)!.name}<ArrowUpRight size={16}/></button></aside>
      </div>
      <nav className="sx-explanation-nav" aria-label="Explorar outros temas"><button onClick={() => setSelected(((selected ?? 0) + topics.length - 1) % topics.length)}><ArrowLeft size={16}/>Anterior</button><span>{(selected ?? 0) + 1} de {topics.length}</span><button onClick={() => setSelected(((selected ?? 0) + 1) % topics.length)}>Próximo<ArrowRight size={16}/></button></nav>
    </Overlay>}
  </section>;
}
