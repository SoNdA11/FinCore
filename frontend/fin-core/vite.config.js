// Este é o arquivo de configuração do Vite para o projeto React.
// Ele define como o projeto será construído e executado, incluindo a configuração de plugins como React e Tailwind CSS.

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
