import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import genericAvatar from "./imgs/generic_avatar_img.png"

function Account({ user, setUser }) {

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
    fetch(`/api/users/${parseInt(e.target.id)}`, {
      method: "DELETE"
    }).then((response) => {
      if (response.ok) {
        setUser(null)
        navigate("../signup", { replace: true })
      }
      else { console.log("Error in deleting user!") }
    })
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
    }).then((response) => {
      if (response.ok) {
        response.json().then((updated_user => {
          setUser(updated_user)
          setIsAccountEditable(false)
        }))
      }
    })
  }

  return (

    <div className="col-md-12">
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
        <div className="card-body pt-9 pb-0">

          {/* <!--begin::Details--> */}
          <div className="row d-flex flex-sm-nowrap mb-3">
            {/* <!--begin: Pic--> */}
            <div className="col-3 mb-4">
              <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
                <img className="account-card-avatar-img" src={user?.avatar_img.length === 0 ? genericAvatar : user?.avatar_img} alt={user?.screenname + "'s profile picture"} />
              </div>
            </div>
            {/* <!--end::Pic--> */}

            {/* <!--begin::Info--> */}
            <div className="col-9 d-flex mb-4">
              {/* <!--begin::Title--> */}
              <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                {/* <!--begin::User--> */}
                <div className="d-flex flex-column">

                  {/* <div className="d-flex align-items-center mb-2">
                    <span className="text-gray-900 fs-2 fw-bold me-1">Account Details</span>
                    <div>
                      <button className="btn btn-sm btn-light">Edit Details</button>
                    </div>
                  </div> */}

                  <form id="chapter-charter-sign-up-form" className="form" action="submit" onSubmit={(e) => e.preventDefault()}>

                    <div className="d-flex mt-8 mb-8">
                      {/* start label */}
                      <label className="d-flex align-items-center fs-6 fw-semibold">
                        <span>Username</span>
                      </label>
                      {/* end label */}
                      {/* onInvalid={e => e.target.setCustomValidity("Username is required")} onInput={e => e.target.setCustomValidity("")} */}
                      <input required readOnly={!isAccountEditable} type="text" autoComplete="off" className={"form-control " + (isAccountEditable ? "form-control-solid" : "border-0")} placeholder="Enter Username" name="username" value={userFormValues.username} onChange={(e) => handleUserFormInputs(e)} />
                    </div>

                    {/* <div className="row"> */}
                    <div className="d-flex mt-8 mb-8 pe-0">
                      {/* start label */}
                      <label className="d-flex align-items-center fs-6 fw-semibold">
                        <span>Screen Name</span>
                      </label>
                      {/* end label */}
                      <input required readOnly={!isAccountEditable} type="text" autoComplete="off" className={"form-control " + (isAccountEditable ? "form-control-solid" : "border-0")} name="screenname" placeholder="Enter Screen Name" value={userFormValues.screenname} onChange={(e) => handleUserFormInputs(e)} />
                    </div>

                    <div className="d-flex mt-8 mb-8 ps-0">
                      {/* start label */}
                      <label className="d-flex align-items-center fs-6 fw-semibold">
                        <span>Profile Picture</span>
                      </label>
                      {/* end label */}
                      <input readOnly={!isAccountEditable} type="text" autoComplete="off" className={"form-control " + (isAccountEditable ? "form-control-solid" : "border-0")} name="avatar_img" placeholder="Enter Picture URL" value={userFormValues.avatar_img} onChange={(e) => handleUserFormInputs(e)} />
                    </div>
                    {/* </div> */}

                  </form>

                  {/* <div className="d-flex align-items-center mb-2">
                  <span className="text-gray-900 me-1">Username: {user?.username}</span>
                </div>

                <div className="d-flex align-items-center mb-2">
                  <span className="text-gray-900 me-1">Screenname: {user?.screenname}</span>
                </div>

                <div className="d-flex align-items-center mb-2">
                  <span className="text-gray-900 me-1">Profile Picture Source: {user?.avatar_img}</span>
                </div> */}

                </div>
                {/* {/* <!--end::User--> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;