import mongoose, { Schema, model, models } from "mongoose";
import DOMPurify from "isomorphic-dompurify";

// Reply schema definition
const replySchema = new Schema({
  content: {
    type: String,
    required: [true, "回复内容不能为空"],
    maxlength: [10000, "回复内容不能超过10000个字符"],
    set: (content: string) => DOMPurify.sanitize(content)
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  likedBy: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Comment schema definition
const commentSchema = new Schema({
  content: {
    type: String,
    required: [true, "评论内容不能为空"],
    maxlength: [10000, "评论内容不能超过10000个字符"],
    set: (content: string) => DOMPurify.sanitize(content)
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  newsId: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  likedBy: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  replies: [replySchema],
  replyCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update replyCount before saving
commentSchema.pre("save", function(next) {
  if (this.replies) {
    this.replyCount = this.replies.length;
  }
  next();
});

// Update updatedAt timestamp before saving
commentSchema.pre("save", function(next) {
  this.updatedAt = new Date();
  next();
});

const Comment = models.Comment || model("Comment", commentSchema);

export default Comment;
