import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{tsx,ts}", flowbite.content()],
  theme: {
    extend: {},
  },
  plugins: [flowbite.plugin()],
};
