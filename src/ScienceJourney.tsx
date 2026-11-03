import { useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Brain, FlaskConical, Leaf, Pause, Play, Plus, ShieldCheck, Sprout, Zap } from "lucide-react";
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
    }}>{text}</button>)}
  </div>;
}

function Illustration({ kind, active }: { kind: "ingredients" | "axis"; active: number }) {
  const [paused, setPaused] = useState(false);
  const isAxis = kind === "axis";
  const ingredient = ingredients[active];
  const pathway = pathways[active];
  const SignalIcon = pathway.icon;
  return <figure className={`sj-visual ${paused ? "is-paused" : ""}`}>
    <figcaption className="sj-visual-title">{isAxis ? pathway.visualTitle : ingredient.visualTitle}</figcaption>
    <button className="sj-pause" aria-label={paused ? "Reproduzir ilustração" : "Pausar ilustração"} aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? <Play size={15} /> : <Pause size={15} />}</button>
    <div className="sj-scene" key={`${kind}-${active}`}>
      <div className="sj-flow">
        <div className="sj-node">
          <div className="sj-symbol">{isAxis ? <IntestineIcon /> : active === 0 ? <Sprout /> : active === 1 ? <MicrobesIcon /> : <div className="sj-symbol-pair"><MicrobesIcon /><Plus size={15} /><Sprout /></div>}</div>
          <span>{isAxis ? <>Intestino<br />e microbiota</> : ingredient.from}</span>
        </div>
        <div className={`sj-connection ${isAxis ? "sj-two-way" : ""}`}>
          <svg viewBox="0 0 130 88" fill="none" aria-hidden="true">
            <path className="sj-track" d={isAxis ? "M6 25H124" : "M6 48H124"} />
            <path className="sj-arrow" d={isAxis ? "m116 19 8 6-8 6" : "m116 42 8 6-8 6"} />
            <circle className="sj-particle sj-forward" cx="6" cy={isAxis ? 25 : 48} r="4" />
            {!isAxis && active === 2 && <rect className="sj-particle sj-forward sj-delayed" x="3" y="45" width="7" height="7" rx="1.5" />}
            {isAxis && <><path className="sj-track" d="M124 65H6" /><path className="sj-arrow" d="m14 59-8 6 8 6" /><circle className="sj-particle sj-backward" cx="124" cy="65" r="4" /></>}
            {!isAxis && <text x="65" y="24" textAnchor="middle">{ingredient.verb}</text>}
          </svg>
          {isAxis && <div className="sj-signal-icon"><SignalIcon size={20} /></div>}
        </div>
        <div className="sj-node">
          <div className="sj-symbol sj-destination">{isAxis ? <Brain /> : active === 0 ? <MicrobesIcon /> : <IntestineIcon />}</div>
          <span>{isAxis ? "Cérebro" : ingredient.to}</span>
        </div>
      </div>
      <p className="sj-visual-caption">{isAxis ? pathway.caption : ingredient.caption}</p>
    </div>
    <small>Ilustração conceitual. Movimento sem escala de tempo.</small>
  </figure>;
}

function ProductConnection({ id, text, open }: { id: string; text: string; open: (product: Product) => void }) {
  const product = products.find(item => item.id === id)!;
  return <aside className="sj-product-note">
    <span><Leaf size={15} />Nas fórmulas DalFlore</span>
    <p>{text}</p>
    <button onClick={() => open(product)}>Conhecer {product.name}<ArrowUpRight size={16} /></button>
  </aside>;
}

export function ScienceJourney({ open }: { open: (product: Product) => void }) {
  const [ingredient, setIngredient] = useState(0);
  const [pathway, setPathway] = useState(0);
  return <section className="sj-journey" aria-label="A ciência por trás das fórmulas DalFlore">
    <section className="sj-step" id="ciencia">
      <div className="df-container sj-grid">
        <div className="sj-copy">
          <p className="sj-kicker">Comece pela microbiota</p>
          <h2>Um cuidado que começa<br />no seu intestino.</h2>
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
    <div className="df-container sj-continuation"><span /><p>Essa história começa no intestino.<br /><strong>Mas a conversa vai além dele.</strong></p><ArrowDown size={22} /></div>
    <section className="sj-step" id="eixo">
      <div className="df-container sj-grid">
        <div className="sj-copy">
          <p className="sj-kicker">Entenda a conexão</p>
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
