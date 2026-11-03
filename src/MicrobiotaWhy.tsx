import { ArrowUpRight, Check, ShieldCheck } from "lucide-react";

const steps = [
  { title: "Nutrir a microbiota", text: "Fibras da alimentação nutrem microrganismos benéficos." },
  { title: "Barreira e defesas", text: "A microbiota interage com as defesas e a barreira intestinal." },
  { title: "Intestino e cérebro", text: "Nervos e moléculas conectam digestão, saciedade e estresse." },
];
const connections = [
  { title: "Digestão e conforto intestinal", text: "Ajuda a aproveitar componentes dos alimentos.", source: "https://nigms.nih.gov/biobeat/2024/03/what-is-the-microbiome" },
  { title: "Defesas naturais", text: "Participa das defesas e da barreira intestinal.", source: "https://nigms.nih.gov/biobeat/2024/03/what-is-the-microbiome" },
  { title: "Fome e saciedade", text: "Participa dos sinais que regulam o apetite.", source: "https://pubmed.ncbi.nlm.nih.gov/28356427/" },
  { title: "Estresse e sono", text: "Uma relação estudada no eixo intestino–cérebro.", source: "https://pubmed.ncbi.nlm.nih.gov/37023468/" },
  { title: "Saúde da pele", text: "Conexões entre intestino, pele e defesas.", source: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11901370/" },
];

export function MicrobiotaWhy() {
  return <section id="por-que-cuidar" className="mw-section" aria-labelledby="microbiota-why-title">
    <div className="df-container">
      <div className="mw-panels">
        <article className="mw-panel mw-how">
          <svg className="mw-molecular-trace" viewBox="0 0 210 100" fill="none" aria-hidden="true"><path d="M5 85Q70-10 125 52T205 15"/><path className="mw-moving-trace" d="M5 85Q70-10 125 52T205 15"/><circle cx="48" cy="44" r="5"/><circle cx="125" cy="52" r="7"/><circle cx="185" cy="38" r="4"/></svg>
          <h3 id="microbiota-why-title">Por que cuidar da sua microbiota?</h3>
          <p className="mw-intro">Seu intestino vai além da digestão. A microbiota participa das defesas e conversa com o cérebro, conectando diferentes aspectos da sua saúde.</p>
          <ol className="mw-steps">{steps.map((step, index) => <li key={step.title}><span className="mw-step-number" aria-hidden="true">{"0"+(index+1)}</span><div><h4>{step.title}</h4><p>{step.text}</p></div></li>)}</ol>
        </article>
        <article className="mw-panel mw-connections">
          <h3><span className="mw-shield"><ShieldCheck size={20}/></span>Além da digestão</h3>
          <ul>{connections.map(item => <li key={item.title}><a href={item.source} target="_blank" rel="noreferrer" aria-label={"Ver a pesquisa sobre "+item.title}><span className="mw-check"><Check size={16}/></span><div><h4>{item.title}</h4><p>{item.text}</p></div><ArrowUpRight className="mw-source-arrow" size={15}/></a></li>)}</ul>
        </article>
      </div>
    </div>
  </section>;
}

