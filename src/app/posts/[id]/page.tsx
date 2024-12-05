'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { deletePost, fetchPosts, toggleLike } from '../../../apis/postService';
import {
  fetchCommentsByPost,
  createComment,
  deleteComment,
} from '../../../apis/commentService';
import React from 'react';

const PostDetailPage = ({ params }: { params: { id: string } }) => {
  const [post, setPost] = useState<any | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [commentContent, setCommentContent] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 여부 확인
  const [isLiked, setIsLiked] = useState(false); // 좋아요 상태
  const router = useRouter();
  const postId = params.id;

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLoggedIn(true);
    } else {
      router.push('/'); // 로그인되지 않으면 로그인 페이지로 리다이렉션
    }
  }, [router]);

  useEffect(() => {
    const getPostAndComments = async () => {
      try {
        const post = await fetchPosts();
        const fetchedPost = post.find((p) => p.id === parseInt(postId));
        setPost(fetchedPost);

        const comments = await fetchCommentsByPost(parseInt(postId));
        setComments(comments);

        // 좋아요 상태 초기화
        const likedPost = fetchedPost.likes?.some(
          (like: any) =>
            like.userId === parseInt(localStorage.getItem('userId')!)
        );
        setIsLiked(likedPost || false);
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
      console.error('Error creating comment:', error);
      alert('댓글 작성 중 문제가 발생했습니다. 다시 시도해주세요.');
    }
  };

  // 댓글 삭제 처리
  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteComment(commentId); // 댓글 삭제 API 호출
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('댓글 삭제 중 문제가 발생했습니다. 다시 시도해주세요.');
    }
  };

  // 게시글 삭제 처리
  const handleDeletePost = async () => {
    try {
      await deletePost(parseInt(postId));
      alert('게시글이 삭제되었습니다.');
      router.push('/posts'); // 게시글 삭제 후 홈으로 리다이렉션
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('게시글 삭제 중 문제가 발생했습니다. 다시 시도해주세요.');
    }
  };

  // 좋아요 토글 처리
  const handleLike = async () => {
    try {
      const response = await toggleLike(parseInt(postId));
      setIsLiked(response.message === 'Like added');
    } catch (error) {
      console.error('Error toggling like:', error);
      alert('좋아요 처리 중 문제가 발생했습니다. 다시 시도해주세요.');
    }
  };

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4 sm:p-6 md:p-10 bg-gray-50 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md">
        {isLoggedIn && (
          <div className="flex justify-end mb-4">
            <button
              onClick={handleDeletePost}
              className="text-red-500 hover:text-red-700"
            >
              삭제
            </button>
          </div>
        )}
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4">
          {post.title}
        </h1>
        <p className="text-lg mb-6">{post.content}</p>

        {/* 좋아요 버튼 */}
        <div className="flex justify-center mb-6">
          <button
            onClick={handleLike}
            className={`text-xl font-semibold ${
              isLiked ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            {isLiked ? '♥' : '♡'}
          </button>
        </div>

        <h2 className="text-xl font-bold mb-4">댓글</h2>
        <ul>
          {comments.map((comment) => (
            <li key={comment.id} className="mb-2 p-2 bg-gray-100 rounded">
              <div className="flex justify-between items-center">
                <div>{comment.content}</div>
                {isLoggedIn && (
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    X
                  </button>
                )}
              </div>
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
