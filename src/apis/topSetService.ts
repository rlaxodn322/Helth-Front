import axios from 'axios';
import { backUrl } from '../config/config';
import apiClient from '../app/utils/apiClient';
// 기본 설정
axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export const fetchTopSetTrainings = async () => {
  try {
    const response = await apiClient.get('/workoutrecord');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('탑세트 데이터를 가져오는 데 실패했습니다.', error);
    throw error;
  }
};

export const createTopSetTraining = async (data: any) => {
  try {
    const response = await apiClient.post('/workoutrecord', data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('탑세트 데이터를 생성하는 데 실패했습니다.', error);
    throw error;
  }
};
export const deleteTopSetTraining = async (id: number) => {
  try {
    await apiClient.delete(`/workoutrecord/${id}`);
  } catch (error) {
    console.error('탑세트 데이터를 삭제하는 데 실패했습니다.', error);
    throw error;
  }
};
