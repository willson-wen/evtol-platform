import { connectDB } from '../lib/mongodb';
import Company from '../models/Company';

async function seed() {
  try {
    await connectDB();
    
    // 清除现有数据
    await Company.deleteMany({});
    
    // 创建示例公司数据
    const companies = [
      {
        name: 'Joby Aviation',
        description: 'Joby Aviation 是一家领先的电动垂直起降（eVTOL）飞行器制造商，专注于开发安全、安静和可持续的空中出行解决方案。',
        location: '美国加利福尼亚州',
        status: '认证阶段',
        foundedYear: 2009,
        employeeCount: '1000+',
        website: 'https://www.jobyaviation.com',
        products: [
          {
            name: 'Joby S4',
            type: '电动垂直起降飞行器',
            capacity: '1名飞行员 + 4名乘客',
            range: '150英里',
            maxSpeed: '200mph',
            certification: '进行中'
          }
        ]
      },
      {
        name: 'EHang',
        description: '亿航（EHang）是全球领先的自动驾驶飞行器技术公司之一，致力于打造安全、自主、环保的空中交通系统。',
        location: '中国广州',
        status: '商业化阶段',
        foundedYear: 2014,
        employeeCount: '500+',
        website: 'https://www.ehang.com',
        products: [
          {
            name: 'EH216',
            type: '自动驾驶飞行器',
            capacity: '2名乘客',
            range: '35公里',
            maxSpeed: '130km/h',
            certification: '已获得中国适航证'
          }
        ]
      },
      {
        name: 'Lilium',
        description: 'Lilium 是一家德国航空公司，专注于开发创新的电动垂直起降喷气式飞机，旨在革新区域航空出行。',
        location: '德国慕尼黑',
        status: '开发阶段',
        foundedYear: 2015,
        employeeCount: '750+',
        website: 'https://www.lilium.com',
        products: [
          {
            name: 'Lilium Jet',
            type: '电动垂直起降喷气式飞机',
            capacity: '1名飞行员 + 6名乘客',
            range: '250公里',
            maxSpeed: '280km/h',
            certification: '进行中'
          }
        ]
      }
    ];
    
    await Company.insertMany(companies);
    console.log('数据库初始化成功！');
    process.exit(0);
  } catch (error) {
    console.error('数据库初始化失败：', error);
    process.exit(1);
  }
}

seed(); 