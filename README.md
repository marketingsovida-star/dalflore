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

- Seis fórmulas em grade, com duas linhas de três cards no desktop, duas colunas no tablet e uma no celular; navegação direta pelos cards.
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

O sistema usa um único raio de 12 px para superfícies e controles e a mesma largura de conteúdo. A composição editorial foi reconstruída em `src/design.css`; as folhas de ajustes anteriores foram removidas, junto com os estilos antigos da página inicial. A loja apresenta os seis produtos diretamente em uma grade, sem navegação ou rolagem lateral. Conteúdo científico e biográfico tem introdução breve e detalhes expansíveis. No celular, as ilustrações científicas aparecem logo depois das abas e antes da explicação. A foto da Aline acompanha o título para evitar empilhar blocos grandes.

As referências e decisões de layout estão em `docs/design-study.json`. Os arquivos de campanha e ilustração conceitual estão em `public/editorial`; foram criados com o gerador de imagens integrado a partir dos materiais da marca. Os prompts e a procedência estão em `docs/image-prompts.json`. Os mockups da loja, os rótulos, as composições, preços e links oficiais continuam originais. Essas imagens editoriais podem ser substituídas sem reconstruir o layout.

O FAQ mantém os blocos expansíveis da Duet, com quatro perguntas iniciais e um botão para exibir todas as oito. As respostas abrem em 500 ms. `src/useSmoothMotion.ts` usa entradas de 850 ms e rolagem de 650–1.400 ms. As abas fazem transições de 600 ms; expansores aumentam a leitura apenas quando abertos. Os produtos permanecem em uma grade estática. As interações respeitam a preferência por movimento reduzido. `src/design.css` concentra o sistema visual e o movimento.

## Banners da página inicial

`src/HomeBanners.tsx` e `src/banners.css` mantêm o tamanho aprovado da Sanoví: no desktop, imagem de `100svh - 52px` e faixa de 52 px; no celular, imagem de `min(43svh, 420px)`, faixa de 48 px, controles e texto abaixo. A foto principal acompanha a altura disponível, preservando sua proporção e evitando o corte vertical. Uma cópia da própria foto preenche o fundo com desfoque suave, e uma máscara na borda faz a transição sem áreas vazias. O enquadramento da Aline é específico para telas mais estreitas. Nenhum novo arquivo de imagem foi criado nesta correção. As imagens enviadas `BANNER 1.png`, `BANNER 2.png` e `BANNER 3.png` foram convertidas para WebP sem geração ou alteração do conteúdo, em `public/banners/banner-1.webp` a `banner-3.webp`. A ordem é Aline/GUTcare, Slim Balance e Hair & Skin/Immune. O Slim Balance usa a nova imagem enviada `4a2077cb-55af-4436-be28-94730027e78f.png`, otimizada em `public/banners/slim-balance-banner.webp`. Cada entrada associa explicitamente imagem, texto e ação para que a reordenação preserve o produto correto.

Transição de imagem de 800 ms, troca a cada sete segundos, pausa explícita, pausa ao interagir, seleção direta, setas, teclado e gesto horizontal. Movimento reduzido desativa avanço automático e animações. Os botões abrem os detalhes dos produtos existentes. O cabeçalho fica fixo e oculto/inativo enquanto qualquer parte da seção de banners estiver visível; aparece suavemente ao sair dela.

Os textos, logo e controles dos banners são alinhados à esquerda dentro do bloco de conteúdo existente. Hair & Skin e Immune têm botões lado a lado, com a mesma largura, altura, cor e estilo no desktop e no celular. As dimensões do banner e as posições das imagens permanecem as aprovadas.

Os três banners compartilham a mesma grade de conteúdo: títulos com duas linhas, descrições curtas de até três linhas e botões nas mesmas coordenadas. A logo desktop mede 92 px de altura (64 px em janelas baixas). Botões têm 52 px em desktops largos e 64 px nas telas menores, incluindo as duas ações equivalentes de Hair & Skin e Immune. Os controles ficam 12 px abaixo dos botões; no celular, também aparecem após o conteúdo para manter essa proximidade. Os textos são exibidos por completo, sem cortes ou reticências.

Na revisão de 3 de novembro, as descrições dos banners passaram a identificar cada produto, ingredientes e finalidade. As fontes e limites de alegações estão em `docs/banner-copy-sources.json`. A faixa tem espaçamentos menores, sem distribuição pelo viewport inteiro. As descrições reservam três linhas também em desktops largos.

A faixa de benefícios usa seis itens distintos: Ingredientes selecionados, Até 12x no cartão, Frete grátis a partir de R$ 150, Compra segura, Atendimento pelo WhatsApp e 7 dias de garantia. Cada item ocupa um quinto da largura da faixa no desktop (a partir de 1024 px), metade no tablet e cerca de 83% no celular. Assim, aparecem aproximadamente cinco benefícios por vez no desktop, com largura mínima de 240 px por item para preservar a leitura em janelas menores. A sequência só se repete depois dos seis itens. Duas sequências idênticas mantêm o loop contínuo a 37 px/s. ResizeObserver adapta as medidas ao redimensionar; cópias visuais ficam ocultas de leitores de tela.

## Revisão dos cards da loja

Cards brancos contínuos, sem painel verde ou divisão na foto. Mockups de 310 px de altura, com máscaras originais e sombra de apoio. Categorias recebem ícones funcionais, e o nome do produto abre os detalhes pelo controle de expansão. A composição e a finalidade são resumidas em três linhas completas, sem truncamento. Kits, preços, checkout e carrinho mantêm as regras existentes. As referências, decisões e diretrizes usadas estão em `docs/shop-design-study.json`.

A busca foi removida: não há ícone de pesquisa no cabeçalho, botão Buscar fórmula na loja ou modal de pesquisa. Os produtos são acessados diretamente pelos seis cards.

O diagrama do eixo usa um ícone de intestino com contorno do cólon e alças internas. A origem e a licença estão em docs/intestine-icon-source.json e docs/licenses/healthicons.txt.

## Jornada científica integrada

Após os banners e a faixa, o respiro branco “Quando sua flora floresce, você floresce” leva à loja. Em seguida, `ScienceJourney.tsx` apresenta microbiota e eixo intestino–cérebro no mesmo fundo #205b36, antes dos produtos. As abas atualizam explicação, ilustração e exemplo de fórmula; os links abrem os detalhes existentes.

Os símbolos mostram substratos, microrganismos, intestino e cérebro. Partículas e setas indicam alimentação ou comunicação bidirecional, com legenda conceitual, pausa e respeito a movimento reduzido. Navegação por teclado, fontes primárias e explicações visíveis preservam clareza e acesso. As definições e exemplos não substituem evidências clínicas específicas de cada fórmula.

Fontes: [ISAPP: prebióticos](https://isappscience.org/resource/prebiotics/), [ISAPP: definições](https://isappscience.org/resource/probiotics-prebiotics-synbiotics-postbiotics-and-fermented-foods-defined/), [Cryan et al., 2019](https://pubmed.ncbi.nlm.nih.gov/31460832/). Composição dos exemplos conferida no catálogo original.

A revisão visual seguinte substitui as caixas de diagramas pequenos por ilustrações vetoriais maiores: uma composição inspirada em microbiologia e outra dedicada ao eixo intestino–cérebro. As colunas se alternam no desktop, com controles integrados e exemplos de produtos em destaque compacto. Referências, direção de arte e verificações estão em `docs/science-visual-study.json`. Nenhuma imagem ou alegação clínica foi copiada da Seed.

Os textos científicos agora mostram definição, benefícios ou importância e link científico em cada aba, sem conteúdo expansível. Os benefícios têm até cinco linhas em 320 px, sem truncamento. Os exemplos de ingredientes saíram da definição de prebióticos; os trechos dos produtos mantêm suas composições e objetivos. As fontes da revisão estão em `docs/science-copy-sources.json`.

A explicação e os benefícios agora formam um único parágrafo por aba, sem os rótulos “Benefícios” e “Por que importa”. O bloco final “É por isso que cada fórmula é diferente”, incluindo sua chamada para a loja, foi removido.

## Mapa científico interativo

A revisão mais recente reúne os dois desenhos em uma única seção `#ciencia`, com cabeçalho, instrução de clique e um controle de pausa compartilhado. Pontos com “+” abrem as explicações em um diálogo; os órgãos e o grupo de microrganismos também são clicáveis. Os seis temas anteriores continuam disponíveis, além das visões gerais de microbiota e conexão intestino–cérebro. Texto, fonte e relação com o produto aparecem na janela. A loja vem em seguida.

As duas ilustrações compartilham escala, contornos e estilo de controles. Desktop usa duas colunas; celular empilha os desenhos. `#eixo` permanece como âncora da segunda ilustração. O componente `Overlay.tsx` é compartilhado pelos diálogos científicos e comerciais, preservando foco, Escape e transições existentes. As fontes científicas permanecem em `docs/science-copy-sources.json`; a revisão de composição está em `docs/science-explorer.json`.

Na revisão seguinte, o cabeçalho foi centralizado com o título e subtítulo pedidos, e o botão de pausa foi removido. Os seis temas ficam em controles separados abaixo das ilustrações. O grupo de microrganismos abre a visão geral de microbiota, sem identificar toda bactéria desenhada como probiótico. Os desenhos são conceituais: prebióticos são substâncias, probióticos são microrganismos que cumprem critérios específicos e simbióticos são combinações avaliadas em conjunto.

A composição atual coloca seis cards compactos em três colunas e duas linhas no centro, entre as ilustrações. A primeira linha reúne os três conceitos de bióticos; a segunda, as três vias de comunicação. Ambos os desenhos usam o componente `DishFrame`, com o mesmo preenchimento e os mesmos contornos. Cérebro e intestino são símbolos sem bolhas ou rótulos, ligados por trajetos animados nos dois sentidos. Os títulos das ilustrações e o aviso conceitual foram removidos a pedido. No celular, a ordem é desenho da microbiota, grade central e desenho intestino–cérebro.

A revisão de proporções amplia a grade central para até 470 px e os cards para 102 px de altura no desktop, com tipografia de 14 px. As ilustrações têm limite de 280 px. O desenho intestino–cérebro usa duas curvas cúbicas contínuas e simétricas, cérebro ilustrado com preenchimento e sulcos internos, ramificações nervosas, moléculas e pequenos microrganismos. Molduras, cores, conteúdo e navegação permanecem compartilhados.

A correção do desenho intestino–cérebro remove os três pequenos microrganismos inferiores marcados pela cliente, substitui o cérebro ilustrado pelo ícone de contorno e reposiciona ambos os órgãos para dentro da moldura. Os trajetos e suas pontas terminam fora das áreas visíveis dos órgãos; os detalhes centrais também foram afastados dos contornos. As áreas de clique acompanham as novas posições.

## Por que cuidar da microbiota

`MicrobiotaWhy.tsx` acrescenta uma introdução entre o respiro da marca e o mapa científico, seguindo a composição da imagem de referência: título centralizado, explicação e três pontos numerados à esquerda, cinco conexões com a saúde à direita. O verde escuro, os contornos de 12 px, Open Sans e Arial mantêm a identidade. A entrada em conjunto usa o movimento existente; um traço molecular discreto e os estados de hover acrescentam movimento, com suporte a movimento reduzido. Os cinco itens abrem suas fontes científicas.

O texto explica funções e relações estudadas: digestão, defesas, saciedade, estresse/sono e pele. Não promete melhora generalizada, emagrecimento, tratamento de pele ou de sono, nem atribui esses resultados às fórmulas DalFlore. Fontes, direção visual e verificação: `docs/microbiota-why-study.json`.
