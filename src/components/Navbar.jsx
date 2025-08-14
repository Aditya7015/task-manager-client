import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import api, { setToken } from '../services/api.js';

export default function Navbar(){
  const { user, token, logout } = useAuth();
  React.useEffect(()=>{ setToken(token); },[token]);
  return (
    <header>
      <div className="row">
        <Link className="brand" to="/">Task Manager Pro</Link>
        {user && <Link to="/">Projects</Link>}
        {user?.role==='admin' && <Link to="/admin">Admin</Link>}
      </div>
      <div className="row">
        {user ? (<>
          <span>Hi, {user.name}</span>
          <button className="btn ghost" onClick={logout}>Logout</button>
        </>) : (<>
          <Link className="btn" to="/login">Login</Link>
          <Link className="btn ghost" to="/register">Sign up</Link>
        </>)}
      </div>
    </header>
  );
}
