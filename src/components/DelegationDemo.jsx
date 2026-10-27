import React, { useState } from 'react';
import { Users, Mail, MessageCircle, MapPin, Calendar, CheckCircle2, DollarSign, Send, ArrowRight } from 'lucide-react';

export function DelegationDemo() {
  const [selectedAssociate, setSelectedAssociate] = useState('venkat');
  const [totalDakshina, setTotalDakshina] = useState(15000);
  const [delegateShare, setDelegateShare] = useState(12000);
  const [advanceReceived, setAdvanceReceived] = useState(3000);
  const [eventDate, setEventDate] = useState('18-August-2026 (Sravana Suddha Ekadasi)');
  const [muhurthamLagnam, setMuhurthamLagnam] = useState('Morning 09:45 AM (Vrischika Lagnam)');
  const [dispatched, setDispatched] = useState(false);

  const associates = [
    { id: 'venkat', name: 'Sri Venkatacharyulu Panthulu', phone: '9849123456', email: 'venkat.panthulu@gmail.com', role: 'Vivaha & Pratishta Specialist' },
    { id: 'sarma', name: 'Sri Ramakrishna Sarma', phone: '9440112233', email: 'rk.sarma.vedic@gmail.com', role: 'Homam & Vratam Specialist' },
    { id: 'shastri', name: 'Sri Subrahmanya Shastri', phone: '9988776655', email: 'subramanya.shastri@gmail.com', role: 'Astrology & Vastu Specialist' }
  ];

  const currentAssoc = associates.find(a => a.id === selectedAssociate);
  const leadReferralFee = totalDakshina - delegateShare;

  const generateEmailBody = () => {
    return `Subject: 🕉️ Subhakarya Badhili Aahvanam: Vivaha Mahotsavam - ${eventDate}

Gouravaneeyulaina ${currentAssoc.name} Gariki Namaskarams,

Please accept this pooja delegation request on my behalf for the following auspicious event:

• Ceremony (Karyakramam): Seetarama Kalyana Purvaka Vivaha Mahotsavam
• Muhurtham Timing: ${eventDate}, ${muhurthamLagnam}
• Host (Yajamana): Sri Ramesh Naidu Garu (Ph: 9876543210)
• Venue: Sri Shubham Kalyana Mandapam, Dilsukhnagar, Hyderabad
📍 Google Maps Link: https://maps.google.com/?q=17.368,78.532

• Total Agreed Dakshina: ₹${totalDakshina.toLocaleString('en-IN')}
• Delegate Priest Share: ₹${delegateShare.toLocaleString('en-IN')} (Advance token of ₹${advanceReceived.toLocaleString('en-IN')} already received)

Please confirm your availability.
- Warm regards, Sri Krishnamurthy Shastri (Ph: 98480xxxxx)`;
  };

  const handleDispatch = () => {
    setDispatched(true);
    setTimeout(() => setDispatched(false), 3000);
  };

  return (
    <div style={{ padding: '24px 20px', maxWidth: '1150px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <span className="kumkuma-badge" style={{ marginBottom: '10px' }}>
          <Users size={14} /> DEMO 5: PANTHULU DELEGATION & DISPATCH HUB
        </span>
        <h2 className="font-heading" style={{ fontSize: '2.1rem', color: 'var(--text-gold)' }}>
          Priest Assignment & Schedule Conflict Hub
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '750px', margin: '6px auto 0' }}>
          When multiple bookings collide on the same peak Muhurtham, delegate events to trusted associate priests with complete venue packets and fee splits.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        
        {/* Left Column: Event & Associate Selector */}
        <div className="gold-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ background: 'rgba(255,111,0,0.12)', borderLeft: '4px solid var(--saffron-bright)', padding: '10px 14px', borderRadius: '0 8px 8px 0' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--saffron-bright)', fontWeight: 700 }}>
              ⚠️ Schedule Overlap Detected (Muhurtham Clash):
            </span>
            <p style={{ fontSize: '0.88rem', color: '#FFE082', marginTop: '2px' }}>
              You already have a Gruhapravesham booked on August 18 at 09:45 AM. Delegating this wedding to an associate.
            </p>
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
              Select Associate Priest (Panthulu):
            </label>
            <select
              value={selectedAssociate}
              onChange={(e) => setSelectedAssociate(e.target.value)}
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
              {associates.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name} ({a.role})
                </option>
              ))}
            </select>
          </div>

          {/* Dakshina & Fee Split Calculator */}
          <div style={{ background: 'rgba(0,0,0,0.4)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(245,189,2,0.2)' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--gold-light)', fontWeight: 600, display: 'block', marginBottom: '10px' }}>
              💰 Dakshina Fee Split Calculator:
            </span>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Total Dakshina (Client Fee):</label>
                <input 
                  type="number" 
                  value={totalDakshina} 
                  onChange={(e) => setTotalDakshina(Number(e.target.value))}
                  style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid var(--border-gold)', background: '#000', color: '#FFF', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Delegate Priest Payout:</label>
                <input 
                  type="number" 
                  value={delegateShare} 
                  onChange={(e) => setDelegateShare(Number(e.target.value))}
                  style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid var(--border-gold)', background: '#000', color: '#10B981', fontWeight: 700, fontSize: '0.9rem' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '8px' }}>
              <span>Lead Referral Share: <strong style={{ color: 'var(--gold-primary)' }}>₹{leadReferralFee.toLocaleString('en-IN')}</strong></span>
              <span>Advance Received: <strong style={{ color: '#60A5FA' }}>₹{advanceReceived.toLocaleString('en-IN')}</strong></span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={handleDispatch}
              className="gold-button-primary" 
              style={{ flex: 1, justifyContent: 'center' }}
            >
              <Mail size={16} /> Send via Gmail
            </button>

            <button 
              onClick={handleDispatch}
              className="gold-button-secondary" 
              style={{ flex: 1, justifyContent: 'center' }}
            >
              <MessageCircle size={16} color="#10B981" /> WhatsApp Packet
            </button>
          </div>

          {dispatched && (
            <div style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid #10B981', padding: '10px', borderRadius: '8px', color: '#6EE7B7', fontSize: '0.88rem', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} /> Delegation packet dispatched successfully!
            </div>
          )}
        </div>

        {/* Right Column: Live Email / WhatsApp Packet Preview */}
        <div className="gold-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', background: '#0D0905', border: '1px solid var(--border-gold-bright)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(245,189,2,0.25)', paddingBottom: '12px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={18} color="var(--gold-primary)" />
              <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--gold-light)' }}>
                Automated Dispatch Packet Preview
              </span>
            </div>
            <span className="kumkuma-badge">Auto-Formatted</span>
          </div>

          <div 
            style={{ 
              flex: 1, 
              background: 'rgba(0,0,0,0.6)', 
              borderRadius: '8px', 
              padding: '16px', 
              overflowY: 'auto', 
              maxHeight: '340px',
              fontFamily: 'monospace',
              fontSize: '0.82rem',
              color: '#FFE082',
              lineHeight: 1.7,
              whiteSpace: 'pre-line'
            }}
          >
            {generateEmailBody()}
          </div>

          <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            <span>📍 Google Maps GPS Link Embedded</span>
            <span>📱 1-Tap Client Dialing</span>
          </div>
        </div>

      </div>
    </div>
  );
}
