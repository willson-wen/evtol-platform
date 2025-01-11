import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Job from '@/models/Job';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const job = await Job.findById(params.id);
    if (!job) {
      return NextResponse.json(
        { error: '未找到该职位' },
        { status: 404 }
      );
    }

    return NextResponse.json(job);
  } catch (error: any) {
    console.error('获取职位详情失败:', error);
    return NextResponse.json(
      { error: '获取职位详情失败' },
      { status: 500 }
    );
  }
} 