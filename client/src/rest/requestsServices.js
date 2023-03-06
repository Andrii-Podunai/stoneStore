import axios from 'axios';
import { SERVER_URL } from 'variables';

export async function generalRequestsVoid(method, path, query, token, value) {
  let queryParams = {};
  if (query) {
    for (const queryName in query) {
      if (query[queryName] === 'all') {
        continue;
      }
      if (query[queryName] !== null) {
        queryParams[queryName] = query[queryName];
      }
    }
  }
  const headers = token
    ? { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    : null;
  switch (method) {
    case 'GET':
      return axios(`${SERVER_URL}/${path}`, {
        headers: headers,
        params: queryParams,
      });
    case 'POST':
      return axios.post(`${SERVER_URL}/${path}`, value, {
        headers: headers,
        params: queryParams,
      });
    case 'PUT':
      return axios.put(`${SERVER_URL}/${path}`, value, {
        headers: headers,
        params: queryParams,
      });
    case 'PATCH':
      return axios.patch(`${SERVER_URL}/${path}`, value, {
        headers: headers,
        params: queryParams,
      });
    case 'DELETE':
      return axios.delete(`${SERVER_URL}/${path}`, {
        headers: headers,
        params: queryParams,
        data: value,
      });
    default:
      return null;
  }
}
