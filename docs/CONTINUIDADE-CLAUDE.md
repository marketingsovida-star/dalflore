# DalFlore — contexto para continuar no Claude

Este documento foi preparado a pedido do usuário para transferir a continuidade do projeto do Codex para o Claude. Não há uma nova mudança visual pendente neste momento: o próximo passo deve partir do pedido seguinte do usuário. Preserve o que já foi aprovado.

## Projeto e acesso

- Pasta local: `C:/Users/auxil/Downloads/Estúdio de sites/dalflore`.
- Repositório: https://github.com/marketingsovida-star/dalflore
- Site publicado: https://marketingsovida-star.github.io/dalflore/
- Última alteração funcional antes deste resumo: `bc079f60b66c633b20e2194607f9ea416d026d68` (FAQ revisado), publicada com sucesso.
- Branch atual: `main`. Confira `git status` antes de editar e preserve alterações novas do usuário.
- React 19 + TypeScript + Vite, CSS próprio e ícones Lucide. Sem backend obrigatório para a apresentação atual.
- `npm run build` executa TypeScript e build de produção. `npm run dev -- --port 8102` abre a prévia local; a porta padrão do package.json é 8101. Uma prévia de trabalho vinha rodando em http://127.0.0.1:8102/.
- A publicação é feita por push no GitHub e GitHub Actions/Pages. Confira o workflow em `.github/workflows` e o resultado da execução antes de dizer que algo está publicado.
- Não copie credenciais, cookies ou tokens para o chat ou para arquivos versionados. Use os mecanismos de autenticação já disponíveis no ambiente.

## O que o usuário quer

Um site moderno, delicado e científico, ligado à personalidade da Aline e à microbiota. Deve ter informação clara, confortável de ler e visual com personalidade. O usuário valoriza movimento suave, iluminação e detalhes bem acabados, mas rejeita excesso de elementos e mudanças de identidade.

O site foi reconstruído porque não havia acesso de edição ao site original https://dalflore.com.br/. O projeto existente já passou por muitas revisões: NÃO começar do zero nem reinterpretar tudo a cada pedido.

Referências usadas:

- https://www.duethealth.com.br/ — suavidade de interações e FAQ.
- https://www.duethealth.com.br/dra-melina — foto e história em uma composição unificada.
- https://metabolia.com.br/ — catálogo e exploração dos produtos; sem criar uma área Pharma.
- https://sanovi.com.br/ — proporção e lógica dos banners desktop/mobile.
- https://berschealth.com.br/ — composição do cabeçalho com marca central.
- https://bzonnutrition.com.br/ e https://lenviaoficial.com.br/ também foram referências mencionadas.

Copiar a lógica visual, não as cores, textos médicos ou identidade das outras marcas.

## Identidade visual aprovada

- Branco, preto e VERDE. Rosa, dourado e paletas apagadas foram rejeitados.
- Open Sans nos títulos e frases em destaque; Arial nos textos de leitura e descrições extensas. Não trocar as fontes por preferência genérica da skill.
- Fundo da ciência e da seção da Aline: `--science-background: #205b36`.
- Cabeçalho/faixa: verde escuro próximo de `#17452f`.
- Material dos cards científicos: `radial-gradient(ellipse at 50% 42%, #245936, #1b4f30 62%, #173f2a)`.
- Destaques claros próximos de `#cde7b9`; texto claro `#f5faf2` / `#dce9d6`.
- Tokens em `src/cards.css`: raio externo de 24 px e borda de 2 px. Contorno interno recuado pode ter raio menor, correspondente ao recuo; não criar geometrias aleatórias entre cards.
- Bordas graduais verdes e luz difusa discreta, sem aparência neon. Leitura deve permanecer estável: efeitos não atravessam textos.
- Transições lentas/coerentes, normalmente 500–800 ms. Partículas contínuas com ritmos variados; respeitar `prefers-reduced-motion`.
- As seções devem se conectar visualmente e não ficar excessivamente grandes. Não reduzir textos a tamanhos minúsculos para caber; trabalhar espaços e composição.

## Estrutura e ordem da página

`HomeBanners` → faixa de benefícios → bloco científico unificado (`ScienceJourney` + `MicrobiotaWhy`) → catálogo completo → Aline/história da DalFlore → FAQ → rodapé.

### Banners e faixa

- Três fotos fornecidas pelo usuário, nesta ordem: Aline com GUTcare; Slim Balance; Hair & Skin + Immune.
- Preservar tamanho e enquadramento aprovados. Houve várias correções; o usuário rejeitou alterar o tamanho da seção para resolver enquadramento.
- Todos têm dois botões: GUTcare + conhecer Aline; Slim Balance + conhecer ciência; Hair & Skin + Immune com igual destaque.
- Textos à esquerda, títulos padronizados em duas linhas, descrição em até três linhas explicando composição e função do produto.
- Botões escuros com material/bordas científicos. Controle compacto: setas, três pontos com ativo alongado, pausa. Sem números grandes ou muitas molduras.
- Logo branca no banner. Partículas e luz ficam em áreas livres, sem cobrir os textos ou mudar as fotos.
- Faixa infinita sem lacunas. Benefícios: ingredientes selecionados, até 12x, frete grátis a partir de R$150, compra segura, atendimento pelo WhatsApp, 7 dias de garantia. Aproximadamente cinco mensagens visíveis no desktop; movimento foi levemente acelerado a pedido.
- Cabeçalho oculto enquanto banner ou ciência estão visíveis. Não mudar essa lógica sem pedido.

### Cabeçalho

- Faixa superior: FRETE GRÁTIS NA COMPRA DE 3 OU 6 UNIDADES.
- Marca central com apenas o símbolo branco, sem a palavra DalFlore. Arquivo `public/brand/symbol-white.svg` derivado da marca original.
- Esquerda: PRODUTOS, CIÊNCIA, DÚVIDAS; direita: carrinho e atendimento. Menu no celular.
- Altura compacta, sem diminuir os alvos de clique. Efeito de luz verde discreto, sem aumentar o cabeçalho.

### Ciência

- Título exato: “Explore a ciência do seu cuidado.”
- Subtítulo: “Descubra como tudo se relaciona clicando nos símbolos para abrir as explicações.”
- À esquerda, ilustração da microbiota; ao centro, seis cards em três colunas por duas linhas; à direita, intestino/cérebro.
- Molduras das ilustrações são RETANGULARES de cantos arredondados, não círculos. Fundo escuro e contornos iguais aos cards.
- Microbiota tem cinco microrganismos com hover/foco individual: ampliam, sobem um pouco e clareiam. Clique abre explicação geral da microbiota. Não sugerir que o formato identifica cepa.
- Intestino e cérebro reconhecíveis, com conexões que não atravessam os símbolos. Manter símbolos afastados das bordas.
- Movimento suave de cena e sinais/partículas animados; o usuário gostou especialmente dos trajetos de partículas da microbiota (ciclo de cerca de 5 segundos).
- Os seis temas abrem explicações acessíveis: prebióticos, probióticos, simbióticos, nervos, metabólitos e imunidade. Explicar o que é e por que importa, sem esconder tudo atrás de “aprofundar”. As explicações têm referências científicas e ligações com as composições reais.
- Abaixo, dois cards integrados no mesmo fundo: “Por que cuidar da sua microbiota?” e “Além da digestão”. Sem cabeçalho externo redundante. O bloco todo parece uma única seção.
- Tamanho atual do bloco científico: mínimo de 108svh/108dvh, conteúdo centralizado. Não mudar a geometria interna ao ajustar apenas o fundo da seção.

### Catálogo

- Seis produtos sempre visíveis em grade: três colunas desktop, duas tablet, uma celular. Sem rolagem lateral, categorias, filtros ou pesquisa.
- Fundo da seção verde muito claro, com luz difusa nas extremidades; cards num verde mais claro que a ciência (`#3c784c / #30683f / #285d39`).
- Frascos grandes, inteiros e com recortes aprovados. Imagens e máscaras SVG em `src/assets/masks` removem o fundo cinza dos arquivos originais. Não regenerar as imagens ou encolher os mockups desnecessariamente.
- O painel separado verde atrás do mockup foi removido. Curvas/orbitas ao redor dos frascos foram testadas e RETIRADAS por poluição visual.
- Restam duas partículas suaves por frasco e um halo discreto, sempre se movendo sem depender do mouse.
- Textos alinhados à ESQUERDA. O usuário testou tudo centralizado e rejeitou. O “+” fica próximo ao nome do produto (gap de 8 px).
- Descrições de três linhas, com ingredientes + para que serve. Não inventar ativos a partir do nome.
- Compra e quantidade: material verde escuro e raio de 24 px. Botão Adicionar ao carrinho tem iluminação superior e brilho discreto, variando lentamente.
- Quantidades 1, 3 e 6. Kits de três/seis mostram o total de unidades avulsas riscado ao lado do preço do kit. Não voltar com “melhor valor”.
- Preço riscado = preço unitário × quantidade; preço do kit vem dos valores explícitos em `src/catalog.ts`, sem recalcular descontos por conta própria.
- Hair & Skin está com valor sob consulta, sem preço inventado.
- Clique no frasco/nome abre os detalhes em modal, sem páginas individuais obrigatórias.
- Preservar links de checkout, carrinho e composições. Testar não é concluir uma compra nem enviar WhatsApp.

### Aline / História da DalFlore

- Uma única moldura compartilhada por foto, abas, texto e Instagram, inspirada na composição da Dra. Melina da Duet.
- Fundo igual ao da ciência, raio 24 px, contorno interno e iluminação suave nas bordas.
- Aba da ESQUERDA e selecionada por padrão: Aline Dalmazo. Outra aba: História da DalFlore.
- Textos completos, SEM “ler mais”. Preservar o conteúdo atual e a transição suave.
- A foto original está em `public/aline-retrato.webp`. Legenda integrada com degradê verde na base da foto.
- Foto clicável abre o mesmo Instagram do botão: https://www.instagram.com/dra.alinedalmazo/ (nova aba). Hover e foco preservados.
- Botão do Instagram em verde claro para destaque.
- O selo “Ciência no cuidado.” sobre a foto foi REMOVIDO a pedido.
- Ilustração de microrganismos → raízes → florescimento na história foi testada e REJEITADA. Componente removido. Não restaurar essa ideia.
- A seção deixou de ter mínimo de 108dvh. Agora o espaço acima/abaixo da moldura acompanha exatamente o espaço inferior do bloco científico.
- `Expert` usa ResizeObserver para medir o bloco científico e seus filhos e ajustar `--expert-section-space`. Observar os filhos é necessário: fontes podem mudar a posição dos cards sem mudar o tamanho externo da seção.
- Dez partículas ficam nas MARGENS EXTERNAS da seção, não no fundo do card/textos. Algumas têm núcleo/brilho mais visível; quatro percorrem curvas em 4,2–5,2 segundos, as demais são mais lentas. São efeitos já pedidos/aprovados pelo usuário.

### FAQ — estado mais recente

- Visual da Duet adaptado a verdes claros e bordas de 24 px/2 px. Coluna de até 832 px, botão de pergunta com 60 px mínimos, “+” circular que gira para “×”, transição de 600 ms.
- Primeira resposta aberta inicialmente; uma resposta aberta por vez. Clique novamente fecha. Manter estados ARIA e `inert` coerentes.
- São CINCO perguntas. Removidas: contato com a marca, combinar fórmulas e todos terem probióticos.
- Pergunta inicial: “Os produtos DALFLORE precisam de receita médica?” Resposta exata fornecida pelo usuário: “Não. Nossos produtos são suplementos alimentares e não necessitam de receita médica. No entanto, recomendamos sempre consultar um profissional de saúde antes de iniciar qualquer suplementação, especialmente gestantes, lactantes e pessoas em tratamento médico.”
- “Em quanto tempo posso perceber alguma mudança?” recebeu o texto do usuário: “Os resultados variam de acordo com cada organismo e o produto utilizado. Em geral, melhorias iniciais podem ser percebidas entre 15 a 30 dias de uso contínuo. Para resultados mais consistentes e duradouros, recomendamos o uso por 3 a 6 meses.” Esse texto veio do usuário; não confundir esses prazos com instruções comprovadas pelos PDFs.
- “Como devo consumir e guardar os produtos?” lista os seis produtos. Dose verificada por leitura textual E visual dos seis rótulos: GUTcare, Immune e Slim Balance — ingerir 1 cápsula uma vez ao dia; Concentra+, Cycle e Hair & Skin — ingerir 2 cápsulas uma vez ao dia. A conservação de todos é igual: ao abrigo da luz, calor e umidade, reunida no final da lista para não repetir seis vezes.
- Outras perguntas preservadas: gestantes/crianças e pagamento/frete.
- O botão de atendimento no WhatsApp continua abaixo do FAQ.

### Rodapé

- Modelo da Duet nas cores DalFlore: fundo verde escuro do cabeçalho (`--deep-surface`), logo branca com o nome DalFlore (`brand/logo-white.png`, a mesma do banner) centralizada e, abaixo dela, uma frase de uma linha: “Ciência para florescer de dentro para fora.”
- Base com fio fino: à esquerda “© 2026 DalFlore. Todos os direitos reservados.”; ao centro “Desenvolvido por Thiago Rocha · Produzido por Sóvida” (mesmos links do Instagram da Duet); à direita Privacidade (abre o modal), Política de reembolso e Termos de uso.
- Luz suave que pulsa atrás da logo e no topo, e oito partículas no material da seção da Aline, sempre ao lado da logo, sem passar pela frase ou pela base.
- Sem colunas de navegação, contatos ou aviso educativo: retirados a pedido.

## Arquivos importantes e ordem dos estilos

- `src/App.tsx`: composição, catálogo/modal/carrinho, Expert e FAQ.
- `src/catalog.ts`: produtos, ativos, doses, preços e links reais.
- `src/HomeBanners.tsx` + `src/banners.css`: banners, faixa e interações.
- `src/ScienceJourney.tsx`, `src/MicrobiotaArt.tsx`, `src/ScienceSurface.tsx`, `src/science.css`: atlas científico e animações.
- `src/MicrobiotaWhy.tsx` + `src/microbiota-why.css`: cards sob as ilustrações.
- `src/cards.css`: tokens e geometria compartilhada.
- `src/header.css`, `src/catalog.css`, `src/expert.css`, `src/faq.css`, `src/footer.css`: estilos atuais por área.
- `src/main.tsx` importa, nesta ordem: style.css → design.css → science.css → microbiota-why.css → cards.css → header.css → catalog.css → expert.css → faq.css → footer.css. Há CSS antigo sobrescrito; inspecione os valores computados e a especificidade antes de acrescentar outra regra.
- `public/labels/`: seis rótulos originais em PDF; fonte para composição, dose e conservação.
- `public/brand/`: variações da marca. `public/` também tem fotos e banners.
- `README.md`: registro cronológico das revisões (trechos antigos podem descrever ideias já rejeitadas; código atual e este resumo prevalecem).
- `docs/catalog-visual-study.json`: direção visual e verificações do catálogo.
- `tmp/` é ignorado no Git: contém screenshots de trabalho e auxiliares locais. Não versionar todo esse diretório nem arquivos de credenciais.

## Skills e método de trabalho

Uma cópia da skill frontend-design usada no projeto está em `docs/skills/frontend-design/SKILL.md`. Ela é uma orientação de design, não uma licença para substituir as escolhas do usuário. Neste projeto, Open Sans/Arial, verdes, raio compartilhado e animações específicas são decisões explícitas e prevalecem.

Princípios aplicados: usar conteúdo real, hierarquia legível, coerência visual, detalhes ligados à ciência/microbiota, movimento com função e revisão visual após editar. O usuário gosta de efeitos, porém já rejeitou tanto visual frio/simples quanto ornamentos excessivos.

Para imagens prontas, primeiro reutilize o acervo existente. SVG/CSS são adequados aos diagramas. Não gastar tempo gerando imagens novas sem necessidade; o usuário já disse que pode fornecer imagens depois.

Para rótulos, renderize os PDFs e confira visualmente junto da extração de texto. Não invente doses, conservação, ingredientes ou resultados. Não assuma que dados de outras marcas ou uma pesquisa de ingrediente provam a fórmula completa.

Valide alterações com `npm run build`, navegador desktop e celular de 320 px. Confira transbordamento, recorte de imagens, cliques/teclado, modais e movimento reduzido conforme o que mudou. Não criar testes que só repetem CSS.

Faça mudanças incrementais dentro do pedido. O usuário prefere ação, comunicação curta e resultado publicado, não pedidos repetidos de confirmação para ajustes já autorizados. Antes de anunciar publicação, verificar GitHub Actions/Pages. Não enviar mensagens, fazer compras ou alterar preços por inferência.

## Evitar retrabalho

- Não mudar o tamanho dos banners para corrigir crop.
- Não reintroduzir pesquisa, categorias, guia, Pharma ou carrossel lateral de vendas.
- Não reintroduzir a seção isolada “Quando sua flora floresce, você floresce.”; a frase ainda pode existir naturalmente na história.
- Não centralizar os textos dos cards de venda.
- Não colocar rosa/dourado, linhas excessivamente finas ou fontes pequenas.
- Não restaurar gotas/ondas de água, fundos muito claros nas ilustrações científicas, órbitas de catálogo ou a ilustração de florescimento rejeitada.
- Não colocar partículas sobre os textos ou a foto da Aline; seus efeitos atuais estão nas margens externas.
- Não alterar composições, preços, rótulos ou links comerciais sem solicitação e fonte.

Primeira ação recomendada no Claude: ler este documento e os arquivos relevantes, abrir a versão atual, confirmar que entendeu o estado aprovado e aguardar a próxima mudança solicitada pelo usuário.
