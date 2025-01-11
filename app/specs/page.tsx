import { connectDB } from '@/lib/mongodb';
import Company from '@/models/Company';
import Image from 'next/image';
import Link from 'next/link';

async function getSpecsData() {
  try {
    await connectDB();
    const companies = await Company.find()
      .select('name logo products specifications')
      .lean();
    return companies;
  } catch (error) {
    console.error('获取技术参数失败:', error);
    return [];
  }
}

export default async function SpecsPage() {
  const companies = await getSpecsData();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">eVTOL 技术参数对比</h1>
          <p className="mt-4 text-xl text-gray-600">
            主流电动垂直起降航空器的技术规格详细对比
          </p>
        </div>

        {/* 参数对比表格 */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-8 py-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      公司/产品
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      航程
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      最大速度
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      载客量
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      噪音水平
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      电池容量
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {companies.map((company) => (
                    company.products?.map((product: any) => (
                      <tr key={`${company._id}-${product.name}`} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 relative">
                              <Image
                                src={company.logo || '/images/placeholder.png'}
                                alt={company.name}
                                layout="fill"
                                objectFit="contain"
                                className="rounded-full"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {company.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {product.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.specifications?.range || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.specifications?.speed || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.specifications?.capacity || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.specifications?.noise || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.specifications?.battery || '-'}
                        </td>
                      </tr>
                    ))
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 技术说明 */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">航程</h3>
            <p className="text-gray-600">
              单次充电可飞行的最大距离。受飞行条件（如天气、载重）影响，实际航程可能有所变化。
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">最大速度</h3>
            <p className="text-gray-600">
              在标准大气压和海平面条件下的最大巡航速度。实际运营速度通常低于此值以确保安全。
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">噪音水平</h3>
            <p className="text-gray-600">
              在特定距离（通常为100米）测得的噪音分贝值。相比传统直升机，eVTOL通常具有更低的噪音水平。
            </p>
          </div>
        </div>

        {/* 数据说明 */}
        <div className="mt-8 bg-gray-50 rounded-lg p-4 text-sm text-gray-500">
          <p>注：所有数据均来自公司官方公布信息或公开资料。具体性能可能因实际运营条件而异。</p>
        </div>
      </div>
    </div>
  );
} 