// Este é o ponto de entrada principal do aplicativo React.
// Ele renderiza o componente 'App' na div 'root' do index.html.

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
