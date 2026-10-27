import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Plus, User, FileText, Check, Edit2, Trash2, Users, Eye, Bell, ExternalLink, Download, CheckCircle2 } from 'lucide-react';
import { DateDetailsModal } from './DateDetailsModal';
import { INITIAL_PANCHANGAM } from '../data/mockData';
import { syncBookingToGoogleCalendar, generateGoogleCalendarUrl, downloadIcalFile } from '../utils/googleCalendarSync';
import { scheduleEventReminder } from '../utils/notificationEngine';

export function CalendarView({ bookings, clients, onAddBooking, onUpdateBooking, onDeleteBooking, onSelectBookingForDelegation }) {
  const [selectedDate, setSelectedDate] = useState('2026-08-23');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [showDateDetailsModal, setShowDateDetailsModal] = useState(false);
  const [reminderSetMap, setReminderSetMap] = useState({});
  const [autoSyncNotice, setAutoSyncNotice] = useState(null);

  // Form state
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('2026-08-23');
  const [time, setTime] = useState('08:30 AM');
  const [clientName, setClientName] = useState('');
  const [venue, setVenue] = useState('');
  const [totalDakshina, setTotalDakshina] = useState(5000);
  const [samagriChecklist, setSamagriChecklist] = useState('Flowers, Coconut, Ghee, Mango Leaves');

  const selectedDateBookings = bookings.filter(b => b.date === selectedDate);

  const handleDateClick = (dStr) => {
    setSelectedDate(dStr);
  };

  const handleDateDoubleClick = (dStr) => {
    setSelectedDate(dStr);
    setShowDateDetailsModal(true);
  };

  const openAddForDate = (dStr) => {
    setSelectedDate(dStr);
    setDate(dStr);
    setTitle('');
    setClientName(clients[0]?.name || '');
    setVenue('');
    setTotalDakshina(5000);
    setEditingBooking(null);
    setShowAddModal(true);
  };

  const openEditModal = (booking) => {
    setEditingBooking(booking);
    setTitle(booking.title);
    setDate(booking.date);
    setTime(booking.time);
    setClientName(booking.clientName);
    setVenue(booking.venue);
    setTotalDakshina(booking.totalDakshina);
    setShowAddModal(true);
  };

  const handleDelete = (id, bTitle) => {
    if (window.confirm(`Delete "${bTitle}"?`)) {
      onDeleteBooking(id);
    }
  };

  const handleGoogleSync = (booking) => {
    const url = generateGoogleCalendarUrl(booking);
    window.open(url, '_blank');
  };

  const handleSetReminder = async (booking) => {
    const success = await scheduleEventReminder(booking);
    if (success) {
      setReminderSetMap(prev => ({ ...prev, [booking.id]: true }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !clientName) return;

    const bookingData = {
      id: editingBooking ? editingBooking.id : `b_${Date.now()}`,
      title,
      date,
      time,
      clientName,
      venue,
      totalDakshina: Number(totalDakshina),
      status: 'Confirmed',
      delegatedTo: editingBooking ? editingBooking.delegatedTo : null,
      samagriChecklist: samagriChecklist.split(',').map(s => ({ name: s.trim(), status: 'Pending' }))
    };

    if (editingBooking) {
      onUpdateBooking(bookingData);
    } else {
      onAddBooking(bookingData);
    }

    // AUTOMATIC GOOGLE CALENDAR SYNC (Without asking user!)
    try {
      const syncRes = await syncBookingToGoogleCalendar(bookingData);
      if (syncRes.url) {
        // Open Google Calendar event creation directly in background/tab
        window.open(syncRes.url, '_blank');
      }
      setAutoSyncNotice(`✓ "${title}" auto-synced to your Google Calendar & reminders scheduled!`);
      setTimeout(() => setAutoSyncNotice(null), 4000);
    } catch (err) {
      console.warn('Auto sync Google error:', err);
    }

    setShowAddModal(false);
  };

  // Calendar dates (Aug 2026 demo)
  const augustDays = Array.from({ length: 31 }, (_, i) => {
    const dayNum = i + 1;
    const dStr = `2026-08-${dayNum < 10 ? '0' + dayNum : dayNum}`;
    const hasBooking = bookings.some(b => b.date === dStr);
    return { dayNum, dStr, hasBooking };
  });

  return (
    <div style={{ padding: '16px', maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span className="kumkuma-badge" style={{ fontSize: '0.72rem' }}>PANCHANGAM CALENDAR</span>
          <h2 className="font-heading" style={{ fontSize: '1.4rem', color: 'var(--champagne-gold)', margin: '2px 0 0' }}>
            August 2026 Schedule
          </h2>
        </div>

        <button 
          onClick={() => openAddForDate(selectedDate)}
          className="gold-button-primary"
          style={{ padding: '6px 14px', fontSize: '0.82rem', minHeight: '36px' }}
        >
          <Plus size={16} /> New Pooja
        </button>
      </div>

      {/* Auto-Sync Banner */}
      {autoSyncNotice && (
        <div style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid #10B981', color: '#6EE7B7', padding: '10px 14px', borderRadius: '10px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={16} color="#10B981" />
          <span>{autoSyncNotice}</span>
        </div>
      )}

      {/* Google Calendar Direct Sync Hint */}
      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textAlign: 'center', background: 'rgba(0,0,0,0.3)', padding: '6px 10px', borderRadius: '8px' }}>
        ⚡ <strong>Automatic Google Sync:</strong> Every pooja scheduled is automatically saved to your signed-in Google Calendar!
      </div>

      {/* Calendar Grid */}
      <div className="gold-card" style={{ padding: '14px', background: 'var(--deep-charcoal)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px', textAlign: 'center', fontWeight: 600, fontSize: '0.75rem', color: 'var(--signature-gold)', marginBottom: '8px' }}>
          <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px' }}>
          {augustDays.map(({ dayNum, dStr, hasBooking }) => {
            const isSelected = selectedDate === dStr;
            return (
              <button
                key={dStr}
                onClick={() => handleDateClick(dStr)}
                onDoubleClick={() => handleDateDoubleClick(dStr)}
                style={{
                  height: '42px',
                  borderRadius: '8px',
                  border: isSelected ? '2px solid var(--signature-gold)' : '1px solid rgba(154,118,40,0.2)',
                  background: isSelected ? 'var(--dark-mocha)' : 'rgba(0,0,0,0.3)',
                  color: isSelected ? 'var(--pure-highlight)' : 'var(--text-main)',
                  fontWeight: isSelected ? 700 : 500,
                  fontSize: '0.88rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>{dayNum}</span>
                {hasBooking && (
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#10B981', position: 'absolute', bottom: '4px' }} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Date Actions */}
      <div className="gold-card" style={{ padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0B0A08' }}>
        <div>
          <strong style={{ fontSize: '0.95rem', color: 'var(--champagne-gold)' }}>
            Selected Date: {selectedDate}
          </strong>
          <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block' }}>
            {selectedDateBookings.length} Scheduled Poojas
          </span>
        </div>

        <button 
          onClick={() => setShowDateDetailsModal(true)}
          className="gold-button-secondary"
          style={{ padding: '5px 12px', fontSize: '0.78rem' }}
        >
          <Eye size={14} /> View Tithi Details
        </button>
      </div>

      {/* Bookings List with Google Calendar Sync & Push Notification Reminders */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {selectedDateBookings.length === 0 ? (
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center', padding: '16px 0' }}>
            No poojas booked on {selectedDate}. Tap "+ New Pooja" to add.
          </div>
        ) : (
          selectedDateBookings.map(b => {
            const isReminderSet = !!reminderSetMap[b.id];
            return (
              <div 
                key={b.id} 
                className="gold-card"
                style={{ 
                  padding: '14px', 
                  background: 'var(--deep-charcoal)', 
                  border: '1px solid var(--border-gold)',
                  position: 'relative'
                }}
              >
                {/* Top Right Corner Edit & Delete Icons */}
                <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '6px' }}>
                  <button 
                    onClick={() => openEditModal(b)}
                    style={{ background: 'rgba(198,161,91,0.15)', border: '1px solid var(--border-gold)', borderRadius: '4px', padding: '4px 6px', color: 'var(--champagne-gold)', cursor: 'pointer', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '2px' }}
                    title="Edit Booking"
                  >
                    <Edit2 size={13} /> Edit
                  </button>

                  <button 
                    onClick={() => handleDelete(b.id, b.title)}
                    style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid #EF4444', borderRadius: '4px', padding: '4px 6px', color: '#F87171', cursor: 'pointer', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '2px' }}
                    title="Delete Booking"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>

                <div style={{ paddingRight: '90px' }}>
                  <strong style={{ fontSize: '1.05rem', color: 'var(--champagne-gold)', display: 'block' }}>{b.title}</strong>
                  <div style={{ fontSize: '0.82rem', color: '#FFF', marginTop: '2px' }}>
                    👤 {b.clientName} • 🕒 {b.time}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    📍 {b.venue}
                  </div>
                </div>

                {/* Google Calendar & Push Notification Reminder Action Bar */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '12px', paddingTop: '10px', borderTop: '1px solid rgba(154,118,40,0.2)' }}>
                  <button
                    onClick={() => handleGoogleSync(b)}
                    className="gold-button-primary"
                    style={{ flex: 1, padding: '4px 10px', fontSize: '0.75rem', minHeight: '32px' }}
                  >
                    <ExternalLink size={13} /> Open in Google Calendar
                  </button>

                  <button
                    onClick={() => handleSetReminder(b)}
                    className="gold-button-secondary"
                    style={{ padding: '4px 10px', fontSize: '0.75rem', minHeight: '32px', borderColor: isReminderSet ? '#10B981' : 'var(--border-gold)', color: isReminderSet ? '#34D399' : 'var(--text-main)' }}
                  >
                    <Bell size={13} /> {isReminderSet ? 'Reminder Active ✓' : 'Set Reminder'}
                  </button>

                  <button
                    onClick={() => downloadIcalFile(b)}
                    className="gold-button-secondary"
                    style={{ padding: '4px 8px', fontSize: '0.75rem', minHeight: '32px' }}
                    title="Download iCal (.ics)"
                  >
                    <Download size={13} /> .ics
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* DATE DETAILS POPUP MODAL */}
      {showDateDetailsModal && (
        <DateDetailsModal 
          dateStr={selectedDate} 
          panchangam={INITIAL_PANCHANGAM} 
          onClose={() => setShowDateDetailsModal(false)} 
        />
      )}

      {/* ADD / EDIT BOOKING MODAL */}
      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 2500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div className="gold-card" style={{ width: '100%', maxWidth: '420px', padding: '20px', background: '#171511', border: '1px solid var(--signature-gold)' }}>
            <h3 style={{ fontSize: '1.15rem', color: 'var(--champagne-gold)', marginBottom: '14px' }}>
              {editingBooking ? 'Edit Ceremony Booking' : 'Schedule New Pooja'}
            </h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input type="text" required placeholder="Ceremony Title (e.g. Satyanarayana Vratham)" value={title} onChange={(e) => setTitle(e.target.value)} style={{ padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--border-gold)', background: '#000', color: '#FFF' }} />
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--border-gold)', background: '#000', color: '#FFF' }} />
                <input type="text" value={time} onChange={(e) => setTime(e.target.value)} style={{ padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--border-gold)', background: '#000', color: '#FFF' }} />
              </div>

              <input type="text" required placeholder="Client / Yajamana Name" value={clientName} onChange={(e) => setClientName(e.target.value)} style={{ padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--border-gold)', background: '#000', color: '#FFF' }} />
              <input type="text" placeholder="Venue Address" value={venue} onChange={(e) => setVenue(e.target.value)} style={{ padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--border-gold)', background: '#000', color: '#FFF' }} />
              <input type="number" placeholder="Dakshina Fee (₹)" value={totalDakshina} onChange={(e) => setTotalDakshina(e.target.value)} style={{ padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--border-gold)', background: '#000', color: '#FFF' }} />

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
                <button type="button" onClick={() => setShowAddModal(false)} className="gold-button-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>Cancel</button>
                <button type="submit" className="gold-button-primary" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>Save & Auto-Sync Google Calendar</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
