import type { ComponentType, ReactNode } from 'react'

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

const CARD =
  'rounded-xl border border-border bg-surface p-5 transition-colors hover:border-border-strong hover:bg-surface-2'

function Anchor({ href, className, children }: ToolLinkProps) {
  return (
    <a href={href} className={className}>
      {children}
    </a>
  )
}

// The shared tool grid: mono section labels and the bordered cards, three across.
// `linkComponent` lets a React-Router app keep SPA navigation; without it the cards
// are plain anchors, so the component works in any *stays site.
export function ToolGrid({ sections, linkComponent }: ToolGridProps) {
  const Link = linkComponent ?? Anchor
  return (
    <section className="flex flex-col gap-8">
      {sections.map((section) => (
        <div key={section.label} className="flex flex-col gap-4">
          <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-faint">{section.label}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {section.items.map((item) => (
              <Link key={item.href} href={item.href} className={CARD}>
                <span className="block font-medium text-text">{item.title}</span>
                {item.description && (
                  <span className="mt-1.5 block text-sm leading-relaxed text-muted">
                    {item.description}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
