import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { cyberAudio } from '../utils/cyberAudio';

export const CyberTerminalModal = ({ isOpen, onClose, projects, onNavigate, onOpenResume }) => {
  const [history, setHistory] = useState([
    { text: 'TESLA CYBER-OS v4.2.0 (x86_64-node-ai)', type: 'system' },
    { text: 'Connected to Akash Yadav Telemetry Subsystem [OK]', type: 'system' },
    { text: 'Type "help" to list available telemetry commands.', type: 'info' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isOpen]);

  if (!isOpen) return null;

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = inputVal.trim().toLowerCase();
      cyberAudio.playClick();

      const newHistory = [...history, { text: `user@akash-tesla:~$ ${inputVal}`, type: 'user' }];

      switch (cmd) {
        case 'help':
          newHistory.push(
            { text: 'AVAILABLE COMMANDS:', type: 'header' },
            { text: '  resume       - Open verified Engineering Dossier & PDF', type: 'highlight' },
            { text: '  about        - View engineer biographical telemetry', type: 'info' },
            { text: '  projects     - List all deployed flagship projects', type: 'info' },
            { text: '  powertrain   - Display AI & MERN architecture telemetry', type: 'info' },
            { text: '  skills       - Print verified technical capabilities', type: 'info' },
            { text: '  ping         - Ping backend Express API server', type: 'info' },
            { text: '  clear        - Flush terminal buffer', type: 'info' },
            { text: '  exit         - Terminate shell session', type: 'info' }
          );
          break;

        case 'resume':
          newHistory.push({ text: 'DISPATCHING TELEMETRY DOSSIER MODAL...', type: 'highlight' });
          if (onOpenResume) {
            onClose();
            onOpenResume();
          }
          break;

        case 'about':
          newHistory.push(
            { text: 'NAME: Akash Yadav', type: 'highlight' },
            { text: 'ROLE: Computer Science Undergraduate (AI/ML) & Full-Stack Architect', type: 'info' },
            { text: 'EXPERIENCE: AI Trainee @ GRIL (NVIDIA Partner) – Global Infoventures (2025–2026)', type: 'info' },
            { text: 'EDUCATION: B.Tech (CSE) @ ABESIT, Ghaziabad (2023–2027)', type: 'info' },
            { text: 'HONORS: Ranked Top 10 among 1000+ teams at brAInwave DTU Hackathon', type: 'info' },
            { text: 'CONTACT: akashyadav9871091290@gmail.com | +91-7827505869', type: 'info' }
          );
          break;

        case 'skills':
          newHistory.push(
            { text: 'CORE CAPABILITY METRICS (VERIFIED):', type: 'header' },
            { text: '  - AI/ML: PyTorch, Hugging Face Transformers, LLMs, RAG, Gemini API, OpenCV (96%)', type: 'highlight' },
            { text: '  - Languages: Python, Java, JavaScript, C (95%)', type: 'info' },
            { text: '  - Frontend: React.js, HTML5, Vanilla CSS Glassmorphism (94%)', type: 'info' },
            { text: '  - Tools & OS: Git, GitHub, Docker, Linux (95%)', type: 'info' }
          );
          break;

        case 'ping':
          newHistory.push({
            text: 'PING localhost:5000: 64 bytes from express-backend: icmp_seq=1 ttl=64 time=11.2ms [STATUS: 200 OK]',
            type: 'highlight'
          });
          break;

        case 'clear':
          setHistory([]);
          setInputVal('');
          return;

        case 'exit':
          onClose();
          return;

        default:
          if (cmd) {
            newHistory.push({
              text: `bash: command not found: "${cmd}". Type "help" for valid commands.`,
              type: 'error'
            });
          }
      }

      setHistory(newHistory);
      setInputVal('');
    }
  };

  return (
    <div className="cyber-modal-backdrop" onClick={onClose}>
      <div 
        className="cyber-modal" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '680px' }}
      >
        <div className="terminal-header">
          <div className="terminal-dots">
            <span className="dot red" onClick={onClose} style={{ cursor: 'pointer' }}></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <span className="terminal-title">TESLA_CYBER_TERMINAL // AKASH-CLI</span>
          <button 
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer' }}
          >
            <X size={18} />
          </button>
        </div>

        <div className="terminal-body">
          {history.map((line, idx) => (
            <div 
              key={idx} 
              style={{
                marginBottom: '4px',
                color: line.type === 'error' ? '#ff4d4f' :
                       line.type === 'highlight' ? '#00f2fe' :
                       line.type === 'header' ? '#fff' :
                       line.type === 'system' ? '#8e929b' :
                       line.type === 'user' ? '#e82127' : '#cfd3dc',
                fontWeight: line.type === 'header' || line.type === 'highlight' ? 600 : 400
              }}
            >
              {line.text}
            </div>
          ))}
          <div ref={bottomRef} />

          <div className="terminal-input-row">
            <span className="prompt-prefix">akash@tesla:~$</span>
            <input
              type="text"
              className="terminal-input"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleCommand}
              placeholder="type 'help' or command..."
              autoFocus
            />
          </div>
        </div>
      </div>
    </div>
  );
};
