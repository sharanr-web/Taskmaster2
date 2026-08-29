import React, { useState } from 'react';
import { 
  UploadCloud, 
  Film, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  FileVideo, 
  Play, 
  RotateCcw,
  Check,
  Lock,
  Eye,
  ShieldAlert,
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';

export const SubmitView: React.FC = () => {
  const { 
    currentUser, 
    challenges, 
    submitAnimation, 
    getUserSubmissionForChallenge,
    setActiveTab, 
    setSelectedSubmission,
    setIsAuthModalOpen 
  } = useApp();

  const activeChallenges = challenges.filter(c => c.status === 'active');
  const [selectedChallengeId, setSelectedChallengeId] = useState(activeChallenges[0]?.id || challenges[0]?.id || 'challenge-august-2026');
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [software, setSoftware] = useState('Blender 4.2');
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Check if current user already submitted for the selected challenge
  const existingSubmission = currentUser ? getUserSubmissionForChallenge(currentUser.id, selectedChallengeId) : undefined;
  const currentChallenge = challenges.find(c => c.id === selectedChallengeId) || challenges[0];

  // Preset sample test animations for easy testing without needing an actual render file
  const presetReels = [
    {
      name: 'Blender Bouncing Ball Sample',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      thumb: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
      soft: 'Blender 4.2'
    },
    {
      name: '2D Liquid Splash Animation',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
      thumb: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
      soft: 'Toon Boom Harmony'
    },
    {
      name: 'Mechanical Physics & Arc Reel',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      thumb: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80',
      soft: 'Autodesk Maya 2025'
    }
  ];

  if (!currentUser) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="font-display text-2xl font-bold text-white">Sign In to Submit Your Animation</h2>
        <p className="text-xs text-neutral-400 max-w-md mx-auto">
          You must be logged in to participate in the monthly animation challenge and receive mentor grading.
        </p>
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold text-xs cursor-pointer"
        >
          Sign In / Sign Up
        </button>
      </div>
    );
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 100 * 1024 * 1024) {
        alert('File size exceeds 100MB. Please compress your MP4 before uploading.');
        return;
      }
      setSelectedFileName(file.name);
      // Create local object URL for instant real video playback
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      setThumbnailUrl('https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80');
      if (!title) {
        setTitle(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
      }
    }
  };

  const handlePresetSelect = (preset: typeof presetReels[0]) => {
    setVideoUrl(preset.url);
    setThumbnailUrl(preset.thumb);
    setSoftware(preset.soft);
    setSelectedFileName(preset.name + '.mp4');
    if (!title) setTitle(preset.name);
    if (!description) setDescription('Testing squash and stretch timing curves with personality.');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!videoUrl) {
      setErrorMessage('Please upload a video file or select a sample reel.');
      return;
    }
    if (!title.trim()) {
      setErrorMessage('Please enter an animation title.');
      return;
    }

    setIsUploading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 25;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);

        // Submit animation
        const res = submitAnimation({
          challengeId: selectedChallengeId,
          title: title.trim(),
          description: description.trim() || 'No description provided.',
          videoUrl: videoUrl,
          thumbnailUrl: thumbnailUrl || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
          software: software,
          durationSeconds: 7
        });

        if (!res.success) {
          setErrorMessage(res.message || 'Submission failed. Only one entry is permitted per month.');
          return;
        }

        // Trigger confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });

        setIsSubmitted(true);
      }
    }, 180);
  };

  if (isSubmitted) {
    return (
      <div className="py-16 max-w-xl mx-auto text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-2xl">
          <Check className="w-8 h-8 stroke-[3]" />
        </div>

        <div className="space-y-2">
          <h2 className="font-display text-3xl font-extrabold text-white">Submission Successful!</h2>
          <p className="text-xs sm:text-sm text-neutral-300">
            Your animation for <strong>{title}</strong> has been uploaded directly and entered into the mentor review queue.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-400 text-left space-y-1">
          <div className="flex items-center gap-2 text-amber-400 font-bold">
            <Sparkles className="w-4 h-4" />
            <span>Next steps:</span>
          </div>
          <p>• Mentors will score your Timing, Spacing, and Arcs within 24-48 hours.</p>
          <p>• Once approved, your clip will appear publicly in the August Showcase Gallery.</p>
          <p>• <strong>Monthly rule:</strong> You have submitted your 1 allotted entry for this monthly challenge.</p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-4">
          <button
            onClick={() => setActiveTab('dashboard')}
            className="px-5 py-2.5 rounded-xl bg-amber-500 text-neutral-950 font-extrabold text-xs hover:bg-amber-400 transition-colors cursor-pointer"
          >
            Go to My Studio Dashboard
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className="px-5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white font-bold text-xs hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            Explore Public Gallery
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-8">
      {/* Title & Monthly Limit Policy */}
      <div>
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
          <UploadCloud className="w-4 h-4" />
          <span>Monthly Deliverable</span>
        </div>
        <h1 className="font-display text-3xl font-extrabold text-white">
          Submit Your Animation
        </h1>
        <div className="flex items-center gap-2 mt-2 text-xs text-neutral-400">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 font-semibold">
            <Clock className="w-3.5 h-3.5" /> 1 Animation Per Month Limit
          </span>
          <span>• MP4 / WebM • Max 100MB • 24 FPS</span>
        </div>
      </div>

      {/* Challenge Picker */}
      <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
        <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider">
          Select Monthly Challenge Target
        </label>
        <select
          value={selectedChallengeId}
          onChange={(e) => {
            setSelectedChallengeId(e.target.value);
            setErrorMessage(null);
          }}
          className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-none focus:border-amber-500 cursor-pointer"
        >
          {challenges.map(c => (
            <option key={c.id} value={c.id}>
              {c.monthYear}: {c.title} ({c.status.toUpperCase()})
            </option>
          ))}
        </select>
      </div>

      {/* Check if user has already submitted for this challenge */}
      {existingSubmission ? (
        <div className="p-6 rounded-2xl bg-neutral-900 border border-amber-500/40 space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-xl font-bold text-white">
                  Monthly Entry Submitted ({currentChallenge.monthYear})
                </h3>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                  existingSubmission.status === 'approved' 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}>
                  {existingSubmission.status}
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                You have already uploaded your animation for <strong>{currentChallenge.title}</strong>. Each animator is allowed <strong>one submission per monthly challenge</strong> to promote thoughtful iteration and craft.
              </p>
            </div>
          </div>

          {/* Submission Preview Card */}
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-full sm:w-44 aspect-video rounded-lg overflow-hidden bg-neutral-900 border border-neutral-800 shrink-0">
              <img 
                src={existingSubmission.thumbnailUrl} 
                alt={existingSubmission.title} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-neutral-950/30 flex items-center justify-center">
                <Play className="w-6 h-6 fill-white text-white drop-shadow" />
              </div>
            </div>

            <div className="flex-1 space-y-1.5 w-full">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-amber-400">{existingSubmission.software}</span>
                <span className="text-[11px] text-neutral-500">
                  {new Date(existingSubmission.submittedAt).toLocaleDateString()}
                </span>
              </div>
              <h4 className="font-display font-bold text-base text-white">{existingSubmission.title}</h4>
              <p className="text-xs text-neutral-400 line-clamp-2">{existingSubmission.description}</p>
              
              {existingSubmission.feedback && (
                <div className="pt-1 flex items-center gap-2 text-xs">
                  <span className="font-bold text-amber-400">Mentor Score: {existingSubmission.feedback.overallScore}/10</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setSelectedSubmission(existingSubmission)}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>Watch & Review My Submission</span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className="px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold text-xs cursor-pointer transition-colors"
            >
              <span>Explore Gallery Submissions</span>
            </button>
          </div>
        </div>
      ) : (
        /* Form for submitting animation */
        <form onSubmit={handleSubmit} className="space-y-6">
          {errorMessage && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Title */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider">
              Animation Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. The Reluctant Cannonball / Bouncing Rubber Duck"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Description & Approach */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider">
              Description & Animator Notes
            </label>
            <textarea
              rows={3}
              placeholder="Explain what personality you aimed for, squash & stretch techniques, or obstacles encountered..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Software Used */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider">
              Software Used
            </label>
            <select
              value={software}
              onChange={(e) => setSoftware(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              <option value="Blender 4.2">Blender</option>
              <option value="Autodesk Maya 2025">Autodesk Maya</option>
              <option value="Toon Boom Harmony">Toon Boom Harmony</option>
              <option value="Adobe After Effects">Adobe After Effects</option>
              <option value="Cinema 4D">Cinema 4D</option>
              <option value="TVPaint Animation">TVPaint</option>
              <option value="Procreate Dreams">Procreate Dreams</option>
              <option value="Krita / OpenToonz">Krita / OpenToonz</option>
              <option value="3ds Max">3ds Max</option>
            </select>
          </div>

          {/* File Drag & Drop Zone */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider">
              Upload Animation Video (MP4 / MOV / WebM)
            </label>

            <div className="relative border-2 border-dashed border-neutral-800 hover:border-amber-500/60 rounded-2xl p-6 sm:p-8 bg-neutral-950/60 text-center transition-colors">
              <input
                type="file"
                accept="video/mp4,video/webm,video/quicktime"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />

              <div className="space-y-2">
                <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 text-amber-400 flex items-center justify-center mx-auto">
                  <FileVideo className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold text-white">
                  {selectedFileName ? selectedFileName : 'Drag & Drop your video file here, or click to browse'}
                </p>
                <p className="text-[11px] text-neutral-500">
                  MP4 or WebM recommended • Max size 100MB • 24 FPS • 1 submission per month
                </p>
              </div>
            </div>

            {/* Quick Demo Test Presets */}
            <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-2">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                Or pick a sample animator test reel (Instant Demo):
              </span>
              <div className="flex flex-wrap gap-2">
                {presetReels.map((preset, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handlePresetSelect(preset)}
                    className="px-2.5 py-1.5 rounded-lg bg-neutral-950 hover:bg-neutral-800 text-[11px] text-neutral-300 border border-neutral-800 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3 h-3 text-amber-400" />
                    <span>{preset.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Video Preview if selected */}
          {videoUrl && (
            <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Ready for Upload:</span>
              </span>
              <div className="aspect-video max-h-56 rounded-xl bg-neutral-950 overflow-hidden border border-neutral-800">
                <video src={videoUrl} controls loop className="w-full h-full object-contain" />
              </div>
            </div>
          )}

          {/* Upload Progress Bar if active */}
          {isUploading && (
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-neutral-300">
                <span>Uploading animation clip...</span>
                <span className="font-mono text-amber-400">{uploadProgress}%</span>
              </div>
              <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-400 transition-all duration-200" 
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isUploading}
            className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:bg-neutral-800 disabled:text-neutral-500 text-neutral-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 transition-all cursor-pointer"
          >
            {isUploading ? (
              <span>Uploading...</span>
            ) : (
              <>
                <UploadCloud className="w-5 h-5 stroke-[2.5]" />
                <span>Submit Animation to {currentChallenge.monthYear} Challenge</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};

