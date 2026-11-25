// SPDX-License-Identifier: MIT
// The One-Liner Groan-Off — writes one original dad joke to /output/entry.txt.
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";

const ENTRY =
  `I asked my smart fridge for a dad joke. It said, "I'm not a dad — I'm just chilling."`;

// Fail fast on the competition gate: 1–140 chars, one non-blank line, UTF-8.
if (ENTRY.length < 1 || ENTRY.length > 140) {
  throw new Error(`entry is ${ENTRY.length} chars, gate requires 1–140`);
}
if (ENTRY.trim().length === 0 || ENTRY.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}

const outDir = "/output";
mkdirSync(outDir, { recursive: true });
// Empty /output's contents only — never remove the mounted directory itself.
for (const name of readdirSync(outDir)) {
  rmSync(`${outDir}/${name}`, { recursive: true, force: true });
}
writeFileSync(`${outDir}/entry.txt`, ENTRY, "utf8");

// Post-write read-back verification: the file on disk must be byte-identical.
const written = readFileSync(`${outDir}/entry.txt`, "utf8");
if (written !== ENTRY) {
  throw new Error("read-back mismatch: entry.txt does not match the entry");
}
