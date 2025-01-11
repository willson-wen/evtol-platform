import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Research from '@/models/Research';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const report = await Research.findById(params.id);
    if (!report) {
      return NextResponse.json(
        { error: '未找到该研究报告' },
        { status: 404 }
      );
    }

    // 更新浏览次数
    report.views += 1;
    await report.save();

    return NextResponse.json(report);
  } catch (error: any) {
    console.error('获取研究报告详情失败:', error);
    return NextResponse.json(
      { error: '获取研究报告详情失败' },
      { status: 500 }
    );
  }
} 