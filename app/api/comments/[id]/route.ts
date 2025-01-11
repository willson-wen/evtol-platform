import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectDB } from '@/lib/mongodb';
import Comment from '@/models/Comment';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await connectDB();

    const comment = await Comment.findById(params.id);
    if (!comment) {
      return new NextResponse('Comment not found', { status: 404 });
    }

    // 检查是否是评论作者
    if (comment.author.toString() !== session.user.id) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    await Comment.findByIdAndDelete(params.id);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Delete comment error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 