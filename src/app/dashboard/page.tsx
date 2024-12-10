'use client';
import React, { useEffect, useState } from 'react';
import apiClient from '../utils/apiClient';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getNews } from '../../apis/newsService';

const DashboardPage = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      router.push('/');
    }
  }, [router]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await getNews();
        if (response.data && response.data.data) {
          setNews(response.data.data);
        } else {
          console.error('데이터가 없습니다.');
        }
      } catch (error) {
        setError('뉴스 데이터를 가져오는 데 실패했습니다.');
        console.error('API 요청 오류', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

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
            헬스커뮤니티 글쓰기
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
            헬스 제품 리뷰
          </Link>
          <Link
            href="../../top-set"
            className="block text-center bg-purple-500 text-white font-semibold py-3 rounded-lg shadow hover:bg-purple-600 transition duration-300"
          >
            탑세트훈련
          </Link>
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Health News
        </h2>
        {loading && (
          <p className="text-center text-gray-500">뉴스를 불러오는 중...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}
        <div className=" mt-10 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:shadow-lg hover:scale-105"
            >
              {item.imgUrl && (
                <img
                  src={item.imgUrl}
                  alt={item.title}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  자세히 보기 →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
