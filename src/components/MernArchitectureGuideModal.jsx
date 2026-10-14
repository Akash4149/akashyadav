import React, { useState } from 'react';
import { X, CheckCircle, Database, Server, Cpu, Play, Terminal, ArrowRight, Code } from 'lucide-react';
import { cyberAudio } from '../utils/cyberAudio';

export const MernArchitectureGuideModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [packetStep, setPacketStep] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  if (!isOpen) return null;

  const runPacketSimulation = () => {
    cyberAudio.playTransmit();
    setIsSimulating(true);
    setPacketStep(1);

    setTimeout(() => {
      setPacketStep(2);
      cyberAudio.playBeep(700, 0.05);
    }, 900);

    setTimeout(() => {
      setPacketStep(3);
      cyberAudio.playBeep(900, 0.05);
    }, 1800);

    setTimeout(() => {
      setPacketStep(4);
      cyberAudio.playBeep(1200, 0.1);
      setIsSimulating(false);
    }, 2700);
  };

  return (
    <div className="cyber-modal-backdrop" onClick={onClose}>
      <div 
        className="cyber-modal" 
        style={{ maxWidth: '850px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="terminal-header">
          <div className="terminal-dots">
            <span className="dot red" onClick={onClose} style={{ cursor: 'pointer' }}></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <span className="terminal-title">TESLA-ACADEMY // MERN FULL-STACK ARCHITECTURE MASTERCLASS</span>
          <button 
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-subtle)', background: '#0a0d14' }}>
          {[
            { id: 'overview', label: '1. Architecture Blueprint' },
            { id: 'simulator', label: '2. Live Flow Simulator' },
            { id: 'howtobuild', label: '3. Step-by-Step Build Guide' },
            { id: 'code', label: '4. Essential Code Samples' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                cyberAudio.playClick();
                setActiveTab(tab.id);
              }}
              style={{
                flex: 1,
                padding: '12px 14px',
                background: activeTab === tab.id ? 'rgba(255,255,255,0.08)' : 'transparent',
                border: 'none',
                borderBottom: activeTab === tab.id ? '2px solid var(--tesla-red)' : 'none',
                color: activeTab === tab.id ? '#fff' : 'var(--text-muted)',
                fontFamily: 'var(--font-main)',
                fontSize: '0.78rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div style={{ padding: '28px', maxHeight: '550px', overflowY: 'auto' }}>
          {activeTab === 'overview' && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <span className="hero-badge-pill">POWERTRAIN FOUNDATION</span>
                <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '8px' }}>
                  What is the MERN Stack?
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  MERN is a pure JavaScript full-stack development framework that unites four cutting-edge technologies into a single cohesive system:
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#00e676', fontWeight: 700, marginBottom: '6px' }}>
                    <Database size={18} />
                    <span>M — MongoDB</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    NoSQL document database. Stores data as JSON-like documents (BSON). Flexible schemas, perfect for agile development without rigid SQL tables.
                  </p>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', fontWeight: 700, marginBottom: '6px' }}>
                    <Server size={18} />
                    <span>E — Express.js</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Minimalist web application framework for Node.js. Handles routing, middleware (CORS, JSON body parser), security, and RESTful API endpoints.
                  </p>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#00f2fe', fontWeight: 700, marginBottom: '6px' }}>
                    <Cpu size={18} />
                    <span>R — React 19</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Component-driven user interface library. Uses virtual DOM, hooks (useState, useEffect), and responsive layouts for 60fps dynamic cockpits.
                  </p>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4facfe', fontWeight: 700, marginBottom: '6px' }}>
                    <Terminal size={18} />
                    <span>N — Node.js</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    High-performance V8 JavaScript runtime that lets you run JavaScript on the server. Non-blocking, event-driven I/O engine.
                  </p>
                </div>
              </div>

              <div style={{ background: 'rgba(232, 33, 39, 0.08)', border: '1px solid var(--border-red)', padding: '16px', borderRadius: '8px' }}>
                <span style={{ color: '#ff6b6b', fontWeight: 700, fontSize: '0.85rem' }}>⚡ Why this architecture is powerful:</span>
                <p style={{ fontSize: '0.82rem', color: '#ddd', marginTop: '4px' }}>
                  Single language across entire stack (JavaScript / TypeScript). You write models in JS, APIs in JS, and UI components in JS with 100% code and type reusability.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'simulator' && (
            <div>
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '6px' }}>
                  Interactive Data Packet Simulator
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Watch how user data flows end-to-end from a button click in React to persistent storage in MongoDB:
                </p>
              </div>

              {/* Simulation stages */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
                <div style={{
                  padding: '14px',
                  borderRadius: '8px',
                  background: packetStep >= 1 ? 'rgba(0, 242, 254, 0.12)' : 'rgba(255,255,255,0.02)',
                  border: packetStep >= 1 ? '1px solid var(--cyber-cyan)' : '1px solid var(--border-subtle)',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 700, color: packetStep >= 1 ? '#fff' : 'var(--text-muted)', fontSize: '0.85rem' }}>
                      Step 1: Client Event (React Component)
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--cyber-cyan)' }}>
                      {packetStep >= 1 ? 'STATE DISPATCHED' : 'IDLE'}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    User fills contact form and clicks "TRANSMIT". React packages state into JSON and calls <code>fetch('/api/contact', &#123; method: 'POST', body &#125;)</code>.
                  </p>
                </div>

                <div style={{
                  padding: '14px',
                  borderRadius: '8px',
                  background: packetStep >= 2 ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255,255,255,0.02)',
                  border: packetStep >= 2 ? '1px solid #fff' : '1px solid var(--border-subtle)',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 700, color: packetStep >= 2 ? '#fff' : 'var(--text-muted)', fontSize: '0.85rem' }}>
                      Step 2: Network & Express Routing (Node.js)
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#fff' }}>
                      {packetStep >= 2 ? 'MIDDLEWARE & ROUTER HIT' : 'WAITING'}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    Express middleware <code>express.json()</code> parses request body. The router at <code>router.post('/contact')</code> validates the payload.
                  </p>
                </div>

                <div style={{
                  padding: '14px',
                  borderRadius: '8px',
                  background: packetStep >= 3 ? 'rgba(0, 230, 118, 0.12)' : 'rgba(255,255,255,0.02)',
                  border: packetStep >= 3 ? '1px solid var(--status-green)' : '1px solid var(--border-subtle)',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 700, color: packetStep >= 3 ? '#fff' : 'var(--text-muted)', fontSize: '0.85rem' }}>
                      Step 3: Mongoose Model Validation & Persistence (MongoDB)
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--status-green)' }}>
                      {packetStep >= 3 ? 'BSON DOCUMENT COMMITTED' : 'WAITING'}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    <code>new Contact(payload).save()</code> validates types, creates unique <code>_id</code>, generates timestamp, and writes to MongoDB collection.
                  </p>
                </div>

                <div style={{
                  padding: '14px',
                  borderRadius: '8px',
                  background: packetStep >= 4 ? 'rgba(232, 33, 39, 0.15)' : 'rgba(255,255,255,0.02)',
                  border: packetStep >= 4 ? '1px solid var(--tesla-red)' : '1px solid var(--border-subtle)',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 700, color: packetStep >= 4 ? '#fff' : 'var(--text-muted)', fontSize: '0.85rem' }}>
                      Step 4: Response Packet Returned to UI
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#ff6b6b' }}>
                      {packetStep >= 4 ? 'TRANSMISSION COMPLETE (HTTP 200 OK)' : 'WAITING'}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    Express returns <code>res.json(&#123; success: true, transmissionId &#125;)</code>. React updates state and displays a confirmation banner to the user!
                  </p>
                </div>
              </div>

              <button
                id="btn-run-simulation"
                className="btn-tesla-primary"
                style={{ width: '100%', gap: '8px' }}
                onClick={runPacketSimulation}
                disabled={isSimulating}
              >
                <Play size={16} />
                {isSimulating ? 'SIMULATING PACKET FLOW...' : 'SIMULATE FULL MERN DATA FLOW'}
              </button>
            </div>
          )}

          {activeTab === 'howtobuild' && (
            <div>
              <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '14px' }}>
                How to Build Websites Like This (Roadmap)
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ borderLeft: '3px solid var(--tesla-red)', paddingLeft: '14px' }}>
                  <h4 style={{ fontSize: '0.92rem', color: '#fff' }}>Step 1: Scaffold Vite + Express</h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Use <code>npx create-vite</code> for blistering fast React builds, and create a <code>server/</code> folder for Express. Use <code>concurrently</code> in <code>package.json</code> so both run with one command: <code>npm run dev</code>.
                  </p>
                </div>

                <div style={{ borderLeft: '3px solid var(--cyber-cyan)', paddingLeft: '14px' }}>
                  <h4 style={{ fontSize: '0.92rem', color: '#fff' }}>Step 2: Connect MongoDB with Mongoose</h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Create schemas with Mongoose (like <code>Project</code> and <code>Contact</code>). Always add a graceful fallback (like we did in <code>server/config/db.js</code>) so the app works even before your MongoDB Atlas cluster URI is provided.
                  </p>
                </div>

                <div style={{ borderLeft: '3px solid #00e676', paddingLeft: '14px' }}>
                  <h4 style={{ fontSize: '0.92rem', color: '#fff' }}>Step 3: Design the Tesla Minimalist Aesthetic</h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Use deep titanium dark backgrounds (<code>#050608</code>), frosted glass (<code>backdrop-filter: blur(20px)</code>), wide letter-spacing on titles, and pill-shaped action buttons. Add full-screen scroll snapping (<code>scroll-snap-type: y mandatory</code>).
                  </p>
                </div>

                <div style={{ borderLeft: '3px solid #fff', paddingLeft: '14px' }}>
                  <h4 style={{ fontSize: '0.92rem', color: '#fff' }}>Step 4: Deploy to Production</h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Run <code>npm run build</code> to produce optimized static assets. Host the frontend on Vercel/Netlify, or deploy the complete Node.js/Express server on Render/Railway/Fly.io pointing to your free MongoDB Atlas cluster.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div>
              <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '8px' }}>
                Key Code Patterns Used in This Project
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                All files are already written in your workspace for you to explore and modify!
              </p>

              <div style={{ background: '#0a0d14', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#bbf', overflowX: 'auto', marginBottom: '12px' }}>
                <span style={{ color: '#ff6b6b' }}>// 1. Fetching Projects in React:</span><br />
                const response = await fetch('/api/projects');<br />
                const &#123; data &#125; = await response.json();<br />
                setProjects(data);
              </div>

              <div style={{ background: '#0a0d14', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#bbf', overflowX: 'auto' }}>
                <span style={{ color: '#00e676' }}>// 2. Express Route with Mongoose:</span><br />
                router.post('/contact', async (req, res) =&gt; &#123;<br />
                &nbsp;&nbsp;const doc = new Contact(req.body);<br />
                &nbsp;&nbsp;await doc.save();<br />
                &nbsp;&nbsp;res.json(&#123; success: true, id: doc._id &#125;);<br />
                &#125;);
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 28px', background: '#0a0d14', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            STATUS: ARCHITECTURE LOADED // READY TO CODE
          </span>
          <button className="btn-tesla-secondary" style={{ padding: '8px 20px', fontSize: '0.75rem' }} onClick={onClose}>
            CLOSE ACADEMY
          </button>
        </div>
      </div>
    </div>
  );
};
