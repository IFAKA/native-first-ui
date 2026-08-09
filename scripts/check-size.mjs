import { readFile } from "node:fs/promises";
import { gzipSync, brotliCompressSync } from "node:zlib";
const root = new URL("../dist/", import.meta.url);
const files = ["core.css", "layout.css", "forms.css", "navigation.css", "data.css", "overlays.css", "components.css"];
const size = (bytes, kind) => (kind === "br" ? brotliCompressSync(bytes, { params: { [Symbol.for("BROTLI_PARAM_QUALITY")]: 11 } }) : gzipSync(bytes, { level: 9 })).byteLength;
for (const file of files) { const bytes = await readFile(new URL(file, root)); console.log(`${file}: ${size(bytes,"gzip")} B gzip, ${size(bytes,"br")} B Brotli`); }
const core = await readFile(new URL("core.css", root));
if (size(core, "gzip") > 2048) throw new Error(`core.css exceeds the 2 KB gzip budget (${size(core,"gzip")} B)`);
