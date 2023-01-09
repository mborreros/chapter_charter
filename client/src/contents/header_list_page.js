function HeaderContents({ pageName, handleShow, journeyDetail, collectionDetail, pageTitle, buttonText, pageSubHeader }) {

  // determines if button on journey detail page is disabled for that journey
  let journeyEntryDetailButton
  journeyEntryDetailButton = buttonText === "Add Reading Journey Progress" && journeyDetail?.current_progress === 100

  return (
    <div id="kt_app_toolbar" className="app-toolbar py-3 py-lg-6">
      <div id="kt_app_toolbar_container" className="app-container container-xxl d-flex flex-stack">
        <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
          <h1 className="text-capitalize">{pageTitle}</h1>
          <span className="text-muted w-lg-1000px">{pageSubHeader}</span>
        </div>

        <div className="d-flex align-items-center gap-2 gap-lg-3">

          {pageName[1] === "challenges" && pageName.length > 2 ?
            <></>
            :
            <button disabled={collectionDetail?.challenge_locked && pageName.length > 2} title={collectionDetail?.challenge_locked && pageName.length > 2 ? "Cannot edit a collection that is used in a challenge" : ""} className={"btn btn-sm fw-bold btn-primary " + (journeyEntryDetailButton ? "disabled" : "") + (pageName[1] === "accounts" ? "d-none" : "")} data-bs-toggle="modal" id={"new-" + (pageName.length > 2 ? (pageName[1].slice(0, -1) + "-entry") : pageName[1].slice(0, -1)) + "-modal"}
              data-bs-target="#kt_modal_create_app" onClick={(e) => handleShow(e)}>
              <span className="text-capitalize">{buttonText}</span>
            </button>
          }
        </div>

      </div>
    </div>
  )
}

export default HeaderContents;