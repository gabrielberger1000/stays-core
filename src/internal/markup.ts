// THE single markup source for the *stays family. h() builds a tiny framework-
// agnostic node tree; the React renderer (./react) and the DOM renderer (./dom)
// turn ONE tree into either React elements or real DOM. The Shell/Hero/ToolGrid
// React components and the shell/hero/toolGrid vanilla builders both render the
// trees below, so their structure and class names can never drift apart.

export type Slot = unknown // host content: ReactNode (React) | Node | string (vanilla) | undefined

export interface VNode {
  tag: string
  attrs: Record<string, string>
  children: VChild[]
}
export interface SlotMark {
  __slot: Slot
}
export type VChild = VNode | string | SlotMark | null | undefined

export function h(tag: string, attrs: Record<string, string>, ...children: VChild[]): VNode {
  return { tag, attrs, children }
}
export function slot(value: Slot): SlotMark {
  return { __slot: value }
}
export function isSlot(c: unknown): c is SlotMark {
  return typeof c === 'object' && c !== null && '__slot' in c
}

// ── shared tool types (used by both the React + vanilla grids) ───────────────
export interface ToolItem {
  title: string
  description?: string
  href: string
}
export interface ToolSection {
  /** Mono section label, e.g. "FORMAT". */
  label: string
  items: ToolItem[]
}

// ── the markup, one builder per component ────────────────────────────────────

export interface ShellTreeOpts {
  brand: string
  tagline: string
  headerRight?: Slot
  footer?: Slot
  content: Slot
}
export function shellTree(o: ShellTreeOpts): VNode {
  return h(
    'div',
    { class: 'flex min-h-full flex-col bg-bg text-text' },
    h(
      'header',
      { class: 'sticky top-0 z-20 border-b border-border bg-surface/85 backdrop-blur-md' },
      h(
        'div',
        { class: 'flex w-full items-center justify-between gap-4 px-6 py-2' },
        h(
          'a',
          { href: '/', 'aria-label': `${o.brand} — home`, class: 'flex items-center gap-2.5' },
          h('span', { class: 'h-3 w-3 shrink-0 rounded-[3px] bg-accent', 'aria-hidden': 'true' }),
          h('span', { class: 'text-base font-semibold tracking-tight text-text' }, o.brand),
        ),
        h(
          'div',
          { class: 'flex items-center gap-4' },
          h('span', { class: 'hidden font-mono text-xs text-muted sm:inline' }, o.tagline),
          slot(o.headerRight),
        ),
      ),
    ),
    h('main', { class: 'mx-auto w-full max-w-[960px] flex-1 px-8 pt-12 pb-8' }, slot(o.content)),
    slot(o.footer),
  )
}

export interface HeroTreeOpts {
  brand: string
  headline: string
  subhead: string
  guarantees: string[]
}
export function heroTree(o: HeroTreeOpts): VNode {
  return h(
    'section',
    { class: 'flex flex-col items-start' },
    h(
      'span',
      {
        class:
          'flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent',
      },
      h('span', { class: 'h-2.5 w-2.5 rounded-[2px] bg-accent', 'aria-hidden': 'true' }),
      o.brand,
    ),
    h(
      'h1',
      {
        class:
          'mt-2 text-4xl font-semibold leading-[1.05] tracking-tight text-text sm:text-[2.8rem]',
      },
      o.headline,
    ),
    h('p', { class: 'mt-4 max-w-[38rem] text-[1.05rem] leading-[1.55] text-muted' }, o.subhead),
    h(
      'ul',
      { class: 'mt-5 flex flex-wrap items-center gap-x-6 gap-y-2' },
      ...o.guarantees.map((g) =>
        h(
          'li',
          { class: 'flex items-center gap-2 text-sm text-muted' },
          h('span', { class: 'h-1.5 w-1.5 rounded-full bg-success', 'aria-hidden': 'true' }),
          g,
        ),
      ),
    ),
  )
}

export const CARD_CLASS =
  'rounded-xl border border-border bg-surface p-5 transition-colors hover:border-border-strong hover:bg-surface-2'

/** The inside of a card (title + optional description) — shared; the link wrapper
 *  is per-framework (React may use a router Link; vanilla uses a plain <a>). */
export function cardInner(item: ToolItem): VChild[] {
  return [
    h('span', { class: 'block font-medium text-text' }, item.title),
    ...(item.description
      ? [h('span', { class: 'mt-1.5 block text-sm leading-relaxed text-muted' }, item.description)]
      : []),
  ]
}

export interface ToolGridTreeOpts {
  sections: ToolSection[]
  /** Builds each card element (the link wrapper). Returns a host Slot. */
  card: (item: ToolItem) => Slot
}
export function toolGridTree(o: ToolGridTreeOpts): VNode {
  return h(
    'section',
    { class: 'flex flex-col gap-8' },
    ...o.sections.map((section) =>
      h(
        'div',
        { class: 'flex flex-col gap-4' },
        h(
          'h2',
          { class: 'font-mono text-xs uppercase tracking-[0.18em] text-faint' },
          section.label,
        ),
        h(
          'div',
          { class: 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3' },
          ...section.items.map((item) => slot(o.card(item))),
        ),
      ),
    ),
  )
}
