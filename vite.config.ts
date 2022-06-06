import react          from "@vitejs/plugin-react"
import {resolve}      from "path"
import {defineConfig} from "vite"

export default defineConfig({
    resolve: {
        alias: [
            {find: "@", replacement: resolve(__dirname, "src")}
        ]
    },
    plugins: [react()],
    build: {
        target: "esnext"
    }
})
