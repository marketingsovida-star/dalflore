# DalFlore

Novo site independente da DalFlore, em React, TypeScript e Vite. Referências: loja Metabolia (tipografia, estrutura editorial e catálogo) e Duet Health (retrato em arco e abas de marca/especialista).

## Desenvolvimento

```sh
npm ci
npm run dev
npm run build
```

O build inclui verificação de tipos. Publicação automática pelo GitHub Actions/GitHub Pages ao enviar para `main`. O `base: './'` permite a prévia no subdiretório do repositório sem alterar o domínio atual.

## Conteúdo e interações

- Seis fórmulas; filtro por interesse, busca, guia de exploração.
- Clique no mockup abre detalhes acessíveis com composição e modo de uso, sem páginas individuais. Link direto: `#produto/gutcare`.
- Quantidades de 1, 3 e 6 frascos; carrinho persistido localmente.
- Cada kit possui seu link de checkout oficial. Pedido com vários kits pode ser encaminhado ao WhatsApp; nenhum endpoint de carrinho combinado foi presumido.
- Conteúdo educativo com fontes científicas e diagrama interativo das vias neural, metabólica e imune.
- Biografia e marca em duas abas, sem mudança de altura.
- Modais nativos com foco contido, Escape, navegação por teclado e suporte a movimento reduzido.

Imagens originais e PDFs enviados ficam em `public/products`, `public/brand` e `public/labels`. As versões WebP são otimizadas para a web. Os textos e ofertas estão em `src/catalog.ts`.

Veja [fontes e pendências](docs/fontes-e-pendencias.md) antes de trocar o domínio principal.
