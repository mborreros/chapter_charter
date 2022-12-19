import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Routes, Route } from "react-router-dom";
import toast from 'react-hot-toast';

import Home from './home';
import UserAuthForm from './user_auth_form';
import ListPage from './list_page';
import Navigation from './navigation';

function App() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [journeys, setJourneys] = useState(null);
  const [collections, setCollections] = useState(null);
  const [challenges, setChallenges] = useState(null);
  const [books, setBooks] = useState(null);

  const [selectedJourney, setSelectedJourney] = useState(null)

  // handles server errors shown to user in toasts throughout the application
  function handleServerError(response) {
    // console.log("in error handle function")
    let statusMessage = response.status + ": " + response.statusText
    if (!response.ok) {
      toast.error("There was an error with the request \n" + statusMessage)
      throw Error(statusMessage)
    }
    else {
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

  // get user's journeys
  useEffect(() => {
    if (user) {
      fetch(`api/users/${user?.id}/journeys`)
        .then(response => handleServerError(response))
        .then(user_journeys => setJourneys(user_journeys))
        .catch(error => console.log(error))
    }
  }, [user]);

  // get user's collections
  useEffect(() => {
    if (user) {
      fetch(`api/users/${user?.id}/collections`)
        .then(response => handleServerError(response))
        .then(user_collections => setCollections(user_collections))
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

  //  get all books in db
  useEffect(() => {
    if (user) {
      fetch(`api/books`)
        .then(response => handleServerError(response))
        .then((db_books) => setBooks(db_books))
        .catch(error => console.log(error))
    }
  }, [user]);

  function formatDate(date = new Date()) {
    // let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  // list-page modal functions and variables
  const [show, setShow] = useState(null);
  const handleClose = () => {
    // resetting state variables which control validation of react-select element 
    setShow(false);
  };

  function handleShow(e) {
    setShow(e.currentTarget.id)
  }

  return (
    <>
      <Navigation currentUser={user} handleUserLogout={handleUserLogout} />

      <Routes>
        <Route exact path="/" element={<Home user={user} handleUserLogout={handleUserLogout} />} />
        <Route exact path="/login" element={<UserAuthForm onLogin={setUser} handleServerError={handleServerError} />} />
        <Route exact path="/signup" element={<UserAuthForm onSignup={setUser} fetchUserAuth={fetchUserAuth} handleServerError={handleServerError} />} />

        <Route exact path="/collections" element={<ListPage collections={collections} setCollections={setCollections} user={user} show={show} handleClose={handleClose} handleShow={handleShow} handleServerError={handleServerError}/>} />
        <Route path="/collections/:id" element={<ListPage books={books} setBooks={setBooks} handleShow={handleShow} show={show} handleClose={handleClose} collections={collections} setCollections={setCollections} handleServerError={handleServerError}/>} />

        <Route exact path="/journeys" element={<ListPage journeys={journeys} setJourneys={setJourneys} books={books} setBooks={setBooks} selectedJourney={selectedJourney} setSelectedJourney={setSelectedJourney} user={user} formatDate={formatDate} show={show} handleClose={handleClose} handleShow={handleShow} handleServerError={handleServerError}/>} />
        <Route path="/journeys/:id" element={<ListPage journeys={journeys} setJourneys={setJourneys} selectedJourney={selectedJourney} setSelectedJourney={setSelectedJourney} formatDate={formatDate} show={show} handleClose={handleClose} handleShow={handleShow} handleServerError={handleServerError}/>} />

        <Route exact path="/challenges" element={<ListPage challenges={challenges} setChallenges={setChallenges} collections={collections} setCollections={setCollections} handleShow={handleShow} show={show} handleClose={handleClose} formatDate={formatDate} user={user} handleServerError={handleServerError} />} />
        <Route path="/challenges/:id" element={<ListPage challenges={challenges} setChallenges={setChallenges} handleShow={handleShow} show={show} handleClose={handleClose} collections={collections} setCollections={setCollections} handleServerError={handleServerError} /> }/>

        <Route exact path="/accounts" element={<ListPage user={user} setUser={setUser} handleShow={handleShow} show={show} handleClose={handleClose} handleServerError={handleServerError}/>} />
      </Routes>

    </>

  );
}

export default App;
