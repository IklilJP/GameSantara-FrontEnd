import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Ini akan membuat server dapat diakses dari jaringan lokal
    port: 5173, // Port default, bisa diganti jika diperlukan
  },
});
