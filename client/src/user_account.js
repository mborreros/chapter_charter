import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from 'moment'

import ToolTip from "./tool_tip";
import genericAvatar from "./imgs/generic_avatar_img.png"

function Account({ user, setUser, handleServerError }) {

  useEffect(() => {
    document.title = "Account"
  }, [])

  let defaultUserValues = {
    "username": "",
    "screenname": "",
    "avatar_img": "",
    "password": ""
  }

  let defaultValidation = {
    "username": "",
    "screenname": "",
  }

  const [userFormValues, setUserFormValues] = useState(defaultUserValues)
  const [areInputsValid, setAreInputsValid] = useState(defaultValidation)
  const [isServerErrror, setIsServerError] = useState("")

  function resetFormValuesToUser(user) {
    defaultUserValues = {
      "username": user.username,
      "screenname": user.screenname,
      "avatar_img": user.avatar_img,
    }
    setUserFormValues(defaultUserValues)
  }

  useEffect(() => {
    if (user) {
      resetFormValuesToUser(user)
    }
  }, [user])

  const [isAccountEditable, setIsAccountEditable] = useState(false)
  const navigate = useNavigate();


  function handleAccountDelete(e) {
    if (window.confirm("Are you sure you want to permenantly delete this account?")) {
      fetch(`/api/users/${parseInt(e.target.id)}`, {
        method: "DELETE"
      })
        .then(response => handleServerError(response))
        .then(() => {
          setUser(null)
          navigate("../signup", { replace: true })
        })
        .catch(error => console.log(error))
    }
  }

  function handleUserFormInputs(e) {
    setUserFormValues({ ...userFormValues, [e.target.name]: e.target.value })
    setAreInputsValid({ ...areInputsValid, [e.target.name]: "" })
    if (e.target.name === "username") {
      setIsServerError("")
    }
  }

  function handleCancelForm(e) {
    resetFormValuesToUser(user)
    setIsAccountEditable(!isAccountEditable)
    setAreInputsValid(defaultValidation)
    setIsServerError("")
  }

  function handleAccountUpdate(e) {
    let formValidity = validateInputValues(userFormValues),
      formIsValid = formValidity.valid,
      formErrors = formValidity.errors;

    if (formIsValid) {
      fetch(`/api/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userFormValues)
      })
        .then(response => handleServerError(response))
        .then((updated_user => {
          setUser(updated_user)
          setIsAccountEditable(false)
        }))
        .catch(error => setIsServerError(error.errors.username[0]))
    }
    else {
      setAreInputsValid(formErrors)
    }
  }

  function validateInputValues(userFormValues) {
    let formValidated = { valid: true, errors: {} }

    if (userFormValues.username.length == 0) {
      // setAreInputsValid({ ...areInputsValid, "username": "Username is required." })
      formValidated.valid = false
      formValidated.errors.username = "Username is required."
    }
    if (userFormValues.username.length < 5) {
      // setAreInputsValid({ ...areInputsValid, "username": "Must be a minimum of 5 characters long." })
      formValidated.valid = false
      formValidated.errors.username = "Must be a minimum of 5 characters long."
    }
    if (userFormValues.screenname.length == 0) {
      // setAreInputsValid({ ...areInputsValid, "screenname": "Screenname is required." })
      formValidated.valid = false
      formValidated.errors.screenname = "Screenname is required."
    }
    return formValidated
  }

  return (
    <div className="col-md-12 d-flex justify-content-center">
      <div className="account-card card w-1000px mb-xl-10">
        {/* start header */}
        <div className='card-header align-items-center border-0 mt-4'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='fw-bold mb-2 text-dark text-center'>Account Details</span>
          </h3>
          <div>
            <button id={user?.id} className={"btn btn-sm btn-danger " + (isAccountEditable ? "" : "d-none")} onClick={(e) => handleAccountDelete(e)}>Delete Account</button>
            <button id={user?.id} className={"btn btn-sm btn-success mx-4 " + (isAccountEditable ? "" : "d-none")} onClick={(e) => handleAccountUpdate(e)}>Save Changes</button>
            <button className='btn btn-sm btn-light' onClick={(e) => handleCancelForm(e)}>
              {isAccountEditable ? "Cancel" : "Edit Account"}
            </button>
          </div>
        </div>
        {/* end header */}
        <div className="card-body pt-0 pb-0">

          {/* <!--begin::Details--> */}
          <div className="row flex-sm-nowrap mb-3">
            {/* <!--begin: Pic--> */}
            <div className="col-3 mb-4 d-flex justify-content-center pt-8">
              <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
                <img className="account-card-avatar-img" src={user?.avatar_img.length === 0 ? genericAvatar : user?.avatar_img} alt={user?.screenname + "'s profile picture"} />
              </div>
            </div>
            {/* <!--end::Pic--> */}

            <form id="chapter-charter-sign-up-form" className={"form col-9 mb-4 " + (isAccountEditable ? "editing" : "")} action="submit" onSubmit={(e) => e.preventDefault()}>

              <div className="row user-edit-row mt-4">
                {/* start label */}
                <div className="col-3 d-flex user-edit-label-wrapper">
                  <label className="d-flex fs-6 fw-semibold me-4">
                    <span>Joined</span>
                  </label>
                </div>
                {/* end label */}
                <div className="col-9 user-edit-input-wrapper">
                  <span className="form-control border-0">{moment(user?.created_at).from(new Date())}</span>
                </div>
              </div>

              <div className="row user-edit-row mt-4">
                {/* start label */}
                <div className="col-3 d-flex user-edit-label-wrapper">
                  <label className="d-flex align-items-center fs-6 fw-semibold me-4">
                    <span className="pe-2">Username</span>
                    {isAccountEditable ? <ToolTip placement="right" icon="info" message="Must be unique and more than 5 characters long." /> : <></>}
                  </label>
                </div>
                {/* end label */}
                <div className="col-9 user-edit-input-wrapper">
                  {/* onInvalid={e => e.target.setCustomValidity("Username is required")} onInput={e => e.target.setCustomValidity("")} */}
                  <input required readOnly={!isAccountEditable} type="text" autoComplete="off" className={"form-control " + (isAccountEditable ? "form-control-solid " : "border-0 ") + (areInputsValid.username ? "is-invalid" : "")} placeholder="Enter Username" name="username" value={userFormValues.username} onChange={(e) => handleUserFormInputs(e)} />
                  {areInputsValid.username && isAccountEditable && <p className="text-danger error-message">{areInputsValid.username}</p>}
                  {isServerErrror && isAccountEditable && <p className="text-danger error-message">Username {isServerErrror}, select a new username</p>}
                </div>
              </div>

              {/* <div className="row"> */}
              <div className=" row mt-4 user-edit-row pe-0">
                {/* start label */}
                <div className="col-3 d-flex user-edit-label-wrapper">
                  <label className="d-flex align-items-center fs-6 fw-semibold me-4">
                    <span>Screen Name</span>
                  </label>
                </div>
                {/* end label */}
                <div className="col-9 user-edit-input-wrapper">
                  <input required readOnly={!isAccountEditable} type="text" autoComplete="off" className={"form-control " + (isAccountEditable ? "form-control-solid " : "border-0 ") + (areInputsValid.screenname ? "is-invalid" : "")} name="screenname" placeholder="Enter Screen Name" value={userFormValues.screenname} onChange={(e) => handleUserFormInputs(e)} />
                  {areInputsValid.screenname && isAccountEditable && <p className="text-danger error-message">{areInputsValid.screenname}</p>}
                </div>
              </div>

              <div className="row user-edit-row mt-4 ps-0">
                {/* start label */}
                <div className="col-3 d-flex user-edit-label-wrapper">
                  <label className="d-flex align-items-center fs-6 fw-semibold me-4">
                    <span className="pe-2">Profile Picture</span>
                    {isAccountEditable ? <ToolTip placement="right" icon="info" message="Profile pictures must be links which end in .jpg or .png for the site to render them properly. " /> : <></>}
                  </label>
                </div>
                {/* end label */}
                <div className="col-9 user-edit-input-wrapper">
                  <input readOnly={!isAccountEditable} type="text" autoComplete="off" className={"form-control " + (isAccountEditable ? "form-control-solid" : "border-0")} name="avatar_img" placeholder="Enter Picture URL" value={userFormValues.avatar_img} onChange={(e) => handleUserFormInputs(e)} />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;