import Image from "next/image";
import type { CSSProperties } from "react";
import { achievements } from "@/lib/data";
import { SectionHead, section, wrap } from "./ui";

export default function Achievements() {
  return (
    <section id="achievements" aria-labelledby="ach-title" className={section}>
      <div className={wrap}>
        <SectionHead pill="Milestones" title="Achievements" id="ach-title" />
        <div className="mx-auto grid max-w-[1000px] grid-cols-1 gap-4 md:grid-cols-3">
          {achievements.map((a) => (
            <article key={a.title} className="card-surface grid content-start gap-3 p-5">
              {a.image ? (
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-line bg-bg/60">
                  <Image src={a.image} alt={`${a.title} certificate`} fill sizes="(max-width: 640px) 100vw, 460px" className="object-contain" />
                </div>
              ) : a.gauges ? (
                <div className="flex gap-2.5" role="img" aria-label={`Lighthouse mobile scores: ${a.gauges.join(", ")}`}>
                  {a.gauges.map((g, i) => (
                    <div
                      key={i}
                      className="gauge relative grid aspect-square w-11 shrink-0 place-items-center rounded-full"
                      style={{ "--v": g } as CSSProperties}
                    >
                      <b className="relative text-[0.68rem] font-semibold">{g}</b>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-grad text-[2.3rem] font-extrabold leading-none tabular-nums">{a.num}</div>
              )}
              <h3 className="text-[1.05rem] font-bold leading-snug">{a.title}</h3>
              <p className="text-[0.93rem] text-muted">{a.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
