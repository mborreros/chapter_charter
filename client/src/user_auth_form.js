import { useState } from "react";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { useLocation, useNavigate } from 'react-router-dom';

function UserAuthForm( { onLogin, onSignup } ) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // getting pathname (login or signup) to determine which form to show
  const location = useLocation();
  const navigate = useNavigate();

  function handleUserLogin(e){
    e.preventDefault()

    // const user = { username, password }

    fetch("/login", {
      method: "POST",
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify({ username, password }),
    })
    .then(response => {
      if (response.ok){
        response.json().then((user) => onLogin(user)).then(navigate("../", { replace: true }))
      } else {
        response.json().then((errors) => console.log(errors))
      }
    })

    // .then((response) => response.json())
    // .then((user) => onLogin(user),
    //   navigate("../", { replace: true }))
  }

  function handleUserSignup(e){
    e.preventDefault()

    // const user = { username, password }

    fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify( {username, password} )
    })
    .then(response => {
      if (response.ok){
        response.json().then(onSignup()).then(navigate("../", { replace: true }))
      } else {
        response.json().then((errors) => console.log(errors))
      }
    })
  }

  return(
    <>
      { location.pathname === "/login" ?
        <>
          <h1>login user auth form content</h1>
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
            <br></br>
            <Button type="submit">Login</Button>
          </Form> 
        </> 
      :
        <>
          <h1>signup user auth form content</h1>
          <Form onSubmit={(e) => handleUserSignup(e)}>

            <Form.Group className="mb-3" controlId="formUsernameSignup">
              <Form.Label>username</Form.Label>
              <Form.Control type="username" placeholder="enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>

            <br></br>

            <Form.Group className="mb-3" controlId="formPasswordSignup">
              <Form.Label>password</Form.Label>
              <Form.Control type="password" placeholder="enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
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