const fs = require('fs');
let c = fs.readFileSync('src/app/page.tsx', 'utf8');

c = c.replace(/<SecretLoginTrigger>\r?\n\s*<a href=\"#hero\" className=\"nav-logo-link\" id=\"nav-logo\" aria-label=\"Home\">\r?\n\s*<img src=\"logo.svg\" alt=\"Kurljan Logo\" className=\"nav-logo-img nav-logo-inverted\" \/>\r?\n\s*<\/a>\r?\n\s*<ul className=\"nav-links\">/, 
`<SecretLoginTrigger>
      <a href="#hero" className="nav-logo-link" id="nav-logo" aria-label="Home">
      <img src="logo.svg" alt="Kurljan Logo" className="nav-logo-img nav-logo-inverted" />
    </a>
    </SecretLoginTrigger>
    <ul className="nav-links">`);

if (!c.includes('eslint-disable')) {
  c = '/* eslint-disable */\n' + c;
}

fs.writeFileSync('src/app/page.tsx', c);
