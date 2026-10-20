import { AnimatePresence, motion } from 'motion/react'
import { CalendarCheck, UserCheck } from 'lucide-react'
import { PhoneFrame } from '@/components/ui/frames'
import { useSequence } from '@/lib/use-sequence'

type Item =
  | { kind: 'in' | 'out'; text: string }
  | { kind: 'event'; text: string; icon: 'calendar' | 'lead' }

const script: Item[] = [
  { kind: 'in', text: 'Oi! Tem horário pra corte amanhã à tarde?' },
  { kind: 'out', text: 'Oi! Amanhã tenho 14h30, 16h e 17h30. Qual fica melhor pra você?' },
  { kind: 'in', text: '16h' },
  { kind: 'out', text: 'Fechado: amanhã às 16h. Te mando um lembrete duas horas antes.' },
  { kind: 'event', text: 'Agendamento criado no calendário', icon: 'calendar' },
  { kind: 'event', text: 'Lead qualificado e enviado para o CRM', icon: 'lead' },
]

// Cada passo mostra mais uma mensagem; o último segura a conversa completa antes de recomeçar.
const SEQUENCE = [900, 1500, 1800, 1100, 1700, 900, 3800]

export function ChatMock() {
  const { ref, step } = useSequence<HTMLDivElement>(SEQUENCE)
  const visible = script.slice(0, step)
  const typing = step < script.length && script[step]?.kind === 'out'

  return (
    <div ref={ref}>
      <PhoneFrame>
        <div className="flex items-center gap-3 border-b border-white/5 bg-[#1f2c34] px-4 py-3">
          <span className="grid size-8 place-items-center rounded-full bg-accent/90 text-xs font-semibold text-accent-fg">SL</span>
          <div>
            <p className="text-[13px] font-medium text-white">Studio Lume</p>
            <p className="text-[11px] text-accent">atendimento automático · online</p>
          </div>
        </div>
        <div className="flex h-[380px] flex-col justify-end gap-2 overflow-hidden px-3 py-4">
          <AnimatePresence initial={false}>
            {visible.map((m, i) =>
              m.kind === 'event' ? (
                <motion.div
                  key={i}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mx-auto flex shrink-0 items-center gap-1.5 rounded-full bg-white/[0.06] px-3 py-1 text-[11px] text-muted"
                >
                  {m.icon === 'calendar' ? <CalendarCheck className="size-3 text-accent" /> : <UserCheck className="size-3 text-accent" />}
                  {m.text}
                </motion.div>
              ) : (
                <motion.p
                  key={i}
                  layout
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={
                    m.kind === 'in'
                      ? 'max-w-[82%] shrink-0 self-start rounded-xl rounded-tl-sm bg-[#1f2c34] px-3 py-2 text-[13px] leading-snug text-white'
                      : 'max-w-[82%] shrink-0 self-end rounded-xl rounded-tr-sm bg-[#005c4b] px-3 py-2 text-[13px] leading-snug text-white'
                  }
                >
                  {m.text}
                </motion.p>
              ),
            )}
            {typing && (
              <motion.div
                key="typing"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex shrink-0 gap-1 self-end rounded-xl bg-[#005c4b] px-3 py-2.5"
                aria-hidden
              >
                {[0, 1, 2].map((d) => (
                  <motion.span
                    key={d}
                    className="size-1.5 rounded-full bg-white/70"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: d * 0.15 }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </PhoneFrame>
    </div>
  )
}
