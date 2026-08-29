import React, { useState } from 'react';
import { 
  User as UserIcon, 
  Flame, 
  Award, 
  Sparkles, 
  Play, 
  Edit3, 
  Check, 
  Heart, 
  MessageSquare,
  Calendar,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BADGES } from '../data/initialData';

export const ProfileView: React.FC = () => {
  const { currentUser, submissions, setSelectedSubmission, setCurrentUser, setActiveTab } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name || '');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [softwareText, setSoftwareText] = useState(currentUser?.softwareUsed.join(', ') || 'Blender, Maya');

  if (!currentUser) {
    return (
      <div className="py-20 text-center space-y-5 max-w-md mx-auto px-4">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
          <UserIcon className="w-7 h-7" />
        </div>
        <div className="space-y-2">
          <h2 className="font-display text-2xl font-bold text-white">Animator Profile</h2>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Sign in to view your animation stats, monthly challenge submissions, mentor reviews, software toolstack, and unlocked achievement badges.
          </p>
        </div>
        <div className="pt-2 flex items-center justify-center gap-3">
          <button
            onClick={() => setActiveTab('login')}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs transition-colors shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            Sign In to Account
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className="px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 font-semibold text-xs border border-neutral-700 transition-colors cursor-pointer"
          >
            Create Profile
          </button>
        </div>
      </div>
    );
  }

  const userSubs = submissions.filter(s => s.userId === currentUser.id);
  const userBadges = BADGES.filter(b => currentUser.badges.includes(b.id));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser = {
      ...currentUser,
      name,
      bio,
      softwareUsed: softwareText.split(',').map(s => s.trim()).filter(Boolean)
    };
    setCurrentUser(updatedUser);
    setIsEditing(false);
  };

  return (
    <div className="space-y-10 py-6 max-w-5xl mx-auto">
      {/* Profile Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-500/50 shadow-xl"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                  {currentUser.name}
                </h1>
                {currentUser.role === 'admin' && (
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                    Admin Mentor
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-400 max-w-xl">{currentUser.bio}</p>
              <div className="flex items-center gap-3 pt-1 text-[11px] text-neutral-500">
                <span>Member since {currentUser.joinedDate}</span>
                <span>•</span>
                <span>{currentUser.email}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5 text-amber-400" />
            <span>{isEditing ? 'Cancel Editing' : 'Edit Profile'}</span>
          </button>
        </div>

        {/* Edit Form */}
        {isEditing && (
          <form onSubmit={handleSaveProfile} className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4">
            <h3 className="font-display font-bold text-sm text-white">Update Animator Profile</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-400">Display Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-400">Primary Software (comma separated)</label>
                <input
                  type="text"
                  value={softwareText}
                  onChange={(e) => setSoftwareText(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-400">Bio & Animation Focus</label>
              <textarea
                rows={2}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <Check className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </form>
        )}

        {/* Software Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-neutral-800">
          <span className="text-xs text-neutral-500 font-semibold mr-1">Toolkit:</span>
          {currentUser.softwareUsed.map((soft, i) => (
            <span key={i} className="text-xs font-semibold px-3 py-1 rounded-lg bg-neutral-950 border border-neutral-800 text-amber-300">
              {soft}
            </span>
          ))}
        </div>
      </div>

      {/* Badges Section */}
      <div className="space-y-4">
        <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span>Earned Badges ({userBadges.length})</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {userBadges.map(badge => (
            <div key={badge.id} className={`p-4 rounded-xl border ${badge.color} space-y-1`}>
              <div className="text-2xl">{badge.icon}</div>
              <h4 className="font-bold text-xs text-white">{badge.name}</h4>
              <p className="text-[11px] text-neutral-400">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Submissions Reel */}
      <div className="space-y-4">
        <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-amber-400" />
          <span>Animation Portfolio ({userSubs.length})</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userSubs.map(sub => (
            <div
              key={sub.id}
              onClick={() => setSelectedSubmission(sub)}
              className="group p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 cursor-pointer transition-all space-y-3"
            >
              <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-950">
                <img src={sub.thumbnailUrl} alt={sub.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute inset-0 bg-neutral-950/40 group-hover:bg-neutral-950/20 flex items-center justify-center transition-colors">
                  <Play className="w-8 h-8 text-amber-400 fill-amber-400" />
                </div>
              </div>
              <div>
                <span className="text-[10px] font-mono text-amber-400 font-bold block">{sub.challengeMonthYear}</span>
                <h4 className="font-display font-bold text-sm text-white group-hover:text-amber-400 transition-colors">{sub.title}</h4>
              </div>
              <div className="flex items-center justify-between text-xs text-neutral-400 pt-2 border-t border-neutral-800">
                <span>{sub.software}</span>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-rose-400">
                    <Heart className="w-3 h-3 fill-rose-400" /> {sub.likesCount}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
