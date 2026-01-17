import React from 'react';
import { X } from 'lucide-react';
import Button from './Button';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

export default function AuthPrompt({ open, onClose }) {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40">
      <div className={`w-full max-w-md rounded-lg p-6 relative ${isDark ? 'bg-[#111827] text-white' : 'bg-white text-gray-900'}`}>
        <button className="absolute top-3 right-3" onClick={onClose} aria-label="Close">
          <X size={18} className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`} />
        </button>

        <h3 className="text-xl font-semibold mb-2">Sign in required</h3>
        <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          You need to be logged in to use import features. Please sign in or create an account to continue.
        </p>

        <div className="flex gap-3">
          <Button variant="outline" onClick={() => { onClose(); navigate('/login'); }} className="flex-1">
            Sign in
          </Button>
          <Button variant="primary" onClick={() => { onClose(); navigate('/signup'); }} className="flex-1">
            Create account
          </Button>
        </div>

        <div className="mt-4 text-center">
          <button className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
