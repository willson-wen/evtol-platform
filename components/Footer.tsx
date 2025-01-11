'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-lg mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">关于我们</h3>
            <p className="text-gray-600 dark:text-gray-300">
              深圳低空经济研究小组致力于推动eVTOL行业发展，提供最新行业资讯和分析。
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/companies" className="text-blue-500 hover:text-blue-600">
                  eVTOL公司
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="text-blue-500 hover:text-blue-600">
                  求职信息
                </Link>
              </li>
              <li>
                <Link href="/posts" className="text-blue-500 hover:text-blue-600">
                  社区讨论
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">关注我们</h3>
            <div className="flex justify-center">
              <div className="w-32 h-32 relative">
                <Image
                  src="/qrcode.png"
                  alt="公众号二维码"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-center mt-2 text-gray-600 dark:text-gray-300">
              扫码关注公众号
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} 深圳低空经济研究小组. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 