/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'bright-purple': '#802BB1',
        'dark-purple': '#4b1f83',
        'meloncholy': '#564F6F',
        'purply-gray': '#4C495D',
        'light-purple': '#e0d5f1',
        'regular-purple': '#986ccc',

        'ivory': '#D1D7E0',
        'background-black': '#1e2020',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
