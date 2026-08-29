import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Film, 
  Clock, 
  CheckCircle2, 
  Sliders, 
  Award, 
  MessageSquare, 
  Plus, 
  Calendar, 
  Play, 
  Sparkles,
  AlertCircle,
  Save,
  XCircle,
  Check,
  Trash2,
  AlertTriangle,
  Eye
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Submission, Challenge } from '../types';

export const AdminView: React.FC = () => {
  const { 
    currentUser, 
    challenges, 
    submissions, 
    saveMentorFeedback, 
    updateSubmissionStatus, 
    toggleStaffPick,
    createChallenge,
    deleteSubmission,
    setSelectedSubmission,
    setActiveTab
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<'queue' | 'all-submissions' | 'challenges' | 'new-challenge'>('queue');
  
  // Selected submission for grading
  const pendingSubmissions = submissions.filter(s => s.status === 'pending');
  const [selectedSubForReview, setSelectedSubForReview] = useState<Submission | null>(
    pendingSubmissions[0] || submissions[0] || null
  );

  // Mentor Review Form States
  const [timingScore, setTimingScore] = useState<number>(8);
  const [spacingScore, setSpacingScore] = useState<number>(8);
  const [arcsScore, setArcsScore] = useState<number>(8);
  const [creativityScore, setCreativityScore] = useState<number>(9);
  const [mentorComment, setMentorComment] = useState<string>(
    'Good anticipation and nice spacing on takeoff. The ball could have slightly more squash on impact. Try increasing the contrast between the first hesitant hop and the big rebound.'
  );
  const [feedbackSavedNotice, setFeedbackSavedNotice] = useState(false);
  const [deleteNotice, setDeleteNotice] = useState<string | null>(null);
  const [submissionToDelete, setSubmissionToDelete] = useState<Submission | null>(null);

  // New Challenge Form States
  const [newTitle, setNewTitle] = useState('');
  const [newMonth, setNewMonth] = useState('September');
  const [newYear, setNewYear] = useState(2026);
  const [newTheme, setNewTheme] = useState('Dynamic Weight & Flourish');
  const [newDeadline, setNewDeadline] = useState('2026-09-30T23:59:59');
  const [newDesc, setNewDesc] = useState('');
  const [newRequirements, setNewRequirements] = useState(
    'Create a 5-10 second animation.\nShow strong line of action.\nPreserve volume during deformation.'
  );

  if (currentUser?.role !== 'admin') {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto px-4">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto shadow-lg">
          <ShieldCheck className="w-7 h-7" />
        </div>
        <h2 className="font-display text-2xl font-bold text-white">Admin Privileges Required</h2>
        <p className="text-xs text-neutral-400 leading-relaxed">
          You are currently {currentUser ? `signed in as ${currentUser.name}` : 'not signed in'}. The Studio Admin & Mentor Review panel is restricted to the administrator account (<strong>sharan.r@icat.ac.in</strong>).
        </p>
        <div className="pt-2">
          <button
            onClick={() => setActiveTab('login')}
            className="py-2.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs transition-colors cursor-pointer inline-flex items-center gap-2"
          >
            <span>Sign In with Admin Account</span>
          </button>
        </div>
      </div>
    );
  }

  const overallCalculated = ((timingScore + spacingScore + arcsScore + creativityScore) / 4).toFixed(1);

  const handleConfirmDelete = () => {
    if (!submissionToDelete) return;
    const res = deleteSubmission(submissionToDelete.id);
    if (res.success) {
      setDeleteNotice(`Successfully deleted "${submissionToDelete.title}" by ${submissionToDelete.userName}.`);
      if (selectedSubForReview?.id === submissionToDelete.id) {
        const remaining = submissions.filter(s => s.id !== submissionToDelete.id);
        setSelectedSubForReview(remaining[0] || null);
      }
      setTimeout(() => setDeleteNotice(null), 4000);
    }
    setSubmissionToDelete(null);
  };

  const handleSaveFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubForReview) return;

    saveMentorFeedback({
      submissionId: selectedSubForReview.id,
      mentorId: currentUser.id,
      mentorName: currentUser.name,
      mentorRole: 'Lead Animation Mentor',
      mentorAvatar: currentUser.avatar,
      timingScore,
      spacingScore,
      arcsScore,
      creativityScore,
      overallScore: parseFloat(overallCalculated),
      comment: mentorComment.trim(),
      isPublished: true
    });

    setFeedbackSavedNotice(true);
    setTimeout(() => {
      setFeedbackSavedNotice(false);
      // Move to next pending if available
      const remaining = submissions.filter(s => s.status === 'pending' && s.id !== selectedSubForReview.id);
      if (remaining.length > 0) {
        setSelectedSubForReview(remaining[0]);
      }
    }, 1500);
  };

  const handleCreateChallengeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    createChallenge({
      title: newTitle.trim(),
      month: newMonth,
      year: Number(newYear),
      monthYear: `${newMonth} ${newYear}`,
      theme: newTheme,
      deadline: newDeadline,
      deadlineTimestamp: new Date(newDeadline).getTime(),
      description: newDesc.trim() || 'Monthly animation challenge assignment.',
      durationRange: '5–10 seconds (24 fps)',
      requirements: newRequirements.split('\n').filter(r => r.trim().length > 0),
      principlesFocus: ['Timing and Spacing', 'Squash and Stretch', 'Anticipation', 'Arcs'],
      referenceVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      referenceImages: [
        {
          title: 'Timing Chart & Spacing Curve',
          url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80'
        }
      ],
      guidelinesSummary: 'Deliverable: Rendered video in MP4/WebM format (1080p, 24fps).',
      status: 'active',
      allowedSoftware: ['Blender', 'Autodesk Maya', 'Toon Boom Harmony', 'After Effects']
    });

    setActiveAdminTab('challenges');
  };

  const reviewedCount = submissions.filter(s => s.feedback !== undefined).length;

  return (
    <div className="space-y-8 py-6">
      {/* Admin Top Header & KPI Stats */}
      {deleteNotice && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trash2 className="w-4 h-4 text-rose-400" />
            <span>{deleteNotice}</span>
          </div>
          <button 
            onClick={() => setDeleteNotice(null)}
            className="text-neutral-400 hover:text-white text-xs font-bold"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-extrabold text-white">TASKMATION ADMIN</h1>
              <p className="text-xs text-neutral-400">Monthly Tasks, Submissions Review & Private Mentor Grading</p>
            </div>
          </div>

          <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 font-bold self-start sm:self-auto">
            Logged in as Lead Mentor: {currentUser.name}
          </span>
        </div>

        {/* KPI Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
            <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider">Total Users</span>
            <div className="text-2xl font-extrabold font-mono text-white">428</div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
            <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider">Total Submissions</span>
            <div className="text-2xl font-extrabold font-mono text-white">{submissions.length}</div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950 border border-amber-500/30 space-y-1">
            <span className="text-[10px] text-amber-400 uppercase font-bold tracking-wider">Pending Reviews</span>
            <div className="text-2xl font-extrabold font-mono text-amber-400">{pendingSubmissions.length}</div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
            <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider">Reviewed & Scored</span>
            <div className="text-2xl font-extrabold font-mono text-emerald-400">{reviewedCount}</div>
          </div>
        </div>
      </div>

      {/* Admin Nav Tabs */}
      <div className="flex border-b border-neutral-800 gap-2">
        <button
          onClick={() => setActiveAdminTab('queue')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
            activeAdminTab === 'queue' 
              ? 'border-amber-500 text-amber-400' 
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Review & Grading Queue ({pendingSubmissions.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('all-submissions')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
            activeAdminTab === 'all-submissions' 
              ? 'border-amber-500 text-amber-400' 
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          <Film className="w-4 h-4" />
          <span>All Submissions ({submissions.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('challenges')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
            activeAdminTab === 'challenges' 
              ? 'border-amber-500 text-amber-400' 
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Monthly Tasks ({challenges.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('new-challenge')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
            activeAdminTab === 'new-challenge' 
              ? 'border-amber-500 text-amber-400' 
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>Create New Monthly Task</span>
        </button>
      </div>

      {/* Tab 1: Review & Grading Queue */}
      {activeAdminTab === 'queue' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Col: Queue List */}
          <div className="space-y-3">
            <h3 className="font-display font-bold text-sm text-neutral-300 uppercase tracking-wider">
              Pending Submissions
            </h3>

            {pendingSubmissions.length === 0 ? (
              <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <p className="text-xs font-bold text-white">All Submissions Graded!</p>
                <p className="text-[11px] text-neutral-500">Select any submission from "All Submissions" to adjust scores.</p>
              </div>
            ) : (
              pendingSubmissions.map(sub => (
                <div
                  key={sub.id}
                  onClick={() => setSelectedSubForReview(sub)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedSubForReview?.id === sub.id
                      ? 'bg-amber-500/10 border-amber-500 text-white shadow-md'
                      : 'bg-neutral-900 border-neutral-800 hover:border-neutral-700 text-neutral-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] text-amber-400 font-bold mb-1">
                    <span>{sub.challengeMonthYear}</span>
                    <span className="font-mono">{sub.software}</span>
                  </div>
                  <h4 className="font-display font-bold text-sm text-white line-clamp-1">{sub.title}</h4>
                  <div className="flex items-center gap-2 mt-2">
                    <img src={sub.userAvatar} alt={sub.userName} className="w-5 h-5 rounded-full object-cover" />
                    <span className="text-xs text-neutral-400">{sub.userName}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right 2 Cols: Video Player & Grading Interface */}
          {selectedSubForReview ? (
            <div className="lg:col-span-2 space-y-6">
              <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-6">
                {/* Submission Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold mb-1">
                      <span>{selectedSubForReview.challengeMonthYear}</span>
                      <span>•</span>
                      <span>Software: {selectedSubForReview.software}</span>
                    </div>
                    <h2 className="font-display text-2xl font-bold text-white">
                      {selectedSubForReview.title}
                    </h2>
                    <p className="text-xs text-neutral-400 mt-1">Creator: <strong>{selectedSubForReview.userName}</strong></p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleStaffPick(selectedSubForReview.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                        selectedSubForReview.isStaffPick
                          ? 'bg-amber-500 text-neutral-950'
                          : 'bg-neutral-800 text-amber-400 hover:bg-neutral-700'
                      }`}
                    >
                      <Award className="w-4 h-4" />
                      <span>{selectedSubForReview.isStaffPick ? 'Staff Pick Awarded' : 'Award Staff Pick'}</span>
                    </button>

                    <button
                      onClick={() => setSubmissionToDelete(selectedSubForReview)}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/30 flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Delete animation"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>

                {/* Video Player */}
                <div className="aspect-video rounded-xl bg-neutral-950 overflow-hidden border border-neutral-800 relative">
                  <video 
                    src={selectedSubForReview.videoUrl} 
                    controls 
                    loop 
                    className="w-full h-full object-contain"
                  />
                </div>

                <p className="text-xs text-neutral-300 bg-neutral-950 p-3 rounded-xl border border-neutral-800">
                  {selectedSubForReview.description}
                </p>

                {/* Grading Form */}
                <form onSubmit={handleSaveFeedback} className="space-y-6 pt-4 border-t border-neutral-800">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                      <Sliders className="w-5 h-5 text-amber-400" />
                      <span>Mentor Scoring Matrix (1 - 10)</span>
                    </h3>

                    <div className="text-right">
                      <span className="text-2xl font-extrabold font-mono text-amber-400">{overallCalculated}</span>
                      <span className="text-xs text-neutral-400 font-mono"> / 10 Overall</span>
                    </div>
                  </div>

                  {/* Sliders Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                    {/* Timing */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold text-neutral-300">Timing & Ease Curves</span>
                        <span className="font-mono text-amber-400 font-bold">{timingScore}/10</span>
                      </div>
                      <input 
                        type="range" 
                        min={1} 
                        max={10} 
                        step={0.5} 
                        value={timingScore} 
                        onChange={(e) => setTimingScore(parseFloat(e.target.value))}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                    </div>

                    {/* Spacing */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold text-neutral-300">Spacing & Volume Control</span>
                        <span className="font-mono text-amber-400 font-bold">{spacingScore}/10</span>
                      </div>
                      <input 
                        type="range" 
                        min={1} 
                        max={10} 
                        step={0.5} 
                        value={spacingScore} 
                        onChange={(e) => setSpacingScore(parseFloat(e.target.value))}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                    </div>

                    {/* Arcs */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold text-neutral-300">Arcs of Motion</span>
                        <span className="font-mono text-amber-400 font-bold">{arcsScore}/10</span>
                      </div>
                      <input 
                        type="range" 
                        min={1} 
                        max={10} 
                        step={0.5} 
                        value={arcsScore} 
                        onChange={(e) => setArcsScore(parseFloat(e.target.value))}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                    </div>

                    {/* Creativity */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold text-neutral-300">Creativity & Personality</span>
                        <span className="font-mono text-amber-400 font-bold">{creativityScore}/10</span>
                      </div>
                      <input 
                        type="range" 
                        min={1} 
                        max={10} 
                        step={0.5} 
                        value={creativityScore} 
                        onChange={(e) => setCreativityScore(parseFloat(e.target.value))}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Mentor Feedback Textarea */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider">
                      Mentor Feedback & Constructive Critique
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={mentorComment}
                      onChange={(e) => setMentorComment(e.target.value)}
                      placeholder="Write constructive notes on timing, squash & stretch, anticipation, and encouragement..."
                      className="w-full p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                    />

                    {/* Preset Feedback Phrases */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="text-[11px] text-neutral-500 self-center">Quick Presets:</span>
                      {[
                        "Great anticipation before takeoff!",
                        "Needs slightly more squash on ground impact.",
                        "Watch the arc parabola on the rebound.",
                        "Incredible volume preservation!"
                      ].map((preset, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setMentorComment(prev => `${prev} ${preset}`.trim())}
                          className="px-2 py-1 rounded bg-neutral-950 hover:bg-neutral-800 text-[10px] text-neutral-400 hover:text-white border border-neutral-800"
                        >
                          + {preset}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button & Notification */}
                  <div className="flex items-center gap-3">
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer transition-all"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save & Publish Feedback to Animator</span>
                    </button>

                    {feedbackSavedNotice && (
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                        <Check className="w-4 h-4 stroke-[3]" /> Published to Animator Studio & Gallery!
                      </span>
                    )}
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="lg:col-span-2 p-12 text-center rounded-2xl bg-neutral-900 border border-neutral-800">
              <p className="text-xs text-neutral-400">Select a submission from the list to begin grading.</p>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: All Submissions Table */}
      {activeAdminTab === 'all-submissions' && (
        <div className="rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-950 text-neutral-400 uppercase font-bold border-b border-neutral-800">
                <tr>
                  <th className="p-4">Animation</th>
                  <th className="p-4">Creator</th>
                  <th className="p-4">Challenge</th>
                  <th className="p-4">Software</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Mentor Score</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                {submissions.map(sub => (
                  <tr key={sub.id} className="hover:bg-neutral-800/40 transition-colors">
                    <td className="p-4 font-bold text-white flex items-center gap-2">
                      <img src={sub.thumbnailUrl} alt={sub.title} className="w-10 h-6 object-cover rounded" />
                      <span className="line-clamp-1">{sub.title}</span>
                      {sub.isStaffPick && <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                    </td>
                    <td className="p-4 text-neutral-300">{sub.userName}</td>
                    <td className="p-4 text-neutral-400">{sub.challengeMonthYear}</td>
                    <td className="p-4 text-neutral-400">{sub.software}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                        sub.status === 'approved' 
                          ? 'bg-emerald-500/10 text-emerald-400' 
                          : 'bg-amber-500/10 text-amber-400'
                      }`}>
                        {sub.status}
                      </span>
                    </td>
                    <td className="p-4 font-mono font-bold text-amber-400">
                      {sub.feedback ? `${sub.feedback.overallScore}/10` : '—'}
                    </td>
                    <td className="p-4 flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedSubForReview(sub);
                          setActiveAdminTab('queue');
                        }}
                        className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 font-semibold cursor-pointer"
                      >
                        Grade
                      </button>
                      <button
                        onClick={() => setSelectedSubmission(sub)}
                        className="px-2.5 py-1 rounded bg-neutral-800 text-neutral-300 hover:text-white cursor-pointer"
                      >
                        Watch
                      </button>
                      <button
                        onClick={() => setSubmissionToDelete(sub)}
                        className="px-2 py-1 rounded bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/30 flex items-center gap-1 cursor-pointer"
                        title="Delete animation"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Monthly Tasks List */}
      {activeAdminTab === 'challenges' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-lg text-white">Monthly Animation Challenges</h3>
            <button
              onClick={() => setActiveAdminTab('new-challenge')}
              className="px-4 py-2 rounded-xl bg-amber-500 text-neutral-950 font-bold text-xs hover:bg-amber-400 flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Create Monthly Task</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {challenges.map(ch => (
              <div key={ch.id} className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-400">{ch.monthYear}</span>
                  <span className="px-2 py-0.5 rounded bg-neutral-800 text-[10px] uppercase font-bold text-neutral-300">
                    {ch.status}
                  </span>
                </div>
                <h4 className="font-display font-bold text-base text-white">{ch.title}</h4>
                <p className="text-xs text-neutral-400 line-clamp-2">{ch.description}</p>
                <div className="pt-2 border-t border-neutral-800 flex justify-between text-[11px] text-neutral-500 font-mono">
                  <span>Submissions: {ch.totalSubmissions}</span>
                  <span>{ch.durationRange}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Create New Monthly Task */}
      {activeAdminTab === 'new-challenge' && (
        <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-6">
          <div>
            <h2 className="font-display text-2xl font-bold text-white">Create Monthly Challenge</h2>
            <p className="text-xs text-neutral-400 mt-1">Publish a new monthly animation task for the community.</p>
          </div>

          <form onSubmit={handleCreateChallengeSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-neutral-300">Challenge Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Creature Roar & Anticipation"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-neutral-300">Month</label>
                <input
                  type="text"
                  required
                  value={newMonth}
                  onChange={(e) => setNewMonth(e.target.value)}
                  className="w-full p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-neutral-300">Year</label>
                <input
                  type="number"
                  required
                  value={newYear}
                  onChange={(e) => setNewYear(Number(e.target.value))}
                  className="w-full p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-neutral-300">Core Theme</label>
              <input
                type="text"
                required
                value={newTheme}
                onChange={(e) => setNewTheme(e.target.value)}
                className="w-full p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-neutral-300">Description & Brief</label>
              <textarea
                rows={3}
                required
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Explain the assignment goal and motion study focus..."
                className="w-full p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-neutral-300">Requirements (one per line)</label>
              <textarea
                rows={3}
                required
                value={newRequirements}
                onChange={(e) => setNewRequirements(e.target.value)}
                className="w-full p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs transition-colors"
            >
              Publish Challenge to Community
            </button>
          </form>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {submissionToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm">
          <div className="max-w-md w-full p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-5 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-400">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-white">Delete Animation</h3>
                <span className="text-xs text-neutral-400">Admin Permission Action</span>
              </div>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed">
              Are you sure you want to permanently delete <strong>"{submissionToDelete.title}"</strong> created by <strong>{submissionToDelete.userName}</strong>?
            </p>

            <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-400 space-y-1">
              <p>• Removes this video clip and mentor scores from public galleries.</p>
              <p>• Resets the 1-animation monthly upload limit for this animator so they can submit a replacement.</p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSubmissionToDelete(null)}
                className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold text-xs cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors shadow-lg shadow-rose-500/20"
              >
                <Trash2 className="w-4 h-4" />
                <span>Confirm & Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
