import { cp, mkdir, readFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";

const projectRoot = process.cwd();
const sourceRoot = join(projectRoot, ".agents", "skills");
const codexRoot = process.env.CODEX_HOME ?? join(homedir(), ".codex");
const targetRoot = join(codexRoot, "skills");
const skills = ["native-first-ui"];

await mkdir(targetRoot, { recursive: true });

for (const skill of skills) {
  const source = join(sourceRoot, skill);
  const target = join(targetRoot, skill);
  try {
    await readFile(join(source, "SKILL.md"));
    await cp(source, target, { recursive: true, force: true });
    console.log(`Installed $${skill} from ${source} to ${target}`);
  } catch {
    throw new Error(`Cannot install $${skill}: ${source}/SKILL.md was not found`);
  }
}

console.log("Native-First UI skills are ready for the next agent session.");
