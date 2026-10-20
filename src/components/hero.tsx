import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { siWhatsapp } from 'simple-icons'
import { ButtonLink } from '@/components/ui/button'
import { BrandIcon } from '@/components/ui/brand-icon'
import { contact, marquee } from '@/data'
import { asset } from '@/lib/utils'

const headline = 'Construo produtos SaaS prontos para usuários reais.'
const ease = [0.16, 1, 0.3, 1] as const

export function Hero() {
  return (
    <section id="topo" className="relative overflow-hidden pt-36 sm:pt-44">
      <Backdrop />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <h1 className="max-w-[17ch] text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-[4.75rem]">
          {headline.split(' ').map((w, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.05 + i * 0.06, ease }}
            >
              {w}&nbsp;
            </motion.span>
          ))}
        </h1>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.55, ease }}>
          <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-muted sm:text-xl">
            Sou João Gabriel Caracato, desenvolvedor full-stack. Crio plataformas multi-tenant, automações e IA aplicada a negócios, com
            segurança, desempenho e acabamento de produto.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href="#projetos" size="lg">
              Ver projetos <ArrowRight />
            </ButtonLink>
            <ButtonLink href={contact.whatsapp} target="_blank" rel="noopener" variant="outline" size="lg">
              <BrandIcon icon={siWhatsapp} /> Conversar no WhatsApp
            </ButtonLink>
          </div>

          <div className="mt-10 flex items-center gap-3 text-sm text-subtle">
            <img src={asset('avatar.jpg')} alt="Foto de João Gabriel Caracato" width={40} height={40} className="size-10 rounded-full object-cover ring-1 ring-line-strong" />
            <p>
              <span className="text-muted">19 anos, Brasil.</span> Desenvolvo com Claude Code e OpenAI Codex no fluxo de trabalho.
            </p>
          </div>
        </motion.div>
      </div>

      <Marquee />
    </section>
  )
}

// Grade de pontos com máscara radial e um feixe de luz suave no topo (padrões Aceternity / Magic UI).
function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: 'radial-gradient(rgb(255 255 255 / 0.09) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 30% 20%, black 30%, transparent 75%)',
        }}
      />
      <motion.div
        className="absolute -top-40 left-[8%] h-[520px] w-[720px] rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgb(63 214 176 / 0.13), transparent)' }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease }}
      />
    </div>
  )
}

function Marquee() {
  const row = [...marquee, ...marquee]
  return (
    <div
      className="relative mt-24 border-y border-line py-6 sm:mt-28"
      style={{ maskImage: 'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)' }}
    >
      <ul className="flex w-max animate-marquee gap-12 hover:[animation-play-state:paused]" aria-label="Tecnologias que uso">
        {row.map((t, i) => (
          <li key={i} aria-hidden={i >= marquee.length} className="flex items-center gap-2.5 text-sm text-subtle">
            {t.icon && <BrandIcon icon={t.icon} className="size-[18px]" />}
            {t.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
