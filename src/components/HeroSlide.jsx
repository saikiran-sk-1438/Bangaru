import React from 'react';
import { Flame, Sparkles, BookOpen, Calendar, Share2, Compass, ShieldCheck, HeartHandshake } from 'lucide-react';

export function HeroSlide({ onStartExploring, onPlayTanpura, isTanpuraPlaying }) {
  return (
    <div style={{ padding: '40px 20px', textAlign: 'center', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Top Sacred Header */}
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <span className="diya-flame" style={{ fontSize: '28px' }}>🪔</span>
        <span className="kumkuma-badge">
          <Sparkles size={14} /> VEDIC PRIEST SMART SUITE • PANTHULU CRM
        </span>
        <span className="diya-flame" style={{ fontSize: '28px' }}>🪔</span>
      </div>

      {/* Main Title */}
      <h1 className="font-heading" style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '16px' }}>
        <span className="text-gold-gradient">Vedic Panthulu Suite</span>
        <br />
        <span style={{ fontSize: '0.52em', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '2px', textTransform: 'uppercase' }}>
          Smart Digital Ecosystem for Freelance & Temple Priests
        </span>
      </h1>

      <p style={{ fontSize: '1.2rem', color: 'var(--text-gold)', maxWidth: '850px', margin: '0 auto 30px', lineHeight: 1.7 }}>
        Traditional Telugu Panchangam, Hands-Free Mantra Teleprompter, Dynamic Real-Time Sankalpam, 1-Click WhatsApp Samagri, and Priest Delegation Network.
      </p>

      {/* Action Buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '45px' }}>
        <button onClick={onStartExploring} className="gold-button-primary" style={{ fontSize: '1.05rem', padding: '14px 28px' }}>
          <Sparkles size={20} /> Explore Problems & Solutions
        </button>

        <button 
          onClick={onPlayTanpura} 
          className="gold-button-secondary" 
          style={{ fontSize: '1rem', padding: '13px 24px', borderColor: isTanpuraPlaying ? 'var(--gold-primary)' : 'var(--border-gold)' }}
        >
          <span style={{ fontSize: '18px' }}>{isTanpuraPlaying ? '🔊' : '🎶'}</span>
          {isTanpuraPlaying ? 'Stop Shruti Box (Tanpura)' : 'Play Tanpura Drone (Sa-Pa Shruti)'}
        </button>
      </div>

      {/* 4 Feature Highlights Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', textAlign: 'left' }}>
        <div className="gold-card" style={{ padding: '24px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(245,189,2,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px', color: 'var(--gold-primary)' }}>
            <BookOpen size={24} />
          </div>
          <h3 style={{ fontSize: '1.15rem', color: 'var(--gold-light)', marginBottom: '8px' }}>
            Hands-Free Mantra Reader
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Auto-scroll with rotary speed dial and screen wake-lock so the priest never touches the phone during Homams.
          </p>
        </div>

        <div className="gold-card" style={{ padding: '24px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(255,111,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px', color: 'var(--saffron-bright)' }}>
            <Compass size={24} />
          </div>
          <h3 style={{ fontSize: '1.15rem', color: 'var(--gold-light)', marginBottom: '8px' }}>
            Dynamic Real-Time Sankalpam
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Instant Sanskrit-Telugu Sankalpam computed using the day's Panchangam and Host's Gothram & Nakshatram.
          </p>
        </div>

        <div className="gold-card" style={{ padding: '24px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px', color: 'var(--emerald-pacha)' }}>
            <Share2 size={24} />
          </div>
          <h3 style={{ fontSize: '1.15rem', color: 'var(--gold-light)', marginBottom: '8px' }}>
            1-Click WhatsApp Samagri Link
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Pre-built pooja item catalogs sent to clients with an interactive shopping checklist link.
          </p>
        </div>

        <div className="gold-card" style={{ padding: '24px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(74,7,19,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px', color: '#FFA040' }}>
            <HeartHandshake size={24} />
          </div>
          <h3 style={{ fontSize: '1.15rem', color: 'var(--gold-light)', marginBottom: '8px' }}>
            Panthulu Delegation Network
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Seamlessly delegate overlapping wedding or housewarming events to associate priests via Gmail and WhatsApp.
          </p>
        </div>
      </div>
    </div>
  );
}
