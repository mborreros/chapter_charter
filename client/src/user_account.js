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
    "avatar_img": ""
  }
  const [userFormValues, setUserFormValues] = useState(defaultUserValues)

  function resetFormValuesToUser(user) {
    defaultUserValues = {
      "username": user.username,
      "screenname": user.screenname,
      "avatar_img": user.avatar_img
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
    if (window.confirm("Are you sure you want to permenantly delete this account")) {
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
  }

  function handleCancelForm(e) {
    resetFormValuesToUser(user)
    setIsAccountEditable(!isAccountEditable)
  }

  function handleAccountUpdate(e) {
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
      .catch(error => console.log(error))
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
          <div className="row d-flex flex-sm-nowrap mb-3">
            {/* <!--begin: Pic--> */}
            <div className="col-3 mb-4 d-flex align-items-center justify-content-center">
              <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
                <img className="account-card-avatar-img" src={user?.avatar_img.length === 0 ? genericAvatar : user?.avatar_img} alt={user?.screenname + "'s profile picture"} />
              </div>
            </div>
            {/* <!--end::Pic--> */}

            <form id="chapter-charter-sign-up-form" className="form col-9 mb-4" action="submit" onSubmit={(e) => e.preventDefault()}>

              <div className="row d-flex mt-4">
                {/* start label */}
                <div className="col-3 d-flex">
                  <label className="d-flex align-items-center fs-6 fw-semibold me-4">
                    <span>Joined:</span>
                  </label>
                </div>
                {/* end label */}
                <div className="col-9 ps-0">
                  <input required readOnly type="text" autoComplete="off" className="form-control border-0" placeholder="Joined" name="username" value={moment(user?.created_at).from(new Date())} />
                </div>
              </div>

              <div className="row d-flex mt-4">
                {/* start label */}
                <div className="col-3 d-flex">
                  <label className="d-flex align-items-center fs-6 fw-semibold me-4">
                    <span>Username</span>
                  </label>
                </div>
                {/* end label */}
                <div className="col-9 ps-0">
                  {/* onInvalid={e => e.target.setCustomValidity("Username is required")} onInput={e => e.target.setCustomValidity("")} */}
                  <input required readOnly={!isAccountEditable} type="text" autoComplete="off" className={"form-control " + (isAccountEditable ? "form-control-solid" : "border-0")} placeholder="Enter Username" name="username" value={userFormValues.username} onChange={(e) => handleUserFormInputs(e)} />
                </div>
              </div>

              {/* <div className="row"> */}
              <div className=" row d-flex mt-4 pe-0">
                {/* start label */}
                <div className="col-3 d-flex">
                  <label className="d-flex align-items-center fs-6 fw-semibold me-4">
                    <span>Screen Name</span>
                  </label>
                </div>
                {/* end label */}
                <div className="col-9 ps-0">
                  <input required readOnly={!isAccountEditable} type="text" autoComplete="off" className={"form-control " + (isAccountEditable ? "form-control-solid" : "border-0")} name="screenname" placeholder="Enter Screen Name" value={userFormValues.screenname} onChange={(e) => handleUserFormInputs(e)} />
                </div>
              </div>

              <div className="row d-flex mt-4 ps-0">
                {/* start label */}
                <div className="col-3 d-flex">
                  <label className="d-flex align-items-center fs-6 fw-semibold me-4">
                    <span className="pe-2">Profile Picture</span>
                    <ToolTip placement="right" icon="info" message="Profile pictures must be links which end in .jpg or .png for the site to render them properly. " />
                  </label>
                </div>
                {/* end label */}
                <div className="col-9 ps-0">
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