import React, { useEffect } from 'react';
import { useTheme } from './context/ThemeContext'
import Dashboard from './pages/Dashboard';
import Reviews from './pages/Reviews';
import Header from './components/layout/Header';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import  ReviewDetail  from './pages/ReviewDetail';
import Analytics from './pages/Analytics';
import { Search } from './pages/Search';
import { Settings } from './pages/Settings';
import { ToastProvider } from './components/ui/Toast';
import FullPageLoader from './components/ui/FullPageLoader';
import { useLoading } from './context/LoadingContext';
import NotificationBridge from './components/ui/NotificationBridge';
import LandingPage from './pages/LandingPage';


function AppContent() {
  const { isDark } = useTheme();
  const location = useLocation();
  const { isLoading, hideLoader } = useLoading();

  // Hide loader when route/location changes
  useEffect(() => {
    if (isLoading) {
      // small timeout so loader is visible briefly when navigation is instant
      const t = setTimeout(() => hideLoader(), 150);
      return () => clearTimeout(t);
    }
    // If not loading, nothing to do on location change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <div className={`app min-h-screen transition-colors duration-300 ${isDark ? 'bg-[#121212]' : 'bg-gray-50'}`}>
      {/* Header */}
      <Header />
      {/* Bridge for non-React notifications -> Toasts */}
      <NotificationBridge />
      {/* Route */}
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/reviews' element={<Reviews />} />
        <Route path='/review/:id' element={<ReviewDetail />} />
        <Route path='/analytics' element={<Analytics />} />
        <Route path='/search' element={<Search />} />
        <Route path='/settings' element={<Settings />} />
      </Routes>
      {isLoading && <FullPageLoader />}
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App
