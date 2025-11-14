import { useTheme } from './context/ThemeContext'
import Dashboard from './pages/Dashboard';
import Header from './components/layout/Header';


function App() {
  const { isDark } = useTheme();

  return (
      <div className={`app min-h-screen transition-colors duration-300 ${isDark ? 'bg-[#121212]' : 'bg-gray-50'}`}>
        {/* Header */}
        <Header />
        <div className="mt-12">
          <Dashboard />
        </div>
      </div>
  )
}

export default App
