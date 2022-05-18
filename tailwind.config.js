module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        bounceRight: {
          "0%, 100%": {
            transform: "translateX(5%)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateX(0)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
        },
        bounceLeft: {
          "0%, 100%": {
            transform: "translateX(-5%)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateX(0)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
        },
      },
      animation: {
        bounceRight: "bounceRight 1s infinite",
        bounceLeft: "bounceLeft 1s infinite",
      },
    },
  },
  plugins: [],
};
