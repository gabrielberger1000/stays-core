import type { ReactNode } from 'react'

export interface ShellProps {
  /** Brand wordmark, e.g. "DataStays". */
  brand: string
  /** Mono privacy tagline shown at the right of the header. */
  tagline: string
  /** Optional control(s) at the far right of the header (e.g. a theme toggle). */
  headerRight?: ReactNode
  /** Footer content rendered below the content column. */
  footer?: ReactNode
  children: ReactNode
}

// The shared *stays page frame (one source for the family layout, so every site is
// identical by construction): a full-bleed header (accent square chip + wordmark +
// mono tagline), a centered 960px content column, and a footer slot. Colour tokens
// (bg-bg, text-text, bg-accent, …) are provided by each app's theme, which already
// shares the Stays-Core values.
export function Shell({ brand, tagline, headerRight, footer, children }: ShellProps) {
  return (
    <div className="flex min-h-full flex-col bg-bg text-text">
      <header className="sticky top-0 z-20 border-b border-border bg-surface/85 backdrop-blur-md">
        <div className="flex w-full items-center justify-between gap-4 px-6 py-2">
          <a href="/" aria-label={`${brand} — home`} className="flex items-center gap-2.5">
            <span className="h-3 w-3 shrink-0 rounded-[3px] bg-accent" aria-hidden="true" />
            <span className="text-base font-semibold tracking-tight text-text">{brand}</span>
          </a>
          <div className="flex items-center gap-4">
            <span className="hidden font-mono text-xs text-muted sm:inline">{tagline}</span>
            {headerRight}
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[960px] flex-1 px-8 pt-12 pb-8">{children}</main>

      {footer}
    </div>
  )
}
