import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Comment from '@/models/Comment';
import { authOptions } from '@/app/api/auth/auth.config';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: '未授权访问' },
        { status: 401 }
      );
    }

    await connectDB();

    const comment = await Comment.findById(params.id);
    if (!comment) {
      return NextResponse.json(
        { error: '评论不存在' },
        { status: 404 }
      );
    }

    // 检查用户是否已经点赞
    const userEmail = session.user.email;
    const likedIndex = comment.likes.indexOf(userEmail);

    if (likedIndex === -1) {
      // 如果用户未点赞，添加点赞
      comment.likes.push(userEmail);
    } else {
      // 如果用户已点赞，取消点赞
      comment.likes.splice(likedIndex, 1);
    }

    await comment.save();

    return NextResponse.json(comment);
  } catch (error: any) {
    console.error('点赞操作失败:', error);
    return NextResponse.json(
      { error: '点赞操作失败' },
      { status: 500 }
    );
  }
} 