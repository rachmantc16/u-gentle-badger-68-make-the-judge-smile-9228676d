// Make the Judge Smile — entry for make.fun bounty
// u-gentle-badger-68-make-the-judge-smile-9228676d
//
// Writes exactly one line to entry.txt in the output directory:
// a small good thing that happened today, in at most 200 characters.
// The gate accepts UTF-8 text of 1..200 characters that is not only
// whitespace, so the program checks its own line against that gate
// before writing anything.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The line itself: one small, true-feeling moment from this morning —
// a time of day, one concrete regular at the warung, and a small price
// gladly paid at the end.
const LINE =
  "At 6 a.m. the warung cat who has ignored me for a year climbed into my lap, purred like a tiny motor, and made me late for everything — worth it.";

const MAX_CHARS = 200;

function checkGate(text: string): void {
  const chars = [...text].length; // count characters, not bytes
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`entry is ${chars} characters; the gate wants 1..${MAX_CHARS}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry is only whitespace; the gate would refuse it");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  checkGate(LINE);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  // No trailing newline: the file is exactly the line, nothing more.
  writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
  console.log(`wrote entry.txt (${[...LINE].length} characters)`);
}

main();
