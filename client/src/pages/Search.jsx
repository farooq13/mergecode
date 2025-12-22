import { useState, useMemo } from 'react';
import { Search as SearchIcon, Filter, X } from 'lucide-react';
import ReviewCard  from '../components/features/ReviewCard';
import FormInput  from '../components/ui/FormInput';
import  Button  from '../components/ui/Button';
import { useTheme } from '../context/ThemeContext';
import { getStoredReviews, saveReviewsToStorage } from '../utils/reviewStorage';


export function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    language: 'all',
    author: 'all',
  });
  const [showFilters, setShowFilters] = useState(false);
  const { isDark } = useTheme();



  // Initialize allReviews from localStorage if present, otherwise use defaults and persist them
  const [allReviews, setAllReviews] = useState(() => {
    const stored = getStoredReviews();
    if (!stored || stored.length === 0) {
      // Persist defaults for future loads
      saveReviewsToStorage(defaultReviews);
      return defaultReviews;
    }
    return stored;
  });

  /* 
     FILTER REVIEWS
     Uses useMemo to avoid recalculating on every render
   */
  const filteredReviews = useMemo(() => {
    return allReviews.filter((review) => {
      // Search query filter
      const matchesSearch = 
        searchQuery === '' ||
        review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.author.toLowerCase().includes(searchQuery.toLowerCase());

      // Status filter
      const matchesStatus = 
        filters.status === 'all' || 
        review.status === filters.status;

      // Language filter
      const matchesLanguage = 
        filters.language === 'all' || 
        review.language === filters.language;

      // Author filter
      const matchesAuthor = 
        filters.author === 'all' || 
        review.author === filters.author;

      return matchesSearch && matchesStatus && matchesLanguage && matchesAuthor;
    });
  }, [searchQuery, filters, allReviews]);

  // Get unique values for filter options
  const uniqueLanguages = [...new Set(allReviews.map(r => r.language))];
  const uniqueAuthors = [...new Set(allReviews.map(r => r.author))];

 
  const resetFilters = () => {
    setFilters({
      status: 'all',
      language: 'all',
      author: 'all',
    });
    setSearchQuery('');
  };

  // Count Active Filters 
  const activeFilterCount = Object.values(filters).filter(v => v !== 'all').length;

  return (
    <div className={`min-h-screen pb-12 ${isDark ? 'dark:bg-[#121212]' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={` border-b ${isDark ? 'bg-[#1e1e1e] border-[#2a2a2a]' : 'bg-white border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Search Reviews
          </h1>
          <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Find reviews by title, author, language, or status
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Search Bar */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <SearchIcon 
              size={20} 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title or author..."
              className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 ${isDark ? 'border-gray-50 text-white bg-[#1e1e1e]' : 'text-gray-900 bg-white border-gray-900'}`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:cursor-pointer ${isDark ? 'hover:text-gray-300' : 'hover:text-gray-600'}`}
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Filter Toggle Button */}
          <Button
            variant="outline"
            icon={Filter}
            onClick={() => setShowFilters(!showFilters)}
            className={`relative ${isDark ? 'border border-gray-500 text-white' : ''}`}
          >
            Filters
            {activeFilterCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#3b82f6] text-white text-xs rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </Button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className={`rounded-lg border p-6 mb-6 ${isDark ? 'bg-[#1e1e1e] border-[#2a2a2a]' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Filters
              </h3>
              <button
                onClick={resetFilters}
                className={`text-sm hover:underline hover:cursor-pointer ${isDark ? 'text-[#3b82f6]' : 'text-[#2563eb]'}`}
              >
                Reset All
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Status Filter */}
              <FormInput
                type="select"
                label="Status"
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                options={[
                  { value: 'all', label: 'All Statuses' },
                  { value: 'draft', label: 'Draft' },
                  { value: 'pending', label: 'Pending' },
                  { value: 'approved', label: 'Approved' },
                  { value: 'changes-requested', label: 'Changes Requested' },
                  { value: 'merged', label: 'Merged' },
                ]}
              />

              {/* Language Filter */}
              <FormInput
                type="select"
                label="Language"
                value={filters.language}
                onChange={(e) => setFilters({ ...filters, language: e.target.value })}
                options={[
                  { value: 'all', label: 'All Languages' },
                  ...uniqueLanguages.map(lang => ({ value: lang, label: lang })),
                ]}
              />

              {/* Author Filter */}
              <FormInput
                type="select"
                label="Author"
                value={filters.author}
                onChange={(e) => setFilters({ ...filters, author: e.target.value })}
                options={[
                  { value: 'all', label: 'All Authors' },
                  ...uniqueAuthors.map(author => ({ value: author, label: author })),
                ]}
              />
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {filteredReviews.length} {filteredReviews.length === 1 ? 'result' : 'results'} found
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        {/* Results Grid */}
        {filteredReviews.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border p-12 text-center">
            <SearchIcon size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No results found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Try adjusting your search or filters
            </p>
            <Button variant="outline" onClick={resetFilters}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
