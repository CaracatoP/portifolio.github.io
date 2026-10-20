import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check, Copy, Mail } from 'lucide-react'
import { siGithub, siInstagram, siWhatsapp } from 'simple-icons'
import { Button, ButtonLink } from '@/components/ui/button'
import { BrandIcon, siLinkedinPath } from '@/components/ui/brand-icon'
import { Reveal } from '@/components/ui/reveal'
import { contact } from '@/data'

export function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${contact.email}`
    }
  }

  return (
    <section id="contato" aria-labelledby="contato-titulo" className="mx-auto max-w-6xl px-5 pb-24 pt-12 sm:px-8 sm:pb-32">
      <Reveal className="relative overflow-hidden rounded-3xl border border-line bg-surface px-6 py-14 sm:px-14 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-40 size-[520px] rounded-full"
          style={{ background: 'radial-gradient(closest-side, rgb(63 214 176 / 0.12), transparent)' }}
        />
        <div className="relative max-w-2xl">
          <h2 id="contato-titulo" className="text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
            Tem um produto para tirar do papel?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">Conta o que você quer construir. Falo por WhatsApp ou e-mail.</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href={contact.whatsapp} target="_blank" rel="noopener" size="lg">
              <BrandIcon icon={siWhatsapp} /> {contact.whatsappLabel}
            </ButtonLink>
            <Button variant="outline" size="lg" onClick={copy} aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copied ? 'ok' : 'copy'}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="inline-flex items-center gap-2"
                >
                  {copied ? <Check className="text-accent" /> : <Copy />}
                  {copied ? 'E-mail copiado' : contact.email}
                </motion.span>
              </AnimatePresence>
            </Button>
          </div>

          <ul className="mt-10 flex flex-wrap gap-2" aria-label="Redes">
            {[
              ['GitHub', contact.github, <BrandIcon key="g" icon={siGithub} />],
              ['LinkedIn', contact.linkedin, <BrandIcon key="l" path={siLinkedinPath} />],
              ['Instagram', contact.instagram, <BrandIcon key="i" icon={siInstagram} />],
              ['E-mail', `mailto:${contact.email}`, <Mail key="m" />],
            ].map(([label, href, icon]) => (
              <li key={label as string}>
                <ButtonLink href={href as string} target={label === 'E-mail' ? undefined : '_blank'} rel="noopener" variant="ghost" size="sm" className="text-muted">
                  {icon} {label}
                </ButtonLink>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  )
}
