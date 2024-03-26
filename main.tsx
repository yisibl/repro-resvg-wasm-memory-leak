import { Resvg, initWasm } from '@resvg/resvg-wasm';
import { readFile } from 'fs/promises';

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
await initWasm(readFile(join(__dirname, './node_modules/@resvg/resvg-wasm/index_bg.wasm')))

if (!global.gc) {
  throw new Error("You must run this script with --expose-gc");
}

function logMemoryUsage(
  i: string,
  rss: string,
  heapTotal: string,
  heapUsed: string,
  external: string,
  arrayBuffers: string
) {
  console.log(
    `${i.padStart(8, " ")},` +
      `${rss.padStart(12, " ")},` +
      `${heapTotal.padStart(12, " ")},` +
      `${heapUsed.padStart(12, " ")},` +
      `${external.padStart(12, " ")},` +
      `${arrayBuffers.padStart(12, " ")}`
  );
}

const svg = `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<defs>
  <svg id="svg1">
    <rect width="50%" height="50%" fill="green" />
  </svg>
</defs>
<use id="use1" x="0" y="0" xlink:href="#svg1" />
<use id="use2" x="50%" y="50%" xlink:href="#svg1" />
</svg>`

logMemoryUsage("i", "rss", "heapTotal", "heapUsed", "external", "arrayBuffers");
for (let i = 0; i < 1000000; i++) {
  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: 1600,
    },
  })
  const pngData = resvg.render()
  const pngBuffer = pngData.asPng()
  // pngData.free()

  const arrayBuffer = pngBuffer.buffer.slice(pngBuffer.byteOffset, pngBuffer.byteOffset + pngBuffer.byteLength)

  if (i % 100 === 0) {
    // NOTE: Do GC before measuring memory usage because the garbage is not measured.
    global.gc();
    const usage = process.memoryUsage();

    logMemoryUsage(
      i.toString(),
      usage.rss.toString(),
      usage.heapTotal.toString(),
      usage.heapUsed.toString(),
      usage.external.toString(),
      arrayBuffer.byteLength.toString()
    );
  }
}
