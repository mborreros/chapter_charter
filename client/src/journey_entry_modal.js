import { useEffect, useState } from "react";
// import Modal from 'react-bootstrap/Modal'

function JourneyEntryModal({ handleClose, journeys, setJourneys, selectedJourney, formatDate, setCardAnimation, selectedJourneyEntries }) {

  const [updatedProgress, setUpdatedProgress] = useState(null)

  let journey_entry_body
  function handleJourneyEntrySubmit(e) {
    e.preventDefault()
    // format POST request body
    journey_entry_body = {
      "journey_id": selectedJourney.id,
      "date": formatDate(),
      "progress": parseInt(updatedProgress)
    }
    // send POST request to journey entry submission
    fetch("/api/journey_entries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(journey_entry_body)
    })
      .then(response => {
        if (response.ok) {
          response.json().then((new_journey_entry) => {
              // setting state for journey_entries
              let this_new_entry = {}
              this_new_entry = {
                id: new_journey_entry.id,
                date: new_journey_entry.date,
                progress: new_journey_entry.progress,
                created_at: new_journey_entry.created_at
              }
              selectedJourney.journey_entries.unshift(this_new_entry)
            // updating progress value on user updated journey based on id from POST request
            setJourneys(journeys.map(journey => {
              if (journey.id == new_journey_entry.journey.id) {
                journey.current_progress = new_journey_entry.progress
              }
              return journey
            }
            ))
          })
        } else {
          response.json().then((errors) => console.log(errors))
        }
      })

    // card animation on progress update, not set if not on journeys page
    selectedJourneyEntries ? handleClose() : setCardAnimation(selectedJourney.id)

    // close modal after submisson
    handleClose()

    setTimeout(() => {
      setCardAnimation(null)
    }, 2000);
  }

  return (
        <form id="kt_modal_new_target_form" className="form" action="submit" onSubmit={(e) => handleJourneyEntrySubmit(e)}>
          {/* start collection name input group */}
          <div className="d-flex mt-8 mb-8 fv-row">
            <label className="col-5 d-flex align-items-center fs-6 fw-semibold mb-2">
              Last logged progress: {selectedJourney?.current_progress}%
            </label>
            {/* <span className="col-4 fs-6 fw-semibold"></span> */}
            {/* start label */}
            <label className="align-items-center fs-6 fw-semibold mb-2">
              <span className="required">Updated Progress</span>
              <i className="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip" title="update_journey_progress"></i>
            </label>
            {/* end label */}
            <input type="number" min={selectedJourney?.current_progress + 1} max="100" className="form-control form-control-solid" placeholder="Progress %" name="journey_entry_progress" onChange={(e) => setUpdatedProgress(e.target.value)} />
          </div>
          {/* end collection name input group */}

          {/* start action buttons */}
          <div className="text-end">
            {/* <button type="reset" id="kt_modal_new_target_cancel" className="btn btn-light btn-sm me-3">Clear</button> */}
            <button type="submit" id="kt_modal_new_target_submit" className="btn btn-primary btn-sm">
              <span className="indicator-label">Submit</span>
              <span className="indicator-progress">Please wait...
                <span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
            </button>
          </div>
          {/* end action buttons */}
        </form>
  )
}

export default JourneyEntryModal;