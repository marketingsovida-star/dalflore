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

Os cards usam cantos de 24 px e bordas verdes de 2 px; controles menores mantêm raio de 12 px. A largura de conteúdo é compartilhada. A composição editorial foi reconstruída em `src/design.css`; as folhas de ajustes anteriores foram removidas, junto com os estilos antigos da página inicial. A loja apresenta os seis produtos diretamente em uma grade, sem navegação ou rolagem lateral. Conteúdo científico e biográfico tem introdução breve e detalhes expansíveis. No celular, as ilustrações científicas aparecem logo depois das abas e antes da explicação. A foto da Aline acompanha o título para evitar empilhar blocos grandes.

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

`MicrobiotaWhy.tsx` acrescenta uma introdução entre o respiro da marca e o mapa científico, seguindo a composição da imagem de referência: título centralizado, explicação e três pontos numerados à esquerda, cinco conexões com a saúde à direita. O verde da marca, os cards arredondados, Open Sans e Arial mantêm a identidade. A entrada em conjunto usa o movimento existente; um traço molecular discreto e os estados de hover acrescentam movimento, com suporte a movimento reduzido. Os cinco itens abrem suas fontes científicas.

O texto explica funções e relações estudadas: digestão, defesas, saciedade, estresse/sono e pele. Não promete melhora generalizada, emagrecimento, tratamento de pele ou de sono, nem atribui esses resultados às fórmulas DalFlore. Fontes, direção visual e verificação: `docs/microbiota-why-study.json`.

O padrão global de cards está em `src/cards.css`: raio de 24 px, bordas de 2 px na mesma cor verde, painéis de microbiota e cards científicos com fundo e hover idênticos. Loja, FAQ, janelas e caixas informativas compartilham esses tokens; as superfícies claras mantêm seu fundo branco. A compensação do padding preserva exatamente a largura e a altura dos painéis de microbiota em 1100 px e 320 px. As ilustrações e os dados dos produtos permanecem intactos.

A seção científica ocupa no mínimo uma tela, com o conteúdo centralizado e as proporções originais preservadas; em celulares menores, cresce para acomodar os elementos sem cortes. Os painéis de microbiota vêm imediatamente abaixo, no mesmo fundo verde e sem cabeçalho externo. O título do primeiro card é “Por que cuidar da sua microbiota?”. A seção da Aline permanece após a loja.

As duas partes científicas agora compartilham `.df-science-block`: uma única altura mínima de tela, centralização vertical do conjunto e 16 px entre ilustrações e painéis. Os componentes internos não têm altura de tela própria. As dimensões dos elementos permanecem iguais; em telas menores o conjunto cresce sem cortes. O cabeçalho fica oculto e inerte enquanto o bloco científico ou o banner estiverem visíveis e retorna ao sair deles. A navegação para as âncoras científicas dispensa a reserva de espaço do cabeçalho.

O link “Explore essas conexões” foi removido. Os painéis inferiores usam intervalos internos ligeiramente menores (35 px a menos de altura no desktop de 1100 px), mantendo fontes e conteúdo. O bloco científico conserva a centralização conjunta e ganha margem externa mínima de 40 px no desktop e 32 px no celular.

O respiro branco “Quando sua flora floresce, você floresce” foi removido. A faixa do banner agora usa um degradê de verdes da composição científica, distinguindo-a do fundo sólido da seção seguinte. A velocidade e a continuidade da faixa permanecem iguais.

A faixa e o bloco científico compartilham agora o fundo sólido `--science-background: #205b36`, sem degradê. O conjunto científico usa grade com alinhamento vertical central e altura mínima de 100dvh (100svh como fallback), acompanhando a área visível da tela e preservando as dimensões internas.

A faixa usa agora o verde sólido #17452f, próximo ao verde da sobreposição do banner (#123d28), com contorno interno sutil. Esse tom diferencia a faixa do fundo científico #205b36 sem introduzir uma nova família de cores.

A altura mínima do fundo científico foi ampliada suavemente para 112dvh (112svh como fallback), mantendo o conjunto centralizado e as dimensões internas intactas.

Ajuste fino: o fundo científico passou de 112 para 108dvh, com o acréscimo de margem reduzido de 6 para 4svh em cada extremidade. A centralização e o conteúdo permanecem iguais.

O cabeçalho usa a logo branca original e o mesmo verde #17452f da faixa. Sua altura é de 66 px no desktop (antes 76) e 62 px no celular (antes 68); os links mantêm fonte de 15 px e área de 44 px no desktop, agora em caixa alta. As ações usam botões de 44 px/42 px e ícones de 24 px/23 px, com logo de 56 px/50 px de altura. `src/header.css` centraliza os ajustes e preserva o comportamento de ocultação no banner e no bloco científico. Menu mobile e carrinho foram conferidos.

A composição do cabeçalho foi reorganizada conforme a referência enviada: três links à esquerda (Produtos, Ciência, Dúvidas), símbolo branco central e ações preservadas à direita. `public/brand/symbol-white.svg` extrai somente o primeiro path do SVG branco original, sem redesenho. Uma faixa superior de 26 px (25 no celular) exibe “FRETE GRÁTIS NA COMPRA DE 3 OU 6 UNIDADES”. O menu mobile contém os mesmos três destinos; a ocultação no banner e no bloco científico permanece.

Ajuste fino no cabeçalho central: faixa escura de 60 px no desktop e 58 px no celular, com símbolo de 44/42 px de altura e 8 px de respiro vertical. Links, botões de ação e faixa superior de frete permanecem nas mesmas dimensões.

O cabeçalho ganhou iluminação estática e discreta: luz radial verde ao redor do símbolo, brilho secundário difuso e sombra luminosa suave na logo. O texto não recebe brilho; dimensões e áreas de clique permanecem iguais. O hover das ações acompanha essa luz com transição suave.

As ilustrações científicas agora usam molduras retangulares com raio de 24 px, contorno de 2 px em verdes graduais e detalhe interno mais suave. O componente compartilhado `ScienceSurface.tsx` preserva os desenhos SVG, acompanha o mouse com deslocamento máximo de 3 px por eixo e gera ondas discretas no ponto de passagem. Cérebro/intestino ampliam 8% no hover e no foco por teclado; a microbiota amplia 3,5%. Os ícones dos cards centrais ampliam 10% no hover. As molduras têm altura de 224 px (188 px no tablet), próxima da grade de temas; os controles acompanham a área real do SVG sem distorcer as ilustrações. Movimento reduzido desativa os efeitos, e o toque continua abrindo as explicações normalmente. Conferidos desktop 1100 px, tablet 768 px, celular 320 px, as três entradas dos desenhos, ondulação com mouse e aumento de 1,08 do cérebro.

A revisão seguinte remove completamente a geração de ondas/gotas e o brilho claro que acompanhava o ponteiro. As molduras agora têm fundo opaco em verdes escuros (#245936, #1b4f30 e #173f2a), evitando que o degradê da borda clareie a superfície. Desenhos e áreas de clique foram ampliados juntos em 20%. O deslocamento suave acompanha o mouse; no hover, os símbolos clicáveis sobem ligeiramente e ampliam. As dimensões externas das molduras permanecem iguais. Verificados ausência de ondas, hover do cérebro, abertura das explicações e celular de 320 px sem transbordamento.

Cada um dos cinco microrganismos tem agora sua própria área de interação, derivada das mesmas coordenadas do desenho SVG. Hover e foco ampliam somente aquele microrganismo em 12%, elevam-no suavemente e reforçam a cor e o contorno. O fundo permanece escuro; as ondas continuam ausentes. Cada clique abre a explicação geral sobre a microbiota, sem atribuir cepas ou conceitos diferentes aos formatos. Verificada a troca de destaque entre os dois primeiros elementos, abertura da explicação e clique no quinto microrganismo em 320 px.

O banner ganhou assinatura científica junto à logo no desktop, iluminação suave dentro da sobreposição verde existente, CTAs arredondadas com setas e resposta suave ao hover. Os indicadores agora mostram 01/02/03 e identificam os produtos nos rótulos acessíveis. O atalho “Explore a ciência”/“Ciência” ocupa a mesma linha dos controles e leva ao bloco científico. As fotos, o modo de ajuste e os tamanhos da seção permanecem iguais. Conferência antes/depois: 1100×850 mantém hero de 850 px e foto de 798 px; 320×740 mantém hero de 701,375 px e foto de 318,1875 px, com posições e dimensões das três imagens idênticas. Tablet de 768 px sem transbordamento; botões Hair & Skin/Immune preservam dimensões iguais e o diálogo de produto funciona. O atalho científico e a ocultação do cabeçalho foram verificados.

O ajuste seguinte padroniza as CTAs do banner com o mesmo fundo e contorno das molduras científicas (gradientes escuros opacos, borda de 2 px e contorno interno discreto). As setas das CTAs e o atalho científico foram removidos. Os controles de carrossel perderam as molduras, mantendo números e um sublinhado no ativo; agora seguem a largura do conjunto de botões. CTAs individuais ocupam a mesma largura total do par Hair & Skin/Immune. No desktop, o texto ganhou o limite horizontal completo e os intervalos internos foram ligeiramente reduzidos. Hero e fotos continuam com medidas e enquadramentos idênticos em 1100 px e 320 px; os dois botões pareados mantêm dimensões iguais.

Todos os banners têm agora dois destinos: GUTcare + apresentação da Aline, Slim Balance + ciência, Hair & Skin + Immune. O botão da Aline também seleciona sua aba na seção de apresentação; o estado do expert é controlado pelo App. A assinatura junto à logo foi removida. Um único tamanho de título, calculado com a fonte carregada e o maior texto, alinha os três banners à largura disponível sem variar a altura entre eles. Quatro partículas muito discretas se movem somente nas áreas livres acima/abaixo do bloco de texto, com recorte e afastamento de 24 px; ficam desativadas no celular, em telas baixas e com movimento reduzido. Botões e faixa ganharam luz suave. Hero e enquadramento das imagens foram preservados: 850 px no desktop, 650 px em tablet baixo e 701,375 px em 320×740. Os dois novos links e a ausência de transbordamento foram conferidos.

A faixa de benefícios ganhou quatro partículas pequenas com flutuação independente, restritas às bordas superior e inferior, fora da linha dos textos. A luz da faixa e das margens livres do banner oscila lentamente. O ponteiro desloca somente essas camadas decorativas em até 3 px por eixo; fotos, textos e botões permanecem estáveis. Os efeitos respeitam movimento reduzido. Conferidos faixa de 52 px no desktop/48 px no celular, hero de 850 px/701,375 px e ausência de transbordamento. As partículas ficaram fora da área vertical dos textos, e a resposta ao mouse foi verificada.

Os controles do banner agora seguem a última referência: grupo compacto alinhado à esquerda, setas próximas, três pontos de 7 px, indicador ativo alongado em 22 px e pausa ao lado. Os números e o sublinhado foram removidos; rótulos acessíveis e navegação continuam iguais. A altura da linha permanece 36 px.

A identidade da loja está em `src/catalog.css`: cards em verde escuro contínuo, contornos graduais e iluminação da seção científica, sem painel separado atrás do mockup. Frascos e máscaras permanecem com as medidas originais; hover eleva discretamente o produto. Preços e descrições usam alto contraste, kits têm seleção verde clara e a ação de compra recebe o mesmo verde claro dos detalhes científicos. Todas as seis fórmulas continuam na grade 3/2/1. `--card-radius:24px` permanece compartilhado e também foi aplicado às imagens de detalhes e carrinho. Fontes, preços, composições e links de checkout não foram alterados. Direção visual e conferências: `docs/catalog-visual-study.json`.

A loja foi clareada para uma base #30683f com luz #3c784c e sombras #285d39, mantendo alto contraste nos textos. Compra e seleção de quantidade usam agora o mesmo material verde escuro e borda dos banners/ciência, com raio de 24 px também nos detalhes e na ação principal do carrinho. O espaço antes da divisória caiu de 10 para 4 px. “Melhor valor” foi removido. Ao selecionar seis frascos, o preço do kit é acompanhado do total de seis unidades avulsas riscado, calculado como preço de um frasco × 6, com rótulo acessível explícito. A comparação aparece no card e no modal, não na opção de três ou em produtos com preço sob consulta. Conferidos GUTcare R$ 623,52 versus R$ 779,40 avulsos, subtotal no carrinho, celular 320 px sem transbordamento e descrições em três linhas.

Os textos dos cards foram centralizados, incluindo nome, descrição e preço; o + fica junto ao nome com intervalo de 8 px. Quatro partículas discretas por frasco têm flutuação independente e acompanham suavemente o ponteiro, respeitando movimento reduzido. A comparação riscada com unidades avulsas passa a aparecer também no kit de três, no card e nos detalhes. Conferidos GUTcare de três por R$ 362,43 versus R$ 389,70 avulsos, card desktop com as dimensões preservadas e celular de 320 px sem transbordamento ou corte das descrições.

O alinhamento anterior dos textos dos cards foi restaurado à esquerda, preservando o + junto ao nome. As partículas passaram a flutuar em trajetórias mais perceptíveis, com ciclos independentes de 6 a 9 segundos, sem depender do ponteiro. Os eventos de movimento do mouse foram removidos dos frascos. Confirmadas duas posições diferentes das partículas sem hover, seis descrições em três linhas no celular de 320 px e build de produção.

A área dos frascos ganhou curvas de conexão discretas com sinais luminosos em movimento contínuo, inspiradas nos diagramas científicos. As curvas oscilam lentamente e o halo varia de intensidade, sempre atrás das imagens e sem interferir nos cliques. Partículas existentes, tamanho dos frascos e altura dos cards foram preservados. Conferidos movimento, abertura dos detalhes, build e celular de 320 px sem transbordamento. Todos os novos efeitos respeitam movimento reduzido.

Para simplificar a loja, as curvas de conexão foram removidas e as partículas reduzidas para duas por card. O fundo branco foi substituído por verde claro com variações difusas de luz nas extremidades. A seção ocupa toda a largura e mantém o conteúdo no mesmo container interno; card, frasco, alinhamentos e grade foram preservados. Conferidos desktop de 1100 px, celular de 320 px sem transbordamento e descrições completas.

Os botões Adicionar ao carrinho ganharam iluminação superior verde mais clara, contorno interno luminoso e brilho externo discreto. Uma variação lenta de opacidade em sete segundos mantém o efeito suave; hover reforça a luz. Altura de 48 px e raio de 24 px foram preservados, com movimento reduzido respeitado. Build de produção e visual em desktop conferidos.

A apresentação da fundadora foi integrada ao capítulo científico em src/expert.css: mesmo fundo #205b36, material verde escuro, contornos graduais e raio externo de 24 px. A foto ganhou moldura com contorno interno e legenda integrada; hover aproxima a imagem lentamente. Aline Dalmazo é a primeira aba e fica selecionada por padrão. As duas apresentações mostram os textos completos, sem ler mais, com transição suave. O link do Instagram agora tem fundo verde claro, destaque luminoso e luz lenta. Conferidos clique e teclado nas abas, conteúdo completo, ausência de transbordamento em 320 px e build de produção. A fotografia e o destino do Instagram foram preservados.

A seção da fundadora agora segue a composição unificada da referência https://www.duethealth.com.br/dra-melina: fotografia e conteúdo compartilham uma única moldura verde escura de raio 24 px. O título externo e o card separado do texto foram removidos. Uma instrução curta precede as duas abas; o Instagram permanece dentro da mesma superfície. No desktop a fotografia acompanha a altura do conteúdo; no celular, foto e texto se empilham no mesmo bloco. Textos completos, seleção inicial da Aline e transições foram preservados. Conferidos abas por clique/teclado, desktop de 1100 px (seção de 772,47 px) e celular de 320 px sem transbordamento.
