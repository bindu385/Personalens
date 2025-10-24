import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
}

export interface Segment {
  segment: string;
  products: Product[];
}

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductSegments = async (): Promise<Segment[]> => {
  try {
    const response = await api.get('/segment');
    return response.data;
  } catch (error) {
    console.error('Error fetching segments:', error);
    throw error;
  }
};