import { config } from 'dotenv';
import { resolve } from 'path';
import bcrypt from 'bcryptjs';

// 加载环境变量
config({ path: resolve(__dirname, '../.env.local') });

import { connectDB } from '../lib/mongodb';
import Company from '../models/Company';
import User from '../models/User';

const companies = [
  {
    name: 'Joby Aviation',
    description: '专注于开发电动垂直起降飞行器，致力于提供安全、安静和便捷的空中出行服务。作为行业领导者，Joby Aviation 在eVTOL技术和适航认证方面取得了显著进展。',
    logo: '/images/placeholder.png',
    location: '美国',
    status: '适航认证进行中',
    foundedYear: 2009,
    employeeCount: '500-1000',
    website: 'https://www.jobyaviation.com',
    specifications: [
      { name: '研发投入', value: '超过10亿美元' },
      { name: '专利数量', value: '200+' },
      { name: '技术储备', value: '核心技术自研' }
    ],
    certifications: [
      {
        name: 'FAA型号合格证',
        status: '进行中',
        description: '已完成第三阶段审核，预计2024年底完成全部认证',
        updatedAt: new Date('2024-01-15')
      },
      {
        name: '生产许可证',
        status: '进行中',
        description: '生产设施建设中，同步进行认证',
        updatedAt: new Date('2024-01-10')
      }
    ],
    products: [
      {
        name: 'Joby S4',
        description: '五座电动垂直起降飞行器，专为城市空中交通设计',
        specifications: {
          range: '150英里',
          speed: '200mph',
          capacity: '4名乘客 + 1名飞行员',
          noise: '65分贝@100米',
          battery: '充电时间45分钟'
        }
      }
    ],
    news: [
      {
        id: '1',
        title: 'Joby Aviation完成FAA第三阶段认证审核',
        summary: '公司在适航认证进程中取得重要进展，预计2024年底完成全部认证流程。',
        url: '#',
        date: '2024-01-15'
      },
      {
        id: '2',
        title: '新一轮试飞测试成功完成',
        summary: '累计完成超过1000小时试飞，验证了产品的可靠性和安全性。',
        url: '#',
        date: '2024-01-10'
      }
    ]
  },
  {
    name: 'EHang',
    description: '全球领先的自动驾驶航空器技术公司，专注于开发和商业化自动驾驶飞行器。EHang在全球率先获得了载人级别自动驾驶eVTOL的适航认证。',
    logo: '/images/placeholder.png',
    location: '中国',
    status: '已获适航认证',
    foundedYear: 2014,
    employeeCount: '400-500',
    website: 'https://www.ehang.com',
    specifications: [
      { name: '市场地位', value: '全球领先' },
      { name: '技术优势', value: '自动驾驶系统' },
      { name: '应用场景', value: '空中旅游、应急救援' }
    ],
    certifications: [
      {
        name: 'CAAC型号合格证',
        status: '已获得',
        description: '全球首个获得适航认证的自动驾驶eVTOL',
        updatedAt: new Date('2023-12-28')
      }
    ],
    products: [
      {
        name: 'EH216',
        description: '双座自动驾驶航空器，适用于空中旅游和城市空中交通',
        specifications: {
          range: '22英里',
          speed: '80mph',
          capacity: '2名乘客',
          noise: '55分贝@100米',
          battery: '充电时间90分钟'
        }
      }
    ],
    news: [
      {
        id: '1',
        title: 'EHang获得CAAC型号合格证',
        summary: '成为全球首个获得适航认证的自动驾驶eVTOL制造商。',
        url: '#',
        date: '2023-12-28'
      }
    ]
  },
  {
    name: 'Lilium',
    description: '开发创新的电动喷气式垂直起降飞行器，旨在革新区域航空出行。Lilium采用独特的喷气式推进系统，提供更远的航程和更高的巡航速度。',
    logo: '/images/placeholder.png',
    location: '欧洲',
    status: '原型机测试阶段',
    foundedYear: 2015,
    employeeCount: '600-700',
    website: 'https://www.lilium.com',
    specifications: [
      { name: '技术特点', value: '喷气式推进' },
      { name: '研发进度', value: '原型机测试' },
      { name: '商业模式', value: '区域航空服务' }
    ],
    certifications: [
      {
        name: 'EASA型号认证',
        status: '进行中',
        description: '已启动认证流程，正在进行飞行测试',
        updatedAt: new Date('2024-01-10')
      }
    ],
    products: [
      {
        name: 'Lilium Jet',
        description: '七座电动喷气式垂直起降飞行器，专注于区域航空市场',
        specifications: {
          range: '155英里',
          speed: '175mph',
          capacity: '6名乘客 + 1名飞行员',
          noise: '60分贝@100米',
          battery: '充电时间60分钟'
        }
      }
    ],
    news: [
      {
        id: '1',
        title: 'Lilium开始EASA认证第二阶段测试',
        summary: '完成关键飞行测试里程碑，认证进程按计划推进。',
        url: '#',
        date: '2024-01-10'
      }
    ]
  }
];

async function seed() {
  try {
    await connectDB();
    
    // 清空现有数据
    await Company.deleteMany({});
    
    // 插入示例数据
    await Company.insertMany(companies);
    
    console.log('数据库初始化成功！');
    process.exit(0);
  } catch (error) {
    console.error('数据库初始化失败:', error);
    process.exit(1);
  }
}

seed(); 