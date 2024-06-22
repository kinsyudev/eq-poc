import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
