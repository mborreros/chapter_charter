// import logo from './logo.svg';
import './App.css';

import { useState, useEffect } from "react";

import Home from './home';
import UserAuthForm from './user_auth_form';
import Collections from './collections';
import Journeys from './journeys';
import Challenges from './challenges';
import Statistics from './statistics';
import { Routes, Route } from "react-router-dom";

function App() {

  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch("/auth").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    })
  }, []);

  return (
    <Routes>
      
      {/* today's focus -> page for user login */}
      <Route exact path="/" element={ <Home user={user} onLogout={setUser}/> } />
      <Route exact path="/login" element={ <UserAuthForm onLogin={setUser} /> } />
      <Route exact path="/signup" element={ <UserAuthForm  onSignup={setUser} /> } />

      {/* dummy pages */}
      <Route path="/collections" element={ <Collections /> } />
      <Route path="/journeys" element={ <Journeys /> } />
      <Route path="/challenges" element={ <Challenges /> } />
      <Route path="/statistics" element={ <Statistics /> } />
    </Routes>
  );
}

export default App;
