
function JourneyCards({ journeys }){

return (journeys?.map((journey) => {
    
  // establishes class to define card color based on journey progress
  let card_progress_color 
  if (journey.current_progress === 0) {
    card_progress_color = "card-flush-unstarted"
    }
  if (journey.current_progress > 0) {
    card_progress_color = "card-flush-in-progress"
  }
  if (journey.current_progress === 100) {
    card_progress_color = "card-flush-completed"
  }
  
  return(
    <div className="col-md-6 mb-md-5 mb-xl-10" key={journey.id}>
      <div className={'card bgi-no-repeat bgi-size-contain bgi-position-x-end mb-5 mb-xl-10 ' + card_progress_color}>
        <div className="card-header pt-5 align-items-start">
          {/* book cover */}
          <div className="card-title book-cover-image flex-column">
            <img src={journey.book.cover_img} alt={journey.book.title + ' book cover'}></img>
          </div>
          {/* book cover end */}
          <div className="card-title flex-column align-items-end justify-content-end">
            <span className="fs-2hx fw-bold text-white lh-1 ls-n2">{journey.book.title}</span>
            <span className="text-white opacity-75 pt-1 fw-semibold fs-6">{journey.book.author}</span>
            <span className="text-white opacity-75 pt-1 fw-semibold fs-6">{journey.book.genre}</span>
          </div>
        </div>
        <div className="card-body d-flex align-items-end pt-0">
          <div className="d-flex align-items-center flex-column mt-3 w-100">
            <div
              className="d-flex justify-content-between fw-bold fs-6 text-white opacity-75 w-100 mt-auto mb-2">
              <span>{journey.start_date}</span>
              <span>{journey.book.length + ' pages'} | {journey.current_progress + '% completed'}</span>
            </div>
            {/* progress bar */}
            <div className="h-8px mx-3 w-100 bg-white bg-opacity-50 rounded">
              {/* define width by adding class name w-% <- percentage as an integer */}
              <div className="bg-white bg-opacity-100 rounded h-8px" style={{width: journey.current_progress + '%'}} role="progressbar"
                aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            {/* progress bar end */}
          </div>
        </div>
      </div>
      </div>
  )
}) )


}
export default JourneyCards