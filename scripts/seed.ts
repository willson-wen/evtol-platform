import { config } from 'dotenv';
import { resolve } from 'path';
import bcrypt from 'bcryptjs';

// 加载环境变量
config({ path: resolve(__dirname, '../.env.local') });

import { connectDB } from '../lib/mongodb';
import Company from '../models/Company';
import User from '../models/User';

async function seed() {
  try {
    await connectDB();
    
    // 清除现有数据
    await Company.deleteMany({});
    await User.deleteMany({});

    // 创建管理员用户
    const hashedPassword = await bcrypt.hash('admin123456', 12);
    const admin = await User.create({
      name: '管理员',
      email: 'admin@evtol.com',
      password: hashedPassword,
      role: 'admin',
    });
    
    // 添加示例公司数据
    const companies = [
      {
        name: 'Joby Aviation',
        description: '专注于开发电动垂直起降飞行器，致力于提供安全、安静和便捷的空中出行服务。',
        location: '美国',
        status: '适航认证进行中',
        foundedYear: 2009,
        website: 'https://www.jobyaviation.com',
        products: [
          {
            name: 'Joby S4',
            description: '五座电动垂直起降飞行器',
            specifications: {
              range: '150英里',
              speed: '200mph',
              capacity: '4名乘客 + 1名飞行员',
              dimensions: '长13米，宽12米'
            }
          }
        ]
      },
      {
        name: 'Lilium',
        description: '开发创新的电动喷气式垂直起降飞行器，旨在革新区域航空出行。',
        location: '德国',
        status: '测试中',
        foundedYear: 2015,
        website: 'https://www.lilium.com',
        products: [
          {
            name: 'Lilium Jet',
            description: '七座电动喷气式垂直起降飞行器',
            specifications: {
              range: '155英里',
              speed: '175mph',
              capacity: '6名乘客 + 1名飞行员',
              dimensions: '长8.5米，宽14米'
            }
          }
        ]
      },
      {
        name: 'EHang',
        description: '全球领先的自动驾驶航空器技术公司，专注于开发和商业化自动驾驶飞行器。',
        location: '中国',
        status: '已获认证',
        foundedYear: 2014,
        website: 'https://www.ehang.com',
        products: [
          {
            name: 'EH216',
            description: '双座自动驾驶航空器',
            specifications: {
              range: '35公里',
              speed: '130km/h',
              capacity: '2名乘客',
              dimensions: '长5.6米，宽5.6米'
            }
          }
        ]
      }
    ];
    
    await Company.insertMany(companies);
    console.log('数据库初始化成功！');
    process.exit(0);
  } catch (error) {
    console.error('数据库初始化失败:', error);
    process.exit(1);
  }
}

seed(); 