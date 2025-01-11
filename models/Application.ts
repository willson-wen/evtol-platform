import mongoose, { Schema, model, models } from 'mongoose';

const applicationSchema = new Schema({
  job: {
    type: Schema.Types.ObjectId,
    ref: 'Job',
    required: [true, '职位ID是必填项'],
  },
  applicant: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, '申请人ID是必填项'],
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
  resume: {
    type: String,
    required: false,
  },
  coverLetter: {
    type: String,
    required: false,
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
applicationSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Application = models.Application || model('Application', applicationSchema);

export default Application; 