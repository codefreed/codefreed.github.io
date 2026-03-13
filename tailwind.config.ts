import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['SF Pro Display', 'SF Pro Text', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem'
      },
      boxShadow: {
        glass: '0 8px 30px rgba(15, 23, 42, 0.22), inset 0 1px 0 rgba(255,255,255,0.2)',
        glow: '0 0 50px rgba(56, 189, 248, 0.22)'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' }
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0px)' }
        }
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        fadeInUp: 'fadeInUp 0.45s ease-out'
      }
    }
  },
  plugins: [typography]
};

export default config;
