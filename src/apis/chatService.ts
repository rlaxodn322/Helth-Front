import axios from 'axios';
import { backUrl } from '../config/config';
import apiClient from '../app/utils/apiClient';
// 기본 설정
axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

// 챗봇 응답 가져오기
export const fetchChatbotResponse = async (userMessage: string) => {
  try {
    const response = await apiClient.post('/chat', { message: userMessage });
    return response.data.botMessage;
  } catch (error) {
    console.error('챗봇 응답을 가져오는 데 실패했습니다.', error);
    throw error;
  }
};
