'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function Navbar() {
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-blue-600 text-xl font-bold">eVTOL</span>
              <span className="ml-2 text-gray-600">数据库</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                首页
              </Link>
              <Link href="/search" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                搜索
              </Link>
              <Link href="/jobs" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                招聘信息
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            <div className="relative mx-4">
              <input
                type="text"
                placeholder="搜索..."
                className="w-64 px-4 py-1 text-sm text-gray-900 bg-gray-100 rounded-full border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="absolute right-0 top-0 mt-1 mr-2">
                <svg className="h-5 w-5 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            </div>

            <button className="p-1 rounded-full text-gray-500 hover:text-blue-600 focus:outline-none">
              <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
              </svg>
            </button>

            {session ? (
              <Link href="/profile" className="ml-4 text-sm text-gray-700 hover:text-blue-600">
                {session.user?.name}
              </Link>
            ) : (
              <Link
                href="/auth/signin"
                className="ml-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                登录
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 