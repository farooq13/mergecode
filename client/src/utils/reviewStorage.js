const STORAGE_KEY = 'mergecode_reviews';

export function getStoredReviews() {
  try {
    const rawStoredString = localStorage.getItem(STORAGE_KEY);
    if (rawStoredString) {
      const parsedReviews = JSON.parse(rawStoredString);
      // Convert createdAt strings back to Date objects
      return parsedReviews.map((storedReview) => ({
        ...storedReview,
        createdAt: new Date(storedReview.createdAt),
      }));
    }
  } catch (error) {
    // Notify user instead of logging
    try {
      const { notify } = require('./notify');
      notify('error', 'Failed to read stored reviews.');
    } catch (e) {
      
    }
  }
  return [];
}

export function saveReviewsToStorage(reviews) {
  try {
    const serialized = reviews.map((reviewItem) => ({
      ...reviewItem,
      createdAt:
        reviewItem.createdAt instanceof Date
          ? reviewItem.createdAt.toISOString()
          : new Date(reviewItem.createdAt).toISOString(),
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serialized));
  } catch (error) {
    try {
      const { notify } = require('./notify');
      notify('error', 'Failed to save reviews to storage.');
    } catch (e) {
     
    }
  }
}

export default {
  getStoredReviews,
  saveReviewsToStorage,
};
