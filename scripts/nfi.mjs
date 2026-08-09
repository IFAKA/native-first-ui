import { readFile, mkdir, readdir, writeFile } from "node:fs/promises";
import { brotliCompressSync, gzipSync } from "node:zlib";
import { extname, join, relative } from "node:path";
import { transform } from "lightningcss";

const root = new URL("../", import.meta.url);
const rootPath = new URL("../", import.meta.url).pathname;
const registry = JSON.parse(await readFile(new URL("../registry.json", import.meta.url), "utf8"));
const roleRepeating = /^nf-(button|input|select|textarea|table|dialog|heading|link)(?:-(primary|danger|quiet))?$/;
const allowed = new Set(registry.classes);
const sourceDirectories = ["site", "examples", "recipes"];
const sourceExtensions = new Set([".html", ".js", ".jsx", ".tsx", ".vue", ".svelte"]);
const excludedDirectories = new Set(["node_modules", "dist", ".pages"]);

async function files() {
  const found = new Set();
  async function visit(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const file = join(directory, entry.name);
      if (entry.isDirectory()) {
        if (!excludedDirectories.has(entry.name)) await visit(file);
      } else if (entry.isFile() && sourceExtensions.has(extname(entry.name))) found.add(file);
    }
  }

  for (const directory of sourceDirectories) await visit(join(rootPath, directory));
  for (const entry of await readdir(rootPath, { withFileTypes: true })) {
    if (entry.isFile() && sourceExtensions.has(extname(entry.name))) found.add(join(rootPath, entry.name));
  }
  return [...found];
}

function classes(content) {
  return [...content.matchAll(/(?:class|className)\s*=\s*(?:["'`]([^"'`]+)["'`]|\{["'`]([^"'`]+)["'`]\})/g)]
    .flatMap(([, first, second]) => (first ?? second).split(/\s+/).filter(Boolean));
}

async function scan() {
  const failures = [];
  for (const file of await files()) {
    const content = await readFile(file, "utf8");
    const rel = relative(rootPath, file);
    for (const match of content.matchAll(/\sstyle\s*=\s*["']([^"']*)["']/g)) {
      if (!match[1].split(";").filter(Boolean).every((declaration) => /^\s*--nf-[a-z0-9-]+\s*:/.test(declaration))) failures.push(`${rel}: inline styles are not allowed; use --nf-* tokens`);
    }
    for (const name of classes(content)) {
      if (roleRepeating.test(name)) failures.push(`${rel}: role-repeating class .${name}`);
      if (/\[|\]|\{|\}|:/.test(name)) failures.push(`${rel}: arbitrary class value ${name}`);
      if (name.startsWith("nf-") && !allowed.has(name)) failures.push(`${rel}: unregistered class .${name}`);
      if (!name.startsWith("nf-") && !allowed.has(name) && !/^[a-z][a-z0-9-]*$/.test(name)) failures.push(`${rel}: unmanaged class .${name}`);
    }
  }
  return failures;
}

async function build() {
  const failures = await scan();
  if (failures.length) throw new Error(`nfi build failed:\n${failures.join("\n")}`);
  const content = (await Promise.all((await files()).map((file) => readFile(file, "utf8")))).join("\n");
  const usedContracts = registry.contextualContracts.filter(({ selector }) => {
    const tag = selector.match(/^[a-z]+/)?.[0];
    return !tag || new RegExp(`<${tag}\\b`, "i").test(content);
  });
  const native = registry.nativeSelectors.filter((tag) => new RegExp(`<${tag}\\b`, "i").test(content));
  const contextual = usedContracts.map(({ selector }) => {
    if (selector === "form > label") return `${selector}{display:grid;gap:.5rem;font-weight:650}`;
    if (selector === "nav > a") return `${selector}{display:inline-flex;min-block-size:44px;align-items:center;padding-inline:.5rem}`;
    if (selector === "fieldset > legend") return `${selector}{font-weight:650}`;
    if (selector.includes("input +")) return `${selector}{display:block;margin-block-start:.25rem;color:var(--nf-color-muted);font-size:.875rem}`;
    if (selector.includes(":has")) return `${selector} :where(input:invalid,select:invalid,textarea:invalid){border-color:var(--nf-color-danger)}`;
    return `${selector}{min-block-size:44px}`;
  }).join("");
  const css = transform({ filename: "project.css", code: Buffer.from(`@layer utilities{:where(${native.join(",")}){min-block-size:44px}:where(a,button,input,select,summary,textarea):focus-visible{outline:2px solid var(--nf-color-accent);outline-offset:3px}${contextual}}`, "utf8"), minify: true, drafts: { nesting: true }, targets: { chrome: 110 << 16, firefox: 110 << 16, safari: 16 << 16 } }).code;
  await mkdir(new URL("../dist/", import.meta.url), { recursive: true });
  await writeFile(new URL("../dist/project.css", import.meta.url), css);
  await writeFile(new URL("../dist/project.css.br", import.meta.url), brotliCompressSync(css, { params: { [Symbol.for("BROTLI_PARAM_QUALITY")]: 11 } }));
  await writeFile(new URL("../dist/project.css.gz", import.meta.url), gzipSync(css, { level: 9 }));
  const brotliBytes = brotliCompressSync(css).byteLength;
  console.log(`nfi build: ${css.byteLength} B raw, ${gzipSync(css).byteLength} B gzip, ${brotliBytes} B Brotli`);
  if (brotliBytes > 1024) throw new Error(`Generated project.css exceeds the 1 KB Brotli budget (${brotliBytes} B)`);
}

async function addRecipe(name) {
  const source = new URL(`../recipes/${name}/`, import.meta.url);
  const fallback = new URL(`../recipes/${name}s/`, import.meta.url);
  const target = new URL(`../.nfi/${name}/`, import.meta.url);
  const entries = ["snippet.html", "README.md", "metadata.json", "behavior.js"];
  let copied = 0;
  await mkdir(target, { recursive: true });
  for (const entry of entries) {
    try { await writeFile(new URL(entry, target), await readFile(new URL(entry, source))); copied += 1; }
    catch (error) {
      if (error.code !== "ENOENT") throw error;
      try { await writeFile(new URL(entry, target), await readFile(new URL(entry, fallback))); copied += 1; }
      catch (fallbackError) { if (fallbackError.code !== "ENOENT") throw fallbackError; }
    }
  }
  if (!copied) throw new Error(`Unknown recipe: ${name}`);
  console.log(`nfi add: installed ${name} in .nfi/${name}/`);
}

const command = process.argv[2] ?? "validate";
if (command === "build") await build();
else if (command === "validate") {
  const failures = await scan();
  if (failures.length) throw new Error(`nfi validate failed:\n${failures.join("\n")}`);
  console.log(`nfi validate: ${registry.classes.length} registered classes and ${registry.contextualContracts.length} contextual contracts`);
} else if (command === "manifest") {
  await writeFile(new URL("../class-manifest.json", import.meta.url), `${JSON.stringify(registry, null, 2)}\n`);
  console.log("nfi manifest: wrote class-manifest.json");
} else if (command === "add") await addRecipe(process.argv[3] ?? "");
else throw new Error(`Unknown nfi command: ${command}`);
