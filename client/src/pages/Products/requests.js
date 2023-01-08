import axios from 'axios';

export const URL =
  process.env.REACT_APP_SERVER_URL !== undefined
    ? process.env.REACT_APP_SERVER_URL
    : 'http://localhost:8085';

export async function requestGetQuery(page, amount) {
  const response = await axios.get(`${URL}/cards`, {
    params: {
      page: page,
      amount: amount,
    },
  });
  return response.data;
}
export async function requestGetCount() {
  const response = await axios.get(`${URL}/cards/count`);
  return response.data;
}
