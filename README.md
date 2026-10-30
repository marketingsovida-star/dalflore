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

- Seis fórmulas em carrossel manual, com navegação por setas, arraste e busca por nome ou interesse.
- Clique no mockup abre detalhes acessíveis com composição e modo de uso, sem páginas individuais. Link direto: `#produto/gutcare`.
- Quantidades de 1, 3 e 6 frascos; carrinho persistido localmente.
- Cada kit possui seu link de checkout oficial. Pedido com vários kits pode ser encaminhado ao WhatsApp; nenhum endpoint de carrinho combinado foi presumido.
- Conteúdo educativo com fontes científicas e diagrama interativo das vias neural, metabólica e imune.
- Biografia e marca em duas abas, com introdução breve e história completa expansível.
- Modais nativos com foco contido, Escape, navegação por teclado e suporte a movimento reduzido.

Imagens originais e PDFs enviados ficam em `public/products`, `public/brand` e `public/labels`. As versões WebP são otimizadas para a web. Os textos e ofertas estão em `src/catalog.ts`.

Veja [fontes e pendências](docs/fontes-e-pendencias.md) antes de trocar o domínio principal.

## Direção visual da Aline

Interface exclusivamente em branco, preto e verde, com contraste forte e contornos definidos. Conteúdos científicos em camadas: explicação breve, detalhes e fonte. Retrato fornecido pela cliente em `public/aline-retrato.webp`. O guia foi removido. O topo usa o formato de banners e faixa da Sanoví, conforme a revisão mais recente.

O sistema usa um único raio de 12 px para superfícies e controles e a mesma largura de conteúdo. A composição editorial foi reconstruída em `src/design.css`; as folhas de ajustes anteriores foram removidas, junto com os estilos antigos da página inicial. A loja ocupa uma única fileira navegável. Conteúdo científico e biográfico tem introdução breve e detalhes expansíveis. No celular, a imagem decorativa da microbiota é omitida, o diagrama do eixo fica horizontal e a foto da Aline acompanha o título para evitar empilhar blocos grandes.

As referências e decisões de layout estão em `docs/design-study.json`. Os arquivos de campanha e ilustração conceitual estão em `public/editorial`; foram criados com o gerador de imagens integrado a partir dos materiais da marca. Os prompts e a procedência estão em `docs/image-prompts.json`. Os mockups da loja, os rótulos, as composições, preços e links oficiais continuam originais. Essas imagens editoriais podem ser substituídas sem reconstruir o layout.

O FAQ mantém os blocos expansíveis da Duet, com quatro perguntas iniciais e um botão para exibir todas as oito. As respostas abrem em 500 ms. `src/useSmoothMotion.ts` usa entradas de 850 ms e rolagem de 650–1.400 ms. As abas fazem transições de 600 ms; expansores aumentam a leitura apenas quando abertos. O carrossel de produtos não avança automaticamente. As interações respeitam a preferência por movimento reduzido. `src/design.css` concentra o sistema visual e o movimento.

## Banners da página inicial

`src/HomeBanners.tsx` e `src/banners.css` mantêm o tamanho aprovado da Sanoví: no desktop, imagem de `100svh - 52px` e faixa de 52 px; no celular, imagem de `min(43svh, 420px)`, faixa de 48 px, controles e texto abaixo. A foto principal acompanha a altura disponível, preservando sua proporção e evitando o corte vertical. Uma cópia da própria foto preenche o fundo com desfoque suave, e uma máscara na borda faz a transição sem áreas vazias. O enquadramento da Aline é específico para telas mais estreitas. Nenhum novo arquivo de imagem foi criado nesta correção. As imagens enviadas `BANNER 1.png`, `BANNER 2.png` e `BANNER 3.png` foram convertidas para WebP sem geração ou alteração do conteúdo, em `public/banners/banner-1.webp` a `banner-3.webp`. A ordem é Aline/GUTcare, Slim Balance e Hair & Skin/Immune. O Slim Balance usa a nova imagem enviada `4a2077cb-55af-4436-be28-94730027e78f.png`, otimizada em `public/banners/slim-balance-banner.webp`. Cada entrada associa explicitamente imagem, texto e ação para que a reordenação preserve o produto correto.

Transição de imagem de 800 ms, troca a cada sete segundos, pausa explícita, pausa ao interagir, seleção direta, setas, teclado e gesto horizontal. Movimento reduzido desativa avanço automático e animações. Os botões abrem os detalhes dos produtos existentes. O cabeçalho fica fixo e oculto/inativo enquanto qualquer parte da seção de banners estiver visível; aparece suavemente ao sair dela.

Os textos, logo e controles dos banners são alinhados à esquerda dentro do bloco de conteúdo existente. Hair & Skin e Immune têm botões lado a lado, com a mesma largura, altura, cor e estilo no desktop e no celular. As dimensões do banner e as posições das imagens permanecem as aprovadas.
