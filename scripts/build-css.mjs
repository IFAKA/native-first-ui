import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { brotliCompressSync, gzipSync } from "node:zlib";
import { transform } from "lightningcss";

const root = new URL("..", import.meta.url);
const layers = ["tokens", "elements", "layout", "forms", "navigation", "data", "overlays"];
const targets = { chrome: 110 << 16, firefox: 110 << 16, safari: 16 << 16 };
const source = Object.fromEntries(await Promise.all(layers.map(async (name) => [name, await readFile(new URL(`src/${name}.css`, root), "utf8")] )));
const compile = (name, css) => transform({ filename: `${name}.css`, code: Buffer.from(css), minify: true, drafts: { nesting: true }, targets }).code;
const compressed = (bytes) => ({ raw: bytes.byteLength, gzip: gzipSync(bytes, { level: 9 }).byteLength, brotli: brotliCompressSync(bytes, { params: { [Symbol.for("BROTLI_PARAM_QUALITY")]: 11 } }).byteLength });

await mkdir(new URL("dist/", root), { recursive: true });
for (const stale of ["base.css", "tokens.css", "elements.css", "patterns.css", "components.css", "workbench.css"]) {
  await rm(new URL(`dist/${stale}`, root), { force: true });
}
await writeFile(new URL("dist/behavior.js", root), await readFile(new URL("src/behavior.js", root)));
const core = compile("core", `@layer reset,tokens,elements,layout,utilities;${source.tokens}${source.elements}${source.layout}`);
await writeFile(new URL("dist/core.css", root), core);
const report = { core: compressed(core) };
for (const name of layers.slice(2)) {
  const bytes = compile(name, source[name]);
  await writeFile(new URL(`dist/${name}.css`, root), bytes);
  report[name] = compressed(bytes);
}
await writeFile(new URL("dist/size-report.json", root), `${JSON.stringify(report, null, 2)}\n`);
console.log(`Built native-first-ui CSS: core ${report.core.gzip} B gzip / ${report.core.brotli} B Brotli`);
