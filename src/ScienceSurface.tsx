import { useRef, useState, type PointerEvent, type ReactNode } from "react";

/** A shared glass-like frame: pointer movement gently displaces its contents. */
export function ScienceSurface({ className, scene, children }: { className: string; scene: ReactNode; children: ReactNode }) {
  const [wave, setWave] = useState<{ x: number; y: number; id: number } | null>(null);
  const previous = useRef({ x: 0, y: 0, time: 0, id: 0 });
  const move = (event: PointerEvent<HTMLDivElement>, entering = false) => {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left, y = event.clientY - rect.top;
    element.style.setProperty("--water-x", ((x / rect.width - .5) * 6) + "px");
    element.style.setProperty("--water-y", ((y / rect.height - .5) * 6) + "px");
    element.style.setProperty("--light-x", (x / rect.width * 100) + "%");
    element.style.setProperty("--light-y", (y / rect.height * 100) + "%");
    const now = performance.now();
    if (entering || (now - previous.current.time > 650 && Math.hypot(x - previous.current.x, y - previous.current.y) > 24)) {
      const id = previous.current.id + 1;
      previous.current = { x, y, time: now, id };
      setWave({ x, y, id });
    }
  };
  const leave = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--water-x", "0px");
    event.currentTarget.style.setProperty("--water-y", "0px");
  };
  return <div className={"sx-art " + className} onPointerEnter={event => move(event, true)} onPointerMove={move} onPointerLeave={leave}>
    <div className="sx-water-scene">{scene}</div>
    {wave && <span key={wave.id} className="sx-water-ripple" style={{ left: wave.x, top: wave.y }} aria-hidden="true"><i/><i/></span>}
    <div className="sx-art-controls">{children}</div>
  </div>;
}
