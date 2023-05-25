import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(async () => {
  return {
    // vite config
    plugins: [react()],
    define: {
      SERVER: JSON.stringify("http://localhost:5000"),
    },
  };
});
