import { Nav } from '@/components/nav'
import { Hero } from '@/components/hero'
import { Projects } from '@/components/projects'
import { Stack } from '@/components/stack'
import { Process } from '@/components/process'
import { Contact } from '@/components/contact'

export default function App() {
  return (
    <>
      <a href="#projetos" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-bg">
        Pular para os projetos
      </a>
      <Nav />
      <main>
        <Hero />
        <Projects />
        <Stack />
        <Process />
        <Contact />
      </main>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-8 text-sm text-subtle sm:px-8">
          <p>© 2026 João Gabriel Caracato</p>
          <p>Feito com React, Tailwind e Motion.</p>
        </div>
      </footer>
    </>
  )
}
