import { useState } from "react";
import { ArrowRight, ArrowUpRight, Brain, FlaskConical, Leaf, Pause, Play, Plus, ShieldCheck, Sprout, Zap } from "lucide-react";
import { products, type Product } from "./catalog";
import { IntestineIcon } from "./IntestineIcon";

const ingredients = [
  {
    "label": "Prebióticos",
    "title": "O que são prebióticos?",
    "text": "São substâncias que alimentam microrganismos benéficos do intestino, ajudando essa comunidade a exercer suas funções.",
    "benefits": "Podem favorecer a regularidade intestinal e a saúde digestiva. O efeito depende do tipo e da quantidade utilizada.",
    "source": "https://isappscience.org/wp-content/uploads/2019/04/Prebiotics_Infographic_rev1029.pdf",
    "sourceLabel": "Veja os benefícios na ISAPP",
    "visualTitle": "Nutrir a microbiota é cuidar do intestino",
    "caption": "O alimento para os microrganismos ajuda a sustentar as funções dessa comunidade.",
    "product": "gutcare",
    "productText": "GUTcare reúne Lactobacillus, Bifidobacterium e o prebiótico FOS para complementar o cuidado com a microbiota e a saúde intestinal."
  },
  {
    "label": "Probióticos",
    "title": "O que são probióticos?",
    "text": "São microrganismos vivos que, consumidos em quantidades adequadas, oferecem benefícios à saúde.",
    "benefits": "Podem ajudar no conforto digestivo e nas defesas naturais. Os benefícios dependem da cepa, da dose e do uso estudado.",
    "source": "https://isappscience.org/resource/health-benefits-of-probiotics/",
    "sourceLabel": "Veja os benefícios na ISAPP",
    "visualTitle": "Microrganismos com funções específicas",
    "caption": "Cada cepa tem características próprias: a escolha depende do benefício pesquisado.",
    "product": "immune",
    "productText": "Immune combina Lactobacillus, Bifidobacterium, FOS, inulina e beta-glucanas em uma fórmula voltada ao cuidado da microbiota e das defesas naturais."
  },
  {
    "label": "Simbióticos",
    "title": "O que são simbióticos?",
    "text": "São combinações de microrganismos vivos e substâncias que alimentam a microbiota, com benefício à saúde demonstrado para o conjunto.",
    "benefits": "Podem apoiar a saúde intestinal e a função imune. Os resultados dependem da combinação e das quantidades avaliadas em estudos.",
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7581511/",
    "sourceLabel": "Leia o consenso científico",
    "visualTitle": "Microrganismos e alimento, juntos",
    "caption": "A proposta reúne os dois componentes; o benefício precisa ser avaliado na combinação.",
    "product": "concentra",
    "productText": "Concentra+ reúne Lactobacillus, Bifidobacterium, GOS e FOS, combinando microrganismos e seu alimento em uma proposta de cuidado com a microbiota."
  }
];

const pathways = [
  {
    "label": "Nervos",
    "title": "Como os nervos participam?",
    "text": "O nervo vago leva sinais entre intestino e cérebro e participa do controle da digestão.",
    "benefits": "Essa via ajuda a coordenar a digestão e a resposta ao estresse. Sono, alimentação e rotina de cuidado participam desse equilíbrio.",
    "visualTitle": "Uma comunicação em duas direções",
    "caption": "O cérebro influencia o intestino, e os sinais do intestino também chegam ao cérebro.",
    "icon": Zap,
    "product": "concentra",
    "productText": "Concentra+ reúne cepas probióticas, colina e B6. A B6 participa da produção de neurotransmissores, ligando a proposta ao cuidado nutricional do sistema nervoso."
  },
  {
    "label": "Metabólitos",
    "title": "O que são metabólitos?",
    "text": "Ao aproveitar componentes dos alimentos, a microbiota produz moléculas que atuam no intestino e enviam sinais ao organismo.",
    "benefits": "Algumas nutrem células intestinais e apoiam a barreira do intestino. Uma alimentação variada e rica em fibras favorece essa produção.",
    "visualTitle": "Moléculas que conectam funções",
    "caption": "Compostos produzidos pela microbiota participam da nutrição intestinal e da sinalização.",
    "icon": FlaskConical,
    "product": "gutcare",
    "productText": "GUTcare reúne quatro cepas e FOS. Esse prebiótico pode ser fermentado pela microbiota, conectando a fórmula ao cuidado com a produção de metabólitos intestinais."
  },
  {
    "label": "Imunidade",
    "title": "Como as defesas entram nessa conversa?",
    "text": "A microbiota interage com as células de defesa e a barreira intestinal. Essa rede envia sinais que também participam da comunicação com o cérebro.",
    "benefits": "O equilíbrio dessa rede ajuda a proteger o intestino e regular as respostas de defesa. Cuidar da microbiota faz parte desse suporte.",
    "visualTitle": "Microbiota e defesas em conexão",
    "caption": "A barreira intestinal e as células de defesa fazem parte dessa rede de comunicação.",
    "icon": ShieldCheck,
    "product": "immune",
    "productText": "Immune reúne cepas probióticas, FOS, inulina e beta-glucanas para complementar o cuidado nutricional com a microbiota e as defesas naturais."
  }
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
              <h3>{item.title}</h3><p>{item.text}</p><p className="sj-benefits"><strong>Benefícios: </strong>{item.benefits}</p>
              <a className="sj-research" href={item.source} target="_blank" rel="noreferrer">{item.sourceLabel}<ArrowUpRight size={14}/></a>
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
          <p className="sj-intro">Os microrganismos do intestino produzem moléculas e interagem com nervos e células de defesa. Esses sinais participam da comunicação com o cérebro, ligada à digestão e à resposta ao estresse. Entenda essas conexões.</p>
          <Tabs id="axis" labels={pathways.map(item => item.label)} active={pathway} change={setPathway} label="Caminhos do eixo intestino–cérebro" />
          <Illustration kind="axis" active={pathway} />
          <div className="sj-panels">
            {pathways.map((item, index) => <div className={`sj-panel ${pathway === index ? "active" : ""}`} key={item.label} role="tabpanel" id={`axis-panel-${index}`} aria-labelledby={`axis-tab-${index}`} aria-hidden={pathway !== index} inert={pathway !== index}>
              <h3>{item.title}</h3><p>{item.text}</p><p className="sj-benefits"><strong>Por que importa: </strong>{item.benefits}</p><a className="sj-research" href="https://pubmed.ncbi.nlm.nih.gov/31460832/" target="_blank" rel="noreferrer">Leia a revisão científica<ArrowUpRight size={14}/></a>
            </div>)}
          </div>
          <ProductConnection id={pathways[pathway].product} text={pathways[pathway].productText} open={open} />
        </div>
      </div>
    </section>
    <div className="df-container sj-to-products"><div><h3>É por isso que cada fórmula é diferente.</h3><p>Conheça os ativos e a proposta de cada produto para escolher com mais clareza e orientação.</p></div><a className="button" href="#produtos">Encontre a sua fórmula<ArrowRight size={17} /></a></div>
  </section>;
}
