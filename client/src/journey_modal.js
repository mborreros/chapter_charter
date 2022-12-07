import { useState } from "react";
import Modal from 'react-bootstrap/Modal'

import BookSearch from "./book_select_search";

function JourneyModal({ show, handleClose, user }) {

  const [selectedValue, setSelectedValue] = useState(null);

  function resetModalForm(form) {
    // reset(form)
    document.getElementById("book-searh-form").reset()
    setSelectedValue("")
  }

  return(
  <Modal show={show} onHide={() => handleClose()} dialogClassName="modal-90w" centered size="lg">
	
				{/* start modal content */}
					<Modal.Body>
	
							{/* start form */}
							<form id="book-searh-form" className="form" action="submit" autoComplete="off">
	
								{/* start header */}
								<Modal.Header className="border-0 justify-content-center flex-wrap">
									<h1 className="mb-3 text-center">Start a new Reading Journey</h1>
                  <p className="text-muted fw-semibold fs-6 text-center">Begin by searching our library and selecting your next book. Then let the literary adventure begin!</p>
								</Modal.Header>
								{/* end header */}
	
								<div className="d-flex flex-column mt-8 mb-8 fv-row">

                  <BookSearch selectedValue={selectedValue} setSelectedValue={setSelectedValue}/>

								</div>

								{/* start action buttons */}
								<div className="text-end">
									<button type="reset" id="kt_modal_new_target_cancel" className="btn btn-light btn-sm me-3" onClick={(form) => resetModalForm(form)}>Clear</button>
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

export default JourneyModal