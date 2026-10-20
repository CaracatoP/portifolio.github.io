import type { ReactNode } from 'react'
import { Reveal } from '@/components/ui/reveal'

export function SectionHeading({ id, title, children }: { id?: string; title: string; children?: ReactNode }) {
  return (
    <Reveal className="max-w-2xl">
      <h2 id={id} className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {children && <p className="mt-4 text-lg leading-relaxed text-muted">{children}</p>}
    </Reveal>
  )
}
