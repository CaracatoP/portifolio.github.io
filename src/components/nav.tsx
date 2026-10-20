import { useState } from 'react'
import { useMotionValueEvent, useScroll } from 'motion/react'
import { ButtonLink } from '@/components/ui/button'
import { asset, cn } from '@/lib/utils'

const links = [
  ['Projetos', '#projetos'],
  ['Stack', '#stack'],
  ['Processo', '#processo'],
  ['Contato', '#contato'],
] as const

export function Nav() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 12))

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300',
        scrolled ? 'border-line bg-bg/75 backdrop-blur-xl' : 'border-transparent bg-transparent',
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-5 sm:px-8" aria-label="Principal">
        <a href="#topo" className="flex items-center gap-2.5 text-sm font-medium tracking-tight">
          <img src={asset('avatar.jpg')} alt="" width={28} height={28} className="size-7 rounded-full object-cover ring-1 ring-line-strong" />
          João Caracato
        </a>
        <ul className="ml-auto hidden items-center gap-1 md:flex">
          {links.map(([label, href]) => (
            <li key={href}>
              <a href={href} className="rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:bg-white/[0.06] hover:text-fg">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <ButtonLink href="#contato" size="sm" className="ml-auto md:ml-2">
          Falar comigo
        </ButtonLink>
      </nav>
    </header>
  )
}
