import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'

function ChallengeCards({ challenges, setChallenges, user, handleServerError }) {

  let filteredView = useLocation()

  const [challengeFilter, setChallengeFilter] = useState(filteredView.state || "all")
  const [typeFilter, setTypeFilter] = useState("all")

  useEffect(() => {
    document.title = "Challenges"
  }, [])

  // fetching user's challenges from the backend to capture all challenge progress changes that occured if/when the user made any new journey completion progress
  useEffect(() => {
    if (user) {
      fetch(`api/users/${user?.id}/challenges`)
        .then(response => handleServerError(response))
        .then(user_challenges => setChallenges(user_challenges))
        .catch(error => console.log(error))
    }
  }, [user]);

  let filteredChallenges, filteredChallengeByType
  switch (challengeFilter) {
    case "all":
      filteredChallenges = challenges
      break;
    case "active":
      filteredChallenges = challenges?.filter(challenge => challenge.active === true)
      break;
    case "future":
      filteredChallenges = challenges?.filter(challenge => {
        let today = new Date()
        today.setHours(0, 0, 0, 0)
        let challengeStartDate = new Date(challenge.start_date)
        challengeStartDate.setHours(0, 0, 0, 0)
        if (challenge.active === false && challengeStartDate > today) {
          return challenge
        } else {
          return null
        }
      })
      break;
    case "successful":
      filteredChallenges = challenges?.filter(challenge => challenge.successful === true)
      break;
    default:
      filteredChallenges = challenges
      break
  }
  switch (typeFilter) {
    case "all":
      filteredChallengeByType = filteredChallenges
      break;
    case "duration":
      filteredChallengeByType = filteredChallenges.filter(challenge => challenge.goal_type === "duration")
      break;
    case "author":
      filteredChallengeByType = filteredChallenges.filter(challenge => challenge.goal_type === "interest" && challenge.category === "author")
      break;
    case "collection":
      filteredChallengeByType = filteredChallenges.filter(challenge => challenge.goal_type === "interest" && challenge.category === "collection_id")
      break;
    case "genre":
      filteredChallengeByType = filteredChallenges.filter(challenge => challenge.goal_type === "interest" && challenge.category === "genre")
      break;
    default:
      filteredChallengeByType = filteredChallenges
      break
  }

  let challengeCards = filteredChallengeByType?.map((challenge) => {

    // establishes class to define card color based on journey progress
    let card_progress_color
    if (challenge.active) {
      if (challenge.challenge_progress === 0) {
        card_progress_color = "card-flush-current"
      }
      if (challenge.challenge_progress > 0) {
        card_progress_color = "card-flush-progress"
      }
      if (challenge.challenge_progress === 100) {
        card_progress_color = "card-flush-finished"
      }
    } else {
      card_progress_color = "card-flush-inactive"
    }

    return (
      <div className="col-md-4 mb-md-5 mb-xl-10" key={challenge.id}>
        <div className={'card challenge-card bgi-no-repeat bgi-size-contain bgi-position-x-end mb-xl-10 ' + card_progress_color}>

          {/* start challenge header content */}
          <div className="card-header pt-5 align-items-start">
            <div className="card-title flex-column">
              <Link to={`${challenge.id}`} state={{ challenge }}><span className="fs-2hx fw-bold text-white lh-1 ls-n2">{challenge.name}</span></Link>
              <span className="text-white opacity-75 pt-1 fw-semibold fs-6">{challenge.description}</span>
              <span className="text-white opacity-75 pt-1 fw-semibold fs-6 mt-5">start: {challenge.start_date}</span>
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
                <div className="bg-white bg-opacity-100 rounded h-8px" style={{ width: challenge.challenge_progress + '%' }} role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              {/* progress bar end */}

            </div>
          </div>
        </div>
      </div>
    )
  })

  return (
    challenges?.length > 0 ?
      <div id="kt_app_content_container" className="app-container container-xxl">
        <div className="row mb-6">
          <div className="col d-flex justify-content-start">
            <ToggleButtonGroup type="radio" name="challenge-sort-toggle-options" defaultValue={challengeFilter} onChange={e => setChallengeFilter(e)}>
              <ToggleButton size="sm" id="challenge-sort-toggle-all" variant='outline-secondary' name="challenge-toggle-all" value="all">
                all
              </ToggleButton>
              <ToggleButton size="sm" id="challenge-sort-toggle-active" variant='outline-secondary' name="challenge-toggle-active" value="active">
                active
              </ToggleButton>
              <ToggleButton size="sm" id="challenge-sort-toggle-challenge-future" variant='outline-secondary' name="challenge-toggle-challenge-future" value="future">
                future
              </ToggleButton>
              <ToggleButton size="sm" id="challenge-sort-toggle-challenge-successful" variant='outline-secondary' name="challenge-toggle-challenge-successful" value="successful">
                successful
              </ToggleButton>
            </ToggleButtonGroup>

            <ToggleButtonGroup type="radio" name="challenge-type-toggle-options" defaultValue={typeFilter} onChange={e => setTypeFilter(e)} className="ms-6">
              <ToggleButton size="sm" id="challenge-type-label" variant='outline-secondary' name="challenge-type-label" value="label" disabled className='text-gray-900'>
                categories:
              </ToggleButton>
              <ToggleButton size="sm" id="challenge-type-toggle-all" variant='outline-secondary' name="challenge-type-toggle-all" value="all">
                all
              </ToggleButton>
              <ToggleButton size="sm" id="challenge-type-toggle-duration" variant='outline-secondary' name="challenge-type-toggle-duration" value="duration">
                duration
              </ToggleButton>
              <ToggleButton size="sm" id="challenge-type-toggle-challenge-author" variant='outline-secondary' name="challenge-type-toggle-author" value="author">
                author
              </ToggleButton>
              <ToggleButton size="sm" id="challenge-type-toggle-challenge-collection" variant='outline-secondary' name="challenge-type-toggle-collection" value="collection">
                collection
              </ToggleButton>
              <ToggleButton size="sm" id="challenge-type-toggle-challenge-genre" variant='outline-secondary' name="challenge-type-toggle-genre" value="genre">
                genre
              </ToggleButton>
            </ToggleButtonGroup>

          </div>
        </div>
        <div className="row g-5 g-xl-10 mb-5 mb-xl-10 align-items-stretch">
          {challengeCards}
        </div>
      </div> :
      <div id="kt_app_content_container" className="app-container container-xxl pt-10 mt-10">
        <div className='row'>
          <div className='col-12 d-flex justify-content-center'>
            <span className='fs-5'><em>you have not created any challenges yet, use the button above to get started! ✨ </em></span>
          </div>
        </div>
      </div>
  )
}
export default ChallengeCards