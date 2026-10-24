import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";
import { getDb, isMongoConfigured } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80, "Name is too long."),
  email: z.string().trim().email("Please enter a valid email address.").max(120, "Email is too long."),
  message: z
    .string()
    .trim()
    .min(10, "Please write at least 10 characters.")
    .max(2000, "Message is too long (2000 characters max)."),
  website: z.string().max(0).optional(), // honeypot
});

// Simple per-instance rate limit: 5 messages per IP per hour.
// On serverless hosts each instance has its own memory, so this slows casual spam, it is not a hard guarantee.
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function clientIp(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

function oneLine(s: string) {
  return s.replace(/[\r\n]+/g, " ");
}

async function sendEmail(m: { name: string; email: string; message: string }) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  const to = process.env.CONTACT_TO_EMAIL || user;
  if (!user || !pass || !to) throw new Error("Email is not configured");

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `"Portfolio contact form" <${user}>`,
    to,
    replyTo: `"${oneLine(m.name).replace(/"/g, "")}" <${m.email}>`,
    subject: `New portfolio message from ${oneLine(m.name)}`,
    text: `Name: ${m.name}\nEmail: ${m.email}\n\n${m.message}\n`,
  });
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    // A filled honeypot gets a fake success so bots do not learn anything.
    const honeypotHit = parsed.error.issues.some((i) => i.path[0] === "website");
    if (honeypotHit) return NextResponse.json({ ok: true });

    const fields: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0]);
      if (!fields[key]) fields[key] = issue.message;
    }
    return NextResponse.json({ error: "Please fix the highlighted fields.", fields }, { status: 400 });
  }

  if (rateLimited(clientIp(req))) {
    return NextResponse.json({ error: "Too many messages. Please try again later." }, { status: 429 });
  }

  const { name, email, message } = parsed.data;
  let stored = false;
  let emailed = false;

  if (isMongoConfigured()) {
    try {
      const db = await getDb();
      await db.collection("messages").insertOne({
        name,
        email,
        message,
        createdAt: new Date(),
        userAgent: req.headers.get("user-agent")?.slice(0, 300) ?? null,
      });
      stored = true;
    } catch (err) {
      console.error("[contact] MongoDB save failed:", err);
    }
  }

  try {
    await sendEmail({ name, email, message });
    emailed = true;
  } catch (err) {
    console.error("[contact] Email failed:", err);
  }

  // Success if the message reached me by at least one route.
  if (stored || emailed) return NextResponse.json({ ok: true, stored, emailed });

  return NextResponse.json(
    { error: "Your message could not be sent right now. Please message me on LinkedIn instead." },
    { status: 500 },
  );
}
