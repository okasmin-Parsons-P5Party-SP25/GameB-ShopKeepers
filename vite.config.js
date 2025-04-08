import { defineConfig } from "vite";

export default defineConfig({
	build: {
		target: "esnext", //browsers can handle the latest ES features
	},
	esbuild: {
		supported: {
			"top-level-await": true, //browsers can handle top-level-await features
		},
	},
});
