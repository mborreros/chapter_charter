import { useState } from "react";
import { useLocation } from 'react-router-dom';
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

function ListPage({ journeys, setJourneys, books, setBooks, collections, setCollections, challenges, setChallenges, user, setUser, formatDate, show, handleClose, handleShow, selectedJourney, setSelectedJourney, handleServerError, checkImg }) {

  // getting pathname to determine which page to show
  const location = useLocation();
  // parsing pathname to just the dynamic text for render conditional logic
  const pathSlug = location.pathname.split('/')

  const [cardAnimation, setCardAnimation] = useState(null)
  const [selectedJourneyEntries, setSelectedJourneyEntries] = useState([])
  const [selectedCollection, setSelectedCollection] = useState(null)
  const [selectedChallenge, setSelectedChallenge] = useState(null)

  // sorting and setting user selected journey for journey detail page
  function findSelectedJourney(thisPageId) {
    let currentJourneyDetails = journeys.filter(journey => journey.id == thisPageId)[0]
    setSelectedJourney(currentJourneyDetails)
    setSelectedJourneyEntries(currentJourneyDetails.journey_entries)
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
    let entryToRemove = selectedCollection.collection_entries.filter(collection_entry => collection_entry.book_id == bookIdForRemoval)[0]

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
      pageContent = <JourneyDetail journeys={journeys} setJourneys={setJourneys} setSelectedJourney={setSelectedJourney} handleShow={handleShow} selectedJourney={selectedJourney} handleJourneyEntryDelete={handleJourneyEntryDelete} setThisJourney={setSelectedJourney} selectedJourneyEntries={selectedJourneyEntries} setThisJourneyEntries={setSelectedJourneyEntries} findSelectedJourney={findSelectedJourney} handleServerError={handleServerError} />
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
      pageContent = <ChallengeCards challenges={challenges} setChallenges={setChallenges} formatDate={formatDate} user={user} handleServerError={handleServerError}/>
      pageTitle = "Challenges"
      buttonText = "Start a new Challenge"
      break;
    case "challenge-detail":
      pageContent = <ChallengeDetail selectedChallenge={selectedChallenge} setSelectedChallenge={setSelectedChallenge} challenges={challenges} setChallenges={setChallenges} collections={collections} setCollections={setCollections} handleServerError={handleServerError} formatDate={formatDate}/>
      pageTitle = selectedChallenge?.name + " Challenge"
      buttonText = "This button needs to be removed"
      break;
    case "accounts":
      pageContent = <Account user={user} setUser={setUser} handleServerError={handleServerError} checkImg={checkImg} />
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
        pathSlug={pathSlug} show={show} handleClose={handleClose} handleServerError={handleServerError}
        // if page is collection, using this data
        collections={collections} setCollections={setCollections} user={user} setUser={setUser}
        // if page is journey, using this data
        journeys={journeys} setJourneys={setJourneys} books={books} setBooks={setBooks} formatDate={formatDate}
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

export default ListPage;