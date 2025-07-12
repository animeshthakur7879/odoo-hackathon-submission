import { Bell, MessageCircle, Heart, AtSign } from 'lucide-react';

const NotificationPanel = ({ onClose }) => {
  const notifications = [
    {
      id: 1,
      type: 'answer',
      message: 'John Doe answered your question "How to use React hooks?"',
      time: '2 minutes ago',
      unread: true,
      icon: MessageCircle,
    },
    {
      id: 2,
      type: 'vote',
      message: 'Your answer received 5 upvotes',
      time: '1 hour ago',
      unread: true,
      icon: Heart,
    },
    {
      id: 3,
      type: 'mention',
      message: 'Sarah mentioned you in a comment',
      time: '3 hours ago',
      unread: false,
      icon: AtSign,
    },
  ];

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 animate-fade-in">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          ×
        </button>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification) => {
          const IconComponent = notification.icon;
          return (
            <div
              key={notification.id}
              className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors duration-200 ${
                notification.unread ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-full ${
                  notification.unread ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                </div>
                {notification.unread && (
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="p-3 border-t border-gray-200">
        <button className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
          View all notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationPanel;