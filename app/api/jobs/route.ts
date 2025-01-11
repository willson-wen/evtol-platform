import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Job from '@/models/Job';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const location = searchParams.get('location');

    await connectDB();

    // 构建查询条件
    const query: any = { status: 'open' };
    if (type) query.type = type;
    if (location) query.location = { $regex: location, $options: 'i' };

    // 获取职位列表
    const jobs = await Job.find(query)
      .sort({ createdAt: -1 })
      .select('title company location type salary description status createdAt');

    return NextResponse.json(jobs);
  } catch (error: any) {
    console.error('获取职位列表失败:', error);
    return NextResponse.json(
      { error: '获取职位列表失败' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { title, company, location, type, salary, description, requirements, contact, postedBy } = data;

    // 验证必填字段
    if (!title || !company || !location || !type || !salary || !description || !postedBy) {
      return NextResponse.json(
        { error: '请填写所有必填字段' },
        { status: 400 }
      );
    }

    await connectDB();

    // 创建新职位
    const job = await Job.create({
      title,
      company,
      location,
      type,
      salary,
      description,
      requirements: requirements || [],
      contact: contact || {},
      postedBy,
      status: 'open',
    });

    return NextResponse.json({
      message: '职位发布成功',
      job: {
        id: job._id,
        title: job.title,
        company: job.company,
      }
    });
  } catch (error: any) {
    console.error('发布职位失败:', error);
    return NextResponse.json(
      { error: '发布职位失败，请稍后重试' },
      { status: 500 }
    );
  }
} 