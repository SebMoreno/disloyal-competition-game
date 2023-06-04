import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'


function addDeferAttribute(): Plugin {
    return {
        generateBundle(_, bundle) {
            for (const fileName in bundle) {
                if (bundle[fileName].type === 'chunk') {
                    bundle[fileName].isEntry = true;
                }
            }
        },
        transformIndexHtml(html) {
            return html.replace('<script type="module" crossorigin ', '<script defer ');
        },
    };
}
// https://vitejs.dev/config/
export default defineConfig({
    base: "./",
    build: {
      rollupOptions: {
          output: {
              format: "iife"
          }
      }
    },
    plugins: [react(), addDeferAttribute()],
})
