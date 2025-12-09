import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Esta sintaxis es más robusta contra errores de parsing.
export default defineConfig(() => {
  return {
    plugins: [react()],
  };
});