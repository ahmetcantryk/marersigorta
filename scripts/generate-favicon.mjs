import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = path.resolve("public/logo-icon.svg");
const OUT_DIR = path.resolve("src/app");

const TARGETS = [
  { name: "icon.png", size: 64 },
  { name: "apple-icon.png", size: 180 },
];

async function main() {
  const svg = await readFile(SRC);
  for (const t of TARGETS) {
    const buf = await sharp(svg, { density: 384 })
      .resize(t.size, t.size, {
        fit: "contain",
        background: { r: 255, g: 255, b: 255, alpha: 0 },
      })
      .png({ compressionLevel: 9 })
      .toBuffer();
    const out = path.join(OUT_DIR, t.name);
    await writeFile(out, buf);
    console.log(`✓ ${t.name} (${t.size}×${t.size}) — ${buf.byteLength} bytes`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
