import { useEffect, useState } from "react";
import BookSearch from "./book_select_search";

function JourneyCollectionEntryModal({
  user,
  journeys, setJourneys,
  collections, setCollections, selectedCollection,
  show, handleClose,
  formatDate, handleServerError }) {

  const [selectedValue, setSelectedValue] = useState(null);
  const [loadingBooks, setLoadingBooks] = useState(false)
  // error handling states
  const [isSelectedValue, setIsSelectedValue] = useState(false)
  const [isServerErrror, setIsServerError] = useState("")

  function parseBookData(book) {
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
    // parsing selected books array for nested book & collection entry creation
    let bookData = selectedValue.map(selected_book => parseBookData(selected_book))

    fetch("/api/collection_entries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        collection_id: selectedCollection.id,
        book_data: bookData
      })
    })
      .then(response => handleServerError(response))
      .then((new_collection_entries) => {
        new_collection_entries.forEach((new_entry) => {
          selectedCollection.collection_entries.unshift({ id: new_entry.id, collection_id: new_entry.collection_id, book_id: new_entry.book_id })
          selectedCollection.books.unshift(new_entry.book)
        })
        setCollections(collections.map(collection => collection.id !== new_collection_entries[0].collection.id ? collection : selectedCollection))
        handleClose()
      })
      .catch(error => setIsServerError(error.errors))
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
      .catch(error => {
        setIsServerError(error.errors)
      })
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

  // toggle state for alerts if the user selects a book from BookSearch
  useEffect(() => {
    setIsSelectedValue(false)
    setIsServerError("")
  }, [selectedValue])

  return (
    <div>
      <form id="book-search-form" className="form" action="submit" autoComplete="off" onSubmit={(e) => handleSubmit(e, selectedValue)}>

        <div className="d-flex flex-column mt-8 fv-row">
          <BookSearch selectedValue={selectedValue} setSelectedValue={setSelectedValue} loadingBooks={loadingBooks} setLoadingBooks={setLoadingBooks} modalType={show} />
        </div>

        {/* conditional form errors */}
        {isSelectedValue && <p className="text-danger">{show === "new-journey-modal" ? "A book must be selected to begin a Journey" : "A book must be selected to add it to a Collection"}</p>}
        {isServerErrror.length > 0 && <p className="text-danger">{isServerErrror}</p>}

        {/* start action buttons */}
        <div className="text-end mt-4">
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