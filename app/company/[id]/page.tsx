import Image from 'next/image';
import Link from 'next/link';
import CompanyLogo from '@/app/components/CompanyLogo';

// 模拟数据获取函数
async function getCompanyData(id: string) {
  // 这里模拟从数据库获取数据
  return {
    id: parseInt(id),
    name: 'Joby Aviation',
    description: '专注于开发电动垂直起降飞行器，致力于提供安全、安静和便捷的空中出行服务。',
    logo: '/images/joby.png',
    status: '适航认证进行中',
    location: '美国',
    foundedYear: 2009,
    employeeCount: '500-1000',
    fundingStatus: {
      total: '$1.6B',
      latestRound: 'IPO',
      lastFundingDate: '2021年2月',
    },
    products: [
      {
        name: 'Joby S4',
        description: '一款五座电动垂直起降飞行器，设计用于城市空中交通。',
        specifications: {
          range: '150英里',
          speed: '200mph',
          capacity: '4名乘客 + 1名飞行员',
          noise: '飞行时65分贝@100米',
        },
        certificationStatus: '正在进行FAA认证',
        images: ['/images/joby-s4-1.png', '/images/joby-s4-2.png'],
      }
    ],
    news: [
      {
        title: 'Joby Aviation获得FAA第三阶段认证',
        date: '2024-01-10',
        source: 'eVTOL News',
        link: '#'
      },
      {
        title: '完成最新一轮试飞测试',
        date: '2024-01-05',
        source: 'Company Blog',
        link: '#'
      }
    ]
  };
}

export default async function CompanyPage({ params }: { params: { id: string } }) {
  const company = await getCompanyData(params.id);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 公司基本信息 */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <div className="mr-6">
                <CompanyLogo name={company.name} src={company.logo} size="lg" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{company.name}</h1>
                <p className="text-lg text-gray-600 mt-2">{company.location}</p>
                <div className="mt-4">
                  <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {company.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">成立于 {company.foundedYear}</p>
              <p className="text-sm text-gray-500 mt-1">员工规模 {company.employeeCount}</p>
              <p className="text-sm font-semibold text-blue-600 mt-1">
                总融资 {company.fundingStatus.total}
              </p>
            </div>
          </div>
          <p className="text-gray-600 mt-6 text-lg leading-relaxed">
            {company.description}
          </p>
        </div>

        {/* 产品信息 */}
        {company.products.map((product, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{product.name}</h2>
            <p className="text-gray-600 mb-6">{product.description}</p>
            
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">技术规格</h3>
                <dl className="space-y-2">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <dt className="text-gray-500">{key}</dt>
                      <dd className="text-gray-900 font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">认证状态</h3>
                <p className="text-blue-600 bg-blue-50 px-4 py-2 rounded-lg inline-block">
                  {product.certificationStatus}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {product.images.map((image, imgIndex) => (
                <div key={imgIndex} className="relative h-64 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">产品图片 {imgIndex + 1}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* 新闻动态 */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">最新动态</h2>
          <div className="space-y-6">
            {company.news.map((item, index) => (
              <div key={index} className="flex justify-between items-center border-b border-gray-100 pb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {item.date} · {item.source}
                  </p>
                </div>
                <Link
                  href={item.link}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  阅读更多 →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 