import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Chart } from "react-google-charts";
import { Link } from 'react-router-dom';
import _ from "lodash";
import moment from 'moment';

function Home({ user, journeys, challenges }) {

  useEffect(() => {
    if (user) {
      document.title = "Dashboard"
    }
  }, [user])

  // finding active journeys and active challenges
  let activeJourneys, activeChallenges, completedJourneys, futureChallenges, successfulChallenges
  activeJourneys = journeys?.filter(journey => journey.completed == false)
  completedJourneys = journeys?.filter(journey => journey.completed == true)
  activeChallenges = challenges?.filter(challenge => challenge.active == true)
  futureChallenges = challenges?.filter(challenge => {
    let today = new Date()
    today.setHours(0, 0, 0, 0)
    let challengeStartDate = new Date(challenge.start_date)
    challengeStartDate.setHours(0, 0, 0, 0)
    if (challenge.active == false && challengeStartDate > today) {
      return challenge
    }
  })
  successfulChallenges = challenges?.filter(challenge => challenge.active == false && challenge.successful == true)

  // preparing and formatting page count pie chart data/options
  let groupedJourneys = _.countBy(
    completedJourneys,
    (journey => {
      let bookLength = journey.book.length
      if (bookLength < 100) {
        return "lessThan100"
      } else if (100 < bookLength && bookLength < 200) {
        return "between100and200"
      } else if (200 < bookLength && bookLength < 300) {
        return "between200and300"
      } else if (300 < bookLength && bookLength < 400) {
        return "between300and400"
      } else if (bookLength > 400) {
        return "greatedThan400"
      } else {
        return "unknown"
      }
    })
  )

  const pieChartData = [
    ["Page Range", "Books Completed"],
    ["<100", groupedJourneys.lessThan100],
    ["100-200", groupedJourneys.between100and200],
    ["200-300", groupedJourneys.between200and300],
    ["300-400", groupedJourneys.between300and400],
    ["400+", groupedJourneys.greatedThan400],
    ["Unknown", groupedJourneys.unknown]
  ];

  const pieChartOptions = {
    width: 350,
    height: 250,
    legend: "none",
    pieSliceText: "label",
    colors: ["#b8b4bd", '#b1a8ba', '#aa9db8', '#a292b6', '#9b87b3', '#bfbfbf'],
    chartArea: { left: 0, top: 0, width: "100%", height: "100%" },
    fontName: "Helvetica Neue"
  };

  // preparing and formatting author bar chart data/options
  const barChartOptions = {
    width: 350,
    height: 250,
    bar: { groupWidth: "75%" },
    legend: "none",
    hAxis: {
      textStyle: {
        color: "transparent"
      },
      gridlines: {
        count: 0
      },
      baselineColor: "#CCC"
    },
    chartArea: { left: "25%", top: "5%", width: "100%", height: "90%" },
    animation: {
      startup: true,
      duration: 1000,
      easing: "in"
    },
    fontName: "Helvetica Neue"
  };

  let authorGroupJourneys = _.countBy(
    completedJourneys,
    (journey => {
      return journey.book.author
    })
  )

  let authorJourneyData = _.filter(
    Object.entries(authorGroupJourneys),
    function (array) {
      if (array[1] > 1) {
        return array
      }
    }
  )

  let authorBarChartData = authorJourneyData.map(data => {
    let completed_data = []
    completed_data.push(data[0], data[1], "#9DB5B2", `${data[1]} books`, null)
    return completed_data
  })

  let barChartData = [
    [
      "Author",
      "Books",
      { role: "style" },
      { type: 'string', role: 'tooltip' },
      {
        sourceColumn: 0,
        role: "annotation",
        type: "string",
        calc: "stringify",
      },
    ]
  ]
  barChartData = barChartData.concat(authorBarChartData)

  // preparing and formatting book completion over time line graph data/options
  let bookCompletionsByDate = _.countBy(
    completedJourneys,
    (journey => {
      return moment(journey.end_date).format("MMM D")
    })
  )

  let bookLineGraphData = [
    ["Date", "Completions"]
  ]

  bookLineGraphData = bookLineGraphData.concat(Object.entries(bookCompletionsByDate).reverse())

  const bookLineGraphOptions = {
    width: "100%",
    height: "100%",
    curveType: "function",
    legend: "none",
    colors: ['#9aad6a'],
    vAxis: {
      textStyle: {
        color: "transparent"
      },
      gridlines: {
        count: 0
      },
      baselineColor: "#CCC"
    },
    hAxis: {
      textStyle: {
        color: "#CCC"
      }
    },
    chartArea: { left: 0, top: 0, width: "100%", height: "95%" },
    animation: {
      startup: true,
      duration: 1000,
      easing: "in"
    },
    fontName: "Helvetica Neue"
  };

  // preparing and formatting challenge category types data/options
  let challengeCategories = _.countBy(
    challenges,
    (challenge => {
      let category = challenge.category
      let goal_type = challenge.goal_type
      if (goal_type === "duration") {
        return "Duration"
      } else if (category === "genre") {
        return "Genre"
      } else if (category === "collection_id") {
        return "Collection"
      } else if (category === "author") {
        return "Author"
      } else {
        return "unknown"
      }
    })
  )

  let formatedChallengeCategories = Object.entries(challengeCategories).map(challenge => {
    let category_data = []
    category_data.push(challenge[0], challenge[1], "#dba09c", `${challenge[1]} challenges`, null)
    return category_data
  }
  )

  let challengeCategoryBarGraphData = [
    [
      "Category",
      "No. of Challenges",
      { role: "style" },
      { type: 'string', role: 'tooltip' },
      {
        sourceColumn: 0,
        role: "annotation",
        type: "string",
        calc: "stringify",
      },
    ]
  ];
  challengeCategoryBarGraphData = challengeCategoryBarGraphData.concat(formatedChallengeCategories)

  const challengeCategoryBarGraphOptions = {
    width: "100%",
    height: "100%",
    bar: { groupWidth: "75%" },
    legend: "none",
    vAxis: {
      textStyle: {
        color: "transparent"
      },
      gridlines: {
        count: 0
      },
      baselineColor: "#CCC"
    },
    chartArea: { left: 0, top: "5%", width: "100%", height: "85%" },
    animation: {
      startup: true,
      duration: 1000,
      easing: "in"
    },
    fontName: "Helvetica Neue"
  };

  return (
    <>
      {!user ?
        <div className='home-screen d-flex align-items-center'>
          <div className="d-flex flex-column flex-column-fluid align-items-center">
            <div className='flex-column flex-row-fluid'>
              <div className="flex-column col-md-5 mb-md-5 mb-xl-10">
                <div className='card bgi-no-repeat bgi-size-contain bgi-position-x-end mb-xl-10 w-475px'>
                  <div className='card-body mx-8 my-8'>

                    <p className="text-center fw-bold fs-1">📖 Welcome to Chapter Charter 📖</p>
                    <p className="text-center fs-6 text-gray-700">
                      We are helping readers keep <span className="fw-bold text-black">track</span> of their current reads, <span className="fw-bold text-black">organize</span> their books into lists, <span className="fw-bold text-black">challenge</span> themselves to reach their full reading potential, and <span className="fw-bold text-black">visualize</span> their reading journeys!
                    </p>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        :
        <div>
          <div id="kt_app_toolbar" className="app-toolbar py-3 py-lg-6">
            <div id="kt_app_toolbar_container" className="app-container container-xxl">
              {/* page title */}
              <div className="page-title d-flex flex-column justify-content-center flex-wrap mb-6">
                <h1 className="">welcome back, <span className='text-muted'>{user?.screenname}</span></h1>
              </div>
              {/* page title end */}

              <div className='row align-items-stretch mb-5'>
                <div className='col-sm-3'>
                  <Link to="/journeys">
                    <div className="journey-overview-card  card card-flush bgi-no-repeat bgi-size-contain bgi-position-x-end mb-5 mb-xl-10">
                      <div className="card-header pt-5">
                        <div className="card-title d-flex flex-column">
                          <span className="fs-2hx fw-bold text-white me-2 lh-1 ls-n2">{activeJourneys?.length}</span>
                          <span className="text-white opacity-75 pt-1 fw-semibold fs-6 mb-8">Active Journey{activeJourneys?.length > 1 ? "s" : ""}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <Link to="/journeys">
                    <div className="completed-journey-overview-card  card card-flush bgi-no-repeat bgi-size-contain bgi-position-x-end mb-5 mb-xl-10">
                      <div className="card-header pt-5">
                        <div className="card-title d-flex flex-column">
                          <span className="fs-2hx fw-bold text-white me-2 lh-1 ls-n2">{completedJourneys?.length}</span>
                          <span className="text-white opacity-75 pt-1 fw-semibold fs-6 mb-8">Completed Journey{completedJourneys?.length > 1 ? "s" : ""}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className='col-sm-5'>
                  <div className="card card-flush h-100">
                    <div className="card-header pt-5">
                      <div className="card-title d-flex flex-column">
                        <span className="fs-2hx fw-bold text-black me-2 lh-1 ls-n2">journey completion</span>
                      </div>
                    </div>
                    <div className={"card-body d-flex " + (bookLineGraphData.length > 1 ? "align-items-end" : "align-items-center justify-content-center")}>
                      {
                        bookLineGraphData.length > 1 ?
                          <Chart
                            chartType="LineChart"
                            data={bookLineGraphData}
                            options={bookLineGraphOptions}
                          /> :
                          <p>you have not completed any journeys, it's reading time!</p>
                      }
                    </div>
                  </div>
                </div>
                <div className='col-sm-4'>
                  <div className="card card-flush h-100">
                    <div className="card-header pt-5">
                      <div className="card-title d-flex flex-column">
                        <span className="fs-2hx fw-bold text-black me-2 lh-1 ls-n2">completed journeys</span>
                        <span className="text-black opacity-75 pt-1 fw-semibold fs-6">by page number</span>
                      </div>
                    </div>
                    <div className={"card-body d-flex " + (completedJourneys?.length > 1 ? "align-items-end" : "align-items-center justify-content-center")}>
                     {completedJourneys?.length > 1 ?
                      <Chart
                        width="100%"
                        height="250px"
                        chartType="PieChart"
                        data={pieChartData}
                        options={pieChartOptions}
                      /> :
                      <p className='pb-4'>you have not completed any journeys, hit the books!</p>}
                    </div>
                  </div>
                </div>
              </div>

              <hr className='my-10 mx-15 border-gray-500 border-dotted' />

              <div className='row align-items-stretch'>

                <div className='col-sm-5'>
                  <div className="card card-flush h-100">
                    <div className="card-header pt-5">
                      <div className="card-title d-flex flex-column">
                        <span className="fs-2hx fw-bold text-black me-2 lh-1 ls-n2">challenges</span>
                        <span className="text-black opacity-75 pt-1 fw-semibold fs-6">by category</span>
                      </div>
                    </div>
                    <div className={"card-body d-flex " + (challengeCategoryBarGraphData.length > 1 ? "align-items-end" : "align-items-center justify-content-center")}>
                      {challengeCategoryBarGraphData.length > 1 ?
                        <Chart
                          chartType="ColumnChart"
                          data={challengeCategoryBarGraphData}
                          options={challengeCategoryBarGraphOptions}
                        /> :
                        <p className='pb-5'>you do not have any challenges, get some reading competition going!</p>
                      }
                    </div>
                  </div>
                </div>
                <div className='col-sm-4'>
                  <div className="card card-flush h-100">
                    <div className="card-header pt-5">
                      <div className="card-title d-flex flex-column">
                        <span className="fs-2hx fw-bold text-black me-2 lh-1 ls-n2">most read authors</span>
                      </div>
                    </div>
                    <div className={"card-body d-flex " + (barChartData.length > 1 ? "align-items-end" : "align-items-center justify-content-center")}>
                      {barChartData.length > 1 ?
                        <Chart
                          chartType="BarChart"
                          width="100%"
                          height="250px"
                          data={barChartData}
                          options={barChartOptions}
                        /> :
                        <p>you have not read any author more than once, get reading!</p>
                      }

                    </div>
                    {/* <!--end::Card body--> */}
                  </div>
                </div>
                <div className='col-sm-3'>
                  <Link to="/challenges">
                    <div className="challenge-overview-card card card-flush mb-5 mb-xl-10">
                      {/* <!--begin::Header--> */}
                      <div className="card-header pt-5">
                        <div className="card-title d-flex flex-column">
                          <span className="fs-2hx fw-bold text-white me-2 lh-1 ls-n2">{activeChallenges?.length}</span>
                          <span className="text-white opacity-75 pt-1 fw-semibold fs-6 mb-8">Active Challenge{activeChallenges?.length > 1 ? "s" : ""}</span>
                        </div>
                      </div>
                      {/* <!--end::Header--> */}
                    </div>
                  </Link>
                  <Link to="/challenges">
                    <div className="future-challenge-overview-card card card-flush mb-5 mb-xl-10">
                      {/* <!--begin::Header--> */}
                      <div className="card-header pt-5">
                        <div className="card-title d-flex flex-column">
                          <span className="fs-2hx fw-bold text-white me-2 lh-1 ls-n2">{futureChallenges?.length}</span>
                          <span className="text-white opacity-75 pt-1 fw-semibold fs-6 mb-8">Future Challenge{futureChallenges?.length > 1 ? "s" : ""}</span>
                        </div>
                      </div>
                      {/* <!--end::Header--> */}
                    </div>
                  </Link>
                  <Link to="/challenges">
                    <div className="successful-challenge-overview-card card card-flush">
                      {/* <!--begin::Header--> */}
                      <div className="card-header pt-5">
                        <div className="card-title d-flex flex-column">
                          <span className="fs-2hx fw-bold text-white me-2 lh-1 ls-n2">{successfulChallenges?.length}</span>
                          <span className="text-white opacity-75 pt-1 fw-semibold fs-6 mb-8">Successful Challenge{successfulChallenges?.length > 1 ? "s" : ""}</span>
                        </div>
                      </div>
                      {/* <!--end::Header--> */}
                    </div>
                  </Link>
                </div>

              </div>


            </div>
          </div>



          <Toaster />
        </div>

      }
    </>
  );
}

export default Home;