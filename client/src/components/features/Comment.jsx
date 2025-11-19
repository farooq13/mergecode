import { useState } from 'react';
import { ThumbsUp, ThumbsDown, Heart, CheckCircle, CornerDownRight, Trash2, Edit } from 'lucide-react';
import Button from '../ui/Button';
import { useTheme } from '../../context/ThemeContext';


export default function Comment({
  comment,
  onReply,
  onResolve,
  onDelete,
  onReact,
  currentUser = 'You',
  level = 0,
}) {
  
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState('');
  const { isDark } = useTheme();

  // Format Time Ago
  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes${diffInMinutes !== 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''}`;
    } else {
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''}`;
    }
  };

  const handleSubmitReply = () => {
    if (!replyText.trim()) return ;

    onReply(comment.id, replyText);
    setReplyText('');
    setShowReplyInput(false);
  };

  
  const getReactionCount = (emoji) => {
    return comment.reactions?.[emoji]?.length || 0; 
  };


  const hasUserReacted = (emoji) => {
    return comment.reactions?.[emoji]?.includes(currentUser) || false;
  };

  // Max Nesting Level
  // Prevent too deep nesting (max 3 levels)
  const canReply = level < 3;
  
  // Replace the emoji array with icon mapping
  const reactionIcons = {
    'thumbsup': <ThumbsUp size={14} className="inline align-middle" />,
    'thumbsdown': <ThumbsDown size={14} className="inline align-middle" />,
    'heart': <Heart size={14} className="inline align-middle" />,
  };

  return (
    <div className={`${level > 0 ? 'ml-12' : ''}`}>
      {/* 
          Content Container
          Background changes if resolved
      */}
      <div className={`
        p-4 rounded-lg border 
        ${comment.resolved
          ? `${isDark ? 'bg-green-900/10 border-green-800' : 'bg-green-50 border-green-200'}`
          : `${isDark ? 'bg-[#1e1e1e] border-[#2a2a2a]' : 'bg-white'}`
        }
        `}>
          {/* Comment Header */}
          <div className="flex items-center justify-between gap-4 mb-3">
            {/* User Avatar */}
            <div className={`w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center  text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
              {comment.author[0].toUpperCase()}
            </div>

            {/* User and Time */}
            <div>
              <span className={`${isDark ? 'font-semibold text-white' : 'font-semibold text-gray-900'}`}>
                {comment.author}
              </span>
              {comment.author === currentUser && (
                <span className={`${isDark ? 'ml-2 text-xs bg-blue-900/30 text-blue-300 px-2 py-0.5 rounded' : 'ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded'}`}>
                  You
                </span>
              )}
              <div className={`${isDark ? 'text-xs text-gray-400 mt-0.5' : 'text-xs text-gray-500 mt-0.5'}`}>
                {formatTimeAgo(comment.createdAt)}
              </div>
            </div>
          </div>

          {/* Resolved Badge */}
          {comment.resolved && (
            <div className={`${isDark ? 'flex items-center gap-1 text-green-400 text-sm' : 'flex items-center gap-1 text-geen-600 text-sm'}`}>
              <CheckCircle size={16} />
              <span>Resolved</span>
            </div>
          )}

          {/* Comment Text */}
          <p className={`${isDark ? 'text-gray-300 mb-3 whitespace-prel-line' : 'text-gray-700 mb-3 whitespace-pre-line'}`}>
            {comment.text}
          </p>

          {/* Reactions */}
          {comment.reactions && (
            <div className="flex items-center gap-2 mb-3">
              {['thumbsup', 'thumbsdown', 'heart'].map((emoji) => {
                const count = getReactionCount(emoji);
                const hasReacted = hasUserReacted(emoji);

                if (count === 0 && !hasReacted) return null;

                return (
                  <button
                    key={emoji}
                    onClick={() => onReact(comment.id, emoji)}
                    className={`
                      px-2 py-1 rounded-full text-sm flex-items-center gap-1 transition-colors hover:cursor-pointer
                      ${hasReacted
                        ? `${isDark ? 'bg-[#1d4ed8]/20 border-[#3b82f6]' : 'bg-[#a9caf7] border-[#6ea3f8]'}`
                        : `${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                      }
                      ${isDark ? 'border hover:border-[#3b82f6]' : 'border hover:border-[#3b82f6]/90'}
                    `}
                  >
                   {reactionIcons[emoji] || emoji}
                   {count > 0 && <span className='text-xs'>{count}</span>}
                  </button>
                );
              })}
            </div>
          )}

          {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Reply Button */}
          {canReply && (
            <button
              onClick={() => setShowReplyInput(!showReplyInput)}
              className={`hover:cursor-pointer text-sm dark:text-gray-400 hover:text-primary-600 flex items-center gap-1 ${isDark ? 'dark:hover:text-primary-400' : 'text-gray-600 '}`}
            >
              <CornerDownRight size={14} />
              Reply
            </button>
          )}

          {/* React Buttons */}
          <button
            onClick={() => onReact(comment.id, 'thumbsup')}
            className={`hover:cursor-pointer text-sm flex items-center gap-1 ${isDark ? 'text-gray-400 hover:text-[#3b82f6]' : 'text-gray-600 hover:text-[#2563eb]'}`}
          >
            <ThumbsUp size={14} />
            Like
          </button>

          {/* Resolve/Unresolve Button (only for top-level comments) */}
          {level === 0 && (
            <button
              onClick={() => onResolve(comment.id)}
              className={`hover:cursor-pointer text-sm flex items-center gap-1 ${isDark ? 'text-gray-400 hover:text-green-400' : 'text-gray-600 hover:text-green-600'}`}
            >
              <CheckCircle size={14} />
              {comment.resolved ? 'Unresolve' : 'Resolve'}
            </button>
          )}

          {/* Delete Button (only your own comments) */}
          {comment.author === currentUser && (
            <button
              onClick={() => onDelete(comment.id)}
              className={`text-sm flex items-center gap-1 ${isDark ? 'text-gray-400 hover:text-red-400' : 'hover:text-red-600 text-gray-600'}`}
            >
              <Trash2 size={14} />
              Delete
            </button>
          )}
        </div>

        {/* Reply Input */}
        {showReplyInput && (
          <div className={`mt-4 pt-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write a reply..."
              rows={3}
              className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 ${isDark ? 'border-gray-600 text-white bg-gray-900' : 'border-gray-300 text-gray-900 bg-gray-50'}`}
            />
            <div className="flex gap-2 mt-2">
              <Button
                size="sm"
                variant="primary"
                onClick={handleSubmitReply}
                disabled={!replyText.trim()}
              >
                Reply
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setShowReplyInput(false);
                  setReplyText('');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* 
        REPLIES (RECURSIVE)
        Renders child comments with increased nesting level
      */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-3 space-y-3">
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              onReply={onReply}
              onResolve={onResolve}
              onDelete={onDelete}
              onReact={onReact}
              currentUser={currentUser}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}