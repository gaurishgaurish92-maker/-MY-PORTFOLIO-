# 🚀 GAURISH - Professional Cloud & DevOps Engineering Portfolio
> **Branding:** GAURISH  
> **Tagline:** *"Building Skills Today. Engineering Tomorrow."*  
> **Specialization:** B.Tech Information Technology Student | Aspiring Cloud & DevOps Engineer

A modern, high-performance personal portfolio website built with pure **HTML5, CSS3, and JavaScript**. Engineered specifically for corporate placement interviews, technical evaluations, and campus presentations.

---

## 🌟 Professional Highlights

- **Cosmic Black & Neon Purple Design**: Clean glassmorphism cards (`backdrop-filter: blur(16px)`), subtle glowing borders, and an interactive background canvas mesh.
- **Dark & Light Mode Switcher**: Seamless instant theme toggle with state preserved across sessions via `localStorage`.
- **Dynamic Hero Section**:
  - Executive branding: **GAURISH** with tagline *"Building Skills Today. Engineering Tomorrow."*
  - Typewriter animation highlighting key engineering specializations.
  - Profile photo container featuring a rotating neon gradient border and floating orbital badges (**AWS**, **Docker**, **Kubernetes**, **Terraform**).
  - Quantitative telemetry strip: 15+ Labs, 6+ Production Deployments, 99.9% High-Availability Target, 450+ Git Commits.
- **Executive About Section**:
  - Overview of B.Tech Information Technology foundation and distributed systems interest.
  - 4 Engineering Pillars: *Cloud Infrastructure*, *CI/CD & GitOps*, *Container Orchestration*, and *SRE & Observability*.
  - Glassmorphic **Architecture Standards & Engineering Mindset** card outlining declarative IaC, security scanning gates, and proactive telemetry.
- **Categorized Skills Matrix**:
  - Filterable by *Cloud Platforms*, *DevOps & IaC*, *Programming & Scripting*, and *Monitoring & Linux*.
  - Animated proficiency indicators and real-world technology competencies.
  - Strategic 4-phase learning and development roadmap.
- **Academic Credentials**:
  - Structured timeline for **Bachelor of Technology in Information Technology (2023 - 2027)** with coursework breakdown (Cloud Computing, OS, Networks, DBMS, System Design, DSA).
  - Senior Secondary Schooling (CBSE) background.
- **6 Production-Grade Cloud & DevOps Projects**:
  1. **Cloud-Native Microservices on AWS EKS** (Terraform, Ingress, ArgoCD, Prometheus)
  2. **Zero-Downtime GitOps CI/CD Pipeline** (GitHub Actions, Docker, Trivy CVE Gates)
  3. **AWS Serverless Cost Optimizer & FinOps Bot** (Python Boto3, EventBridge, Lambda)
  4. **Full-Stack Observability Suite** (Prometheus, Grafana, Loki, Alertmanager)
  5. **Multi-AZ Infrastructure with Terraform & Ansible** (VPC, NAT, Bastion, CIS Benchmarks)
  6. **High-Availability Container Stack** (Nginx Reverse Proxy, Redis, Docker Compose)
  - Detailed architecture modal with technology breakdown and GitHub repository links.
- **Downloadable & Printable ATS Resume**:
  - Bundled downloadable PDF resume (`assets/docs/Gaurish_Resume.pdf`).
  - Companion printable ATS web resume (`resume.html`) with 1-click **"Print / Save as PDF"** (`Ctrl + P`).
- **Interactive Portfolio QR Code**:
  - Pure HTML5 Canvas QR code generator for instant mobile portfolio access during interviews.
  - Copy URL and Save QR Code buttons.
- **Direct Contact Section**:
  - Interactive contact form with input validation and toast notification feedback.
  - Direct 1-click **"Copy Email"** button (`gaurish.devops@example.com`), LinkedIn, GitHub, and location cards.

---

## 📁 File Structure

```text
c:\Users\USER\Desktop\NEW/
├── index.html                   # Main portfolio webpage
├── resume.html                  # Standalone ATS-compliant printable web resume
├── README.md                    # Documentation & guide
├── css/
│   └── style.css                # CSS custom properties, dark/light themes, glassmorphism
├── js/
│   └── main.js                  # Particle canvas, typewriter, QR generator, filters, modal
└── assets/
    ├── docs/
    │   └── Gaurish_Resume.pdf   # Downloadable PDF resume
    └── images/
        ├── favicon.svg          # Neon brand monogram favicon
        ├── profile-avatar.svg   # Stylized illustrated engineer avatar
        ├── project-1.svg        # AWS EKS architecture diagram
        ├── project-2.svg        # GitOps CI/CD pipeline diagram
        ├── project-3.svg        # Cloud cost optimizer diagram
        ├── project-4.svg        # Prometheus & Grafana dashboard preview
        ├── project-5.svg        # Terraform VPC architecture diagram
        └── project-6.svg        # Nginx container cluster diagram
```

---

## ⚡ How to Run in Visual Studio Code

### Method 1: Using VS Code Live Server (Recommended)
1. Open **Visual Studio Code**.
2. Click **File -> Open Folder...** and select `c:\Users\USER\Desktop\NEW`.
3. If not already installed, press `Ctrl + Shift + X`, search for **Live Server** (by Ritwick Dey), and click **Install**.
4. Right-click on `index.html` in the file explorer and select **"Open with Live Server"**.
5. Your default browser will launch at `http://127.0.0.1:5500/index.html`.

### Method 2: Direct Browser Launch
1. Open your File Explorer and navigate to `c:\Users\USER\Desktop\NEW`.
2. Double-click on `index.html`. It will instantly open in your default web browser (Chrome, Edge, Firefox, Brave).

---

## 📸 How to Add Your Real Photo

1. Place your photo (e.g. `gaurish.jpg` or `profile.png`) into the `assets/images/` folder.
2. In `index.html` line 144, update the image source:
   ```html
   <img src="assets/images/gaurish.jpg" alt="GAURISH - Cloud & DevOps Engineer" class="avatar-image" id="profile-img">
   ```
3. Save the file. The rotating neon gradient border and floating badges will automatically frame your photo.

---

## 🛠️ Technologies Used

- **HTML5:** Semantic, accessible markup.
- **CSS3:** Custom variables, Glassmorphism (`backdrop-filter`), CSS Grid & Flexbox, smooth animations, responsive media queries.
- **JavaScript (ES6+):** Zero external framework dependencies. Interactive HTML5 canvas particle mesh, QR code generator, DOM event delegation, local storage theme state.
- **Font Awesome 6.5.1:** Modern cloud and developer iconography.
- **Google Fonts:** *Space Grotesk* (headings) & *Plus Jakarta Sans* (body text).
