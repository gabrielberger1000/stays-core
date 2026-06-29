import { createElement, type ComponentType, type ReactNode } from 'react'
import {
  CARD_CLASS,
  cardInner,
  toolGridTree,
  type ToolItem,
  type ToolSection,
} from './internal/markup'
import { toReact } from './internal/react'

export type { ToolItem, ToolSection } from './internal/markup'

/** Props a custom link renderer receives (e.g. a wrapper around a router Link). */
export interface ToolLinkProps {
  href: string
  className: string
  children: ReactNode
}

export interface ToolGridProps {
  sections: ToolSection[]
  /** Custom link component (e.g. a router Link) — defaults to a plain <a>. */
  linkComponent?: ComponentType<ToolLinkProps>
}

// The shared tool grid (mono section labels + bordered cards). The card markup is
// shared with the vanilla `toolGrid()` builder; only the link wrapper differs
// (here it can be a router Link to keep SPA nav).
export function ToolGrid({ sections, linkComponent }: ToolGridProps): ReactNode {
  const card = (item: ToolItem): ReactNode => {
    const children = cardInner(item).map((c, i) => toReact(c, i))
    const props = { href: item.href, className: CARD_CLASS, key: item.href, children }
    return linkComponent ? createElement(linkComponent, props) : createElement('a', props)
  }
  return toReact(toolGridTree({ sections, card }))
}
