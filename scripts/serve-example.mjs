import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { extname, join, relative, resolve } from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname);
const mime = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".json": "application/json" };

createServer(async (request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { allow: "GET, HEAD" });
    response.end("Method not allowed");
    return;
  }

  const requested = new URL(request.url ?? "/", "http://localhost").pathname;
  const normalized = requested === "/pith.css"
    ? "/dist/core.css"
    : requested === "/behavior.js"
      ? "/dist/behavior.js"
      : requested;
  const target = normalized === "/" ? "/site/index.html" : normalized;
  const path = resolve(join(root, `.${target}`));
  if (relative(root, path).startsWith("..")) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    const info = await stat(path);
    if (!info.isFile()) throw new Error("Not a file");
    response.writeHead(200, {
      "content-type": mime[extname(path)] ?? "text/plain",
      "content-length": info.size,
      "x-content-type-options": "nosniff",
    });
    if (request.method === "HEAD") response.end();
    else createReadStream(path).pipe(response);
  } catch {
    response.writeHead(404);
    response.end("Not found");
  }
}).listen(4173, () => console.log("Pith lab: http://localhost:4173"));
