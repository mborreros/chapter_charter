import { useEffect, useState } from "react";
import Alert from 'react-bootstrap/Alert';

import BookSearch from "./book_select_search";

function JourneyCollectionEntryModal({ show, handleClose, journeys, setJourneys, user, formatDate, selectedCollection, collections, setCollections, handleServerError }) {

  const [selectedValue, setSelectedValue] = useState(null);
  const [loadingBooks, setLoadingBooks] = useState(false)
  const [isSelectedValue, setIsSelectedValue] = useState(false)

  function parseBookData(book) {

    // set error on form to say there is not book selected

    return ({
      "title": book.title,
      "author": book.author_name[0],
      "length": book.number_of_pages_median,
      "genre": book.subject || null,
      "cover_img": book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg` : null,
      "book_api_num": book.key.replace("/works/", "")
    })
  }

  function createCollection() {
    let bookData = selectedValue.map(selected_book => parseBookData(selected_book))

    fetch("/api/collection_entries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        collection_id: selectedCollection.id,
        book_data: bookData
      })
    })
      .then(response => {
        if (response.ok) {
          response.json().then((new_collection_entries) => {
            // console.log(new_collection_entries)
            new_collection_entries.map((new_entry) => {
              selectedCollection.books.unshift(new_entry.book)
            })
            setCollections(collections.map(collection => collection.id !== new_collection_entries[0].collection.id ? collection : selectedCollection))
            handleClose()
          })
        } else {
          response.json().then((errors) => console.log(errors))
        }
      })
  }

  function createJourney() {
    // parsing request body for nested book & journey creation
    let new_journey = {
      "user_id": user.id,
      "book_id": parseBookData(selectedValue),
      "start_date": formatDate(),
      "manually_completed": false
    }
    fetch("/api/journeys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(new_journey)
    })
      .then(response => handleServerError(response))
      .then((this_journey) => {
        setJourneys([this_journey, ...journeys])
        handleClose()
      })
      .catch(error => console.log(error))
  }

  function handleSubmit(e, selectedValue) {
    e.preventDefault()
    // cancels submission if books from fetch are not completely loaded
    if (loadingBooks) {
      return false
    }
    if (selectedValue) {
      show === "new-journey-modal" ? createJourney() : createCollection()
    } else {
      setIsSelectedValue(true)
    }
  }

  // toggle state for alert if the user selects a book from BookSearch
  useEffect(() => {
    setIsSelectedValue(false)
  }, [selectedValue])

  return (
    <div>
      <Alert variant="warning" className={"text-center " + (isSelectedValue ? "" : "d-none")}>Book(s) were not selected, please select them from the dropdown.</Alert>
      <form id="book-search-form" className="form" action="submit" autoComplete="off" onSubmit={(e) => handleSubmit(e, selectedValue)}>

        <div className="d-flex flex-column mt-8 mb-8 fv-row">
          <BookSearch selectedValue={selectedValue} setSelectedValue={setSelectedValue} loadingBooks={loadingBooks} setLoadingBooks={setLoadingBooks} modalType={show} />
        </div>

        {/* start action buttons */}
        <div className="text-end">
          {/* <button type="reset" id="kt_modal_new_target_cancel" className="btn btn-light btn-sm me-3" onClick={(form) => resetModalForm(form)}>Clear</button> */}
          <button type="submit" id="kt_modal_new_target_submit" className="btn btn-primary btn-sm">
            <span className="indicator-label">{show === "new-journey-modal" ? "Start this Journey" : "Add Book(s) to Collection"}</span>
            <span className="indicator-progress">Please wait...
              <span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
          </button>
        </div>
        {/* end action buttons */}

      </form>
    </div>
  )
}

export default JourneyCollectionEntryModal;