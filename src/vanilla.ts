// Framework-agnostic builders for vanilla (non-React) *stays sites. They emit the
// SAME markup and classes as the React components (Shell/Hero/ToolGrid) because
// both render the shared trees in internal/markup. No React is imported here.
//
// Tailwind note: consuming apps must still scan the package so these classes are
// generated — keep `@source ".../node_modules/stays-core/dist/**/*.js"` in your CSS.
import {
  CARD_CLASS,
  cardInner,
  heroTree,
  shellTree,
  toolGridTree,
  type ToolItem,
  type ToolSection,
} from './internal/markup'
import { toElement, toNodes } from './internal/dom'

export type { ToolItem, ToolSection } from './internal/markup'

export interface ShellOpts {
  brand: string
  tagline: string
  /** Far-right header content (e.g. a theme toggle). */
  headerRight?: HTMLElement | string
  /** Footer content below the content column. */
  footer?: HTMLElement | string
  /** Main content (e.g. the result of hero()). */
  content: HTMLElement | string
}
export function shell(opts: ShellOpts): HTMLElement {
  return toElement(shellTree(opts))
}

export interface HeroOpts {
  brand: string
  headline: string
  subhead: string
  guarantees: string[]
}
export function hero(opts: HeroOpts): HTMLElement {
  return toElement(heroTree(opts))
}

export interface ToolGridOpts {
  sections: ToolSection[]
  /** Optional href override (default: item.href). Cards are plain <a> elements;
   *  the host's router intercepts internal clicks for SPA nav. */
  linkHref?: (item: ToolItem) => string
}
export function toolGrid({ sections, linkHref }: ToolGridOpts): HTMLElement {
  const card = (item: ToolItem): HTMLElement => {
    const a = document.createElement('a')
    a.setAttribute('href', linkHref ? linkHref(item) : item.href)
    a.setAttribute('class', CARD_CLASS)
    for (const child of cardInner(item)) for (const n of toNodes(child)) a.appendChild(n)
    return a
  }
  return toElement(toolGridTree({ sections, card }))
}
