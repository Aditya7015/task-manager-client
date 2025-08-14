import React from 'react';
import { useParams } from 'react-router-dom';
import * as projects from '../services/projects.js';

export default function Activity(){
  const { id } = useParams();
  const [items,setItems]=React.useState([]);
  React.useEffect(()=>{ projects.activity(id).then(setItems); },[id]);
  return (
    <div className="card">
      <h3>Activity</h3>
      <ul>
        {items.map(a=> <li key={a._id}>{a.type} — {new Date(a.createdAt).toLocaleString()}</li>)}
      </ul>
    </div>
  );
}
