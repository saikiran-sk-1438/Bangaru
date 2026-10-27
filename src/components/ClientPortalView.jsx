import React, { useState, useMemo } from 'react';
import { Sparkles, CheckSquare, Square, Share2, Check, Phone, ArrowRight, ArrowLeft } from 'lucide-react';
import { SAMAGRI_PRESETS } from '../data/mockData';

export function ClientPortalView() {
  const params = new URLSearchParams(window.location.search);
  const samagriKey = params.get('samagri');
  const customId = params.get('customId');
  const rawData = params.get('data');
  const clientName = params.get('client') || 'Suresh Sharma';
  const priestName = params.get('priest') || 'Sri Krishnamurthy Shastri';
  
  // Resolve Checklist: Custom (via URL data or local storage) OR Standard Preset
  const activeList = useMemo(() => {
    if (rawData) {
      try {
        const parsed = JSON.parse(decodeURIComponent(rawData));
        if (parsed && parsed.items) return parsed;
      } catch (e) {
        console.warn('Could not parse custom checklist data from URL:', e);
      }
    }

    if (customId) {
      try {
        const savedCustoms = JSON.parse(localStorage.getItem('bangaru_custom_samagri_lists') || '[]');
        const found = savedCustoms.find(l => l.id === customId);
        if (found) return found;
      } catch (e) {
        console.warn('Could not find custom list in local storage:', e);
      }
    }

    if (samagriKey && SAMAGRI_PRESETS[samagriKey]) {
      return SAMAGRI_PRESETS[samagriKey];
    }

    return SAMAGRI_PRESETS['satyanarayana'];
  }, [samagriKey, customId, rawData]);

  const [checkedItems, setCheckedItems] = useState({});

  const toggleItem = (idx) => {
    setCheckedItems(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalCount = activeList.items ? activeList.items.length : 0;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleNotifyPriest = () => {
    const text = `🙏🏻 *Namaskaram ${priestName} Garu*\n\nThis is *${clientName}*. I have updated the Samagri Shopping Checklist for *${activeList.title}*:\n\n✅ Purchased: ${completedCount} / ${totalCount} items (${progressPercent}% complete).\n\nThank you!`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-sanctum)', color: 'var(--text-main)', padding: '16px 12px 40px', maxWidth: '540px', margin: '0 auto' }}>
      
      {/* Brand Header: Bangaru Vedic Calendar */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', paddingBottom: '16px', borderBottom: '1px solid rgba(154,118,40,0.3)', marginBottom: '16px' }}>
        <img src="/logo.png" alt="Bangaru Logo" style={{ width: '38px', height: '38px', objectFit: 'contain', filter: 'drop-shadow(0 0 6px var(--signature-gold))' }} />
        <h1 className="font-heading" style={{ fontSize: '1.25rem', color: 'var(--champagne-gold)', margin: 0, letterSpacing: '0.5px' }}>
          Bangaru Vedic Calendar
        </h1>
      </header>

      {/* Dedicated Client Welcome Banner */}
      <div className="gold-card" style={{ padding: '16px', background: 'var(--bg-card)', border: '1px solid var(--border-gold-bright)', marginBottom: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span className="kumkuma-badge" style={{ fontSize: '0.7rem', marginBottom: '4px' }}>
              OFFICIAL POOJA CHECKLIST
            </span>
            
            <h2 className="font-heading" style={{ fontSize: '1.3rem', color: 'var(--champagne-gold)', margin: '4px 0 2px' }}>
              {activeList.title}
            </h2>
          </div>
          <span style={{ fontSize: '26px' }}>{activeList.icon || '🌸'}</span>
        </div>

        <div style={{ fontSize: '0.85rem', color: 'var(--pure-highlight)', fontWeight: 600, marginTop: '4px' }}>
          Prepared for: <span style={{ color: 'var(--signature-gold)' }}>{clientName} Garu</span>
        </div>

        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
          Priest: <strong>{priestName} Garu</strong>
        </div>

        {/* Shopping Progress Bar */}
        <div style={{ marginTop: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
            <span>Purchased Items</span>
            <strong style={{ color: '#10B981' }}>{completedCount} of {totalCount} ({progressPercent}%)</strong>
          </div>
          <div style={{ width: '100%', height: '8px', borderRadius: '4px', background: 'rgba(0,0,0,0.5)', overflow: 'hidden' }}>
            <div style={{ width: `${progressPercent}%`, height: '100%', background: 'linear-gradient(90deg, #10B981, #34D399)', transition: 'width 0.3s ease' }} />
          </div>
        </div>
      </div>

      {/* Interactive Item Checklist */}
      <div className="gold-card" style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>
          Tap item when bought at market ({totalCount} items):
        </span>

        {activeList.items && activeList.items.map((item, idx) => {
          const isChecked = !!checkedItems[idx];
          return (
            <div
              key={idx}
              onClick={() => toggleItem(idx)}
              style={{
                padding: '12px',
                borderRadius: '10px',
                background: isChecked ? 'rgba(16,185,129,0.12)' : 'rgba(0,0,0,0.4)',
                border: isChecked ? '1px solid #10B981' : '1px solid rgba(154,118,40,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                userSelect: 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ color: isChecked ? '#10B981' : 'var(--signature-gold)' }}>
                  {isChecked ? <CheckSquare size={20} /> : <Square size={20} />}
                </div>
                <div>
                  <strong style={{ fontSize: '0.92rem', color: isChecked ? '#A7F3D0' : 'var(--text-main)', textDecoration: isChecked ? 'line-through' : 'none' }}>
                    {item.nameRoman}
                  </strong>
                  {item.nameEnglish && (
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block' }}>
                      {item.nameEnglish}
                    </span>
                  )}
                </div>
              </div>

              <span style={{ fontSize: '0.8rem', color: 'var(--champagne-gold)', fontWeight: 700 }}>
                {item.qty}
              </span>
            </div>
          );
        })}
      </div>

      {/* Direct WhatsApp Notify Button */}
      <button 
        onClick={handleNotifyPriest} 
        className="gold-button-primary"
        style={{ width: '100%', fontSize: '0.92rem', minHeight: '48px' }}
      >
        <Share2 size={18} /> Update Priest via WhatsApp
      </button>

      {/* Footer */}
      <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
        Powered by Bangaru Vedic Calendar • Sacred Ritual Assistant
      </div>

    </div>
  );
}
