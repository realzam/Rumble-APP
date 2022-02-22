import { ResponseOK, ResponseError } from '../types/respose';

const baseURL = process.env.REACT_APP_API_URL;

const fetchSinToken = async <T extends ResponseOK>(
  endponint: string,
  data: {} = {},
  method: string = 'GET',
): Promise<T | ResponseError> => {
  const url = `${baseURL}/${endponint}`;
  if (method === 'GET') {
    const resp = await fetch(url);
    const json = await resp.json();
    return json;
  }
  const resp = await fetch(url, {
    method,
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await resp.json();
  if (resp.ok) {
    return json as T;
  }
  return json as ResponseError;
};

const fetchConToken = async <T extends ResponseOK>(
  endponint: string,
  data: {} = {},
  method: string = 'GET',
): Promise<T | ResponseError> => {
  const url = `${baseURL}/${endponint}`;
  const token = localStorage.getItem('token') || '';
  if (method === 'GET') {
    const resp = await fetch(url, { headers: { 'X-Token': token } });
    const json = await resp.json();
    return json;
  }
  const resp = await fetch(url, {
    method,
    headers: { 'Content-type': 'application/json', 'X-Token': token },
    body: JSON.stringify(data),
  });
  const json = await resp.json();
  if (resp.ok) {
    return json as T;
  }
  return json as ResponseError;
};

export { fetchSinToken, fetchConToken };
