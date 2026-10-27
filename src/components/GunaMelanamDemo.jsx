import React, { useState } from 'react';
import { Heart, Sparkles, Star, CheckCircle, AlertTriangle } from 'lucide-react';
import { NAKSHATRAS } from '../data/mockData';

export function GunaMelanamDemo() {
  const [groomStar, setGroomStar] = useState('Uttarabhadra (Meena Rasi)');
  const [brideStar, setBrideStar] = useState('Rohini (Vrushabha Rasi)');

  // Calculate mock Ashtakoota based on selection
  const isPerfectMatch = groomStar.includes('Uttarabhadra') && brideStar.includes('Rohini');
  const totalScore = isPerfectMatch ? 36 : (groomStar === brideStar ? 24 : 29);

  const kootas = [
    { name: 'Varna Kootam', max: 1, obtained: 1, desc: 'Spiritual harmony & ego alignment' },
    { name: 'Vashya Kootam', max: 2, obtained: 2, desc: 'Mutual magnetic attraction & respect' },
    { name: 'Tara Balam', max: 3, obtained: isPerfectMatch ? 3 : 2, desc: 'Health, longevity & good fortune' },
    { name: 'Yoni Kootam', max: 4, obtained: isPerfectMatch ? 4 : 3, desc: 'Biological & intimate compatibility' },
    { name: 'Graha Maitri', max: 5, obtained: isPerfectMatch ? 5 : 4, desc: 'Friendship between planetary lords' },
    { name: 'Gana Kootam', max: 6, obtained: isPerfectMatch ? 6 : 5, desc: 'Deva / Manushya Gana temperament alignment' },
    { name: 'Bhakoot / Rasi Kootam', max: 7, obtained: isPerfectMatch ? 7 : 7, desc: 'Family prosperity & financial harmony' },
    { name: 'Nadi Kootam', max: 8, obtained: isPerfectMatch ? 8 : 7, desc: 'Genetic compatibility & no Nadi Dosha' },
  ];

  return (
    <div style={{ padding: '24px 20px', maxWidth: '1150px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <span className="kumkuma-badge" style={{ marginBottom: '10px' }}>
          <Star size={14} /> DEMO 7: 36-GUNA HOROSCOPE COMPATIBILITY MATCHER
        </span>
        <h2 className="font-heading" style={{ fontSize: '2.1rem', color: 'var(--text-gold)' }}>
          Vivaha Guna Melanam & Ashtakoota Analyzer
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '750px', margin: '6px auto 0' }}>
          Instantly evaluate birth stars (Nakshatrams) and calculate the full 36-point Ashtakoota compatibility table with detailed astrological feedback.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        
        {/* Left Column: Nakshatra Selectors */}
        <div className="gold-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ color: 'var(--gold-light)', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Heart size={20} color="#FF6F00" /> Select Birth Stars (Nakshatras)
          </h3>

          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
              Groom's Star (Varuni Nakshatram):
            </label>
            <select
              value={groomStar}
              onChange={(e) => setGroomStar(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid var(--border-gold)',
                background: '#1A1108',
                color: 'var(--gold-light)',
                fontSize: '0.95rem'
              }}
            >
              {NAKSHATRAS.map((n, idx) => (
                <option key={idx} value={n}>{n}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
              Bride's Star (Vadhuvu Nakshatram):
            </label>
            <select
              value={brideStar}
              onChange={(e) => setBrideStar(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid var(--border-gold)',
                background: '#1A1108',
                color: 'var(--gold-light)',
                fontSize: '0.95rem'
              }}
            >
              {NAKSHATRAS.map((n, idx) => (
                <option key={idx} value={n}>{n}</option>
              ))}
            </select>
          </div>

          {/* Total Score Summary Card */}
          <div style={{ background: 'rgba(245,189,2,0.1)', border: '1px solid var(--border-gold-bright)', borderRadius: '12px', padding: '20px', textAlign: 'center', marginTop: '10px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Overall Compatibility Score:</span>
            <div className="font-heading" style={{ fontSize: '2.8rem', fontWeight: 800, color: 'var(--gold-primary)', lineHeight: 1.1, margin: '8px 0' }}>
              {totalScore} <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>/ 36</span>
            </div>

            <div className="kumkuma-badge" style={{ background: totalScore >= 28 ? 'rgba(16,185,129,0.2)' : 'rgba(255,111,0,0.2)', color: totalScore >= 28 ? '#6EE7B7' : '#FFA040', border: `1px solid ${totalScore >= 28 ? '#10B981' : '#FF6F00'}` }}>
              {totalScore >= 28 ? 'Uttama Ponthana (Exceptional Match)' : 'Madhyama Ponthana (Good Match)'}
            </div>

            <p style={{ fontSize: '0.88rem', color: '#FFE082', marginTop: '10px' }}>
              Zero Nadi Dosha. Perfect alignment in Graha Maitri (planetary friendship) and Bhakoot (family prosperity).
            </p>
          </div>
        </div>

        {/* Right Column: 8-Koota Breakdown Table */}
        <div className="gold-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', background: '#0D0905', border: '1px solid var(--border-gold-bright)' }}>
          <h3 style={{ fontSize: '1.15rem', color: 'var(--gold-light)', marginBottom: '14px', borderBottom: '1px solid rgba(245,189,2,0.2)', paddingBottom: '10px' }}>
            Ashtakoota 8-Factor Score Breakdown
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', maxHeight: '380px', paddingRight: '4px' }}>
            {kootas.map((k, idx) => (
              <div 
                key={idx}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  background: 'rgba(0,0,0,0.4)', 
                  padding: '10px 14px', 
                  borderRadius: '8px',
                  border: '1px solid rgba(245,189,2,0.15)'
                }}
              >
                <div>
                  <h4 style={{ color: '#FFF', fontSize: '0.92rem', margin: 0 }}>
                    {k.name}
                  </h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{k.desc}</span>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--gold-primary)' }}>
                    {k.obtained} / {k.max}
                  </span>
                  <span style={{ display: 'block', fontSize: '0.7rem', color: '#10B981' }}>Compatible</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
