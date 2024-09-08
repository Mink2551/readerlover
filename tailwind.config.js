/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      textShadow: {
        // Define your text shadows here
        'default': '1px 1px 2px rgba(0, 0, 0, 0.1)',
        'md': '2px 2px 4px rgba(0, 0, 0, 0.1)',
        'lg': '3px 3px 6px rgba(0, 0, 0, 0.25)',
        'xl': '4px 4px 8px rgba(0, 0, 0, 0.4)',
      }
    },
  },
  plugins: [],
};
