import mongoose, { Schema, model, models } from 'mongoose';

const jobSchema = new Schema({
  title: {
    type: String,
    required: [true, '职位名称是必填项'],
  },
  company: {
    type: String,
    required: [true, '公司名称是必填项'],
  },
  location: {
    type: String,
    required: [true, '工作地点是必填项'],
  },
  type: {
    type: String,
    enum: ['全职', '兼职', '实习'],
    default: '全职',
  },
  salary: {
    type: String,
    required: [true, '薪资范围是必填项'],
  },
  description: {
    type: String,
    required: [true, '职位描述是必填项'],
  },
  requirements: [{
    type: String,
  }],
  contact: {
    name: String,
    email: String,
    phone: String,
  },
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['open', 'closed'],
    default: 'open',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// 更新时自动更新updatedAt字段
jobSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Job = models.Job || model('Job', jobSchema);

export default Job; 