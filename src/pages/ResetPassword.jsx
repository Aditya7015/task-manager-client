import React from 'react';
import { resetPassword } from '../services/auth.js';

export default function ResetPassword(){
  const params = new URLSearchParams(location.search);
  const token = params.get('token')||'';
  const [password,setPassword]=React.useState('newpassword');
  const [done,setDone]=React.useState(false);
  const submit=async(e)=>{ e.preventDefault(); await resetPassword(token, password); setDone(true); };
  return (<form onSubmit={submit} className="card" style={{maxWidth:420, margin:'40px auto', display:'grid', gap:10}}>
    <h2>Set new password</h2>
    <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
    <button className="btn">Update</button>
    {done && <small>Password updated. You can now login.</small>}
  </form>);
}
