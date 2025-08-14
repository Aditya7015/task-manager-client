import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ProjectBoard from './pages/ProjectBoard.jsx';
import Members from './pages/Members.jsx';
import Activity from './pages/Activity.jsx';
import AdminPanel from './pages/AdminPanel.jsx';
import RequestReset from './pages/RequestReset.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import AcceptInvite from './pages/AcceptInvite.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';

function Guard({children}){
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace/>;
}
function AdminGuard({children}){
  const { user } = useAuth();
  return user?.role === 'admin' ? children : <Navigate to="/" replace/>;
}

export default function App(){
  return (
    <AuthProvider>
      <Navbar/>
      <div style={{padding:16}}>
        <Routes>
          <Route path="/" element={<Guard><Dashboard/></Guard>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/forgot" element={<RequestReset/>} />
          <Route path="/auth/reset" element={<ResetPassword/>} />
          <Route path="/invites/accept" element={<Guard><AcceptInvite/></Guard>} />
          <Route path="/p/:id" element={<Guard><ProjectBoard/></Guard>} />
          <Route path="/p/:id/members" element={<Guard><Members/></Guard>} />
          <Route path="/p/:id/activity" element={<Guard><Activity/></Guard>} />
          <Route path="/admin" element={<AdminGuard><AdminPanel/></AdminGuard>} />
        </Routes>
      </div>
    </AuthProvider>
  );
}
