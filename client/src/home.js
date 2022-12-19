// import Alert from 'react-bootstrap/Alert';
import { Toaster } from 'react-hot-toast';

function Home({ user }) {

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
        <>
        {/* <div id="status-message" className="d-none">

        </div> */}

        {/* <Alert variant="danger"> This is an alert—check it out! </Alert> */}

          <p>this is the home page for <b>{user.username}</b> now that they are logged in</p>

          <Toaster />
        </>
      }
    </>
  );
}

export default Home;