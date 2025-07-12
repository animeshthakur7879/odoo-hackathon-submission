import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Users, Award, Search, TrendingUp, Clock, CheckCircle, Code, Zap, Globe } from 'lucide-react';
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
      description: 'Search through thousands of questions and answers to find solutions to your coding problems.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: TrendingUp,
      title: 'Build Reputation',
      description: 'Earn reputation points by asking great questions and providing helpful answers to the community.',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      icon: Clock,
      title: 'Real-time Updates',
      description: 'Get instant notifications when someone answers your question or comments on your posts.',
      color: 'from-purple-500 to-purple-600'
    },
  ];

  const benefits = [
    'Get help from expert developers worldwide',
    'Share your knowledge and help others',
    'Build your professional reputation',
    'Access a vast library of solutions'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background with subtle gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-emerald-50/30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.08)_1px,transparent_0)] bg-[length:20px_20px]"></div>
        
        {/* Floating elements for animation */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400/10 to-emerald-400/10 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full animate-float-delay"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-r from-emerald-400/10 to-blue-400/10 rounded-full animate-float-slow"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
          <div className="text-center">
            {/* Main Heading */}
            <div className="opacity-0 animate-fade-in-up">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Where Developers
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 animate-gradient">
                  Share Knowledge
                </span>
              </h1>
            </div>
            
            {/* Subtitle */}
            <div className="opacity-0 animate-fade-in-up animation-delay-200">
              <p className="text-xl text-gray-600/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                Join thousands of developers asking questions, sharing answers, and learning together. 
                Get help with your code, share your expertise, and build your reputation in the community.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="opacity-0 animate-fade-in-up animation-delay-400">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Link
                  to="/questions"
                  className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
                >
                  <span>Explore Questions</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <Link
                  to="/ask"
                  className="px-8 py-4 border-2 border-gray-200/60 hover:border-blue-300/60 text-gray-700 hover:text-blue-600 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 bg-white/80 backdrop-blur-sm"
                >
                  Ask a Question
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="opacity-0 animate-fade-in-up animation-delay-600">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div key={index} className="text-center group">
                      <div className="inline-flex items-center justify-center w-14 h-14 bg-white/80 backdrop-blur-sm rounded-xl mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110 border border-white/40">
                        <IconComponent className="w-6 h-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                      <div className="text-sm text-gray-600/80">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gradient-to-b from-white to-gray-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600"> StackIt?</span>
            </h2>
            <p className="text-lg text-gray-600/90 max-w-2xl mx-auto">
              Discover the features that make StackIt the perfect platform for developers to grow and learn together.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="group">
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-white/40 hover:border-blue-200/50">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600/90 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-gradient-to-r from-blue-50/30 via-white to-emerald-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Join the Community of 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">
                  Problem Solvers
                </span>
              </h2>
              <p className="text-lg text-gray-600/90 mb-8">
                Whether you're a beginner or an expert, StackIt provides the perfect environment to learn, 
                teach, and grow as a developer.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-emerald-400/20 rounded-2xl transform rotate-3"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/40">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-gradient-to-r from-blue-50/50 to-emerald-50/50 rounded-xl">
                    <Code className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold text-gray-900">500+</div>
                    <div className="text-sm text-gray-600">Languages</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-emerald-50/50 to-blue-50/50 rounded-xl">
                    <Zap className="w-8 h-8 mx-auto mb-2 text-emerald-600" />
                    <div className="text-2xl font-bold text-gray-900">24/7</div>
                    <div className="text-sm text-gray-600">Support</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-purple-50/50 to-pink-50/50 rounded-xl">
                    <Globe className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                    <div className="text-2xl font-bold text-gray-900">150+</div>
                    <div className="text-sm text-gray-600">Countries</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-pink-50/50 to-purple-50/50 rounded-xl">
                    <Users className="w-8 h-8 mx-auto mb-2 text-pink-600" />
                    <div className="text-2xl font-bold text-gray-900">98%</div>
                    <div className="text-sm text-gray-600">Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600/5 to-emerald-600/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-gray-600/90 mb-8">
            Join thousands of developers who are already sharing knowledge and growing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleLogin}
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
            >
              <span>Get Started Today</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <Link
              to="/questions"
              className="px-8 py-4 border-2 border-gray-200/60 hover:border-blue-300/60 text-gray-700 hover:text-blue-600 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 bg-white/80 backdrop-blur-sm"
            >
              Browse Questions
            </Link>
          </div>
        </div>
      </div>

      <Footer />
      
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-delay {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-180deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(90deg); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delay {
          animation: float-delay 8s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
      `}</style>
    </div>
  );
};

export default Landing;