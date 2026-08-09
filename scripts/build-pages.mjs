import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { transform } from "lightningcss";

const root = new URL("..", import.meta.url);
const output = new URL(".pages/", root);

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(new URL("site/", root), output, { recursive: true, force: true });
await mkdir(new URL("dist/", output), { recursive: true });
await cp(new URL("dist/", root), new URL("dist/", output), { recursive: true, force: true });
const pageLayers = ["tokens", "elements", "layout", "patterns", "forms", "navigation", "data", "overlays", "components"];
const pageSource = (await Promise.all(pageLayers.map((name) => readFile(new URL(`src/${name}.css`, root), "utf8")))).join("\n");
const pageCss = transform({ filename: "native-first-ui.css", code: Buffer.from(pageSource), minify: true, drafts: { nesting: true }, targets: { chrome: 110 << 16, firefox: 110 << 16, safari: 16 << 16 } }).code;
await writeFile(new URL("native-first-ui.css", output), pageCss);
await cp(new URL("dist/behavior.js", root), new URL("behavior.js", output), { force: true });
await cp(new URL("site/showcase.js", root), new URL("showcase.js", output), { force: true });
await cp(new URL("recipes/", root), new URL("recipes/", output), { recursive: true, force: true });

console.log("Built GitHub Pages showcase in .pages/");
