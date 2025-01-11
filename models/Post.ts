import { Schema, model, models } from 'mongoose';

// 评论模型定义
const commentSchema = new Schema({
  content: {
    type: String,
    required: [true, '请输入评论内容'],
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// 文章/帖子模型定义
const postSchema = new Schema({
  title: {
    type: String,
    required: [true, '请输入标题'],
  },
  content: {
    type: String,
    required: [true, '请输入内容'],
  },
  type: {
    type: String,
    enum: ['白皮书', '新闻', '研究报告', '讨论'],
    required: [true, '请选择文章类型'],
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
  },
  tags: [String],
  coverImage: String,
  attachments: [{
    name: String,
    url: String,
  }],
  views: {
    type: Number,
    default: 0,
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  comments: [commentSchema],
  status: {
    type: String,
    enum: ['草稿', '已发布', '已删除'],
    default: '已发布',
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
postSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// 如果模型已存在则使用已有模型，否则创建新模型
const Post = models.Post || model('Post', postSchema);
export default Post; 