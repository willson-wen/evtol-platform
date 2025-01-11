'use client';

import { useState } from 'react';
import Link from 'next/link';
import CompanyLogo from '@/app/components/CompanyLogo';

// 模拟数据
const marketNews = [
  {
    id: 1,
    title: 'Joby Aviation获FAA适航认证重要进展',
    summary: 'Joby Aviation宣布其eVTOL飞行器在FAA适航认证过程中取得重要进展，预计2025年开始商业运营。',
    date: '2024-01-10',
    company: 'Joby Aviation',
    companyLogo: '/images/joby.png',
    category: '认证进展',
    readTime: '5分钟',
  },
  {
    id: 2,
    title: '亿航智能在广州开展城市空中物流试点',
    summary: '亿航智能与广州市政府合作，启动城市空中物流配送试点项目，探索eVTOL在物流领域的应用。',
    date: '2024-01-08',
    company: 'EHang',
    companyLogo: '/images/ehang.png',
    category: '商业合作',
    readTime: '4分钟',
  },
  {
    id: 3,
    title: 'Lilium完成新一轮30亿融资',
    summary: 'Lilium宣布完成30亿美元融资，资金将用于推进eVTOL飞行器的研发和生产。',
    date: '2024-01-05',
    company: 'Lilium',
    companyLogo: '/images/lilium.png',
    category: '融资动态',
    readTime: '6分钟',
  },
];

const marketTrends = [
  {
    id: 1,
    title: '2024年eVTOL市场规模预测',
    data: {
      year: '2024',
      marketSize: '150亿美元',
      growth: '+45%',
      keyPlayers: 12,
      majorMarkets: ['美国', '中国', '欧盟'],
    },
  },
  {
    id: 2,
    title: '技术发展趋势',
    items: [
      '电池技术持续突破，续航里程提升50%',
      '自动驾驶技术在eVTOL领域的应用加速',
      '新型复合材料的应用降低制造成本',
    ],
  },
  {
    id: 3,
    title: '监管环境分析',
    items: [
      'FAA发布eVTOL特别适航标准',
      'EASA简化认证流程',
      '中国出台低空经济发展政策',
    ],
  },
];

const categories = ['全部', '认证进展', '商业合作', '融资动态', '技术创新', '政策法规'];

export default function MarketPage() {
  const [selectedCategory, setSelectedCategory] = useState('全部');

  const filteredNews = selectedCategory === '全部'
    ? marketNews
    : marketNews.filter(news => news.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">eVTOL市场动态</h1>

        {/* 市场趋势概览 */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">市场趋势</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {marketTrends.map(trend => (
              <div key={trend.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{trend.title}</h3>
                {trend.data ? (
                  <div className="space-y-2">
                    <p className="text-gray-600">市场规模：{trend.data.marketSize}</p>
                    <p className="text-gray-600">增长率：<span className="text-green-600">{trend.data.growth}</span></p>
                    <p className="text-gray-600">主要参与者：{trend.data.keyPlayers}家</p>
                    <p className="text-gray-600">主要市场：{trend.data.majorMarkets.join('、')}</p>
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {trend.items?.map((item, index) => (
                      <li key={index} className="text-gray-600 flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 新闻分类 */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* 新闻列表 */}
        <div className="grid grid-cols-1 gap-6">
          {filteredNews.map(news => (
            <div
              key={news.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <CompanyLogo name={news.company} src={news.companyLogo} size="md" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600">
                          <Link href={`/news/${news.id}`}>{news.title}</Link>
                        </h3>
                        <div className="flex items-center mt-1 space-x-4">
                          <span className="text-sm text-gray-500">{news.company}</span>
                          <span className="text-sm text-gray-500">{news.date}</span>
                          <span className="text-sm text-gray-500">{news.readTime}</span>
                        </div>
                      </div>
                      <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        {news.category}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-2">{news.summary}</p>
                    <div className="mt-4">
                      <Link
                        href={`/news/${news.id}`}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        阅读全文 →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 