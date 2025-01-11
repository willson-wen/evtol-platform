import mongoose, { Schema, model, models } from 'mongoose';

const companySchema = new Schema({
  name: {
    type: String,
    required: [true, '公司名称是必填项'],
    unique: true
  },
  description: {
    type: String,
    required: [true, '公司描述是必填项']
  },
  location: {
    type: String,
    required: [true, '公司所在地是必填项']
  },
  status: {
    type: String,
    enum: ['研发中', '测试中', '适航认证进行中', '已获认证', '已投产'],
    default: '研发中'
  },
  foundedYear: {
    type: Number
  },
  website: {
    type: String
  },
  products: [{
    name: String,
    description: String,
    specifications: {
      range: String,
      speed: String,
      capacity: String,
      dimensions: String
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// 更新时自动更新updatedAt字段
companySchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Company = models.Company || model('Company', companySchema);

export default Company; 