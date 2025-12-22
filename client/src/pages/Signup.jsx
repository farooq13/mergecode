import { useState } from "react";
import { Form, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Eye, EyeOff, Github, Languages, Mail } from 'lucide-react';
import Button from "../components/ui/Button";
import FormInput from "../components/ui/FormInput";
import FormStep from "../components/ui/FormStep";
import { useToast } from "../components/ui/Toast";
import { useTheme } from "../context/ThemeContext";


export default function Signup() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const { success, error } = useToast();

 const [currentStep, setCurrentStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    // Step 1: Account
    email: '',
    password: '',
    confirmPassword: '',
    
    // Step 2: Profile
    fullName: '',
    role: '',
    company: '',
    
    // Step 3: Preferences
    languages: [],
    emailNotifications: true,
    weeklyDigest: true,
  });


  const [errors, setErrors] = useState({});

 // Form Steps Configuration
  const steps = [
    { id: 'account', title: 'Account', description: 'Create your account' },
    { id: 'profile', title: 'Profile', description: 'Tell us about you' },
    { id: 'preferences', title: 'Preferences', description: 'Customize your experience' },
  ];


  const languageOptions = [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'Go', 
    'Rust', 'C++', 'C#', 'Ruby', 'PHP'
  ];


  const roleOptions = [
    { value: 'developer', label: 'Developer' },
    { value: 'senior', label: 'Senior Developer' },
    { value: 'lead', label: 'Tech Lead' },
    { value: 'manager', label: 'Engineering Manager' },
    { value: 'student', label: 'Student' },
    { value: 'other', label: 'Other' },
  ];

  // Update form data
  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };


  const toggleLanguage = (language) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }));
  };

  const validateStep = () => {
    const newErrors = {};

    if (currentStep === 0) {
      // Step 1: Account validation
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }

      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
        newErrors.password = 'Password must contain uppercase, lowercase, and number';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    if (currentStep === 1) {
      // Step 2: Profile validation
      if (!formData.fullName) {
        newErrors.fullName = 'Full name is required';
      }
      if (!formData.role) {
        newErrors.role = 'Please select a role';
      }
    }

    if (currentStep === 2) {
      // Step 3: Preferences validation
      if (formData.languages.length === 0) {
        newErrors.languages = 'Select at least one language';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('Signup data:', formData);
      success('Account created successfully!');
      
      // Navigate to dashboard
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (err) {
      error('Failed to create account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Password Strength Indicator
  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return { strength: 0, label: '', color: '' };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*]/.test(password)) strength++;

    const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];

    return { strength, label: labels[strength], color: colors[strength] };
  };

  const passwordStrength = getPasswordStrength();
  
   return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${isDark ? 'bg-[#121212]'  : 'bg-gray-50'}`}>
      <div className="w-full max-w-4xl">
        
        
        {/* Multi-Step Form */}
        <FormStep steps={steps} currentStep={currentStep}>
          
          {/* STEP 1: ACCOUNT DETAILS */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className={`text-2xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Create Your Account
                </h2>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Start with your email and password
                </p>
              </div>

              {/* Social Auth Buttons */}
              <div className="space-y-3">
                <button className={`w-full flex items-center justify-center gap-3 px-4 py-3 border  rounded-lg transition-colors hover:cursor-pointer ${isDark ? 'hover:bg-gray-700 border-gray-300' : 'hover:bg-gray-50 border-[#2a2a2a]'}`}>
                  <Github size={20} className={`${isDark ? 'text-white' : ''}`} />
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Continue with GitHub
                  </span>
                </button>
                <button className={`w-full flex items-center justify-center gap-3 px-4 py-3 border  rounded-lg transition-colors hover:cursor-pointer ${isDark ? 'hover:bg-gray-700 border-gray-300' : 'hover:bg-gray-50 border-[#2a2a2a]'}`}>
                  <Mail size={20} className={`${isDark ? 'text-white' : ''}`} />
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Continue with Google
                  </span>
                </button>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className={`w-full border-t ${isDark ? 'border-gray-600' : 'border-gray-300'}`}></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className={`px-2 ${isDark ? 'bg-[#121212] text-gray-400' : 'bg-white text-gray-500'}`}>
                    Or continue with email
                  </span>
                </div>
              </div>

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
                <label className={`block text-sm font-medium  mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => updateField('password', e.target.value)}
                    placeholder="Create a strong password"
                    className={`
                      w-full px-3 py-2 pr-10 rounded-lg
                      focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                      border ${errors.password ? 'border-red-500' : `${isDark ? 'border-[#2a2a2a]' : 'border-gray-300'}`}
                      ${isDark 
                      ? 'text-white placeholder:text-gray-500 bg-[#121212]'
                      : 'text-gray-900 placeholder:text-gray-400 bg-white'
                      }
                    `}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 ${isDark ? 'hover:text-gray-300' : 'hover:text-gray-600'}`}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {/* Password Strength */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full ${
                            i < passwordStrength.strength
                              ? passwordStrength.color
                              : `${isDark ? 'bg-gray-700' : 'bg-gray-200'}`
                          }`}
                        />
                      ))}
                    </div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {passwordStrength.label} password
                    </p>
                  </div>
                )}

                {errors.password && (
                  <p className={`mt-1.5 text-sm ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <FormInput
                type="password"
                label="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => updateField('confirmPassword', e.target.value)}
                placeholder="Re-enter your password"
                error={errors.confirmPassword}
                required
              />

              {/* Terms */}
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                By creating an account, you agree to our{' '}
                <a href="#" className={`hover:underline ${isDark ? 'text-[#3b82f6]' : 'text-[#2563eb]'}`}>
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className={`hover:underline ${isDark ? 'text-[#3b82f6]' : 'text-[#2563eb]'}`}>
                  Privacy Policy
                </a>
              </p>
            </div>
          )}

          {/* STEP 2: PROFILE */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className={`text-2xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Set Up Your Profile
                </h2>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Help us personalize your experience
                </p>
              </div>

              <FormInput
                label="Full Name"
                value={formData.fullName}
                onChange={(e) => updateField('fullName', e.target.value)}
                placeholder="Your Name"
                error={errors.fullName}
                required
              />

              <FormInput
                type="select"
                label="Role"
                value={formData.role}
                onChange={(e) => updateField('role', e.target.value)}
                options={roleOptions}
                error={errors.role}
                required
              />

              <FormInput
                label="Company (Optional)"
                value={formData.company}
                onChange={(e) => updateField('company', e.target.value)}
                placeholder="Your company name"
              />
            </div>
          )}

          {/* STEP 3: PREFERENCES */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className={`text-2xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Customize Your Experience
                </h2>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Choose your preferred languages and settings
                </p>
              </div>

              {/* Language Selection */}
              <div>
                <label className={`block text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Programming Languages <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {languageOptions.map((language) => (
                    <button
                      key={language}
                      type="button"
                      onClick={() => toggleLanguage(language)}
                      className={`
                        px-4 py-2 rounded-lg border-2 transition-all
                        ${formData.languages.includes(language)
                          ? `border-[#3b82f6] ${isDark ? 'dark:bg-blue-900/20 text-blue-300' : 'bg-blue-50 text-[#1d4ed8]'}`
                          : `${isDark ? 'border-gray-600 hover:border-gray-500 text-white' : 'border-gray-300  hover:border-gray-400'}`
                        }
                      `}
                    >
                      <span className="font-medium">{language}</span>
                    </button>
                  ))}
                </div>
                {errors.languages && (
                  <p className={`mt-2 text-sm ${isDark ? 'dark:text-red-400' : 'text-red-600'}`}>
                    {errors.languages}
                  </p>
                )}
              </div>

              {/* Notification Preferences */}
              <div className="space-y-4">
                <label className={`block text-sm font-medium  ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Notification Preferences
                </label>

                <div className={`flex items-center justify-between py-3 border-b  ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Email Notifications
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Receive updates about your reviews
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.emailNotifications}
                      onChange={(e) => updateField('emailNotifications', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className={`w-11 h-6  peer-focus:outline-none peer-focus:ring-4 rounded-full peer  
                    peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] 
                    after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 
                    after:border after:rounded-full after:h-5 after:w-5 after:transition-all 
                   peer-checked:bg-blue-600
                    ${isDark ? 'bg-gray-700 peer-focus:ring-blue-800 border-gray-600' : 'bg-gray-200 peer-focus:ring-blue-300 '}
                  `}></div>
                  </label>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Weekly Digest
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Get a weekly summary of your activity
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.weeklyDigest}
                      onChange={(e) => updateField('weeklyDigest', e.target.checked)}
                      className="sr-only peer"
                    />
                   <div className={`w-11 h-6  peer-focus:outline-none peer-focus:ring-4 rounded-full peer  
                    peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] 
                    after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 
                    after:border after:rounded-full after:h-5 after:w-5 after:transition-all 
                   peer-checked:bg-blue-600
                    ${isDark ? 'bg-gray-700 peer-focus:ring-blue-800 border-gray-600' : 'bg-gray-200 peer-focus:ring-blue-300 '}
                  `}></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className={`flex justify-between mt-8 pt-6 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 0 || isSubmitting}
            >
              Back
            </Button>

            <Button
              variant="primary"
              onClick={handleNext}
              loading={isSubmitting}
              icon={currentStep === steps.length - 1 ? null : ArrowRight}
            >
              {currentStep === steps.length - 1 ? 'Create Account' : 'Continue'}
            </Button>
          </div>
        </FormStep>

        {/* Already have account */}
        <p className={`text-center mt-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Already have an account?{' '}
          <Link to="/login" className={`font-medium hover:underline ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}