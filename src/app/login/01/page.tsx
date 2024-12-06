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

interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const {
    register: signUpRegister,
    handleSubmit: handleSignUpSubmit,
    formState: { errors: signUpErrors },
  } = useForm<SignUpFormData>();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showSignUpModal, setShowSignUpModal] = useState(false); // 회원가입 모달 상태
  const router = useRouter();

  // 로그인 함수
  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await apiClient.post('/auth/login', data);
      const { accessToken, refreshToken } = response.data;

      // 토큰을 로컬 스토리지에 저장
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      // 홈으로 이동
      router.push('/dashboard');
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || '로그인에 실패했습니다.'
      );
    }
  };

  // 회원가입 함수
  const onSignUpSubmit = async (data: SignUpFormData) => {
    if (data.password !== data.confirmPassword) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      await apiClient.post('/auth/signup', {
        email: data.email,
        password: data.password,
      });
      setShowSignUpModal(false); // 모달 닫기
      setErrorMessage(null); // 기존 에러 메시지 초기화
      alert('회원가입이 완료되었습니다. 로그인해주세요.');
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || '회원가입에 실패했습니다.'
      );
    }
  };

  return (
    <div className="min-h-screen  p-4 sm:p-6 md:p-10 ">
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
        {/* 회원가입 모달 열기 버튼 */}
        <button
          type="button"
          onClick={() => setShowSignUpModal(true)}
          className="mt-4 text-blue-500 hover:text-blue-600"
        >
          회원가입
        </button>
      </form>

      {/* 회원가입 모달 */}
      {showSignUpModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm sm:max-w-md md:max-w-lg">
            <h2 className="text-xl font-bold mb-4">회원가입</h2>
            {errorMessage && (
              <p className="text-red-500 mb-2">{errorMessage}</p>
            )}
            <form onSubmit={handleSignUpSubmit(onSignUpSubmit)}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium">
                  이메일
                </label>
                <input
                  id="email"
                  type="email"
                  {...signUpRegister('email', {
                    required: '이메일을 입력해주세요.',
                  })}
                  className="border p-2 w-full rounded"
                />
                {signUpErrors.email && (
                  <p className="text-red-500 text-sm">
                    {signUpErrors.email.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium">
                  비밀번호
                </label>
                <input
                  id="password"
                  type="password"
                  {...signUpRegister('password', {
                    required: '비밀번호를 입력해주세요.',
                  })}
                  className="border p-2 w-full rounded"
                />
                {signUpErrors.password && (
                  <p className="text-red-500 text-sm">
                    {signUpErrors.password.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium"
                >
                  비밀번호 확인
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  {...signUpRegister('confirmPassword', {
                    required: '비밀번호를 확인해주세요.',
                  })}
                  className="border p-2 w-full rounded"
                />
                {signUpErrors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {signUpErrors.confirmPassword.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600 transition sm:py-3 sm:text-lg"
              >
                회원가입
              </button>
            </form>
            <button
              onClick={() => setShowSignUpModal(false)}
              className="mt-4 text-gray-500 hover:text-gray-700"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
