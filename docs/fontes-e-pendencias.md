# Fontes e decisões de implementação

Conferência: 29 de outubro de 2026.

## Referências

- https://dalflore.com.br/ — história da marca, biografia e foto de Aline Dalmazo, catálogo, valores e URLs de checkout publicados.
- `VARIAÇÕES DA LOGO.zip`, `PRODUTOS.zip` e `RÓTULOS.zip` fornecidos pelo cliente — identidade, mockups e composição. A formulação e o modo de uso foram transcritos dos PDFs, sem adotar as alegações terapêuticas mais amplas do site antigo.
- Projetos locais `metabolia` e `duet` — referência visual autorizada pelo cliente. Nenhum código de Pharma, credenciais, pixel, banco de dados ou administração foi copiado.
- Projetos `vivka` e `dossenza` — fluxo React/Vite, GitHub e GitHub Pages.

## Referências científicas do conteúdo educativo

- ISAPP, Prebiotics: https://isappscience.org/resource/prebiotics/
- ISAPP, definições consensuais: https://isappscience.org/resource/probiotics-prebiotics-synbiotics-postbiotics-and-fermented-foods-defined/
- Cryan et al., The Microbiota-Gut-Brain Axis. Physiological Reviews (2019), PMID 31460832, DOI 10.1152/physrev.00018.2018: https://pubmed.ncbi.nlm.nih.gov/31460832/

As referências fundamentam os conceitos educativos. Não representam ensaios clínicos das fórmulas completas DalFlore, nem garantias de resultado.

## Divergências encontradas

1. **Hair & Skin**: o rótulo enviado declara silício orgânico, MSM, cistina, zinco, biotina, B5, E e C. O Hair premium vendido no site antigo cita outros ativos patenteados e custa R$ 265,06 por frasco. Não há confirmação de que se trata da mesma oferta; o novo Hair & Skin aparece sem preço, com consulta no atendimento e sem reutilizar o checkout premium.
2. **Quantidade de cápsulas**: os mockups de Concentra+, Cycle e Hair & Skin exibem 30 cápsulas, enquanto os respectivos PDFs declaram 60 cápsulas e uso de 2 cápsulas/dia. O site apresenta os dados dos PDFs e preserva os mockups enviados. É necessário obter mockups atualizados ou confirmar a embalagem antes do lançamento no domínio oficial.
3. **Porções por embalagem**: alguns PDFs de 60 cápsulas e porção de 2 cápsulas também dizem "porção por embalagem: 60". O site não reproduz esse campo inconsistente e não chama kits de "meses de tratamento".
4. **Telefone**: o rodapé antigo contém um número diferente. Foi adotado (51) 99726-4646, que coincide com os PDFs e o botão flutuante do site atual.
5. **Preços desatualizados no site original**: a inspeção dos 15 links de pagamento mostrou valores diferentes dos cards da loja antiga. Foram adotados os totais das próprias ofertas Payt, verificados pela configuração pública entregue no HTML do checkout, sem inserir dados pessoais ou fazer um pedido. Exemplo: GUTcare com 6 frascos está R$ 623,52 na Payt; o site antigo anuncia R$ 426,24. Os valores declarados pelo novo catálogo correspondem aos checkouts, e não aos cards antigos.

## Ofertas e compra

Valores públicos verificados diretamente nas 15 ofertas Payt em 29/10/2026. Os preços dos kits são explícitos, sem inferir descontos. Registro: [ofertas-verificadas.json](ofertas-verificadas.json).

| Fórmula | 1 frasco | 3 frascos | 6 frascos |
|---|---:|---:|---:|
| GUTcare | R$ 129,90 | R$ 362,43 | R$ 623,52 |
| Concentra+ | R$ 129,90 | R$ 362,43 | R$ 622,86 |
| Immune (Immuni no site antigo) | R$ 129,90 | R$ 362,43 | R$ 623,52 |
| Slim Balance | R$ 129,00 | R$ 362,43 | R$ 724,86 |
| Cycle | R$ 129,90 | R$ 362,43 | R$ 623,52 |

Os preços são um retrato da oferta consultada; confirmar periodicamente com a loja. O valor final e as condições são definidos pelo checkout. Não foi inventado cálculo de juros. Frete grátis a partir de R$ 150 é a regra exibida no site original.

Links dos três kits de cada fórmula foram extraídos do JavaScript público da loja original e mapeados por produto. Não foram realizados pagamentos ou pedidos durante a verificação. O carrinho oferece checkout de um kit por vez e pedido completo pelo WhatsApp; não foi inferido um endpoint de checkout combinado.

O botão de WhatsApp prepara o texto, sem enviar mensagem automaticamente. Não há coleta de cadastro, rastreadores ou backend. Políticas comerciais continuam apontando às páginas oficiais da DalFlore.

## Publicação

Prévia em GitHub Pages, repositório próprio. O domínio `dalflore.com.br`, seus registros DNS, a loja anterior e os projetos de referência permanecem intactos.
