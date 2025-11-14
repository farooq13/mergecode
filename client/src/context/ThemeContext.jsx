import { createContext, useContext, useState, useEffect, Children } from "react";


const ThemeContext = createContext();


export default function ThemeProvider({ children }) {
  // Check localStorage for saved theme preference
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('mergecode-theme');
    return savedTheme || 'light';
  });

  useEffect(() => {
    localStorage.setItem('mergecode-theme', theme);

    // Set the root HTML element
    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }

    
    try {
      document.body.style.transition = 'background-color 300ms ease';
      document.body.style.backgroundColor = theme === 'dark' ? '#121212' : '#f8fafc';
    } catch (err) {
      console.debug('Could not set body background color', err);
    }
  }, [theme])
  

  const toggleTheme = () => {
    // eslint-disable-next-line no-console
    console.debug('[ThemeProvider] toggleTheme called');
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // The data and functions to share 
  // Any component can access theme and toggleTheme
  const value = {
    theme,       // Current theme
    toggleTheme,
    isDark: theme === 'dark',
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}


export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}