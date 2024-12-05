'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import socket from '../utils/socket';

interface Notification {
  type: string;
  message: string;
  postId: number;
  commentId: number;
}

interface NotificationContextType {
  notifications: Notification[];
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    socket.on('newNotification', (notification: Notification) => {
      setNotifications((prev) => [...prev, notification]);
    });

    return () => {
      socket.off('newNotification');
    };
  }, []);

  const clearNotifications = () => setNotifications([]);

  return (
    <NotificationContext.Provider value={{ notifications, clearNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      'useNotifications must be used within a NotificationProvider'
    );
  }
  return context;
};
