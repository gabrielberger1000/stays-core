import type { ReactNode } from 'react'
import { heroTree } from './internal/markup'
import { toReact } from './internal/react'

export interface HeroProps {
  /** Site name, shown as the mono eyebrow above the headline. */
  brand: string
  /** Large headline, e.g. "Every data tool, in your browser". */
  headline: string
  /** One- or two-line supporting sentence. */
  subhead: string
  /** Short "what we don't do" chips, each rendered with a green dot. */
  guarantees: string[]
}

// The shared hero (mono eyebrow, headline, subhead, green-dot guarantees). Markup
// is shared with the vanilla `hero()` builder via internal/markup.
export function Hero({ brand, headline, subhead, guarantees }: HeroProps): ReactNode {
  return toReact(heroTree({ brand, headline, subhead, guarantees }))
}
