import { nav, profile } from "@/lib/data";
import { SocialLinks, wrap } from "./ui";

export default function Footer() {
  const links = [...nav.main, ...nav.more];
  return (
    <footer className="relative z-10 mt-8 border-t border-line">
      <div className={`${wrap} grid gap-8 py-10 sm:grid-cols-[1.4fr_1fr_1fr]`}>
        <div className="grid content-start gap-3">
          <strong className="text-grad text-[1.1rem] font-extrabold">{profile.name}</strong>
          <p className="max-w-[34ch] text-[0.9rem] text-muted">
            Full-stack developer in {profile.location}, building accessible, well-tested web apps and coaching the next
            generation of developers.
          </p>
        </div>
        <nav aria-label="Footer" className="grid content-start gap-2 text-[0.9rem]">
          <span className="text-[0.74rem] font-bold uppercase tracking-[0.14em] text-fg">Navigate</span>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-muted">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-fg hover:underline">
                {l.label}
              </a>
            ))}
          </div>
        </nav>
        <div className="grid content-start gap-3 text-[0.9rem] sm:justify-items-end">
          <span className="text-[0.74rem] font-bold uppercase tracking-[0.14em] text-fg">Reach me</span>
          {profile.email && (
            <a href={`mailto:${profile.email}`} className="break-all text-muted hover:text-fg hover:underline">
              {profile.email}
            </a>
          )}
          <SocialLinks github={profile.github} linkedin={profile.linkedin} email={profile.email} />
        </div>
      </div>
      <div className="border-t border-line/60 py-5 text-center text-[0.8rem] text-muted">
        &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
      </div>
    </footer>
  );
}
