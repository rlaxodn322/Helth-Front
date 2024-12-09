'use client';
import { useEffect, useState } from 'react';
import apiClient from '../utils/apiClient';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
const DashboardPage = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      // 로그인되지 않으면 로그인 페이지로 리다이렉션
      router.push('/');
    }
  }, [router]);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      try {
        const response = await apiClient.get('/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user profile', error);
      }
    };

    fetchProfile();
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4 sm:p-6 md:p-10 bg-gray-50 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4">
          대시보드
        </h1>
        <p className="text-lg sm:text-xl text-center">
          안녕하세요, <span className="font-semibold">{user.email}</span>님!
        </p>
        <Link href="../../new">글쓰기</Link>
        <br></br>
        <Link href="../../posts">글보기</Link>
        <br></br>
        <Link href="../../product">상품등록하기</Link>
      </div>
    </div>
  );
};

export default DashboardPage;
