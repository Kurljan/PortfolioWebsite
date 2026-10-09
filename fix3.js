const fs = require('fs');
let legacy = fs.readFileSync('legacy/style.css', 'utf16le'); // The original file was likely UTF-16!
if (legacy.indexOf('\u0000') === -1) {
    // If no null bytes, maybe it was utf8.
    legacy = fs.readFileSync('legacy/style.css', 'utf8');
}
legacy = legacy.replace(/[^\x20-\x7E\r\n\t]/g, '');

const tailwind = `@import "tailwindcss";
@plugin "tailwindcss-animate";

:root {
  --black: #111111;
  --white: #ffffff;
  --gray-light: #e2e2e2;
  --gray-mid: #d0d0d0;
  --letter-space: 0.2em;
  --letter-space-wide: 0.35em;
}

@theme {
  --color-brand-black: var(--black);
  --color-brand-white: var(--white);
  --color-brand-gray-light: var(--gray-light);
  --color-brand-gray-mid: var(--gray-mid);
  --font-sans: var(--font-montserrat);
  --font-serif: var(--font-cormorant);
}

body {
  background: var(--white);
  color: var(--black);
  font-family: var(--font-sans);
  font-weight: 300;
  overflow-x: hidden;
}

html {
  scroll-behavior: smooth;
}
`;

fs.writeFileSync('src/app/globals.css', tailwind + '\n' + legacy, 'utf8');
