import { notFound } from 'next/navigation';
import Link from 'next/link';
import { connectDB } from '@/lib/mongodb';
import Company from '@/models/Company';
import { Types } from 'mongoose';

async function getCompanyData(id: string) {
  try {
    // 验证 ID 是否为有效的 ObjectId
    if (!Types.ObjectId.isValid(id)) {
      console.error('无效的 ObjectId:', id);
      return null;
    }

    await connectDB();
    const company = await Company.findOne({ _id: new Types.ObjectId(id) });
    if (!company) return null;
    return company;
  } catch (error) {
    console.error('获取公司数据失败:', error);
    return null;
  }
}

export default async function CompanyPage({ params }: { params: { id: string } }) {
  const company = await getCompanyData(params.id);

  if (!company) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 公司基本信息 */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900">{company.name}</h1>
              <p className="mt-2 text-gray-600">{company.location}</p>
              <div className="mt-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {company.status}
                </span>
              </div>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              {company.description}
            </p>
          </div>
        </div>

        {/* 技术参数 */}
        <div className="mt-8 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-8 py-6">
            <h2 className="text-2xl font-bold text-gray-900">技术参数</h2>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {company.specifications?.map((spec: any) => (
                <div key={spec.name} className="border rounded-lg p-4">
                  <h3 className="font-medium text-gray-900">{spec.name}</h3>
                  <p className="mt-1 text-gray-600">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 认证状态 */}
        <div className="mt-8 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-8 py-6">
            <h2 className="text-2xl font-bold text-gray-900">认证进展</h2>
            <div className="mt-6">
              {company.certifications?.map((cert: any) => (
                <div key={cert.name} className="mb-4 last:mb-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">{cert.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      cert.status === '已获得' ? 'bg-green-100 text-green-800' :
                      cert.status === '进行中' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {cert.status}
                    </span>
                  </div>
                  <p className="mt-1 text-gray-600">{cert.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 相关新闻 */}
        <div className="mt-8 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-8 py-6">
            <h2 className="text-2xl font-bold text-gray-900">相关新闻</h2>
            <div className="mt-6 space-y-4">
              {company.news?.map((item: any) => (
                <div key={item.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                  <Link href={item.url} className="block hover:bg-gray-50 transition-colors">
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    <p className="mt-1 text-gray-600">{item.summary}</p>
                    <div className="mt-2 text-sm text-gray-500">{item.date}</div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 