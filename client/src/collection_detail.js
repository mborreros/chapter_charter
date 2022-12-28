import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import moment from 'moment'
import defaultBook from "./imgs/generic_book.png";

import ToolTip from './tool_tip';

function CollectionDetail({ selectedCollection, setSelectedCollection, collections, setCollections, handleCollectionEntryDelete, handleServerError }) {

  // importing font awesome icons
  library.add(faXmark);

  const collectionLocation = useLocation()
  const navigate = useNavigate();

  const [isCollectionEditable, setIsCollectionEditable] = useState(false)

  useEffect(() => {
    if (collectionLocation?.state) {
      setSelectedCollection(collectionLocation?.state.collection)
    }
    else {
      navigate("../not_found", { replace: true })
    }
  }, [])

  function handleCollectionDelete(e) {
    let thisCollectionId = e.currentTarget.id
    if (window.confirm("Are you sure you want to permenantly delete this collection?")) {
      fetch(`/api/collections/${thisCollectionId}`, {
        method: "DELETE"
      })
        .then(response => handleServerError(response))
        .then(() => {
          let updatedCollectionArray = collections.filter((collection) => collection.id !== parseInt(thisCollectionId))
          setCollections(updatedCollectionArray)
          navigate("../collections", { replace: true })
        })
        .catch(error => console.log(error))
    }
  }

  let bookListItems
  bookListItems = selectedCollection?.books?.map((book) => {
    return (
      <div className="d-flex align-items-center mb-7" key={book.id}>
        <div className="collection-page-book-icon me-5">
          <img src={book.cover_img ? book.cover_img.replace("S.jpg", "L.jpg") : defaultBook} className="" alt="" />
        </div>

        <div className="flex-grow-1 text-capitalize">
          <span className='fs-5'>{book.title}</span>
          <span className="text-muted d-block">{book.author}</span>
          <span>
            <button id={book.id} className={'btn btn-active-text-danger btn-sm py-1 align-baseline ' + (isCollectionEditable ? "" : "d-none")} onClick={(e) => handleCollectionEntryDelete(e)}>
              <FontAwesomeIcon icon="fa-solid fa-xmark" />
            </button>
          </span>
        </div>

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
                    <div className="col-md-4 mb-md-5 mb-xl-10">
                      <div className="card idv-collection-card">

                        {/* start header */}
                        <div className='card-header align-items-center border-0 mt-4'>
                          <h3 className='card-title align-items-start flex-column'>
                            <span className='fw-bold mb-2 text-dark pt-4'>Collection Details</span>
                            <span className='text-muted fw-semibold fs-7'>&nbsp;</span>
                            <span className='fw-bold fs-2 text-capitalize'>{selectedCollection?.name}</span>
                          </h3>
                          {selectedCollection?.challenge_locked ?
                            <div className='me-1 mb-10'>
                              <span className='text-gray-800 fs-2'>
                                <ToolTip placement="left" icon="flag" message="This Collection is involved in a Challenge!" />
                              </span>
                            </div>
                            :
                            <></>
                          }
                        </div>
                        {/* end header */}

                        {/* start card body */}
                        <div className='card-body pt-4'>
                          <p>{selectedCollection?.description}</p>
                          <p className='pt-4 text-muted'>Started {moment(selectedCollection?.created_at).from(new Date())}</p>
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
                            <span className='fw-bold mb-2 text-dark'>Shelf</span>
                            <span className='text-muted fw-semibold fs-7'>{selectedCollection?.books.length} Book{selectedCollection?.books.length == 1 ? "" : "s"}</span>
                          </h3>
                          <div>
                            <button id={selectedCollection?.id} className={"btn btn-sm btn-danger mx-4 " + (isCollectionEditable ? "" : "d-none")} onClick={(e) => handleCollectionDelete(e)}>Delete Collection</button>
                            <button disabled={selectedCollection?.challenge_locked} title={selectedCollection?.challenge_locked ? "Cannot edit a collection that is used in a challenge" : ""} className='btn btn-sm btn-light' onClick={(e) => setIsCollectionEditable(!isCollectionEditable)}>{isCollectionEditable ? "Cancel" : "Edit Books"}</button>
                          </div>
                        </div>
                        {/* end header */}

                        {/* begin::Body */}
                        <div className='card-body pt-5'>

                          {bookListItems}

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
      {/* <li className="breadcrumb-item text-muted">
                      <Link to="/" className="text-muted text-hover-primary">Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <span className="bullet bg-gray-400 w-5px h-2px"></span>
                    </li>
                    <li className="breadcrumb-item text-muted">
                      <Link to="/collections" className="text-muted text-hover-primary">Collections</Link>
                    </li> */}
      {/* <!--end::Item--> */}
      {/* <!--begin::Item--> */}
      {/* <li className="breadcrumb-item">
                      <span className="bullet bg-gray-400 w-5px h-2px"></span>
                    </li> */}
      {/* <!--end::Item--> */}
      {/* <!--begin::Item--> */}
      {/* <li className="breadcrumb-item text-muted">Shelf</li> */}
      {/* <!--end::Item--> */}
      {/* </ul> */}
      {/* end breadcrumb */}
    </div>
  )
}

export default CollectionDetail