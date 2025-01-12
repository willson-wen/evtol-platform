import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/auth.config';
import Application from '@/models/Application';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: '请先登录' },
        { status: 401 }
      );
    }

    const { jobId } = await request.json();
    if (!jobId) {
      return NextResponse.json(
        { error: '职位ID不能为空' },
        { status: 400 }
      );
    }

    await connectDB();

    // 检查是否已经申请过
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: session.user.id,
    });

    if (existingApplication) {
      return NextResponse.json(
        { error: '您已经申请过这个职位了' },
        { status: 400 }
      );
    }

    // 创建新申请
    const application = await Application.create({
      job: jobId,
      applicant: session.user.id,
      status: 'pending',
    });

    return NextResponse.json({
      message: '申请成功',
      application: {
        id: application._id,
        status: application.status,
      }
    });
  } catch (error: any) {
    console.error('申请职位失败:', error);
    return NextResponse.json(
      { error: '申请失败，请稍后重试' },
      { status: 500 }
    );
  }
} 