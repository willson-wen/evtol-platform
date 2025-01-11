'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import CompanyLogo from '@/app/components/CompanyLogo';
import CommentSection from '@/app/components/CommentSection';

// 定义类型
type RelatedLink = {
  title: string;
  url: string;
};

type NewsDetail = {
  title: string;
  content: string;
  date: string;
  author: string;
  company: string;
  companyLogo: string;
  category: string;
  readTime: string;
  relatedLinks: RelatedLink[];
};

type NewsDetails = {
  [key: number]: NewsDetail;
};

// 模拟数据
const newsDetails: NewsDetails = {
  1: {
    title: 'Joby Aviation获FAA适航认证重要进展',
    content: `
      Joby Aviation今日宣布，其eVTOL飞行器在FAA适航认证过程中取得重要进展。公司完成了一系列关键的测试和验证工作，包括：

      • 结构测试：完成机翼和机身的静态和疲劳测试
      • 飞行测试：累计完成超过1000小时的试飞
      • 系统验证：完成关键系统的功能和可靠性验证
      
      公司预计将在2025年获得完整的型号合格证，这将使Joby成为首批获得FAA认证的eVTOL制造商之一。

      此外，Joby还透露了其商业化计划：
      
      1. 首批商业航线将在美国加利福尼亚州推出
      2. 已与多个城市达成合作意向
      3. 正在建设首批vertiport基础设施
      
      这一进展标志着eVTOL行业向商业化迈出重要一步，也为未来城市空中交通的发展奠定基础。
    `,
    date: '2024-01-10',
    author: '张航空',
    company: 'Joby Aviation',
    companyLogo: '/images/joby.png',
    category: '认证进展',
    readTime: '5分钟',
    relatedLinks: [
      {
        title: 'Joby的eVTOL技术解析',
        url: '/news/tech-analysis',
      },
      {
        title: 'FAA适航认证流程详解',
        url: '/news/certification-process',
      },
    ],
  },
  2: {
    title: '亿航智能在广州开展城市空中物流试点',
    content: `
      亿航智能今日宣布与广州市政府达成战略合作，将在广州启动城市空中物流配送试点项目。该项目将：

      • 在广州南沙新区建设首个无人机物流配送网络
      • 开展医疗物资、紧急物资的空中配送服务
      • 探索常规快递包裹的空中配送模式
      
      项目第一阶段将部署10台EH216-L货运型号，服务范围覆盖南沙新区核心区域。亿航预计：
      
      1. 日均可完成100-150个配送任务
      2. 配送时效较地面运输提升60%
      3. 特殊情况下可24小时全天候运营
      
      这是国内首个规模化的城市空中物流试点项目，将为eVTOL在物流领域的应用提供重要经验。
    `,
    date: '2024-01-08',
    author: '李物流',
    company: 'EHang',
    companyLogo: '/images/ehang.png',
    category: '商业合作',
    readTime: '4分钟',
    relatedLinks: [
      {
        title: 'EH216-L技术规格',
        url: '/news/eh216l-specs',
      },
      {
        title: '城市空中物流发展趋势',
        url: '/news/urban-logistics',
      },
    ],
  },
  3: {
    title: 'Lilium完成新一轮30亿融资',
    content: `
      德国eVTOL制造商Lilium今日宣布完成30亿美元融资，这轮融资由多家知名投资机构参与。融资资金将用于：

      • 推进Lilium Jet的研发和测试
      • 扩建生产基地
      • 建设商业化基础设施
      
      Lilium表示，这笔资金将支持公司：
      
      1. 完成EASA认证流程
      2. 启动量产准备
      3. 建设首批vertiport网络
      
      这是eVTOL行业迄今为止最大的单轮融资，显示了投资者对行业前景的信心。Lilium预计将在2026年开始商业运营。
    `,
    date: '2024-01-05',
    author: '王投资',
    company: 'Lilium',
    companyLogo: '/images/lilium.png',
    category: '融资动态',
    readTime: '6分钟',
    relatedLinks: [
      {
        title: 'Lilium商业化战略分析',
        url: '/news/lilium-strategy',
      },
      {
        title: 'eVTOL行业投资概览',
        url: '/news/evtol-investment',
      },
    ],
  },
};

export default function NewsDetailPage() {
  const params = useParams();
  const newsId = Number(params.id);
  const news = newsDetails[newsId];

  if (!news) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">未找到新闻</h1>
          <Link href="/market" className="text-blue-600 hover:text-blue-800">
            返回市场动态
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 面包屑导航 */}
        <nav className="flex items-center text-sm text-gray-500 mb-8">
          <Link href="/market" className="hover:text-blue-600">
            市场动态
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{news.category}</span>
        </nav>

        {/* 文章标题区 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{news.title}</h1>
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <div className="w-10 h-10 relative mr-3">
                <CompanyLogo name={news.company} src={news.companyLogo} size="md" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">{news.company}</div>
                <div className="text-sm text-gray-500">{news.author}</div>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>{news.date}</span>
              <span>•</span>
              <span>{news.readTime}</span>
              <span>•</span>
              <span className="text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                {news.category}
              </span>
            </div>
          </div>
        </div>

        {/* 文章内容 */}
        <article className="prose prose-blue max-w-none mb-12">
          {news.content.split('\n').map((paragraph: string, index: number) => (
            <p key={index} className="text-gray-600 mb-4">
              {paragraph.trim()}
            </p>
          ))}
        </article>

        {/* 相关链接 */}
        <div className="border-t border-gray-200 pt-8 mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">相关阅读</h2>
          <div className="space-y-4">
            {news.relatedLinks.map((link: RelatedLink, index: number) => (
              <Link
                key={index}
                href={link.url}
                className="block bg-white rounded-lg border border-gray-200 p-4 hover:border-blue-300 transition-colors"
              >
                <h3 className="text-lg font-medium text-gray-900 hover:text-blue-600">
                  {link.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>

        {/* 评论区 */}
        <CommentSection newsId={newsId} />
      </div>
    </div>
  );
} 