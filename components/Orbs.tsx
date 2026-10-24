"use client";

import { useEffect, useRef } from "react";

// Glowing 3D balls that circle around the page. Each ball travels on a tilted orbit,
// and a simple perspective projection makes near balls bigger and far balls smaller.
type Orb = {
  radius: number; // orbit size, as a fraction of the screen width
  tilt: number; // how much the orbit leans toward the viewer
  spin: number; // rotation of the orbit on the screen
  speed: number; // radians per frame
  angle: number; // current position on the orbit
  size: number; // ball size in px
  rgb: [number, number, number];
};

const COLORS: [number, number, number][] = [
  [168, 85, 247], // violet
  [34, 211, 238], // cyan
  [244, 114, 182], // pink
  [129, 140, 248], // indigo
  [45, 212, 191], // teal
];

export default function Orbs() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    let scrollY = 0;

    const orbs: Orb[] = [
      { radius: 0.46, tilt: 0.95, spin: -0.35, speed: 0.0042, angle: 0.0, size: 26, rgb: COLORS[0] },
      { radius: 0.4, tilt: 0.8, spin: 0.5, speed: -0.0056, angle: 2.1, size: 18, rgb: COLORS[1] },
      { radius: 0.55, tilt: 1.1, spin: 0.15, speed: 0.0031, angle: 4.0, size: 34, rgb: COLORS[3] },
      { radius: 0.3, tilt: 0.7, spin: -0.8, speed: 0.0068, angle: 1.2, size: 14, rgb: COLORS[2] },
      { radius: 0.5, tilt: 0.9, spin: 0.9, speed: -0.0037, angle: 5.2, size: 22, rgb: COLORS[4] },
      { radius: 0.36, tilt: 1.05, spin: -0.1, speed: 0.0049, angle: 3.3, size: 12, rgb: COLORS[1] },
      { radius: 0.6, tilt: 0.85, spin: 0.3, speed: -0.0026, angle: 0.8, size: 30, rgb: COLORS[0] },
    ];

    const size = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Position of one orb: returns screen x, y, depth (0 far .. 1 near).
    const place = (o: Orb) => {
      const R = o.radius * Math.max(w, 520);
      const px = Math.cos(o.angle) * R;
      const pz = Math.sin(o.angle) * R;
      // Lean the orbit toward the viewer, then rotate it on the screen.
      const py = pz * Math.sin(o.tilt) * 0.35;
      const depthZ = pz * Math.cos(o.tilt);
      const cs = Math.cos(o.spin);
      const sn = Math.sin(o.spin);
      const x = px * cs - py * sn;
      const y = px * sn + py * cs;
      const f = 900;
      const persp = f / (f - depthZ * 0.9);
      const depth = Math.min(1, Math.max(0, (depthZ / R + 1) / 2));
      return {
        x: w / 2 + x * persp,
        y: h * 0.5 - scrollY * 0.04 + y * persp,
        persp,
        depth,
      };
    };

    const drawBall = (x: number, y: number, r: number, rgb: [number, number, number], alpha: number) => {
      const [R, G, B] = rgb;
      // Soft glow around the ball.
      const glow = ctx.createRadialGradient(x, y, r * 0.6, x, y, r * 3.2);
      glow.addColorStop(0, `rgba(${R},${G},${B},${(0.28 * alpha).toFixed(3)})`);
      glow.addColorStop(1, `rgba(${R},${G},${B},0)`);
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(x, y, r * 3.2, 0, Math.PI * 2);
      ctx.fill();
      // The ball itself: bright spot top-left, dark edge bottom-right, so it looks round.
      const body = ctx.createRadialGradient(x - r * 0.4, y - r * 0.45, r * 0.08, x, y, r);
      body.addColorStop(0, `rgba(255,255,255,${(0.95 * alpha).toFixed(3)})`);
      body.addColorStop(0.28, `rgba(${R},${G},${B},${(0.95 * alpha).toFixed(3)})`);
      body.addColorStop(1, `rgba(${Math.round(R * 0.25)},${Math.round(G * 0.25)},${Math.round(B * 0.35)},${(0.9 * alpha).toFixed(3)})`);
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const items = orbs.map((o) => ({ o, p: place(o) }));
      items.sort((a, b) => a.p.depth - b.p.depth); // far first, near last
      for (const { o, p } of items) {
        const r = o.size * p.persp * (0.55 + 0.6 * p.depth);
        drawBall(p.x, p.y, r, o.rgb, 0.3 + 0.55 * p.depth);
      }
      if (!reduce) {
        for (const o of orbs) o.angle += o.speed;
        raf = requestAnimationFrame(draw);
      }
    };

    const onResize = () => {
      size();
      if (reduce) draw();
    };
    const onScroll = () => {
      scrollY = window.scrollY;
      if (reduce) draw();
    };
    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduce) raf = requestAnimationFrame(draw);
    };

    size();
    draw();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0 h-full w-full" />;
}
