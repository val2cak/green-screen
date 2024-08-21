module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    backgroundSize: {
      auto: 'auto',
      cover: 'cover',
      contain: 'contain',
      50: '50px',
      16: '4rem',
    },
    screens: {
      sm: { max: '767px' },
      // => @media (min-width: 640px and max-width: 767px) { ... }

      md: { min: '768px', max: '1023px' },
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      lg: { min: '1024px', max: '1279px' },
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      xl: { min: '1280px', max: '1535px' },
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      '2xl': { min: '1536px' },
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },

      colors: {
        primary: '#295843',
        secondary: '#1F4935',
        tertiary: '#b5cd3b',
        light: '#ECF1F0',
        gray: '#B6B6B6',
        dark: '#34252F',
      },
      backgroundImage: () => ({
        hero: "url('/images/hero.png')",
      }),
      lineHeight: {
        3: '1.2rem',
        4: '1.6rem',
        5: '2.0rem',
        6: '2.4rem',
        7: '2.8rem',
        8: '3.2rem',
        9: '3.6rem',
        10: '4.0rem',
      },
      fontSize: {
        xs: ['10px', { lineHeight: '1.6rem' }],
        sm: ['12px', { lineHeight: '2.0rem' }],
        base: ['16px', { lineHeight: '2.0rem' }],
        md: ['20px', { lineHeight: '2.4rem' }],
        lg: ['24px', { lineHeight: '2.8rem' }],
        xl: ['32px', { lineHeight: '2.8rem' }],
        '2xl': ['36px', { lineHeight: '3.2rem' }],
        '3xl': ['40px', { lineHeight: '3.6rem' }],
        '4xl': ['56px', { lineHeight: '4.0rem' }],
      },
      borderWidth: {
        default: '1px',
        0: '0',
        2: '2px',
        3: '3px',
        4: '4px',
        6: '6px',
        8: '8px',
        50: '50px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
