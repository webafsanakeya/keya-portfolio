"use client";

import { useState, type FormEvent } from "react";
import { FaEnvelope, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { profile } from "@/lib/data";
import { SectionHead, section, wrap } from "./ui";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "ok" } | { kind: "error"; message: string };
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const input =
  "w-full rounded-xl border border-line bg-bg/60 px-4 py-3 text-fg placeholder:text-muted/60 focus:border-violetsoft";
const label = "text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-muted";
const info =
  "flex items-center gap-4 rounded-xl border border-line bg-bg/55 px-4 py-3.5 hover:border-violetsoft";
const infoIcon = "grid h-10 w-10 flex-none place-items-center rounded-lg bg-violet/20 text-violetsoft";

export default function Contact() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<Errors>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
      website: String(data.get("website") ?? ""), // honeypot, real people leave it empty
    };

    setErrors({});
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string; fields?: Errors };
      if (res.ok) {
        form.reset();
        setStatus({ kind: "ok" });
        return;
      }
      if (json.fields) setErrors(json.fields);
      setStatus({ kind: "error", message: json.error ?? "Something went wrong. Please try again." });
    } catch {
      setStatus({ kind: "error", message: "Could not reach the server. Check your connection and try again." });
    }
  }

  const sending = status.kind === "sending";

  return (
    <section id="contact" aria-labelledby="contact-title" className={section}>
      <div className={wrap}>
        <SectionHead pill="Let's talk" title="Get in touch" id="contact-title" />
        <div className="mx-auto grid max-w-[980px] gap-8 md:grid-cols-2 md:gap-12">
          <div className="grid min-w-0 content-start gap-4">
            <p className="text-muted">
              Hiring for a remote frontend or full-stack role, or want a mentor for your bootcamp students? Send a
              message and it lands straight in my inbox. I reply in English or Bangla.
            </p>
            {profile.email && (
              <a className={info} href={`mailto:${profile.email}`}>
                <span className={infoIcon}>
                  <FaEnvelope aria-hidden />
                </span>
                <span className="min-w-0 break-words text-[0.95rem]">{profile.email}</span>
              </a>
            )}
            <a className={info} href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              <span className={infoIcon}>
                <FaLinkedinIn aria-hidden />
              </span>
              <span className="min-w-0 break-words text-[0.95rem]">linkedin.com/in/web-afsana-noor-keya-</span>
            </a>
            <a className={info} href={profile.github} target="_blank" rel="noopener noreferrer">
              <span className={infoIcon}>
                <FaGithub aria-hidden />
              </span>
              <span className="min-w-0 break-words text-[0.95rem]">github.com/webafsanakeya</span>
            </a>
          </div>

          <form onSubmit={onSubmit} noValidate className="card-surface grid min-w-0 gap-4 p-5 sm:p-6" aria-describedby="form-status">
            <div className="grid gap-1.5">
              <label htmlFor="name" className={label}>
                Your name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                maxLength={80}
                className={input}
                placeholder="Jane Doe"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-err" : undefined}
              />
              {errors.name && (
                <p id="name-err" className="text-[0.85rem] text-pink">
                  {errors.name}
                </p>
              )}
            </div>
            <div className="grid gap-1.5">
              <label htmlFor="email" className={label}>
                Your email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={120}
                className={input}
                placeholder="jane@company.com"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-err" : undefined}
              />
              {errors.email && (
                <p id="email-err" className="text-[0.85rem] text-pink">
                  {errors.email}
                </p>
              )}
            </div>
            <div className="grid gap-1.5">
              <label htmlFor="message" className={label}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                maxLength={2000}
                className={`${input} resize-y`}
                placeholder="Tell me about the role or project."
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-err" : undefined}
              />
              {errors.message && (
                <p id="message-err" className="text-[0.85rem] text-pink">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Honeypot: hidden from people, filled in by simple bots. */}
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="website">Website</label>
              <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="inline-flex min-h-[48px] items-center justify-center rounded-lg border border-violet bg-violet/25 px-6 font-semibold shadow-[0_0_28px_rgba(124,58,237,0.35)] hover:bg-violet/40 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending ? "Sending…" : "Send message"}
            </button>

            <div id="form-status" role="status" aria-live="polite" className="min-h-[1.5rem] text-[0.95rem]">
              {status.kind === "ok" && (
                <p className="text-good">Thanks, your message was sent. I will reply to your email soon.</p>
              )}
              {status.kind === "error" && <p className="text-pink">{status.message}</p>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
