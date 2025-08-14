import React from 'react';
import { requestReset } from '../services/auth.js';

export default function RequestReset(){
  const [email,setEmail]=React.useState('alice@example.com');
  const [msg,setMsg]=React.useState('');
  const submit=async(e)=>{ e.preventDefault(); const r = await requestReset(email); setMsg('Reset link (demo): '+(r.resetLink||'Check email')); };
  return (<form onSubmit={submit} className="card" style={{maxWidth:420, margin:'40px auto', display:'grid', gap:10}}>
    <h2>Password reset</h2>
    <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
    <button className="btn">Request reset</button>
    {msg && <small>{msg}</small>}
  </form>);
}
