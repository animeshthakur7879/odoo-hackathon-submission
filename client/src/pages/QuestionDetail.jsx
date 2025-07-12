import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowUp, ArrowDown, MessageCircle, Clock, User, Check, Flag, Share2, Hash, Star, Heart, BookOpen, Plus, Eye, Award, Zap, ThumbsUp, Send } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getQuestion } from '../features/questions/questionSlice';


const QuestionDetail = () => {
  const { qid } = useParams();
  const { isLoggedIn } = useAuth();
  const [answer, setAnswer] = useState('');
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const [likedAnswers, setLikedAnswers] = useState(new Set());
  const [hoveredAnswer, setHoveredAnswer] = useState(null);

  const {user} = useSelector(state => state.auth)
  const {singleQuestion} = useSelector(state => state.question)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getQuestion(qid))
  } , [dispatch])

  console.log(singleQuestion)

  // Mock data for the question
  const question = {
    id: 1,
    title: "How to implement authentication in React with JWT tokens?",
    description: "I'm building a React application and need to implement user authentication using JWT tokens. I want to know the best practices for storing tokens securely and handling token expiration. Here's what I've tried so far: storing tokens in localStorage, using axios interceptors, and setting up refresh token logic. My main concerns are security implications of localStorage vs httpOnly cookies, best practices for handling token refresh, and how to properly handle authentication state across the app. Any insights or code examples would be greatly appreciated!",
    tags: ["React", "JWT", "Authentication", "Security"],
    votes: 15,
    answerCount: 3,
    hasAcceptedAnswer: true,
    views: 1234,
    createdAt: "2024-01-15T10:30:00Z",
    author: {
      name: "Alex Johnson",
      avatar: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop",
      reputation: 1250
    }
  };

  // Mock answers with text-only content
  const answers = [
    {
      id: 1,
      content: "Great question! For JWT authentication in React, here's what I recommend: Use httpOnly cookies instead of localStorage for better security. This prevents XSS attacks from accessing your tokens. Set up axios interceptors to handle token refresh automatically. Create an AuthContext to manage authentication state globally across your app. Always validate tokens on the backend for each protected endpoint. For token refresh, implement a refresh token mechanism that automatically gets new access tokens when they expire. This ensures a seamless user experience while maintaining security.",
      votes: 12,
      likes: 8,
      isAccepted: true,
      createdAt: "2024-01-15T11:15:00Z",
      author: {
        name: "Sarah Chen",
        avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop",
        reputation: 2840
      }
    },
    {
      id: 2,
      content: "I've been using a similar setup and here are some additional tips: Use Context API to create an AuthContext for managing authentication state globally. Implement protected routes using a higher-order component or custom hook. Always validate tokens on the backend for each protected endpoint. For better security, consider using refresh tokens with short-lived access tokens. Store refresh tokens in httpOnly cookies and access tokens in memory. Implement proper error handling for token expiration and network failures. Consider using libraries like react-query for better state management and caching.",
      votes: 8,
      likes: 6,
      isAccepted: false,
      createdAt: "2024-01-15T14:30:00Z",
      author: {
        name: "Mike Roberts",
        avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop",
        reputation: 1890
      }
    },
    {
      id: 3,
      content: "Another approach is to use a state management library like Redux or Zustand to handle authentication state. This gives you better control over state updates and makes it easier to handle complex authentication flows. Make sure to implement proper logout functionality that clears all tokens and redirects users appropriately. Also consider implementing automatic token refresh in the background to avoid interrupting user experience.",
      votes: 5,
      likes: 3,
      isAccepted: false,
      createdAt: "2024-01-15T16:45:00Z",
      author: {
        name: "Emily Davis",
        avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop",
        reputation: 1456
      }
    }
  ];

  // Generate consistent colors for tags
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

  const timeAgo = (date) => {
    const now = new Date();
    const posted = new Date(date);
    const diffInHours = Math.floor((now - posted) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const handleSubmitAnswer = (e) => {
    e.preventDefault();
    if (answer.trim()) {
      console.log('Submitting answer:', answer);
      setAnswer('');
      setShowAnswerForm(false);
    }
  };

  const handleLikeAnswer = (answerId) => {
    setLikedAnswers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(answerId)) {
        newSet.delete(answerId);
      } else {
        newSet.add(answerId);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Question Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 p-8 mb-8 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500">
              <div className="flex items-start space-x-6">
                {/* Vote Section */}
                <div className="flex flex-col items-center space-y-3 min-w-[5rem]">
                  <button className="p-3 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all duration-200 group">
                    <ArrowUp className="w-6 h-6 group-hover:scale-110" />
                  </button>
                  <span className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                    {question.votes}
                  </span>
                  <button className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 group">
                    <ArrowDown className="w-6 h-6 group-hover:scale-110" />
                  </button>
                  <div className="w-px h-6 bg-gradient-to-b from-blue-200 to-emerald-200"></div>
                  <button className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 group" title="Share">
                    <Share2 className="w-5 h-5 group-hover:scale-110" />
                  </button>
                  <button className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 group" title="Flag">
                    <Flag className="w-5 h-5 group-hover:scale-110" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h1 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
                    {question.title}
                  </h1>
                  
                  <div className="prose prose-lg max-w-none mb-8 text-gray-700 leading-relaxed">
                    {question.description}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    {question.tags.map((tag, index) => (
                      <Link
                        key={tag}
                        to={`/tags/${tag}`}
                        className={`px-4 py-2 text-sm font-medium rounded-full border transition-all duration-200 hover:scale-105 cursor-pointer ${getTagColor(tag)}`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <Hash className="w-3 h-3 inline mr-1" />
                        {tag}
                      </Link>
                    ))}
                  </div>

                  {/* Meta Information */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>Asked {timeAgo(question.createdAt)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MessageCircle className="w-4 h-4" />
                        <span>{question.answerCount} answers</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Eye className="w-4 h-4" />
                        <span>{question.views} views</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={question.author.avatar}
                          alt={question.author.name}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-lg"
                        />
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
                          <Star className="w-2.5 h-2.5 text-white" />
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">{question.author.name}</div>
                        <div className="text-sm text-gray-500">{question.author.reputation} reputation</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Answers Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  {answers.length} {answers.length === 1 ? 'Answer' : 'Answers'}
                </h2>
                <div className="flex-1 h-px bg-gradient-to-r from-blue-200 to-emerald-200"></div>
              </div>

              {answers.map((answerItem, index) => (
                <div 
                  key={answerItem.id} 
                  className={`bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 p-6 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-1 ${
                    answerItem.isAccepted ? 'ring-2 ring-emerald-200 bg-emerald-50/50' : ''
                  } ${hoveredAnswer === index ? 'scale-[1.01]' : ''}`}
                  onMouseEnter={() => setHoveredAnswer(index)}
                  onMouseLeave={() => setHoveredAnswer(null)}
                >
                  <div className="flex items-start space-x-6">
                    {/* Vote Section */}
                    <div className="flex flex-col items-center space-y-3 min-w-[4rem]">
                      <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 group">
                        <ArrowUp className="w-5 h-5 group-hover:scale-110" />
                      </button>
                      <span className="text-xl font-bold text-gray-900">{answerItem.votes}</span>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 group">
                        <ArrowDown className="w-5 h-5 group-hover:scale-110" />
                      </button>
                      {answerItem.isAccepted && (
                        <div className="p-2 text-emerald-600 bg-emerald-50 rounded-lg shadow-sm" title="Accepted Answer">
                          <Check className="w-5 h-5" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {answerItem.isAccepted && (
                        <div className="flex items-center space-x-2 mb-4">
                          <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium flex items-center space-x-1">
                            <Check className="w-4 h-4" />
                            <span>Accepted Answer</span>
                          </div>
                        </div>
                      )}
                      
                      <div className="prose prose-lg max-w-none mb-6 text-gray-700 leading-relaxed">
                        {answerItem.content}
                      </div>

                      {/* Answer Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => handleLikeAnswer(answerItem.id)}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                              likedAnswers.has(answerItem.id)
                                ? 'bg-pink-50 text-pink-600 hover:bg-pink-100'
                                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            <ThumbsUp className={`w-4 h-4 ${likedAnswers.has(answerItem.id) ? 'fill-current' : ''}`} />
                            <span className="text-sm font-medium">
                              {answerItem.likes + (likedAnswers.has(answerItem.id) ? 1 : 0)}
                            </span>
                          </button>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Clock className="w-4 h-4" />
                            <span>Answered {timeAgo(answerItem.createdAt)}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <img
                              src={answerItem.author.avatar}
                              alt={answerItem.author.name}
                              className="w-8 h-8 rounded-full object-cover ring-2 ring-white shadow-sm"
                            />
                            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
                              <Star className="w-2 h-2 text-white" />
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-gray-900 text-sm">{answerItem.author.name}</div>
                            <div className="text-xs text-gray-500">{answerItem.author.reputation} rep</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Answer Form */}
            {user && (
              <div className="mt-12">
                {!showAnswerForm ? (
                  <button
                    onClick={() => setShowAnswerForm(true)}
                    className="w-full px-8 py-6 text-left text-gray-600 bg-white/80 backdrop-blur-sm hover:bg-white/90 border border-white/20 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl group"
                  >
                    <div className="flex items-center space-x-3">
                      <Plus className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
                      <span className="text-lg">Write your answer...</span>
                    </div>
                  </button>
                ) : (
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 p-8 shadow-lg">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Your Answer</h3>
                    </div>
                    
                    <form onSubmit={handleSubmitAnswer} className="space-y-6">
                      <div>
                        <textarea
                          value={answer}
                          onChange={(e) => setAnswer(e.target.value)}
                          placeholder="Write your answer here... Share your knowledge and help the community!"
                          className="w-full min-h-[200px] px-4 py-3 text-gray-700 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-200"
                          required
                        />
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <button
                          type="submit"
                          disabled={!answer.trim()}
                          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-emerald-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none flex items-center space-x-2"
                        >
                          <Send className="w-5 h-5" />
                          <span>Post Answer</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowAnswerForm(false);
                            setAnswer('');
                          }}
                          className="px-8 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-all duration-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}

            {!user && (
              <div className="mt-12 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl p-8 text-center border border-blue-100">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Want to answer this question?</h3>
                <p className="text-gray-600 mb-6">Join our community and share your knowledge with fellow developers!</p>
                <button
                onClick={toast.error("Sign in to post a answer")}
                  
                  className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Sign in to answer
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-80">
            <div className="sticky top-20 space-y-6">
              {/* Question Stats */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 p-6 shadow-lg">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Question Stats</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Views</span>
                    <span className="font-bold text-blue-600">{question.views}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Answers</span>
                    <span className="font-bold text-emerald-600">{question.answerCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Votes</span>
                    <span className="font-bold text-purple-600">{question.votes}</span>
                  </div>
                </div>
              </div>

              
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .prose {
          max-width: none;
        }
        
        .prose p {
          margin-bottom: 1rem;
          line-height: 1.7;
        }
        
        .prose strong {
          color: #374151;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

export default QuestionDetail;