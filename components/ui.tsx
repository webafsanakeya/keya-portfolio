import type { ReactNode } from "react";
import { FaEnvelope, FaGithub, FaLinkedinIn } from "react-icons/fa6";

export const wrap = "mx-auto w-full max-w-[1120px] px-4 sm:px-6";

// Shared vertical rhythm for every section.
export const section = "scroll-mt-20 py-[clamp(3rem,7vw,5.5rem)]";

export function SectionHead({ pill, title, id, sub }: { pill: string; title: string; id: string; sub?: string }) {
  return (
    <div className="mb-12 grid justify-items-center gap-3">
      <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface2/70 px-3.5 py-1.5 text-[0.72rem] tracking-[0.04em] text-violetsoft">
        <i className="h-[0.45rem] w-[0.45rem] rounded-full bg-cyan shadow-[0_0_10px_var(--color-cyan)]" />
        {pill}
      </span>
      <h2
        id={id}
        className="text-grad text-balance text-center text-[clamp(1.9rem,4.4vw,2.8rem)] font-extrabold leading-[1.12] tracking-[-0.02em]"
      >
        {title}
      </h2>
      {sub && <p className="max-w-[56ch] text-center text-[0.98rem] text-muted">{sub}</p>}
      <span aria-hidden className="h-[3px] w-16 rounded-full bg-gradient-to-r from-violet to-cyan" />
    </div>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <li className="rounded-full border border-line bg-violet/10 px-3 py-1 text-[0.76rem] text-violetsoft">{children}</li>
  );
}

const socialBtn =
  "grid h-10 w-10 place-items-center rounded-full border border-line bg-surface/70 text-muted hover:border-violetsoft hover:text-white hover:shadow-[0_0_18px_rgba(139,92,246,0.5)]";

export function SocialLinks({
  github,
  linkedin,
  email,
  className = "",
}: {
  github: string;
  linkedin: string;
  email?: string;
  className?: string;
}) {
  return (
    <div className={`flex gap-2.5 ${className}`}>
      <a className={socialBtn} href={github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
        <FaGithub aria-hidden className="h-[17px] w-[17px]" />
      </a>
      <a className={socialBtn} href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
        <FaLinkedinIn aria-hidden className="h-[17px] w-[17px]" />
      </a>
      {email ? (
        <a className={socialBtn} href={`mailto:${email}`} aria-label="Email">
          <FaEnvelope aria-hidden className="h-[17px] w-[17px]" />
        </a>
      ) : null}
    </div>
  );
}
