import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowUp, ArrowDown, MessageCircle, Clock, User, Check, Flag, Share2 } from 'lucide-react';
import RichTextEditor from '../components/RichTextEditor';
import { useAuth } from '../context/AuthContext';

const QuestionDetail = () => {
  const { id } = useParams();
  const { isLoggedIn } = useAuth();
  const [answer, setAnswer] = useState('');
  const [showAnswerForm, setShowAnswerForm] = useState(false);

  // Mock data for the question
  const question = {
    id: 1,
    title: "How to implement authentication in React with JWT tokens?",
    description: `<p>I'm building a React application and need to implement user authentication using JWT tokens. I want to know the best practices for storing tokens securely and handling token expiration.</p>
    
    <p>Here's what I've tried so far:</p>
    <ul>
      <li>Storing tokens in localStorage</li>
      <li>Using axios interceptors</li>
      <li>Setting up refresh token logic</li>
    </ul>
    
    <p><strong>My main concerns are:</strong></p>
    <ol>
      <li>Security implications of localStorage vs httpOnly cookies</li>
      <li>Best practices for handling token refresh</li>
      <li>How to properly handle authentication state across the app</li>
    </ol>
    
    <p>Any insights or code examples would be greatly appreciated!</p>`,
    tags: ["React", "JWT", "Authentication", "Security"],
    votes: 15,
    answerCount: 3,
    hasAcceptedAnswer: true,
    createdAt: "2024-01-15T10:30:00Z",
    author: {
      name: "Alex Johnson",
      avatar: "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop",
      reputation: 1250
    }
  };

  // Mock answers
  const answers = [
    {
      id: 1,
      content: `<p>Great question! For JWT authentication in React, here's what I recommend:</p>
      
      <h3>1. Token Storage</h3>
      <p>Use <strong>httpOnly cookies</strong> instead of localStorage for better security:</p>
      <pre><code>// Set cookie on backend
res.cookie('token', jwt, { 
  httpOnly: true, 
  secure: true, 
  sameSite: 'strict' 
});</code></pre>
      
      <h3>2. Axios Configuration</h3>
      <p>Set up interceptors to handle token automatically:</p>
      <pre><code>axios.defaults.withCredentials = true;

// Response interceptor for token refresh
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle token refresh
      await refreshToken();
    }
    return Promise.reject(error);
  }
);</code></pre>`,
      votes: 12,
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
      content: `<p>I've been using a similar setup and here are some additional tips:</p>
      
      <ul>
        <li><strong>Context API</strong>: Create an AuthContext to manage authentication state globally</li>
        <li><strong>Protected Routes</strong>: Use a higher-order component or custom hook to protect routes</li>
        <li><strong>Token Validation</strong>: Always validate tokens on the backend for each protected endpoint</li>
      </ul>
      
      <p>Here's a simple AuthContext example:</p>
      <pre><code>const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await api.get('/auth/me');
      setUser(response.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};</code></pre>`,
      votes: 8,
      isAccepted: false,
      createdAt: "2024-01-15T14:30:00Z",
      author: {
        name: "Mike Roberts",
        avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop",
        reputation: 1890
      }
    }
  ];

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
    // Handle answer submission
    console.log('Submitting answer:', answer);
    setAnswer('');
    setShowAnswerForm(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1">
          {/* Question */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-start space-x-4">
              {/* Vote Section */}
              <div className="flex flex-col items-center space-y-2 min-w-[4rem]">
                <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200">
                  <ArrowUp className="w-6 h-6" />
                </button>
                <span className="text-2xl font-bold text-gray-900">{question.votes}</span>
                <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                  <ArrowDown className="w-6 h-6" />
                </button>
                <div className="w-px h-4 bg-gray-300"></div>
                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200" title="Share">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200" title="Flag">
                  <Flag className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">{question.title}</h1>
                
                <div 
                  className="prose prose-blue max-w-none mb-6"
                  dangerouslySetInnerHTML={{ __html: question.description }}
                />

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {question.tags.map((tag) => (
                    <Link
                      key={tag}
                      to={`/tags/${tag}`}
                      className="px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors duration-200"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>Asked {timeAgo(question.createdAt)}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{question.answerCount} answers</span>
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <img
                      src={question.author.avatar}
                      alt={question.author.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="text-right">
                      <div className="font-medium text-gray-900">{question.author.name}</div>
                      <div className="text-xs text-gray-500">{question.author.reputation} reputation</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Answers */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">
              {answers.length} {answers.length === 1 ? 'Answer' : 'Answers'}
            </h2>

            {answers.map((answerItem) => (
              <div key={answerItem.id} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-start space-x-4">
                  {/* Vote Section */}
                  <div className="flex flex-col items-center space-y-2 min-w-[4rem]">
                    <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200">
                      <ArrowUp className="w-5 h-5" />
                    </button>
                    <span className="text-lg font-semibold text-gray-900">{answerItem.votes}</span>
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                      <ArrowDown className="w-5 h-5" />
                    </button>
                    {answerItem.isAccepted && (
                      <div className="p-2 text-green-600 bg-green-50 rounded-lg" title="Accepted Answer">
                        <Check className="w-5 h-5" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div 
                      className="prose prose-blue max-w-none mb-4"
                      dangerouslySetInnerHTML={{ __html: answerItem.content }}
                    />

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>Answered {timeAgo(answerItem.createdAt)}</span>
                        </span>
                        {answerItem.isAccepted && (
                          <span className="flex items-center space-x-1 text-green-600">
                            <Check className="w-4 h-4" />
                            <span>Accepted Answer</span>
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <img
                          src={answerItem.author.avatar}
                          alt={answerItem.author.name}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <div className="text-right">
                          <div className="font-medium text-gray-900">{answerItem.author.name}</div>
                          <div className="text-xs text-gray-500">{answerItem.author.reputation} reputation</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Answer Form */}
          {isLoggedIn && (
            <div className="mt-8">
              {!showAnswerForm ? (
                <button
                  onClick={() => setShowAnswerForm(true)}
                  className="w-full px-6 py-4 text-left text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors duration-200"
                >
                  Write your answer...
                </button>
              ) : (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Answer</h3>
                  <form onSubmit={handleSubmitAnswer}>
                    <RichTextEditor
                      value={answer}
                      onChange={setAnswer}
                      placeholder="Write your answer here..."
                    />
                    <div className="flex items-center space-x-3 mt-4">
                      <button
                        type="submit"
                        disabled={!answer.trim()}
                        className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg font-medium transition-colors duration-200"
                      >
                        Post Answer
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowAnswerForm(false);
                          setAnswer('');
                        }}
                        className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors duration-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}

          {!isLoggedIn && (
            <div className="mt-8 bg-blue-50 rounded-lg p-6 text-center">
              <p className="text-gray-700 mb-4">Want to answer this question?</p>
              <Link
                to="/login"
                className="inline-block px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors duration-200"
              >
                Sign in to answer
              </Link>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:w-80">
          <div className="sticky top-20 space-y-6">
            {/* Related Questions */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Questions</h3>
              <div className="space-y-3">
                {[
                  "Best practices for JWT token storage",
                  "React authentication with cookies vs localStorage",
                  "Implementing refresh tokens in React",
                  "Secure authentication patterns in SPA"
                ].map((title, index) => (
                  <Link
                    key={index}
                    to={`/question/${index + 2}`}
                    className="block text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    {title}
                  </Link>
                ))}
              </div>
            </div>

            {/* Question Stats */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Question Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Views</span>
                  <span className="font-semibold text-gray-900">247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Votes</span>
                  <span className="font-semibold text-gray-900">{question.votes}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Answers</span>
                  <span className="font-semibold text-gray-900">{answers.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Active</span>
                  <span className="font-semibold text-green-600">Today</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetail;