import { useLocation, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';

import { faGenderless } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useEffect, useState } from 'react';
import moment from 'moment'

// import JourneyEntryModal from './journey_entry_modal';

import defaultBook from "./imgs/generic_book.png";

function JourneyDetail({ handleShow, setSelectedJourney, selectedJourney, selectedJourneyEntries, findSelectedJourney }) {

  library.add(faGenderless);

  const location = useLocation();
  // location.state.journey.id <- selected journey's id
  const pageParams = useParams();

  const [bookDetails, setBookDetails] = useState({})

  // sorting and setting user selected journey for journey detail page
  useEffect (() => {findSelectedJourney(pageParams.id)}, []) 

  useEffect(() => {
    if (selectedJourney) {
      fetch(`https://openlibrary.org/works/${selectedJourney?.book.book_api_num}.json`)
        .then(res => res.json())
        .then(data =>
          setBookDetails({
            description: typeof data.description === "string" ? data.description : "",
            genres: data.subjects ? data.subjects.slice(0, 10).join(" / ") : "none listed",
            published: data.first_publish_date ? "published " + data.first_publish_date : ""
          }))
    }
  }, [selectedJourney])

  // creating reading log plot points
  let journeyEntryItems
  journeyEntryItems = selectedJourney?.journey_entries?.map((journey_entry) => {
    return (
      <div className='timeline-item' key={journey_entry.id}>
        {/* begin::Label */}
        <div className='timeline-label fw-bold text-gray-800 fs-6'>{journey_entry.progress} %</div>
        {/* end::Label */}

        {/* begin::Badge */}
        <div className='timeline-badge'>
          <FontAwesomeIcon icon="fa-genderless" className={'fs-1 ' + (journey_entry.progress < 100 ? 'in-progress-point-icon' : 'completion-point-icon')} />
        </div>
        {/* end::Badge */}

        {/* begin::Text */}
        <div className='fw-mormal timeline-content text-gray-800 ps-3'>
          {moment(journey_entry.created_at).calendar()}
        </div>
        {/* end::Text */}
      </div>
    )
  })

  return (

    <div className="d-flex flex-column flex-root app-root" id="kt_app_root">
      <div className="app-page flex-column flex-column-fluid" id="kt_app_page">
        <div className="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper">
          <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
            <div className="d-flex flex-column flex-column-fluid">
              
              <div id="kt_app_content" className="app-content flex-column-fluid">
                <div id="kt_app_content_container" className="app-container container-xxl">
                  <div className="row g-5 g-xl-10 mb-5 mb-xl-10 align-items-stretch">

                    {/* book information card */}
                    <div className="col-md-6 mb-md-5 mb-xl-10">
                      <div className="card">

                        {/* start header */}
                        <div className='card-header align-items-center border-0 mt-4'>
                          <h3 className='card-title align-items-start flex-column'>
                            <span className='fw-bold mb-2 text-dark'>Book Details</span>
                            <span className='text-muted fw-semibold fs-7'>&nbsp;</span>
                          </h3>
                        </div>
                        {/* end header */}

                        {/* begin::Body */}
                        <div className='card-body pt-5'>
                          <div className='row'>
                            <div className='col-4'>
                              <img alt={selectedJourney?.book.title + "book cover"} src={selectedJourney?.book.cover_img ? selectedJourney.book.cover_img.replace("S.jpg", "L.jpg") : defaultBook} className="img-fluid" />
                            </div>
                            <div className='col-8'>
                              <div className='d-flex flex-column h-100'>
                                <h2 className='fw-normal'>{selectedJourney?.book.title}</h2>
                                <h4 className='fw-normal text-muted'>{selectedJourney?.book.author}</h4>
                                <p className='fs-8 mb-0'>{bookDetails.published}</p>
                                <p className='fs-8 mb-6'>{selectedJourney?.book.length} pages</p>
                                <p className='mb-6'>{bookDetails.description}</p>
                                <p className='fs-8 mt-auto'>Genres: <span className='text-muted'>{bookDetails.genres}</span></p>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* end: Card Body */}
                      </div>

                    </div>

                    {/* journey log card */}
                    <div className="col-md-6 mb-md-5 mb-xl-10">
                      <div className="card">

                        {/* start header */}
                        <div className='card-header align-items-center border-0 mt-4'>
                          <h3 className='card-title align-items-start flex-column'>
                            <span className='fw-bold mb-2 text-dark'>Reading Log</span>
                            <span className='text-muted fw-semibold fs-7'>{selectedJourney?.journey_entries.length} Entries</span>
                          </h3>
                        </div>
                        {/* end header */}

                        {/* begin::Body */}
                        <div className='card-body pt-5'>
                          {/* begin::Timeline */}
                          <div className='timeline-label'>

                            {journeyEntryItems}

                            {/* start inital journey creation entry*/}
                            <div className='timeline-item'>
                              {/* begin::Label */}
                              <div className='timeline-label fw-bold text-gray-800 fs-6'>0 %</div>
                              {/* end::Label */}

                              {/* begin::Badge */}
                              <div className='timeline-badge'>
                                <FontAwesomeIcon icon="fa-genderless" className='start-point-icon fs-1' />
                              </div>
                              {/* end::Badge */}

                              {/* begin::Text */}
                              <div className='fw-mormal timeline-content text-gray-800 ps-3'>
                                Started {moment(selectedJourney?.start_date).from(new Date())}
                              </div>
                              {/* end::Text */}
                            </div>
                            {/* end inital journey creation entry*/}

                          </div>
                          {/* end::Timeline */}
                        </div>
                        {/* end: Card Body */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* start breadcrumb */}
      {/* <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1"> */}
      {/* <!--begin::Item--> */}
      {/* <li className="breadcrumb-item text-muted"> */}
      {/* <Link to="/" className="text-muted text-hover-primary">Home</Link> */}
      {/* </li> */}
      {/* <li className="breadcrumb-item">
                        <span className="bullet bg-gray-400 w-5px h-2px"></span>
                      </li>
                      <li className="breadcrumb-item text-muted">
                        <Link to="/journeys" className="text-muted text-hover-primary">Journeys</Link>
                      </li> */}
      {/* <!--end::Item--> */}
      {/* <!--begin::Item--> */}
      {/* <li className="breadcrumb-item">
                        <span className="bullet bg-gray-400 w-5px h-2px"></span>
                      </li> */}
      {/* <!--end::Item--> */}
      {/* <!--begin::Item--> */}
      {/* <li className="breadcrumb-item text-muted">Entries</li> */}
      {/* <!--end::Item--> */}
      {/* </ul> */}
      {/* end breadcrumb */}
    </div>
  )
}

export default JourneyDetail;