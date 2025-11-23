import { useState } from 'react';
import { User, Bell, Shield, Palette, Save } from 'lucide-react';
import  FormInput  from '../components/ui/FormInput';
import Button  from '../components/ui/Button';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../components/ui/Toast';



export function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { success } = useToast();
  const { isDark } = useTheme();
  
 
  const [activeTab, setActiveTab] = useState('profile');


  const [settings, setSettings] = useState({
    // Profile
    name: 'Faruk Idris',
    email: 'faruk@example.com',
    bio: 'Software developer & Engineer | passionate about code quality',
    
    // Notifications
    emailNotifications: true,
    pushNotifications: false,
    commentNotifications: true,
    mentionNotifications: true,
    reviewAssignedNotifications: true,
    
    // Preferences
    defaultLanguage: 'javascript',
    autoApproveEnabled: false,
    showResolvedComments: true,
  });

  // UPDATE SETTING
  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  // SAVE SETTINGS
  const handleSave = () => {
    // In real app, would save to API
    success('Settings saved successfully!');
  };

  // TABS CONFIGURATION
  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <div className={`min-h-screen pb-12 ${isDark ? 'bg-[#121212]' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`border-b ${isDark ? 'bg-[#1e1e1e] border-[#2a2a2a]' : 'border-gray-200 bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Settings
          </h1>
          <p className={`mt-1 text-sm ${isDark ? 'dark:text-gray-400' : 'text-gray-600'}`}>
            Manage your account settings and preferences
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1">
            <div className={`rounded-lg border p-2 ${isDark ? 'bg-[#1e1e1e] border-[#2a2a2a]' : 'bg-white border-gray-200'}`}>
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors
                      ${activeTab === tab.id
                        ? `${isDark ? 'text-[#3b82f6] bg-[#1d4ed8]/20' : 'bg-[#eff6ff] text-[#1d4ed8]'}`
                        : `hover:cursor-pointer ${isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-200 text-gray-700'}`
                      }
                    `}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className={`rounded-lg border p-6 ${isDark ? 'bg-[#1e1e1e] border-[#2a2a2a]' : 'bg-white border-gray-200'}`}>
              
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div>
                    <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Profile Information
                    </h2>
                    <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Update your personal information and how others see you
                    </p>
                  </div>

                  <FormInput
                    label="Full Name"
                    value={settings.name}
                    onChange={(e) => updateSetting('name', e.target.value)}
                    placeholder="Faruk Idris"
                  />

                  <FormInput
                    type="email"
                    label="Email Address"
                    value={settings.email}
                    onChange={(e) => updateSetting('email', e.target.value)}
                    placeholder="faruk@example.com"
                  />

                  <FormInput
                    type="textarea"
                    label="Bio"
                    value={settings.bio}
                    onChange={(e) => updateSetting('bio', e.target.value)}
                    placeholder="Tell us about yourself..."
                    rows={4}
                  />

                  <Button variant='primary' icon={Save} onClick={handleSave}>
                    Save Changes
                  </Button>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div>
                    <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Notification Preferences
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                      Choose what notifications you want to receive
                    </p>
                  </div>

                  {/* Email Notifications */}
                  <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Email Notifications
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Receive notifications via email
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <FormInput
                        type="checkbox"
                        checked={settings.emailNotifications}
                        onChange={(e) => updateSetting('emailNotifications', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  {/* Comment Notifications */}
                  <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Comment Notifications
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        When someone comments on your review
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <FormInput
                        type="checkbox"
                        checked={settings.commentNotifications}
                        onChange={(e) => updateSetting('commentNotifications', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  {/* Mention Notifications */}
                  <div className={`flex items-center justify-between py-3 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div>
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Mention Notifications
                      </p>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        When someone mentions you
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <FormInput
                        type="checkbox"
                        checked={settings.mentionNotifications}
                        onChange={(e) => updateSetting('mentionNotifications', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className={`w-11 h-6 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600 ${isDark ? 'border-gray-600 bg-gray-700 peer-focus:ring-[#1d4ed8]' : 'bg-gray-200 peer-focus:ring-[#3b82f6]'}`}></div>
                    </label>
                  </div>

                  <Button variant='primary' icon={Save} onClick={handleSave}>
                    Save Changes
                  </Button>
                </div>
              )}

              {/* Appearance Tab */}
              {activeTab === 'appearance' && (
                <div className="space-y-6">
                  <div>
                    <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Appearance Settings
                    </h2>
                    <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Customize how Mergecode looks to you
                    </p>
                  </div>

                  {/* Theme Toggle */}
                  <div>
                    <label className={`block text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Theme
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => theme === 'dark' && toggleTheme()}
                        className={`
                          p-4 rounded-lg border-2 transition-colors cursor-pointer
                          ${theme === 'light'
                            ? `border-primary-500  ${isDark ? 'bg-[#1d4ed8]/20' : 'bg-[#eff6ff]'}`
                            : `hover:border-gray-400  ${isDark ? 'border-gray-600' : 'border-gray-300'}`
                          }
                        `}
                      >
                        <div className="w-full h-20 bg-white rounded mb-2 border border-gray-200"></div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          Light
                        </p>
                      </button>
                      <button
                        onClick={() => theme === 'light' && toggleTheme()}
                        className={`
                          p-4 rounded-lg border-2 transition-colors cursor-pointer
                          ${theme === 'dark'
                            ? `border-primary-500  ${isDark ? 'bg-[#1d4ed8]/20' : 'bg-[#eff6ff]'}`
                            : `hover:border-gray-400  ${isDark ? 'border-gray-600' : 'border-gray-300'}`
                          }
                        `}
                      >
                        <div className="w-full h-20 bg-gray-800 rounded mb-2"></div>
                        <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          Dark
                        </p>
                      </button>
                    </div>
                  </div>

                  <FormInput
                    type="select"
                    label="Default Language"
                    value={settings.defaultLanguage}
                    onChange={(e) => updateSetting('defaultLanguage', e.target.value)}
                    options={[
                      { value: 'javascript', label: 'JavaScript' },
                      { value: 'typescript', label: 'TypeScript' },
                      { value: 'python', label: 'Python' },
                      { value: 'java', label: 'Java' },
                      { value: 'go', label: 'Go' },
                    ]}
                  />

                  <Button variant='primary' icon={Save} onClick={handleSave}>
                    Save Changes
                  </Button>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div>
                    <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Security Settings
                    </h2>
                    <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Manage your account security and password
                    </p>
                  </div>

                  <FormInput
                    type="password"
                    label="Current Password"
                    placeholder="Enter current password"
                  />

                  <FormInput
                    type="password"
                    label="New Password"
                    placeholder="Enter new password"
                  />

                  <FormInput
                    type="password"
                    label="Confirm New Password"
                    placeholder="Confirm new password"
                  />

                  <Button variant='primary' icon={Save}>
                    Update Password
                  </Button>

                  <div className={`pt-6 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Danger Zone
                    </h3>
                    <div className={`border rounded-lg p-4 ${isDark ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'}`}>
                      <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Once you delete your account, there is no going back. Please be certain.
                      </p>
                      <Button variant="danger">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}