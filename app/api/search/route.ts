import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Company from '@/models/Company';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const type = searchParams.get('type') || 'all';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    await connectDB();

    let searchQuery: any = {};
    if (query) {
      const searchRegex = new RegExp(query, 'i');
      if (type === 'company') {
        searchQuery = {
          $or: [
            { name: searchRegex },
            { description: searchRegex },
            { location: searchRegex }
          ]
        };
      } else if (type === 'product') {
        searchQuery = {
          'products.name': searchRegex
        };
      } else {
        searchQuery = {
          $or: [
            { name: searchRegex },
            { description: searchRegex },
            { location: searchRegex },
            { 'products.name': searchRegex },
            { 'products.description': searchRegex }
          ]
        };
      }
    }

    const skip = (page - 1) * limit;
    
    const [results, total] = await Promise.all([
      Company.find(searchQuery)
        .select('name description logo location status')
        .skip(skip)
        .limit(limit)
        .lean(),
      Company.countDocuments(searchQuery)
    ]);

    return NextResponse.json({
      results,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('搜索失败:', error);
    return NextResponse.json(
      { error: '搜索失败' },
      { status: 500 }
    );
  }
} 