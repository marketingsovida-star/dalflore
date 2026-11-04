import { ArrowUpRight } from "lucide-react";

export function SiteFooter({
  home,
  logo,
  onPrivacy,
}: {
  home: string;
  logo: string;
  onPrivacy: () => void;
}) {
  return (
    <footer className="site-footer">
      <span className="site-footer-atmosphere" aria-hidden="true"><i/><i/><i/><i/><i/><i/><i/><i/></span>
      <div className="wrap site-footer-inner">
        <div className="site-footer-brand">
          <a href={home} aria-label="DalFlore, início">
            <img src={logo} alt="" width="1171" height="1093" loading="lazy" />
          </a>
          <p>Ciência para florescer de dentro para fora.</p>
        </div>
        <div className="site-footer-bottom">
          <p>
            © {new Date().getFullYear()} DalFlore. Todos os direitos reservados.
          </p>
          <p className="site-footer-credits">
            <span>
              Desenvolvido por{" "}
              <a
                href="https://www.instagram.com/thiagorocha.oficial"
                target="_blank"
                rel="noreferrer"
              >
                Thiago Rocha
              </a>
            </span>{" "}
            ·{" "}
            <span>
              Produzido por{" "}
              <a
                href="https://www.instagram.com/sovida.life/"
                target="_blank"
                rel="noreferrer"
              >
                Sóvida
              </a>
            </span>
          </p>
          <nav aria-label="Políticas da loja">
            <button onClick={onPrivacy}>Privacidade</button>
            <a
              href="https://dalflore.com.br/politica-de-reembolso"
              target="_blank"
              rel="noreferrer"
            >
              Política de reembolso
            </a>
            <a
              href="https://dalflore.com.br/politica-de-privacidade#termos-de-uso"
              target="_blank"
              rel="noreferrer"
            >
              Termos de uso
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export function PrivacyPanel() {
  return (
    <div className="privacy-panel">
      <h2>Suas escolhas, com transparência.</h2>
      <p>
        Este site guarda os itens do carrinho somente no navegador, para que
        suas escolhas permaneçam ao voltar. Você pode limpar esses dados nas
        configurações do seu navegador.
      </p>
      <p>
        Este site não utiliza ferramentas de publicidade. Ao abrir WhatsApp,
        Instagram, checkout ou links científicos, você acessa serviços externos,
        sujeitos às próprias políticas de privacidade.
      </p>
      <p>
        O pedido e os dados do chamado do SAC só são enviados ao atendimento
        quando você abre o WhatsApp e confirma o envio da mensagem. Os
        pagamentos são realizados no ambiente do provedor de checkout.
      </p>
      <a
        className="text-link"
        href="https://dalflore.com.br/politica-de-privacidade"
        target="_blank"
        rel="noreferrer"
      >
        Consulte a política da loja atual <ArrowUpRight size={15} />
      </a>
    </div>
  );
}
