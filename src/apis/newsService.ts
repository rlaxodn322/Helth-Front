import axios from 'axios';
import { backUrl } from '../config/config';
import apiClient from '../app/utils/apiClient';

// 기본 설정
axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export const getNews = async () => {
  return apiClient.get('/health-news');
};

export const getHealthNews = async (type: 'hypertension' | 'diabetes') => {
  try {
    const response = await apiClient.get(`/crawl/${type}`); // '/crawl/hypertension' 또는 '/crawl/diabetes' 호출
    console.log(response);
    return response.data; // API에서 받은 데이터 반환
  } catch (error) {
    console.error('뉴스를 가져오는 데 실패했습니다.', error);
    throw new Error('뉴스 데이터를 가져오는 데 실패했습니다.');
  }
};
