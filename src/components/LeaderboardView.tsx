import React from 'react';
import { Trophy, Flame, Award, Star, Medal, ArrowUpRight, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LeaderboardView: React.FC = () => {
  const { users, submissions, setSelectedSubmission, setActiveTab, switchUser } = useApp();

  // Calculate points for each user based on submissions, mentor scores, likes, and staff picks
  const rankedUsers = [...users].map(user => {
    const userSubs = submissions.filter(s => s.userId === user.id);
    const staffPicks = userSubs.filter(s => s.isStaffPick).length;
    const totalLikes = userSubs.reduce((sum, s) => sum + s.likesCount, 0);
    const avgScore = userSubs.length > 0 
      ? userSubs.reduce((sum, s) => sum + (s.feedback?.overallScore || 7.5), 0) / userSubs.length
      : 7.5;
    
    // Points formula
    const points = Math.round((user.streakMonths * 10) + (staffPicks * 15) + (totalLikes * 2) + (avgScore * 5));

    return {
      ...user,
      points,
      staffPicksCount: staffPicks,
      totalLikes,
      avgScore: avgScore.toFixed(1),
      subsCount: userSubs.length
    };
  }).sort((a, b) => b.points - a.points);

  return (
    <div className="space-y-8 py-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
          <Trophy className="w-3.5 h-3.5" />
          <span>Global Community Standings</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
          Top Animators Leaderboard
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto">
          Points are earned by completing monthly challenges, maintaining submission streaks, receiving high mentor ratings, and earning Staff Picks.
        </p>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        {rankedUsers.slice(0, 3).map((user, idx) => {
          const rankColors = [
            'border-amber-400/60 bg-gradient-to-b from-amber-500/15 via-neutral-900 to-neutral-950',
            'border-slate-400/40 bg-gradient-to-b from-slate-400/10 via-neutral-900 to-neutral-950',
            'border-amber-700/40 bg-gradient-to-b from-amber-700/10 via-neutral-900 to-neutral-950'
          ];
          const medals = ['🥇 1st Place', '🥈 2nd Place', '🥉 3rd Place'];

          return (
            <div 
              key={user.id} 
              className={`p-6 rounded-2xl border ${rankColors[idx]} text-center space-y-3 relative shadow-xl`}
            >
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-300 font-mono">
                {medals[idx]}
              </span>

              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-16 h-16 rounded-full object-cover mx-auto border-2 border-amber-400 shadow-lg"
              />

              <div>
                <h3 className="font-display font-bold text-base text-white">{user.name}</h3>
                <p className="text-[11px] text-neutral-400">{user.softwareUsed.join(', ')}</p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2 text-xs border-t border-neutral-800 font-mono-num">
                <span className="text-amber-400 font-bold flex items-center gap-0.5">
                  <Flame className="w-3.5 h-3.5 fill-amber-400" /> {user.streakMonths}m streak
                </span>
                <span className="text-white font-extrabold">
                  {user.points} pts
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Leaderboard Table */}
      <div className="rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-950 text-neutral-400 uppercase font-bold border-b border-neutral-800">
              <tr>
                <th className="p-4">Rank</th>
                <th className="p-4">Animator</th>
                <th className="p-4">Streak</th>
                <th className="p-4">Staff Picks</th>
                <th className="p-4">Avg Score</th>
                <th className="p-4">Total Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 font-mono-num">
              {rankedUsers.map((user, idx) => (
                <tr key={user.id} className="hover:bg-neutral-800/40 transition-colors">
                  <td className="p-4 font-bold text-neutral-400 text-sm">#{idx + 1}</td>
                  <td className="p-4 font-sans font-bold text-white flex items-center gap-2.5">
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <span className="block text-xs text-white">{user.name}</span>
                      <span className="block text-[10px] text-neutral-400 font-normal">{user.bio.slice(0, 35)}...</span>
                    </div>
                  </td>
                  <td className="p-4 text-amber-400 font-bold">
                    <span className="flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 fill-amber-400" /> {user.streakMonths} Mo
                    </span>
                  </td>
                  <td className="p-4 text-neutral-300">
                    {user.staffPicksCount > 0 ? (
                      <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-bold border border-amber-500/20">
                        🏆 {user.staffPicksCount}
                      </span>
                    ) : '—'}
                  </td>
                  <td className="p-4 text-amber-400 font-bold">⭐ {user.avgScore}</td>
                  <td className="p-4 text-sm font-extrabold text-white">{user.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
