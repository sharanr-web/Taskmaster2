import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  FileText, 
  Play, 
  Download, 
  UploadCloud, 
  Layers, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  ExternalLink,
  Info,
  Archive,
  Eye,
  Lock
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Challenge } from '../types';

export const ChallengeView: React.FC = () => {
  const { 
    challenges, 
    selectedChallengeId, 
    setSelectedChallengeId, 
    setActiveTab, 
    setIsAuthModalOpen,
    currentUser,
    getUserSubmissionForChallenge,
    setSelectedSubmission 
  } = useApp();

  const currentChallenge = challenges.find(c => c.id === selectedChallengeId) || challenges[0];
  const [activeTabSub, setActiveTabSub] = useState<'brief' | 'references' | 'guidelines' | 'archive'>('brief');

  const userSubmission = currentUser ? getUserSubmissionForChallenge(currentUser.id, currentChallenge.id) : undefined;

  return (
    <div className="space-y-8 py-6">
      {/* Header Banner */}
      <div className="rounded-3xl bg-neutral-900 border border-neutral-800 p-6 sm:p-10 relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-md bg-amber-500 text-neutral-950 text-xs font-extrabold uppercase tracking-wider">
              {currentChallenge.monthYear} Challenge
            </span>
            <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase ${
              currentChallenge.status === 'active' 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                : 'bg-neutral-800 text-neutral-400'
            }`}>
              {currentChallenge.status}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>Deadline: {new Date(currentChallenge.deadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} (11:59 PM)</span>
          </div>
        </div>

        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-3xl">
          {currentChallenge.title}
        </h1>

        <p className="mt-4 text-neutral-300 text-sm sm:text-base max-w-2xl leading-relaxed">
          {currentChallenge.description}
        </p>

        {/* Quick CTA */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          {currentChallenge.status === 'active' ? (
            userSubmission ? (
              <button
                onClick={() => setSelectedSubmission(userSubmission)}
                className="px-6 py-3 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500/30 font-extrabold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>View My Monthly Submission</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  if (!currentUser) {
                    setIsAuthModalOpen(true);
                  } else {
                    setSelectedChallengeId(currentChallenge.id);
                    setActiveTab('submit');
                  }
                }}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/25 transition-all cursor-pointer"
              >
                <UploadCloud className="w-4 h-4 stroke-[2.5]" />
                <span>Submit Your Animation</span>
              </button>
            )
          ) : (
            <div className="px-4 py-2.5 rounded-xl bg-neutral-800 text-neutral-400 text-xs font-semibold">
              Submissions for this challenge are closed. Check the active challenge!
            </div>
          )}

          <button
            onClick={() => setActiveTab('gallery')}
            className="px-5 py-3 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-neutral-200 font-bold text-xs sm:text-sm border border-neutral-700 transition-colors cursor-pointer"
          >
            Explore Submissions ({currentChallenge.totalSubmissions})
          </button>
        </div>
      </div>

      {/* Navigation Subtabs */}
      <div className="flex border-b border-neutral-800 overflow-x-auto">
        <button
          onClick={() => setActiveTabSub('brief')}
          className={`px-5 py-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${
            activeTabSub === 'brief' 
              ? 'border-amber-500 text-amber-400' 
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          Task Brief & Requirements
        </button>

        <button
          onClick={() => setActiveTabSub('references')}
          className={`px-5 py-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${
            activeTabSub === 'references' 
              ? 'border-amber-500 text-amber-400' 
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          Reference Videos & Timing Sheets
        </button>

        <button
          onClick={() => setActiveTabSub('guidelines')}
          className={`px-5 py-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${
            activeTabSub === 'guidelines' 
              ? 'border-amber-500 text-amber-400' 
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          Submission Guidelines
        </button>

        <button
          onClick={() => setActiveTabSub('archive')}
          className={`px-5 py-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${
            activeTabSub === 'archive' 
              ? 'border-amber-500 text-amber-400' 
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          Past Challenges Archive ({challenges.length})
        </button>
      </div>

      {/* Subtab 1: Brief & Requirements */}
      {activeTabSub === 'brief' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: Requirements */}
          <div className="lg:col-span-2 space-y-6">
            {/* Requirements Card */}
            <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
              <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-amber-400" />
                <span>Assignment Requirements</span>
              </h3>

              <div className="space-y-3">
                {currentChallenge.requirements.map((req, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-neutral-950 border border-neutral-800/80">
                    <span className="w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">{req}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 12 Principles Focus */}
            <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
              <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>12 Principles Evaluated by Mentors</span>
              </h3>
              <p className="text-xs text-neutral-400">
                Your submission will receive private ratings and actionable mentor notes evaluated primarily on these core principles:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentChallenge.principlesFocus.map((principle, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800/80 flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="text-xs font-bold text-neutral-200">{principle}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Col: Specifications */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-4">
              <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">Specifications</h4>
              
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-2 border-b border-neutral-800 text-neutral-400">
                  <span>Duration</span>
                  <span className="font-bold text-white font-mono">{currentChallenge.durationRange}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-neutral-800 text-neutral-400">
                  <span>Target FPS</span>
                  <span className="font-bold text-white font-mono">24 FPS</span>
                </div>
                <div className="flex justify-between py-2 border-b border-neutral-800 text-neutral-400">
                  <span>Format</span>
                  <span className="font-bold text-amber-400 font-mono">MP4 / WebM</span>
                </div>
                <div className="flex justify-between py-2 border-b border-neutral-800 text-neutral-400">
                  <span>Max File Size</span>
                  <span className="font-bold text-white font-mono">&lt; 100 MB</span>
                </div>
                <div className="flex justify-between py-2 text-neutral-400">
                  <span>Submissions so far</span>
                  <span className="font-bold text-white font-mono">{currentChallenge.totalSubmissions}</span>
                </div>
              </div>
            </div>

            {/* Allowed Software List */}
            <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-3">
              <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider">Accepted Software</h4>
              <p className="text-[11px] text-neutral-400">
                You can use any standard 2D, 3D, or hand-drawn animation package:
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {currentChallenge.allowedSoftware.map((soft, idx) => (
                  <span key={idx} className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-300">
                    {soft}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 2: Reference Assets */}
      {activeTabSub === 'references' && (
        <div className="space-y-8">
          {/* Reference Video Breakdown */}
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
            <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
              <Play className="w-5 h-5 text-amber-400 fill-amber-400" />
              <span>Official Video Reference Breakdown</span>
            </h3>
            <div className="aspect-video max-w-3xl rounded-xl bg-neutral-950 overflow-hidden border border-neutral-800 relative">
              <video 
                src={currentChallenge.referenceVideoUrl} 
                controls 
                loop 
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Reference Timing Sheets */}
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
            <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-400" />
              <span>Timing Charts & Spacing Guides</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentChallenge.referenceImages.map((img, idx) => (
                <div key={idx} className="rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950 space-y-2 p-3">
                  <img src={img.url} alt={img.title} className="w-full h-48 object-cover rounded-lg" />
                  <p className="text-xs font-bold text-neutral-200">{img.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Subtab 3: Guidelines */}
      {activeTabSub === 'guidelines' && (
        <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-6 max-w-3xl">
          <h3 className="font-display font-bold text-xl text-white">
            Taskmation Submission Rules & Standards
          </h3>
          <div className="space-y-4 text-xs sm:text-sm text-neutral-300 leading-relaxed">
            <p>
              1. <strong>Strict Direct Video Uploads:</strong> Please upload an exported <strong>MP4</strong> or <strong>WebM</strong> video. Do not upload raw scene files (.blend, .ma, .c4d) as primary deliverables, to keep viewing fast and accessible for all community members.
            </p>
            <p>
              2. <strong>Original Work:</strong> All animation keyframing must be your original work for this challenge. Stock rigs and character models (such as Blender Foundation rigs or standard animation mannequins) are completely allowed.
            </p>
            <p>
              3. <strong>Mentor Review Process:</strong> Submissions are placed in the admin review queue upon upload. Once verified, they appear in the public gallery and you will receive a private mentor score breakdown across Timing, Spacing, Arcs, and Creativity.
            </p>
            <p>
              4. <strong>File Size Limits:</strong> Videos must be under 100MB to comply with free cloud object storage architecture.
            </p>
            <p>
              5. <strong>One Animation Entry Per Month:</strong> Each animator can upload exactly one animation per monthly challenge. Focus on polishing timing, arcs, and weight before uploading your single monthly entry!
            </p>
          </div>
        </div>
      )}

      {/* Subtab 4: Archive */}
      {activeTabSub === 'archive' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {challenges.map(ch => (
            <div 
              key={ch.id}
              onClick={() => {
                setSelectedChallengeId(ch.id);
                setActiveTabSub('brief');
              }}
              className={`p-6 rounded-2xl border cursor-pointer transition-all ${
                selectedChallengeId === ch.id 
                  ? 'border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/10' 
                  : 'border-neutral-800 bg-neutral-900/60 hover:border-neutral-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-amber-400">{ch.monthYear}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                  ch.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-neutral-800 text-neutral-400'
                }`}>
                  {ch.status}
                </span>
              </div>
              <h4 className="font-display font-bold text-base text-white">{ch.title}</h4>
              <p className="text-xs text-neutral-400 mt-2 line-clamp-2">{ch.description}</p>
              <div className="mt-4 text-xs font-semibold text-amber-400 flex items-center gap-1">
                <span>View Challenge Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
