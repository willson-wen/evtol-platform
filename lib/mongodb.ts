import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('请在环境变量中设置 MONGODB_URI');
}

let isConnected = false;

export async function connectDB() {
  if (isConnected) {
    console.log('已连接到 MongoDB');
    return;
  }

  try {
    const db = await mongoose.connect(MONGODB_URI as string);
    isConnected = db.connections[0].readyState === 1;
    console.log('MongoDB 连接成功');
  } catch (error) {
    console.error('MongoDB 连接失败:', error);
    throw error;
  }
}

export async function disconnectDB() {
  if (!isConnected) {
    return;
  }

  try {
    await mongoose.disconnect();
    isConnected = false;
    console.log('MongoDB 断开连接');
  } catch (error) {
    console.error('MongoDB 断开连接失败:', error);
    throw error;
  }
} 