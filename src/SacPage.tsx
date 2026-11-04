import { useState, type FormEvent, type ReactNode } from "react";
import { ArrowUpRight, Headphones, Menu, ShoppingBag, X } from "lucide-react";
import { whatsapp } from "./catalog";
import { Overlay } from "./Overlay";
import { PrivacyPanel, SiteFooter } from "./SiteFooter";

// The page lives one folder below the home, so shared files sit a level up.
const home = "../";
const up = (path: string) => `${home}${path}`;

const reasons = [
  "Meu pedido não chegou",
  "Meu pedido veio com erro",
  "Quero trocar ou devolver",
  "Dúvida sobre o produto",
  "Outro assunto",
];
const returns = ["E-mail", "WhatsApp", "Ligação telefônica"];

const readCartCount = () => {
  try {
    const items = JSON.parse(localStorage.getItem("dalflore-cart-v1") || "[]");
    return items.reduce(
      (sum: number, i: { quantity: number; count: number }) =>
        sum + i.quantity * i.count,
      0,
    ) as number;
  } catch {
    return 0;
  }
};

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="sac-field">
      <span>
        {label}
        {required && <b aria-hidden="true"> *</b>}
      </span>
      {children}
    </label>
  );
}

function SacForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [ticket, setTicket] = useState<{ url: string; files: boolean } | null>(
    null,
  );

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const value = (name: string) => String(data.get(name) ?? "").trim();
    const lines = [
      "Olá! Abri um chamado pelo SAC do site da DalFlore.",
      "",
      `Motivo: ${value("motivo")}`,
      `Assunto: ${value("assunto")}`,
      `Nome: ${value("nome")}`,
      `E-mail: ${value("email")}`,
      ...(value("cpf") ? [`CPF: ${value("cpf")}`] : []),
      ...(value("telefone") ? [`Telefone: ${value("telefone")}`] : []),
      `Prefiro receber o retorno por: ${value("retorno")}`,
      "",
      "Descrição:",
      value("descricao"),
      ...(files.length > 0
        ? [
            "",
            `Anexos que vou enviar nesta conversa: ${files.map((f) => f.name).join(", ")}`,
          ]
        : []),
    ];
    const url = whatsapp(lines.join("\n"));
    window.open(url, "_blank", "noopener");
    setTicket({ url, files: files.length > 0 });
    setFiles([]);
    form.reset();
  };

  return (
    <form className="sac-form" onSubmit={onSubmit}>
      <div className="sac-grid">
        <Field label="Endereço de e-mail" required>
          <input type="email" name="email" autoComplete="email" required />
        </Field>
        <Field label="Motivo do contato" required>
          <select name="motivo" required defaultValue="">
            <option value="" disabled>
              Selecione um motivo
            </option>
            {reasons.map((reason) => (
              <option key={reason} value={reason}>
                {reason}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Nome completo" required>
          <input type="text" name="nome" autoComplete="name" required />
        </Field>
        <Field label="CPF">
          <input type="text" name="cpf" inputMode="numeric" />
        </Field>
        <Field label="Telefone">
          <input type="tel" name="telefone" autoComplete="tel" />
        </Field>
        <Field label="Assunto" required>
          <input type="text" name="assunto" required />
        </Field>
      </div>
      <Field label="Descrição" required>
        <textarea
          name="descricao"
          rows={6}
          maxLength={1500}
          required
          placeholder="Conte o que aconteceu com o máximo de detalhes."
        />
      </Field>
      <fieldset className="sac-returns">
        <legend>
          Como prefere receber o retorno<b aria-hidden="true"> *</b>
        </legend>
        <div>
          {returns.map((option, index) => (
            <label key={option}>
              <input
                type="radio"
                name="retorno"
                value={option}
                required
                defaultChecked={index === 0}
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>
      <Field label="Anexos">
        <input
          type="file"
          name="anexos"
          multiple
          accept="image/*,video/*,application/pdf"
          onChange={(e) =>
            setFiles(Array.from(e.target.files ?? []).slice(0, 5))
          }
        />
        <small>
          Até 5 arquivos (fotos, vídeos ou PDF). O WhatsApp não recebe anexos
          automaticamente: envie os arquivos na conversa depois de abrir o
          chamado.
        </small>
        {files.length > 0 && (
          <ul>
            {files.map((file) => (
              <li key={file.name}>{file.name}</li>
            ))}
          </ul>
        )}
      </Field>
      <button className="sac-submit" type="submit">
        Enviar chamado pelo WhatsApp
      </button>
      {ticket && (
        <p className="sac-status" role="status">
          Seu chamado está pronto no WhatsApp. Confirme o envio da mensagem para
          concluir{ticket.files ? " e anexe seus arquivos na conversa" : ""}.{" "}
          <a href={ticket.url} target="_blank" rel="noreferrer">
            Abrir o WhatsApp novamente
          </a>
        </p>
      )}
      <p className="sac-note">
        Dúvidas comuns também estão nas{" "}
        <a href={up("#duvidas")}>perguntas frequentes</a>.
      </p>
    </form>
  );
}

export function SacPage() {
  const [mobile, setMobile] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [count] = useState(readCartCount);
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <header className="site-header">
        <div className="header-shipping">
          FRETE GRÁTIS NA COMPRA DE 3 OU 6 UNIDADES
        </div>
        <div className="header-inner wrap">
          <a href={home} className="brand" aria-label="DalFlore, início">
            <img
              src={up("brand/symbol-white.svg")}
              alt="DalFlore"
              width="160"
              height="67"
            />
          </a>
          <nav className="desktop-nav" aria-label="Navegação principal">
            <a href={up("#produtos")}>Produtos</a>
            <a href={up("#ciencia")}>Ciência</a>
            <a href={up("#duvidas")}>Dúvidas</a>
          </nav>
          <div className="header-actions">
            <a
              className="icon-button cart-icon"
              aria-label={`Abrir carrinho com ${count} itens`}
              href={up("#carrinho")}
            >
              <ShoppingBag size={24} />
              {count > 0 && <span>{count}</span>}
            </a>
            <a
              className="icon-button support-icon"
              aria-label="Falar com o atendimento"
              aria-current="page"
              href="#conteudo"
            >
              <Headphones size={24} />
            </a>
            <button
              className="icon-button mobile-trigger"
              aria-label={mobile ? "Fechar menu" : "Abrir menu"}
              aria-expanded={mobile}
              aria-controls="mobile-nav"
              onClick={() => setMobile(!mobile)}
            >
              {mobile ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
        {mobile && (
          <nav
            className="mobile-nav"
            id="mobile-nav"
            aria-label="Navegação para celular"
          >
            {[
              ["Produtos", up("#produtos")],
              ["Ciência", up("#ciencia")],
              ["Dúvidas", up("#duvidas")],
            ].map(([label, href]) => (
              <a href={href} key={href}>
                {label}
                <ArrowUpRight size={16} />
              </a>
            ))}
          </nav>
        )}
      </header>
      <main id="conteudo" className="sac-page">
        <span className="df-expert-atmosphere" aria-hidden="true"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></span>
        <div className="sac-inner">
          <header className="sac-hero">
            <p>Atendimento ao cliente</p>
            <h1>Como podemos te ajudar?</h1>
            <p>
              Abra um chamado pelo formulário abaixo. Ao enviar, o WhatsApp da
              DalFlore abre com seus dados preenchidos, e nossa equipe responde
              pelo canal que você escolher.
            </p>
          </header>
          <SacForm />
        </div>
      </main>
      <SiteFooter
        home={home}
        logo={up("brand/logo-white.png")}
        onPrivacy={() => setPrivacy(true)}
      />
      {privacy && (
        <Overlay
          type="privacy"
          title="Privacidade e navegação"
          close={() => setPrivacy(false)}
        >
          <PrivacyPanel />
        </Overlay>
      )}
    </>
  );
}
