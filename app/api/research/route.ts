import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/auth.config';
import Research from '@/models/Research';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    await connectDB();

    // 构建查询条件
    const query: any = { status: 'published' };
    if (type && type !== 'all') {
      query.type = type;
    }

    // 获取研究报告列表
    const reports = await Research.find(query)
      .sort({ publishDate: -1 })
      .select('title author abstract type tags downloadUrl publishDate views');

    return NextResponse.json(reports);
  } catch (error: any) {
    console.error('获取研究报告列表失败:', error);
    return NextResponse.json(
      { error: '获取研究报告列表失败' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: '无权限发布研究报告' },
        { status: 401 }
      );
    }

    const data = await request.json();
    const { title, author, abstract, content, type, tags } = data;

    // 验证必填字段
    if (!title || !author || !abstract || !content || !type) {
      return NextResponse.json(
        { error: '请填写所有必填字段' },
        { status: 400 }
      );
    }

    await connectDB();

    // 创建新研究报告
    const report = await Research.create({
      title,
      author,
      abstract,
      content,
      type,
      tags: tags || [],
      status: 'published',
      createdBy: session.user.id,
    });

    return NextResponse.json({
      message: '研究报告发布成功',
      report: {
        id: report._id,
        title: report.title,
      }
    });
  } catch (error: any) {
    console.error('发布研究报告失败:', error);
    return NextResponse.json(
      { error: '发布失败，请稍后重试' },
      { status: 500 }
    );
  }
} 