import { Schema, model, models } from 'mongoose';

// 产品规格接口
interface ISpecification {
  name: string;
  value: string;
}

// 认证信息接口
interface ICertification {
  name: string;
  status: '未开始' | '进行中' | '已获得';
  description: string;
  updatedAt: Date;
}

// 新闻接口
interface INews {
  id: string;
  title: string;
  summary: string;
  url: string;
  date: string;
}

// 产品接口
interface IProduct {
  name: string;
  description: string;
  specifications: {
    range: string;
    speed: string;
    capacity: string;
    noise: string;
    battery: string;
    [key: string]: string;
  };
}

// 公司接口
interface ICompany {
  name: string;
  description: string;
  location: string;
  status: string;
  foundedYear: number;
  employeeCount: string;
  website: string;
  specifications: ISpecification[];
  certifications: ICertification[];
  products: IProduct[];
  news: INews[];
  createdAt: Date;
  updatedAt: Date;
}

const CompanySchema = new Schema<ICompany>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: String, required: true },
  foundedYear: { type: Number },
  employeeCount: { type: String },
  website: { type: String },
  specifications: [{
    name: { type: String, required: true },
    value: { type: String, required: true }
  }],
  certifications: [{
    name: { type: String, required: true },
    status: { 
      type: String, 
      enum: ['未开始', '进行中', '已获得'],
      required: true 
    },
    description: { type: String },
    updatedAt: { type: Date, default: Date.now }
  }],
  products: [{
    name: { type: String, required: true },
    description: { type: String },
    specifications: {
      range: String,
      speed: String,
      capacity: String,
      noise: String,
      battery: String
    }
  }],
  news: [{
    id: { type: String, required: true },
    title: { type: String, required: true },
    summary: { type: String },
    url: { type: String, required: true },
    date: { type: String, required: true }
  }]
}, {
  timestamps: true
});

// 添加索引以优化搜索性能
CompanySchema.index({ name: 'text', description: 'text', 'products.name': 'text' });

export default models.Company || model<ICompany>('Company', CompanySchema); 