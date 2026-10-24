import Image from "next/image";
import { profile } from "@/lib/data";
import { SocialLinks, wrap } from "./ui";

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="pb-[clamp(3rem,6vw,5rem)] pt-[clamp(2.5rem,7vw,5.5rem)]">
      <div className={`${wrap} grid items-center gap-[clamp(2rem,6vw,4rem)] md:grid-cols-[1.15fr_0.85fr]`}>
        <div className="grid min-w-0 justify-items-start gap-5">
          <p className="text-[0.78rem] font-medium uppercase tracking-[0.24em] text-muted">Hi, my name is</p>
          <h1
            id="hero-title"
            className="text-grad text-[clamp(2.3rem,6.4vw,4rem)] font-extrabold leading-[1.06] tracking-[-0.03em]"
          >
            {profile.name}
          </h1>
          <p className="text-[clamp(1.05rem,2.4vw,1.3rem)] font-semibold text-cyan">{profile.role}</p>
          <p className="max-w-[52ch] text-muted">{profile.intro}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex min-h-[46px] items-center rounded-lg border border-violet bg-violet/20 px-5 font-semibold shadow-[0_0_28px_rgba(124,58,237,0.35)] hover:bg-violet/35"
            >
              View projects
            </a>
            <a
              href="#contact"
              className="inline-flex min-h-[46px] items-center rounded-lg border border-white/70 bg-bg px-5 font-semibold hover:bg-white hover:text-bg"
            >
              Contact me
            </a>
          </div>
          <SocialLinks github={profile.github} linkedin={profile.linkedin} email={profile.email} />
        </div>

        <div className="relative order-first mx-auto grid aspect-square w-[min(72%,300px)] place-items-center md:order-none md:w-[min(100%,360px)]">
          <div aria-hidden className="photo-ring absolute inset-0 rounded-full border border-dashed border-violetsoft/40" />
          <div className="relative grid aspect-square w-[82%] place-items-center overflow-hidden rounded-full border-[3px] border-violet bg-[radial-gradient(circle_at_30%_25%,#6d4cff,#2a1b7a_55%,#120c3a)] shadow-[0_0_70px_rgba(139,92,246,0.6)]">
            {profile.photo ? (
              <Image
                src={profile.photo}
                alt={`Portrait of ${profile.name}`}
                fill
                priority
                sizes="(max-width: 768px) 240px, 300px"
                className="object-cover"
              />
            ) : (
              <span aria-hidden className="text-[clamp(2.6rem,9vw,4.6rem)] font-extrabold tracking-[-0.04em]">
                {profile.initials}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
