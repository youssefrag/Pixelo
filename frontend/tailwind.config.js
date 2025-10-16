/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    { pattern: /text-\[\d+px\]/ }, // text-[46px]
    { pattern: /text-\[#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})\]/ }, // text-[#c93636]
  ],
  theme: { extend: {} },
  plugins: [],
};
