const fs = require('fs');

let html = fs.readFileSync('legacy/index.html', 'utf8');

// Extract body content
const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
if (!bodyMatch) {
  console.error('No body found');
  process.exit(1);
}
let body = bodyMatch[1];

// Convert class to className
body = body.replace(/class=/g, 'className=');

// Close unclosed tags
body = body.replace(/<img([^>]*[^/])>/g, '<img$1 />');
body = body.replace(/<input([^>]*[^/])>/g, '<input$1 />');
body = body.replace(/<br([^>]*[^/])?>/g, '<br />');

// Handle inline styles (e.g. style="display:none;")
body = body.replace(/style="([^"]*)"/g, (match, p1) => {
  const styles = p1.split(';').filter(s => s.trim()).map(s => {
    const [key, value] = s.split(':');
    const camelKey = key.trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    return `${camelKey}: "${value.trim()}"`;
  });
  return `style={{ ${styles.join(', ')} }}`;
});

// Remove script tags at the bottom
body = body.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

// Fix onsubmit
body = body.replace(/onsubmit="[^"]*"/g, 'onSubmit={(e) => e.preventDefault()}');

// Fix stroke-width -> strokeWidth
body = body.replace(/stroke-width=/g, 'strokeWidth=');

// Fix html entities inside jsx
// Not strictly required for basic rendering if not inside attributes, but good practice.

const pageTsx = `
import React from 'react';

export default function Home() {
  return (
    <>
      ${body}
    </>
  );
}
`;

fs.writeFileSync('src/app/page.tsx', pageTsx);
console.log('Successfully converted index.html to page.tsx');
