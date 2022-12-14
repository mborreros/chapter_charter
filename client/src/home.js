import Button from 'react-bootstrap/Button';

function Home({ user, handleUserLogout }) {

  return (
    <>
      {!user ?
        <div className='home-screen d-flex align-items-center'>
          <div className="d-flex flex-column flex-column-fluid align-items-center">
            <div className='flex-column flex-row-fluid'>
              <div className="flex-column col-md-5 mb-md-5 mb-xl-10">
                <div className='user-button-container card bgi-no-repeat bgi-size-contain bgi-position-x-end mb-xl-10'>
                  <div className='card-body mx-8 my-8'>

                  {/* introductory website text goes here */}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        :
        <>
          <p>this is the home page for <b>{user.username}</b> now that they are logged in</p>
          <Button onClick={handleUserLogout}>Logout</Button>
        </>
      }
    </>
  );
}

export default Home;