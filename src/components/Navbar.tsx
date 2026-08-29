import React, { useState } from 'react';
import { 
  Film, 
  Sparkles, 
  UploadCloud, 
  ShieldCheck, 
  User as UserIcon, 
  Flame, 
  Layers, 
  Trophy, 
  Compass, 
  Calendar, 
  ChevronDown, 
  LogOut, 
  Database,
  Menu,
  X,
  Palette
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NavigationTab } from '../types';
import { TEMPLATE_DESIGNS } from '../data/initialData';

export const Navbar: React.FC = () => {
  const { 
    currentUser, 
    activeTab, 
    setActiveTab, 
    setIsAuthModalOpen, 
    setIsSupabaseModalOpen,
    isTemplateModalOpen,
    setIsTemplateModalOpen,
    currentTheme,
    logout,
    submissions 
  } = useApp();

  const activeThemeConfig = TEMPLATE_DESIGNS.find(t => t.id === currentTheme) || TEMPLATE_DESIGNS[0];

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pendingReviewCount = submissions.filter(s => s.status === 'pending').length;

  const navItems: { id: NavigationTab; label: string; icon: React.ReactNode; badge?: number | string }[] = [
    { id: 'home', label: 'Home', icon: <Film className="w-4 h-4" /> },
    { id: 'challenge', label: 'August Task', icon: <Calendar className="w-4 h-4" />, badge: 'Active' },
    { id: 'gallery', label: 'Explore Gallery', icon: <Compass className="w-4 h-4" /> },
    { id: 'leaderboard', label: 'Leaderboard', icon: <Trophy className="w-4 h-4" /> },
    ...(currentUser ? [
      { id: 'dashboard' as NavigationTab, label: 'My Studio', icon: <Layers className="w-4 h-4" /> },
      { id: 'profile' as NavigationTab, label: 'Profile', icon: <UserIcon className="w-4 h-4" /> }
    ] : []),
    ...(currentUser?.role === 'admin' ? [
      { 
        id: 'admin' as NavigationTab, 
        label: 'Admin Panel', 
        icon: <ShieldCheck className="w-4 h-4 text-amber-400" />, 
        badge: pendingReviewCount > 0 ? `${pendingReviewCount} new` : undefined 
      }
    ] : [])
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800/80 bg-neutral-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button 
            id="nav-brand-logo"
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-orange-400 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
              <Film className="w-5 h-5 text-neutral-950 fill-neutral-950" />
            </div>
            <div>
              <span className="font-display text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                TASKMATION
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
              </span>
              <span className="hidden sm:block text-[10px] tracking-wider uppercase font-semibold text-neutral-400 -mt-1">
                Monthly Animation Challenge
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1 bg-neutral-900/60 p-1.5 rounded-full border border-neutral-800/70">
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  isActive 
                    ? 'bg-amber-500 text-neutral-950 shadow-md font-bold' 
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold uppercase tracking-wider ${
                    isActive 
                      ? 'bg-neutral-950 text-amber-300' 
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right CTA / User controls */}
        <div className="flex items-center gap-2">
          {/* Template Design Selector Button */}
          <button
            id="nav-btn-template-designs"
            onClick={() => setIsTemplateModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-xs font-semibold text-amber-300 transition-all shadow-sm"
            title="Choose Website Template Design"
          >
            <Palette className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Templates:</span>
            <span className="text-white font-bold truncate max-w-[100px] sm:max-w-none">
              {activeThemeConfig.name.split(' ')[0]}
            </span>
          </button>

          {/* Supabase Architecture Drawer trigger */}
          <button
            id="nav-btn-supabase-guide"
            onClick={() => setIsSupabaseModalOpen(true)}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900/80 hover:bg-neutral-800 text-xs font-medium text-neutral-300 hover:text-white transition-colors"
            title="View Supabase PostgreSQL Schema & Vercel Deploy Spec"
          >
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span>Supabase Stack</span>
          </button>

          {/* Submit Button */}
          <button
            id="nav-btn-submit-animation"
            onClick={() => {
              if (!currentUser) {
                setIsAuthModalOpen(true);
              } else {
                setActiveTab('submit');
              }
            }}
            className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 hover:shadow-amber-500/30 transition-all cursor-pointer whitespace-nowrap active:scale-95"
          >
            <UploadCloud className="w-4 h-4 stroke-[2.5]" />
            <span className="hidden sm:inline">Submit Animation</span>
            <span className="sm:hidden">Submit</span>
          </button>

          {/* User Profile / Login */}
          {currentUser ? (
            <div className="relative">
              <button
                id="nav-user-menu-button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1 pl-2 rounded-lg bg-neutral-900 hover:bg-neutral-800/80 border border-neutral-800 transition-colors focus:outline-none"
              >
                <div className="flex flex-col text-right hidden xl:block">
                  <span className="text-xs font-bold text-white leading-tight flex items-center gap-1 justify-end">
                    {currentUser.name}
                    {currentUser.role === 'admin' && (
                      <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 font-extrabold border border-amber-500/30">
                        ADMIN
                      </span>
                    )}
                  </span>
                  <span className="text-[10px] text-amber-400 font-mono-num flex items-center gap-0.5 justify-end">
                    <Flame className="w-2.5 h-2.5 fill-amber-400" /> {currentUser.streakMonths}m streak
                  </span>
                </div>
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.name} 
                  className="w-7 h-7 rounded-full object-cover border border-amber-500/40 ring-1 ring-neutral-800"
                />
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
              </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl z-50 p-2 text-xs">
                    <div className="p-2 border-b border-neutral-800/80 mb-1">
                      <p className="font-bold text-white text-sm">{currentUser.name}</p>
                      <p className="text-neutral-400 text-[11px] truncate">{currentUser.email}</p>
                      <div className="mt-2 flex items-center gap-1.5 text-[11px] text-neutral-300 bg-neutral-950/60 p-1.5 rounded-lg border border-neutral-800">
                        <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span>Streak: <strong className="text-amber-400">{currentUser.streakMonths} Months</strong></span>
                      </div>
                    </div>

                    <button
                      id="menu-btn-dashboard"
                      onClick={() => {
                        setActiveTab('dashboard');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-neutral-800 flex items-center gap-2 text-neutral-200"
                    >
                      <Layers className="w-4 h-4 text-amber-400" />
                      <span>My Submissions & Feedback</span>
                    </button>

                    <button
                      id="menu-btn-profile"
                      onClick={() => {
                        setActiveTab('profile');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-neutral-800 flex items-center gap-2 text-neutral-200"
                    >
                      <UserIcon className="w-4 h-4 text-neutral-400" />
                      <span>Animator Profile</span>
                    </button>

                    {currentUser.role === 'admin' && (
                      <button
                        id="menu-btn-admin"
                        onClick={() => {
                          setActiveTab('admin');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-amber-950/40 text-amber-300 flex items-center gap-2"
                      >
                        <ShieldCheck className="w-4 h-4 text-amber-400" />
                        <span>Admin Challenge & Feedback Center</span>
                      </button>
                    )}

                    <div className="border-t border-neutral-800/80 pt-1 mt-1 space-y-1">
                      <button
                        onClick={() => {
                          setActiveTab('login');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-neutral-800 text-neutral-300 flex items-center gap-2"
                      >
                        <UserIcon className="w-3.5 h-3.5 text-neutral-400" />
                        <span>Sign In to Another Account</span>
                      </button>
                      <button
                        onClick={() => {
                          setActiveTab('signup');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-neutral-800 text-amber-300 flex items-center gap-2"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>Create New Account</span>
                      </button>
                      <button
                        id="menu-btn-logout"
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-rose-950/40 text-rose-300 flex items-center gap-2"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                id="nav-btn-signin"
                onClick={() => setActiveTab('login')}
                className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold text-xs border border-neutral-700 transition-colors cursor-pointer"
              >
                Sign In
              </button>
              <button
                id="nav-btn-signup"
                onClick={() => setActiveTab('signup')}
                className="hidden sm:inline-flex px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs transition-colors cursor-pointer shadow-sm shadow-amber-500/20"
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            id="nav-btn-mobile-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-800 bg-neutral-950 px-4 py-3 space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold ${
                activeTab === item.id 
                  ? 'bg-amber-500 text-neutral-950 font-bold' 
                  : 'text-neutral-300 hover:bg-neutral-900'
              }`}
            >
              <div className="flex items-center gap-2">
                {item.icon}
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-900 text-amber-400 font-bold">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
          <button
            id="mobile-btn-template-designs"
            onClick={() => {
              setIsTemplateModalOpen(true);
              setIsMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/30"
          >
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-amber-400" />
              <span>Website Template: {activeThemeConfig.name}</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
              Change
            </span>
          </button>
          <button
            onClick={() => {
              setIsSupabaseModalOpen(true);
              setIsMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-neutral-300 hover:bg-neutral-900"
          >
            <Database className="w-4 h-4 text-emerald-400" />
            <span>Supabase Architecture & SQL</span>
          </button>

          {!currentUser ? (
            <div className="pt-2 border-t border-neutral-800 grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setActiveTab('login');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-2 px-3 rounded-lg text-xs font-bold text-center bg-neutral-900 text-neutral-200 border border-neutral-800"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setActiveTab('signup');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-2 px-3 rounded-lg text-xs font-bold text-center bg-amber-500 text-neutral-950"
              >
                Sign Up
              </button>
            </div>
          ) : (
            <div className="pt-2 border-t border-neutral-800 flex items-center justify-between">
              <span className="text-xs text-neutral-400">Signed in as <strong>{currentUser.name}</strong></span>
              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="text-xs text-rose-400 hover:underline"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
