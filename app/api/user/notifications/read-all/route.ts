import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/auth.config';
import { connectDB } from '@/lib/mongodb';
import Notification from '@/models/Notification';

// 标记所有通知为已读
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: '未登录' }, { status: 401 });
    }

    await connectDB();

    // 更新所有未读通知
    await Notification.updateMany(
      {
        recipient: session.user.id,
        isRead: false
      },
      {
        $set: { isRead: true }
      }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('标记通知失败:', error);
    return NextResponse.json(
      { error: '标记通知失败' },
      { status: 500 }
    );
  }
} 