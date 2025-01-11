'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface Report {
  _id: string;
  title: string;
  author: string;
  abstract: string;
  type: string;
  tags: string[];
  downloadUrl: string;
  publishDate: string;
  views: number;
}

export default function ResearchPage() {
  const { data: session } = useSession();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchReports();
  }, [filter]);

  const fetchReports = async () => {
    try {
      const res = await fetch(`/api/research?type=${filter}`);
      if (!res.ok) throw new Error('获取研究报告失败');
      const data = await res.json();
      setReports(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          研究报告
        </h1>
        {session?.user.role === 'admin' && (
          <Link
            href="/research/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            发布报告
          </Link>
        )}
      </div>

      <div className="mb-8">
        <div className="flex space-x-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            全部
          </button>
          <button
            onClick={() => setFilter('whitepaper')}
            className={`px-4 py-2 rounded-md ${
              filter === 'whitepaper'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            白皮书
          </button>
          <button
            onClick={() => setFilter('report')}
            className={`px-4 py-2 rounded-md ${
              filter === 'report'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            研究报告
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">加载中...</div>
      ) : error ? (
        <div className="text-center py-12 text-red-600">{error}</div>
      ) : reports.length === 0 ? (
        <div className="text-center py-12 text-gray-600">暂无研究报告</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reports.map((report) => (
            <div
              key={report._id}
              className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {report.title}
                  </h2>
                  <span className="px-2 py-1 text-sm text-blue-800 dark:text-blue-200 bg-blue-100 dark:bg-blue-900 rounded">
                    {report.type === 'whitepaper' ? '白皮书' : '研究报告'}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {report.abstract}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {report.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                  <span>{report.author}</span>
                  <span>{new Date(report.publishDate).toLocaleDateString()}</span>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    浏览次数：{report.views}
                  </span>
                  <Link
                    href={`/research/${report._id}`}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-200 focus:outline-none"
                  >
                    查看详情
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 