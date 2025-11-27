// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["'Google Sans'", "Roboto", "sans-serif"],
    },
  },
  plugins: [require("flowbite/plugin")],
};




