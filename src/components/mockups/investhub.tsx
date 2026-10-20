import { motion } from 'motion/react'
import { BrowserFrame } from '@/components/ui/frames'

// Série fictícia de patrimônio (12 meses), normalizada no SVG.
const series = [31.2, 32.0, 31.6, 33.4, 34.1, 35.8, 35.2, 37.9, 39.6, 41.3, 44.8, 48.3]
const W = 520
const H = 150

const points = series.map((v, i) => {
  const min = Math.min(...series) - 1
  const max = Math.max(...series) + 1
  return [(i / (series.length - 1)) * W, H - ((v - min) / (max - min)) * H] as const
})
const line = points.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')
const area = `${line} L${W} ${H} L0 ${H} Z`

const allocation = [
  ['Renda fixa', 46, '#3fd6b0'],
  ['Ações', 28, '#7aa2ff'],
  ['FIIs', 18, '#f2b45a'],
  ['Cripto', 8, '#c084fc'],
] as const

const positions = [
  ['Tesouro Selic 2029', 'Renda fixa', '+0,9%'],
  ['ITSA4', 'Ações', '+2,4%'],
  ['MXRF11', 'FIIs', '-0,6%'],
  ['BTC', 'Cripto', '+5,1%'],
] as const

export function InvestHubMock() {
  return (
    <BrowserFrame url="investhub · carteira">
      <div className="grid gap-4 bg-[#0d0d10] p-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs text-subtle">Patrimônio total</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight tabular-nums">R$ 48.320,15</p>
          </div>
          <div className="flex gap-1 rounded-lg border border-line bg-white/[0.02] p-1 text-[11px] text-muted">
            {['1M', '6M', '1A', 'Tudo'].map((p) => (
              <span key={p} className={p === '1A' ? 'rounded-md bg-white/[0.08] px-2 py-1 text-fg' : 'px-2 py-1'}>
                {p}
              </span>
            ))}
          </div>
        </div>

        <svg viewBox={`0 0 ${W} ${H}`} className="h-[150px] w-full overflow-visible" preserveAspectRatio="none" aria-hidden>
          <defs>
            <linearGradient id="ih-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#3fd6b0" stopOpacity="0.22" />
              <stop offset="1" stopColor="#3fd6b0" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d={area}
            fill="url(#ih-fill)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
          />
          <motion.path
            d={line}
            fill="none"
            stroke="#3fd6b0"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>

        <div>
          <div className="flex h-2 overflow-hidden rounded-full">
            {allocation.map(([label, pct, color], i) => (
              <motion.span
                key={label}
                style={{ background: color, width: `${pct}%`, originX: 0 }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
              />
            ))}
          </div>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted">
            {allocation.map(([label, pct, color]) => (
              <li key={label} className="flex items-center gap-1.5">
                <span className="size-2 rounded-full" style={{ background: color }} />
                {label} <span className="tabular-nums text-subtle">{pct}%</span>
              </li>
            ))}
          </ul>
        </div>

        <ul className="divide-y divide-line rounded-lg border border-line text-[13px]">
          {positions.map(([name, cls, change]) => (
            <li key={name} className="flex items-center justify-between px-3 py-2">
              <span>
                {name} <span className="ml-1 text-[11px] text-subtle">{cls}</span>
              </span>
              <span className={`tabular-nums ${change.startsWith('-') ? 'text-danger' : 'text-accent'}`}>{change}</span>
            </li>
          ))}
        </ul>
      </div>
    </BrowserFrame>
  )
}
