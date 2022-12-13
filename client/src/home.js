import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { Link } from "react-router-dom";
import { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

function Home({ user, onLogout, onLogin, onSignup }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pageType, setPageType] = useState("login")

  // getting pathname (login or signup) to determine which form to show
  const location = useLocation();
  const navigate = useNavigate();

  function handleUserLogin(e) {
    e.preventDefault()
    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    })
      .then(response => {
        if (response.ok) {
          response.json().then((user) => onLogin(user)).then(navigate("../", { replace: true }))
        } else {
          response.json().then((errors) => console.log(errors))
        }
      })
  }

  function handleUserSignup(e) {
    e.preventDefault()
    fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    })
      .then(response => {
        if (response.ok) {
          response.json().then(onSignup()).then(navigate("../", { replace: true }))
        } else {
          response.json().then((errors) => console.log(errors))
        }
      })
  }

  function handleUserLogout() {
    fetch("/logout", {
      method: "DELETE"
    }).then(() => onLogout())
  }

  return (
    <>
      {!user ?
        <div className='home-screen d-flex align-items-center'>
          <div className="d-flex flex-column flex-column-fluid align-items-center">
            <div className='flex-column flex-row-fluid'>
              <div className="flex-column col-md-5 mb-md-5 mb-xl-10">
                <div className='user-button-container card bgi-no-repeat bgi-size-contain bgi-position-x-end mb-xl-10'>
                  <div className='card-body mx-8 my-8'>

                    <Form onSubmit={(e) => handleUserLogin(e)}>
                      <Form.Group className="mb-3" controlId="formUsernameLogin">
                        <Form.Label>username</Form.Label>
                        <Form.Control type="username" placeholder="enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
                      </Form.Group>
                      <br></br>
                      <Form.Group className="mb-3" controlId="formPasswordLogin">
                        <Form.Label>password</Form.Label>
                        <Form.Control type="password" placeholder="enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                      </Form.Group>

                      <div className="text-end mt-12">
                        <Button className='btn btn-secondary mx-3' as={Link} to="/signup">Sign up</Button>
                        <Button className='btn-login-button btn mx-3' type="submit">Login</Button>
                      </div>
                    </Form>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        // <> 
        //   <p>this is the page before the user logs into their account</p> 
        //     <Button as={Link} to="/login" >Login</Button>
        //     <br></br>
        //     <Button as={Link} to="/signup" >Sign up</Button>
        // </>
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