import { useEffect } from "react"

function ChallengeCards({ challenges }){

  useEffect(() => {
    document.title = "Challenges"
  }, [])

    return (challenges?.map((challenge) => {
      
    // establishes class to define card color based on journey progress
    let card_progress_color 
    if (challenge.challenge_progress >= 0) {
      card_progress_color = "card-flush-current"
    }
    if (challenge.challenge_progress === 100) {
      card_progress_color = "card-flush-finished"
    }
    
    return(
      <div className="col-md-4 mb-md-5 mb-xl-10" key={challenge.id}>
        <div className={'card challenge-card bgi-no-repeat bgi-size-contain bgi-position-x-end mb-xl-10 ' + card_progress_color}>

          {/* start challenge header content */}
          <div className="card-header pt-5 align-items-start">
            <div className="card-title flex-column">
              <span className="fs-2hx fw-bold text-white lh-1 ls-n2">{challenge.name}</span>
              <span className="text-white opacity-75 pt-1 fw-semibold fs-6">{challenge.description}</span>
              <span className="text-white opacity-75 pt-1 fw-semibold fs-6 mt-5">started: {challenge.start_date}</span>
              <span className="text-white opacity-75 pt-1 fw-semibold fs-6">{challenge.end_date !== null ? 'complete by: ' + challenge.end_date : ""}</span>
            </div>
          </div>
          {/* end challenge header content */}

          <div className="card-body d-flex align-items-end pt-0">
            <div className="d-flex align-items-center flex-column mt-3 w-100">
              <div className="d-flex justify-content-between fw-bold fs-6 text-white opacity-75 w-100 mt-auto mb-2">
              </div>
              {/* progress bar */}
              <div className="d-flex mb-1 w-100">
                <span className="text-white w-50 text-start">{challenge.books.length} of {challenge.goal_number} books {challenge.challenge_progress === 100 ? 'completed!' : ''}</span>
                <span className="text-white fw-bold w-50 text-end">{Math.round(challenge.challenge_progress)}%</span>
              </div>
              <div className="h-8px mx-3 w-100 bg-white bg-opacity-50 rounded">
                {/* define width by adding class name w-% <- percentage as an integer */}
                <div className="bg-white bg-opacity-100 rounded h-8px" style={{width: challenge.challenge_progress + '%'}} role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              {/* progress bar end */}

            </div>
          </div>
        </div>
        </div>
    )
  }) )
  }
  export default ChallengeCards