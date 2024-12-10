import axios from 'axios';
import { backUrl } from '../config/config';
import apiClient from '../app/utils/apiClient';

// 기본 설정
axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export const getNews = async () => {
  return apiClient.get('/health-news');
};
