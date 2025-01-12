import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/auth.config';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const data = await request.json();
    const { name, avatar, bio, company, position } = data;

    await connectDB();

    const user = await User.findById(session.user.id);
    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    // 更新用户信息
    user.name = name;
    user.image = avatar;
    user.bio = bio;
    user.company = company;
    user.position = position;

    await user.save();

    // 返回更新后的用户信息
    return NextResponse.json({
      id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      bio: user.bio,
      company: user.company,
      position: user.position,
    });
  } catch (error) {
    console.error('Update profile error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await connectDB();

    const user = await User.findById(session.user.id);
    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    // 返回用户信息
    return NextResponse.json({
      id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      bio: user.bio,
      company: user.company,
      position: user.position,
    });
  } catch (error) {
    console.error('Get profile error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 