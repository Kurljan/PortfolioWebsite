
import React from 'react';
import SecretLoginTrigger from '@/components/SecretLoginTrigger';

export default function Home() {
  return (
    <>
      

  {/* ══════════ TOP NAV ══════════ */}
  <nav id="top-nav" className="top-nav">
    <SecretLoginTrigger>
      <a href="#hero" className="nav-logo-link" id="nav-logo" aria-label="Home">
      <img src="logo.svg" alt="Kurljan Logo" className="nav-logo-img nav-logo-inverted" />
    </a>
    <ul className="nav-links">
      <li><a href="#about" id="nav-about">About me</a></li>
      <li><a href="#skills" id="nav-skills">Skills</a></li>
      <li><a href="#portfolio" id="nav-portfolio">Portfolio</a></li>
    </ul>
    <a href="#contact" className="nav-cta" id="nav-contact">CONTACT ME</a>
  </nav>

  {/* ══════════ HERO ══════════ */}
  <section id="hero" className="hero">
    {/* LEFT — light side */}
    <div className="hero-left">
      <div className="hero-logo">
        <a href="#hero" className="logo-monogram">
          <img src="logo.svg" alt="Kurljan Logo" className="nav-logo-img" />
        </a>
      </div>
      <div className="hero-content">
        <p className="hero-greeting">Hi, <span className="accent">I am</span></p>
        <h1 className="hero-name">Kerl Jan<br/>Sumontao</h1>
        <p className="hero-title">Game Developer / AI Explorer</p>
        <div className="hero-socials">
          <a href="mailto:sumontaokerljan@gmail.com" className="social-icon" id="social-email" aria-label="Email">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
          </a>
          <a href="https://github.com/kurljan" target="_blank" className="social-icon" id="social-github" aria-label="GitHub">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
          </a>
          <a href="https://linkedin.com/in/kerljan" target="_blank" className="social-icon" id="social-linkedin" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
        </div>
      </div>
      <a href="#about" className="hero-scroll-hint" aria-label="Scroll down">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
      </a>
    </div>

    {/* RIGHT — dark side with photo */}
    <div className="hero-right">
      <div className="hero-svg-wrap">
        <img src="Kurljan.svg" alt="Kerl Jan Sumontao" className="hero-svg" id="hero-svg" />
      </div>
    </div>
  </section>

  {/* ══════════ INTRO BAND ══════════ */}
  <section className="intro-band">
    <div className="intro-band-inner">
      <span className="intro-band-name">KURLJAN</span>
      <div className="intro-band-text">
        <p>A BSIT student at Bukidnon State University obsessed with building things that actually matter — games, simulations, and AI systems that push what's technically possible.</p>
        <a href="#about" className="intro-band-link">READ MORE</a>
      </div>
      <div className="intro-band-logo">
        <img src="Kurljan.svg" alt="Kurljan Logo" className="intro-band-logo-img" />
      </div>
    </div>
  </section>

  {/* ══════════ ABOUT ME ══════════ */}
  <section id="about" className="section-light">
    <div className="container">
      <div className="section-title-wrap">
        <h2 className="section-title">ABOUT ME</h2>
      </div>
      <p className="section-bio">
        Hey, I'm Kerl Jan — a final-year BSIT student at Bukidnon State University, Malaybalay City, Philippines.
        I build games that teach, simulations that heal, and AI systems that push what's technically possible.
      </p>
      <div className="cta-link-wrap">
        <a href="#portfolio" className="cta-link" id="explore-link">EXPLORE</a>
      </div>
      <div className="divider">
        <span className="divider-line"></span>
        <span className="divider-icon">&#10096;&#10096;&#10096;</span>
        <span className="divider-line"></span>
      </div>

      {/* Services */}
      <div className="services-grid">
        <div className="service-card">
          <div className="service-icon">🎮</div>
          <h3 className="service-title">GAME DEVELOPMENT</h3>
          <p className="service-desc">I build games with Unity and Python that go beyond entertainment — teaching tools, escape simulations, and learning platforms.</p>
        </div>
        <div className="service-card">
          <div className="service-icon">🤖</div>
          <h3 className="service-title">AI &amp; MACHINE LEARNING</h3>
          <p className="service-desc">Experimenting with machine learning models and AI-powered systems, stress-testing their limits and building real-world applications.</p>
        </div>
        <div className="service-card">
          <div className="service-icon">🩺</div>
          <h3 className="service-title">SIMULATION SYSTEMS</h3>
          <p className="service-desc">Building medical visualizations and technical simulations — like PAD blood flow systems — where precision and clarity matter.</p>
        </div>
      </div>

      <div className="divider">
        <span className="divider-line"></span>
        <span className="divider-icon">&#10096;&#10096;&#10096;</span>
        <span className="divider-line"></span>
      </div>
    </div>
  </section>

  {/* ══════════ SKILLS ══════════ */}
  <section id="skills" className="section-light">
    <div className="container">
      <div className="section-title-wrap">
        <h2 className="section-title">SKILLS</h2>
      </div>

      <div className="skills-group">
        <p className="skills-label">USING NOW:</p>
        <div className="skills-grid">
          <div className="skill-item">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" className="skill-icon" />
            <span>PYTHON</span>
          </div>
          <div className="skill-item">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java" className="skill-icon" />
            <span>JAVA</span>
          </div>

          <div className="skill-item">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" className="skill-icon" />
            <span>JAVASCRIPT</span>
          </div>
          <div className="skill-item">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML5" className="skill-icon" />
            <span>HTML5</span>
          </div>
          <div className="skill-item">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS3" className="skill-icon" />
            <span>CSS3</span>
          </div>
          <div className="skill-item">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg" alt="Unity" className="skill-icon" />
            <span>UNITY</span>
          </div>
          <div className="skill-item">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" className="skill-icon" />
            <span>GIT</span>
          </div>
          <div className="skill-item">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" alt="PHP" className="skill-icon" />
            <span>PHP</span>
          </div>
          <div className="skill-item">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" className="skill-icon" />
            <span>REACT</span>
          </div>
          <div className="skill-item">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" alt="Linux" className="skill-icon" />
            <span>LINUX</span>
          </div>
        </div>
      </div>

      <div className="skills-group">
        <p className="skills-label">LEARNING:</p>
        <div className="skills-grid">
          <div className="skill-item">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" alt="TensorFlow" className="skill-icon" />
            <span>TENSORFLOW</span>
          </div>
          <div className="skill-item">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" alt="Angular" className="skill-icon" />
            <span>ANGULAR</span>
          </div>
          <div className="skill-item">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" className="skill-icon" />
            <span>DOCKER</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* ══════════ PORTFOLIO ══════════ */}
  <section id="portfolio" className="section-portfolio">
    <div className="portfolio-header">
      <div className="section-title-wrap section-title-light">
        <h2 className="section-title">PORTFOLIO</h2>
      </div>
    </div>

    <div className="portfolio-body">
      {/* Filter tabs */}
      <div className="portfolio-filters">
        <button className="filter-btn active" data-filter="all" id="filter-all">ALL</button>
        <button className="filter-btn" data-filter="coded" id="filter-coded">CODED</button>
        <button className="filter-btn" data-filter="designed" id="filter-designed">DESIGNED</button>
      </div>

      {/* Grid */}
      <div className="portfolio-grid" id="portfolio-grid">
        <div className="portfolio-item" data-category="coded">
          <div className="portfolio-thumb portfolio-thumb-1"></div>
          <div className="portfolio-overlay">
            <p className="portfolio-tag">coded.</p>
            <h3 className="portfolio-item-title">NetGame</h3>
            <p className="portfolio-item-desc">Netacad-style learning game for people with ADHD — gamified networking concepts.</p>
            <div className="portfolio-links">
              <a href="https://github.com/Kurljan/NetGame" target="_blank" id="netgame-link">MORE</a>
            </div>
          </div>
        </div>

        <div className="portfolio-item" data-category="coded">
          <div className="portfolio-thumb portfolio-thumb-2"></div>
          <div className="portfolio-overlay">
            <p className="portfolio-tag">coded.</p>
            <h3 className="portfolio-item-title">Project-X</h3>
            <p className="portfolio-item-desc">PAD Simulation System — visualizes blood flow & arterial blockages in Python.</p>
            <div className="portfolio-links">
              <a href="https://github.com/Kurljan/Project-X" target="_blank" id="projectx-link">MORE</a>
            </div>
          </div>
        </div>

        <div className="portfolio-item" data-category="coded">
          <div className="portfolio-thumb portfolio-thumb-3"></div>
          <div className="portfolio-overlay">
            <p className="portfolio-tag">coded.</p>
            <h3 className="portfolio-item-title">Escape</h3>
            <p className="portfolio-item-desc">Horror escape game built on OOP & DSA principles. Survive. Solve. Escape.</p>
            <div className="portfolio-links">
              <a href="https://github.com/Kurljan/Escape" target="_blank" id="escape-link">MORE</a>
            </div>
          </div>
        </div>

        <div className="portfolio-item" data-category="coded">
          <div className="portfolio-thumb portfolio-thumb-4"></div>
          <div className="portfolio-overlay">
            <p className="portfolio-tag">coded.</p>
            <h3 className="portfolio-item-title">Barangay Health Center IS</h3>
            <p className="portfolio-item-desc">Information system integrating System Architecture, IPT2, ADS & Security.</p>
            <div className="portfolio-links">
              <a href="https://github.com/Kurljan/Barangay-Health-Center-Information-System" target="_blank" id="bhcis-link">MORE</a>
            </div>
          </div>
        </div>

        <div className="portfolio-item" data-category="designed">
          <div className="portfolio-thumb portfolio-thumb-5"></div>
          <div className="portfolio-overlay">
            <p className="portfolio-tag">designed.</p>
            <h3 className="portfolio-item-title">TechSolve</h3>
            <p className="portfolio-item-desc">Tech-focused web project with clean UI design and modern front-end.</p>
            <div className="portfolio-links">
              <a href="https://github.com/Kurljan/TechSolve" target="_blank" id="techsolve-link">MORE</a>
            </div>
          </div>
        </div>

        <div className="portfolio-item portfolio-item-cta" data-category="all">
          <div className="portfolio-thumb portfolio-thumb-6"></div>
          <div className="portfolio-overlay portfolio-overlay-cta">
          </div>
        </div>
      </div>

      <p className="portfolio-footer-text">And many more to come!</p>
    </div>
  </section>

  {/* ══════════ CONTACT ══════════ */}
  <section id="contact" className="section-light">
    <div className="container">
      <div className="section-title-wrap">
        <h2 className="section-title">CONTACT</h2>
      </div>
      <p className="section-bio">
        Have an idea? Want to collaborate on something great?<br/>Let's connect and build something that matters.
      </p>
      <div className="contact-info-strip">
        <a href="mailto:sumontaokerljan@gmail.com" className="contact-info-item" id="contact-email-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
          sumontaokerljan@gmail.com
        </a>
        <a href="tel:+639295823370" className="contact-info-item" id="contact-phone-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .99h3a2 2 0 012 1.72c.13.96.36 1.9.69 2.81a2 2 0 01-.45 2.11L6.09 8.78a16 16 0 006.13 6.13l1.15-1.15a2 2 0 012.11-.45c.91.33 1.85.56 2.81.69A2 2 0 0122 16.92z"/></svg>
          09295823370
        </a>
      </div>

      <div className="divider">
        <span className="divider-line"></span>
        <span className="divider-icon">&#10096;&#10096;&#10096;</span>
        <span className="divider-line"></span>
      </div>

      <form className="contact-form" id="contact-form"
            action="https://formspree.io/f/mppwajpv"
            method="POST"
            onSubmit={(e) => e.preventDefault()}>
        <div className="form-field">
          <input type="text" id="input-name" name="name" placeholder="ENTER YOUR NAME*" required />
          <span className="form-line"></span>
        </div>
        <div className="form-field">
          <input type="email" id="input-email" name="email" placeholder="ENTER YOUR EMAIL*" required />
          <span className="form-line"></span>
        </div>
        <div className="form-field">
          <input type="tel" id="input-phone" name="phone" placeholder="PHONE NUMBER" />
          <span className="form-line"></span>
        </div>
        <div className="form-field">
          <textarea id="input-message" name="message" placeholder="YOUR MESSAGE*" rows="5" required></textarea>
          <span className="form-line"></span>
        </div>
        <div className="form-submit-wrap">
          <button type="submit" className="submit-btn" id="submit-btn">SUBMIT</button>
        </div>
        <p className="form-success" id="form-success" style={{ display: "none" }}>✓ Message sent! I'll get back to you soon.</p>
      </form>
    </div>
  </section>

  {/* ══════════ FOOTER ══════════ */}
  <footer className="footer" id="footer">
    <a href="#hero" className="back-to-top" id="back-to-top">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
      BACK TO TOP
    </a>
    <div className="footer-socials">
      <SecretLoginTrigger>
        <span className="footer-icon cursor-pointer opacity-10 hover:opacity-100" aria-label="Owl" title="">🦉</span>
      </SecretLoginTrigger>
      <a href="https://linkedin.com/in/kerljan" target="_blank" className="footer-icon" id="footer-linkedin" aria-label="LinkedIn">
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      </a>
      <a href="https://github.com/kurljan" target="_blank" className="footer-icon" id="footer-github" aria-label="GitHub">
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
      </a>
      <a href="mailto:sumontaokerljan@gmail.com" className="footer-icon" id="footer-email" aria-label="Email">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
      </a>
    </div>
    <p className="footer-copy">&#169;2025 Kerl Jan Sumontao &nbsp; All Rights Reserved.</p>
  </footer>

  

    </>
  );
}
