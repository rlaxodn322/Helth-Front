import axios from 'axios';
import { backUrl } from '../config/config';
import apiClient from '../app/utils/apiClient';

// 기본 설정
axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export const createProduct = async (formData) => {
  return apiClient.post('/products', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const getAllProducts = async () => {
  return apiClient.get('/products');
};

export const getProduct = async (id) => {
  return apiClient.get(`/products/${id}`);
};

export const updateProduct = async (id, formData) => {
  return apiClient.put(`/products/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteProduct = async (id) => {
  return apiClient.delete(`/products/${id}`);
};
