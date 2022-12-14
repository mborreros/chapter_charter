import { Link } from "react-router-dom";
// import Button from 'react-bootstrap/Button';

import textLogo from "./imgs/logo_text.png";

function Navigation({ currentUser, handleUserLogout }) {

  return (
    <div id="kt_app_header" className="app-header">
      <div className="app-container container-xxl d-flex align-items-stretch justify-content-between"
        id="kt_app_header_container">

        {/* logo with link */}
        <div className="d-flex align-items-center flex-grow-1 flex-lg-grow-0 me-lg-9">
          <Link to="/">
            <img alt="chapter charter logo" src={textLogo} className="h-20px h-lg-45px app-sidebar-logo-default theme-light-show" />
          </Link>
        </div>
        {/* end logo with link */}

        {/* navbar links and styling */}
        <div className="d-flex align-items-stretch justify-content-between flex-lg-grow-1" id="kt_app_header_wrapper">
          <div className="app-header-menu app-header-mobile-drawer align-items-stretch">

            <div className={"menu menu-rounded menu-column menu-lg-row my-5 my-lg-0 align-items-stretch fw-semibold px-2 px-lg-0 " + (currentUser ? "" : "d-none")} id="kt_app_header_menu">

              <div className="menu-item">
                <Link className="menu-link" to="/">Dashboard</Link>
              </div>
              <div className="menu-item">
                <Link className="menu-link" to="/journeys">Journeys</Link>
              </div>
              <div className="menu-item">
                <Link className="menu-link" to="/collections">Collections</Link>
              </div>
              <div className="menu-item">
                <Link className="menu-link" to="/challenges">Challenges</Link>
              </div>
              <div className="menu-item">
                <Link className="menu-link" to="/statistics">Statistics</Link>
              </div>
            </div>
          </div>
          {/* end of navbar links and styling */}
          {/* navbar user and styling */}
          <div className="app-navbar flex-shrink-0">
            <div className="app-navbar-item ms-1 ms-md-3" id="kt_header_user_menu_toggle">
              <div className="symbol symbol-30px symbol-md-40px">

                {currentUser
                  ?
                  <>
                    <div className="symbol">
                    <Link to="/account">
                      <img src={currentUser.avatar_img} alt="user" className="cursor-pointer symbol symbol-30px symbol-md-40px me-4" width="40" height="40" />
                    </Link>
                      <span className="me-2">Logged in as </span>
                      <span className="custom-cc-logo-font">{currentUser.screenname}</span>
                    <button className="btn btn-sm btn-bg-light btn-active-light-danger btn-color-gray-700 px-4 py-2 ms-4" onClick={handleUserLogout}>Logout</button>
                    </div>
                  </>
                  :
                  <>
                    <div className="app-header-menu app-header-mobile-drawer align-items-stretch">
                      <div className="menu menu-rounded menu-column menu-lg-row my-5 my-lg-0 align-items-stretch fw-semibold px-2 px-lg-0" id="kt_app_header_menu">
                        <div className="menu-item">
                          <Link className="menu-link" to="/signup">Create an account</Link>
                        </div>
                        <div className="menu-item">
                          <Link className="menu-link" to="/login">Login</Link>
                        </div>
                      </div>
                    </div>
                  </>
                }

              </div>
            </div>
            {/* end navbar user and styling */}
          </div>
        </div>
      </div>
    </div>

  );
}

export default Navigation;