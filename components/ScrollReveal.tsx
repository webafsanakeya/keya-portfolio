"use client";

import { useEffect } from "react";

// Fades and slides each section's content in the first time it scrolls into view.
// Content is fully visible until this runs, so nothing is lost if JavaScript is off.
export default function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets: HTMLElement[] = [];
    document.querySelectorAll<HTMLElement>("main > section:not(#top) > div").forEach((wrapEl) => {
      Array.from(wrapEl.children).forEach((child) => {
        const el = child as HTMLElement;
        // A grid of cards: reveal the cards one after another instead of the whole grid at once.
        if (el.classList.contains("grid") && el.children.length > 1 && !el.matches("[class*='mb-12']")) {
          Array.from(el.children).forEach((card, i) => {
            const c = card as HTMLElement;
            c.style.setProperty("--d", `${Math.min(i, 6) * 90}ms`);
            targets.push(c);
          });
        } else {
          targets.push(el);
        }
      });
    });

    document.documentElement.classList.add("reveal-on");
    targets.forEach((t) => t.classList.add("reveal"));

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    targets.forEach((t) => io.observe(t));

    return () => {
      io.disconnect();
      document.documentElement.classList.remove("reveal-on");
      targets.forEach((t) => t.classList.remove("reveal", "reveal-in"));
    };
  }, []);

  return null;
}
