'use client';

import Image from 'next/image';
import Link from 'next/link';

interface CompanyCardProps {
  company: {
    _id: string;
    name: string;
    description: string;
    location: string;
    status: string;
  };
}

export default function CompanyCard({ company }: CompanyCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case '研发中':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case '测试中':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case '适航认证进行中':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case '已获认证':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case '已投产':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getCompanyLogo = (name: string) => {
    const logos: { [key: string]: string } = {
      'Joby Aviation': '/images/companies/joby.png',
      'Lilium': '/images/companies/lilium.png',
      'EHang': '/images/companies/ehang.png'
    };
    return logos[name] || '/images/companies/default.png';
  };

  return (
    <Link href={`/company/${company._id}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="relative w-16 h-16">
            <Image
              src={getCompanyLogo(company.name)}
              alt={company.name}
              fill
              className="object-contain"
            />
          </div>
          <span className={`px-2 py-1 text-sm rounded ${getStatusColor(company.status)}`}>
            {company.status}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {company.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {company.description}
        </p>
        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          {company.location}
        </div>
      </div>
    </Link>
  );
} 