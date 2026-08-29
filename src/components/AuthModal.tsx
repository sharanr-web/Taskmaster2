import React, { useState } from 'react';
import { X, Film, Mail, Lock, User as UserIcon, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    loginWithEmail, 
    loginWithGoogle, 
    switchUser, 
    users,
    setActiveTab 
  } = useApp();
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    loginWithEmail(email, name);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md overflow-y-auto">
      <div className="fixed inset-0" onClick={() => setIsAuthModalOpen(false)} />

      <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden z-10 p-6 sm:p-8 space-y-6">
        {/* Close */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-xl bg-neutral-800/80 text-neutral-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/20">
            <Film className="w-6 h-6 text-neutral-950 fill-neutral-950" />
          </div>
          <h2 className="font-display text-2xl font-extrabold text-white">
            {isSignUp ? 'Join the Animation Challenge' : 'Welcome back to Taskmation'}
          </h2>
          <p className="text-xs text-neutral-400">
            {isSignUp 
              ? 'Create an account to submit monthly challenges and receive mentor grading.' 
              : 'Sign in to access your submissions and review notes.'}
          </p>
        </div>

        {/* Google Auth Button */}
        <button
          onClick={() => loginWithGoogle()}
          className="w-full py-3 px-4 rounded-xl bg-white hover:bg-neutral-100 text-neutral-900 font-bold text-xs flex items-center justify-center gap-2.5 transition-colors shadow-md cursor-pointer"
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
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {isSignUp && (
            <div className="space-y-1">
              <label className="block text-xs font-bold text-neutral-400">Full Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input
                  type="text"
                  required
                  placeholder="Rahul V."
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
                placeholder="animator@studio.com"
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
            className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold text-xs transition-colors cursor-pointer"
          >
            {isSignUp ? 'Create Account' : 'Sign In'}
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
                  Login
                </button>
              </span>
            ) : (
              <span>
                Don't have an account?{' '}
                <button 
                  onClick={() => setIsSignUp(true)} 
                  className="text-amber-400 font-bold hover:underline"
                >
                  Sign Up
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
            <span>Switch to dedicated full {isSignUp ? 'Registration' : 'Login'} page</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Instant Persona Switcher for Quick Demo Exploration */}
        <div className="pt-4 border-t border-neutral-800/80 space-y-2">
          <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block text-center">
            Or Test Immediately as a Demo Persona:
          </span>
          <div className="space-y-1.5">
            {users.slice(0, 3).map(u => (
              <button
                key={u.id}
                onClick={() => {
                  switchUser(u.id);
                  setIsAuthModalOpen(false);
                }}
                className="w-full p-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 flex items-center justify-between text-xs text-left"
              >
                <div className="flex items-center gap-2">
                  <img src={u.avatar} alt={u.name} className="w-5 h-5 rounded-full object-cover" />
                  <span className="font-semibold text-white">{u.name}</span>
                </div>
                <span className="text-[10px] font-mono text-amber-400 font-bold">
                  {u.role === 'admin' ? 'Lead Admin / Mentor' : 'Community Animator'}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
