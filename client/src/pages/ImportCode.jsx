import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Code, Upload, FolderUp, FileArchive, Github, Terminal,
  AlertCircle, ChevronRight, Copy, Check
} from 'lucide-react';
import Button from "../components/ui/Button";
import FormInput from "../components/ui/FormInput";
import FileUpload from "../components/ui/FileUpload";
import { useToast } from "../components/ui/Toast";
import { useTheme } from "../context/ThemeContext";
import AuthPrompt from '../components/ui/AuthPrompt';


export default function ImportCode() {
  const navigate = useNavigate();

  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('paste');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  // Paste Code
  const [pasteData, setPasteData] = useState({
    code: '',
    language: 'javascript',
    title: '',
  });

  // Git Import
  const [gitData, setGitData] = useState({
    provider: 'github',
    repoUrl: '',
    branch: 'main',
  });

  // Folder/File 
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // API Copy
  const [copiedAPI, setCopiedAPI] = useState(false);


  // Tabs Congiguration
  const tabs = [
    { id: 'paste', label: 'Paste Code', icon: Code, description: 'Quick snippet review' },
    { id: 'files', label: 'Upload Files', icon: Upload, description: 'Multiple files' },
    { id: 'folder', label: 'Upload Folder', icon: FolderUp, description: 'Local project' },
    { id: 'zip', label: 'Upload ZIP', icon: FileArchive, description: 'Compressed archive' },
    { id: 'git', label: 'Git Repository', icon: Github, description: 'GitHub/GitLab' },
    
  ];

  // Language Options
  const languages = [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'Go',
    'Rust', 'C++', 'C#', 'Ruby', 'PHP', 'Swift', 'Kotlin'
  ];

  // Auto-detect Language
  const detectLanguage = (code) => {
    if (code.includes('def ') || code.includes('import ')) return 'python';
    if (code.includes('function') || code.includes('const' )) return 'javascript';
    if (code.includes('interface') || code.includes('type ')) return 'typescript';
    if (code.includes('public class')) return 'java';
    if (code.includes('func' )) return 'go';
    if (code.includes('fn ') || code.includes('pub mod ') || code.includes('use ')) return 'rust';
    return '';
  };

  // Handle past code submit
  const requireAuthRun = (fn) => {
    // quick auth check: look for token cookie (server sets token cookie on auth)
    try {
      const isAuth = document.cookie.split(';').some(c => c.trim().startsWith('token='));
      if (!isAuth) {
        setShowAuthPrompt(true);
        return;
      }
    } catch (e) {
      setShowAuthPrompt(true);
      return;
    }
    fn();
  };

  const handlePasteSubmit = async () => {
    if (!pasteData.code.trim()) {
      showError('Please paste some code');
      return;
    }

    if (pasteData.code.length > 50000) {
      showError('Code exceeds 50,000 character limit');
      return;
    }

    setIsProcessing(true);

    try{
      await new Promise(resolve => setTimeout(resolve, 1500));

      const reviewId = Data.now().toString();
      success('Code imported successfully!');

      setTimeout(() => {
        navigate(`/review/${reviewId}`);
      }, 1000);
    } catch(err) {
      showError('Failed to import code');
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle File Upload
  const handleFilesSubmit = async () => {
    if (uploadedFiles.length === 0) {
      showError('Please select files to upload');
      return;
    }

    setIsProcessing(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const reviewId = Data.now().toString();
      success(`${uploadedFiles.length} files imported successfully!`);

      setTimeout(() => {
        navigate(`/review/${reviewId}`);
      }, 1000);
    } catch(err) {
      showError('Failed to import files');
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle Git Import
  const handleGitSubmit = async () => {
    if (!gitData.repoUrl.trim()) {
      showError('Please enter a repository URL');
      return;
    }

    setIsProcessing(true);
    
    try {
      await new Promise(resolve => setTimout(resolve, 2500));

      const reviewId = Date.now().toString();
      success('Repository imported successfully');

      setTimeout(() => {
        navigate(`review/${reviewId}`);
      }, 1000);
    } catch(err) {
      showError('Failed to import repository');
    } finally {
      setIsProcessing(false);
    }
  };

  // Copy API Code
  const handleCopyAPI = () => {
    const apiCode = `curl -X POST https://api.recode.dev/v1/reviews/import \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Review from CI",
    "files": [
      {
        "path": "src/index.js",
        "content": "...",
        "language": "javascript"
      }
    ],
    "metadata": {
      "commit": "abc123",
      "branch": "main"
    }
  }'`;

    navigator.clipboard.writeText(apiCode);
    setCopiedAPI(true);
    setTimeout(() => setCopiedAPI(false), 2000);
    success('API code copied to clipboard!');
  };

  return (
    <div className={`min-h-screen pb-12 ${isDark ? 'bg-[#121212' : 'bg-gray-50'}`}>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Sidebar - Import Methods */}
          <div className="lg:col-span-1">
            <div className={`rounded-lg border p-2 sticky top-20 ${isDark ? 'bg-[#1e1e1e] border-[#2a2a2a]' : 'bg-white border-gray-200'}`}>
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                   <button
                     key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors cursor-pointer
                      ${activeTab === tab.id
                        ? `${isDark ? 'bg-blue-900/20 text-blue-300' : 'bg-blue-50 text-blue-700'}`
                        : `${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'}`
                      }
                    `}
                  >
                    <Icon size={20} className="flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{tab.label}</p>
                      <p className="text-xs opacity-75 mt-0.5">{tab.description}</p>
                    </div>
                    {activeTab === tab.id && (
                      <ChevronRight size={16} className="flex-shrink-0 mt-1" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className={`rounded-lg border p-8 ${isDark ? 'bg-[#1e1e1e] border-gray-200' : 'bg-white border-[#2a2a2a]'}`}>
              {/* Paste Code */}
              {activeTab === 'paste' && (
                <div className="space-y-6">
                  <div>
                    <h2 className={`text-2xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Paste Your Code
                    </h2>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Quick review for code snippet up to 50,000 characters
                    </p>
                  </div>

                  <FormInput 
                    label="Title (Optional)"
                    value={pasteData.title}
                    onChange={(e) => setPasteData({ ...pasteData, title: e.target.value })}
                    placeholder="eg, Authentication function"
                  />

                  <FormInput 
                    type="select"
                    label="Language"
                    value={pasteData.language}
                    onChange={(e) => setPasteData({ ...pasteData, language: e.target.value })}
                    options={languages.map((lang) => ({
                      value: lang.toLowerCase(),
                      label: lang
                    }))}
                    className="hover:cursor-pointer"
                  />

                  <div>
                    <label className={`block text-sm font- mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Code <span  className="text-red-500">*</span>
                    </label>
                    <textarea 
                      value={pasteData.code}
                      onChange={(e) => {
                        setPasteData({ ...pasteData, code: e.target.value });
                        // Auto-detect language on paste
                        if (e.target.value && !pasteData.code) {
                          const detected = detectLanguage(e.target.value);
                          setPasteData(prev => ({ ...prev, language: detected }));
                        }
                      }}
                      placeholder="Paste your code here..."
                      rows={15}
                      className={`w-full px-3 py-2 rounded-lg font-mono text-sm border placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDark ? 'bg-gray-900 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
                    />
                    <p className={`mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {pasteData.code.length.toLocaleString()} / 50,000 characters
                    </p>
                  </div>

                  {pasteData.code && pasteData.code.length > 45000 && (
                    <div className={`flex items-start gap-2 p-3 border rounded-lg ${isDark ? 'bg-yellow-900/20 border-yellow-800' : 'bg-yellow-50 border-yellow-200'}`}>
                      <AlertCircle size={16} className={`flex-shrink-0 mt-0.5 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`} />
                      <p className={`text-sm ${isDark ? 'text-yellow-300' : 'text-yellow-700'}`}>
                        You're approaching the character limit. Consider uploading as a file instead.
                      </p>
                    </div>
                  )}

                  <Button
                    variant="primary"
                    onClick={() => requireAuthRun(handlePasteSubmit)}
                    loading={isProcessing}
                    className="w-full"
                    disabled={!pasteData.code.trim()}
                  >
                    Create Review
                  </Button>
                </div>
              )}

              {/* Upload Files */}
              {activeTab === 'files' && (
                <div className="space-y-6">
                 <div>
                   <h2 className={`text-2xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Upload Multiple Files
                  </h2>
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Select indeividual files from your project (up to 10 files, 50MB each)
                  </p>
                 </div>

                 <FileUpload 
                  accept=".js,.jsx,.ts,.tsx,.py,.java,.go,.rs,.cpp,.c,.h,.cs,.rb,.php,.swift,.kt"
                  maxSize={50}
                  maxFiles={10}
                  multiple={true}
                  onFilesSelected={setUploadedFiles}
                 />

                 <Button
                  variant="primary"
                  onClick={() => requireAuthRun(handleFilesSubmit)}
                  loading={isProcessing}
                  className="w-full"
                  disabled={uploadedFiles.length === 0}
                 >
                  Import {uploadedFiles.length} {uploadedFiles.length === 1 ? 'File' : 'Files'}
                 </Button>
                </div>
              )}

              {/* Upload Folder */}
              {activeTab === 'folder' && (
                <div className="space-y-6">
                  <div>
                    <h2 className={`text-2xl font-extrabold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Upload Project Folder
                    </h2>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Import your entire local project (respect .gitignore rules)
                    </p>
                  </div>

                  <FileUpload 
                    accept="*"
                    maxSize={50}
                    maxFiles={500}
                    multiple={true}
                    onFilesSelected={setUploadedFiles}
                  />

                  <div className={`border rounded-lg p-4 ${isDark ? 'bg-blue-900/20 border-blue-900' : 'bg-blue-50 border-blue-200'}`}>
                    <h4 className={`text-sm font-semibold mb-2 ${isDark ? 'text-blue-200' : 'text-blue-900'}`}>
                     💡 Pro Tip
                    </h4>
                    <p className={`text-sm ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
                      We automatically exclude: node_modules, .git, build folders, and binary files.
                      Large projects (&gt;500 files) may take a few seconds to process.
                    </p>
                  </div>

                  <Button
                    variant="primary"
                    onClick={() => requireAuthRun(handleFilesSubmit)}
                    loading={isProcessing}
                    className="w-full"
                    disabled={uploadedFiles.length === 0}
                  >
                    Import Project
                  </Button>
                </div>
              )}

              {/* Upload ZIP */}
              {activeTab === 'zip' && (
                <div className="space-y-6">
                  <div>
                    <h2 className={`text-2xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Upload ZIP Archive
                  </h2>
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Upload a compressed archive of your project (max 50MB)
                  </p>
                  </div>

                  <FileUpload 
                    accept=".zip"
                    maxSize={50}
                    maxFiles={1}
                    multiple={true}
                    onFilesSelected={setUploadedFiles}
                  />

                  <div className={`border rounded-lg p-4 ${isDark ? 'bg-yellow-900/20 border-yellow-800' : 'bg-yellow-50 border-yellow-200'}`}>
                    <h4 className={`text-sm font-semibold ${isDark ? 'text-yellow-300' : 'text-yellow-700'}`}>
                      ⚠️ Security Note
                    </h4>
                    <p className={`text-sm ${isDark ? 'text-yellow-300' : 'text-yellow-700'}`}>
                      We block dangerous file types (.exe, .dll, .bin) for your security.
                      Only source code and text files will be extracted.
                    </p>
                  </div>

                  <Button
                    variant="primary"
                    onClick={() => requireAuthRun(handleFilesSubmit)}
                    loading={isProcessing}
                    className="w-full"
                    disabled={uploadedFiles.length === 0}
                  >
                    Extract & Import
                  </Button>
                </div>
              )}

              {/* Git Repository */}
              {activeTab === 'git' && (
                <div className="space-y-6">
                  <div>
                    <h2 className={`text-2xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Import grom Git Repository
                    </h2>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Connect to GitHub, GitLab, or Bitbucket
                    </p>
                  </div>

                  {/* OAuth Connect Buttons */}
                  <div className="grid grid-cols-3 gap-4">
                    <button className={`p-4 border-2 rounded-lg transition-colors hover:cursor-pointer ${isDark ? 'border-gray-600 hover:border-blue-400' : 'border-gray-300 hover:border-blue-500'}`}>
                      <svg className="w-8 h-8 mx-auto mb-2" viewBox="0 0 24 24" fill={`${isDark ? 'white' : 'currentColor'}`}>
                        <path d="M12 1.27a11 11 0 00-3.48 21.46c.55.09.73-.28.73-.55v-1.84c-3.03.64-3.67-1.46-3.67-1.46-.55-1.29-1.28-1.65-1.28-1.65-.92-.65.1-.65.1-.65 1.1 0 1.73 1.1 1.73 1.1.92 1.65 2.57 1.2 3.21.92a2 2 0 01.64-1.47c-2.47-.27-5.04-1.19-5.04-5.5 0-1.1.46-2.1 1.2-2.84a3.76 3.76 0 010-2.93s.91-.28 3.11 1.1c1.8-.49 3.7-.49 5.5 0 2.1-1.38 3.02-1.1 3.02-1.1a3.76 3.76 0 010 2.93c.83.74 1.2 1.74 1.2 2.94 0 4.21-2.57 5.13-5.04 5.4.45.37.82.92.82 2.02v3.03c0 .27.1.64.73.55A11 11 0 0012 1.27"/>
                      </svg>
                       <p className={`text-sm font-medium ${isDark ? 'text-white' : ''}`}>GitHub</p>
                    </button>
                     <button className={`p-4 border-2 rounded-lg transition-colors hover:cursor-pointer ${isDark ? 'border-gray-600 hover:border-blue-400' : 'border-gray-300 hover:border-blue-500'}`}>
                      <svg className="w-8 h-8 mx-auto mb-2" viewBox="0 0 24 24" fill={`${isDark ? 'white' : 'currentColor'}`}>
                        <path d="M22.65 14.39L12 20.83 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z"/>
                      </svg>
                      <p className={`text-sm font-medium ${isDark ? 'text-white' : ''}`}>GitLab</p>
                    </button>
                    <button className={`p-4 border-2 rounded-lg transition-colors hover:cursor-pointer ${isDark ? 'border-gray-600 hover:border-blue-400' : 'border-gray-300 hover:border-blue-500'}`}>
                      {/* Bitbucke Logo Placeholder */}
                      <p className={`text-sm font-medium ${isDark ? 'text-white' : ''}`}>Bitbucket</p>
                    </button>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className={`w-full border-t ${isDark ? 'border-gray-600' : 'border-gray-300'}`}></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className={`px-2 ${isDark ? 'text-gray-400 bg-gray-800' : 'text-gray-500 bg-white'}`}>
                        Or enter repository URL
                      </span>
                    </div>
                  </div>

                  <FormInput 
                    label="Repository URL"
                    value={gitData.repoUrl}
                    onChange={(e) => setGitData({ ...gitData, repoUrl: e.target.value })}
                    placeholder="https://github.com/username/repo"
                  />

                  <FormInput 
                    label="Branch"
                    value={gitData.branch}
                    onChange={(e) => setGitData({ ...gitData, branch: e.target.value })}
                    placeholder="main"
                  />

                  <Button
                    variant="primary"
                    onClick={() => requireAuthRun(handleGitSubmit)}
                    loading={isProcessing}
                    className="w-full"
                    disabled={!gitData.repoUrl.trim()}
                  >
                    Import Repository
                  </Button>
                </div>
              )}

             
            </div>
          </div>
        </div>
          <AuthPrompt open={showAuthPrompt} onClose={() => setShowAuthPrompt(false)} />
      </div>
          
    </div>
  )
}