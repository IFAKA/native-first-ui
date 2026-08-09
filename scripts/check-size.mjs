import { readFile } from "node:fs/promises";
import { gzipSync } from "node:zlib";
import { brotliCompressSync } from "node:zlib";

const root = new URL("../dist/", import.meta.url);
const files = ["tokens.css", "elements.css", "patterns.css", "components.css"];
const budget = 4_600;
let total = 0;

const compressedBytes = (css, algorithm) => algorithm === "br"
  ? brotliCompressSync(css, { params: { [Symbol.for("BROTLI_PARAM_QUALITY")]: 11 } }).byteLength
  : gzipSync(css, { level: 9 }).byteLength;

for (const file of files) {
  const css = await readFile(new URL(file, root));
  const gzipBytes = compressedBytes(css, "gzip");
  total += gzipBytes;
  console.log(`${file}: ${gzipBytes} B gzip, ${compressedBytes(css, "br")} B Brotli`);
}

const core = await readFile(new URL("core.css", root));
const coreGzip = compressedBytes(core, "gzip");
const coreBrotli = compressedBytes(core, "br");
console.log(`core.css bundled: ${coreGzip} B gzip, ${coreBrotli} B Brotli`);
console.log(`separate layer set: ${total} B gzip (budget: ${budget} B)`);
if (coreGzip > budget) throw new Error(`core.css exceeds the ${budget} B gzip budget`);
if (total > budget) throw new Error(`CSS exceeds the ${budget} B gzip budget`);
