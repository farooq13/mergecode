import { Archive, Clock, MessageSquare, User } from 'lucide-react';
import StatusBadge from '../ui/StatusBadge';
import { useTheme } from '../../context/ThemeContext';


export default function ReviewCard({ review, onClick }) {
  const { isDark } = useTheme();
  // Converts a date to a human-readable format
  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInMs = now.getTime() - new Date(date).getTime(); // current time in millisecond
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    } else {
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    }
  };

  /* MAP STATUS TO DISPLAY TEXT */
  const statusDisplayText = {
    draft: 'Draft',
    pending: 'Under Review',
    approved: 'Approved',
    'changes-requested': 'Changes Requested',
    merged: 'Merged',
    archived: 'Archived'
  };

  return (
    <div
      onClick={onClick}
      className={`
        ${isDark ? 'bg-[#121212] rounded-lg shadow-sm p-5 border border-gray-700 transition-all duration-200' : 'bg-white transition-all duration-200 border-gray-200 rounded-lg shadow-sm p-5 border'}
        ${onClick ? 'cursor-pointer hover:shadow-md hover:border-primary-500' : ''}
      `}
    >
      {/* HEADER: Title and Status Badge */}
      <div className="flex items-start justify-between gap-4 mb-3">
        {/* Title - truncate if too long */}
        <h3 className={`${isDark ? 'text-lg font-semibold text-white line-clamp-1' : 'text-lg font-semibold text-gray-900 line-clamp-1'}`}>
          {review.title}
        </h3>

        {/* Status Badge */}
        <StatusBadge variant={review.status}>
          {statusDisplayText[review.status]}
        </StatusBadge>
      </div>

      {/* METADATA ROW: Author, Language, Time */}
      <div className={`${isDark ? 'flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400' : 'flex items-center gap-4 text-sm text-gray-600'}`}>
        {/* Author */}
        <div className="flex items-center gap-1.5">
          <User size={16} />
          <span>{review.author}</span>
        </div>

        {/* Language Badge */}
        <div className={`{${isDark ? 'px-4 py-0.5 bg-gray-700 rounded text-xs font-medium' : 'px-4 py-0.5 bg-gray-700 rounded text-xs text-white font-medium'}`}>
          {review.language}
        </div>

        {/* Time */}
        <div className="flex items-center gap-1.5">
          <Clock size={16} />
          <span>{formatTimeAgo(review.createdAt)}</span>
        </div>
      </div>

      {/* FOOTER: Comment Count */}
      <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
          <MessageSquare size={16} />
          <span>
            {review.commentCount} comment{review.commentCount !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  );
}
