import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectDB } from '@/lib/mongodb';
import Comment from '@/models/Comment';
import { authOptions } from '@/app/api/auth/auth.config';

// 获取评论列表
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const newsId = searchParams.get('newsId');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');

  if (!newsId) {
    return NextResponse.json(
      { error: '新闻ID不能为空' },
      { status: 400 }
    );
  }

  try {
    await connectDB();
    
    // 计算总评论数
    const total = await Comment.countDocuments({ newsId: Number(newsId) });
    
    // 获取分页评论
    const comments = await Comment.find({ newsId: Number(newsId) })
      .populate('author', 'name image')
      .populate('replies.author', 'name image')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return NextResponse.json({
      comments,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('获取评论失败:', error);
    return NextResponse.json(
      { error: '获取评论失败' },
      { status: 500 }
    );
  }
}

// 创建新评论
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    return NextResponse.json(
      { error: '请先登录' },
      { status: 401 }
    );
  }

  try {
    const { content, newsId } = await request.json();

    if (!content || !newsId) {
      return NextResponse.json(
        { error: '评论内容和新闻ID不能为空' },
        { status: 400 }
      );
    }

    await connectDB();
    const comment = await Comment.create({
      content,
      newsId,
      author: session.user.id,
    });

    const populatedComment = await comment.populate('author', 'name image');

    return NextResponse.json(populatedComment);
  } catch (error) {
    console.error('创建评论失败:', error);
    return NextResponse.json(
      { error: '创建评论失败' },
      { status: 500 }
    );
  }
} 