import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Heart, 
  MessageSquare, 
  Award, 
  Sparkles, 
  Share2, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Gauge, 
  Flame, 
  Layers, 
  ShieldCheck,
  Send,
  Sliders,
  Eye,
  Trash2,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Submission } from '../types';

export const VideoPlayerModal: React.FC = () => {
  const { 
    selectedSubmission, 
    setSelectedSubmission, 
    currentUser, 
    toggleLike, 
    addComment, 
    setIsAuthModalOpen,
    setActiveTab,
    toggleStaffPick,
    deleteSubmission
  } = useApp();

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isLooping, setIsLooping] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [newCommentText, setNewCommentText] = useState('');
  const [showArcOverlay, setShowArcOverlay] = useState(false);
  const [showGridOverlay, setShowGridOverlay] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const FPS = selectedSubmission?.fps || 24;

  useEffect(() => {
    if (selectedSubmission && videoRef.current) {
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentTime(0);
      setCurrentFrame(0);
    }
  }, [selectedSubmission]);

  if (!selectedSubmission) return null;

  const isLiked = currentUser ? selectedSubmission.likedByUsers.includes(currentUser.id) : false;

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const time = videoRef.current.currentTime;
    setCurrentTime(time);
    setCurrentFrame(Math.floor(time * FPS));
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration || selectedSubmission.durationSeconds || 7);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
      setCurrentFrame(Math.floor(time * FPS));
    }
  };

  const stepFrame = (frames: number) => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    setIsPlaying(false);
    const frameDuration = 1 / FPS;
    const newTime = Math.max(0, Math.min(videoRef.current.duration, videoRef.current.currentTime + (frames * frameDuration)));
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    setCurrentFrame(Math.floor(newTime * FPS));
  };

  const setSpeed = (speed: number) => {
    setPlaybackRate(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    if (!newCommentText.trim()) return;
    addComment(selectedSubmission.id, newCommentText.trim());
    setNewCommentText('');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-neutral-950/90 backdrop-blur-md overflow-y-auto">
      <div 
        className="fixed inset-0" 
        onClick={() => setSelectedSubmission(null)}
      />

      <div className="relative w-full max-w-5xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-neutral-800 bg-neutral-950/60">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {selectedSubmission.challengeMonthYear}
              </span>
              <span className="text-xs font-semibold text-neutral-400">
                {selectedSubmission.software}
              </span>
            </div>
            {selectedSubmission.isStaffPick && (
              <span className="hidden sm:inline-flex items-center gap-1 text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-amber-400 text-neutral-950 shadow-sm">
                <Award className="w-3.5 h-3.5" /> Staff Pick
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs flex items-center gap-1.5 transition-colors"
              title="Share Animation Link"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{copied ? 'Link Copied!' : 'Share'}</span>
            </button>

            {currentUser?.role === 'admin' && (
              <button
                onClick={() => toggleStaffPick(selectedSubmission.id)}
                className={`p-2 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors ${
                  selectedSubmission.isStaffPick 
                    ? 'bg-amber-500 text-neutral-950' 
                    : 'bg-neutral-800 text-amber-400 hover:bg-neutral-700'
                }`}
                title="Toggle Taskmation Staff Pick"
              >
                <Award className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">
                  {selectedSubmission.isStaffPick ? 'Staff Pick Awarded' : 'Feature as Staff Pick'}
                </span>
              </button>
            )}

            <button
              onClick={() => setSelectedSubmission(null)}
              className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body: Video Stage & Controls */}
        <div className="overflow-y-auto flex-1">
          <div className="bg-neutral-950 relative aspect-video w-full flex items-center justify-center group overflow-hidden">
            {/* Real HTML5 Video Player */}
            <video
              ref={videoRef}
              src={selectedSubmission.videoUrl}
              poster={selectedSubmission.thumbnailUrl}
              loop={isLooping}
              muted={isMuted}
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onClick={handlePlayPause}
              className="w-full h-full object-contain cursor-pointer"
            />

            {/* Educational Animator Overlay: Arc Path Visualizer */}
            {showArcOverlay && (
              <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
                <svg className="w-full h-full opacity-70" viewBox="0 0 800 450">
                  {/* Bouncing ball parabolic arcs */}
                  <path 
                    d="M 50 380 Q 200 40, 350 380 Q 480 120, 600 380 Q 690 240, 750 380" 
                    fill="none" 
                    stroke="#f59e0b" 
                    strokeWidth="3" 
                    strokeDasharray="6 6"
                  />
                  {/* Squash point indicators */}
                  <ellipse cx="350" cy="385" rx="35" ry="12" fill="rgba(245,158,11,0.25)" stroke="#f59e0b" strokeWidth="2" />
                  <ellipse cx="600" cy="385" rx="25" ry="10" fill="rgba(245,158,11,0.25)" stroke="#f59e0b" strokeWidth="2" />
                  <ellipse cx="750" cy="385" rx="18" ry="8" fill="rgba(245,158,11,0.25)" stroke="#f59e0b" strokeWidth="2" />
                  <text x="350" y="360" fill="#fef08a" fontSize="11" textAnchor="middle" fontFamily="monospace">Max Squash & Ground Contact</text>
                  <text x="200" y="30" fill="#fef08a" fontSize="11" textAnchor="middle" fontFamily="monospace">Apex: Ease-in / Ease-out</text>
                </svg>
              </div>
            )}

            {/* Grid Overlay */}
            {showGridOverlay && (
              <div className="absolute inset-0 pointer-events-none z-10 grid grid-cols-3 grid-rows-3 border border-amber-500/20">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="border border-white/5" />
                ))}
              </div>
            )}

            {/* Play Overlay Button if paused */}
            {!isPlaying && (
              <button
                onClick={handlePlayPause}
                className="absolute w-16 h-16 rounded-full bg-amber-500/90 text-neutral-950 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform active:scale-95 z-20 cursor-pointer"
              >
                <Play className="w-8 h-8 fill-neutral-950 ml-1" />
              </button>
            )}

            {/* Top Bar Video Overlays */}
            <div className="absolute top-3 left-3 flex items-center gap-2 z-20">
              <span className="px-2 py-1 rounded bg-neutral-950/80 backdrop-blur-md border border-neutral-800 text-[11px] font-mono-num font-bold text-amber-300">
                Frame {currentFrame} ({FPS} FPS)
              </span>
              <span className="px-2 py-1 rounded bg-neutral-950/80 backdrop-blur-md border border-neutral-800 text-[11px] font-mono-num text-neutral-300">
                {currentTime.toFixed(2)}s / {duration.toFixed(2)}s
              </span>
            </div>

            {/* Animator Analysis Tool Toggles */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5 z-20">
              <button
                onClick={() => setShowArcOverlay(!showArcOverlay)}
                className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1 backdrop-blur-md transition-all ${
                  showArcOverlay 
                    ? 'bg-amber-500 text-neutral-950 font-bold' 
                    : 'bg-neutral-950/80 text-neutral-300 hover:text-white border border-neutral-800'
                }`}
                title="Toggle Parabolic Motion Arc Analysis"
              >
                <Sliders className="w-3 h-3" />
                <span>Arcs Overlay</span>
              </button>

              <button
                onClick={() => setShowGridOverlay(!showGridOverlay)}
                className={`px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 backdrop-blur-md transition-all ${
                  showGridOverlay 
                    ? 'bg-amber-500 text-neutral-950 font-bold' 
                    : 'bg-neutral-950/80 text-neutral-300 hover:text-white border border-neutral-800'
                }`}
                title="Toggle Rule of Thirds Staging Grid"
              >
                <Eye className="w-3 h-3" />
                <span>Grid</span>
              </button>
            </div>
          </div>

          {/* Pro Animator Transport Timeline & Playback Bar */}
          <div className="bg-neutral-950 p-4 border-b border-neutral-800 space-y-3">
            {/* Scrubber Range */}
            <div className="relative flex items-center group">
              <input
                type="range"
                min={0}
                max={duration || 1}
                step={0.01}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500 hover:h-2 transition-all"
              />
            </div>

            {/* Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              {/* Play / Step Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => stepFrame(-1)}
                  className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 font-mono flex items-center gap-0.5"
                  title="Step 1 Frame Back (←)"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="text-[10px] font-bold">-1 Frame</span>
                </button>

                <button
                  onClick={handlePlayPause}
                  className="p-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold shadow-md shadow-amber-500/20"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-neutral-950" />}
                </button>

                <button
                  onClick={() => stepFrame(1)}
                  className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 font-mono flex items-center gap-0.5"
                  title="Step 1 Frame Forward (→)"
                >
                  <span className="text-[10px] font-bold">+1 Frame</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.currentTime = 0;
                      setCurrentTime(0);
                      setCurrentFrame(0);
                    }
                  }}
                  className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200"
                  title="Restart to Beginning"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Speed & Loop Controls */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-lg border border-neutral-800">
                  <Gauge className="w-3.5 h-3.5 text-neutral-400 ml-1" />
                  {[0.25, 0.5, 1, 1.5, 2].map(speed => (
                    <button
                      key={speed}
                      onClick={() => setSpeed(speed)}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold font-mono ${
                        playbackRate === speed 
                          ? 'bg-amber-500 text-neutral-950' 
                          : 'text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setIsLooping(!isLooping)}
                  className={`px-2 py-1 rounded-lg border text-xs font-semibold flex items-center gap-1 ${
                    isLooping 
                      ? 'border-amber-500/40 bg-amber-500/10 text-amber-300' 
                      : 'border-neutral-800 bg-neutral-900 text-neutral-400'
                  }`}
                  title="Toggle Continuous Loop"
                >
                  <span>Loop</span>
                  {isLooping && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />}
                </button>

                <button
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.muted = !isMuted;
                      setIsMuted(!isMuted);
                    }
                  }}
                  className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Submission Details & Feedback Grid */}
          <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Col (2 cols): Submission Info & Comments */}
            <div className="lg:col-span-2 space-y-6">
              {/* Creator & Title */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h2 className="font-display text-2xl font-bold text-white tracking-tight">
                    {selectedSubmission.title}
                  </h2>

                  <button
                    onClick={() => toggleLike(selectedSubmission.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      isLiked
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                        : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-400' : ''}`} />
                    <span>{selectedSubmission.likesCount}</span>
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <img 
                    src={selectedSubmission.userAvatar} 
                    alt={selectedSubmission.userName} 
                    className="w-10 h-10 rounded-full object-cover border border-amber-500/40"
                  />
                  <div>
                    <p className="font-bold text-sm text-white">{selectedSubmission.userName}</p>
                    <p className="text-xs text-neutral-400">{selectedSubmission.userBio || 'Animator'}</p>
                  </div>
                </div>

                <p className="mt-4 text-sm text-neutral-300 leading-relaxed bg-neutral-950/40 p-3.5 rounded-xl border border-neutral-800/80">
                  {selectedSubmission.description}
                </p>
              </div>

              {/* Public Community Discussion */}
              <div className="border-t border-neutral-800/80 pt-5">
                <h3 className="font-display font-bold text-base text-white flex items-center gap-2 mb-4">
                  <MessageSquare className="w-4 h-4 text-amber-400" />
                  <span>Community Discussion ({selectedSubmission.comments.length})</span>
                </h3>

                {/* Comment Input */}
                <form onSubmit={handleCommentSubmit} className="flex gap-2 mb-4">
                  <input
                    type="text"
                    placeholder={currentUser ? "Add constructive animation feedback or praise..." : "Sign in to leave feedback..."}
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    className="flex-1 px-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-amber-500/20"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Post</span>
                  </button>
                </form>

                {/* Comments List */}
                <div className="space-y-3">
                  {selectedSubmission.comments.length === 0 ? (
                    <p className="text-xs text-neutral-500 italic py-2">
                      No public comments yet. Be the first to share your thoughts on this animation!
                    </p>
                  ) : (
                    selectedSubmission.comments.map(c => (
                      <div key={c.id} className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/70 flex items-start gap-3">
                        <img 
                          src={c.userAvatar} 
                          alt={c.userName} 
                          className="w-7 h-7 rounded-full object-cover border border-neutral-700 mt-0.5"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-neutral-200">{c.userName}</span>
                            <span className="text-[10px] text-neutral-500 font-mono">
                              {new Date(c.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-300 mt-1">{c.comment}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Right Col: Official Mentor Feedback Card */}
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-gradient-to-b from-neutral-850 to-neutral-950 border border-amber-500/30 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4 text-amber-400" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-white">Mentor Critique</h4>
                      <p className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider">Official Review</p>
                    </div>
                  </div>

                  {selectedSubmission.feedback && (
                    <div className="text-right">
                      <span className="text-xl font-extrabold font-mono text-amber-400">
                        {selectedSubmission.feedback.overallScore}
                      </span>
                      <span className="text-xs text-neutral-400 font-mono">/10</span>
                    </div>
                  )}
                </div>

                {selectedSubmission.feedback ? (
                  <div className="space-y-4">
                    {/* Score Bars */}
                    <div className="space-y-2.5 bg-neutral-950/80 p-3.5 rounded-xl border border-neutral-800">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-neutral-300 font-semibold">Timing & Ease</span>
                          <span className="font-mono text-amber-400 font-bold">{selectedSubmission.feedback.timingScore}/10</span>
                        </div>
                        <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-amber-400 rounded-full" 
                            style={{ width: `${(selectedSubmission.feedback.timingScore / 10) * 100}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-neutral-300 font-semibold">Spacing & Weight</span>
                          <span className="font-mono text-amber-400 font-bold">{selectedSubmission.feedback.spacingScore}/10</span>
                        </div>
                        <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-amber-400 rounded-full" 
                            style={{ width: `${(selectedSubmission.feedback.spacingScore / 10) * 100}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-neutral-300 font-semibold">Arcs & Path of Action</span>
                          <span className="font-mono text-amber-400 font-bold">{selectedSubmission.feedback.arcsScore}/10</span>
                        </div>
                        <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-amber-400 rounded-full" 
                            style={{ width: `${(selectedSubmission.feedback.arcsScore / 10) * 100}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-neutral-300 font-semibold">Creativity & Appeal</span>
                          <span className="font-mono text-amber-400 font-bold">{selectedSubmission.feedback.creativityScore}/10</span>
                        </div>
                        <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-amber-400 rounded-full" 
                            style={{ width: `${(selectedSubmission.feedback.creativityScore / 10) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Mentor Comment Quote */}
                    <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-100 leading-relaxed relative">
                      <p className="italic">"{selectedSubmission.feedback.comment}"</p>
                      <div className="mt-2.5 flex items-center justify-between text-[11px] text-amber-300 font-medium">
                        <span>Reviewed by {selectedSubmission.feedback.mentorName}</span>
                        <span className="text-[10px] text-amber-400/80">{selectedSubmission.feedback.mentorRole}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 px-4 bg-neutral-950/40 rounded-xl border border-dashed border-neutral-800">
                    <p className="text-xs text-neutral-400">
                      {selectedSubmission.status === 'pending' 
                        ? '⏳ This animation is currently in the mentor review queue.' 
                        : 'Mentor review will be published shortly.'}
                    </p>
                    {currentUser?.role === 'admin' && (
                      <button
                        onClick={() => {
                          setSelectedSubmission(null);
                          setActiveTab('admin');
                        }}
                        className="mt-3 px-3 py-1.5 rounded-lg bg-amber-500 text-neutral-950 text-xs font-bold hover:bg-amber-400"
                      >
                        Grade in Admin Panel
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Software Details */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs space-y-2">
                <div className="flex justify-between text-neutral-400">
                  <span>Software</span>
                  <span className="font-semibold text-white">{selectedSubmission.software}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Frame Rate</span>
                  <span className="font-semibold text-white">{selectedSubmission.fps} FPS</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Duration</span>
                  <span className="font-semibold text-white">{selectedSubmission.durationSeconds}s</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Submitted</span>
                  <span className="font-semibold text-white">{new Date(selectedSubmission.submittedAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Admin Actions Panel */}
              {currentUser?.role === 'admin' && (
                <div className="p-4 rounded-xl bg-neutral-950 border border-amber-500/30 space-y-3">
                  <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Admin Controls</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => {
                        setSelectedSubmission(null);
                        setActiveTab('admin');
                      }}
                      className="py-2 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      <span>Grade Panel</span>
                    </button>

                    <button
                      onClick={() => toggleStaffPick(selectedSubmission.id)}
                      className={`py-2 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                        selectedSubmission.isStaffPick
                          ? 'bg-neutral-800 text-amber-400 border border-amber-500/40'
                          : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800'
                      }`}
                    >
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      <span>{selectedSubmission.isStaffPick ? 'Staff Pick' : 'Staff Pick'}</span>
                    </button>
                  </div>

                  {/* Delete Button */}
                  {!isConfirmingDelete ? (
                    <button
                      onClick={() => setIsConfirmingDelete(true)}
                      className="w-full py-2 px-3 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Animation (Admin)</span>
                    </button>
                  ) : (
                    <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 space-y-2 text-left">
                      <p className="text-[11px] text-rose-300 font-medium">
                        Delete this animation? This removes it and allows the user to re-submit this month.
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            deleteSubmission(selectedSubmission.id);
                            setIsConfirmingDelete(false);
                            setSelectedSubmission(null);
                          }}
                          className="flex-1 py-1.5 rounded bg-rose-600 hover:bg-rose-500 text-white font-bold text-[11px] cursor-pointer"
                        >
                          Yes, Delete
                        </button>
                        <button
                          onClick={() => setIsConfirmingDelete(false)}
                          className="flex-1 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold text-[11px] cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
