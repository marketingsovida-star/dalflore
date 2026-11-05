import { type PointerEvent, type ReactNode } from "react";

/** A quiet, shared frame with gentle pointer-driven depth. */
export function ScienceSurface({ className, label, onLabel, scene, children }: { className: string; label: string; onLabel: () => void; scene: ReactNode; children: ReactNode }) {
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left, y = event.clientY - rect.top;
    element.style.setProperty("--scene-x", ((x / rect.width - .5) * 6) + "px");
    element.style.setProperty("--scene-y", ((y / rect.height - .5) * 6) + "px");
  };
  const leave = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--scene-x", "0px");
    event.currentTarget.style.setProperty("--scene-y", "0px");
  };
  return <div className={"sx-art " + className} onPointerEnter={move} onPointerMove={move} onPointerLeave={leave}>
    <div className="sx-illustration-scene">{scene}</div>
    <div className="sx-art-controls">{children}</div>
    <button className="sx-art-label" aria-haspopup="dialog" onClick={onLabel}>{label}</button>
  </div>;
}
