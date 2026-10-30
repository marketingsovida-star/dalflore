# DalFlore

Novo site independente da DalFlore, em React, TypeScript e Vite. Referências: loja Metabolia (estrutura editorial e catálogo), B’zon (hierarquia) e Duet Health (atmosfera acolhedora e abas de marca/especialista).

Tipografia da DalFlore: Open Sans local para títulos e frases descritivas; Arial para textos de leitura. Os contornos individuais dos seis frascos ficam em `src/assets/masks`, preservando as imagens e os rótulos originais. A área de fotos dos cards acomoda o frasco inteiro, inclusive em telas pequenas.

## Desenvolvimento

```sh
npm ci
npm run dev
npm run build
```

O build inclui verificação de tipos. Publicação automática pelo GitHub Actions/GitHub Pages ao enviar para `main`. O `base: './'` permite a prévia no subdiretório do repositório sem alterar o domínio atual.

## Conteúdo e interações

- Seis fórmulas; filtro por interesse e busca.
- Clique no mockup abre detalhes acessíveis com composição e modo de uso, sem páginas individuais. Link direto: `#produto/gutcare`.
- Quantidades de 1, 3 e 6 frascos; carrinho persistido localmente.
- Cada kit possui seu link de checkout oficial. Pedido com vários kits pode ser encaminhado ao WhatsApp; nenhum endpoint de carrinho combinado foi presumido.
- Conteúdo educativo com fontes científicas e diagrama interativo das vias neural, metabólica e imune.
- Biografia e marca em duas abas, sem mudança de altura.
- Modais nativos com foco contido, Escape, navegação por teclado e suporte a movimento reduzido.

Imagens originais e PDFs enviados ficam em `public/products`, `public/brand` e `public/labels`. As versões WebP são otimizadas para a web. Os textos e ofertas estão em `src/catalog.ts`.

Veja [fontes e pendências](docs/fontes-e-pendencias.md) antes de trocar o domínio principal.

## Direção visual da Aline

Paleta de sálvia, marfim e rosado, contornos botânicos discretos e conteúdos científicos em camadas: explicação breve, detalhes e fonte. Retrato fornecido pela cliente em `public/aline-retrato.webp`. As faixas e o guia foram removidos. `src/refinement.css` concentra essa direção visual.
