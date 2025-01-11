import Link from 'next/link';
import Image from 'next/image';

// 示例公司数据
const companies = [
  {
    id: 1,
    name: 'Joby Aviation',
    description: '专注于开发电动垂直起降飞行器，致力于提供安全、安静和便捷的空中出行服务。',
    logo: '/images/joby.png',
    status: '适航认证进行中',
    location: '美国',
  },
  {
    id: 2,
    name: 'Lilium',
    description: '开发创新的电动喷气式垂直起降飞行器，旨在革新区域航空出行。',
    logo: '/images/lilium.png',
    status: '原型机测试阶段',
    location: '德国',
  },
  {
    id: 3,
    name: 'EHang',
    description: '全球领先的自动驾驶航空器技术公司，专注于开发和商业化自动驾驶飞行器。',
    logo: '/images/ehang.png',
    status: '已获中国适航认证',
    location: '中国',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <h1 className="text-center">
          <span className="text-4xl font-bold text-gray-900">探索 </span>
          <span className="text-4xl font-bold text-blue-600">eVTOL </span>
          <span className="text-4xl font-bold text-gray-900">的未来</span>
        </h1>
        <p className="mt-4 text-xl text-center text-gray-600">
          发现全球领先的电动垂直起降航空器制造商
        </p>

        {/* Search Bar */}
        <div className="mt-10 max-w-3xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="搜索eVTOL公司或产品..."
              className="w-full px-6 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              搜索
            </button>
          </div>
        </div>

        {/* Category Links */}
        <div className="mt-8 flex justify-center space-x-8">
          <Link href="/certification" className="text-gray-600 hover:text-blue-600 transition-colors">
            适航认证
          </Link>
          <Link href="/specs" className="text-gray-600 hover:text-blue-600 transition-colors">
            技术参数
          </Link>
          <Link href="/manufacturers" className="text-gray-600 hover:text-blue-600 transition-colors">
            制造商
          </Link>
          <Link href="/market" className="text-gray-600 hover:text-blue-600 transition-colors">
            市场动态
          </Link>
        </div>
      </div>

      {/* Company List Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">热门eVTOL公司</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {companies.map((company) => (
            <div
              key={company.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 relative mr-4">
                    <Image
                      src={company.logo}
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
                <div className="flex justify-between items-center">
                  <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {company.status}
                  </span>
                  <Link
                    href={`/company/${company.id}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    查看详情 →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/companies"
            className="inline-block px-6 py-3 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
          >
            查看更多公司
          </Link>
        </div>
      </div>
    </div>
  );
} 