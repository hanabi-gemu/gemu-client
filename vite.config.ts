import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  base: "/gemu-client/",
  plugins: [react()],
  resolve: {
    alias: {
      "&": "/src",
    },
  },
});
