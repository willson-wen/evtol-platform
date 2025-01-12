import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import mongoose from 'mongoose';

export async function GET() {
  try {
    await connectDB();
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('数据库连接未初始化');
    }
    
    // 简单的测试查询
    const test = await db.command({ ping: 1 });
    
    return NextResponse.json({ 
      message: "数据库连接成功！",
      test 
    });
  } catch (error) {
    console.error('数据库连接错误:', error);
    return NextResponse.json({ 
      error: "数据库连接失败" 
    }, { status: 500 });
  }
} 