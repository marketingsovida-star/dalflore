import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type CSSProperties,
} from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Brain,
  Check,
  Plus,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  FlaskConical,
  Headphones,
  Heart,
  Instagram,
  Leaf,
  Menu,
  Microscope,
  Search,
  ShoppingBag,
  Sprout,
  Trash2,
  Truck,
  UserRound,
  X,
} from "lucide-react";
import {
  asset,
  brl,
  categories,
  checkoutUrl,
  price,
  products,
  whatsapp,
  type Product,
  type Quantity,
} from "./catalog";

import { useSmoothMotion } from "./useSmoothMotion";

type CartItem = { id: string; quantity: Quantity; count: number };
type ModalState =
  | { kind: "product"; id: string }
  | { kind: "search" | "cart" | "privacy" }
  | null;
const getProductHash = (): ModalState => {
  const id = window.location.hash.replace("#produto/", "");
  return window.location.hash.startsWith("#produto/") &&
    products.some((p) => p.id === id)
    ? { kind: "product", id }
    : null;
};
const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
const productPhoto = (p: Product) => asset(`products/${p.image}.webp`);
function readCart(): CartItem[] {
  try {
    const value: unknown = JSON.parse(
      localStorage.getItem("dalflore-cart-v1") || "[]",
    );
    return Array.isArray(value)
      ? value.filter(
          (i): i is CartItem =>
            !!i &&
            products.some((p) => p.id === i.id && p.basePrice !== null) &&
            [1, 3, 6].includes(i.quantity) &&
            Number.isInteger(i.count) &&
            i.count > 0 &&
            i.count <= 20,
        )
      : [];
  } catch {
    return [];
  }
}
function Overlay({
  title,
  type,
  close,
  children,
}: {
  title: string;
  type: string;
  close: () => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const closing = useRef(false);
  const closeTimer = useRef<number | undefined>(undefined);
  const requestClose = () => {
    if (closing.current) return;
    closing.current = true;
    ref.current?.classList.add("is-closing");
    closeTimer.current = window.setTimeout(
      close,
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 260,
    );
  };
  useEffect(() => {
    const el = ref.current!;
    const previous = document.activeElement as HTMLElement | null;
    el.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(closeTimer.current);
      el.close();
      document.body.style.overflow = overflow;
      previous?.focus({ preventScroll: true });
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={`overlay overlay-${type}`}
      aria-label={title}
      onCancel={(e) => {
        e.preventDefault();
        requestClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) requestClose();
      }}
    >
      <div className="modal-surface">
        <header className="modal-header">
          <span>{title}</span>
          <button
            className="icon-button"
            aria-label="Fechar janela"
            onClick={requestClose}
          >
            <X size={22} />
          </button>
        </header>
        {children}
      </div>
    </dialog>
  );
}
function QuantityPicker({
  quantity,
  onChange,
  name,
}: {
  quantity: Quantity;
  onChange: (q: Quantity) => void;
  name: string;
}) {
  return (
    <div
      className="quantities"
      role="group"
      aria-label={`Quantidade de ${name}`}
    >
      {([1, 3, 6] as Quantity[]).map((q) => (
        <button
          key={q}
          aria-pressed={q === quantity}
          onClick={() => onChange(q)}
        >
          {q} {q === 1 ? "frasco" : "frascos"}
          {q === 6 && name !== "Hair & Skin" && <span>melhor valor</span>}
        </button>
      ))}
    </div>
  );
}
function ProductCard({
  product: p,
  open,
  add,
}: {
  product: Product;
  open: (p: Product) => void;
  add: (p: Product, q: Quantity) => void;
}) {
  const [quantity, setQuantity] = useState<Quantity>(1);
  const total = price(p, quantity);
  return (
    <article
      className="product-card"
      style={{ "--product-color": p.color } as CSSProperties}
    >
      <button
        className="product-media"
        onClick={() => open(p)}
        aria-label={`Conhecer ${p.name}`}
      >
        <img
          src={productPhoto(p)}
          alt={`Frasco DalFlore ${p.name}`}
          width="680"
          height="920"
          loading="lazy"
        />
        <span className="image-hint">
          Conheça a fórmula <ArrowUpRight size={15} />
        </span>
      </button>
      <div className="product-body">
        <p className="eyebrow category">{p.category}</p>
        <h3>
          <button onClick={() => open(p)}>{p.name}</button>
        </h3>
        <p className="product-summary">{p.summary}</p>
        <div className="product-price">
          {total !== null ? (
            <>
              <div>{brl(total)}</div>
              <span>
                à vista ·{" "}
                {quantity > 1
                  ? `${brl(total / quantity)} por frasco`
                  : `${p.capsules} cápsulas por frasco`}
              </span>
              <small>
                <Truck size={13} />
                {total >= 150 ? "Frete grátis" : "Frete calculado no checkout"}
                <i>·</i> Até 12x no cartão
              </small>
            </>
          ) : (
            <>
              <div className="consult-price">Consulte o valor</div>
              <span>{p.capsules} cápsulas por frasco</span>
              <small>Disponibilidade pelo atendimento</small>
            </>
          )}
        </div>
        <button className="composition-link" onClick={() => open(p)}>
          Ver composição e modo de uso <ArrowUpRight size={13} />
        </button>
        <QuantityPicker
          quantity={quantity}
          onChange={setQuantity}
          name={p.name}
        />
        {total === null ? (
          <a
            className="button buy"
            href={checkoutUrl(p, quantity)}
            target="_blank"
            rel="noreferrer"
          >
            Consultar no WhatsApp <ArrowUpRight size={15} />
          </a>
        ) : (
          <button className="button buy" onClick={() => add(p, quantity)}>
            Adicionar ao carrinho <ShoppingBag size={15} />
          </button>
        )}
        <div className="payments" aria-label="Pix e cartão de crédito">
          <span>PIX</span>
          <b>VISA</b>
          <span>mastercard</span>
          <b>elo</b>
          <span>AMEX</span>
        </div>
      </div>
    </article>
  );
}
function BotanicalDetail() {
  return (
    <svg
      className="botanical-detail"
      viewBox="0 0 240 360"
      fill="none"
      aria-hidden="true"
    >
      <g
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M58 339C88 285 112 225 124 167C135 113 132 66 119 24" />
        <path d="M125 161C89 146 69 117 77 81C112 94 130 123 125 161ZM130 121C158 104 171 76 161 46C136 66 126 93 130 121ZM112 218C77 207 55 182 57 150C91 159 112 185 112 218ZM99 254C131 242 153 215 150 181C117 191 99 220 99 254ZM78 298C48 293 25 273 24 244C55 246 75 268 78 298ZM127 81C101 69 87 48 91 21C116 31 129 54 127 81ZM115 200C149 186 170 158 164 125C133 139 115 168 115 200" />
        <path
          opacity=".6"
          d="M125 161L77 81M130 121L161 46M112 218L57 150M99 254L150 181M78 298L24 244M127 81L91 21M115 200L164 125"
        />
      </g>
    </svg>
  );
}

const slides = [
  {
    title: (
      <>
        Seu equilíbrio
        <br /> começa <em>por dentro.</em>
      </>
    ),
    label: "MICROBIOTA · CIÊNCIA · CUIDADO",
    text: "Um novo olhar para a sua saúde. Probióticos, prebióticos e nutrientes, com a ciência como ponto de partida e você no centro do cuidado.",
    primary: "gutcare",
    secondary: "concentra",
    cta: "Conhecer o GUTcare",
    tag: "SAÚDE INTESTINAL",
    sub: "Quatro cepas + FOS",
  },
  {
    title: (
      <>
        Corpo e mente.
        <br /> <em>Uma só conexão.</em>
      </>
    ),
    label: "EIXO INTESTINO–CÉREBRO",
    text: "O intestino e o cérebro conversam o tempo todo. Conheça a fórmula que reúne cepas probióticas, prebióticos, colina e vitamina B6 ativa.",
    primary: "concentra",
    secondary: "gutcare",
    cta: "Conhecer o Concentra+",
    tag: "FOCO E COGNIÇÃO",
    sub: "Cinco cepas + GOS + FOS",
  },
  {
    title: (
      <>
        Ciência que cuida.
        <br /> <em>Você que floresce.</em>
      </>
    ),
    label: "O UNIVERSO DALFLORE",
    text: "Cada corpo tem sua história. Descubra fórmulas pensadas para diferentes momentos, com ingredientes transparentes e um olhar humano para a sua rotina.",
    primary: "immune",
    secondary: "cycle",
    cta: "Explorar as fórmulas",
    tag: "CUIDADO INTEGRADO",
    sub: "Conhecimento em cada escolha",
  },
];
function Hero({ open }: { open: (p: Product) => void }) {
  const [slide, setSlide] = useState(0);
  const s = slides[slide];
  const primary = products.find((p) => p.id === s.primary)!;
  const secondary = products.find((p) => p.id === s.secondary)!;
  return (
    <section
      className="hero"
      aria-label="Conheça a DalFlore"
      aria-roledescription="carrossel"
    >
      <div className="hero-inner" key={slide}>
        <div className="hero-copy">
          <div className="hero-meta">
            <div
              className="slide-dots"
              role="group"
              aria-label="Selecionar destaque"
            >
              {slides.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Destaque ${i + 1}`}
                  aria-pressed={slide === i}
                  onClick={() => setSlide(i)}
                />
              ))}
            </div>
            <span>{s.label}</span>
          </div>
          <h1>{s.title}</h1>
          <p className="hero-lead">{s.text}</p>
          <button
            className="button hero-cta"
            onClick={() =>
              slide === 2
                ? document
                    .getElementById("produtos")
                    ?.scrollIntoView({ behavior: "smooth" })
                : open(primary)
            }
          >
            {s.cta}
            <ArrowRight size={18} />
          </button>
          <div className="hero-perks">
            <span>
              <Check size={14} />
              Criada pela Dra. Aline Dalmazo
            </span>
            <span>
              <Check size={14} />
              Composição transparente
            </span>
          </div>
        </div>
        <div className="hero-art">
          <BotanicalDetail />
          <div className="orbital orbital-one" />
          <div className="orbital orbital-two" />
          <span className="orbit-dot dot-one" />
          <span className="orbit-dot dot-two" />
          <span className="art-note note-top">
            <Microscope size={21} />
            <span>
              Ciência encontra
              <br />
              <strong>equilíbrio natural.</strong>
            </span>
          </span>
          <button
            className="hero-bottle secondary-bottle"
            onClick={() => open(secondary)}
            aria-label={`Conhecer ${secondary.name}`}
          >
            <img
              src={productPhoto(secondary)}
              alt={`DalFlore ${secondary.name}`}
              width="680"
              height="920"
            />
          </button>
          <button
            className="hero-bottle main-bottle"
            onClick={() => open(primary)}
            aria-label={`Saiba como funciona ${primary.name}`}
          >
            <img
              src={productPhoto(primary)}
              alt={`DalFlore ${primary.name}`}
              width="680"
              height="920"
              fetchPriority="high"
            />
          </button>
          <div className="art-caption">
            <span className="little-line" />
            <span>
              <b>{s.tag}</b>
              <small>{s.sub}</small>
            </span>
            <button
              onClick={() => open(primary)}
              aria-label={`Ler sobre ${primary.name}`}
            >
              <ArrowUpRight size={20} />
            </button>
          </div>
          <span className="art-coordinate">
            DALFLORE / CIÊNCIA PARA FLORESCER
          </span>
        </div>
      </div>
      <div className="hero-bottom">
        <a href="#ciencia">
          Explore o seu universo interior <ArrowDown size={15} />
        </a>
        <div>
          <button
            className="icon-button"
            aria-label="Destaque anterior"
            onClick={() => setSlide((slide + 2) % 3)}
          >
            <ChevronLeft size={18} />
          </button>
          <span>
            0{slide + 1} <i>/ 03</i>
          </span>
          <button
            className="icon-button"
            aria-label="Próximo destaque"
            onClick={() => setSlide((slide + 1) % 3)}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
const education = [
  {
    label: "Prebióticos",
    simple: "O alimento de parte da sua microbiota.",
    example: "FOS, GOS e inulina",
    icon: Sprout,
    title: "Nutrir quem cuida de você.",
    text: "Prebióticos são substâncias utilizadas seletivamente por microrganismos do nosso corpo e que, em quantidades adequadas, conferem benefícios à saúde. Pense neles como alimento para parte da sua microbiota.",
    detail:
      "FOS, GOS e inulina são exemplos presentes em algumas fórmulas DalFlore. Nem toda fibra é um prebiótico, e a quantidade consumida também importa.",
    source: "https://isappscience.org/resource/prebiotics/",
    sourceLabel: "Conheça a definição da ISAPP",
  },
  {
    label: "Probióticos",
    simple: "A função depende da cepa, da dose e do contexto.",
    example: "Cepas de Lactobacillus e Bifidobacterium",
    icon: Microscope,
    title: "Microrganismos. Funções específicas.",
    text: "Probióticos são microrganismos vivos que, quando administrados em quantidades adequadas, conferem benefícios à saúde. Diferentes cepas podem ter funções diferentes.",
    detail:
      "O nome da cepa e a quantidade em UFC ajudam a identificar a composição. Mais cepas ou mais bilhões não significam, por si só, uma fórmula melhor para você.",
    source:
      "https://isappscience.org/resource/probiotics-prebiotics-synbiotics-postbiotics-and-fermented-foods-defined/",
    sourceLabel: "Explore os conceitos da ISAPP",
  },
  {
    label: "Simbióticos",
    simple: "Microrganismos e substratos, em uma combinação com propósito.",
    example: "Uma combinação avaliada em conjunto",
    icon: FlaskConical,
    title: "Uma combinação que tem propósito.",
    text: "Simbióticos combinam microrganismos vivos e substratos utilizados seletivamente por microrganismos do hospedeiro, com benefício à saúde. A escolha da combinação deve ter fundamento.",
    detail:
      "Combinar ingredientes é só o começo. A avaliação considera cepas, doses, qualidade e evidências para o uso proposto, sempre dentro do contexto de cada pessoa.",
    source:
      "https://isappscience.org/resource/probiotics-prebiotics-synbiotics-postbiotics-and-fermented-foods-defined/",
    sourceLabel: "Entenda a definição científica",
  },
];
function Science() {
  const [active, setActive] = useState(0);
  return (
    <section id="ciencia" className="science section wrap">
      <div className="section-heading">
        <p className="eyebrow section-label">
          <Microscope size={16} /> A CIÊNCIA POR TRÁS DO CUIDADO
        </p>
        <h2>
          Um universo vivo.
          <br />
          <em>Dentro de você.</em>
        </h2>
        <p>
          Sua microbiota é um ecossistema. Entender como ela funciona
          <br className="desktop-break" /> é o primeiro passo para cuidar melhor
          de você.
        </p>
      </div>
      <div className="science-layout">
        <div className="microbiota-art" aria-hidden="true">
          <span className="figure-caption">O seu jardim interior</span>
          <BotanicalDetail />
          <div className="micro-ring ring-a" />
          <div className="micro-ring ring-b" />
          <div className="micro-ring ring-c" />
          <div className="micro-center">
            <Sprout size={58} strokeWidth={1} />
            <span>
              SEU ECOSSISTEMA
              <br />
              <b>INTERIOR</b>
            </span>
          </div>
          {Array.from({ length: 12 }, (_, i) => (
            <span
              className={`microbe m-${i}`}
              key={i}
              style={{ "--i": i } as CSSProperties}
            />
          ))}
          <div className="micro-label micro-label-a">diversidade</div>
          <div className="micro-label micro-label-b">nutrição</div>
          <div className="micro-label micro-label-c">equilíbrio</div>
          <span className="art-index">01 — MICROBIOTA INTESTINAL</span>
        </div>
        <div className="science-copy">
          <div
            className="education-tabs"
            role="tablist"
            aria-label="Entenda os ingredientes"
          >
            {education.map((item, i) => (
              <button
                id={`science-tab-${i}`}
                key={item.label}
                role="tab"
                aria-selected={i === active}
                aria-controls={`science-panel-${i}`}
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => {
                  if (["ArrowRight", "ArrowLeft"].includes(e.key)) {
                    e.preventDefault();
                    const n = (active + (e.key === "ArrowRight" ? 1 : 2)) % 3;
                    setActive(n);
                    document.getElementById(`science-tab-${n}`)?.focus();
                  }
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="education-stack">
            {education.map((content, index) => {
              const Icon = content.icon;
              return (
                <div
                  key={index}
                  id={`science-panel-${index}`}
                  role="tabpanel"
                  aria-labelledby={`science-tab-${index}`}
                  aria-hidden={active !== index}
                  inert={active !== index}
                  className={`education-panel ${active === index ? "active" : ""}`}
                >
                  <span className="round-icon">
                    <Icon size={26} />
                  </span>
                  <div className="science-topic-meta">
                    <span>0{index + 1} / ENTENDA A DIFERENÇA</span>
                    <span>{content.label}</span>
                  </div>
                  <h3>{content.title}</h3>
                  <p className="science-simple">{content.simple}</p>
                  <p>{content.text}</p>
                  <div className="science-detail">
                    <span className="eyebrow">NA PRÁTICA</span>
                    <p>{content.detail}</p>
                    <span className="ingredient-note">
                      <Leaf size={15} />
                      {content.example}
                    </span>
                  </div>
                  <a
                    className="text-link"
                    href={content.source}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {content.sourceLabel}
                    <ArrowUpRight size={15} />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
function GutIcon() {
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <path
        d="M30 20c-17 0-20 14-20 25v26c0 12 11 17 18 11 8 9 18 9 25 1 8 7 23 1 23-9V46c0-11-14-15-19-6-7-9-21-8-25 2-7-7-16-1-16 7m14-29v13m2 10v24m25-25v22M33 56h24M33 72h24M75 60h12V34c0-13-9-20-21-20H43"
        stroke="currentColor"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
const axes = [
  {
    label: "Via neural",
    title: "Uma conversa em duas direções.",
    body: "O nervo vago e o sistema nervoso entérico participam da comunicação entre intestino e cérebro. Sinais viajam nos dois sentidos: do intestino para o cérebro e do cérebro para o intestino.",
    foot: "Digestão, sensações e respostas ao estresse fazem parte dessa rede.",
  },
  {
    label: "Via metabólica",
    title: "Pequenas moléculas, novas conexões.",
    body: "Ao utilizar componentes da alimentação, a microbiota produz metabólitos, como os ácidos graxos de cadeia curta. Esses compostos podem participar de sinais locais e sistêmicos.",
    foot: "Alimentação, diversidade microbiana e contexto individual importam.",
  },
  {
    label: "Via imune",
    title: "Sistemas que trabalham juntos.",
    body: "A microbiota interage com a barreira intestinal e com o sistema imune. Sinais imunológicos também participam da comunicação com outros sistemas do corpo, incluindo o nervoso.",
    foot: "A ciência ainda investiga como traduzir esses mecanismos em intervenções clínicas.",
  },
];
function Axis() {
  const [active, setActive] = useState(0);
  return (
    <section className="axis-section" id="eixo">
      <div className="wrap axis-layout">
        <div className="axis-copy">
          <p className="eyebrow section-label">
            <Brain size={16} /> EIXO INTESTINO–CÉREBRO
          </p>
          <h2>
            O que acontece no intestino
            <br />{" "}
            <em>
              faz parte de uma
              <br /> conversa maior.
            </em>
          </h2>
          <p>
            Seu corpo funciona em conexão. Conheça três caminhos estudados pela
            ciência nessa comunicação.
          </p>
          <div
            className="axis-tabs"
            role="tablist"
            aria-label="Vias do eixo intestino–cérebro"
          >
            {axes.map((a, i) => (
              <button
                id={`axis-tab-${i}`}
                role="tab"
                aria-controls={`axis-panel-${i}`}
                tabIndex={active === i ? 0 : -1}
                aria-selected={active === i}
                key={a.label}
                onClick={() => setActive(i)}
                onKeyDown={(e) => {
                  if (["ArrowRight", "ArrowLeft"].includes(e.key)) {
                    e.preventDefault();
                    const n = (active + (e.key === "ArrowRight" ? 1 : 2)) % 3;
                    setActive(n);
                    document.getElementById(`axis-tab-${n}`)?.focus();
                  }
                }}
              >
                {a.label}
              </button>
            ))}
          </div>
          <div className="axis-stack">
            {axes.map((path, index) => (
              <div
                className={`axis-text ${active === index ? "active" : ""}`}
                key={index}
                id={`axis-panel-${index}`}
                role="tabpanel"
                aria-labelledby={`axis-tab-${index}`}
                aria-hidden={active !== index}
                inert={active !== index}
              >
                <span className="pathway-index">CONEXÃO 0{index + 1}</span>
                <h3>{path.title}</h3>
                <p>{path.body}</p>
                <small>{path.foot}</small>
              </div>
            ))}
          </div>
          <a
            className="text-link"
            href="https://pubmed.ncbi.nlm.nih.gov/31460832/"
            target="_blank"
            rel="noreferrer"
          >
            Leia a revisão científica <ArrowUpRight size={15} />
          </a>
        </div>
        <div
          className="axis-diagram"
          aria-label="Diagrama: cérebro e intestino se comunicam nas duas direções"
        >
          <span className="diagram-kicker">
            <span className="live-dot" /> UM CORPO. MÚLTIPLAS CONEXÕES.
          </span>
          <div className="brain-node">
            <Brain size={87} strokeWidth={1} />
            <span>CÉREBRO</span>
          </div>
          <div className="connection">
            <span className="signal signal-left" />
            <span className="signal signal-right" />
            <ArrowDown size={25} />
            <span className="connection-label">{axes[active].label}</span>
            <ArrowDown size={25} className="up-arrow" />
          </div>
          <div className="gut-node">
            <GutIcon />
            <span>INTESTINO + MICROBIOTA</span>
          </div>
          <div className="diagram-orbit orbit-a" />
          <div className="diagram-orbit orbit-b" />
          <small>Representação ilustrativa da comunicação bidirecional.</small>
        </div>
      </div>
    </section>
  );
}
function Expert() {
  const [tab, setTab] = useState("marca");
  return (
    <section className="expert-section section" id="aline">
      <div className="wrap">
        <div className="section-heading">
          <p className="eyebrow section-label">
            <Heart size={16} /> CIÊNCIA COM UM OLHAR HUMANO
          </p>
          <h2>
            Conheça quem faz
            <br />
            <em>a DalFlore florescer.</em>
          </h2>
        </div>
        <div className="expert-card">
          <figure className="expert-figure">
            <div className="portrait-frame">
              <img
                src={asset("aline-retrato.webp")}
                alt="Dra. Aline Dalmazo, nutricionista e doutora em Ciências da Saúde, fundadora da DalFlore"
                width="900"
                height="1241"
                loading="lazy"
              />
            </div>
            <figcaption>
              <strong>Dra. Aline Dalmazo</strong>
              <span>Nutricionista · Doutora em Ciências da Saúde</span>
            </figcaption>
          </figure>
          <div className="expert-copy">
            <p className="eyebrow">ESCOLHA QUAL HISTÓRIA QUER LER</p>
            <div
              className="expert-tabs"
              role="tablist"
              aria-label="Sobre a DalFlore e a fundadora"
            >
              {[
                {
                  id: "marca",
                  label: "A história da DalFlore",
                  icon: BookOpen,
                },
                { id: "aline", label: "Quem é a Dra. Aline", icon: UserRound },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  id={`expert-tab-${id}`}
                  role="tab"
                  aria-selected={tab === id}
                  aria-controls={`expert-panel-${id}`}
                  tabIndex={tab === id ? 0 : -1}
                  onClick={() => setTab(id)}
                  onKeyDown={(e) => {
                    if (["ArrowRight", "ArrowLeft"].includes(e.key)) {
                      e.preventDefault();
                      const n = tab === "marca" ? "aline" : "marca";
                      setTab(n);
                      document.getElementById(`expert-tab-${n}`)?.focus();
                    }
                  }}
                >
                  <Icon size={18} />
                  {label}
                </button>
              ))}
            </div>
            <div className="expert-panels">
              <div
                role="tabpanel"
                id="expert-panel-marca"
                aria-labelledby="expert-tab-marca"
                className={tab === "marca" ? "active" : ""}
                aria-hidden={tab !== "marca"}
              >
                <h3>
                  Quando a ciência encontra
                  <br />
                  <em>o equilíbrio natural.</em>
                </h3>
                <p>
                  A DalFlore nasceu para transformar a forma como cuidamos da
                  saúde. Unimos inovação científica, ingredientes puros e uma
                  visão humana do bem-estar.
                </p>
                <p>
                  A inspiração vem da microbiota, o nosso “jardim interno”.
                  Assim como um jardim, ela precisa de cuidado, nutrição e
                  equilíbrio para florescer.
                </p>
                <p>
                  Foi dessa visão que Aline Dalmazo criou uma marca de
                  probióticos, prebióticos e nutracêuticos: um encontro entre
                  conhecimento, natureza e cuidado com pessoas reais.
                </p>
                <p>
                  <strong>
                    Pureza dos ingredientes. Respeito ao corpo humano.
                    Simplicidade que funciona.
                  </strong>
                </p>
                <div className="expert-signoff">
                  Porque quando sua flora floresce,
                  <br />
                  <em>você floresce.</em>
                </div>
              </div>
              <div
                role="tabpanel"
                id="expert-panel-aline"
                aria-labelledby="expert-tab-aline"
                className={tab === "aline" ? "active" : ""}
                aria-hidden={tab !== "aline"}
              >
                <h3>
                  Conhecimento para orientar.
                  <br />
                  <em>Escuta para cuidar.</em>
                </h3>
                <p>
                  <strong>
                    Aline Dalmazo é nutricionista e doutora em Ciências da Saúde
                  </strong>
                  , dedicada ao estudo da microbiota intestinal e da nutrição de
                  precisão.
                </p>
                <p>
                  Sua trajetória reúne pesquisa, prática clínica e
                  acompanhamento de pacientes. A ciência orienta a forma como
                  ela conversa, explica e constrói o cuidado no consultório.
                </p>
                <p>
                  Para Aline, aproximar a ciência da vida cotidiana significa
                  oferecer informação com clareza, considerar a individualidade
                  e ouvir a história de cada pessoa.
                </p>
                <p>
                  Foi da união entre essa trajetória acadêmica e a experiência
                  clínica que nasceu a DalFlore, com o propósito de levar esse
                  olhar para além do consultório.
                </p>
                <div className="expert-signoff">
                  Ciência na escolha.
                  <br />
                  <em>Cuidado em cada conversa.</em>
                </div>
              </div>
            </div>
            <a
              className="button"
              href="https://www.instagram.com/dra.alinedalmazo/"
              target="_blank"
              rel="noreferrer"
            >
              <Instagram size={18} />
              Acompanhe a Dra. Aline <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
const faqs = [
  [
    "Como escolher minha fórmula?",
    "Comece conhecendo a composição, a proposta e o modo de uso de cada produto. A escolha deve considerar sua alimentação, seu histórico e a orientação do profissional que acompanha você.",
  ],
  [
    "Todos os produtos têm probióticos?",
    "Não. O Hair & Skin é uma fórmula de nutrientes e não contém probióticos ou prebióticos na composição. Os demais produtos do catálogo contêm cepas probióticas; confira a composição de cada um.",
  ],
  [
    "Em quanto tempo posso perceber alguma mudança?",
    "A resposta é individual e depende do produto, do objetivo, da rotina e do contexto de saúde. Não há um prazo universal nem garantia de resultado. Converse com seu profissional para definir quando reavaliar o uso.",
  ],
  [
    "Posso combinar mais de uma fórmula?",
    "A combinação precisa ser avaliada individualmente. Fórmulas podem compartilhar nutrientes e cepas, e a soma das doses deve ser considerada por um profissional.",
  ],
  [
    "Como devo consumir e guardar os produtos?",
    "Siga o modo de uso do rótulo e a orientação profissional. Conserve ao abrigo da luz, do calor e da umidade. A composição e as instruções estão disponíveis ao clicar no produto.",
  ],
  [
    "Gestantes e crianças podem utilizar?",
    "Conforme os rótulos, gestantes, nutrizes e crianças até 16 anos somente devem consumir sob orientação de nutricionista ou médico. Se você utiliza medicamentos ou possui alguma condição de saúde, também converse com seu profissional.",
  ],
  [
    "Como funcionam pagamento e frete?",
    "Você pode pagar com Pix ou cartão, com parcelamento em até 12x. O valor final, as condições de pagamento e o prazo de entrega são confirmados no checkout. Frete grátis em pedidos a partir de R$ 150. O Hair & Skin tem valor e disponibilidade consultados pelo atendimento.",
  ],
  [
    "Como falar com a DalFlore?",
    "Você pode conversar com o atendimento pelo WhatsApp (51) 99726-4646, o número presente nos rótulos. Use o botão de atendimento para tirar dúvidas sobre o pedido, disponibilidade ou composição.",
  ],
];
function FAQ() {
  const [openFaq, setOpenFaq] = useState(0);
  return (
    <section className="faq-section" id="duvidas">
      <div className="faq-inner">
        <h2>Perguntas frequentes</h2>
        <div className="faq-items">
          {faqs.map(([q, a], index) => {
            const isOpen = openFaq === index;
            return (
              <div className="faq-item" data-open={isOpen} key={q}>
                <button
                  type="button"
                  id={`faq-q-${index}`}
                  className="faq-question"
                  aria-expanded={isOpen}
                  aria-controls={`faq-a-${index}`}
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                >
                  <span>{q}</span>
                  <span className="faq-toggle" aria-hidden="true">
                    {isOpen ? <X size={16} /> : <Plus size={16} />}
                  </span>
                </button>
                <div
                  id={`faq-a-${index}`}
                  role="region"
                  aria-labelledby={`faq-q-${index}`}
                  aria-hidden={!isOpen}
                  inert={!isOpen}
                  className="faq-answer"
                >
                  <div className="faq-answer-clip">
                    <p>{a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <a
          className="faq-contact"
          href={whatsapp("Olá! Estou no site da DalFlore e tenho uma dúvida.")}
          target="_blank"
          rel="noreferrer"
        >
          <Headphones size={17} />
          Ainda tem dúvidas? Fale com a nossa equipe
        </a>
      </div>
    </section>
  );
}
function ProductDetail({
  product: p,
  add,
}: {
  product: Product;
  add: (p: Product, q: Quantity) => void;
}) {
  const [tab, setTab] = useState("sobre");
  const [q, setQ] = useState<Quantity>(1);
  const total = price(p, q);
  return (
    <div className="detail-content">
      <div className="detail-top">
        <div className="detail-image">
          <img
            src={productPhoto(p)}
            alt={`DalFlore ${p.name}`}
            width="680"
            height="920"
          />
          <span>{p.capsules} cápsulas</span>
        </div>
        <div className="detail-intro">
          <p className="eyebrow">DALFLORE / {p.category}</p>
          <h2>{p.name}</h2>
          <h3>{p.emphasis}</h3>
          <p>{p.description}</p>
          <div className="detail-price">
            {total === null ? "Valor sob consulta" : brl(total)}
            <small>
              {total === null
                ? "Fale com o atendimento"
                : "à vista · condições de parcelamento no checkout"}
            </small>
          </div>
          <QuantityPicker quantity={q} onChange={setQ} name={p.name} />
          {total === null ? (
            <a
              className="button"
              href={checkoutUrl(p, q)}
              target="_blank"
              rel="noreferrer"
            >
              Consultar disponibilidade <ArrowUpRight size={18} />
            </a>
          ) : (
            <button className="button" onClick={() => add(p, q)}>
              Adicionar ao carrinho <ShoppingBag size={17} />
            </button>
          )}
        </div>
      </div>
      <div
        className="detail-tabs"
        role="tablist"
        aria-label={`Informações de ${p.name}`}
      >
        {[
          { id: "sobre", label: "Como funciona" },
          { id: "composicao", label: "Composição" },
          { id: "uso", label: "Como usar" },
        ].map(({ id, label }, i, all) => (
          <button
            key={id}
            id={`detail-tab-${id}`}
            role="tab"
            aria-selected={tab === id}
            aria-controls="detail-panel"
            tabIndex={tab === id ? 0 : -1}
            onClick={() => setTab(id)}
            onKeyDown={(e) => {
              if (["ArrowRight", "ArrowLeft"].includes(e.key)) {
                e.preventDefault();
                const next = all[(i + (e.key === "ArrowRight" ? 1 : 2)) % 3].id;
                setTab(next);
                document.getElementById(`detail-tab-${next}`)?.focus();
              }
            }}
          >
            {label}
          </button>
        ))}
      </div>
      <div
        key={tab}
        className="detail-panel"
        id="detail-panel"
        role="tabpanel"
        aria-labelledby={`detail-tab-${tab}`}
      >
        {tab === "sobre" ? (
          <>
            <h3>A lógica da fórmula</h3>
            <p>{p.mechanism}</p>
            <div className="information-note">
              <Microscope size={23} />
              <p>
                Conhecimento para escolher melhor: a presença de um ingrediente
                não garante um resultado clínico. A resposta e a indicação são
                individuais.
              </p>
            </div>
            <a
              className="text-link"
              href="https://isappscience.org/resource/probiotics-prebiotics-synbiotics-postbiotics-and-fermented-foods-defined/"
              target="_blank"
              rel="noreferrer"
            >
              Entenda os conceitos científicos <ArrowUpRight size={15} />
            </a>
          </>
        ) : tab === "composicao" ? (
          <>
            <h3>Composição declarada no rótulo</h3>
            <p>
              Por dose de {p.dose} {p.dose === 1 ? "cápsula" : "cápsulas"}. UFC
              = unidades formadoras de colônia.
            </p>
            <table>
              <thead>
                <tr>
                  <th>Ingrediente</th>
                  <th>Quantidade</th>
                </tr>
              </thead>
              <tbody>
                {p.ingredients.map(([ingredient, amount]) => (
                  <tr key={ingredient}>
                    <td>{ingredient}</td>
                    <td>{amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <a
              className="text-link"
              href={asset(`labels/${encodeURIComponent(p.label)}`)}
              target="_blank"
              rel="noreferrer"
            >
              Abrir rótulo original em PDF <ArrowUpRight size={15} />
            </a>
          </>
        ) : (
          <>
            <h3>Um cuidado que faz parte da rotina.</h3>
            <div className="usage">
              <span>{String(p.dose).padStart(2, "0")}</span>
              <p>
                {p.dose === 1 ? "cápsula" : "cápsulas"}, uma vez ao dia.
                <small>
                  Conforme o rótulo. Siga a orientação do profissional que
                  acompanha você.
                </small>
              </p>
            </div>
            <p>Conserve ao abrigo da luz, do calor e da umidade.</p>
            <p>
              Gestantes, nutrizes e crianças até 16 anos somente devem consumir
              sob orientação de nutricionista ou médico.
            </p>
            {p.id === "hair-skin" && (
              <p>
                Informe o uso de biotina antes de realizar exames laboratoriais.
              </p>
            )}
            <a
              className="text-link"
              href={asset(`labels/${encodeURIComponent(p.label)}`)}
              target="_blank"
              rel="noreferrer"
            >
              Consulte as orientações do rótulo <ArrowUpRight size={15} />
            </a>
          </>
        )}
      </div>
    </div>
  );
}
function SearchPanel({ open }: { open: (p: Product) => void }) {
  const [term, setTerm] = useState("");
  const visible = products.filter((p) =>
    normalize(`${p.name} ${p.category} ${p.summary}`).includes(normalize(term)),
  );
  return (
    <div className="search-panel">
      <p>Encontre uma fórmula pelo nome ou pelo seu interesse.</p>
      <div className="search-field">
        <Search size={20} />
        <input
          autoFocus
          type="search"
          aria-label="Buscar uma fórmula"
          placeholder="Busque por intestino, foco, nome..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </div>
      <p className="search-count" role="status">
        {visible.length}{" "}
        {visible.length === 1 ? "fórmula encontrada" : "fórmulas encontradas"}
      </p>
      <div className="search-results">
        {visible.map((p) => (
          <button className="search-result" key={p.id} onClick={() => open(p)}>
            <img src={productPhoto(p)} alt="" width="70" height="90" />
            <span>
              <small>{p.category}</small>
              <strong>{p.name}</strong>
              <span>{p.summary}</span>
            </span>
            <ArrowUpRight size={20} />
          </button>
        ))}
      </div>
      {!visible.length && (
        <div className="empty-state">
          <Search size={30} />
          <h3>Nenhuma fórmula encontrada.</h3>
          <p>Tente outro nome ou explore todas as fórmulas.</p>
          <button className="button" onClick={() => setTerm("")}>
            Ver todas as fórmulas
          </button>
        </div>
      )}
    </div>
  );
}
function Cart({
  items,
  setItems,
  close,
}: {
  items: CartItem[];
  setItems: (v: CartItem[]) => void;
  close: () => void;
}) {
  const total = items.reduce(
    (sum, i) =>
      sum +
      (price(products.find((p) => p.id === i.id)!, i.quantity) ?? 0) * i.count,
    0,
  );
  const message = `Olá! Gostaria de finalizar meu pedido DalFlore:\n${items.map((i) => `${i.count} × ${products.find((p) => p.id === i.id)!.name} — kit de ${i.quantity} ${i.quantity === 1 ? "frasco" : "frascos"} — ${brl((price(products.find((p) => p.id === i.id)!, i.quantity) ?? 0) * i.count)}`).join("\n")}\nSubtotal de referência: ${brl(total)}. Podem confirmar os valores, disponibilidade e frete?`;
  return (
    <div className="cart-panel">
      {!items.length ? (
        <div className="empty-state">
          <ShoppingBag size={42} strokeWidth={1} />
          <h2>Seu cuidado começa aqui.</h2>
          <p>Explore as fórmulas e adicione seus produtos ao carrinho.</p>
          <button
            className="button"
            onClick={() => {
              close();
              document
                .getElementById("produtos")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Conhecer as fórmulas <ArrowRight size={16} />
          </button>
        </div>
      ) : (
        <>
          <p className="cart-caption">
            Suas escolhas para florescer por dentro.
          </p>
          <div className="cart-items">
            {items.map((item, index) => {
              const p = products.find((p) => p.id === item.id)!;
              return (
                <article
                  className="cart-item"
                  key={`${item.id}-${item.quantity}`}
                >
                  <img
                    src={productPhoto(p)}
                    alt={p.name}
                    width="100"
                    height="130"
                  />
                  <div>
                    <p className="eyebrow">{p.category}</p>
                    <h3>{p.name}</h3>
                    <p>
                      {item.quantity}{" "}
                      {item.quantity === 1 ? "frasco" : "frascos"} por kit
                    </p>
                    <strong>
                      {brl((price(p, item.quantity) ?? 0) * item.count)}
                    </strong>
                    <div className="cart-controls">
                      <button
                        aria-label={`Diminuir kits de ${p.name}`}
                        onClick={() =>
                          setItems(
                            items.flatMap((x, i) =>
                              i === index
                                ? x.count > 1
                                  ? [{ ...x, count: x.count - 1 }]
                                  : []
                                : [x],
                            ),
                          )
                        }
                      >
                        −
                      </button>
                      <span aria-label="Quantidade de kits">{item.count}</span>
                      <button
                        aria-label={`Aumentar kits de ${p.name}`}
                        disabled={item.count >= 20}
                        onClick={() =>
                          setItems(
                            items.map((x, i) =>
                              i === index ? { ...x, count: x.count + 1 } : x,
                            ),
                          )
                        }
                      >
                        +
                      </button>
                      <button
                        className="remove"
                        aria-label={`Remover ${p.name}`}
                        onClick={() =>
                          setItems(items.filter((_, i) => i !== index))
                        }
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                    {item.count === 1 && (
                      <a
                        className="text-link"
                        href={checkoutUrl(p, item.quantity)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Comprar este kit no checkout <ArrowUpRight size={13} />
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
          <div className="cart-bottom">
            <div className="cart-total">
              <span>Subtotal</span>
              <strong>{brl(total)}</strong>
            </div>
            <p>
              Confirme o frete, as condições e a disponibilidade ao finalizar.
              Você pode comprar um kit pelo link acima ou enviar o pedido
              completo ao atendimento.
            </p>
            <a
              className="button"
              href={whatsapp(message)}
              target="_blank"
              rel="noreferrer"
            >
              Finalizar pedido pelo WhatsApp <ArrowUpRight size={17} />
            </a>
            <button className="continue-shopping" onClick={close}>
              <ArrowLeft size={14} /> Continuar explorando
            </button>
          </div>
        </>
      )}
    </div>
  );
}
export default function App() {
  useSmoothMotion();
  const [modal, setModal] = useState<ModalState>(getProductHash);
  const [mobile, setMobile] = useState(false);
  const [category, setCategory] = useState("todos");
  const [cart, setCart] = useState<CartItem[]>(readCart);
  useEffect(() => {
    try {
      localStorage.setItem("dalflore-cart-v1", JSON.stringify(cart));
    } catch {
      /* Browsing remains available if storage is blocked. */
    }
  }, [cart]);
  useEffect(() => {
    const fn = () => setModal(getProductHash());
    window.addEventListener("hashchange", fn);
    return () => window.removeEventListener("hashchange", fn);
  }, []);
  const close = () => {
    setModal(null);
    if (window.location.hash.startsWith("#produto/"))
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}#produtos`,
      );
  };
  const open = (p: Product) => {
    setModal({ kind: "product", id: p.id });
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}#produto/${p.id}`,
    );
  };
  const add = (p: Product, q: Quantity) => {
    setCart((items) => {
      const existing = items.find((i) => i.id === p.id && i.quantity === q);
      return existing
        ? items.map((i) =>
            i === existing ? { ...i, count: Math.min(20, i.count + 1) } : i,
          )
        : [...items, { id: p.id, quantity: q, count: 1 }];
    });
    if (window.location.hash.startsWith("#produto/"))
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}#produtos`,
      );
    setModal({ kind: "cart" });
  };
  const count = cart.reduce((s, i) => s + i.quantity * i.count, 0);
  const visible =
    category === "todos"
      ? products
      : products.filter((p) => p.tags.includes(category));
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <header className="site-header">
        <div className="header-inner wrap">
          <a href="#" className="brand" aria-label="DalFlore, início">
            <img
              src={asset("brand/logo.png")}
              alt="DalFlore"
              width="160"
              height="67"
            />
          </a>
          <nav className="desktop-nav" aria-label="Navegação principal">
            <a href="#produtos">Fórmulas</a>
            <a href="#ciencia">Nossa ciência</a>
            <a href="#aline">Dra. Aline</a>
            <a href="#duvidas">Dúvidas</a>
          </nav>
          <div className="header-actions">
            <button
              className="icon-button"
              aria-label="Buscar produtos"
              onClick={() => setModal({ kind: "search" })}
            >
              <Search size={19} />
            </button>
            <button
              className="icon-button cart-icon"
              aria-label={`Abrir carrinho${count ? `, ${count} frascos` : ""}`}
              onClick={() => setModal({ kind: "cart" })}
            >
              <ShoppingBag size={19} />
              {count > 0 && <span>{count}</span>}
            </button>
            <a
              className="icon-button support-icon"
              aria-label="Falar com o atendimento"
              href={whatsapp(
                "Olá! Estou no site da DalFlore e tenho uma dúvida.",
              )}
              target="_blank"
              rel="noreferrer"
            >
              <Headphones size={20} />
            </a>
            <button
              className="icon-button mobile-trigger"
              aria-label={mobile ? "Fechar menu" : "Abrir menu"}
              aria-expanded={mobile}
              aria-controls="mobile-nav"
              onClick={() => setMobile(!mobile)}
            >
              {mobile ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
        {mobile && (
          <nav
            className="mobile-nav"
            id="mobile-nav"
            aria-label="Navegação para celular"
          >
            {[
              ["Fórmulas", "#produtos"],
              ["Nossa ciência", "#ciencia"],
              ["Eixo intestino–cérebro", "#eixo"],
              ["Conheça a Dra. Aline", "#aline"],
              ["Dúvidas", "#duvidas"],
            ].map(([label, href]) => (
              <a href={href} onClick={() => setMobile(false)} key={href}>
                {label}
                <ArrowUpRight size={16} />
              </a>
            ))}
          </nav>
        )}
      </header>
      <main id="conteudo">
        <Hero open={open} />
        <section id="produtos" className="products-section wrap">
          <div className="shop-heading">
            <div>
              <p className="eyebrow">ENCONTRE O SEU CUIDADO</p>
              <h2>Fórmulas para a sua vida real.</h2>
            </div>
            <button
              className="text-link"
              onClick={() => setModal({ kind: "search" })}
            >
              Explore por interesse <Search size={15} />
            </button>
          </div>
          <div
            className="category-filter"
            role="group"
            aria-label="Filtrar fórmulas"
          >
            {categories.map((c) => (
              <button
                key={c.id}
                aria-pressed={category === c.id}
                onClick={() => setCategory(c.id)}
              >
                {c.name}
              </button>
            ))}
          </div>
          <p className="catalog-count" role="status">
            {visible.length} {visible.length === 1 ? "fórmula" : "fórmulas"} ·
            Clique no frasco para conhecer a composição e como funciona.
          </p>
          <div className="product-grid">
            {visible.map((p) => (
              <ProductCard key={p.id} product={p} open={open} add={add} />
            ))}
          </div>
          <a href="#duvidas" className="faq-strip">
            <span>
              <CircleHelp size={24} />
              <span>
                <strong>Dúvidas sobre os produtos?</strong>
                <small>A informação faz parte do cuidado.</small>
              </span>
            </span>
            <span>
              Veja as respostas <ArrowDown size={16} />
            </span>
          </a>
        </section>
        <Science />
        <Axis />
        <section className="care-strip wrap">
          <div>
            <Leaf size={29} strokeWidth={1.3} />
            <h2>
              Seu corpo tem uma história.
              <br />
              <em>O cuidado precisa ouvir.</em>
            </h2>
          </div>
          <p>
            Alimentação, sono, movimento e acompanhamento profissional fazem
            parte do mesmo caminho. A suplementação entra com propósito, quando
            faz sentido para você.
          </p>
        </section>
        <Expert />
        <FAQ />
        <section className="closing">
          <div className="wrap">
            <Sprout size={33} strokeWidth={1.1} />
            <p className="eyebrow">DALFLORE</p>
            <h2>
              Quando sua flora floresce,
              <br />
              <em>você floresce.</em>
            </h2>
            <a className="button" href="#produtos">
              Encontre a sua fórmula <ArrowRight size={17} />
            </a>
          </div>
        </section>
      </main>
      <footer>
        <div className="wrap footer-grid">
          <div className="footer-brand">
            <img
              src={asset("brand/logo.png")}
              alt="DalFlore"
              width="160"
              height="67"
              loading="lazy"
            />
            <p>
              Ciência para florescer.
              <br />
              Cuidado de dentro para fora.
            </p>
          </div>
          <div>
            <p className="eyebrow">EXPLORE</p>
            <a href="#produtos">Nossas fórmulas</a>
            <a href="#ciencia">A ciência da microbiota</a>
            <a href="#aline">A marca e a fundadora</a>
          </div>
          <div>
            <p className="eyebrow">VAMOS CONVERSAR</p>
            <a
              href={whatsapp("Olá! Gostaria de falar com a DalFlore.")}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp: (51) 99726-4646 <ArrowUpRight size={13} />
            </a>
            <a
              href="https://www.instagram.com/dra.alinedalmazo/"
              target="_blank"
              rel="noreferrer"
            >
              @dra.alinedalmazo <ArrowUpRight size={13} />
            </a>
            <a href="#duvidas">Perguntas frequentes</a>
          </div>
          <div>
            <p className="eyebrow">TRANSPARÊNCIA</p>
            <button onClick={() => setModal({ kind: "privacy" })}>
              Privacidade e navegação
            </button>
            <a
              href="https://dalflore.com.br/politica-de-reembolso"
              target="_blank"
              rel="noreferrer"
            >
              Política de reembolso <ArrowUpRight size={13} />
            </a>
            <a
              href="https://dalflore.com.br/politica-de-privacidade#termos-de-uso"
              target="_blank"
              rel="noreferrer"
            >
              Termos da loja <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
        <div className="wrap footer-note">
          <p>
            Conteúdo educativo. Não substitui avaliação, diagnóstico ou
            acompanhamento profissional. Consulte o rótulo e a orientação do
            profissional de saúde antes de utilizar os produtos.
          </p>
          <div>
            <span>
              © {new Date().getFullYear()} DalFlore. Todos os direitos
              reservados.
            </span>
            <span>Ciência. Natureza. Você.</span>
          </div>
        </div>
      </footer>
      {modal && (
        <Overlay
          key={modal.kind === "product" ? modal.id : modal.kind}
          type={modal.kind}
          close={close}
          title={
            modal.kind === "product"
              ? `Conheça a fórmula / ${products.find((p) => p.id === modal.id)!.name}`
              : modal.kind === "cart"
                ? "Seu carrinho"
                : modal.kind === "search"
                  ? "Explore as fórmulas"
                  : "Privacidade e navegação"
          }
        >
          {modal.kind === "product" ? (
            <ProductDetail
              product={products.find((p) => p.id === modal.id)!}
              add={add}
            />
          ) : modal.kind === "cart" ? (
            <Cart items={cart} setItems={setCart} close={close} />
          ) : modal.kind === "search" ? (
            <SearchPanel open={open} />
          ) : (
            <div className="privacy-panel">
              <h2>Suas escolhas, com transparência.</h2>
              <p>
                Este site guarda os itens do carrinho somente no navegador, para
                que suas escolhas permaneçam ao voltar. Você pode limpar esses
                dados nas configurações do seu navegador.
              </p>
              <p>
                Este site não utiliza formulários de cadastro ou ferramentas de
                publicidade. Ao abrir WhatsApp, Instagram, checkout ou links
                científicos, você acessa serviços externos, sujeitos às próprias
                políticas de privacidade.
              </p>
              <p>
                O pedido só é enviado ao atendimento quando você abre o WhatsApp
                e confirma o envio da mensagem. Os pagamentos são realizados no
                ambiente do provedor de checkout.
              </p>
              <a
                className="text-link"
                href="https://dalflore.com.br/politica-de-privacidade"
                target="_blank"
                rel="noreferrer"
              >
                Consulte a política da loja atual <ArrowUpRight size={15} />
              </a>
            </div>
          )}
        </Overlay>
      )}
    </>
  );
}
