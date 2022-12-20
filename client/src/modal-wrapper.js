import Modal from 'react-bootstrap/Modal'
import CollectionModal from './collection_modal';
import JourneyCollectionEntryModal from './journey_collection_entry_modal';
import JourneyEntryModal from './journey_entry_modal';
import ChallengeModal from './challenge_modal';
// import AccountModal from './account_modal';

function ModalWrapper({ pathSlug, show, handleClose, user, setUser, handleServerError,
  // collection modal props
  collections, setCollections,
  // journey_collection_entry_modal clicked from journey props
  journeys, setJourneys, books, setBooks, formatDate,
  // journey entry progress modal props
  selectedJourney, cardAnimation, setCardAnimation, thisJourney, setThisJourney, thisJourneyEntries, setThisJourneyEntries,
  // journey_collection_entry_modal clicked from collection detail props
  setSelectedCollection, selectedCollection,
  //  if page is challenge, using this data
  challenges, setChallenges }) {

  let modalHeaderText, modalSize
  switch (show) {
    case "new-journey-modal":
      modalHeaderText = "Start a New Journey"
      modalSize = "lg"
      break;
    case "new-collection-modal":
      modalHeaderText = "Start a New Collection"
      modalSize = "lg"
      break;
    case "new-journey-entry-modal":
      modalHeaderText = "Log Journey Progress"
      modalSize = "m"
      break;
    case "new-collection-entry-modal":
      modalHeaderText = "Add Books to This Collection"
      modalSize = "lg"
      break;
    case "new-challenge-modal":
      modalHeaderText = "Start a New Challenge"
      modalSize = "lg"
      break;
    default:
      break;
  }

  return (
    <Modal show={show} onHide={() => handleClose()} dialogClassName="modal-90w" size={modalSize} centered>

      <Modal.Header className="border-0 justify-content-center mt-4">
        <h1 className="mb-3 text-center text-capitalize">{modalHeaderText}</h1>
      </Modal.Header>

      <Modal.Body>

        {show === "new-journey-modal" ? <p className="text-muted fw-semibold fs-6 text-center">Begin by searching our library and selecting your next book. Then let the literary adventure begin!</p> : <div></div>}

        {show === "new-journey-modal" ? <JourneyCollectionEntryModal show={show} handleClose={handleClose} journeys={journeys} setJourneys={setJourneys} books={books} setBooks={setBooks} user={user} formatDate={formatDate} handleServerError={handleServerError} /> : null}
        {show === "new-collection-modal" ? <CollectionModal handleClose={handleClose} collections={collections} setCollections={setCollections} user={user} handleServerError={handleServerError} /> : null}
        {show === "new-journey-entry-modal" ? <JourneyEntryModal show={show} handleClose={handleClose} journeys={journeys} setJourneys={setJourneys} selectedJourney={selectedJourney} formatDate={formatDate} setCardAnimation={setCardAnimation} thisJourney={thisJourney} setThisJourney={setThisJourney} thisJourneyEntries={thisJourneyEntries} setThisJourneyEntries={setThisJourneyEntries} handleServerError={handleServerError} /> : null}
        {show === "new-collection-entry-modal" ? <JourneyCollectionEntryModal show={show} handleClose={handleClose} journeys={journeys} setJourneys={setJourneys} books={books} setBooks={setBooks} user={user} formatDate={formatDate} setSelectedCollection={setSelectedCollection} selectedCollection={selectedCollection} collections={collections} setCollections={setCollections} handleServerError={handleServerError} /> : null}
        {show === "new-challenge-modal" ? <ChallengeModal show={show} handleClose={handleClose} challenges={challenges} setChallenges={setChallenges} collections={collections} setCollections={setCollections} formatDate={formatDate} user={user} handleServerError={handleServerError} /> : null}

      </Modal.Body>

    </Modal>
  )
}

export default ModalWrapper;