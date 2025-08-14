import React from 'react';
import TaskCard from './TaskCard.jsx';

export default function BoardColumn({ title, status, tasks, onDrop }){
  const allow = (e)=> e.preventDefault();
  const handleDrop = (e)=>{
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    onDrop(id, status);
  };
  return (
    <div className="column" onDragOver={allow} onDrop={handleDrop}>
      <div className="row" style={{justifyContent:'space-between', padding:'4px 8px'}}>
        <strong>{title}</strong>
        <span className="pill">{tasks.length}</span>
      </div>
      <div className="col">
        {tasks.map(t => <TaskCard key={t._id} task={t} />)}
      </div>
    </div>
  );
}
