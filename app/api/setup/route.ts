import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { dbOperations } from '@/lib/db';
import User from '@/models/User';

export async function GET() {
  try {
    // 创建测试用户
    const hashedPassword = await hash('test123456', 12);
    
    const user = await dbOperations.create(User, {
      name: '测试用户',
      email: 'test@example.com',
      password: hashedPassword,
      role: 'admin',
    });

    return NextResponse.json({
      message: '测试用户创建成功',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('创建测试用户失败:', error);
    return NextResponse.json(
      { message: '创建测试用户失败' },
      { status: 500 }
    );
  }
} 