import { education } from "@/lib/data";
import { SectionHead, section, wrap } from "./ui";

export default function Education() {
  return (
    <section id="education" aria-labelledby="edu-title" className={section}>
      <div className={wrap}>
        <SectionHead pill="My background" title="Education" id="edu-title" />
        <div className="mx-auto grid max-w-[860px] gap-4">
          {education.map((e) => (
            <article key={e.title} className="card-surface flex flex-wrap items-center gap-5 p-5 sm:flex-nowrap">
              <div
                aria-hidden
                className="grid h-20 w-20 flex-none place-items-center rounded-2xl bg-gradient-to-br from-violet/30 to-cyan/20 text-xl font-extrabold text-violetsoft"
              >
                {e.abbr}
              </div>
              <div className="grid min-w-0 gap-1.5">
                <h3 className="text-[1.1rem] font-bold leading-snug">{e.org}</h3>
                <p className="text-[0.95rem] text-fg/90">{e.title}</p>
                <p className="text-[0.88rem] text-muted">{e.note}</p>
                <span className="mt-1 w-fit rounded-full border border-good/40 bg-good/10 px-2.5 py-0.5 text-[0.72rem] font-medium text-good">
                  {e.status}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
