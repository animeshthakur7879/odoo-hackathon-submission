import { useEffect, useState } from 'react';
import { Plus, Filter, TrendingUp, Clock, Users, ArrowUp, MessageSquare, CheckCircle, Code, Hash, Star, Eye, Heart, Zap, Award, BookOpen } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getQuestions } from '../features/questions/questionSlice';
import { toast } from 'react-toastify';

const Home = () => {
  const [sortBy, setSortBy] = useState('recent');
  const [hoveredCard, setHoveredCard] = useState(null);

  const {allQuestions} = useSelector(state => state.question)
  const {user} = useSelector(state => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getQuestions())
  } , [dispatch])

  const handleNavigate = () => {
    if(user) {
      navigate("/ask")
    }else{
      toast.error("please signIn to ask a question")
    }
  }

  const handleCLick = (question) => {
    navigate(`/question/${question._id}`)
  }

  const sortOptions = [
    { value: 'recent', label: 'Most Recent', icon: Clock },
    { value: 'popular', label: 'Most Popular', icon: TrendingUp },
    { value: 'active', label: 'Most Active', icon: Users },
  ];

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

  const QuestionCard = ({ question, index }) => (
    <div
    onClick={(e) => handleCLick(question)}
      className={`group relative bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 p-6 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-200/50 hover:-translate-y-1 ${
        hoveredCard === index ? 'shadow-2xl shadow-blue-500/10 scale-[1.02]' : 'shadow-lg'
      }`}
      onMouseEnter={() => setHoveredCard(index)}
      onMouseLeave={() => setHoveredCard(null)}
      style={{
        background: hoveredCard === index 
          ? 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(249,250,251,0.95) 100%)'
          : 'rgba(255,255,255,0.8)'
      }}
    >
      {/* Gradient border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ padding: '1px' }}>
        <div className="w-full h-full bg-white rounded-2xl"></div>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={`https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg`}
           
                className="w-12 h-12 rounded-full ring-2 ring-white shadow-lg group-hover:ring-blue-200 transition-all duration-300"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
                <Star className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{question?.postedBy?.email}</p>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <span>{new Date(question?.createdAt).toLocaleDateString()}</span>
                <span>•</span>
                
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* <div className="flex items-center space-x-1 bg-gradient-to-r from-blue-50 to-emerald-50 hover:from-blue-100 hover:to-emerald-100 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border border-blue-100">
              <ArrowUp className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-blue-700">{question.votes}</span>
            </div> */}
            {/* <div className="flex items-center space-x-1 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200">
              <Eye className="w-3.5 h-3.5 text-gray-600" />
              <span className="text-gray-700">{question.views}</span>
            </div> */}
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-emerald-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 cursor-pointer leading-tight">
          {question?.title}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {question?.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {question?.tags.map((tag, tagIndex) => (
            <span
              key={tag}
              className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all duration-200 hover:scale-105 cursor-pointer ${getTagColor(tag)}`}
              style={{
                animationDelay: `${tagIndex * 0.1}s`
              }}
            >
              <Hash className="w-3 h-3 inline mr-1" />
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5 text-gray-600">
              <MessageSquare className="w-4 h-4" />
              <span className="font-medium">{question?.answerCount}</span>
              <span className="text-gray-500">answers</span>
            </div>
            {question?.hasAcceptedAnswer && (
              <div className="flex items-center space-x-1.5 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                <CheckCircle className="w-4 h-4" />
                <span className="font-medium">Solved</span>
              </div>
            )}
          </div>
          {/* <div className="flex items-center space-x-1 text-gray-400">
            <Heart className="w-4 h-4" />
            <span className="text-xs">{Math.floor(question.votes / 2)}</span>
          </div> */}
        </div>
      </div>
    </div>
  );

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
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12">
              <div className="mb-6 sm:mb-0">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 animate-slide-up">
                  Where Developers
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">
                    Share Knowledge
                  </span>
                </h1>
                <p className="text-gray-600 text-lg flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                  <span><strong>{allQuestions?.length}</strong> questions • Get help from the community</span>
                </p>
              </div>
              
              {/* Sort Options */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-white/20">
                  <Filter className="w-5 h-5 text-blue-500" />
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-transparent border-none px-4 py-2 pr-10 text-sm font-medium text-gray-700 focus:ring-0 focus:outline-none cursor-pointer"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-6">
              {allQuestions?.map((question, index) => (
                <QuestionCard key={question._id} question={question} index={index} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2 mx-auto">
                <Zap className="w-5 h-5" />
                <span>Load More Questions</span>
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80">
            <div className="sticky top-20 space-y-6">
              {/* Quick Actions */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 p-6 shadow-lg">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <Code className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Quick Actions</h3>
                </div>
                <div className="space-y-3">
                  <button onClick={handleNavigate} className="w-full text-left px-6 py-4 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-xl hover:from-blue-700 hover:to-emerald-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-3">
                    <Plus className="w-5 h-5" />
                    <span>Ask a Question</span>
                  </button>
                  <button className="w-full text-left px-6 py-4 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl transition-all duration-300 font-medium border border-gray-200 hover:border-gray-300 flex items-center space-x-3">
                    <BookOpen className="w-5 h-5" />
                    <span>Browse Categories</span>
                  </button>
                  <button className="w-full text-left px-6 py-4 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl transition-all duration-300 font-medium border border-gray-200 hover:border-gray-300 flex items-center space-x-3">
                    <Users className="w-5 h-5" />
                    <span>Join Community</span>
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Community Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Questions Today</span>
                    <span className="font-bold text-blue-600">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Active Members</span>
                    <span className="font-bold text-emerald-600">1,234</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Solutions Found</span>
                    <span className="font-bold text-purple-600">892</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

         {/* Floating Action Button */}
        <div className="fixed bottom-8 right-8 z-50">
          <button
            onClick={handleNavigate}
            className="w-16 h-16 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center group"
          >
            <Plus className="w-8 h-8 group-hover:rotate-90 transition-transform duration-300" />
          </button>
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
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Home;

