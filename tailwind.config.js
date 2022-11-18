/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './pages/*.{js,ts,jsx,tsx}', './components/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    extend: {
      colors: {
        gray: {
          100: '#f7fafc',
          200: '#edf2f7',
          300: '#e2e8f0',
          400: '#cbd5e0',
          500: '#a0aec0',
          600: '#718096',
          700: '#4a5568',
          800: '#2d3748',
          900: '#1a202c',
        },
        blue: {
          100: '#ebf8ff',
          200: '#bee3f8',
          300: '#90cdf4',
          400: '#63b3ed',
          500: '#4299e1',
          600: '#3182ce',
          700: '#2b6cb0',
          800: '#2c5282',
          900: '#2a4365',
        },
        google: {
          DEFAULT: "#4285F4",
          "dark": "#3478e6"
        }
      },
      width: {
        "11/12": "91.67%",
      },
      height: {
        "11/12": "91.67%",
        banner: "500px"
      },
      maxWidth: {
        "5": "1.25rem",
        "12": "3rem",
        "150": "150px",
        "review": "250px",
        "300": "300px"
      },
      minWidth: {
        "10": "40px",
        "180": "180px",
        "320": "320px",
        "410": "410px",
        "profile": "466px"
      },
      maxHeight: {
        "300": "300px"
      },
      zIndex: {
        "100": 100,
        '1040': 1040,
        '1050': 1050,
        "10000": 10000
      },
      fontSize: {
        "7xl": "80px",
        "9xl": "8rem"
      },
      spacing: {
        "1/5": "20%"
      },
      keyframes: {
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(-200px)" },
          "100%": { opacity: "1", transform: "translateX(0)" }
        },
        'carousel-right': {
          '0%': { transform: 'translateX(400%)' },
          '100%': { transform: 'translateX(-400%)' },
        },
        'carousel-left': {
          '0%': { transform: 'translateX(-400%)' },
          '100%': { transform: 'translateX(400%)' },
        },
        'sm-carousel-right': {
          '0%': { transform: 'translateX(300%)' },
          '100%': { transform: 'translateX(-280%)' },
        },
        'sm-carousel-left': {
          '0%': { transform: 'translateX(-300%)' },
          '100%': { transform: 'translateX(300%)' },
        },
        'md-carousel-right': {
          '0%': { transform: 'translateX(160%)' },
          '100%': { transform: 'translateX(-200%)' },
        },
        'md-carousel-left': {
          '0%': { transform: 'translateX(-200%)' },
          '100%': { transform: 'translateX(160%)' },
        },
        'lg-carousel-right': {
          '0%': { transform: 'translateX(103%)' },
          '100%': { transform: 'translateX(-146%)' },
        },
        'lg-carousel-left': {
          '0%': { transform: 'translateX(-146%)' },
          '100%': { transform: 'translateX(103%)' },
        },
        "alert-in": {
          "0%": { opacity: 0, transform: "translateY(-15px)" },
          "12%": { opacity: 0.9, transform: "translateY(0)" },
          "88%": { opacity: 0.9, transform: "translateY(0)" },
          "100%": { opacity: 0, transform: "translateY(-15px)" }
        },
        "alert-out": {
          "0%": { opacity: 1, transform: "translateY(0)" },
          //"12%": { opacity: 1, transform: "translateY(0)" },
          "88%": { opacity: 1, transform: "translateY(0)" },
          "100%": { opacity: 0, transform: "translateY(-15px)" }
        },
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-100vh)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        "turn-left-down": {
          "0%": { transform: "rotate3d(1, 0, 1, 90deg)" },
          "100%": { transform: "rotate3d(0)" }
        },
        "turn-down": {
          "0%": { transform: "rotate3d(1, 0, 0, 90deg)" },
          "100%": { transform: "rotate3d(0)" }
        },
      },
      animation: {
        'carousel-right': 'carousel-right 30s linear infinite',
        'carousel-left': 'carousel-left 30s linear infinite',
        'sm-carousel-right': 'sm-carousel-right 30s linear infinite',
        'sm-carousel-left': 'sm-carousel-left 30s linear infinite',
        'md-carousel-right': 'md-carousel-right 30s linear infinite',
        'md-carousel-left': 'md-carousel-left 30s linear infinite',
        'lg-carousel-right': 'lg-carousel-right 30s linear infinite',
        'lg-carousel-left': 'lg-carousel-left 30s linear infinite',
        "alert-in": "alert-in 3.9s ease-out",
        "alert-out": "alert-out 2.7s ease-out",
        "slide-in-right": "slide-in-right 0.5s ease-out",
        'fade-in-down': 'fade-in-down 0.3s ease-out',
        "turn-left-down": "turn-left-down 0.3s ease-out",
        "turn-down": "turn-down 0.3s ease-out",
      },
      transitionProperty: {
        "height": "height",
        "width": "width"
      },
      transformOrigin: {
        "0": "0%",
      },
    },
    variants: {
      scrollbars: ["rounded"],
      borderColor: ["responsive", "hover", "focus", "focus-within"]
    },
  },
  plugins: [require("tailwind-scrollbar")],
};