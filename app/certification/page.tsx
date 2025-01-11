import Link from 'next/link';
import CompanyLogo from '@/app/components/CompanyLogo';

// 模拟数据
const certificationData = [
  {
    id: 1,
    company: 'Joby Aviation',
    logo: '/images/joby.png',
    country: '美国',
    authority: 'FAA',
    currentPhase: 3,
    totalPhases: 5,
    status: '进行中',
    expectedCompletion: '2024年底',
    updates: [
      {
        date: '2024-01-15',
        title: '完成第三阶段审核',
        description: '成功通过FAA第三阶段适航认证审核，进入第四阶段准备。',
      },
      {
        date: '2023-12-20',
        title: '提交补充文件',
        description: '向FAA提交额外的安全测试数据和文档。',
      },
    ],
  },
  {
    id: 2,
    company: 'EHang',
    logo: '/images/ehang.png',
    country: '中国',
    authority: 'CAAC',
    currentPhase: 5,
    totalPhases: 5,
    status: '已完成',
    expectedCompletion: '已完成',
    updates: [
      {
        date: '2023-12-28',
        title: '获得型号合格证',
        description: '成功获得CAAC颁发的型号合格证，成为全球首个获得适航认证的自动驾驶eVTOL。',
      },
    ],
  },
  {
    id: 3,
    company: 'Lilium',
    logo: '/images/lilium.png',
    country: '德国',
    authority: 'EASA',
    currentPhase: 2,
    totalPhases: 5,
    status: '进行中',
    expectedCompletion: '2025年中',
    updates: [
      {
        date: '2024-01-10',
        title: '开始第二阶段测试',
        description: '启动EASA认证第二阶段飞行测试计划。',
      },
    ],
  },
];

export default function CertificationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">适航认证进度</h1>
        
        <div className="grid gap-8">
          {certificationData.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                {/* 公司信息和进度条 */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <div className="mr-4">
                      <CompanyLogo name={item.company} src={item.logo} size="md" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">{item.company}</h2>
                      <p className="text-sm text-gray-500">
                        {item.country} · {item.authority}认证
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      item.status === '已完成' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {item.status}
                    </span>
                    <p className="text-sm text-gray-500 mt-1">
                      预计完成时间: {item.expectedCompletion}
                    </p>
                  </div>
                </div>

                {/* 进度条 */}
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      认证阶段 {item.currentPhase}/{item.totalPhases}
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      {Math.round((item.currentPhase / item.totalPhases) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${(item.currentPhase / item.totalPhases) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* 最新进展 */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">最新进展</h3>
                  <div className="space-y-4">
                    {item.updates.map((update, index) => (
                      <div key={index} className="border-l-2 border-blue-200 pl-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-base font-medium text-gray-900">{update.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{update.description}</p>
                          </div>
                          <span className="text-sm text-gray-500">{update.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 查看详情链接 */}
                <div className="mt-6 text-right">
                  <Link
                    href={`/company/${item.id}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    查看公司详情 →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 