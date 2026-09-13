import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CaseStudy {
  problem: string;
  approach: string[];
  outcome: string;
}

interface Project {
  id: string;
  cat: string;
  name: string;
  badge?: string;
  desc: string;
  proof: string;
  tech: string[];
  featured?: boolean;
  caseStudy: CaseStudy;
}

interface Impact {
  hi: string;
  label: string;
  desc: string;
}

interface Capability {
  title: string;
  blurb: string;
  chips: string[];
}

interface Job {
  role: string;
  org: string;
  period: string;
  points: string[];
}

interface Signal {
  label: string;
  value: string;
}

interface Fit {
  title: string;
  desc: string;
}

interface Tech {
  name: string;
  url: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit, OnDestroy {
  private host = inject(ElementRef<HTMLElement>);

  name = 'Murala Thirupathi';
  initials = 'MTR';
  email = 'thirupathiraomurala@gmail.com';
  phone = '+91 96400 46001';
  location = 'Hyderabad, Telangana';
  linkedin = 'https://www.linkedin.com/in/thirupathi-murala/';
  github = 'https://github.com/MTRao516';
  year = new Date().getFullYear();

  theme: 'dark' | 'light' = 'dark';
  menuOpen = false;
  copied = false;
  photoOk = true;
  scrollProgress = 0;
  activeSection = 'top';
  openProject: Project | null = null;
  hydTime = '';

  private timer: ReturnType<typeof setInterval> | null = null;
  private lastFocused: HTMLElement | null = null;
  private observers: IntersectionObserver[] = [];

  sections = ['top', 'proof', 'work', 'craft', 'trajectory', 'experience', 'contact'];
  navItems = [
    { id: 'proof', label: 'Proof' },
    { id: 'work', label: 'Work' },
    { id: 'craft', label: 'Craft' },
    { id: 'trajectory', label: 'Growth' },
    { id: 'experience', label: 'Experience' },
  ];

  headline = 'Murala Thirupathi';

  roleLine =
    'Backend-first full-stack developer turning complex enterprise workflows into fast, reliable SaaS.';

  intro =
    'I build Java, Spring Boot and Angular products end to end across HR, health, fleet, invoicing and security. At AITITUDE IT, I shipped production AI features, tuned slow APIs, and translated complex business workflows into software teams can trust.';

  signals: Signal[] = [
    { label: 'Core stack', value: 'Java / Spring Boot / Angular' },
    { label: 'Experience', value: '5+ years building SaaS' },
    { label: 'Differentiator', value: 'Teacher turned product engineer' },
    { label: 'Now building', value: 'Agentic AI, RAG, voice systems' },
  ];

  fitMatrix: Fit[] = [
    {
      title: 'Full-stack product engineer',
      desc: 'Owns database, Spring Boot APIs and Angular screens without losing the product context.'
    },
    {
      title: 'Java backend specialist',
      desc: 'Comfortable with REST APIs, JPA, performance tuning, tenant-aware security and production debugging.'
    },
    {
      title: 'Practical AI integrator',
      desc: 'Adds OpenAI, Gemini and RAG features with validation, fallbacks and human review.'
    }
  ];

  impact: Impact[] = [
    {
      hi: 'AI-first',
      label: 'Introduced product AI',
      desc: 'Built the platform\'s first OpenAI-backed clinical assistant and vision capture workflows with validation and human review.'
    },
    {
      hi: '20+',
      label: 'Production features',
      desc: 'Delivered across HRMS, health, fleet, invoice, security, careers, incident management and approvals.'
    },
    {
      hi: '3',
      label: 'Product surfaces',
      desc: 'Worked across a multi-tenant enterprise platform, a CapEx approval product, and a multilingual voice-AI project.'
    },
    {
      hi: '13 yrs',
      label: 'CS teaching foundation',
      desc: 'Former Computer Science lecturer and HOD, bringing clear communication, mentoring and fundamentals into engineering work.'
    },
  ];

  projects: Project[] = [
    {
      id: 'clinical',
      cat: 'AI + Health',
      name: 'AI Clinical Assistant',
      badge: 'OpenAI',
      featured: true,
      desc: 'Contextual clinical support for doctors with prescription-template suggestions, structured validation and required doctor review.',
      proof: 'First production AI feature in the product.',
      tech: ['OpenAI', 'Spring Boot', 'Angular', 'Validation'],
      caseStudy: {
        problem: 'Doctors were losing consultation time to repetitive documentation, and the product had no AI assistance.',
        approach: [
          'Designed the prompt, model, validation and review pipeline from scratch.',
          'Parsed structured model output and checked it against product rules before use.',
          'Kept doctor review mandatory so AI output is never blindly persisted.',
          'Integrated the feature cleanly into the multi-tenant Spring Boot backend and Angular UI.'
        ],
        outcome: 'Shipped AI-assisted clinical suggestions with a human safety checkpoint and a reusable pattern for future AI work.'
      }
    },
    {
      id: 'vision',
      cat: 'AI + Vision',
      name: 'Vision Data Capture',
      badge: 'Field Ops',
      featured: true,
      desc: 'Reads odometer and fuel-receipt data from field photos into structured records, reducing manual logging.',
      proof: 'Replaced repetitive field data entry with verified extraction.',
      tech: ['OpenAI Vision', 'Spring Boot', 'AWS', 'Audit'],
      caseStudy: {
        problem: 'Field staff manually entered odometer readings and fuel receipts, which was slow and error-prone.',
        approach: [
          'Built an upload, extraction, validation and fallback workflow.',
          'Extracted structured fields including reading, amount and date from images.',
          'Added low-confidence fallback paths instead of treating model output as guaranteed truth.',
          'Stored originals for audit and connected the workflow to Spring Boot services.'
        ],
        outcome: 'Created a practical computer-vision workflow that saves operations time while preserving reviewability.'
      }
    },
    {
      id: 'capex',
      cat: 'Finance',
      name: 'Capital-Expenditure Approval Platform',
      badge: 'Spring Boot 3',
      featured: true,
      desc: 'Configurable multi-level approvals, budget tracking and a tamper-evident audit trail for CapEx decisions.',
      proof: 'A full product-grade workflow, not a demo screen.',
      tech: ['Java 17', 'Spring Boot 3', 'React', 'SQL Server'],
      caseStudy: {
        problem: 'CapEx approvals needed configurable routing, budget visibility and verifiable history.',
        approach: [
          'Built amount-slab routing with parallel approvers and completion rules.',
          'Tracked commitment and budget consumption through the approval lifecycle.',
          'Designed an audit trail for every action and status change.',
          'Delivered backend and frontend across a multi-tenant product surface.'
        ],
        outcome: 'A robust approval product that demonstrates architecture, workflow modelling and end-to-end delivery.'
      }
    },
    {
      id: 'voice',
      cat: 'AI + Exploration',
      name: 'Conversational Voice-AI Agent',
      badge: 'RAG',
      featured: true,
      desc: 'A multilingual voice agent exploring real-time speech, retrieval grounding and agentic orchestration.',
      proof: 'Hands-on growth project for the next generation of AI apps.',
      tech: ['LangGraph', 'Gemini', 'RAG', 'Python'],
      caseStudy: {
        problem: 'I wanted to learn agentic, real-time voice AI by building a realistic assistant rather than only reading docs.',
        approach: [
          'Modelled the agent as a LangGraph state machine with guard nodes.',
          'Grounded responses with retrieval to reduce unsupported answers.',
          'Added speech-to-speech flow with fallback handling.',
          'Focused on reliability around the model call: state, memory, grounding and review.'
        ],
        outcome: 'A practical learning path into LLM apps, RAG and agentic systems.'
      }
    },
    {
      id: 'hrms',
      cat: 'HRMS',
      name: 'Employee Onboarding',
      desc: 'Client and unit mapping, roles, permissions, user hierarchy and policy setup across the HR module.',
      proof: 'Reduced setup friction in a multi-tenant HR workflow.',
      tech: ['Spring Boot', 'Angular', 'JWT', 'RBAC'],
      caseStudy: {
        problem: 'Onboarding needed correct mapping, role assignment and policy setup without off-system handling.',
        approach: [
          'Built onboarding flows with client and unit mapping.',
          'Modelled hierarchy, policy management and role assignment.',
          'Enforced tenant-aware access using JWT and RBAC.',
          'Delivered APIs and Angular screens end to end.'
        ],
        outcome: 'A streamlined onboarding module where users land with the correct structure and permissions.'
      }
    },
    {
      id: 'incident',
      cat: 'Operations',
      name: 'Incident Management',
      desc: 'Assignment groups, Kanban workflow, status audit trail and exportable reports for operations teams.',
      proof: 'Turned ad-hoc incident tracking into an auditable workflow.',
      tech: ['Spring Boot', 'Angular', 'MySQL', 'Reports'],
      caseStudy: {
        problem: 'Teams needed a structured way to log, assign, track and audit incidents.',
        approach: [
          'Built assignment groups and routing.',
          'Implemented a Kanban status flow from new to closed.',
          'Recorded every transition with actor and timestamp.',
          'Added exportable reports for review and compliance.'
        ],
        outcome: 'An operational workflow with clear ownership, visibility and auditability.'
      }
    },
    {
      id: 'patrol',
      cat: 'Security',
      name: 'Field Patrol Compliance',
      desc: 'GPS checkpoint capture, Google Maps route views and PDF exports for SLA evidence.',
      proof: 'Made field visits visible, verifiable and reportable.',
      tech: ['Google Maps', 'Spring Boot', 'Angular', 'PDF'],
      caseStudy: {
        problem: 'Security teams needed proof that checkpoint visits happened on time and in the right place.',
        approach: [
          'Captured GPS coordinates and timestamps at patrol scans.',
          'Displayed visits on Google Maps for route-level review.',
          'Generated PDF reports for SLA and compliance evidence.',
          'Integrated the UI and APIs within the platform workflow.'
        ],
        outcome: 'Location-verified patrol reporting that supports audits and client confidence.'
      }
    },
    {
      id: 'kyc',
      cat: 'KYC',
      name: 'Identity Verification Framework',
      desc: 'Unified third-party verification for 10+ Indian identity documents with matching and face verification.',
      proof: 'One secure integration pattern for many document types.',
      tech: ['Spring Boot', 'AWS', 'REST APIs', 'Security'],
      caseStudy: {
        problem: 'Identity checks were fragmented across many document types and needed a reliable integration model.',
        approach: [
          'Created a unified service layer over the verification provider.',
          'Supported 10+ Indian identity documents behind one consistent API.',
          'Added name matching and face verification for stronger checks.',
          'Handled verified records with secure API and persistence patterns.'
        ],
        outcome: 'A reusable identity-verification framework for multiple document workflows.'
      }
    }
  ];

  expertise: Capability[] = [
    {
      title: 'Backend Architecture',
      blurb: 'REST APIs, JPA/Hibernate, tenant-aware design, JWT/RBAC, query tuning, Redis caching and production debugging.',
      chips: ['Java', 'Spring Boot', 'JPA', 'Hibernate', 'MySQL', 'Redis', 'JWT']
    },
    {
      title: 'Enterprise Frontend',
      blurb: 'Angular interfaces for dense operational workflows: forms, boards, tables, validation, exports and role-based views.',
      chips: ['Angular', 'TypeScript', 'RxJS', 'HTML', 'CSS', 'Bootstrap']
    },
    {
      title: 'AI Product Integration',
      blurb: 'OpenAI and Gemini integrations shaped around validation, structured outputs, fallback paths and human review.',
      chips: ['OpenAI', 'Gemini', 'RAG', 'LangGraph', 'Prompt Design']
    },
    {
      title: 'Communication',
      blurb: 'A teaching background that helps in code reviews, mentoring, requirement translation and clear technical discussion.',
      chips: ['Mentoring', 'CS Fundamentals', 'Review', 'Documentation']
    }
  ];

  stack: Tech[] = [
    { name: 'Java', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    { name: 'Spring Boot', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
    { name: 'Angular', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg' },
    { name: 'TypeScript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'React', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Python', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'MySQL', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    { name: 'Redis', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
    { name: 'Git', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' }
  ];

  learning = [
    'LLM application architecture',
    'RAG and retrieval quality',
    'Agentic workflows with LangGraph',
    'OpenAI and Google Gemini APIs',
    'Docker and AWS deployment',
    'Production observability'
  ];

  experience: Job[] = [
    {
      role: 'Full-Stack Developer',
      org: 'AITITUDE IT Pvt Ltd - Product Company',
      period: 'Feb 2021 - Present, Hyderabad',
      points: [
        'Introduced the platform\'s first AI features using OpenAI: a clinical assistant and a field-photo vision capture workflow.',
        'Delivered 20+ production features across HR, fleet, health, invoice, security, careers and incident modules.',
        'Built features end to end within a multi-tenant, JWT-secured platform with RBAC and tenant isolation.',
        'Improved API and report performance by resolving N+1 query issues and adding Redis caching for hot paths.',
        'Contributed to platform modernization from Angular 16 to Angular 19 with AdminLTE 4 and Bootstrap 5.'
      ]
    },
    {
      role: 'Lecturer and HOD, Computer Science',
      org: 'Suvidya Degree College and Sri Chaitanya',
      period: '2008 - 2021, Telangana',
      points: [
        'Taught Java, C and Visual Basic to hundreds of students and led the Computer Science department.',
        'Built the communication, fundamentals and mentoring foundation behind a deliberate move into software engineering.'
      ]
    }
  ];

  constructor() {
    try {
      const saved = localStorage.getItem('mtr-theme') as 'dark' | 'light' | null;
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.theme = saved ?? (prefersDark ? 'dark' : 'light');
    } catch {
      this.theme = 'dark';
    }
    document.documentElement.setAttribute('data-theme', this.theme);
  }

  get featuredProjects(): Project[] {
    return this.projects.filter((project) => project.featured);
  }

  get moreProjects(): Project[] {
    return this.projects.filter((project) => !project.featured);
  }

  toggleTheme(): void {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', this.theme);
    try {
      localStorage.setItem('mtr-theme', this.theme);
    } catch {
      // Local storage may be unavailable in private contexts.
    }
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  copyEmail(): void {
    try {
      navigator.clipboard.writeText(this.email);
      this.copied = true;
      setTimeout(() => (this.copied = false), 1700);
    } catch {
      this.copied = false;
    }
  }

  onPhotoError(): void {
    this.photoOk = false;
  }

  openCase(project: Project, ev: Event): void {
    this.lastFocused = ev.currentTarget as HTMLElement;
    this.openProject = project;
    document.body.style.overflow = 'hidden';
    setTimeout(() => (this.host.nativeElement.querySelector('.modal-close') as HTMLElement | null)?.focus(), 0);
  }

  closeCase(): void {
    this.openProject = null;
    document.body.style.overflow = '';
    this.lastFocused?.focus();
  }

  onModalKeydown(e: KeyboardEvent): void {
    if (e.key !== 'Tab') {
      return;
    }

    const modal = this.host.nativeElement.querySelector('.modal') as HTMLElement | null;
    if (!modal) {
      return;
    }

    const nodes = Array.from(
      modal.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])')
    ) as HTMLElement[];
    if (!nodes.length) {
      return;
    }

    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && active === first) {
      last.focus();
      e.preventDefault();
    } else if (!e.shiftKey && active === last) {
      first.focus();
      e.preventDefault();
    }
  }

  onCardMove(e: MouseEvent): void {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  }

  onCardLeave(e: MouseEvent): void {
    const el = e.currentTarget as HTMLElement;
    el.style.setProperty('--mx', '-500px');
    el.style.setProperty('--my', '-500px');
  }

  onHeroMove(e: MouseEvent): void {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty('--hero-x', `${(x * 10).toFixed(2)}px`);
    el.style.setProperty('--hero-y', `${(y * 10).toFixed(2)}px`);
    el.style.setProperty('--rx', `${(x * 5).toFixed(2)}deg`);
    el.style.setProperty('--ry', `${(-y * 5).toFixed(2)}deg`);
  }

  onHeroLeave(e: MouseEvent): void {
    const el = e.currentTarget as HTMLElement;
    el.style.setProperty('--hero-x', '0px');
    el.style.setProperty('--hero-y', '0px');
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  }

  iconFor(project: Project): string {
    const cat = project.cat.toLowerCase();
    if (cat.includes('health')) return 'pulse';
    if (cat.includes('vision')) return 'scan';
    if (cat.includes('finance')) return 'flow';
    if (cat.includes('exploration')) return 'voice';
    if (cat.includes('hrms')) return 'people';
    if (cat.includes('operations')) return 'board';
    if (cat.includes('security')) return 'pin';
    if (cat.includes('kyc')) return 'shield';
    return 'spark';
  }

  @HostListener('document:keydown.escape')
  onEsc(): void {
    if (this.openProject) {
      this.closeCase();
    } else if (this.menuOpen) {
      this.closeMenu();
    }
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const el = document.documentElement;
    const max = el.scrollHeight - el.clientHeight;
    this.scrollProgress = max > 0 ? (el.scrollTop / max) * 100 : 0;

    const cursor = el.scrollTop + 130;
    let current = 'top';
    for (const id of this.sections) {
      const section = document.getElementById(id);
      if (section && section.offsetTop <= cursor) {
        current = id;
      }
    }
    this.activeSection = current;
  }

  ngAfterViewInit(): void {
    this.tickTime();
    this.timer = setInterval(() => this.tickTime(), 30000);
    this.onScroll();
    this.initReveal();
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.observers.forEach((observer) => observer.disconnect());
  }

  private tickTime(): void {
    try {
      this.hydTime = new Intl.DateTimeFormat('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata'
      }).format(new Date()).toUpperCase();
    } catch {
      this.hydTime = '';
    }
  }

  private initReveal(): void {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealEls = this.host.nativeElement.querySelectorAll('.reveal');
    if (reduce || !('IntersectionObserver' in window)) {
      revealEls.forEach((el: Element) => el.classList.add('in-view'));
      return;
    }

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach((el: Element) => revealObserver.observe(el));
    this.observers.push(revealObserver);
  }
}
