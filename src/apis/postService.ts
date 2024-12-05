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
