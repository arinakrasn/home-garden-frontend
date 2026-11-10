# AGENTS.md

Guidance for AI coding agents (and humans) working in this repo. Keep it short and update it when conventions change.

## Project

TLF: a React 19 + Vite 8 SPA (plain JavaScript/JSX, no TypeScript) styled with Tailwind CSS v4 and shadcn/ui (`radix-nova` style), with `assistant-ui` for chat and `react-router-dom` v7 for routing.

## Commands

```bash
npm install        # install deps
npm run dev        # Vite dev server
npm run lint       # ESLint (must pass before finishing a task)
npm run build      # production build into dist/ (must pass before finishing a task)
npm run preview    # serve the production build
```

There is no test runner yet. If you add one, document it here.

## Structure

```
public/                 Unbundled static files, referenced by root URL (/favicon.svg)
src/
  assets/               Bundled assets, imported in code
  components/
    ui/                 shadcn/ui primitives (generated, lowercase filenames)
    assistant-ui/       assistant-ui chat components
  hooks/                Shared custom hooks (useXxx.js)
  layouts/              Route shells: PublicLayout (/), AppLayout (/app/*)
  lib/                  Non-React helpers (utils.js exports `cn`)
  pages/                One file per route, named XxxPage.jsx
  App.jsx               Router and route table
  index.css             Tailwind imports, theme tokens
  main.jsx              Entry point
```

Where things go:
- New route: create `src/pages/XxxPage.jsx`, register it in `src/App.jsx` under the right layout, add a nav link in that layout.
- Reusable UI used by 2+ pages: `src/components/<feature>/`. Page-only pieces stay in the page file until reused.
- Generic primitives: add via `npx shadcn add <name>`; do not hand-write what shadcn provides.

## Conventions

- Plain JS/JSX only. No `.ts`/`.tsx` files.
- Use the `@/` alias for anything under `src/` (`import { cn } from "@/lib/utils"`). Use relative imports only for siblings in the same folder.
- Components: function components, default export, PascalCase filename matching the component. Exception: `components/ui/*` keeps shadcn's lowercase names.
- Hooks: `src/hooks/useXxx.js`, named export.
- Styling: Tailwind utility classes and the theme tokens in `src/index.css` (`bg-background`, `text-muted-foreground`, ...). No new CSS files, no inline `style` unless a value is dynamic, no hard-coded hex colors; add a token instead.
- Merge conditional classes with `cn()`. Variants go through `class-variance-authority`.
- Icons come from `lucide-react` only.
- Static images: import from `src/assets/` when used in code (hashed), put in `public/` only when a stable URL is needed.
- Do not edit generated shadcn files in `components/ui/` for one-off needs; wrap them or pass `className`. Intentional shared changes are fine.
- If a lint rule blocks you, fix the code. Only change `eslint.config.js` with a stated reason.

## Do not

- Do not commit `dist/`, `node_modules/`, `.idea/`, or `.env*` files.
- Do not add a dependency without saying why in your summary. Prefer what is already installed.
- Do not reintroduce the old `css/` and `js/` static-site files.
- Do not rewrite or reformat unrelated files.

## Definition of done

1. `npm run lint` and `npm run build` pass.
2. Changed UI was checked in the browser at desktop and mobile widths, light/dark if the theme supports it.
3. `README.md` and this file are updated if structure or conventions changed.
