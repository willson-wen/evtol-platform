import { config } from 'dotenv';
import { resolve } from 'path';

// 加载环境变量
config({ path: resolve(__dirname, '../.env.local') });

import { connectDB } from '../lib/mongodb';
import Research from '../models/Research';
import User from '../models/User';

async function seedResearch() {
  try {
    await connectDB();

    // 获取一个管理员用户作为发布者
    const admin = await User.findOne({ role: 'admin' });
    if (!admin) {
      throw new Error('未找到管理员用户');
    }

    // 清除现有数据
    await Research.deleteMany({});

    // 添加示例研究报告数据
    const reports = [
      {
        title: 'eVTOL市场发展趋势分析',
        author: '深圳低空经济研究小组',
        abstract: '本报告深入分析了全球eVTOL市场的发展现状、技术趋势和未来展望，重点关注市场规模、主要参与者、技术突破和监管环境等方面。',
        content: `
          <h2>1. 市场概况</h2>
          <p>全球eVTOL市场预计将在未来十年内实现快速增长，到2030年市场规模有望达到数千亿美元。主要增长动力来自于城市空中交通需求增加、技术进步和政策支持。</p>
          
          <h2>2. 技术发展</h2>
          <p>电池技术、自动驾驶系统和空中交通管理系统是eVTOL发展的关键技术领域。目前，多家公司在这些领域都取得了重要突破。</p>
          
          <h2>3. 市场参与者</h2>
          <p>包括传统航空制造商、新兴科技公司和汽车制造商在内的多类企业正在进入eVTOL市场，竞争格局日趋激烈。</p>
          
          <h2>4. 监管环境</h2>
          <p>全球主要国家和地区正在积极制定eVTOL相关法规和标准，为行业发展创造有利条件。</p>
        `,
        type: 'report',
        tags: ['市场分析', '行业趋势', 'eVTOL', '城市空中交通'],
        status: 'published',
        createdBy: admin._id,
      },
      {
        title: 'eVTOL技术白皮书：电推进系统发展现状',
        author: '深圳低空经济研究小组',
        abstract: '本白皮书详细介绍了eVTOL电推进系统的技术原理、发展现状和未来趋势，为行业参与者提供技术参考。',
        content: `
          <h2>1. 技术概述</h2>
          <p>电推进系统是eVTOL的核心部件，其性能直接影响飞行器的续航能力和可靠性。本章节详细介绍了电推进系统的基本原理和关键组件。</p>
          
          <h2>2. 当前挑战</h2>
          <p>电池能量密度、电机效率和散热问题是目前电推进系统面临的主要技术挑战。本章节分析了这些问题的具体表现和潜在解决方案。</p>
          
          <h2>3. 技术路线</h2>
          <p>业界目前形成了多种技术路线，包括分布式电推进、混合动力系统等。每种路线都有其独特的优势和局限性。</p>
          
          <h2>4. 发展趋势</h2>
          <p>新材料、新工艺和新的系统架构正在推动电推进技术的快速发展，未来将呈现轻量化、高效化和智能化的发展趋势。</p>
        `,
        type: 'whitepaper',
        tags: ['技术研究', '电推进', 'eVTOL', '动力系统'],
        status: 'published',
        createdBy: admin._id,
      }
    ];

    await Research.insertMany(reports);
    console.log('研究报告数据初始化成功！');
    process.exit(0);
  } catch (error) {
    console.error('研究报告数据初始化失败:', error);
    process.exit(1);
  }
}

seedResearch(); 