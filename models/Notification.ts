import mongoose, { Schema, model, models } from 'mongoose';

const notificationSchema = new Schema({
  recipient: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['comment_reply', 'comment_like', 'follow', 'system'],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  relatedId: {
    type: String,
    required: true,
  },
  relatedType: {
    type: String,
    enum: ['comment', 'news', 'company'],
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// 创建索引以提高查询性能
notificationSchema.index({ recipient: 1, createdAt: -1 });
notificationSchema.index({ recipient: 1, isRead: 1 });

const Notification = models.Notification || model('Notification', notificationSchema);

export default Notification; 