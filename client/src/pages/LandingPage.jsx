import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle, Zap, Users, TrendingUp,
  Code, MessageSquare, Award, Star, Play, Github,
} from 'lucide-react';
import Button from '../components/ui/Button';
import { useTheme } from '../context/ThemeContext';
import ImportCode from '../pages/ImportCode';
import RightColumn from '../components/landing/RightColumn';

export default function LandingPage() {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#121212]' : 'bg-white'}`}>
      {/* Hero Section */}
      <section className={`relative overflow-hidden py-20 lg:py-32 `}>
        <div className="relative max-w-7xl mx-auto  ">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <ImportCode />
            </div>
            <div className="lg:col-span-1">
              <RightColumn />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={` py-12 text-gray-300 ${isDark ? 'bg-[#121212]' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="pt-8 border-t border-gray-800 flex  justify-center items-center">
            <p className={`text-sm text-center ${isDark ? '' : 'text-gray-800'}`}>© 2025 mergecode. All rights reserved.</p>
            
          </div>
        </div>
      </footer>

    </div>
  )
}