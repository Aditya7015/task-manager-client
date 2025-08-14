import React from 'react';
import * as projects from '../services/projects.js';
import ProjectCard from '../components/ProjectCard.jsx';

export default function Dashboard(){
  const [items,setItems]=React.useState([]);
  const [name,setName] = React.useState('New Project');
  const [description,setDescription]=React.useState('');
  const refresh = async ()=> setItems(await projects.list());
  React.useEffect(()=>{ refresh(); },[]);
  const create = async ()=>{ await projects.create({ name, description }); setName('New Project'); setDescription(''); await refresh(); };
  return (
    <div className="grid" style={{gridTemplateColumns:'1fr 2fr', alignItems:'start'}}>
      <div className="card col">
        <h3>Create project</h3>
        <input className="input" value={name} onChange={e=>setName(e.target.value)} placeholder="Project name"/>
        <textarea className="input" value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description" rows="3"/>
        <button className="btn" onClick={create} style={{marginTop:8}}>Create</button>
      </div>
      <div className="grid" style={{gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))'}}>
        {items.map(p => <ProjectCard key={p._id} p={p}/>)}
      </div>
    </div>
  );
}
