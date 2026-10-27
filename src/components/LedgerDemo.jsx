import React, { useState } from 'react';
import { DollarSign, TrendingUp, CreditCard, Wallet, Plus, CheckCircle2, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export function LedgerDemo() {
  const [entries, setEntries] = useState([
    { id: 1, type: 'income', title: 'Sri Satyanarayana Vratham - Ramesh Garu', amount: 5000, mode: 'UPI (PhonePe)', date: '12-August-2026', status: 'Completed' },
    { id: 2, type: 'advance', title: 'Wedding Booking Token Advance - Suresh Sharma', amount: 3000, mode: 'Google Pay', date: '14-August-2026', status: 'Advance Token' },
    { id: 3, type: 'expense', title: 'Homam Ingredients & Pure Cow Ghee Purchase', amount: 1800, mode: 'Cash', date: '10-August-2026', status: 'Paid' },
    { id: 4, type: 'payout', title: 'Assistant Priest Share - Venkatacharyulu', amount: 4000, mode: 'Bank Transfer', date: '08-August-2026', status: 'Disbursed' }
  ]);

  const totalIncome = entries.filter(e => e.type === 'income' || e.type === 'advance').reduce((acc, e) => acc + e.amount, 0);
  const totalExpense = entries.filter(e => e.type === 'expense' || e.type === 'payout').reduce((acc, e) => acc + e.amount, 0);
  const netEarnings = totalIncome - totalExpense;

  return (
    <div style={{ padding: '24px 20px', maxWidth: '1150px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <span className="kumkuma-badge" style={{ marginBottom: '10px' }}>
          <Wallet size={14} /> DEMO 8: DAKSHINA & SAMBHAVANA FINANCIAL LEDGER
        </span>
        <h2 className="font-heading" style={{ fontSize: '2.1rem', color: 'var(--text-gold)' }}>
          Transparent Dakshina & Fee Management
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '750px', margin: '6px auto 0' }}>
          Track ceremony honorariums (Dakshina), advance tokens, samagri expenses, and payouts to assistant priests.
        </p>
      </div>

      {/* Top 3 Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div className="gold-card" style={{ padding: '20px', background: 'rgba(16, 185, 129, 0.1)' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Total Dakshina Received (Aadayam):</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34D399', margin: '4px 0' }}>
            ₹{totalIncome.toLocaleString('en-IN')}
          </div>
          <span style={{ fontSize: '0.78rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ArrowUpRight size={14} /> This Month's Inflow
          </span>
        </div>

        <div className="gold-card" style={{ padding: '20px', background: 'rgba(239, 68, 68, 0.1)' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Expenses & Payouts (Kharchulu):</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#F87171', margin: '4px 0' }}>
            ₹{totalExpense.toLocaleString('en-IN')}
          </div>
          <span style={{ fontSize: '0.78rem', color: '#EF4444', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ArrowDownRight size={14} /> Samagri + Associate Priests
          </span>
        </div>

        <div className="gold-card" style={{ padding: '20px', background: 'rgba(245, 189, 2, 0.15)', border: '1px solid var(--border-gold-bright)' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-gold)' }}>Net Priest Earnings (Nikara Laabham):</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--gold-primary)', margin: '4px 0' }}>
            ₹{netEarnings.toLocaleString('en-IN')}
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--gold-light)' }}>
            ✨ Net Priest Honorarium
          </span>
        </div>
      </div>

      {/* Transaction List */}
      <div className="gold-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.15rem', color: 'var(--gold-light)', marginBottom: '14px', borderBottom: '1px solid rgba(245,189,2,0.2)', paddingBottom: '10px' }}>
          Recent Dakshina Entries & Log Book
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {entries.map((entry) => (
            <div 
              key={entry.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(0,0,0,0.4)',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid rgba(245,189,2,0.15)'
              }}
            >
              <div>
                <h4 style={{ color: '#FFF', fontSize: '0.95rem', margin: 0 }}>
                  {entry.title}
                </h4>
                <div style={{ display: 'flex', gap: '10px', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  <span>📅 {entry.date}</span>
                  <span>💳 {entry.mode}</span>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '1.05rem', fontWeight: 700, color: entry.type === 'income' || entry.type === 'advance' ? '#34D399' : '#F87171' }}>
                  {entry.type === 'income' || entry.type === 'advance' ? '+' : '-'}₹{entry.amount.toLocaleString('en-IN')}
                </span>
                <span className="kumkuma-badge" style={{ display: 'block', fontSize: '0.7rem', padding: '1px 6px', marginTop: '2px' }}>
                  {entry.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
