import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/auth.config';
import { connectDB } from '@/lib/mongodb';
import Comment from '@/models/Comment';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    await connectDB();

    // 获取总评论数
    const total = await Comment.countDocuments({ author: session.user.id });

    // 获取评论列表
    const comments = await Comment.find({ author: session.user.id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author', 'name image')
      .lean();

    // 处理评论数据
    const formattedComments = comments.map((comment) => ({
      _id: comment._id,
      content: comment.content,
      newsId: comment.newsId,
      newsTitle: comment.newsTitle || '新闻标题',
      createdAt: comment.createdAt,
      likes: comment.likes,
      replyCount: comment.replyCount || 0,
    }));

    return NextResponse.json({
      comments: formattedComments,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get user comments error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 