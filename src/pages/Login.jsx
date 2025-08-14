import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login(){
  const { login } = useAuth(); const nav = useNavigate();
  const [email,setEmail] = React.useState('alice@example.com');
  const [password,setPassword] = React.useState('password');
  const submit = async (e)=>{ e.preventDefault(); await login(email,password); nav('/'); };
  return (
    <form onSubmit={submit} className="card" style={{maxWidth:380, margin:'40px auto', display:'grid', gap:10}}>
      <h2>Welcome back</h2>
      <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
      <input className="input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/>
      <button className="btn">Login</button>
      <div className="row" style={{justifyContent:'space-between'}}>
        <Link to="/register">Create account</Link>
        <Link to="/forgot">Forgot password?</Link>
      </div>
    </form>
  );
}
