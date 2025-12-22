import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Github, Mail } from "lucide-react";
import Button from "../components/ui/Button";
import FormInput from "../components/ui/FormInput";
import { useToast } from "../components/ui/Toast";
import { useTheme } from "../context/ThemeContext";


export default function Login() {
  const navigate = useNavigate();
  const { success, error } = useToast();
  const { isDark } = useTheme();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update Field
  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value}));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      success('Welcome back!');

      // Navigate to dashboard
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);

    } catch(err) {
      error('Invalid email or password');
    } finally {
      setIsSubmitting(false);
    }
  };

   return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${isDark ? 'dark:bg-[#121212]' : 'bg-gray-50'}`}>
      <div className="w-full max-w-md">

        {/* Card */}
            <div className={`rounded-lg border p-8 ${isDark ? 'border-[#2a2a2a] bg-[#1e1e1e]' : 'border-gray-200 bg-white'}`}>
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Welcome Back
            </h1>
            <p className={`${isDark ?  'text-gray-400' : 'text-gray-600' }`}>
              Sign in to your account to continue
            </p>
          </div>

          {/* Social Auth Buttons */}
          <div className="space-y-3 mb-6">
            <button className={`w-full flex items-center justify-center gap-3 px-4 py-3 border rounded-lg transition-colors hover:cursor-pointer ${isDark ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'}`}>
              <Github size={20} className={`${isDark ? 'text-white' : ''}`} />
              <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Continue with GitHub
              </span>
            </button>
            <button className={`w-full flex items-center justify-center gap-3 px-4 py-3 border rounded-lg transition-colors hover:cursor-pointer ${isDark ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'}`}>
              <Mail size={20} className={`${isDark ? 'text-white' : ''}`} />
              <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Continue with Google
              </span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className={`w-full border-t ${isDark ? 'border-gray-600' : 'border-gray-300'}`}></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className={`px-2  ${isDark ? 'bg-[#121212] text-gray-400' : 'bg-white text-gray-500'}`}>
                Or continue with email
              </span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email */}
            <FormInput
              type="email"
              label="Email Address"
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="you@example.com"
              error={errors.email}
              required
             />

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Password <span className="text-red-500">*</span>
                </label>
                <Link
                  to="/forgot-password"
                  className={`text-sm hover:underline ${isDark ? 'text-blue-400' : 'text-blue-600'}`}
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => updateField('password', e.target.value)}
                  placeholder="Enter your password"
                  className={`
                    w-full px-3 py-2 pr-10 rounded-lg
                    border ${errors.password ? 'border-red-500' : 'border-gray-300 dark:border-dark-border'}
                    ${isDark 
                      ? 'text-white placeholder:text-gray-500 bg-[#121212]' 
                      : 'text-gray-900 placeholder:text-gray-400 bg-white'
                    }
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  `}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={formData.remember}
                onChange={(e) => updateField('remember', e.target.checked)}
                className={`w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 hover:cursor-pointer`}
              />
              <label htmlFor="remember" className={`ml-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Remember me for 30 days
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              loading={isSubmitting}
            >
              Sign In
            </Button>
          </form>
        </div>

        {/* Sign Up Link */}
        <p className={`text-center mt-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Don't have an account?{' '}
          <Link to="/signup" className={`hover:underline font-medium ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}