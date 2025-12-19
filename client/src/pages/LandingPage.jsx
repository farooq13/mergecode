import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle, Zap, Users, TrendingUp,
  Code, MessageSquare, Award, Star, Play, Github
} from 'lucide-react';
import Button from '../components/ui/Button';
import { useTheme } from '../context/ThemeContext';


export default function LandingPage() {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#121212]' : 'bg-white'}`}>
      {/* Hero Section */}
      <section className={`relative overflow-hidden py-20 lg:py-32 `}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="items-center">
            {/* Left: Text Content */}
            <div>
              {/* Headline */}
              <h1 className={`text-5xl lg:text-6xl font-bold leading-tight mb-6 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Code Reviews That Make You Better
              </h1>
              <p className="text-xl opacity-90 text-center">
                 Join 10,000+ developers who are writing better code every day
               </p>
              {/* CTA Buttons */}
              <div className='flex justify-center items-center mt-12'>
                <Link to="/signup">
                  <Button variant="secondary" size='lg' icon={ArrowRight} className='w-64 h-14'>
                    Start Free
                  </Button>
                </Link>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* Add animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 3s ease-in-out infinite 1s;
        }
        .bg-grid-pattern {
          background-image: radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  )
}