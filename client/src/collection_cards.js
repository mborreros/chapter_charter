// import Button from "react-bootstrap/esm/Button"
import Dropdown from 'react-bootstrap/Dropdown';

function CollectionCards({ collections, setCollections }){

  function handleCollectionDelete(e) {
    let thisCollectionId = e.target.parentNode.id
    let updatedCollectionArray = []

    fetch(`/api/collections/${thisCollectionId}`, {
      method: "DELETE"
    }).then((response) => {
      if (response.ok) {
        updatedCollectionArray = collections.filter((collection) => collection.id != thisCollectionId)
        setCollections(updatedCollectionArray)
      } else {console.log("Collection was not deleted successfully.")}
  })
}

  return (collections?.map((collection) => {

    // getting collection book covers for card
    let book_covers

    if (collection.books.length >0) {
      book_covers = collection.books.map((book) => {return(
        <img src={book.cover_img} alt={book.title + 'cover image'} key={book.id} className="me-4"/>
      )})} else { book_covers = 
      <div className='text-grey opacity-50'>
        <span>This collection is empty; to add books: select the Options then Add Books</span>
      </div>
    }

    
    return(
      <div className="col-md-6 mb-md-5 mb-xl-10" key={collection.id}>
        <div className='card collection-card bgi-no-repeat bgi-size-contain bgi-position-x-end mb-xl-10 card-flush-collection'>
          <div className="card-header pt-5 flex-nowrap">
            {/* start collections name and details */}
            <div className="card-title flex-column justify-content-start">
              <span className="fs-2hx fw-bold text-white lh-1 ls-n2">{collection.name}</span>
              <span className="text-white opacity-75 pt-1 fw-semibold fs-6">{collection.description}</span>
            </div>
            {/* end collections name and details */}

            {/* start options drop down buttons */}
            <Dropdown>
              <Dropdown.Toggle size="sm" split variant="secondary">Options</Dropdown.Toggle>

              <Dropdown.Menu id={collection.id}>
                <Dropdown.Item>View full Collection</Dropdown.Item>
                <Dropdown.Item>Add Books</Dropdown.Item>
                <Dropdown.Item>Edit Books</Dropdown.Item>
                <Dropdown.Item onClick={(e) => handleCollectionDelete(e)}>Delete</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {/* end options drop down buttons */}

          </div>

          <div className="card-body collections-card-body d-flex align-items-center pt-0">
            <div className="d-flex align-items-center flex-column mt-3 w-100">
              <div className="d-flex fw-bold fs-6 text-grey opacity-75 w-100 mt-auto mb-2 justify-content-center">
                <div className={collection?.books.length >0 ? "scroll-collection-books mt-4" : ""}>
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