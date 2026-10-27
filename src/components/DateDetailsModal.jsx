import React from 'react';
import { X, Calendar as CalendarIcon, Sun, Moon, Clock, Sparkles, CheckCircle2 } from 'lucide-react';

export function DateDetailsModal({ dateStr, panchangam, onClose }) {
  if (!dateStr) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 2500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div className="gold-card" style={{ width: '100%', maxWidth: '440px', maxHeight: '88vh', overflowY: 'auto', padding: '20px', background: '#171511', border: '1px solid var(--signature-gold)' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(154,118,40,0.2)', paddingBottom: '10px', marginBottom: '12px' }}>
          <div>
            <span className="kumkuma-badge" style={{ fontSize: '0.68rem' }}>PANCHANGAM DETAILS</span>
            <h3 className="font-heading" style={{ fontSize: '1.25rem', color: 'var(--champagne-gold)', margin: '2px 0 0' }}>
              📅 {dateStr} Panchangam
            </h3>
          </div>

          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Panchangam Breakdown Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.84rem' }}>
          
          {/* Samvathsaram & Maasam */}
          <div style={{ background: 'rgba(0,0,0,0.4)', padding: '10px', borderRadius: '8px' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem', display: 'block' }}>Samvathsaram & Maasam:</span>
            <strong style={{ color: 'var(--pure-highlight)' }}>{panchangam.samvathsaram || 'Krodhi Nama Samvathsaram'}</strong>
            <span style={{ color: 'var(--champagne-gold)', display: 'block', fontSize: '0.78rem' }}>
              {panchangam.maasam || 'Sravana Maasam • Shukla Paksham'}
            </span>
          </div>

          {/* Tithi & Nakshatram */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '10px', borderRadius: '8px' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem', display: 'block' }}>Tithi:</span>
              <strong style={{ color: 'var(--pure-highlight)' }}>{panchangam.tithi || 'Shukla Ekadashi'}</strong>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', display: 'block' }}>Till 04:12 PM</span>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '10px', borderRadius: '8px' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem', display: 'block' }}>Nakshatram:</span>
              <strong style={{ color: 'var(--champagne-gold)' }}>{panchangam.nakshatram || 'Rohini'}</strong>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', display: 'block' }}>Till 07:45 PM</span>
            </div>
          </div>

          {/* Yogam & Karanam */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '10px', borderRadius: '8px' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem', display: 'block' }}>Yogam:</span>
              <span style={{ color: '#FFF' }}>{panchangam.yogam || 'Shukla Yogam'}</span>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '10px', borderRadius: '8px' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem', display: 'block' }}>Karanam:</span>
              <span style={{ color: '#FFF' }}>{panchangam.karanam || 'Bava Karanam'}</span>
            </div>
          </div>

          {/* Inauspicious Timings: Rahu Kalam & Yamagandam */}
          <div style={{ background: 'rgba(74,7,19,0.3)', padding: '10px', borderRadius: '8px', borderLeft: '3px solid #FF5252' }}>
            <span style={{ color: '#FFA040', fontSize: '0.72rem', display: 'block' }}>Inauspicious Timings (వర్జ్యం):</span>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2px', color: '#FFCDD2', fontSize: '0.78rem' }}>
              <span>Rahu Kalam: <strong>{panchangam.rahuKalam || '04:30 PM - 06:00 PM'}</strong></span>
              <span>Yamagandam: <strong>12:00 PM - 01:30 PM</strong></span>
            </div>
          </div>

          {/* Auspicious Timings: Abhijit & Subha Lagnams */}
          <div style={{ background: 'rgba(16,185,129,0.12)', padding: '10px', borderRadius: '8px', borderLeft: '3px solid #10B981' }}>
            <span style={{ color: '#6EE7B7', fontSize: '0.72rem', display: 'block' }}>Auspicious Timings (శుభ ముహూర్తం):</span>
            <div style={{ color: '#A7F3D0', fontSize: '0.8rem', marginTop: '2px', fontWeight: 600 }}>
              Abhijit: {panchangam.abhijitMuhurtham || '11:45 AM - 12:35 PM'}
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem', marginTop: '2px' }}>
              Subha Lagnams: Simha (06:15 AM), Vrischika (11:30 AM), Dhanus (02:40 PM)
            </div>
          </div>

        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
          <button onClick={onClose} className="gold-button-primary" style={{ padding: '6px 16px', fontSize: '0.8rem' }}>
            Close Panchangam
          </button>
        </div>

      </div>
    </div>
  );
}
