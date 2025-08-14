import api from './api.js';
export async function create(payload){ const { data } = await api.post('/tasks', payload); return data; }
export async function update(id, payload){ const { data } = await api.patch(`/tasks/${id}`, payload); return data; }
export async function remove(id){ const { data } = await api.delete(`/tasks/${id}`); return data; }
export async function move(id, payload){ const { data } = await api.post(`/tasks/${id}/move`, payload); return data; }
export async function comments(id){ const { data } = await api.get(`/tasks/${id}/comments`); return data.items; }
export async function addComment(id, text){ const { data } = await api.post(`/tasks/${id}/comments`, { text }); return data; }
export async function listFiles(id){ const { data } = await api.get(`/attachments/${id}`); return data.items; }
export async function uploadFile(id, file){ const fd = new FormData(); fd.append('file', file); const r = await fetch(import.meta.env.VITE_API + `/attachments/${id}`, { method:'POST', headers: { Authorization: localStorage.getItem('auth')? 'Bearer ' + JSON.parse(localStorage.getItem('auth')).access : '' }, body: fd }); return r.json(); }
export async function removeFile(id, url){ const { data } = await api.delete(`/attachments/${id}`, { data: { url } }); return data; }
