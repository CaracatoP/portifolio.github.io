import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/section-heading'
import { principles, steps } from '@/data'

export function Process() {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 55%'] })
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="processo" aria-labelledby="processo-titulo" className="mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-36">
      <SectionHeading id="processo-titulo" title="Como eu trabalho">
        Investigação antes de implementação. O mesmo processo numa feature grande ou numa correção de uma linha.
      </SectionHeading>

      <div className="relative mt-16">
        {/* Trilho que preenche com a rolagem (no celular, vertical) */}
        <div aria-hidden className="absolute bottom-3 left-[11px] top-3 w-px bg-line lg:hidden">
          <motion.div className="size-full origin-top bg-accent" style={{ scaleY: fill }} />
        </div>
        <div aria-hidden className="absolute inset-x-0 top-[11px] hidden h-px bg-line lg:block">
          <motion.div className="size-full origin-left bg-accent" style={{ scaleX: fill }} />
        </div>
        <ol ref={ref} className="relative grid gap-8 lg:grid-cols-6 lg:gap-6">
          {steps.map(([title, text], i) => (
            <motion.li
              key={title}
              className="flex gap-4 lg:block"
              initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.7, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="relative z-10 grid size-6 shrink-0 place-items-center rounded-full border border-line-strong bg-bg font-mono text-[11px] text-muted">
                {i + 1}
              </span>
              <div className="lg:mt-5">
                <h3 className="font-medium">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{text}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>

      <div className="mt-20 grid gap-3 md:grid-cols-3">
        {principles.map(([title, text], i) => (
          <Reveal key={title} delay={i * 0.06} className="rounded-2xl border border-line bg-surface p-6">
            <h3 className="font-medium">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
