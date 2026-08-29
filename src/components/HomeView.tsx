import React, { useState, useEffect } from 'react';
import { 
  Film, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Play, 
  Heart, 
  MessageSquare, 
  Award, 
  Sparkles, 
  ShieldCheck, 
  ChevronRight, 
  UploadCloud,
  CheckCircle2,
  TrendingUp,
  Flame,
  Layers,
  Star,
  Palette,
  Check,
  Zap,
  Sun,
  Tv,
  Eye
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Submission, TemplateTheme } from '../types';
import { TEMPLATE_DESIGNS } from '../data/initialData';

export const HomeView: React.FC = () => {
  const { 
    challenges, 
    submissions, 
    setActiveTab, 
    setSelectedSubmission, 
    setIsAuthModalOpen,
    currentUser,
    setSelectedChallengeId,
    toggleLike,
    currentTheme,
    setCurrentTheme,
    setIsTemplateModalOpen
  } = useApp();

  const activeChallenge = challenges.find(c => c.status === 'active') || challenges[0];

  // Countdown timer calculation to August 31, 2026 23:59:59
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 3,
    hours: 14,
    minutes: 22,
    seconds: 45
  });

  useEffect(() => {
    const target = activeChallenge.deadlineTimestamp || new Date('2026-08-31T23:59:59').getTime();
    const update = () => {
      const now = new Date().getTime();
      const diff = Math.max(0, target - now);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
    };

    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [activeChallenge]);

  // Featured submissions (approved + staff picks or high likes)
  const approvedSubmissions = submissions.filter(s => s.status === 'approved');
  const featuredSubmissions = approvedSubmissions.slice(0, 4);

  return (
    <div className="space-y-16 py-6">
      {/* 1. Hero Section: Cinematic Aesthetic */}
      <section className="relative rounded-3xl border border-neutral-800/90 bg-gradient-to-b from-neutral-900/90 via-neutral-950 to-neutral-950 p-6 sm:p-12 overflow-hidden amber-glow">
        {/* Subtle background ambient mesh */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
            <span>The Monthly Animation Community</span>
          </div>

          {/* Core Concept Header */}
          <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
            One Month.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-orange-400">
              One Animation.
            </span><br />
            One Challenge.
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl">
            Level up your character, 2D, and 3D animation skills. Every month you get one focused brief, build your entry, and receive structured mentor critique on timing, spacing, and arcs.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <button
              id="hero-btn-submit"
              onClick={() => {
                if (!currentUser) {
                  setIsAuthModalOpen(true);
                } else {
                  setActiveTab('submit');
                }
              }}
              className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all cursor-pointer hover:scale-[1.02] active:scale-95"
            >
              <UploadCloud className="w-4 h-4 stroke-[2.5]" />
              <span>Submit Your Animation</span>
            </button>

            <button
              id="hero-btn-view-challenge"
              onClick={() => {
                setSelectedChallengeId(activeChallenge.id);
                setActiveTab('challenge');
              }}
              className="px-5 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm border border-neutral-700 flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span>View Challenge Brief</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>
      </section>

      {/* Template Designs Preview & Selector Section */}
      <section className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800/80 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Palette className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Visual Identity Showcase
              </span>
            </div>
            <h2 className="font-display text-2xl font-extrabold text-white">
              Website Template Designs
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400">
              Select one of the 5 handcrafted design styles for Taskmation. Click any template to switch the whole site instantly!
            </p>
          </div>

          <button
            id="home-open-templates-modal-btn"
            onClick={() => setIsTemplateModalOpen(true)}
            className="self-start sm:self-center px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-neutral-200 border border-neutral-700 flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Eye className="w-4 h-4 text-amber-400" />
            <span>Open Template Inspector</span>
          </button>
        </div>

        {/* 5 Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {TEMPLATE_DESIGNS.map((template) => {
            const isActive = currentTheme === template.id;

            return (
              <div
                key={template.id}
                id={`home-template-${template.id}`}
                onClick={() => setCurrentTheme(template.id)}
                className={`relative p-4 rounded-2xl cursor-pointer transition-all duration-200 flex flex-col justify-between border text-left ${
                  isActive
                    ? 'bg-neutral-800/90 border-amber-500 ring-2 ring-amber-500/30 shadow-lg shadow-amber-500/10 scale-[1.02]'
                    : 'bg-neutral-950/60 border-neutral-800/90 hover:border-neutral-700 hover:bg-neutral-900/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span 
                      className="w-3 h-3 rounded-full border border-neutral-700 shadow-sm"
                      style={{ backgroundColor: template.palette.accent }}
                    />
                    {isActive ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-neutral-950 flex items-center gap-1 font-sans">
                        <Check className="w-3 h-3 stroke-[3]" /> Active
                      </span>
                    ) : (
                      <span className="text-[10px] text-neutral-500 font-mono">
                        {template.category.split(' ')[0]}
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-sm text-neutral-100 mb-1">
                    {template.name}
                  </h3>
                  <p className="text-[11px] text-neutral-400 line-clamp-2 mb-3">
                    {template.tagline}
                  </p>
                </div>

                <div>
                  {/* Swatch row */}
                  <div className="flex items-center gap-1.5 py-2 border-t border-neutral-800/80 mb-2">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: template.palette.bg }} />
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: template.palette.card }} />
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: template.palette.accent }} />
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: template.palette.border }} />
                    <span className="text-[10px] text-neutral-400 truncate ml-auto">
                      {template.palette.name.split('&')[0]}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentTheme(template.id);
                    }}
                    className={`w-full py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all ${
                      isActive
                        ? 'bg-amber-500 text-neutral-950'
                        : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800 border border-neutral-800'
                    }`}
                  >
                    {isActive ? 'Selected' : 'Apply'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. Active Monthly Challenge Highlight Box */}
      <section className="p-6 sm:p-8 rounded-3xl bg-neutral-900/90 border border-amber-500/30 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 rounded-md bg-amber-500 text-neutral-950 text-xs font-extrabold uppercase tracking-wider">
                {activeChallenge.monthYear} Challenge
              </span>
              <span className="text-xs text-neutral-400 flex items-center gap-1 font-mono">
                <Calendar className="w-3.5 h-3.5 text-neutral-500" /> Deadline: Aug 31, 2026 (11:59 PM)
              </span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {activeChallenge.title}
            </h2>

            <p className="text-sm text-neutral-300 leading-relaxed">
              {activeChallenge.description}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              {activeChallenge.principlesFocus.slice(0, 4).map((principle, idx) => (
                <span key={idx} className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-300">
                  ✓ {principle}
                </span>
              ))}
            </div>
          </div>

          {/* Live Countdown & Quick Action */}
          <div className="w-full lg:w-auto bg-neutral-950 p-6 rounded-2xl border border-neutral-800/80 flex flex-col items-center justify-center text-center space-y-4 min-w-[280px]">
            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5" />
              <span>Time Remaining</span>
            </div>

            <div className="grid grid-cols-4 gap-2 font-mono-num">
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-2.5 text-center min-w-[56px]">
                <span className="text-2xl font-extrabold text-white block">{String(timeLeft.days).padStart(2, '0')}</span>
                <span className="text-[10px] text-neutral-400 font-sans uppercase">Days</span>
              </div>
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-2.5 text-center min-w-[56px]">
                <span className="text-2xl font-extrabold text-white block">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="text-[10px] text-neutral-400 font-sans uppercase">Hours</span>
              </div>
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-2.5 text-center min-w-[56px]">
                <span className="text-2xl font-extrabold text-white block">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="text-[10px] text-neutral-400 font-sans uppercase">Min</span>
              </div>
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-2.5 text-center min-w-[56px]">
                <span className="text-2xl font-extrabold text-amber-400 block">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="text-[10px] text-neutral-400 font-sans uppercase">Sec</span>
              </div>
            </div>

            <button
              id="challenge-card-cta"
              onClick={() => {
                setSelectedChallengeId(activeChallenge.id);
                setActiveTab('challenge');
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>View Full Brief & Guidelines</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. Featured Community Submissions */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Award className="w-4 h-4" />
              <span>Spotlight Gallery</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              Featured Submissions
            </h2>
          </div>

          <button
            id="view-all-gallery-btn"
            onClick={() => setActiveTab('gallery')}
            className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 self-start sm:self-auto group"
          >
            <span>Explore All {submissions.length} Animations</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Submissions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredSubmissions.map(sub => {
            const isLiked = currentUser ? sub.likedByUsers.includes(currentUser.id) : false;
            return (
              <div
                key={sub.id}
                id={`sub-card-${sub.id}`}
                className="group relative rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-amber-500/50 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 flex flex-col"
              >
                {/* Thumbnail / Video Preview Trigger */}
                <div 
                  className="relative aspect-video bg-neutral-950 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedSubmission(sub)}
                >
                  <img 
                    src={sub.thumbnailUrl} 
                    alt={sub.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-neutral-950/40 group-hover:bg-neutral-950/20 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-amber-500/90 text-neutral-950 flex items-center justify-center group-hover:scale-110 shadow-lg transition-transform">
                      <Play className="w-5 h-5 fill-neutral-950 ml-0.5" />
                    </div>
                  </div>

                  {/* Top Badges */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    {sub.isStaffPick && (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-400 text-neutral-950 flex items-center gap-1 shadow-md">
                        <Award className="w-3 h-3" /> Pick
                      </span>
                    )}
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-neutral-950/80 backdrop-blur-md text-neutral-300 border border-neutral-700">
                      {sub.software}
                    </span>
                  </div>

                  {/* Duration Tag */}
                  <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-neutral-950/80 font-mono-num text-[10px] text-neutral-300">
                    {sub.durationSeconds || 7}s
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 
                      onClick={() => setSelectedSubmission(sub)}
                      className="font-display font-bold text-sm text-white group-hover:text-amber-400 transition-colors line-clamp-1 cursor-pointer"
                    >
                      {sub.title}
                    </h3>
                    <p className="text-xs text-neutral-400 line-clamp-2 mt-1">
                      {sub.description}
                    </p>
                  </div>

                  {/* Creator & Social Row */}
                  <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img 
                        src={sub.userAvatar} 
                        alt={sub.userName} 
                        className="w-6 h-6 rounded-full object-cover border border-neutral-700"
                      />
                      <span className="text-xs font-semibold text-neutral-300">{sub.userName}</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                      {sub.feedback && (
                        <span className="text-[11px] font-mono font-bold text-amber-400 flex items-center gap-0.5" title="Mentor Overall Score">
                          ⭐ {sub.feedback.overallScore}
                        </span>
                      )}

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(sub.id);
                        }}
                        className={`flex items-center gap-1 transition-colors ${
                          isLiked ? 'text-rose-400 font-bold' : 'text-neutral-400 hover:text-rose-400'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-400' : ''}`} />
                        <span>{sub.likesCount}</span>
                      </button>

                      <div className="flex items-center gap-1 text-neutral-400">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>{sub.comments.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. How Taskmation Works (3 Simple Steps) */}
      <section className="py-12 border-y border-neutral-900">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">The Monthly Cycle</span>
          <h2 className="font-display text-3xl font-extrabold text-white">
            How Taskmation Works
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400">
            A structured framework designed to help animators finish complete clips every month without burnout.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold flex items-center justify-center font-mono text-base">
              01
            </div>
            <h3 className="font-display font-bold text-base text-white">1st of Every Month</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              A single, concentrated animation prompt is published with timing sheets, reference video breakdowns, and 12 principles constraints.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold flex items-center justify-center font-mono text-base">
              02
            </div>
            <h3 className="font-display font-bold text-base text-white">Animate & Submit</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Create your 5–10s cut in Blender, Maya, Toon Boom, or your favorite software. Upload direct MP4 before the 31st deadline.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-3 relative">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold flex items-center justify-center font-mono text-base">
              03
            </div>
            <h3 className="font-display font-bold text-base text-white">Mentor Scoring & Showcase</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Receive structured private mentor ratings on Timing, Spacing & Arcs, earn streak badges, and get featured in the gallery.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Quick CTA Banner */}
      <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-amber-500 via-amber-400 to-orange-400 text-neutral-950 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl shadow-amber-500/20">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
            Ready to animate this month's challenge?
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-neutral-900">
            Join 420+ animators building their monthly animation reel.
          </p>
        </div>

        <button
          onClick={() => {
            if (!currentUser) {
              setIsAuthModalOpen(true);
            } else {
              setActiveTab('submit');
            }
          }}
          className="px-6 py-3.5 rounded-xl bg-neutral-950 hover:bg-neutral-900 text-white font-extrabold text-xs sm:text-sm shadow-xl transition-all active:scale-95 cursor-pointer whitespace-nowrap"
        >
          Submit Animation Now
        </button>
      </section>
    </div>
  );
};
