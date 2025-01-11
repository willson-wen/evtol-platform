'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface Report {
  _id: string;
  title: string;
  author: string;
  abstract: string;
  content: string;
  type: string;
  tags: string[];
  downloadUrl: string;
  publishDate: string;
  views: number;
}

export default function ResearchDetailPage({ params }: { params: { id: string } }) {
  const { data: session } = useSession();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReportDetails();
  }, [params.id]);

  const fetchReportDetails = async () => {
    try {
      const res = await fetch(`/api/research/${params.id}`);
      if (!res.ok) throw new Error('获取研究报告详情失败');
      const data = await res.json();
      setReport(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-12">加载中...</div>;
  if (error) return <div className="text-center py-12 text-red-600">{error}</div>;
  if (!report) return <div className="text-center py-12">未找到该研究报告</div>;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <div className="px-6 py-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {report.title}
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                作者：{report.author}
              </p>
            </div>
            <span className="px-3 py-1 text-sm text-blue-800 dark:text-blue-200 bg-blue-100 dark:bg-blue-900 rounded">
              {report.type === 'whitepaper' ? '白皮书' : '研究报告'}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {report.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                摘要
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {report.abstract}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                正文
              </h2>
              <div 
                className="text-gray-600 dark:text-gray-300"
                dangerouslySetInnerHTML={{ __html: report.content }}
              />
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <p>发布日期：{new Date(report.publishDate).toLocaleDateString()}</p>
                <p>浏览次数：{report.views}</p>
              </div>
              {report.downloadUrl && (
                <a
                  href={report.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  下载完整报告
                </a>
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              href="/research"
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              返回列表
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 