import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";

const run = async () => {
  const dayNumber = process.argv[2];

  if (!dayNumber) {
    console.error("You did not provide the day number");
    return;
  }

  const path = join(process.cwd(), `day-${dayNumber}`, "index.ts");
  const isValidPath = existsSync(path);

  if (!isValidPath) {
    console.error("Invalid path or non-existent day");
    return;
  }

  execSync(`pnpm tsx ${path}`, { stdio: "inherit" });
};

await run();
