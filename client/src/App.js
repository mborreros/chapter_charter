import { useState, useEffect } from "react";

import Home from './home';
import UserAuthForm from './user_auth_form';
import ListPage from './list_page';
import Statistics from './statistics';
import Navigation from './navigation';
import Account from './user_account';
import { Routes, Route } from "react-router-dom";

function App() {

  const [user, setUser] = useState(null);
  const [journeys, setJourneys] = useState(null);
  const [collections, setCollections] = useState(null);
  const [challenges, setChallenges] = useState(null);

  useEffect(() => {
    fetch("/auth").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user))
      }
    })
  }, []);

  // get user's journeys
  useEffect(() => {
    if (user){
      fetch(`api/users/${user?.id}/journeys`).then((response) => {
        if (response.ok) {
          response.json().then((user_journeys) => setJourneys(user_journeys))
        }
      })
    }}, [user]);

    // get user's collections
    useEffect(() => {
      if (user){
        fetch(`api/users/${user?.id}/collections`).then((response) => {
          if (response.ok) {
            response.json().then((user_collections) => setCollections(user_collections))
          }
        })
      }}, [user]);
    
    // get user's challenges
    useEffect(() => {
      if (user){
        fetch(`api/users/${user?.id}/challenges`).then((response) => {
          if (response.ok) {
            response.json().then((user_challenges) => setChallenges(user_challenges))
          }
        })
      }}, [user]);

  return (
    <>
    <Navigation currentUser={user}/>
    <Routes>
      
      {/* today's focus -> page for user login */}
      <Route exact path="/" element={ <Home user={user} onLogout={setUser}/> } />
      <Route exact path="/login" element={ <UserAuthForm onLogin={setUser} /> } />
      <Route exact path="/signup" element={ <UserAuthForm  onSignup={setUser} /> } />

      {/* dummy pages */}
      <Route path="/collections" element={ <ListPage collections={collections} setCollections={setCollections} user={user} /> } />
      <Route path="/journeys" element={ <ListPage journeys={journeys} /> } />
      <Route path="/challenges" element={ <ListPage challenges={challenges}/> } />
      <Route path="/statistics" element={ <Statistics /> } />
      <Route path="/account" element={ <Account /> } />
    </Routes>


	{/* <div className="d-flex flex-column flex-root app-root" id="kt_app_root">
  <div className="app-page flex-column flex-column-fluid" id="kt_app_page">
    
    <div className="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper">
      <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
        <div className="d-flex flex-column flex-column-fluid">
          <div id="kt_app_toolbar" className="app-toolbar py-3 py-lg-6">
            <div id="kt_app_toolbar_container" className="app-container container-xxl d-flex flex-stack">
              <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                <h1 className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">Light
                  Header</h1>
                <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
                  <li className="breadcrumb-item text-muted">
                    <a href="../../demo1/dist/index.html" className="text-muted text-hover-primary">Home</a>
                  </li>
                  <li className="breadcrumb-item">
                    <span className="bullet bg-gray-400 w-5px h-2px"></span>
                  </li>
                  <li className="breadcrumb-item text-muted">Layout Options</li>
                </ul>
              </div>
              <div className="d-flex align-items-center gap-2 gap-lg-3">
                <a href="#top" className="btn btn-sm fw-bold btn-primary" data-bs-toggle="modal"
                  data-bs-target="#kt_modal_create_app">Create</a>
              </div>
            </div>
          </div>
          <div id="kt_app_content" className="app-content flex-column-fluid">
            <div id="kt_app_content_container" className="app-container container-xxl">

              <div className="row g-5 g-xl-10 mb-5 mb-xl-10">

                <div className="col-md-6 mb-md-5 mb-xl-10">
                  <div className="card card-flush bgi-no-repeat bgi-size-contain bgi-position-x-end h-md-50 mb-5 mb-xl-10">
                    <div className="card-header pt-5">
                      <div className="card-title d-flex flex-column">
                        <span className="fs-2hx fw-bold text-white me-2 lh-1 ls-n2">69</span>
                        <span className="text-white opacity-75 pt-1 fw-semibold fs-6">Active Projects</span>
                      </div>
                    </div>
                    <div className="card-body d-flex align-items-end pt-0">
                      <div className="d-flex align-items-center flex-column mt-3 w-100">
                        <div
                          className="d-flex justify-content-between fw-bold fs-6 text-white opacity-75 w-100 mt-auto mb-2">
                          <span>43 Pending</span>
                          <span>72%</span>
                        </div>
                        <div className="h-8px mx-3 w-100 bg-white bg-opacity-50 rounded">
                          <div className="bg-white rounded h-8px" role="progressbar"
                            aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card card-flush h-md-50 mb-5 mb-xl-10">
                    <div className="card-header pt-5">
                      
                    </div>
                    <div className="card-body d-flex flex-column justify-content-end pe-0">
                     
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
        <div id="kt_app_footer" className="app-footer">
          <div className="app-container container-xxl d-flex flex-column flex-md-row flex-center flex-md-stack py-3">
            <div className="text-dark order-2 order-md-1">
              <span className="text-muted fw-semibold me-1">2022&copy;</span>
              <a href="#top" className="text-gray-800 text-hover-primary">Keenthemes</a>
            </div>
            <ul className="menu menu-gray-600 menu-hover-primary fw-semibold order-1">
              <li className="menu-item">
                <a href="#top" className="menu-link px-2">About</a>
              </li>
              <li className="menu-item">
                <a href="#top" className="menu-link px-2">Support</a>
              </li>
              <li className="menu-item">
                <a href="#top" className="menu-link px-2">Purchase</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div> */}

{/* <div id="kt_scrolltop" className="scrolltop">
  <span className="svg-icon">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect opacity="0.5" x="13" y="6" width="13" height="2" rx="1" transform="rotate(90 13 6)" fill="currentColor" />
      <path
        d="M12.5657 8.56569L16.75 12.75C17.1642 13.1642 17.8358 13.1642 18.25 12.75C18.6642 12.3358 18.6642 11.6642 18.25 11.25L12.7071 5.70711C12.3166 5.31658 11.6834 5.31658 11.2929 5.70711L5.75 11.25C5.33579 11.6642 5.33579 12.3358 5.75 12.75C6.16421 13.1642 6.83579 13.1642 7.25 12.75L11.4343 8.56569C11.7467 8.25327 12.2533 8.25327 12.5657 8.56569Z"
        fill="currentColor" />
    </svg>
  </span>
</div> */}
</>

  );
}

export default App;
