import React, { useState, useMemo } from 'react';
import { 
  Compass, 
  Search, 
  Filter, 
  Heart, 
  MessageSquare, 
  Award, 
  Play, 
  Calendar, 
  Sparkles,
  SlidersHorizontal,
  Flame,
  Star
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Submission } from '../types';

export const GalleryView: React.FC = () => {
  const { 
    submissions, 
    setSelectedSubmission, 
    currentUser, 
    toggleLike,
    searchQuery,
    setSearchQuery,
    selectedMonthFilter,
    setSelectedMonthFilter,
    selectedSoftwareFilter,
    setSelectedSoftwareFilter
  } = useApp();

  const [sortTab, setSortTab] = useState<'all' | 'staff-pick' | 'most-loved' | 'top-score' | 'newest'>('all');

  const monthOptions = ['All', 'August 2026', 'July 2026', 'June 2026'];
  const softwareOptions = ['All', 'Blender', 'Maya', 'Toon Boom', 'After Effects', 'Cinema 4D', 'TVPaint'];

  const filteredSubmissions = useMemo(() => {
    return submissions.filter(sub => {
      // Only approved submissions in public gallery (or pending if user is the author or admin)
      const isVisible = sub.status === 'approved' || (currentUser && (currentUser.id === sub.userId || currentUser.role === 'admin'));
      if (!isVisible) return false;

      // Month filter
      if (selectedMonthFilter !== 'All' && sub.challengeMonthYear !== selectedMonthFilter) {
        return false;
      }

      // Software filter
      if (selectedSoftwareFilter !== 'All' && !sub.software.toLowerCase().includes(selectedSoftwareFilter.toLowerCase())) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = sub.title.toLowerCase().includes(q);
        const matchesUser = sub.userName.toLowerCase().includes(q);
        const matchesDesc = sub.description.toLowerCase().includes(q);
        const matchesSoft = sub.software.toLowerCase().includes(q);
        if (!matchesTitle && !matchesUser && !matchesDesc && !matchesSoft) return false;
      }

      // Sort / Subtab filter
      if (sortTab === 'staff-pick' && !sub.isStaffPick) return false;

      return true;
    }).sort((a, b) => {
      if (sortTab === 'most-loved') {
        return b.likesCount - a.likesCount;
      }
      if (sortTab === 'top-score') {
        const scoreA = a.feedback?.overallScore || 0;
        const scoreB = b.feedback?.overallScore || 0;
        return scoreB - scoreA;
      }
      if (sortTab === 'newest') {
        return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
      }
      // default: staff picks first, then by date
      if (a.isStaffPick && !b.isStaffPick) return -1;
      if (!a.isStaffPick && b.isStaffPick) return 1;
      return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
    });
  }, [submissions, selectedMonthFilter, selectedSoftwareFilter, searchQuery, sortTab, currentUser]);

  return (
    <div className="space-y-8 py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4" />
            <span>Public Animation Showcase</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Explore Animations
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Browse submissions, study timing curves, and discover work from community animators worldwide.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            placeholder="Search by title, creator, or software..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Month Filters Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Month Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-neutral-900 rounded-xl border border-neutral-800 overflow-x-auto">
          {monthOptions.map(month => (
            <button
              key={month}
              id={`filter-month-${month.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setSelectedMonthFilter(month)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                selectedMonthFilter === month 
                  ? 'bg-amber-500 text-neutral-950 shadow' 
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {month === 'All' ? 'ALL CHALLENGES' : month.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Curated Subtabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => setSortTab('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
              sortTab === 'all' 
                ? 'bg-neutral-800 border-neutral-700 text-white' 
                : 'bg-neutral-950 border-neutral-900 text-neutral-400 hover:text-white'
            }`}
          >
            All Submissions
          </button>

          <button
            onClick={() => setSortTab('staff-pick')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 border ${
              sortTab === 'staff-pick' 
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300' 
                : 'bg-neutral-950 border-neutral-900 text-neutral-400 hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Staff Picks</span>
          </button>

          <button
            onClick={() => setSortTab('most-loved')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 border ${
              sortTab === 'most-loved' 
                ? 'bg-rose-500/20 border-rose-500/40 text-rose-300' 
                : 'bg-neutral-950 border-neutral-900 text-neutral-400 hover:text-white'
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-rose-400" />
            <span>Most Loved</span>
          </button>

          <button
            onClick={() => setSortTab('top-score')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 border ${
              sortTab === 'top-score' 
                ? 'bg-yellow-500/20 border-yellow-500/40 text-yellow-300' 
                : 'bg-neutral-950 border-neutral-900 text-neutral-400 hover:text-white'
            }`}
          >
            <Star className="w-3.5 h-3.5 text-yellow-400" />
            <span>Top Mentor Scored</span>
          </button>
        </div>
      </div>

      {/* Software Filter Pills */}
      <div className="flex items-center gap-2 text-xs overflow-x-auto pb-1">
        <span className="text-neutral-500 flex items-center gap-1 font-semibold">
          <SlidersHorizontal className="w-3 h-3" /> Software:
        </span>
        {softwareOptions.map(soft => (
          <button
            key={soft}
            onClick={() => setSelectedSoftwareFilter(soft)}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
              selectedSoftwareFilter === soft
                ? 'bg-neutral-800 text-amber-300 border border-neutral-700 font-bold'
                : 'bg-neutral-950 text-neutral-400 hover:text-neutral-200 border border-neutral-900'
            }`}
          >
            {soft}
          </button>
        ))}
      </div>

      {/* Animations Grid */}
      {filteredSubmissions.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-3">
          <p className="text-sm font-semibold text-neutral-300">No animations match your filter criteria.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedMonthFilter('All');
              setSelectedSoftwareFilter('All');
              setSortTab('all');
            }}
            className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-white transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSubmissions.map(sub => {
            const isLiked = currentUser ? sub.likedByUsers.includes(currentUser.id) : false;

            return (
              <div
                key={sub.id}
                id={`gallery-item-${sub.id}`}
                className="group relative rounded-2xl bg-neutral-900/90 border border-neutral-800 hover:border-amber-500/50 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 flex flex-col"
              >
                {/* Video / Thumbnail Player Trigger */}
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

                  {/* Badges Top */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    {sub.isStaffPick && (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-400 text-neutral-950 flex items-center gap-1 shadow-md">
                        <Award className="w-3 h-3" /> Staff Pick
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

                {/* Card Details */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-amber-400/90 font-semibold mb-1">
                      <span>{sub.challengeMonthYear}</span>
                      {sub.feedback && (
                        <span className="font-mono text-amber-400 font-bold bg-amber-500/10 px-1.5 py-0.2 rounded border border-amber-500/20">
                          Mentor: {sub.feedback.overallScore}/10
                        </span>
                      )}
                    </div>

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

                  {/* Creator and Actions Footer */}
                  <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img 
                        src={sub.userAvatar} 
                        alt={sub.userName} 
                        className="w-6 h-6 rounded-full object-cover border border-neutral-700"
                      />
                      <span className="text-xs font-semibold text-neutral-300 truncate max-w-[90px]">{sub.userName}</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs">
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

                      <button
                        onClick={() => setSelectedSubmission(sub)}
                        className="flex items-center gap-1 text-neutral-400 hover:text-neutral-200"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>{sub.comments.length}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
