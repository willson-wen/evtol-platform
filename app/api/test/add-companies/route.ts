import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Company from '@/models/Company';

const sampleCompanies = [
  {
    name: 'Joby Aviation',
    description: 'Joby Aviation是一家领先的eVTOL飞行器制造商，专注于开发电动垂直起降飞行器用于城市空中交通。',
    location: '美国加利福尼亚',
    status: '测试中',
    foundedYear: 2009,
    website: 'https://www.jobyaviation.com',
    products: [
      {
        name: 'Joby S4',
        description: '一款五座电动垂直起降飞行器，专为城市空中交通设计。',
        specifications: {
          range: '150英里',
          speed: '200mph',
          capacity: '4名乘客 + 1名飞行员',
          dimensions: '长8米，宽10米，高2.5米'
        }
      }
    ]
  },
  {
    name: 'EHang',
    description: 'EHang是全球领先的自动驾驶飞行器解决方案提供商，致力于打造安全、自主、环保的空中交通系统。',
    location: '中国广州',
    status: '已认证',
    foundedYear: 2014,
    website: 'https://www.ehang.com',
    products: [
      {
        name: 'EH216',
        description: '双座自动驾驶电动垂直起降飞行器，适用于空中游览和城市短途运输。',
        specifications: {
          range: '35公里',
          speed: '130km/h',
          capacity: '2名乘客',
          dimensions: '长5.6米，宽5.6米，高1.8米'
        }
      }
    ]
  },
  {
    name: 'Lilium',
    description: 'Lilium是一家德国航空公司，专注于开发创新的电动垂直起降喷气式飞机，旨在革新区域航空出行。',
    location: '德国慕尼黑',
    status: '研发中',
    foundedYear: 2015,
    website: 'https://www.lilium.com',
    products: [
      {
        name: 'Lilium Jet',
        description: '7座电动垂直起降喷气式飞机，采用36个电动喷气发动机提供动力。',
        specifications: {
          range: '250公里',
          speed: '280km/h',
          capacity: '6名乘客 + 1名飞行员',
          dimensions: '长8.5米，宽14米，高2.2米'
        }
      }
    ]
  }
];

export async function GET() {
  try {
    await connectDB();

    // 清除现有数据
    await Company.deleteMany({});

    // 添加示例数据
    await Company.insertMany(sampleCompanies);

    return NextResponse.json({ message: '示例数据添加成功' });
  } catch (error: any) {
    console.error('添加示例数据失败:', error);
    return NextResponse.json(
      { error: '添加示例数据失败' },
      { status: 500 }
    );
  }
} 