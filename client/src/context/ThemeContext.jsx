import { createContext, useContext, useState, useEffect, Children } from "react";


/* 
  create a container that can hold data
  and share it with any component
*/
const ThemeContext = createContext();

/* ThemeProvider: wraps entire app and provides theme state to all Children
   Manages theme switchin and localStorage persistence
*/
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
  }, [theme])
  

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // The data and functions to share 
  // Any component can access theme and toggleTheme
  const value = {
    theme,       // Current theme
    toggleTheme,
    isDark: theme === 'dark' ,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}


export function useTheme() {
  const context = useContext(ThemeContext);

  // Error handling: make sure hook is used inside ThemeProvider
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}