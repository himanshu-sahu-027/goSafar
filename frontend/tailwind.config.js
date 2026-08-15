export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // scan all your React files
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#3AB0FF",   // light blue accent
          DEFAULT: "#008CFF", // primary GoSafar blue
          dark: "#005FCC",    // darker shade for hover
        },
        accent: "#FF6B00",     // orange accent for buttons/highlights
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // clean modern font
        heading: ["Poppins", "sans-serif"], // bold headings
      },
    },
  },
  plugins: [],
};
