import { useState } from "react";
// import Modal from 'react-bootstrap/Modal'

import BookSearch from "./book_select_search";

function JourneyModal({ show, handleClose, journeys, setJourneys, books, setBooks, user, formatDate, selectedCollection, collections, setCollections }) {

  const [selectedValue, setSelectedValue] = useState(null);
  const [loadingBooks, setLoadingBooks] = useState(false)

  // console.log(selectedCollection.books)
  // console.log(selectedCollection)
  // console.log(collections)

  // resets select search on clear
  function resetModalForm() {
    document.getElementById("book-search-form").reset()
    setSelectedValue("")
  }

  function handleBookSubmit(e) {
    e.preventDefault()

    // cancels submission if books from fetch are not completely loaded
    if (loadingBooks) {
      return false
    }

    let bookKey = selectedValue.key.replace("/works/", "")
    // selectedValue is the full book from Book API

    // from Book API, need:
    // selectedValue.key <- allow us to search Books API for their record https://openlibrary.org/${selectedValue.key}.json
    // selectedValue.title <- title as string
    // selectedValue.author_name[0] <- author as a string from the array
    // selectedValue.number_of_pages_median <- length as integer
    // selectedValue.option.subject?.slice(0,4) <- first 4 genres as an array
    // selectedValue.cover_i <- cover image as https://covers.openlibrary.org/b/id/${selectedValue.cover_i}-S.jpg

    let this_book_record = books.find((book) => book.book_api_num === bookKey)

    if (this_book_record) {
      // find book that has matching key in the db and start a journey with that
      console.log("this book was found in the db already")
      console.log(this_book_record)

      startNewJourney(this_book_record)

    } else {

      console.log("this is not in the db yet and needs to be added")

      let bookData = {
        "title": selectedValue.title,
        "author": selectedValue.author_name[0],
        "length": selectedValue.number_of_pages_median,
        "genre": selectedValue.subject ? selectedValue.subject.slice(0, 4) : null,
        "cover_img": selectedValue.cover_i ? `https://covers.openlibrary.org/b/id/${selectedValue.cover_i}-S.jpg` : null,
        "book_api_num": bookKey
      }

      // post new book to the db
      fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData)
      })
        .then(response => {
          if (response.ok) {
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

  function handleCollectionBooksSubmit(e) {
    e.preventDefault()

    // cancels submission if books from fetch are not completely loaded
    if (loadingBooks) {
      return false
    }
    // selectedValue is always an array if isMulti is try on Async select input

    let bookKey
    let this_book_record
    let booksInDb = []
    let booksNeededInDb = []
    let booksParsedForPost = []
    let booksForCollection = []

    selectedValue.map((selectedBook) => {
      bookKey = selectedBook.key.replace("/works/", "")
      this_book_record = books?.find((book) => book.book_api_num === bookKey)
      if (this_book_record) {
        booksInDb.push(this_book_record)
      } else {
        booksNeededInDb.push(selectedBook)
      }
    })

    if (booksNeededInDb.length) {
      booksNeededInDb.map((bookToPost) => {

        let bookData = {
          "title": bookToPost.title,
          "author": bookToPost.author_name[0],
          "length": bookToPost.number_of_pages_median,
          "genre": bookToPost.subject ? bookToPost.subject.slice(0, 4) : null,
          "cover_img": bookToPost.cover_i ? `https://covers.openlibrary.org/b/id/${bookToPost.cover_i}-S.jpg` : null,
          "book_api_num": bookToPost.key.replace("/works/", "")
        }

        booksParsedForPost.push(bookData)
      })

      // post new book to the db
      fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booksParsedForPost)
      })
        .then(response => {
          if (response.ok) {
            response.json().then((new_books) => {
              booksForCollection = [...booksInDb, ...new_books]
              addCollectionEntriesForBooks(booksForCollection)
            })
          } else {
            response.json().then((errors) => console.log(errors))
          }
        })
    } else {
      addCollectionEntriesForBooks(booksInDb)
    }
  };

  function startNewJourney(book) {

    let new_journey
    new_journey = {
      "user_id": user.id,
      "book_id": book.id,
      "start_date": formatDate(),
      "manually_completed": false
    }

    fetch("/api/journeys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(new_journey)
    })
      .then(response => {
        response.json().then((this_journey) => {
          setJourneys([this_journey, ...journeys])
          handleClose()
        })
      })
  };


  function addCollectionEntriesForBooks(booksArray) {

    let parsedCollectionEntries = []
    booksArray.map((book) => {
      parsedCollectionEntries.push({ collection_id: selectedCollection.id, book_id: book.id })
    })

    fetch("/api/collection_entries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsedCollectionEntries)
    })
      .then(response => {
        if (response.ok) {
          response.json().then((new_collection_entries) => {
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

  return (

    <form id="book-search-form" className="form" action="submit" autoComplete="off" onSubmit={(e) => show === "new-journey-modal" ? handleBookSubmit(e) : handleCollectionBooksSubmit(e)}>

      <div className="d-flex flex-column mt-8 mb-8 fv-row">

        <BookSearch selectedValue={selectedValue} setSelectedValue={setSelectedValue} loadingBooks={loadingBooks} setLoadingBooks={setLoadingBooks} modalType={show} />

      </div>

      {/* start action buttons */}
      <div className="text-end">
        <button type="reset" id="kt_modal_new_target_cancel" className="btn btn-light btn-sm me-3" onClick={(form) => resetModalForm(form)}>Clear</button>
        <button type="submit" id="kt_modal_new_target_submit" className="btn btn-primary btn-sm">
          <span className="indicator-label">{show === "new-journey-modal" ? "Start this Journey" : "Add Book(s) to Collection"}</span>
          <span className="indicator-progress">Please wait...
            <span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
        </button>
      </div>
      {/* end action buttons */}

    </form>
  )
}

export default JourneyModal;