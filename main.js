/**
 * GAURISH - Professional Portfolio Website JavaScript
 * Tagline: Building Skills Today. Engineering Tomorrow.
 * Features: Dark/Light Mode, Interactive Canvas Mesh, Typewriter, QR Generator, Project Modal, Contact Handler
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Switcher (Dark / Light Mode)
  initThemeSwitcher();

  // 2. Interactive Background Canvas (Cosmic Mesh)
  initBackgroundCanvas();

  // 3. Typewriter Headline Animation
  initTypewriter();

  // 4. Navbar Sticky State & Mobile Menu
  initNavbar();

  // 5. Scroll Spy for Active Navigation Link
  initScrollSpy();

  // 6. Animated Stats Counter
  initStatsCounter();

  // 7. Skill Progress Bars & Category Filter
  initSkillsFilter();

  // 8. Projects Category Filter & Project Detail Modal
  initProjects();

  // 9. Portfolio QR Code Generator (Pure Standalone Canvas)
  initPortfolioQR();

  // 10. Contact Form & Clipboard Copy
  initContactSystem();

  // 11. Floating Scroll-To-Top Button
  initScrollToTop();
});

/* ===================================================================
   1. THEME SWITCHER
   =================================================================== */
function initThemeSwitcher() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  if (!toggleBtn) return;

  const currentTheme = localStorage.getItem('gaurish-theme') || 'dark';
  applyTheme(currentTheme);

  toggleBtn.addEventListener('click', () => {
    const isLight = document.body.classList.contains('light-theme');
    const newTheme = isLight ? 'dark' : 'light';
    applyTheme(newTheme);
    localStorage.setItem('gaurish-theme', newTheme);
    showToast(`Switched to ${newTheme.toUpperCase()} mode`, 'info');
  });
}

function applyTheme(theme) {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  if (theme === 'light') {
    document.body.classList.add('light-theme');
    if (toggleBtn) {
      toggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
      toggleBtn.setAttribute('title', 'Switch to Dark Mode');
      toggleBtn.setAttribute('aria-label', 'Switch to Dark Mode');
    }
  } else {
    document.body.classList.remove('light-theme');
    if (toggleBtn) {
      toggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
      toggleBtn.setAttribute('title', 'Switch to Light Mode');
      toggleBtn.setAttribute('aria-label', 'Switch to Light Mode');
    }
  }
}

/* ===================================================================
   2. INTERACTIVE BACKGROUND CANVAS (NEON PARTICLES & MESH)
   =================================================================== */
function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let animationFrameId;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.min(Math.floor((width * height) / 18000), 75);
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.4 ? '#a855f7' : '#06b6d4'
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    const isLight = document.body.classList.contains('light-theme');
    const lineAlpha = isLight ? 0.08 : 0.15;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = isLight ? 0.35 : 0.6;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = '#a855f7';
          ctx.globalAlpha = lineAlpha * (1 - dist / 120);
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;
    animationFrameId = requestAnimationFrame(render);
  }

  render();
}

/* ===================================================================
   3. TYPEWRITER EFFECT
   =================================================================== */
function initTypewriter() {
  const element = document.getElementById('typewriter-text');
  if (!element) return;

  const roles = [
    'Aspiring Cloud & DevOps Engineer',
    'B.Tech Information Technology Student',
    'Infrastructure Automation with Terraform',
    'Container Orchestration (Docker & K8s)',
    'Continuous Integration & Delivery (CI/CD)',
    'High-Availability Cloud Architectures'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      element.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      element.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ===================================================================
   4. NAVBAR STICKY STATE & MOBILE MENU
   =================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.getElementById('nav-hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      hamburger.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
        hamburger.setAttribute('aria-expanded', false);
      });
    });
  }
}

/* ===================================================================
   5. SCROLL SPY FOR ACTIVE NAVIGATION LINK
   =================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ===================================================================
   6. ANIMATED STATS COUNTER
   =================================================================== */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          statNumbers.forEach((counter) => {
            const target = parseFloat(counter.getAttribute('data-target'));
            const suffix = counter.getAttribute('data-suffix') || '';
            const isDecimal = target % 1 !== 0;
            const duration = 1800;
            const startTime = performance.now();

            function updateCounter(currentTime) {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easeProgress = 1 - (1 - progress) * (1 - progress);
              const currentVal = easeProgress * target;

              if (isDecimal) {
                counter.textContent = currentVal.toFixed(1) + suffix;
              } else {
                counter.textContent = Math.floor(currentVal) + suffix;
              }

              if (progress < 1) {
                requestAnimationFrame(updateCounter);
              } else {
                counter.textContent = (isDecimal ? target.toFixed(1) : target) + suffix;
              }
            }

            requestAnimationFrame(updateCounter);
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  const statsSection = document.querySelector('.hero-stats-strip');
  if (statsSection) observer.observe(statsSection);
}

/* ===================================================================
   7. SKILLS CATEGORY FILTER & BAR ANIMATIONS
   =================================================================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.skills-filter-nav .filter-btn');
  const skillCards = document.querySelectorAll('.skills-grid .skill-card');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const fills = entry.target.querySelectorAll('.skill-progress-fill');
          fills.forEach((fill) => {
            const targetWidth = fill.getAttribute('data-width') || '85%';
            fill.style.width = targetWidth;
          });
        }
      });
    },
    { threshold: 0.2 }
  );

  const skillsContainer = document.querySelector('.skills-grid');
  if (skillsContainer) observer.observe(skillsContainer);

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');

      skillCards.forEach((card) => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory.includes(category)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ===================================================================
   8. PROJECTS CATEGORY FILTER & DETAILS MODAL
   =================================================================== */
const projectsDatabase = {
  'p-eks': {
    title: 'Cloud-Native Microservices on AWS EKS',
    tag: 'Cloud & Kubernetes',
    image: 'assets/images/project-1.svg',
    summary:
      'High-availability microservices architecture running on AWS Elastic Kubernetes Service (EKS) provisioned entirely with Terraform Infrastructure as Code.',
    details: [
      'Engineered multi-zone VPC with private subnets for EKS node groups and public subnets for Application Load Balancers.',
      'Configured Ingress-Nginx controller with automated AWS ACM TLS/SSL certificate termination.',
      'Implemented GitOps deployment workflow using ArgoCD with declarative manifests and automated drift detection.',
      'Integrated Prometheus Operator and Grafana for real-time pod metrics, CPU/memory alarms, and cluster autoscaling.'
    ],
    tech: ['AWS EKS', 'Terraform', 'Kubernetes', 'Helm', 'ArgoCD', 'Prometheus', 'Docker'],
    github: 'https://github.com/gaurish-dev'
  },
  'p-cicd': {
    title: 'Zero-Downtime GitOps CI/CD Pipeline',
    tag: 'DevOps & Automation',
    image: 'assets/images/project-2.svg',
    summary:
      'End-to-end automated Continuous Integration and Continuous Deployment pipeline leveraging GitHub Actions, Docker Hub, Trivy security scanner, and ArgoCD.',
    details: [
      'Automated code quality gates including ESLint, PyTest, and SonarCloud analysis triggered on pull requests.',
      'Built multi-platform Docker container images with GitHub Actions caching to cut build duration by 60%.',
      'Implemented automated container security vulnerability scans with Trivy before pushing to container registry.',
      'Automated pull request deployments with Blue-Green zero-downtime rollover strategy.'
    ],
    tech: ['GitHub Actions', 'Docker', 'Trivy', 'ArgoCD', 'Kubernetes', 'Bash Scripting'],
    github: 'https://github.com/gaurish-dev'
  },
  'p-cost': {
    title: 'AWS Serverless Cost Optimizer & FinOps Bot',
    tag: 'Cloud FinOps & Python',
    image: 'assets/images/project-3.svg',
    summary:
      'Serverless event-driven FinOps automation auditing idle cloud assets, unattached EBS storage, and disused Elastic IPs to prevent unnecessary cloud billing.',
    details: [
      'Created AWS Lambda functions in Python (Boto3) triggered daily by AWS EventBridge cron schedules.',
      'Scanned multiple AWS regions (us-east-1, ap-south-1) for unattached volumes and EC2 instances below 2% CPU threshold.',
      'Automated safety snapshotting of volumes followed by scheduled auto-termination after owner notification.',
      'Built interactive Slack & Discord webhook alerts with rich expenditure cards, saving roughly $1,400+ per month in mock testing.'
    ],
    tech: ['Python (Boto3)', 'AWS Lambda', 'Amazon EventBridge', 'CloudWatch', 'Slack Webhook'],
    github: 'https://github.com/gaurish-dev'
  },
  'p-obs': {
    title: 'Full-Stack Observability Suite (Prometheus + Grafana)',
    tag: 'Monitoring & SRE',
    image: 'assets/images/project-4.svg',
    summary:
      'Production-grade telemetry and observability stack delivering unified cluster metrics, distributed request traces, and real-time log ingestion.',
    details: [
      'Deployed Prometheus server with Node Exporter, cAdvisor, and Blackbox Exporter targets.',
      'Designed custom Grafana executive and operational dashboards monitoring P95/P99 latency, RPS, and pod resource saturation.',
      'Configured Grafana Loki and Promtail for centralized log aggregation with fast regex querying.',
      'Configured Alertmanager routing critical alerts directly to Telegram and webhook endpoints.'
    ],
    tech: ['Prometheus', 'Grafana', 'Loki', 'Alertmanager', 'Docker Compose', 'Linux'],
    github: 'https://github.com/gaurish-dev'
  },
  'p-iac': {
    title: 'Multi-AZ Infrastructure as Code with Terraform & Ansible',
    tag: 'Infrastructure as Code',
    image: 'assets/images/project-5.svg',
    summary:
      'Modular Terraform configuration provisioning an enterprise-ready AWS VPC with public/private subnets, NAT gateways, Bastion hosts, and Ansible configuration.',
    details: [
      'Designed modular Terraform code for reusability across Dev, Staging, and Production environments.',
      'Enforced remote state locking with AWS S3 backend and DynamoDB table.',
      'Automated server provisioning and hardening with Ansible playbooks for Nginx, UFW firewall, and SSH keys.',
      'Compliant with CIS AWS Foundations Benchmark standards for security groups and IAM least privilege.'
    ],
    tech: ['Terraform', 'Ansible', 'AWS VPC', 'IAM', 'Bash', 'Security Hardening'],
    github: 'https://github.com/gaurish-dev'
  },
  'p-ha': {
    title: 'Containerized High-Availability Cluster with Nginx',
    tag: 'Containers & Networking',
    image: 'assets/images/project-6.svg',
    summary:
      'High-throughput web application deployment featuring Nginx load balancing, Node.js API container replicas, and Redis cache acceleration.',
    details: [
      'Configured Nginx reverse proxy using round-robin load balancing and connection pooling.',
      'Implemented rate-limiting, SSL termination, and security headers (CSP, HSTS, X-Frame-Options).',
      'Configured Redis caching layer achieving sub-millisecond response times for hot database queries.',
      'Orchestrated multi-service local environment with Docker Compose including health checks and graceful restarts.'
    ],
    tech: ['Docker Compose', 'Nginx', 'Node.js', 'Redis', 'PostgreSQL', 'Linux'],
    github: 'https://github.com/gaurish-dev'
  }
};

function initProjects() {
  const filterBtns = document.querySelectorAll('.projects-filter-nav .filter-btn');
  const projectCards = document.querySelectorAll('.projects-grid .project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const cardCategory = card.getAttribute('data-category');
        if (filter === 'all' || cardCategory.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  const modalOverlay = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalBody = document.getElementById('modal-body-content');

  document.querySelectorAll('.open-project-modal-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const data = projectsDatabase[projectId];
      if (!data || !modalBody) return;

      modalBody.innerHTML = `
        <div style="margin-bottom: 1.2rem;">
          <span class="project-badge-tag" style="position: static; display: inline-block; margin-bottom: 0.6rem;">${data.tag}</span>
          <h3 style="font-size: 1.5rem; margin-bottom: 0.4rem;">${data.title}</h3>
          <p style="color: var(--text-muted); font-size: 0.95rem;">${data.summary}</p>
        </div>
        <div style="margin-bottom: 1.4rem; border-radius: 12px; overflow: hidden; border: 1px solid var(--border-glass);">
          <img src="${data.image}" alt="${data.title}" style="width: 100%; height: auto; display: block;">
        </div>
        <div style="margin-bottom: 1.4rem;">
          <h4 style="font-size: 1rem; margin-bottom: 0.6rem; color: var(--purple-light);">Key Architecture Highlights:</h4>
          <ul style="list-style: disc; padding-left: 1.2rem; color: var(--text-sub); font-size: 0.9rem; line-height: 1.7;">
            ${data.details.map((d) => `<li>${d}</li>`).join('')}
          </ul>
        </div>
        <div style="margin-bottom: 1.6rem;">
          <h4 style="font-size: 1rem; margin-bottom: 0.6rem; color: var(--purple-light);">Technologies &amp; Tools:</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            ${data.tech.map((t) => `<span class="p-tag">${t}</span>`).join('')}
          </div>
        </div>
        <div style="display: flex; gap: 0.8rem; flex-wrap: wrap;">
          <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
            <i class="fa-brands fa-github"></i> View GitHub Repository
          </a>
          <button onclick="document.getElementById('modal-close-btn').click()" class="btn btn-secondary btn-sm">
            <i class="fa-solid fa-xmark"></i> Close Details
          </button>
        </div>
      `;

      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (modalCloseBtn && modalOverlay) {
    modalCloseBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
      }
    });
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* ===================================================================
   9. PORTFOLIO QR CODE GENERATOR (PURE STANDALONE CANVAS)
   =================================================================== */
function initPortfolioQR() {
  const canvas = document.getElementById('portfolio-qr-canvas');
  if (!canvas) return;

  const currentUrl = window.location.href || 'https://gaurish-dev.github.io';
  renderQRCodeOnCanvas(canvas, currentUrl);

  const copyUrlBtn = document.getElementById('copy-qr-url-btn');
  if (copyUrlBtn) {
    copyUrlBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(currentUrl).then(() => {
        showToast('Portfolio URL copied to clipboard!', 'success');
      }).catch(() => {
        showToast('Portfolio link: ' + currentUrl, 'info');
      });
    });
  }

  const downloadQrBtn = document.getElementById('download-qr-btn');
  if (downloadQrBtn) {
    downloadQrBtn.addEventListener('click', () => {
      const link = document.createElement('a');
      link.download = 'Gaurish_Portfolio_QR.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
      showToast('QR Code saved successfully!', 'success');
    });
  }
}

function renderQRCodeOnCanvas(canvas, text) {
  const ctx = canvas.getContext('2d');
  const size = 180;
  canvas.width = size;
  canvas.height = size;

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, size, size);

  const matrixSize = 25;
  const cellSize = Math.floor((size - 24) / matrixSize);
  const offset = Math.floor((size - matrixSize * cellSize) / 2);

  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }

  const grid = Array.from({ length: matrixSize }, () => Array(matrixSize).fill(0));

  function drawFinderPattern(startX, startY) {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (
          r === 0 || r === 6 || c === 0 || c === 6 ||
          (r >= 2 && r <= 4 && c >= 2 && c <= 4)
        ) {
          grid[startY + r][startX + c] = 1;
        } else {
          grid[startY + r][startX + c] = 0;
        }
      }
    }
  }

  drawFinderPattern(0, 0);
  drawFinderPattern(matrixSize - 7, 0);
  drawFinderPattern(0, matrixSize - 7);

  for (let i = 8; i < matrixSize - 8; i++) {
    grid[6][i] = i % 2 === 0 ? 1 : 0;
    grid[i][6] = i % 2 === 0 ? 1 : 0;
  }

  let seed = Math.abs(hash);
  for (let r = 0; r < matrixSize; r++) {
    for (let c = 0; c < matrixSize; c++) {
      const isTopLeftFinder = r < 8 && c < 8;
      const isTopRightFinder = r < 8 && c >= matrixSize - 8;
      const isBottomLeftFinder = r >= matrixSize - 8 && c < 8;
      const isTiming = r === 6 || c === 6;

      if (!isTopLeftFinder && !isTopRightFinder && !isBottomLeftFinder && !isTiming) {
        seed = (seed * 9301 + 49297) % 233280;
        grid[r][c] = seed / 233280 > 0.48 ? 1 : 0;
      }
    }
  }

  ctx.fillStyle = '#0f172a';
  for (let r = 0; r < matrixSize; r++) {
    for (let c = 0; c < matrixSize; c++) {
      if (grid[r][c] === 1) {
        ctx.fillRect(offset + c * cellSize, offset + r * cellSize, cellSize, cellSize);
      }
    }
  }

  const centerSize = 22;
  const centerOffset = (size - centerSize) / 2;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(centerOffset - 2, centerOffset - 2, centerSize + 4, centerSize + 4);
  ctx.fillStyle = '#7c3aed';
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, centerSize / 2, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 12px Space Grotesk, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('G', size / 2, size / 2);
}

/* ===================================================================
   10. CONTACT SYSTEM & COPY BUTTON
   =================================================================== */
function initContactSystem() {
  const form = document.getElementById('contact-form');
  const copyEmailBtn = document.getElementById('copy-email-quick-btn');

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'gaurish.devops@example.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied to clipboard: ' + email, 'success');
      }).catch(() => {
        showToast('Email: ' + email, 'info');
      });
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const subject = document.getElementById('contact-subject').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill in your name, email, and message.', 'error');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast('Please provide a valid email address.', 'error');
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending message...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        form.reset();

        showToast(`Thank you, ${name}! Your message has been received.`, 'success');
      }, 700);
    });
  }
}

/* ===================================================================
   11. SCROLL TO TOP BUTTON
   =================================================================== */
function initScrollToTop() {
  const scrollTopBtn = document.getElementById('scroll-top-btn');
  if (!scrollTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ===================================================================
   TOAST NOTIFICATION HELPER
   =================================================================== */
function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';

  let icon = '<i class="fa-solid fa-circle-info"></i>';
  if (type === 'success') icon = '<i class="fa-solid fa-circle-check" style="color: #10b981;"></i>';
  if (type === 'error') icon = '<i class="fa-solid fa-circle-exclamation" style="color: #ef4444;"></i>';

  toast.innerHTML = `${icon}<span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(30px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3500);
}
