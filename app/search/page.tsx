'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface Company {
  _id: string;
  name: string;
  description: string;
  logo: string;
  location: string;
  status: string;
}

interface SearchResponse {
  results: Company[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [searchType, setSearchType] = useState(searchParams.get('type') || 'all');
  const [results, setResults] = useState<Company[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const performSearch = async (page = 1) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        q: searchQuery,
        type: searchType,
        page: page.toString(),
        limit: '10',
      });

      const response = await fetch(`/api/search?${params}`);
      const data: SearchResponse = await response.json();
      
      setResults(data.results);
      setPagination(data.pagination);
      
      // 更新 URL，但不触发新的搜索
      router.push(`/search?${params.toString()}`, { scroll: false });
    } catch (error) {
      console.error('搜索失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      performSearch();
    }
  }, [searchQuery, searchType]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 搜索表单 */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索eVTOL公司或产品..."
                className="w-full px-6 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-4">
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="px-6 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">全部</option>
                <option value="company">公司</option>
                <option value="product">产品</option>
              </select>
              <button
                type="submit"
                className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                搜索
              </button>
            </div>
          </div>
        </form>

        {/* 搜索结果 */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
            <p className="mt-2 text-gray-600">搜索中...</p>
          </div>
        ) : results.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {results.map((company) => (
                <Link
                  key={company._id}
                  href={`/company/${company._id}`}
                  className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 relative mr-4">
                        <Image
                          src={company.logo || '/images/placeholder.png'}
                          alt={company.name}
                          layout="fill"
                          objectFit="contain"
                          className="rounded-full"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{company.name}</h3>
                        <p className="text-sm text-gray-500">{company.location}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-2">{company.description}</p>
                    <span className="inline-block text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      {company.status}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* 分页 */}
            {pagination.totalPages > 1 && (
              <div className="mt-8 flex justify-center space-x-2">
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => performSearch(page)}
                    className={`px-4 py-2 rounded-lg ${
                      pagination.page === page
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}
          </>
        ) : searchQuery ? (
          <div className="text-center py-12">
            <p className="text-gray-600">未找到相关结果</p>
          </div>
        ) : null}
      </div>
    </div>
  );
} 