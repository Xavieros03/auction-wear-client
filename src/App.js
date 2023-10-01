import React from 'react';
import './App.css';
import SignUp from './components/SignUp';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <main className="App-main">
        <SignUp />
        <Login />
      </main>
    </div>
  );
}

export default App;