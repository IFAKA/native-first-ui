import { cp, mkdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const projectRoot = process.cwd();
const sourceRoot = process.env.CODEX_SKILLS_ROOT ?? join(process.env.HOME ?? "", ".agents", "skills");
const targetRoot = join(projectRoot, ".agents", "skills");
const skills = ["native-first-ui", "emil-design-eng"];

await mkdir(targetRoot, { recursive: true });

for (const skill of skills) {
  const source = join(sourceRoot, skill);
  const target = join(targetRoot, skill);
  try {
    await readFile(join(source, "SKILL.md"));
    await cp(source, target, { recursive: true, force: true });
    console.log(`Installed $${skill}`);
  } catch {
    console.warn(`Skipped $${skill}: ${source}/SKILL.md was not found`);
  }
}
