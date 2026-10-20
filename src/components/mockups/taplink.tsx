import { AnimatePresence, motion } from 'motion/react'
import { Check, ShoppingBag } from 'lucide-react'
import { BrowserFrame } from '@/components/ui/frames'
import { useSequence } from '@/lib/use-sequence'

// Dois negócios fictícios na mesma infraestrutura: o tenant troca, a loja troca junto.
const tenants = [
  {
    slug: 'padaria-aurora',
    name: 'Padaria Aurora',
    tint: '#f2b45a',
    items: [
      ['Pão de fermentação natural', '18,00'],
      ['Croissant amanteigado', '9,50'],
      ['Bolo de cenoura', '32,00'],
    ],
    total: '27,50',
  },
  {
    slug: 'barbearia-norte',
    name: 'Barbearia Norte',
    tint: '#7aa2ff',
    items: [
      ['Corte masculino', '45,00'],
      ['Barba completa', '30,00'],
      ['Corte + barba', '65,00'],
    ],
    total: '65,00',
  },
] as const

// passos: 0 loja · 1 item no carrinho · 2 Pix gerado · 3 pago
const DURATIONS = [1600, 1400, 2200, 2600]
const SEQUENCE = [...DURATIONS, ...DURATIONS]

export function TapLinkMock() {
  const { ref, step: s } = useSequence<HTMLDivElement>(SEQUENCE)
  const t = tenants[s < 4 ? 0 : 1]
  const step = s % 4

  return (
    <div ref={ref}>
      <BrowserFrame url={`taplink.app/site/${t.slug}`}>
        <div className="relative grid min-h-[340px] grid-cols-[1fr] bg-[#0d0d10] sm:grid-cols-[1.35fr_1fr]">
          <AnimatePresence mode="wait">
            <motion.div
              key={t.slug}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="p-5"
            >
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-lg text-sm font-semibold text-black" style={{ background: t.tint }}>
                  {t.name[0]}
                </span>
                <div>
                  <p className="text-sm font-medium text-fg">{t.name}</p>
                  <p className="text-xs text-subtle">Aberto agora · retirada e entrega</p>
                </div>
              </div>
              <ul className="mt-5 grid gap-2">
                {t.items.map(([name, price], i) => (
                  <li key={name} className="flex items-center justify-between gap-3 rounded-lg border border-line bg-white/[0.02] px-3 py-2.5">
                    <span className="text-[13px] text-fg/90">{name}</span>
                    <span className="flex shrink-0 items-center gap-2 whitespace-nowrap text-[13px] tabular-nums text-muted">
                      R$ {price}
                      <span
                        className="grid size-6 place-items-center rounded-md text-xs font-semibold text-black transition-transform"
                        style={{ background: t.tint, transform: i === 0 && step === 1 ? 'scale(1.18)' : undefined }}
                      >
                        +
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>

          <div className="border-t border-line bg-surface/60 p-5 sm:border-l sm:border-t-0">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Carrinho</p>
              <span className="flex items-center gap-1.5 text-xs text-muted">
                <ShoppingBag className="size-3.5" /> {step >= 1 ? 1 : 0}
              </span>
            </div>

            <div className="mt-4 rounded-lg border border-line bg-white/[0.02] p-3">
              <p className="text-xs text-subtle">Pedido #1042</p>
              <p className="mt-1 text-lg font-semibold tabular-nums">R$ {step >= 1 ? t.total : '0,00'}</p>
            </div>

            <div className="mt-3 rounded-lg border border-line bg-white/[0.02] p-3">
              <AnimatePresence mode="wait" initial={false}>
                {step < 2 ? (
                  <motion.p key="pay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xs text-muted">
                    Pagamento via Pix, processado pelo Asaas.
                  </motion.p>
                ) : (
                  <motion.div key="pix" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-3">
                    <PixCode />
                    <div className="text-xs">
                      {step === 2 ? (
                        <p className="text-muted">Aguardando pagamento…</p>
                      ) : (
                        <p className="flex items-center gap-1.5 font-medium text-accent">
                          <Check className="size-3.5" /> Pago
                        </p>
                      )}
                      <p className="mt-1 text-subtle">Estoque e financeiro atualizados</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </BrowserFrame>
    </div>
  )
}

// QR estilizado (não é um código Pix válido).
function PixCode() {
  const cells = [1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1]
  return (
    <div className="grid size-14 shrink-0 grid-cols-6 gap-[2px] rounded-md bg-white p-1.5" aria-hidden>
      {cells.map((c, i) => (
        <span key={i} className={c ? 'bg-black' : 'bg-white'} />
      ))}
    </div>
  )
}
