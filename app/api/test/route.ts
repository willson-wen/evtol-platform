import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("evtol_db");
    
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