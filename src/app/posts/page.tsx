// pages/posts.tsx
'use client';

import { useEffect, useState } from 'react';
import { fetchPosts } from '../../apis/postService';
import { useRouter } from 'next/navigation';
import React from 'react';
import Link from 'next/link';

const PostsPage = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      // 로그인되지 않으면 로그인 페이지로 리다이렉션
      router.push('/');
    }
  }, [router]);
  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    getPosts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-xl shadow-xl mt-12">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link href="../../new">글쓰기</Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4">
          헬스 커뮤니티<br></br>
          <br></br> 게시글 목록
        </h1>

        <ul>
          {posts.map((post) => (
            <li
              key={post.id}
              className="p-4 border-b cursor-pointer hover:bg-gray-100 transition"
              onClick={() => router.push(`/posts/${post.id}`)}
            >
              <h2 className="text-lg font-semibold">{post.title}</h2>
              <p className="text-sm text-gray-500">{post.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PostsPage;
