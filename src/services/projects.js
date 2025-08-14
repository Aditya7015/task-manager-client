import api from './api.js';
export async function list(){ const { data } = await api.get('/projects'); return data.items; }
export async function create(payload){ const { data } = await api.post('/projects', payload); return data; }
export async function activity(id){ const { data } = await api.get(`/projects/${id}/activity`); return data.items; }
export async function board(id){ const { data } = await api.get(`/projects/${id}/board`); return data.items; }
export async function addMember(payload){ const { data } = await api.post('/projects/members', payload); return data; }
