import {
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Brain,
  Plus,
  ChevronLeft,
  ChevronRight,
  FileText,
  FlaskConical,
  Headphones,
  Instagram,
  Leaf,
  Menu,
  ShoppingBag,
  ShieldCheck,
  Sparkles,
  Sprout,
  Trash2,
  Truck,
  UserRound,
  X,
} from "lucide-react";
import {
  asset,
  brl,
  checkoutUrl,
  contactUrl,
  refundMessage,
  price,
  products,
  whatsapp,
  type Product,
  type Quantity,
} from "./catalog";

import { Overlay } from "./Overlay";
import { MicrobiotaWhy } from "./MicrobiotaWhy";
import { ScienceJourney } from "./ScienceJourney";
import { HomeBanners } from "./HomeBanners";
import { LegalPanel, legalDocs } from "./LegalDocs";
import { SiteFooter } from "./SiteFooter";
import { useSmoothMotion } from "./useSmoothMotion";

type CartItem = { id: string; quantity: Quantity; count: number };
type ModalState =
  | { kind: "product"; id: string }
  | { kind: "legal"; doc: string }
  | { kind: "cart" }
  | null;
const getHashModal = (): ModalState => {
  const doc = window.location.hash.slice(1);
  if (Object.hasOwn(legalDocs, doc)) return { kind: "legal", doc };
  const id = window.location.hash.replace("#produto/", "");
  return window.location.hash.startsWith("#produto/") &&
    products.some((p) => p.id === id)
    ? { kind: "product", id }
    : null;
};
const productPhoto = (p: Product) => asset(`products/${p.image}.webp`);
const productSymbols: Record<string, typeof Leaf> = {
  gutcare: FlaskConical,
  concentra: Brain,
  immune: ShieldCheck,
  "slim-balance": Leaf,
  cycle: Sprout,
  "hair-skin": Sparkles,
};
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
        </button>
      ))}
    </div>
  );
}
function KitPriceComparison({ product, quantity }: { product: Product; quantity: Quantity }) {
  if (quantity === 1 || product.basePrice === null) return null;
  const separateTotal = product.basePrice * quantity;
  return <del className="unit-comparison" aria-label={"Preço de " + quantity + " frascos avulsos: " + brl(separateTotal)} title={"Total de " + quantity + " frascos comprados separadamente"}>{brl(separateTotal)}</del>;
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
  const Symbol = productSymbols[p.id];
  return (
    <article
      id={`card-${p.id}`}
      className="product-card"
      style={{ "--product-color": p.color } as CSSProperties}
    >
      <div className="product-card-top">
        <p className="category"><Symbol size={16} aria-hidden="true" />{p.category}</p>
        <span className="product-format">{p.capsules} cápsulas</span>
      </div>
      <button
        className="product-media"
        onClick={() => open(p)}
        aria-label={`Conhecer ${p.name}`}
      >
        <span className="product-particles" aria-hidden="true"><i/><i/></span>
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
        <h3>
          <button onClick={() => open(p)}><span>{p.name} <small>- {p.descriptor}</small></span><Plus size={18} aria-hidden="true" /></button>
        </h3>
        <p className="product-summary">{p.summary}</p>
        <div className="product-price">
          {total !== null ? (
            <>
              <div className="product-price-line"><span>{brl(total)}</span><KitPriceComparison product={p} quantity={quantity}/></div>
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
function ProductShelf({ open, add }: {
  open: (p: Product) => void;
  add: (p: Product, q: Quantity) => void;
}) {
  return <>
    <p className="catalog-intro">Conheça melhor a função, ativos e modo de uso de cada produto clicando no frasco</p>
    <div className="product-grid" role="region" aria-label="Todas as fórmulas DalFlore">
      {products.map(product => <ProductCard key={product.id} product={product} open={open} add={add} />)}
    </div>
  </>;
}
function Expert({ tab, setTab }: { tab: string; setTab: (value: string) => void }) {
  useEffect(() => {
    const science = document.querySelector(".df-science-block");
    const panels = document.querySelector(".mw-panels");
    const expert = document.getElementById("aline");
    if (!science || !panels || !expert) return;
    const syncSpacing = () => {
      const gap = Math.max(0, science.getBoundingClientRect().bottom - panels.getBoundingClientRect().bottom);
      expert.style.setProperty("--expert-section-space", gap + "px");
    };
    const observer = new ResizeObserver(syncSpacing);
    observer.observe(science);
    for (const child of science.children) observer.observe(child);
    observer.observe(panels);
    window.addEventListener("resize", syncSpacing);
    syncSpacing();
    return () => { observer.disconnect(); window.removeEventListener("resize", syncSpacing); };
  }, []);
  return (
    <section className="df-expert" id="aline">
      <span className="df-expert-atmosphere" aria-hidden="true"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></span>
      <div className="df-container">
        <div className="df-expert-layout">
          <figure className="df-founder">
            <a className="df-portrait" href="https://www.instagram.com/dra.alinedalmazo/" target="_blank" rel="noreferrer" aria-label="Acompanhe a Dra. Aline no Instagram">
              <img
                src={asset("aline-retrato.webp")}
                alt="Dra. Aline Dalmazo, nutricionista e doutora em Ciências da Saúde, fundadora da DalFlore"
                width="900"
                height="1241"
                loading="lazy"
              />
            </a>
            <figcaption>
              <strong>Dra. Aline Dalmazo</strong>
              <span>Nutricionista · Doutora em Ciências da Saúde</span>
            </figcaption>
          </figure>
          <div className="df-expert-copy">
            <p className="df-expert-instruction">Escolha qual história quer conhecer</p>
            <div
              className="df-tabs df-story-tabs"
              role="tablist"
              aria-label="Sobre a DalFlore e a fundadora"
            >
              {[
                { id: "aline", label: "Aline Dalmazo", icon: UserRound },
                { id: "marca", label: "História da DalFlore", icon: BookOpen },
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
            <div className="df-panels df-story-panels">
              <div
                role="tabpanel"
                id="expert-panel-marca"
                aria-labelledby="expert-tab-marca"
                className={"df-panel " + (tab === "marca" ? "active" : "")}
                aria-hidden={tab !== "marca"}
              >
                <h3>
                  Quando a ciência encontra <em>o equilíbrio natural.</em>
                </h3>
                <p>
                  A DalFlore nasceu para transformar a forma como cuidamos da
                  saúde. Unimos inovação científica, ingredientes puros e uma
                  visão humana do bem-estar. Nosso propósito é ajudar você a florescer de dentro para fora, com informação clara sobre o que cada fórmula reúne e qual é a sua proposta.
                </p>

                  <p>
                    A inspiração vem da microbiota, o nosso “jardim interno”.
                    Assim como um jardim, ela precisa de cuidado, nutrição e
                    equilíbrio para florescer.
                  </p>
                  <p>
                    Foi dessa visão que Aline Dalmazo criou uma marca de
                    probióticos, prebióticos e nutracêuticos: um encontro entre
                    conhecimento, natureza e cuidado com pessoas reais. Cada fórmula tem uma composição e um propósito próprios, para que o cuidado faça sentido dentro de uma rotina e com orientação individualizada.
                  </p>
                  <p>
                    <strong>
                      Pureza dos ingredientes. Respeito ao corpo humano.
                      Simplicidade que funciona.
                    </strong>
                  </p>

                <div className="df-signoff">
                  Porque quando sua flora floresce,{" "}
                  <br />
                  <em>você floresce.</em>
                </div>
              </div>
              <div
                role="tabpanel"
                id="expert-panel-aline"
                aria-labelledby="expert-tab-aline"
                className={"df-panel " + (tab === "aline" ? "active" : "")}
                aria-hidden={tab !== "aline"}
              >
                <h3>
                  Conhecimento para orientar. <em>Escuta para cuidar.</em>
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
                    oferecer informação com clareza, considerar a
                    individualidade e ouvir a história de cada pessoa. É esse olhar que ajuda a transformar conceitos sobre intestino, alimentação e bem-estar em conversas compreensíveis, conectadas à rotina de quem busca cuidado.
                  </p>
                  <p>
                    Foi da união entre essa trajetória acadêmica e a experiência
                    clínica que nasceu a DalFlore, com o propósito de levar esse
                    olhar para além do consultório.
                  </p>

                <div className="df-signoff">
                  Ciência na escolha.{" "}
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
const faqs: [string, ReactNode][] = [
  [
    "Os produtos DALFLORE precisam de receita médica?",
    "Não. Nossos produtos são suplementos alimentares e não necessitam de receita médica. No entanto, recomendamos sempre consultar um profissional de saúde antes de iniciar qualquer suplementação, especialmente gestantes, lactantes e pessoas em tratamento médico.",
  ],
  [
    "Em quanto tempo posso perceber alguma mudança?",
    "Os resultados variam de acordo com cada organismo e o produto utilizado. Em geral, melhorias iniciais podem ser percebidas entre 15 a 30 dias de uso contínuo. Para resultados mais consistentes e duradouros, recomendamos o uso por 3 a 6 meses.",
  ],
  [
    "Como devo consumir e guardar os produtos?",
    <div className="faq-usage">
      <p>Conforme o modo de uso indicado nos rótulos:</p>
      <ul>
        {products.map(product => <li key={product.id}><strong>{product.name}</strong> — Ingerir {product.dose} {product.dose === 1 ? "cápsula" : "cápsulas"}, uma vez ao dia.</li>)}
      </ul>
      <p><strong>Conservação de todos os produtos:</strong> conservar ao abrigo da luz, calor e umidade.</p>
    </div>,
  ],
  [
    "Gestantes e crianças podem utilizar?",
    "Conforme os rótulos, gestantes, nutrizes e crianças até 16 anos somente devem consumir sob orientação de nutricionista ou médico. Se você utiliza medicamentos ou possui alguma condição de saúde, também converse com seu profissional.",
  ],
  [
    "Como funcionam pagamento e frete?",
    "Você pode pagar com Pix ou cartão, com parcelamento em até 12x. Com frete grátis na compra de 3 unidades ou mais. Enviamos para todo o Brasil. O prazo é calculado pelo seu CEP e aparece no checkout antes de você finalizar o pedido. Ainda não fazemos entrega internacional.",
  ],
  [
    "Posso devolver o produto se não gostar?",
    <p>
      Sim. Você tem até 7 dias após o recebimento para solicitar a devolução e
      reembolso enviando a mensagem{" "}
      <a href={whatsapp(refundMessage)} target="_blank" rel="noreferrer">
        "{refundMessage}" pelo nosso WhatsApp
      </a>
      , no caso de dúvidas consulte nossa{" "}
      <a href="#reembolso">Política de reembolso</a>
      .
    </p>,
  ],
];

function FAQ() {
  const [openFaq, setOpenFaq] = useState(0);
  return (
    <section className="faq-section" id="duvidas">
      <div className="faq-inner">
        <h2>Perguntas frequentes</h2>
        <div className="faq-items" id="faq-items">
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
                    <Plus size={16} />
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
                    {typeof a === "string" ? <p>{a}</p> : a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
<a
          className="faq-contact"
          href={contactUrl}
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
  const [labelOpen, setLabelOpen] = useState(false);
  const [studiesOpen, setStudiesOpen] = useState(false);
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
        </div>
        <div className="detail-intro">
          <div className="detail-meta">
            <p className="eyebrow">DALFLORE / {p.category}</p>
            <span>{p.capsules} cápsulas</span>
          </div>
          <h2>{p.name} <small>- {p.descriptor}</small></h2>
          <h3>{p.emphasis}</h3>
          <p>{p.description}</p>
          <div className="detail-price">
            <div className="detail-price-line"><span>{total === null ? "Valor sob consulta" : brl(total)}</span>{total !== null && <KitPriceComparison product={p} quantity={q}/>}</div>
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
      <section className="detail-how" aria-label={`Como funciona o ${p.name}`}>
        <h3>Como funciona</h3>
        {p.howItWorks.map((text) => (
          <p key={text}>{text}</p>
        ))}
        <button className="detail-composition" onClick={() => setLabelOpen(true)}>
          <FileText size={24} aria-hidden="true" />
          <span>
            <strong>Ver composição e modo de uso</strong>
            <small>Veja o rótulo com os ativos, a dose e a conservação</small>
          </span>
          <ChevronRight size={22} aria-hidden="true" />
        </button>
        <button className="detail-research" onClick={() => setStudiesOpen(true)}>
          <BookOpen size={24} aria-hidden="true" />
          <span>
            <strong>Embasamento Científico</strong>
            <small>Veja os estudos sobre os ativos desta fórmula</small>
          </span>
          <ChevronRight size={22} aria-hidden="true" />
        </button>
      </section>
      {studiesOpen && (
        <Overlay
          type="research"
          title="Embasamento Científico"
          close={() => setStudiesOpen(false)}
        >
          <div className="research-panel">
            <p>
              Pesquisas sobre ativos presentes no {p.name}. Os resultados se
              referem às cepas, doses e pessoas de cada estudo.
            </p>
            <ul>
              {p.studies.map((study) => (
                <li key={study.id}>
                  <h3>{study.title}</h3>
                  <small>{study.source}</small>
                  <a
                    href={`https://pubmed.ncbi.nlm.nih.gov/${study.id}/`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Ver no PubMed <ArrowUpRight size={15} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Overlay>
      )}
      {labelOpen && (
        <Overlay
          type="label"
          title="Composição e modo de uso"
          close={() => setLabelOpen(false)}
        >
          <div className="label-panel">
            <img
              src={asset(`labels/composicao/${p.id}.png`)}
              alt={`Rótulo de ${p.name}. Composição: ${p.ingredients.map(([name, amount]) => `${name}, ${amount}`).join("; ")}. Ingerir ${p.dose} ${p.dose === 1 ? "cápsula" : "cápsulas"} uma vez ao dia. Conservar ao abrigo da luz, calor e umidade.`}
              width="694"
              height="860"
            />
          </div>
        </Overlay>
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
                    <h3>{p.name} <small>- {p.descriptor}</small></h3>
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
  const [modal, setModal] = useState<ModalState>(getHashModal);
  const [mobile, setMobile] = useState(false);
  const [bannerCleared, setBannerCleared] = useState(false);
  const [expertTab, setExpertTab] = useState("aline");
  const [scienceVisible, setScienceVisible] = useState(false);
  const headerVisible = bannerCleared && !scienceVisible;
  useEffect(() => {
    const block = document.querySelector('.df-science-block');
    const observer = new IntersectionObserver(([entry]) => {
      setScienceVisible(entry.isIntersecting);
      if (entry.isIntersecting) setMobile(false);
    }, { threshold: 0 });
    if (block) observer.observe(block);
    return () => observer.disconnect();
  }, []);
  const [legalVisible, setLegalVisible] = useState(false);
  useEffect(() => {
    const legal = document.querySelector(".site-footer-bottom");
    const observer = new IntersectionObserver(([entry]) => setLegalVisible(entry.isIntersecting));
    if (legal) observer.observe(legal);
    return () => observer.disconnect();
  }, []);
  const [cart, setCart] = useState<CartItem[]>(readCart);
  useEffect(() => {
    try {
      localStorage.setItem("dalflore-cart-v1", JSON.stringify(cart));
    } catch {
      /* Browsing remains available if storage is blocked. */
    }
  }, [cart]);
  useEffect(() => {
    const fn = () => setModal(getHashModal());
    window.addEventListener("hashchange", fn);
    return () => window.removeEventListener("hashchange", fn);
  }, []);
  const close = () => {
    setModal(null);
    if (Object.hasOwn(legalDocs, window.location.hash.slice(1)))
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
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
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <header className={`site-header df-floating-header${headerVisible ? " is-visible" : ""}`} inert={!headerVisible} aria-hidden={!headerVisible}>
        <div className="header-shipping">FRETE GRÁTIS NA COMPRA DE 3 OU MAIS UNIDADES</div>
        <div className="header-inner wrap">
          <a href="#" className="brand" aria-label="DalFlore, início">
            <img
              src={asset("brand/symbol-white.svg")}
              alt="DalFlore"
              width="160"
              height="67"
            />
          </a>
          <nav className="desktop-nav" aria-label="Navegação principal">
            <a href="#produtos">Produtos</a>
            <a href="#ciencia">Ciência</a>
            <a href="#duvidas">Dúvidas</a>
          </nav>
          <div className="header-actions">
            <button
              className="icon-button cart-icon"
              aria-label={`Abrir carrinho${count ? `, ${count} frascos` : ""}`}
              onClick={() => setModal({ kind: "cart" })}
            >
              <ShoppingBag size={24} />
              {count > 0 && <span>{count}</span>}
            </button>
            <a
              className="icon-button support-icon"
              aria-label="Falar com o atendimento"
              href={contactUrl}
              target="_blank"
              rel="noreferrer"
            >
              <Headphones size={24} />
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
              ["Produtos", "#produtos"],
              ["Ciência", "#ciencia"],
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
      <main id="conteudo" className="df-home">
        <HomeBanners onVisibilityChange={setBannerCleared} onExpert={() => setExpertTab("aline")} />
        <div id="ciencia" className="df-science-block">
          <ScienceJourney open={open} />
          <MicrobiotaWhy />
        </div>
        <section id="produtos" className="df-catalog">
          <div className="df-container">
          <div className="shop-heading">
            <div>
              <p className="eyebrow">ENCONTRE O SEU CUIDADO</p>
              <h2>Um cuidado para cada momento.</h2>
            </div>
          </div>
          <ProductShelf open={open} add={add} />
          </div>
        </section>
        <Expert tab={expertTab} setTab={setExpertTab} />
        <FAQ />

      </main>
      <SiteFooter
        home="#"
        logo={asset("brand/logo-white.png")}
      />
      <a
        className={`whatsapp-float${legalVisible ? " is-over-legal" : ""}`}
        href={contactUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar no WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
      {modal && (
        <Overlay
          key={modal.kind === "product" ? modal.id : modal.kind === "legal" ? modal.doc : modal.kind}
          type={modal.kind}
          close={close}
          title={
            modal.kind === "product"
              ? `Conheça a fórmula / ${products.find((p) => p.id === modal.id)!.name}`
              : modal.kind === "cart"
                ? "Seu carrinho"
                : "Políticas da loja"
          }
        >
          {modal.kind === "product" ? (
            <ProductDetail
              product={products.find((p) => p.id === modal.id)!}
              add={add}
            />
          ) : modal.kind === "cart" ? (
            <Cart items={cart} setItems={setCart} close={close} />
          ) : (
            <LegalPanel doc={modal.doc} />
          )}
        </Overlay>
      )}
    </>
  );
}
