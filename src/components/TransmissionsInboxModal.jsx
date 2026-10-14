import React, { useState, useEffect } from 'react';
import { X, Mail, Phone, CheckCircle2, AlertCircle, RefreshCw, Database, Radio } from 'lucide-react';
import { cyberAudio } from '../utils/cyberAudio';

export const TransmissionsInboxModal = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [storageSource, setStorageSource] = useState('LOCAL');

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/messages');
      const data = await res.json();
      if (data.success) {
        setMessages(data.data || []);
        setStorageSource(data.source || 'LOCAL');
      }
    } catch {
      // Failsafe
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchMessages();
    }
  }, [isOpen]);

  if (!isOpen) return null;

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
          <span className="terminal-title">TESLA_COCKPIT // INCOMING TRANSMISSIONS INBOX</span>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        {/* Toolbar */}
        <div style={{
          padding: '12px 24px',
          background: '#0a0d14',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>STORAGE ENGINE:</span>
            <span style={{
              background: storageSource === 'MONGODB' ? 'rgba(0, 230, 118, 0.15)' : 'rgba(0, 242, 254, 0.15)',
              color: storageSource === 'MONGODB' ? '#00e676' : 'var(--cyber-cyan)',
              border: storageSource === 'MONGODB' ? '1px solid var(--status-green)' : '1px solid var(--cyber-cyan)',
              padding: '3px 10px',
              borderRadius: '9999px',
              fontSize: '0.7rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700
            }}>
              {storageSource === 'MONGODB' ? '⚡ MONGODB ATLAS (LIVE)' : '⚡ IN-MEMORY CACHE (LOCAL)'}
            </span>
          </div>

          <button
            onClick={() => {
              cyberAudio.playClick();
              fetchMessages();
            }}
            className="btn-tesla-secondary"
            style={{ padding: '6px 14px', fontSize: '0.72rem', gap: '6px' }}
            disabled={loading}
          >
            <RefreshCw size={12} className={loading ? 'spin' : ''} />
            {loading ? 'REFRESHING...' : 'REFRESH TRANSMISSIONS'}
          </button>
        </div>

        {/* Messages List */}
        <div style={{ padding: '24px', maxHeight: '500px', overflowY: 'auto' }}>
          {messages.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
              <Radio size={36} style={{ margin: '0 auto 12px auto', opacity: 0.5 }} />
              <div style={{ fontSize: '0.9rem', color: '#fff', marginBottom: '4px' }}>No Transmissions Logged Yet</div>
              <p style={{ fontSize: '0.8rem' }}>
                Fill out the Custom Order / Contact form on your website to transmit your first live packet!
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {messages.map((msg, idx) => (
                <div 
                  key={msg._id || idx}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '8px',
                    padding: '18px',
                    transition: 'var(--transition-smooth)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
                    <div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--cyber-cyan)' }}>
                        {msg.transmissionId || `TSLA-TX-${idx + 1}`}
                      </span>
                      <h4 style={{ fontSize: '1.05rem', color: '#fff', marginTop: '2px' }}>{msg.name}</h4>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                        <a href={`mailto:${msg.email}`} style={{ color: 'var(--cyber-cyan)', textDecoration: 'none' }}>{msg.email}</a>
                        {msg.phone && (
                          <span style={{ marginLeft: '12px', color: '#aaa' }}>
                            • Tel: <a href={`tel:${msg.phone}`} style={{ color: '#fff', textDecoration: 'none' }}>{msg.phone}</a>
                          </span>
                        )}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{
                        background: msg.emailDispatched ? 'rgba(0, 230, 118, 0.15)' : 'rgba(255, 189, 46, 0.12)',
                        color: msg.emailDispatched ? '#00e676' : '#ffbd2e',
                        border: '1px solid var(--border-subtle)',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontSize: '0.65rem',
                        fontFamily: 'var(--font-mono)'
                      }}>
                        EMAIL: {msg.emailDispatched ? 'SENT' : 'SIMULATED'}
                      </span>
                      <span style={{
                        background: msg.smsDispatched ? 'rgba(0, 230, 118, 0.15)' : 'rgba(255, 189, 46, 0.12)',
                        color: msg.smsDispatched ? '#00e676' : '#ffbd2e',
                        border: '1px solid var(--border-subtle)',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontSize: '0.65rem',
                        fontFamily: 'var(--font-mono)'
                      }}>
                        SMS: {msg.smsDispatched ? 'SENT' : 'SIMULATED'}
                      </span>
                    </div>
                  </div>

                  <div style={{ background: '#0a0d14', padding: '12px 14px', borderRadius: '6px', fontSize: '0.82rem', color: '#ddd', marginBottom: '10px', lineHeight: 1.5 }}>
                    {msg.message}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    <span>Package: <strong style={{ color: '#fff' }}>{msg.projectType}</strong> ({msg.specsLevel})</span>
                    <span>{new Date(msg.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '14px 24px', background: '#0a0d14', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            POWERED BY MERN & NOTIFICATION DISPATCH SERVICE
          </span>
          <button className="btn-tesla-secondary" style={{ padding: '6px 18px', fontSize: '0.75rem' }} onClick={onClose}>
            CLOSE INBOX
          </button>
        </div>
      </div>
    </div>
  );
};
