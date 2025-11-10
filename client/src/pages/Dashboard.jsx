import { FileCode, CheckCircle, Clock, Users } from 'lucide-react';
import StatCard from '../components/ui/StatCard';
import ReviewCard from '../components/features/ReviewCard';

/* Dashboard Component */
export default function Dashboard() {
  /** SAMPLE DATA **/
  const stats = [
    {
      title: 'Total Reviews',
      value: 24,
      icon: FileCode,
      trend: { value: 12, isPositive: true },
      iconColor: 'bg-blue-500'
    },
    {
      title: 'Approved',
      value: 18,
      icon: CheckCircle,
      trend: { value: 8, isPositive: true },
      iconColor: 'bg-green-500'
    },
    {
      title: 'Pending',
      value: 6,
      icon: Clock,
      trend: { value: 3, isPositive: false },
      iconColor: 'bg-yellow-500'
    },
    {
      title: 'Team Members',
      value: 12,
      icon: Users,
      iconColor: 'bg-purple-500'
    },
  ];

  const recentReviews = [
    {
      id: '1',
      title: 'Refactor authentication middleware',
      author: 'Sarah Chen',
      status: 'pending',
      language: 'TypeScript',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      commentCount: 3,
    },
    {
      id: '2',
      title: 'Add user profile API endpoints',
      author: 'Mike Johnson',
      status: 'approved',
      language: 'Python',
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      commentCount: 7,
    },
    {
      id: '3',
      title: 'Fix responsive layout issues on mobile',
      author: 'Emily Rodriguez',
      status: 'changes-requested',
      language: 'JavaScript',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      commentCount: 12,
    },
    {
      id: '4',
      title: 'Optimize database queries for dashboard',
      author: 'David Kim',
      status: 'merged',
      language: 'Go',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      commentCount: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 
        HEADER SECTION 
        Contains the page title and description
      */}
      <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Page title */}
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          
          {/* Subtitle/description */}
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Welcome back! Here's what's happening with your code reviews.
          </p>
        </div>
      </header>

      {/* MAIN CONTENT SECTION */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
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
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
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
    </div>
  );
}