import { connectDB } from '@/lib/mongodb';
import Company from '@/models/Company';

async function getCertificationData() {
  try {
    await connectDB();
    const companies = await Company.find()
      .select('name logo location certifications')
      .sort({ 'certifications.updatedAt': -1 })
      .lean();
    return companies;
  } catch (error) {
    console.error('获取认证数据失败:', error);
    return [];
  }
}

export default async function CertificationPage() {
  const companies = await getCertificationData();

  // 按地区分组认证数据
  const regionData = {
    '中国': {
      title: '中国适航认证',
      description: 'CAAC（中国民用航空局）适航认证进展',
      companies: companies.filter(c => c.location === '中国'),
    },
    '美国': {
      title: '美国适航认证',
      description: 'FAA（联邦航空管理局）适航认证进展',
      companies: companies.filter(c => c.location === '美国'),
    },
    '欧洲': {
      title: '欧洲适航认证',
      description: 'EASA（欧洲航空安全局）适航认证进展',
      companies: companies.filter(c => c.location === '欧洲'),
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">eVTOL 适航认证进展</h1>
          <p className="mt-4 text-xl text-gray-600">
            全球主要地区电动垂直起降航空器适航认证最新进展
          </p>
        </div>

        <div className="space-y-12">
          {Object.entries(regionData).map(([region, data]) => (
            <div key={region} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="px-8 py-6">
                <h2 className="text-2xl font-bold text-gray-900">{data.title}</h2>
                <p className="mt-2 text-gray-600">{data.description}</p>

                <div className="mt-6">
                  {data.companies.length > 0 ? (
                    <div className="divide-y divide-gray-200">
                      {data.companies.map((company) => (
                        <div key={company._id} className="py-6 first:pt-0 last:pb-0">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="flex-shrink-0">
                                <img
                                  src={company.logo || '/images/placeholder.png'}
                                  alt={company.name}
                                  className="h-12 w-12 rounded-full"
                                />
                              </div>
                              <div className="ml-4">
                                <h3 className="text-lg font-medium text-gray-900">
                                  {company.name}
                                </h3>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 space-y-4">
                            {company.certifications?.map((cert: any) => (
                              <div key={cert.name} className="flex items-center justify-between">
                                <div className="flex-1">
                                  <h4 className="text-sm font-medium text-gray-900">
                                    {cert.name}
                                  </h4>
                                  <p className="mt-1 text-sm text-gray-500">
                                    {cert.description}
                                  </p>
                                </div>
                                <div className="ml-4">
                                  <span
                                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                      cert.status === '已获得'
                                        ? 'bg-green-100 text-green-800'
                                        : cert.status === '进行中'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-gray-100 text-gray-800'
                                    }`}
                                  >
                                    {cert.status}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      暂无相关认证数据
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-8 py-6">
            <h2 className="text-2xl font-bold text-gray-900">认证流程说明</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-gray-900">型号合格审定</h3>
                <p className="mt-2 text-gray-600">
                  确认航空器的设计符合适航要求，包括结构强度、性能、系统可靠性等多个方面的评估。
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-gray-900">生产许可审定</h3>
                <p className="mt-2 text-gray-600">
                  评估制造商是否具备按照批准的设计持续生产合格产品的能力。
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-gray-900">适航证颁发</h3>
                <p className="mt-2 text-gray-600">
                  在完成型号合格审定和生产许可审定后，颁发适航证，允许航空器投入商业运营。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 