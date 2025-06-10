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
        //asli api call karna hoga bro idhar
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
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-500">#{rank}</span>;
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
        return 'bg-gray-100 text-gray-700';
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading leaderboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Navbar/>
      <div className="max-w-6xl mx-auto  mt-14">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Trophy className="w-8 h-8 text-yellow-500 mr-3" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Leaderboard
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Top coders competing in the arena</p>
          <div className="flex items-center justify-center mt-4 text-sm text-gray-500">
            <Users className="w-4 h-4 mr-1" />
            <span>{data?.totalUsers.toLocaleString()} total competitors</span>
          </div>
        </div>

        {/* Top 3 Podium */}
        {data && data.leaderboard.length >= 3 && (
          <div className="mb-12">
            <div className="flex items-end justify-center gap-4 mb-8">
              {/* 2nd Place */}
              <div className="flex flex-col items-center">
                <div className="bg-white rounded-2xl shadow-lg p-6 w-48 transform hover:scale-105 transition-transform">
                  <div className="text-center">
                    <div className="text-4xl mb-2">{data.leaderboard[1].avatar}</div>
                    <h3 className="font-bold text-lg mb-1">{data.leaderboard[1].username}</h3>
                    <div className="flex items-center justify-center mb-2">
                      <Medal className="w-5 h-5 text-gray-400 mr-1" />
                      <span className="text-sm font-medium">2nd Place</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div className="flex items-center justify-center mb-1">
                        <Target className="w-4 h-4 mr-1" />
                        {data.leaderboard[1].total_wins} wins
                      </div>
                      <div className="text-xs text-gray-500">
                        {calculateWinRate(data.leaderboard[1].total_wins, data.leaderboard[1].total_matches)}% win rate
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-32 h-16 bg-gradient-to-t from-gray-300 to-gray-400 rounded-t-lg mt-2"></div>
              </div>

              {/* 1st Place */}
              <div className="flex flex-col items-center">
                <div className="bg-white rounded-2xl shadow-xl p-8 w-52 transform hover:scale-105 transition-transform border-2 border-yellow-200">
                  <div className="text-center">
                    <div className="text-5xl mb-3">{data.leaderboard[0].avatar}</div>
                    <h3 className="font-bold text-xl mb-2">{data.leaderboard[0].username}</h3>
                    <div className="flex items-center justify-center mb-3">
                      <Trophy className="w-6 h-6 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium text-yellow-600">Champion</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div className="flex items-center justify-center mb-1">
                        <Target className="w-4 h-4 mr-1" />
                        {data.leaderboard[0].total_wins} wins
                      </div>
                      <div className="text-xs text-gray-500">
                        {calculateWinRate(data.leaderboard[0].total_wins, data.leaderboard[0].total_matches)}% win rate
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-32 h-24 bg-gradient-to-t from-yellow-400 to-yellow-500 rounded-t-lg mt-2"></div>
              </div>

              {/* 3rd Place */}
              <div className="flex flex-col items-center">
                <div className="bg-white rounded-2xl shadow-lg p-6 w-48 transform hover:scale-105 transition-transform">
                  <div className="text-center">
                    <div className="text-4xl mb-2">{data.leaderboard[2].avatar}</div>
                    <h3 className="font-bold text-lg mb-1">{data.leaderboard[2].username}</h3>
                    <div className="flex items-center justify-center mb-2">
                      <Award className="w-5 h-5 text-amber-600 mr-1" />
                      <span className="text-sm font-medium">3rd Place</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div className="flex items-center justify-center mb-1">
                        <Target className="w-4 h-4 mr-1" />
                        {data.leaderboard[2].total_wins} wins
                      </div>
                      <div className="text-xs text-gray-500">
                        {calculateWinRate(data.leaderboard[2].total_wins, data.leaderboard[2].total_matches)}% win rate
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-32 h-12 bg-gradient-to-t from-amber-400 to-amber-600 rounded-t-lg mt-2"></div>
              </div>
            </div>
          </div>
        )}

        {/* Full Leaderboard Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <h2 className="text-xl font-bold flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Rankings
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Matches</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wins</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Win Rate</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data?.leaderboard.map((user, index) => {
                  const rank = (currentPage - 1) * 50 + index + 1;
                  const winRate = calculateWinRate(user.total_wins, user.total_matches);
                  
                  return (
                    <tr key={user.username} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${getRankBadgeColor(rank)}`}>
                          {rank <= 3 ? getRankIcon(rank) : <span className="text-sm font-bold">{rank}</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-2xl mr-3">{user.avatar}</div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{user.username}</div>
                            {rank <= 10 && (
                              <div className="text-xs text-blue-600 font-medium">Top 10</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-medium">{user.total_matches}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-medium">{user.total_wins}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm text-gray-900 font-medium mr-2">{winRate}%</div>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
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
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing page {data.currentPage} of {data.totalPages}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center px-3 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </button>
                  
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: Math.min(5, data.totalPages) }, (_, i) => {
                      const page = i + 1;
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-3 py-2 text-sm rounded-lg ${
                            page === currentPage
                              ? 'bg-blue-600 text-white'
                              : 'text-gray-600 bg-white border border-gray-300 hover:bg-gray-50'
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
                    className="flex items-center px-3 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
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