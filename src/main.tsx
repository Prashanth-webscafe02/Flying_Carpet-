import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { siteDescription } from './content'
import { market } from './market'

// Per-market page description (G1); index.html carries the default (travel agents) version.
document.querySelector('meta[name="description"]')?.setAttribute('content', siteDescription)
document.documentElement.dataset.market = market

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
