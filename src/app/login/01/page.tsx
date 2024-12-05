'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import apiClient from '../../utils/apiClient';
import { useRouter } from 'next/navigation';
import React from 'react';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await apiClient.post('/auth/login', data);
      const { accessToken, refreshToken } = response.data;

      // 토큰을 로컬 스토리지에 저장
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      // 홈으로 이동
      router.push('/dashboard/01');
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || '로그인에 실패했습니다.'
      );
    }
  };

  return (
    <div className="min-h-screen  p-4 sm:p-6 md:p-10 bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm sm:max-w-md md:max-w-lg"
      >
        <h1 className="text-2xl font-bold mb-4 text-center sm:text-3xl">
          로그인
        </h1>
        {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">
            이메일
          </label>
          <input
            id="email"
            type="email"
            {...register('email', { required: '이메일을 입력해주세요.' })}
            className="border p-2 w-full rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium">
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            {...register('password', {
              required: '비밀번호를 입력해주세요.',
            })}
            className="border p-2 w-full rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600 transition sm:py-3 sm:text-lg"
        >
          로그인
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
