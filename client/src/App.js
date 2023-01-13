import { useState, useEffect } from "react";
import { useNavigate, Routes, Route } from 'react-router-dom';
import toast from 'react-hot-toast';

import Home from './home';
import UserAuthForm from './user_auth_form';
import BasePage from './base_page';
import Navigation from './navigation';
import PageNotFound from "./page_not_found";

function App() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [journeys, setJourneys] = useState(null);
  const [challenges, setChallenges] = useState(null);

  // handles server errors shown to user in toasts throughout the application
  const handleServerError = async (response) => {
    let statusMessage = response.status + ": " + response.statusText

    if (!response.ok) {
      if (response.status == 422) {
        // console.log("within the 422 error handler")
        // statusMessage = await response.json()
        throw await response.json()
      } else {
        toast.error("There was an error with the request \n" + statusMessage)
        throw Error(statusMessage)
      }
    } else {
      return response.json()
    }
  }

  function fetchUserAuth() {
    fetch("/auth")
      .then(response => handleServerError(response))
      .then(data => setUser(data))
      .catch(error => console.log(error))
  }

  useEffect(() => {
    fetchUserAuth()
  }, []);

  function handleUserLogout() {
    fetch("/logout", {
      method: "DELETE"
    }).then(() => setUser())
      .then(navigate("../login", { replace: true }))
  }

  function checkImg(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  }

  // get user's journeys
  useEffect(() => {
    if (user) {
      fetch(`api/users/${user?.id}/journeys`)
        .then(response => handleServerError(response))
        .then(user_journeys => setJourneys(user_journeys))
        .catch(error => console.log(error))
    }
  }, [user]);

  // get user's challenges
  useEffect(() => {
    if (user) {
      fetch(`api/users/${user?.id}/challenges`)
        .then(response => handleServerError(response))
        .then(user_challenges => setChallenges(user_challenges))
        .catch(error => console.log(error))
    }
  }, [user]);

  return (
    <>
        <Navigation currentUser={user} handleUserLogout={handleUserLogout} />

      <Routes>
        <Route exact path="/" element={<Home user={user} handleUserLogout={handleUserLogout} journeys={journeys} challenges={challenges} />} />
        <Route exact path="/login" element={<UserAuthForm onLogin={setUser} handleServerError={handleServerError} />} />
        <Route exact path="/signup" element={<UserAuthForm onSignup={setUser} fetchUserAuth={fetchUserAuth} handleServerError={handleServerError} checkImg={checkImg} />} />

        <Route exact path="/collections" element={<BasePage user={user} handleServerError={handleServerError} />} />
        <Route path="/collections/:id" element={<BasePage handleServerError={handleServerError} />} />

        <Route exact path="/journeys" element={<BasePage user={user} journeys={journeys} setJourneys={setJourneys} handleServerError={handleServerError} />} />
        <Route path="/journeys/:id" element={<BasePage journeys={journeys} setJourneys={setJourneys} handleServerError={handleServerError} />} />

        <Route exact path="/challenges" element={<BasePage challenges={challenges} setChallenges={setChallenges} user={user} handleServerError={handleServerError} />} />
        <Route path="/challenges/:id" element={<BasePage challenges={challenges} setChallenges={setChallenges} handleServerError={handleServerError} journeys={journeys} />} />

        <Route exact path="/accounts" element={<BasePage user={user} setUser={setUser} handleServerError={handleServerError} />} />

        <Route path="/not_found" element={<PageNotFound />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

    </>

  );
}

export default App;
// export { App, ThemeContext };
