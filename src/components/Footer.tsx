import React from 'react';
import { Film, Sparkles, Database, Github, Heart, RefreshCw, ExternalLink, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setIsSupabaseModalOpen, resetAllData, setActiveTab } = useApp();

  return (
    <footer className="border-t border-neutral-900 bg-neutral-950 text-neutral-400 text-xs mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center">
                <Film className="w-4 h-4 text-neutral-950 fill-neutral-950" />
              </div>
              <span className="font-display font-bold text-white text-base tracking-tight">TASKMATION</span>
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed">
              One Month. One Animation. One Challenge. A dedicated practice community where animators master movement, receive constructive mentor critiques, and build real portfolios.
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px] text-amber-400/90 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
              <span>Next Challenge: Sept 1, 2026</span>
            </div>
          </div>

          {/* Col 2: Challenge Tracks */}
          <div>
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider mb-3">Community Hub</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => setActiveTab('challenge')} 
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  August 2026: Bouncing Ball
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('gallery')} 
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Public Submission Gallery
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('leaderboard')} 
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Global Animator Leaderboard
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('submit')} 
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Submit Monthly Animation (MP4/WebM)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Architecture & GitHub */}
          <div>
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider mb-3">Stack Architecture</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5 text-neutral-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>Frontend: Next.js + React + Tailwind</span>
              </li>
              <li className="flex items-center gap-1.5 text-neutral-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Database: Supabase PostgreSQL</span>
              </li>
              <li className="flex items-center gap-1.5 text-neutral-300">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span>Storage: Supabase Direct Object Storage</span>
              </li>
              <li>
                <button 
                  onClick={() => setIsSupabaseModalOpen(true)}
                  className="text-amber-400 hover:text-amber-300 underline font-medium flex items-center gap-1 mt-1"
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>View Supabase SQL & RLS Specs</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Mentor & Reset */}
          <div>
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider mb-3">Community Mentorship</h4>
            <p className="text-xs text-neutral-400 leading-relaxed mb-3">
              Submissions receive structured scores across <strong>Timing</strong>, <strong>Spacing</strong>, <strong>Arcs</strong>, and <strong>Creativity</strong> from verified industry mentors.
            </p>
            <button
              id="footer-btn-reset-demo"
              onClick={() => {
                if (window.confirm('Reset all demo submissions, challenges, and user states to initial pristine defaults?')) {
                  resetAllData();
                }
              }}
              className="px-2.5 py-1.5 rounded border border-neutral-800 bg-neutral-900/80 hover:bg-neutral-800 text-[11px] text-neutral-400 hover:text-neutral-200 flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset Demo State</span>
            </button>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400">
          <p>© 2026 Taskmation. Built for animators worldwide. Master the 12 Principles of Animation.</p>
          <div className="flex items-center gap-4">
            <span className="text-neutral-400">Designed for GitHub & Vercel Free Stack Deployment</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
