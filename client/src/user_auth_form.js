import { useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Alert from 'react-bootstrap/Alert';

import ToolTip from "./utilities/tool_tip";

function UserAuthForm({ onLogin, onSignup, fetchUserAuth, handleServerError, checkImg }) {

  // getting pathname (login or signup) to determine which form to show
  const location = useLocation();
  const navigate = useNavigate();

  // form error handling functions and variables
  const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm({
    defaultValues: {
      login_username: "",
      login_password: "",
      username: "",
      password: "",
      screenname: "",
      avatar_img: ""
    }
  });

  useEffect(() => {
    // clear error form values on pathname switch between login/signup
    clearErrors()
  }, [location.pathname])

  function handleUserLogin(data) {
    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({"username": data.login_username, "password": data.login_password})
    })
      .then(response => handleServerError(response))
      .then(user => {
        onLogin(user)
        navigate("../", { replace: true })
      })
      .catch(error => {
        setError('notRegisteredInput', { type: 'custom', message: 'The username and password you submitted is not associated with a valid Chapter Charter account, please resubmit with a valid username and password or create a new account.' })
        console.log(error)
      })
  }

  function handleUserSignup(data) {
    let submissionData = {...data}

    if (!checkImg(data.avatar_img)) {
      submissionData.avatar_img = ""
    }

    fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submissionData)
    })
      .then(response => handleServerError(response))
      .then(() => {
        onSignup()
        fetchUserAuth()
        navigate("../", { replace: true })
      })
      .catch(error => {
        setError('notRegisteredInput', { type: 'custom', message: 'The username you selected has already been taken, please resubmit with a unique username.' })
        console.log(error)
      })
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

                        <form id="chapter-charter-login-form" name="chapter-charter-login-form" className="form px-12" action="submit" onSubmit={handleSubmit(handleUserLogin)}>

                          <div className="d-flex flex-column mt-8 mb-8">
                            <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                              <span className="required">Username</span>
                            </label>

                            <input {...register("login_username", { required: true })} type="text" autoComplete="off" className={"form-control " + (errors.login_username ? "is-invalid" : "")} placeholder="Enter Username" name="login_username"/>
                            {errors.login_username && <p className="text-danger">Username is required</p>}
                          </div>

                          <div className="d-flex flex-column mt-8 mb-8">
                            <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                              <span className="required">Password</span>
                            </label>

                            <input {...register("login_password", { required: true })} type="password" autoComplete="off" className={"form-control " + (errors.login_password ? "is-invalid" : "")} name="login_password" placeholder="Enter Password" />
                            {errors.login_password && <p className="text-danger">Password is required</p>}
                          </div>

                          {errors.notRegisteredInput && <Alert variant="danger" className="text-center">{errors.notRegisteredInput.message}</Alert>}

                          {/* start action buttons */}
                          <div className="text-end mt-12">
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
                        <form id="chapter-charter-sign-up-form" name="chapter-charter-sign-up-form" className="form px-12" action="submit" onSubmit={handleSubmit(handleUserSignup)}>

                          <div className="d-flex flex-column mt-8 mb-8">
                            <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                              <span className="required">Username</span><span className="text-muted ps-4 fs-7">Must be unique and more than 5 characters</span>
                            </label>

                            <input {...register("username", { required: true, minLength: 5 })} type="text" autoComplete="off" className={"form-control " + (errors.username ? "is-invalid" : "")} placeholder="Enter Username" name="username" />
                            {errors.username?.type === "required" && <p className="text-danger">Username is required</p>}
                            {errors.username?.type === "minLength" && <p className="text-danger">Username must be at least 5 characters long</p>}
                          </div>

                          <div className="d-flex flex-column mt-8 mb-8">
                            <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                              <span className="required">Password</span><span className="text-muted ps-4 fs-7">Must be more than 7 characters</span>
                            </label>

                            <input {...register("password", { required: true, minLength: 7 })} type="password" autoComplete="off" className={"form-control " + (errors.password ? "is-invalid" : "")} name="password" placeholder="Enter Password" />
                            {errors.password?.type === "required" && <p className="text-danger">Password is required</p>}
                            {errors.password?.type === "minLength" && <p className="text-danger">Password must be at least 7 characters long</p>}
                          </div>

                          <div className="row">
                            <div className="d-flex col-6 mt-8">
                              <div className="row align-items-baseline">
                                <div className="col-3">
                                  <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                                    <span className="required">Screen Name</span>
                                  </label>
                                </div>

                                <div className="col-9">
                                  <input {...register("screenname", { required: true })} type="text" autoComplete="off" className={"form-control w-450px " + (errors.screenname ? "is-invalid" : "")} name="screenname" placeholder="Enter Screen Name" />
                                  {errors.screenname && <p className="text-danger">Screenname is required</p>}
                                </div>
                              </div>
                            </div>

                            <div className="d-flex col-6 justify-content-evenly mt-8 mb-8 px-0">
                              <div className="row align-items-baseline">
                                <div className="col-3">
                                  <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
                                    <span className="pe-2">Profile Picture</span>
                                    <ToolTip placement="right" icon="info" message="Profile pictures must be links which end in .jpg or .png for the site to render them properly. If you submit a bad image, you can always change it through your account tab later on. " />
                                  </label>
                                </div>

                                <div className="col-9">
                                  <input {...register("avatar_img")} type="text" autoComplete="off" className="form-control w-450px" name="avatar_img" placeholder="Enter Picture URL" />
                                </div>
                              </div>
                            </div>
                          </div>

                          {errors.notRegisteredInput && <Alert variant="danger" className="text-center">{errors.notRegisteredInput.message}</Alert>}

                          {/* start action buttons */}
                          <div className="text-end mt-12">
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