import React from 'react';
import { Rocket, CheckCircle, Calendar, Sparkles, Layers, ShieldCheck } from 'lucide-react';

export function RoadmapSlide({ onTriggerBlessing }) {
  const steps = [
    {
      step: 'Phase 1',
      titleMain: 'Core Gold UI & Telugu Panchangam Calendar',
      titleSub: 'Swarna Mandiram Theme & Tithi Calculations',
      status: 'Ready to Build',
      points: ['Tithi, Nakshatra, Rahu Kalam & Yamagandam math', 'Daily agenda & monthly pooja booking scheduler', 'Offline IndexedDB storage']
    },
    {
      step: 'Phase 2',
      titleMain: 'Hands-Free Mantra Teleprompter & Shruti Box',
      titleSub: 'Veda Patana Yantram & Tanpura Synthesizer',
      status: 'Ready to Build',
      points: ['PDF & Roman Telugu text auto-scroller', 'Rotary speed dial & tap-to-pause engine', '4-String acoustic Tanpura drone synthesizer']
    },
    {
      step: 'Phase 3',
      titleMain: 'Dynamic Sankalpam & Gothram Encyclopedia',
      titleSub: 'Svayam Sankalpam & 150+ Rishi Pravaras',
      status: 'Ready to Build',
      points: ['150+ Gothrams with full Pravara chants', 'Auto-fills host family tree & river basins', 'Large-print ritual reading mode']
    },
    {
      step: 'Phase 4',
      titleMain: '1-Click WhatsApp Samagri & Client CRM',
      titleSub: 'Pooja Dravya List & Tithi Reminders',
      status: 'Ready to Build',
      points: ['Interactive web shopping checklist', 'Annual Shraddha lunar tithi auto-reminders', 'Dakshina honorarium & expense ledger']
    },
    {
      step: 'Phase 5',
      titleMain: 'Panthulu Delegation & Emergency SOS Hub',
      titleSub: 'Subhakarya Badhili & Priest Network',
      status: 'Ready to Build',
      points: ['Gmail & WhatsApp automated dispatch packets', 'Muhurtham clash resolver & fee-split calculator', 'Verified local associate priest directory']
    }
  ];

  return (
    <div style={{ padding: '24px 20px', maxWidth: '1150px', margin: '0 auto', textAlign: 'center' }}>
      <span className="kumkuma-badge" style={{ marginBottom: '10px' }}>
        <Rocket size={14} /> APPLICATION BUILD ROADMAP
      </span>
      <h2 className="font-heading" style={{ fontSize: '2.2rem', color: 'var(--text-gold)', marginBottom: '8px' }}>
        Step-by-Step Production Roadmap
      </h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '750px', margin: '0 auto 30px' }}>
        After reviewing these interactive problem & solution modules, this is our planned execution sequence for the final application.
      </p>

      {/* Roadmap Phase Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', textAlign: 'left', marginBottom: '35px' }}>
        {steps.map((s, idx) => (
          <div key={idx} className="gold-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="kumkuma-badge" style={{ fontSize: '0.75rem', padding: '2px 8px' }}>{s.step}</span>
              <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 600 }}>● {s.status}</span>
            </div>

            <div>
              <h3 style={{ fontSize: '1.05rem', color: 'var(--gold-light)', margin: 0, lineHeight: 1.4 }}>
                {s.titleMain}
              </h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>{s.titleSub}</span>
            </div>

            <ul style={{ paddingLeft: '18px', fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {s.points.map((pt, pIdx) => (
                <li key={pIdx}>{pt}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Auspicious Blessing / Completion CTA */}
      <div className="gold-card" style={{ padding: '30px', background: 'radial-gradient(circle at center, rgba(245, 189, 2, 0.15), rgba(74, 7, 19, 0.4))', border: '2px solid var(--gold-primary)' }}>
        <span style={{ fontSize: '32px' }}>🕉️</span>
        <h3 style={{ fontSize: '1.5rem', color: '#FFE082', marginTop: '10px' }}>
          Shubham Bhavathu • Sarve Janaah Sukhino Bhavanthu
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '600px', margin: '8px auto 20px' }}>
          We are ready to build this extraordinary suite for your father and the priest community.
        </p>

        <button onClick={onTriggerBlessing} className="gold-button-primary" style={{ padding: '14px 32px', fontSize: '1.1rem' }}>
          <Sparkles size={20} /> Receive Vedic Blessings & Confetti
        </button>
      </div>
    </div>
  );
}
