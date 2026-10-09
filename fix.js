const fs = require('fs');
let c = fs.readFileSync('src/app/page.tsx', 'utf8');
c = c.replace(/<!--([\s\S]*?)-->/g, '{/*$1*/}');
c = c.replace("import React from 'react';", "import React from 'react';\nimport SecretLoginTrigger from '@/components/SecretLoginTrigger';");
c = c.replace(
  '<a href="#hero" className="nav-logo-link" id="nav-logo" aria-label="Home">',
  '<SecretLoginTrigger>\n      <a href="#hero" className="nav-logo-link" id="nav-logo" aria-label="Home">'
);
c = c.replace(
  '<img src="logo.svg" alt="Kurljan Logo" className="nav-logo-img nav-logo-inverted" />\n    </a>',
  '<img src="logo.svg" alt="Kurljan Logo" className="nav-logo-img nav-logo-inverted" />\n    </a>\n    </SecretLoginTrigger>'
);
c = c.replace(
  '<div className="footer-socials">',
  '<div className="footer-socials">\n      <SecretLoginTrigger>\n        <span className="footer-icon cursor-pointer opacity-10 hover:opacity-100" aria-label="Owl" title="">🦉</span>\n      </SecretLoginTrigger>'
);
fs.writeFileSync('src/app/page.tsx', c);
