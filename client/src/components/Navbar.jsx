import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import NotificationPanel from './NotificationPanel';
import { useDispatch, useSelector } from 'react-redux';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase/firebase';
import { loginUser, logoutUser } from '../features/auth/authSlice';
import { useEffect } from 'react';

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch()
  const {user , isLoading} = useSelector(state => state.auth)

  useEffect(() => {
    if(user) {
      navigate("/questions")
    }
  } , [dispatch , user])

  const handleLogin = async() => {
    const response = await signInWithPopup(auth , provider)
    const user = response.user
    const userData = {
      name : user.displayName ,
      email : user.email , 
      phoneNumber : user.phoneNumber ,
      avatar : user.photoURL 
    }

    // console.log(userData)

    dispatch(loginUser(userData))
    
  };

  const handleLogout = () => {
    dispatch(logoutUser())
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-white/20 z-50 shadow-lg">
      {/* Gradient background overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-white/50 to-emerald-50/50"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-emerald-700 transition-all duration-300">
              StackIt
            </span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors duration-200" />
              <input
                type="text"
                placeholder="Search questions..."
                className="w-full pl-10 pr-4 py-2 bg-white/80 backdrop-blur-sm border border-white/40 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-300/50 focus:bg-white/90 transition-all duration-200 shadow-sm hover:shadow-md placeholder-gray-500"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/questions"
                className="text-gray-700 hover:text-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-emerald-600 hover:bg-clip-text font-medium transition-all duration-300 px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-emerald-50"
              >
                Questions
              </Link>
              <Link
                to="/ask"
                className="text-gray-700 hover:text-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-emerald-600 hover:bg-clip-text font-medium transition-all duration-300 px-3 py-2 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-emerald-50"
              >
                Ask
              </Link>
            </div>

            {user ? (
              <>
                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gradient-to-r hover:from-blue-50 hover:to-emerald-50 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <Bell className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-lg animate-pulse">
                      3
                    </span>
                  </button>
                  {showNotifications && (
                    <NotificationPanel onClose={() => setShowNotifications(false)} />
                  )}
                </div>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gradient-to-r hover:from-blue-50 hover:to-emerald-50 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <div className="relative">
                      <img
                        src={`https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop`}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover ring-2 ring-white shadow-md hover:ring-blue-200 transition-all duration-200"
                      />
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white"></div>
                    </div>
                    <span className="hidden md:block text-sm font-medium bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">{user?.name || 'User'}</span>
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/40 py-2 animate-fade-in overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-emerald-50/30"></div>
                      <div className="relative">
                        <Link
                          to="/profile"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center space-x-2 px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-emerald-50 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:to-emerald-600 transition-all duration-200"
                        >
                          <User className="w-4 h-4" />
                          <span>Profile</span>
                        </Link>
                        
                        <hr className="my-1 border-gray-200/50" />
                        
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-2 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleLogin}
                  className="px-6 py-2 text-sm font-medium bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Log in
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;