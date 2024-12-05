// pages/posts/new.tsx
'use client';

import { useState } from 'react';
import { createPost } from '../../apis/postService';
import { useRouter } from 'next/navigation';
import React from 'react';

const NewPostPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      await createPost({ title, content });
      router.push('/posts');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-10 bg-gray-50 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          새 게시글 작성
        </h1>
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full rounded mb-4"
        />
        <textarea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 w-full rounded mb-4"
        ></textarea>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600 transition"
        >
          작성 완료
        </button>
      </div>
    </div>
  );
};

export default NewPostPage;
