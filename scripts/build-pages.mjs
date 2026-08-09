import { cp, mkdir, rm } from "node:fs/promises";

const root = new URL("..", import.meta.url);
const output = new URL(".pages/", root);

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(new URL("site/", root), output, { recursive: true, force: true });
await cp(new URL("dist/core.css", root), new URL("native-first-ui.css", output), { force: true });
await cp(new URL("dist/behavior.js", root), new URL("behavior.js", output), { force: true });

console.log("Built GitHub Pages showcase in .pages/");
