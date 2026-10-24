import type { IconType } from "react-icons";
import {
  SiCss,
  SiDocker,
  SiExpress,
  SiFastapi,
  SiFirebase,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiLangchain,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiRedux,
  SiShadcnui,
  SiSocketdotio,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiWordpress,
} from "react-icons/si";
import type { CSSProperties } from "react";
import { skills } from "@/lib/data";
import { SectionHead, section, wrap } from "./ui";

const icons: Record<string, IconType> = {
  react: SiReact,
  next: SiNextdotjs,
  ts: SiTypescript,
  js: SiJavascript,
  html: SiHtml5,
  css: SiCss,
  tailwind: SiTailwindcss,
  redux: SiRedux,
  shadcn: SiShadcnui,
  node: SiNodedotjs,
  express: SiExpress,
  fastapi: SiFastapi,
  socket: SiSocketdotio,
  mongo: SiMongodb,
  postgres: SiPostgresql,
  prisma: SiPrisma,
  firebase: SiFirebase,
  langchain: SiLangchain,
  docker: SiDocker,
  git: SiGit,
  vercel: SiVercel,
  wordpress: SiWordpress,
};

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className={section}>
      <div className={wrap}>
        <SectionHead pill="What I work with" title="Skills & tools" id="skills-title" />
        <div className="skills-glow rounded-3xl py-4">
          <ul className="mx-auto flex max-w-[960px] flex-wrap justify-center gap-3 sm:gap-4">
            {skills.map((s) => {
              const Icon = icons[s.icon];
              return (
                <li
                  key={s.name}
                  className="tile grid w-[88px] justify-items-center gap-2 rounded-2xl border border-line bg-surface/70 px-2 py-4 sm:w-[104px]"
                  style={{ "--c": s.color } as CSSProperties}
                >
                  {Icon && <Icon aria-hidden className="h-8 w-8 sm:h-9 sm:w-9" style={{ color: s.color }} />}
                  <span className="text-center text-[0.72rem] font-medium leading-tight text-muted">{s.name}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
