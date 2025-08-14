import React from 'react';
import { Link, useParams } from 'react-router-dom';
import * as projects from '../services/projects.js';
import * as taskApi from '../services/tasks.js';
import BoardColumn from '../components/BoardColumn.jsx';
import useSocket from '../hooks/useSocket.js';

export default function ProjectBoard(){
  const { id } = useParams();
  const [project,setProject] = React.useState(null);
  const [tasks,setTasks] = React.useState([]);
  const [title,setTitle]=React.useState('New task');
  const [priority,setPriority]=React.useState('medium');
  const [labels,setLabels]=React.useState('');
  const [query,setQuery]=React.useState('');
  const refresh = async ()=>{
    const pjs = await projects.list(); setProject(pjs.find(x=>x._id===id));
    setTasks(await projects.board(id));
  };
  React.useEffect(()=>{ refresh(); },[id]);
  useSocket(id, refresh);

  const createTask = async ()=>{
    await taskApi.create({ project:id, title, priority, labels: labels.split(',').map(x=>x.trim()).filter(Boolean) });
    setTitle('New task'); setLabels(''); await refresh();
  };
  const move = async (taskId, status)=>{
    const colTasks = tasks.filter(t=>t.status===status);
    await taskApi.move(taskId, { status, toIndex: colTasks.length });
  };
  const filtered = tasks.filter(t => t.title.toLowerCase().includes(query.toLowerCase()));
  const by = (s)=> filtered.filter(t=>t.status===s);
  return (
    <div className="grid" style={{gridTemplateColumns:'1fr'}}>
      <div className="card row" style={{justifyContent:'space-between'}}>
        <div className="row">
          <h2 style={{margin:0}}>{project?.name || 'Project'}</h2>
          <Link className="btn" to={`/p/${id}/members`}>Members</Link>
          <Link className="btn ghost" to={`/p/${id}/activity`}>Activity</Link>
        </div>
        <div className="row">
          <input className="input" placeholder="Search tasks..." value={query} onChange={e=>setQuery(e.target.value)} />
          <input className="input" placeholder="Task title" value={title} onChange={e=>setTitle(e.target.value)} />
          <select className="input" value={priority} onChange={e=>setPriority(e.target.value)}><option>low</option><option>medium</option><option>high</option></select>
          <input className="input" placeholder="labels (comma)" value={labels} onChange={e=>setLabels(e.target.value)} />
          <button className="btn" onClick={createTask}>Add Task</button>
        </div>
      </div>
      <div className="board">
        <BoardColumn title="To Do" status="todo" tasks={by('todo')} onDrop={move} />
        <BoardColumn title="In Progress" status="in_progress" tasks={by('in_progress')} onDrop={move} />
        <BoardColumn title="Done" status="done" tasks={by('done')} onDrop={move} />
      </div>
    </div>
  );
}
