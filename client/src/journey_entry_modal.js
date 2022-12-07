import { useState } from "react";
import Modal from 'react-bootstrap/Modal'

function JourneyEntryModal({ showJourneyModal, handleJourneyModalClose }){

  return(
  <Modal show={showJourneyModal} onHide={() => handleJourneyModalClose()} dialogClassName="modal-90w" centered>
    {/* start modal content */}
    <Modal.Body>

      {/* start form */}
      <form id="kt_modal_new_target_form" className="form" action="submit" onSubmit={(e) => console.log(e)}>

        {/* start header */}
        <Modal.Header className="border-0 justify-content-center">
          <h1 className="mb-3 text-center">Journey {showJourneyModal} Entry</h1>
        </Modal.Header>
        {/* end header */}

        {/* start collection name input group */}
        <div className="d-flex flex-column mt-8 mb-8 fv-row">
          {/* start label */}
          <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
            <span className="required">Collection Name</span>
            <i className="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip" title="Choose a name for your collection."></i>
          </label>
          {/* end label */}
          <input type="text" className="form-control form-control-solid" placeholder="Enter Collection Name" name="name" onChange={(e) => console.log(e)} />
        </div>
        {/* end collection name input group */}

        {/* start collection description input group */}
        <div className="d-flex flex-column mb-8">
          {/* start label */}
          <label className="fs-6 fw-semibold mb-2">
            <span className="required">Collection Description</span>
          </label>
          {/* end label */}
          <textarea className="form-control form-control-solid" rows="3" name="description" placeholder="Type Collection Description" onChange={(e) => console.log(e)}></textarea>
        </div>
        {/* end collection description input group */}

        {/* start action buttons */}
        <div className="text-end">
          <button type="reset" id="kt_modal_new_target_cancel" className="btn btn-light btn-sm me-3">Clear</button>
          <button type="submit" id="kt_modal_new_target_submit" className="btn btn-primary btn-sm">
            <span className="indicator-label">Submit</span>
            <span className="indicator-progress">Please wait...
              <span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
          </button>
        </div>
        {/* end action buttons */}

      </form>
      {/* end form */}
    </Modal.Body>
    {/* end modal body */}
    {/* end modal content */}
  </Modal>
  )
}

export default JourneyEntryModal;