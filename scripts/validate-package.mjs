import { readFile } from "node:fs/promises";
import { join } from "node:path";

const root = new URL("..", import.meta.url);
const requiredFiles = [
  "package.json",
  "README.md",
  "AGENTS.md",
  "INTEGRATION-RULES.md",
  "src/core.css",
  "src/tokens.css",
  "src/elements.css",
  "src/patterns.css",
  "src/components.css",
  "src/behavior.js",
  "examples/index.html",
  ".agents/skills/native-first-ui/SKILL.md",
  ".agents/skills/emil-design-eng/SKILL.md",
  "site/index.html",
  "site/robots.txt",
  "site/sitemap.xml",
  ".github/workflows/pages.yml",
];

for (const file of requiredFiles) {
  await readFile(new URL(file, root));
}

const html = await readFile(new URL("examples/index.html", root), "utf8");
const css = await readFile(new URL("src/core.css", root), "utf8");
const packageJson = JSON.parse(await readFile(new URL("package.json", root), "utf8"));

for (const field of ["name", "version", "description", "license", "keywords", "exports"]) {
  if (!packageJson[field]) throw new Error(`Missing package metadata: ${field}`);
}

if (packageJson.license !== "MIT") throw new Error("Package license must remain MIT");
if (!packageJson.engines?.node) throw new Error("Package must declare a supported Node.js engine");

for (const required of ["<main", "<form", "<table", "<details", "<dialog", "<progress", "aria-label", "aria-live", "commandfor"]) {
  if (!html.includes(required) && !css.includes(required)) {
    throw new Error(`Missing conformance marker: ${required}`);
  }
}

for (const requiredImport of ["./tokens.css", "./elements.css", "./patterns.css", "./components.css"]) {
  if (!css.includes(`@import \"${requiredImport}\"`)) throw new Error(`core.css does not import ${requiredImport}`);
}

for (const exportPath of [".", "./core.css", "./tokens.css", "./elements.css", "./patterns.css", "./components.css", "./behavior.js"]) {
  if (!packageJson.exports[exportPath]) throw new Error(`Missing public export: ${exportPath}`);
}

const documentedClasses = [...html.matchAll(/class="([^"]*nf-[^"]*)"/g)].flatMap((match) => match[1].split(/\s+/).filter((name) => name.startsWith("nf-")));
const source = await Promise.all(["src/patterns.css", "src/components.css"].map((file) => readFile(new URL(file, root), "utf8")));
for (const className of new Set(documentedClasses)) {
  if (className.includes("$") || className.includes("{")) continue;
  if (!source.some((file) => file.includes(`.${className}`))) throw new Error(`Fixture uses undocumented class: ${className}`);
}

console.log(`Validated native-first-ui package (${requiredFiles.length} required files)`);
