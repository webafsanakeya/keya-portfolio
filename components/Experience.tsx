"use client";

import { useState } from "react";
import { FaBriefcase, FaBuilding, FaRegCalendar } from "react-icons/fa6";
import { experience, type Experience as Exp } from "@/lib/data";
import { SectionHead, section, wrap } from "./ui";

function Card({ e, index }: { e: Exp; index: number }) {
  const [open, setOpen] = useState(false);
  const id = `exp-${index}`;
  const canExpand = e.bullets.length > 2;

  return (
    <article className="card-surface card-top relative grid content-start gap-3 overflow-hidden p-6 pt-7">
      {/* Large faded briefcase in the bottom-right corner. */}
      <FaBriefcase
        aria-hidden
        className="pointer-events-none absolute -bottom-3 -right-2 h-28 w-28 text-violet/[0.09]"
      />

      <div className="relative flex items-start gap-4">
        <div
          aria-hidden
          className="grid h-12 w-12 flex-none place-items-center rounded-xl bg-violet/20 text-[1.05rem] text-violetsoft"
        >
          <FaBriefcase />
        </div>
        <div className="grid min-w-0 gap-1.5">
          <h3 className="text-[clamp(1.2rem,2.4vw,1.55rem)] font-bold leading-tight text-white">{e.title}</h3>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.86rem]">
            <span className="inline-flex items-center gap-1.5 font-medium text-cyan">
              <FaBuilding aria-hidden className="h-3.5 w-3.5" />
              {e.org}
            </span>
            <span className="inline-flex items-center gap-1.5 text-muted">
              <FaRegCalendar aria-hidden className="h-3.5 w-3.5" />
              {e.date}
            </span>
          </div>
        </div>
      </div>

      <ul id={id} className="relative mt-1 grid gap-2.5 text-[0.95rem] text-muted">
        {e.bullets.map((b, i) => (
          <li
            key={i}
            hidden={!open && i > 1}
            className="relative pl-5 leading-relaxed before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-cyan"
          >
            {b}
          </li>
        ))}
      </ul>

      {canExpand && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={id}
          className="relative justify-self-start text-[0.88rem] font-semibold text-violetsoft hover:text-white"
        >
          {open ? "Show less" : "Show more"}
        </button>
      )}
    </article>
  );
}

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="exp-title" className={section}>
      <div className={wrap}>
        <SectionHead pill="Where I've worked" title="Experience" id="exp-title" />
        <div className="mx-auto grid max-w-[960px] grid-cols-1 gap-5 md:grid-cols-2">
          {experience.map((e, i) => (
            <Card key={e.title} e={e} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
