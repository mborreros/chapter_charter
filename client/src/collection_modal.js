import { useState } from "react";

function CollectionModal({ show, handleClose, collections, setCollections, user }){

  // default collection form values
  let defaultCollectionFormValues = {
    "name": "",
    "description": "",
    "user_id": null
  }

  const [collectionFormValues, setCollectionFormValues] = useState(defaultCollectionFormValues);

  function handleCollectionSubmit(e) {
    e.preventDefault()

    // setting user id on collection to post
    collectionFormValues["user_id"] = user.id

    fetch("/api/collections", {
      method: "POST",
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify(collectionFormValues)
    })
    .then(response => {
      response.json().then((new_collection) => setCollections([...collections, new_collection]))
    }) 

    // modal close after submit
    handleClose()
  };

  function handleCollectionInput(e){
    collectionFormValues[e.target.name] = e.target.value;
  }

 

  return(
    // conditial rendering based on button click to show modal 
		<div className={show ? "modal chap-charter-modal fade show" : "modal chap-charter-modal fade" } id="kt_modal_new_target" tabIndex="-1" style={show ? {display: "block"} : {display: "none"}} aria-hidden={show ? "true" : "false"} aria-modal={show ? "true" : "false"} role={show ? "dialog" : null}>

			<div className="modal-dialog modal-dialog-centered mw-650px">

      {/* start modal content */}
				<div className="modal-content rounded">
					 {/* modal header */}
					<div className="modal-header pb-0 border-0 justify-content-end">

						{/* start close button */}
						<button className="btn btn-sm btn-icon btn-active-color-primary" onClick={handleClose}>
							<span className="svg-icon svg-icon-1">
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="currentColor" />
									<rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="currentColor" />
								</svg>
							</span>
						</button>
						{/* end close button */}

					</div>

					{/* start modal body */}
					<div className="modal-body scroll-y px-10 px-lg-15 pt-0 pb-15">

						{/* start form */}
						<form id="kt_modal_new_target_form" className="form" action="submit" onSubmit={(e) => handleCollectionSubmit(e)}>
							{/* start header */}
							<div className="mb-13 text-center">
								<h1 className="mb-3">Start a new Collection</h1>
							</div>
							{/* end header */}

              {/* start collection name input group */}
							<div className="d-flex flex-column mb-8 fv-row">
								{/* start label */}
								<label className="d-flex align-items-center fs-6 fw-semibold mb-2">
									<span className="required">Collection Name</span>
									<i className="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip" title="Choose a name for your collection."></i>
								</label>
								{/* end label */}
								<input type="text" className="form-control form-control-solid" placeholder="Enter Collection Name" name="name" onChange={(e) => handleCollectionInput(e)}/>
							</div>
              {/* end collection name input group */}

							{/* start collection description input group */}
							<div className="d-flex flex-column mb-8">
                {/* start label */}
								<label className="fs-6 fw-semibold mb-2">
                  <span className="required">Collection Description</span>
                </label>
                {/* end label */}
								<textarea className="form-control form-control-solid" rows="3" name="description" placeholder="Type Collection Description" onChange={(e) => handleCollectionInput(e)}></textarea>
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
					</div>
					{/* end modal body */}
				</div>
				{/* end modal content */}
			</div>
		</div>
  )}

export default CollectionModal;