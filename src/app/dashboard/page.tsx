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
    return <p className="text-center text-gray-600 mt-10">Loading...</p>;
  }

  return (
    <div className="p-4 sm:p-6 md:p-10 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
      <div className="bg-white max-w-3xl mx-auto p-8 rounded-xl shadow-lg transform transition duration-500 hover:shadow-2xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-600 text-center mb-6">
          대시보드
        </h1>
        <p className="text-lg sm:text-xl text-center text-gray-700 mb-8">
          안녕하세요,{' '}
          <span className="font-semibold text-blue-500">{user.email}</span>님!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            href="../../new"
            className="block text-center bg-blue-500 text-white font-semibold py-3 rounded-lg shadow hover:bg-blue-600 transition duration-300"
          >
            글쓰기
          </Link>
          <Link
            href="../../posts"
            className="block text-center bg-green-500 text-white font-semibold py-3 rounded-lg shadow hover:bg-green-600 transition duration-300"
          >
            헬스커뮤니티
          </Link>
          <Link
            href="../../product"
            className="block text-center bg-yellow-500 text-white font-semibold py-3 rounded-lg shadow hover:bg-yellow-600 transition duration-300"
          >
            헬스중고나라
          </Link>
          <Link
            href="../../top-set"
            className="block text-center bg-purple-500 text-white font-semibold py-3 rounded-lg shadow hover:bg-purple-600 transition duration-300"
          >
            탑세트훈련
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
