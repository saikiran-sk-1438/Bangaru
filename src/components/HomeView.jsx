import React from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Plus, BookOpen, Compass, Share2, Users, ArrowRight, Edit2, Trash2 } from 'lucide-react';
import { INITIAL_PANCHANGAM } from '../data/mockData';

export function HomeView({ bookings, priestName, onNavigate, onOpenPlusModal, onEditBooking, onDeleteBooking }) {
  const todayStr = '2026-08-23';
  const todayBookings = bookings.filter(b => b.date === todayStr);

  const handleDelete = (id, title) => {
    if (window.confirm(`Delete "${title}"?`)) {
      onDeleteBooking(id);
    }
  };

  return (
    <div style={{ padding: '16px', maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* Welcome Banner displaying logged-in Priest Name */}
      <div className="gold-card" style={{ padding: '16px', background: 'var(--deep-charcoal)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--signature-gold)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              TODAY • {INITIAL_PANCHANGAM.samvathsaram}
            </span>
            <h2 className="font-heading" style={{ fontSize: '1.3rem', color: 'var(--champagne-gold)', margin: '2px 0 0' }}>
              Namaskaram, {priestName || 'Sri Krishnamurthy Shastri'} Garu
            </h2>
          </div>
          <span className="diya-flame" style={{ fontSize: '20px' }}>🪔</span>
        </div>

        {/* 4 Minimal Stat Pills */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.82rem' }}>
          <div style={{ background: 'rgba(0,0,0,0.4)', padding: '10px', borderRadius: '8px' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem', display: 'block' }}>Tithi:</span>
            <strong style={{ color: 'var(--pure-highlight)' }}>{INITIAL_PANCHANGAM.tithi}</strong>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.4)', padding: '10px', borderRadius: '8px' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem', display: 'block' }}>Nakshatram:</span>
            <strong style={{ color: 'var(--champagne-gold)' }}>{INITIAL_PANCHANGAM.nakshatram}</strong>
          </div>

          <div style={{ background: 'rgba(74,7,19,0.3)', padding: '10px', borderRadius: '8px', borderLeft: '3px solid #FF5252' }}>
            <span style={{ color: '#FFA040', fontSize: '0.72rem', display: 'block' }}>Rahu Kalam:</span>
            <strong style={{ color: '#FFCDD2' }}>{INITIAL_PANCHANGAM.rahuKalam}</strong>
          </div>

          <div style={{ background: 'rgba(16,185,129,0.1)', padding: '10px', borderRadius: '8px', borderLeft: '3px solid #10B981' }}>
            <span style={{ color: '#6EE7B7', fontSize: '0.72rem', display: 'block' }}>Abhijit Muhurtham:</span>
            <strong style={{ color: '#A7F3D0' }}>{INITIAL_PANCHANGAM.abhijitMuhurtham}</strong>
          </div>
        </div>
      </div>

      {/* Today's Scheduled Poojas */}
      <div className="gold-card" style={{ padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h3 style={{ fontSize: '1.05rem', color: 'var(--champagne-gold)', margin: 0 }}>
            Today's Poojas
          </h3>
          <button 
            onClick={() => onNavigate('calendar')}
            style={{ background: 'none', border: 'none', color: 'var(--signature-gold)', fontSize: '0.78rem', cursor: 'pointer' }}
          >
            Calendar →
          </button>
        </div>

        {todayBookings.length === 0 ? (
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', padding: '8px 0' }}>
            No poojas scheduled today. Tap <strong>+</strong> to add one.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {todayBookings.map(b => (
              <div 
                key={b.id} 
                style={{ 
                  background: 'rgba(0,0,0,0.4)', 
                  border: '1px solid var(--border-gold)', 
                  borderRadius: '8px', 
                  padding: '10px 12px',
                  position: 'relative'
                }}
              >
                {/* Top Right Corner Edit & Delete Icons */}
                <div style={{ position: 'absolute', top: '8px', right: '8px', display: 'flex', gap: '4px' }}>
                  <button 
                    onClick={() => { onNavigate('calendar'); }}
                    style={{ background: 'rgba(198,161,91,0.15)', border: '1px solid var(--border-gold)', borderRadius: '4px', padding: '3px 5px', color: 'var(--champagne-gold)', cursor: 'pointer', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '2px' }}
                    title="Edit in Calendar"
                  >
                    <Edit2 size={12} /> Edit
                  </button>

                  <button 
                    onClick={() => handleDelete(b.id, b.title)}
                    style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid #EF4444', borderRadius: '4px', padding: '3px 5px', color: '#F87171', cursor: 'pointer', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '2px' }}
                    title="Delete"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>

                <div style={{ paddingRight: '80px' }}>
                  <strong style={{ fontSize: '0.92rem', color: '#FFF' }}>{b.title}</strong>
                  <span style={{ fontSize: '0.75rem', color: '#10B981', background: 'rgba(16,185,129,0.15)', padding: '2px 6px', borderRadius: '6px', marginLeft: '6px' }}>{b.time}</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {b.clientName} • {b.venue}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4 Minimal Shortcut Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', textAlign: 'center' }}>
        <button 
          onClick={() => onNavigate('teleprompter')}
          className="gold-card" 
          style={{ padding: '12px 6px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
        >
          <BookOpen size={20} color="var(--signature-gold)" />
          <span style={{ fontSize: '0.75rem', color: '#FFF', fontWeight: 600 }}>Reader</span>
        </button>

        <button 
          onClick={() => onNavigate('sankalpam')}
          className="gold-card" 
          style={{ padding: '12px 6px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
        >
          <Compass size={20} color="var(--signature-gold)" />
          <span style={{ fontSize: '0.75rem', color: '#FFF', fontWeight: 600 }}>Sankalpam</span>
        </button>

        <button 
          onClick={() => onNavigate('samagri')}
          className="gold-card" 
          style={{ padding: '12px 6px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
        >
          <Share2 size={20} color="var(--signature-gold)" />
          <span style={{ fontSize: '0.75rem', color: '#FFF', fontWeight: 600 }}>Samagri</span>
        </button>

        <button 
          onClick={() => onNavigate('delegation')}
          className="gold-card" 
          style={{ padding: '12px 6px', display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center', cursor: 'pointer' }}
        >
          <Users size={20} color="var(--signature-gold)" />
          <span style={{ fontSize: '0.75rem', color: '#FFF', fontWeight: 600 }}>Delegate</span>
        </button>
      </div>

    </div>
  );
}
