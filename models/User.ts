import mongoose, { Schema, model, models } from 'mongoose';

// 用户模型定义
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, '请输入用户名'],
  },
  email: {
    type: String,
    required: [true, '请输入邮箱'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, '请输入密码'],
    minlength: [6, '密码至少6个字符'],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  avatar: {
    type: String,
    default: '',
  },
  company: {
    type: String,
    default: '',
  },
  position: {
    type: String,
    default: '',
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
userSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// 如果模型已存在则使用已有模型，否则创建新模型
const User = models.User || model('User', userSchema);
export default User; 