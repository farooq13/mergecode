import { useState, useRef } from "react";
import { Upload, File, X, AlertCircle, CheckCircle } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";


export default function FileUpload({
  accept = "*",
  maxSize = 50,
  maxFiles = 10,
  onFilesSelected,
  multiple = true,
}) {

  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState([]);
  const fileInputRef = useRef(null);

  const { isDark } = useTheme();

  const validateFiles = (fileList) => {
    const newErrors = [];
    const validFiles = [];

    Array.from(fileList).forEach((file) => {
      // Check file size
      const fileSizeMB = file.size  (1024 * 1024);
      if (fileSizeMB > maxSize) {
        newErrors.push(`${file.name} is too large (${fileSizeMB.toFixed(1)}MB > ${maxSize}MB)`);
        return;
      } 
      
      // Check file count
      if (validFiles.length > maxSize) {
        newErrors.push(`Maximum ${maxFiles} files allowed`);
        return;
      }

      validFiles.push(file);
    });

    return { validFiles, errors: newErrors };
  };

  // Handle File Selection
  const handleFiles = (fileList) => {
    const { validFiles, errors: validationErrors } = validateFiles(fileList);

    setErrors(validationErrors);

    if (validFiles.length > 0) {
      const newFiles = multiple ? [...files, ...validFiles] : validFiles;
      setFiles(newFiles);
      onFileSelected?.(newFiles);
    }
  };

  // Drag & Drop Handlers
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = e.dataTransfer.files;
    handleFiles(droppedFiles);
  };

  // File Input Change
  const handleInputChange = (e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      handleFiles(selectedFiles);
    }
  };

  // Remove File
  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFilesSelected?.(newFiles);
  };

  // Format File Size
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + 'B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div>
      {/* Drop Zone */}
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`
          relative border-2 border-dashed rounded-lg p-8 transition-all duration-200 cursor-pointer
          ${isDragging
            ? `border-blue-500 ${isDark ? 'bg-blue-900/20' : 'bg-blue-50'}`
            : `${isDark ? 'hover:border-blue-500 border-gray-600' : 'hover:border-blue-400 border-gray-300'}`
          }
          `}
      >
        <input 
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          className="hidden"
        />
        <div className="text-center">
          <Upload 
            size={48}
            className={`mx-auto mb-4 ${
              isDragging ? 'text-blue-500' : 'text-gray-400'
            }`}
          />
          <p className={`mb-2 font-medium text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {isDragging ? 'Drop files here' : 'Drag & drop files here'}
          </p>
          <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            Max {maxSize}MB per file • Up to {maxFiles} files
          </p>
        </div>
      </div>

      {/* Error Messages */}
      {errors.length > 0 && (
        <div className="mt-4 space-y-2">
          {errors.map((error, index) => (
            <div 
              key={index}
              className={`flex items-start gap-2 p-3 rounded-lg ${isDark ? 'bg-red-900/20 border-red-200' : 'bg-red-50 border-red-800'}`}
            >
              <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" />
              <p className={`text-sm ${isDark ? 'text-red-300' : 'text-red-700'}`}>{error}</p>
            </div>
          ))}
        </div>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div className="mb-4 space-y-2">
          <p className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-300 border-gray-700' : 'text-gray-700 border-gray-200'}`}>
            Selected Files ({files.length})
          </p>
          {files.map((file, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-3 rounded-lg border ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <File size={20} className="text-blue-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {file.name}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index)
                }}
                className={`p-1 rounded transition-colors ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
              >
                <X size={16} className="text-gray-500" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}