import React from 'react';
import { X, ExternalLink, Zap, CheckCircle2, Cpu, ShieldCheck } from 'lucide-react';
import { Github } from './Icons';

export const ProjectDetailModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="cyber-modal-backdrop" onClick={onClose}>
      <div 
        className="cyber-modal"
        style={{ maxWidth: '800px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="terminal-header">
          <div className="terminal-dots">
            <span className="dot red" onClick={onClose} style={{ cursor: 'pointer' }}></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <span className="terminal-title">{project.codeName} // TELEMETRY DOSSIER</span>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        {/* Media Preview */}
        <div style={{ height: '240px', position: 'relative', overflow: 'hidden' }}>
          <img 
            src={project.image} 
            alt={project.title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(transparent, rgba(11,13,19,0.95))',
            padding: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end'
          }}>
            <div>
              <span className="project-code-tag">{project.category}</span>
              <h2 style={{ fontSize: '1.6rem', color: '#fff', marginTop: '6px' }}>{project.title}</h2>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--cyber-cyan)', fontSize: '0.85rem' }}>
              {project.specs.throughput}
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '28px', maxHeight: '420px', overflowY: 'auto' }}>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: 1.7 }}>
            {project.description}
          </p>

          <h4 style={{ fontSize: '0.85rem', color: '#fff', marginBottom: '12px', letterSpacing: '0.12em' }}>
            ENGINEERING SPECIFICATIONS
          </h4>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px',
            marginBottom: '24px'
          }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>ACCELERATION & VELOCITY</div>
              <div style={{ fontFamily: 'var(--font-mono)', color: '#fff', fontSize: '0.9rem', marginTop: '4px' }}>{project.specs.acceleration}</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>SYSTEM RELIABILITY</div>
              <div style={{ fontFamily: 'var(--font-mono)', color: '#00e676', fontSize: '0.9rem', marginTop: '4px' }}>{project.specs.efficiency}</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>NETWORK LATENCY (P99)</div>
              <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--cyber-cyan)', fontSize: '0.9rem', marginTop: '4px' }}>{project.specs.latency}</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>THROUGHPUT VOLUME</div>
              <div style={{ fontFamily: 'var(--font-mono)', color: '#ff6b6b', fontSize: '0.9rem', marginTop: '4px' }}>{project.specs.throughput}</div>
            </div>
          </div>

          <h4 style={{ fontSize: '0.85rem', color: '#fff', marginBottom: '12px', letterSpacing: '0.12em' }}>
            MERN POWERTRAIN STACK
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
            {project.powertrain.map((tech, idx) => (
              <span key={idx} className="project-chip" style={{ background: 'rgba(255,255,255,0.08)', color: '#fff' }}>
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 28px',
          background: '#0a0d14',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button className="btn-tesla-secondary" onClick={onClose} style={{ padding: '8px 20px', fontSize: '0.78rem' }}>
            DISMISS
          </button>
          <div style={{ display: 'flex', gap: '12px' }}>
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="btn-tesla-secondary" 
              style={{ padding: '8px 20px', fontSize: '0.78rem', gap: '6px' }}
            >
              <Github size={14} /> GITHUB REPO
            </a>
            <a 
              href={project.demoUrl} 
              className="btn-tesla-primary" 
              style={{ padding: '8px 20px', fontSize: '0.78rem', gap: '6px' }}
            >
              <ExternalLink size={14} /> LAUNCH DEMO
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
