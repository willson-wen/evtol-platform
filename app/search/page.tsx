'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import SearchBar from '../components/SearchBar';

interface Company {
  _id: string;
  name: string;
  description: string;
  location: string;
  status: string;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      
      setLoading(true);
      setError('');
      
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (!res.ok) throw new Error('搜索失败');
        
        const data = await res.json();
        setCompanies(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center mb-8">
          <SearchBar />
        </div>
        
        {loading ? (
          <div className="text-center text-gray-600 dark:text-gray-400">
            搜索中...
          </div>
        ) : error ? (
          <div className="text-center text-red-600 dark:text-red-400">
            {error}
          </div>
        ) : companies.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-400">
            {query ? '未找到相关结果' : '请输入搜索关键词'}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {companies.map((company) => (
              <Link
                key={company._id}
                href={`/company/${company._id}`}
                className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {company.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {company.description}
                </p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    {company.location}
                  </span>
                  <span className="px-3 py-1 rounded-full text-white bg-blue-600">
                    {company.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
} 