import { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, MessageSquare, Clock, User, Code } from 'lucide-react';
import Button from "../components/ui/Button";
import StatusBadge from "../components/ui/StatusBadge";
import { useTheme } from "../context/ThemeContext";


export  default function ReviewDetail() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { isDark } = useTheme();

  // Mock Review Data
  const [review] = useState({
    id: id,
    title: 'Refactor authentication middleware',
    author: 'Sarah Chen',
    status: 'pending',
    language: 'javascript',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    commentCount: 3,
    description: `This PR refactors the authentication middleware to improve code readability and maintainability. 
        Key changes:
        - Extract token validation into separate function
        - Add better error messages
        - Improve type safety
        - Add unit tests

        Looking for feedback on the overall structure and any edge cases I might have missed.`,
            code: `// middleware/auth.js

        const jwt = require('jsonwebtoken');

        /**
         * Authentication middleware
         * Validates JWT token from request header
         */
        const authenticate = async (req, res, next) => {
          try {
            // Get token from header
            const token = req.headers.authorization?.split(' ')[1];
            
            if (!token) {
              return res.status(401).json({ 
                error: 'Authentication required' 
              });
            }

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Attach user to request
            req.user = decoded;
            
            next();
          } catch (error) {
            return res.status(401).json({ 
              error: 'Invalid or expired token' 
            });
          }
        };

        module.exports = { authenticate };`,
      tags: ['security', 'refactor', 'middleware'],
  });

  const statusDisplayText = {
    draft: 'Draft',
    pending: 'Under Review',
    approved: 'Approved',
    'changes-requested': 'Changes Requested',
    merged: 'Merged',
    archived: 'Archived',
  };

  const formatDate = (date) => {
    // Use the Intl API to format Date objects to a readable string
    try {
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(date));
    } catch (err) {
      // Fallback to toString() if formatting fails
      return String(date);
    }
  };

  const handleApprove = () => {
    alert('Review approved!');
  };

  const handleRequestChanges = () => {
    alert('Changes requested!');
  };

  return (
    <div className={`${isDark ? 'min-h-screen bg[#121212] pb-12' : 'min-h-screen bg-gray-50 pb-12'}`}>
      {/* Header Section */}
      <div className={`${isDark ? 'bg-[#1e1e1e] border-b border-[#2a2a2a]' : 'bg-white border-b border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className={`${isDark 
              ? 'flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors' 
              : 'flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors'
            }`}
          >
            <ArrowLeft size={20} />
            <span>Back to Dashboard</span>
          </button>

          {/* Title and Status */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <h1 className={`${isDark ? 'text-3xl font-bold text-white bm-2' : 'text-3xl font-bold text-gray-900 mb-2'}`}>
                {review.title}
              </h1>
              <div className={`${isDark ? 'flex items-center gap-4 text-sm text-gray-400' : 'flex items-center gap-4 text-sm text-gray-600'}`}>
                <div className="flex items-center gap-1.5">
                  <User size={16} />
                  <span>{formatDate(review.createdAt)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Code size={16} />
                  <span className="capitalize">{review.language}</span>
                </div>
              </div>
            </div>

            {/* Status Badge */}
            <StatusBadge variant={review.status}>
              {statusDisplayText[review.status]}
            </StatusBadge>
          </div>

          {/* Tags */}
          {review.tags && review.tags.length > 0 && (
            <div className="flex items-center gap-2 mt-4">
              {review.tags.map((tag) => (
                <span key={tag} className={`${isDark ? 'px-2.5 py-1 bg-gray-700 text-gray-300 text-xs rounded-full' : 'px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-full'}`}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Description and Code */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description Section */}
            <div className={`${isDark 
              ? 'bg-[#2a2a2a] rounded-lg border border-[#2a2a2a] p-6' 
              : 'bg-white rounded-lg border border-gray-200 p-6'
              }`}
              >
                <h2 className={`${isDark ? 'text-xl font-semibold text-white mb-4' : 'text-xl font-semibold text-gray-900 mb-4'}`}>
                  Description
                </h2>
                <p className={`${isDark ? 'text-gray-300 whitespace-pre-line' : 'text-gray-700 whitespace-pre-line'}`}>
                  {review.description}
                </p>
            </div>

            {/* Code Section */}
            <div className={`${isDark ? 'bg-[#1e1e1e] rounded-lg border border-[#2a2a2a] overflow-hidden' : 'bg-white rounded-lg border border-gray-200 overflow-hidden'}`}>
              <div className={`${isDark ? 'flex items-center justify-between px-6 py-4 border border-[#2a2a2a]' : 'flex items-center justify-between px-6 py-4 border border-gray-200'}`}>
                <h2 className={`${isDark ? 'text-xl font-semibold text-white' : 'text-xl font-semibold text-gray-900'}`}>
                  Code
                </h2>
                <span className={isDark ? 'text-sm text-gray-400 capitalize' : 'text-sm text-gray-500 capitalize'}>
                  {review.language}
                </span>
              </div>
              <div className="p-0">
                <pre className={`${isDark ? 'p-6 overflow-x-auto bg-gray-900' : 'p-6 overflow-x-auto bg-gray-50'}`}>
                  <code className={`${isDark ? 'text-sm text-gray-200 font-mono' : 'text-sm text-gray-800 font-mono'}`}>
                    {review.code}
                  </code>
                </pre>
              </div>
            </div>

            {/* Comment Section */}
            <div className={`${isDark ? 'bg-[#1e1e1e] rounded-lg border border-[#2a2a2a] p-6' : 'bg-white rounded-lg border border-gray-200 p-6'}`}>
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare size={20} className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                <h2 className={`${isDark ? 'text-xl font-semibold text-white' : 'text-xl font-semibold text-gray-900'}`}>
                  Comments ({review.commentCount})
                </h2>
              </div>
              <p className={`${isDark ? 'text-gray-400 text-center py-8' : 'text-gray-500 text-center py-8'}`}>
                Comment coming soon!
              </p>
            </div>
          </div>

          {/* Right Column: Actions and Info */}
          <div className="space-y-6">
            {/* Actions Card */}
            <div className={`${isDark ? 'bg-[#1e1e1e] rounded-lg border border-[#2a2a2a] p-6' : 'bg-white rounded-lg border border-gray-200 p-6'}`}>
              <h3 className={`${isDark ? 'text-lg font-semibold text-white mb-4' : 'text-lg font-semibold text-gray-900 mb-4'}`}>
                Actions
              </h3>
              <div className="space-y-3">
                <Button
                  variant="primary"
                  icon={CheckCircle}
                  onClick={handleApprove}
                  className={`${isDark ? 'w-full' : 'w-full bg-gray-800 hover:bg-gray-500 transition-colors'}`}
                >
                  Approve
                </Button>

                <Button
                  variant="outline"
                  icon={XCircle}
                  onClick={handleRequestChanges}
                  className={`${isDark ? 'w-full' : 'w-full hover:bg-gray-900 hover:text-white transition-colors'}`}
                >
                  Request Changes
                </Button>

                <Button
                  variant="ghost"
                  icon={MessageSquare}
                  className={`${isDark ? 'w-full' : 'w-full border-2 border-gray-900'}`}
                >
                  Add Comment
                </Button>
              </div>
            </div>

            {/* Review Info Card */}
            <div className={`${isDark ? 'bg-[#1e1e1e] rounded-lg border border-[#2a2a2a] p-6' : 'bg-white rounded-lg border border-gray-200 p-6'}`}>
              <h3 className={`${isDark ? 'text-lg font-semibold text-white mb-4' : 'text-lg font-semibold text-gray-900 mb-4'}`}>
                Review Information
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Status:</span>
                  <p className={`${isDark ? 'text-white font-medium mt-1' : 'text-gray-900 font-medium mt-1'}`}>
                    {statusDisplayText[review.status]}
                  </p>
                </div>
                <div>
                  <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Author:</span>
                  <p className={`${isDark ? 'text-white font-medium mt-1' : 'text-gray-900 font-medium mt-1'}`}>
                    {review.author}
                  </p>
                </div>
                <div>
                  <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Created:</span>
                  <p className={`${isDark ? 'text-white font-medium mt-1' : 'text-gray-900 font-medium mt-1'}`}>
                    {formatDate(review.createdAt)}
                  </p>
                </div>
                <div>
                  <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Language:</span>
                  <p className={`${isDark ? 'text-white font-medium mt-1' : 'text-gray-900 font-medium mt-1'}`}>
                    {review.language}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}