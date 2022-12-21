import { useState, useRef, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Flatpickr from "react-flatpickr";

import AuthorSearch from "./author_select_search";
import ToolTip from "./tool_tip";

function ChallengeModal({ handleClose, challenges, setChallenges, collections, user, formatDate, setCollections, handleServerError }) {

  const [authorsLoading, setAuthorsLoading] = useState(false)
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  // error handling states
  const [isAuthorSelected, setIsAuthorSelected] = useState(false)
  const [isServerErrror, setIsServerError] = useState("")
  let defaultChallengeFormErrors = {
    "name": "",
    "description": "",
    "start_date": "",
    "end_date": "",
    "goal_number": "",
    "goal_type": "",
    "category": "",
    "category_identifier": ""
  }
  const [areChallangeInputsValid, setAreChallangeInputsValid] = useState(defaultChallengeFormErrors)

  // default challenge form values
  let defaultChallengeFormValues = {
    "name": "",
    "description": "",
    "user_id": null,
    "start_date": "",
    "end_date": "",
    "goal_number": null,
    "goal_type": "",
    "category": "",
    "category_identifier": "",
    "active": true
  }
  const [challengeFormValues, setChallengeFormValues] = useState(defaultChallengeFormValues);

  // allows second date picker icon to toggle of menu
  const fp = useRef(null);

  function handleChallengeSubmit(e) {
    e.preventDefault()

    let formValues = ({ ...challengeFormValues, "user_id": user.id, "start_date": formatDate(startDate), "end_date": endDate ? formatDate(endDate) : null })
    let collectionId = challengeFormValues.category === "collection_id" ? challengeFormValues.category_identifier : false

    let formValidity = validateChallengeInputs(formValues),
      formErrors = formValidity.errors,
      formIsValid = Object.values(formValidity.errors).filter(error => error.length) == 0;

    // console.log("formIsValid")
    // console.log(formErrors)
    // console.log("formErrors")
    // console.log(Object.values(formErrors).filter(error => error.length).length)

    if (formIsValid) {
      fetch("/api/challenges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues)
      })
        .then(response => handleServerError(response))
        .then((new_challenge) => {
          if (collectionId) {
            let updatedCollectionArray = collections.map((collection) => collection.id == parseInt(collectionId) ? { ...collection, challenge_locked: true } : collection)
            setCollections(updatedCollectionArray)
          }
          setChallenges([new_challenge, ...challenges])
          handleClose()
        })
        .catch(error => setIsServerError(error.errors))
    } else {
      setAreChallangeInputsValid(formErrors)
    }
  };

  function handleChallengeInput(e, clearDeps) {
    let updatedValues = challengeFormValues
    // clearing server error message at bottom of from
    setIsServerError("")
    if (e.target.name === "category_identifier") {
      let errorKey = `${e.target.name}_${challengeFormValues.category}`
      setAreChallangeInputsValid({...areChallangeInputsValid, [errorKey] : ""})
    } else {
      setAreChallangeInputsValid({ ...areChallangeInputsValid, [e.target.name]: "" })
    }
    // resets dependent challengeFormValues on user input
    if (clearDeps == "goal_type") {
      updatedValues.category = "";
      updatedValues.category_identifier = ""
    } else if (clearDeps == "category") {
      updatedValues.category_identifier = ""
    }
    if (clearDeps == "collection_id" && challengeFormValues.category == "collection_id") {
      updatedValues.category_identifier = ""
    }
    setChallengeFormValues({ ...updatedValues, [e.target.name]: e.target.value })
  }

  function validateChallengeInputs(formValues) {
    let formValidated = {errors: {} }

    // console.log(formValues)

    if (formValues.name.length == 0) {
      formValidated.errors.name = "Challenge name is required"
    }
    if (!formValues.goal_type) {
      formValidated.errors.goal_type = "Goal type must be selected"
    }
    if (parseInt(formValues.goal_number) == 0 || formValues.goal_number == null) {
      formValidated.errors.goal_number = "Number must be greater than 0"
    }
    if (formValues.goal_type == "interest" && formValues.category.length == 0) {
      formValidated.errors.category = "Category must be selected"
    }
    if (formValues.goal_type == "interest" && formValues.category == "genre" && formValues.category_identifier.length == 0) {
      formValidated.errors.category_identifier_genre = "Genre must be specified"
    }
    if (challengeFormValues.category == "author" && !selectedAuthor) {
      formValidated.errors.category_identifier_author = "Author must be specified"
    }
    if (formValues.goal_type == "interest" && formValues.category == "collection_id" && formValues.category_identifier.length == 0) {
      formValidated.errors.category_identifier_collection_id = "Collection must be specified"
    }
    return formValidated
  }

  // toggle state for alerts if the user selects a book from BookSearch
  useEffect(() => {
    setIsAuthorSelected(false)
    setIsServerError("")
    setAreChallangeInputsValid({ ...areChallangeInputsValid, category_identifier_author: "" })
  }, [selectedAuthor])

  let collectionSelectOptions = collections?.map(collection => {
    // console.log(collection.books.length)
    let isDisabled = collection.challenge_locked || parseInt(challengeFormValues.goal_number) > collection.books.length
    return (
      <option disabled={isDisabled} value={isDisabled ? "" : collection.id} key={collection.id}>{collection.name}</option>
    )
  })


  return (
    <form id="kt_modal_new_target_form" className="form" action="submit" noValidate onSubmit={(e) => handleChallengeSubmit(e)}>

      {/* start challenge name input group */}
      <div className="d-flex flex-column mt-8 mb-8">
        {/* start label */}
        <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
          <span className="required">Challenge Name</span>
        </label>
        {/* end label */}
        <input type="text" autoComplete="off" className={"form-control form-control-solid " + (areChallangeInputsValid.name ? "is-invalid" : "")} placeholder="Enter Challenge Name" name="name" onChange={(e) => handleChallengeInput(e)} />
        {areChallangeInputsValid.name && <p className="text-danger">{areChallangeInputsValid.name}</p>}
      </div>
      {/* end challenge name input group */}

      {/* start challenge description input group */}
      <div className="d-flex flex-column mb-4">
        {/* start label */}
        <label className="fs-6 fw-semibold mb-2">
          <span>Challenge Description</span>
        </label>
        {/* end label */}
        <textarea className="form-control form-control-solid" rows="3" name="description" placeholder="Type Challange Description" onChange={(e) => handleChallengeInput(e)}></textarea>
      </div>
      {/* end challenge description input group */}

      {/* start challenge goal_number & goal_type input group */}
      <div className="row ps-9">

        {/* start goal_type */}
        <div className="col-5 d-flex align-items-center justify-content-center">
          <Form.Group controlId="goal_type">
            <label className="required fs-6 fw-semibold mb-2 me-4">Goal Type</label>
            <Form.Check
              inline
              required
              type="radio"
              id="duration"
              isInvalid={areChallangeInputsValid.goal_type}
              value="duration"
              name="goal_type"
              label="Duration"
              onChange={(e) => handleChallengeInput(e, "goal_type")}
            />
            <Form.Check
              inline
              type="radio"
              label="Interest"
              id="interest"
              isInvalid={areChallangeInputsValid.goal_type}
              value="interest"
              name="goal_type"
              onChange={(e) => handleChallengeInput(e, "goal_type")}
            />
            {areChallangeInputsValid.goal_type && <p className="text-danger">{areChallangeInputsValid.goal_type}</p>}
          </Form.Group>
        </div>
        {/* end goal_type */}

        {/* start goal_number */}
        <div className="col-7 d-flex justify-content-center mt-8 mb-8 pe-1">
          <div className="row align-items-center">
            {/* start label */}
            <div className="col-5">
              <label className="fs-6 fw-semibold mb-2">
                <span className="required">Goal Quantity</span>
              </label>
            </div>
            <div className="col-7">
              {/* end label */}
              <input type="number" autoComplete="off" min={0} className={"form-control form-control-solid " + (areChallangeInputsValid.goal_number ? "is-invalid" : "")} placeholder="Book Quantity" name="goal_number" onChange={(e) => handleChallengeInput(e, "collection_id")} />
              {areChallangeInputsValid.goal_number && <p className="text-danger">{areChallangeInputsValid.goal_number}</p>}
            </div>
          </div>
        </div>
        {/* end goal_number */}
      </div>
      {/* end challenge goal_number & goal_type input group */}

      {/* start conditional interest challenge form inputs */}
      <div className={"row mb-10 " + (challengeFormValues.goal_type == "interest" ? "" : "d-none")}>
        <div className="col-5 d-flex align-items-center">
          <label className="required fs-6 fw-semibold mb-2 ms-12 me-8">Interest</label>
          <Form.Select aria-label="Select interest type" className={"form-select-solid " + (areChallangeInputsValid.category ? "is-invalid" : "")} name="category"
            isInvalid={areChallangeInputsValid.category}
            onChange={e => handleChallengeInput(e, "category")}>
            <option value="">Select Type</option>
            <option value="author">Author</option>
            <option value="genre">Genre</option>
            <option value="collection_id" disabled={collections?.length == 0}>Collection</option>
          </Form.Select>
          <div className="flex-column">
            {areChallangeInputsValid.category && <p className="text-danger">{areChallangeInputsValid.category}</p>}
          </div>
        </div>

        <div className={"col-7 align-items-center pe-15 " + (challengeFormValues.category == "collection_id" ? "d-flex" : "d-none")}>
          <div className="col-3">
            <label className="fs-6 fw-semibold mb-2 d-block pe-1 text-end">
              <span className="required pe-1">Collection</span>
              <ToolTip placement="right" icon="info" message="Collections that contain less books than your Challenge Goal or that are already being used for other Challenges are not available." />
            </label>
          </div>
          <div className="col">
            {<Form.Select aria-label="Select collection" className={"form-select-solid " + (areChallangeInputsValid.category_identifier_collection_id ? "is-invalid" : "") + " text-capitalize me-13"} name="category_identifier"
              isInvalid={areChallangeInputsValid.category_identifier}
              onChange={e => handleChallengeInput(e)}>
              <option value="">Select Collection</option>
              {collectionSelectOptions}
            </Form.Select>}
            <div className="flex-column">
              {areChallangeInputsValid.category_identifier_collection_id && <p className="text-danger">{areChallangeInputsValid.category_identifier_collection_id}</p>}
            </div>
          </div>
        </div>

        <div className={"col-7 author-search-select align-items-center pe-0 " + (challengeFormValues.category == "author" ? "d-flex" : "d-none")}>
          <div className="col-3">
            <label className="fs-6 fw-semibold mb-2 me-9 d-block pe-8 text-end">
              <span className="required">Author</span>
            </label>
          </div>
          <div className="col me-15">
            <AuthorSearch authorsLoading={authorsLoading} setAuthorsLoading={setAuthorsLoading} selectedAuthor={selectedAuthor} setSelectedAuthor={setSelectedAuthor} setChallengeFormValues={setChallengeFormValues} challengeFormValues={challengeFormValues} />
            {/* {isAuthorSelected && <p className="text-danger">An author must be selected</p>} */}
            {areChallangeInputsValid.category_identifier_author && <p className="text-danger">{areChallangeInputsValid.category_identifier_author}</p>}
          </div>
        </div>

        <div className={"col-7 align-items-center pe-15 " + (challengeFormValues.category == "genre" ? "d-flex" : "d-none")}>
          {/* start label */}
          <div className="col-3">
            <label className="align-items-center fs-6 fw-semibold mb-2 me-7 d-block text-end">
              <span className="required pe-1">Genre</span>
              <ToolTip placement="right" icon="info" message="Books have many genres, ranging from the vague to very specific. We recommend you keep your Challenge genre broad so that you can best capture Challenge progress, regardless of the specificity of a book's genre." />
            </label>
          </div>
          {/* end label */}
          <div className="col">
            <input type="text" autoComplete="off" className={"me-13 form-control form-control-solid " + (areChallangeInputsValid.category_identifier_genre ? "is-invalid" : "")} placeholder="Enter Genre" name="category_identifier" onChange={(e) => handleChallengeInput(e)} />
            {areChallangeInputsValid.category_identifier_genre && <p className="text-danger">{areChallangeInputsValid.category_identifier_genre}</p>}
          </div>
        </div>

      </div>
      {/* end conditional interest challenge form inputs */}

      {/* start challenge date input group */}
      <div className="row ps-9">
        {/* start label */}
        <div className="col-6 col-md-6 d-flex justify-content-center pe-">
          <div className="position-relative d-flex align-items-center">
            <Form.Group controlId="start_date" className="d-flex align-items-center">
              <label className="required fs-6 fw-semibold mb-2 me-8">Start Date</label>
              <div className="flatpickr">
                <Flatpickr
                  className="d-flex"
                  placeholder="Select Date"
                  value={startDate}
                  onReady={() => setStartDate(new Date())}
                  onChange={value => setStartDate(value[0])}
                  options={{
                    wrap: true,
                    dateFormat: "Y-m-d",
                    minDate: "today",
                  }}>
                  <button className="btn btn-link align-self-center ms-4 position-absolute" data-toggle onClick={e => e.preventDefault()}>
                    <span className="align-top svg-icon svg-icon-2">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.3" d="M21 22H3C2.4 22 2 21.6 2 21V5C2 4.4 2.4 4 3 4H21C21.6 4 22 4.4 22 5V21C22 21.6 21.6 22 21 22Z" fill="currentColor"></path>
                        <path d="M6 6C5.4 6 5 5.6 5 5V3C5 2.4 5.4 2 6 2C6.6 2 7 2.4 7 3V5C7 5.6 6.6 6 6 6ZM11 5V3C11 2.4 10.6 2 10 2C9.4 2 9 2.4 9 3V5C9 5.6 9.4 6 10 6C10.6 6 11 5.6 11 5ZM15 5V3C15 2.4 14.6 2 14 2C13.4 2 13 2.4 13 3V5C13 5.6 13.4 6 14 6C14.6 6 15 5.6 15 5ZM19 5V3C19 2.4 18.6 2 18 2C17.4 2 17 2.4 17 3V5C17 5.6 17.4 6 18 6C18.6 6 19 5.6 19 5Z" fill="currentColor"></path>
                        <path d="M8.8 13.1C9.2 13.1 9.5 13 9.7 12.8C9.9 12.6 10.1 12.3 10.1 11.9C10.1 11.6 10 11.3 9.8 11.1C9.6 10.9 9.3 10.8 9 10.8C8.8 10.8 8.59999 10.8 8.39999 10.9C8.19999 11 8.1 11.1 8 11.2C7.9 11.3 7.8 11.4 7.7 11.6C7.6 11.8 7.5 11.9 7.5 12.1C7.5 12.2 7.4 12.2 7.3 12.3C7.2 12.4 7.09999 12.4 6.89999 12.4C6.69999 12.4 6.6 12.3 6.5 12.2C6.4 12.1 6.3 11.9 6.3 11.7C6.3 11.5 6.4 11.3 6.5 11.1C6.6 10.9 6.8 10.7 7 10.5C7.2 10.3 7.49999 10.1 7.89999 10C8.29999 9.90003 8.60001 9.80003 9.10001 9.80003C9.50001 9.80003 9.80001 9.90003 10.1 10C10.4 10.1 10.7 10.3 10.9 10.4C11.1 10.5 11.3 10.8 11.4 11.1C11.5 11.4 11.6 11.6 11.6 11.9C11.6 12.3 11.5 12.6 11.3 12.9C11.1 13.2 10.9 13.5 10.6 13.7C10.9 13.9 11.2 14.1 11.4 14.3C11.6 14.5 11.8 14.7 11.9 15C12 15.3 12.1 15.5 12.1 15.8C12.1 16.2 12 16.5 11.9 16.8C11.8 17.1 11.5 17.4 11.3 17.7C11.1 18 10.7 18.2 10.3 18.3C9.9 18.4 9.5 18.5 9 18.5C8.5 18.5 8.1 18.4 7.7 18.2C7.3 18 7 17.8 6.8 17.6C6.6 17.4 6.4 17.1 6.3 16.8C6.2 16.5 6.10001 16.3 6.10001 16.1C6.10001 15.9 6.2 15.7 6.3 15.6C6.4 15.5 6.6 15.4 6.8 15.4C6.9 15.4 7.00001 15.4 7.10001 15.5C7.20001 15.6 7.3 15.6 7.3 15.7C7.5 16.2 7.7 16.6 8 16.9C8.3 17.2 8.6 17.3 9 17.3C9.2 17.3 9.5 17.2 9.7 17.1C9.9 17 10.1 16.8 10.3 16.6C10.5 16.4 10.5 16.1 10.5 15.8C10.5 15.3 10.4 15 10.1 14.7C9.80001 14.4 9.50001 14.3 9.10001 14.3C9.00001 14.3 8.9 14.3 8.7 14.3C8.5 14.3 8.39999 14.3 8.39999 14.3C8.19999 14.3 7.99999 14.2 7.89999 14.1C7.79999 14 7.7 13.8 7.7 13.7C7.7 13.5 7.79999 13.4 7.89999 13.2C7.99999 13 8.2 13 8.5 13H8.8V13.1ZM15.3 17.5V12.2C14.3 13 13.6 13.3 13.3 13.3C13.1 13.3 13 13.2 12.9 13.1C12.8 13 12.7 12.8 12.7 12.6C12.7 12.4 12.8 12.3 12.9 12.2C13 12.1 13.2 12 13.6 11.8C14.1 11.6 14.5 11.3 14.7 11.1C14.9 10.9 15.2 10.6 15.5 10.3C15.8 10 15.9 9.80003 15.9 9.70003C15.9 9.60003 16.1 9.60004 16.3 9.60004C16.5 9.60004 16.7 9.70003 16.8 9.80003C16.9 9.90003 17 10.2 17 10.5V17.2C17 18 16.7 18.4 16.2 18.4C16 18.4 15.8 18.3 15.6 18.2C15.4 18.1 15.3 17.8 15.3 17.5Z" fill="currentColor"></path>
                      </svg>
                    </span>
                  </button>
                  <input type="text" className="form-control form-control-solid flatpickr-input ps-14" data-input />
                </Flatpickr>
              </div>
            </Form.Group>
          </div>
        </div>

        <div className="col-6 col-md-6 d-flex ps-0">
          <div className="position-relative d-flex align-items-center">
            <Form.Group controlId="end_date" className="d-flex align-items-center">
              <label className="fs-6 fw-semibold mb-2 me-10">End Date</label>
              <div className="flatpickr">
                <Flatpickr ref={fp}
                  className="d-flex"
                  placeholder="Select Date"
                  value={endDate}
                  onChange={value => setEndDate(value[0])}
                  options={{
                    wrap: true,
                    dateFormat: "Y-m-d",
                    minDate: startDate,
                  }}>
                  <button className="btn btn-link align-self-center ms-4 position-absolute"
                    onClick={(e) => {
                      e.preventDefault()
                      if (!fp?.current?.flatpickr) return;
                      fp.current.flatpickr.toggle();
                    }}>
                    <span className="align-top svg-icon svg-icon-2">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.3" d="M21 22H3C2.4 22 2 21.6 2 21V5C2 4.4 2.4 4 3 4H21C21.6 4 22 4.4 22 5V21C22 21.6 21.6 22 21 22Z" fill="currentColor"></path>
                        <path d="M6 6C5.4 6 5 5.6 5 5V3C5 2.4 5.4 2 6 2C6.6 2 7 2.4 7 3V5C7 5.6 6.6 6 6 6ZM11 5V3C11 2.4 10.6 2 10 2C9.4 2 9 2.4 9 3V5C9 5.6 9.4 6 10 6C10.6 6 11 5.6 11 5ZM15 5V3C15 2.4 14.6 2 14 2C13.4 2 13 2.4 13 3V5C13 5.6 13.4 6 14 6C14.6 6 15 5.6 15 5ZM19 5V3C19 2.4 18.6 2 18 2C17.4 2 17 2.4 17 3V5C17 5.6 17.4 6 18 6C18.6 6 19 5.6 19 5Z" fill="currentColor"></path>
                        <path d="M8.8 13.1C9.2 13.1 9.5 13 9.7 12.8C9.9 12.6 10.1 12.3 10.1 11.9C10.1 11.6 10 11.3 9.8 11.1C9.6 10.9 9.3 10.8 9 10.8C8.8 10.8 8.59999 10.8 8.39999 10.9C8.19999 11 8.1 11.1 8 11.2C7.9 11.3 7.8 11.4 7.7 11.6C7.6 11.8 7.5 11.9 7.5 12.1C7.5 12.2 7.4 12.2 7.3 12.3C7.2 12.4 7.09999 12.4 6.89999 12.4C6.69999 12.4 6.6 12.3 6.5 12.2C6.4 12.1 6.3 11.9 6.3 11.7C6.3 11.5 6.4 11.3 6.5 11.1C6.6 10.9 6.8 10.7 7 10.5C7.2 10.3 7.49999 10.1 7.89999 10C8.29999 9.90003 8.60001 9.80003 9.10001 9.80003C9.50001 9.80003 9.80001 9.90003 10.1 10C10.4 10.1 10.7 10.3 10.9 10.4C11.1 10.5 11.3 10.8 11.4 11.1C11.5 11.4 11.6 11.6 11.6 11.9C11.6 12.3 11.5 12.6 11.3 12.9C11.1 13.2 10.9 13.5 10.6 13.7C10.9 13.9 11.2 14.1 11.4 14.3C11.6 14.5 11.8 14.7 11.9 15C12 15.3 12.1 15.5 12.1 15.8C12.1 16.2 12 16.5 11.9 16.8C11.8 17.1 11.5 17.4 11.3 17.7C11.1 18 10.7 18.2 10.3 18.3C9.9 18.4 9.5 18.5 9 18.5C8.5 18.5 8.1 18.4 7.7 18.2C7.3 18 7 17.8 6.8 17.6C6.6 17.4 6.4 17.1 6.3 16.8C6.2 16.5 6.10001 16.3 6.10001 16.1C6.10001 15.9 6.2 15.7 6.3 15.6C6.4 15.5 6.6 15.4 6.8 15.4C6.9 15.4 7.00001 15.4 7.10001 15.5C7.20001 15.6 7.3 15.6 7.3 15.7C7.5 16.2 7.7 16.6 8 16.9C8.3 17.2 8.6 17.3 9 17.3C9.2 17.3 9.5 17.2 9.7 17.1C9.9 17 10.1 16.8 10.3 16.6C10.5 16.4 10.5 16.1 10.5 15.8C10.5 15.3 10.4 15 10.1 14.7C9.80001 14.4 9.50001 14.3 9.10001 14.3C9.00001 14.3 8.9 14.3 8.7 14.3C8.5 14.3 8.39999 14.3 8.39999 14.3C8.19999 14.3 7.99999 14.2 7.89999 14.1C7.79999 14 7.7 13.8 7.7 13.7C7.7 13.5 7.79999 13.4 7.89999 13.2C7.99999 13 8.2 13 8.5 13H8.8V13.1ZM15.3 17.5V12.2C14.3 13 13.6 13.3 13.3 13.3C13.1 13.3 13 13.2 12.9 13.1C12.8 13 12.7 12.8 12.7 12.6C12.7 12.4 12.8 12.3 12.9 12.2C13 12.1 13.2 12 13.6 11.8C14.1 11.6 14.5 11.3 14.7 11.1C14.9 10.9 15.2 10.6 15.5 10.3C15.8 10 15.9 9.80003 15.9 9.70003C15.9 9.60003 16.1 9.60004 16.3 9.60004C16.5 9.60004 16.7 9.70003 16.8 9.80003C16.9 9.90003 17 10.2 17 10.5V17.2C17 18 16.7 18.4 16.2 18.4C16 18.4 15.8 18.3 15.6 18.2C15.4 18.1 15.3 17.8 15.3 17.5Z" fill="currentColor"></path>
                      </svg>
                    </span>
                  </button>
                  <input type="text" className="form-control form-control-solid flatpickr-input ps-14" data-input />
                </Flatpickr>
              </div>
            </Form.Group>

            {/* <input className="form-control form-control-solid ps-12 flatpickr-input" placeholder="Select a date" name="due_date" type="text" readOnly="readonly" /> */}


          </div>
        </div>

      </div>
      {/* end challenge date input group */}

      <div className="mt-4">
        {isServerErrror.length > 0 && <p className="text-danger">{isServerErrror + ", please review your challenge and resubmit"}</p>}
      </div>
      {/* start action buttons */}
      <div className="text-end mt-12">
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

export default ChallengeModal;