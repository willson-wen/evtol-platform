import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    // 验证输入
    if (!name) {
      return NextResponse.json(
        { message: '请输入用户名' },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { message: '请输入邮箱地址' },
        { status: 400 }
      );
    }

    if (!password) {
      return NextResponse.json(
        { message: '请输入密码' },
        { status: 400 }
      );
    }

    // 连接数据库
    await connectDB();

    // 检查邮箱是否已被注册
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: '该邮箱已被注册' },
        { status: 400 }
      );
    }

    // 检查用户名是否已被使用
    const existingName = await User.findOne({ name });
    if (existingName) {
      return NextResponse.json(
        { message: '该用户名已被使用' },
        { status: 400 }
      );
    }

    // 密码加密
    const hashedPassword = await hash(password, 12);

    // 创建新用户
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // 返回成功响应
    return NextResponse.json(
      {
        message: '注册成功',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('注册失败:', error);
    return NextResponse.json(
      { message: error.message || '注册过程中发生错误' },
      { status: 500 }
    );
  }
} 