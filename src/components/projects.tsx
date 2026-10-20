import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'motion/react'
import { ArrowUpRight, Check } from 'lucide-react'
import { siGithub } from 'simple-icons'
import { BrandIcon } from '@/components/ui/brand-icon'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/section-heading'
import { moreProjects, projects, type Project } from '@/data'
import { cn } from '@/lib/utils'
import { useReduce } from '@/lib/motion-pref'

const AUTOPLAY_MS = 9000

export function Projects() {
  return (
    <section id="projetos" aria-labelledby="projetos-titulo" className="mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-36">
      <SectionHeading id="projetos-titulo" title="Projetos">
        Produtos que estou construindo e mantendo, do banco de dados à interface.
      </SectionHeading>

      <Showcase />
      <MobileList />

      <Reveal className="mt-16 grid gap-3 sm:grid-cols-2">
        {moreProjects.map((p) => (
          <a
            key={p.name}
            href={p.href}
            target="_blank"
            rel="noopener"
            className="group flex items-start justify-between gap-4 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-line-strong hover:bg-surface-2"
          >
            <div>
              <p className="flex items-center gap-2 font-medium">
                <BrandIcon icon={siGithub} className="size-3.5 text-subtle" /> {p.name}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.text}</p>
            </div>
            <ArrowUpRight className="size-4 shrink-0 text-subtle transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
          </a>
        ))}
      </Reveal>
    </section>
  )
}

// Desktop: lista à esquerda (um aberto por vez) e o produto ao vivo à direita.
function Showcase() {
  const [active, setActive] = useState(0)
  const [auto, setAuto] = useState(true)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-20% 0px' })
  const reduce = useReduce()
  const playing = auto && inView && !reduce

  useEffect(() => {
    if (!playing) return
    const t = setTimeout(() => setActive((a) => (a + 1) % projects.length), AUTOPLAY_MS)
    return () => clearTimeout(t)
  }, [playing, active])

  const { Mock } = projects[active]

  return (
    <div ref={ref} className="mt-14 hidden gap-10 lg:grid lg:grid-cols-12">
      <ul className="col-span-5 flex flex-col gap-2">
        {projects.map((p, i) => {
          const open = i === active
          return (
            <li key={p.id} className={cn('rounded-2xl border transition-colors duration-300', open ? 'border-line-strong bg-surface' : 'border-transparent hover:bg-white/[0.02]')}>
              <button
                type="button"
                aria-expanded={open}
                aria-controls={`painel-${p.id}`}
                onClick={() => {
                  setActive(i)
                  setAuto(false)
                }}
                className="relative w-full overflow-hidden rounded-2xl px-5 pb-4 pt-5 text-left"
              >
                <span className="flex items-center justify-between gap-3">
                  <span className={cn('text-lg font-medium tracking-tight transition-colors', open ? 'text-fg' : 'text-muted')}>{p.name}</span>
                  <Status status={p.status} />
                </span>
                <span className={cn('mt-1.5 block text-sm leading-relaxed', open ? 'text-muted' : 'text-subtle')}>{p.summary}</span>
                {open && playing && (
                  <motion.span
                    key={`bar-${active}`}
                    aria-hidden
                    className="absolute inset-x-5 bottom-0 h-px origin-left bg-accent/70"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }}
                  />
                )}
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    id={`painel-${p.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <Details project={p} className="px-5 pb-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          )
        })}
      </ul>

      <div className="col-span-7">
        <div className="sticky top-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={projects[active].id}
              initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <Mock />
            </motion.div>
          </AnimatePresence>
          <p className="mt-4 text-center text-xs text-subtle">Ilustração da interface com dados fictícios.</p>
        </div>
      </div>
    </div>
  )
}

// Celular: cada projeto com o próprio mockup embaixo.
function MobileList() {
  return (
    <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-16 lg:hidden">
      {projects.map((p) => (
        <Reveal key={p.id} className="min-w-0">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-xl font-medium tracking-tight">{p.name}</h3>
            <Status status={p.status} />
          </div>
          <p className="mt-2 leading-relaxed text-muted">{p.summary}</p>
          <Details project={p} className="mt-5" />
          <div className="mt-6">
            <p.Mock />
          </div>
          <p className="mt-3 text-center text-xs text-subtle">Ilustração da interface com dados fictícios.</p>
        </Reveal>
      ))}
    </div>
  )
}

function Details({ project, className }: { project: Project; className?: string }) {
  return (
    <div className={className}>
      <ul className="grid gap-2 text-sm text-fg/90">
        {project.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
            {f}
          </li>
        ))}
      </ul>
      <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tecnologias">
        {project.stack.map((s) => (
          <li key={s} className="rounded-full border border-line bg-white/[0.03] px-2.5 py-1 text-xs text-muted">
            {s}
          </li>
        ))}
      </ul>
      {project.links.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-4">
          {project.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener" className="group inline-flex items-center gap-1 text-sm font-medium text-fg">
              {l.label}
              <ArrowUpRight className="size-3.5 text-subtle transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

function Status({ status }: { status: Project['status'] }) {
  const building = status === 'Em desenvolvimento'
  return (
    <span className="flex shrink-0 items-center gap-1.5 text-xs text-subtle">
      <span className={cn('size-1.5 rounded-full', building ? 'bg-[#f2b45a]' : 'bg-accent')} aria-hidden />
      {status}
    </span>
  )
}
