import { useState } from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function JourneyEntryModal({
  journeys, setJourneys, selectedJourney,
  setCardAnimation,
  handleClose, formatDate, handleServerError }) {

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

    fetch("/api/journey_entries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(journey_entry_body)
    })
      .then(response => handleServerError(response))
      .then((new_journey_entry) => {
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
          if (journey.id === new_journey_entry.journey.id) {
            journey.current_progress = new_journey_entry.journey.current_progress
            journey.completed = new_journey_entry.journey.completed
            journey.end_date = new_journey_entry.journey.end_date
          }
          return journey
        }
        ))
      })
      .catch(error => console.log(error))
    // card animation on progress update, not set if not on journeys page
    setCardAnimation(selectedJourney.id)
    // close modal after submisson
    handleClose()

    setTimeout(() => {
      setCardAnimation(null)
    }, 2000);
  }

  return (
    <form id="kt_modal_new_target_form" className="form" action="submit" onSubmit={(e) => handleJourneyEntrySubmit(e)}>
      {/* start collection name input group */}
      <div className="mt-8 mb-8 fv-row px-8">
        <div className="row align-items-center justify-content-center">
          <div className="col-6 text-center">
            <label className="align-items-center fs-6 fw-semibold mb-2">
              Current progress
            </label>
          </div>

          <div className="col-6">
            <InputGroup className="mb-3">
              <Form.Control readOnly className="no-pointer-event-element" placeholder="Progress" aria-label="Progress" value={selectedJourney?.current_progress} />
              <InputGroup.Text>%</InputGroup.Text>
            </InputGroup>
          </div>
        </div>

        <div className="row align-items-center justify-content-center">
          <div className="col-6 text-center">
            <label className="align-items-center fs-6 fw-semibold mb-2">
              <span>Updated progress</span>
              <i className="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip" title="update_journey_progress"></i>
            </label>
          </div>
          <div className="d-flex col-6">
            <InputGroup className="mb-3">
              <Form.Control className="form-control form-control-solid" placeholder="Progress" aria-label="Progress" type="number" min={selectedJourney?.current_progress + 1} max="100" name="journey_entry_progress" onChange={(e) => setUpdatedProgress(e.target.value)} />
              <InputGroup.Text className="border-0">%</InputGroup.Text>
            </InputGroup>
          </div>
        </div>
      </div>
      {/* end collection name input group */}

      {/* start action buttons */}
      <div className="text-end">
        <button disabled={!updatedProgress} type="submit" id="kt_modal_new_target_submit" className="btn btn-primary btn-sm">
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