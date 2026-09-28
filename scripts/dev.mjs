// Starts `next dev` with the project folder as the working directory, regardless of where it's launched from.
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
process.chdir(root);
// --webpack: Turbopack's Google Fonts loader is unreliable for Noto Sans JP's huge @font-face set in this environment.
process.argv = [process.argv[0], "next", "dev", "--webpack", ...process.argv.slice(2)];
await import(pathToFileURL(path.join(root, "node_modules/next/dist/bin/next")).href);
