/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Discovery Homes Brand Colors
        'discovery': {
          'charcoal': '#2D2D2D', // Deep Charcoal Black
          'gold': '#D4AF37',     // Warm Gold/Amber
          'white': '#FFFFFF',    // Clean White
          'gold-light': '#E8C66A',
          'gold-dark': '#B8941F',
          'charcoal-light': '#4A4A4A',
          'charcoal-dark': '#1A1A1A',
          // New Green Accent Colors
          'forest': '#3e7645',    // Dark Forest Green
          'lime': '#b5db2a',      // Bright Lime Green  
          'sage': '#68a71d',      // Medium Sage Green
          'forest-light': '#5a8f63',
          'forest-dark': '#2d5832',
          'lime-light': '#c9e055',
          'lime-dark': '#9ac424',
          'sage-light': '#7cb529',
          'sage-dark': '#558917',
        },
        primary: {
          50: '#FEF7E6',
          100: '#FCEBCC',
          200: '#F9D799',
          300: '#F5C166',
          400: '#E8C66A',
          500: '#D4AF37', // Main gold
          600: '#B8941F',
          700: '#9B7A1A',
          800: '#7D6014',
          900: '#65500F',
        },
        // Green accent scale
        accent: {
          50: '#f0f9f0',
          100: '#dcf2dc',
          200: '#b5db2a', // Bright lime
          300: '#9ac424',
          400: '#7cb529',
          500: '#68a71d', // Medium sage
          600: '#558917',
          700: '#456f1e',
          800: '#3e7645', // Dark forest
          900: '#2d5832',
        },
        neutral: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#2D2D2D', // Main charcoal
          900: '#1A1A1A',
        }
      },
      fontFamily: {
        sans: ['Open Sans', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #D4AF37' },
          '100%': { boxShadow: '0 0 20px #D4AF37, 0 0 30px #D4AF37' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'gold': '0 4px 14px 0 rgba(212, 175, 55, 0.39)',
        'gold-lg': '0 10px 25px -3px rgba(212, 175, 55, 0.4)',
        'charcoal': '0 4px 14px 0 rgba(45, 45, 45, 0.2)',
        'forest': '0 4px 14px 0 rgba(62, 118, 69, 0.35)',
        'lime': '0 4px 14px 0 rgba(181, 219, 42, 0.4)',
        'sage': '0 4px 14px 0 rgba(104, 167, 29, 0.35)',
        'green-glow': '0 0 20px rgba(104, 167, 29, 0.3)',
        'lime-glow': '0 0 25px rgba(181, 219, 42, 0.4)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
} 