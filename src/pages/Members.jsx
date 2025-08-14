import React from 'react';
import { useParams } from 'react-router-dom';
import * as users from '../services/users.js';
import * as projects from '../services/projects.js';
import * as invites from '../services/invites.js';

export default function Members(){
  const { id } = useParams();
  const [list,setList]=React.useState([]);
  const [usersList,setUsers]=React.useState([]);
  const [uid,setUid]=React.useState('');
  const [role,setRole]=React.useState('member');
  const [inviteEmail,setInviteEmail]=React.useState('member@example.com');
  const [inviteRole,setInviteRole]=React.useState('member');
  const [inviteLink,setInviteLink]=React.useState('');

  const refresh = async ()=>{
    const me = (await projects.list()).find(x=>x._id===id);
    setList(me?.members || []);
    setUsers(await users.list());
  };
  React.useEffect(()=>{ refresh(); },[id]);

  const add = async ()=>{ await projects.addMember({ projectId: id, userId: uid, role }); await refresh(); };
  const invite = async ()=>{ const r = await invites.create(id, inviteEmail, inviteRole); setInviteLink(location.origin + r.inviteUrl); };

  return (
    <div className="grid" style={{gridTemplateColumns:'1fr 2fr'}}>
      <div className="card">
        <h3>Add member</h3>
        <select className="input" value={uid} onChange={e=>setUid(e.target.value)}>
          <option value="">Select user</option>
          {usersList.map(u=> <option key={u._id} value={u._id}>{u.name} — {u.email}</option>)}
        </select>
        <select className="input" value={role} onChange={e=>setRole(e.target.value)}>
          <option value="member">member</option>
          <option value="owner">owner</option>
        </select>
        <button className="btn" onClick={add}>Add to project</button>
      </div>
      <div className="card">
        <h3>Members</h3>
        <table className="table">
          <thead><tr><th>User</th><th>Role</th></tr></thead>
          <tbody>
            {list.map(m=> <tr key={m.user}><td>{m.user}</td><td>{m.role}</td></tr>)}
          </tbody>
        </table>
      </div>
      <div className="card">
        <h3>Invite via link</h3>
        <div className="row">
          <input className="input" value={inviteEmail} onChange={e=>setInviteEmail(e.target.value)} placeholder="email"/>
          <select className="input" value={inviteRole} onChange={e=>setInviteRole(e.target.value)}><option>member</option><option>owner</option></select>
          <button className="btn" onClick={invite}>Generate</button>
        </div>
        {inviteLink && <div className="row"><input className="input" value={inviteLink} readOnly/><a className="btn" href={inviteLink} target="_blank">Open</a></div>}
      </div>
    </div>
  );
}
