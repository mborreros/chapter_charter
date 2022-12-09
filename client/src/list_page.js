import { useState } from "react";
import { useLocation } from 'react-router-dom';

import JourneyCards from "./journey_cards";
import CollectionCards from "./collection_cards";
import ChallengeCards from "./challenge_cards";

import CollectionModal from "./collection_modal";
import JourneyModal from "./journey_modal";

function ListPage({ journeys, setJourneys, books, setBooks, collections, setCollections, challenges, user, formatDate }) {
  
  // getting pathname to determine which page to show
  const location = useLocation();
  // capitalize page name
  const this_page_title = location.pathname.substring(1).charAt(0).toUpperCase() + location.pathname.substring(1).slice(1)

  // modal functions and variables
  const [show, setShow] = useState(false);
  const handleClose = () => {
    // resetting state variables which control validation of react-select element 
    setShow(false);
  };
  const handleShow = () => setShow(true);

  return(
      <div className="d-flex flex-column flex-root app-root" id="kt_app_root">
        <div className="app-page flex-column flex-column-fluid" id="kt_app_page">
          <div className="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper">
            <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
              <div className="d-flex flex-column flex-column-fluid">
                <div id="kt_app_toolbar" className="app-toolbar py-3 py-lg-6">
                  <div id="kt_app_toolbar_container" className="app-container container-xxl d-flex flex-stack">
                    {/* page title */}
                    <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                    <h1>{this_page_title}</h1>
                    </div>
                    {/* page title end */}

                    {/* add a *pathname* button */}
                    <div className="d-flex align-items-center gap-2 gap-lg-3">
                      <button className="btn btn-sm fw-bold btn-primary" data-bs-toggle="modal"
                        data-bs-target="#kt_modal_create_app" onClick={handleShow}>Start a new {this_page_title.slice(0, -1)}</button>
                    </div>

                    {/* add a *pathname* button end */}

                  </div>
                </div>
                <div id="kt_app_content" className="app-content flex-column-fluid">
                  <div id="kt_app_content_container" className="app-container container-xxl">
                    <div className="row g-5 g-xl-10 mb-5 mb-xl-10 align-items-stretch">

                      {/* start conditional card rendering based on pathname */}
                        { this_page_title === "Journeys" ? <JourneyCards journeys={journeys} setJourneys={setJourneys} formatDate={formatDate} /> : null }
                        { this_page_title === "Collections" ? <CollectionCards collections={collections} setCollections={setCollections} /> : null } 
                        { this_page_title === "Challenges" ? <ChallengeCards challenges={challenges}/> : null } 
                      {/* end conditional card rendering based on pathname */}

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

      { this_page_title === "Collections" ? <CollectionModal show={show} handleClose={handleClose} collections={collections} setCollections={setCollections} user={user} /> : null } 
      { this_page_title === "Journeys" ? <JourneyModal show={show} handleClose={handleClose} journeys={journeys} setJourneys={setJourneys} books={books} setBooks={setBooks}  user={user} formatDate={formatDate}/> : null } 

      </div>
  );
}

export default ListPage;