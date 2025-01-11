'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import RichTextEditor from './RichTextEditor';

type Reply = {
  _id: string;
  content: string;
  author: {
    _id: string;
    name: string;
    image?: string;
  };
  createdAt: string;
  likes: number;
  isLiked?: boolean;
};

type Comment = {
  _id: string;
  content: string;
  author: {
    _id: string;
    name: string;
    image?: string;
  };
  createdAt: string;
  likes: number;
  isLiked?: boolean;
  replies: Reply[];
  replyCount: number;
};

type CommentSectionProps = {
  newsId: number;
};

type Pagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export default function CommentSection({ newsId }: CommentSectionProps) {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0
  });
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // 获取评论列表
  const fetchComments = async (page: number = 1, append: boolean = false) => {
    try {
      const response = await fetch(
        `/api/comments?newsId=${newsId}&page=${page}&limit=${pagination.limit}`
      );
      if (!response.ok) throw new Error('获取评论失败');
      const data = await response.json();
      
      if (append) {
        setComments(prev => [...prev, ...data.comments]);
      } else {
        setComments(data.comments);
      }
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : '获取评论失败');
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  // 初始加载
  useEffect(() => {
    fetchComments();
  }, [newsId]);

  // 加载更多评论
  const handleLoadMore = async () => {
    if (isLoadingMore || pagination.page >= pagination.totalPages) return;
    
    setIsLoadingMore(true);
    await fetchComments(pagination.page + 1, true);
  };

  // 提交评论
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      window.location.href = '/auth/signin';
      return;
    }

    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newComment,
          newsId,
        }),
      });

      if (!response.ok) throw new Error('发表评论失败');
      
      const comment = await response.json();
      setComments(prev => [comment, ...prev]);
      setNewComment('');
    } catch (err) {
      setError(err instanceof Error ? err.message : '发表评论失败');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 提交回复
  const handleSubmitReply = async (commentId: string) => {
    if (!session) {
      window.location.href = '/auth/signin';
      return;
    }

    if (!replyContent.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/comments/${commentId}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: replyContent,
        }),
      });

      if (!response.ok) throw new Error('发表回复失败');
      
      const updatedComment = await response.json();
      setComments(prev =>
        prev.map(comment =>
          comment._id === commentId ? updatedComment : comment
        )
      );
      setReplyContent('');
      setReplyingTo(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : '发表回复失败');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 处理点赞
  const handleLikeComment = async (commentId: string) => {
    if (!session) {
      window.location.href = '/auth/signin';
      return;
    }

    try {
      const response = await fetch(`/api/comments/${commentId}/like`, {
        method: 'POST',
      });

      if (!response.ok) throw new Error('处理点赞失败');
      
      const { likes, isLiked } = await response.json();
      
      setComments(prev =>
        prev.map(comment =>
          comment._id === commentId
            ? { ...comment, likes, isLiked }
            : comment
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : '处理点赞失败');
    }
  };

  if (isLoading) {
    return <div className="mt-12 text-center">加载评论中...</div>;
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold text-gray-900 mb-8">
        评论区 ({pagination.total})
      </h2>

      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      {/* 评论输入框 */}
      <div className="mb-8">
        <form onSubmit={handleSubmitComment}>
          <div className="mb-4">
            <RichTextEditor
              content={newComment}
              onChange={setNewComment}
              placeholder={session ? "发表你的看法..." : "登录后发表评论"}
              disabled={!session || isSubmitting}
            />
          </div>
          <div className="flex justify-end">
            {session ? (
              <button
                type="submit"
                disabled={isSubmitting || !newComment.trim()}
                className={`px-6 py-2 rounded-lg text-white font-medium ${
                  isSubmitting || !newComment.trim()
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isSubmitting ? '发送中...' : '发表评论'}
              </button>
            ) : (
              <Link
                href="/auth/signin"
                className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700"
              >
                登录发表评论
              </Link>
            )}
          </div>
        </form>
      </div>

      {/* 评论列表 */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-center text-gray-500">暂无评论，来发表第一条评论吧！</p>
        ) : (
          <>
            {comments.map((comment) => (
              <div key={comment._id} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      {comment.author.image ? (
                        <img
                          src={comment.author.image}
                          alt={comment.author.name}
                          className="w-10 h-10 rounded-full"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 font-medium">
                            {comment.author.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <h3 className="text-sm font-medium text-gray-900">
                          {comment.author.name}
                        </h3>
                        <span className="ml-4 text-sm text-gray-500">
                          {new Date(comment.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <div 
                        className="mt-1 text-gray-600 prose prose-sm"
                        dangerouslySetInnerHTML={{ __html: comment.content }}
                      />
                      <div className="mt-2 flex items-center space-x-4">
                        <button
                          onClick={() => handleLikeComment(comment._id)}
                          className={`flex items-center space-x-1 text-sm ${
                            comment.isLiked
                              ? 'text-blue-600'
                              : 'text-gray-500 hover:text-blue-600'
                          }`}
                        >
                          <svg
                            className="w-4 h-4"
                            fill={comment.isLiked ? 'currentColor' : 'none'}
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                            />
                          </svg>
                          <span>{comment.likes}</span>
                        </button>
                        <button
                          onClick={() => setReplyingTo(comment._id)}
                          className="text-sm text-gray-500 hover:text-blue-600"
                        >
                          回复
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 回复列表 */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-4 ml-14 space-y-4">
                    {comment.replies.map((reply) => (
                      <div key={reply._id} className="flex items-start">
                        <div className="flex-shrink-0">
                          {reply.author.image ? (
                            <img
                              src={reply.author.image}
                              alt={reply.author.name}
                              className="w-8 h-8 rounded-full"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="text-blue-600 font-medium text-sm">
                                {reply.author.name.charAt(0)}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="ml-3">
                          <div className="flex items-center">
                            <h4 className="text-sm font-medium text-gray-900">
                              {reply.author.name}
                            </h4>
                            <span className="ml-3 text-xs text-gray-500">
                              {new Date(reply.createdAt).toLocaleString()}
                            </span>
                          </div>
                          <div 
                            className="mt-1 text-sm text-gray-600 prose prose-sm"
                            dangerouslySetInnerHTML={{ __html: reply.content }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 回复输入框 */}
                {replyingTo === comment._id && (
                  <div className="mt-4 ml-14">
                    <div className="mb-2">
                      <RichTextEditor
                        content={replyContent}
                        onChange={setReplyContent}
                        placeholder="写下你的回复..."
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => setReplyingTo(null)}
                        className="px-4 py-1 text-sm text-gray-600 hover:text-gray-800"
                      >
                        取消
                      </button>
                      <button
                        onClick={() => handleSubmitReply(comment._id)}
                        disabled={isSubmitting || !replyContent.trim()}
                        className={`px-4 py-1 text-sm rounded-lg text-white ${
                          isSubmitting || !replyContent.trim()
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                      >
                        {isSubmitting ? '发送中...' : '发送'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {/* 加载更多按钮 */}
            {pagination.page < pagination.totalPages && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                  className={`px-6 py-2 rounded-lg text-white font-medium ${
                    isLoadingMore
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isLoadingMore ? '加载中...' : '加载更多评论'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
} 