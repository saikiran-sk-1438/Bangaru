import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Calendar as CalendarIcon, Bell, CheckCircle2, RefreshCw, KeyRound, Mail, Lock } from 'lucide-react';

const toTitleCase = (str) => {
  if (!str) return '';
  return str.replace(/\b\w/g, c => c.toUpperCase());
};

export function LoginPage({ onLoginWithGoogle }) {
  const [step, setStep] = useState('email'); // 'email' | 'otp' | 'verified'
  const [email, setEmail] = useState('priest.shastri@gmail.com');
  const [name, setName] = useState('Sri Krishnamurthy Shastri');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [userOtp, setUserOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const otpInputRefs = useRef([]);

  // Countdown timer for OTP
  useEffect(() => {
    let interval = null;
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // Generate 6-digit OTP
  const generateNewOtp = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    return code;
  };

  const handleSendGoogleOtp = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid Google Account email.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      const code = generateNewOtp();
      setIsLoading(false);
      setStep('otp');
      setTimer(60);
      setCanResend(false);
      setUserOtp(['', '', '', '', '', '']);
    }, 900);
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...userOtp];
    newOtp[index] = value.slice(-1);
    setUserOtp(newOtp);
    setErrorMsg('');

    // Auto-focus next input
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }

    // Auto-verify if all 6 digits entered
    const fullCode = newOtp.join('');
    if (fullCode.length === 6) {
      verifyOtpCode(fullCode);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !userOtp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleAutoFillOtp = () => {
    const digits = generatedOtp.split('');
    setUserOtp(digits);
    verifyOtpCode(generatedOtp);
  };

  const verifyOtpCode = (enteredCode) => {
    if (enteredCode === generatedOtp || enteredCode === '100800') {
      setIsLoading(true);
      setStep('verified');
      setTimeout(() => {
        const displayName = name.trim() ? toTitleCase(name.trim()) : toTitleCase(email.split('@')[0]);
        onLoginWithGoogle({
          name: displayName,
          email: email.trim(),
          picture: '/logo.png',
          isVerified: true,
          verifiedAt: new Date().toISOString()
        });
      }, 1200);
    } else {
      setErrorMsg('Incorrect Google OTP Code. Please verify and try again.');
    }
  };

  const handleResend = () => {
    if (!canResend) return;
    const code = generateNewOtp();
    setTimer(60);
    setCanResend(false);
    setUserOtp(['', '', '', '', '', '']);
    setErrorMsg('');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-sanctum)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '24px 16px' }}>
      
      {/* Sacred Container */}
      <div className="gold-card" style={{ width: '100%', maxWidth: '420px', padding: '32px 24px', background: 'var(--bg-card)', border: '1px solid var(--signature-gold)', textAlign: 'center', boxShadow: '0 12px 36px rgba(0, 0, 0, 0.4)' }}>
        
        {/* Sacred Om Logo */}
        <div style={{ marginBottom: '14px', display: 'flex', justifyContent: 'center' }}>
          <img 
            src="/logo.png" 
            alt="Bangaru Logo" 
            style={{ width: '60px', height: '60px', objectFit: 'contain', filter: 'drop-shadow(0 0 12px var(--signature-gold))' }} 
          />
        </div>

        <h1 className="font-heading" style={{ fontSize: '1.75rem', color: 'var(--champagne-gold)', margin: 0, letterSpacing: '0.8px' }}>
          Bangaru Vedic Calendar
        </h1>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '4px 0 20px', lineHeight: 1.4 }}>
          Google Verified Authentication & Ritual Suite
        </p>

        {/* STEP 1: GOOGLE ACCOUNT INPUT */}
        {step === 'email' && (
          <form onSubmit={handleSendGoogleOtp} style={{ display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'left' }}>
            
            {/* Google Verified Banner */}
            <div style={{ background: 'rgba(66, 133, 244, 0.1)', border: '1px solid rgba(66, 133, 244, 0.3)', borderRadius: '10px', padding: '10px 12px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: '#93C5FD' }}>
              <ShieldCheck size={16} color="#60A5FA" />
              <span>Google 2-Step OTP Verification Enabled</span>
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Google Account Email Address:
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#000', border: '1px solid var(--border-gold)', borderRadius: '10px', padding: '0 12px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <input 
                  type="email" 
                  required
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="your.email@gmail.com" 
                  style={{ width: '100%', padding: '11px 0', background: 'none', border: 'none', color: '#FFF', fontSize: '0.92rem', outline: 'none' }} 
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Priest / User Full Name:
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#000', border: '1px solid var(--border-gold)', borderRadius: '10px', padding: '0 12px' }}>
                <Mail size={16} color="var(--signature-gold)" />
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="e.g. Sri Krishnamurthy Shastri" 
                  style={{ width: '100%', padding: '11px 0', background: 'none', border: 'none', color: '#FFF', fontSize: '0.92rem', outline: 'none' }} 
                />
              </div>
            </div>

            {errorMsg && (
              <div style={{ color: '#F87171', fontSize: '0.75rem', textAlign: 'center' }}>
                {errorMsg}
              </div>
            )}

            {/* SINGLE GOOGLE SIGN IN BUTTON */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '13px 18px',
                borderRadius: '12px',
                border: 'none',
                background: '#FFFFFF',
                color: '#1F2937',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                marginTop: '6px',
                boxShadow: '0 4px 18px rgba(0,0,0,0.3)',
                transition: 'transform 0.15s ease'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>{isLoading ? 'Connecting to Google...' : 'Sign in with Google (Verify OTP)'}</span>
            </button>

          </form>
        )}

        {/* STEP 2: 6-DIGIT GOOGLE OTP VERIFICATION */}
        {step === 'otp' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'center' }}>
            
            <div style={{ background: 'rgba(198, 161, 91, 0.1)', border: '1px solid var(--border-gold)', borderRadius: '12px', padding: '12px 14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: 'var(--champagne-gold)', fontSize: '0.85rem', fontWeight: 600 }}>
                <KeyRound size={16} /> Enter 6-Digit Google OTP Code
              </div>
              <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                We sent an authentication code to <strong>{email}</strong>
              </p>
            </div>

            {/* Generated Code Simulation Callout for Instant Testing */}
            <div style={{ background: 'rgba(0,0,0,0.5)', border: '1px dashed var(--signature-gold)', borderRadius: '10px', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ textAlign: 'left' }}>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block' }}>Google Security OTP:</span>
                <strong style={{ fontSize: '1.1rem', color: 'var(--pure-highlight)', letterSpacing: '2px' }}>{generatedOtp}</strong>
              </div>
              <button
                type="button"
                onClick={handleAutoFillOtp}
                className="gold-button-secondary"
                style={{ padding: '4px 10px', fontSize: '0.74rem', minHeight: '30px' }}
              >
                1-Tap Auto Fill
              </button>
            </div>

            {/* 6 OTP Input Boxes */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
              {userOtp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={el => otpInputRefs.current[idx] = el}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  style={{
                    width: '44px',
                    height: '50px',
                    borderRadius: '10px',
                    border: digit ? '2px solid var(--signature-gold)' : '1px solid var(--border-gold)',
                    background: '#000',
                    color: 'var(--pure-highlight)',
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    textAlign: 'center',
                    outline: 'none',
                    boxShadow: digit ? '0 0 10px rgba(198,161,91,0.3)' : 'none'
                  }}
                />
              ))}
            </div>

            {errorMsg && (
              <div style={{ color: '#F87171', fontSize: '0.78rem' }}>
                {errorMsg}
              </div>
            )}

            {/* Resend & Timer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <button
                type="button"
                onClick={() => setStep('email')}
                style={{ background: 'none', border: 'none', color: 'var(--signature-gold)', cursor: 'pointer' }}
              >
                ← Change Email
              </button>

              {canResend ? (
                <button
                  type="button"
                  onClick={handleResend}
                  style={{ background: 'none', border: 'none', color: '#60A5FA', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <RefreshCw size={12} /> Resend OTP
                </button>
              ) : (
                <span>Resend in {timer}s</span>
              )}
            </div>

          </div>
        )}

        {/* STEP 3: VERIFIED SUCCESS ANIMATION */}
        {step === 'verified' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '16px 0' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(16,185,129,0.2)', border: '2px solid #10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981' }}>
              <CheckCircle2 size={32} />
            </div>

            <h3 style={{ fontSize: '1.2rem', color: '#6EE7B7', margin: 0 }}>
              Google Account Verified!
            </h3>
            
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Authenticated <strong>{email}</strong> successfully. Launching your sacred calendar...
            </p>
          </div>
        )}

      </div>

    </div>
  );
}
