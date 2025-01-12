import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/auth.config';
import { connectDB } from '@/lib/mongodb';
import Notification from '@/models/Notification';

// 标记单个通知为已读
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: '未登录' }, { status: 401 });
    }

    await connectDB();

    const notification = await Notification.findOne({
      _id: params.id,
      recipient: session.user.id
    });

    if (!notification) {
      return NextResponse.json(
        { error: '通知不存在' },
        { status: 404 }
      );
    }

    notification.isRead = true;
    await notification.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('标记通知失败:', error);
    return NextResponse.json(
      { error: '标记通知失败' },
      { status: 500 }
    );
  }
} 