'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import ProfileForm from '@/app/components/ProfileForm';
import UserComments from '@/app/components/UserComments';
import NotificationList from '@/app/components/NotificationList';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState('profile');

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center">加载中...</div>;
  }

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">请先登录</h1>
        <Link
          href="/auth/signin"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          去登录
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-sm">
        {/* 用户信息头部 */}
        <div className="p-6 border-b">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {session.user?.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name || '用户头像'}
                  className="w-20 h-20 rounded-full"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">
                    {session.user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
              )}
            </div>
            <div className="ml-6">
              <h1 className="text-2xl font-bold text-gray-900">
                {session.user?.name || '未设置昵称'}
              </h1>
              <p className="text-gray-500">{session.user?.email}</p>
            </div>
          </div>
        </div>

        {/* 标签页导航 */}
        <div className="border-b">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'profile'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              个人信息
            </button>
            <button
              onClick={() => setActiveTab('comments')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'comments'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              我的评论
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'notifications'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              通知消息
            </button>
            <button
              onClick={() => setActiveTab('following')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'following'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              关注内容
            </button>
          </nav>
        </div>

        {/* 内容区域 */}
        <div className="p-6">
          {activeTab === 'profile' && (
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">个人信息</h2>
              <ProfileForm />
            </div>
          )}

          {activeTab === 'comments' && (
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">我的评论</h2>
              <UserComments />
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="mt-6">
              <NotificationList />
            </div>
          )}

          {activeTab === 'following' && (
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">关注内容</h2>
              {/* 关注的公司和话题列表将在这里实现 */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 