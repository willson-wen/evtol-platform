import mongoose, { Schema, model, models } from 'mongoose';

const researchSchema = new Schema({
  title: {
    type: String,
    required: [true, '标题是必填项'],
  },
  author: {
    type: String,
    required: [true, '作者是必填项'],
  },
  abstract: {
    type: String,
    required: [true, '摘要是必填项'],
  },
  content: {
    type: String,
    required: [true, '内容是必填项'],
  },
  type: {
    type: String,
    enum: ['whitepaper', 'report'],
    required: [true, '类型是必填项'],
  },
  tags: [{
    type: String,
  }],
  downloadUrl: {
    type: String,
  },
  publishDate: {
    type: Date,
    default: Date.now,
  },
  views: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft',
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// 更新时自动更新updatedAt字段
researchSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Research = models.Research || model('Research', researchSchema);

export default Research; 