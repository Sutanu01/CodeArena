"use client";
import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Award, Users, Target, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { Navbar } from '@/components/navbar';

interface LeaderboardUser {
  username: string;
  avatar: string;
  total_matches: number;
  total_wins: number;
}

interface LeaderboardData {
  leaderboard: LeaderboardUser[];
  totalUsers: number;
  totalPages: number;
  currentPage: number;
}

const Leaderboard = () => {
  const [data, setData] = useState<LeaderboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  // Mock data for demonstration
  const mockData: LeaderboardData = {
    leaderboard: [
      { username: "BigBoiBlastoise", avatar: "👨‍💻", total_matches: 156, total_wins: 142 },
      { username: "JhonnySilverhand", avatar: "👩‍💻", total_matches: 134, total_wins: 125 },
      { username: "JinSakai", avatar: "🐍", total_matches: 128, total_wins: 118 },
      { username: "Mbappu", avatar: "⚛️", total_matches: 119, total_wins: 108 },
      { username: "Pessi", avatar: "☕", total_matches: 115, total_wins: 103 },
      { username: "penaldo", avatar: "🔧", total_matches: 112, total_wins: 98 },
      { username: "WizardLiz idk", avatar: "✨", total_matches: 108, total_wins: 95 },
      { username: "Satu op", avatar: "📊", total_matches: 105, total_wins: 92 },
      { username: "Maliketh", avatar: "🚀", total_matches: 102, total_wins: 89 },
      { username: "BTss", avatar: "💻", total_matches: 98, total_wins: 85 },
      { username: "Pessis", avatar: "☕", total_matches: 115, total_wins: 103 },
      { username: "penaldos", avatar: "🔧", total_matches: 112, total_wins: 98 },
      { username: "WizardLiz idks", avatar: "✨", total_matches: 108, total_wins: 95 },
      { username: "Satu ops", avatar: "📊", total_matches: 105, total_wins: 92 },
      { username: "Malikeths", avatar: "🚀", total_matches: 102, total_wins: 89 },
      { username: "BTsss", avatar: "💻", total_matches: 98, total_wins: 85 },
      { username: "Pessiss", avatar: "☕", total_matches: 115, total_wins: 103 },
      { username: "penaldoss", avatar: "🔧", total_matches: 112, total_wins: 98 },
      { username: "WizardLiz idkss", avatar: "✨", total_matches: 108, total_wins: 95 },
      { username: "Satu opss", avatar: "📊", total_matches: 105, total_wins: 92 },
      { username: "Malikethss", avatar: "🚀", total_matches: 102, total_wins: 89 },
      { username: "BTssss", avatar: "💻", total_matches: 98, total_wins: 85 }
    ],
    totalUsers: 1247,
    totalPages: 25,
    currentPage: 1
  };

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        // Replace with actual API call
        // const response = await fetch(`/api/leaderboard?page=${currentPage}&limit=50`);
        // const result = await response.json();
        await new Promise(resolve => setTimeout(resolve, 1000));
        setData(mockData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch leaderboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [currentPage]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />;
      case 3:
        return <Award className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />;
      default:
        return <span className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-xs font-bold text-gray-500 dark:text-gray-400">#{rank}</span>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
      case 3:
        return 'bg-gradient-to-r from-amber-400 to-amber-600 text-white';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
    }
  };

  const calculateWinRate = (wins: number, matches: number) => {
    return matches > 0 ? Math.round((wins / matches) * 100) : 0;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= (data?.totalPages || 1)) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
        <Navbar />
        <div className="max-w-6xl mx-auto pt-20">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading leaderboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
        <Navbar />
        <div className="max-w-6xl mx-auto pt-20">
          <div className="text-center py-12">
            <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      <div className="max-w-6xl mx-auto p-4 pt-20">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center mb-4">
            <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 mr-2 sm:mr-3" />
            <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Leaderboard
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-lg">Top coders competing in the arena</p>
          <div className="flex items-center justify-center mt-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            <span>{data?.totalUsers.toLocaleString()} total competitors</span>
          </div>
        </div>

        {/* Compact Top 3 */}
        {data && data.leaderboard.length >= 3 && (
          <div className="mb-6 sm:mb-8">
            <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-4xl mx-auto">
              {/* 2nd Place */}
              <div className="flex flex-col items-center order-1">
                <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-lg p-3 sm:p-4 w-full transform hover:scale-105 transition-transform">
                  <div className="text-center">
                    <div className="text-lg sm:text-2xl mb-1 sm:mb-2">{data.leaderboard[1].avatar}</div>
                    <h3 className="font-bold text-xs sm:text-sm mb-1 truncate">{data.leaderboard[1].username}</h3>
                    <div className="flex items-center justify-center mb-1 sm:mb-2">
                      <Medal className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 mr-1" />
                      <span className="text-xs font-medium">2nd</span>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      <div className="flex items-center justify-center">
                        <Target className="w-3 h-3 mr-1" />
                        {data.leaderboard[1].total_wins}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-500">
                        {calculateWinRate(data.leaderboard[1].total_wins, data.leaderboard[1].total_matches)}%
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-16 sm:w-20 h-6 sm:h-8 bg-gradient-to-t from-gray-300 to-gray-400 rounded-t-lg mt-1"></div>
              </div>

              {/* 1st Place */}
              <div className="flex flex-col items-center order-2">
                <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-xl p-3 sm:p-5 w-full transform hover:scale-105 transition-transform border-2 border-yellow-200 dark:border-yellow-600">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">{data.leaderboard[0].avatar}</div>
                    <h3 className="font-bold text-sm sm:text-base mb-1 truncate">{data.leaderboard[0].username}</h3>
                    <div className="flex items-center justify-center mb-1 sm:mb-2">
                      <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 mr-1" />
                      <span className="text-xs sm:text-sm font-medium text-yellow-600 dark:text-yellow-400">1st</span>
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center justify-center">
                        <Target className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        {data.leaderboard[0].total_wins}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-500">
                        {calculateWinRate(data.leaderboard[0].total_wins, data.leaderboard[0].total_matches)}%
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-16 sm:w-20 h-8 sm:h-12 bg-gradient-to-t from-yellow-400 to-yellow-500 rounded-t-lg mt-1"></div>
              </div>

              {/* 3rd Place */}
              <div className="flex flex-col items-center order-3">
                <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-lg p-3 sm:p-4 w-full transform hover:scale-105 transition-transform">
                  <div className="text-center">
                    <div className="text-lg sm:text-2xl mb-1 sm:mb-2">{data.leaderboard[2].avatar}</div>
                    <h3 className="font-bold text-xs sm:text-sm mb-1 truncate">{data.leaderboard[2].username}</h3>
                    <div className="flex items-center justify-center mb-1 sm:mb-2">
                      <Award className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600 mr-1" />
                      <span className="text-xs font-medium">3rd</span>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      <div className="flex items-center justify-center">
                        <Target className="w-3 h-3 mr-1" />
                        {data.leaderboard[2].total_wins}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-500">
                        {calculateWinRate(data.leaderboard[2].total_wins, data.leaderboard[2].total_matches)}%
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-16 sm:w-20 h-4 sm:h-6 bg-gradient-to-t from-amber-400 to-amber-600 rounded-t-lg mt-1"></div>
              </div>
            </div>
          </div>
        )}

        {/* Full Leaderboard Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl overflow-hidden">
          <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <h2 className="text-lg sm:text-xl font-bold flex items-center">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Rankings
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rank</th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Player</th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">Matches</th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Wins</th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Win Rate</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {data?.leaderboard.map((user, index) => {
                  const rank = (currentPage - 1) * 50 + index + 1;
                  const winRate = calculateWinRate(user.total_wins, user.total_matches);
                  
                  return (
                    <tr key={user.username} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <div className={`inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full ${getRankBadgeColor(rank)}`}>
                          {rank <= 3 ? getRankIcon(rank) : <span className="text-xs sm:text-sm font-bold">{rank}</span>}
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-lg sm:text-2xl mr-2 sm:mr-3">{user.avatar}</div>
                          <div className="min-w-0">
                            <div className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100 truncate max-w-24 sm:max-w-none">{user.username}</div>
                            {rank <= 10 && (
                              <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">Top 10</div>
                            )}
                            <div className="text-xs text-gray-500 dark:text-gray-400 sm:hidden">
                              {user.total_matches} matches
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap hidden sm:table-cell">
                        <div className="text-sm text-gray-900 dark:text-gray-100 font-medium">{user.total_matches}</div>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <div className="text-xs sm:text-sm text-gray-900 dark:text-gray-100 font-medium">{user.total_wins}</div>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-xs sm:text-sm text-gray-900 dark:text-gray-100 font-medium mr-2">{winRate}%</div>
                          <div className="w-8 sm:w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-1.5 sm:h-2">
                            <div 
                              className="bg-gradient-to-r from-green-400 to-blue-500 h-1.5 sm:h-2 rounded-full transition-all duration-300"
                              style={{ width: `${winRate}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {data && data.totalPages > 1 && (
            <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  Page {data.currentPage} of {data.totalPages}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    <span className="hidden sm:inline">Previous</span>
                    <span className="sm:hidden">Prev</span>
                  </button>
                  
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: Math.min(3, data.totalPages) }, (_, i) => {
                      const page = i + 1;
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm rounded-lg ${
                            page === currentPage
                              ? 'bg-blue-600 text-white'
                              : 'text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === data.totalPages}
                    className="flex items-center px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <span className="sm:hidden">Next</span>
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;