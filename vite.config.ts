import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    base: "/enade-compass-2026/",
  },
  tanstackStart: {
    server: { entry: "server" },
    spa: { enabled: true },
  },
});
