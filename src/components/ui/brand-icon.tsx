import type { SimpleIcon } from 'simple-icons'
import { cn } from '@/lib/utils'

// LinkedIn saiu do simple-icons; o caminho fica aqui no mesmo formato.
export const siLinkedinPath =
  'M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z'

export function BrandIcon({ icon, path, className, title }: { icon?: SimpleIcon; path?: string; className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={cn('size-4', className)} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <path d={icon?.path ?? path} />
    </svg>
  )
}
