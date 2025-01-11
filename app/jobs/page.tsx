'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  status: string;
  createdAt: string;
}

export default function JobsPage() {
  const { data: session } = useSession();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    location: '',
  });

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const fetchJobs = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (filters.type) queryParams.append('type', filters.type);
      if (filters.location) queryParams.append('location', filters.location);

      const res = await fetch(`/api/jobs?${queryParams}`);
      if (!res.ok) throw new Error('获取职位信息失败');

      const data = await res.json();
      setJobs(data);
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
          求职信息
        </h1>
        {session && (
          <Link
            href="/jobs/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            发布职位
          </Link>
        )}
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <select
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        >
          <option value="">所有类型</option>
          <option value="全职">全职</option>
          <option value="兼职">兼职</option>
          <option value="实习">实习</option>
        </select>

        <select
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        >
          <option value="">所有地区</option>
          <option value="中国">中国</option>
          <option value="美国">美国</option>
          <option value="德国">德国</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center text-gray-600 dark:text-gray-400">
          加载中...
        </div>
      ) : error ? (
        <div className="text-center text-red-600 dark:text-red-400">
          {error}
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center text-gray-600 dark:text-gray-400">
          暂无职位信息
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <Link
              key={job._id}
              href={`/jobs/${job._id}`}
              className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {job.title}
                </h2>
                <span className="px-2 py-1 text-sm text-blue-800 dark:text-blue-200 bg-blue-100 dark:bg-blue-900 rounded">
                  {job.type}
                </span>
              </div>
              <div className="mb-4">
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  {job.company}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {job.location}
                </p>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  {new Date(job.createdAt).toLocaleDateString()}
                </span>
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  {job.salary}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
} 