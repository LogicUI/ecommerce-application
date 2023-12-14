import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: '#FC4747',
        secondary: '#5A698F',
        black: '#10141E',
        white: '#FFFFFF',
        darkBlue: '#161D2F',
        red: '#FC4747'
      }
    },
    colors: {
      primary: '#FC4747',
      secondary: '#5A698F',
      black: '#10141E',
      white: '#FFFFFF',
      darkBlue: '#161D2F',
      red: '#FC4747'
    },
    fontFamily: {
      outfitVariable: ['outfitVariable', 'Helvetica', 'Arial', 'Verdana', 'sans-serif'],
    },
  },
  plugins: [],
}
export default config
