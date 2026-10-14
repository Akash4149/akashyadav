import React, { useState } from 'react';
import { Volume2, VolumeX, Terminal, BookOpen, Activity, Menu, X, Inbox, FileText, Download } from 'lucide-react';
import { cyberAudio } from '../utils/cyberAudio';

export const TeslaNavbar = ({
  activeSection,
  onNavigate,
  onOpenTerminal,
  onOpenGuide,
  onOpenInbox,
  onOpenResume,
  telemetry
}) => {
  const [audioActive, setAudioActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    const isNowActive = cyberAudio.toggle();
    setAudioActive(isNowActive);
  };

  const navItems = [
    { id: 'hero', label: 'Model S' },
    { id: 'powertrain', label: 'Powertrain' },
    { id: 'projects', label: 'Cyber Projects' },
    { id: 'autopilot', label: 'Autopilot' },
    { id: 'supercharger', label: 'Supercharger' },
    { id: 'order', label: 'Custom Order' },
  ];

  const handleNavClick = (id) => {
    cyberAudio.playClick();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="tesla-navbar">
      <a 
        href="#hero" 
        className="brand-container"
        onClick={(e) => { e.preventDefault(); handleNavClick('hero'); }}
      >
        <span className="brand-badge">T</span>
        <div>
          <span className="brand-text">Akash Yadav</span>
          <span className="brand-subtitle">AI & Full-Stack Architect</span>
        </div>
      </a>

      {/* Desktop Navigation Links */}
      <ul className="nav-links">
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              id={`nav-${item.id}`}
              className={`nav-link-btn ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Right Action Tools */}
      <div className="nav-actions">
        {/* Prominent Resume Dossier Trigger */}
        <button
          id="btn-navbar-resume"
          className="btn-tesla-secondary"
          style={{ padding: '6px 14px', fontSize: '0.72rem', gap: '6px', borderColor: 'var(--cyber-cyan)', color: '#fff' }}
          onClick={() => {
            cyberAudio.playBeep(920, 0.08);
            onOpenResume();
          }}
          title="Open Akash Yadav Resume Dossier"
        >
          <FileText size={13} color="var(--cyber-cyan)" /> RESUME
        </button>

        {/* Backend Status indicator */}
        <div className="nav-hud-pill" title="Live Express Backend Ping">
          <span className="status-dot"></span>
          <span>{telemetry?.metrics?.apiLatencyMs ? `${telemetry.metrics.apiLatencyMs}ms` : '5000:OK'}</span>
        </div>

        {/* Incoming Transmissions Inbox Trigger */}
        <button
          id="btn-open-inbox"
          className="tool-btn"
          title="Open Incoming Transmissions Inbox (Database & Notifications)"
          onClick={() => {
            cyberAudio.playBeep(850, 0.08);
            onOpenInbox();
          }}
        >
          <Inbox size={16} />
        </button>

        {/* Learn MERN Guide Trigger */}
        <button
          id="btn-learn-mern"
          className="tool-btn"
          title="Learn MERN Architecture & How this site works"
          onClick={() => {
            cyberAudio.playBeep(700, 0.08);
            onOpenGuide();
          }}
        >
          <BookOpen size={16} />
        </button>

        {/* Cyber Terminal Shell */}
        <button
          id="btn-open-terminal"
          className="tool-btn"
          title="Open Tesla-CLI Cyber Shell"
          onClick={() => {
            cyberAudio.playBeep(900, 0.08);
            onOpenTerminal();
          }}
        >
          <Terminal size={16} />
        </button>

        {/* Tactile Audio Toggle */}
        <button
          id="btn-toggle-audio"
          className={`tool-btn ${audioActive ? 'active' : ''}`}
          title={audioActive ? 'Cyber Audio: ON' : 'Cyber Audio: OFF (Click to Enable)'}
          onClick={toggleSound}
        >
          {audioActive ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>

        {/* Mobile Hamburger */}
        <button
          className="tool-btn mobile-only"
          style={{ display: 'none' }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
    </header>
  );
};
