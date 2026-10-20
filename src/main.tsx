import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'motion/react'
import App from './App'
import { forceMotion } from './lib/motion-pref'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion={forceMotion ? 'never' : 'user'}>
      <App />
    </MotionConfig>
  </StrictMode>,
)
