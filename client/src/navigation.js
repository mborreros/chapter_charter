
function Navigation() {
  return(

    <div id="kt_app_header" className="app-header">
      <div className="app-container container-xxl d-flex align-items-stretch justify-content-between"
        id="kt_app_header_container">
        <div className="d-flex align-items-center flex-grow-1 flex-lg-grow-0 me-lg-15">
          <a href="../../demo1/dist/index.html">
            <img alt="Logo" src="assets/media/logos/default.svg"
              className="h-20px h-lg-30px app-sidebar-logo-default theme-light-show" />
            <img alt="Logo" src="assets/media/logos/default-dark.svg"
              className="h-20px h-lg-30px app-sidebar-logo-default theme-dark-show" />
          </a>
        </div>
        <div className="d-flex align-items-stretch justify-content-between flex-lg-grow-1" id="kt_app_header_wrapper">
          <div className="app-header-menu app-header-mobile-drawer align-items-stretch">
            <div className="menu menu-rounded menu-column menu-lg-row my-5 my-lg-0 align-items-stretch fw-semibold px-2 px-lg-0" id="kt_app_header_menu">
              <div className="menu-item">
                <span className="menu-link">Dashboards</span>
              </div>
              <div className="menu-item">
                <span className="menu-link">Pages</span>
              </div>
              <div className="menu-item">
                <span className="menu-link">Apps</span>
              </div>
              <div className="menu-item">
                <span className="menu-link">Layouts</span>
              </div>
              <div className="menu-item">
                <span className="menu-link">Help</span>
              </div>
            </div>
          </div>
          <div className="app-navbar flex-shrink-0">
            <div className="app-navbar-item ms-1 ms-md-3" id="kt_header_user_menu_toggle">
              <div className="cursor-pointer symbol symbol-30px symbol-md-40px">
                <img src="assets/media/avatars/300-1.jpg" alt="user" />
              </div>
            </div>
            <div className="app-navbar-item d-lg-none ms-2 me-n3" title="Show header menu">
              <div className="btn btn-icon btn-active-color-primary w-30px h-30px w-md-35px h-md-35px"
                id="kt_app_header_menu_toggle">
                <span className="svg-icon svg-icon-2 svg-icon-md-1">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M13 11H3C2.4 11 2 10.6 2 10V9C2 8.4 2.4 8 3 8H13C13.6 8 14 8.4 14 9V10C14 10.6 13.6 11 13 11ZM22 5V4C22 3.4 21.6 3 21 3H3C2.4 3 2 3.4 2 4V5C2 5.6 2.4 6 3 6H21C21.6 6 22 5.6 22 5Z"
                      fill="currentColor" />
                    <path opacity="0.3"
                      d="M21 16H3C2.4 16 2 15.6 2 15V14C2 13.4 2.4 13 3 13H21C21.6 13 22 13.4 22 14V15C22 15.6 21.6 16 21 16ZM14 20V19C14 18.4 13.6 18 13 18H3C2.4 18 2 18.4 2 19V20C2 20.6 2.4 21 3 21H13C13.6 21 14 20.6 14 20Z"
                      fill="currentColor" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
  );
}

export default Navigation;