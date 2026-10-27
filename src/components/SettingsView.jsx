import React, { useState } from 'react';
import { Settings as SettingsIcon, Sun, Moon, Globe, User, Info, Check, X, Sparkles, Heart } from 'lucide-react';

export function SettingsView({ theme, onToggleTheme, priestName, onUpdatePriestName }) {
  const [language, setLanguage] = useState(() => localStorage.getItem('bangaru_lang') || 'en');
  const [showInfoModal, setShowInfoModal] = useState(false);

  // Priest Profile Form State
  const [name, setName] = useState(priestName || 'Sri Krishnamurthy Shastri');
  const [gothram, setGothram] = useState(() => localStorage.getItem('priest_gothram') || 'Kasyapa Gothram');
  const [veda, setVeda] = useState(() => localStorage.getItem('priest_veda') || 'Krishna Yajurvedam');
  const [phone, setPhone] = useState(() => localStorage.getItem('priest_phone') || '+91 98480 12345');
  const [location, setLocation] = useState(() => localStorage.getItem('priest_location') || 'Hyderabad / Vijayawada');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem('bangaru_lang', lang);
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    onUpdatePriestName(name);
    localStorage.setItem('priest_gothram', gothram);
    localStorage.setItem('priest_veda', veda);
    localStorage.setItem('priest_phone', phone);
    localStorage.setItem('priest_location', location);
    
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div style={{ padding: '16px', maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* Settings Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span className="kumkuma-badge" style={{ fontSize: '0.72rem' }}>PREFERENCES & PROFILE</span>
          <h2 className="font-heading" style={{ fontSize: '1.4rem', color: 'var(--champagne-gold)', margin: '2px 0 0' }}>
            Settings & Profile
          </h2>
        </div>

        {/* Info Button (i) */}
        <button
          onClick={() => setShowInfoModal(true)}
          className="gold-button-secondary"
          style={{ width: '38px', height: '38px', borderRadius: '50%', padding: 0 }}
          title="App Info & Credits"
        >
          <Info size={18} color="var(--signature-gold)" />
        </button>
      </div>

      {/* Theme & Language Box */}
      <div className="gold-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px', background: 'var(--deep-charcoal)' }}>
        <span style={{ fontSize: '0.82rem', color: 'var(--champagne-gold)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <SettingsIcon size={16} /> Display & Language Settings
        </span>

        {/* Theme Selection */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.4)', padding: '10px 12px', borderRadius: '10px' }}>
          <div>
            <strong style={{ fontSize: '0.88rem', color: '#FFF', display: 'block' }}>Appearance Theme</strong>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
              {theme === 'sanctum' ? 'Obsidian Sanctum (Dark)' : 'Parchment Manuscript (Light)'}
            </span>
          </div>

          <button
            onClick={onToggleTheme}
            className="gold-button-secondary"
            style={{ padding: '6px 12px', fontSize: '0.78rem' }}
          >
            {theme === 'sanctum' ? <Sun size={15} /> : <Moon size={15} />}
            <span>{theme === 'sanctum' ? 'Switch Light' : 'Switch Dark'}</span>
          </button>
        </div>

        {/* Language Selection */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.4)', padding: '10px 12px', borderRadius: '10px' }}>
          <div>
            <strong style={{ fontSize: '0.88rem', color: '#FFF', display: 'block' }}>Interface Language</strong>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Select script display</span>
          </div>

          <div style={{ display: 'flex', gap: '4px' }}>
            <button
              onClick={() => handleLanguageChange('en')}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                border: language === 'en' ? '1px solid var(--signature-gold)' : '1px solid var(--border-gold)',
                background: language === 'en' ? 'var(--grad-gold)' : '#000',
                color: language === 'en' ? '#000' : '#FFF',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              English
            </button>

            <button
              onClick={() => handleLanguageChange('te')}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                border: language === 'te' ? '1px solid var(--signature-gold)' : '1px solid var(--border-gold)',
                background: language === 'te' ? 'var(--grad-gold)' : '#000',
                color: language === 'te' ? '#000' : '#FFF',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              తెలుగు
            </button>
          </div>
        </div>
      </div>

      {/* Priest Profile Details Form */}
      <div className="gold-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <span style={{ fontSize: '0.82rem', color: 'var(--champagne-gold)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <User size={16} /> Priest Profile Details
        </span>

        <form onSubmit={handleProfileSave} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div>
            <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Priest Full Name:</label>
            <input 
              type="text" 
              required
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--border-gold)', background: '#000', color: '#FFF', fontSize: '0.88rem' }} 
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <div>
              <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Gothram:</label>
              <input 
                type="text" 
                value={gothram} 
                onChange={(e) => setGothram(e.target.value)} 
                style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--border-gold)', background: '#000', color: '#FFF', fontSize: '0.85rem' }} 
              />
            </div>

            <div>
              <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Veda / Shakha:</label>
              <input 
                type="text" 
                value={veda} 
                onChange={(e) => setVeda(e.target.value)} 
                style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--border-gold)', background: '#000', color: '#FFF', fontSize: '0.85rem' }} 
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <div>
              <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Mobile Number:</label>
              <input 
                type="text" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--border-gold)', background: '#000', color: '#FFF', fontSize: '0.85rem' }} 
              />
            </div>

            <div>
              <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Location / City:</label>
              <input 
                type="text" 
                value={location} 
                onChange={(e) => setLocation(e.target.value)} 
                style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--border-gold)', background: '#000', color: '#FFF', fontSize: '0.85rem' }} 
              />
            </div>
          </div>

          <button type="submit" className="gold-button-primary" style={{ marginTop: '6px' }}>
            {savedSuccess ? <Check size={16} color="#10B981" /> : null}
            {savedSuccess ? 'Profile Saved Successfully!' : 'Save Priest Profile'}
          </button>
        </form>
      </div>

      {/* APP INFO POPUP MODAL (Created by Bangaru Saikiran) */}
      {showInfoModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 2500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div className="gold-card" style={{ width: '100%', maxWidth: '400px', padding: '24px', background: '#171511', border: '1px solid var(--signature-gold)', textAlign: 'center' }}>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowInfoModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <img 
              src="/logo.png" 
              alt="BANGARU Logo" 
              style={{ width: '56px', height: '56px', objectFit: 'contain', margin: '0 auto 10px', filter: 'drop-shadow(0 0 10px var(--signature-gold))' }} 
            />

            <h3 className="font-heading" style={{ fontSize: '1.4rem', color: 'var(--champagne-gold)', margin: 0 }}>
              Bangaru Vedic Calendar
            </h3>
            <span className="kumkuma-badge" style={{ fontSize: '0.7rem', margin: '6px 0 14px' }}>
              VERSION 2.0 PRO
            </span>

            <div style={{ background: 'rgba(0,0,0,0.5)', padding: '14px', borderRadius: '12px', border: '1px solid var(--border-gold)', margin: '10px 0 16px', fontSize: '0.88rem', color: '#FFF' }}>
              Designed & Created with <Heart size={14} color="#EF4444" style={{ display: 'inline', verticalAlign: 'middle' }} /> by
              <div style={{ fontSize: '1.15rem', color: 'var(--signature-gold)', fontWeight: 800, marginTop: '4px' }}>
                Bangaru Saikiran
              </div>
            </div>

            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              Dedicated ritual assistant suite designed for Vedic Purohits, freelance Panthulus, and Yajamana clients worldwide.
            </p>

            <button onClick={() => setShowInfoModal(false)} className="gold-button-primary" style={{ width: '100%', marginTop: '16px' }}>
              Close Info
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
