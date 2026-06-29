# stays-core

Shared theme and layout for the \*stays family of sites. One source for the look, so the sites can't drift apart.

It ships three things:

- **`stays-core/theme.css`** — design tokens + base styles (framework-agnostic).
- **React components** — `Shell`, `Hero`, `ToolGrid` (from `stays-core`).
- **Vanilla builders** — `shell`, `hero`, `toolGrid` (from `stays-core/vanilla`). Same markup and classes, no React.

## Install

```
npm install github:gabrielberger1000/stays-core#v0.3.0
```

It targets Vite + Tailwind v4. `react` is an **optional** peer dependency, so vanilla apps don't need it.

## Wire Tailwind (every app, React or vanilla)

In your main stylesheet, after `@import "tailwindcss"`:

```css
@import "stays-core/theme.css";
@source "../node_modules/stays-core/dist/**/*.js";
```

The **`@source` line is required** for both entry points. Without it, Tailwind won't generate the component classes and everything renders unstyled. The markup (and therefore the class names) lives in `dist/`, so the same `@source` covers the React and the vanilla builders.

Accent defaults to teal `#5cc8b0`. Override per site if yours differs:

```css
@theme { --color-accent: <hex>; --color-accent-soft: rgb(<r> <g> <b> / 0.14); }
[data-theme="light"] { --color-accent: <light hex>; --color-accent-soft: rgb(<r> <g> <b> / 0.12); }
```

## React

```tsx
import { Shell, Hero, ToolGrid } from 'stays-core'

<Shell brand="DataStays" tagline="Your data stays in your browser." headerRight={<ThemeToggle/>} footer={<Footer/>}>
  <Hero brand="DataStays" headline="Every data tool, in your browser" subhead="…" guarantees={['No uploads', 'No accounts']} />
  <ToolGrid sections={sections} linkComponent={RouterLink} /* optional: keeps SPA nav */ />
</Shell>
```

## Vanilla (non-React)

```ts
import { shell, hero, toolGrid } from 'stays-core/vanilla'

app.replaceChildren(
  shell({
    brand: 'MediaStays',
    tagline: 'Private · runs in your browser',
    content: hero({ brand: 'MediaStays', headline: 'Video & audio tools, in your browser', subhead: '…', guarantees: ['…'] }),
  }),
)
```

`shell` / `hero` / `toolGrid` return an `HTMLElement` (use `.outerHTML` for a string). `headerRight` / `footer` / `content` accept an `HTMLElement` or a string. `toolGrid` renders plain `<a href>` cards; the host's router intercepts internal clicks for SPA nav.

## One markup source, no drift

The React components and the vanilla builders both render the trees in `src/internal/markup.ts`. `src/markup.test.tsx` asserts the two produce identical DOM, so they can't diverge. To change the look: edit `markup.ts` once, bump the version, re-point each app.
