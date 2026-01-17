import { useState } from 'react';
import { MessageSquare, Filter, ThumbsUp, Heart } from 'lucide-react';
import Comment from './Comment';
import Button from '../ui/Button';
import FormInput from '../ui/FormInput';
import { useTheme } from '../../context/ThemeContext';

export default function CommentsList({ reviewId, currentUser = 'You' }) {

  const { isDark } = useTheme();

  const [comments, setComments] = useState([
    {
      id: '1',
      author: 'Adam Muhammad',
      text: 'Great refactoring! The code is much more readable now. However, I have a question about the error handling - should we log these errors to our monitoring service?',
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
      resolved: false,
      reactions: {
        '👍': ['Faruk Idris', 'David Kim'],
        '❤️': ['Muhammad Kabeer'],
      },
      replies: [
        {
          id: '2',
          author: 'Faruk Idris',
          text: 'Good point! Yes, we should definitely add logging here.',
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
          resolved: false,
          reactions: {
            '👍': ['Muhammad Kabeer'],
          },
          replies: [],
        },
      ],
    },
    {
      id: '3',
      author: 'Muhammad Kabeer',
      text: 'The token validation looks solid. Nice work!',
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
      resolved: true,
      reactions: {
        '👍': ['Adam Muhammad', 'David Kim', 'Faruk Idris'],
      },
      replies: [],
    },
  ]);


  const [newCommentText, setNewCommentText] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'unresolved', 'resolved'


  const handleAddComment = () => {
    if (!newCommentText.trim()) return;

    const newComment = {
      id: Date.now().toString(),
      author: currentUser,
      text: newCommentText,
      createdAt: new Date(),
      resolved: false,
      reactions: {},
      replies: [],
    };

    setComments(prev => [newComment, ...prev]);
    setNewCommentText('');
  };

  /*
    ADD REPLY
    Adds a reply to an existing comment
    Uses recursion to find the parent comment
   */
  const handleReply = (parentId, replyText) => {
    const addReplyToComment = (comments) => {
      return comments.map(comment => {
        if (comment.id === parentId) {
          // Found the parent - add reply
          return {
            ...comment,
            replies: [
              ...comment.replies,
              {
                id: Date.now().toString(),
                author: currentUser,
                text: replyText,
                createdAt: new Date(),
                resolved: false,
                reactions: {},
                replies: [],
              },
            ],
          };
        } else if (comment.replies.length > 0) {
          // Search in replies recursively
          return {
            ...comment,
            replies: addReplyToComment(comment.replies),
          };
        }
        return comment;
      });
    };

    setComments(prev => addReplyToComment(prev));
  };

  /*
    TOGGLE RESOLVE
    Marks comment as resolved/unresolved
   */
  const handleResolve = (commentId) => {
    const toggleResolveInComments = (comments) => {
      return comments.map(comment => {
        if (comment.id === commentId) {
          return { ...comment, resolved: !comment.resolved };
        } else if (comment.replies.length > 0) {
          return {
            ...comment,
            replies: toggleResolveInComments(comment.replies),
          };
        }
        return comment;
      });
    };

    setComments(prev => toggleResolveInComments(prev));
  };

  // Delete Comment
  const handleDelete = (commentId) => {
    const deleteFromComments = (comments) => {
      return comments
        .filter(comment => comment.id !== commentId)
        .map(comment => ({
          ...comment,
          replies: deleteFromComments(comment.replies),
        }));
    };

    if (confirm('Are you sure you want to delete this comment?')) {
      setComments(prev => deleteFromComments(prev));
    }
  };

  /*
    ADD REACTION
    Toggles a reaction on a comment
   */
  const handleReact = (commentId, emoji) => {
    const toggleReactionInComments = (comments) => {
      return comments.map(comment => {
        if (comment.id === commentId) {
          const reactions = { ...comment.reactions };
          const userList = reactions[emoji] || [];
          
          if (userList.includes(currentUser)) {
            // Remove reaction
            reactions[emoji] = userList.filter(user => user !== currentUser);
          } else {
            // Add reaction
            reactions[emoji] = [...userList, currentUser];
          }
          
          return { ...comment, reactions };
        } else if (comment.replies.length > 0) {
          return {
            ...comment,
            replies: toggleReactionInComments(comment.replies),
          };
        }
        return comment;
      });
    };

    setComments(prev => toggleReactionInComments(prev));
  };

  /*
   * FILTER COMMENTS
   * Returns filtered comments based on filter state
   */
  const filteredComments = comments.filter(comment => {
    if (filter === 'all') return true;
    if (filter === 'resolved') return comment.resolved;
    if (filter === 'unresolved') return !comment.resolved;
    return true;
  });

  /**
   * COUNT STATS
   */
  const totalComments = comments.length;
  const resolvedCount = comments.filter(c => c.resolved).length;
  const unresolvedCount = totalComments - resolvedCount;

  return (
    <div className={`rounded-lg border ${isDark ? ' bg-[#1e1e1e] border-[#2a2a2a]' : 'bg-white border-gray-200'}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-dark-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MessageSquare size={20} className="text-gray-600 dark:text-gray-400" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Comments ({totalComments})
            </h2>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                filter === 'all'
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              All ({totalComments})
            </button>
            <button
              onClick={() => setFilter('unresolved')}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                filter === 'unresolved'
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Unresolved ({unresolvedCount})
            </button>
            <button
              onClick={() => setFilter('resolved')}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                filter === 'resolved'
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Resolved ({resolvedCount})
            </button>
          </div>
        </div>

        {/* Add Comment Input */}
        <div>
          <textarea
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            placeholder="Add a comment..."
            rows={3}
            className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${isDark ? 'bg-gray-900 placeholder:text-gray-500 text-white border-gray-600' : 'bg-gray-50 border border-gray-300 text-gray-900  placeholder:text-gray-400'}`}
          />
          <div className="flex justify-end mt-2">
            <Button
              variant="primary"
              onClick={handleAddComment}
              disabled={!newCommentText.trim()}
            >
              Add Comment
            </Button>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="p-6 space-y-4">
        {filteredComments.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            {filter === 'all' 
              ? 'No comments yet. Be the first to comment!' 
              : `No ${filter} comments.`}
          </p>
        ) : (
          filteredComments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              onReply={handleReply}
              onResolve={handleResolve}
              onDelete={handleDelete}
              onReact={handleReact}
              currentUser={currentUser}
            />
          ))
        )}
      </div>
    </div>
  );
}