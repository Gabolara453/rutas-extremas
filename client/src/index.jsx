import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/authContext";

import App from './App'
import Register from "./pages/register";
import NewPost from './pages/new.post';
import EditUser from './pages/edit.user';
import EditPost from './pages/edit.post';
import UserProfile from './pages/profile.user';
import UserProfilePublic from './pages/profile.public';
import PostProfile from "./pages/profile.post";
// import Map from './pages/component/map.js';
// import Map from './pages/component/map2';
import Map from './pages/component/mapR';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
     <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<App />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user/newPost" element={<NewPost />} />
          <Route path="/user/profile" element={<UserProfile/>} />
          <Route path="/user/profile/:id" element={<UserProfilePublic/>} />
          <Route path="/user/edit" element={<EditUser />} />
          <Route path="/Post/:id" element={<PostProfile />} />
          <Route path="/post/edit" element={<EditPost />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);


