import { Link } from 'react-router-dom';
import { useEffect } from 'react';

import ToolTip from '../utilities/tool_tip';

import defaultBook from "../assets/img/generic_book.png";

function CollectionCards({ collections }) {

  useEffect(() => {
    document.title = "Collections"
  }, [])

  return (collections?.map((collection) => {

    // getting collection book covers for card
    let book_covers

    if (collection.books.length > 0) {
      book_covers = collection.books.map((book) => {
        return (
          <img src={book.cover_img ? book.cover_img.replace("S.jpg", "L.jpg") : defaultBook} alt={book.title + 'cover image'} key={book.id} className="me-4" />
        )
      })
    } else {
      book_covers =
        <div className='text-grey opacity-50'>
          <span>This Collection is empty; to add books: select the Collection's name then Add Books.</span>
        </div>
    }

    return (
      <div className="col-md-6 mb-md-5 mb-xl-10" key={collection.id}>
        <div className='card collection-card bgi-no-repeat bgi-size-contain bgi-position-x-end mb-xl-10 card-flush-collection'>
          <div className="card-header pt-5 flex-nowrap">
            {/* start collections name and details */}
            <div className="card-title flex-column justify-content-start">
              <Link to={`${collection.id}`} state={{ collection }}><span className="fs-2hx fw-bold text-white lh-1 ls-n2">{collection.name}</span></Link>
              <span className="text-white opacity-75 pt-1 fw-semibold fs-6">{collection.description}</span>
            </div>
            {collection.challenge_locked ?
              <div className='me-4 mt-3'>
                <span className='text-gray-800 fs-2'>
                <ToolTip placement="left" icon="flag" message="This Collection is involved in a Challenge!" />
                </span>
              </div>
              :
              <></>
            }
            {/* end collections name and details */}

          </div>

          <div className="card-body collections-card-body d-flex align-items-center pt-0">
            <div className="d-flex align-items-center flex-column mt-3 w-100">
              <div className="d-flex fw-bold fs-6 text-grey opacity-75 w-100 mt-auto mb-2 justify-content-center">
                <div className={collection?.books.length > 0 ? "scroll-collection-books mt-4" : ""}>
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