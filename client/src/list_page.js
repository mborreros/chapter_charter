import { useState } from "react";
import { useLocation, useParams } from 'react-router-dom';

import JourneyCards from "./journey_cards";
import CollectionCards from "./collection_cards";
import ChallengeCards from "./challenge_cards";
import JourneyDetail from "./journey_detail";

// import CollectionModal from "./collection_modal";
// import JourneyModal from "./journey_modal";
import ModalWrapper from "./modal-wrapper";

function ListPage({ journeys, setJourneys, books, setBooks, collections, setCollections, challenges, user, formatDate, show, handleClose, handleShow, selectedJourney, setSelectedJourney }) {

  // getting pathname to determine which page to show
  const location = useLocation();
  // capitalize page name
  const this_page_title = location.pathname.substring(1).charAt(0).toUpperCase() + location.pathname.substring(1).slice(1)

  const pathSlug = location.pathname.split('/')

  const pageParams = useParams();

  // modal functions and variables
  // const [show, setShow] = useState(false);
  // const handleClose = () => {
  //   // resetting state variables which control validation of react-select element 
  //   setShow(false);
  // };
  // const handleShow = () => setShow(true);

  // const [selectedJourney, setSelectedJourney] = useState(null)

  const [cardAnimation, setCardAnimation] = useState(null)

  const [thisJourney, setThisJourney] = useState(null)
  const [thisJourneyEntries, setThisJourneyEntries] = useState(null)

  let pageContent

  if (pathSlug[1] === "journeys") {
    if (pathSlug.length >2) {
      pageContent = <JourneyDetail journeys={journeys} setJourneys={setJourneys} selectedJourney={selectedJourney} setSelectedJourney={setSelectedJourney} formatDate={formatDate} show={show} handleClose={handleClose} handleShow={handleShow} thisJourney={thisJourney} setThisJourney={setThisJourney} thisJourneyEntries={thisJourneyEntries} setThisJourneyEntries={setThisJourneyEntries} />
    }
    else {
      pageContent = <JourneyCards journeys={journeys} setJourneys={setJourneys} selectedJourney={selectedJourney} setSelectedJourney={setSelectedJourney} formatDate={formatDate} show={show} handleClose={handleClose} handleShow={handleShow} cardAnimation={cardAnimation} />
    }
  }
  else if (pathSlug[1] === "collections") {
    pageContent = <CollectionCards collections={collections} setCollections={setCollections} show={show} handleClose={handleClose} />
  }
  else if (pathSlug[1] === "challenges") {
    pageContent = <ChallengeCards challenges={challenges} />
  }

  // console.log(location)

  return (
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
                    <button className="btn btn-sm fw-bold btn-primary" data-bs-toggle="modal" id={"new-" + this_page_title.slice(0, -1).toLowerCase() + "-modal"}
                      data-bs-target="#kt_modal_create_app" onClick={(e) => handleShow(e)}>Start a new {this_page_title.slice(0, -1)}</button>
                  </div>

                  {/* add a *pathname* button end */}

                </div>
              </div>
              <div id="kt_app_content" className="app-content flex-column-fluid">
                <div id="kt_app_content_container" className="app-container container-xxl">
                  <div className="row g-5 g-xl-10 mb-5 mb-xl-10 align-items-stretch">

                    {/* start conditional card rendering based on pathname */}
                    {pageContent}
                    {/* { this_page_title === "Journeys" ? <JourneyCards journeys={journeys} setJourneys={setJourneys} selectedJourney={selectedJourney} setSelectedJourney={setSelectedJourney} formatDate={formatDate} show={show} handleClose={handleClose} handleShow={handleShow} cardAnimation={cardAnimation} /> : null }
                        { this_page_title === "Collections" ? <CollectionCards collections={collections} setCollections={setCollections} show={show} handleClose={handleClose} /> : null } 
                        { this_page_title === "Challenges" ? <ChallengeCards challenges={challenges}/> : null }  */}
                    {/* end conditional card rendering based on pathname */}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* { this_page_title === "Collections" ? <CollectionModal show={show} handleClose={handleClose} collections={collections} setCollections={setCollections} user={user} /> : null }  */}
      {/* { this_page_title === "Journeys" ? <JourneyModal show={show} handleClose={handleClose} journeys={journeys} setJourneys={setJourneys} books={books} setBooks={setBooks}  user={user} formatDate={formatDate}/> : null }  */}
      <ModalWrapper
        this_page_title={this_page_title} show={show} handleClose={handleClose}
        // if page is collection, using this data
        collections={collections} setCollections={setCollections} user={user}
        // if page is journey, using this data
        journeys={journeys} setJourneys={setJourneys} books={books} setBooks={setBooks} formatDate={formatDate}
        // if click is journey entry progress, using this data
        selectedJourney={selectedJourney} cardAnimation={cardAnimation} setCardAnimation={setCardAnimation} thisJourney={thisJourney} setThisJourney={setThisJourney} thisJourneyEntries={thisJourneyEntries} setThisJourneyEntries={setThisJourneyEntries}
      />

    </div>
  );
}

export default ListPage;