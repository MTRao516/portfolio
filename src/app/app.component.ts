import { Component, AfterViewInit, ElementRef, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CaseStudy { problem: string; approach: string[]; outcome: string; }
interface Project {
  cat: string; icon: string; name: string; badge?: string; desc: string; tech: string[];
  featured?: boolean; caseStudy?: CaseStudy;
}
interface Tech { name: string; url: string; }
interface Impact { hi: string; title: string; desc: string; }
interface SkillGroup { label: string; items: string[]; }
interface Capability { title: string; blurb: string; chips: string[]; }
interface Job { role: string; org: string; period: string; points: string[]; }
interface Stat { n: string; l: string; }

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  private host = inject(ElementRef<HTMLElement>);

  name = 'Murala Thirupathi';
  alias = 'MTR';
  tagline = 'Full-Stack Developer · Java · Spring Boot · Angular · AI';
  email = 'thirupathiraomurala@gmail.com';
  phone = '+91 96400 46001';
  location = 'Hyderabad, Telangana · Open to new roles — Hybrid or Remote';
  linkedin = 'https://www.linkedin.com/in/thirupathi-murala/';
  github = 'https://github.com/MTRao516';
  year = 2026;

  // ---- UI state ----
  scrollProgress = 0;
  theme: 'dark' | 'light' = 'dark';
  menuOpen = false;
  copied = false;
  activeSection = 'top';
  openProject: Project | null = null;
  private lastFocused: HTMLElement | null = null;

  sections = ['about', 'impact', 'projects', 'skills', 'learning', 'experience', 'contact'];
  navItems = [
    { id: 'about', label: 'About' }, { id: 'impact', label: 'Impact' },
    { id: 'projects', label: 'Work' }, { id: 'skills', label: 'Expertise' },
    { id: 'learning', label: 'Learning' }, { id: 'experience', label: 'Experience' },
  ];

  // Profile photo: drop a square image at public/me.jpg. Hidden gracefully until it exists.
  photo = 'me.jpg';
  photoOk = true;
  onPhotoError(): void { this.photoOk = false; }

  constructor() {
    try {
      const saved = localStorage.getItem('mtr-theme') as 'dark' | 'light' | null;
      const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
      this.theme = saved ?? (prefersLight ? 'light' : 'dark');
    } catch { this.theme = 'dark'; }
    document.documentElement.setAttribute('data-theme', this.theme);
  }

  toggleTheme(): void {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', this.theme);
    try { localStorage.setItem('mtr-theme', this.theme); } catch { /* ignore */ }
  }

  toggleMenu(): void { this.menuOpen = !this.menuOpen; }
  closeMenu(): void { this.menuOpen = false; }

  copyEmail(): void {
    try {
      navigator.clipboard.writeText(this.email);
      this.copied = true;
      setTimeout(() => (this.copied = false), 1800);
    } catch { /* clipboard unavailable */ }
  }

  openCase(p: Project, ev: Event): void {
    if (!p.caseStudy) return;
    this.lastFocused = ev.target as HTMLElement;
    this.openProject = p;
    document.body.style.overflow = 'hidden';
    setTimeout(() => (this.host.nativeElement.querySelector('.modal-close') as HTMLElement | null)?.focus(), 0);
  }
  closeCase(): void {
    this.openProject = null;
    document.body.style.overflow = '';
    this.lastFocused?.focus();
  }

  // keep keyboard focus inside the open dialog (WCAG)
  onModalKeydown(e: KeyboardEvent): void {
    if (e.key !== 'Tab') return;
    const modal = this.host.nativeElement.querySelector('.modal') as HTMLElement | null;
    if (!modal) return;
    const nodes = Array.from(modal.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])')) as HTMLElement[];
    if (nodes.length === 0) return;
    const first = nodes[0], last = nodes[nodes.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && active === first) { last.focus(); e.preventDefault(); }
    else if (!e.shiftKey && active === last) { first.focus(); e.preventDefault(); }
  }

  get featuredProjects(): Project[] { return this.projects.filter(p => p.featured); }
  get moreProjects(): Project[] { return this.projects.filter(p => !p.featured); }

  @HostListener('document:keydown.escape') onEsc(): void {
    if (this.openProject) this.closeCase();
    else if (this.menuOpen) this.closeMenu();
  }

  @HostListener('window:scroll') onScroll(): void {
    const el = document.documentElement;
    const max = el.scrollHeight - el.clientHeight;
    this.scrollProgress = max > 0 ? (el.scrollTop / max) * 100 : 0;
    // active section
    const y = el.scrollTop + 120;
    let current = 'top';
    for (const id of this.sections) {
      const sec = document.getElementById(id);
      if (sec && sec.offsetTop <= y) current = id;
    }
    this.activeSection = current;
  }

  stack: Tech[] = [
    { name: 'Java', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    { name: 'Spring Boot', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
    { name: 'Angular', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg' },
    { name: 'TypeScript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'React', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Python', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'MySQL', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    { name: 'Redis', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
    { name: 'Git', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  ];

  intro =
    `I'm a backend-first full-stack developer (Java · Spring Boot · Angular) with 5+ years building a ` +
    `multi-tenant enterprise SaaS platform end-to-end — database, Spring Boot APIs and Angular UIs — across ` +
    `HR, health, fleet, invoicing and security. I shipped the product's first production AI features, and ` +
    `I'm now going deep on agentic AI and RAG.`;

  stats: Stat[] = [
    { n: '5+', l: 'Years building SaaS' },
    { n: '20+', l: 'Production features' },
    { n: '2', l: 'AI systems in production' },
    { n: '3', l: 'products shipped' },
  ];
  // count-up display (starts at 0 for numeric stats, animated into view)
  statDisplay: string[] = this.stats.map(s => /^\d/.test(s.n) ? '0' + s.n.replace(/^\d+/, '') : s.n);

  private animateStats(): void {
    const dur = 1100, start = performance.now();
    const targets = this.stats.map(s => {
      const m = /^(\d+)(.*)$/.exec(s.n);
      return m ? { num: +m[1], suffix: m[2], text: null as string | null } : { num: 0, suffix: '', text: s.n };
    });
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const e = 1 - Math.pow(1 - p, 3); // easeOutCubic
      this.statDisplay = targets.map(t => t.text !== null ? t.text : Math.round(t.num * e) + t.suffix);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  // premium cursor-follow spotlight on cards
  onCardMove(e: MouseEvent): void {
    const el = e.currentTarget as HTMLElement;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    el.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }
  onCardLeave(e: MouseEvent): void {
    (e.currentTarget as HTMLElement).style.setProperty('--mx', '-300px');
  }

  expertise: Capability[] = [
    { title: 'Backend Engineering',
      blurb: 'Design and build Java / Spring Boot services — REST APIs, JPA/Hibernate, and performance tuning (N+1 fixes, Redis caching) on a multi-tenant, JWT-secured platform.',
      chips: ['Java', 'Spring Boot', 'Spring Data JPA', 'Hibernate', 'REST APIs', 'JWT', 'MySQL', 'Redis'] },
    { title: 'AI Integration',
      blurb: 'Shipped the product\'s first production AI (OpenAI) and building agentic AI — with structured-output validation, RAG and human-in-the-loop as first-class concerns.',
      chips: ['OpenAI', 'Google Gemini', 'RAG', 'LangGraph', 'Prompt Engineering'] },
    { title: 'Full-Stack Delivery',
      blurb: 'Own features end-to-end — database schema → Spring Boot APIs → Angular UIs. Comfortable in React and Python/FastAPI when a project calls for it.',
      chips: ['Angular', 'TypeScript', 'RxJS', 'React', 'Python / FastAPI', 'HTML5 / CSS3'] },
    { title: 'Foundations & Communication',
      blurb: 'A decade teaching Computer Science (as HOD) means I explain complex systems simply — in design discussions, code reviews and mentoring.',
      chips: ['System Thinking', 'Mentoring', 'Code Review', 'CS Fundamentals'] },
  ];

  impact: Impact[] = [
    { hi: 'AI-first', title: 'Brought AI into the product', desc: 'Introduced OpenAI to the platform — a clinical assistant and a vision pipeline that reads odometer & fuel data from field photos.' },
    { hi: 'Near-zero', title: 'Manual data entry', desc: 'A computer-vision feature captures field-photo data automatically, replacing repetitive manual logging.' },
    { hi: 'Faster', title: 'APIs & reports', desc: 'Resolved N+1 query bottlenecks with JOIN FETCH / projections and added Redis caching for hot, frequently-read data.' },
    { hi: '20+', title: 'Features · 3 products', desc: 'Delivered end-to-end across HR, fleet, health, invoice and security — plus a capital-expenditure approval platform and a voice-AI agent.' },
  ];

  learning: string[] = [
    'LLM App Development', 'RAG (Retrieval-Augmented Generation)', 'Agentic AI · LangGraph',
    'OpenAI & Google Gemini APIs', 'Prompt Engineering', 'AWS & Docker',
  ];

  projects: Project[] = [
    { cat: 'AI · Health', icon: '🩺', name: 'AI Clinical Assistant', badge: 'OpenAI', featured: true,
      desc: 'The platform\'s first AI feature — contextual clinical support for doctors plus AI-suggested prescription templates, engineered with validation and doctor review before anything is saved.',
      tech: ['OpenAI', 'Spring Boot', 'Angular'],
      caseStudy: {
        problem: 'Doctors spent consultation time on repetitive documentation, and the product had no AI assistance at all.',
        approach: [
          'As the first engineer to bring AI into the product, designed a request → prompt → model → validation → review pipeline.',
          'Engineered structured-output parsing and business-rule validation so results are checked, not trusted blindly.',
          'Kept a mandatory doctor-review step — AI output is never persisted unverified.',
          'Integrated cleanly into the multi-tenant Spring Boot backend and Angular UI.',
        ],
        outcome: 'Shipped the product\'s first production AI feature — AI-assisted suggestions with a human safety checkpoint.',
      } },
    { cat: 'AI · Vision', icon: '🚚', name: 'AI Vision Data Capture', badge: 'OpenAI', featured: true,
      desc: 'Reads odometer and fuel-receipt data straight from field photos into validated, structured records — removing manual data entry.',
      tech: ['OpenAI Vision', 'Spring Boot', 'AWS'],
      caseStudy: {
        problem: 'Field staff logged odometer readings and fuel receipts by hand — slow, tedious and error-prone.',
        approach: [
          'Built an image-upload → vision-extraction → validation pipeline.',
          'Extracted structured fields (reading, amount, date) from photos via OpenAI vision.',
          'Added confidence checks with a manual fallback for low-confidence captures.',
          'Stored originals for audit and wired the flow to Spring Boot + AWS.',
        ],
        outcome: 'Automated data capture from field photos, removing repetitive manual logging for the operations team.',
      } },
    { cat: 'Finance', icon: '💰', name: 'Capital-Expenditure Approval Platform', badge: 'Spring Boot 3', featured: true,
      desc: 'A capital-expenditure approval product with a configurable multi-level engine, budget tracking, and a tamper-evident, verifiable audit trail.',
      tech: ['Spring Boot 3', 'Java 17', 'React', 'SQL Server'],
      caseStudy: {
        problem: 'Capital-expenditure approvals needed configurable multi-level routing with a tamper-evident, verifiable audit trail.',
        approach: [
          'Built a configurable multi-level approval engine — amount-slab routing, parallel approvers and completion rules.',
          'Implemented budget tracking that flows from commitment into consumption as approvals progress.',
          'Designed a tamper-evident, verifiable audit trail for every action.',
          'Delivered end-to-end on Spring Boot 3 / Java 17 (SQL Server) with a React frontend, multi-tenant.',
        ],
        outcome: 'A product that proves end-to-end delivery across a robust backend and a modern frontend.',
      } },
    { cat: 'AI · Exploration', icon: '🎙️', name: 'Conversational Voice-AI Agent', featured: true,
      desc: 'A hands-on project: a multilingual voice agent exploring agentic AI — LLM orchestration, real-time speech and retrieval-augmented generation (RAG).',
      tech: ['LangGraph', 'Gemini', 'RAG', 'Python'],
      caseStudy: {
        problem: 'I wanted to master agentic, real-time voice AI hands-on, on a realistic conversational problem.',
        approach: [
          'Built a multilingual voice agent using a LangGraph state machine with guard nodes and anti-hallucination checks.',
          'Real-time speech-to-speech with a cascade fallback for reliability.',
          'Retrieval-augmented generation (RAG) over a vector store to ground answers in real data.',
          'Focused on the reliability engineering around the model — not just the model call.',
        ],
        outcome: 'A hands-on route to mastering LLMs, RAG and agentic AI — my current growth area.',
      } },
    { cat: 'HRMS', icon: '👥', name: 'HRMS & Employee Onboarding',
      desc: 'User onboarding with client/unit mapping, roles & permissions, user hierarchy and policy management across the HR module.',
      tech: ['Spring Boot', 'Angular', 'JWT'],
      caseStudy: {
        problem: 'Onboarding users at scale needed correct client/unit mapping, role assignment and policy setup — slow and error-prone when handled manually.',
        approach: [
          'Built the onboarding flow with client/unit mapping and role & permission assignment.',
          'Modelled the user hierarchy and policy management within the HR module.',
          'Enforced access with JWT + RBAC on the multi-tenant platform.',
          'Delivered the Angular screens and Spring Boot APIs end-to-end.',
        ],
        outcome: 'A streamlined onboarding module that maps each user to the right client, unit, roles and policies from day one.',
      } },
    { cat: 'Operations', icon: '🚨', name: 'Incident Management',
      desc: 'Assignment groups, a Kanban board, status/audit trail and exportable reports on the multi-tenant platform.',
      tech: ['Spring Boot', 'Angular', 'MySQL'],
      caseStudy: {
        problem: 'Teams needed a structured way to log, assign, track and audit operational incidents instead of ad-hoc handling.',
        approach: [
          'Built assignment groups and routing so incidents reach the right owners.',
          'Implemented a Kanban board for the status flow (New → Assigned → In Progress → Resolved → Closed).',
          'Added a status/audit trail so every transition is recorded with who and when.',
          'Provided exportable reports for review and compliance.',
        ],
        outcome: 'An end-to-end incident workflow with a visual board and a complete audit trail on the multi-tenant platform.',
      } },
    { cat: 'Security', icon: '🛡️', name: 'Field Patrol & Compliance Reporting',
      desc: 'GPS + Google Maps routing with PDF export — used as SLA-audit evidence for field-security compliance.',
      tech: ['Google Maps', 'Spring Boot', 'Angular'],
      caseStudy: {
        problem: 'Field-security operations needed verifiable proof that guards actually visited each checkpoint, for SLA audits.',
        approach: [
          'Captured GPS coordinates + timestamp at each patrol scan as tamper-resistant proof.',
          'Plotted the visit route on Google Maps for a clear visual record.',
          'Generated exportable PDF reports for SLA-audit evidence.',
          'Delivered the Angular UI and Spring Boot APIs end-to-end.',
        ],
        outcome: 'Location-verified patrol reports used as SLA and compliance evidence.',
      } },
    { cat: 'KYC', icon: '🪪', name: 'Identity Verification (KYC)',
      desc: 'A unified integration for third-party identity verification across 10+ Indian identity documents, with name-matching and face verification.',
      tech: ['Spring Boot', 'AWS', 'REST APIs'],
      caseStudy: {
        problem: 'Verifying identity required checking many different Indian documents reliably and consistently — hard to do one integration at a time.',
        approach: [
          'Integrated a third-party verification provider into a single, unified framework.',
          'Supported 10+ Indian identity documents behind one consistent API.',
          'Added name-matching and face verification for stronger identity checks.',
          'Persisted verified records with hardened, secure API handling.',
        ],
        outcome: 'One framework that verifies 10+ identity documents with name-matching and face checks.',
      } },
    { cat: 'HR', icon: '💼', name: 'Careers Management',
      desc: 'A careers module for the platform — create and manage job openings and applications end-to-end.',
      tech: ['Spring Boot', 'Angular', 'MySQL'],
      caseStudy: {
        problem: 'The platform needed a single place to publish job openings and manage applications, rather than tracking them off-system.',
        approach: [
          'Built CRUD for job openings with their fields and lifecycle.',
          'Managed applications end-to-end against each opening.',
          'Delivered Spring Boot APIs and an Angular UI integrated with the platform.',
        ],
        outcome: 'A self-contained careers module for creating openings and handling applications end-to-end.',
      } },
  ];

  experience: Job[] = [
    {
      role: 'Full-Stack Developer',
      org: 'AITITUDE IT Pvt Ltd · Product Company — Multi-Tenant Enterprise SaaS',
      period: 'Feb 2021 – Present · Hyderabad',
      points: [
        'Introduced the platform\'s first AI features (OpenAI) — an AI clinical assistant and a computer-vision data-capture feature.',
        'Built HR onboarding, careers, incident-management, field-patrol, attendance and invoicing features end-to-end.',
        'Delivered 20+ production features across HR, Fleet, Health, Invoice and Security modules.',
        'Built features within the platform\'s multi-tenant, JWT-secured architecture (tenant isolation, RBAC).',
        'Performance tuning — resolved N+1 queries (JOIN FETCH / projections) and added Redis caching.',
        'Part of the team that migrated the platform from Angular 16 to 19 (AdminLTE 4 + Bootstrap 5).',
      ],
    },
    {
      role: 'Lecturer & Head of Department — Computer Science',
      org: 'Suvidya Degree College & Sri Chaitanya',
      period: '2008 – 2021 · Telangana',
      points: [
        'Taught Java, C and Visual Basic to hundreds of students; led the CS department as HOD.',
        'The foundation — strong fundamentals, communication and leadership — behind a deliberate move into software engineering.',
      ],
    },
  ];

  ngAfterViewInit(): void {
    const els = this.host.nativeElement.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    els.forEach((el: Element) => io.observe(el));

    // count-up when the stats strip scrolls into view
    const statsEl = this.host.nativeElement.querySelector('.stats');
    if (statsEl) {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) { this.statDisplay = this.stats.map(s => s.n); }
      else {
        const so = new IntersectionObserver((ents) => {
          ents.forEach(en => { if (en.isIntersecting) { this.animateStats(); so.disconnect(); } });
        }, { threshold: 0.4 });
        so.observe(statsEl);
      }
    }
  }
}
