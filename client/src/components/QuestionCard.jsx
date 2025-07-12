import { ArrowUp, ArrowDown, MessageCircle, Clock, User, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const QuestionCard = ({ question }) => {
  const timeAgo = (date) => {
    const now = new Date();
    const posted = new Date(date);
    const diffInHours = Math.floor((now - posted) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 animate-slide-up">
      <div className="flex items-start space-x-4">
        {/* Vote Section */}
        <div className="flex flex-col items-center space-y-2 min-w-[3rem]">
          <button className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors duration-200">
            <ArrowUp className="w-5 h-5" />
          </button>
          <span className="text-lg font-semibold text-gray-900">{question.votes}</span>
          <button className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors duration-200">
            <ArrowDown className="w-5 h-5" />
          </button>
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-0">
          <Link 
            to={`/question/${question.id}`}
            className="block group"
          >
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 mb-2">
              {question.title}
            </h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {question.description}
            </p>
          </Link>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {question.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full hover:bg-blue-200 cursor-pointer transition-colors duration-200"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Meta Information */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <MessageCircle className="w-4 h-4" />
                <span>{question.answerCount} answers</span>
                {question.hasAcceptedAnswer && (
                  <Check className="w-4 h-4 text-green-600" />
                )}
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{timeAgo(question.createdAt)}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <img
                src={question.author.avatar}
                alt={question.author.name}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="font-medium text-gray-700">{question.author.name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;