import React, { createContext, useContext, useEffect, useState } from 'react';
import * as authApi from '../services/auth.js';

const Ctx = createContext(null);
export function useAuth(){ return useContext(Ctx); }

export function AuthProvider({children}){
  const [state,setState] = useState(JSON.parse(localStorage.getItem('auth')||'null'));
  const user = state?.user || null;
  useEffect(()=>{ if(state) localStorage.setItem('auth', JSON.stringify(state)); },[state]);
  const login = async (email, password)=>{
    const d = await authApi.login(email, password); setState(d);
  };
  const register = async (name,email,password)=>{
    const d = await authApi.register(name,email,password); setState(d);
  };
  const logout = ()=>{ setState(null); localStorage.removeItem('auth'); };
  return <Ctx.Provider value={{ user, token: state?.access, setState, login, register, logout }}>{children}</Ctx.Provider>;
}
