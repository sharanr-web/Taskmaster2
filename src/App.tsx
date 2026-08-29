/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { ChallengeView } from './components/ChallengeView';
import { GalleryView } from './components/GalleryView';
import { DashboardView } from './components/DashboardView';
import { SubmitView } from './components/SubmitView';
import { AdminView } from './components/AdminView';
import { LeaderboardView } from './components/LeaderboardView';
import { ProfileView } from './components/ProfileView';
import { LoginView } from './components/LoginView';
import { SignupView } from './components/SignupView';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { AuthModal } from './components/AuthModal';
import { TemplateShowcaseModal } from './components/TemplateShowcaseModal';

const AppContent: React.FC = () => {
  const { activeTab, currentTheme } = useApp();

  const getThemeClass = () => {
    switch (currentTheme) {
      case 'lightbox-clean':
        return 'theme-lightbox bg-slate-950 text-slate-100 selection:bg-sky-400 selection:text-slate-950';
      case 'neo-brutalist':
        return 'theme-neobrutal bg-neutral-950 text-white selection:bg-lime-400 selection:text-black';
      case 'sunset-clay':
        return 'theme-sunset bg-[#140e0c] text-orange-50 selection:bg-orange-400 selection:text-neutral-950';
      case 'monochrome-editorial':
        return 'theme-editorial bg-[#0c0c0c] text-white selection:bg-rose-500 selection:text-white';
      case 'cinematic-dark':
      default:
        return 'theme-cinematic bg-neutral-950 text-neutral-100 selection:bg-amber-500 selection:text-neutral-950';
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans antialiased transition-colors duration-300 ${getThemeClass()}`}>
      {/* Top Navbar */}
      <Navbar />

      {/* Main Viewport Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'challenge' && <ChallengeView />}
        {activeTab === 'gallery' && <GalleryView />}
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'submit' && <SubmitView />}
        {activeTab === 'leaderboard' && <LeaderboardView />}
        {activeTab === 'profile' && <ProfileView />}
        {activeTab === 'admin' && <AdminView />}
        {activeTab === 'login' && <LoginView />}
        {activeTab === 'signup' && <SignupView />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Modals & Overlays */}
      <VideoPlayerModal />
      <AuthModal />
      <TemplateShowcaseModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
