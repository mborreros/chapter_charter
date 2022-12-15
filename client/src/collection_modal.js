import { useState } from "react";

function CollectionModal({ handleClose, collections, setCollections, user }) {

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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(collectionFormValues)
    })
      .then(response => {
        response.json().then((new_collection) => setCollections([new_collection, ...collections ]))
      })

    // modal close after submit
    handleClose()
  };

  function handleCollectionInput(e) {
    collectionFormValues[e.target.name] = e.target.value;
  }

  return (
        <form id="kt_modal_new_target_form" className="form" action="submit" onSubmit={(e) => handleCollectionSubmit(e)}>

          {/* start collection name input group */}
          <div className="d-flex flex-column mt-8 mb-8 fv-row">
            {/* start label */}
            <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
              <span className="required">Collection Name</span>
              <i className="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip" title="Choose a name for your collection."></i>
            </label>
            {/* end label */}
            <input type="text" className="form-control form-control-solid" placeholder="Enter Collection Name" name="name" onChange={(e) => handleCollectionInput(e)} />
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

export default CollectionModal;