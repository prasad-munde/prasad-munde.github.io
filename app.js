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
  initAvatar3D();
  initProjectFilters();
  initTerminal(data);
  initThemeEngine();
  initNavObserver();
  initDrawingCanvas();
});

/* ==========================================================================
   DYNAMIC RENDERERS (Data -> DOM)
   ========================================================================= */

function renderHero(profile) {
  if (!profile) return;
  const nameEl = document.getElementById('hero-name');
  const taglineEl = document.getElementById('hero-tagline');
  const bioEl = document.getElementById('hero-bio');
  const avatarName = document.getElementById('avatar-name');
  const aboutBioContainer = document.getElementById('about-bio-container');
  const heroImg = document.getElementById('hero-avatar-img');
  const avatarLabel = document.getElementById('avatar-label');

  if (nameEl && profile.name) nameEl.textContent = profile.name;
  if (taglineEl && profile.tagline) taglineEl.textContent = profile.tagline;
  if (bioEl && profile.shortBio) bioEl.textContent = profile.shortBio;
  if (avatarName && profile.name) avatarName.textContent = profile.name;

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

  if (profile.avatarUrl && heroImg) {
    heroImg.src = profile.avatarUrl;
    heroImg.style.display = 'block';
    if (avatarLabel) avatarLabel.style.display = 'none';
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
    <div class="experience-card glass-card">
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
    <div class="project-card glass-card" data-category="${p.category || 'all'}">
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
    <div class="skill-box glass-card">
      <div class="skill-box-header">
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
    <div class="cert-card glass-card">
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
    <a href="${profile.socials.github}" target="_blank" rel="noopener noreferrer" class="cta-social-link">
      ${githubSvg}
      <span>github.com/prasad-munde</span>
    </a>
    <a href="${profile.socials.linkedin}" target="_blank" rel="noopener noreferrer" class="cta-social-link">
      <i data-lucide="linkedin" class="icon-sm"></i>
      <span>linkedin.com/in/prasadmunde</span>
    </a>
    <a href="${profile.socials.leetcode}" target="_blank" rel="noopener noreferrer" class="cta-social-link">
      <i data-lucide="code" class="icon-sm"></i>
      <span>leetcode.com/_prasadmunde_</span>
    </a>
    ${profile.socials.twitter ? `
      <a href="${profile.socials.twitter}" target="_blank" rel="noopener noreferrer" class="cta-social-link">
        ${xSvg}
        <span>x.com/__prsd__</span>
      </a>
    ` : ''}
    ${profile.socials.instagram ? `
      <a href="${profile.socials.instagram}" target="_blank" rel="noopener noreferrer" class="cta-social-link">
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

function initAvatar3D() {
  const avatarCard = document.getElementById('avatar-card');
  if (!avatarCard) return;

  avatarCard.addEventListener('mousemove', (e) => {
    const rect = avatarCard.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = -(y / rect.height) * 16;
    const rotateY = (x / rect.width) * 16;
    avatarCard.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03) translateY(-4px)`;
  });

  avatarCard.addEventListener('mouseleave', () => {
    avatarCard.style.transform = 'rotate(-3.5deg)';
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

function initThemeEngine() {
  const themeToggle = document.getElementById('theme-toggle');
  
  // Default to light (#F1F5F9) if not explicitly set to dark
  const savedTheme = localStorage.getItem('pm-theme');
  const initial = (savedTheme === 'dark') ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', initial);

  if (themeToggle) {
    themeToggle.onclick = function(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      const active = document.documentElement.getAttribute('data-theme') || 'light';
      const target = (active === 'light') ? 'dark' : 'light';
      
      document.documentElement.setAttribute('data-theme', target);
      localStorage.setItem('pm-theme', target);
      showToast(`Theme: ${target.toUpperCase()}`);
    };
  }
}

function initNavObserver() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links .nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(s => observer.observe(s));
}

function initDrawingCanvas() {
  const canvas = document.getElementById('draw-canvas');
  const toolbar = document.getElementById('draw-toolbar');
  const toggleBtn = document.getElementById('toggle-draw-btn');
  const btnLabel = document.getElementById('draw-btn-label');
  const colorDots = document.querySelectorAll('.color-dot');
  const sizeBtns = document.querySelectorAll('.size-btn');
  const eraserBtn = document.getElementById('draw-eraser-btn');
  const clearBtn = document.getElementById('draw-clear-btn');
  const downloadBtn = document.getElementById('draw-download-btn');

  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let isDrawing = false;
  let isDrawMode = false;
  let currentColor = '#2563eb';
  let currentSize = 3;
  let isEraser = false;
  let lastX = 0;
  let lastY = 0;

  // Offscreen canvas to preserve drawings during resize
  let offscreenCanvas = document.createElement('canvas');
  let offscreenCtx = offscreenCanvas.getContext('2d');

  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (canvas.width > 0 && canvas.height > 0) {
      offscreenCanvas.width = canvas.width;
      offscreenCanvas.height = canvas.height;
      offscreenCtx.drawImage(canvas, 0, 0);
    }

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    if (offscreenCanvas.width > 0 && offscreenCanvas.height > 0) {
      ctx.drawImage(offscreenCanvas, 0, 0, width, height);
    }
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Toggle Draw Mode
  toggleBtn?.addEventListener('click', () => {
    isDrawMode = !isDrawMode;
    document.body.classList.toggle('draw-mode-active', isDrawMode);
    toggleBtn.classList.toggle('active', isDrawMode);
    toolbar?.classList.toggle('active', isDrawMode);

    if (btnLabel) {
      btnLabel.textContent = isDrawMode ? 'Scratchpad (On)' : 'Scratchpad';
    }
    showToast(isDrawMode ? 'Scratchpad Enabled! Doodle anywhere.' : 'Scratchpad Disabled');
  });

  function getCoords(e) {
    if (e.touches && e.touches.length > 0) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  }

  function startDraw(e) {
    if (!isDrawMode) return;
    isDrawing = true;
    const { x, y } = getCoords(e);
    lastX = x;
    lastY = y;
  }

  function draw(e) {
    if (!isDrawing || !isDrawMode) return;
    e.preventDefault();
    const { x, y } = getCoords(e);

    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (isEraser) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = currentSize * 5;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = currentSize;
    }

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.restore();

    lastX = x;
    lastY = y;
  }

  function stopDraw() {
    isDrawing = false;
  }

  canvas.addEventListener('mousedown', startDraw);
  canvas.addEventListener('mousemove', draw);
  window.addEventListener('mouseup', stopDraw);

  canvas.addEventListener('touchstart', startDraw, { passive: false });
  canvas.addEventListener('touchmove', draw, { passive: false });
  window.addEventListener('touchend', stopDraw);

  // Colors
  colorDots.forEach(dot => {
    dot.addEventListener('click', () => {
      colorDots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
      currentColor = dot.getAttribute('data-color') || '#2563eb';
      isEraser = false;
      eraserBtn?.classList.remove('active');
    });
  });

  // Brush Sizes
  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentSize = parseInt(btn.getAttribute('data-size') || '3', 10);
    });
  });

  // Eraser
  eraserBtn?.addEventListener('click', () => {
    isEraser = !isEraser;
    eraserBtn.classList.toggle('active', isEraser);
    if (isEraser) {
      colorDots.forEach(d => d.classList.remove('active'));
    } else {
      document.querySelector(`.color-dot[data-color="${currentColor}"]`)?.classList.add('active');
    }
  });

  // Clear
  clearBtn?.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    offscreenCanvas.width = 0;
    offscreenCanvas.height = 0;
    showToast('Canvas cleared!');
  });

  // Download
  downloadBtn?.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = `prasad-munde-scratchpad-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    showToast('Scratchpad snapshot saved!');
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}
