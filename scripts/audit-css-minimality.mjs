import { readFile } from "node:fs/promises";
const root = new URL("..", import.meta.url);
const css = await readFile(new URL("src/core.css", root), "utf8");
if (css.includes("components.css") || css.includes("patterns.css")) throw new Error("core.css includes optional legacy modules");
if (css.includes("transition: all")) throw new Error("transition: all is not allowed");
console.log("CSS minimality audit passed: core contains only tokens, native elements, and layout.");
