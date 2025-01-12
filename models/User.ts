import mongoose, { Schema, model, models } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password: string;
  resetToken?: string;
  resetTokenExpiry?: number;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, '请输入用户名'],
      minlength: [2, '用户名至少2个字符'],
      maxlength: [50, '用户名最多50个字符'],
    },
    email: {
      type: String,
      required: [true, '请输入邮箱地址'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, '请输入有效的邮箱地址'],
    },
    password: {
      type: String,
      required: [true, '请输入密码'],
      minlength: [6, '密码至少6个字符'],
    },
    resetToken: String,
    resetTokenExpiry: Number,
  },
  {
    timestamps: true,
  }
);

// 只为 resetToken 创建索引
userSchema.index({ resetToken: 1 });

export default models.User || model<IUser>('User', userSchema); 