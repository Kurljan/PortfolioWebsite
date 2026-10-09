const fs = require('fs');
let legacy = fs.readFileSync('legacy/style.css', 'utf16le');
if (legacy.indexOf('\u0000') === -1) {
    legacy = fs.readFileSync('legacy/style.css', 'utf8');
}
legacy = legacy.replace(/[^\x20-\x7E\r\n\t]/g, '');

// Convert specific hardcoded light colors to dark tones
legacy = legacy.replace(/#f9f9f9/gi, '#121212');
legacy = legacy.replace(/#1a1a1a/gi, '#050505'); // Footer color make it even darker
legacy = legacy.replace(/rgba\(0,0,0,0\.05\)/g, 'rgba(255,255,255,0.05)'); // Shadows/borders
legacy = legacy.replace(/rgba\(0,0,0,0\.1\)/g, 'rgba(255,255,255,0.1)'); // Shadows/borders

const tailwind = `@import "tailwindcss";
@plugin "tailwindcss-animate";

:root {
  --black: #e5e5e5; /* Text */
  --white: #0a0a0a; /* Background */
  --gray-light: #171717; /* Card background */
  --gray-mid: #262626;
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

/* Invert icons that were explicitly black */
img[src*="github"], img[src*="devicon"] {
  filter: brightness(0) invert(1) opacity(0.8);
}
.skill-item:hover img {
  filter: brightness(0) invert(1) opacity(1);
}

/* Fix social icons in hero */
.social-icon svg {
  color: var(--black);
}

/* Fix specific backgrounds */
.service-card {
  background: var(--gray-light);
  border: 1px solid var(--gray-mid);
}
.portfolio-card {
  background: var(--gray-light);
  border: 1px solid var(--gray-mid);
}
.hero-svg-wrap {
  filter: drop-shadow(0 0 20px rgba(255,255,255,0.05));
}
`;

fs.writeFileSync('src/app/globals.css', tailwind + '\n' + legacy, 'utf8');
