import { Link } from "react-router-dom";
import { useTheme } from "./theme_context";

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

import textLogo from "./imgs/logo_text.png";
import lightLogo from "./imgs/logo_light.png";
import genericAvatar from "./imgs/generic_avatar_img.png"


function Navigation({ currentUser, handleUserLogout }) {

  library.add(faCircleHalfStroke)

  const { theme, changeTheme } = useTheme()

  return (
    <div id="kt_app_header" className="app-header">
      <div className="app-container container-xxl d-flex align-items-stretch justify-content-between"
        id="kt_app_header_container">

        {/* logo with link */}
        <div className="d-flex align-items-center flex-grow-1 flex-lg-grow-0 me-lg-9">
          <Link to="/">
            <img alt="chapter charter logo" src={textLogo} className="h-20px h-lg-45px app-sidebar-logo-default theme-light-show" />
            <img alt="chapter charter logo" src={lightLogo} className="h-20px h-lg-45px app-sidebar-logo-default theme-dark-show" />

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
                <Link className="menu-link" to="/accounts">Account</Link>
              </div>
            </div>
          </div>
          {/* end of navbar links and styling */}
          {/* navbar user and styling */}
          <div className="app-navbar flex-shrink-0">
            <DropdownButton id="theme-dropdown-button" title={<FontAwesomeIcon icon="fa-solid fa-circle-half-stroke" />} size="sm" variant="outline-light" className="theme-toggle align-self-center">
              <Dropdown.Item onClick={() => changeTheme("light")}>
                <span>
                  <svg style={{ width: '14px' }} className="me-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M505.2 324.8l-47.73-68.78l47.75-68.81c7.359-10.62 8.797-24.12 3.844-36.06c-4.969-11.94-15.52-20.44-28.22-22.72l-82.39-14.88l-14.89-82.41c-2.281-12.72-10.76-23.25-22.69-28.22c-11.97-4.936-25.42-3.498-36.12 3.844L256 54.49L187.2 6.709C176.5-.6016 163.1-2.039 151.1 2.896c-11.92 4.971-20.4 15.5-22.7 28.19l-14.89 82.44L31.15 128.4C18.42 130.7 7.854 139.2 2.9 151.2C-2.051 163.1-.5996 176.6 6.775 187.2l47.73 68.78l-47.75 68.81c-7.359 10.62-8.795 24.12-3.844 36.06c4.969 11.94 15.52 20.44 28.22 22.72l82.39 14.88l14.89 82.41c2.297 12.72 10.78 23.25 22.7 28.22c11.95 4.906 25.44 3.531 36.09-3.844L256 457.5l68.83 47.78C331.3 509.7 338.8 512 346.3 512c4.906 0 9.859-.9687 14.56-2.906c11.92-4.969 20.4-15.5 22.7-28.19l14.89-82.44l82.37-14.88c12.73-2.281 23.3-10.78 28.25-22.75C514.1 348.9 512.6 335.4 505.2 324.8zM456.8 339.2l-99.61 18l-18 99.63L256 399.1L172.8 456.8l-18-99.63l-99.61-18L112.9 255.1L55.23 172.8l99.61-18l18-99.63L256 112.9l83.15-57.75l18.02 99.66l99.61 18L399.1 255.1L456.8 339.2zM256 143.1c-61.85 0-111.1 50.14-111.1 111.1c0 61.85 50.15 111.1 111.1 111.1s111.1-50.14 111.1-111.1C367.1 194.1 317.8 143.1 256 143.1zM256 319.1c-35.28 0-63.99-28.71-63.99-63.99S220.7 192 256 192s63.99 28.71 63.99 63.1S291.3 319.1 256 319.1z" /></svg>
                  Light
                </span>
              </Dropdown.Item>
              <Dropdown.Item onClick={() => changeTheme("dark")}>
                <span>
                  <svg style={{ width: '14px' }} className="me-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M421.6 379.9c-.6641 0-1.35 .0625-2.049 .1953c-11.24 2.143-22.37 3.17-33.32 3.17c-94.81 0-174.1-77.14-174.1-175.5c0-63.19 33.79-121.3 88.73-152.6c8.467-4.812 6.339-17.66-3.279-19.44c-11.2-2.078-29.53-3.746-40.9-3.746C132.3 31.1 32 132.2 32 256c0 123.6 100.1 224 223.8 224c69.04 0 132.1-31.45 173.8-82.93C435.3 389.1 429.1 379.9 421.6 379.9zM255.8 432C158.9 432 80 353 80 256c0-76.32 48.77-141.4 116.7-165.8C175.2 125 163.2 165.6 163.2 207.8c0 99.44 65.13 183.9 154.9 212.8C298.5 428.1 277.4 432 255.8 432z" /></svg>
                  Dark
                </span>
              </Dropdown.Item>
            </DropdownButton>
            <div className="app-navbar-item ms-1 ms-md-3" id="kt_header_user_menu_toggle">
              <div className="symbol symbol-30px symbol-md-40px">

                {currentUser
                  ?
                  <>
                    <div className="symbol">

                      <Link to="/accounts">
                        <img src={currentUser.avatar_img.length === 0 ? genericAvatar : currentUser.avatar_img} alt="user" className="cursor-pointer symbol symbol-30px symbol-md-40px me-4" width="40" height="40" />
                      </Link>
                      <span className="me-2">Logged in as </span>
                      <span className="custom-cc-logo-font">{currentUser.screenname}</span>
                      <button className="btn btn-sm btn-bg-light btn-active-light-danger btn-color-gray-700 px-4 py-2 ms-4 mb-1" onClick={handleUserLogout}>Logout</button>
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