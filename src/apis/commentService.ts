import axios from 'axios';
import { backUrl } from '../config/config';
import apiClient from '../app/utils/apiClient';
// 기본 설정
axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;
export const fetchCommentsByPost = async (postId: number) => {
  const response = await apiClient.get(`/comment/post/${postId}`); // 특정 게시글의 댓글
  //console.log(response);
  return response.data;
};
// export const fetchCommentsByPost = async (postId: number) => {
//   const response = await axios.get(`/post/${postId}/comments`); // 특정 게시글의 댓글
//   return response.data;
// };

export const createComment = async (
  postId: number,
  commentData: { content: string; postId: number }
) => {
  const response = await apiClient.post(`/comment`, commentData); // 토큰 포함 자동 처리
  return response.data;
};
// 댓글 삭제
export const deleteComment = async (commentId: number) => {
  const response = await apiClient.delete(`/comment/${commentId}`); // 댓글 삭제
  return response.data;
};
// export const createComment = async (
//   postId: number,
//   commentData: { content: string }
// ) => {
//   const response = await axios.post(`/post/${postId}/comments`, commentData); // 댓글 작성
//   return response.data;
// };
