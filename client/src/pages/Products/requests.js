//@flow

import axios from 'axios';
import { SERVER_URL } from 'variables';

export async function requestGetQuery(
  page: number,
  amount: number,
  category: string,
  type: string,
  search: string
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
      url: string,
      key: string,
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
  if (type !== 'all') {
    params.type = type;
  }
  if (search !== '') {
    params.search = search;
  }
  const response = await axios.get(`${SERVER_URL}/cards`, {
    params: params,
  });
  return response.data;
}

export async function requestGetCount(category, type, search): Promise<number> {
  let params = {};
  if (category !== 'all') {
    params.category = category;
  }
  if (type !== 'all') {
    params.type = type;
  }
  if (search !== '') {
    params.search = search;
  }
  const response = await axios.get(`${SERVER_URL}/cards/count`, {
    params: params,
  });
  return response.data;
}

export async function requestGetFavorite(token): Promise<number> {
  const response = await axios.get(`${SERVER_URL}/my/favorites`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.data || !response.data.favorites) {
    throw new Error('no data');
  }
  return response.data.favorites;
}
