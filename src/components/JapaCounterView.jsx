import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { RotateCcw, Award, Sparkles, Volume2, Target, CheckCircle2 } from 'lucide-react';

export function JapaCounterView() {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(108);
  const [malaCompleted, setMalaCompleted] = useState(0);
  const [selectedMantra, setSelectedMantra] = useState('Om Namah Shivaya');

  const handleIncrement = () => {
    const nextCount = count + 1;
    setCount(nextCount);

    // Vibration feedback if supported on mobile
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(30);
    }

    // Check if target (e.g. 108) completed
    if (nextCount % target === 0) {
      setMalaCompleted(prev => prev + 1);
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C6A15B', '#E2C98B', '#10B981']
      });
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset current Sloka count to 0?')) {
      setCount(0);
      setMalaCompleted(0);
    }
  };

  return (
    <div style={{ padding: '16px', maxWidth: '500px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
      
      {/* Title Header */}
      <div style={{ textAlign: 'center' }}>
        <span className="kumkuma-badge" style={{ fontSize: '0.72rem' }}>SACRED JAPA MALA</span>
        <h2 className="font-heading" style={{ fontSize: '1.5rem', color: 'var(--champagne-gold)', margin: '4px 0 0' }}>
          Sloka & Mantra Counter
        </h2>
        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          Tap the sacred bead button to increment your chant count
        </span>
      </div>

      {/* Selected Mantra Preset Selector */}
      <div className="gold-card" style={{ width: '100%', padding: '12px 14px', background: 'var(--deep-charcoal)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Selected Mantra:</span>
        <select
          value={selectedMantra}
          onChange={(e) => setSelectedMantra(e.target.value)}
          style={{ background: '#000', color: 'var(--champagne-gold)', border: '1px solid var(--border-gold)', borderRadius: '6px', padding: '4px 8px', fontSize: '0.82rem', fontWeight: 600, outline: 'none' }}
        >
          <option value="Om Namah Shivaya">🕉️ Om Namah Shivaya</option>
          <option value="Gayatri Mantra">☀️ Gayatri Mantra</option>
          <option value="Mahamrityunjaya Mantra">🌿 Mahamrityunjaya</option>
          <option value="Sri Rama Taraka Mantra">🏹 Sri Rama Namam</option>
          <option value="Hare Krishna Mahamantra">🪈 Hare Krishna</option>
          <option value="Custom Sloka Chant">📜 Custom Sloka Chant</option>
        </select>
      </div>

      {/* Big Counter Bead Ring */}
      <div 
        onClick={handleIncrement}
        className="gold-card"
        style={{
          width: '240px',
          height: '240px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, #29231A 0%, #171511 70%, #0B0A08 100%)',
          border: '4px solid var(--signature-gold)',
          boxShadow: '0 0 30px rgba(198,161,91,0.3)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          userSelect: 'none',
          transition: 'transform 0.1s ease',
          margin: '10px 0'
        }}
      >
        <span style={{ fontSize: '0.8rem', color: 'var(--signature-gold)', textTransform: 'uppercase', letterSpacing: '1px' }}>
          COUNT
        </span>
        <span className="font-heading" style={{ fontSize: '3.6rem', fontWeight: 800, color: 'var(--pure-highlight)', lineHeight: 1 }}>
          {count}
        </span>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
          Target: {target}
        </span>
      </div>

      {/* Target & Mala Milestone Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', width: '100%' }}>
        <div className="gold-card" style={{ padding: '10px', textAlign: 'center', background: 'rgba(0,0,0,0.4)' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Mala Completed:</span>
          <strong style={{ fontSize: '1.1rem', color: '#10B981' }}>{malaCompleted} Malas ({malaCompleted * target} Chants)</strong>
        </div>

        <div className="gold-card" style={{ padding: '10px', textAlign: 'center', background: 'rgba(0,0,0,0.4)' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Target Milestone:</span>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '2px' }}>
            <button onClick={() => setTarget(108)} style={{ padding: '2px 8px', borderRadius: '4px', border: target === 108 ? '1px solid var(--signature-gold)' : '1px solid var(--border-gold)', background: target === 108 ? 'var(--signature-gold)' : '#000', color: target === 108 ? '#000' : '#FFF', fontSize: '0.75rem', fontWeight: 700 }}>108</button>
            <button onClick={() => setTarget(1008)} style={{ padding: '2px 8px', borderRadius: '4px', border: target === 1008 ? '1px solid var(--signature-gold)' : '1px solid var(--border-gold)', background: target === 1008 ? 'var(--signature-gold)' : '#000', color: target === 1008 ? '#000' : '#FFF', fontSize: '0.75rem', fontWeight: 700 }}>1008</button>
          </div>
        </div>
      </div>

      {/* Reset & Tap Instruction Button */}
      <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
        <button 
          onClick={handleReset} 
          className="gold-button-secondary"
          style={{ flex: 1, border: '1px solid #EF4444', color: '#F87171' }}
        >
          <RotateCcw size={16} /> Reset Counter
        </button>

        <button 
          onClick={handleIncrement} 
          className="gold-button-primary"
          style={{ flex: 2 }}
        >
          <Sparkles size={16} /> Tap +1 Chant
        </button>
      </div>

    </div>
  );
}
