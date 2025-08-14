import api from './api.js';
export async function create(projectId, email, role){ const { data } = await api.post('/invites', { projectId, email, role }); return data; }
export async function accept(token){ const { data } = await api.post('/invites/accept', { token }); return data; }
