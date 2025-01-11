import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Company from '@/models/Company';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json(
        { error: '搜索关键词不能为空' },
        { status: 400 }
      );
    }

    await connectDB();

    // 创建搜索正则表达式，不区分大小写
    const searchRegex = new RegExp(query, 'i');

    // 在公司名称、描述和产品中搜索
    const companies = await Company.find({
      $or: [
        { name: searchRegex },
        { description: searchRegex },
        { 'products.name': searchRegex },
        { 'products.description': searchRegex }
      ]
    }).select('name description location status');

    return NextResponse.json(companies);
  } catch (error: any) {
    console.error('搜索失败:', error);
    return NextResponse.json(
      { error: '搜索失败' },
      { status: 500 }
    );
  }
} 