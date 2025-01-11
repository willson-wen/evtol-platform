'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

type Comment = {
  _id: string;
  content: string;
  newsId: string;
  newsTitle: string;
  createdAt: string;
  likes: number;
  replyCount: number;
};

type Pagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export default function UserComments() {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0
  });
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // 获取用户评论列表
  const fetchComments = async (page: number = 1, append: boolean = false) => {
    try {
      const response = await fetch(
        `/api/user/comments?page=${page}&limit=${pagination.limit}`
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
  }, []);

  // 加载更多评论
  const handleLoadMore = async () => {
    if (isLoadingMore || pagination.page >= pagination.totalPages) return;
    
    setIsLoadingMore(true);
    await fetchComments(pagination.page + 1, true);
  };

  // 删除评论
  const handleDelete = async (commentId: string) => {
    if (!confirm('确定要删除这条评论吗？')) return;

    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('删除评论失败');
      
      setComments(prev => prev.filter(comment => comment._id !== commentId));
      setPagination(prev => ({
        ...prev,
        total: prev.total - 1
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : '删除评论失败');
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">加载评论中...</div>;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        {error}
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        还没有发表过评论
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <div
          key={comment._id}
          className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div>
              <Link
                href={`/news/${comment.newsId}`}
                className="text-lg font-medium text-gray-900 hover:text-blue-600"
              >
                {comment.newsTitle}
              </Link>
              <div 
                className="mt-2 text-gray-600 prose prose-sm"
                dangerouslySetInnerHTML={{ __html: comment.content }}
              />
              <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
                <span>{new Date(comment.createdAt).toLocaleString()}</span>
                <span>•</span>
                <span>{comment.likes} 赞</span>
                <span>•</span>
                <span>{comment.replyCount} 回复</span>
              </div>
            </div>
            <button
              onClick={() => handleDelete(comment._id)}
              className="text-red-600 hover:text-red-700 text-sm"
            >
              删除
            </button>
          </div>
        </div>
      ))}

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
    </div>
  );
} 