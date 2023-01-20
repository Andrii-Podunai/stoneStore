//@flow

import axios from 'axios';

export const URL: string = process.env.REACT_APP_SERVER_URL || 'http://localhost:8085';

export async function requestGetQuery(
  page: number,
  amount: number,
  category: string
): Promise<
  Array<{
    _id: string,
    title: string,
    description: string,
    price: number,
    category: string,
    currency: string,
    count: number,
    images: Array<{
      name: string,
      originalName: string,
    }>,
    type: string,
  }>
> {
  const params: {
    page: number,
    amount: number,
    category?: string,
  } = {
    page: page,
    amount: amount,
  };
  if (category !== 'all') {
    params.category = category;
  }
  const response = await axios.get(`${URL}/cards`, {
    params: params,
  });
  return response.data;
}

export async function requestGetCount(): Promise<number> {
  const response = await axios.get(`${URL}/cards/count`);
  return response.data;
}
