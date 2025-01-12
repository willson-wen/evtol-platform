import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/auth.config';
import { connectDB } from '@/lib/mongodb';
import Notification from '@/models/Notification';

// 添加导出配置来启用动态功能
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// 获取用户通知列表
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: '未登录' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    await connectDB();

    // 获取总数
    const total = await Notification.countDocuments({
      recipient: session.user.id
    });

    // 获取通知列表
    const notifications = await Notification.find({ recipient: session.user.id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('sender', 'name image')
      .lean();

    return NextResponse.json({
      notifications,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('获取通知失败:', error);
    return NextResponse.json(
      { error: '获取通知失败' },
      { status: 500 }
    );
  }
} 