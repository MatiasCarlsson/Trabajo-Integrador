/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'bloom-bg': '#f0ece5', // fondo
        'bloom-primary': '#b1a08a', // color principal
        'bloom-accent': '#bfa4c0', // flor lavanda
        'bloom-deep': '#968d7d', // variante más oscura
        'bloom-contrast': '#463c37', // para texto legible
      },
    },
  },
  plugins: [],
};
