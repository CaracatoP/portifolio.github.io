import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'
import { useReduce } from './motion-pref'

/**
 * Avança por `durations.length` passos em loop, só enquanto o elemento está visível.
 * Com movimento reduzido fica parado no último passo (o estado completo da cena).
 * `durations` precisa ser estável (constante de módulo), senão o timer reinicia a cada render.
 */
export function useSequence<T extends Element>(durations: number[]) {
  const ref = useRef<T>(null)
  const inView = useInView(ref, { margin: '-15% 0px' })
  const reduce = useReduce()
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (reduce) {
      setStep(durations.length - 1)
      return
    }
    if (!inView) return
    const t = setTimeout(() => setStep((s) => (s + 1) % durations.length), durations[step])
    return () => clearTimeout(t)
  }, [inView, reduce, step, durations])

  return { ref, step: reduce ? durations.length - 1 : step }
}
