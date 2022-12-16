import { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

import ToolTip from "./tool_tip";

function UserAuthForm({ onLogin, onSignup, fetchUserAuth }) {

  let defaultLogInValues = {
    "username": "",
    "password": ""
  }
  let defaultSignUpValues = {
    "username": "",
    "password": "",
    "screenname": "",
    "avatar_img": ""
  }

  const [loginValues, setLoginValues] = useState(defaultLogInValues)
  const [signUpValues, setSignUpValues] = useState(defaultSignUpValues)

  // getting pathname (login or signup) to determine which form to show
  const location = useLocation();
  const navigate = useNavigate();

  // console.log(location.pathname)

  useEffect(() => {
    setLoginValues(defaultLogInValues)
    setSignUpValues(defaultSignUpValues)
  },[location.pathname])

  function handleUserLogin(e) {
    e.preventDefault()
    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginValues)
    })
      .then(response => {
        if (response.ok) {
          response.json().then((user) => onLogin(user)).then(navigate("../", { replace: true }))
        } else {
          response.json().then((errors) => console.log(errors))
        }
      })
  }

  function handleUserSignup(e) {
    e.preventDefault()
    fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signUpValues)
    }).then(response => {
      if (response.ok) {
        response.json().then(() => {
          onSignup()
          fetchUserAuth()
        }).then(navigate("../", { replace: true }))
      } else {
        response.json().then((errors) => console.log(errors))
      }
    })
  }

  function handleLoginInputs(e) {
    let previousLoginValues = loginValues
    setLoginValues({ ...previousLoginValues, [e.target.name]: e.target.value })
  }

  function handleSignUpInputs(e) {
    let previousSignUpValues = signUpValues

    if (e.target.name === "avatar_img") {
      checkImg(e.target.value) ? setSignUpValues({ ...previousSignUpValues, [e.target.name]: e.target.value }) : setSignUpValues({ ...previousSignUpValues })
    } else { setSignUpValues({ ...previousSignUpValues, [e.target.name]: e.target.value }) }
  }

  function checkImg(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  }

  return (
    <div className="d-flex flex-column flex-root app-root" id="kt_app_root">
      <div className="app-page flex-column flex-column-fluid" id="kt_app_page">
        <div className="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper">
          <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
            <div className="d-flex flex-column flex-column-fluid">

              <div id="kt_app_content" className="app-content flex-column-fluid">
                <div id="kt_app_content_container" className="app-container container-xxl">
                  <div className="row g-5 g-xl-10 mb-5 mb-xl-10 align-items-stretch">

                    {location.pathname === "/login" ?
                      <>
                        <h1 className="px-12 text-center mb-2">Login to your Account</h1>

                        <form id="chapter-charter-login-form" name="chapter-charter-login-form" className="form px-12" action="submit" onSubmit={(e) => handleUserLogin(e)}>
                          <div className="d-flex flex-column mt-8 mb-8">
                            {/* start label */}
                            <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                              <span className="required">Username</span>
                            </label>
                            {/* end label */}
                            {/* onInvalid={e => e.target.setCustomValidity("Username is required")} onInput={e => e.target.setCustomValidity("")} */}
                            <input required type="text" autoComplete="off" className="form-control" placeholder="Enter Username" name="username" value={loginValues.username} onChange={(e) => handleLoginInputs(e)} />
                          </div>

                          <div className="d-flex flex-column mt-8 mb-8">
                            {/* start label */}
                            <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                              <span className="required">Password</span>
                            </label>
                            {/* end label */}
                            <input required type="password" autoComplete="off" className="form-control" name="password" placeholder="Enter Password" value={loginValues.password} onChange={(e) => handleLoginInputs(e)} />
                          </div>

                          {/* start action buttons */}
                          <div className="text-end mt-12">
                            {/* <button type="reset" id="kt_modal_new_target_cancel" className="btn btn-light btn-sm me-3">Clear</button> */}
                            <button type="submit" id="chapter-charter-login-button" className="btn btn-primary btn-sm">
                              <span className="indicator-label">Log In</span>
                              <span className="indicator-progress">Please wait...
                                <span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                            </button>
                          </div>
                          {/* end action buttons */}
                        </form>
                      </>
                      :
                      <>
                        <h1 className="px-12 text-center mb-2">Create a New Account</h1>
                        <form id="chapter-charter-sign-up-form" name="chapter-charter-sign-up-form" className="form px-12" action="submit" onSubmit={(e) => handleUserSignup(e)}>

                          <div className="d-flex flex-column mt-8 mb-8">
                            {/* start label */}
                            <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                              <span className="required">Username</span>
                            </label>
                            {/* end label */}
                            {/* onInvalid={e => e.target.setCustomValidity("Username is required")} onInput={e => e.target.setCustomValidity("")} */}
                            <input required type="text" autoComplete="off" className="form-control" placeholder="Enter Username" name="username" value={signUpValues.username} onChange={(e) => handleSignUpInputs(e)} />
                          </div>

                          <div className="d-flex flex-column mt-8 mb-8">
                            {/* start label */}
                            <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                              <span className="required">Password</span>
                            </label>
                            {/* end label */}
                            <input required type="password" autoComplete="off" className="form-control" name="password" placeholder="Enter Password" value={signUpValues.password} onChange={(e) => handleSignUpInputs(e)} />
                          </div>

                          <div className="row">
                            <div className="d-flex col-6 justify-content-evenly mt-8 mb-8 pe-0">
                              {/* start label */}
                              <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                                <span className="required">Screen Name</span>
                              </label>
                              {/* end label */}
                              <input required type="text" autoComplete="off" className="form-control w-450px" name="screenname" placeholder="Enter Screen Name" value={signUpValues.screenname} onChange={(e) => handleSignUpInputs(e)} />
                            </div>

                            <div className="d-flex col-6 justify-content-evenly mt-8 mb-8 px-0">
                              {/* start label */}
                              <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                                <span className="pe-2">Profile Picture</span>
                                <ToolTip placement="right" icon="info" message="Profile pictures must be links which end in .jpg or .png for the site to render them properly. If you submit an bad image, you can always change it through your account tab later on. " />
                              </label>
                              {/* end label */}
                              <input type="text" autoComplete="off" className="form-control w-450px" name="avatar_img" placeholder="Enter Picture URL" onChange={(e) => handleSignUpInputs(e)} />
                            </div>
                          </div>

                          {/* start action buttons */}
                          <div className="text-end mt-12">
                            {/* <button type="reset" id="kt_modal_new_target_cancel" className="btn btn-light btn-sm me-3">Clear</button> */}
                            <button type="submit" id="chapter-charter-sign-up-button" className="btn btn-primary btn-sm">
                              <span className="indicator-label">Sign Up</span>
                              <span className="indicator-progress">Please wait...
                                <span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                            </button>
                          </div>
                          {/* end action buttons */}

                        </form>
                      </>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default UserAuthForm;