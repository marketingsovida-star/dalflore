export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
export const support = 'https://wa.me/5551997264646';
export const whatsapp = (message: string) => `${support}?text=${encodeURIComponent(message)}`;
export const brl = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
export type Quantity = 1 | 3 | 6;
export type Product = {
  id: string; name: string; category: string; summary: string; color: string; image: string;
  capsules: number; dose: number; basePrice: number | null; price3?: number; price6?: number;
  checkout?: Record<Quantity, string>; label: string; ingredients: [string, string][];
  description: string; mechanism: string; emphasis: string; tags: string[];
};
const payt = (a: string, b: string, c: string) => ({ 1: a, 3: b, 6: c });
export const products: Product[] = [
  {
    id: 'gutcare', name: 'GUTcare', category: 'Saúde intestinal', summary: 'Probióticos e FOS para um olhar integrado sobre a microbiota intestinal.',
    color: '#6b9c58', image: 'gutcare', capsules: 30, dose: 1, basePrice: 88.8,
    checkout: payt('a2350f840983256496adb9028ca00bcc','4a8dc8eb112e7d1f36adebcc498a0793','d4a91ef7ff99e515e4cd642736a65713'),
    label: 'GUTCARE - 17x5.pdf', emphasis: 'O cuidado começa por dentro.', tags: ['intestino', 'microbiota', 'prebiotico'],
    description: 'Uma fórmula que reúne quatro cepas de Lactobacillus e Bifidobacterium e o prebiótico FOS. Pensada para integrar uma rotina de cuidado com a saúde intestinal, respeitando as necessidades de cada pessoa.',
    mechanism: 'Os probióticos são microrganismos vivos. O FOS é um substrato utilizado por determinados microrganismos intestinais. A resposta depende das cepas, das quantidades utilizadas e do contexto individual. Alimentação e acompanhamento profissional fazem parte desse cuidado.',
    ingredients: [['Lactobacillus plantarum LP01','6 bilhões UFC'],['Lactobacillus rhamnosus HN001','5 bilhões UFC'],['Lactobacillus helveticus Rosell-52','2 bilhões UFC'],['Bifidobacterium longum R0175','2 bilhões UFC'],['FOS (frutooligossacarídeos)','150 mg'],['Excipiente celulose q.s.p.','1 dose']],
  },
  {
    id: 'concentra', name: 'Concentra+', category: 'Foco e cognição', summary: 'Cinco cepas, prebióticos, colina e B6 em uma fórmula com olhar para o eixo intestino–cérebro.',
    color: '#b18637', image: 'concentra', capsules: 60, dose: 2, basePrice: 129.9,
    checkout: payt('9452e285cf3236776fece62308081304','e06cbd0d4e0af26cbb2b6257cfeae101','8add2759381400a8d5b503bba0196d77'),
    label: 'CONCENTRA+ - 17x5.pdf', emphasis: 'Corpo e mente, na mesma conversa.', tags: ['foco', 'cognicao', 'prebiotico'],
    description: 'Fórmula com cinco cepas probióticas, GOS, FOS, colina e vitamina B6 ativa. Sua proposta parte de um olhar integrado para a nutrição e para a comunicação entre intestino e cérebro.',
    mechanism: 'A microbiota participa de vias de comunicação com o sistema nervoso. Essa relação é estudada pela ciência, mas o estudo de um ingrediente isolado não comprova o resultado de uma fórmula completa. A escolha deve considerar a sua rotina e a avaliação do profissional que acompanha você.',
    ingredients: [['Lactobacillus rhamnosus GG','5 bilhões UFC'],['Lactobacillus plantarum PS128','4 bilhões UFC'],['Bifidobacterium longum 1714','4 bilhões UFC'],['Lactobacillus helveticus R0052','3 bilhões UFC'],['Bifidobacterium breve','4 bilhões UFC'],['Galactooligossacarídeos (GOS)','150 mg'],['Frutooligossacarídeos (FOS)','100 mg'],['Colina bitartarato','100 mg'],['Vitamina B6 ativa (P5P)','5 mg'],['Excipiente celulose q.s.p.','1 dose']],
  },
  {
    id: 'immune', name: 'Immune', category: 'Saúde imunológica', summary: 'Quatro cepas probióticas combinadas a FOS, inulina e beta-glucanas.',
    color: '#699dc0', image: 'immune', capsules: 30, dose: 1, basePrice: 179.5,
    checkout: payt('84129a79ce46f883426653c20999fc1b','4701fc9a1a42dce96d492227039621f6','1bfa89993558c5e961a9884ab779af5b'),
    label: 'IMMUNE - 17x5.pdf', emphasis: 'Um olhar para suas defesas naturais.', tags: ['imunidade', 'intestino', 'prebiotico'],
    description: 'Combina Lactobacillus e Bifidobacterium com os prebióticos FOS e inulina, além de beta-glucanas. Uma proposta de cuidado que considera a relação entre microbiota e sistema imune.',
    mechanism: 'O intestino e o sistema imune mantêm uma relação próxima. A composição foi pensada a partir dessa conexão. Benefícios de probióticos são específicos de cepa e dose; não se deve generalizar resultados de um estudo para qualquer produto.',
    ingredients: [['Lactobacillus rhamnosus GG','10 bilhões UFC'],['Bifidobacterium lactis Bl-04','10 bilhões UFC'],['Lactobacillus plantarum Lp-115','5 bilhões UFC'],['Bifidobacterium longum BB536','3 bilhões UFC'],['FOS','100 mg'],['Inulina','150 mg'],['Beta-glucanas','100 mg'],['Excipiente celulose q.s.p.','1 dose']],
  },
  {
    id: 'slim-balance', name: 'Slim Balance', category: 'Equilíbrio metabólico', summary: 'Quatro cepas probióticas em uma proposta de cuidado com o equilíbrio metabólico.',
    color: '#a47daf', image: 'slim-balance', capsules: 30, dose: 1, basePrice: 129.9,
    checkout: payt('1642f2568484cb628f82f65ae7c18e12','760f92518081d316df97047c90f917d9','4704ba857f9909fff551c9c27263f21a'),
    label: 'SLIM BALANCE - 17x5.pdf', emphasis: 'Equilíbrio se constrói todos os dias.', tags: ['metabolismo', 'intestino'],
    description: 'Uma combinação de quatro cepas probióticas para integrar o cuidado com a microbiota em uma rotina de saúde metabólica. O cuidado com o peso envolve alimentação, movimento, sono e acompanhamento individual.',
    mechanism: 'A relação entre microbiota e metabolismo é uma área ativa de pesquisa. Estudos com cepas específicas não significam que todo probiótico produz o mesmo efeito. A fórmula não substitui uma alimentação equilibrada e não garante perda de peso.',
    ingredients: [['Lactobacillus gasseri BNR17','5 bilhões UFC'],['Lactobacilos delbrueckii','5 bilhões UFC'],['Bifidobacterium lactis B420','5 bilhões UFC'],['Lactobacillus rhamnosus CGMCC 1.3724','5 bilhões UFC'],['Excipiente celulose q.s.p.','1 dose']],
  },
  {
    id: 'cycle', name: 'Cycle', category: 'Cuidado feminino', summary: 'Probióticos, prebióticos e nutrientes em uma fórmula voltada ao cuidado feminino.',
    color: '#cd9290', image: 'cycle', capsules: 60, dose: 2, basePrice: 279, price3: 717, price6: 1182,
    checkout: payt('f5d0825fd6b92baa6d8267e594ee88ed','878f5f9e636d573852ea900d162e0430','4f7a60b63a6a24efa7321bf7dbb22a65'),
    label: 'CYCLE - 17x5.pdf', emphasis: 'Um cuidado que respeita suas fases.', tags: ['feminino', 'prebiotico'],
    description: 'Reúne cinco cepas probióticas, três prebióticos, isoflavonas de soja, cimicífuga, magnésio e vitamina B6 ativa. Uma composição que pede um olhar individual para a saúde da mulher.',
    mechanism: 'A fórmula combina microrganismos, substratos e compostos bioativos. Por conter isoflavonas e cimicífuga, é importante avaliar sua adequação com o profissional de saúde, especialmente em caso de uso de medicamentos, condições hormonais ou problemas hepáticos.',
    ingredients: [['Lactobacillus reuteri','3 bilhões UFC'],['Lactobacillus gasseri','3 bilhões UFC'],['Lactobacillus helveticus','3 bilhões UFC'],['Bifidobacterium longum (1714)','3 bilhões UFC'],['Lactobacillus plantarum','3 bilhões UFC'],['Galactooligossacarídeos (GOS)','200 mg'],['Frutooligossacarídeos (FOS)','150 mg'],['Inulina','100 mg'],['Isoflavonas de soja padronizadas','50 mg'],['Cimicifuga racemosa (extrato seco)','40 mg'],['Magnésio bisglicinato','100 mg'],['Vitamina B6 ativa (P5P)','10 mg'],['Excipiente celulose q.s.p.','1 dose']],
  },
  {
    id: 'hair-skin', name: 'Hair & Skin', category: 'Pele, cabelos e unhas', summary: 'Silício orgânico, MSM, cistina, vitaminas e minerais para complementar o cuidado nutricional.',
    color: '#c09257', image: 'hair-skin', capsules: 60, dose: 2, basePrice: null,
    label: 'HAIR & SKIN - 17x5.pdf', emphasis: 'Beleza também se nutre por dentro.', tags: ['beleza'],
    description: 'Uma fórmula de nutrientes com silício orgânico, MSM, cistina, zinco, biotina e vitaminas B5, E e C. Desenvolvida para fazer parte do cuidado nutricional com pele, cabelos e unhas.',
    mechanism: 'Nutrientes participam de processos normais do organismo. A necessidade de suplementação e a investigação de queixas como queda de cabelo devem ser avaliadas individualmente. Este produto é um nutracêutico; não contém probióticos ou prebióticos na composição.',
    ingredients: [['Silício orgânico','200 mg'],['MSM','150 mg'],['Cistina','50 mg'],['Zinco','10 mg'],['Biotina','5 mg'],['Vitamina B5','100 mg'],['Vitamina E','30 UI'],['Vitamina C','50 mg'],['Excipiente celulose q.s.p.','1 dose']],
  },
];
export const price = (p: Product, q: Quantity) => p.basePrice === null ? null : q === 1 ? p.basePrice : q === 3 ? p.price3 ?? Math.round(p.basePrice * 0.93 * 100) / 100 * 3 : p.price6 ?? Math.round(p.basePrice * 0.8 * 100) / 100 * 6;
export const checkoutUrl = (p: Product, q: Quantity) => p.checkout?.[q] ? `https://checkout.payt.com.br/${p.checkout[q]}?split=12` : whatsapp(`Olá! Gostaria de saber o valor e a disponibilidade do DalFlore ${p.name}, ${q} ${q === 1 ? 'frasco' : 'frascos'}.`);
export const categories = [{id:'todos',name:'Todas as fórmulas'}, {id:'intestino',name:'Intestino'}, {id:'foco',name:'Foco e cognição'}, {id:'imunidade',name:'Imunidade'}, {id:'feminino',name:'Cuidado feminino'}, {id:'beleza',name:'Beleza'}, {id:'metabolismo',name:'Metabolismo'}];

