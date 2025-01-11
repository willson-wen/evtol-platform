'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';

// 使用与列表页相同的Job类型
type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: '全职' | '兼职' | '实习';
  salary: {
    min: number;
    max: number;
    period: '月' | '年';
  };
  description: string;
  requirements: string[];
  postedAt: string;
};

// 模拟数据
const jobs: Job[] = [
  {
    id: '1',
    title: 'eVTOL系统工程师',
    company: 'Joby Aviation',
    location: '美国加州',
    type: '全职',
    salary: {
      min: 15000,
      max: 25000,
      period: '月'
    },
    description: '负责eVTOL飞行器的系统集成和测试工作，确保各系统间的协调运行。',
    requirements: [
      '航空航天或相关工程专业硕士及以上学历',
      '5年以上航空系统集成经验',
      '熟悉航空法规和认证流程',
      '良好的英语交流能力'
    ],
    postedAt: '2024-01-10'
  },
  {
    id: '2',
    title: '飞控软件工程师',
    company: 'EHang',
    location: '广州',
    type: '全职',
    salary: {
      min: 25000,
      max: 40000,
      period: '月'
    },
    description: '负责自动驾驶系统的开发和优化，实现安全可靠的飞行控制。',
    requirements: [
      '计算机或自动化相关专业本科及以上学历',
      '3年以上嵌入式系统开发经验',
      '熟悉C/C++编程',
      '具有飞控系统开发经验优先'
    ],
    postedAt: '2024-01-11'
  }
];

export default function JobDetailPage() {
  const params = useParams();
  const job = jobs.find(j => j.id === params.id);

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">职位不存在</h1>
        <Link
          href="/jobs"
          className="text-blue-600 hover:text-blue-700"
        >
          返回职位列表
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 导航栏 */}
      <nav className="flex items-center space-x-2 text-gray-500 mb-8">
        <Link href="/jobs" className="hover:text-blue-600">
          职位列表
        </Link>
        <span>/</span>
        <span className="text-gray-900">{job.title}</span>
      </nav>

      {/* 职位信息卡片 */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
            <div className="mt-4 flex flex-wrap gap-4">
              <span className="text-gray-600">{job.company}</span>
              <span className="text-gray-600">{job.location}</span>
              <span className="text-blue-600">{job.type}</span>
            </div>
          </div>
          <div className="mt-4 md:mt-0 md:text-right">
            <div className="text-xl font-medium text-gray-900">
              {job.salary.min / 1000}k - {job.salary.max / 1000}k/{job.salary.period}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              发布于 {new Date(job.postedAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      {/* 职位详情 */}
      <div className="bg-white rounded-lg shadow-sm p-6 space-y-8">
        {/* 职位描述 */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">职位描述</h2>
          <p className="text-gray-600 whitespace-pre-line">{job.description}</p>
        </div>

        {/* 任职要求 */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">任职要求</h2>
          <ul className="list-disc list-inside space-y-2">
            {job.requirements.map((requirement, index) => (
              <li key={index} className="text-gray-600">{requirement}</li>
            ))}
          </ul>
        </div>

        {/* 投递按钮 */}
        <div className="pt-4">
          <button className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
            投递简历
          </button>
        </div>
      </div>
    </div>
  );
} 