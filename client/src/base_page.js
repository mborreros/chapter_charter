import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// page header contents
import HeaderContents from "./header_list_page";
// page body contents
import JourneyCards from "./journey_cards";
import CollectionCards from "./collection_cards";
import ChallengeCards from "./challenge_cards";
import JourneyDetail from "./journey_detail";
import CollectionDetail from "./collection_detail";
import ChallengeDetail from "./challenge_detail";
import Account from "./user_account";
// modal wrapper contents
import ModalWrapper from "./modal-wrapper";

function BasePage({
  user, setUser,
  journeys, setJourneys,
  challenges, setChallenges,
  handleServerError
}) {

  // getting pathname to determine which page to show
  const location = useLocation();
  const navigate = useNavigate();
  // parsing pathname to just the dynamic text for render conditional logic
  const pathSlug = location.pathname.split('/')

  const [cardAnimation, setCardAnimation] = useState(null)
  const [show, setShow] = useState(null);

  const [collections, setCollections] = useState(null);

  const [selectedJourney, setSelectedJourney] = useState(null)
  const [selectedJourneyEntries, setSelectedJourneyEntries] = useState([])
  const [selectedCollection, setSelectedCollection] = useState(null)
  const [selectedChallenge, setSelectedChallenge] = useState(null)

  // get user's collections
  useEffect(() => {
    if (user) {
      fetch(`api/users/${user?.id}/collections`)
        .then(response => handleServerError(response))
        .then(user_collections => setCollections(user_collections))
        .catch(error => console.log(error))
    }
  }, [user]);

  function formatDate(date = new Date()) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  // modal functions
  const handleClose = () => {
    // resetting state variables which control validation of react-select element 
    setShow(false);
  };

  function handleShow(e) {
    setShow(e.currentTarget.id)
  }

  // sorting and setting user selected journey for journey detail page
  function findSelectedJourney(thisPageId) {
    let currentJourneyDetails
    if (journeys) {
      currentJourneyDetails = journeys.filter(journey => journey.id == thisPageId)[0]
      setSelectedJourney(currentJourneyDetails)
      setSelectedJourneyEntries(currentJourneyDetails.journey_entries)
    }
    else
      navigate("../not_found", { replace: true })
  }

  // used on journey detail page, at this level to control journey state rendered on list_page
  function handleJourneyEntryDelete(e) {
    let journeyEntryId = e.currentTarget.id
    fetch(`/api/journey_entries/${journeyEntryId}`, {
      method: "DELETE"
    })
      .then(response => handleServerError(response))
      .then(updatedJourney => {
        let updated_journey_entries = selectedJourney.journey_entries.filter(journey_entry => journey_entry.id !== parseInt(journeyEntryId))
        selectedJourney.journey_entries = updated_journey_entries
        setJourneys(journeys.map(journey => journey.id !== updatedJourney.id ? journey : updatedJourney))
      })
      .catch(error => console.log(error))
  }

  // used on collection detail page, at this level to control collection state rendered on list_page
  function handleCollectionEntryDelete(e) {
    let bookIdForRemoval = e.currentTarget.id
    let entryToRemove = selectedCollection.collection_entries.filter(collection_entry => {
      return collection_entry.book_id == parseInt(bookIdForRemoval)
    })[0]
    console.log(entryToRemove)

    fetch(`/api/collection_entries/${entryToRemove.id}`, {
      method: "DELETE"
    })
      .then(response => handleServerError(response))
      .then(updated_collection => {
        setSelectedCollection(updated_collection)
        let revised_collection_array = collections.map(collection => collection.id == updated_collection.id ? updated_collection : collection)
        setCollections(revised_collection_array)
      })
      .catch(error => console.log(error))
  }

  function pagePath(path = pathSlug) {
    let pageTitle
    if (path[1] === "journeys") {
      pageTitle = path[2] ? "journey-detail" : "journeys"
    }
    else if (path[1] == "collections") {
      pageTitle = path[2] ? "collection-detail" : "collections"
    }
    else if (path[1] == "challenges") {
      pageTitle = path[2] ? "challenge-detail" : "challenges"
    }
    else if (path[1] == "accounts") {
      pageTitle = path[1]
    }
    return pageTitle
  }

  // conditonal page content rendering based on pathname
  let pageContent, pageTitle, buttonText
  switch (pagePath(pathSlug)) {
    case "journeys":
      pageContent = <JourneyCards journeys={journeys} setJourneys={setJourneys} selectedJourney={selectedJourney} setSelectedJourney={setSelectedJourney} formatDate={formatDate} show={show} handleClose={handleClose} handleShow={handleShow} cardAnimation={cardAnimation} />
      pageTitle = "Journeys"
      buttonText = "Start a new Journey"
      break;
    case "journey-detail":
      pageContent = <JourneyDetail journeys={journeys} setJourneys={setJourneys} handleShow={handleShow} selectedJourney={selectedJourney} handleJourneyEntryDelete={handleJourneyEntryDelete} findSelectedJourney={findSelectedJourney} handleServerError={handleServerError} />
      pageTitle = selectedJourney?.book.title + " Journey"
      buttonText = "Add Reading Journey Progress"
      break;
    case "collections":
      pageContent = <CollectionCards collections={collections} setCollections={setCollections} show={show} handleClose={handleClose} />
      pageTitle = "Collections"
      buttonText = "Start a new Collection"
      break;
    case "collection-detail":
      pageContent = <CollectionDetail selectedCollection={selectedCollection} setSelectedCollection={setSelectedCollection} collections={collections} setCollections={setCollections} handleCollectionEntryDelete={handleCollectionEntryDelete} handleServerError={handleServerError} />
      pageTitle = selectedCollection?.name + " Collection"
      buttonText = "Add Books to this Collection"
      break;
    case "challenges":
      pageContent = <ChallengeCards challenges={challenges} setChallenges={setChallenges} formatDate={formatDate} user={user} handleServerError={handleServerError} />
      pageTitle = "Challenges"
      buttonText = "Start a new Challenge"
      break;
    case "challenge-detail":
      pageContent = <ChallengeDetail selectedChallenge={selectedChallenge} setSelectedChallenge={setSelectedChallenge} challenges={challenges} setChallenges={setChallenges} collections={collections} setCollections={setCollections} handleServerError={handleServerError} />
      pageTitle = selectedChallenge?.name + " Challenge"
      buttonText = "This button needs to be removed"
      break;
    case "accounts":
      pageContent = <Account user={user} setUser={setUser} handleServerError={handleServerError} />
      pageTitle = user?.screenname + "'s Account"
      buttonText = "Edit Account Details"
      break;
    default:
      break;
  }

  return (
    <div className="d-flex flex-column flex-root app-root" id="kt_app_root">
      <div className="app-page flex-column flex-column-fluid" id="kt_app_page">
        <div className="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper">
          <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
            <div className="d-flex flex-column flex-column-fluid">

              <HeaderContents pageName={pathSlug} handleShow={handleShow} journeyDetail={selectedJourney} collectionDetail={selectedCollection} pageTitle={pageTitle} buttonText={buttonText} handleServerError={handleServerError} />

              <div id="kt_app_content" className="app-content flex-column-fluid">
                <div id="kt_app_content_container" className="app-container container-xxl">
                  <div className="row g-5 g-xl-10 mb-5 mb-xl-10 align-items-stretch">

                    {pageContent}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ModalWrapper
        user={user} show={show} handleClose={handleClose} handleServerError={handleServerError} formatDate={formatDate}
        // if page is collection, using this data
        collections={collections} setCollections={setCollections}
        // if page is journey, using this data
        journeys={journeys} setJourneys={setJourneys} 
        // if click is journey entry progress, using this data
        selectedJourney={selectedJourney} setCardAnimation={setCardAnimation} selectedJourneyEntries={selectedJourneyEntries}
        // if click is add book(s) to colelction, using this data
        setSelectedCollection={setSelectedCollection} selectedCollection={selectedCollection}
        //  if page is challenge, using this data
        challenges={challenges} setChallenges={setChallenges}
      />

      <Toaster />

    </div>
  );
}

export default BasePage;