/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#fdf4ff",
          100: "#fae8ff",
          200: "#f3d0fe",
          300: "#e879f9",
          400: "#d946ef",
          500: "#a855f7",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#4c1d95",
          900: "#2e1065",
        },
        gold: {
          300: "#fde68a",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body:    ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "page-gradient":
          "radial-gradient(ellipse at 20% 0%, #1e1b4b 0%, #0f0f23 40%, #0a0a14 100%)",
        "card-gradient":
          "linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(168,85,247,0.08) 100%)",
        "gold-gradient":
          "linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)",
      },
      boxShadow: {
        glow:       "0 0 40px rgba(168,85,247,0.35), 0 0 80px rgba(168,85,247,0.15)",
        "glow-sm":  "0 0 20px rgba(168,85,247,0.25)",
        "gold-glow":"0 0 30px rgba(251,191,36,0.4)",
        card:       "0 4px 24px rgba(0,0,0,0.4), 0 1px 4px rgba(0,0,0,0.3)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":       { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        pulse_slow: {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0.6" },
        },
      },
      animation: {
        float:       "float 6s ease-in-out infinite",
        shimmer:     "shimmer 3s linear infinite",
        pulse_slow:  "pulse_slow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
