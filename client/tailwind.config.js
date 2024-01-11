  /** @type {import('tailwindcss').Config} */
  export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
           orangeWeb: "#f9a826ff",
           nyanza: "#F7FEE7",
           wenge: "#605856ff;",
           powderBlue: "#acbed8ff",
           dodgerBlue: "#0496ffff",
           melonGreen: "#a1efad"
        },
        boxShadow: {
          'boxShadow1' : 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset'
        }
      },
    },
    plugins: [],
  }