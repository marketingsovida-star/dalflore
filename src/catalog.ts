export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
export const support = "https://wa.me/5551997264646";
export const whatsapp = (message: string) =>
  `${support}?text=${encodeURIComponent(message)}`;
export const contactUrl = whatsapp(
  "Olá! Estou com dúvidas com relação a DalFlore.",
);
export const refundMessage = "Gostaria de solicitar a devolução e reembolso do meu pedido";
export const brl = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
export type Quantity = 1 | 3 | 6;
export type Study = { id: string; title: string; source: string };
export type Product = {
  id: string;
  name: string;
  category: string;
  descriptor: string;
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
  studies: Study[];
  emphasis: string;
  tags: string[];
};
const payt = (a: string, b: string, c: string) => ({ 1: a, 3: b, 6: c });
export const products: Product[] = [
  {
    id: "gutcare",
    name: "GUTcare",
    category: "Saúde intestinal",
    descriptor: "Saúde Intestinal",
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
      "Os probióticos levam microrganismos benéficos ao intestino e o FOS ajuda a nutri-los. Com o uso diário, a proposta é apoiar a regularidade intestinal e o conforto digestivo, ajudando a reduzir a sensação de inchaço e gases.",
    ],
    studies: [
      {
        id: "25070051",
        title: "Efficacy of prebiotics, probiotics, and synbiotics in irritable bowel syndrome and chronic idiopathic constipation: systematic review and meta-analysis",
        source: "The American journal of gastroenterology, 2014",
      },
      {
        id: "17951492",
        title: "Inulin-type fructans: functional food ingredients",
        source: "The Journal of nutrition, 2007",
      },
      {
        id: "25860609",
        title: "Indigenous bacteria from the gut microbiota regulate host serotonin biosynthesis",
        source: "Cell, 2015",
      },
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
    descriptor: "Foco e Cognição",
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
      "A colina é a base da acetilcolina, mensageiro ligado à memória e ao aprendizado, e a vitamina B6 ativa participa da produção de neurotransmissores. A proposta é apoiar o foco, a clareza mental e a memória sem estimulantes, cuidando também da resposta ao estresse.",
    ],
    studies: [
      {
        id: "39232392",
        title: "The effects of Lactobacillus plantarum PS128 in patients with major depressive disorder: an eight-week double-blind, placebo-controlled study",
        source: "Asian journal of psychiatry, 2024",
      },
      {
        id: "27801892",
        title: "Bifidobacterium longum 1714 as a translational psychobiotic: modulation of stress, electrophysiology and neurocognition in healthy volunteers",
        source: "Translational psychiatry, 2016",
      },
      {
        id: "20974015",
        title: "Assessment of psychotropic-like properties of a probiotic formulation (Lactobacillus helveticus R0052 and Bifidobacterium longum R0175) in rats and human subjects",
        source: "The British journal of nutrition, 2011",
      },
      {
        id: "25449699",
        title: "Prebiotic intake reduces the waking cortisol response and alters emotional bias in healthy volunteers",
        source: "Psychopharmacology, 2015",
      },
      {
        id: "22071706",
        title: "The relation of dietary choline to cognitive performance and white-matter hyperintensity in the Framingham Offspring Cohort",
        source: "The American journal of clinical nutrition, 2011",
      },
      {
        id: "25830558",
        title: "The gut-brain axis: interactions between enteric microbiota, central and enteric nervous systems",
        source: "Annals of gastroenterology, 2015",
      },
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
    descriptor: "Saúde Imunológica",
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
      "Grande parte das células de defesa do corpo está no intestino. Os prebióticos nutrem as bactérias benéficas e as beta-glucanas são estudadas pela ação sobre as células de defesa. A proposta é apoiar a barreira intestinal e as defesas naturais, principalmente nas mudanças de estação.",
    ],
    studies: [
      {
        id: "40612762",
        title: "Role of Lacticaseibacillus rhamnosus GG in the Management of Respiratory Diseases: A Systematic Review and Meta-Analysis",
        source: "Preventive nutrition and food science, 2025",
      },
      {
        id: "24780623",
        title: "Effectiveness of probiotics on the duration of illness in healthy children and adults who develop common acute respiratory infectious conditions: a systematic review and meta-analysis",
        source: "The British journal of nutrition, 2014",
      },
      {
        id: "24268677",
        title: "Probiotic supplementation for respiratory and gastrointestinal illness symptoms in healthy physically active individuals",
        source: "Clinical nutrition (Edinburgh, Scotland), 2014",
      },
      {
        id: "16689181",
        title: "Effect of probiotic Bifidobacterium longum BB536 in relieving clinical symptoms and modulating plasma cytokine levels of Japanese cedar pollinosis during the pollen season. A randomized double-blind, placebo-controlled trial",
        source: "Journal of investigational allergology & clinical immunology, 2006",
      },
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
    descriptor: "Gerenciamento do Peso",
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
      "L. gasseri BNR17, B. lactis B420 e L. rhamnosus CGMCC 1.3724 foram pesquisadas em adultos, com foco em gordura corporal, circunferência abdominal e saciedade. Não é termogênico nem estimulante: a proposta é apoiar o metabolismo pelo cuidado com o intestino, sem garantia de perda de peso.",
    ],
    studies: [
      {
        id: "29688793",
        title: "Lactobacillus gasseri BNR17 Supplementation Reduces the Visceral Fat Accumulation and Waist Circumference in Obese Adults: A Randomized, Double-Blind, Placebo-Controlled Trial",
        source: "Journal of medicinal food, 2018",
      },
      {
        id: "30525950",
        title: "Probiotic or synbiotic alters the gut microbiota and metabolism in a randomised controlled trial of weight management in overweight adults",
        source: "Beneficial microbes, 2019",
      },
      {
        id: "24299712",
        title: "Effect of Lactobacillus rhamnosus CGMCC1.3724 supplementation on weight loss and maintenance in obese men and women",
        source: "The British journal of nutrition, 2014",
      },
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
    descriptor: "Equilíbrio Feminino",
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
      "Os prebióticos nutrem a microbiota, incluindo bactérias ligadas ao metabolismo do estrogênio, e as isoflavonas e a cimicífuga são estudadas nos sintomas da menopausa. A proposta é apoiar a TPM, a perimenopausa e a menopausa, com atenção a calorões, sono e humor. Converse com seu profissional de saúde antes de usar, principalmente se utilizar medicamentos ou tiver alguma condição hormonal ou hepática.",
    ],
    studies: [
      {
        id: "28778332",
        title: "Estrogen-gut microbiome axis: Physiological and clinical implications",
        source: "Maturitas, 2017",
      },
      {
        id: "22433977",
        title: "Extracted or synthesized soybean isoflavones reduce menopausal hot flash frequency and severity: systematic review and meta-analysis of randomized controlled trials",
        source: "Menopause (New York, N.Y.), 2012",
      },
      {
        id: "22972105",
        title: "Black cohosh (Cimicifuga spp.) for menopausal symptoms",
        source: "The Cochrane database of systematic reviews, 2012",
      },
      {
        id: "23853635",
        title: "The effect of magnesium supplementation on primary insomnia in elderly: A double-blind placebo-controlled clinical trial",
        source: "Journal of research in medical sciences : the official journal of Isfahan University of Medical Sciences, 2012",
      },
      {
        id: "27801892",
        title: "Bifidobacterium longum 1714 as a translational psychobiotic: modulation of stress, electrophysiology and neurocognition in healthy volunteers",
        source: "Translational psychiatry, 2016",
      },
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
    descriptor: "Cabelo e Unhas",
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
      "O silício e a vitamina C estão ligados ao colágeno, o MSM e a cistina fornecem enxofre, base da queratina, e a biotina, o zinco e a vitamina B5 participam do crescimento dos fios. A proposta é apoiar fios mais fortes, unhas mais resistentes e uma pele com mais firmeza. Queda intensa de cabelo merece avaliação profissional, e o uso de biotina deve ser informado antes de exames laboratoriais.",
    ],
    studies: [
      {
        id: "16205932",
        title: "Effect of oral intake of choline-stabilized orthosilicic acid on skin, nails and hair in women with photodamaged skin",
        source: "Archives of dermatological research, 2005",
      },
      {
        id: "39148962",
        title: "Biotin for Hair Loss: Teasing Out the Evidence",
        source: "The Journal of clinical and aesthetic dermatology, 2024",
      },
      {
        id: "30547302",
        title: "The Role of Vitamins and Minerals in Hair Loss: A Review",
        source: "Dermatology and therapy, 2019",
      },
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
