import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  Challenge, 
  Submission, 
  MentorFeedback, 
  Comment, 
  NavigationTab,
  SubmissionStatus,
  TemplateTheme
} from '../types';
import { 
  INITIAL_USERS, 
  INITIAL_CHALLENGES, 
  INITIAL_SUBMISSIONS,
  TEMPLATE_DESIGNS
} from '../data/initialData';

export const ADMIN_EMAIL = 'sharan.r@icat.ac.in';

interface AppContextType {
  currentUser: User | null;
  users: User[];
  challenges: Challenge[];
  submissions: Submission[];
  activeTab: NavigationTab;
  currentTheme: TemplateTheme;
  selectedSubmission: Submission | null;
  isAuthModalOpen: boolean;
  isSupabaseModalOpen: boolean;
  isTemplateModalOpen: boolean;
  selectedChallengeId: string;
  searchQuery: string;
  selectedMonthFilter: string;
  selectedSoftwareFilter: string;
  
  // Actions
  setActiveTab: (tab: NavigationTab) => void;
  setCurrentTheme: (theme: TemplateTheme) => void;
  setCurrentUser: (user: User | null) => void;
  loginWithEmail: (email: string, password?: string) => { success: boolean; message?: string; user?: User };
  registerUser: (data: {
    name: string;
    email: string;
    password?: string;
    role?: 'user' | 'admin';
    avatar?: string;
    bio?: string;
    softwareUsed?: string[];
    portfolioUrl?: string;
    experienceLevel?: string;
  }) => { success: boolean; message?: string; user?: User };
  loginWithGoogle: (email?: string, name?: string) => { success: boolean; user?: User };
  logout: () => void;
  
  setSelectedSubmission: (sub: Submission | null) => void;
  setIsAuthModalOpen: (open: boolean) => void;
  setIsSupabaseModalOpen: (open: boolean) => void;
  setIsTemplateModalOpen: (open: boolean) => void;
  setSelectedChallengeId: (id: string) => void;
  setSearchQuery: (query: string) => void;
  setSelectedMonthFilter: (month: string) => void;
  setSelectedSoftwareFilter: (software: string) => void;
  
  // Community Actions
  toggleLike: (submissionId: string) => void;
  addComment: (submissionId: string, text: string) => void;
  submitAnimation: (data: {
    challengeId: string;
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    software: string;
    durationSeconds?: number;
  }) => Submission;
  
  // Admin Actions
  saveMentorFeedback: (feedback: Omit<MentorFeedback, 'id' | 'createdAt'>) => void;
  updateSubmissionStatus: (submissionId: string, status: SubmissionStatus) => void;
  toggleStaffPick: (submissionId: string) => void;
  createChallenge: (newChallenge: Omit<Challenge, 'id' | 'totalSubmissions' | 'slug'>) => void;
  updateChallenge: (challengeId: string, updates: Partial<Challenge>) => void;
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'taskmation_state_v2';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from localStorage or initial
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_users`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        // fallback
      }
    }
    return INITIAL_USERS;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_currentUser`);
    if (saved && saved !== 'null' && saved !== 'undefined') {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [challenges, setChallenges] = useState<Challenge[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_challenges`);
    return saved ? JSON.parse(saved) : INITIAL_CHALLENGES;
  });

  const [submissions, setSubmissions] = useState<Submission[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_submissions`);
    return saved ? JSON.parse(saved) : INITIAL_SUBMISSIONS;
  });

  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [currentTheme, setCurrentTheme] = useState<TemplateTheme>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_theme`);
    return (saved as TemplateTheme) || 'cinematic-dark';
  });
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState<boolean>(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState<boolean>(false);
  const [selectedChallengeId, setSelectedChallengeId] = useState<string>('challenge-august-2026');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMonthFilter, setSelectedMonthFilter] = useState<string>('All');
  const [selectedSoftwareFilter, setSelectedSoftwareFilter] = useState<string>('All');

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_theme`, currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_users`, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_currentUser`, JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_challenges`, JSON.stringify(challenges));
  }, [challenges]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_submissions`, JSON.stringify(submissions));
  }, [submissions]);

  // Keep selectedSubmission up to date when submissions array updates
  useEffect(() => {
    if (selectedSubmission) {
      const updated = submissions.find(s => s.id === selectedSubmission.id);
      if (updated) {
        setSelectedSubmission(updated);
      }
    }
  }, [submissions]);

  const loginWithEmail = (email: string, password?: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const isAdmin = cleanEmail === ADMIN_EMAIL.toLowerCase();

    const existing = users.find(u => u.email.toLowerCase() === cleanEmail);

    if (existing) {
      // If user has a password set, verify if password provided
      if (existing.password && password && existing.password !== password) {
        return { success: false, message: 'Incorrect password. Please try again.' };
      }
      
      // Ensure admin role if matching admin email
      const verifiedUser: User = isAdmin ? { ...existing, role: 'admin' } : existing;
      if (isAdmin && existing.role !== 'admin') {
        setUsers(prev => prev.map(u => u.id === existing.id ? verifiedUser : u));
      }

      setCurrentUser(verifiedUser);
      setIsAuthModalOpen(false);
      return { success: true, user: verifiedUser };
    }

    // If user entered admin email but not in list yet, create official Admin user
    if (isAdmin) {
      const adminUser: User = {
        id: 'user-admin',
        name: 'Sharan Kumar',
        email: ADMIN_EMAIL,
        password: password || 'admin123',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        bio: 'Lead Animator & Taskmation Admin. 8+ years animating in Maya, Blender & 2D cut-out.',
        role: 'admin',
        streakMonths: 8,
        badges: ['admin', 'streak-6', 'staff-pick', 'top-mentor', 'challenge-10'],
        totalSubmissions: 12,
        staffPicksCount: 4,
        joinedDate: 'January 2026',
        softwareUsed: ['Blender', 'Autodesk Maya', 'Toon Boom Harmony']
      };
      setUsers(prev => [adminUser, ...prev.filter(u => u.email.toLowerCase() !== ADMIN_EMAIL.toLowerCase())]);
      setCurrentUser(adminUser);
      setIsAuthModalOpen(false);
      return { success: true, user: adminUser };
    }

    return { 
      success: false, 
      message: 'No account found with this email address. Please create a new animator account first.' 
    };
  };

  const registerUser = (data: {
    name: string;
    email: string;
    password?: string;
    role?: 'user' | 'admin';
    avatar?: string;
    bio?: string;
    softwareUsed?: string[];
    portfolioUrl?: string;
    experienceLevel?: string;
  }) => {
    const cleanEmail = data.email.trim().toLowerCase();
    const existing = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      return { success: false, message: 'An account with this email address already exists. Please sign in instead.' };
    }

    const isAdmin = cleanEmail === ADMIN_EMAIL.toLowerCase();

    const defaultAvatars = [
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=150&auto=format&fit=crop&q=80'
    ];

    const newUser: User = {
      id: isAdmin ? 'user-admin' : `user-${Date.now()}`,
      name: data.name.trim() || (isAdmin ? 'Sharan Kumar' : 'New Animator'),
      email: cleanEmail,
      password: data.password || 'password123',
      avatar: data.avatar || defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)],
      bio: data.bio?.trim() || (isAdmin ? 'Lead Animator & Taskmation Admin.' : 'Passionate Animator exploring movement, physics, and storytelling.'),
      role: isAdmin ? 'admin' : (data.role || 'user'),
      streakMonths: isAdmin ? 8 : 1,
      badges: isAdmin ? ['admin', 'top-mentor'] : ['first-submission', 'community-builder'],
      totalSubmissions: 0,
      staffPicksCount: 0,
      joinedDate: 'August 2026',
      softwareUsed: data.softwareUsed && data.softwareUsed.length > 0 ? data.softwareUsed : ['Blender'],
      portfolioUrl: data.portfolioUrl?.trim(),
      experienceLevel: data.experienceLevel || 'Beginner'
    };

    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    setIsAuthModalOpen(false);
    return { success: true, user: newUser };
  };

  const loginWithGoogle = (email?: string, name?: string) => {
    const targetEmail = email || ADMIN_EMAIL;
    const targetName = name || (targetEmail === ADMIN_EMAIL ? 'Sharan Kumar' : targetEmail.split('@')[0]);

    const result = loginWithEmail(targetEmail);
    if (result.success && result.user) {
      return { success: true, user: result.user };
    } else {
      return registerUser({
        name: targetName,
        email: targetEmail,
        password: 'google-oauth-auth'
      });
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const toggleLike = (submissionId: string) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }

    setSubmissions(prev => prev.map(sub => {
      if (sub.id !== submissionId) return sub;
      const alreadyLiked = sub.likedByUsers.includes(currentUser.id);
      const updatedLikedBy = alreadyLiked 
        ? sub.likedByUsers.filter(id => id !== currentUser.id)
        : [...sub.likedByUsers, currentUser.id];
      
      return {
        ...sub,
        likesCount: updatedLikedBy.length,
        likedByUsers: updatedLikedBy
      };
    }));
  };

  const addComment = (submissionId: string, text: string) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      submissionId,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      comment: text,
      createdAt: new Date().toISOString()
    };

    setSubmissions(prev => prev.map(sub => {
      if (sub.id !== submissionId) return sub;
      return {
        ...sub,
        comments: [...sub.comments, newComment]
      };
    }));
  };

  const submitAnimation = (data: {
    challengeId: string;
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    software: string;
    durationSeconds?: number;
  }): Submission => {
    const user = currentUser || users[0];
    const targetChallenge = challenges.find(c => c.id === data.challengeId) || challenges[0];

    const newSub: Submission = {
      id: `sub-${Date.now()}`,
      challengeId: targetChallenge.id,
      challengeTitle: targetChallenge.title,
      challengeMonthYear: targetChallenge.monthYear,
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      userBio: user.bio,
      title: data.title,
      description: data.description,
      videoUrl: data.videoUrl,
      thumbnailUrl: data.thumbnailUrl || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
      software: data.software,
      submittedAt: new Date().toISOString(),
      status: 'pending', // Goes to admin review
      isStaffPick: false,
      likesCount: 1,
      likedByUsers: [user.id],
      comments: [],
      durationSeconds: data.durationSeconds || 7,
      fps: 24
    };

    setSubmissions(prev => [newSub, ...prev]);

    // Increment user submission count and challenge count
    setUsers(prev => prev.map(u => {
      if (u.id === user.id) {
        return {
          ...u,
          totalSubmissions: u.totalSubmissions + 1,
          streakMonths: Math.max(u.streakMonths, 1)
        };
      }
      return u;
    }));

    setChallenges(prev => prev.map(c => {
      if (c.id === targetChallenge.id) {
        return {
          ...c,
          totalSubmissions: c.totalSubmissions + 1
        };
      }
      return c;
    }));

    return newSub;
  };

  const saveMentorFeedback = (feedbackData: Omit<MentorFeedback, 'id' | 'createdAt'>) => {
    const newFeedback: MentorFeedback = {
      ...feedbackData,
      id: `fb-${Date.now()}`,
      createdAt: new Date().toISOString(),
      isPublished: true
    };

    setSubmissions(prev => prev.map(sub => {
      if (sub.id !== feedbackData.submissionId) return sub;
      return {
        ...sub,
        feedback: newFeedback,
        status: 'approved' // Automatically approve when feedback is provided
      };
    }));
  };

  const updateSubmissionStatus = (submissionId: string, status: SubmissionStatus) => {
    setSubmissions(prev => prev.map(sub => {
      if (sub.id !== submissionId) return sub;
      return { ...sub, status };
    }));
  };

  const toggleStaffPick = (submissionId: string) => {
    setSubmissions(prev => prev.map(sub => {
      if (sub.id !== submissionId) return sub;
      const nextStaffPick = !sub.isStaffPick;
      return { ...sub, isStaffPick: nextStaffPick };
    }));
  };

  const createChallenge = (newChallengeData: Omit<Challenge, 'id' | 'totalSubmissions' | 'slug'>) => {
    const slug = `${newChallengeData.month.toLowerCase()}-${newChallengeData.year}-${newChallengeData.title.toLowerCase().replace(/\s+/g, '-')}`;
    const newChallenge: Challenge = {
      ...newChallengeData,
      id: `challenge-${Date.now()}`,
      slug,
      totalSubmissions: 0
    };
    setChallenges(prev => [newChallenge, ...prev]);
  };

  const updateChallenge = (challengeId: string, updates: Partial<Challenge>) => {
    setChallenges(prev => prev.map(c => {
      if (c.id === challengeId) {
        return { ...c, ...updates };
      }
      return c;
    }));
  };

  const resetAllData = () => {
    localStorage.removeItem(`${STORAGE_KEY}_users`);
    localStorage.removeItem(`${STORAGE_KEY}_currentUser`);
    localStorage.removeItem(`${STORAGE_KEY}_challenges`);
    localStorage.removeItem(`${STORAGE_KEY}_submissions`);
    setUsers(INITIAL_USERS);
    setCurrentUser(INITIAL_USERS[0]);
    setChallenges(INITIAL_CHALLENGES);
    setSubmissions(INITIAL_SUBMISSIONS);
    setActiveTab('home');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        challenges,
        submissions,
        activeTab,
        currentTheme,
        selectedSubmission,
        isAuthModalOpen,
        isSupabaseModalOpen,
        isTemplateModalOpen,
        selectedChallengeId,
        searchQuery,
        selectedMonthFilter,
        selectedSoftwareFilter,
        setActiveTab,
        setCurrentTheme,
        setCurrentUser,
        loginWithEmail,
        registerUser,
        loginWithGoogle,
        logout,
        setSelectedSubmission,
        setIsAuthModalOpen,
        setIsSupabaseModalOpen,
        setIsTemplateModalOpen,
        setSelectedChallengeId,
        setSearchQuery,
        setSelectedMonthFilter,
        setSelectedSoftwareFilter,
        toggleLike,
        addComment,
        submitAnimation,
        saveMentorFeedback,
        updateSubmissionStatus,
        toggleStaffPick,
        createChallenge,
        updateChallenge,
        resetAllData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
