/**
 * Prasad Munde Portfolio - Reactive Renderer & App Engine
 * Loads and renders everything dynamically from data.js
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Retrieve data from global scope or window
  const data = (typeof window !== 'undefined' && window.PORTFOLIO_DATA) ? window.PORTFOLIO_DATA : (typeof PORTFOLIO_DATA !== 'undefined' ? PORTFOLIO_DATA : {});

  // 2. Render all sections dynamically if data exists
  if (data.profile) renderHero(data.profile);
  if (data.education) renderEducation(data.education);
  if (data.experience && data.experience.length) renderExperience(data.experience);
  if (data.projects && data.projects.length) renderProjects(data.projects);
  if (data.skills && data.skills.length) renderSkills(data.skills);
  if (data.certifications && data.certifications.length) renderCertifications(data.certifications);
  if (data.profile) renderContact(data.profile);

  // 3. Initialize Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 4. Initialize Interactive Features
  initSpotlight();
  initProjectFilters();
  initNavObserver();
  initTechMarquee(data);
  init3DBlackBall();
  initScrollReveal();
});

/* ==========================================================================
   DYNAMIC RENDERERS (Data -> DOM)
   ========================================================================= */

function renderHero(profile) {
  if (!profile) return;
  const nameEl = document.getElementById('hero-name');
  const curvedNameEl = document.getElementById('hero-name-curved');
  const taglineEl = document.getElementById('hero-tagline');
  const bioEl = document.getElementById('hero-bio');
  const aboutBioContainer = document.getElementById('about-bio-container');

  if (nameEl && profile.name) nameEl.textContent = profile.name;
  if (curvedNameEl && profile.name) {
    const parts = profile.name.split(' ');
    if (parts.length === 2) {
      const first = parts[0];
      let last = parts[1];
      let lastHtml = last;
      if (last.endsWith('e')) {
        lastHtml = `${last.slice(0, -1)}<tspan class="hero-name-accent">e</tspan>`;
      }
      curvedNameEl.innerHTML = `<textPath href="#name-curve" startOffset="48.8%" text-anchor="end">${first}</textPath><textPath href="#name-curve" startOffset="51.2%" text-anchor="start">${lastHtml}</textPath>`;
    } else {
      curvedNameEl.innerHTML = `<textPath href="#name-curve" startOffset="50%" text-anchor="middle">${profile.name}</textPath>`;
    }
  }
  if (taglineEl && profile.tagline) taglineEl.textContent = profile.tagline;
  if (bioEl && profile.shortBio) bioEl.textContent = profile.shortBio;

  if (aboutBioContainer) {
    if (Array.isArray(profile.aboutBio)) {
      aboutBioContainer.innerHTML = profile.aboutBio.map(p => `<p class="about-p">${p}</p>`).join('');
    } else if (profile.extendedBio) {
      aboutBioContainer.innerHTML = profile.extendedBio.split('\n\n').map(p => `<p class="about-p">${p}</p>`).join('');
    }
  }

  const heroResumeBtn = document.getElementById('hero-resume-btn');
  if (heroResumeBtn && profile.resumeUrl) {
    heroResumeBtn.href = profile.resumeUrl;
  }
}

function renderEducation(edu) {
  const container = document.getElementById('edu-card');
  if (!container || !edu) return;

  container.innerHTML = `
    <div class="edu-top">
      <span class="edu-inst">${edu.institution}</span>
      <span class="edu-years">${edu.period}</span>
    </div>
    <div class="edu-deg">${edu.degree}</div>
    <div class="edu-foot">
      <span class="badge-highlight">CGPA: ${edu.cgpa}</span>
      <span class="edu-loc"><i data-lucide="map-pin" class="icon-xs"></i> ${edu.location}</span>
    </div>
  `;
}

function renderExperience(expList) {
  const container = document.getElementById('experience-list');
  if (!container || !expList || !expList.length) return;

  container.innerHTML = expList.map(exp => `
    <div class="experience-item">
      <div class="exp-top-row">
        <div class="exp-role-wrap">
          <h3 class="exp-title">${exp.role}</h3>
          <div class="exp-company-link">
            <span>${exp.company}</span>
            <span class="dot-sep">&bull;</span>
            <span class="exp-loc">${exp.location}</span>
          </div>
        </div>
        <div class="exp-period-badge">${exp.period}</div>
      </div>

      <div class="exp-body">
        <ul class="styled-list">
          ${exp.bullets.map(b => `
            <li>
              <div class="list-bullet"></div>
              <div>${b}</div>
            </li>
          `).join('')}
        </ul>
      </div>

      <div class="exp-stack-row">
        ${exp.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

function renderProjects(projects) {
  const container = document.getElementById('projects-grid');
  if (!container || !projects || !projects.length) return;

  const githubSvg = `<svg class="icon-sm" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>`;

  container.innerHTML = projects.map(p => `
    <div class="project-item" data-category="${p.category || 'all'}">
      <div class="project-header">
        <div class="project-title-wrap">
          <h3 class="project-name">${p.title}</h3>
          <span class="project-timeline">${p.period}</span>
        </div>
        ${p.githubUrl ? `
          <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="repo-link" title="View Source">
            ${githubSvg}
            <span>Source</span>
            <i data-lucide="arrow-up-right" class="icon-xs"></i>
          </a>
        ` : ''}
      </div>

      <p class="project-description">${p.description}</p>

      <ul class="styled-list">
        ${p.bullets.map(b => `
          <li>
            <div class="list-bullet"></div>
            <div>${b}</div>
          </li>
        `).join('')}
      </ul>

      <div class="project-tags">
        ${p.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

function renderSkills(skills) {
  const container = document.getElementById('skills-matrix');
  if (!container || !skills || !skills.length) return;

  const iconMap = {
    "Languages": "code-2",
    "Frameworks & Backend": "layers",
    "Databases & Storage": "database",
    "AI / ML & Agents": "bot",
    "Developer Tools & DevOps": "terminal"
  };

  container.innerHTML = skills.map(s => `
    <div class="skill-group">
      <div class="skill-group-header">
        <i data-lucide="${iconMap[s.category] || 'check'}" class="icon-sm skill-icon"></i>
        <h3 class="skill-category-name">${s.category}</h3>
      </div>
      <div class="skill-pill-list">
        ${s.items.map(item => `<span class="skill-badge">${item}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

function renderCertifications(certs) {
  const container = document.getElementById('certs-grid');
  if (!container || !certs || !certs.length) return;

  container.innerHTML = certs.map(c => `
    <div class="cert-item">
      <div class="cert-icon-wrap">
        <i data-lucide="award" class="icon-md cert-badge-icon"></i>
      </div>
      <div class="cert-details">
        <h3 class="cert-title">${c.title}</h3>
        <span class="cert-issuer">${c.issuer}</span>
      </div>
      <a href="${c.verifyUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" title="Verify">
        <span>Verify</span>
        <i data-lucide="external-link" class="icon-xs"></i>
      </a>
    </div>
  `).join('');
}

function renderContact(profile) {
  if (!profile || !profile.socials) return;
  const socialsContainer = document.getElementById('contact-socials');
  if (!socialsContainer) return;

  const githubSvg = `<svg class="icon-sm" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>`;
  const xSvg = `<svg class="icon-sm" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>`;
  const instaSvg = `<svg class="icon-sm" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>`;

  socialsContainer.innerHTML = `
    <a href="${profile.socials.github}" target="_blank" rel="noopener noreferrer" class="contact-social-link">
      ${githubSvg}
      <span>github.com/prasad-munde</span>
    </a>
    <a href="${profile.socials.linkedin}" target="_blank" rel="noopener noreferrer" class="contact-social-link">
      <i data-lucide="linkedin" class="icon-sm"></i>
      <span>linkedin.com/in/prasadmunde</span>
    </a>
    <a href="${profile.socials.leetcode}" target="_blank" rel="noopener noreferrer" class="contact-social-link">
      <i data-lucide="code" class="icon-sm"></i>
      <span>leetcode.com/_prasadmunde_</span>
    </a>
    ${profile.socials.twitter ? `
      <a href="${profile.socials.twitter}" target="_blank" rel="noopener noreferrer" class="contact-social-link">
        ${xSvg}
        <span>x.com/__prsd__</span>
      </a>
    ` : ''}
    ${profile.socials.instagram ? `
      <a href="${profile.socials.instagram}" target="_blank" rel="noopener noreferrer" class="contact-social-link">
        ${instaSvg}
        <span>instagram.com/_prasadmunde_</span>
      </a>
    ` : ''}
  `;
}

/* ==========================================================================
   INTERACTIONS & ENGINES
   ========================================================================== */

function initSpotlight() {
  document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

function initProjectFilters() {
  const filterPills = document.querySelectorAll('.filter-pill');
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.getAttribute('data-filter');

      const projectCards = document.querySelectorAll('.project-card');
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        if (filter === 'all' || category.includes(filter)) {
          card.classList.remove('hide');
        } else {
          card.classList.add('hide');
        }
      });
    });
  });
}

function initTerminal(data) {
  const cmdTrigger = document.getElementById('cmd-trigger');
  const cmdModal = document.getElementById('cmd-modal');
  const cmdClose = document.getElementById('cmd-close');
  const cmdInput = document.getElementById('cmd-input');
  const cmdOutput = document.getElementById('cmd-output');

  function openCmd() {
    cmdModal?.classList.add('open');
    setTimeout(() => cmdInput?.focus(), 100);
  }

  function closeCmd() {
    cmdModal?.classList.remove('open');
  }

  cmdTrigger?.addEventListener('click', openCmd);
  cmdClose?.addEventListener('click', closeCmd);
  cmdModal?.addEventListener('click', (e) => {
    if (e.target === cmdModal) closeCmd();
  });

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (cmdModal?.classList.contains('open')) closeCmd();
      else openCmd();
    } else if (e.key === 'Escape' && cmdModal?.classList.contains('open')) {
      closeCmd();
    }
  });

  const commands = {
    help: () => `Available commands:
• <span class="cmd-highlight">skills</span>     - View technical stack
• <span class="cmd-highlight">projects</span>   - List projects
• <span class="cmd-highlight">experience</span> - View work history
• <span class="cmd-highlight">contact</span>    - Email and profile links
• <span class="cmd-highlight">cv</span>         - Open Resume PDF
• <span class="cmd-highlight">theme</span>      - Switch visual theme
• <span class="cmd-highlight">clear</span>      - Clear terminal screen`,

    skills: () => `<span class="cmd-highlight">Technical Stack:</span>
• Languages: Python, Java, C++, SQL, JavaScript
• Frameworks: FastAPI, Flask, SQLAlchemy, Docker, Git, Linux
• Databases: PostgreSQL, Redis, Milvus, ChromaDB, MongoDB
• AI/ML: LangGraph, LangChain, RAG Systems, PEFT/LoRA, Transformers`,

    projects: () => `<span class="cmd-highlight">Projects:</span>
1. <b>Krecon</b>: Multi-agent creator collaboration platform (FastAPI, Milvus, LangGraph)
2. <b>IndiraGPT</b>: RAG campus intelligence helpdesk (LLaMA 3.3, ChromaDB)
3. <b>URL Shortener</b>: High-performance Redis-cached API (FastAPI, Docker)`,

    experience: () => `<span class="cmd-highlight">Experience:</span>
<b>AI Intern @ Diebold Nixdorf</b> (Jun 2025 – Oct 2025)
• Modular RAG system for multi-LLM backends
• MobileNetV2 UI classification (90% accuracy)
• PEFT/LoRA fine-tuning`,

    contact: () => `<span class="cmd-highlight">Contact:</span>
• Email: prasadmunde999@gmail.com
• GitHub: github.com/prasad-munde
• LinkedIn: linkedin.com/in/prasadmunde
• LeetCode: leetcode.com/_prasadmunde_
• X: x.com/__prsd__
• Instagram: instagram.com/_prasadmunde_`,

    cv: () => {
      window.open('./PrasadMunde_CV.pdf', '_blank');
      return 'Opening CV...';
    },

    draw: () => {
      document.getElementById('toggle-draw-btn')?.click();
      return 'Toggled Draw Mode!';
    },

    theme: () => {
      document.getElementById('theme-toggle')?.click();
      return 'Theme toggled!';
    },

    clear: () => {
      if (cmdOutput) cmdOutput.innerHTML = '';
      return '';
    }
  };

  cmdInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = cmdInput.value.trim().toLowerCase();
      cmdInput.value = '';
      if (!val) return;

      const userLine = document.createElement('div');
      userLine.className = 'cmd-line';
      userLine.innerHTML = `<span class="cmd-prompt">&gt;</span> ${val}`;
      cmdOutput?.appendChild(userLine);

      if (commands[val]) {
        const resp = commands[val]();
        if (resp) {
          const respLine = document.createElement('div');
          respLine.className = 'cmd-line';
          respLine.innerHTML = resp.replace(/\n/g, '<br>');
          cmdOutput?.appendChild(respLine);
        }
      } else {
        const errorLine = document.createElement('div');
        errorLine.className = 'cmd-line';
        errorLine.innerHTML = `Unknown command: "<span class="cmd-highlight">${val}</span>". Type <span class="cmd-highlight">help</span> for commands.`;
        cmdOutput?.appendChild(errorLine);
      }
      if (cmdOutput) cmdOutput.scrollTop = cmdOutput.scrollHeight;
    }
  });

  document.querySelectorAll('.cmd-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) {
        cmdInput.value = cmd;
        const event = new KeyboardEvent('keydown', { key: 'Enter' });
        cmdInput.dispatchEvent(event);
      }
    });
  });
}

function updateNavIndicator(activeLink) {
  const indicator = document.getElementById('nav-indicator');
  const navContainer = document.getElementById('main-nav');
  if (!indicator || !navContainer) return;

  if (!activeLink) {
    activeLink = navContainer.querySelector('.nav-link.active') || navContainer.querySelector('.nav-link');
  }

  if (activeLink) {
    const linkRect = activeLink.getBoundingClientRect();
    const navRect = navContainer.getBoundingClientRect();

    const left = linkRect.left - navRect.left;
    const top = linkRect.top - navRect.top;
    const width = linkRect.width;
    const height = linkRect.height;

    indicator.style.opacity = '1';
    indicator.style.transform = `translate3d(${left}px, ${top}px, 0)`;
    indicator.style.width = `${width}px`;
    indicator.style.height = `${height}px`;
  }
}

function initNavObserver() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links .nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      updateNavIndicator(link);
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
            updateNavIndicator(link);
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, { threshold: 0.25 });

  sections.forEach(s => observer.observe(s));

  // Initialize indicator position
  setTimeout(() => updateNavIndicator(), 80);
  window.addEventListener('resize', () => updateNavIndicator());
  window.addEventListener('load', () => updateNavIndicator());
}

/* ==========================================================================
   Horizontal Infinite Scrolling Bar: Tools & Technologies Marquee
   ========================================================================== */
function initTechMarquee(data) {
  const track = document.getElementById('tech-marquee-track');
  if (!track) return;

  const defaultTech = [
    'Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker',
    'LangGraph', 'LangChain', 'RAG Systems', 'PyTorch', 'Milvus',
    'ChromaDB', 'Next.js', 'TypeScript', 'Docker Compose', 'Linux',
    'Git & GitHub', 'AWS S3', 'SQLAlchemy', 'PEFT / LoRA', 'REST APIs',
    'MongoDB', 'Java', 'C++', 'LangSmith'
  ];

  const techSet = new Set(defaultTech);

  if (data) {
    if (Array.isArray(data.skills)) {
      data.skills.forEach(cat => {
        if (Array.isArray(cat.items)) cat.items.forEach(t => techSet.add(t));
      });
    }
    if (Array.isArray(data.projects)) {
      data.projects.forEach(p => {
        if (Array.isArray(p.tech)) p.tech.forEach(t => techSet.add(t));
      });
    }
  }

  const techList = Array.from(techSet);
  // Duplicate list for seamless infinite marquee scroll loop
  const seamlessList = [...techList, ...techList];

  track.innerHTML = seamlessList.map(tech => `
    <div class="marquee-item">
      <span>${tech}</span>
    </div>
  `).join('');
}

/* ==========================================================================
   Smooth Page Load & Scroll Entrance Transitions
   ========================================================================== */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-item, .section-container, .experience-item, .project-item, .skill-group, .cert-item');
  
  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px'
  });

  elements.forEach(el => {
    el.classList.add('reveal-item');
    observer.observe(el);
  });
}

/* ==========================================================================
   3D Solid Black Ball (Obsidian Sphere) Engine (Drag + Smooth 3D Rotation)
   ========================================================================== */
function init3DBlackBall() {
  const canvas = document.getElementById('sphere-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const size = 140;
  canvas.width = size * dpr;
  canvas.height = size * dpr;
  ctx.scale(dpr, dpr);

  const centerX = size / 2;
  const centerY = size / 2;
  const R = 46;

  let rotX = -0.25;
  let rotY = 0.45;
  let velX = 0;
  let velY = 0;
  let isDragging = false;
  let lastMouseX = 0;
  let lastMouseY = 0;

  // Drag interaction
  canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
  });

  window.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const dx = e.clientX - lastMouseX;
      const dy = e.clientY - lastMouseY;
      rotY += dx * 0.02;
      rotX += dy * 0.02;
      velY = dx * 0.012;
      velX = dy * 0.012;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    }
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) isDragging = false;
  });

  // Touch support
  canvas.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      lastMouseX = e.touches[0].clientX;
      lastMouseY = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (isDragging && e.touches.length === 1) {
      const dx = e.touches[0].clientX - lastMouseX;
      const dy = e.touches[0].clientY - lastMouseY;
      rotY += dx * 0.02;
      rotX += dy * 0.02;
      velY = dx * 0.012;
      velX = dy * 0.012;
      lastMouseX = e.touches[0].clientX;
      lastMouseY = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    if (isDragging) isDragging = false;
  });

  // Click spin
  canvas.addEventListener('click', () => {
    velY += (Math.random() > 0.5 ? 1 : -1) * 0.22;
  });

  function render() {
    ctx.clearRect(0, 0, size, size);

    // 1. Draw 3D Solid Obsidian Black Ball
    // Light source from top-left, slightly moving with rotation
    const lightOffsetX = -R * 0.32 + Math.sin(rotY) * 3;
    const lightOffsetY = -R * 0.32 + Math.sin(rotX) * 3;

    const sphereGrad = ctx.createRadialGradient(
      centerX + lightOffsetX, centerY + lightOffsetY, R * 0.06,
      centerX, centerY, R
    );
    sphereGrad.addColorStop(0, '#4a4450');     // Soft specular highlight
    sphereGrad.addColorStop(0.22, '#252028');  // Mid satin obsidian
    sphereGrad.addColorStop(0.65, '#120f14');  // Deep solid charcoal body
    sphereGrad.addColorStop(1, '#070608');     // Shadow rim edge

    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, R, 0, Math.PI * 2);
    ctx.fillStyle = sphereGrad;
    ctx.fill();

    // Subtle crisp rim edge (no glow)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // 2. Subtle minimalist rotating latitude bands giving 3D spherical depth
    const numRings = 3;
    for (let r = 0; r < numRings; r++) {
      const ringAngle = rotY + (r * Math.PI) / numRings;
      const sinA = Math.sin(ringAngle);
      const cosA = Math.cos(ringAngle);

      // Only draw ring on front half
      if (cosA > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(
          centerX,
          centerY,
          R * Math.abs(cosA),
          R,
          rotX * 0.3,
          0,
          Math.PI * 2
        );
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.04 * cosA})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }
    }

    ctx.restore();

    // 3. Animation update
    if (!isDragging) {
      rotY += 0.018 + velY;
      rotX += Math.sin(Date.now() * 0.001) * 0.003 + velX;
      velX *= 0.94;
      velY *= 0.94;
    }

    requestAnimationFrame(render);
  }

  render();
}
