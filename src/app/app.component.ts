import { Component, AfterViewInit, ElementRef, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project { cat: string; name: string; badge?: string; desc: string; tech: string[]; }
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
  scrollProgress = 0;

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

  learning: string[] = [
    'LLM App Development', 'RAG (Retrieval-Augmented Generation)', 'Agentic AI · LangGraph',
    'OpenAI & Google Gemini APIs', 'Prompt Engineering', 'AWS & Docker',
  ];

  projects: Project[] = [
    { cat: 'HRMS', name: 'HRMS & Employee Onboarding',
      desc: 'User onboarding with client/unit mapping, roles & permissions, user hierarchy and policy management across the HR module.',
      tech: ['Spring Boot', 'Angular', 'JWT'] },
    { cat: 'HR', name: 'Careers Management',
      desc: 'A careers module for the platform — create and manage job openings and applications end-to-end.',
      tech: ['Spring Boot', 'Angular', 'MySQL'] },
    { cat: 'AI · Health', name: 'Health360 AI Assistant', badge: 'OpenAI',
      desc: 'The product\'s first AI feature — clinical support for doctors plus AI prescription templates, engineered with validation and doctor review before anything is saved.',
      tech: ['OpenAI', 'Spring Boot', 'Angular'] },
    { cat: 'AI · Fleet', name: 'Fleet AI — Vision Capture', badge: 'OpenAI',
      desc: 'Reads odometer and fuel-receipt data straight from field photos into validated, structured records — removing manual data entry.',
      tech: ['OpenAI Vision', 'Spring Boot', 'AWS'] },
    { cat: 'Operations', name: 'Incident Management',
      desc: 'Assignment groups, a Kanban board, status/audit trail and exportable reports on the multi-tenant platform.',
      tech: ['Spring Boot', 'Angular', 'MySQL'] },
    { cat: 'Security', name: 'Patrol Point Visit Report',
      desc: 'GPS + Google Maps routing with PDF export — used by security clients as SLA-audit evidence, delivered across two UI skins.',
      tech: ['Google Maps', 'Spring Boot', 'Angular'] },
    { cat: 'Finance', name: 'CAPEX Approval Portal', badge: 'Spring Boot 3',
      desc: 'Multi-tenant capital-expenditure approvals with a configurable multi-level engine, budget encumbrance, and a SHA-256 hash-chained, QR-verifiable audit trail.',
      tech: ['Spring Boot 3', 'Java 17', 'React', 'SQL Server'] },
    { cat: 'KYC', name: 'Identity Verification (KYC)', badge: 'Signzy',
      desc: 'Unified Signzy integration across 10+ Indian documents — Aadhaar DigiLocker, PAN, ESIC, bank, driving licence, passport, GSTIN, EPFO — with Aadhaar name-matching and AWS Rekognition.',
      tech: ['Signzy', 'Spring Boot', 'AWS'] },
    { cat: 'Learning · AI', name: 'AI Voice Agent — Exploration', badge: 'Learning',
      desc: 'A hands-on learning project: a multilingual healthcare voice agent where I\'m going deep on LLMs, LangGraph orchestration and RAG. This is how I level up on agentic AI.',
      tech: ['LangGraph', 'Gemini', 'RAG', 'Python'] },
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

  @HostListener('window:scroll') onScroll(): void {
    const el = document.documentElement;
    const max = el.scrollHeight - el.clientHeight;
    this.scrollProgress = max > 0 ? (el.scrollTop / max) * 100 : 0;
  }

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
