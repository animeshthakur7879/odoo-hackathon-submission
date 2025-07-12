import { useState } from 'react';
import { MessageCircle, Heart, Award, Calendar, MapPin, Link as LinkIcon, Edit } from 'lucide-react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('questions');

  // Mock user data
  const user = {
    name: 'Alex Johnson',
    username: 'alex_dev',
    email: 'alex@example.com',
    avatar: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&fit=crop',
    bio: 'Full-stack developer passionate about React, Node.js, and modern web technologies. Love helping others learn and grow in their coding journey.',
    location: 'San Francisco, CA',
    website: 'https://alexjohnson.dev',
    joinDate: '2023-06-15',
    reputation: 2840,
    badges: [
      { name: 'Great Question', count: 3, color: 'gold' },
      { name: 'Good Answer', count: 15, color: 'silver' },
      { name: 'Popular Question', count: 5, color: 'bronze' },
      { name: 'Helpful', count: 8, color: 'bronze' },
    ],
    stats: {
      questionsAsked: 12,
      answersPosted: 47,
      upvotesReceived: 156,
      acceptedAnswers: 23,
    }
  };

  const myQuestions = [
    {
      id: 1,
      title: 'How to implement authentication in React with JWT tokens?',
      votes: 15,
      answers: 3,
      views: 247,
      accepted: true,
      createdAt: '2024-01-15',
      tags: ['React', 'JWT', 'Authentication']
    },
    {
      id: 2,
      title: 'Best practices for error handling in Express.js?',
      votes: 8,
      answers: 2,
      views: 89,
      accepted: false,
      createdAt: '2024-01-10',
      tags: ['Node.js', 'Express', 'Error Handling']
    },
  ];

  const myAnswers = [
    {
      id: 1,
      questionTitle: 'How to optimize React app performance?',
      votes: 23,
      accepted: true,
      createdAt: '2024-01-14',
      questionId: 15
    },
    {
      id: 2,
      questionTitle: 'Understanding JavaScript closures',
      votes: 12,
      accepted: false,
      createdAt: '2024-01-12',
      questionId: 23
    },
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const tabs = [
    { id: 'questions', label: 'Questions', count: user.stats.questionsAsked },
    { id: 'answers', label: 'Answers', count: user.stats.answersPosted },
    { id: 'activity', label: 'Activity', count: null },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Profile Info */}
        <div className="lg:w-80">
          <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-20">
            {/* Avatar and Basic Info */}
            <div className="text-center mb-6">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-600">@{user.username}</p>
              <div className="flex items-center justify-center mt-2">
                <Award className="w-4 h-4 text-yellow-500 mr-1" />
                <span className="text-sm font-medium text-gray-700">{user.reputation} reputation</span>
              </div>
            </div>

            {/* Bio */}
            <div className="mb-6">
              <p className="text-sm text-gray-700 leading-relaxed">{user.bio}</p>
            </div>

            {/* Details */}
            <div className="space-y-3 mb-6">
              {user.location && (
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{user.location}</span>
                </div>
              )}
              {user.website && (
                <div className="flex items-center text-sm text-gray-600">
                  <LinkIcon className="w-4 h-4 mr-2" />
                  <a
                    href={user.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
                  >
                    {user.website.replace('https://', '')}
                  </a>
                </div>
              )}
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Joined {formatDate(user.joinDate)}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900">{user.stats.questionsAsked}</div>
                <div className="text-xs text-gray-600">Questions</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900">{user.stats.answersPosted}</div>
                <div className="text-xs text-gray-600">Answers</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-green-600">{user.stats.acceptedAnswers}</div>
                <div className="text-xs text-gray-600">Accepted</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-blue-600">{user.stats.upvotesReceived}</div>
                <div className="text-xs text-gray-600">Upvotes</div>
              </div>
            </div>

            {/* Badges */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Badges</h3>
              <div className="space-y-2">
                {user.badges.map((badge) => (
                  <div key={badge.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${
                        badge.color === 'gold' ? 'bg-yellow-400' :
                        badge.color === 'silver' ? 'bg-gray-400' : 'bg-amber-600'
                      }`}></div>
                      <span className="text-sm text-gray-700">{badge.name}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{badge.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Edit Profile Button */}
            <button className="w-full mt-6 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
              <Edit className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Tabs */}
          <div className="bg-white rounded-lg border border-gray-200 mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                    {tab.count !== null && (
                      <span className="ml-2 px-2 py-1 text-xs bg-gray-100 rounded-full">
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'questions' && (
                <div className="space-y-4">
                  {myQuestions.map((question) => (
                    <div key={question.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow duration-200">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-900 hover:text-blue-600 cursor-pointer mb-2">
                            {question.title}
                          </h3>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {question.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center space-x-1">
                              <Heart className="w-4 h-4" />
                              <span>{question.votes} votes</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <MessageCircle className="w-4 h-4" />
                              <span>{question.answers} answers</span>
                            </span>
                            <span>{question.views} views</span>
                            <span>{formatDate(question.createdAt)}</span>
                          </div>
                        </div>
                        {question.accepted && (
                          <div className="ml-4 px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                            Accepted
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'answers' && (
                <div className="space-y-4">
                  {myAnswers.map((answer) => (
                    <div key={answer.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow duration-200">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-900 hover:text-blue-600 cursor-pointer mb-2">
                            {answer.questionTitle}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center space-x-1">
                              <Heart className="w-4 h-4" />
                              <span>{answer.votes} votes</span>
                            </span>
                            <span>{formatDate(answer.createdAt)}</span>
                          </div>
                        </div>
                        {answer.accepted && (
                          <div className="ml-4 px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                            Accepted
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'activity' && (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Activity timeline coming soon...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;