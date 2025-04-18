import { Product } from '../types/product';

export const fetchProducts = async (): Promise<Product[]> => {
  const token = JSON.parse(localStorage.getItem('auth') || '{}')?.token;
  const res = await fetch('http://localhost:5117/api/Product', {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  return res.json();
};
