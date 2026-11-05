import type { ReactNode } from "react";
import { MessageCircle } from "lucide-react";
import { contactUrl, whatsapp } from "./catalog";

const updatedAt = "05/11/2026";
const phone = "(51) 99726-4646";
const email = "contato@dalflore.com.br";
const whatsappLink = <a href={contactUrl} target="_blank" rel="noreferrer">{phone}</a>;
const contact = <ul>
  <li><strong>WhatsApp:</strong> {whatsappLink}</li>
  <li><strong>E-mail:</strong> <a href={`mailto:${email}`}>{email}</a></li>
</ul>;
const terms = <>
  <p>Ao acessar e utilizar o site DALFLORE, você concorda com os seguintes termos:</p>
  <ul>
    <li>O conteúdo deste site é de propriedade da DALFLORE e protegido por leis de propriedade intelectual;</li>
    <li>Os produtos oferecidos são suplementos alimentares e não substituem orientação médica ou nutricional profissional;</li>
    <li>As informações sobre os produtos são baseadas em estudos científicos publicados, mas resultados individuais podem variar;</li>
    <li>É proibida a reprodução total ou parcial do conteúdo sem autorização prévia;</li>
    <li>A DALFLORE reserva-se o direito de modificar estes termos a qualquer momento, sendo a versão atualizada publicada nesta página.</li>
  </ul>
</>;

export const legalDocs: Record<string, { title: string; sections: [string, ReactNode][] }> = {
  privacidade: {
    title: "Política de Privacidade",
    sections: [
      ["1. Informações Gerais", <>
        <p>A DALFLORE está comprometida com a proteção da privacidade dos seus usuários. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais quando você acessa nosso site ou realiza uma compra.</p>
        <p>Ao utilizar nossos serviços, você concorda com as práticas descritas nesta política, em conformidade com a Lei Geral de Proteção de Dados (LGPD – Lei nº 13.709/2018).</p>
      </>],
      ["2. Dados Coletados", <>
        <p>Podemos coletar os seguintes tipos de informações:</p>
        <ul>
          <li><strong>Dados pessoais:</strong> nome, e-mail, telefone, CPF e endereço de entrega, fornecidos voluntariamente no momento da compra.</li>
          <li><strong>Dados de navegação:</strong> endereço IP (anonimizado), tipo de dispositivo, navegador, sistema operacional, páginas acessadas e origem do acesso (UTMs).</li>
          <li><strong>Dados de pagamento:</strong> processados exclusivamente pela plataforma de pagamento parceira (Payt), sem armazenamento em nossos servidores.</li>
        </ul>
      </>],
      ["3. Finalidade do Uso dos Dados", <>
        <p>Utilizamos seus dados para:</p>
        <ul>
          <li>Processar e entregar seus pedidos;</li>
          <li>Enviar comunicações sobre status do pedido;</li>
          <li>Melhorar a experiência de navegação no site;</li>
          <li>Fins estatísticos e analíticos (dados anonimizados);</li>
          <li>Enviar informações sobre novos produtos, caso você tenha consentido;</li>
          <li>Cumprir obrigações legais e regulatórias.</li>
        </ul>
      </>],
      ["4. Compartilhamento de Dados", <>
        <p>Seus dados pessoais não são vendidos, alugados ou compartilhados com terceiros para fins comerciais. O compartilhamento ocorre apenas com:</p>
        <ul>
          <li><strong>Plataforma de pagamento:</strong> para processamento seguro das transações;</li>
          <li><strong>Transportadoras:</strong> para entrega dos produtos;</li>
          <li><strong>Ferramentas de análise:</strong> dados anonimizados para melhoria do site;</li>
          <li><strong>Obrigações legais:</strong> quando exigido por lei ou determinação judicial.</li>
        </ul>
      </>],
      ["5. Cookies e Tecnologias de Rastreamento", <p>Utilizamos cookies e tecnologias similares para melhorar sua experiência, analisar o tráfego do site e personalizar conteúdo. Você pode gerenciar as preferências de cookies nas configurações do seu navegador.</p>],
      ["6. Segurança dos Dados", <p>Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados contra acesso não autorizado, perda, alteração ou destruição. Nosso site utiliza criptografia SSL/TLS para proteção das informações transmitidas.</p>],
      ["7. Seus Direitos (LGPD)", <>
        <p>De acordo com a LGPD, você tem direito a:</p>
        <ul>
          <li>Confirmar a existência de tratamento dos seus dados;</li>
          <li>Acessar seus dados pessoais;</li>
          <li>Corrigir dados incompletos ou desatualizados;</li>
          <li>Solicitar a exclusão de dados desnecessários;</li>
          <li>Revogar o consentimento a qualquer momento;</li>
          <li>Solicitar a portabilidade dos dados.</li>
        </ul>
        <p>Para exercer seus direitos, entre em contato conosco pelo WhatsApp: {whatsappLink}.</p>
      </>],
      ["8. Termos de Uso", terms],
      ["9. Contato", <>
        <p>Para dúvidas, solicitações ou exercício de direitos relacionados à privacidade, entre em contato:</p>
        {contact}
      </>],
    ],
  },
  reembolso: {
    title: "Política de Reembolso",
    sections: [
      ["Direito de Arrependimento", <p>De acordo com o Código de Defesa do Consumidor (Art. 49), você tem o direito de desistir da compra no prazo de 7 (sete) dias corridos após o recebimento do produto, sem necessidade de justificativa.</p>],
      ["Condições para Reembolso", <>
        <p>Para que o reembolso seja processado, é necessário que:</p>
        <ul>
          <li>A solicitação seja feita dentro do prazo de 7 dias corridos a partir da data de recebimento do produto;</li>
          <li>O produto esteja lacrado e em sua embalagem original, sem sinais de uso ou violação;</li>
          <li>O produto esteja em perfeitas condições, tal como foi recebido.</li>
        </ul>
      </>],
      ["Como Solicitar", <>
        <p>Para iniciar o processo de devolução e reembolso, envie uma mensagem pelo WhatsApp informando sua solicitação:</p>
        <ul>
          <li><strong>WhatsApp:</strong> {phone}</li>
          <li><strong>Mensagem:</strong> "Gostaria de solicitar a devolução e reembolso do meu pedido"</li>
        </ul>
        <div className="legal-action">
          <a className="button" href={whatsapp("Gostaria de solicitar a devolução e reembolso do meu pedido")} target="_blank" rel="noreferrer">
            <MessageCircle size={18} aria-hidden="true" />Solicitar Reembolso via WhatsApp
          </a>
        </div>
      </>],
      ["Processo de Devolução", <ol>
        <li>Entre em contato pelo WhatsApp dentro do prazo de 7 dias;</li>
        <li>Nossa equipe fornecerá as instruções para envio do produto;</li>
        <li>Envie o produto lacrado e na embalagem original;</li>
        <li>Após o recebimento e verificação do produto, o reembolso será processado;</li>
        <li>O valor será estornado na mesma forma de pagamento utilizada na compra.</li>
      </ol>],
      ["Prazo de Reembolso", <ul>
        <li><strong>Cartão de crédito:</strong> O estorno será realizado em até 2 faturas subsequentes, conforme política da operadora do cartão;</li>
        <li><strong>PIX / Boleto:</strong> O reembolso será realizado em até 10 dias úteis após a confirmação da devolução;</li>
      </ul>],
      ["Custos de Devolução", <p>Em caso de exercício do direito de arrependimento dentro do prazo legal, os custos de envio da devolução serão de responsabilidade do consumidor, salvo em casos de produto com defeito ou enviado incorretamente.</p>],
      ["Produtos com Defeito", <p>Caso receba um produto com defeito de fabricação ou danificado durante o transporte, entre em contato imediatamente pelo WhatsApp. Nesses casos, a troca ou reembolso será realizado sem custo adicional.</p>],
    ],
  },
  termos: {
    title: "Termos de Uso",
    sections: [
      ["Uso do site", terms],
      ["Contato", contact],
    ],
  },
};

export function LegalPanel({ doc }: { doc: string }) {
  const { title, sections } = legalDocs[doc];
  return (
    <article className="legal-panel">
      <header className="legal-head">
        <h2>{title}</h2>
        <p>Última atualização: {updatedAt}</p>
      </header>
      {sections.map(([heading, body]) => <section key={heading}><h3>{heading}</h3>{body}</section>)}
    </article>
  );
}
