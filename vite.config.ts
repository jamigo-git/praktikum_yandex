import { defineConfig } from "vite";

export default defineConfig({
    root: ".",
    build: {
        outDir: "dist"
    },
    css: {
        preprocessorOptions: {
          scss: {
            additionalData: `$injectedColor: orange;`
          }
        }
    },
    server: {
        port: 3000
    }
})
