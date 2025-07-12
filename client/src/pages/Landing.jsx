import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Users, Award, Search, TrendingUp, Clock } from 'lucide-react';
import Footer from '../components/Footer';
import { useDispatch } from 'react-redux';
import { auth, provider } from '../firebase/firebase';
import { signInWithPopup } from 'firebase/auth';
import { loginUser } from '../features/auth/authSlice';

const Landing = () => {

  const dispatch = useDispatch()

  const handleLogin = async() => {
    const response = await signInWithPopup(auth , provider)
    const user = response.user
    const userData = {
      name : user.displayName ,
      email : user.email , 
      phoneNumber : user.phoneNumber ,
      // avatar : user.avatar 
    }

    console.log(userData)

    // dispatch(loginUser(userData))
    
  };


  const stats = [
    { label: 'Questions Asked', value: '10K+', icon: MessageCircle },
    { label: 'Active Users', value: '2.5K+', icon: Users },
    { label: 'Answers Posted', value: '25K+', icon: Award },
  ];

  const features = [
    {
      icon: Search,
      title: 'Find Answers Fast',
      description: 'Search through thousands of questions and answers to find solutions to your coding problems.'
    },
    {
      icon: TrendingUp,
      title: 'Build Reputation',
      description: 'Earn reputation points by asking great questions and providing helpful answers to the community.'
    },
    {
      icon: Clock,
      title: 'Real-time Updates',
      description: 'Get instant notifications when someone answers your question or comments on your posts.'
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-emerald-50"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 animate-slide-up">
              Where Developers
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">
                Share Knowledge
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up">
              Join thousands of developers asking questions, sharing answers, and learning together. 
              Get help with your code, share your expertise, and build your reputation in the community.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-slide-up">
              <Link
                to="/questions"
                className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span>Explore Questions</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                to="/ask"
                className="px-8 py-4 border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1"
              >
                Ask a Question
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto animate-slide-up">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-3">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
     

      {/* CTA Section */}
  

      <Footer />
    </div>
  );
};

export default Landing;