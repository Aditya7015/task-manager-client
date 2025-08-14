import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as invites from '../services/invites.js';

export default function AcceptInvite(){
  const params = new URLSearchParams(location.search);
  const token = params.get('token')||'';
  const nav = useNavigate();
  const acc = async ()=>{ await invites.accept(token); nav('/'); };
  return (<div className="card" style={{maxWidth:480, margin:'40px auto'}}>
    <h3>Accept Invitation</h3>
    <p>Token: <code>{token}</code></p>
    <button className="btn" onClick={acc}>Join Project</button>
  </div>);
}
