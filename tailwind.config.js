/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        axis: {
          50:  "#f0f4ff",
          400: "#7a92f8",
          500: "#5566f1",
          600: "#3d44e5",
          900: "#272b81",
          950: "#1a1b4e",
        },
        surface: {
          DEFAULT: "#0a0c14",
          50:  "#101420",
          100: "#161a2a",
          200: "#1e2438",
        },
        gold:   "#c8a97e",
        violet: "#b49dff",
        teal:   "#2dd4bf",
        amber:  "#e8a020",
      },
      fontFamily: {
        mono: ["SpaceMono"],
        sans: ["Outfit"],
        serif: ["PlayfairDisplay"],
      },
    },
  },
  plugins: [],
};
