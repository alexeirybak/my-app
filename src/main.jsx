import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
