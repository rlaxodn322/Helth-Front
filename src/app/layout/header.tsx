'use client'; // 이 지시어를 맨 위에 추가하세요

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import apiClient from '../utils/apiClient';
import { useRouter } from 'next/navigation';

const HeaderContainer = styled.div`
  width: 100%;
  background-color: white;
  padding: 10px 0;
`;

const NavContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  /* max-width: 1250px; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* 
  @media (max-width: 768px) {
    flex-direction: column;
  } */
`;

const LogoContainer = styled.div`
  width: 10%;

  img {
    width: 40%;

    @media (max-width: 480px) {
      width: 80%;
    }
  }
`;

const NavLinks = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const NavLink = styled.div`
  margin: 15px 45px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    margin: 10px 20px;
  }

  @media (max-width: 480px) {
    margin: 5px 10px;
  }
`;
const App: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    // 로컬 스토리지에서 토큰 삭제
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    // 로그인 페이지로 리다이렉션
    router.push('/');
  };

  return (
    <HeaderContainer>
      <NavContainer>
        <div style={{ marginLeft: 'auto', marginRight: '20px' }}>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      </NavContainer>
    </HeaderContainer>
  );
};

export default App;
