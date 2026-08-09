import { spawn } from "node:child_process";

const run = (command, args) => new Promise((resolve, reject) => {
  const child = spawn(command, args, { stdio: "inherit", cwd: new URL("..", import.meta.url) });
  child.on("exit", (code) => code === 0 ? resolve() : reject(new Error(`${command} ${args.join(" ")} exited with ${code}`)));
});

await run("node", ["scripts/convert-shadcn.mjs"]);
await run("node", ["scripts/generate-component-css.mjs", "all"]);
await run("node", ["scripts/audit-css-minimality.mjs"]);
await run("node", ["scripts/validate-package.mjs"]);
console.log("Transpiled and validated all 64 Native-First component demos.");
