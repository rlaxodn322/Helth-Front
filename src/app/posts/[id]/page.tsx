'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  deletePost,
  fetchPosts,
  getPostLikes,
  toggleLike,
  updatePost,
  getLike,
} from '../../../apis/postService';
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
  const [isLiked, setIsLiked] = useState<boolean | null>(null); // 좋아요 상태 초기값을 null로 설정
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 여부
  const [editTitle, setEditTitle] = useState(''); // 수정 중인 제목
  const [editContent, setEditContent] = useState(''); // 수정 중인 내용
  const [likeCount, setLikeCount] = useState(0);
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
        const likedPost = await getLike(parseInt(postId));
        //console.log('likedPost:', likedPost); // API 응답 로그
        setIsLiked(likedPost); // 좋아요 여부에 따라 상태 업데이트
        // console.log(isLiked);
        const post = await fetchPosts();

        const fetchedPost = post.find((p) => p.id === parseInt(postId));
        setPost(fetchedPost);
        setEditTitle(fetchedPost.title); // 초기 제목 설정
        setEditContent(fetchedPost.content); // 초기 내용 설정
        const likesResponse = await getPostLikes(parseInt(postId)); // 좋아요 개수 가져오기
        setLikeCount(likesResponse.listCount); // 상태 업데이트
        const comments = await fetchCommentsByPost(parseInt(postId));
        setComments(comments);
        // getLike API로 사용자가 좋아요를 눌렀는지 확인
      } catch (error) {
        console.error('Error fetching post or comments:', error);
      }
    };

    getPostAndComments();
  }, [postId]); // postId가 변경될 때마다 실행

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

  // 게시글 수정 모드 활성화
  const handleEditPost = () => {
    setIsEditing(true);
  };

  // 게시글 수정 처리
  const handleUpdatePost = async () => {
    try {
      await updatePost(
        { title: editTitle, content: editContent },
        parseInt(postId)
      );
      setPost((p) => ({ ...p, title: editTitle, content: editContent }));

      setIsEditing(false); // 수정 완료 후 수정 모드 해제
      alert('게시글이 변경되었습니다.');
    } catch (error) {
      console.error('Error updating post:', error);
      alert('게시글 변경 중 문제가 발생했습니다. 다시 시도해주세요.');
    }
  };

  // 좋아요 토글 처리
  const handleLike = async () => {
    try {
      const response = await toggleLike(parseInt(postId));
      //console.log('Like response:', response); // API 응답 확인
      setLikeCount(
        (prev) => prev + (response.message === 'Like added' ? 1 : -1)
      );
      setIsLiked((prev) => (response.message === 'Like added' ? true : false));
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
              className="text-red-500 hover:text-red-700 mr-4"
            >
              삭제
            </button>
            <button
              onClick={handleEditPost}
              className="text-blue-500 hover:text-blue-700"
            >
              수정
            </button>
          </div>
        )}
        {isEditing ? (
          <div>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            />
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            />
            <button
              onClick={handleUpdatePost}
              className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600 transition"
            >
              변경 내용 저장
            </button>
          </div>
        ) : (
          <>
            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4">
              {post.title}
            </h1>
            <p className="text-lg mb-6">{post.content}</p>
          </>
        )}

        {/* 좋아요 버튼 */}
        <div className="flex justify-center mb-6">
          <button
            onClick={handleLike}
            className={`text-xl font-semibold ${
              isLiked === null
                ? 'text-gray-500'
                : isLiked
                ? 'text-blue-600'
                : 'text-gray-500'
            }`}
          >
            {isLiked === null ? '♡' : isLiked ? '♥' : '♡'}
          </button>
          <span>{likeCount} Likes</span> {/* 좋아요 개수 표시 */}
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
            className="w-full p-2 border rounded mb-4"
            placeholder="댓글을 입력하세요..."
          />
          <button
            onClick={handleCommentSubmit}
            className="bg-green-500 text-white py-2 px-4 rounded w-full hover:bg-green-600 transition"
          >
            댓글 작성
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
