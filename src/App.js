import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import SignUp from './components/SignUp';
import Login from './components/Login';
import MainPage from "./pages/MainPage"
import PrivateRoute from './components/PrivateRoute';
import Logout from './components/Logout';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

 
  useEffect(() => {
   
    const userToken = localStorage.getItem('token');
    console.log(userToken);

    if (userToken) {
      setAuthenticated(true);
    }
  }, []);
 
  const handleLogout = () => {

    localStorage.removeItem('token');
    setAuthenticated(false);
    console.log(authenticated)
  };

  return (
    <Routes>

      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />

      <Route path="/main" element={<PrivateRoute><MainPage authenticated={authenticated} /></PrivateRoute>} />

      <Route path="/logout" element={<Logout onLogout={handleLogout} />} />

    </Routes>
  );
}

export default App;