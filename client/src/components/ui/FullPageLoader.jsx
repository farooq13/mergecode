import React from 'react';
import { Code, Loader } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function FullPageLoader() {
  const { isDark } = useTheme();

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${isDark ? 'bg-black/70' : 'bg-white/70'}`}>
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="text-lg font-mono text-gray-500">&lt;/&gt;</div>
          <img src="/mergecode-logo.png" alt="mergecode" className="w-28 h-auto" />
        </div>
        <div className="animate-spin">
          <Loader size={20} className={`${isDark ? 'text-white' : 'text-gray-700'}`} />
        </div>
      </div>
    </div>
  );
}
