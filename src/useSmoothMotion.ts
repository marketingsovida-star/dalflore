import { useEffect } from "react";

/** The same reveal rhythm and section-scroll curve used in the Duet reference. */
export function useSmoothMotion() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    let frame = 0;
    const cancel = () => cancelAnimationFrame(frame);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-revealed", "");
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: mobile ? 0.08 : 0.12,
        rootMargin: mobile ? "0px 0px -20px 0px" : "0px 0px -35px 0px",
      },
    );
    const selectors =
      ".df-hero-copy,.df-catalog .shop-heading,.product-card,.df-science-copy,.df-science-art,.df-axis-copy,.df-axis-visual,.df-expert-heading,.df-founder,.df-expert-copy,.faq-inner>h2,.faq-items,.faq-contact,.df-closing .df-container";
    const watch = () => {
      document.querySelectorAll<HTMLElement>(selectors).forEach((el) => {
        if (el.hasAttribute("data-reveal")) return;
        el.dataset.reveal = el.matches(".hero-art,.axis-diagram")
          ? "right"
          : el.matches(".microbiota-art")
            ? "left"
            : "up";
        if (el.matches(".product-card")) {
          const index = Array.from(el.parentElement!.children).indexOf(el);
          el.style.setProperty(
            "--reveal-delay",
            `${(index % (mobile ? 1 : 3)) * 0.09}s`,
          );
        }
        if (reduce.matches || el.closest("dialog"))
          el.setAttribute("data-revealed", "");
        else observer.observe(el);
      });
    };
    watch();
    document.documentElement.classList.add("motion-ready");
    const mutations = new MutationObserver(watch);
    mutations.observe(document.querySelector("main")!, {
      childList: true,
      subtree: true,
    });
    const showAll = () => {
      if (reduce.matches) {
        cancel();
        document
          .querySelectorAll("[data-reveal]")
          .forEach((el) => el.setAttribute("data-revealed", ""));
      }
    };
    const scrollToSection = (el: HTMLElement | null) => {
      cancel();
      const header =
        document.querySelector<HTMLElement>(".site-header")?.offsetHeight ?? 0;
      let top = 0;
      for (let node = el; node; node = node.offsetParent as HTMLElement | null)
        top += node.offsetTop;
      const available = window.innerHeight - header;
      const height = el?.offsetHeight ?? 0;
      const target = Math.max(
        0,
        Math.min(
          el
            ? top -
                header -
                (height < available ? (available - height) / 2 : 14)
            : 0,
          document.documentElement.scrollHeight - window.innerHeight,
        ),
      );
      const start = window.scrollY;
      const distance = target - start;
      if (reduce.matches || Math.abs(distance) < 2) {
        window.scrollTo({ top: target, behavior: "instant" });
        return;
      }
      const duration = Math.min(1400, Math.max(650, Math.abs(distance) * 0.45));
      const began = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - began) / duration);
        const eased = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
        window.scrollTo({ top: start + distance * eased, behavior: "instant" });
        if (p < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey
      )
        return;
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      if (
        !link ||
        link.closest("dialog") ||
        link.classList.contains("skip-link")
      )
        return;
      const hash = link.getAttribute("href")!;
      const id = decodeURIComponent(hash.slice(1));
      if (id.startsWith("produto/")) return;
      const section = id ? document.getElementById(id) : null;
      if (id && !section) return;
      event.preventDefault();
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}${hash}`,
      );
      scrollToSection(section);
    };
    document.addEventListener("click", onClick);
    window.addEventListener("wheel", cancel, { passive: true });
    window.addEventListener("touchstart", cancel, { passive: true });
    window.addEventListener("keydown", cancel);
    reduce.addEventListener("change", showAll);
    const initialId = decodeURIComponent(window.location.hash.slice(1));
    if (initialId && !initialId.startsWith("produto/")) {
      const target = document.getElementById(initialId);
      if (target) frame = requestAnimationFrame(() => scrollToSection(target));
    }
    return () => {
      cancel();
      observer.disconnect();
      mutations.disconnect();
      document.documentElement.classList.remove("motion-ready");
      document.removeEventListener("click", onClick);
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", cancel);
      window.removeEventListener("keydown", cancel);
      reduce.removeEventListener("change", showAll);
      document.querySelectorAll("[data-reveal]").forEach((el) => {
        el.removeAttribute("data-reveal");
        el.removeAttribute("data-revealed");
      });
    };
  }, []);
}
