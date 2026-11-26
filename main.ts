// Rename the Planet — entry program.
// Writes one line (under 200 characters) giving a planet a funny new name
// and saying why, to /output/entry.txt.
// The joke: Earth is renamed "The Group Project" — eight billion of us, one
// deadline, and nobody has done the reading. The why earns the name.
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const LIMIT = 200;

const NEW_NAME = "Earth is now 'The Group Project'.";
const WHY = "Eight billion of us, one deadline, and not one of us has done the reading.";

function buildEntry(): string {
  return `${NEW_NAME} ${WHY}`;
}

function assertValid(text: string): void {
  const n = [...text].length;
  if (n < 1 || n >= LIMIT) {
    throw new Error(`entry fails the under-${LIMIT} character gate (${n})`);
  }
  if (text.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  // The rename must name a real planet and its new name.
  if (!/^Earth is now/.test(text) || !/The Group Project/.test(text)) {
    throw new Error("entry must rename Earth to The Group Project");
  }
  // The why must earn the name: eight billion, one deadline, no reading.
  if (!/Eight billion of us, one deadline/.test(text)) {
    throw new Error("entry must give the why in the same breath");
  }
  // The landing is the unread reading: the last word is the punch.
  if (!/done the reading\.$/.test(text)) {
    throw new Error("entry must end on nobody having done the reading");
  }
}

const line = buildEntry();
assertValid(line);
const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
await mkdir(dir, { recursive: true });
await writeFile(join(dir, "entry.txt"), new TextEncoder().encode(line));
console.log(`wrote ${[...line].length} chars to ${join(dir, "entry.txt")}`);
