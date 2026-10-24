"use client";

import { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { nav, profile } from "@/lib/data";
import { SocialLinks } from "./ui";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-bg/60 backdrop-blur-md [mask-image:linear-gradient(to_bottom,#000_78%,transparent)]">
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <a href="#top" className="whitespace-nowrap font-brand text-[0.68rem] uppercase tracking-[0.18em] sm:text-[0.74rem]">
          <span className="sm:hidden">{profile.shortName}</span>
          <span className="hidden sm:inline">{profile.name}</span>
        </a>

        <nav
          aria-label="Primary"
          className="flex items-center gap-0.5 rounded-full border border-line bg-surface/80 p-1 shadow-[0_0_40px_rgba(139,92,246,0.22)] backdrop-blur-md"
        >
          {nav.main.map((n, i) => (
            <a
              key={n.href}
              href={n.href}
              className={`rounded-full px-3 py-2 text-[0.82rem] text-muted hover:bg-surface2 hover:text-fg sm:px-4 sm:text-[0.88rem] ${
                i === 0 ? "hidden sm:block" : ""
              }`}
            >
              {n.label}
            </a>
          ))}
          <div ref={box} className="relative">
            <button
              type="button"
              aria-expanded={open}
              aria-haspopup="menu"
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-1.5 rounded-full px-3 py-2 text-[0.82rem] text-muted hover:bg-surface2 hover:text-fg sm:px-4 sm:text-[0.88rem]"
            >
              More <FaChevronDown aria-hidden className={`h-2.5 w-2.5 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
            {open && (
              <div
                role="menu"
                className="absolute right-0 top-[calc(100%+10px)] grid min-w-[10.5rem] gap-0.5 rounded-2xl border border-line bg-surface p-1.5 shadow-[0_10px_50px_rgba(0,0,0,0.6)]"
              >
                {[...(nav.main.slice(0, 1)), ...nav.more].map((n) => (
                  <a
                    key={n.href}
                    role="menuitem"
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-xl px-3.5 py-2 text-[0.9rem] text-muted hover:bg-surface2 hover:text-fg ${
                      n.href === "#about" ? "sm:hidden" : ""
                    }`}
                  >
                    {n.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </nav>

        <SocialLinks className="hidden lg:flex" github={profile.github} linkedin={profile.linkedin} email={profile.email} />
        <span className="w-10 sm:hidden lg:hidden" aria-hidden />
      </div>
    </header>
  );
}
