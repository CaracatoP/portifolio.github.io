import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function BrowserFrame({ url, children, className }: { url: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn('overflow-hidden rounded-xl border border-line-strong bg-surface shadow-[0_30px_80px_-20px_rgb(0_0_0/0.7)]', className)}>
      <div className="flex h-10 items-center gap-3 border-b border-line bg-surface-2/60 px-4">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
        </div>
        <div className="mx-auto flex h-6 max-w-[60%] flex-1 items-center justify-center rounded-md bg-white/[0.04] px-3 font-mono text-[11px] text-subtle">
          <span className="truncate">{url}</span>
        </div>
        <span className="w-[42px]" aria-hidden />
      </div>
      {children}
    </div>
  )
}

export function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('mx-auto w-full max-w-[300px] rounded-[2.2rem] border border-line-strong bg-surface p-2 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.7)]', className)}>
      <div className="overflow-hidden rounded-[1.7rem] bg-[#0b141a]">{children}</div>
    </div>
  )
}
