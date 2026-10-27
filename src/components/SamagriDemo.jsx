import React, { useState, useEffect } from 'react';
import { 
  Share2, CheckSquare, Square, Copy, ArrowLeft, ExternalLink, Sparkles, 
  User, FileText, Check, Download, Smartphone, Plus, Trash2, Edit3, X, Save, Layers
} from 'lucide-react';
import { SAMAGRI_PRESETS } from '../data/mockData';

export function SamagriDemo({ priestName = 'Sri Krishnamurthy Shastri' }) {
  const [selectedPresetKey, setSelectedPresetKey] = useState(null);
  const [selectedCustomList, setSelectedCustomList] = useState(null);
  const [clientNameInput, setClientNameInput] = useState('Suresh Sharma');
  const [priestNameInput, setPriestNameInput] = useState(priestName);
  const [copiedLink, setCopiedLink] = useState(false);

  // Custom Lists State
  const [customLists, setCustomLists] = useState(() => {
    const saved = localStorage.getItem('bangaru_custom_samagri_lists');
    return saved ? JSON.parse(saved) : [];
  });

  // Modal State for Creating/Editing Custom Checklist
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [customIcon, setCustomIcon] = useState('🪔');
  const [customItems, setCustomItems] = useState([
    { nameRoman: 'Pasupu', nameEnglish: 'Turmeric Powder', qty: '100g' },
    { nameRoman: 'Kumkuma', nameEnglish: 'Kumkum Powder', qty: '100g' },
    { nameRoman: 'Kobbari Kayalu', nameEnglish: 'Fresh Coconuts', qty: '3 coconuts' }
  ]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemEnglish, setNewItemEnglish] = useState('');
  const [newItemQty, setNewItemQty] = useState('');

  useEffect(() => {
    if (priestName) setPriestNameInput(priestName);
  }, [priestName]);

  useEffect(() => {
    localStorage.setItem('bangaru_custom_samagri_lists', JSON.stringify(customLists));
  }, [customLists]);

  const activeStandardPreset = selectedPresetKey ? SAMAGRI_PRESETS[selectedPresetKey] : null;
  const activeCustom = selectedCustomList ? selectedCustomList : null;
  const currentActiveList = activeStandardPreset || activeCustom;

  // Standalone Client URL Generator
  const getStandaloneClientUrl = () => {
    const baseUrl = window.location.origin + window.location.pathname;
    if (selectedPresetKey) {
      return `${baseUrl}?mode=client&samagri=${selectedPresetKey}&client=${encodeURIComponent(clientNameInput)}&priest=${encodeURIComponent(priestNameInput)}`;
    } else if (selectedCustomList) {
      const dataStr = encodeURIComponent(JSON.stringify(selectedCustomList));
      return `${baseUrl}?mode=client&customId=${selectedCustomList.id}&data=${dataStr}&client=${encodeURIComponent(clientNameInput)}&priest=${encodeURIComponent(priestNameInput)}`;
    }
    return baseUrl;
  };

  const handleCopyLink = () => {
    const link = getStandaloneClientUrl();
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleWhatsAppShare = () => {
    if (!currentActiveList) return;
    const link = getStandaloneClientUrl();
    const text = `🙏🏻 *Namaskaram ${clientNameInput} Garu*\n\nThis is ${priestNameInput}. Here is your customized *${currentActiveList.title}* Samagri Shopping Checklist & App Link:\n\n🔗 Web & Mobile Portal: ${link}\n📱 Direct App/APK: https://panthulu-presentation.vercel.app\n\nPlease check off items as you purchase them.`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Add Item to Custom Creator
  const handleAddCustomItem = (e) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    setCustomItems(prev => [
      ...prev,
      {
        nameRoman: newItemName.trim(),
        nameEnglish: newItemEnglish.trim() || newItemName.trim(),
        qty: newItemQty.trim() || '1 pack'
      }
    ]);

    setNewItemName('');
    setNewItemEnglish('');
    setNewItemQty('');
  };

  // Quick Add Standard Essentials
  const handleAddQuickEssentials = () => {
    const essentials = [
      { nameRoman: 'Tamalapakulu', nameEnglish: 'Betel Leaves', qty: '30 leaves' },
      { nameRoman: 'Poka Chekkalu (Vakkalu)', nameEnglish: 'Betel Nuts (Supari)', qty: '100g' },
      { nameRoman: 'Aavu Neyyi', nameEnglish: 'Pure Cow Ghee', qty: '250g' },
      { nameRoman: 'Taaja Poolu', nameEnglish: 'Fresh Flowers', qty: '250g' },
      { nameRoman: 'Agarbatti & Karpooram', nameEnglish: 'Incense & Camphor', qty: '1 pack each' }
    ];

    setCustomItems(prev => [...prev, ...essentials]);
  };

  const handleRemoveCustomItem = (index) => {
    setCustomItems(prev => prev.filter((_, idx) => idx !== index));
  };

  // Save Custom List
  const handleSaveCustomList = (e) => {
    e.preventDefault();
    if (!customTitle.trim() || customItems.length === 0) return;

    const newList = {
      id: `custom_${Date.now()}`,
      title: customTitle.trim(),
      icon: customIcon || '🪔',
      isCustom: true,
      items: customItems
    };

    setCustomLists(prev => [newList, ...prev]);
    setShowCreateModal(false);
    setSelectedCustomList(newList);
    setSelectedPresetKey(null);
  };

  const handleDeleteCustomList = (id, e) => {
    e.stopPropagation();
    if (window.confirm('Delete this custom checklist?')) {
      setCustomLists(prev => prev.filter(l => l.id !== id));
      if (selectedCustomList?.id === id) {
        setSelectedCustomList(null);
      }
    }
  };

  const standardPresets = [
    { key: 'satyanarayana', title: 'Sri Satyanarayana Swamy Vratham', itemsCount: 15, icon: '🌸' },
    { key: 'homam', title: 'Ganapathi & Navagraha Homam', itemsCount: 9, icon: '🔥' },
    { key: 'gruhapravesham', title: 'Gruhapravesham Housewarming', itemsCount: 7, icon: '🏠' }
  ];

  return (
    <div style={{ padding: '16px', maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      
      {/* STEP 1: OPTIONS & CUSTOM LISTS SELECTION */}
      {!currentActiveList && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span className="kumkuma-badge" style={{ fontSize: '0.72rem' }}>SAMAGRI MANAGER</span>
              <h2 className="font-heading" style={{ fontSize: '1.4rem', color: 'var(--champagne-gold)', margin: '2px 0 0' }}>
                Ceremony Checklists
              </h2>
            </div>

            <button
              onClick={() => {
                setCustomTitle('');
                setCustomIcon('🪔');
                setCustomItems([
                  { nameRoman: 'Pasupu', nameEnglish: 'Turmeric Powder', qty: '100g' },
                  { nameRoman: 'Kumkuma', nameEnglish: 'Kumkum Powder', qty: '100g' },
                  { nameRoman: 'Kobbari Kayalu', nameEnglish: 'Fresh Coconuts', qty: '3 coconuts' }
                ]);
                setShowCreateModal(true);
              }}
              className="gold-button-primary"
              style={{ padding: '6px 14px', fontSize: '0.82rem', minHeight: '36px' }}
            >
              <Plus size={16} /> + Create Custom List
            </button>
          </div>

          {/* PRIEST'S CUSTOM LISTS SECTION */}
          {customLists.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '0.74rem', color: 'var(--champagne-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                ⭐ My Custom Ritual Lists ({customLists.length})
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {customLists.map((custom) => (
                  <div
                    key={custom.id}
                    onClick={() => {
                      setSelectedCustomList(custom);
                      setSelectedPresetKey(null);
                    }}
                    className="gold-card"
                    style={{
                      padding: '14px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      background: 'rgba(198,161,91,0.08)',
                      border: '1px solid var(--signature-gold)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '24px' }}>{custom.icon}</span>
                      <div>
                        <strong style={{ fontSize: '0.96rem', color: 'var(--pure-highlight)', display: 'block' }}>
                          {custom.title}
                        </strong>
                        <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                          {custom.items.length} Custom Items • Priest Created
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button
                        onClick={(e) => handleDeleteCustomList(custom.id, e)}
                        style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid #EF4444', color: '#F87171', borderRadius: '6px', padding: '4px 6px', cursor: 'pointer' }}
                        title="Delete List"
                      >
                        <Trash2 size={13} />
                      </button>
                      <span style={{ color: 'var(--signature-gold)', fontSize: '1.2rem' }}>→</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STANDARD VEDIC PRESETS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Standard Vedic Presets
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {standardPresets.map((p) => (
                <button
                  key={p.key}
                  onClick={() => {
                    setSelectedPresetKey(p.key);
                    setSelectedCustomList(null);
                  }}
                  className="gold-card"
                  style={{
                    padding: '14px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    cursor: 'pointer',
                    background: 'var(--deep-charcoal)',
                    border: '1px solid var(--border-gold)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '24px' }}>{p.icon}</span>
                    <div>
                      <strong style={{ fontSize: '0.96rem', color: '#FFF', display: 'block' }}>{p.title}</strong>
                      <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{p.itemsCount} Required Items</span>
                    </div>
                  </div>

                  <span style={{ color: 'var(--signature-gold)', fontSize: '1.2rem' }}>→</span>
                </button>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* STEP 2: ACTIVE CHECKLIST MANAGER & SHARE VIEW */}
      {currentActiveList && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button 
              onClick={() => {
                setSelectedPresetKey(null);
                setSelectedCustomList(null);
              }} 
              className="gold-button-secondary"
              style={{ padding: '4px 10px', fontSize: '0.78rem', minHeight: '32px' }}
            >
              <ArrowLeft size={14} /> Back to Lists
            </button>

            <span className="saffron-badge">{currentActiveList.items.length} Items</span>
          </div>

          {/* Checklist Details Card */}
          <div className="gold-card" style={{ padding: '16px', background: 'var(--deep-charcoal)', border: '1px solid var(--signature-gold)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span className="kumkuma-badge" style={{ fontSize: '0.68rem', marginBottom: '4px' }}>
                  {currentActiveList.isCustom ? 'CUSTOMIZED PRIEST CHECKLIST' : 'PRESET RITUAL CHECKLIST'}
                </span>
                <h2 className="font-heading" style={{ fontSize: '1.3rem', color: 'var(--champagne-gold)', margin: '4px 0 6px' }}>
                  {currentActiveList.title}
                </h2>
              </div>
              <span style={{ fontSize: '28px' }}>{currentActiveList.icon || '🌸'}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
              <div>
                <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Yajamana Client Name:</label>
                <input 
                  type="text" 
                  value={clientNameInput} 
                  onChange={(e) => setClientNameInput(e.target.value)} 
                  style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid var(--border-gold)', background: '#000', color: 'var(--pure-highlight)', fontSize: '0.88rem', fontWeight: 600 }} 
                />
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Priest Name on Shared Link:</label>
                <input 
                  type="text" 
                  value={priestNameInput} 
                  onChange={(e) => setPriestNameInput(e.target.value)} 
                  style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid var(--border-gold)', background: '#000', color: 'var(--champagne-gold)', fontSize: '0.88rem', fontWeight: 600 }} 
                />
              </div>
            </div>
          </div>

          {/* Standalone Client Link Box */}
          <div className="gold-card" style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px', background: '#0B0A08', border: '1px solid var(--border-gold-bright)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--champagne-gold)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Share2 size={15} /> Client Dashboard & Mobile App Link
            </span>

            <div style={{ display: 'flex', gap: '6px' }}>
              <input 
                type="text" 
                readOnly 
                value={getStandaloneClientUrl()} 
                style={{ flex: 1, padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--border-gold)', background: '#171511', color: 'var(--text-muted)', fontSize: '0.75rem' }} 
              />

              <button 
                onClick={handleCopyLink} 
                className="gold-button-secondary"
                style={{ padding: '6px 12px', fontSize: '0.78rem', minHeight: '36px' }}
              >
                {copiedLink ? <Check size={14} color="#10B981" /> : <Copy size={14} />}
                {copiedLink ? 'Copied' : 'Copy'}
              </button>
            </div>

            <button 
              onClick={handleWhatsAppShare} 
              className="gold-button-primary"
              style={{ width: '100%', fontSize: '0.88rem' }}
            >
              <Share2 size={16} /> Send Customized List via WhatsApp
            </button>
          </div>

          {/* Items List Preview */}
          <div className="gold-card" style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Items List Preview ({currentActiveList.items.length}):
            </span>

            {currentActiveList.items.map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(154,118,40,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <strong style={{ fontSize: '0.88rem', color: '#FFF' }}>{item.nameRoman}</strong>
                  {item.nameEnglish && (
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>{item.nameEnglish}</span>
                  )}
                </div>
                <span style={{ fontSize: '0.78rem', color: 'var(--champagne-gold)', fontWeight: 600 }}>{item.qty}</span>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* CREATE CUSTOM CHECKLIST MODAL */}
      {showCreateModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 2500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div className="gold-card" style={{ width: '100%', maxWidth: '460px', maxHeight: '90vh', overflowY: 'auto', padding: '22px', background: '#171511', border: '1px solid var(--signature-gold)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <h3 className="font-heading" style={{ fontSize: '1.25rem', color: 'var(--champagne-gold)', margin: 0 }}>
                  Create Customized Checklist
                </h3>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  Tailor a ritual shopping list for your Yajamana clients
                </span>
              </div>

              <button onClick={() => setShowCreateModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveCustomList} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              
              {/* Title & Icon */}
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Ritual / Pooja Title:
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <select
                    value={customIcon}
                    onChange={(e) => setCustomIcon(e.target.value)}
                    style={{ padding: '8px 10px', borderRadius: '8px', background: '#000', border: '1px solid var(--border-gold)', color: '#FFF', fontSize: '1.1rem' }}
                  >
                    <option value="🪔">🪔</option>
                    <option value="🌸">🌸</option>
                    <option value="🔥">🔥</option>
                    <option value="🏠">🏠</option>
                    <option value="🥥">🥥</option>
                    <option value="📿">📿</option>
                    <option value="🕉️">🕉️</option>
                  </select>

                  <input
                    type="text"
                    required
                    placeholder="e.g. Sri Chandi Homam / Vastu Pooja"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', background: '#000', border: '1px solid var(--border-gold)', color: '#FFF', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              {/* Add New Item Input Row */}
              <div style={{ background: 'rgba(0,0,0,0.4)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(154,118,40,0.2)' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--champagne-gold)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                  + Add Item to List:
                </span>
                
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '6px', marginBottom: '6px' }}>
                  <input
                    type="text"
                    placeholder="Item Name (e.g. Navadhanyalu)"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    style={{ padding: '6px 8px', borderRadius: '6px', background: '#171511', border: '1px solid var(--border-gold)', color: '#FFF', fontSize: '0.8rem' }}
                  />
                  <input
                    type="text"
                    placeholder="Qty (e.g. 1 Packet)"
                    value={newItemQty}
                    onChange={(e) => setNewItemQty(e.target.value)}
                    style={{ padding: '6px 8px', borderRadius: '6px', background: '#171511', border: '1px solid var(--border-gold)', color: '#FFF', fontSize: '0.8rem' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '6px' }}>
                  <input
                    type="text"
                    placeholder="English / Subtitle (optional)"
                    value={newItemEnglish}
                    onChange={(e) => setNewItemEnglish(e.target.value)}
                    style={{ flex: 1, padding: '6px 8px', borderRadius: '6px', background: '#171511', border: '1px solid var(--border-gold)', color: '#FFF', fontSize: '0.8rem' }}
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomItem}
                    className="gold-button-primary"
                    style={{ padding: '4px 12px', fontSize: '0.78rem', minHeight: '32px' }}
                  >
                    <Plus size={14} /> Add
                  </button>
                </div>
              </div>

              {/* Quick Preset Helpers */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Items in list: <strong>{customItems.length}</strong>
                </span>

                <button
                  type="button"
                  onClick={handleAddQuickEssentials}
                  className="gold-button-secondary"
                  style={{ padding: '3px 8px', fontSize: '0.7rem', minHeight: '28px' }}
                >
                  <Sparkles size={12} color="var(--signature-gold)" /> + Add 5 Essentials
                </button>
              </div>

              {/* List of current items in creator */}
              <div style={{ maxHeight: '180px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px', border: '1px solid rgba(154,118,40,0.2)', borderRadius: '8px', padding: '6px' }}>
                {customItems.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '6px 10px',
                      background: '#0B0A08',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.82rem'
                    }}
                  >
                    <div>
                      <strong style={{ color: 'var(--pure-highlight)' }}>{item.nameRoman}</strong>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginLeft: '6px' }}>({item.qty})</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveCustomItem(idx)}
                      style={{ background: 'none', border: 'none', color: '#F87171', cursor: 'pointer', padding: '2px' }}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Modal Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="gold-button-secondary"
                  style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="gold-button-primary"
                  style={{ padding: '6px 16px', fontSize: '0.8rem' }}
                >
                  <Save size={14} /> Save & Open Checklist
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
