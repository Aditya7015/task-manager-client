import React from 'react';
import * as tasks from '../services/tasks.js';

export default function TaskModal({task, onClose}){
  const [t,setT] = React.useState(task);
  const [comments,setComments]=React.useState([]);
  const [msg,setMsg]=React.useState('');
  const [files,setFiles]=React.useState([]);
  const [uploading,setUploading]=React.useState(false);

  React.useEffect(()=>{
    tasks.comments(task._id).then(setComments);
    tasks.listFiles(task._id).then(setFiles);
  },[task._id]);

  const save = async ()=>{ const r = await tasks.update(t._id, t); Object.assign(task, r); onClose(); };
  const del = async ()=>{ await tasks.remove(t._id); onClose(); };
  const add = async ()=>{ const c = await tasks.addComment(task._id, msg); setComments([...comments, c]); setMsg(''); };
  const up = async (e)=>{ const f = e.target.files?.[0]; if(!f) return; setUploading(true); const d = await tasks.uploadFile(task._id, f); setFiles([...files, d]); setUploading(false); };
  const rm = async (url)=>{ await tasks.removeFile(task._id, url); setFiles(files.filter(x=>x.url!==url)); };

  return (
    <dialog open>
      <div className="body">
        <div className="row" style={{justifyContent:'space-between'}}>
          <h3>Edit Task</h3>
          <button className="btn ghost" onClick={onClose}>Close</button>
        </div>
        <div className="grid" style={{gridTemplateColumns:'2fr 1fr'}}>
          <div className="col">
            <input className="input" value={t.title} onChange={e=>setT({...t,title:e.target.value})}/>
            <textarea className="input" rows="6" value={t.description||''} onChange={e=>setT({...t,description:e.target.value})} placeholder="Description"/>
            <div className="row">
              <select className="input" value={t.priority} onChange={e=>setT({...t,priority:e.target.value})}>
                <option>low</option><option>medium</option><option>high</option>
              </select>
              <input className="input" type="date" value={t.dueDate? t.dueDate.substring(0,10): ''} onChange={e=>setT({...t,dueDate:e.target.value})}/>
              <input className="input" placeholder="labels (comma)" value={(t.labels||[]).join(',')} onChange={e=>setT({...t,labels:e.target.value.split(',').map(x=>x.trim()).filter(Boolean)})}/>
            </div>
            <div className="row">
              <button className="btn" onClick={save}>Save</button>
              <button className="btn ghost" onClick={del}>Delete</button>
            </div>
          </div>
          <div className="col">
            <div className="section-title">Attachments</div>
            <div className="row"><input type="file" onChange={up} />{uploading && <span>Uploading...</span>}</div>
            {files.map(f=> <div key={f.url} className="card row" style={{justifyContent:'space-between'}}><a href={f.url} target="_blank">{f.name}</a><button className="btn ghost" onClick={()=>rm(f.url)}>Remove</button></div>)}
            <div className="spacer"></div>
            <div className="section-title">Comments</div>
            <div className="col">
              {comments.map(c=> <div key={c._id} className="card">{c.text}</div>)}
            </div>
            <div className="row">
              <input className="input" value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Write a comment"/>
              <button className="btn" onClick={add}>Add</button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
