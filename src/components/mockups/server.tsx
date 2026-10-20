import { AnimatePresence, motion } from 'motion/react'
import { BrowserFrame } from '@/components/ui/frames'
import { useSequence } from '@/lib/use-sequence'

const log = [
  ['INFO', 'Servidor iniciado em 41,2 s'],
  ['INFO', 'Permissões carregadas: 6 grupos'],
  ['AUTH', 'Login verificado: kaze_ (2FA)'],
  ['INFO', 'kaze_ entrou no servidor'],
  ['BACKUP', 'Backup diário concluído (2,1 GB)'],
  ['n8n', 'Webhook: relatório de TPS enviado'],
  ['INFO', 'hinata_mc entrou no servidor'],
] as const

const SEQUENCE = [1200, 1200, 1200, 1200, 1400, 1400, 3000]

const tone: Record<string, string> = {
  INFO: 'text-subtle',
  AUTH: 'text-[#7aa2ff]',
  BACKUP: 'text-[#f2b45a]',
  n8n: 'text-accent',
}

export function ServerMock() {
  const { ref, step } = useSequence<HTMLDivElement>(SEQUENCE)
  const lines = log.slice(0, step + 1)
  const players = 12 + Math.min(step, 6) / 3

  return (
    <div ref={ref}>
      <BrowserFrame url="painel · shinobicraft">
        <div className="grid gap-4 bg-[#0d0d10] p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">ShinobiCraft</p>
              <p className="text-xs text-subtle">Forge 1.20.1 · 36 mods</p>
            </div>
            <span className="flex items-center gap-2 rounded-full border border-line px-2.5 py-1 text-xs text-muted">
              <span className="size-1.5 rounded-full bg-accent" /> Online
            </span>
          </div>

          <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              ['Jogadores', `${Math.round(players)}/60`],
              ['TPS', '19,9'],
              ['Uptime', '3d 4h'],
              ['Backups', 'Diários'],
            ].map(([k, v]) => (
              <div key={k} className="rounded-lg border border-line bg-white/[0.02] px-3 py-2.5">
                <dt className="text-[11px] text-subtle">{k}</dt>
                <dd className="mt-0.5 text-sm font-medium tabular-nums">{v}</dd>
              </div>
            ))}
          </dl>

          <div>
            <div className="flex justify-between text-[11px] text-subtle">
              <span>Memória</span>
              <span className="tabular-nums">5,1 / 8 GB</span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div className="h-full rounded-full bg-fg/80" initial={{ width: '0%' }} whileInView={{ width: '64%' }} viewport={{ once: true }} transition={{ duration: 1 }} />
            </div>
          </div>

          <div className="h-[150px] overflow-hidden rounded-lg border border-line bg-black/40 p-3 font-mono text-[11px] leading-relaxed">
            <AnimatePresence initial={false}>
              {lines.slice(-6).map(([level, text]) => (
                <motion.p key={text} layout initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className="truncate text-muted">
                  <span className={tone[level]}>[{level}]</span> {text}
                </motion.p>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </BrowserFrame>
    </div>
  )
}
