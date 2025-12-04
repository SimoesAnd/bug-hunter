/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'editor-bg': '#1e1e1e', // Cor de fundo estilo VS Code
        'editor-fg': '#d4d4d4', // Cor do texto
      }
    },
  },
  plugins: [],
}