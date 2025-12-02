import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle, Zap, Users, TrendingUp,
  Code, MessageSquare, Award, Star, Play, Github
} from 'lucide-react';
import Button from '../components/ui/Button';
import { useTheme } from '../context/ThemeContext';


export default function LandingPage() {
  const { isDark } = useTheme();

  const features = [
    {
      icon: Zap,
      title: 'AI-Powered Code Mentor',
      description:  'Get intelligent suggestions and learn WHY, not just WHAT to fix. Our AI explains concepts in plain English.',
    },
    {
      icon: Users,
      title: 'Live Code Review Sessions',
      description: 'Real-time collaborative reviews with video, voice, and live cursor tracking. Review in minutes, not days.',
    },
    {
      icon: TrendingUp,
      title: 'Track Your Growth',
      description: 'Visual timelines show your code evolution. See your improvement over time with detailed metrics.',
    },
    {
      icon: Award,
      title: 'Smart Reviewer Matching',
      description: 'We match your code with the perfect reviewer based on expertise, quality scores, and availability.',
    }
  ];

  const stats = [
    { value: '10k+', label: 'Developers' },
    { value: '50K+', label: 'Reviews Completed' },
    { value: '95%', label: 'Faster Reviews' },
    { value: '4.9/5', label: 'User Rating' },
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Senior Engineer @ TechCorp',
      avatar: 'SC',
      text: 'Recode transformed how our team reviews code. The AI mentor helped our juniors level up 3x faster.',
      rating: 5,
    },
    {
      name: 'Mike Johnson',
      role: 'Tech Lead @ StartupXYZ',
      avatar: 'MJ',
      text: 'Live sessions are a game-changer. We cut review time from days to hours. The quality scores help us recognize great reviewers.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Full-Stack Developer',
      avatar: 'ER',
      text: "I've learned more in 3 months on Recode than in my last year of coding. The visual progress tracking is incredibly motivating!",
      rating: 5,
    },
  ];

  // How It Works Step
  const steps = [
    {
      number: '01',
      title: 'Submit Your Code',
      description: 'Upload or paste your code. Our AI instantly analyzes it for issues and improvements.',
    },
    {
      number: '02',
      title: 'Get Matched & Reviewed',
      description: 'AI matches you with expert reviewers. Choose async comments or live video sessions.',
    },
    {
      number: '03',
      title: 'Learn & Improve',
      description: 'Receive detailed feedback with explanations. Track your growth over time.',
    },
  ];

  const pricingTiers = [
    {
      name: 'Free',
      price: '$0',
      description: 'Perfect for individuals',
      features: [
        '5 reviews per month',
        'AI code analysis',
        'Community support',
        'Basic analytics',
      ],
      cta: 'Start Free',
      highlighted: false,
    },
    {
      name: 'Pro',
      price: '$19',
      description: 'For serious developers',
      features: [
        'Unlimited reviews',
        'Live review sessions',
        'Priority matching',
        'Advanced analytics',
        'Code evolution timeline',
        'Video recordings',
      ],
      cta: 'Start Pro Trial',
      highlighted: true,
    },
    {
      name: 'Team',
      price: '$49',
      description: 'Per user/month',
      features: [
        'Everything in Pro',
        'Team dashboard',
        'Review quality metrics',
        'Custom workflows',
        'SSO integration',
        'Dedicated support',
      ],
      cta: 'Contact Sales',
      highlighted: false,
    },
  ];


  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#121212]' : 'bg-white'}`}>
      {/* Hero Section */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${isDark ? 'from-gray-900 dark:via-[#0438c7]/20 to-purple-900/20' : 'from-[#eff6ff] via-purple-50 to-pink-50'}`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5">
          <div className="relative mx-w-7xl mx-auto px-4 sm:px-4 lg:px-8 py-20 lg:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Text Content */}
              <div>
                {/* Badge */}
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full shadow-sm mb-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                  <span className={`text-xs font-semibold ${isDark ? 'text-[#5193fd]' : 'text-[#2563eb]'}`}>
                    Trusted by 10,000+ developers
                  </span>
                </div>

                {/* Headline */}
                <h1 className={`text-5xl lg:text-6xl font-bold leading-tight ${isDark ? 'text-white' : 'text-gray-900 mb-6'}`}>
                  Code Reviews That
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#2563eb] to-purple-[#2563eb]">
                    Make You Better
                  </span>
                </h1>
                
                {/* Bubheadline */}
                <p>
                  More than just feedback. Recode is your AI-powered mentor, 
                  connecting you with expert reviewers for real-time collaboration 
                  and continuous learning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}