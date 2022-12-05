import JourneyCards from "./journey_cards";
import CollectionCards from "./collection_cards";
import ChallengeCards from "./challenge_cards";

import { useLocation } from 'react-router-dom';

function ListPage({ journeys, collections, challenges }) {
  // getting pathname to determine which page to show
  const location = useLocation();
  // capitalize page name
  const this_page_title = location.pathname.substring(1).charAt(0).toUpperCase() + location.pathname.substring(1).slice(1)

  return(
      <div className="d-flex flex-column flex-root app-root" id="kt_app_root">
        <div className="app-page flex-column flex-column-fluid" id="kt_app_page">
          <div className="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper">
            <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
              <div className="d-flex flex-column flex-column-fluid">
                <div id="kt_app_toolbar" className="app-toolbar py-3 py-lg-6">
                  <div id="kt_app_toolbar_container" className="app-container container-xxl d-flex flex-stack">
                    {/* page title */}
                    <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                    <h1>{this_page_title}</h1>
                    </div>
                    {/* page title end */}
                    {/* add a journey button */}
                    <div className="d-flex align-items-center gap-2 gap-lg-3">
                      <a href="#top" className="btn btn-sm fw-bold btn-primary" data-bs-toggle="modal"
                        data-bs-target="#kt_modal_create_app">Start a new {this_page_title.slice(0, -1)}</a>
                    </div>
                    {/* add a journey button end */}
                  </div>
                </div>
                <div id="kt_app_content" className="app-content flex-column-fluid">
                  <div id="kt_app_content_container" className="app-container container-xxl">
                    <div className="row g-5 g-xl-10 mb-5 mb-xl-10 align-items-stretch">

                        { this_page_title === "Journeys" ? <JourneyCards journeys={journeys}/> : null }
                        { this_page_title === "Collections" ? <CollectionCards collections={collections}/> : null } 
                        { this_page_title === "Challenges" ? <ChallengeCards challenges={challenges}/> : null } 

                        {/* one journey card */}
                        {/* <div className="card card-flush bgi-no-repeat bgi-size-contain bgi-position-x-end h-md-50 mb-5 mb-xl-10">
                          <div className="card-header pt-5 align-items-start"> */}
                          {/* book cover */}
                            {/* <div className="card-title flex-column">
                              <img src="https://picsum.photos/100/125"></img>
                            </div> */}
                          {/* book cover end */}
                            {/* <div className="card-title flex-column align-items-end justify-content-end">
                              <span className="fs-2hx fw-bold text-white lh-1 ls-n2">book title</span>
                              <span className="text-white opacity-75 pt-1 fw-semibold fs-6">book author</span>
                              <span className="text-white opacity-75 pt-1 fw-semibold fs-6">book genre(s)</span>
                            </div>
                          </div>
                          <div className="card-body d-flex align-items-end pt-0">
                            <div className="d-flex align-items-center flex-column mt-3 w-100">
                              <div
                                className="d-flex justify-content-between fw-bold fs-6 text-white opacity-75 w-100 mt-auto mb-2">
                                <span>start date</span>
                                <span>page number | current percent completion</span>
                              </div> */}
                              {/* progress bar */}
                              {/* <div className="h-8px mx-3 w-100 bg-white bg-opacity-50 rounded">
                                {/* define width by adding class name w-% <- percentage as an integer */}
                                {/* <div className= {'"bg-white bg-opacity-100 rounded h-8px w-' + progress} role="progressbar"
                                  aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                              </div> */}
                              {/* progress bar end */}
                            {/* </div>
                          </div>
                        </div> */}
                        {/* one journey card end */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
}

export default ListPage;