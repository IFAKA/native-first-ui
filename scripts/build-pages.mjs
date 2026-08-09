import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";

const root = new URL("..", import.meta.url);
const output = new URL(".pages/", root);

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(new URL("site/", root), output, { recursive: true, force: true });
await mkdir(new URL("dist/", output), { recursive: true });
await cp(new URL("dist/", root), new URL("dist/", output), { recursive: true, force: true });
const pageLayers = ["core", "forms", "navigation", "data", "overlays", "components"];
const pageSource = (await Promise.all(pageLayers.map((name) => readFile(new URL(`dist/${name}.css`, root), "utf8")))).join("\n");
await writeFile(new URL("pith.css", output), pageSource);
await cp(new URL("dist/behavior.js", root), new URL("behavior.js", output), { force: true });
await cp(new URL("site/showcase.js", root), new URL("showcase.js", output), { force: true });
await cp(new URL("recipes/", root), new URL("recipes/", output), { recursive: true, force: true });

console.log("Built GitHub Pages showcase in .pages/");
