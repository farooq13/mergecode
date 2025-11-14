import { useState } from "react";
import Modal from '../ui/Modal';
import FormInput from '../ui/FormInput';
import Button  from '../ui/Button';
import { Upload, Code, } from 'lucide-react';
import { useTheme } from "../../context/ThemeContext";


export default function SubmissionForm({ isOpen, onClose, onSubmit }) {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    code: '',
    language: '',
    tags: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const languageOptions = [
    { value: 'javascript', label: 'JavaScript'},
    { value: 'typescript', label: 'TypeScript'},
    { value: 'python', label: 'Python'},
    { value: 'java', label: 'Java'},
    { value: 'go', label: 'Go'},
    { value: 'rust', label: 'Rust'},
    { value: 'c', label: 'C'},
    { value: 'cpp', label: 'C++'},
    { value: 'csharp', label: 'C#'},
    { value: 'html', label: 'HTML'},
    { value: 'css', label: 'CSS'}
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  // Checks if all required fields are filled
  // Returns true if valid, false if errors exist
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.code.trim()) {
      newErrors.code = 'Code is required';
    }

    if (!formData.language.trim()) {
      newErrors.language = 'Please select a language';
    }

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;  // stop if validation fails
    }

    setIsSubmitting(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newReview = {
        id: Date.now().toString(),
        title: formData.title,
        author: 'You',  // In real app, would get from auth
        status: 'draft',
        language: formData.language,
        createdAt: new Date(),
        commentCount: 0,
        description: formData.description,
        code: formData.code,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      };

      onSubmit(newReview);

      // Reset form
      setFormData({
        title: '',
        description: '',
        code: '',
        language: '',
        tags: '',
      })

      // Close modal
      onClose();
    
      
    } catch (error) {
      setErrors({ submit: 'Failed to submit review. Please try again.' });
    } finally {
      // Always reset loading state
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const content = event.target.result;
      handleChange('code', content);
    };

    reader.readAsText(file);
  };

  // Reasets form and closes modal
  const handleCancel = () => {
    setFormData({
      title: '',
      description: '',
      language: '',
      code: '',
      tags: '',
    });
    setErrors({});
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen}
      onClose={handleCancel}
      title="Submit Code for Review"
      size="lg"
    >
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Input */}
        <FormInput 
          label="Title"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="e.g, Refactor authentication middleware"
          error={errors.title}
          labelClassName={isDark ? 'text-gray-300' : 'text-[#121212]'}
          required
        />

        {/* Description Input */}
        <FormInput 
          type="textarea"
          label="Description"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Describe what this code does and what you'd like reviewed..."
          rows={3}
          error={errors.description}
          labelClassName={isDark ? 'text-gray-300' : 'text-[#121212]'}
          required
        />

        {/* Language Selector */}
        <FormInput 
          type="select"
          label="Programming language"
          value={formData.language}
          onChange={(e) => handleChange('language', e.target.value)}
          options={languageOptions}
          error={errors.language}
          labelClassName={isDark ? 'text-gray-300' : 'text-[#121212] bg-gray-50'}
          required
        />

        {/* Code Input With File Upload Option */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className={`${isDark ? 'block text-sm font-medium text-gray-50 text-gray-300' : 'block text-sm font-medium text-[#121212]'}`}>
              Code <span className="text-red-500">*</span>
            </label>

            {/* File Upload Button */}
            <label className={`${isDark 
              ? 'flex items-center gap-1 cursor-pointer text-sm text-gray-50 hover:underline text-nowrap' 
              : 'flex items-center gap-1 text-[#121212] hover:underline cursor-pointer text-sm text-nowrap'}`}>
              <Upload size={60} />
              Upload File 
              <FormInput 
                type="file"
                onChange={handleFileUpload}
                accept=".js,.jsx,.ts,.tsx,.py,.java,.go,.rs,.c,.cpp,.cs,.txt,.html,.css"
                className="hidden"
              />
            </label>
          </div>

          <textarea 
            value={formData.code}
            onChange={(e) => handleChange('code', e.target.value)}
            placeholder="Paste your code here or upload a file..."
            rows={12}
            className={`
              ${isDark 
                ? ' w-full px-3 py-2 rounded-lg font-mono text-sm bg-[#121212] border border-[#2a2a2a] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent' 
                : 'text-gray-900 border border-gray-300 bg-gray-50 placeholder:text-gray-400 w-full px-3 py-2 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent'}
             
              ${errors.code ? 'border-red-500 focus:ring-red-500' : ''} 
            `}
          />
          {errors.code && (
            <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
              {errors.code}
            </p>
          )}
        </div>

        {/* Tags Input */}
        <FormInput 
          label="Tags (Optional)"
          value={formData.tags}
          onChange={(e) => handleChange('tags', e.target.value)}
          placeholder="e.g, bug-fix, performance, security (comma-separated)"
          labelClassName={isDark ? 'text-gray-300' : 'text-[#121212]'}
          className={isDark ? '' : 'border-1 border-gray-300 bg-gray-50 text-[#121212]'}
        />

        {/* Submit Error */}
        {errors.submit && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.submit}
            </p>
          </div>
        )}

        {/* Form Actions */}
        <div className={`${isDark ? 'flex justify-end gap-3 pt-4 border-t border-[#2a2a2a]' : 'flex justify-end gap-3 pt-4 border-t border-gray-200' }`}>
          <Button 
            type="button"
            variant="ghost"
            onClick={handleCancel}
            disabled={isSubmitting}
            className={!isDark ? 'text-[#121212] hover:bg-gray-900 border border-gray-500' : ''}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={isSubmitting}
            icon={Code}
            className={!isDark ? 'bg-[#121212] hover:bg-gray-700 text-white' : ''}
          >
            { isSubmitting ? 'Submitting...' : 'Submit Review' }
          </Button>
        </div>
      </form>
    </Modal>
  );
}