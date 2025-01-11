import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

// 创建邮件传输对象
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // 验证邮箱
    if (!email) {
      return NextResponse.json(
        { error: '请输入邮箱地址' },
        { status: 400 }
      );
    }

    // 连接数据库
    await connectDB();

    // 查找用户
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: '该邮箱未注册' },
        { status: 404 }
      );
    }

    // 生成重置令牌
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1小时后过期

    // 更新用户的重置令牌
    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    // 构建重置链接
    const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}`;

    // 发送重置邮件
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: '重置密码',
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1a365d; margin-bottom: 20px;">重置您的密码</h2>
          <p style="color: #4a5568; margin-bottom: 20px;">
            您收到此邮件是因为您（或其他人）请求重置您的账户密码。请点击下面的链接重置密码：
          </p>
          <a href="${resetUrl}" style="display: inline-block; background-color: #3182ce; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin-bottom: 20px;">
            重置密码
          </a>
          <p style="color: #4a5568; margin-bottom: 10px;">
            如果您没有请求重置密码，请忽略此邮件。
          </p>
          <p style="color: #718096; font-size: 14px;">
            此链接将在1小时后失效。
          </p>
        </div>
      `,
    });

    return NextResponse.json(
      { message: '重置密码邮件已发送' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('发送重置密码邮件失败:', error);
    return NextResponse.json(
      { error: '发送重置密码邮件失败，请稍后重试' },
      { status: 500 }
    );
  }
} 