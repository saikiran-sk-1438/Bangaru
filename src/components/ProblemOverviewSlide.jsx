import React from 'react';
import { AlertTriangle, CheckCircle2, Flame, ScrollText, Users, CalendarX, MessageSquareWarning } from 'lucide-react';

export function ProblemOverviewSlide() {
  const problems = [
    {
      icon: <ScrollText size={26} color="#FF6F00" />,
      titleMain: 'Hands Occupied During Homams & PDF Swiping Friction',
      titleSub: 'Homam lo chetulu aagipovadam & Screen sleep avvadam',
      realSituation: 'During Homams, the priest holds the sacred ghee ladle (Sruk / Sruva) and Darbha grass. Phone screens turn black every 30 seconds, or the priest must touch the screen with ghee-stained fingers to scroll.',
      solution: 'Screen Wake-Lock, variable rotary speed dial (0.5x - 4x), and full-screen Tap-to-Pause enabled so a light touch with a wrist or knuckle pauses/resumes auto-scroll.'
    },
    {
      icon: <Flame size={26} color="#F5BD02" />,
      titleMain: 'Real-Time Mental Calculations for Maha Sankalpam',
      titleSub: 'Prathi poojaku tithi, nakshatram & pravara lekkinchadam',
      realSituation: 'Before beginning rituals, priests must mentally compute the current Telugu year (Samvathsaram), Ayana, Rutuvu, Masa, Paksha, Tithi, Nakshatra, and combine them with the host’s Gothram and Pravara.',
      solution: 'Dynamic Real-time Sankalpam Generator compiles the exact, grammatically authentic Sanskrit-Telugu chant in seconds and renders it in high-contrast large font.'
    },
    {
      icon: <MessageSquareWarning size={26} color="#10B981" />,
      titleMain: 'Cluttered WhatsApp Samagri Dictation & Wrong Items',
      titleSub: 'Samagri list kosam phone calls & thappudu vasthuvulu',
      realSituation: 'Hosts constantly call asking: "Panthulu garu, what items should we buy?" Writing 35+ items on paper notepad and sending photos leads to hosts buying wrong rice, grains, or inadequate ghee.',
      solution: '1-Click WhatsApp Samagri Generator with categorized items, exact quantities, and an interactive shopping web checklist for the client to tick off at the store.'
    },
    {
      icon: <Users size={26} color="#FFA040" />,
      titleMain: 'Peak Muhurtham Schedule Conflicts & Delegation Chaos',
      titleSub: 'Okey muhurthaniki 3 subhakaryalu ravadam',
      realSituation: 'On peak auspicious days (e.g. Radhasapthami, Sravana Masam), a priest gets multiple simultaneous wedding bookings for the exact same 9:45 AM Muhurtham. Rejecting clients hurts long-term goodwill.',
      solution: 'Panthulu Delegation Hub allows 1-click assignment to trusted associate priests with complete venue address, Google Maps links, Muhurtham times, and Dakshina fee splits via Gmail and WhatsApp.'
    }
  ];

  return (
    <div style={{ padding: '30px 20px', maxWidth: '1150px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <span className="kumkuma-badge" style={{ marginBottom: '12px' }}>
          <AlertTriangle size={14} /> FIELD REALITY & CORE PROBLEMS
        </span>
        <h2 className="font-heading" style={{ fontSize: '2.2rem', color: 'var(--text-gold)', marginTop: '8px' }}>
          Everyday Challenges Faced by Vedic Priests
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '750px', margin: '8px auto 0' }}>
          Real-world friction experienced by freelance & temple priests and our tailored technological answers.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '24px' }}>
        {problems.map((p, idx) => (
          <div key={idx} className="gold-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
              <div style={{ background: 'rgba(0,0,0,0.4)', padding: '12px', borderRadius: '12px', border: '1px solid var(--border-gold)' }}>
                {p.icon}
              </div>
              <div>
                <h3 style={{ fontSize: '1.18rem', color: 'var(--gold-light)', lineHeight: 1.4 }}>
                  {p.titleMain}
                </h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500, fontStyle: 'italic' }}>
                  {p.titleSub}
                </span>
              </div>
            </div>

            {/* Problem Box */}
            <div style={{ background: 'rgba(74, 7, 19, 0.25)', borderLeft: '4px solid #FF5252', padding: '12px 16px', borderRadius: '0 8px 8px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#FF8A80', fontSize: '0.85rem', fontWeight: 700, marginBottom: '4px' }}>
                <AlertTriangle size={14} /> The Field Friction (Samasya):
              </div>
              <p style={{ fontSize: '0.92rem', color: '#FFCDD2', lineHeight: 1.6 }}>
                {p.realSituation}
              </p>
            </div>

            {/* Solution Box */}
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', borderLeft: '4px solid #10B981', padding: '12px 16px', borderRadius: '0 8px 8px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6EE7B7', fontSize: '0.85rem', fontWeight: 700, marginBottom: '4px' }}>
                <CheckCircle2 size={14} /> The Software Solution (Parihaaram):
              </div>
              <p style={{ fontSize: '0.92rem', color: '#D1FAE5', lineHeight: 1.6 }}>
                {p.solution}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
