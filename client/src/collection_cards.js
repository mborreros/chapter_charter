import Button from "react-bootstrap/esm/Button"

function CollectionCards({ collections }){

  return (collections?.map((collection) => {

    // getting collection book covers for card
    let book_covers = collection.books.map((book) => {return(
      <img src={book.cover_img} alt={book.title + 'cover image'} key={book.id} className="me-4"/>
    )})
    
    return(
      <div className="col-md-6 mb-md-5 mb-xl-10" key={collection.id}>
        <div className='card bgi-no-repeat bgi-size-contain bgi-position-x-end mb-5 mb-xl-10 card-flush-collection'>
          <div className="card-header pt-5">
            {/* start collections name and details */}
            <div className="card-title flex-column justify-content-start">
              <span className="fs-2hx fw-bold text-white lh-1 ls-n2">{collection.name}</span>
              <span className="text-white opacity-75 pt-1 fw-semibold fs-6">{collection.description}</span>
            </div>
            {/* end collections name and details */}

            {/* start add books button */}
            {/* <div className="card-title flex-column justify-content-start">
                <Button size="sm" variant="secondary">Add Books</Button>
            </div> */}
            {/* end add books button */}
          </div>

          <div className="card-body collections-card-body d-flex align-items-end pt-0">
            <div className="d-flex align-items-center flex-column mt-3 w-100">
            {/* <span className="fw-bold fs-6 text-white opacity-75 w-100 mt-auto mb-2">books in this collection:</span> */}
              <div className="d-flex fw-bold fs-6 text-white opacity-75 w-100 mt-auto mb-2 justify-content-center">
                <div className="scroll-collection-books mt-4">
                  {book_covers}
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    )
  }))
}
  export default CollectionCards