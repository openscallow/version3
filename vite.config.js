import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';
export default defineConfig({
	plugins: [sveltekit()],
	optimizeDeps: {
		include: ['lucide-svelte']
	  },
	resolve:{
		alias:{
			'@tailwind':path.resolve('./src/tailwind.css'),
			'$config':path.resolve('./src/config')
		}
	}
});
