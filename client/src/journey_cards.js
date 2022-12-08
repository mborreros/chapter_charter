import defaultBook from "./imgs/generic_book.png";

import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useState } from "react";
import { Link } from "react-router-dom";

import JourneyEntryModal from "./journey_entry_modal";

function JourneyCards({ journeys, setJourneys, formatDate }) {

  // adding font awesome icons to library for use in html
  library.add(faPenToSquare);

  const [showJourneyModal, setShowJourneyModal] = useState(null)
  const [selectedJourney, setSelectedJourney] = useState(null)
  const [cardAnimation, setCardAnimation] = useState(null)

  function handleJourneyModalClose() {
    setShowJourneyModal(null)
  }

  let this_journey
  function handleJourneyEdit(e) {
    setShowJourneyModal(e.currentTarget.id)
    this_journey = journeys.filter(journey => journey.id == e.currentTarget.id)
    setSelectedJourney(this_journey[0])
  }

  return (journeys?.map((journey) => {

    // establishes class to define card color based on journey progress
    let card_progress_color
    if (journey.current_progress === 0) {
      card_progress_color = "card-flush-unstarted"
    }
    if (journey.current_progress > 0) {
      card_progress_color = "card-flush-in-progress"
    }
    if (journey.current_progress === 100) {
      card_progress_color = "card-flush-completed"
    }

    // console.log(journey)

    return (
      <div className="col-md-6 mb-md-5 mb-xl-10" key={journey.id}>
        <div className={'journey-card card bgi-no-repeat bgi-size-contain bgi-position-x-end mb-xl-10 ' + card_progress_color + (cardAnimation == journey.id ? " progress-animation" : "")}>
          <div className="card-header pt-5 align-items-start flex-nowrap">
            {/* book cover */}
            <div className="card-title col-3 book-cover-image flex-column">
              <img src={journey.book.cover_img ? journey.book.cover_img : defaultBook} alt={journey.book.title + ' book cover'}></img>
            </div>
            {/* book cover end */}
            <div className="card-title col-9 flex-column align-items-end ">
              <Link to={`/journeys/${journey.id}`} state={{ journey }}><span className="fs-2hx fw-bold text-white lh-1 ls-n2">{journey.book.title}</span></Link>
              <span className="text-white opacity-75 pt-1 fw-semibold fs-6">{journey.book.author}</span>
              <span className="journey-card-genres text-white opacity-75 pt-1 text-end fw-semibold fs-6 text-lowercase">{journey.book.genre?.join(" / ")}</span>
            </div>
          </div>
          <div className="card-body d-flex align-items-end pt-0">
            <div className="d-flex align-items-center flex-column mt-3 w-100">
              <div className="d-flex justify-content-between fw-bold fs-6 text-white opacity-75 w-100 mt-auto mb-1">
                <span>{journey.start_date}</span>
                <span>{journey.book.length + ' pages'} | {journey.current_progress + '% completed'}
                  {journey.current_progress < 100 ?
                    <button id={journey.id} className="btn btn-sm px-2 py-0 add-journey-entry-button mb-1" onClick={handleJourneyEdit}>
                      <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                    </button> :
                    null}
                </span>
              </div>

              {/* progress bar */}
              <div className="h-8px mx-3 w-100 bg-white bg-opacity-50 rounded">
                {/* define width by adding class name w-% <- percentage as an integer */}
                <div className="bg-white bg-opacity-100 rounded h-8px" style={{ width: journey.current_progress + '%' }} role="progressbar"
                  aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              {/* progress bar end */}
            </div>
          </div>
        </div>
        <JourneyEntryModal showJourneyModal={showJourneyModal} handleJourneyModalClose={handleJourneyModalClose} journeys={journeys} setJourneys={setJourneys} selectedJourney={selectedJourney} formatDate={formatDate} setCardAnimation={setCardAnimation} />
      </div>
    )
  }))


}
export default JourneyCards