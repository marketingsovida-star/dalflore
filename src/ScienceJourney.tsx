import { useState } from "react";
import { ArrowRight, ArrowUpRight, Brain, FlaskConical, Leaf, Pause, Play, Plus, ShieldCheck, Sprout, Zap } from "lucide-react";
import { products, type Product } from "./catalog";
import { IntestineIcon } from "./IntestineIcon";

const ingredients = [
  {
    label: "Prebióticos", title: "Alimentar a microbiota.",
    text: "São substâncias utilizadas por parte dos microrganismos que vivem no seu corpo. FOS, GOS e inulina são exemplos: pense neles como alimento para essa comunidade.",
    detail: "A definição científica também exige benefício à saúde. Nem toda fibra é um prebiótico; o tipo de ingrediente e a quantidade utilizada importam.",
    source: "https://isappscience.org/resource/prebiotics/",
    visualTitle: "O alimento encontra a microbiota", from: "FOS, GOS e inulina", to: "Microrganismos", verb: "Alimentam",
    caption: "As partículas representam substratos utilizados por parte da microbiota.",
    product: "gutcare", productText: "O GUTcare reúne cepas probióticas e FOS. Aqui, o FOS é o exemplo de prebiótico na composição.",
  },
  {
    label: "Probióticos", title: "Microrganismos com funções específicas.",
    text: "São microrganismos vivos que, em quantidades adequadas, conferem benefícios à saúde. A cepa e a dose ajudam a entender a proposta de cada composição.",
    detail: "Lactobacillus e Bifidobacterium incluem diferentes cepas. Mais cepas ou mais bilhões não significam, por si só, uma fórmula melhor para cada pessoa.",
    source: "https://isappscience.org/resource/probiotics-prebiotics-synbiotics-postbiotics-and-fermented-foods-defined/",
    visualTitle: "Conhecer a cepa faz diferença", from: "Cepas identificadas", to: "Intestino", verb: "Cepa e dose",
    caption: "O nome da cepa e a quantidade em UFC ajudam a identificar cada composição.",
    product: "immune", productText: "O Immune reúne quatro cepas probióticas. Nos detalhes, você pode conferir os nomes e as quantidades.",
  },
  {
    label: "Simbióticos", title: "Combinar com fundamento.",
    text: "Reúnem microrganismos vivos e substratos utilizados seletivamente pela microbiota, com benefício à saúde. O sentido está na combinação, e não apenas em somar ingredientes.",
    detail: "A avaliação considera o conjunto, as cepas, as doses e as evidências para o uso proposto. A lista de ingredientes, sozinha, não demonstra o benefício clínico de uma fórmula.",
    source: "https://isappscience.org/resource/probiotics-prebiotics-synbiotics-postbiotics-and-fermented-foods-defined/",
    visualTitle: "Uma combinação com propósito", from: "Microrganismos + substratos", to: "Microbiota", verb: "Em conjunto",
    caption: "As duas formas representam os componentes de uma combinação avaliada em conjunto.",
    product: "concentra", productText: "Concentra+ reúne cepas, GOS e FOS. Essa composição ajuda a visualizar os dois tipos de ingrediente.",
  },
];

const pathways = [
  {
    label: "Nervos", title: "Sinais que vão e voltam.",
    text: "O nervo vago é uma das vias de comunicação entre intestino e cérebro. Os sinais circulam nos dois sentidos: o que acontece em um pode se relacionar com o outro.",
    visualTitle: "Pelos nervos", caption: "As setas mostram a comunicação em duas direções. O nervo vago é uma dessas vias.", icon: Zap,
    product: "concentra", productText: "É nesse olhar integrado que entra a proposta do Concentra+, com cepas, colina e B6 para o cuidado nutricional com foco e cognição.",
  },
  {
    label: "Metabólitos", title: "Pequenas moléculas participam da conversa.",
    text: "Ao utilizar componentes da alimentação, a microbiota produz metabólitos. Alguns desses compostos participam de sinais locais e da comunicação com outros sistemas do corpo.",
    visualTitle: "Pelos metabólitos", caption: "Os pontos representam moléculas envolvidas na sinalização, em um esquema simplificado.", icon: FlaskConical,
    product: "slim-balance", productText: "Slim Balance reúne quatro cepas em uma proposta de cuidado metabólico. Conhecer a composição é o primeiro passo para avaliar seu uso.",
  },
  {
    label: "Imunidade", title: "Uma rede que trabalha conectada.",
    text: "A microbiota, a barreira intestinal e o sistema imune interagem. Os sinais dessa rede também se relacionam com a comunicação entre intestino e cérebro.",
    visualTitle: "Pelos sinais imunes", caption: "O escudo identifica a participação do sistema imune nessa rede de comunicação.", icon: ShieldCheck,
    product: "immune", productText: "O Immune considera a relação entre microbiota e cuidado imunológico, combinando cepas, prebióticos e beta-glucanas.",
  },
];

function MicrobesIcon() {
  return <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <g stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
      <rect x="9" y="10" width="20" height="36" rx="10" transform="rotate(-30 19 28)" />
      <path d="m11 9-3-4m17 3 2-4M4 23H0m11 23-2 5m18-14 5 3" />
      <rect x="37" y="26" width="18" height="30" rx="9" transform="rotate(24 46 41)" />
      <path d="m45 24 1-5m12 15 5-1m-6 17 4 3m-22 6-2 4" />
    </g>
    <g fill="currentColor"><circle cx="17" cy="21" r="2" /><circle cx="21" cy="29" r="2" /><circle cx="44" cy="36" r="2" /><circle cx="47" cy="44" r="2" /><circle cx="44" cy="11" r="4" /></g>
  </svg>;
}

function Tabs({ id, labels, active, change, label }: { id: string; labels: string[]; active: number; change: (index: number) => void; label: string }) {
  return <div className="sj-tabs" role="tablist" aria-label={label}>
    {labels.map((text, index) => <button key={text} id={`${id}-tab-${index}`} role="tab" aria-selected={active === index} aria-controls={`${id}-panel-${index}`} tabIndex={active === index ? 0 : -1} onClick={() => change(index)} onKeyDown={event => {
      if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === "Home" ? 0 : event.key === "End" ? labels.length - 1 : (active + (event.key === "ArrowRight" ? 1 : labels.length - 1)) % labels.length;
      change(next); document.getElementById(`${id}-tab-${next}`)?.focus();
    }}>{id === "science" ? index === 0 ? <Sprout/> : index === 1 ? <MicrobesIcon/> : <Plus/> : index === 0 ? <Zap/> : index === 1 ? <FlaskConical/> : <ShieldCheck/>}<span>{text}</span></button>)}
  </div>;
}

function MicrobiotaArt({ active }: { active: number }) {
  const cells = [[169,148,-32,1],[285,116,38,.78],[316,230,-28,1.15],[181,269,38,.8],[240,193,20,.68]];
  return <svg className="sj-micrograph" viewBox="0 0 500 410" fill="none" aria-hidden="true">
    <defs>
      <radialGradient id="sj-dish"><stop stopColor="#689e62" stopOpacity=".48"/><stop offset=".78" stopColor="#347747" stopOpacity=".22"/><stop offset="1" stopColor="#173e29" stopOpacity=".55"/></radialGradient>
      <linearGradient id="sj-cell" x2="1" y2="1"><stop stopColor="#d3edbd"/><stop offset=".5" stopColor="#8ac37a"/><stop offset="1" stopColor="#4a8b54"/></linearGradient>
      <radialGradient id="sj-nucleus"><stop stopColor="#e0f6c7"/><stop offset="1" stopColor="#a3d38b" stopOpacity=".2"/></radialGradient>
    </defs>
    <circle cx="250" cy="205" r="180" fill="url(#sj-dish)" stroke="#c4e2b6" strokeOpacity=".28"/>
    <circle cx="250" cy="205" r="171" stroke="#d3ebc7" strokeOpacity=".12"/>
    <path d="M88 137A178 178 0 0 1 354 60M411 284A178 178 0 0 1 141 346" stroke="#ddf2ce" strokeWidth="2" strokeLinecap="round" strokeOpacity=".55"/>
    {cells.map(([x,y,angle,scale],i)=><g key={i} transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale})`}>
      <g className="sj-cell-drift" style={{animationDelay:`-${i*1.3}s`}}>
        <rect x="-23" y="-47" width="46" height="94" rx="23" fill="url(#sj-cell)" fillOpacity={active===0?'.55':'.88'} stroke="#d7edc7" strokeWidth="1.8"/>
        <rect x="-17" y="-39" width="34" height="78" rx="17" stroke="#e7f6de" strokeOpacity=".35"/>
        <path d="M-10-25C13-30-15-8 8-4S-11 19 8 27" stroke="#275c35" strokeWidth="3" strokeLinecap="round"/>
        <path d="M-26-26l-8-5m10 26-10 1m10 25-8 6m56-53 8-5m-8 26 10 1m-10 25 8 6" stroke="#a4d28e" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="9" cy="-20" r="3" fill="#ebf8dc"/><circle cx="-8" cy="17" r="2.5" fill="#d0eab9"/>
      </g>
    </g>)}
    {[ [121,219,13],[244,309,18],[357,155,14],[231,79,9] ].map(([x,y,r],i)=><g key={i}><circle cx={x} cy={y} r={r} fill="url(#sj-nucleus)" stroke="#cde8b7" strokeOpacity=".5"/><circle cx={x} cy={y} r={r*.4} fill="#ddf3c3" fillOpacity=".6"/></g>)}
    {active!==1&&<g className="sj-substrates" fill="#e3f5c9">
      <circle className="sj-feed sj-feed-a" cx="0" cy="0" r="4"/>
      <circle className="sj-feed sj-feed-b" cx="0" cy="0" r="3"/>
      <circle className="sj-feed sj-feed-c" cx="0" cy="0" r="4"/>
      <path d="m105 108 5 5-5 5-5-5ZM368 306l5 5-5 5-5-5Z"/>
    </g>}
    <g stroke="#c9e5bc" strokeOpacity=".7" strokeLinecap="round"><path d="M168 148 99 95H28"/><circle cx="168" cy="148" r="3" fill="#d8edc6"/><path d="m311 247 66 84h92"/><circle cx="311" cy="247" r="3" fill="#d8edc6"/></g>
    <g fill="#edf7e8" fontFamily="Arial" fontSize="14"><text x="28" y="83">Microrganismos</text><text x="378" y="354">Microbiota</text></g>
    {active!==1&&<g fill="#edf7e8" fontFamily="Arial" fontSize="14"><text x="340" y="52">{active===0?'Prebióticos':'Substratos'}</text><path d="m338 62-25 19" stroke="#c9e5bc"/><circle cx="313" cy="81" r="3" fill="#e3f5c9"/></g>}
  </svg>;
}

function AxisArt({ active }: { active: number }) {
  const Signal = pathways[active].icon;
  return <div className="sj-axis-art" aria-hidden="true">
    <svg viewBox="0 0 500 410" fill="none">
      <ellipse cx="250" cy="205" rx="191" ry="148" transform="rotate(-35 250 205)" stroke="#c5e2b4" strokeOpacity=".15"/>
      <ellipse cx="250" cy="205" rx="213" ry="165" transform="rotate(-35 250 205)" stroke="#c5e2b4" strokeOpacity=".08"/>
      <path d="M178 251C91 138 207 33 300 97" stroke="#8abd79" strokeWidth="2"/>
      <path d="M326 162C419 272 294 381 202 310" stroke="#8abd79" strokeWidth="2"/>
      <path className="sj-nerve-pulse" d="M178 251C91 138 207 33 300 97" stroke="#e0f4c8" strokeWidth="3" strokeDasharray="5 220" strokeLinecap="round"/>
      <path className="sj-nerve-pulse sj-return" d="M326 162C419 272 294 381 202 310" stroke="#e0f4c8" strokeWidth="3" strokeDasharray="5 220" strokeLinecap="round"/>
      <path d="m292 88 10 10-14 2m-78 200-10 10 14 3" stroke="#def2c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    <div className="sj-organ sj-brain"><Brain/><span>Cérebro</span></div>
    <div className="sj-organ sj-intestine"><IntestineIcon/><span>Intestino e microbiota</span></div>
    <div className="sj-pathway-symbol"><Signal/><span>{pathways[active].label}</span></div>
  </div>;
}

function Illustration({ kind, active }: { kind: "ingredients" | "axis"; active: number }) {
  const [paused, setPaused] = useState(false);
  const item = kind === "axis" ? pathways[active] : ingredients[active];
  return <figure className={`sj-visual sj-visual-${kind} ${paused ? "is-paused" : ""}`}>
    <button className="sj-pause" aria-label={paused ? "Reproduzir ilustração" : "Pausar ilustração"} aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? <Play size={15} /> : <Pause size={15} />}</button>
    <div className="sj-scene" key={`${kind}-${active}`}>{kind==='axis'?<AxisArt active={active}/>:<MicrobiotaArt active={active}/>}</div>
    <figcaption><strong className="sj-visual-title">{item.visualTitle}</strong><span className="sj-visual-caption">{item.caption}</span><small>Representação ilustrativa</small></figcaption>
  </figure>;
}

function ProductConnection({ id, text, open }: { id: string; text: string; open: (product: Product) => void }) {
  const product = products.find(item => item.id === id)!;
  return <aside className="sj-product-note">
    <span className="sj-product-icon"><Leaf size={24}/></span><div className="sj-product-content"><span>Da ciência à sua rotina</span>
    <p>{text}</p>
    <button onClick={() => open(product)}>Conhecer {product.name}<ArrowUpRight size={16} /></button></div>
  </aside>;
}

export function ScienceJourney({ open }: { open: (product: Product) => void }) {
  const [ingredient, setIngredient] = useState(0);
  const [pathway, setPathway] = useState(0);
  return <section className="sj-journey" aria-label="A ciência por trás das fórmulas DalFlore">
    <section className="sj-step" id="ciencia">
      <div className="df-container sj-grid">
        <div className="sj-copy">
          <p className="sj-kicker">A ciência por trás do cuidado</p>
          <h2>Pequenos organismos.<br />Um universo de cuidado.</h2>
          <p className="sj-intro">No intestino vive uma comunidade de microrganismos: a microbiota. Entenda o papel de cada tipo de ingrediente nesse cuidado.</p>
          <Tabs id="science" labels={ingredients.map(item => item.label)} active={ingredient} change={setIngredient} label="Entenda os ingredientes" />
          <Illustration kind="ingredients" active={ingredient} />
          <div className="sj-panels">
            {ingredients.map((item, index) => <div className={`sj-panel ${ingredient === index ? "active" : ""}`} key={item.label} role="tabpanel" id={`science-panel-${index}`} aria-labelledby={`science-tab-${index}`} aria-hidden={ingredient !== index} inert={ingredient !== index}>
              <h3>{item.title}</h3><p>{item.text}</p>
              <details className="sj-more" key={`${index}-${ingredient}`}><summary>Aprofundar o conceito<Plus size={15} /></summary><p>{item.detail}</p><a href={item.source} target="_blank" rel="noreferrer">Leia a definição da ISAPP<ArrowUpRight size={14} /></a></details>
            </div>)}
          </div>
          <ProductConnection id={ingredients[ingredient].product} text={ingredients[ingredient].productText} open={open} />
        </div>
      </div>
    </section>
    <div className="df-container sj-continuation"><span/><p>O cuidado começa no intestino.<br/><strong>E se conecta a você por inteiro.</strong></p><span/></div>
    <section className="sj-step" id="eixo">
      <div className="df-container sj-grid">
        <div className="sj-copy">
          <p className="sj-kicker">Eixo intestino–cérebro</p>
          <h2>O intestino conversa<br />com o cérebro.</h2>
          <p className="sj-intro">A microbiota participa de uma rede que conecta intestino, sistema imune e cérebro. Explore três caminhos dessa comunicação.</p>
          <Tabs id="axis" labels={pathways.map(item => item.label)} active={pathway} change={setPathway} label="Caminhos do eixo intestino–cérebro" />
          <Illustration kind="axis" active={pathway} />
          <div className="sj-panels">
            {pathways.map((item, index) => <div className={`sj-panel ${pathway === index ? "active" : ""}`} key={item.label} role="tabpanel" id={`axis-panel-${index}`} aria-labelledby={`axis-tab-${index}`} aria-hidden={pathway !== index} inert={pathway !== index}>
              <h3>{item.title}</h3><p>{item.text}</p>
            </div>)}
          </div>
          <ProductConnection id={pathways[pathway].product} text={pathways[pathway].productText} open={open} />
          <a className="sj-source" href="https://pubmed.ncbi.nlm.nih.gov/31460832/" target="_blank" rel="noreferrer">Explore a revisão científica<ArrowUpRight size={14} /></a>
        </div>
      </div>
    </section>
    <div className="df-container sj-to-products"><div><h3>É por isso que cada fórmula é diferente.</h3><p>Conheça os ativos e a proposta de cada produto para escolher com mais clareza e orientação.</p></div><a className="button" href="#produtos">Encontre a sua fórmula<ArrowRight size={17} /></a></div>
  </section>;
}
