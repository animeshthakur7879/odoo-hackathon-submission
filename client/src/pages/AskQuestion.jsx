import { useState } from 'react';
import { X, Tag, Plus, Send, Sparkles, Code, BookOpen, Users, HelpCircle, ArrowRight, CheckCircle, AlertCircle, Hash } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addQuestion } from '../features/questions/questionSlice';
import { toast } from 'react-toastify';

const AskQuestion = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [hoveredTag, setHoveredTag] = useState(null);

  // Form data slice
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: []
  });

  const dispatch = useDispatch() 
  const navigate = useNavigate()

  const popularTags = [
    'React', 'JavaScript', 'CSS', 'Node.js', 'Python', 
    'TypeScript', 'MongoDB', 'Express', 'HTML', 'Vue.js',
    'Angular', 'Docker', 'AWS', 'GraphQL', 'Redux'
  ];

  const handleAddTag = (tag) => {
    if (tag && !tags.includes(tag) && tags.length < 5) {
      setTags([...tags, tag]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagInputKeyPress = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      handleAddTag(tagInput.trim());
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    // Create form data object
    const formDataObject = {
      title: title,
      description: description,
      tags: tags
    };
    
    // Update formData state
    setFormData(formDataObject);
    
    // Console log the form data
    // console.log('Form Data:', formDataObject);

    await dispatch(addQuestion(formDataObject))
    
    // Clear the state
    setTitle('');
    setDescription('');
    setTags([]);
    setTagInput('');
    setHoveredTag(null);

    toast.success("Question Added")

    navigate("/questions")
  };

  // Generate consistent colors for tags using a hash function
  const getTagColor = (tag) => {
    const colors = [
      'bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200',
      'bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200',
      'bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200',
      'bg-pink-100 text-pink-700 border-pink-200 hover:bg-pink-200',
      'bg-indigo-100 text-indigo-700 border-indigo-200 hover:bg-indigo-200',
      'bg-cyan-100 text-cyan-700 border-cyan-200 hover:bg-cyan-200',
      'bg-teal-100 text-teal-700 border-teal-200 hover:bg-teal-200',
      'bg-violet-100 text-violet-700 border-violet-200 hover:bg-violet-200',
      'bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200',
      'bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-200',
    ];
    
    let hash = 0;
    for (let i = 0; i < tag.length; i++) {
      hash = ((hash << 5) - hash + tag.charCodeAt(i)) & 0xffffffff;
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const isFormValid = title.trim() && description.trim() && tags.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="mb-12">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 animate-slide-up">
                Ask a
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">
                  Question
                </span>
              </h1>
              <p className="text-gray-600 text-lg flex items-center space-x-2">
                <HelpCircle className="w-5 h-5 text-blue-500" />
                <span>Get help from our community of developers and experts</span>
              </p>
            </div>

            {/* Form Container */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-blue-600 to-emerald-600 px-8 py-8">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Share Your Question</h2>
                    <p className="text-blue-100">Help us help you by providing detailed information</p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={(e) => handleSubmit(e)} className="p-8 space-y-8">
                {/* Title */}
                <div className="group">
                  <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-blue-500" />
                    <span>Question Title *</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g., How to implement authentication in React?"
                      className="w-full px-6 py-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 font-medium shadow-sm group-hover:shadow-md"
                      required
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      {title.trim() && (
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2 flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>Be specific and imagine you're asking a question to another person</span>
                  </p>
                </div>

                {/* Description */}
                <div className="group">
                  <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center space-x-2">
                    <Code className="w-4 h-4 text-emerald-500" />
                    <span>Question Description *</span>
                  </label>
                  <div className="relative">
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Provide all the details someone would need to understand and answer your question..."
                      rows={8}
                      className="w-full px-6 py-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 font-medium shadow-sm group-hover:shadow-md resize-vertical"
                      required
                    />
                    <div className="absolute top-4 right-4">
                      {description.trim() && (
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2 flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>Include any error messages, code snippets, or steps you've already tried</span>
                  </p>
                </div>

                {/* Tags */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center space-x-2">
                    <Tag className="w-4 h-4 text-purple-500" />
                    <span>Tags ({tags.length}/5)</span>
                    {tags.length > 0 && (
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                    )}
                  </label>
                  
                  {/* Selected Tags */}
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-3 mb-4">
                      {tags.map((tag, index) => (
                        <div
                          key={tag}
                          className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-full border transition-all duration-300 hover:scale-105 cursor-pointer shadow-sm ${getTagColor(tag)}`}
                          style={{
                            animationDelay: `${index * 0.1}s`
                          }}
                        >
                          <Hash className="w-3 h-3 mr-1" />
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-2 text-current hover:text-red-500 transition-colors duration-200"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tag Input */}
                  <div className="relative mb-4">
                    <Tag className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={handleTagInputKeyPress}
                      placeholder="Add up to 5 tags to describe your question"
                      className="w-full pl-12 pr-6 py-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 font-medium shadow-sm group-hover:shadow-md"
                      disabled={tags.length >= 5}
                    />
                    {tagInput.trim() && (
                      <button
                        type="button"
                        onClick={() => handleAddTag(tagInput.trim())}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-700 transition-colors duration-200"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  {/* Popular Tags */}
                  <div>
                    <p className="text-sm text-gray-500 mb-3 flex items-center space-x-2">
                      <Sparkles className="w-4 h-4" />
                      <span>Popular tags:</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {popularTags.map((tag, index) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => handleAddTag(tag)}
                          onMouseEnter={() => setHoveredTag(index)}
                          onMouseLeave={() => setHoveredTag(null)}
                          disabled={tags.includes(tag) || tags.length >= 5}
                          className={`px-3 py-2 text-xs font-medium rounded-full transition-all duration-300 border ${
                            tags.includes(tag) 
                              ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' 
                              : hoveredTag === index
                                ? 'bg-gradient-to-r from-blue-500 to-emerald-500 text-white border-transparent shadow-lg transform scale-105'
                                : 'bg-white/70 text-gray-600 border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700'
                          } ${tags.length >= 5 && !tags.includes(tag) ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          <Hash className="w-3 h-3 inline mr-1" />
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200">
                  <button
                    type="submit"
                    disabled={!isFormValid}
                    className={`flex-1 sm:flex-none px-8 py-4 font-semibold rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 ${
                      isFormValid
                        ? 'bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Send className="w-5 h-5" />
                    <span>Publish Question</span>
                    {isFormValid && <ArrowRight className="w-4 h-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTitle('');
                      setDescription('');
                      setTags([]);
                      setTagInput('');
                      setHoveredTag(null);
                    }}
                    className="flex-1 sm:flex-none px-8 py-4 text-gray-700 bg-white/70 hover:bg-white border border-gray-200 hover:border-gray-300 rounded-xl font-semibold transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80">
            <div className="sticky top-8 space-y-6">
              {/* Writing Tips */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 p-6 shadow-lg">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Writing Tips</h3>
                </div>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Be specific about your problem and what you've tried</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Include relevant code snippets and error messages</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Use clear, descriptive titles that summarize your issue</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Add relevant tags to help others find your question</span>
                  </div>
                </div>
              </div>

              {/* Community Guidelines */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 p-6 shadow-lg">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Community Guidelines</h3>
                </div>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Be respectful and constructive</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Search for existing answers first</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Accept helpful answers</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Give back to the community</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default AskQuestion;