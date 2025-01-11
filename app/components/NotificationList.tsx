'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

type Notification = {
  _id: string;
  type: 'comment_reply' | 'comment_like' | 'follow' | 'system';
  title: string;
  content: string;
  sender?: {
    _id: string;
    name: string;
    image?: string;
  };
  relatedId: string;
  relatedType: 'comment' | 'news' | 'company';
  isRead: boolean;
  createdAt: string;
};

type Pagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export default function NotificationList() {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0
  });
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // 获取通知列表
  const fetchNotifications = async (page: number = 1, append: boolean = false) => {
    try {
      const response = await fetch(
        `/api/user/notifications?page=${page}&limit=${pagination.limit}`
      );
      if (!response.ok) throw new Error('获取通知失败');
      const data = await response.json();
      
      if (append) {
        setNotifications(prev => [...prev, ...data.notifications]);
      } else {
        setNotifications(data.notifications);
      }
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : '获取通知失败');
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  // 初始加载
  useEffect(() => {
    fetchNotifications();
  }, []);

  // 加载更多通知
  const handleLoadMore = async () => {
    if (isLoadingMore || pagination.page >= pagination.totalPages) return;
    
    setIsLoadingMore(true);
    await fetchNotifications(pagination.page + 1, true);
  };

  // 标记通知为已读
  const handleMarkAsRead = async (notificationId: string) => {
    try {
      const response = await fetch(`/api/user/notifications/${notificationId}/read`, {
        method: 'PUT',
      });

      if (!response.ok) throw new Error('标记通知失败');
      
      setNotifications(prev =>
        prev.map(notification =>
          notification._id === notificationId
            ? { ...notification, isRead: true }
            : notification
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : '标记通知失败');
    }
  };

  // 标记所有通知为已读
  const handleMarkAllAsRead = async () => {
    try {
      const response = await fetch('/api/user/notifications/read-all', {
        method: 'PUT',
      });

      if (!response.ok) throw new Error('标记通知失败');
      
      setNotifications(prev =>
        prev.map(notification => ({ ...notification, isRead: true }))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : '标记通知失败');
    }
  };

  // 获取通知图标
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'comment_reply':
        return (
          <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        );
      case 'comment_like':
        return (
          <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
          </svg>
        );
      case 'follow':
        return (
          <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">加载通知中...</div>;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div>
      {/* 操作栏 */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-gray-500">
          共 {pagination.total} 条通知，{notifications.filter(n => !n.isRead).length} 条未读
        </div>
        {notifications.some(n => !n.isRead) && (
          <button
            onClick={handleMarkAllAsRead}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            全部标记为已读
          </button>
        )}
      </div>

      {/* 通知列表 */}
      {notifications.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          暂无通知消息
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification._id}
              className={`p-4 rounded-lg ${
                notification.isRead ? 'bg-white' : 'bg-blue-50'
              } hover:shadow-md transition-shadow`}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <h3 className="text-base font-medium text-gray-900">
                      {notification.title}
                    </h3>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">
                        {new Date(notification.createdAt).toLocaleString()}
                      </span>
                      {!notification.isRead && (
                        <button
                          onClick={() => handleMarkAsRead(notification._id)}
                          className="text-sm text-blue-600 hover:text-blue-700"
                        >
                          标记已读
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="mt-1 text-gray-600">{notification.content}</p>
                  {notification.sender && (
                    <div className="mt-2 flex items-center space-x-2">
                      {notification.sender.image ? (
                        <img
                          src={notification.sender.image}
                          alt={notification.sender.name}
                          className="w-5 h-5 rounded-full"
                        />
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-xs font-medium text-blue-600">
                            {notification.sender.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <span className="text-sm text-gray-600">
                        {notification.sender.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* 加载更多按钮 */}
          {pagination.page < pagination.totalPages && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className={`px-6 py-2 rounded-lg text-white font-medium ${
                  isLoadingMore
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isLoadingMore ? '加载中...' : '加载更多通知'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 