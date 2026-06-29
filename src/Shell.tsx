import type { ReactNode } from 'react'
import { shellTree } from './internal/markup'
import { toReact } from './internal/react'

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

// The shared *stays page frame: a full-bleed header (accent square chip + wordmark
// + mono tagline), a centered 960px content column, and a footer slot. Markup is
// shared with the vanilla `shell()` builder via internal/markup.
export function Shell({ brand, tagline, headerRight, footer, children }: ShellProps): ReactNode {
  return toReact(shellTree({ brand, tagline, headerRight, footer, content: children }))
}
