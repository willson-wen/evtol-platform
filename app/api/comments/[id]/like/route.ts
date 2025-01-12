import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectDB } from '@/lib/mongodb';
import Comment from '@/models/Comment';
import { authOptions } from '@/app/api/auth/auth.config';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    return NextResponse.json(
      { error: '请先登录' },
      { status: 401 }
    );
  }

  try {
    await connectDB();
    const comment = await Comment.findById(params.id);

    if (!comment) {
      return NextResponse.json(
        { error: '评论不存在' },
        { status: 404 }
      );
    }

    const userId = session.user.id;
    const likedIndex = comment.likedBy.indexOf(userId);

    if (likedIndex === -1) {
      // 添加点赞
      comment.likes += 1;
      comment.likedBy.push(userId);
    } else {
      // 取消点赞
      comment.likes -= 1;
      comment.likedBy.splice(likedIndex, 1);
    }

    await comment.save();

    return NextResponse.json({
      likes: comment.likes,
      isLiked: likedIndex === -1
    });
  } catch (error) {
    console.error('Like comment error:', error);
    return NextResponse.json(
      { error: '操作失败' },
      { status: 500 }
    );
  }
} 