import { config } from 'dotenv';
import { resolve } from 'path';

// 加载环境变量
config({ path: resolve(__dirname, '../.env.local') });

import { connectDB } from '../lib/mongodb';
import Job from '../models/Job';
import User from '../models/User';

async function seedJobs() {
  try {
    await connectDB();

    // 获取一个管理员用户作为发布者
    const admin = await User.findOne({ role: 'admin' });
    if (!admin) {
      throw new Error('未找到管理员用户');
    }

    // 清除现有数据
    await Job.deleteMany({});

    // 添加示例职位数据
    const jobs = [
      {
        title: 'eVTOL系统工程师',
        company: 'Joby Aviation',
        location: '美国加州',
        type: '全职',
        salary: '15k - 25k/月',
        description: '负责eVTOL飞行器的系统集成和测试工作，确保各系统间的协调运行。',
        requirements: [
          '航空航天或相关工程专业本科及以上学历',
          '5年以上航空系统集成经验',
          '熟悉航空电子系统和控制系统',
          '具有出色的问题解决能力和团队协作能力'
        ],
        contact: {
          name: '人力资源部',
          email: 'hr@jobyaviation.com',
          phone: '+1-123-456-7890'
        },
        postedBy: admin._id,
        status: 'open'
      },
      {
        title: '飞控软件工程师',
        company: 'EHang',
        location: '广州',
        type: '全职',
        salary: '25k - 40k/月',
        description: '负责自动驾驶系统的开发和优化，实现安全可靠的飞行控制。',
        requirements: [
          '计算机或自动化相关专业本科及以上学历',
          '3年以上嵌入式系统开发经验',
          '熟悉C/C++编程语言和实时操作系统',
          '具有航空领域开发经验者优先'
        ],
        contact: {
          name: '技术部',
          email: 'tech@ehang.com',
          phone: '020-12345678'
        },
        postedBy: admin._id,
        status: 'open'
      }
    ];

    await Job.insertMany(jobs);
    console.log('职位数据初始化成功！');
    process.exit(0);
  } catch (error) {
    console.error('职位数据初始化失败:', error);
    process.exit(1);
  }
}

seedJobs(); 