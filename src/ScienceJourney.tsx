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
      <defs>
        <linearGradient id="sx-organ-fill" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#d3edbd"/><stop offset=".5" stopColor="#8ac37a"/><stop offset="1" stopColor="#4a8b54"/></linearGradient>
        <radialGradient id="sx-molecule"><stop stopColor="#e0f6c7"/><stop offset="1" stopColor="#a3d38b" stopOpacity=".2"/></radialGradient>
      </defs>
      <path d="M174 241C72 201 118 53 266 111M331 170C433 210 387 358 239 300" stroke="#99c781" strokeOpacity=".65" strokeWidth="1.8"/>
      <path className="sx-signal" d="M174 241C72 201 118 53 266 111" stroke="#e0f4c8" strokeWidth="3" strokeDasharray="5 220" strokeLinecap="round"/>
      <path className="sx-signal sx-return" d="M331 170C433 210 387 358 239 300" stroke="#e0f4c8" strokeWidth="3" strokeDasharray="5 220" strokeLinecap="round"/>
      <path d="m254 102 12 9-14 4m-1 194-12-9 14-4" stroke="#cce7b3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <g className="sx-organ-drawing" transform="translate(254 58)">
        <g fill="url(#sx-organ-fill)" fillOpacity=".62" stroke="#d4ebbf" strokeWidth="2.2" strokeLinejoin="round">
          <path id="sx-brain-half" d="M58 11C50-1 33 2 29 15C16 12 7 25 12 37C0 42-2 58 7 67C1 79 10 92 23 91C27 105 47 108 58 97Z"/>
          <use href="#sx-brain-half" transform="translate(120 0) scale(-1 1)"/>
        </g>
        <g stroke="#396d3e" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round">
          <path id="sx-brain-folds" d="M29 15c-5 13 3 23 14 24M12 37c12-4 22 3 21 14M7 67c5-8 19-9 26-1M23 91c-3-10 6-18 16-17M58 27c-10 2-13 12-8 20M58 60c-11-2-17 6-16 15M33 51c12-2 18 5 17 12"/>
          <use href="#sx-brain-folds" transform="translate(120 0) scale(-1 1)"/>
        </g>
        <path d="M61 23v65" stroke="#e7f4d9" strokeOpacity=".55" strokeWidth="1.5"/>
        <g fill="#e4f3d3" fillOpacity=".7"><circle cx="21" cy="30" r="2.5"/><circle cx="97" cy="77" r="2.5"/><circle cx="42" cy="92" r="2"/></g>
      </g>
      <g className="sx-organ-drawing" color="#badb9f"><svg x="132" y="228" width="116" height="116" viewBox="0 0 48 48"><IntestineIcon/></svg></g>
      <g stroke="#9ac883" strokeOpacity=".65" strokeWidth="1.6" strokeLinecap="round">
        <path d="M309 169q-8 20-27 27m18-14q7 10 1 25m-10-17q-14-3-22 7"/>
        <circle cx="282" cy="196" r="3" fill="#bedd9e"/><circle cx="301" cy="207" r="3" fill="#bedd9e"/><circle cx="269" cy="197" r="3" fill="#bedd9e"/>
      </g>
      {[ [145,326,-30],[175,352,26],[214,344,-14] ].map(([x,y,angle],index)=><g key={index} transform={"translate("+x+" "+y+") rotate("+angle+")"}>
        <g className="sj-cell-drift" style={{animationDelay: "-"+index*2+"s"}}>
          <rect x="-7" y="-15" width="14" height="30" rx="7" fill="url(#sx-organ-fill)" fillOpacity=".6" stroke="#cce6b7" strokeWidth="1.2"/>
          <path d="M0-8c6 3-6 7 0 11" stroke="#3d7544" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="-2" cy="8" r="1.5" fill="#e0f2c8"/>
        </g>
      </g>)}
      {[[147,162,8],[364,264,9],[223,211,7],[245,236,5],[245,72,5]].map(([x,y,r],index)=><g key={index}><circle cx={x} cy={y} r={r} fill="url(#sx-molecule)" stroke="#cde8b7" strokeOpacity=".45"/><circle cx={x} cy={y} r={r*.35} fill="#def0c5" fillOpacity=".5"/></g>)}
      <g stroke="#a8d28f" strokeOpacity=".45" strokeWidth="1.2"><path d="m223 211 22 25 18-12"/><circle cx="263" cy="224" r="3" fill="#c3e3a8"/></g>
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
