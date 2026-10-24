"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaArrowRight, FaArrowUpRightFromSquare, FaXmark } from "react-icons/fa6";
import { projects, type Project } from "@/lib/data";
import { Chip, SectionHead, section, wrap } from "./ui";

const FIRST = 3; // cards shown before "View all projects"
const MAX_TAGS = 4; // tag chips shown on a card before "+N"

function host(p: Project) {
  const live = p.links.find((l) => l.main)?.href;
  try {
    return live ? new URL(live).host : "github.com/webafsanakeya";
  } catch {
    return "localhost";
  }
}

function Art({ p, wide = false }: { p: Project; wide?: boolean }) {
  const ratio = wide ? "aspect-[2/1]" : "aspect-video";
  if (p.image) {
    return (
      <div className={`relative ${ratio} overflow-hidden border-b border-line`}>
        <Image
          src={p.image}
          alt={`Screenshot of ${p.title}`}
          fill
          sizes="(max-width: 768px) 100vw, 380px"
          className="object-cover object-top"
        />
      </div>
    );
  }
  // No screenshot yet: a browser-window preview with the real address.
  return (
    <div
      className={`relative ${ratio} overflow-hidden border-b border-line bg-gradient-to-br ${p.art} p-3.5`}
      aria-hidden
    >
      <div className="flex h-full flex-col overflow-hidden rounded-lg border border-white/15 bg-bg/70 shadow-[0_8px_30px_rgba(0,0,0,0.45)]">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-2.5 py-1.5">
          <i className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]" />
          <i className="h-1.5 w-1.5 rounded-full bg-[#febc2e]" />
          <i className="h-1.5 w-1.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 min-w-0 flex-1 truncate rounded bg-white/10 px-2 py-0.5 text-[0.62rem] text-muted">
            {host(p)}
          </span>
        </div>
        <div className="grid flex-1 place-items-center px-3 text-center">
          <span className="text-balance text-[clamp(1rem,2.6vw,1.35rem)] font-extrabold leading-tight">
            {p.title.split(" for ")[0]}
          </span>
        </div>
      </div>
    </div>
  );
}

function Card({ p, hidden, onOpen }: { p: Project; hidden: boolean; onOpen: (p: Project) => void }) {
  const shown = p.tags.slice(0, MAX_TAGS);
  const extra = p.tags.length - shown.length;
  return (
    <article hidden={hidden} className="card-surface card-top flex flex-col overflow-hidden">
      <Art p={p} />
      <div className="flex flex-1 flex-col gap-3.5 p-5">
        <h3 className="text-[1.3rem] font-bold leading-snug text-white">{p.title}</h3>
        {p.status && <p className="text-[0.76rem] font-semibold text-pink">{p.status}</p>}
        <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
          {shown.map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
          {extra > 0 && (
            <li className="rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-[0.76rem] font-medium text-cyan">
              +{extra}
            </li>
          )}
        </ul>
        <p className="line-clamp-2 text-[0.92rem] text-muted">{p.text}</p>
        <button
          type="button"
          onClick={() => onOpen(p)}
          aria-haspopup="dialog"
          className="mt-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#9333ea] to-[#0e90b0] px-4 text-[0.92rem] font-semibold hover:brightness-110"
        >
          View details <FaArrowRight aria-hidden className="h-3.5 w-3.5" />
        </button>
      </div>
    </article>
  );
}

function Details({ p, onClose }: { p: Project; onClose: () => void }) {
  return (
    <div className="grid">
      <div className="relative">
        <Art p={p} wide />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-bg/80 text-white backdrop-blur hover:bg-white hover:text-bg"
        >
          <FaXmark aria-hidden />
        </button>
      </div>
      <div className="grid gap-4 p-5 sm:p-7">
        <div className="grid gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-line px-2.5 py-0.5 text-[0.72rem] text-muted">{p.kind}</span>
            {p.status && <span className="text-[0.76rem] font-semibold text-pink">{p.status}</span>}
          </div>
          <h3 id="proj-dialog-title" className="text-[clamp(1.35rem,3vw,1.8rem)] font-bold leading-tight text-white">
            {p.title}
          </h3>
        </div>

        <p className="text-muted">{p.text}</p>

        <div className="grid gap-2">
          <h4 className="text-[0.74rem] font-bold uppercase tracking-[0.14em] text-fg">Highlights</h4>
          <ul className="grid gap-2 text-[0.94rem] text-muted">
            {p.highlights.map((h) => (
              <li
                key={h}
                className="relative pl-5 leading-relaxed before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-cyan"
              >
                {h}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-2">
          <h4 className="text-[0.74rem] font-bold uppercase tracking-[0.14em] text-fg">Built with</h4>
          <ul className="flex flex-wrap gap-1.5">
            {p.tags.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </ul>
        </div>

        {p.links.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-2.5">
            {p.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex min-h-11 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg border px-4 text-[0.9rem] font-semibold sm:flex-none ${
                  l.main
                    ? "border-transparent bg-gradient-to-r from-[#9333ea] to-[#0e90b0] hover:brightness-110"
                    : "border-line bg-surface2 hover:border-violetsoft"
                }`}
              >
                {l.label}
                <FaArrowUpRightFromSquare aria-hidden className="h-3 w-3" />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const [all, setAll] = useState(false);
  const [active, setActive] = useState<Project | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Open or close the native <dialog> to match `active`. The browser handles focus trapping and Esc.
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (active && !d.open) d.showModal();
    if (!active && d.open) d.close();
  }, [active]);

  return (
    <section id="projects" aria-labelledby="proj-title" className={section}>
      <div className={wrap}>
        <SectionHead
          pill="Things I've built"
          title="Featured projects"
          id="proj-title"
          sub="A selection of full-stack applications I've designed, built and shipped."
        />
        <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,310px),1fr))]">
          {projects.map((p, i) => (
            <Card key={p.title} p={p} hidden={!all && i >= FIRST} onOpen={setActive} />
          ))}
        </div>
        {projects.length > FIRST && (
          <div className="mt-9 flex justify-center">
            <button
              type="button"
              onClick={() => setAll((v) => !v)}
              aria-expanded={all}
              className="min-h-11 rounded-lg border border-white/70 bg-bg px-6 text-[0.9rem] font-semibold hover:bg-white hover:text-bg"
            >
              {all ? "Show fewer projects" : `View all projects (${projects.length})`}
            </button>
          </div>
        )}
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="proj-dialog-title"
        onClose={() => setActive(null)}
        onClick={(e) => {
          // A click on the dark backdrop lands on the <dialog> itself, so close.
          if (e.target === dialogRef.current) setActive(null);
        }}
        className="m-auto max-h-[90vh] w-[min(94vw,720px)] overflow-y-auto overscroll-contain rounded-2xl border border-line bg-surface p-0 shadow-[0_0_80px_rgba(124,58,237,0.35)]"
      >
        {active && <Details p={active} onClose={() => setActive(null)} />}
      </dialog>
    </section>
  );
}
