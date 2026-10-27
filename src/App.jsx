import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Home as HomeIcon, Calendar as CalendarIcon, BookOpen, Compass, Share2, 
  Users, User, Bell, Star, Wallet, Sparkles, Plus, Grid, X, UserPlus, 
  LogOut, Settings as SettingsIcon, Lock, Award
} from 'lucide-react';

import './styles/theme.css';
import { 
  INITIAL_PANCHANGAM, INITIAL_CLIENTS, INITIAL_BOOKINGS, 
  INITIAL_ASSOCIATES 
} from './data/mockData';

import { HomeView } from './components/HomeView';
import { CalendarView } from './components/CalendarView';
import { TeleprompterDemo } from './components/TeleprompterDemo';
import { SankalpamDemo } from './components/SankalpamDemo';
import { SamagriDemo } from './components/SamagriDemo';
import { DelegationDemo } from './components/DelegationDemo';
import { ClientsView } from './components/ClientsView';
import { TithiReminderDemo } from './components/TithiReminderDemo';
import { GothramDemo } from './components/GothramDemo';
import { GunaMelanamDemo } from './components/GunaMelanamDemo';
import { LedgerDemo } from './components/LedgerDemo';
import { ClientPortalView } from './components/ClientPortalView';
import { LoginPage } from './components/LoginPage';
import { JapaCounterView } from './components/JapaCounterView';
import { SettingsView } from './components/SettingsView';

const toTitleCase = (str) => {
  if (!str) return '';
  return str.replace(/\b\w/g, c => c.toUpperCase());
};

export default function App() {
  const params = new URLSearchParams(window.location.search);
  const isClientPortal = params.get('mode') === 'client';

  // Login & Priest Name State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('bangaru_auth') === 'true';
  });

  const [priestName, setPriestName] = useState(() => {
    return localStorage.getItem('bangaru_priest_name') || 'Sri Krishnamurthy Shastri';
  });

  const [activeTab, setActiveTab] = useState('home');
  const [showPlusSheet, setShowPlusSheet] = useState(false);
  const [showToolsDrawer, setShowToolsDrawer] = useState(false);
  const [showBetaLockModal, setShowBetaLockModal] = useState(false);
  const [theme, setTheme] = useState('sanctum');

  // Application Data State
  const [clients, setClients] = useState(() => {
    const saved = localStorage.getItem('panthulu_clients');
    return saved ? JSON.parse(saved) : INITIAL_CLIENTS;
  });

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('panthulu_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [associates, setAssociates] = useState(() => {
    const saved = localStorage.getItem('panthulu_associates');
    return saved ? JSON.parse(saved) : INITIAL_ASSOCIATES;
  });

  useEffect(() => {
    localStorage.setItem('panthulu_clients', JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem('panthulu_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('panthulu_associates', JSON.stringify(associates));
  }, [associates]);

  const handleAddBooking = (newBooking) => {
    setBookings(prev => [newBooking, ...prev]);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#C6A15B', '#E2C98B', '#9A7628']
    });
  };

  const handleUpdateBooking = (updatedBooking) => {
    setBookings(prev => prev.map(b => b.id === updatedBooking.id ? updatedBooking : b));
  };

  const handleDeleteBooking = (bookingId) => {
    setBookings(prev => prev.filter(b => b.id !== bookingId));
  };

  const handleAddClient = (newClient) => {
    setClients(prev => [{ ...newClient, name: toTitleCase(newClient.name) }, ...prev]);
  };

  const handleSelectBookingForDelegation = (booking) => {
    setShowBetaLockModal(true); // Locked in Beta
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'sanctum' ? 'parchment' : 'sanctum';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const handleLoginAsPriest = (name) => {
    const formattedName = toTitleCase(name);
    setPriestName(formattedName);
    localStorage.setItem('bangaru_priest_name', formattedName);
    setIsAuthenticated(true);
    localStorage.setItem('bangaru_auth', 'true');
  };

  const handleLoginWithGoogle = (user) => {
    setPriestName(user.name);
    localStorage.setItem('bangaru_priest_name', user.name);
    localStorage.setItem('bangaru_google_user', JSON.stringify(user));
    setIsAuthenticated(true);
    localStorage.setItem('bangaru_auth', 'true');
  };

  const handleLoginAsClient = (phone) => {
    window.location.href = `?mode=client&samagri=satyanarayana&client=Suresh+Sharma&priest=${encodeURIComponent(priestName)}`;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('bangaru_auth');
    localStorage.removeItem('bangaru_google_user');
    if (isClientPortal) {
      window.location.href = window.location.pathname;
    }
  };

  // IF LINK HAS ?mode=client RENDER ISOLATED CLIENT PORTAL
  if (isClientPortal) {
    return <ClientPortalView />;
  }

  // IF NOT AUTHENTICATED SHOW LOGIN PAGE
  if (!isAuthenticated) {
    return (
      <LoginPage 
        onLoginAsPriest={handleLoginAsPriest} 
        onLoginAsClient={handleLoginAsClient}
        onLoginWithGoogle={handleLoginWithGoogle}
      />
    );
  }

  const allTools = [
    { id: 'calendar', label: 'Calendar', desc: 'Panchangam & Google Sync', icon: <CalendarIcon size={20} /> },
    { id: 'teleprompter', label: 'Mantra Reader', desc: 'Hands-free Teleprompter', icon: <BookOpen size={20} /> },
    { id: 'japa', label: 'Sloka Counter', desc: '108 Japa Tally Counter', icon: <Sparkles size={20} /> },
    { id: 'sankalpam', label: 'Sankalpam', desc: 'Real-time Compiler', icon: <Compass size={20} /> },
    { id: 'samagri', label: 'Samagri List', desc: '1-Click WhatsApp Link', icon: <Share2 size={20} /> },
    { id: 'delegation', label: 'Delegation (Beta)', desc: 'Assign Associate Priests', icon: <Lock size={20} color="#FFA040" />, isBeta: true },
    { id: 'clients', label: 'Yajamana CRM', desc: 'Client Profiles & Gothram', icon: <User size={20} /> },
    { id: 'settings', label: 'Settings & Profile', desc: 'Preferences & Language', icon: <SettingsIcon size={20} /> },
    { id: 'tithi', label: 'Tithi Reminders', desc: 'Annual Shraddha Dates', icon: <Bell size={20} /> },
    { id: 'gothram', label: 'Gothram Search', desc: '150+ Rishi Lineages', icon: <BookOpen size={20} /> },
    { id: 'gunamelanam', label: '36-Guna Matcher', desc: 'Ashtakoota Horoscope', icon: <Star size={20} /> },
    { id: 'ledger', label: 'Dakshina Ledger', desc: 'Fee & Expense Tracker', icon: <Wallet size={20} /> }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', paddingBottom: '76px' }}>
      
      {/* Clean Minimalist Top App Bar - Bangaru Vedic Calendar */}
      <header 
        style={{ 
          position: 'sticky', 
          top: 0, 
          zIndex: 900, 
          background: 'rgba(11, 10, 8, 0.96)', 
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border-gold)',
          padding: '10px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        {/* Logo & Name: Bangaru Vedic Calendar */}
        <div 
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} 
          onClick={() => setActiveTab('home')}
        >
          <img 
            src="/logo.png" 
            alt="Bangaru Logo" 
            style={{ width: '38px', height: '38px', objectFit: 'contain', filter: 'drop-shadow(0 0 6px var(--signature-gold))' }} 
          />
          <div>
            <h1 className="font-heading" style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--champagne-gold)', margin: 0, lineHeight: 1.1, letterSpacing: '0.5px' }}>
              Bangaru Vedic Calendar
            </h1>
          </div>
        </div>

        {/* Right Header: Logout & Switch Role Button */}
        <button 
          onClick={handleLogout}
          className="gold-button-secondary"
          style={{ padding: '5px 10px', fontSize: '0.75rem', minHeight: '34px', border: '1px solid #EF4444', color: '#F87171' }}
          title="Logout / Switch Role"
        >
          <LogOut size={14} />
        </button>
      </header>

      {/* Main Single Tab View */}
      <main style={{ flex: 1 }}>
        {activeTab === 'home' && (
          <HomeView 
            bookings={bookings} 
            priestName={priestName}
            onNavigate={(tab) => setActiveTab(tab)} 
            onOpenPlusModal={() => setShowPlusSheet(true)}
            onDeleteBooking={handleDeleteBooking}
          />
        )}
        {activeTab === 'calendar' && (
          <CalendarView 
            bookings={bookings} 
            clients={clients} 
            onAddBooking={handleAddBooking}
            onUpdateBooking={handleUpdateBooking}
            onDeleteBooking={handleDeleteBooking}
            onSelectBookingForDelegation={handleSelectBookingForDelegation}
          />
        )}
        {activeTab === 'teleprompter' && <TeleprompterDemo />}
        {activeTab === 'japa' && <JapaCounterView />}
        {activeTab === 'sankalpam' && <SankalpamDemo />}
        {activeTab === 'samagri' && <SamagriDemo priestName={priestName} />}
        {activeTab === 'delegation' && <DelegationDemo />}
        {activeTab === 'clients' && <ClientsView clients={clients} bookings={bookings} onAddClient={handleAddClient} />}
        {activeTab === 'settings' && (
          <SettingsView 
            theme={theme} 
            onToggleTheme={toggleTheme} 
            priestName={priestName}
            onUpdatePriestName={(name) => {
              const formatted = toTitleCase(name);
              setPriestName(formatted);
              localStorage.setItem('bangaru_priest_name', formatted);
            }} 
          />
        )}
        {activeTab === 'tithi' && <TithiReminderDemo />}
        {activeTab === 'gothram' && <GothramDemo />}
        {activeTab === 'gunamelanam' && <GunaMelanamDemo />}
        {activeTab === 'ledger' && <LedgerDemo />}
      </main>

      {/* INSTAGRAM-STYLE BOTTOM NAVIGATION BAR */}
      <nav className="instagram-bottom-nav">
        {/* Slot 1: Home */}
        <button 
          onClick={() => { setActiveTab('home'); setShowToolsDrawer(false); setShowPlusSheet(false); }}
          className={`insta-nav-item ${activeTab === 'home' ? 'active' : ''}`}
        >
          <HomeIcon size={22} />
          <span>Home</span>
        </button>

        {/* Slot 2: Calendar */}
        <button 
          onClick={() => { setActiveTab('calendar'); setShowToolsDrawer(false); setShowPlusSheet(false); }}
          className={`insta-nav-item ${activeTab === 'calendar' ? 'active' : ''}`}
        >
          <CalendarIcon size={22} />
          <span>Calendar</span>
        </button>

        {/* Slot 3 (Center): Elevated Plus (+) Button */}
        <button 
          onClick={() => setShowPlusSheet(true)}
          className="insta-plus-btn"
          title="Create New Action"
        >
          <Plus size={26} strokeWidth={2.8} />
        </button>

        {/* Slot 4: Reader */}
        <button 
          onClick={() => { setActiveTab('teleprompter'); setShowToolsDrawer(false); setShowPlusSheet(false); }}
          className={`insta-nav-item ${activeTab === 'teleprompter' ? 'active' : ''}`}
        >
          <BookOpen size={22} />
          <span>Reader</span>
        </button>

        {/* Slot 5: Menu */}
        <button 
          onClick={() => { setShowToolsDrawer(true); setShowPlusSheet(false); }}
          className={`insta-nav-item ${showToolsDrawer ? 'active' : ''}`}
        >
          <Grid size={22} />
          <span>Menu</span>
        </button>
      </nav>

      {/* INSTAGRAM PLUS (+) CREATION ACTION SHEET */}
      {showPlusSheet && (
        <div className="insta-action-overlay" onClick={() => setShowPlusSheet(false)}>
          <div className="insta-action-sheet" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--champagne-gold)', margin: 0 }}>
                  Create New Action
                </h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Select an action to schedule or generate
                </span>
              </div>

              <button onClick={() => setShowPlusSheet(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={22} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                onClick={() => {
                  setActiveTab('calendar');
                  setShowPlusSheet(false);
                }}
                className="gold-card"
                style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px', textAlign: 'left', cursor: 'pointer' }}
              >
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'var(--grad-gold)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CalendarIcon size={22} />
                </div>
                <div>
                  <strong style={{ fontSize: '1rem', color: '#FFF', display: 'block' }}>New Pooja / Ceremony Booking</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Schedule & sync to Google Calendar</span>
                </div>
              </button>

              <button
                onClick={() => {
                  setActiveTab('clients');
                  setShowPlusSheet(false);
                }}
                className="gold-card"
                style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px', textAlign: 'left', cursor: 'pointer' }}
              >
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(16,185,129,0.2)', border: '1px solid #10B981', color: '#6EE7B7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <UserPlus size={22} />
                </div>
                <div>
                  <strong style={{ fontSize: '1rem', color: '#FFF', display: 'block' }}>Add New Yajamana Client</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Create client profile with Gothram & Nakshatram</span>
                </div>
              </button>

              <button
                onClick={() => {
                  setActiveTab('japa');
                  setShowPlusSheet(false);
                }}
                className="gold-card"
                style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px', textAlign: 'left', cursor: 'pointer' }}
              >
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(198,161,91,0.2)', border: '1px solid var(--signature-gold)', color: 'var(--champagne-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Sparkles size={22} />
                </div>
                <div>
                  <strong style={{ fontSize: '1rem', color: '#FFF', display: 'block' }}>108 Sloka Japa Counter</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Tap bead counter for mantras</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MORE TOOLS DRAWER (Slot 5 Menu) */}
      {showToolsDrawer && (
        <div className="insta-action-overlay" onClick={() => setShowToolsDrawer(false)}>
          <div className="insta-action-sheet" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--champagne-gold)', margin: 0 }}>
                  Tools Directory
                </h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Tap any tool to open instantly
                </span>
              </div>

              <button onClick={() => setShowToolsDrawer(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={22} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {allTools.map((tool) => {
                const isSelected = activeTab === tool.id;
                return (
                  <button
                    key={tool.id}
                    onClick={() => {
                      if (tool.isBeta) {
                        setShowBetaLockModal(true);
                      } else {
                        setActiveTab(tool.id);
                        setShowToolsDrawer(false);
                      }
                    }}
                    style={{
                      background: isSelected ? 'rgba(198,161,91,0.2)' : 'rgba(0,0,0,0.4)',
                      border: tool.isBeta ? '1px solid #FFA040' : (isSelected ? '1px solid var(--signature-gold)' : '1px solid var(--border-gold)'),
                      borderRadius: '12px',
                      padding: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      position: 'relative'
                    }}
                  >
                    <div style={{ color: tool.isBeta ? '#FFA040' : (isSelected ? 'var(--pure-highlight)' : 'var(--signature-gold)') }}>
                      {tool.icon}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.88rem', color: isSelected ? 'var(--pure-highlight)' : '#FFF', margin: 0, fontWeight: 600 }}>
                        {tool.label}
                      </h4>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginTop: '1px' }}>
                        {tool.desc}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* BETA LOCK POPUP MODAL FOR DELEGATION */}
      {showBetaLockModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 2500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div className="gold-card" style={{ width: '100%', maxWidth: '380px', padding: '24px', background: '#171511', border: '1px solid #FFA040', textAlign: 'center' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(255,160,64,0.15)', border: '1px solid #FFA040', color: '#FFA040', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
              <Lock size={26} />
            </div>

            <h3 className="font-heading" style={{ fontSize: '1.3rem', color: 'var(--champagne-gold)', margin: 0 }}>
              Panthulu Delegation Hub
            </h3>
            <span style={{ fontSize: '0.72rem', background: '#FF6F00', color: '#FFF', padding: '2px 8px', borderRadius: '10px', fontWeight: 700, margin: '6px 0 12px', display: 'inline-block' }}>
              🔒 FEATURE IN BETA PREVIEW
            </span>

            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.4, margin: '8px 0 16px' }}>
              This feature is currently locked for public access and undergoing private testing with senior Purohit networks.
            </p>

            <button onClick={() => setShowBetaLockModal(false)} className="gold-button-primary" style={{ width: '100%' }}>
              Understand & Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
