import api, { setToken } from './api.js';

export async function login(email, password){
  const { data } = await api.post('/auth/login', { email, password });
  setToken(data.access);
  return data;
}
export async function register(name,email,password){
  const { data } = await api.post('/auth/register', { name, email, password });
  setToken(data.access);
  return data;
}
export async function requestReset(email){
  const { data } = await api.post('/auth/password/request', { email }); return data;
}
export async function resetPassword(token, password){
  const { data } = await api.post('/auth/password/reset', { token, password }); return data;
}
