
function Account({ user, setUser }) {

  console.log(user)

  return (

    <div className="card mb-xl-10">
      <div className="card-body pt-9 pb-0">
        {/* <!--begin::Details--> */}
        <div className="d-flex flex-wrap flex-sm-nowrap mb-3">
          {/* <!--begin: Pic--> */}
          <div className="me-7 mb-4">
            <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
              <img src={user?.avatar_img} alt={user?.screenname + "'s profile picture"} />
            </div>
          </div>
          {/* <!--end::Pic--> */}
          {/* <!--begin::Info--> */}
          <div className="flex-grow-1">
            {/* <!--begin::Title--> */}
            <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
              {/* <!--begin::User--> */}
              <div className="d-flex flex-column">
                {/* <!--begin::Name--> */}
                <div className="d-flex align-items-center mb-2">
                  <span className="text-gray-900 fs-2 fw-bold me-1">Account Details</span>
                </div>

                <div className="d-flex align-items-center mb-2">
                  <span className="text-gray-900 me-1">Username: {user?.username}</span>
                </div>

                <div className="d-flex align-items-center mb-2">
                  <span className="text-gray-900 me-1">Screenname: {user?.screenname}</span>
                </div>

                <div className="d-flex align-items-center mb-2">
                  <span className="text-gray-900 me-1">Profile Picture Source: {user?.avatar_img}</span>
                </div>

                {/* {/* <!--end::Name-->x */}
              </div>
              {/* {/* <!--end::User--> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;