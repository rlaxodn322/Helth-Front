import axios from 'axios';
import { backUrl } from '../config/config';
import apiClient from '../app/utils/apiClient';

// 기본 설정
axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export const fetchPosts = async () => {
  const response = await axios.get('/post'); // 게시글 목록
  console.log(response);
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
  console.log(response);
  return response.data;
};

export const updatePost = async (
  postData: {
    title: string;
    content: string;
  },
  postId: number
) => {
  const response = await apiClient.patch(`/post/${postId}`, postData);
  console.log(response);
  return response.data;
};

// 게시글 삭제
export const deletePost = async (postId: number) => {
  const response = await apiClient.delete(`/post/${postId}`); // 게시글 삭제
  return response.data;
  console.log(response);
};
export const toggleLike = async (postId: number) => {
  try {
    const response = await apiClient.post(`/post/${postId}/like`);
   // console.log(response);
    return response.data;
  } catch (error) {
    throw new Error('Error toggling like');
  }
};

export const getPostLikes = async (postId: number) => {
  try {
    const response = await apiClient.get(`/post/${postId}/like`);
    //console.log(response);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching likes count');
  }
};

export const getLike = async (postId: number) => {
  // console.log(`Calling getLike with postId: ${postId}`);
  try {
    const response = await apiClient.get(`/post/${postId}/like/status`);
    //console.log(response);
    return response.data;
  } catch (error) {
    throw new Error('Error like boolean');
  }
};
