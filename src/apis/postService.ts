import axios from 'axios';
import { backUrl } from '../config/config';
import apiClient from '../app/utils/apiClient';

// 기본 설정
axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export const fetchPosts = async () => {
  const response = await axios.get('/post'); // 게시글 목록
  return response.data;
};

// export const createPost = async (postData: {
//   title: string;
//   content: string;
// }) => {
//   const response = await axios.post('/post', postData); // 게시글 작성
//   return response.data;
// };
export const createPost = async (postData: {
  title: string;
  content: string;
}) => {
  const response = await apiClient.post('/post', postData); // 토큰 포함 자동 처리
  return response.data;
};
// 게시글 삭제
export const deletePost = async (postId: number) => {
  const response = await apiClient.delete(`/post/${postId}`); // 게시글 삭제
  return response.data;
};
export const toggleLike = async (postId: number) => {
  try {
    const response = await apiClient.post(`/post/${postId}/like`);
    return response.data;
  } catch (error) {
    throw new Error('Error toggling like');
  }
};

export const getPostLikes = async (postId: string) => {
  try {
    const response = await apiClient.get(`/post/${postId}/like`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching likes count');
  }
};
