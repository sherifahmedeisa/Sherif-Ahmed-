# Sherif Ahmed — Personal Portfolio

A visual-first React portfolio built with Vite and designed for direct deployment to Vercel.

## Local development

```bash
pnpm install
pnpm dev
```

The development server runs on port `3000` by default. Use `PORT=3001 pnpm dev` to choose another port.

## Production build

```bash
pnpm build
pnpm start
```

The static output is written to `dist/public/`.

## Vercel deployment

This repository includes `vercel.json`, which tells Vercel to run `pnpm build:static` and publish `dist/public/`. Import the repository or upload the project folder as-is; do not set the Vercel output directory to `client` or `src`.

The contact form uses the Vercel serverless function at `api/contact.ts`. Add `RESEND_API_KEY` in Vercel Project Settings → Environment Variables for email delivery. Without the key, the portfolio still builds and the form returns a clear configuration message.

The project has no Express server, Manus runtime, database, OAuth, or platform-specific boot process.
