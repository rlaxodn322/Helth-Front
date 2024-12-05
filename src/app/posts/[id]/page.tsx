// pages/posts/[id].tsx
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchPosts } from '../../../apis/postService';
import {
  fetchCommentsByPost,
  createComment,
} from '../../../apis/commentService';
import React from 'react';

const PostDetailPage = ({ params }: { params: { id: string } }) => {
  const [post, setPost] = useState<any | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [commentContent, setCommentContent] = useState('');
  const router = useRouter();
  const postId = params.id;

  useEffect(() => {
    const getPostAndComments = async () => {
      try {
        const post = await fetchPosts();
        setPost(post.find((p) => p.id === parseInt(postId)));

        const comments = await fetchCommentsByPost(parseInt(postId));
        setComments(comments);
      } catch (error) {
        console.error('Error fetching post or comments:', error);
      }
    };

    getPostAndComments();
  }, [postId]);

  const handleCommentSubmit = async () => {
    if (!commentContent.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }

    try {
      const newComment = await createComment(parseInt(postId), {
        content: commentContent,
        postId: parseInt(postId),
      });
      setComments((prev) => [...prev, newComment]);
      setCommentContent(''); // 댓글 작성 후 입력창 초기화
    } catch (error) {
      console.log(postId);
      console.log(commentContent);
      console.error('Error creating comment:', error);
      alert('댓글 작성 중 문제가 발생했습니다. 다시 시도해주세요.');
    }
  };
  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4 sm:p-6 md:p-10 bg-gray-50 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4">
          {post.title}
        </h1>
        <p className="text-lg mb-6">{post.content}</p>

        <h2 className="text-xl font-bold mb-4">댓글</h2>
        <ul>
          {comments.map((comment) => (
            <li key={comment.id} className="mb-2 p-2 bg-gray-100 rounded">
              {comment.content}
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <textarea
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder="댓글을 입력하세요"
            className="w-full border p-2 rounded mb-2"
          ></textarea>
          <button
            onClick={handleCommentSubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600 transition"
          >
            댓글 작성
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
