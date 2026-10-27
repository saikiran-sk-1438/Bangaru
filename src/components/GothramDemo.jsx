import React, { useState } from 'react';
import { BookOpen, Search, Sparkles, Copy, Check, ShieldCheck, Flame } from 'lucide-react';
import { GOTHRAM_DIRECTORY } from '../data/mockData';

export function GothramDemo() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGothram, setSelectedGothram] = useState(GOTHRAM_DIRECTORY[0]);
  const [copied, setCopied] = useState(false);

  const filteredGothrams = GOTHRAM_DIRECTORY.filter(g => 
    g.nameRoman.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.nameEnglish.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.rishis.some(r => r.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ padding: '24px 20px', maxWidth: '1150px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <span className="kumkuma-badge" style={{ marginBottom: '10px' }}>
          <BookOpen size={14} /> DEMO 4: GOTHRAM & PRAVARA ENCYCLOPEDIA
        </span>
        <h2 className="font-heading" style={{ fontSize: '2.1rem', color: 'var(--text-gold)' }}>
          150+ Gothrams, Saptarishi Pravaras & Vedic Branches
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '750px', margin: '6px auto 0' }}>
          Instant search across ancestral lineages, associated Rishis, presiding deities, and chantable Pravara texts in Roman Telugu.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        
        {/* Left Column: Search & Gothram List */}
        <div className="gold-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={18} color="var(--gold-primary)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              placeholder="Search Gothram or Rishi name (e.g. Haritha, Kasyapa)..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px 10px 38px',
                borderRadius: '8px',
                border: '1px solid var(--border-gold)',
                background: 'rgba(0,0,0,0.5)',
                color: '#FFF',
                fontSize: '0.9rem'
              }}
            />
          </div>

          <div style={{ maxHeight: '380px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {filteredGothrams.map((g) => {
              const isSelected = selectedGothram.id === g.id;
              return (
                <div
                  key={g.id}
                  onClick={() => setSelectedGothram(g)}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '8px',
                    border: isSelected ? '1px solid var(--gold-primary)' : '1px solid rgba(245,189,2,0.15)',
                    background: isSelected ? 'rgba(245,189,2,0.18)' : 'rgba(0,0,0,0.3)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <h4 style={{ color: isSelected ? '#FFE082' : '#FFF', fontSize: '1rem', margin: 0 }}>
                      {g.nameRoman}
                    </h4>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{g.rishis.slice(0, 2).join(', ')}...</span>
                  </div>
                  <span className="kumkuma-badge" style={{ fontSize: '0.72rem', padding: '2px 8px' }}>
                    {g.pravaraCount}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Pravara Card */}
        <div className="gold-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px', background: '#0D0804', border: '1px solid var(--border-gold-bright)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(245,189,2,0.25)', paddingBottom: '14px' }}>
            <div>
              <span className="kumkuma-badge" style={{ marginBottom: '6px' }}>{selectedGothram.pravaraCount}</span>
              <h3 style={{ fontSize: '1.6rem', color: 'var(--gold-light)', margin: 0 }}>
                {selectedGothram.nameRoman}
              </h3>
            </div>

            <button 
              onClick={() => handleCopy(selectedGothram.chantRoman)} 
              className="gold-button-secondary" 
              style={{ padding: '6px 12px', fontSize: '0.82rem' }}
            >
              {copied ? <Check size={14} color="#10B981" /> : <Copy size={14} />}
              {copied ? 'Copied!' : 'Copy Chant Text'}
            </button>
          </div>

          {/* Pravara Chant Box */}
          <div style={{ background: 'rgba(245,189,2,0.08)', padding: '16px', borderRadius: '10px', borderLeft: '4px solid var(--gold-primary)' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--gold-primary)', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
              📜 Chanting Text for Sankalpam (Roman Telugu):
            </span>
            <p style={{ color: '#FFE082', fontSize: '1.05rem', lineHeight: 1.8, fontWeight: 600 }}>
              "{selectedGothram.chantRoman}"
            </p>
          </div>

          {/* Saptarishi List */}
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
              Associated Saptarishis:
            </span>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {selectedGothram.rishis.map((r, idx) => (
                <span 
                  key={idx} 
                  style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid var(--border-gold)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.85rem', color: '#FFF' }}
                >
                  🔹 {r}
                </span>
              ))}
            </div>
          </div>

          {/* Veda & Deity */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '8px' }}>
            <div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block' }}>Veda Branch:</span>
              <span style={{ fontSize: '0.9rem', color: 'var(--gold-light)' }}>{selectedGothram.veda}</span>
            </div>
            <div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block' }}>Presiding Deity (Kula Daivam):</span>
              <span style={{ fontSize: '0.9rem', color: '#FFA040' }}>{selectedGothram.deity}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
