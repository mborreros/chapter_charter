import { useState } from 'react';

import Modal from 'react-bootstrap/Modal'
import CollectionModal from './collection_modal';
import JourneyModal from './journey_modal';
import JourneyEntryModal from './journey_entry_modal';

function ModalWrapper({ this_page_title, show, handleClose, user,
  // collection modal props
  collections, setCollections,
  // journey modal props
  journeys, setJourneys, books, setBooks, formatDate,
  // journey entry progress modal props
  selectedJourney, cardAnimation, setCardAnimation, thisJourney, setThisJourney, thisJourneyEntries, setThisJourneyEntries }) {

  // console.log(show)

  return (
    <Modal show={show} onHide={() => handleClose()} dialogClassName="modal-90w" size="lg" centered>

      <Modal.Header className="border-0 justify-content-center">
        <h1 className="mb-3 text-center">Start a New {this_page_title.slice(0, -1)}</h1>
      </Modal.Header>

      <Modal.Body>

        {this_page_title === "Journeys" ? <p className="text-muted fw-semibold fs-6 text-center">Begin by searching our library and selecting your next book. Then let the literary adventure begin!</p> : null}

        {show === "new-journey-modal" ? <JourneyModal show={show} handleClose={handleClose} journeys={journeys} setJourneys={setJourneys} books={books} setBooks={setBooks} user={user} formatDate={formatDate} /> : null}
        {show === "new-collection-modal" ? <CollectionModal handleClose={handleClose} collections={collections} setCollections={setCollections} user={user} /> : null}
        {show === "new-journey-entry-modal" ? <JourneyEntryModal show={show} handleJourneyModalClose={handleClose} journeys={journeys} setJourneys={setJourneys} selectedJourney={selectedJourney} formatDate={formatDate} setCardAnimation={setCardAnimation} thisJourney={thisJourney} setThisJourney={setThisJourney} thisJourneyEntries={thisJourneyEntries} setThisJourneyEntries={setThisJourneyEntries} /> : null}


      </Modal.Body>

    </Modal>
  )
}

export default ModalWrapper;