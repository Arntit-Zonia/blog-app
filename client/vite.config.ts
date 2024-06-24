import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/register": {
        target: "http://localhost:3000",
        secure: false,
      },
      "/login": {
        target: "http://localhost:3000",
        secure: false,
      },
      "/oath/login": {
        target: "http://localhost:3000",
        secure: false,
      },
    },
  },
  plugins: [react()],
});
