import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Register(){
  const { register } = useAuth(); const nav = useNavigate();
  const [name,setName]=React.useState('New User');
  const [email,setEmail]=React.useState('new@example.com');
  const [password,setPassword]=React.useState('password');
  const submit = async (e)=>{ e.preventDefault(); await register(name,email,password); nav('/'); };
  return (
    <form onSubmit={submit} className="card" style={{maxWidth:420, margin:'40px auto', display:'grid', gap:10}}>
      <h2>Create account</h2>
      <input className="input" placeholder="Name" value={name} onChange={e=>setName(e.target.value)}/>
      <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
      <input className="input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/>
      <button className="btn">Sign up</button>
    </form>
  );
}
