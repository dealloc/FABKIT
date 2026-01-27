import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
	build: {
		rolldownOptions: {
			output: {
				advancedChunks: {
					groups: [{ name: "tiptap-emoji", test: /@tiptap\/extension-emoji/ }],
				},
			},
		},
	},
	plugins: [
		tailwindcss(),
		tanstackRouter({
			target: "react",
			autoCodeSplitting: true,
		}),
		react({
			babel: {
				plugins: [["babel-plugin-react-compiler"]],
			},
		}),
		VitePWA({
			includeAssets: [
				"favicon.ico",
				"apple-touch-icon.png",
				"cardbacks/generated/683c9f087ee5f.png",
				"cardbacks/generated/683c9f087f497.png",
				"cardbacks/generated/683c9f087fa14.png",
				"cardbacks/generated/683c9f087ff25.png",
				"cardbacks/generated/683c9f088423a.png",
				"cardbacks/generated/683c9f08916d9.png",
				"cardbacks/generated/Blue-Token-Flat-688fb50e27c17.png",
				"cardbacks/generated/Fabled-Resource-1-Flat-688fb5868f0a2.png",
				"cardbacks/generated/Fabled-Resource-2-Flat-688fb5868fda2.png",
				"cardbacks/generated/Fabled-Resource-3-Flat-688fb5869028a.png",
				"cardbacks/generated/assassin-nostats-1-flat-6880352873107.png",
				"cardbacks/generated/assassin-nostats-2-flat-6880352873742.png",
				"cardbacks/generated/assassin-nostats-3-flat-6880352873c99.png",
				"cardbacks/generated/chaos-hero-flat-688038591517c.png",
				"cardbacks/generated/equipment-dented-683e107b17fab.png",
				"cardbacks/generated/equipment-flat-683e11f01cef0.png",
				"cardbacks/generated/fabled-resource-1-dented-683e109970027.png",
				"cardbacks/generated/fabled-resource-2-dented-683e10997022b.png",
				"cardbacks/generated/fabled-resource-3-dented-683e1099703da.png",
			],
			manifest: {
				name: "FabKit",
				short_name: "FabKit",
				description: "Your Flesh and Blood Toolbox",
				theme_color: "#ffffff",
				icons: [
					{
						src: "pwa-192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "pwa-512x512.png",
						sizes: "512x512",
						type: "image/png",
					},
				],
			},
		}),
		visualizer({
			template: "treemap", // or sunburst
			open: false,
			gzipSize: true,
			brotliSize: true,
			filename: "analyse.html", // will be saved in project's root
		}),
	],
});
