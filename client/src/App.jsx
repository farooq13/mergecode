import { useTheme } from './context/ThemeContext'
import Dashboard from './pages/Dashboard';
import Header from './components/layout/Header';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import  ReviewDetail  from './pages/ReviewDetail';


function App() {
  const { isDark } = useTheme();

  return (
      <BrowserRouter>
        <div className={`app min-h-screen transition-colors duration-300 ${isDark ? 'bg-[#121212]' : 'bg-gray-50'}`}>
          {/* Header */}
          <Header />
          {/* Route */}
          <Routes>
            <Route path='/' element={<Dashboard/>} />
            <Route path='/review/:id' element={<ReviewDetail />} />
          </Routes>
  
        </div>
      </BrowserRouter>
  )
}

export default App
