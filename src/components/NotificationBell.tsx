'use client';
import React from 'react';
import { useNotifications } from '../app/context/NotificationContext';
import { useAuth } from '../app/context/AuthContext';

const NotificationBell: React.FC = () => {
  const { notifications, clearNotifications } = useNotifications();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null; // 로그인되지 않은 경우 알림을 표시하지 않음
  }

  return (
    <div>
      <button onClick={clearNotifications} style={{ position: 'relative' }}>
        🔔
        {notifications.length > 0 && (
          <span
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              backgroundColor: 'red',
              color: 'white',
              borderRadius: '50%',
              padding: '2px 6px',
              fontSize: '12px',
            }}
          >
            {notifications.length}
          </span>
        )}
      </button>
      {notifications.length > 0 && (
        <ul>
          {notifications.map((notification, index) => (
            <li key={index}>
              {notification.message} (Post ID: {notification.postId})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationBell;
