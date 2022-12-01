import { useState } from "react";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { useLocation, useNavigate } from 'react-router-dom';

function UserAuthForm( { onLogin } ) {

  const [username, setUsername] = useState("")

  // getting pathname (login or signup) to determine which form to show
  const location = useLocation();
  const navigate = useNavigate();

  function handleUserLogin(e){
    e.preventDefault()

    fetch("/login", {
      method: "POST",
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify({ username }),
    })
    .then((response) => response.json())
    .then((user) => onLogin(user),
      navigate("../", { replace: true }))
  }

  return(
    <>
      { location.pathname === "/login" ?
        <>
          <h1>login user auth form content</h1>
          <Form onSubmit={(e) => handleUserLogin(e)}>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>username</Form.Label>
              <Form.Control type="username" placeholder="enter username" onChange={(e) => setUsername(e.target.value)}/>
            </Form.Group>
            {/* <br></br>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>password</Form.Label>
              <Form.Control type="password" placeholder="enter password" />
            </Form.Group> */}
            <br></br>
            <Button type="submit">Login</Button>
          </Form> 
        </> 
      :
        <>
          <h1>signup user auth form content</h1>
          <Form>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>username</Form.Label>
              <Form.Control type="username" placeholder="enter username" />
            </Form.Group>

            <br></br>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>password</Form.Label>
              <Form.Control type="password" placeholder="enter password" />
            </Form.Group>

            <br></br>

            <Button type="submit">Signup</Button>

        </Form>
        </>
      }
    </>
  );
}

export default UserAuthForm;