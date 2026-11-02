/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        '2xsmall': '320px',
        xsmall: '512px',
        small: '1024px',
        medium: '1280px',
        large: '1440px',
        xlarge: '1680px',
        '2xlarge': '1920px',
      },
      colors: {
        ui: {
          bg: {
            base: '#FFFFFF',
            subtle: '#F9FAFB',
            component: '#F3F4F6',
            hover: '#E5E7EB',
            active: '#D1D5DB',
            disabled: '#F3F4F6',
          },
          border: {
            base: '#E5E7EB',
            strong: '#D1D5DB',
            interactive: '#111827',
          },
          fg: {
            base: '#111827',
            subtle: '#4B5563',
            muted: '#9CA3AF',
            disabled: '#D1D5DB',
          },
        },
        grey: {
          0: '#FFFFFF',
          5: '#F9FAFB',
          10: '#F3F4F6',
          20: '#E5E7EB',
          30: '#D1D5DB',
          40: '#9CA3AF',
          50: '#6B7280',
          60: '#4B5563',
          70: '#374151',
          80: '#1F2937',
          90: '#111827',
        },
        whatsapp: '#25D366',
        mercadolibre: '#FFE600',
      },
      borderRadius: {
        none: '0px',
        soft: '2px',
        base: '4px',
        rounded: '8px',
        large: '16px',
        circle: '9999px',
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Ubuntu',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}
