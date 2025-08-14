import React from 'react';
import TaskModal from './TaskModal.jsx';

export default function TaskCard({task}){
  const [open,setOpen]=React.useState(false);
  const drag = (e)=> e.dataTransfer.setData('text/plain', task._id);
  return (
    <div className="task" draggable onDragStart={drag} onClick={()=>setOpen(true)}>
      <div style={{fontWeight:700}}>{task.title}</div>
      <div className="row"><span className="pill">{task.priority}</span>{task.labels?.slice(0,2).map(l=><span key={l} className="pill">{l}</span>)}</div>
      {open && <TaskModal task={task} onClose={()=>setOpen(false)}/>}
    </div>
  );
}
