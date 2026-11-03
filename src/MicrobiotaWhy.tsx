import { ArrowDown, ArrowUpRight, Check, ShieldCheck, Sprout } from "lucide-react";

const steps = [
  { title: "Nutrir a microbiota", text: "Fibras da alimentação nutrem microrganismos benéficos." },
  { title: "Cuidar da barreira intestinal", text: "A microbiota interage com as defesas e a barreira intestinal." },
  { title: "Conectar intestino e cérebro", text: "Nervos e moléculas conectam digestão, saciedade e estresse." },
];
const connections = [
  { title: "Digestão e conforto intestinal", text: "A microbiota participa do aproveitamento dos alimentos.", source: "https://nigms.nih.gov/biobeat/2024/03/what-is-the-microbiome" },
  { title: "Defesas naturais", text: "Interage com o sistema imune e a barreira intestinal.", source: "https://nigms.nih.gov/biobeat/2024/03/what-is-the-microbiome" },
  { title: "Fome e saciedade", text: "Sinais do intestino ajudam o cérebro a regular o apetite.", source: "https://pubmed.ncbi.nlm.nih.gov/28356427/" },
  { title: "Estresse e sono", text: "Conexões estudadas na comunicação intestino–cérebro.", source: "https://pubmed.ncbi.nlm.nih.gov/37023468/" },
  { title: "Saúde da pele", text: "Integra a comunicação entre intestino, pele e defesas.", source: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11901370/" },
];

export function MicrobiotaWhy() {
  return <section id="por-que-cuidar" className="mw-section" aria-labelledby="microbiota-why-title">
    <div className="df-container">
      <header className="mw-heading"><span><Sprout size={16}/>Saúde de dentro para fora</span><h2 id="microbiota-why-title">Por que cuidar da sua microbiota?</h2></header>
      <div className="mw-panels">
        <article className="mw-panel mw-how">
          <svg className="mw-molecular-trace" viewBox="0 0 210 100" fill="none" aria-hidden="true"><path d="M5 85Q70-10 125 52T205 15"/><path className="mw-moving-trace" d="M5 85Q70-10 125 52T205 15"/><circle cx="48" cy="44" r="5"/><circle cx="125" cy="52" r="7"/><circle cx="185" cy="38" r="4"/></svg>
          <h3>Como esse cuidado funciona?</h3>
          <p className="mw-intro">Seu intestino faz mais do que digerir alimentos. A microbiota participa das defesas do corpo e da comunicação com o cérebro. Cuidar dela é apoiar uma rede que conecta diferentes aspectos da sua saúde.</p>
          <ol className="mw-steps">{steps.map((step, index) => <li key={step.title}><span className="mw-step-number" aria-hidden="true">{"0"+(index+1)}</span><div><h4>{step.title}</h4><p>{step.text}</p></div></li>)}</ol>
          <p className="mw-routine">Alimentação, sono e acompanhamento profissional fazem parte desse cuidado.</p>
        </article>
        <article className="mw-panel mw-connections">
          <h3><span className="mw-shield"><ShieldCheck size={20}/></span>Além da digestão</h3>
          <ul>{connections.map(item => <li key={item.title}><a href={item.source} target="_blank" rel="noreferrer" aria-label={"Ver a pesquisa sobre "+item.title}><span className="mw-check"><Check size={16}/></span><div><h4>{item.title}</h4><p>{item.text}</p></div><ArrowUpRight className="mw-source-arrow" size={15}/></a></li>)}</ul>
        </article>
      </div>
      <a className="mw-next" href="#ciencia">Explore essas conexões<ArrowDown size={16}/></a>
    </div>
  </section>;
}

