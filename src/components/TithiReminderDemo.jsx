import React, { useState } from 'react';
import { Calendar, Bell, Sparkles, MessageCircle, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

export function TithiReminderDemo() {
  const [selectedTithi, setSelectedTithi] = useState('bhadrapada_ashtami');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [sentAlert, setSentAlert] = useState(false);

  const tithiData = {
    bhadrapada_ashtami: {
      nameRoman: 'Bhadrapada Bahula Ashtami',
      occasion: 'Pithru Devathala Varshika Shraddham (Father’s Death Anniversary)',
      hostName: 'Sri Kameswara Rao Garu',
      hostPhone: '9848112233',
      years: {
        '2024': { date: '25-September-2024', day: 'Wednesday (Budhavaram)' },
        '2025': { date: '15-September-2025', day: 'Monday (Somavaram)' },
        '2026': { date: '04-October-2026', day: 'Sunday (Aadivaram)' },
        '2027': { date: '24-September-2027', day: 'Friday (Sukravaram)' }
      }
    },
    sravana_sukla_ekadasi: {
      nameRoman: 'Sravana Sukla Ekadasi (Putrada Ekadasi)',
      occasion: 'Annual Sri Satyanarayana Swamy Vratham',
      hostName: 'Sri Venkata Ramana Garu',
      hostPhone: '9988223344',
      years: {
        '2024': { date: '16-August-2024', day: 'Friday (Sukravaram)' },
        '2025': { date: '05-August-2025', day: 'Tuesday (Mangalavaram)' },
        '2026': { date: '24-August-2026', day: 'Monday (Somavaram)' },
        '2027': { date: '13-August-2027', day: 'Friday (Sukravaram)' }
      }
    }
  };

  const currentTithi = tithiData[selectedTithi];
  const currentDateInfo = currentTithi.years[selectedYear];

  const courtesyMessage = `Namaskarams ${currentTithi.hostName},

This year (${selectedYear}), your ancestral annual Shraddha ceremony (Lunar Tithi: ${currentTithi.nameRoman}) falls on "${currentDateInfo.date} (${currentDateInfo.day})" according to the English calendar.

Please plan ahead and confirm the auspicious Muhurtham timing with us.
- Warm regards, Sri Krishnamurthy Shastri (Ph: 98480xxxxx)`;

  return (
    <div style={{ padding: '24px 20px', maxWidth: '1150px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <span className="kumkuma-badge" style={{ marginBottom: '10px' }}>
          <Bell size={14} /> DEMO 6: LUNAR TITHI-BASED AUTO-REMINDER ENGINE
        </span>
        <h2 className="font-heading" style={{ fontSize: '2.1rem', color: 'var(--text-gold)' }}>
          Annual Shraddha & Vratham Tithi Converter
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '750px', margin: '6px auto 0' }}>
          Hindu Lunar Tithis shift by 10–20 days every Gregorian year. This engine auto-computes the exact solar date and drafts reminders 15 days in advance.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        
        {/* Left Column: Tithi Selector & Multi-Year Timeline */}
        <div className="gold-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ color: 'var(--gold-light)', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={20} color="var(--gold-primary)" /> Select Host Tithi Record
          </h3>

          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
              Host & Occasion (Yajamana & Karyakramam):
            </label>
            <select
              value={selectedTithi}
              onChange={(e) => setSelectedTithi(e.target.value)}
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
              <option value="bhadrapada_ashtami">Kameswara Rao - Father Shraddha (Bhadrapada Bahula Ashtami)</option>
              <option value="sravana_sukla_ekadasi">Venkata Ramana - Annual Vratham (Sravana Sukla Ekadasi)</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
              Select Year to Observe Dynamic Date Shifting:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
              {['2024', '2025', '2026', '2027'].map((yr) => (
                <button
                  key={yr}
                  onClick={() => setSelectedYear(yr)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: selectedYear === yr ? '1px solid var(--gold-primary)' : '1px solid rgba(245,189,2,0.2)',
                    background: selectedYear === yr ? 'var(--grad-gold)' : 'rgba(0,0,0,0.4)',
                    color: selectedYear === yr ? '#000' : '#FFF',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {yr}
                </button>
              ))}
            </div>
          </div>

          {/* Computed Date Highlight Card */}
          <div style={{ background: 'rgba(245,189,2,0.08)', border: '1px solid var(--border-gold)', borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Computed Solar Date in {selectedYear}:
            </span>
            <div style={{ fontSize: '1.5rem', color: 'var(--gold-light)', fontWeight: 800, margin: '6px 0' }}>
              {currentDateInfo.date}
            </div>
            <span className="kumkuma-badge">{currentDateInfo.day}</span>
          </div>

          {/* Multi-Year Timeline Visualizer */}
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '8px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            <strong style={{ color: 'var(--gold-primary)', display: 'block', marginBottom: '6px' }}>Date Shifting History across Years:</strong>
            {Object.entries(currentTithi.years).map(([yr, info]) => (
              <div key={yr} style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0', color: yr === selectedYear ? '#FFE082' : 'inherit', fontWeight: yr === selectedYear ? 700 : 400 }}>
                <span>Year {yr}:</span>
                <span>{info.date} ({info.day})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Pre-Drafted Courtesy Alert */}
        <div className="gold-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', background: '#0D0905', border: '1px solid var(--border-gold-bright)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(245,189,2,0.25)', paddingBottom: '12px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bell size={18} color="var(--gold-primary)" />
              <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--gold-light)' }}>
                15-Day Prior Courtesy WhatsApp Alert
              </span>
            </div>
            <span className="saffron-badge">Auto-Schedule</span>
          </div>

          <div 
            style={{ 
              flex: 1, 
              background: '#0B141A', 
              borderRadius: '8px', 
              padding: '16px', 
              overflowY: 'auto', 
              maxHeight: '280px',
              fontSize: '0.92rem',
              color: '#E9EDEF',
              lineHeight: 1.8,
              whiteSpace: 'pre-line',
              border: '1px solid #1F2C34'
            }}
          >
            {courtesyMessage}
          </div>

          <button 
            onClick={() => { setSentAlert(true); setTimeout(() => setSentAlert(false), 2500); }}
            className="gold-button-primary" 
            style={{ marginTop: '16px', justifyContent: 'center', background: 'linear-gradient(135deg, #10B981, #059669)', color: '#FFF' }}
          >
            <MessageCircle size={18} /> Send Courtesy WhatsApp Alert
          </button>

          {sentAlert && (
            <div style={{ marginTop: '10px', background: 'rgba(16,185,129,0.15)', border: '1px solid #10B981', padding: '8px', borderRadius: '6px', color: '#6EE7B7', fontSize: '0.85rem', textAlign: 'center' }}>
              <CheckCircle2 size={14} style={{ display: 'inline', marginRight: '4px' }} /> Reminder notification successfully queued!
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
