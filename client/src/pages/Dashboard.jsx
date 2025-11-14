import { FileCode, CheckCircle, Clock, Users, Plus } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import StatCard from '../components/ui/StatCard';
import ReviewCard from '../components/features/ReviewCard';
import SubmissionForm from '../components/features/SubmissionForm';
import Button from '../components/ui/Button';


export default function Dashboard() {
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const { isDark } = useTheme();

  // Sample Data
  const stats = [
    {
      title: 'Total Reviews',
      value: 24,
      icon: FileCode,
      trend: { value: 12, isPositive: true },
    },
    {
      title: 'Approved',
      value: 18,
      icon: CheckCircle,
      trend: { value: 8, isPositive: true },
    },
    {
      title: 'Pending',
      value: 6,
      icon: Clock,
      trend: { value: 3, isPositive: false },
    },
    {
      title: 'Team Members',
      value: 12,
      icon: Users,
    },
  ];

  const [reviews, setReviews] = useState([
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
  ]);

  const handleNewReview = (newReview) => {
    setReviews(prev => [newReview, ...prev]);
    console.log('New review added:', newReview);
  }

  const recentReviews = reviews.slice(0,4); // Show only first 4 reviews

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#121212]' : 'bg-gray-50'}`}>
      
      {/* MAIN CONTENT SECTION */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* New Review Button - Floating Action */}
        <div className="flex justify-end mb-6">
          <Button
            variant='primary'
            icon={Plus}
            onClick={() => setShowSubmissionForm(true)}
            className={`${isDark ? '' : 'bg-[#121212]'}`}
          >
            New Review
          </Button>
        </div>

        {/* METRICS GRID*/}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
       
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              trend={stat.trend}
              iconColor={stat.iconColor}
            />
          ))}
        </div>
        
        {/* Recent Submissions Section - Shows the latest code submitted */}
        <div className="mt-8">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className={`${isDark ? 'text-2xl font-bold text-gray-900 text-white' : 'text-2xl font-bold text-gray-900' }`}>
              Recent Submissions
            </h2>
            <button className="text-sm text-primary-600 dark:text-primary-400 hover:cursor-pointer hover:text-primary-700 dark:hover:text-primary-300 font-medium">
              View All →
            </button>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {recentReviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                onClick={() => console.log('Clicked review:', review.id)}
              />
            ))}
          </div>

          {/* Empty State - Shows when no reviews */}
          {recentReviews.length === 0 && (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400">
                No reviews yet. Create your first one!
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Submission Form - only shows when showSubmissionForm is true */}
      <SubmissionForm 
        isOpen={showSubmissionForm}
        onClose={() => setShowSubmissionForm(false)}
        onSubmit={handleNewReview}
      />
    </div>
  );
}