import React from 'react';
import * as users from '../services/users.js';

export default function AdminPanel(){
  const [items,setItems]=React.useState([]);
  React.useEffect(()=>{ users.list().then(setItems); },[]);
  return (
    <div className="card">
      <h3>Users</h3>
      <table className="table">
        <thead><tr><th>Name</th><th>Email</th><th>Role</th></tr></thead>
        <tbody>{items.map(u=>(<tr key={u._id}><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td></tr>))}</tbody>
      </table>
    </div>
  );
}
