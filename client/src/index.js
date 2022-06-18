import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Home from './login';
import Register from './register';
import UserPage from './userId';
import './index.css'
function TaskManagement(){
  return (  
    <BrowserRouter>
      <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/register" element={<Register/>}/>
          <Route exact path="/user/:_id/:_username" element={<UserPage/>}/>    
      </Routes>      
    </BrowserRouter>

  );
}
const root=ReactDOM.createRoot(document.getElementById('root'));
root.render(<TaskManagement/>);