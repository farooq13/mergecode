import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileCode, Plus, Search as SearchIcon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import ReviewCard from '../components/features/ReviewCard';
import SubmissionForm from '../components/features/SubmissionForm';
import Button from '../components/ui/Button';
import { getStoredReviews, saveReviewsToStorage } from '../utils/reviewStorage';

export default function Reviews() {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Initial reviews data (built-in defaults)
  const defaultReviews = [
    {
      id: '1',
      title: 'Refactor authentication middleware',
      author: 'Faruk Idris',
      status: 'pending',
      language: 'TypeScript',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      commentCount: 3,
    },
    {
      id: '2',
      title: 'Add user profile API endpoints',
      author: 'Adam Muhammad',
      status: 'approved',
      language: 'Python',
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
      commentCount: 7,
    },
    {
      id: '3',
      title: 'Fix responsive layout issues on mobile',
      author: 'Muhammad Kabeer',
      status: 'changes-requested',
      language: 'JavaScript',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      commentCount: 12,
    },
    {
      id: '4',
      title: 'Optimize database queries for dashboard',
      author: 'David Kim',
      status: 'merged',
      language: 'Go',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      commentCount: 5,
    },
    {
      id: '5',
      title: 'Implement caching strategy for API',
      author: 'You',
      status: 'pending',
      language: 'Node.js',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      commentCount: 8,
    },
    {
      id: '6',
      title: 'Add unit tests for utility functions',
      author: 'You',
      status: 'approved',
      language: 'JavaScript',
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      commentCount: 4,
    },
  ];

  // Load reviews from localStorage or use defaults
  const [reviews, setReviews] = useState(() => {
    const stored = getStoredReviews();
    // If localStorage is empty, use default reviews and save them
    if (stored.length === 0) {
      saveReviewsToStorage(defaultReviews);
      return defaultReviews;
    }
    return stored;
  });

  const handleNewReview = (newReview) => {
    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    // Persist to localStorage
    saveReviewsToStorage(updatedReviews);
  };

  // Filter reviews based on search query
  const filteredReviews = reviews.filter(review =>
    review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    review.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    review.language.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#121212]' : 'bg-gray-50'}`}>
      {/* MAIN CONTENT SECTION */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            All Reviews
          </h1>
          <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Browse and manage all code reviews
          </p>
        </div>

        {/* Controls Section */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Search Bar */}
          <div className={`flex-1 max-w-md px-4 py-2 rounded-lg border ${isDark ? 'bg-[#1e1e1e] border-[#2a2a2a]' : 'bg-white border-gray-300'}`}>
            <div className="flex items-center gap-2">
              <SearchIcon size={18} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
              <input
                type="text"
                placeholder="Search reviews by title, author, or language..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`flex-1 bg-transparent outline-none ${isDark ? 'text-white placeholder:text-gray-500' : 'text-gray-900 placeholder:text-gray-400'}`}
              />
            </div>
          </div>

          {/* New Review Button */}
          <Button
            variant="primary"
            icon={Plus}
            onClick={() => setShowSubmissionForm(true)}
            className={`${isDark ? '' : 'bg-[#121212]'}`}
          >
            New Review
          </Button>
        </div>

        {/* Reviews Grid */}
        {filteredReviews.length === 0 ? (
          <div className={`text-center py-12 rounded-lg border ${isDark ? 'bg-[#1e1e1e] border-[#2a2a2a]' : 'bg-white border-gray-200'}`}>
            <FileCode size={48} className={`mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
            <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>
              {searchQuery ? 'No reviews match your search.' : 'No reviews yet.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredReviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                onClick={() => navigate(`/review/${review.id}`)}
              />
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="mt-8 pt-8 border-t" style={{ borderColor: isDark ? '#2a2a2a' : '#e5e7eb' }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className={`p-4 rounded-lg ${isDark ? 'bg-[#1e1e1e]' : 'bg-white'}`}>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Reviews</p>
              <p className={`text-2xl font-bold mt-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {reviews.length}
              </p>
            </div>
            <div className={`p-4 rounded-lg ${isDark ? 'bg-[#1e1e1e]' : 'bg-white'}`}>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Approved</p>
              <p className={`text-2xl font-bold mt-2 ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                {reviews.filter(r => r.status === 'approved').length}
              </p>
            </div>
            <div className={`p-4 rounded-lg ${isDark ? 'bg-[#1e1e1e]' : 'bg-white'}`}>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Pending</p>
              <p className={`text-2xl font-bold mt-2 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
                {reviews.filter(r => r.status === 'pending').length}
              </p>
            </div>
            <div className={`p-4 rounded-lg ${isDark ? 'bg-[#1e1e1e]' : 'bg-white'}`}>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Merged</p>
              <p className={`text-2xl font-bold mt-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                {reviews.filter(r => r.status === 'merged').length}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Submission Form Modal */}
      <SubmissionForm
        isOpen={showSubmissionForm}
        onClose={() => setShowSubmissionForm(false)}
        onSubmit={handleNewReview}
      />
    </div>
  );
}
