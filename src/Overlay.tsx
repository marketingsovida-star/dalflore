import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

export function Overlay({
  title,
  type,
  close,
  children,
}: {
  title: string;
  type: string;
  close: () => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const closing = useRef(false);
  const closeTimer = useRef<number | undefined>(undefined);
  const requestClose = () => {
    if (closing.current) return;
    closing.current = true;
    ref.current?.classList.add("is-closing");
    closeTimer.current = window.setTimeout(
      close,
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 260,
    );
  };
  useEffect(() => {
    const el = ref.current!;
    const previous = document.activeElement as HTMLElement | null;
    el.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(closeTimer.current);
      el.close();
      document.body.style.overflow = overflow;
      previous?.focus({ preventScroll: true });
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={`overlay overlay-${type}`}
      aria-label={title}
      onCancel={(e) => {
        e.preventDefault();
        requestClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) requestClose();
      }}
    >
      <div className="modal-surface">
        <header className="modal-header">
          <div className="modal-particles" aria-hidden="true"><i/><i/><i/><i/><i/></div>
          <span>{title}</span>
          <button
            className="icon-button"
            aria-label="Fechar janela"
            onClick={requestClose}
          >
            <X size={22} />
          </button>
        </header>
        <div className="modal-scroll">{children}</div>
      </div>
    </dialog>
  );
}
