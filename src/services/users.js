import api from './api.js';
export async function list(){ const { data } = await api.get('/admin/users'); return data.items; }
