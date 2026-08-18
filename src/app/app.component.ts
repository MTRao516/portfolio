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
  tagline = 'Full-Stack Developer · Java · Spring Boot · Angular';
  email = 'thirupathiraomurala@gmail.com';
  phone = '+91 96400 46001';
  location = 'Hyderabad, Telangana — or fully Remote';
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
    { id: 'projects', label: 'Work' }, { id: 'skills', label: 'Skills' },
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
    `I'm a backend-first full-stack developer with 5+ years at AITITUDE IT — a product company — ` +
    `building Work360, a multi-tenant SaaS used across HRMS, careers, health, fleet, invoicing and security. ` +
    `I own features end-to-end: database, Spring Boot APIs and Angular UIs.`;

  stats: Stat[] = [
    { n: '5+', l: 'Years building SaaS' },
    { n: '20+', l: 'Production features' },
    { n: 'AI', l: 'features shipped (OpenAI)' },
    { n: '3', l: 'products shipped' },
  ];

  skills: SkillGroup[] = [
    { label: 'Backend', items: ['Java', 'Spring Boot', 'Spring Data JPA', 'Hibernate', 'REST APIs', 'JWT', 'Microservices'] },
    { label: 'Frontend', items: ['Angular', 'TypeScript', 'RxJS', 'HTML5 / CSS3', 'Bootstrap', 'PrimeNG', 'Angular Material'] },
    { label: 'Databases', items: ['MySQL', 'SQL Server', 'Redis'] },
    { label: 'Tools & Also', items: ['Git', 'Maven', 'Postman', 'Swagger', 'JUnit / Mockito', 'React', 'Python / FastAPI'] },
  ];

  impact: Impact[] = [
    { hi: 'AI-first', title: 'Brought AI into the product', desc: 'Introduced OpenAI to Work360 — a clinical assistant and a vision pipeline that reads odometer & fuel data from field photos.' },
    { hi: 'Near-zero', title: 'Manual data entry', desc: 'Fleet AI captures field-photo data automatically, replacing repetitive manual logging for the operations team.' },
    { hi: 'Faster', title: 'APIs & reports', desc: 'Resolved N+1 query bottlenecks with JOIN FETCH / projections and added Redis caching for hot, frequently-read data.' },
    { hi: '20+', title: 'Features · 3 products', desc: 'Delivered end-to-end across HRMS, Fleet, Health, Invoice and Security — plus a CAPEX portal and an AI voice agent.' },
  ];

  learning: string[] = [
    'LLM App Development', 'RAG (Retrieval-Augmented Generation)', 'Agentic AI · LangGraph',
    'OpenAI & Google Gemini APIs', 'Prompt Engineering', 'AWS & Docker',
  ];

  projects: Project[] = [
    { cat: 'AI · Health', icon: '🩺', name: 'Health360 AI Assistant', badge: 'OpenAI', featured: true,
      desc: 'The product\'s first AI feature — clinical support for doctors plus AI prescription templates, engineered with validation and doctor review before anything is saved.',
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
    { cat: 'AI · Fleet', icon: '🚚', name: 'Fleet AI — Vision Capture', badge: 'OpenAI', featured: true,
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
    { cat: 'Finance', icon: '💰', name: 'CAPEX Approval Portal', badge: 'Spring Boot 3', featured: true,
      desc: 'Multi-tenant capital-expenditure approvals with a configurable multi-level engine, budget encumbrance, and a SHA-256 hash-chained, QR-verifiable audit trail.',
      tech: ['Spring Boot 3', 'Java 17', 'React', 'SQL Server'],
      caseStudy: {
        problem: 'Capital-expenditure approvals needed configurable multi-level routing with a tamper-evident, verifiable audit trail.',
        approach: [
          'Built a configurable multi-level approval engine — amount-slab routing, parallel approvers and completion rules.',
          'Implemented budget encumbrance that flows into consumption as approvals progress.',
          'Designed a SHA-256 hash-chained audit trail with public QR verification of documents.',
          'Delivered end-to-end on Spring Boot 3 / Java 17 (SQL Server) with a React frontend, multi-tenant.',
        ],
        outcome: 'A separate product that proves end-to-end delivery and range beyond the core Work360 platform.',
      } },
    { cat: 'Learning · AI', icon: '🎙️', name: 'AI Voice Agent — Exploration', badge: 'Pilot', featured: true,
      desc: 'A hands-on learning project: a multilingual healthcare voice agent where I\'m going deep on LLMs, LangGraph orchestration and RAG.',
      tech: ['LangGraph', 'Gemini', 'RAG', 'Python'],
      caseStudy: {
        problem: 'Hospitals field repetitive inbound calls — and I wanted to master agentic, real-time voice AI on a real problem.',
        approach: [
          'Built a multilingual (English / Telugu / Hindi) voice receptionist as a deliberate learning project.',
          'Used a LangGraph state machine with an emergency-transfer guard and anti-hallucination checks.',
          'Real-time speech via Google Gemini Live with a Sarvam cascade as failover.',
          'RAG over PostgreSQL + pgvector; transactional actions delegated to a Java backend.',
        ],
        outcome: 'In pilot — live call-tested through telephony. My hands-on route to mastering LLMs, RAG and agentic AI.',
      } },
    { cat: 'HRMS', icon: '👥', name: 'HRMS & Employee Onboarding',
      desc: 'User onboarding with client/unit mapping, roles & permissions, user hierarchy and policy management across the HR module.',
      tech: ['Spring Boot', 'Angular', 'JWT'] },
    { cat: 'Operations', icon: '🚨', name: 'Incident Management',
      desc: 'Assignment groups, a Kanban board, status/audit trail and exportable reports on the multi-tenant platform.',
      tech: ['Spring Boot', 'Angular', 'MySQL'] },
    { cat: 'Security', icon: '🛡️', name: 'Patrol Point Visit Report',
      desc: 'GPS + Google Maps routing with PDF export — used by security clients as SLA-audit evidence, delivered across two UI skins.',
      tech: ['Google Maps', 'Spring Boot', 'Angular'] },
    { cat: 'KYC', icon: '🪪', name: 'Identity Verification (KYC)', badge: 'Signzy',
      desc: 'Unified Signzy integration across 10+ Indian documents — Aadhaar DigiLocker, PAN, ESIC, bank, driving licence, passport, GSTIN, EPFO — with Aadhaar name-matching and AWS Rekognition.',
      tech: ['Signzy', 'Spring Boot', 'AWS'] },
    { cat: 'HR', icon: '💼', name: 'Careers Management',
      desc: 'A careers module for the platform — create and manage job openings and applications end-to-end.',
      tech: ['Spring Boot', 'Angular', 'MySQL'] },
  ];

  experience: Job[] = [
    {
      role: 'Full-Stack Developer',
      org: 'AITITUDE IT Pvt Ltd · Product Company — Work360 (Multi-Tenant SaaS)',
      period: 'Feb 2021 – Present · Hyderabad',
      points: [
        'Introduced the product\'s first AI features (OpenAI) — Health360 clinical assistant and Fleet AI vision.',
        'Built HRMS onboarding, Careers, Incident Management, Patrol, Attendance and Invoice features end-to-end.',
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
  }
}
