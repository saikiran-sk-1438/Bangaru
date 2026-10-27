import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Maximize2, Minimize2, Upload, FileText, Search, X, Volume2, Type, ArrowLeft } from 'lucide-react';
import { SLOKA_TEMPLATES } from '../data/mockData';

export function TeleprompterDemo() {
  const [selectedStotramKey, setSelectedStotramKey] = useState(null); // Search-First flow
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(3);
  const [fontSize, setFontSize] = useState(24);
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  const [slokaLines, setSlokaLines] = useState(SLOKA_TEMPLATES['sritsuktam'] || []);
  const [fileName, setFileName] = useState('Sri Suktam Hymn.txt');
  const [activeVerseIndex, setActiveVerseIndex] = useState(0);

  const containerRef = useRef(null);
  const scrollTimerRef = useRef(null);

  const stotramCatalog = [
    { key: 'sritsuktam', title: 'Sri Suktam (శ్రీ సూక్తం)', category: 'Veda Suktam', verses: SLOKA_TEMPLATES['sritsuktam'] },
    { key: 'rudram', title: 'Sri Rudram Laghunyasam (శ్రీ రుద్రం)', category: 'Vedic Chant', verses: [
      { id: 1, text: 'ॐ నమస్తే రుద్ర మన్యవ ఉతోత ఇషవే నమః । నమస్తే అస్తు ధన్వనే బాహుభ్యాముత తే నమః ॥', translation: 'Salutations to your wrath Lord Rudra, and to your arrow and bow.' },
      { id: 2, text: 'యా తే రుద్ర శివా తనూరఘోరాపాపకాశినీ । తయా నశ్శన్తమయా గిరిశన్తాభిచాకశీహి ॥', translation: 'Lord who resides on the mountains, reveal your auspicious non-terrifying form to us.' }
    ]},
    { key: 'hanuman', title: 'Hanuman Chalisa (హనుమాన్ చాలీసా)', category: 'Stotram', verses: [
      { id: 1, text: 'శ్రీగురు చరణ సరోజ రజ నిజ మను ముకురు సుధారి । బరనఊ రఘుబర బిమల జసు జో దాయకు ఫల చారి ॥', translation: 'Cleansing the mirror of my mind with the dust of the lotus feet of Holy Guru.' },
      { id: 2, text: 'బుద్ధిహీన తను జానికే సుమిరౌ పవనకుమార । బల బుద్ధి బిద్యా దేహు మోహి హరహు కలేస బికార ॥', translation: 'Knowing myself to be lacking in wisdom, I meditate on Hanuman.' }
    ]},
    { key: 'ganapathi', title: 'Ganapathi Atharvasheersha (గణపతి అథర్వశీర్షం)', category: 'Upanishad', verses: [
      { id: 1, text: 'ॐ నమస్తే గణపతయే । త్వమేవ ప్రత్యక్షం తత్త్వమసి । త్వమేవ కేవలం కర్తాసి ।', translation: 'Salutations to Lord Ganapathi. You are the direct Truth.' }
    ]}
  ];

  const filteredCatalog = stotramCatalog.filter(s => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectStotram = (stotram) => {
    setSelectedStotramKey(stotram.key);
    setSlokaLines(stotram.verses);
    setFileName(`${stotram.title}.txt`);
    setActiveVerseIndex(0);
  };

  // Handle PDF / TXT File Upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);

    if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
        const parsedVerses = paragraphs.map((p, idx) => ({
          id: idx + 1,
          text: p.trim(),
          translation: 'Uploaded custom file verse'
        }));

        setSlokaLines(parsedVerses);
        setSelectedStotramKey('custom_file');
        setActiveVerseIndex(0);
      };
      reader.readAsText(file);
    } else {
      setSlokaLines([
        { id: 1, text: `[PDF File Loaded: ${file.name}]`, translation: 'Vedic Sloka Document' },
        { id: 2, text: 'ॐ భూర్భువస్సువః । తత్సవితుర్వరేణ్యం భర్గో దేవస్య ధీమహి । ధియో యో నః ప్రచోదయాత్ ॥', translation: 'Gayatri Mantra' }
      ]);
      setSelectedStotramKey('custom_file');
    }
  };

  // Precise Auto-Scroll Timer (1x to 15x speed)
  useEffect(() => {
    if (isPlaying) {
      const intervalMs = Math.max(20, Math.round(140 / speed));
      scrollTimerRef.current = setInterval(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop += 1.5;
        }
      }, intervalMs);
    } else {
      clearInterval(scrollTimerRef.current);
    }
    return () => clearInterval(scrollTimerRef.current);
  }, [isPlaying, speed]);

  // Center alignment math: calculate active sloka verse in vertical middle
  const handleScroll = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const containerCenter = container.scrollTop + container.clientHeight / 2;

    const verses = container.querySelectorAll('.sloka-verse-item');
    let minDistance = Infinity;
    let closestIndex = 0;

    verses.forEach((vEl, idx) => {
      const vTop = vEl.offsetTop;
      const vCenter = vTop + vEl.clientHeight / 2;
      const distance = Math.abs(containerCenter - vCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    setActiveVerseIndex(closestIndex);
  };

  return (
    <div style={{ padding: isFullScreen ? '0' : '16px', maxWidth: isFullScreen ? '100vw' : '600px', margin: '0 auto', minHeight: isFullScreen ? '100vh' : 'auto' }}>
      
      {/* STEP 1: SEARCH-FIRST STOTRAM DIRECTORY */}
      {!selectedStotramKey && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          
          <div style={{ textAlign: 'center' }}>
            <span className="kumkuma-badge" style={{ fontSize: '0.72rem' }}>VEDIC STOTRAM DIRECTORY</span>
            <h2 className="font-heading" style={{ fontSize: '1.4rem', color: 'var(--champagne-gold)', margin: '4px 0 0' }}>
              Search & Select Sloka
            </h2>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Search stotrams or upload your custom PDF / TXT document
            </span>
          </div>

          {/* Search Bar */}
          <div className="gold-card" style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '8px', background: '#0B0A08' }}>
            <Search size={16} color="var(--signature-gold)" />
            <input 
              type="text" 
              placeholder="Search stotram by name (e.g. Rudram, Hanuman...)" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              style={{ width: '100%', background: 'none', border: 'none', color: '#FFF', fontSize: '0.88rem', outline: 'none' }} 
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={16} />
              </button>
            )}
          </div>

          {/* PDF / TXT File Upload Card */}
          <label className="gold-card" style={{ padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', background: 'rgba(198,161,91,0.12)', border: '1px dashed var(--signature-gold)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Upload size={20} color="var(--champagne-gold)" />
              <div>
                <strong style={{ fontSize: '0.9rem', color: 'var(--pure-highlight)', display: 'block' }}>Upload Custom PDF / TXT Sloka</strong>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Tap to select file from your device</span>
              </div>
            </div>
            <input type="file" accept=".pdf,.txt" onChange={handleFileUpload} style={{ display: 'none' }} />
            <span className="gold-button-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>Browse</span>
          </label>

          {/* Stotram List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {filteredCatalog.map(stotram => (
              <div
                key={stotram.key}
                onClick={() => handleSelectStotram(stotram)}
                className="gold-card"
                style={{
                  padding: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  background: 'var(--deep-charcoal)',
                  border: '1px solid var(--border-gold)',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <FileText size={20} color="var(--signature-gold)" />
                  <div>
                    <strong style={{ fontSize: '0.98rem', color: '#FFF', display: 'block' }}>{stotram.title}</strong>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{stotram.category} • {stotram.verses.length} Verses</span>
                  </div>
                </div>

                <span className="gold-button-primary" style={{ padding: '4px 12px', fontSize: '0.75rem', minHeight: '30px' }}>
                  Open Reader →
                </span>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* STEP 2: FULL SLOKA TELEPROMPTER READER VIEW */}
      {selectedStotramKey && (
        <div style={{ display: 'flex', flexDirection: 'column', height: isFullScreen ? '100vh' : 'auto' }}>
          
          {/* Header Controls */}
          <div className="gold-card" style={{ padding: '10px 14px', borderRadius: isFullScreen ? '0' : '14px', background: '#0B0A08', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: isFullScreen ? 0 : '10px' }}>
            <button onClick={() => setSelectedStotramKey(null)} className="gold-button-secondary" style={{ padding: '4px 8px', fontSize: '0.75rem' }}>
              <ArrowLeft size={14} /> Search
            </button>

            <span style={{ fontSize: '0.85rem', color: 'var(--champagne-gold)', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>
              {fileName}
            </span>

            <button onClick={() => setIsFullScreen(!isFullScreen)} className="gold-button-secondary" style={{ padding: '4px 8px', fontSize: '0.75rem' }}>
              {isFullScreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
              <span>{isFullScreen ? 'Exit 9:16' : '9:16 Mode'}</span>
            </button>
          </div>

          {/* Speed & Font Scaler Floating Bar */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', alignItems: 'center', background: 'rgba(0,0,0,0.5)', padding: '6px 12px', borderRadius: '10px', border: '1px solid var(--border-gold)' }}>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Speed:</span>
            <button onClick={() => setSpeed(Math.max(1, speed - 1))} style={{ padding: '2px 8px', borderRadius: '4px', background: '#000', color: '#FFF', border: '1px solid var(--border-gold)' }}>-</button>
            <strong style={{ fontSize: '0.85rem', color: 'var(--champagne-gold)' }}>{speed}.0x</strong>
            <button onClick={() => setSpeed(Math.min(15, speed + 1))} style={{ padding: '2px 8px', borderRadius: '4px', background: '#000', color: '#FFF', border: '1px solid var(--border-gold)' }}>+</button>

            <div style={{ width: '1px', height: '16px', background: 'var(--border-gold)', margin: '0 4px' }} />

            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Font:</span>
            <button onClick={() => setFontSize(Math.max(16, fontSize - 2))} style={{ padding: '2px 8px', borderRadius: '4px', background: '#000', color: '#FFF', border: '1px solid var(--border-gold)' }}>A-</button>
            <strong style={{ fontSize: '0.85rem', color: 'var(--champagne-gold)' }}>{fontSize}px</strong>
            <button onClick={() => setFontSize(Math.min(44, fontSize + 2))} style={{ padding: '2px 8px', borderRadius: '4px', background: '#000', color: '#FFF', border: '1px solid var(--border-gold)' }}>A+</button>
          </div>

          {/* Teleprompter Scroll Viewport with Center Middle Alignment */}
          <div 
            ref={containerRef}
            onScroll={handleScroll}
            style={{
              height: isFullScreen ? 'calc(100vh - 120px)' : '420px',
              overflowY: 'auto',
              background: '#0B0A08',
              borderRadius: isFullScreen ? '0' : '14px',
              border: '1px solid var(--border-gold)',
              padding: '160px 16px', // High top/bottom padding allows first & last sloka to center in middle
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              scrollBehavior: 'smooth'
            }}
          >
            {slokaLines.map((v, idx) => {
              const isActive = idx === activeVerseIndex;
              return (
                <div
                  key={v.id || idx}
                  className="sloka-verse-item"
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    background: isActive ? 'rgba(198, 161, 91, 0.14)' : 'transparent',
                    borderLeft: isActive ? '3px solid var(--signature-gold)' : '3px solid transparent',
                    transition: 'all 0.25s ease',
                    textAlign: 'center'
                  }}
                >
                  <p style={{ fontSize: `${fontSize}px`, color: isActive ? 'var(--pure-highlight)' : '#B0A696', fontWeight: isActive ? 700 : 400, lineHeight: 1.6 }}>
                    {v.text}
                  </p>
                  {v.translation && (
                    <p style={{ fontSize: '0.78rem', color: 'var(--champagne-gold)', marginTop: '6px', fontStyle: 'italic' }}>
                      {v.translation}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Play/Pause Control Bar */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
            <button 
              onClick={() => setIsPlaying(!isPlaying)} 
              className="gold-button-primary"
              style={{ flex: 1, minHeight: '44px', fontSize: '0.92rem' }}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              <span>{isPlaying ? 'Pause Auto-Scroll' : 'Start Auto-Scroll'}</span>
            </button>

            <button 
              onClick={() => {
                if (containerRef.current) containerRef.current.scrollTop = 0;
              }}
              className="gold-button-secondary"
              style={{ padding: '0 14px' }}
            >
              <RotateCcw size={16} />
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
