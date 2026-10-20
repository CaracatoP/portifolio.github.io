import { siClaude } from 'simple-icons'
import { BrandIcon } from '@/components/ui/brand-icon'
import { Reveal } from '@/components/ui/reveal'
import { SpotlightCard } from '@/components/ui/spotlight-card'
import { SectionHeading } from '@/components/section-heading'
import { stackGroups } from '@/data'
import { cn } from '@/lib/utils'

// Bento: duas cartas largas em cima, três embaixo (a de IA fecha a linha).
const spans = ['lg:col-span-3', 'lg:col-span-3', 'lg:col-span-2', 'lg:col-span-2']

export function Stack() {
  return (
    <section id="stack" aria-labelledby="stack-titulo" className="mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-36">
      <SectionHeading id="stack-titulo" title="Stack">
        As ferramentas que uso para levar uma ideia até produção.
      </SectionHeading>

      <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        {stackGroups.map((g, i) => (
          <Reveal key={g.title} delay={i * 0.06} className={spans[i]}>
            <SpotlightCard className="h-full p-6">
              <h3 className="font-medium">{g.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{g.text}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {g.items.map((t) => (
                  <li key={t.name} className="flex items-center gap-2 rounded-lg border border-line bg-white/[0.02] px-3 py-2 text-sm text-fg/90">
                    {t.icon && <BrandIcon icon={t.icon} className="size-4 text-muted" />}
                    {t.name}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>
        ))}

        <Reveal delay={0.24} className={cn('sm:col-span-2 lg:col-span-2')}>
          <SpotlightCard className="h-full p-6">
            <div className="flex items-center gap-2.5">
              <span className="grid size-8 place-items-center rounded-lg bg-[#d97757]/15 text-[#e08a6c]">
                <BrandIcon icon={siClaude} />
              </span>
              <h3 className="font-medium">IA no processo</h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Claude Code e OpenAI Codex fazem parte de como eu planejo, investigo, implemento e reviso. A IA acelera o trabalho; a
              responsabilidade pelo código continua sendo minha.
            </p>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  )
}
