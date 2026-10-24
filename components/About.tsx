import { coreTech, stats } from "@/lib/data";
import { Chip, SectionHead, section, wrap } from "./ui";

function CodeCard() {
  const k = "text-[#c792ea]";
  const s = "text-[#9ece6a]";
  const n = "text-[#ff9e64]";
  const p = "text-muted";
  return (
    <div className="card-surface overflow-hidden shadow-[0_0_60px_rgba(139,92,246,0.2)]">
      <div className="flex items-center gap-2 border-b border-line bg-bg/50 px-4 py-3">
        <i aria-hidden className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <i aria-hidden className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <i aria-hidden className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-[0.72rem] text-muted">keya.ts</span>
      </div>
      <pre
        className="overflow-x-auto p-5 font-mono text-[0.82rem] leading-[1.8]"
        aria-label="A code snippet summarising Keya: full-stack developer using Next.js, Node.js and MongoDB, mentoring at Programming Hero, 82 students placed, open to remote roles"
      >
        <code>
          <span className={k}>const</span> keya <span className={p}>=</span> {"{"}
          {"\n"}  role<span className={p}>:</span> <span className={s}>&quot;Full-Stack Developer&quot;</span>,
          {"\n"}  stack<span className={p}>:</span> [<span className={s}>&quot;Next.js&quot;</span>, <span className={s}>&quot;Node.js&quot;</span>, <span className={s}>&quot;MongoDB&quot;</span>],
          {"\n"}  mentoring<span className={p}>:</span> <span className={s}>&quot;Programming Hero&quot;</span>,
          {"\n"}  studentsPlaced<span className={p}>:</span> <span className={n}>82</span>,
          {"\n"}  openTo<span className={p}>:</span> <span className={s}>&quot;remote roles&quot;</span>,
          {"\n"}
          {"}"}
          <span className={p}>;</span>
        </code>
      </pre>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className={section}>
      <div className={wrap}>
        <SectionHead pill="Get to know me" title="About me" id="about-title" />
        <div className="grid items-center gap-[clamp(1.5rem,5vw,3.5rem)] md:grid-cols-2">
          <CodeCard />
          <div className="grid min-w-0 gap-4 text-muted">
            <p>
              I&apos;m a full-stack developer in Dhaka. I started in tech through the{" "}
              <strong className="font-semibold text-fg">Programming Hero bootcamp</strong> and now work there in talent
              development, helping students with resumes, mock interviews and project presentations.
            </p>
            <p>
              Before tech I was a <strong className="font-semibold text-fg">news presenter</strong>, and I hold a B.Pharm
              degree. That background is why I explain my code clearly and stay calm in front of a room. I want to grow
              into advanced software engineering and work with international teams.
            </p>
            <ul aria-label="Core technologies" className="flex flex-wrap gap-2">
              {coreTech.map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </ul>
            <dl className="mt-1 grid grid-cols-3 gap-3">
              {stats.map((s) => (
                <div key={s.label} className="rounded-xl border border-line bg-surface/70 p-3.5">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="text-grad text-[1.6rem] font-extrabold leading-none tabular-nums">{s.value}</dd>
                  <dd className="mt-1 text-[0.74rem] leading-snug text-muted" aria-hidden>
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
