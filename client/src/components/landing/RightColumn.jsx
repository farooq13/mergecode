import React, { useState } from 'react';
import { MessageSquare, Calendar, Clock } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const CalendarSVG = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 -960 960 960" width={size} fill="#fff">
    <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z" />
  </svg>
);

export default function RightColumn() {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('all');

  // Mock activity data
  const activities = [
    {
      id: 1,
      type: 'message',
      author: 'Sarah Chen',
      avatar: 'SC',
      content: 'Left a comment on your React review',
      timestamp: '2 hours ago',
      badge: 'review'
    },
    {
      id: 2,
      type: 'mention',
      author: 'Alex Kumar',
      avatar: 'AK',
      content: '@you mentioned in "API Migration" discussion',
      timestamp: '4 hours ago',
      badge: 'mention'
    },
    {
      id: 3,
      type: 'meeting',
      author: 'Code Review Sync',
      avatar: 'calendar',
      content: 'Scheduled in 2 hours',
      timestamp: 'Today at 2:30 PM',
      badge: 'scheduled'
    },
    {
      id: 4,
      type: 'message',
      author: 'Jamie Wilson',
      avatar: 'JW',
      content: 'Approved your TypeScript refactor',
      timestamp: '1 day ago',
      badge: 'approved'
    },
    {
      id: 5,
      type: 'meeting',
      author: 'Team Standup',
      avatar: 'calendar',
      content: 'Next Monday, 10:00 AM',
      timestamp: 'Scheduled',
      badge: 'meeting'
    }
  ];

  const filteredActivities = activeTab === 'all' ? activities : activities.filter(a => a.type === activeTab);

  const getIcon = (type) => {
    switch (type) {
      case 'message': return <MessageSquare size={16} />;
      case 'mention': return <MessageSquare size={16} />;
      case 'meeting': return <Calendar size={16} />;
      default: return <MessageSquare size={16} />;
    }
  };

  const getBadgeColor = (badge) => {
    const colors = {
      review: isDark ? 'bg-blue-900/30 text-blue-200' : 'bg-blue-100 text-blue-700',
      mention: isDark ? 'bg-amber-900/30 text-amber-200' : 'bg-amber-100 text-amber-700',
      approved: isDark ? 'bg-green-900/30 text-green-200' : 'bg-green-100 text-green-700',
      scheduled: isDark ? 'bg-purple-900/30 text-purple-200' : 'bg-purple-100 text-purple-700',
      meeting: isDark ? 'bg-pink-900/30 text-pink-200' : 'bg-pink-100 text-pink-700'
    };
    return colors[badge] || colors.review;
  };

  return (
    <aside className="space-y-4">
      <div className={`rounded-lg border ${isDark ? 'bg-[#1e1e1e] border-gray-700' : 'bg-white border-gray-200'}`}>
        {/* Header */}
        <div className={`p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Activity Feed</h3>
          <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Your team and reviews</p>
        </div>

        {/* Tabs */}
        <div className={`flex gap-0 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          {['all', 'message', 'mention', 'meeting'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-3 py-2 text-xs font-medium transition-colors capitalize border-b-2 ${
                activeTab === tab
                  ? `${isDark ? 'border-blue-400 text-blue-400' : 'border-blue-600 text-blue-600'}`
                  : `${isDark ? 'border-transparent text-gray-400 hover:text-gray-300' : 'border-transparent text-gray-600 hover:text-gray-700'}`
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Activity List */}
        <div className="divide-y" style={{ maxHeight: '500px', overflowY: 'auto' }}>
          {filteredActivities.length > 0 ? (
            filteredActivities.map((activity) => (
              <div key={activity.id} className={`p-4 hover:bg-opacity-50 cursor-pointer transition-colors ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}`}>
                <div className="flex gap-3">
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${
                    activity.avatar === 'calendar' ? 'bg-blue-600' : `${isDark ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'}`
                  }`}>
                    {activity.avatar === 'calendar' ? <CalendarSVG size={18} /> : activity.avatar}
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Author and badge */}
                    <div className="flex items-center gap-2 mb-1">
                      <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{activity.author}</p>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${getBadgeColor(activity.badge)}`}>
                        {activity.badge}
                      </span>
                    </div>

                    {/* Content */}
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{activity.content}</p>

                    {/* Timestamp */}
                    <div className="flex items-center gap-1 mt-2">
                      <Clock size={12} className={isDark ? 'text-gray-500' : 'text-gray-400'} />
                      <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{activity.timestamp}</span>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className={`flex-shrink-0 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    {getIcon(activity.type)}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={`p-8 text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <p className="text-sm">No activities to show</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`p-3 border-t text-center ${isDark ? 'border-gray-700 bg-gray-900/30' : 'border-gray-200 bg-gray-50'}`}>
          <button className={`text-sm font-medium ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>
            View all activities →
          </button>
        </div>
      </div>
    </aside>
  );
}
