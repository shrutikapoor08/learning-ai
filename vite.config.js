import { defineConfig } from "vite";
import { default as tailwindcss } from "@tailwindcss/vite";
import TanStackRouterVite from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [tailwindcss(), react(), TanStackRouterVite()],
	server: {
		proxy: {
			"/api": {
				target: "http://localhost:3001",
				changeOrigin: true,
			},
		},
	},
});
