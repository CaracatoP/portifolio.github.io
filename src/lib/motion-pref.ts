import { useReducedMotion } from 'motion/react'

// `?motion=on` liga as animações mesmo quando o sistema pede movimento reduzido.
export const forceMotion = new URLSearchParams(window.location.search).get('motion') === 'on'

if (forceMotion) document.documentElement.classList.add('force-motion')

export function useReduce() {
  const reduce = useReducedMotion()
  return !!reduce && !forceMotion
}
