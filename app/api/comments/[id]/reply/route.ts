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
    const { content } = await request.json();

    if (!content) {
      return NextResponse.json(
        { error: '回复内容不能为空' },
        { status: 400 }
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

    const reply = {
      content,
      author: session.user.id,
      likes: 0,
      likedBy: [],
      createdAt: new Date()
    };

    comment.replies.push(reply);
    await comment.save();

    // 填充作者信息
    const populatedComment = await Comment.findById(params.id)
      .populate('author', 'name image')
      .populate('replies.author', 'name image');

    return NextResponse.json(populatedComment);
  } catch (error) {
    console.error('添加回复失败:', error);
    return NextResponse.json(
      { error: '添加回复失败' },
      { status: 500 }
    );
  }
}

// 获取评论的回复列表
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const comment = await Comment.findById(params.id)
      .populate('replies.author', 'name image')
      .select('replies');

    if (!comment) {
      return NextResponse.json(
        { error: '评论不存在' },
        { status: 404 }
      );
    }

    return NextResponse.json(comment.replies);
  } catch (error) {
    console.error('获取回复失败:', error);
    return NextResponse.json(
      { error: '获取回复失败' },
      { status: 500 }
    );
  }
} 