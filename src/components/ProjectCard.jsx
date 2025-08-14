import React from 'react';
import { Link } from 'react-router-dom';

export default function ProjectCard({p}){
  return (
    <div className="card col">
      <div className="row" style={{justifyContent:'space-between'}}>
        <strong>{p.name}</strong>
        <span className="pill">{new Date(p.createdAt).toLocaleDateString()}</span>
      </div>
      <p style={{opacity:.8}}>{p.description || '—'}</p>
      <div className="row">
        <Link className="btn" to={`/p/${p._id}`}>Open Board</Link>
      </div>
    </div>
  );
}
