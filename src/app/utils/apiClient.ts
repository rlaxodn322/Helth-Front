import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001', // NestJS API의 URL
  headers: {
    'Content-Type': 'application/json',
  },
});
// 엑세스 토큰 재발급 함수
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    throw new Error('리프레시 토큰이 없습니다. 로그인해주세요.');
  }

  try {
    const response = await apiClient.post('/auth/refresh', {
      refreshToken: refreshToken, // 리프레시 토큰을 올바르게 전송
    });

    const newAccessToken = response.data.accessToken;
    localStorage.setItem('accessToken', newAccessToken); // 새로운 엑세스 토큰 저장
    console.log('토큰 발급');
    return newAccessToken;
  } catch (error) {
    console.error(
      '리프레시 토큰으로 엑세스 토큰을 재발급 받는 데 실패했습니다.',
      error
    );
    throw new Error('엑세스 토큰 재발급 실패');
  }
};

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
); // 응답 인터셉터 - 토큰 만료 시 로그아웃 처리 및 리다이렉션

// 응답 인터셉터 - 401 에러 발생 시 리프레시 토큰으로 재시도
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.error('401 Error:', error.response.data);
      try {
        const newAccessToken = await refreshAccessToken();
        error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axios(error.config); // 원래 요청 재시도
      } catch (refreshError) {
        console.error('엑세스 토큰 재발급 실패', refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// 예시: API 요청 보내기
const getPostData = async (postId: number) => {
  try {
    const response = await apiClient.get(`/post/${postId}`);
    return response.data;
  } catch (error) {
    console.error('게시글 데이터를 가져오는 데 실패했습니다.', error);
  }
};
export default apiClient;
