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

// The shared hero: mono accent eyebrow, large headline, subhead, and a row of
// green-dot guarantees. The type scale and spacing live here so they can never
// drift between sites again (the subhead is 1.05rem / 1.55, the family value).
export function Hero({ brand, headline, subhead, guarantees }: HeroProps) {
  return (
    <section className="flex flex-col items-start">
      <span className="flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent">
        <span className="h-2.5 w-2.5 rounded-[2px] bg-accent" aria-hidden="true" />
        {brand}
      </span>
      <h1 className="mt-2 text-4xl font-semibold leading-[1.05] tracking-tight text-text sm:text-[2.8rem]">
        {headline}
      </h1>
      <p className="mt-4 max-w-[38rem] text-[1.05rem] leading-[1.55] text-muted">{subhead}</p>
      <ul className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
        {guarantees.map((g) => (
          <li key={g} className="flex items-center gap-2 text-sm text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
            {g}
          </li>
        ))}
      </ul>
    </section>
  )
}
