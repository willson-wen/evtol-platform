import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    // 验证输入
    if (!token || !password) {
      return NextResponse.json(
        { error: '无效的请求' },
        { status: 400 }
      );
    }

    // 验证密码长度
    if (password.length < 6) {
      return NextResponse.json(
        { error: '密码长度至少为6个字符' },
        { status: 400 }
      );
    }

    // 连接数据库
    await connectDB();

    // 查找用户
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { error: '重置链接无效或已过期' },
        { status: 400 }
      );
    }

    // 加密新密码
    const hashedPassword = await bcrypt.hash(password, 10);

    // 更新用户密码并清除重置令牌
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    return NextResponse.json(
      { message: '密码重置成功' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('重置密码失败:', error);
    return NextResponse.json(
      { error: '重置密码失败，请稍后重试' },
      { status: 500 }
    );
  }
} 