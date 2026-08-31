import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#F2EEE8",
          alt: "#E8E0D6",
          dark: "#DDD3C5",
        },
        charcoal: {
          DEFAULT: "#171615",
          dark: "#0E0E0D",
          light: "#242321",
          elevated: "#2D2B28",
        },
        vermilion: {
          DEFAULT: "#FF5A36",
          hover: "#E84E2B",
          dim: "rgba(255, 90, 54, 0.12)",
        },
        lime: {
          DEFAULT: "#C8FF3D",
          dim: "rgba(200, 255, 61, 0.15)",
        },
        ink: {
          DEFAULT: "#161514",
          secondary: "#5C5750",
          muted: "#A39D94",
        },
        paper: {
          DEFAULT: "#F6F2EC",
          muted: "#C5BFB6",
        },
      },
      fontFamily: {
        sans: ["var(--font-space)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        tighter: "-0.06em",
        tight: "-0.03em",
        normal: "0em",
        wide: "0.06em",
        widest: "0.16em",
      },
    },
  },
  plugins: [],
};

export default config;
