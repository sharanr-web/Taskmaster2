import { User, Challenge, Submission, BadgeInfo, TemplateDesignOption } from '../types';

export const TEMPLATE_DESIGNS: TemplateDesignOption[] = [
  {
    id: 'cinematic-dark',
    name: 'Cinematic Darkroom',
    tagline: 'Obsidian Canvas & Amber Gold Lighting',
    category: 'Film Studio & Feature VFX',
    isPopular: true,
    palette: {
      bg: '#0a0a0a',
      card: '#141414',
      accent: '#f59e0b',
      accentBg: 'rgba(245, 158, 11, 0.15)',
      text: '#fafafa',
      border: '#262626',
      name: 'Deep Obsidian & Amber Gold'
    },
    features: [
      'Pitch dark contrast optimized for video playback',
      'Filmstrip-inspired frame counter & timeline accents',
      'Warm amber/gold glowing highlights and badge accents',
      'Ideal for 3D character showreels and VFX breakdown'
    ],
    recommendedFor: 'Feature Animation, 3D Character Animators, VFX, Maya/Blender Showcase',
    previewGradient: 'from-amber-500/20 via-neutral-900 to-neutral-950'
  },
  {
    id: 'lightbox-clean',
    name: "2D Animator's Lightbox",
    tagline: 'Warm Paper Studio & Cobalt Ink',
    category: 'Traditional 2D & Hand-Drawn',
    palette: {
      bg: '#0f172a',
      card: '#1e293b',
      accent: '#38bdf8',
      accentBg: 'rgba(56, 189, 248, 0.15)',
      text: '#f8fafc',
      border: '#334155',
      name: 'Slate Blueprint & Sky Cyan'
    },
    features: [
      'Crisp blueprint and animation timing chart aesthetic',
      'High-legibility typography with drafting sheet grid cues',
      'Vibrant electric sky blue accents for buttons and tags',
      'Perfect for pencil tests, 2D animatics & Toon Boom reels'
    ],
    recommendedFor: '2D Hand-drawn animators, Storyboard artists, TVPaint / Toon Boom users',
    previewGradient: 'from-sky-500/20 via-slate-900 to-slate-950'
  },
  {
    id: 'neo-brutalist',
    name: 'Neo-Brutalist Motion Lab',
    tagline: 'High-Contrast Cyberpunk & Acid Accents',
    category: 'Experimental & Motion Graphics',
    palette: {
      bg: '#050505',
      card: '#121212',
      accent: '#84cc16',
      accentBg: 'rgba(132, 204, 22, 0.18)',
      text: '#ffffff',
      border: '#3f3f46',
      name: 'High-Voltage Onyx & Acid Lime'
    },
    features: [
      'Bold architectural framing with tactile card borders',
      'High-voltage acid lime & neon badges for instant energy',
      'Monospaced timing sheets & FPS data visualizers',
      'Built for kinetic typography, anime combat & indie games'
    ],
    recommendedFor: 'Motion Graphics, Anime / Action Keyframing, Indie Game Animators',
    previewGradient: 'from-lime-500/20 via-neutral-900 to-neutral-950'
  },
  {
    id: 'sunset-clay',
    name: 'Pixar Sunset Studio',
    tagline: 'Warm Terracotta, Coral & Soft Clay Radiance',
    category: 'Stylized 3D & Storytelling',
    palette: {
      bg: '#140e0c',
      card: '#201816',
      accent: '#fb923c',
      accentBg: 'rgba(251, 146, 60, 0.15)',
      text: '#fff7ed',
      border: '#3c2b27',
      name: 'Warm Clay & Sunset Coral'
    },
    features: [
      'Rich warm studio ambient glow simulating golden hour lighting',
      'Softened card surfaces and terracotta badge accents',
      'Inviting, friendly aesthetic crafted for character warmth',
      'Great for family animation, stylized claymation & shorts'
    ],
    recommendedFor: 'Character Animation, Stylized 3D (Pixar/DreamWorks style), Claymation',
    previewGradient: 'from-orange-500/20 via-stone-900 to-stone-950'
  },
  {
    id: 'monochrome-editorial',
    name: 'Monochrome Film Festival',
    tagline: 'Refined Swiss Minimalism & Crimson Accent',
    category: 'Editorial & International Film Festivals',
    palette: {
      bg: '#0d0d0d',
      card: '#171717',
      accent: '#f43f5e',
      accentBg: 'rgba(244, 63, 94, 0.15)',
      text: '#ffffff',
      border: '#2a2a2a',
      name: 'Editorial Black & Crimson Laurel'
    },
    features: [
      'Stark editorial typography inspired by festival programs',
      'Ultra-clean monochromatic card hierarchy with crimson accents',
      'Pristine negative space maximizing focus on video frame craft',
      'Ideal for award-winning festival shorts and director reels'
    ],
    recommendedFor: 'Film Festival Submissions, Art Directors, Studio Portfolios',
    previewGradient: 'from-rose-500/20 via-neutral-900 to-neutral-950'
  }
];


export const INITIAL_USERS: User[] = [
  {
    id: 'user-admin',
    name: 'Sharan Kumar',
    email: 'sharan.r@icat.ac.in',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    bio: 'Lead Animator & Taskmation Admin. 8+ years animating in Maya, Blender & 2D cut-out.',
    role: 'admin',
    streakMonths: 8,
    badges: ['admin', 'streak-6', 'staff-pick', 'top-mentor', 'challenge-10'],
    totalSubmissions: 12,
    staffPicksCount: 4,
    joinedDate: 'January 2026',
    softwareUsed: ['Blender', 'Autodesk Maya', 'Toon Boom Harmony']
  }
];

export const BADGES: BadgeInfo[] = [
  { id: 'first-submission', name: 'First Splash', icon: '🚀', description: 'Submitted your first monthly animation challenge', color: 'border-blue-500/30 bg-blue-500/10 text-blue-400' },
  { id: 'streak-6', name: '6-Month Streak', icon: '🔥', description: 'Consecutively submitted animations 6 months in a row', color: 'border-amber-500/30 bg-amber-500/10 text-amber-400' },
  { id: 'staff-pick', name: 'Taskmation Pick', icon: '🏆', description: 'Awarded Staff Pick of the Month by Admin Mentors', color: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400' },
  { id: 'top-creator', name: 'Top Creator', icon: '⭐', description: 'Reached top 5 animators on the global leaderboard', color: 'border-purple-500/30 bg-purple-500/10 text-purple-400' },
  { id: 'challenge-5', name: '5 Challenges', icon: '🎨', description: 'Completed 5 monthly challenge assignments', color: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' },
  { id: 'challenge-10', name: 'Veteran Animator', icon: '🎖️', description: 'Completed 10+ monthly animation challenges', color: 'border-rose-500/30 bg-rose-500/10 text-rose-400' },
  { id: 'top-mentor', name: 'Mentor Master', icon: '💡', description: 'Provided constructive grading and feedback to the community', color: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400' },
];

export const INITIAL_CHALLENGES: Challenge[] = [
  {
    id: 'challenge-august-2026',
    slug: 'august-2026-bouncing-ball',
    title: 'Animate a Bouncing Ball with Personality',
    month: 'August',
    year: 2026,
    monthYear: 'August 2026',
    theme: 'Foundations of Weight & Emotion',
    deadline: '2026-08-31T23:59:59',
    deadlineTimestamp: new Date('2026-08-31T23:59:59').getTime(),
    description: 'The foundation of all animation. But don’t just make a physics simulation—give your bouncing ball personality! Is it excited? Exhausted? Terrified of hitting the ground? Heavy like a cannonball or light like a ping pong ball?',
    durationRange: '5–10 seconds (24 fps)',
    requirements: [
      'Create a smooth, non-linear animation with clear keyframes.',
      'Showcase distinct Anticipation before the jump and Follow-through on landing.',
      'Incorporate squash & stretch while strictly preserving volume.',
      'Demonstrate believable timing, ease-in, and ease-out curves.',
      'Submit MP4 or WebM video before August 31, 2026 at 11:59 PM.'
    ],
    principlesFocus: [
      'Squash and Stretch',
      'Timing and Spacing',
      'Anticipation',
      'Arcs of Motion',
      'Staging & Appeal'
    ],
    referenceVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    referenceImages: [
      {
        title: 'Timing Chart & Spacing Curve',
        url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80'
      },
      {
        title: 'Squash & Volume Preservation Reference',
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80'
      }
    ],
    guidelinesSummary: 'Deliverable: Rendered video in MP4/WebM format (1080p 16:9 or 1:1, 24fps). Audio is optional but personality sounds or sync adds bonus appeal. Keep project files (.blend, .ma, .fla) ready for self-archive.',
    status: 'active',
    totalSubmissions: 217,
    allowedSoftware: ['Blender', 'Autodesk Maya', 'Toon Boom Harmony', 'After Effects', 'TVPaint', 'Cinema 4D', 'Procreate Dreams', 'Krita']
  },
  {
    id: 'challenge-july-2026',
    slug: 'july-2026-walk-cycle',
    title: 'Character Walk Cycle with Attitude',
    month: 'July',
    year: 2026,
    monthYear: 'July 2026',
    theme: 'Body Mechanics & Rhythm',
    deadline: '2026-07-31T23:59:59',
    deadlineTimestamp: new Date('2026-07-31T23:59:59').getTime(),
    description: 'Animate a 4-step or looping character walk cycle that clearly communicates the character’s emotional state (sneaky, joyful, exhausted, swagger, robotic). Focus on the passing position and hip weight shifts.',
    durationRange: '4–8 seconds (Looped)',
    requirements: [
      'Show clear Contact, Down, Passing, and Up positions.',
      'Add secondary motion in hair, cloth, or arms with proper drag.',
      'Maintain foot planting with zero foot-sliding glitches.'
    ],
    principlesFocus: [
      'Secondary Action',
      'Overlapping Action',
      'Weight & Balance',
      'Rhythm & Tempo'
    ],
    referenceVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    referenceImages: [
      {
        title: 'Standard 8-Frame Walk Cycle Breakdown',
        url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80'
      }
    ],
    guidelinesSummary: 'Deliverable: Looped 24fps animation. Minimum 2 full gait strides.',
    status: 'closed',
    totalSubmissions: 184,
    allowedSoftware: ['Blender', 'Autodesk Maya', 'Toon Boom Harmony', 'After Effects', 'TVPaint']
  },
  {
    id: 'challenge-june-2026',
    slug: 'june-2026-weight-shift',
    title: 'Heavy Object Lift & Throw',
    month: 'June',
    year: 2026,
    monthYear: 'June 2026',
    theme: 'Physical Weight & Power',
    deadline: '2026-06-30T23:59:59',
    deadlineTimestamp: new Date('2026-06-30T23:59:59').getTime(),
    description: 'A character encounters a heavy object (boulder, anvil, magical cube) and attempts to lift, struggle with, and fling it. Pay intense attention to center of gravity and strain.',
    durationRange: '6–12 seconds',
    requirements: [
      'Convincing buildup of physical tension and counter-balance.',
      'Clear release point with follow-through and recoil.',
      'Exaggerated yet believable momentum transfer.'
    ],
    principlesFocus: [
      'Exaggeration',
      'Solid Drawing/Posing',
      'Ease in / Ease out'
    ],
    referenceVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    referenceImages: [
      {
        title: 'Center of Mass and Counter-Pose Study',
        url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&auto=format&fit=crop&q=80'
      }
    ],
    guidelinesSummary: 'Deliverable: 24fps video. Strong focus on spine line of action.',
    status: 'closed',
    totalSubmissions: 162,
    allowedSoftware: ['Blender', 'Autodesk Maya', 'Cinema 4D', 'Toon Boom Harmony']
  }
];

export const INITIAL_SUBMISSIONS: Submission[] = [
  {
    id: 'sub-001',
    challengeId: 'challenge-august-2026',
    challengeTitle: 'Animate a Bouncing Ball with Personality',
    challengeMonthYear: 'August 2026',
    userId: 'user-rahul',
    userName: 'Rahul V.',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    userBio: 'Junior 3D Character Animator',
    title: 'The Hesitant Rubber Ball',
    description: 'A timid yellow rubber ball that hesitates before every bounce, gathers its courage with an exaggerated squat, and springs with joyful enthusiasm on the final rebound.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
    software: 'Blender 4.2',
    submittedAt: '2026-08-25T14:32:00Z',
    status: 'approved',
    isStaffPick: true,
    likesCount: 38,
    likedByUsers: ['user-sharan', 'user-priya', 'user-arjun'],
    durationSeconds: 7,
    fps: 24,
    feedback: {
      id: 'fb-001',
      submissionId: 'sub-001',
      mentorId: 'user-sharan',
      mentorName: 'Sharan Kumar',
      mentorRole: 'Lead Mentor',
      mentorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      timingScore: 9,
      spacingScore: 8,
      arcsScore: 9,
      creativityScore: 9,
      overallScore: 8.8,
      comment: 'Superb character appeal! Good anticipation and nice spacing on the takeoff. The ball could have slightly more squash on impact at frame 42. Try increasing the contrast between the first hesitant hop and the big leap.',
      createdAt: '2026-08-26T10:15:00Z',
      isPublished: true
    },
    comments: [
      {
        id: 'c-001',
        submissionId: 'sub-001',
        userId: 'user-priya',
        userName: 'Priya Sharma',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        comment: 'Love the little eye blink before the leap! The ease-in at the apex is so buttery smooth.',
        createdAt: '2026-08-25T16:20:00Z'
      },
      {
        id: 'c-002',
        submissionId: 'sub-001',
        userId: 'user-arjun',
        userName: 'Arjun Mehta',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        comment: 'The volume preservation in the squash is on point. Did you use a lattice or custom squash deformer?',
        createdAt: '2026-08-25T18:44:00Z'
      }
    ]
  },
  {
    id: 'sub-002',
    challengeId: 'challenge-august-2026',
    challengeTitle: 'Animate a Bouncing Ball with Personality',
    challengeMonthYear: 'August 2026',
    userId: 'user-priya',
    userName: 'Priya Sharma',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    userBio: '2D Hand-drawn Animator',
    title: 'Liquid Ink Drop Bounce',
    description: 'A 2D hand-drawn ink droplet that stretches into dynamic curved arcs, spatters tiny droplets on ground impact, and reforms with fluid surface tension.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    software: 'Toon Boom Harmony',
    submittedAt: '2026-08-26T09:12:00Z',
    status: 'approved',
    isStaffPick: true,
    likesCount: 52,
    likedByUsers: ['user-sharan', 'user-rahul', 'user-arjun', 'user-elena'],
    durationSeconds: 6,
    fps: 24,
    feedback: {
      id: 'fb-002',
      submissionId: 'sub-002',
      mentorId: 'user-sharan',
      mentorName: 'Sharan Kumar',
      mentorRole: 'Lead Mentor',
      mentorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      timingScore: 10,
      spacingScore: 9,
      arcsScore: 10,
      creativityScore: 10,
      overallScore: 9.7,
      comment: 'Masterclass in 2D liquid dynamics! The timing charts are impeccable. The trailing smear frames accentuate the velocity without feeling broken.',
      createdAt: '2026-08-26T16:40:00Z',
      isPublished: true
    },
    comments: [
      {
        id: 'c-003',
        submissionId: 'sub-002',
        userId: 'user-rahul',
        userName: 'Rahul V.',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        comment: 'This is gorgeous Priya! Those smear frames are so inspiring.',
        createdAt: '2026-08-26T11:00:00Z'
      }
    ]
  },
  {
    id: 'sub-003',
    challengeId: 'challenge-august-2026',
    challengeTitle: 'Animate a Bouncing Ball with Personality',
    challengeMonthYear: 'August 2026',
    userId: 'user-arjun',
    userName: 'Arjun Mehta',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    userBio: 'Maya & Unreal Animator',
    title: 'Cyberpunk Drone Ball Overheat',
    description: 'A robotic recon sphere that bounces like a pinball between neon obstacles, venting steam at high impact points and grinding to an exhausted halt.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80',
    software: 'Autodesk Maya 2025',
    submittedAt: '2026-08-27T18:05:00Z',
    status: 'approved',
    isStaffPick: false,
    likesCount: 29,
    likedByUsers: ['user-rahul', 'user-priya'],
    durationSeconds: 8,
    fps: 24,
    feedback: {
      id: 'fb-003',
      submissionId: 'sub-003',
      mentorId: 'user-sharan',
      mentorName: 'Sharan Kumar',
      mentorRole: 'Lead Mentor',
      mentorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      timingScore: 8,
      spacingScore: 8,
      arcsScore: 7,
      creativityScore: 9,
      overallScore: 8.0,
      comment: 'Very creative sci-fi twist! Strong mechanical rhythm. Watch the bounce arc on frame 74—it straightens out slightly before contacting the wall. Keep the parabolas clean.',
      createdAt: '2026-08-28T09:30:00Z',
      isPublished: true
    },
    comments: [
      {
        id: 'c-004',
        submissionId: 'sub-003',
        userId: 'user-elena',
        userName: 'Elena Rostova',
        userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
        comment: 'The camera shake right on impact gives it insane punch!',
        createdAt: '2026-08-27T20:10:00Z'
      }
    ]
  },
  {
    id: 'sub-004',
    challengeId: 'challenge-august-2026',
    challengeTitle: 'Animate a Bouncing Ball with Personality',
    challengeMonthYear: 'August 2026',
    userId: 'user-elena',
    userName: 'Elena Rostova',
    userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    userBio: 'Motion Designer',
    title: 'Iridescent Jelly Blob',
    description: 'A translucent gelatinous orb that ripples with secondary jelly jiggle waves after every soft thud.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&auto=format&fit=crop&q=80',
    software: 'Cinema 4D + Redshift',
    submittedAt: '2026-08-28T11:45:00Z',
    status: 'approved',
    isStaffPick: false,
    likesCount: 22,
    likedByUsers: ['user-priya', 'user-sharan'],
    durationSeconds: 5,
    fps: 24,
    feedback: {
      id: 'fb-004',
      submissionId: 'sub-004',
      mentorId: 'user-sharan',
      mentorName: 'Sharan Kumar',
      mentorRole: 'Lead Mentor',
      mentorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      timingScore: 8,
      spacingScore: 9,
      arcsScore: 8,
      creativityScore: 9,
      overallScore: 8.5,
      comment: 'The overlapping jiggle dissipation is super satisfying. Consider holding the squashed frame 1 frame longer for an even squishier feel.',
      createdAt: '2026-08-28T15:00:00Z',
      isPublished: true
    },
    comments: []
  },
  {
    id: 'sub-005-pending',
    challengeId: 'challenge-august-2026',
    challengeTitle: 'Animate a Bouncing Ball with Personality',
    challengeMonthYear: 'August 2026',
    userId: 'user-rahul',
    userName: 'Rahul V.',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    title: 'Heavy Lead Bowling Ball vs Ping Pong',
    description: 'Dual ball contrast study: a heavy lead ball that drops with zero bounce and cracks the floorboards, next to an erratic ping-pong ball that ricochets endlessly.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
    software: 'Blender 4.2',
    submittedAt: '2026-08-28T22:10:00Z',
    status: 'pending',
    isStaffPick: false,
    likesCount: 4,
    likedByUsers: [],
    durationSeconds: 9,
    fps: 24,
    comments: []
  },
  {
    id: 'sub-006-pending-2',
    challengeId: 'challenge-august-2026',
    challengeTitle: 'Animate a Bouncing Ball with Personality',
    challengeMonthYear: 'August 2026',
    userId: 'user-arjun',
    userName: 'Arjun Mehta',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    title: 'Anti-Gravity Magnetic Sphere',
    description: 'Experimenting with inverted gravity deceleration and sudden downward snap impulse.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    software: 'Autodesk Maya 2025',
    submittedAt: '2026-08-28T22:45:00Z',
    status: 'pending',
    isStaffPick: false,
    likesCount: 2,
    likedByUsers: [],
    durationSeconds: 6,
    fps: 24,
    comments: []
  }
];

