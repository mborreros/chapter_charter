import { useForm } from "react-hook-form";

function CollectionModal({
  user,
  collections, setCollections,
  handleClose, handleServerError }) {

  // form error handling functions and variables
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      description: "",
      user_id: ""
    }
  });

  function handleCollectionSubmit(data) {
    // setting user id on collection to post
    data["user_id"] = user.id

    fetch("/api/collections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(response => handleServerError(response))
      .then((new_collection) => {
        setCollections([new_collection, ...collections])
        handleClose()
      })
      .catch(error => console.log(error))
  };

  return (
    <form id="kt_modal_new_target_form" className="form" action="submit" onSubmit={handleSubmit(handleCollectionSubmit)}>

      {/* start collection name input group */}
      <div className="d-flex flex-column mt-8 mb-8 fv-row">
        <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
          <span className="required">Collection Name</span>
        </label>
        <input {...register("name", { required: true })} autoComplete="off" type="text" className={"form-control form-control-solid " + (errors.name ? "is-invalid" : "")} placeholder="Enter Collection Name" />
        {errors.name && <p className="text-danger">Name is required</p>}
      </div>
      {/* end collection name input group */}

      {/* start collection description input group */}
      <div className="d-flex flex-column mb-8">
        <label className="fs-6 fw-semibold mb-2">
          <span className="required">Collection Description</span>
        </label>
        <textarea {...register("description", { required: true })} className={"form-control form-control-solid " + (errors.description ? "is-invalid" : "")} rows="3" placeholder="Type Collection Description" ></textarea>
        {errors.description && <p className="text-danger">Description is required</p>}
      </div>
      {/* end collection description input group */}

      {/* start action buttons */}
      <div className="text-end">
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