import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  optimizeDeps: {
    include: [
      "zen-observable",
      "fast-json-stable-stringify",
      "@vue/apollo-composable",
    ],
  },
  /*
  // Only to expose your localhost to the localnetwork
  server: {
    host: "192.168.0.28",
  },*/
});
