import { cva, type VariantProps } from 'class-variance-authority'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

// Mesma API do Button do shadcn/ui, com variantes do design system do site.
export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-[background-color,color,box-shadow,transform] duration-200 ease-out-expo active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary: 'bg-fg text-bg hover:bg-white',
        outline: 'bg-white/[0.03] text-fg shadow-[inset_0_0_0_1px_var(--color-line-strong)] hover:bg-white/[0.07]',
        ghost: 'text-muted hover:bg-white/[0.06] hover:text-fg',
        accent: 'bg-accent text-accent-fg hover:brightness-110',
      },
      size: {
        sm: 'h-8 px-3.5',
        md: 'h-10 px-5',
        lg: 'h-12 px-6 text-[0.95rem]',
        icon: 'size-10',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

type Variants = VariantProps<typeof buttonVariants>

export function Button({ className, variant, size, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & Variants) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
}

export function ButtonLink({ className, variant, size, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & Variants) {
  return <a className={cn(buttonVariants({ variant, size }), className)} {...props} />
}
