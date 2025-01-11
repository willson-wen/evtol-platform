import { connectDB } from './mongodb';
import User from '../models/User';
import Company from '../models/Company';
import Job from '../models/Job';
import Post from '../models/Post';

// 通用的 CRUD 操作
export const dbOperations = {
  // 创建文档
  create: async (model: any, data: any) => {
    await connectDB();
    return await model.create(data);
  },

  // 查找单个文档
  findById: async (model: any, id: string) => {
    await connectDB();
    return await model.findById(id);
  },

  // 查找多个文档
  find: async (model: any, query = {}, options = {}) => {
    await connectDB();
    return await model.find(query, null, options);
  },

  // 更新文档
  update: async (model: any, id: string, data: any) => {
    await connectDB();
    return await model.findByIdAndUpdate(id, data, { new: true });
  },

  // 删除文档
  delete: async (model: any, id: string) => {
    await connectDB();
    return await model.findByIdAndDelete(id);
  },

  // 分页查询
  paginate: async (model: any, query = {}, page = 1, limit = 10) => {
    await connectDB();
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      model.find(query).skip(skip).limit(limit),
      model.countDocuments(query),
    ]);
    return {
      data,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  },
};

// 用户相关操作
export const userOperations = {
  // 通过邮箱查找用户
  findByEmail: async (email: string) => {
    await connectDB();
    return await User.findOne({ email });
  },
};

// 公司相关操作
export const companyOperations = {
  // 搜索公司
  search: async (keyword: string, page = 1, limit = 10) => {
    await connectDB();
    const query = {
      $or: [
        { name: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
      ],
    };
    return await dbOperations.paginate(Company, query, page, limit);
  },
};

// 职位相关操作
export const jobOperations = {
  // 获取最新职位
  getLatest: async (limit = 10) => {
    await connectDB();
    return await Job.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('company', 'name logo');
  },
};

// 文章相关操作
export const postOperations = {
  // 增加浏览量
  incrementViews: async (id: string) => {
    await connectDB();
    return await Post.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true });
  },

  // 获取热门文章
  getPopular: async (limit = 5) => {
    await connectDB();
    return await Post.find({ status: '已发布' })
      .sort({ views: -1 })
      .limit(limit)
      .populate('author', 'name avatar');
  },
}; 