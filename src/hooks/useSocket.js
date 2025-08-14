import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

export default function useSocket(projectId, onAny){
  const ref = useRef();
  useEffect(()=>{
    const s = io(import.meta.env.VITE_SOCKET);
    ref.current = s;
    s.emit('join:project', projectId);
    if(onAny){
      const evts = ['task:created','task:updated','task:deleted','task:moved','task:comment','project:member_added'];
      const handler = ()=> onAny();
      evts.forEach(e => s.on(e, handler));
      return ()=> { evts.forEach(e => s.off(e, handler)); s.disconnect(); };
    }
    return ()=> s.disconnect();
  }, [projectId]);
  return ref.current;
}
