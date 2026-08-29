export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  avatar: string;
  bio: string;
  role: UserRole;
  streakMonths: number;
  badges: string[];
  totalSubmissions: number;
  staffPicksCount: number;
  joinedDate: string;
  softwareUsed: string[];
  portfolioUrl?: string;
  experienceLevel?: string;
}

export interface Challenge {
  id: string;
  slug: string;
  title: string;
  month: string;
  year: number;
  monthYear: string;
  theme: string;
  deadline: string; // ISO or date string
  deadlineTimestamp: number;
  description: string;
  durationRange: string;
  requirements: string[];
  principlesFocus: string[];
  referenceVideoUrl: string;
  referenceImages: { title: string; url: string }[];
  guidelinesSummary: string;
  status: 'active' | 'closed' | 'upcoming';
  totalSubmissions: number;
  allowedSoftware: string[];
}

export interface MentorFeedback {
  id: string;
  submissionId: string;
  mentorId: string;
  mentorName: string;
  mentorRole: string;
  mentorAvatar: string;
  timingScore: number; // 1-10
  spacingScore: number; // 1-10
  arcsScore: number; // 1-10
  creativityScore: number; // 1-10
  overallScore: number; // 1-10
  comment: string;
  createdAt: string;
  isPublished: boolean;
}

export interface Comment {
  id: string;
  submissionId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  comment: string;
  createdAt: string;
}

export type SubmissionStatus = 'pending' | 'approved' | 'rejected';

export interface Submission {
  id: string;
  challengeId: string;
  challengeTitle: string;
  challengeMonthYear: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userBio?: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  software: string;
  submittedAt: string;
  status: SubmissionStatus;
  isStaffPick: boolean;
  likesCount: number;
  likedByUsers: string[];
  comments: Comment[];
  feedback?: MentorFeedback;
  durationSeconds?: number;
  fps?: number;
}

export interface BadgeInfo {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}

export type TemplateTheme = 
  | 'cinematic-dark'
  | 'lightbox-clean'
  | 'neo-brutalist'
  | 'sunset-clay'
  | 'monochrome-editorial';

export interface TemplateDesignOption {
  id: TemplateTheme;
  name: string;
  tagline: string;
  category: string;
  palette: {
    bg: string;
    card: string;
    accent: string;
    accentBg: string;
    text: string;
    border: string;
    name: string;
  };
  features: string[];
  recommendedFor: string;
  previewGradient: string;
  isPopular?: boolean;
}

export type NavigationTab = 
  | 'home'
  | 'challenge'
  | 'gallery'
  | 'dashboard'
  | 'submit'
  | 'admin'
  | 'profile'
  | 'leaderboard'
  | 'login'
  | 'signup';

