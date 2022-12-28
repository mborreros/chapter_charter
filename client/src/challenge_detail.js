import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import moment from 'moment'

import defaultBook from "./imgs/generic_book.png";

function ChallengeDetail({ selectedChallenge, setSelectedChallenge, challenges, setChallenges, collections, setCollections, handleServerError, formatDate }) {

  function handleChallengeDelete(e) {
    let collectionId = selectedChallenge.category === "collection_id" ? selectedChallenge.category_identifier : false
    let thisChallengeId = e.currentTarget.id

    if (window.confirm("Are you sure you want to permenantly delete this challenge?")) {
      fetch(`/api/challenges/${thisChallengeId}`, {
        method: "DELETE"
      })
        .then(response => handleServerError(response))
        .then(() => {
          let updatedChallengeArray = challenges.filter((challenges) => challenges.id !== parseInt(thisChallengeId))
          if (collectionId) {
            let updatedCollectionArray = collections.map((collection) => collection.id == parseInt(collectionId) ? { ...collection, challenge_locked: false } : collection)
            setCollections(updatedCollectionArray)
          }
          setChallenges(updatedChallengeArray)
          navigate("../challenges", { replace: true })
        })
        .catch(error => console.log(error))
    }
  }

  const challengeLocation = useLocation()
  const navigate = useNavigate();

  useEffect(() => { 
    if (challengeLocation?.state) {
      setSelectedChallenge(challengeLocation?.state.challenge) 
    } else {
      navigate("../not_found", { replace: true })
    }
  }, [])

  let bookProgressList
  bookProgressList = selectedChallenge?.books?.map((book) => {
    return (
      <div className="d-flex align-items-center mb-7" key={book.id}>
        <div className="collection-page-book-icon me-5">
          <img src={book.cover_img ? book.cover_img.replace("S.jpg", "L.jpg") : defaultBook} className="" alt="" />
        </div>

        <div className="flex-grow-1 text-capitalize">
          <span className='fs-5'>{book.title}</span>
          <span className="text-muted d-block">{book.author}</span>
        </div>

      </div>
    )
  })

  let collectionName = collections?.filter(collection => collection.id == selectedChallenge?.category_identifier)[0]?.name

  let today = new Date()
  today.setHours(0, 0, 0, 0)
  let challengeStartDate = new Date(selectedChallenge?.start_date)
  challengeStartDate.setHours(0, 0, 0, 0)
 
  let futureChallenge = false
  let challengeStatusDescription
  if (challengeStartDate > today) {
    challengeStatusDescription = <p>Challenge has not yet started</p>
    futureChallenge = true
  } else {
    futureChallenge = false
    if (selectedChallenge?.active) {
      challengeStatusDescription = <p>Challenge is currently <span className="fw-bold text-success">active</span></p>
    } else {
      challengeStatusDescription = <p>Challenge was <span className={"fw-bold " + (selectedChallenge?.successful ? "text-success" : "text-danger")}>{selectedChallenge?.successful ? "successful" : "unsuccessful"}</span></p>
    }
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

                    {/* book information card */}
                    <div className="col-md-4 mb-md-5 mb-xl-10">
                      <div className="card idv-challenge-card">

                        {/* start header */}
                        <div className='card-header align-items-center border-0 mt-4'>
                          <h3 className='card-title align-items-start flex-column'>
                            <span className='fw-bold mb-2 text-dark pt-4'>Challenge Details</span>
                            <span className='text-muted fw-semibold fs-7'>&nbsp;</span>
                            <span className='fw-bold fs-2 text-capitalize'>{selectedChallenge?.name}</span>
                          </h3>
                        </div>
                        {/* end header */}

                        {/* start card body */}
                        <div className='card-body pt-4'>
                          <p className={selectedChallenge?.description.length > 0 ? "" : "d-none"}>{selectedChallenge?.description}</p>
                          {selectedChallenge?.category.length > 0 ?
                            <p className='text-capitalize'>Category: {selectedChallenge?.category === "collection_id" ? "Collection" : selectedChallenge?.category} - {selectedChallenge?.category === "collection_id" ? collectionName : selectedChallenge?.category_identifier}</p>
                            : null
                          }
                          {challengeStatusDescription}
                          <p className='pt-4 text-muted'>{futureChallenge ? "Starting" : "Started"} {moment(selectedChallenge?.start_date).from(new Date())}</p>
                        </div>
                        {/* end card body */}
                      </div>

                    </div>

                    {/* collection book shelf */}
                    <div className="col-md-8 mb-md-5 mb-xl-10">
                      <div className="card">

                        {/* start header */}
                        <div className='card-header align-items-center border-0 mt-4'>
                          <h3 className='card-title align-items-start flex-column'>
                            <span className='fw-bold mb-2 text-dark'>Progress</span>
                            <span className='text-muted fw-semibold fs-7'>{selectedChallenge?.books.length} of {selectedChallenge?.goal_number} Book{selectedChallenge?.goal_number == 1 ? "" : "s"} completed</span>
                          </h3>
                          <div>
                            <button id={selectedChallenge?.id} className="btn btn-sm btn-danger mx-4" onClick={(e) => handleChallengeDelete(e)}>Delete Challenge</button>
                          </div>
                        </div>
                        {/* end header */}

                        {/* begin::Body */}
                        <div className='card-body pt-5'>

                          {bookProgressList}

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
    </div>
  )
}

export default ChallengeDetail;