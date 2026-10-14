import React from 'react';
import { 
  X, 
  Download, 
  Printer, 
  ExternalLink, 
  Mail, 
  Phone, 
  MapPin, 
  Award, 
  GraduationCap, 
  Briefcase, 
  Cpu, 
  Code, 
  CheckCircle2 
} from 'lucide-react';
import { Github } from './Icons';
import { cyberAudio } from '../utils/cyberAudio';

export const ResumeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    cyberAudio.playClick();
    window.print();
  };

  return (
    <div className="cyber-modal-backdrop" onClick={onClose} style={{ zIndex: 1200 }}>
      <div 
        className="cyber-modal resume-modal-container"
        style={{ 
          maxWidth: '920px', 
          maxHeight: '90vh', 
          display: 'flex', 
          flexDirection: 'column',
          background: '#090b10',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Header */}
        <div className="terminal-header" style={{ padding: '14px 24px', background: '#0e121a' }}>
          <div className="terminal-dots">
            <span className="dot red" onClick={onClose} style={{ cursor: 'pointer' }}></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <span className="terminal-title" style={{ color: '#fff', fontWeight: 600 }}>
            AKASH_YADAV // ENGINEERING_DOSSIER_v2026.pdf
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={handlePrint}
              className="btn-tesla-secondary"
              style={{ padding: '6px 14px', fontSize: '0.72rem', gap: '6px' }}
              title="Print / Save as PDF"
            >
              <Printer size={13} /> PRINT / SAVE PDF
            </button>
            <button 
              onClick={onClose}
              style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer' }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Resume Content Body */}
        <div className="printable-resume" style={{ padding: '36px 44px', overflowY: 'auto', flex: 1, color: '#e5e7eb' }}>
          
          {/* Header Section */}
          <div style={{ borderBottom: '2px solid rgba(255, 255, 255, 0.12)', paddingBottom: '24px', marginBottom: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <span className="hero-badge-pill" style={{ marginBottom: '8px' }}>
                  COMPUTER SCIENCE & AI/ML UNDERGRADUATE
                </span>
                <h1 style={{ fontSize: '2.4rem', color: '#ffffff', letterSpacing: '0.08em', margin: 0 }}>
                  AKASH YADAV
                </h1>
                <p style={{ fontSize: '0.95rem', color: 'var(--cyber-cyan)', marginTop: '4px', fontWeight: 500 }}>
                  AI Systems • Computer Vision • Full-Stack Web Architecture
                </p>
              </div>

              {/* Contact Pill Badges */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>
                <a href="mailto:akashyadav9871091290@gmail.com" style={{ color: '#ffffff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Mail size={14} color="var(--cyber-cyan)" /> akashyadav9871091290@gmail.com
                </a>
                <a href="tel:+917827505869" style={{ color: '#ffffff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Phone size={14} color="var(--status-green)" /> +91-7827505869
                </a>
                <a href="https://github.com/Akash4149" target="_blank" rel="noreferrer" style={{ color: '#ffffff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Github size={14} color="#fff" /> github.com/Akash4149
                </a>
                <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={14} color="var(--tesla-red)" /> Ghaziabad, India
                </span>
              </div>
            </div>

            {/* Professional Summary */}
            <div style={{ marginTop: '20px', background: 'rgba(255, 255, 255, 0.02)', padding: '16px 20px', borderRadius: '8px', borderLeft: '3px solid var(--tesla-red)' }}>
              <p style={{ margin: 0, fontSize: '0.88rem', color: '#d1d5db', lineHeight: 1.65 }}>
                Computer Science undergraduate focused on Artificial Intelligence and Machine Learning, with hands-on experience in <strong>LLMs, RAG systems, and computer vision</strong>. Skilled in <strong>Python, PyTorch, Hugging Face, OpenCV</strong>, and building AI-driven applications with responsive full-stack interfaces.
              </p>
            </div>
          </div>

          {/* 1. EXPERIENCE */}
          <div style={{ marginBottom: '28px' }}>
            <h3 style={{ fontSize: '1.05rem', color: '#fff', letterSpacing: '0.14em', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Briefcase size={16} color="var(--tesla-red)" />
              PROFESSIONAL EXPERIENCE
            </h3>

            <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '18px 22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                <div>
                  <h4 style={{ fontSize: '1.05rem', color: '#fff', margin: 0 }}>
                    AI Trainee – GRIL (NVIDIA Partner)
                  </h4>
                  <div style={{ fontSize: '0.82rem', color: 'var(--cyber-cyan)', marginTop: '2px' }}>
                    Global Infoventures
                  </div>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', background: 'rgba(232, 33, 39, 0.15)', color: '#ff6b6b', border: '1px solid var(--border-red)', padding: '3px 10px', borderRadius: '4px' }}>
                  2025 – 2026
                </span>
              </div>

              <ul style={{ paddingLeft: '18px', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li>Selected for an NVIDIA-affiliated AI training program focused on AI/ML projects and GPU computing concepts.</li>
                <li>Building hands-on experience in AI systems, machine learning workflows, and practical software applications.</li>
                <li>Leveraged modern accelerated computing paradigms to train and deploy deep learning vision and NLP models.</li>
              </ul>
            </div>
          </div>

          {/* 2. TECHNICAL SKILLS MATRIX */}
          <div style={{ marginBottom: '28px' }}>
            <h3 style={{ fontSize: '1.05rem', color: '#fff', letterSpacing: '0.14em', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Cpu size={16} color="var(--cyber-cyan)" />
              TECHNICAL SKILLS MATRIX
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '14px' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>PROGRAMMING LANGUAGES</span>
                <div style={{ fontSize: '0.88rem', color: '#fff', marginTop: '6px', fontWeight: 600 }}>Python, Java, JavaScript, C</div>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '14px' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--cyber-cyan)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>AI & MACHINE LEARNING</span>
                <div style={{ fontSize: '0.85rem', color: '#fff', marginTop: '6px', lineHeight: 1.4 }}>
                  PyTorch, Hugging Face Transformers, OpenCV, LLMs, RAG, Gemini API, Computer Vision
                </div>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '14px' }}>
                <span style={{ fontSize: '0.72rem', color: '#00e676', textTransform: 'uppercase', letterSpacing: '0.1em' }}>FRONTEND & WEB</span>
                <div style={{ fontSize: '0.88rem', color: '#fff', marginTop: '6px', fontWeight: 600 }}>React.js, HTML5, Vanilla CSS, REST API</div>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '14px' }}>
                <span style={{ fontSize: '0.72rem', color: '#ffbd2e', textTransform: 'uppercase', letterSpacing: '0.1em' }}>DEVELOPER TOOLS</span>
                <div style={{ fontSize: '0.88rem', color: '#fff', marginTop: '6px', fontWeight: 600 }}>Git, GitHub, Docker, Linux</div>
              </div>
            </div>
          </div>

          {/* 3. KEY PROJECTS */}
          <div style={{ marginBottom: '28px' }}>
            <h3 style={{ fontSize: '1.05rem', color: '#fff', letterSpacing: '0.14em', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Code size={16} color="#00e676" />
              FLAGSHIP ENGINEERING PROJECTS
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Project 1 */}
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '16px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <h4 style={{ fontSize: '0.98rem', color: '#fff', margin: 0 }}>Custom RAG Conversational Agent</h4>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--cyber-cyan)' }}>Gemini API • RAG • Vector Retrieval</span>
                </div>
                <ul style={{ paddingLeft: '18px', fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.5, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <li>Built RAG conversational agents using the Gemini API for context-aware question answering.</li>
                  <li>Implemented document-based knowledge retrieval to generate responses grounded in user-provided knowledge bases.</li>
                  <li>Integrated conversational context and personalized knowledge retrieval for improved response relevance.</li>
                </ul>
              </div>

              {/* Project 2 */}
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '16px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <h4 style={{ fontSize: '0.98rem', color: '#fff', margin: 0 }}>Lane Violation Detection System</h4>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--tesla-red)' }}>OpenCV • Computer Vision • Python</span>
                </div>
                <ul style={{ paddingLeft: '18px', fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.5, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <li>Developed a computer vision-based system to detect vehicles crossing designated lane boundaries from video footage.</li>
                  <li>Applied OpenCV and image processing algorithms for lane detection, vehicle tracking, and real-time violation identification.</li>
                </ul>
              </div>

              {/* Project 3 */}
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '16px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <h4 style={{ fontSize: '0.98rem', color: '#fff', margin: 0 }}>Face Recognition Folder Unlock System</h4>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#ffbd2e' }}>Biometrics • OpenCV • Security</span>
                </div>
                <ul style={{ paddingLeft: '18px', fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.5, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <li>Developed a secure folder access system using Python and OpenCV with facial recognition-based authentication.</li>
                  <li>Implemented face detection and recognition to restrict access strictly to authorized users.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 4. ACHIEVEMENTS & EDUCATION */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {/* Achievements */}
            <div>
              <h3 style={{ fontSize: '1.05rem', color: '#fff', letterSpacing: '0.14em', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Award size={16} color="#ffbd2e" />
                ACHIEVEMENTS
              </h3>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <CheckCircle2 size={16} color="var(--status-green)" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.85rem', color: '#fff' }}>
                    <strong>Ranked Top 10</strong> among 1000+ teams at <strong>brAInwave DTU Hackathon</strong>.
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <CheckCircle2 size={16} color="var(--status-green)" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.85rem', color: '#fff' }}>
                    <strong>Finalist</strong> in <strong>Codeathon</strong> competitive coding competition.
                  </span>
                </div>
              </div>
            </div>

            {/* Education */}
            <div>
              <h3 style={{ fontSize: '1.05rem', color: '#fff', letterSpacing: '0.14em', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <GraduationCap size={16} color="var(--cyber-cyan)" />
                EDUCATION
              </h3>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>
                    <span>B.Tech (CSE)</span>
                    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--cyber-cyan)' }}>2023 – 2027</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    ABES Institute of Technology, Ghaziabad
                  </div>
                </div>

                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#ddd' }}>
                    <span>12th (CBSE) — G.B.S.S.S Vasundhra Enclave</span>
                    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--status-green)' }}>72% (2022)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#ddd', marginTop: '4px' }}>
                    <span>10th (CBSE) — Lav Kush Public School</span>
                    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--status-green)' }}>82% (2020)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div style={{ padding: '16px 36px', background: '#0a0d14', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            STATUS: DOSSIER VERIFIED // AKASH YADAV
          </span>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              className="btn-tesla-secondary"
              style={{ padding: '8px 18px', fontSize: '0.75rem' }} 
              onClick={onClose}
            >
              CLOSE
            </button>
            <button 
              className="btn-tesla-primary"
              style={{ padding: '8px 22px', fontSize: '0.75rem', gap: '8px' }} 
              onClick={handlePrint}
            >
              <Download size={14} /> DOWNLOAD / PRINT PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
