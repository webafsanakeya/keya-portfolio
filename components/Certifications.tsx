"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaArrowUpRightFromSquare, FaAward, FaEye, FaXmark } from "react-icons/fa6";
import { certifications, type Certification } from "@/lib/data";
import { SectionHead, section, wrap } from "./ui";

function CertCard({ c, onOpen }: { c: Certification; onOpen: (c: Certification) => void }) {
  // If the picture is missing or the path is wrong, fall back to a badge instead of a broken image.
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(c.image) && !failed;

  return (
    <article className="card-surface card-top flex flex-col overflow-hidden">
      {showImage ? (
        <button
          type="button"
          onClick={() => onOpen(c)}
          aria-label={`View ${c.title}`}
          className="group relative block aspect-[4/3] overflow-hidden border-b border-line bg-bg/60"
        >
          <Image
            src={c.image as string}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, 420px"
            className="object-contain p-3 transition-transform duration-300 group-hover:scale-[1.03]"
            onError={() => setFailed(true)}
          />
        </button>
      ) : (
        <div
          aria-hidden
          className="grid aspect-[4/3] place-items-center border-b border-line bg-gradient-to-br from-violet/20 to-cyan/10"
        >
          <FaAward className="h-14 w-14 text-violetsoft" />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h4 className="text-[1.15rem] font-bold leading-snug text-white">{c.title}</h4>
        <p className="text-[0.93rem] text-muted">{c.text}</p>
        {showImage && (
          <button
            type="button"
            onClick={() => onOpen(c)}
            aria-haspopup="dialog"
            className="mt-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#9333ea] to-[#0e90b0] px-4 text-[0.92rem] font-semibold hover:brightness-110"
          >
            <FaEye aria-hidden className="h-3.5 w-3.5" /> View certificate
          </button>
        )}
      </div>
    </article>
  );
}

export default function Certifications() {
  const [active, setActive] = useState<Certification | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Open or close the native <dialog> to match `active`. The browser handles focus and the Esc key.
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (active && !d.open) d.showModal();
    if (!active && d.open) d.close();
  }, [active]);

  return (
    <section id="certifications" aria-labelledby="cert-title" className={section}>
      <div className={wrap}>
        <SectionHead pill="Proof of learning" title="Certifications" id="cert-title" />

        <div className="mx-auto grid max-w-[860px] gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),400px))] justify-center">
          {certifications.map((c) => (
            <CertCard key={c.title} c={c} onOpen={setActive} />
          ))}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="cert-dialog-title"
        onClose={() => setActive(null)}
        onClick={(e) => {
          // A click on the dark backdrop lands on the <dialog> itself, so close.
          if (e.target === dialogRef.current) setActive(null);
        }}
        className="m-auto max-h-[92vh] w-[min(94vw,900px)] overflow-y-auto overscroll-contain rounded-2xl border border-line bg-surface p-0 shadow-[0_0_80px_rgba(124,58,237,0.35)]"
      >
        {active && active.image && (
          <div className="grid gap-4 p-4 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <h3 id="cert-dialog-title" className="text-[1.2rem] font-bold text-white">
                {active.title}
              </h3>
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close certificate"
                className="grid h-10 w-10 flex-none place-items-center rounded-full border border-line bg-bg/80 text-white hover:bg-white hover:text-bg"
              >
                <FaXmark aria-hidden />
              </button>
            </div>
            {/* A plain <img> so the visitor sees the original file at full resolution. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.image}
              alt={`${active.title}, full size`}
              className="max-h-[70vh] w-full rounded-lg border border-line bg-white object-contain"
            />
            <a
              href={active.image}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 w-fit items-center gap-2 rounded-lg border border-line bg-surface2 px-4 text-[0.9rem] font-semibold hover:border-violetsoft"
            >
              Open full size <FaArrowUpRightFromSquare aria-hidden className="h-3 w-3" />
            </a>
          </div>
        )}
      </dialog>
    </section>
  );
}
