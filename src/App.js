import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import SignUp from './components/SignUp';
import Login from './components/Login';
import MainPage from "./pages/MainPage"
import PrivateRoute from './components/PrivateRoute';
import Logout from './components/Logout';
import Navbar from './components/Navbar';
import UserProfile from './pages/UserProfile';
import api from "./components/api"

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();
  const [id, setId] = useState(null);

  


  useEffect(() => {

    const userToken = localStorage.getItem('token');
    console.log(userToken);

    if (userToken) {
      api.get('/auth/verify')
        .then((response) => {
          const id = response.data._id;
          if (response.data && response.data._id) {
            console.log(response.data)
            setId(id);
            console.log(id)
          }
          setAuthenticated(true);
        })
        .catch((error) => {
          console.error(error);
          setAuthenticated(false);
        });
    }
  }, []);

  const handleLogout = () => {

    localStorage.removeItem('token');
    setAuthenticated(false);
    setId(null)
    console.log(authenticated)
    navigate('/');
  };

  return (
    <div>
      <Navbar id={id} />
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        <Route path="/main" element={<PrivateRoute><MainPage authenticated={authenticated} /></PrivateRoute>} />
        <Route path="/profile/:id" element={<UserProfile />} />
        <Route path="/logout" element={<Logout onLogout={handleLogout} />} />

      </Routes>
    </div>
  );
}

export default App;