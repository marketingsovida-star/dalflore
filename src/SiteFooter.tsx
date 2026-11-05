export function SiteFooter({
  home,
  logo,
}: {
  home: string;
  logo: string;
}) {
  return (
    <footer className="site-footer">
      <span className="site-footer-atmosphere" aria-hidden="true"><i/><i/><i/><i/><i/><i/><i/><i/></span>
      <div className="wrap site-footer-inner">
        <div className="site-footer-brand">
          <a href={home} aria-label="DalFlore, início">
            <img src={logo} alt="" width="1171" height="1093" loading="lazy" />
          </a>
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
            <a href="#privacidade">Privacidade</a>
            <a href="#reembolso">Política de reembolso</a>
            <a href="#termos">Termos de uso</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
