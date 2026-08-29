import React from 'react';
import { 
  Layers, 
  Flame, 
  Award, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  UploadCloud, 
  Heart, 
  MessageSquare, 
  ShieldCheck, 
  Play, 
  ArrowRight,
  Sparkles,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BADGES } from '../data/initialData';
import { Submission } from '../types';

export const DashboardView: React.FC = () => {
  const { 
    currentUser, 
    challenges, 
    submissions, 
    setActiveTab, 
    setSelectedSubmission,
    setIsAuthModalOpen
  } = useApp();

  if (!currentUser) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="font-display text-2xl font-bold text-white">Sign In to View Your Studio Dashboard</h2>
        <p className="text-xs text-neutral-400 max-w-md mx-auto">
          Track your monthly animation challenges, view private mentor ratings, and build your animator streak.
        </p>
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold text-xs"
        >
          Sign In Now
        </button>
      </div>
    );
  }

  const activeChallenge = challenges.find(c => c.status === 'active') || challenges[0];
  const userSubmissions = submissions.filter(s => s.userId === currentUser.id);
  const activeSubmission = userSubmissions.find(s => s.challengeId === activeChallenge.id);

  const userBadges = BADGES.filter(b => currentUser.badges.includes(b.id));

  return (
    <div className="space-y-10 py-6">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-950 border border-neutral-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img 
            src={currentUser.avatar} 
            alt={currentUser.name} 
            className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-500/40 shadow-xl"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                Welcome, {currentUser.name}!
              </h1>
              {currentUser.role === 'admin' && (
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  MENTOR ADMIN
                </span>
              )}
            </div>
            <p className="text-xs text-neutral-400 max-w-lg">{currentUser.bio}</p>
          </div>
        </div>

        {/* Quick Streak & Stats Pills */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center gap-2.5">
            <Flame className="w-5 h-5 text-amber-400 fill-amber-400 animate-pulse" />
            <div>
              <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider block">Streak</span>
              <span className="text-sm font-extrabold font-mono text-white">{currentUser.streakMonths} Months</span>
            </div>
          </div>

          <div className="px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center gap-2.5">
            <Award className="w-5 h-5 text-yellow-400" />
            <div>
              <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider block">Staff Picks</span>
              <span className="text-sm font-extrabold font-mono text-white">{currentUser.staffPicksCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Current Challenge Alert Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/90 border border-amber-500/30 relative overflow-hidden space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-bold uppercase tracking-wider mb-1">
              <Calendar className="w-4 h-4" />
              <span>CURRENT CHALLENGE • {activeChallenge.monthYear}</span>
            </div>
            <h2 className="font-display text-2xl font-bold text-white">{activeChallenge.title}</h2>
            <p className="text-xs text-neutral-400 mt-1">
              Deadline: August 31, 2026 (11:59 PM) • Duration: {activeChallenge.durationRange}
            </p>
          </div>

          {activeSubmission ? (
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Submitted: {activeSubmission.title}</span>
              </div>
              <button
                onClick={() => setSelectedSubmission(activeSubmission)}
                className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold"
              >
                View Entry
              </button>
            </div>
          ) : (
            <button
              onClick={() => setActiveTab('submit')}
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/25 cursor-pointer whitespace-nowrap"
            >
              <UploadCloud className="w-4 h-4 stroke-[2.5]" />
              <span>Submit August Animation</span>
            </button>
          )}
        </div>
      </div>

      {/* User's Submissions & Mentor Feedback Trackers */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" />
            <span>My Challenge Submissions ({userSubmissions.length})</span>
          </h3>

          <button
            onClick={() => setActiveTab('submit')}
            className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
          >
            <span>+ New Submission</span>
          </button>
        </div>

        {userSubmissions.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-neutral-900/40 border border-dashed border-neutral-800 space-y-3">
            <p className="text-sm text-neutral-300">You haven't submitted an animation yet.</p>
            <button
              onClick={() => setActiveTab('submit')}
              className="px-5 py-2.5 rounded-xl bg-amber-500 text-neutral-950 font-bold text-xs"
            >
              Upload Your First Animation
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userSubmissions.map(sub => (
              <div
                key={sub.id}
                className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4 hover:border-neutral-700 transition-all flex flex-col justify-between"
              >
                {/* Top Info */}
                <div>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <span className="text-[11px] font-mono font-bold text-amber-400 block mb-0.5">
                        {sub.challengeMonthYear}
                      </span>
                      <h4 className="font-display font-bold text-base text-white">{sub.title}</h4>
                    </div>

                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase flex items-center gap-1 ${
                      sub.status === 'approved' 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                        : sub.status === 'pending'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                    }`}>
                      {sub.status === 'approved' ? 'Approved ✓' : sub.status === 'pending' ? 'Pending Review ⏳' : 'Needs Revision'}
                    </span>
                  </div>

                  {/* Thumbnail / Video Preview */}
                  <div 
                    onClick={() => setSelectedSubmission(sub)}
                    className="relative aspect-video bg-neutral-950 rounded-xl overflow-hidden cursor-pointer group mb-3"
                  >
                    <img src={sub.thumbnailUrl} alt={sub.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-neutral-950/40 group-hover:bg-neutral-950/20 flex items-center justify-center transition-colors">
                      <div className="w-10 h-10 rounded-full bg-amber-500/90 text-neutral-950 flex items-center justify-center shadow-lg">
                        <Play className="w-4 h-4 fill-neutral-950 ml-0.5" />
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-400 line-clamp-2">{sub.description}</p>
                </div>

                {/* Mentor Feedback Box if available */}
                {sub.feedback ? (
                  <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-amber-300 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> Mentor Feedback Ready
                      </span>
                      <span className="font-mono font-extrabold text-amber-400">
                        Score: {sub.feedback.overallScore}/10
                      </span>
                    </div>
                    <p className="text-xs text-amber-100 italic line-clamp-2">
                      "{sub.feedback.comment}"
                    </p>
                    <button
                      onClick={() => setSelectedSubmission(sub)}
                      className="text-[11px] font-bold text-amber-400 hover:text-amber-300 underline block pt-1"
                    >
                      View Full Timing & Spacing Breakdown →
                    </button>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800/80 text-xs text-neutral-400 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Mentor review in progress (within 24-48 hrs).</span>
                  </div>
                )}

                {/* Social row */}
                <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-rose-400 font-semibold">
                      <Heart className="w-3.5 h-3.5 fill-rose-400" /> {sub.likesCount} Likes
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5" /> {sub.comments.length} Comments
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedSubmission(sub)}
                    className="font-bold text-xs text-white hover:text-amber-400"
                  >
                    Open Player →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Earned Badges Showcase */}
      <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
        <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span>My Achievement Badges ({userBadges.length})</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {userBadges.map(badge => (
            <div key={badge.id} className={`p-4 rounded-xl border ${badge.color} space-y-1.5`}>
              <div className="text-2xl">{badge.icon}</div>
              <h4 className="font-bold text-xs text-white">{badge.name}</h4>
              <p className="text-[11px] text-neutral-400">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
