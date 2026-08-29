import React, { useState } from 'react';
import { X, Film, Mail, Lock, User as UserIcon, Sparkles, ArrowRight, ShieldCheck, AlertCircle, Check } from 'lucide-react';
import { useApp, ADMIN_EMAIL } from '../context/AppContext';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    loginWithEmail, 
    registerUser,
    loginWithGoogle, 
    setActiveTab 
  } = useApp();
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email.trim()) {
      setErrorMsg('Please enter your email address.');
      return;
    }

    if (!password) {
      setErrorMsg('Please enter your password.');
      return;
    }

    if (isSignUp) {
      if (!name.trim()) {
        setErrorMsg('Please enter your animator name.');
        return;
      }
      const res = registerUser({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: password,
      });

      if (res.success) {
        setSuccessMsg(`Welcome, ${name}! Your account is ready.`);
        setTimeout(() => {
          setIsAuthModalOpen(false);
          if (res.user?.role === 'admin') {
            setActiveTab('admin');
          } else {
            setActiveTab('profile');
          }
        }, 500);
      } else {
        setErrorMsg(res.message || 'Registration failed.');
      }
    } else {
      const res = loginWithEmail(email.trim(), password);
      if (res.success) {
        setSuccessMsg(`Signed in successfully!`);
        setTimeout(() => {
          setIsAuthModalOpen(false);
          if (res.user?.role === 'admin') {
            setActiveTab('admin');
          } else {
            setActiveTab('profile');
          }
        }, 500);
      } else {
        setErrorMsg(res.message || 'Invalid credentials or user not found.');
      }
    }
  };

  const handleAdminFill = () => {
    setEmail(ADMIN_EMAIL);
    setPassword('admin123');
    setIsSignUp(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md overflow-y-auto">
      <div className="fixed inset-0" onClick={() => setIsAuthModalOpen(false)} />

      <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden z-10 p-6 sm:p-8 space-y-5">
        {/* Close */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-xl bg-neutral-800/80 text-neutral-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-1.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/20">
            <Film className="w-6 h-6 text-neutral-950 fill-neutral-950" />
          </div>
          <h2 className="font-display text-2xl font-extrabold text-white">
            {isSignUp ? 'Create Animator Profile' : 'Sign In to Taskmation'}
          </h2>
          <p className="text-xs text-neutral-400">
            {isSignUp 
              ? 'Join our monthly challenge and receive frame-accurate mentor feedback.' 
              : 'Sign in with your email to access your challenge submissions and studio.'}
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
            <Check className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Google Auth Button */}
        <button
          onClick={() => loginWithGoogle()}
          className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-neutral-100 text-neutral-900 font-bold text-xs flex items-center justify-center gap-2.5 transition-colors shadow-md cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-neutral-800" />
          <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">or with email</span>
          <div className="flex-1 h-px bg-neutral-800" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {isSignUp && (
            <div className="space-y-1">
              <label className="block text-xs font-bold text-neutral-400">Full Animator Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Rivera"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="block text-xs font-bold text-neutral-400">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="email"
                required
                placeholder="animator@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-neutral-400">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold text-xs transition-colors cursor-pointer shadow-md shadow-amber-500/20"
          >
            {isSignUp ? 'Create Profile & Sign In' : 'Sign In'}
          </button>
        </form>

        {/* Toggle between Login and Signup and Full Page View */}
        <div className="space-y-2 text-center text-xs text-neutral-400">
          <div>
            {isSignUp ? (
              <span>
                Already have an account?{' '}
                <button 
                  onClick={() => setIsSignUp(false)} 
                  className="text-amber-400 font-bold hover:underline"
                >
                  Sign In
                </button>
              </span>
            ) : (
              <span>
                Don't have an account?{' '}
                <button 
                  onClick={() => setIsSignUp(true)} 
                  className="text-amber-400 font-bold hover:underline"
                >
                  Create Account
                </button>
              </span>
            )}
          </div>

          <button
            onClick={() => {
              setIsAuthModalOpen(false);
              setActiveTab(isSignUp ? 'signup' : 'login');
            }}
            className="text-[11px] text-neutral-400 hover:text-white underline inline-flex items-center gap-1"
          >
            <span>Open dedicated {isSignUp ? 'Registration' : 'Login'} view</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Quick Admin Email Shortcut */}
        <div className="pt-3 border-t border-neutral-800/80">
          <button
            onClick={handleAdminFill}
            className="w-full p-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800/80 border border-amber-500/30 text-amber-300 flex items-center justify-between text-xs text-left transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Admin Account ({ADMIN_EMAIL})</span>
            </div>
            <span className="text-[10px] font-bold text-amber-400">Fill &rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
};
