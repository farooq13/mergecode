import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { TrendingUp, Users, Clock, CheckCircle, BarChart3, Calendar } from "lucide-react";
import StatCard from "../components/ui/StatCard";


export default function Analytics() {
  const [dateRange, setDateRange] = useState('7d');
  const { isDark } = useTheme();

  // Sample Analytics Data
  const stats = [
    {
      title: 'Total Reviews',
      value: 156,
      icon: BarChart3,
      trend: { value: 23, isPositive: true },
    },
    {
      title: 'Completion Rate',
      value: '87%',
      icon: CheckCircle,
      trend: { value: 5, isPositive: true },
    },
    {
      title: 'Active Reviewers',
      value: 12,
      icon: Users,
      trend: { value: 2, isPositive: true }
    },
  ];

  // Weekly Review Data - Number of reviews per day
  const weeklyData = [
    { day: 'Mon', reviews: 8, approved: 6 },
    { day: 'Tue', reviews: 12, approved: 10 },
    { day: 'Wed', reviews: 10, approved: 7 },
    { day: 'Thu', reviews: 15, approved: 12 },
    { day: 'Fri', reviews: 9, approved: 8 },
    { day: 'Sat', reviews: 3, approved: 2 },
    { day: 'Sun', reviews: 2, approved: 2 },
  ];

  // Top Reviewers Data
  const topReviewers = [
    { name: 'Faruk Idris', reviews: 34, approved: 32, avatar: 'FR' },
    { name: 'Adam Muhammad', reviews: 28, approved: 26, avatar: 'AM' },
    { name: 'Muhammad Kabeer', reviews: 25, approved: 23, avatar: 'MK' },
    { name: 'David Kim', reviews: 22, approved: 20, avatar: 'DK' },
    { name: 'Alex Thomson', reviews: 18, approved: 17, avatar: 'AT' },
  ];

  // Review By Language
  const languageData = [
    { language: 'JavaScript', count: 45, percentage: 19 },
    { language: 'TypeScript', count: 38, percentage: 24 },
    { language: 'Python', count: 32, percentage: 21 },
    { language: 'Java', count: 22, percentage: 14 },
    { language: 'Go', count: 19, percentage: 12 },
  ];

  // Get max value for chart scaling
  const maxReviews = Math.max(...weeklyData.map(d => d.reviews));

  return (
    <div className={`${isDark ? 'min-h-screen bg-[#121212] pb-12' : 'min-h-screen, bg-gray-50 pb-12'}`}>
      {/* Header */}
      <div className={`${isDark ? 'bg-[#1e1e1e] border-b border-[#2a2a2a]' : 'bg-white border-b border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`${isDark ? 'text-3xl font-bold text-white' : 'text-3xl font-bold text-gray-900'}`}>
                Analytics
              </h1>
              <p className={`${isDark ? 'mt-1 text-sm text-gray-400' : 'mt-1 text-sm text-gray-600'}`}>
                Track your team's code review performance and trends
              </p>
            </div>
         
            {/* Data Range Selector */}
            <div className="flex gap-2">
              {['7d', '30d', '90d'].map((range) => (
                <button
                  key={range}
                  onClick={() => setDateRange(range)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    dateRange === range
                    ? 'bg-[#2563eb] text-white hover:cursor-pointer'
                    : `${isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:cursor-pointer' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:cursor-pointer'}`
                  }`}
                >
                  Last {range === '7d' ? '7' : range === '30d' ? '30' : '90'} days
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard 
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              trend={stat.trend}
            />
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Weekly Activity Chart */}
          <div className={`${isDark ? 'bg-[#1e1e1e] rounded-lg border border-[#2a2a2a] p-6' : 'bg-white rounded-lg border border-gray-200 p-6'}`}>
            <h3 className={`${isDark ? 'text-lg font-semibold text-white mb-6' :'text-lg font-semibold text-gray-900 mb-6'}`}>
              Weekly Activity 
            </h3>
            <div className="space-y-4">
              {weeklyData.map((day) => (
                <div key={day.day}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{day.day}</span>
                    <span className={`${isDark ? 'text-white font-medium' : 'text-gray-900 font-medium'}`}>
                      {day.reviews} reviews
                    </span>
                  </div>
                  <div className={`relative h-8 rounded-full overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    {/* Total Reviews Bar */}
                    <div 
                      className={`absolute h-full rounded-full ${isDark ? 'bg-[#1d4ed8]/40' : 'bg-[#1d4ed8]/20'}`}
                      style={{ width: `${(day.reviews / maxReviews) * 100}%` }}
                    />
                    {/* Approved Reviews Bar */}
                    <div 
                      className="absoulte h-full bg-[#3b82f6] rounded-full"
                      style={{ width: `${(day.approved / maxReviews) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#3b82f6] rounded"></div>
                <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Approved</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded ${isDark ? 'bg-[#1d4ed8]' : 'bg-[#3b82f6]'}`}></div>
                <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total</span>
              </div>
            </div>
          </div>
         {/* Reviews by Language */}
          <div className={`rounded-lg border p-6 ${isDark ? 'bg-[#1e1e1e] border-[#2a2a2a]' : 'bg-white border-gray-200'}`}>
            <h3 className={`text-lg font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Reviews by Language
            </h3>
            <div className="space-y-4">
              {languageData.map((lang) => (
                <div key={lang.language}>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-900 dark:text-white font-medium">
                      {lang.language}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      {lang.count} ({lang.percentage}%)
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      style={{ width: `${lang.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Reviewers */}
        <div className={` rounded-lg border p-6 ${isDark ? 'bg-[#1e1e1e] border-[#2a2a2a]' : 'bg-white border-gray-200'}`}>
          <h3 className={`text-lg font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Top Reviewers
          </h3>
          <div className="space-y-4">
            {topReviewers.map((reviewer, index) => (
              <div
                key={reviewer.name}
                className={`flex items-center justify-between p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}
              >
                <div className="flex items-center gap-4">
                  {/* Rank */}
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                    ${index === 0 ? `${isDark ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-300 text-yellow-900'}` : ''}
                    ${index === 1 ? `${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}` : ''}
                    ${index === 2 ? `${isDark ? 'bg-orange-900/30 text-orange-400' : 'bg-orange-100 text-orange-700'}` : ''}
                    ${index > 2 ? `${isDark ? 'bg-gray-100 text-gray-600' : 'bg-gray-700text-gray-400'}`  : ''}
                  `}>
                    {index + 1}
                  </div>

                  {/* Avatar */}
                  <div className={`w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center font-semibold ml-4 ${isDark ? 'text-white bg-[#3b82f6]/40' : 'text-gray-900 bg-[#3b82f6]/40'}`}>
                    {reviewer.avatar}
                  </div>

                  {/* Name */}
                  <div>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {reviewer.name}
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {reviewer.reviews} reviews
                    </p>
                  </div>
                </div>

                {/* Approval Rate */}
                <div className="text-right">
                  <p className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {Math.round((reviewer.approved / reviewer.reviews) * 100)}%
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    approval rate
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}