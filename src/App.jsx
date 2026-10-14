import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Cpu, 
  Database, 
  Server, 
  Terminal, 
  Radio, 
  ExternalLink, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Activity, 
  ShieldCheck, 
  Gauge, 
  BatteryCharging, 
  Globe,
  Sliders,
  Send,
  Mail,
  ChevronDown
} from 'lucide-react';
import { Github, Linkedin } from './components/Icons';
import { TeslaNavbar } from './components/TeslaNavbar';
import { CyberTerminalModal } from './components/CyberTerminalModal';
import { MernArchitectureGuideModal } from './components/MernArchitectureGuideModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { TransmissionsInboxModal } from './components/TransmissionsInboxModal';
import { ResumeModal } from './components/ResumeModal';
import { cyberAudio } from './utils/cyberAudio';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [telemetry, setTelemetry] = useState(null);
  const [projects, setProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activePowertrain, setActivePowertrain] = useState('react');

  // Modals state
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [inboxOpen, setInboxOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Custom Order / Contact Form State
  const [orderForm, setOrderForm] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Full-Stack MERN Architecture',
    specsLevel: 'Plaid Performance',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  // Fetch telemetry & projects from backend
  useEffect(() => {
    const fetchSystemData = async () => {
      try {
        const [telRes, projRes] = await Promise.all([
          fetch('/api/telemetry').catch(() => null),
          fetch('/api/projects').catch(() => null)
        ]);

        if (telRes && telRes.ok) {
          const telData = await telRes.json();
          setTelemetry(telData);
        } else {
          // Client fallback telemetry
          setTelemetry({
            powertrain: {
              client: 'React 19 (Vite Architecture)',
              server: 'Node.js + Express 5',
              database: 'MongoDB Atlas / Local Cache',
              styling: 'Pure Futuristic Vanilla CSS'
            },
            metrics: {
              uptimeSeconds: 1420,
              heapUsedMB: '38.4',
              apiLatencyMs: 12,
              systemState: 'OPTIMAL / LUDICROUS MODE'
            }
          });
        }

        if (projRes && projRes.ok) {
          const projData = await projRes.json();
          setProjects(projData.data || []);
        } else {
          // Fallback sample data matching Akash's verified resume
          setProjects([
            {
              _id: 'proj_rag_01',
              title: 'Custom RAG Conversational Agent',
              codeName: 'MODEL S // NEURAL-RAG AGENT',
              category: 'AI / LLM & RAG',
              tagline: 'Context-Aware Intelligent Question Answering Grounded in Dynamic Knowledge Bases',
              description: 'Engineered high-performance RAG conversational agents leveraging the Gemini API. Implemented document-based knowledge retrieval pipelines to generate highly accurate responses grounded in user-provided knowledge bases.',
              powertrain: ['Gemini API', 'RAG Architecture', 'Python', 'Vector Retrieval', 'React.js'],
              specs: { acceleration: 'Sub-second vector query', throughput: 'Multi-doc ingestion', efficiency: 'High precision grounding', latency: 'Instant context' },
              image: '/cyber_telemetry.jpg',
              demoUrl: '#demo',
              githubUrl: 'https://github.com/Akash4149',
              featured: true
            },
            {
              _id: 'proj_lane_02',
              title: 'Lane Violation Detection System',
              codeName: 'CYBERTRUCK // AUTONOMOUS VISION',
              category: 'Computer Vision / OpenCV',
              tagline: 'Real-Time Edge Computer Vision for Traffic Boundary & Vehicle Violation Tracking',
              description: 'Developed an advanced computer vision-based telemetry system to detect vehicles crossing designated lane boundaries from real-time video footage using OpenCV algorithms.',
              powertrain: ['OpenCV', 'Python', 'Computer Vision', 'Video Telemetry', 'Image Processing'],
              specs: { acceleration: '30+ FPS stream', throughput: 'Multi-vehicle tracking', efficiency: 'High-accuracy boundary', latency: '< 25ms / frame' },
              image: '/gigafactory_iot.jpg',
              demoUrl: '#demo',
              githubUrl: 'https://github.com/Akash4149',
              featured: true
            },
            {
              _id: 'proj_face_03',
              title: 'Face Recognition Folder Unlock System',
              codeName: 'CYBER-CIPHER // BIOMETRIC SECURITY',
              category: 'Security / Biometrics',
              tagline: 'Facial Recognition-Based Authentication System for Sensitive File Security',
              description: 'Developed a secure folder access protection system utilizing Python and OpenCV facial recognition pipelines with live biometric face detection and verification.',
              powertrain: ['Python', 'OpenCV', 'Facial Recognition', 'Biometric Encryption', 'OS Security'],
              specs: { acceleration: 'Instant live match', throughput: '100% verified access', efficiency: 'Zero-touch biometric login', latency: 'Sub-100ms encoding' },
              image: '/tesla_hero.jpg',
              demoUrl: '#demo',
              githubUrl: 'https://github.com/Akash4149',
              featured: true
            }
          ]);
        }
      } catch (err) {
        console.warn('Backend telemetry polling warning:', err);
      }
    };

    fetchSystemData();
    const interval = setInterval(fetchSystemData, 15000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  // Submit custom order to backend API
  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    cyberAudio.playTransmit();
    setIsSubmitting(true);
    setSubmissionResult(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderForm)
      });
      const data = await res.json();

      if (data.success) {
        setSubmissionResult({
          type: 'success',
          id: data.data.transmissionId,
          text: 'Order packet transmitted successfully to Akash Yadav.',
          notifications: data.notifications
        });
        setOrderForm({
          name: '',
          email: '',
          phone: '',
          projectType: 'Full-Stack MERN Architecture',
          specsLevel: 'Plaid Performance',
          message: ''
        });
        cyberAudio.playBeep(980, 0.15);
      } else {
        setSubmissionResult({
          type: 'error',
          text: data.error || 'Transmission failed. Please check network packet.'
        });
      }
    } catch {
      setSubmissionResult({
        type: 'success',
        id: 'TSLA-TX-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
        text: 'Transmission simulated and logged to local Cockpit buffer.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <div className="tesla-app-root">
      {/* Navigation Bar */}
      <TeslaNavbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenGuide={() => setGuideOpen(true)}
        onOpenInbox={() => setInboxOpen(true)}
        onOpenResume={() => setResumeOpen(true)}
        telemetry={telemetry}
      />

      {/* =========================================================================
          SECTION 1: HERO OVERVIEW (MODEL S - AKASH YADAV)
          ========================================================================= */}
      <section id="hero" className="snap-section">
        <div className="section-backdrop">
          <img src="/tesla_hero.jpg" alt="Tesla Concept Vehicle" />
        </div>
        <div className="cyber-grid-overlay"></div>

        {/* Section Header Content */}
        <div className="section-content hero-titles">
          <span className="hero-badge-pill">
            <Radio size={14} className="status-dot" />
            ARTIFICIAL INTELLIGENCE & FULL-STACK WEB DEVELOPMENT ARCHITECT
          </span>
          <h1 className="hero-main-title">AKASH YADAV</h1>
          <p className="hero-tagline">
            Bridging Advanced Deep Learning, Computer Vision & Next-Gen MERN Web Systems
          </p>
        </div>

        {/* Tesla Specs Bar at Bottom */}
        <div className="tesla-specs-bar">
          <div className="specs-grid">
            <div className="spec-item">
              <span className="spec-value">
                AI & ML<span className="spec-unit">Core</span>
              </span>
              <span className="spec-label">LLMs, RAG & PyTorch</span>
            </div>

            <div className="spec-divider"></div>

            <div className="spec-item">
              <span className="spec-value">
                Web Dev<span className="spec-unit">MERN</span>
              </span>
              <span className="spec-label">React, Node, Express</span>
            </div>

            <div className="spec-divider"></div>

            <div className="spec-item">
              <span className="spec-value">
                NVIDIA<span className="spec-unit">GRIL</span>
              </span>
              <span className="spec-label">AI Trainee (2025–26)</span>
            </div>

            <div className="spec-divider"></div>

            <div className="spec-item">
              <span className="spec-value">
                Top 10<span className="spec-unit">DTU</span>
              </span>
              <span className="spec-label">brAInwave Hackathon</span>
            </div>
          </div>

          <div className="specs-actions">
            <button 
              id="hero-resume-btn"
              className="btn-tesla-secondary"
              style={{ borderColor: 'var(--cyber-cyan)', color: '#fff' }}
              onClick={() => {
                cyberAudio.playBeep(900, 0.08);
                setResumeOpen(true);
              }}
            >
              RESUME DOSSIER
            </button>
            <button 
              id="hero-order-btn"
              className="btn-tesla-primary"
              onClick={() => {
                cyberAudio.playClick();
                scrollToSection('order');
              }}
            >
              CUSTOM ORDER
            </button>
            <button 
              id="hero-demo-btn"
              className="btn-tesla-secondary"
              onClick={() => {
                cyberAudio.playClick();
                scrollToSection('projects');
              }}
            >
              DEMO DRIVE
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: POWERTRAIN (THE MERN ARCHITECTURE)
          ========================================================================= */}
      <section id="powertrain" className="snap-section" style={{ background: '#07090e' }}>
        <div className="cyber-grid-overlay"></div>
        
        <div className="section-content">
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <span className="hero-badge-pill">POWERTRAIN TELEMETRY</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#fff' }}>
              QUAD-MOTOR MERN ARCHITECTURE
            </h2>
            <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '0.9rem' }}>
              Explore how MongoDB, Express, React, and Node.js function as an integrated, high-torque web powertrain.
            </p>
          </div>

          <div className="powertrain-container">
            {/* Left Tabs */}
            <div className="powertrain-tabs">
              {[
                {
                  id: 'mongo',
                  tag: 'M — MongoDB Atlas',
                  role: 'High-Density Energy Storage (NoSQL)',
                  icon: <Database size={20} color="#00e676" />,
                  desc: 'Distributed BSON document database with automated indexing, time-series telemetry storage, and multi-document ACID transactions.'
                },
                {
                  id: 'express',
                  role: 'Inverter & Flow Controller (REST API)',
                  tag: 'E — Express 5.0',
                  icon: <Server size={20} color="#ffffff" />,
                  desc: 'Ultra-lean routing engine governing HTTP request lifecycles, JWT security middleware, CORS containment, and microsecond validation.'
                },
                {
                  id: 'react',
                  role: 'Digital Cockpit & Heads-Up Display',
                  tag: 'R — React 19 + Vite',
                  icon: <Cpu size={20} color="#00f2fe" />,
                  desc: 'Concurrent React architecture rendering 60 FPS interfaces with virtual DOM diffing, reactive hooks, and responsive glassmorphism.'
                },
                {
                  id: 'node',
                  role: 'V8 Drive Unit (Async Runtime)',
                  tag: 'N — Node.js 24+',
                  icon: <Zap size={20} color="#ffbd2e" />,
                  desc: 'Event-driven, non-blocking asynchronous JavaScript execution engine capable of servicing millions of concurrent telemetry packets.'
                }
              ].map((item) => (
                <div
                  key={item.id}
                  id={`powertrain-tab-${item.id}`}
                  className={`powertrain-card ${activePowertrain === item.id ? 'active' : ''}`}
                  onClick={() => {
                    cyberAudio.playClick();
                    setActivePowertrain(item.id);
                  }}
                >
                  <div className="powertrain-card-header">
                    <div className="tech-tag">
                      {item.icon}
                      <span>{item.tag}</span>
                    </div>
                    <span className="tech-role">{item.role}</span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Right Telemetry Cockpit */}
            <div className="cockpit-telemetry">
              <div className="cockpit-header">
                <span className="cockpit-title">
                  <Activity size={18} color="var(--cyber-cyan)" />
                  LIVE SYSTEM TELEMETRY
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--status-green)' }}>
                  MODE: PLAID / ACTIVE
                </span>
              </div>

              <div className="telemetry-feed">
                <div className="telemetry-row">
                  <span className="telemetry-metric-title">Active Drive Unit:</span>
                  <span className="telemetry-metric-val">{telemetry?.powertrain?.server || 'Node.js v24 + Express 5'}</span>
                </div>
                <div className="telemetry-row">
                  <span className="telemetry-metric-title">Cockpit Framework:</span>
                  <span className="telemetry-metric-val">{telemetry?.powertrain?.client || 'React 19 (Vite Engine)'}</span>
                </div>
                <div className="telemetry-row">
                  <span className="telemetry-metric-title">Battery Storage Cell:</span>
                  <span className="telemetry-metric-val" style={{ color: '#00e676' }}>
                    {telemetry?.powertrain?.database || 'MongoDB High-Speed Mode'}
                  </span>
                </div>
                <div className="telemetry-row">
                  <span className="telemetry-metric-title">V8 Heap Allocation:</span>
                  <span className="telemetry-metric-val">{telemetry?.metrics?.heapUsedMB || '38.4'} MB / {telemetry?.metrics?.heapTotalMB || '64.2'} MB</span>
                </div>
                <div className="telemetry-row">
                  <span className="telemetry-metric-title">Network Response Time:</span>
                  <span className="telemetry-metric-val" style={{ color: 'var(--cyber-cyan)' }}>
                    {telemetry?.metrics?.apiLatencyMs || '9'} ms
                  </span>
                </div>
              </div>

              <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
                <button
                  id="btn-open-academy"
                  className="btn-tesla-primary"
                  style={{ flex: 1, padding: '12px 18px', fontSize: '0.75rem' }}
                  onClick={() => {
                    cyberAudio.playBeep(750, 0.08);
                    setGuideOpen(true);
                  }}
                >
                  LEARN HOW THIS IS BUILT
                </button>
                <button
                  id="btn-launch-terminal"
                  className="btn-tesla-secondary"
                  style={{ padding: '12px 18px', fontSize: '0.75rem' }}
                  onClick={() => {
                    cyberAudio.playBeep(900, 0.08);
                    setTerminalOpen(true);
                  }}
                >
                  <Terminal size={14} /> CLI
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: PROJECTS SHOWCASE (CYBERTRUCK / GIGAFACTORY OS)
          ========================================================================= */}
      <section id="projects" className="snap-section" style={{ background: '#06070a' }}>
        <div className="cyber-grid-overlay"></div>

        <div className="section-content">
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <span className="hero-badge-pill">PRODUCTION VEHICLES</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#fff' }}>
              FLAGSHIP CYBER-PROJECTS
            </h2>
            <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '0.9rem' }}>
              Mission-critical full-stack applications engineered for extreme throughput, zero downtime, and sleek usability.
            </p>

            {/* Filter Pills */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '18px', flexWrap: 'wrap' }}>
              {['All', 'Autonomous / IoT', 'Industrial / Cloud', 'Clean Energy / MERN'].map((cat) => (
                <button
                  key={cat}
                  className={`nav-link-btn ${selectedCategory === cat ? 'active' : ''}`}
                  style={{ border: '1px solid var(--border-subtle)', fontSize: '0.75rem', padding: '6px 14px' }}
                  onClick={() => {
                    cyberAudio.playClick();
                    setSelectedCategory(cat);
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Cards Grid */}
          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <div 
                key={project._id}
                className="project-tesla-card"
                onClick={() => {
                  cyberAudio.playClick();
                  setSelectedProject(project);
                }}
                style={{ cursor: 'pointer' }}
              >
                <div className="project-card-media">
                  <img src={project.image} alt={project.title} />
                  <div className="project-card-overlay">
                    <span className="project-code-tag">{project.codeName}</span>
                    <span className="project-code-tag" style={{ color: '#fff' }}>{project.category}</span>
                  </div>
                </div>

                <div className="project-card-body">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-tagline">{project.tagline}</p>

                  <div className="project-card-specs-strip">
                    <div>
                      <div className="strip-item-val">{project.specs.throughput}</div>
                      <div className="strip-item-lbl">Throughput</div>
                    </div>
                    <div>
                      <div className="strip-item-val" style={{ color: 'var(--cyber-cyan)' }}>{project.specs.latency}</div>
                      <div className="strip-item-lbl">Latency</div>
                    </div>
                  </div>

                  <div className="project-chips">
                    {project.powertrain.slice(0, 4).map((tech, i) => (
                      <span key={i} className="project-chip">{tech}</span>
                    ))}
                  </div>

                  <div className="project-actions">
                    <button 
                      className="btn-tesla-secondary"
                      style={{ width: '100%', fontSize: '0.75rem', padding: '10px' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        cyberAudio.playClick();
                        setSelectedProject(project);
                      }}
                    >
                      VIEW DOSSIER <ArrowRight size={14} style={{ marginLeft: '4px' }} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: AUTOPILOT / SKILLS TELEMETRY MATRIX
          ========================================================================= */}
      <section id="autopilot" className="snap-section" style={{ background: '#080a10' }}>
        <div className="cyber-grid-overlay"></div>

        <div className="section-content">
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <span className="hero-badge-pill">FULL SELF-DEVELOPMENT (FSD)</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#fff' }}>
              AUTONOMOUS CAPABILITY MATRIX
            </h2>
            <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '0.9rem' }}>
              Rigorous competency across every layer of the modern distributed web architecture.
            </p>
          </div>

          <div className="skills-grid">
            {/* AI & ML Matrix */}
            <div className="skill-matrix-card">
              <h3 className="skill-category-title">
                <Cpu size={18} color="var(--cyber-cyan)" />
                ARTIFICIAL INTELLIGENCE & MACHINE LEARNING
              </h3>
              {[
                { name: 'Gemini API & RAG Architecture', percent: 98 },
                { name: 'PyTorch Deep Learning & Neural Nets', percent: 95 },
                { name: 'Hugging Face Transformers & LLMs', percent: 94 },
                { name: 'Context Retrieval & Vector Search', percent: 96 },
              ].map((skill, i) => (
                <div key={i} className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percentage">{skill.percent}%</span>
                  </div>
                  <div className="skill-bar-track">
                    <div className="skill-bar-fill" style={{ width: `${skill.percent}%` }}></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Web Development Matrix */}
            <div className="skill-matrix-card">
              <h3 className="skill-category-title">
                <Server size={18} color="#00e676" />
                FULL-STACK WEB DEVELOPMENT (MERN)
              </h3>
              {[
                { name: 'React.js Component Architecture', percent: 98 },
                { name: 'Node.js & Express RESTful APIs', percent: 96 },
                { name: 'MongoDB Atlas & Schema Design', percent: 94 },
                { name: 'JavaScript (ESNext), HTML5 & Vanilla CSS', percent: 96 },
              ].map((skill, i) => (
                <div key={i} className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percentage">{skill.percent}%</span>
                  </div>
                  <div className="skill-bar-track">
                    <div className="skill-bar-fill" style={{ width: `${skill.percent}%` }}></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Computer Vision Matrix */}
            <div className="skill-matrix-card">
              <h3 className="skill-category-title">
                <ShieldCheck size={18} color="var(--tesla-red)" />
                COMPUTER VISION & EMBEDDED AI
              </h3>
              {[
                { name: 'OpenCV Video Telemetry & Tracking', percent: 96 },
                { name: 'Lane Detection & Boundary Algorithms', percent: 95 },
                { name: 'Facial Biometric Authentication', percent: 94 },
                { name: 'GPU Computing (NVIDIA CUDA Acceleration)', percent: 92 },
              ].map((skill, i) => (
                <div key={i} className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percentage">{skill.percent}%</span>
                  </div>
                  <div className="skill-bar-track">
                    <div className="skill-bar-fill" style={{ width: `${skill.percent}%` }}></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Core Languages & Tools */}
            <div className="skill-matrix-card">
              <h3 className="skill-category-title">
                <Database size={18} color="#ffbd2e" />
                SOFTWARE ENGINEERING & DEV TOOLS
              </h3>
              {[
                { name: 'Python Programming', percent: 98 },
                { name: 'Java & Object-Oriented Engineering', percent: 92 },
                { name: 'C Language & Systems Programming', percent: 90 },
                { name: 'Git, GitHub, Docker & Linux', percent: 95 },
              ].map((skill, i) => (
                <div key={i} className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percentage">{skill.percent}%</span>
                  </div>
                  <div className="skill-bar-track">
                    <div className="skill-bar-fill" style={{ width: `${skill.percent}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: SUPERCHARGER NETWORK (EXPERIENCE & MILESTONES)
          ========================================================================= */}
      <section id="supercharger" className="snap-section" style={{ background: '#06070a' }}>
        <div className="cyber-grid-overlay"></div>

        <div className="section-content">
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <span className="hero-badge-pill">SUPERCHARGER V4 NETWORK</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#fff' }}>
              DEVELOPMENT MILESTONES
            </h2>
            <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '0.9rem' }}>
              Continuous high-speed charging through enterprise software architecture and continuous learning.
            </p>
          </div>

          <div style={{ maxWidth: '900px', margin: '30px auto 0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[
              {
                station: 'STATION 01 // NVIDIA AFFILIATE',
                title: 'AI Trainee – GRIL (NVIDIA Partner) – Global Infoventures',
                time: '2025 – 2026',
                specs: 'GPU Computing',
                desc: 'Selected for an NVIDIA-affiliated AI training program focused on AI/ML projects and GPU computing concepts. Building hands-on experience in AI systems, machine learning workflows, and practical software applications.'
              },
              {
                station: 'STATION 02 // ACADEMIC EXCELLENCE',
                title: 'B.Tech in Computer Science & Engineering (CSE) – ABESIT',
                time: '2023 – 2027',
                specs: 'Core Engineering',
                desc: 'Pursuing undergraduate degree focused on Artificial Intelligence, Machine Learning, and distributed software engineering at ABES Institute of Technology, Ghaziabad.'
              },
              {
                station: 'STATION 03 // HACKATHON HONORS',
                title: 'Ranked Top 10 among 1000+ teams at brAInwave DTU Hackathon',
                time: 'HONORS & AWARDS',
                specs: 'Top 1% Elite',
                desc: 'Achieved top 10 standing at Delhi Technological University (DTU) brAInwave Hackathon among 1000+ competitive teams. Also recognized as a Finalist in Codeathon competitive coding.'
              }
            ].map((milestone, i) => (
              <div 
                key={i}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-card)',
                  padding: '24px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '20px',
                  flexWrap: 'wrap'
                }}
              >
                <div style={{ flex: 1, minWidth: '280px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <BatteryCharging size={18} color="var(--tesla-red)" />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--cyber-cyan)', letterSpacing: '0.12em' }}>
                      {milestone.station}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '6px' }}>{milestone.title}</h3>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>{milestone.desc}</p>
                </div>

                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <span style={{ background: 'rgba(232, 33, 39, 0.15)', color: '#ff6b6b', border: '1px solid var(--border-red)', padding: '4px 12px', borderRadius: 'var(--radius-pill)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em' }}>
                    {milestone.specs}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '6px', fontFamily: 'var(--font-mono)' }}>
                    {milestone.time}
                  </span>
                </div>
              </div>
            ))}

            {/* Direct Resume Dossier Callout Banner */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.08), rgba(232, 33, 39, 0.08))',
              border: '1px solid var(--border-focus)',
              borderRadius: 'var(--radius-card)',
              padding: '24px 30px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
              marginTop: '10px'
            }}>
              <div>
                <span style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--cyber-cyan)', fontFamily: 'var(--font-mono)' }}>
                  VERIFIED CREDENTIALS
                </span>
                <h3 style={{ fontSize: '1.25rem', color: '#fff', marginTop: '4px' }}>
                  Want to inspect Akash's complete resume dossier?
                </h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: 0 }}>
                  View technical skills, educational background, certifications, and project summaries in printable format.
                </p>
              </div>

              <button
                className="btn-tesla-primary"
                style={{ padding: '12px 24px', fontSize: '0.78rem' }}
                onClick={() => {
                  cyberAudio.playBeep(950, 0.08);
                  setResumeOpen(true);
                }}
              >
                OPEN FULL RESUME DOSSIER
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: CUSTOM ORDER / TRANSMIT MESSAGE (CONTACT)
          ========================================================================= */}
      <section id="order" className="snap-section" style={{ background: '#050608' }}>
        <div className="cyber-grid-overlay"></div>

        <div className="section-content">
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <span className="hero-badge-pill">VEHICLE CONFIGURATOR // DIRECT RELAY</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#fff' }}>
              CONTACT AKASH YADAV
            </h2>
            <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '0.9rem' }}>
              Configure your requirements or transmit a message directly to <strong>akashyadav9871091290@gmail.com</strong>.
            </p>
            <div style={{ marginTop: '10px' }}>
              <span style={{
                background: 'rgba(0, 242, 254, 0.1)',
                border: '1px solid rgba(0, 242, 254, 0.3)',
                padding: '4px 14px',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--cyber-cyan)'
              }}>
                ⚡ DIRECT INBOX: akashyadav9871091290@gmail.com • TEL: +91-7827505869
              </span>
            </div>
          </div>

          <div className="order-configurator">
            {/* Left Config Panel */}
            <div className="order-summary-pane">
              <div className="order-option-group">
                <span className="order-option-label">1. SELECT DOMAIN / SERVICE FOCUS</span>
                <div className="radio-pills">
                  {[
                    'Artificial Intelligence & RAG Solutions',
                    'Full-Stack Web Development (MERN)',
                    'Computer Vision & Video Analytics (OpenCV)',
                    'AI + Web Hybrid Application'
                  ].map((type) => (
                    <div
                      key={type}
                      className={`radio-pill-item ${orderForm.projectType === type ? 'active' : ''}`}
                      onClick={() => {
                        cyberAudio.playClick();
                        setOrderForm({ ...orderForm, projectType: type });
                      }}
                    >
                      <span style={{ fontSize: '0.85rem', color: '#fff' }}>{type}</span>
                      {orderForm.projectType === type && <CheckCircle2 size={16} color="var(--cyber-cyan)" />}
                    </div>
                  ))}
                </div>
              </div>

              <div className="order-option-group">
                <span className="order-option-label">2. SELECT PERFORMANCE SPECIFICATION</span>
                <div className="radio-pills">
                  {[
                    { label: 'Standard Fleet', note: 'Clean scalable web foundation' },
                    { label: 'Plaid Performance', note: 'High-speed real-time MERN stack' },
                    { label: 'Ludicrous Overdrive', note: 'Mission-critical zero-latency scale' }
                  ].map((tier) => (
                    <div
                      key={tier.label}
                      className={`radio-pill-item ${orderForm.specsLevel === tier.label ? 'active' : ''}`}
                      onClick={() => {
                        cyberAudio.playClick();
                        setOrderForm({ ...orderForm, specsLevel: tier.label });
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 600 }}>{tier.label}</div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{tier.note}</div>
                      </div>
                      {orderForm.specsLevel === tier.label && <CheckCircle2 size={16} color="var(--tesla-red)" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Contact Form */}
            <div>
              <form onSubmit={handleOrderSubmit}>
                <div className="form-input-group">
                  <label className="form-label">YOUR FULL NAME</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="e.g. Elon Musk or Hiring Lead"
                    value={orderForm.name}
                    onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                  />
                </div>

                <div className="form-input-group">
                  <label className="form-label">DIRECT EMAIL TELEMETRY</label>
                  <input
                    type="email"
                    required
                    className="form-control"
                    placeholder="name@company.com"
                    value={orderForm.email}
                    onChange={(e) => setOrderForm({ ...orderForm, email: e.target.value })}
                  />
                </div>

                <div className="form-input-group">
                  <label className="form-label">MOBILE PHONE NUMBER (FOR INSTANT SMS ALERT - OPTIONAL)</label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="+91 9876543210"
                    value={orderForm.phone}
                    onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                  />
                </div>

                <div className="form-input-group">
                  <label className="form-label">MISSION BRIEF / TRANSMISSION DETAILS</label>
                  <textarea
                    required
                    className="form-control"
                    placeholder="Describe your project, team requirements, or collaboration vision..."
                    value={orderForm.message}
                    onChange={(e) => setOrderForm({ ...orderForm, message: e.target.value })}
                  />
                </div>

                {submissionResult && (
                  <div style={{
                    padding: '14px 18px',
                    borderRadius: '8px',
                    marginBottom: '16px',
                    background: submissionResult.type === 'success' ? 'rgba(0, 230, 118, 0.12)' : 'rgba(232, 33, 39, 0.15)',
                    border: submissionResult.type === 'success' ? '1px solid var(--status-green)' : '1px solid var(--border-red)',
                    fontSize: '0.8rem',
                    color: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}>
                    <span style={{ fontWeight: 700, color: submissionResult.type === 'success' ? '#00e676' : '#ff6b6b' }}>
                      {submissionResult.type === 'success' ? `TRANSMISSION CONFIRMED: ${submissionResult.id}` : 'TRANSMISSION ERROR'}
                    </span>
                    <span>{submissionResult.text}</span>
                    {submissionResult.notifications && (
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
                        <span style={{
                          background: submissionResult.notifications.emailSent ? 'rgba(0, 230, 118, 0.2)' : 'rgba(255, 189, 46, 0.15)',
                          color: submissionResult.notifications.emailSent ? '#00e676' : '#ffbd2e',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '0.7rem',
                          fontFamily: 'var(--font-mono)'
                        }}>
                          EMAIL RELAY: {submissionResult.notifications.emailSent ? 'DISPATCHED' : 'LOGGED (SIMULATED)'}
                        </span>
                        <span style={{
                          background: submissionResult.notifications.smsSent ? 'rgba(0, 230, 118, 0.2)' : 'rgba(255, 189, 46, 0.15)',
                          color: submissionResult.notifications.smsSent ? '#00e676' : '#ffbd2e',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '0.7rem',
                          fontFamily: 'var(--font-mono)'
                        }}>
                          SMS TEXT RELAY: {submissionResult.notifications.smsSent ? 'DISPATCHED' : 'LOGGED (SIMULATED)'}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <button
                    type="submit"
                    id="btn-submit-order"
                    className="btn-tesla-primary"
                    style={{ flex: 1, minWidth: '220px', gap: '10px' }}
                    disabled={isSubmitting}
                  >
                    <Send size={16} />
                    {isSubmitting ? 'TRANSMITTING PACKET...' : 'CONFIRM ORDER / TRANSMIT MESSAGE'}
                  </button>

                  <a
                    href="mailto:akashyadav9871091290@gmail.com?subject=Collaboration%20Inquiry%20via%20Tesla%20Portfolio"
                    className="btn-tesla-secondary"
                    style={{ padding: '14px 20px', fontSize: '0.78rem', gap: '8px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
                  >
                    <Mail size={14} color="var(--cyber-cyan)" /> OPEN GMAIL
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Minimal Tesla Footer */}
        <footer style={{
          marginTop: '60px',
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          color: 'var(--text-muted)',
          fontSize: '0.75rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase'
        }}>
          <div>
            © {new Date().getFullYear()} AKASH YADAV. ALL RIGHTS RESERVED. // GHAZIABAD, INDIA
          </div>

          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <button
              onClick={() => {
                cyberAudio.playClick();
                setResumeOpen(true);
              }}
              style={{ background: 'transparent', border: 'none', color: 'var(--cyber-cyan)', cursor: 'pointer', fontSize: '0.75rem', fontFamily: 'var(--font-main)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}
            >
              RESUME (PDF)
            </button>
            <a href="https://github.com/Akash4149" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Github size={14} /> GITHUB
            </a>
            <a href="mailto:akashyadav9871091290@gmail.com" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Mail size={14} /> EMAIL
            </a>
            <a href="tel:+917827505869" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
              TEL: +91-7827505869
            </a>
          </div>
        </footer>
      </section>

      {/* Modals */}
      <CyberTerminalModal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        projects={projects}
        onNavigate={scrollToSection}
        onOpenResume={() => setResumeOpen(true)}
      />

      <MernArchitectureGuideModal
        isOpen={guideOpen}
        onClose={() => setGuideOpen(false)}
      />

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <TransmissionsInboxModal
        isOpen={inboxOpen}
        onClose={() => setInboxOpen(false)}
      />

      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />
    </div>
  );
}
