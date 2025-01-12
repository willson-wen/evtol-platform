import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('请在环境变量中设置 MONGODB_URI');
}

const uri = process.env.MONGODB_URI;
let isConnected = false;

export async function connectDB() {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(uri);
    isConnected = true;
    console.log('MongoDB 连接成功');
  } catch (error) {
    console.error('MongoDB 连接失败:', error);
    throw error;
  }
} 