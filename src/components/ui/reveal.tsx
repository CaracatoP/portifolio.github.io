import { motion, type HTMLMotionProps } from 'motion/react'

// Entrada no estilo BlurFade (Magic UI): sobe pouco, ganha foco, uma vez só.
export function Reveal({ delay = 0, y = 14, ...props }: HTMLMotionProps<'div'> & { delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    />
  )
}
