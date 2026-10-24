# Keya's Portfolio (Next.js + React + Tailwind CSS)

A dark, space-themed developer portfolio. The contact form saves every message to MongoDB and emails it to your Gmail.

Stack: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, MongoDB, Nodemailer, Zod.

## 1. Run it locally

```bash
npm install
cp .env.example .env.local     # Windows PowerShell: copy .env.example .env.local
npm run dev
```

Open http://localhost:3000. The page works without any setup. The contact form needs step 2.

## 2. Set up the contact form

Open `.env.local` and fill in three things.

**a) MongoDB (stores the messages)**
1. Create a free cluster at https://cloud.mongodb.com (M0).
2. Database Access: create a user. Network Access: allow `0.0.0.0/0` (needed for Vercel).
3. Connect > Drivers > copy the connection string into `MONGODB_URI`.
4. Messages are saved in the `messages` collection of the `portfolio` database (`MONGODB_DB`).

**b) Gmail (sends you the notification)**
1. Turn on 2-Step Verification in your Google Account.
2. Google Account > Security > App passwords. Create one called "Portfolio".
3. Put your Gmail address in `GMAIL_USER` and the 16-character app password in `GMAIL_APP_PASSWORD`.
4. Put the inbox that should receive messages in `CONTACT_TO_EMAIL` (can be the same Gmail).

Each email has the visitor's address as Reply-To, so you can answer with one click.

**c) Test it**: submit the form on your local site. Check your inbox and the `messages` collection.

How it behaves: if MongoDB works but email fails (or the other way round), the visitor still sees success because the message reached you one way. If both fail, the visitor sees a friendly error that points to LinkedIn.

## 3. Change the content

Everything you read on the page (text, projects, links, skills, numbers) is in `lib/data.ts`. Edit that one file.

- Colors: `app/globals.css` (`@theme` block). Fonts: `app/layout.tsx` (Inter for text, Orbitron for the name in the nav).
- Photo: it is `public/keya-2.jpg`, set by `photo` in `lib/data.ts`. To change it, save a new file in `public/` under a new name and update `photo`.
- Project screenshots: save a screenshot in `public/projects/` (for example `renovation.png`, about 1280×720) and add `image: "/projects/renovation.png"` to that project in `lib/data.ts`. Until then each card shows a browser-window preview with the site address.
- Certificates: save an image in `public/certificates/` and add `image: "/certificates/wordpress.png"` to the achievement in `lib/data.ts`.
- Email on the page: set `email` in `lib/data.ts` to show it in Contact, Footer and the social icons. Leave `""` to hide it.
- Skills: edit the `skills` list in `lib/data.ts`. Icons come from `react-icons` (see `components/Skills.tsx`).
- Real URL: set `siteUrl` in `lib/data.ts` after you deploy.

## 4. Deploy on Vercel

1. Push this folder to a GitHub repository.
2. Import the repo at https://vercel.com/new.
3. Add the same environment variables (`MONGODB_URI`, `MONGODB_DB`, `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `CONTACT_TO_EMAIL`) in Project Settings > Environment Variables.
4. Deploy.

Never commit `.env.local`. It is already in `.gitignore`.

## Notes

- Spam protection: a hidden honeypot field, server-side validation with Zod, and a limit of 5 messages per IP per hour. The limit is kept in memory, so on serverless hosting it slows casual spam but is not a hard guarantee. For stronger protection, add Cloudflare Turnstile later.
- Email contents are sent as plain text, so visitor input cannot inject HTML.
- To read stored messages, use MongoDB Atlas > Browse Collections > `portfolio.messages`.
