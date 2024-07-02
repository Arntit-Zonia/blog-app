import { defineConfig, loadEnv } from "vite";

import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const SERVER_PORT = `http://localhost:${env.VITE_SERVER_PORT}`;

  return {
    server: {
      proxy: {
        "/register": {
          target: SERVER_PORT,
          secure: false,
        },
        "/login": {
          target: SERVER_PORT,
          secure: false,
        },
        "/oath/google": {
          target: SERVER_PORT,
          secure: false,
        },
        "/logout": {
          target: SERVER_PORT,
          secure: false,
        },
      },
    },
    plugins: [react()],
  };
});
