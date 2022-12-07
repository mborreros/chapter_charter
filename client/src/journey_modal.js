import { useState } from "react";
import Modal from 'react-bootstrap/Modal'

import BookSearch from "./book_select_search";

function JourneyModal({ show, handleClose, journeys, setJourneys, books, setBooks, user }) {

  // console.log(user?.id)

  const [selectedValue, setSelectedValue] = useState(null);

  // resets select search on clear
  function resetModalForm() {
    document.getElementById("book-searh-form").reset()
    setSelectedValue("")
  }

  function handleBookSubmit(e, user) {
    e.preventDefault()

    console.log(user)
    let bookKey = selectedValue.key.replace("/works/", "")

    // selectedValue is the full book from Book API

    // from Book API, need:
      // selectedValue.key <- allow us to search Books API for their record https://openlibrary.org/${selectedValue.key}.json
      // selectedValue.title <- title as string
      // selectedValue.author_name[0] <- author as a string from the array
      // selectedValue.number_of_pages_median <- length as integer
      // selectedValue.option.subject?.slice(0,4) <- first 4 genres as an array
      // selectedValue.cover_i <- cover image as https://covers.openlibrary.org/b/id/${selectedValue.cover_i}-S.jpg

    let this_book_record = books.find((book) => book.book_api_num == bookKey)

    if (this_book_record) {
      // find book that has matching key in the db and start a journey with that
      console.log("this book was found in the db already") 
      console.log(this_book_record)

      startNewJourney(this_book_record)

    } else {
      
      console.log("this is not in the db yet and needs to be added")

      let bookData = {
        "title" : selectedValue.title,
        "author" : selectedValue.author_name[0],
        "length" : selectedValue.number_of_pages_median,
        "genre" : selectedValue.subject ? selectedValue.subject.slice(0,4) : null,
        "cover_img" : selectedValue.cover_i ? `https://covers.openlibrary.org/b/id/${selectedValue.cover_i}-S.jpg` : null,
        "book_api_num" : bookKey
      }

      // post new book to the db
      fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify(bookData)
      })
      .then(response => {
        if (response.ok){
          response.json().then((new_book) => {
            setBooks(...books, new_book)
            startNewJourney(new_book)
          })
        } else {
          response.json().then((errors) => console.log(errors))
        }
      })
    }
  }

  function formatDate() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    return `${year}-${month}-${day}`;
  }

  function startNewJourney(book) {

    let new_journey 
    new_journey = {
      "user_id" : user.id,
      "book_id" : book.id,
      "start_date" : formatDate(),
      "manually_completed" : false
    }

    fetch("/api/journeys", {
      method: "POST",
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify(new_journey)
    })
    .then(response => {
      response.json().then((this_journey) => {
        setJourneys([...journeys, this_journey])
        handleClose()
      })
    })
  }

  return(
  <Modal show={show} onHide={() => handleClose()} dialogClassName="modal-90w" centered size="lg">
	
				{/* start modal content */}
					<Modal.Body>
	
							{/* start form */}
							<form id="book-searh-form" className="form" action="submit" autoComplete="off" onSubmit={(e) => handleBookSubmit(e)}>
	
								{/* start header */}
								<Modal.Header className="border-0 justify-content-center flex-wrap">
									<h1 className="mb-3 text-center">Start a new Reading Journey</h1>
                  <p className="text-muted fw-semibold fs-6 text-center">Begin by searching our library and selecting your next book. Then let the literary adventure begin!</p>
								</Modal.Header>
								{/* end header */}
	
								<div className="d-flex flex-column mt-8 mb-8 fv-row">

                  <BookSearch selectedValue={selectedValue} setSelectedValue={setSelectedValue}/>

								</div>

								{/* start action buttons */}
								<div className="text-end">
									<button type="reset" id="kt_modal_new_target_cancel" className="btn btn-light btn-sm me-3" onClick={(form) => resetModalForm(form)}>Clear</button>
									<button type="submit" id="kt_modal_new_target_submit" className="btn btn-primary btn-sm">
										<span className="indicator-label">Start this Journey</span>
										<span className="indicator-progress">Please wait...
										<span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
									</button>
								</div>
								{/* end action buttons */}
	
							</form>
							{/* end form */}
						</Modal.Body>
						{/* end modal body */}
					{/* end modal content */}
			</Modal>
  )
}

export default JourneyModal;