import React from 'react';
import { Cpu, WifiOff, ShieldCheck, Database, Smartphone, Check, X, Layers } from 'lucide-react';

export function ArchitectureSlide() {
  const comparisons = [
    {
      feature: 'Mantra Chanting (Mantra Patanam)',
      traditional: 'Flipping physical paper pages or screen turning off every 30s',
      smartSuite: 'Hands-Free auto-scrolling with rotary speed dial & wake-lock'
    },
    {
      feature: 'Maha Sankalpam Composition',
      traditional: 'Mental calculation of tithi, paksha, ritu & rishi pravaras',
      smartSuite: 'Dynamic real-time compiler based on live panchangam & host profile'
    },
    {
      feature: 'Pooja Items List (Samagri Jaabitha)',
      traditional: 'Messy paper notes or 20-minute phone dictation',
      smartSuite: '1-Click WhatsApp link with interactive shopping checkboxes'
    },
    {
      feature: 'Overlapping Bookings (Badhili)',
      traditional: 'Making 10 frantic phone calls to explain address & fees',
      smartSuite: 'Automated Gmail & WhatsApp dispatch packet with Google Maps link'
    },
    {
      feature: 'Annual Death Anniversaries (Shraddha Tithis)',
      traditional: 'Manually searching almanacs every year with frequent misses',
      smartSuite: 'Auto-calculates solar Gregorian dates with 15-day prior alerts'
    },
    {
      feature: 'Offline Operation in Remote Sanctums',
      traditional: 'No cellular data means lost notes and no online access',
      smartSuite: '100% Offline-First (IndexedDB & local PWA storage)'
    }
  ];

  return (
    <div style={{ padding: '24px 20px', maxWidth: '1150px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <span className="kumkuma-badge" style={{ marginBottom: '10px' }}>
          <Layers size={14} /> SYSTEM ARCHITECTURE & COMPARISON
        </span>
        <h2 className="font-heading" style={{ fontSize: '2.1rem', color: 'var(--text-gold)' }}>
          Traditional Priestly Workflow vs Vedic Smart Suite
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '750px', margin: '6px auto 0' }}>
          Preserving sacred Vedic rituals while saving hours of manual administrative friction every single week.
        </p>
      </div>

      {/* Comparison Matrix Table */}
      <div className="gold-card" style={{ padding: '20px', marginBottom: '28px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border-gold)' }}>
              <th style={{ padding: '12px 16px', color: 'var(--gold-light)', fontSize: '0.95rem' }}>Workflow Area</th>
              <th style={{ padding: '12px 16px', color: '#EF4444', fontSize: '0.95rem' }}>Traditional Old Way</th>
              <th style={{ padding: '12px 16px', color: '#10B981', fontSize: '0.95rem' }}>Vedic Panthulu Smart Suite</th>
            </tr>
          </thead>
          <tbody>
            {comparisons.map((c, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid rgba(245,189,2,0.1)', background: idx % 2 === 0 ? 'rgba(0,0,0,0.2)' : 'transparent' }}>
                <td style={{ padding: '12px 16px', color: '#FFF', fontWeight: 600, fontSize: '0.9rem' }}>
                  {c.feature}
                </td>
                <td style={{ padding: '12px 16px', color: '#FCA5A5', fontSize: '0.85rem' }}>
                  <X size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle', color: '#EF4444' }} />
                  {c.traditional}
                </td>
                <td style={{ padding: '12px 16px', color: '#6EE7B7', fontWeight: 600, fontSize: '0.88rem' }}>
                  <Check size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle', color: '#10B981' }} />
                  {c.smartSuite}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 3 Pillars of Architecture */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        <div className="gold-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--gold-primary)', marginBottom: '10px' }}>
            <WifiOff size={24} />
            <h4 style={{ fontSize: '1.05rem', color: 'var(--gold-light)' }}>100% Offline-First Architecture</h4>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Designed to work smoothly in deep temple sanctums or rural village homes with zero cellular signal.
          </p>
        </div>

        <div className="gold-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--saffron-bright)', marginBottom: '10px' }}>
            <Smartphone size={24} />
            <h4 style={{ fontSize: '1.05rem', color: 'var(--gold-light)' }}>Mobile & Tablet Stand Mode</h4>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Large high-contrast gold fonts readable from 2-3 feet away when placed next to the Homa Gundam.
          </p>
        </div>

        <div className="gold-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#10B981', marginBottom: '10px' }}>
            <ShieldCheck size={24} />
            <h4 style={{ fontSize: '1.05rem', color: 'var(--gold-light)' }}>Complete Privacy & Local Security</h4>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Yajamana contact numbers, family Gothrams, and Dakshina accounts stay securely on the priest's device.
          </p>
        </div>
      </div>
    </div>
  );
}
