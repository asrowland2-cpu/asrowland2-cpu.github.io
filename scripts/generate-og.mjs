import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const fontPath = resolve(root, 'scripts/Newsreader.ttf');

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#faf5ec"/>
  <text x="120" y="320" font-family="Newsreader" font-size="92" font-weight="500" fill="#14163a" letter-spacing="-2.4">Ashton Rowland</text>
  <text x="122" y="380" font-family="Newsreader" font-size="36" font-weight="400" fill="#5d6182" font-style="italic">Founder, Formenos Industries</text>
</svg>
`.trim();

const resvg = new Resvg(svg, {
  fitTo: { mode: 'width', value: 1200 },
  background: '#faf5ec',
  font: {
    fontFiles: [fontPath],
    loadSystemFonts: false,
    defaultFontFamily: 'Newsreader',
  },
});

const png = resvg.render().asPng();
const out = resolve(root, 'public/og.png');
writeFileSync(out, png);

console.log(`Wrote ${out} (${png.length} bytes)`);
