import { useState } from "react";

// import Select from 'react-select'
// import Async, { useAsync } from 'react-select/async';
// import AsyncSelect from 'react-select/async'
import Button from "react-bootstrap/esm/Button";
import Modal from 'react-bootstrap/Modal'

function JourneyModal({ show, handleClose, user }) {

  const [query, setQuery] = useState("");
  const [searchedBooks, setSearchedBooks] = useState([])

  function searchLibrary(e) {
    e.preventDefault()
    console.log("the user clicked to search the library with query:"+ query)
    fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`)
    .then((response) => response.json())
    .then((books) => setSearchedBooks(books.docs))
  }


  let searchResults
  if (searchedBooks) {
    searchResults = searchedBooks?.map((bookResult) => {

      let genres = []
      if (bookResult.subject){ 
        bookResult.subject.map((genre, index) => {
          // takes only the first 5 genres listed
          if (index <5) {
            genres.push(genre)
        } return genres
      })}

      return(
      <div className="card search-book-card mb-5" key={bookResult.key}>
        <div className="card-header justify-content-start align-items-start my-6">
          {bookResult.isbn ? <img className="book-image-search-result"src={`https://covers.openlibrary.org/b/isbn/${bookResult.isbn[0]}-M.jpg`} /> : null}
          <div className="card-title flex-column align-items-start justify-content-start mx-8">
            {bookResult.title ? <span className="fs-3 fw-bold">{bookResult.title}</span> : null}
            {bookResult.author_name ? <span className="fs-5">{bookResult.author_name[0]}</span> : null}
            {bookResult.subject ? <span className="text-grey opacity-50 pt-1 fw-semibold fs-6">{genres.join(" ")}</span> : null}
            {bookResult.number_of_pages_median && bookResult.first_publish_year ? <span className="text-grey opacity-50 pt-1 fw-semibold fs-6">{bookResult.number_of_pages_median} pages | first published in {bookResult.first_publish_year}</span> : <span className="text-grey opacity-50 pt-1 fw-semibold fs-6">first published in {bookResult.first_publish_year}</span>}

              <Button className="start-journey-button" variant="secondary" size="sm" onClick={(bookResult) => console.log(bookResult)}>start this journey</Button>

          </div>
        </div>
      </div>
      )
    }
    )
  }

  return(
  <Modal show={show} onHide={() => handleClose()} dialogClassName="modal-90w" centered size="lg">
	
				{/* start modal content */}
					<Modal.Body>
	
							{/* start form */}
							<form id="kt_modal_new_target_form" className="form" action="submit" autoComplete="off">
	
								{/* start header */}
								<Modal.Header className="border-0 justify-content-center flex-wrap">
									<h1 className="mb-3 text-center">Start a new Reading Journey</h1>
                  <p className="text-muted fw-semibold fs-6 text-center">Begin by searching our library and selecting your next book. Then let the literary adventure begin!</p>
								</Modal.Header>
								{/* end header */}
	
								{/* start collection name input group */}
								<div className="d-flex flex-column mt-8 mb-8 fv-row">
									{/* start label */}
									{/* <label className="d-flex align-items-center fs-6 fw-semibold mb-2">
										<span className="required">Search Title or Author</span>
										<i className="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip" title="library_search"></i>
									</label> */}
                  <div className="d-flex">
                    <input type="text" className="form-control form-control-solid" placeholder="Search the Library using a Author name or Book title" name="name" onChange={(e) => setQuery(e.target.value)}/>
                    <button type="submit" id="kt_modal_new_target_submit" className="text-end btn btn-light btn-sm me-3" onClick={(e) => searchLibrary(e)}>Search</button>
                  </div>

									{/* end label */}
									{/* <AsyncSelect loadOptions={loadOptions} onInputChange={(value) => setQuery(value)}/> */}
								</div>
								{/* end collection name input group */}
                <div className="book-results-list">
                  {searchResults}
                </div>

								{/* start action buttons */}
								{/* <div className="text-end">
									<button type="reset" id="kt_modal_new_target_cancel" className="btn btn-light btn-sm me-3">Clear</button>
									<button type="submit" id="kt_modal_new_target_submit" className="btn btn-primary btn-sm">
										<span className="indicator-label">Submit</span>
										<span className="indicator-progress">Please wait...
										<span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
									</button>
								</div> */}
								{/* end action buttons */}
	
							</form>
							{/* end form */}
						</Modal.Body>
						{/* end modal body */}
					{/* end modal content */}
			</Modal>
  )
}

export default JourneyModal