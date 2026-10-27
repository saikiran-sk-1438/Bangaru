import React, { useState } from 'react';
import { User, Search, Plus, Phone, MapPin, X, Users, BookOpen, Calendar as CalendarIcon, CheckCircle2 } from 'lucide-react';

export function ClientsView({ clients, bookings = [], onAddClient }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClientModal, setSelectedClientModal] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [gothram, setGothram] = useState('Kasyapa Gothram');
  const [nakshatram, setNakshatram] = useState('Rohini');
  const [spouse, setSpouse] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.gothram.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm)
  );

  const getClientEvents = (clientName) => {
    return bookings.filter(b => b.clientName && b.clientName.toLowerCase() === clientName.toLowerCase());
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!name) return;

    onAddClient({
      id: `c_${Date.now()}`,
      name,
      phone: phone || '9848012345',
      gothram,
      nakshatram,
      spouse,
      address,
      notes
    });

    setShowAddModal(false);
    setName('');
    setPhone('');
    setSpouse('');
    setAddress('');
    setNotes('');
  };

  return (
    <div style={{ padding: '16px', maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      
      {/* Header & New Client Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span className="kumkuma-badge" style={{ fontSize: '0.72rem' }}>YAJAMANA CRM</span>
          <h2 className="font-heading" style={{ fontSize: '1.4rem', color: 'var(--champagne-gold)', margin: '2px 0 0' }}>
            Client Profiles
          </h2>
        </div>

        <button 
          onClick={() => setShowAddModal(true)}
          className="gold-button-primary"
          style={{ padding: '6px 14px', fontSize: '0.82rem', minHeight: '36px' }}
        >
          <Plus size={16} /> Add Client
        </button>
      </div>

      {/* Search Bar */}
      <div className="gold-card" style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '8px', background: '#0B0A08' }}>
        <Search size={16} color="var(--signature-gold)" />
        <input 
          type="text" 
          placeholder="Search by name, gothram, or phone..." 
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

      {/* Client List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filteredClients.length === 0 ? (
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center', padding: '20px 0' }}>
            No clients found matching "{searchTerm}".
          </div>
        ) : (
          filteredClients.map((client) => {
            const clientEvents = getClientEvents(client.name);
            return (
              <div
                key={client.id}
                onClick={() => setSelectedClientModal(client)}
                className="gold-card"
                style={{
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  background: 'var(--deep-charcoal)',
                  border: '1px solid var(--border-gold)',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--grad-gold)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.9rem' }}>
                    {client.name.charAt(0)}
                  </div>

                  <div>
                    <strong style={{ fontSize: '0.95rem', color: '#FFF', display: 'block' }}>
                      {client.name}
                    </strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--champagne-gold)' }}>
                      {client.gothram} • {client.nakshatram}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', background: 'rgba(0,0,0,0.4)', padding: '2px 6px', borderRadius: '6px' }}>
                    {clientEvents.length} Events
                  </span>
                  <span style={{ color: 'var(--signature-gold)', fontSize: '1.1rem' }}>→</span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* CLIENT PROFILE MODAL POPUP WITH EVENT DETAILS */}
      {selectedClientModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 2500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div className="gold-card" style={{ width: '100%', maxWidth: '440px', maxHeight: '85vh', overflowY: 'auto', padding: '20px', background: '#171511', border: '1px solid var(--signature-gold)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid rgba(154,118,40,0.2)', paddingBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--grad-gold)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1rem' }}>
                  {selectedClientModal.name.charAt(0)}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--champagne-gold)', margin: 0 }}>
                    {selectedClientModal.name}
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    📞 {selectedClientModal.phone}
                  </span>
                </div>
              </div>

              <button onClick={() => setSelectedClientModal(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            {/* Client Bio Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem', marginBottom: '14px' }}>
              <div style={{ background: 'rgba(0,0,0,0.4)', padding: '10px', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem', display: 'block' }}>Gothram & Nakshatram:</span>
                <strong style={{ color: 'var(--pure-highlight)' }}>{selectedClientModal.gothram}</strong> • <span style={{ color: 'var(--champagne-gold)' }}>{selectedClientModal.nakshatram}</span>
              </div>

              {selectedClientModal.spouse && (
                <div style={{ background: 'rgba(0,0,0,0.4)', padding: '10px', borderRadius: '8px' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem', display: 'block' }}>Family:</span>
                  <span style={{ color: '#FFF' }}>{selectedClientModal.spouse} {selectedClientModal.children ? `• ${selectedClientModal.children}` : ''}</span>
                </div>
              )}

              {selectedClientModal.address && (
                <div style={{ background: 'rgba(0,0,0,0.4)', padding: '10px', borderRadius: '8px' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem', display: 'block' }}>Address:</span>
                  <span style={{ color: '#FFF' }}>📍 {selectedClientModal.address}</span>
                </div>
              )}
            </div>

            {/* EVENT DETAILS & POOJA HISTORY SECTION */}
            <div style={{ borderTop: '1px dashed var(--border-gold)', paddingTop: '12px' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--champagne-gold)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
                <CalendarIcon size={14} /> Scheduled Ceremonies & History:
              </span>

              {getClientEvents(selectedClientModal.name).length === 0 ? (
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', italic: 'true', padding: '6px 0' }}>
                  No ceremonies logged yet for this client.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {getClientEvents(selectedClientModal.name).map(event => (
                    <div key={event.id} style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border-gold)', borderRadius: '8px', padding: '8px 10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <strong style={{ fontSize: '0.88rem', color: '#FFF' }}>{event.title}</strong>
                        <span style={{ fontSize: '0.74rem', color: '#34D399', fontWeight: 700 }}>₹{event.totalDakshina}</span>
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        📅 {event.date} • 🕒 {event.time}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '1px' }}>
                        📍 {event.venue}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              <button onClick={() => setSelectedClientModal(null)} className="gold-button-primary" style={{ padding: '6px 16px', fontSize: '0.8rem' }}>
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD NEW CLIENT MODAL */}
      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 2500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div className="gold-card" style={{ width: '100%', maxWidth: '420px', padding: '20px', background: '#171511', border: '1px solid var(--signature-gold)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--champagne-gold)', margin: 0 }}>
                Add New Yajamana Client
              </h3>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input type="text" required placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} style={{ padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--border-gold)', background: '#000', color: '#FFF' }} />
              <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--border-gold)', background: '#000', color: '#FFF' }} />
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <input type="text" placeholder="Gothram" value={gothram} onChange={(e) => setGothram(e.target.value)} style={{ padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--border-gold)', background: '#000', color: '#FFF' }} />
                <input type="text" placeholder="Nakshatram" value={nakshatram} onChange={(e) => setNakshatram(e.target.value)} style={{ padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--border-gold)', background: '#000', color: '#FFF' }} />
              </div>

              <input type="text" placeholder="Spouse Name" value={spouse} onChange={(e) => setSpouse(e.target.value)} style={{ padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--border-gold)', background: '#000', color: '#FFF' }} />
              <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} style={{ padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--border-gold)', background: '#000', color: '#FFF' }} />
              <input type="text" placeholder="Notes (e.g. prefers 6 AM rituals)" value={notes} onChange={(e) => setNotes(e.target.value)} style={{ padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--border-gold)', background: '#000', color: '#FFF' }} />

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
                <button type="button" onClick={() => setShowAddModal(false)} className="gold-button-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>Cancel</button>
                <button type="submit" className="gold-button-primary" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>Save Client</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
