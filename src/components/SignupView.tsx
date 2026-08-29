import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  User as UserIcon, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Check, 
  Sparkles, 
  Wrench, 
  Link as LinkIcon, 
  FileText, 
  ArrowLeft,
  AlertCircle,
  Film,
  Award,
  Layers
} from 'lucide-react';
import { UserRole } from '../types';

const AVATAR_PRESETS = [
  { id: 'av1', url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80', label: '3D Animator' },
  { id: 'av2', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80', label: '2D Artist' },
  { id: 'av3', url: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80', label: 'Keyframer' },
  { id: 'av4', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', label: 'Director' },
  { id: 'av5', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', label: 'Rigger' },
  { id: 'av6', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', label: 'Storyboarder' },
];

const SOFTWARE_OPTIONS = [
  'Blender',
  'Autodesk Maya',
  'Toon Boom Harmony',
  'TVPaint',
  'Krita',
  'Adobe Animate',
  'After Effects',
  'Cinema 4D',
  'Unreal Engine 5',
  'Dragonframe'
];

export const SignupView: React.FC = () => {
  const { registerUser, loginWithGoogle, setActiveTab } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<UserRole>('user');
  const [adminPasscode, setAdminPasscode] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_PRESETS[0].url);
  const [customAvatarUrl, setCustomAvatarUrl] = useState('');
  const [selectedSoftware, setSelectedSoftware] = useState<string[]>(['Blender']);
  const [experienceLevel, setExperienceLevel] = useState('Intermediate');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [bio, setBio] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleSoftware = (sw: string) => {
    setSelectedSoftware(prev => 
      prev.includes(sw) 
        ? prev.filter(item => item !== sw) 
        : [...prev, sw]
    );
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!name.trim()) {
      setErrorMessage('Please enter your full animator name or handle.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    if (!password || password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    if (role === 'admin' && adminPasscode.trim() !== 'MENTOR2026' && adminPasscode.trim() !== 'ADMIN') {
      setErrorMessage('Mentor / Admin registration requires the studio authorization code (try MENTOR2026 or leave role as Animator).');
      return;
    }

    if (!agreeTerms) {
      setErrorMessage('Please accept the Taskmation Animation Ethics & Community Rules.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const avatarFinal = customAvatarUrl.trim() || selectedAvatar;

      const result = registerUser({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        role: role,
        avatar: avatarFinal,
        bio: bio.trim() || 'Passionate Animator exploring movement, physics, and storytelling.',
        softwareUsed: selectedSoftware.length > 0 ? selectedSoftware : ['Blender'],
        portfolioUrl: portfolioUrl.trim(),
        experienceLevel: experienceLevel
      });

      if (result.success) {
        setSuccessMessage(`Account created successfully! Welcome to Taskmation, ${name}.`);
        setTimeout(() => {
          setActiveTab('profile');
        }, 800);
      } else {
        setErrorMessage(result.message || 'Registration failed.');
      }
    }, 500);
  };

  const handleGoogleSignup = () => {
    loginWithGoogle();
    setSuccessMessage('Signed up with Google account. Welcome aboard!');
    setTimeout(() => {
      setActiveTab('profile');
    }, 600);
  };

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col justify-center">
      {/* Navigation Breadcrumb */}
      <div className="mb-6">
        <button
          onClick={() => setActiveTab('home')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-amber-400 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Comprehensive Registration Form */}
        <div className="lg:col-span-8 bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-sm">
          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-neutral-950 font-black font-mono shadow-lg shadow-amber-500/20">
                TM
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-neutral-100 tracking-tight">
                  Create Your Animator Profile
                </h1>
                <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
                  Join hundreds of animators competing in monthly challenges with mentor reviews
                </p>
              </div>
            </div>

            {/* Error / Success Notifications */}
            {errorMessage && (
              <div className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2.5 text-red-400 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="mb-5 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2.5 text-emerald-400 text-xs">
                <Check className="w-4 h-4 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Quick Google Sign Up */}
            <button
              type="button"
              id="google-signup-btn"
              onClick={handleGoogleSignup}
              className="w-full py-3 px-4 rounded-xl bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 text-xs sm:text-sm font-semibold flex items-center justify-center gap-3 transition-all cursor-pointer shadow-sm hover:border-neutral-600 mb-6"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12 0 14.8s.7 5.1 1.9 7.5l3.7-2.9z"
                />
                <path
                  fill="#34A853"
                  d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16.5C3.7 20.2 7.5 23.5 12 23.5z"
                />
              </svg>
              <span>Quick Sign Up with Google</span>
            </button>

            <div className="relative flex items-center justify-center mb-6">
              <div className="w-full border-t border-neutral-800" />
              <span className="bg-neutral-900 px-3 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider relative">
                Or fill out animator registration
              </span>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSignup} className="space-y-6">
              {/* Section 1: Basic Credentials */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-2">
                  <UserIcon className="w-4 h-4 text-amber-400" />
                  1. Account & Security
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Full Name / Artist Handle *
                    </label>
                    <div className="relative">
                      <UserIcon className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        id="signup-name-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Maya Lin"
                        required
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-950/80 border border-neutral-700/80 text-neutral-100 text-xs sm:text-sm placeholder:text-neutral-500 focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        id="signup-email-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="animator@studio.com"
                        required
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-950/80 border border-neutral-700/80 text-neutral-100 text-xs sm:text-sm placeholder:text-neutral-500 focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Create Password *
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="signup-password-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Min. 6 characters"
                        required
                        minLength={6}
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-neutral-950/80 border border-neutral-700/80 text-neutral-100 text-xs sm:text-sm placeholder:text-neutral-500 focus:outline-none focus:border-amber-500 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-200"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="signup-confirm-password-input"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Repeat your password"
                        required
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-950/80 border border-neutral-700/80 text-neutral-100 text-xs sm:text-sm placeholder:text-neutral-500 focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Animator Role & Experience */}
              <div className="space-y-4 pt-2 border-t border-neutral-800">
                <h3 className="text-xs font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  2. Animation Profile & Role
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Account Type / Role
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value as UserRole)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950/80 border border-neutral-700/80 text-neutral-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
                    >
                      <option value="user">Community Animator / Student</option>
                      <option value="admin">Instructor / Studio Mentor (Requires Code)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Experience Level
                    </label>
                    <select
                      value={experienceLevel}
                      onChange={(e) => setExperienceLevel(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950/80 border border-neutral-700/80 text-neutral-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
                    >
                      <option value="Beginner">Beginner (Learning Animation Principles)</option>
                      <option value="Intermediate">Intermediate (Comfortable with Keyframing & Curves)</option>
                      <option value="Advanced">Advanced (Studio Professional / Senior)</option>
                    </select>
                  </div>
                </div>

                {role === 'admin' && (
                  <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                    <label className="block text-xs font-semibold text-amber-300">
                      Studio Mentor Passcode
                    </label>
                    <input
                      type="password"
                      value={adminPasscode}
                      onChange={(e) => setAdminPasscode(e.target.value)}
                      placeholder="Enter MENTOR2026 for demo verification"
                      className="w-full px-3.5 py-2 rounded-lg bg-neutral-950 border border-amber-500/40 text-neutral-100 text-xs focus:outline-none"
                    />
                    <p className="text-[11px] text-neutral-400">
                      Passcode grants mentor grading permissions and challenge publishing authority.
                    </p>
                  </div>
                )}
              </div>

              {/* Section 3: Avatar Selection */}
              <div className="space-y-3 pt-2 border-t border-neutral-800">
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider">
                  3. Select Profile Avatar
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  {AVATAR_PRESETS.map((preset) => {
                    const isSelected = selectedAvatar === preset.url && !customAvatarUrl;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => {
                          setSelectedAvatar(preset.url);
                          setCustomAvatarUrl('');
                        }}
                        className={`relative rounded-full p-0.5 transition-all cursor-pointer ${
                          isSelected ? 'ring-2 ring-amber-500 scale-110' : 'opacity-70 hover:opacity-100'
                        }`}
                        title={preset.label}
                      >
                        <img
                          src={preset.url}
                          alt={preset.label}
                          referrerPolicy="no-referrer"
                          className="w-11 h-11 rounded-full object-cover"
                        />
                        {isSelected && (
                          <div className="absolute -bottom-1 -right-1 bg-amber-500 text-neutral-950 rounded-full p-0.5 shadow">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-2">
                  <input
                    type="url"
                    value={customAvatarUrl}
                    onChange={(e) => setCustomAvatarUrl(e.target.value)}
                    placeholder="Or paste custom image URL (optional)"
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-950/60 border border-neutral-800 text-neutral-200 text-xs placeholder:text-neutral-600 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Section 4: Primary Animation Software */}
              <div className="space-y-3 pt-2 border-t border-neutral-800">
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-amber-400" />
                  4. Animation Tools You Use (Select all that apply)
                </label>
                <div className="flex flex-wrap gap-2">
                  {SOFTWARE_OPTIONS.map((sw) => {
                    const isSelected = selectedSoftware.includes(sw);
                    return (
                      <button
                        key={sw}
                        type="button"
                        onClick={() => toggleSoftware(sw)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                            : 'bg-neutral-950/80 text-neutral-400 border border-neutral-800 hover:border-neutral-700'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                        <span>{sw}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Section 5: Showreel / Portfolio & Bio */}
              <div className="space-y-4 pt-2 border-t border-neutral-800">
                <h3 className="text-xs font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-400" />
                  5. Portfolio & Short Bio
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Showreel or Portfolio URL (YouTube, Vimeo, ArtStation)
                  </label>
                  <div className="relative">
                    <LinkIcon className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      value={portfolioUrl}
                      onChange={(e) => setPortfolioUrl(e.target.value)}
                      placeholder="https://artstation.com/your-reel or https://vimeo.com/..."
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-950/80 border border-neutral-700/80 text-neutral-100 text-xs sm:text-sm placeholder:text-neutral-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Artist Statement / Bio
                  </label>
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell other animators about your animation goals, favorite styles, or current focus..."
                    className="w-full p-3 rounded-xl bg-neutral-950/80 border border-neutral-700/80 text-neutral-100 text-xs sm:text-sm placeholder:text-neutral-500 focus:outline-none focus:border-amber-500 resize-none"
                  />
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-4 h-4 rounded bg-neutral-950 border-neutral-700 text-amber-500 focus:ring-amber-500 mt-0.5"
                  />
                  <span className="text-xs text-neutral-400 leading-relaxed">
                    I agree to the <strong>Taskmation Community Guidelines</strong>: All challenge submissions must be original work created by me, and I pledge to offer constructive, positive critique to fellow animators.
                  </span>
                </label>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                id="signup-submit-btn"
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-neutral-950 font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                    <span>Creating Animator Profile...</span>
                  </>
                ) : (
                  <>
                    <span>Complete Registration & Launch Studio</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Login Navigation Link */}
            <div className="mt-8 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-neutral-400">Already registered on Taskmation?</span>
              <button
                onClick={() => setActiveTab('login')}
                className="font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
              >
                <span>Sign In to Existing Account</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Why Join Taskmation */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h2 className="text-sm font-bold text-neutral-200 uppercase tracking-wider">
                Why Animators Love Taskmation
              </h2>
            </div>
            
            <div className="space-y-4 text-xs text-neutral-300">
              <div className="p-3.5 rounded-2xl bg-neutral-950/70 border border-neutral-800">
                <div className="font-bold text-neutral-100 mb-1 flex items-center gap-1.5">
                  <Film className="w-4 h-4 text-amber-400" />
                  Structured Monthly Prompts
                </div>
                <p className="text-neutral-400 text-[11px]">
                  No more animator's block. Practice core mechanics with curated themes and reference video breakdowns.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-neutral-950/70 border border-neutral-800">
                <div className="font-bold text-neutral-100 mb-1 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-emerald-400" />
                  Direct Mentor Rubric Grading
                </div>
                <p className="text-neutral-400 text-[11px]">
                  Receive detailed feedback on anticipation, timing charts, squash & stretch from experienced animation mentors.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-neutral-950/70 border border-neutral-800">
                <div className="font-bold text-neutral-100 mb-1 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-sky-400" />
                  Showcase Your Growth
                </div>
                <p className="text-neutral-400 text-[11px]">
                  Build a public archive of your progression, streak badges, and staff picks to share with studios.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-neutral-900/40 border border-neutral-800 text-center space-y-3">
            <p className="text-xs text-neutral-400">
              Need immediate access for grading or reviewing?
            </p>
            <button
              onClick={() => setActiveTab('login')}
              className="w-full py-2 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-200 border border-neutral-700 transition-colors"
            >
              Use 1-Click Demo Accounts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
