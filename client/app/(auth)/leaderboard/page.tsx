"use client";
import React, { useState } from 'react';
import { Trophy, Medal, Award, Users, Target, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLeaderboardInfo } from '@/hooks/api/feature-hooks'; 
import { TopThreeLoadingSkeleton, TableLoadingSkeleton } from '@/components/Loading-Skeletons';
import Navbar from '@/components/navbar';

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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  const { success, isError, message, data } = useLeaderboardInfo(currentPage, itemsPerPage);
  const loading = !success && !isError;

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />;
      case 3:
        return <Award className="w-4 h-4 sm:w-5 sm:h-5 text-amber-800" />;
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
        return 'bg-gradient-to-r from-amber-600 to-amber-800 text-white';
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

  const renderAvatar = (avatarUrl: string, username: string) => {
    if (avatarUrl && (avatarUrl.startsWith('http://') || avatarUrl.startsWith('https://'))) {
      return (
        <img 
          src={avatarUrl} 
          alt={`${username}'s avatar`}
          className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=random`;
          }}
        />
      );
    }
    
    if (avatarUrl && avatarUrl.length === 1 && /\p{Emoji}/u.test(avatarUrl)) {
      return <span className="text-lg sm:text-2xl">{avatarUrl}</span>;
    }
    
    return (
      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs sm:text-sm">
        {username?.charAt(0)?.toUpperCase() || '?'}
      </div>
    );
  };

  if (loading) {
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
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-32 animate-pulse"></div>
            </div>
          </div>

          <TopThreeLoadingSkeleton />

          <TableLoadingSkeleton />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
        <Navbar />
        <div className="max-w-6xl mx-auto pt-20">
          <div className="text-center py-12">
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Failed to load leaderboard</h3>
            <p className="text-red-600 dark:text-red-400 mb-4">{message || 'An error occurred while fetching leaderboard data'}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If we have data but no leaderboard entries 
  if (!data?.leaderboard || data.leaderboard.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
        <Navbar />
        <div className="max-w-6xl mx-auto pt-20">
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No competitors yet</h3>
            <p className="text-gray-600 dark:text-gray-400">Be the first to compete and climb the leaderboard!</p>
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
            <span>{data.totalUsers?.toLocaleString() || '0'} total competitors</span>
          </div>
        </div>

        {/* Compact Top 3 */}
        {data.leaderboard.length >= 3 && (
          <div className="mb-6 sm:mb-8">
            <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-4xl mx-auto">
              {/* 2nd Place */}
              <div className="flex flex-col items-center order-1">
                <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-lg p-3 sm:p-4 w-full transform hover:scale-105 transition-transform">
                  <div className="text-center">
                    <div className="flex justify-center mb-1 sm:mb-2">
                      {renderAvatar(data.leaderboard[1].avatar, data.leaderboard[1].username)}
                    </div>
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
                    <div className="flex justify-center mb-1 sm:mb-2">
                      {renderAvatar(data.leaderboard[0].avatar, data.leaderboard[0].username)}
                    </div>
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
                    <div className="flex justify-center mb-1 sm:mb-2">
                      {renderAvatar(data.leaderboard[2].avatar, data.leaderboard[2].username)}
                    </div>
                    <h3 className="font-bold text-xs sm:text-sm mb-1 truncate">{data.leaderboard[2].username}</h3>
                    <div className="flex items-center justify-center mb-1 sm:mb-2">
                      <Award className="w-3 h-3 sm:w-4 sm:h-4 text-amber-800 mr-1" />
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
                <div className="w-16 sm:w-20 h-4 sm:h-6 bg-gradient-to-t from-amber-600 to-amber-800 rounded-t-lg mt-1"></div>
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
                {data.leaderboard.map((user: LeaderboardUser, index: number) => {
                  const rank = (currentPage - 1) * itemsPerPage + index + 1;
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
                          <div className="mr-2 sm:mr-3">
                            {renderAvatar(user.avatar, user.username)}
                          </div>
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
                  Page {data.currentPage || currentPage} of {data.totalPages}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    <span className="hidden sm:inline">Previous</span>
                    <span className="sm:hidden">Prev</span>
                  </button>
                  
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: Math.min(5, data.totalPages) }, (_, i) => {
                      let pageNumber;
                      if (data.totalPages <= 5) {
                        pageNumber = i + 1;
                      } else {
                        const start = Math.max(1, currentPage - 2);
                        const end = Math.min(data.totalPages, start + 4);
                        pageNumber = start + i;
                        if (pageNumber > end) return null;
                      }
                      
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => handlePageChange(pageNumber)}
                          className={`px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm rounded-lg transition-colors ${
                            pageNumber === currentPage
                              ? 'bg-blue-600 text-white'
                              : 'text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}
                  </div>
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === data.totalPages}
                    className="flex items-center px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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