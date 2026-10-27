import React, { useState } from 'react';
import { Compass, Sparkles, Copy, Check, UserCheck, MapPin, Calendar, BookOpen } from 'lucide-react';
import { TELUGU_PANCHANGAM_DEFAULTS, GOTHRAM_DIRECTORY } from '../data/mockData';

export function SankalpamDemo() {
  const [hostName, setHostName] = useState('Suresh Sharma');
  const [spouseName, setSpouseName] = useState('Lavanya');
  const [childrenNames, setChildrenNames] = useState('Rohit (Son), Ananya (Daughter)');
  const [selectedGothram, setSelectedGothram] = useState(GOTHRAM_DIRECTORY[0]);
  const [poojaType, setPoojaType] = useState('Gruhapravesham (Housewarming)');
  const [locationName, setLocationName] = useState('Godavaryah Dakshina Teere, Sri Sailasya Vayavya Pradese, Hyderabad Nagara Nivasithanam');
  const [copied, setCopied] = useState(false);

  // Dynamically constructed authentic Sanskrit-Telugu Sankalpam in Roman Telugu
  const fullSankalpamText = `Mama Upattha Samastha Durithakshaya Dvaara Sri Parameshwara Preethyartham...

Shubhe Shobhane Muhurthe, Sri Maha Vishnor-Aajnaya Pravarthamaanasya, Adya Brahmana Dvitiya Parardhe, Swetha Varaaha Kalpe, Vaivaswatha Manvanthare, Ashtavimshatithame Kaliyuge, Prathama Paade, Jambu Dweepe, Bharatha Varshe, Bharatha Khande, Meror-Dakshina Digbhaage, Dandakaaranye, ${locationName}...

${TELUGU_PANCHANGAM_DEFAULTS.samvathsaram}, ${TELUGU_PANCHANGAM_DEFAULTS.ayanam}, ${TELUGU_PANCHANGAM_DEFAULTS.rutuvu}, ${TELUGU_PANCHANGAM_DEFAULTS.masam}, ${TELUGU_PANCHANGAM_DEFAULTS.paksham}, ${TELUGU_PANCHANGAM_DEFAULTS.tithi}, ${TELUGU_PANCHANGAM_DEFAULTS.vasaram}, ${TELUGU_PANCHANGAM_DEFAULTS.nakshatram} Yukthaayaam, Shubhayoga, Shubhakarna Evamguna Viseshana Visistaayaam, Shubhatithau...

${selectedGothram.nameRoman} Gothrodhbhavasya, ${hostName} Naamadeyasya, Dharma Patnee Samethasya ${spouseName} Naamnyah, Putra Poutraadi Samethanam (${childrenNames})...

Mama Sahakutumbanam Kshema, Sthairya, Dhairya, Vijaya, Abhaya, Aayurarogya, Aishwaryabhivrudhyartham, Dharmartha Kaama Moksha Chaturvidha Phala Purushartha Siddhyartham, Nutana ${poojaType} Purvaka Samastha Sanmangalaavapthyartham, Sri Lakshmi Narayana Preethyartham Sankalpa Poojam Karishye!`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullSankalpamText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ padding: '24px 20px', maxWidth: '1150px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <span className="kumkuma-badge" style={{ marginBottom: '10px' }}>
          <Compass size={14} /> DEMO 2: DYNAMIC REAL-TIME SANKALPAM GENERATOR
        </span>
        <h2 className="font-heading" style={{ fontSize: '2.1rem', color: 'var(--text-gold)' }}>
          Real-Time Astrological Sankalpam Engine
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '750px', margin: '6px auto 0' }}>
          Auto-combines live astronomical coordinates (Tithi, Nakshatra, Ayana) with Host family tree and Gothram Pravara.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        
        {/* Left Column: Interactive Inputs */}
        <div className="gold-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ color: 'var(--gold-light)', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <UserCheck size={20} color="var(--gold-primary)" /> Host (Yajamana) & Ritual Details
          </h3>

          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
              Host Name (Yajamana Nama Dheyam):
            </label>
            <input 
              type="text" 
              value={hostName}
              onChange={(e) => setHostName(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid var(--border-gold)',
                background: 'rgba(0,0,0,0.5)',
                color: '#FFF',
                fontSize: '0.95rem'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
              Spouse Name (Dharma Patni):
            </label>
            <input 
              type="text" 
              value={spouseName}
              onChange={(e) => setSpouseName(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid var(--border-gold)',
                background: 'rgba(0,0,0,0.5)',
                color: '#FFF',
                fontSize: '0.95rem'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
              Select Gothram (Rishi Lineage):
            </label>
            <select
              value={selectedGothram.id}
              onChange={(e) => setSelectedGothram(GOTHRAM_DIRECTORY.find(g => g.id === e.target.value) || GOTHRAM_DIRECTORY[0])}
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
              {GOTHRAM_DIRECTORY.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.nameRoman} - {g.pravaraCount}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
              Ritual Ceremony (Pooja Intent):
            </label>
            <select
              value={poojaType}
              onChange={(e) => setPoojaType(e.target.value)}
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
              <option value="Gruhapravesham (Housewarming)">Gruhapravesham (Housewarming)</option>
              <option value="Sri Satyanarayana Swamy Vratham">Sri Satyanarayana Swamy Vratham</option>
              <option value="Ganapathi & Navagraha Homam">Ganapathi & Navagraha Homam</option>
              <option value="Vivaha Mahotsavam (Wedding)">Vivaha Mahotsavam (Wedding)</option>
              <option value="Rudrabhishekam (Lord Shiva)">Rudrabhishekam (Lord Shiva)</option>
            </select>
          </div>

          <div style={{ background: 'rgba(245,189,2,0.06)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(245,189,2,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--gold-primary)', fontSize: '0.82rem', fontWeight: 600, marginBottom: '4px' }}>
              <Calendar size={14} /> Auto-Computed Astronomical Coordinates:
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {TELUGU_PANCHANGAM_DEFAULTS.samvathsaram} | {TELUGU_PANCHANGAM_DEFAULTS.masam} | {TELUGU_PANCHANGAM_DEFAULTS.tithi}
            </div>
          </div>
        </div>

        {/* Right Column: Live Rendered Sankalpam */}
        <div className="gold-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', background: '#0D0804', border: '1px solid var(--border-gold-bright)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(245,189,2,0.25)', paddingBottom: '12px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={18} color="var(--gold-primary)" />
              <span style={{ color: 'var(--gold-light)', fontWeight: 700 }}>
                Live Compiled Sankalpam Text (Roman Telugu)
              </span>
            </div>
            
            <button onClick={handleCopy} className="gold-button-secondary" style={{ padding: '6px 12px', fontSize: '0.82rem' }}>
              {copied ? <Check size={14} color="#10B981" /> : <Copy size={14} />}
              {copied ? 'Copied to Clipboard!' : 'Copy Chant'}
            </button>
          </div>

          <div 
            style={{ 
              flex: 1, 
              overflowY: 'auto', 
              background: 'rgba(20, 12, 6, 0.9)', 
              padding: '20px', 
              borderRadius: '10px',
              border: '1px solid rgba(245, 189, 2, 0.15)',
              maxHeight: '380px'
            }}
          >
            <p style={{ color: '#FFE082', fontSize: '1rem', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
              {fullSankalpamText}
            </p>
          </div>

          <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <span>🌟 Pravara: {selectedGothram.chantRoman.substring(0, 45)}...</span>
            <span className="saffron-badge">High Contrast</span>
          </div>
        </div>

      </div>
    </div>
  );
}
