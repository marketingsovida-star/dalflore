export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
export const support = "https://wa.me/5551997264646";
export const whatsapp = (message: string) =>
  `${support}?text=${encodeURIComponent(message)}`;
export const contactUrl = whatsapp(
  "Olá! Estou com dúvidas com relação a DalFlore.",
);
export const brl = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
export type Quantity = 1 | 3 | 6;
export type Product = {
  id: string;
  name: string;
  category: string;
  summary: string;
  color: string;
  image: string;
  capsules: number;
  dose: number;
  basePrice: number | null;
  price3?: number;
  price6?: number;
  checkout?: Record<Quantity, string>;
  label: string;
  ingredients: [string, string][];
  description: string;
  howItWorks: string[];
  emphasis: string;
  tags: string[];
};
const payt = (a: string, b: string, c: string) => ({ 1: a, 3: b, 6: c });
export const products: Product[] = [
  {
    id: "gutcare",
    name: "GUTcare",
    category: "Saúde intestinal",
    summary:
      "Probióticos e FOS para apoiar a microbiota e o cuidado diário com a saúde intestinal.",
    color: "#6b9c58",
    image: "gutcare",
    capsules: 30,
    dose: 1,
    basePrice: 129.9,
    price3: 362.43,
    price6: 623.52,
    checkout: payt(
      "a2350f840983256496adb9028ca00bcc",
      "4a8dc8eb112e7d1f36adebcc498a0793",
      "d4a91ef7ff99e515e4cd642736a65713",
    ),
    label: "GUTCARE - 17x5.pdf",
    emphasis: "O cuidado começa por dentro.",
    tags: ["intestino", "microbiota", "prebiotico"],
    description:
      "Uma fórmula que reúne quatro cepas de Lactobacillus e Bifidobacterium e o prebiótico FOS. Pensada para integrar uma rotina de cuidado com a saúde intestinal, respeitando as necessidades de cada pessoa.",
    howItWorks: [
      "O GUTcare reúne quatro cepas de Lactobacillus e Bifidobacterium com o FOS, uma fibra prebiótica que serve de alimento para as bactérias benéficas. Os probióticos levam microrganismos benéficos ao intestino e o prebiótico ajuda a nutri-los.",
      "Com o uso diário, a proposta é apoiar o equilíbrio da microbiota, a regularidade intestinal e o conforto digestivo, ajudando a reduzir a sensação de inchaço e gases. Como o intestino conversa com as defesas e com o cérebro, esse cuidado também contribui para o bem-estar geral.",
    ],
    ingredients: [
      ["Lactobacillus plantarum LP01", "6 bilhões UFC"],
      ["Lactobacillus rhamnosus HN001", "5 bilhões UFC"],
      ["Lactobacillus helveticus Rosell-52", "2 bilhões UFC"],
      ["Bifidobacterium longum R0175", "2 bilhões UFC"],
      ["FOS (frutooligossacarídeos)", "150 mg"],
      ["Excipiente celulose q.s.p.", "1 dose"],
    ],
  },
  {
    id: "concentra",
    name: "Concentra+",
    category: "Foco e cognição",
    summary:
      "Probióticos, colina e B6 para complementar o cuidado nutricional com foco e cognição.",
    color: "#b18637",
    image: "concentra",
    capsules: 60,
    dose: 2,
    basePrice: 129.9,
    price3: 362.43,
    price6: 622.86,
    checkout: payt(
      "9452e285cf3236776fece62308081304",
      "e06cbd0d4e0af26cbb2b6257cfeae101",
      "8add2759381400a8d5b503bba0196d77",
    ),
    label: "CONCENTRA+ - 17x5.pdf",
    emphasis: "Corpo e mente, na mesma conversa.",
    tags: ["foco", "cognicao", "prebiotico"],
    description:
      "Fórmula com cinco cepas probióticas, GOS, FOS, colina e vitamina B6 ativa. Sua proposta parte de um olhar integrado para a nutrição e para a comunicação entre intestino e cérebro.",
    howItWorks: [
      "O Concentra+ reúne cinco cepas probióticas estudadas no eixo intestino–cérebro, como L. plantarum PS128 e B. longum 1714, com os prebióticos GOS e FOS. A colina é a base da acetilcolina, mensageiro ligado à memória e ao aprendizado, e a vitamina B6 ativa participa da produção de neurotransmissores.",
      "A proposta é apoiar o foco, a clareza mental e a memória sem estimulantes, cuidando da microbiota e da resposta ao estresse, que também pesam na concentração do dia a dia.",
    ],
    ingredients: [
      ["Lactobacillus rhamnosus GG", "5 bilhões UFC"],
      ["Lactobacillus plantarum PS128", "4 bilhões UFC"],
      ["Bifidobacterium longum 1714", "4 bilhões UFC"],
      ["Lactobacillus helveticus R0052", "3 bilhões UFC"],
      ["Bifidobacterium breve", "4 bilhões UFC"],
      ["Galactooligossacarídeos (GOS)", "150 mg"],
      ["Frutooligossacarídeos (FOS)", "100 mg"],
      ["Colina bitartarato", "100 mg"],
      ["Vitamina B6 ativa (P5P)", "5 mg"],
      ["Excipiente celulose q.s.p.", "1 dose"],
    ],
  },
  {
    id: "immune",
    name: "Immune",
    category: "Saúde imunológica",
    summary:
      "Probióticos e beta-glucanas para cuidar da microbiota e complementar suas defesas.",
    color: "#699dc0",
    image: "immune",
    capsules: 30,
    dose: 1,
    basePrice: 129.9,
    price3: 362.43,
    price6: 623.52,
    checkout: payt(
      "84129a79ce46f883426653c20999fc1b",
      "4701fc9a1a42dce96d492227039621f6",
      "1bfa89993558c5e961a9884ab779af5b",
    ),
    label: "IMMUNE - 17x5.pdf",
    emphasis: "Um olhar para suas defesas naturais.",
    tags: ["imunidade", "intestino", "prebiotico"],
    description:
      "Combina Lactobacillus e Bifidobacterium com os prebióticos FOS e inulina, além de beta-glucanas. Uma proposta de cuidado que considera a relação entre microbiota e sistema imune.",
    howItWorks: [
      "Grande parte das células de defesa do corpo está no intestino. O Immune combina quatro cepas, entre elas L. rhamnosus GG e B. lactis Bl-04, com os prebióticos FOS e inulina, que nutrem as bactérias benéficas, e com beta-glucanas, fibras estudadas pela ação sobre as células de defesa.",
      "Com o uso diário, a proposta é apoiar a barreira intestinal e as defesas naturais do organismo, principalmente nas mudanças de estação e nos períodos de rotina mais intensa.",
    ],
    ingredients: [
      ["Lactobacillus rhamnosus GG", "10 bilhões UFC"],
      ["Bifidobacterium lactis Bl-04", "10 bilhões UFC"],
      ["Lactobacillus plantarum Lp-115", "5 bilhões UFC"],
      ["Bifidobacterium longum BB536", "3 bilhões UFC"],
      ["FOS", "100 mg"],
      ["Inulina", "150 mg"],
      ["Beta-glucanas", "100 mg"],
      ["Excipiente celulose q.s.p.", "1 dose"],
    ],
  },
  {
    id: "slim-balance",
    name: "Slim Balance",
    category: "Equilíbrio metabólico",
    summary:
      "Probióticos, com L. gasseri, para complementar o cuidado intestinal no controle do peso.",
    color: "#a47daf",
    image: "slim-balance",
    capsules: 30,
    dose: 1,
    basePrice: 129,
    price3: 362.43,
    price6: 724.86,
    checkout: payt(
      "1642f2568484cb628f82f65ae7c18e12",
      "760f92518081d316df97047c90f917d9",
      "4704ba857f9909fff551c9c27263f21a",
    ),
    label: "SLIM BALANCE - 17x5.pdf",
    emphasis: "Equilíbrio se constrói todos os dias.",
    tags: ["metabolismo", "intestino"],
    description:
      "Uma combinação de quatro cepas probióticas para integrar o cuidado com a microbiota em uma rotina de saúde metabólica. O cuidado com o peso envolve alimentação, movimento, sono e acompanhamento individual.",
    howItWorks: [
      "O Slim Balance reúne quatro cepas ligadas à relação entre microbiota e metabolismo. L. gasseri BNR17, B. lactis B420 e L. rhamnosus CGMCC 1.3724 foram pesquisadas em adultos, com foco em gordura corporal, circunferência abdominal e saciedade. L. delbrueckii apoia o equilíbrio da microbiota.",
      "Não é termogênico nem estimulante: a proposta é cuidar do intestino para apoiar o metabolismo e a saciedade. A fórmula complementa alimentação equilibrada, movimento e sono, e não garante perda de peso.",
    ],
    ingredients: [
      ["Lactobacillus gasseri BNR17", "5 bilhões UFC"],
      ["Lactobacilos delbrueckii", "5 bilhões UFC"],
      ["Bifidobacterium lactis B420", "5 bilhões UFC"],
      ["Lactobacillus rhamnosus CGMCC 1.3724", "5 bilhões UFC"],
      ["Excipiente celulose q.s.p.", "1 dose"],
    ],
  },
  {
    id: "cycle",
    name: "Cycle",
    category: "Cuidado feminino",
    summary:
      "Probióticos, isoflavonas e magnésio para complementar o cuidado com a saúde feminina.",
    color: "#cd9290",
    image: "cycle",
    capsules: 60,
    dose: 2,
    basePrice: 129.9,
    price3: 362.43,
    price6: 623.52,
    checkout: payt(
      "f5d0825fd6b92baa6d8267e594ee88ed",
      "878f5f9e636d573852ea900d162e0430",
      "4f7a60b63a6a24efa7321bf7dbb22a65",
    ),
    label: "CYCLE - 17x5.pdf",
    emphasis: "Um cuidado que respeita suas fases.",
    tags: ["feminino", "prebiotico"],
    description:
      "Reúne cinco cepas probióticas, três prebióticos, isoflavonas de soja, cimicífuga, magnésio e vitamina B6 ativa. Uma composição que pede um olhar individual para a saúde da mulher.",
    howItWorks: [
      "O Cycle combina cinco cepas probióticas com GOS, FOS e inulina, que nutrem a microbiota, incluindo as bactérias ligadas ao metabolismo do estrogênio. As isoflavonas de soja e a cimicífuga são estudadas nos sintomas da menopausa, e o magnésio e a vitamina B6 ativa participam do funcionamento do sistema nervoso.",
      "A proposta é apoiar o bem-estar feminino na TPM, na perimenopausa e na menopausa, com atenção a calorões, sono e humor. Por conter isoflavonas e cimicífuga, converse com seu profissional de saúde antes de usar, principalmente se utilizar medicamentos ou tiver alguma condição hormonal ou hepática.",
    ],
    ingredients: [
      ["Lactobacillus reuteri", "3 bilhões UFC"],
      ["Lactobacillus gasseri", "3 bilhões UFC"],
      ["Lactobacillus helveticus", "3 bilhões UFC"],
      ["Bifidobacterium longum (1714)", "3 bilhões UFC"],
      ["Lactobacillus plantarum", "3 bilhões UFC"],
      ["Galactooligossacarídeos (GOS)", "200 mg"],
      ["Frutooligossacarídeos (FOS)", "150 mg"],
      ["Inulina", "100 mg"],
      ["Isoflavonas de soja padronizadas", "50 mg"],
      ["Cimicifuga racemosa (extrato seco)", "40 mg"],
      ["Magnésio bisglicinato", "100 mg"],
      ["Vitamina B6 ativa (P5P)", "10 mg"],
      ["Excipiente celulose q.s.p.", "1 dose"],
    ],
  },
  {
    id: "hair-skin",
    name: "Hair & Skin",
    category: "Pele, cabelos e unhas",
    summary:
      "Silício, biotina e zinco para o cuidado nutricional com a pele, os cabelos e as unhas.",
    color: "#c09257",
    image: "hair-skin",
    capsules: 60,
    dose: 2,
    basePrice: null,
    label: "HAIR & SKIN - 17x5.pdf",
    emphasis: "Beleza também se nutre por dentro.",
    tags: ["beleza"],
    description:
      "Uma fórmula de nutrientes com silício orgânico, MSM, cistina, zinco, biotina e vitaminas B5, E e C. Desenvolvida para fazer parte do cuidado nutricional com pele, cabelos e unhas.",
    howItWorks: [
      "O Hair & Skin reúne nutrientes que participam da formação de cabelos, pele e unhas. O silício orgânico e a vitamina C estão ligados ao colágeno, o MSM e a cistina fornecem enxofre, base da queratina, e a biotina, o zinco e a vitamina B5 participam do crescimento dos fios. A vitamina E tem ação antioxidante.",
      "Com o uso diário, a proposta é nutrir de dentro para fora, para apoiar fios mais fortes, unhas mais resistentes e uma pele com mais firmeza. Queda intensa de cabelo merece avaliação profissional, e é importante informar o uso de biotina antes de exames laboratoriais.",
    ],
    ingredients: [
      ["Silício orgânico", "200 mg"],
      ["MSM", "150 mg"],
      ["Cistina", "50 mg"],
      ["Zinco", "10 mg"],
      ["Biotina", "5 mg"],
      ["Vitamina B5", "100 mg"],
      ["Vitamina E", "30 UI"],
      ["Vitamina C", "50 mg"],
      ["Excipiente celulose q.s.p.", "1 dose"],
    ],
  },
];
// Explicit totals verified against each Payt offer. Do not infer kit discounts.
export const price = (p: Product, q: Quantity) =>
  q === 1 ? p.basePrice : q === 3 ? (p.price3 ?? null) : (p.price6 ?? null);
export const checkoutUrl = (p: Product, q: Quantity) =>
  p.checkout?.[q]
    ? `https://checkout.payt.com.br/${p.checkout[q]}?split=12`
    : whatsapp(
        `Olá! Gostaria de saber o valor e a disponibilidade do DalFlore ${p.name}, ${q} ${q === 1 ? "frasco" : "frascos"}.`,
      );
