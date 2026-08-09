import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";

const root = new URL("..", import.meta.url);
const layers = ["tokens", "elements", "patterns", "components"];

function minifyCss(css) {
  let output = "";
  let quote = "";
  let inComment = false;
  let pendingSpace = false;

  for (let index = 0; index < css.length; index += 1) {
    const character = css[index];
    const next = css[index + 1];

    if (inComment) {
      if (character === "*" && next === "/") {
        inComment = false;
        index += 1;
      }
      continue;
    }
    if (!quote && character === "/" && next === "*") {
      inComment = true;
      index += 1;
      continue;
    }
    if (quote) {
      output += character;
      if (character === "\\") {
        output += next ?? "";
        index += 1;
      } else if (character === quote) {
        quote = "";
      }
      continue;
    }
    if (character === '"' || character === "'") {
      quote = character;
      output += character;
      pendingSpace = false;
      continue;
    }
    if (/\s/.test(character)) {
      pendingSpace = true;
      continue;
    }

    const previous = output.at(-1) ?? "";
    const punctuationBefore = /[{};,>+~]/;
    const punctuationAfter = /[{}:;,>+~]/;
    if (pendingSpace && output && !punctuationBefore.test(character) && !punctuationAfter.test(previous)) output += " ";
    pendingSpace = false;
    output += character;
  }

  return `${output.trim().replace(/;}/g, "}").replace(/#ffffff\b/gi, "#fff")}\n`;
}

await mkdir(new URL("dist/", root), { recursive: true });
await copyFile(new URL("src/behavior.js", root), new URL("dist/behavior.js", root));
const source = {};
for (const layer of layers) source[layer] = await readFile(new URL(`src/${layer}.css`, root), "utf8");

for (const layer of layers) {
  await writeFile(new URL(`dist/${layer}.css`, root), minifyCss(source[layer]));
}

const core = `@layer reset,tokens,elements,patterns,components,utilities;\n${layers.map((layer) => minifyCss(source[layer])).join("\n")}`;
await writeFile(new URL("dist/core.css", root), minifyCss(core));

console.log("Built minified CSS distribution in dist/");
